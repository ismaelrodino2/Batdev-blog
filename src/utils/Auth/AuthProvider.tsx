"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import supabase from "src/lib/supabase-browser";
import { destroyCookie, parseCookies } from "nookies";
import { getUser } from "../Store";

export const EVENTS = {
  PASSWORD_RECOVERY: "PASSWORD_RECOVERY",
  SIGNED_OUT: "SIGNED_OUT",
  USER_UPDATED: "USER_UPDATED",
};

export const VIEWS = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
};

export const AuthContext = createContext({});

export const AuthProvider = (props: {
  [x: string]: any;
  accessToken: string | null;
}) => {
  const [initial, setInitial] = useState<boolean>(true);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<any>(VIEWS.SIGN_IN);
  const router = useRouter();
  const { accessToken, ...rest } = props;

  const getUser2 = () => {
    const { "supabase-auth-token": token } = parseCookies();
    if (token) {
      try {
        return JSON.parse(token);
      } catch (error) {
        if (error instanceof SyntaxError) {
          console.error("Invalid JSON:", error.message);
        } else {
          throw error;
        }
        return null;
      }
    }
  };
  const { signOut }: any = useAuth();

  useEffect(() => {
    //check both cookies
    const cookie1 = getUser();
    const cookie2 = getUser2();

    if ((cookie1 && !cookie2) || (!cookie1 && cookie2)) {
      destroyCookie(null, "supabase-auth");
      destroyCookie(null, "supabase-auth-token");
      window.location.reload();

    }

    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession();
      setSession(activeSession);
      setUser(activeSession?.user ?? null);
      setInitial(false);
    }
    getActiveSession();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh();
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD);
          break;
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(VIEWS.SIGN_IN);
          break;
        default:
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      setView,
      signOut: () => {
        supabase.auth.signOut();
        destroyCookie(null, "supabase-auth");
      },
    };
  }, [initial, session, user, view]);

  return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
