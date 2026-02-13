import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import profileImg from "../assets/profile.png";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const username = email.split("@")[0]; // ✅ key fix

    setUser({
      name: username,
      email,
      phone: "",
      address: "",
      image: profileImg, // ✅ constant image
      isLoggedIn: true,
    });

    navigate("/home");
  }

  function handleGoogleLogin() {
    setUser({
      name: "Google User",
      email: "googleuser@gmail.com",
      phone: "",
      address: "",
      image: profileImg, // ✅ same image
      isLoggedIn: true,
    });

    navigate("/home");
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white px-16">
        <h1 className="text-2xl font-semibold mb-6">VeveTrack</h1>
        <h2 className="text-4xl font-bold leading-snug">
          Book rides faster <br />
          travel smarter every day
        </h2>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Welcome back</h1>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <form onSubmit={handleLogin} className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Sign In
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">Or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full border py-2 rounded-lg"
            >
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
