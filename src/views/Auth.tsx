import React from "react";
import { AuthProps } from "@/utils/supabaseTypes";
import { supabase } from "@/utils/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [signInTab, setSignInTab] = useState<boolean>(true);

  async function handleSignUp() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      setError(error.message);
    }
    if (data) {
      console.log(data);
    }
  }

  async function handleSignIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setError(error.message);
    }
    if (data) {
      console.log(data);
    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-background">
      <div className="flex justify-center space-x-1 rounded-lg bg-muted p-1 mb-5">
        <button
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            signInTab
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted/50 focus:bg-muted/50"
          }`}
          onClick={() => {
            setEmail("");
            setPassword("");
            setSignInTab(true);
          }}
        >
          Sign In
        </button>
        <button
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            !signInTab
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted/50 focus:bg-muted/50"
          }`}
          onClick={() => {
            setEmail("");
            setPassword("");
            setSignInTab(false);
          }}
        >
          Sign Up
        </button>
      </div>
      {signInTab ? (
        <div className="">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground">
                Enter your email and password to sign in to your account.
              </p>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="me@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button className="w-full" onClick={() => handleSignIn()}>
                Sign in
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome!</h1>
              <p className="text-muted-foreground">
                Sign up for an account to get started.
              </p>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="me@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button className="w-full" onClick={() => handleSignUp()}>
                Sign up
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
