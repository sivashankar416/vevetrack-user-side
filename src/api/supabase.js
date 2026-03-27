import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const oauthRedirectUrl =
  import.meta.env.VITE_OAUTH_REDIRECT_URL || `${window.location.origin}/auth/callback`;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase URL or anon key in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export async function signInWithOAuth(provider) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: oauthRedirectUrl,
        skipBrowserRedirect: false,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(`OAuth sign-in error: ${error.message}`);
    throw error;
  }
}

export async function handleAuthCallback() {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error || !data.session) {
      throw new Error("Failed to get session from callback");
    }

    return {
      user: data.session.user,
      session: data.session,
    };
  } catch (error) {
    console.error(`Auth callback error: ${error.message}`);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error(`Sign out error: ${error.message}`);
    throw error;
  }
}
