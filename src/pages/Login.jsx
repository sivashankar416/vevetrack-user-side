import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import profileImg from "../assets/profile.png";
import { loginRequest } from "../api/auth";
import { signInWithOAuth } from "../api/supabase";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(location.state?.message || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");
      setNotice("");

      const data = await loginRequest({
        email: email.trim(),
        password,
        role: "user",
      });

      if (!data.accessToken || !data.user) {
        throw new Error("Unable to login. Please try again.");
      }

      setUser({
        id: data.user.id,
        name: data.user.name || email.trim().split("@")[0],
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
        (requestError instanceof Error ? requestError.message : "Login failed");
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleOAuthLogin(provider) {
    try {
      setIsOAuthLoading(true);
      setError("");
      setNotice("");

      await signInWithOAuth(provider);
      // Supabase will handle the redirect to /auth/callback
    } catch (oauthError) {
      const message =
        oauthError instanceof Error
          ? oauthError.message
          : `OAuth login failed. Please try again.`;
      setError(message);
      setIsOAuthLoading(false);
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
          <h1 className="text-3xl font-bold mb-6">Welcome back</h1>

          <div className="bg-white shadow-lg rounded-xl p-8">
            <form onSubmit={handleLogin} className="space-y-4">

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
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isOAuthLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
              {notice ? <p className="text-sm text-green-700">{notice}</p> : null}
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">Or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <button
              onClick={() => handleOAuthLogin("google")}
              disabled={isSubmitting || isOAuthLoading}
              className="w-full border py-2 rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.805 10.023h-9.75v3.95h5.588c-.24 1.271-.962 2.347-2.048 3.069v2.545h3.31c1.936-1.782 2.9-4.406 2.9-7.512 0-.676-.06-1.327-.17-1.952z"
                  fill="#4285F4"
                />
                <path
                  d="M12.055 22c2.79 0 5.13-.924 6.84-2.503l-3.31-2.545c-.924.62-2.104.987-3.53.987-2.717 0-5.018-1.833-5.84-4.301H2.79v2.624A10.323 10.323 0 0012.055 22z"
                  fill="#34A853"
                />
                <path
                  d="M6.215 13.638a6.2 6.2 0 010-3.975V7.039H2.79a10.323 10.323 0 000 9.223l3.425-2.624z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.055 6.062c1.518 0 2.88.522 3.952 1.55l2.962-2.963C17.18 2.984 14.84 2 12.055 2A10.323 10.323 0 002.79 7.039l3.425 2.624c.822-2.469 3.123-4.301 5.84-4.301z"
                  fill="#EA4335"
                />
              </svg>
              <span>{isOAuthLoading ? "Signing in..." : "Continue with Google"}</span>
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
