import "./globals.css";
import React from "react";
import cx from "classnames";
import { dir } from "i18next";
import { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BiArrowToTop } from "react-icons/bi";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "muse-ui";
import Footer from "@/components/layout/footer";
import CookieYes from "@/components/shared/cookie-yes";
import ScrollToTop from "@/components/layout/scroll-to-top";
import { useTranslation } from "@/i18n";
import { languages } from "@/i18n/settings";
import { domain } from "@/constants";
import { sfPro, inter } from "./fonts";
import ThemeProvider from "./theme-provider";
import Particles from "./particles";

// 是否显示背景特效
const NEXT_PUBLIC_SHOW_PARTICLES = process.env.NEXT_PUBLIC_SHOW_PARTICLES;
// 是否全站置灰
const NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY =
  process.env.NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY;
// Google tag (gtag.js)
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID;

const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: false,
});

export function generateViewport(): Viewport {
  return {
    colorScheme: "dark",
    themeColor: "black",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
  };
}

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata | undefined> {
  const { t } = await useTranslation(lng, "header"); // eslint-disable-line react-hooks/rules-of-hooks
  const { t: tc } = await useTranslation(lng, "common"); // eslint-disable-line react-hooks/rules-of-hooks
  return {
    title: t("title"),
    description: `${t("title")} - ${tc("slogan")}`,
    metadataBase: new URL(domain),
    icons: {
      icon: `${domain}/logo.png`,
    },
    manifest: `${domain}/manifest.json`,
  };
}

export async function generateStaticParams() {
  return languages.map((lng: string) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  if (!languages.includes(params.lng)) {
    notFound();
  }

  return (
    <html
      lang={params.lng}
      dir={dir(params.lng)}
      className={NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY ? "grayscale" : ""}
      suppressHydrationWarning
    >
      <body className={cx(sfPro.variable, inter.variable)}>
        <NextTopLoader height={1} />
        <ThemeProvider>
          {NEXT_PUBLIC_SHOW_PARTICLES && <Particles />}
          <Header lng={params.lng} />
          <main
            id="main"
            className="flex min-h-screen w-full flex-col items-center justify-center pt-16"
          >
            {children}
          </main>
          <Footer lng={params.lng} />
          <Toaster />
        </ThemeProvider>
        <ScrollToTop
          smooth
          component={
            <BiArrowToTop className="mx-auto my-0 h-5 w-5 text-gray-700" />
          }
        />
      </body>
      <CookieYes lng={params.lng} />
      {GA_TRACKING_ID && <GoogleAnalytics gaId={GA_TRACKING_ID} />}
    </html>
  );
}
