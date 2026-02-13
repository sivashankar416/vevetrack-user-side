import { createContext, useState } from "react";
import profileImg from "../assets/profile.png";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: profileImg,
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
