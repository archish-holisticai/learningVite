import { Session } from "@supabase/supabase-js";
import LandingPage from "./views/LandingPage";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import Auth from "./views/Auth";
import { supabase } from "./utils/supabaseClient";
function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    console.log("getting session");
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log("set session.");
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("set session");
    });
  }, []);

  useEffect(() => {
    console.log("session:", session);
  }, [session]);

  return (
    <>
      {session && <NavBar session={session} />}
      {session ? <LandingPage session={session} /> : <Auth />}
    </>
  );
}

export default App;
