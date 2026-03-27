import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../context/userContext";
import logo from "../assets/vt-logo.png";
import { logoutRequest } from "../api/auth";

export default function TopBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [openUser, setOpenUser] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const userRef = useRef(null);

  const navClass = ({ isActive }) =>
    isActive
      ? "text-white border-b-2 border-orange-400 pb-1"
      : "text-blue-100 hover:text-white";

  /* Close user dropdown */
  useEffect(() => {
    function handleClickOutside(e) {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setOpenUser(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const token = user.accessToken || localStorage.getItem("vt_user_auth_token");

    if (token) {
      try {
        await logoutRequest(token);
      } catch {
        // Ignore backend failures; local logout still applies.
      }
    }

    setUser({
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      image: "",
      role: "user",
      accessToken: "",
      refreshToken: "",
      isLoggedIn: false,
    });

    navigate("/login");
  }

  return (
    <header className="bg-brandBlue sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img src={logo} alt="VeveTrack" className="h-9" />
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/home" className={navClass}>Home</NavLink>
          <NavLink to="/my-bookings" className={navClass}>My Bookings</NavLink>
          <NavLink to="/notifications" className={navClass}>Notifications</NavLink>
          <NavLink to="/profile" className={navClass}>My Profile</NavLink>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpenMobile(!openMobile)}
          >
            ☰
          </button>

          {/* USER */}
          <div
            ref={userRef}
            className="relative flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenUser(!openUser)}
          >
            <img
              src={user.image || "https://i.pravatar.cc/40"}
              className="w-9 h-9 rounded-full border-2 border-white object-cover"
            />
            <span className="hidden sm:block text-white text-sm font-medium">
              {user.name || "User"}
            </span>
            <span className="text-white text-xs">▼</span>

            {openUser && (
              <div className="absolute right-0 top-12 w-40 bg-white rounded-lg shadow border">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      {openMobile && (
        <div className="md:hidden bg-brandBlue border-t border-blue-400">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <NavLink onClick={() => setOpenMobile(false)} to="/home" className="text-white">Home</NavLink>
            <NavLink onClick={() => setOpenMobile(false)} to="/my-bookings" className="text-white">My Bookings</NavLink>
            <NavLink onClick={() => setOpenMobile(false)} to="/notifications" className="text-white">Notifications</NavLink>
            <NavLink onClick={() => setOpenMobile(false)} to="/profile" className="text-white">My Profile</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
