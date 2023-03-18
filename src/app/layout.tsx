import { AuthProvider } from "@/utils/Auth/AuthProvider";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { MuiProvider } from "@/contexts/MuiContext";
import { SearchProvider } from "@/contexts/SearchContext";
import createClient from "@/lib/supabase-server";
import "../styles/globals.css";
import Footer from "./components/Footer";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("./components/NavBar"), {
  ssr: false,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https:
      */}
      <head />
      <body>
        <MuiProvider>
          <SearchProvider>
            <DarkModeProvider>
              <AuthProvider accessToken={accessToken}>
                <NavBar />
                {children}
                <Footer />
              </AuthProvider>
            </DarkModeProvider>
          </SearchProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
