import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import "@/styles/globals.css";
import { SnackbarProvider } from "notistack";

import DefaultLayout from "../layouts/default";

const TIME_AUTO_HIDE_NOTIFICATION = 6000;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <SnackbarProvider
          autoHideDuration={TIME_AUTO_HIDE_NOTIFICATION}
          dense={true}
        >
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </SnackbarProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
