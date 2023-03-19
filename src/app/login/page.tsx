"use client";

import Auth from "@/utils/Auth";
import Link from "next/link";
import Account from "../components/Account";

import { useAuth, VIEWS } from "@/utils/Auth/AuthProvider";
import { getUser } from "@/utils/Store";

export default function Login() {

  const { initial, user, view, signOut }: any = useAuth();

  if (initial) {
    return <div className="card h-72">Loading...</div>;
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    
    return (
      <div className="card">
        <h2>Welcome!</h2>

        <code className="highlight">{user.role}</code>
        <Link className="button" href="/profile">
          Go to Profile
        </Link>
        <button type="button" className="button-inverse" onClick={signOut}>
          Sign Out
        </button>
      </div>
    );
  }

  return <Auth view={view} />;
}
