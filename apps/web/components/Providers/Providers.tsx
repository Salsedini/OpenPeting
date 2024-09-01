'use client'

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";

export function Providers({ children, session}: { children: ReactNode; session: Session | null;}) {
  
    return (
    <SessionProvider session={session}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
          <Toaster
            position="bottom-center"
            reverseOrder={false}
          />
            {children}
          </NextThemesProvider>
        </NextUIProvider>
    </SessionProvider>
    )
}