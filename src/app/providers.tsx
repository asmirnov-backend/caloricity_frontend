// app/providers.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";

const TIME_AUTO_HIDE_NOTIFICATION = 6000;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SnackbarProvider
        autoHideDuration={TIME_AUTO_HIDE_NOTIFICATION}
        dense={true}
      >
        {children}
      </SnackbarProvider>
    </NextUIProvider>
  );
}
