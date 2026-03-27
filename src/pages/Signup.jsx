import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import profileImg from "../assets/profile.png";
import { signupRequest } from "../api/auth";

export default function Signup() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();

    try {
      setError("");
      setIsSubmitting(true);

      const data = await signupRequest({
        name: name.trim(),
        email: email.trim(),
        password,
        role: "user",
      });

      if (!data.user) {
        throw new Error(data.message || "Unable to create account. Please try again.");
      }

      if (data.requiresEmailVerification || !data.accessToken) {
        navigate("/login", {
          replace: true,
          state: {
            message: data.message || "Account created. Please verify your email before login.",
            email: data.user.email || email.trim(),
          },
        });
        return;
      }

      setUser({
        id: data.user.id,
        name: data.user.name || name.trim(),
        email: data.user.email || email.trim(),
        phone: "",
        address: "",
        image: profileImg,
        role: data.user.role || "user",
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || "",
        isLoggedIn: true,
      });

      navigate("/home");
    } catch (requestError) {
      const message =
        requestError?.response?.data?.message ||
        (requestError instanceof Error ? requestError.message : "Signup failed");
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
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
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
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
