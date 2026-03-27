import api from "./axios";

export async function signupRequest(payload) {
  const response = await api.post("/auth/signup", payload);
  return response.data;
}

export async function loginRequest(payload) {
  const response = await api.post("/auth/login", payload);
  return response.data;
}

export async function getOAuthUrl(provider) {
  const response = await api.get(`/auth/oauth/${provider}/url`);
  return response.data;
}

export async function handleOAuthCallback(code, provider) {
  const response = await api.post(`/auth/oauth/${provider}/callback`, { code });
  return response.data;
}

export async function refreshRequest(payload) {
  const response = await api.post("/auth/refresh", payload);
  return response.data;
}

export async function logoutRequest(accessToken) {
  const response = await api.post("/auth/logout", { accessToken });
  return response.data;
}
