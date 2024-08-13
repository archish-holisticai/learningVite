import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NavbarProps } from "@/utils/supabaseTypes";
import { supabase } from "@/utils/supabaseClient";
import HolisticLogo from "@/assets/holistic_logo.png";

function NavBar(props: NavbarProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between px-6 bg-background">
      <a href="#" className="text-lg font-semibold text-foreground">
        <img src={HolisticLogo} alt="" className="w-40 -ml-3" />
      </a>
      {props.session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 leading-none">
                <div className="font-semibold">John Doe</div>
                <div className="text-sm text-muted-foreground">
                  {props.session.user.email}
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="#" className="flex items-center gap-2">
                <div className="h-4 w-4" />
                <span>Profile</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#" className="flex items-center gap-2">
                <div className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center gap-2"
              >
                <div className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}

export default NavBar;
