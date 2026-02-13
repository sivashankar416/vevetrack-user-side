import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import profileImg from "../assets/profile.png";

export default function Signup() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    setUser({
      name,
      email,
      phone: "",
      address: "",
      image: profileImg, // ✅ constant image
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
          <h1 className="text-3xl font-bold mb-6">Create your account</h1>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <form onSubmit={handleSignup} className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

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
                Create Account
              </button>
            </form>
          </div>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
