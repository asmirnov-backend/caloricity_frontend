import clsx from "clsx";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className={clsx("green text-foreground bg-background")} lang="en">
      <Head>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
