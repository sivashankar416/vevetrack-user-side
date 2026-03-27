import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { supabase } from "../api/supabase";
import profileImg from "../assets/profile.png";

export default function AuthCallback() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Read the session created by Supabase after OAuth redirect.
        const { data, error } = await supabase.auth.getSession();

        if (error || !data?.session) {
          throw new Error("Failed to get session from OAuth callback");
        }

        const session = data.session;
        const user = session.user;

        if (!user?.id || !session?.access_token) {
          throw new Error("Incomplete OAuth session data");
        }

        // Extract user info from OAuth provider
        const userData = {
          id: user.id, // OAuth user ID from Supabase
          name: user.user_metadata?.name || user.email?.split("@")[0] || "OAuth User",
          email: user.email || "",
          phone: user.user_metadata?.phone || "",
          address: user.user_metadata?.address || "",
          image: user.user_metadata?.avatar_url || profileImg,
          role: "user",
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          isLoggedIn: true,
        };

        setUser(userData);
        navigate("/home");
      } catch (error) {
        console.error("Auth callback error:", error);
        navigate("/login", {
          state: { message: "OAuth login failed. Please try again." },
        });
      }
    };

    handleCallback();
  }, [setUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Completing OAuth Login...</h2>
        <p className="text-gray-600">Please wait while we sign you in.</p>
      </div>
    </div>
  );
}
