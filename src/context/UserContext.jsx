import { useEffect, useState } from "react";
import profileImg from "../assets/profile.png";
import { UserContext } from "./userContext";

const defaultUser = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  image: profileImg,
  role: "user",
  accessToken: "",
  refreshToken: "",
  isLoggedIn: false,
};

function readStoredUser() {
  const raw = localStorage.getItem("vt_user_profile");
  if (!raw) return defaultUser;

  try {
    const parsed = JSON.parse(raw);
    return { ...defaultUser, ...parsed };
  } catch {
    return defaultUser;
  }
}

export function UserProvider({ children }) {
  const [user, setUserState] = useState(readStoredUser);

  useEffect(() => {
    const handleSessionExpired = () => {
      setUserState(defaultUser);
    };

    window.addEventListener("vt-user-session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("vt-user-session-expired", handleSessionExpired);
    };
  }, []);

  const setUser = (value) => {
    const nextUser = typeof value === "function" ? value(user) : value;
    setUserState(nextUser);

    if (nextUser?.isLoggedIn) {
      localStorage.setItem("vt_user_profile", JSON.stringify(nextUser));
      localStorage.setItem("vt_user_auth_token", nextUser.accessToken || "");
      localStorage.setItem("vt_user_refresh_token", nextUser.refreshToken || "");
      return;
    }

    localStorage.removeItem("vt_user_profile");
    localStorage.removeItem("vt_user_auth_token");
    localStorage.removeItem("vt_user_refresh_token");
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
