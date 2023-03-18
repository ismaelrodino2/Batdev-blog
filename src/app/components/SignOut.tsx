"use client";

import { setCookie } from "nookies";
import { useAuth } from "../../utils/Auth/AuthProvider";

export default function SignOut() {
  const { signOut }: any = useAuth();

  async function handleSignOut() {
    const { error } = await signOut();

    setCookie(null, "supabase-auth", "", {
      path: "/",
    });

    if (error) {
      console.error("ERROR signing out:", error);
    }
  }

  return (
    <button type="button" className="button-inverse" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
