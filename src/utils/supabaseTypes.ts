import { Session } from "@supabase/supabase-js";

export interface Model {
  id: string;
  name: string;
  creator_id: string | null;
  endpoint: string | null;
  api_key: string | null;
  created_at: string;
  custom_model: boolean;
}

export interface AuthProps {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export interface NavbarProps {
  session: Session | null;
}

export interface LandingPageProps {
  session: Session | null;
}
