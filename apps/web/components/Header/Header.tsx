'use client'

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Spacer, Avatar, Button, Tooltip, CircularProgress} from "@nextui-org/react";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwticher";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useGetUserById } from "apps/web/hooks";
import SignOut from "./SignOut";


export default function Header() {
  const {data: session} =  useSession();
  const all = useSession()

  const userId= session?.user?.email;

  const { user, isLoadingUser, isErrorUser } = useGetUserById(userId);

  if (isErrorUser) return <p>Failed to load user</p>;
  if (isLoadingUser) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  const handleSignOut = async () => {
    signOut();
  };

  return (
    
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">OpenPeting</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="secondary" aria-current="page" href="/">
            Home
          </Link>
        </NavbarItem>
        <Spacer x={4} />
        <NavbarItem>
          <Link href="/Publish" aria-current="page" color="secondary">
            Publicar
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {session ? (
            <><Link href='/Profile'>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={user.picture} />
          </Link>
          <SignOut/>
          </>
        ) : (
          <Button onClick={() => signIn()}>
            Iniciar sesión
          </Button>
        )}
      </NavbarContent>
      <NavbarContent justify='end'>
        <ThemeSwitcher/>
      </NavbarContent>
    </Navbar>
  );
}
