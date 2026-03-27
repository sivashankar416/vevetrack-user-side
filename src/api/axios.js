import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

function readStoredUser() {
  const raw = localStorage.getItem("vt_user_profile");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearStoredSession() {
  localStorage.removeItem("vt_user_profile");
  localStorage.removeItem("vt_user_auth_token");
  localStorage.removeItem("vt_user_refresh_token");
}

function storeRefreshedSession(payload) {
  const currentUser = readStoredUser();
  if (!currentUser || !payload.accessToken || !payload.refreshToken) {
    throw new Error("Unable to persist refreshed session");
  }

  const nextUser = {
    ...currentUser,
    id: payload.user?.id || currentUser.id,
    name: payload.user?.name || currentUser.name,
    email: payload.user?.email || currentUser.email,
    role: payload.user?.role || currentUser.role,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    isLoggedIn: true,
  };

  localStorage.setItem("vt_user_profile", JSON.stringify(nextUser));
  localStorage.setItem("vt_user_auth_token", payload.accessToken);
  localStorage.setItem("vt_user_refresh_token", payload.refreshToken);
}

async function refreshSession() {
  const refreshToken = localStorage.getItem("vt_user_refresh_token");
  const user = readStoredUser();

  if (!refreshToken || !user?.role) {
    throw new Error("Missing refresh token");
  }

  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post("/auth/refresh", {
        refreshToken,
        role: user.role || "user",
      })
      .then((response) => {
        storeRefreshedSession(response.data);
        return response.data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

function handleExpiredSession() {
  clearStoredSession();
  window.dispatchEvent(new CustomEvent("vt-user-session-expired"));

  if (window.location.pathname !== "/login") {
    window.location.assign("/login");
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vt_user_auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const requestPath = originalRequest?.url || "";
    const isAuthRequest = ["/auth/login", "/auth/signup", "/auth/refresh"].some((path) =>
      requestPath.includes(path)
    );

    if (status !== 401 || !originalRequest || originalRequest._retry || isAuthRequest) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const nextAccessToken = await refreshSession();
      originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      handleExpiredSession();
      return Promise.reject(refreshError);
    }
  }
);

export default api;
