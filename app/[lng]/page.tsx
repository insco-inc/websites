"use client";
import { useCallback } from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { RoughNotation } from "react-rough-notation";
import { FaBlog } from "react-icons/fa";
import Image from "next/image";
import { RiCommunityLine } from "react-icons/ri";
import Card from "@/components/home/card";
import {
  Github,
  AppStore,
  GooglePlay,
  MicrosoftStore,
  AmazonAppStore,
  SnapStore,
  Flathub,
} from "@/components/shared/icons";
import { useTranslation } from "@/i18n/client";
import { basePath } from "@/constants";
import { allPosts } from "contentlayer/generated";

export default function Home({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = useTranslation(lng, "common");
  const { t: th } = useTranslation(lng, "header");
  const { t: ts } = useTranslation(lng, "support");
  const post = allPosts
    .filter((post) => post.slug.startsWith(`${lng}/blog`))
    .sort((a, b) => {
      return new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1;
    })
    .at(0);

  const Section = useCallback(
    ({ title, links }: { title: string; links: any[] }) => {
      return (
        <div className="mt-14 w-full max-w-screen-xl animate-fade-up px-5 xl:px-0">
          <div className="flex flex-row flex-nowrap items-center justify-center text-center text-3xl before:mr-5 before:h-[1px] before:max-w-xs before:flex-1 before:border-b-[1px] before:border-dashed before:border-b-gray-300 before:content-[''] after:ml-5 after:h-[1px] after:max-w-xs after:flex-1 after:border-b-[1px] after:border-dashed after:border-b-gray-300 after:content-[''] dark:before:border-b-gray-600 dark:after:border-b-gray-600">
            {title}
          </div>
          <div className="mt-6 flex w-full max-w-screen-xl flex-grow animate-fade-up flex-wrap gap-5">
            {links.map(({ title, description, demo, url }) => (
              <div
                key={title}
                className="w-full sm:w-[calc(calc(100%-1.25rem)/2)] lg:w-[calc(calc(100%-2.5rem)/3)]"
              >
                <Card
                  title={title}
                  description={description}
                  demo={demo}
                  url={url}
                />
              </div>
            ))}
          </div>
        </div>
      );
    },
    [],
  );

  const appStores = [
    {
      title: "App Store",
      description: t("app-store"),
      demo: (
        <AppStore className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
      url: "https://apps.apple.com/developer/id1474622324",
    },
    {
      title: "Google Play",
      description: t("google-play"),
      demo: (
        <GooglePlay className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
      url: "https://play.google.com/store/apps/dev?id=6147500812487654859",
    },
    {
      title: "Microsoft Store",
      description: t("microsoft-store"),
      demo: (
        <MicrosoftStore className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
      url: "https://apps.microsoft.com/search/publisher?name=Insco+LLC",
    },
    {
      title: "Amazon Appstore",
      description: t("amazon-appstore"),
      demo: (
        <AmazonAppStore className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
      url: "https://www.amazon.com/s?i=mobile-apps&rh=p_4%3A%E9%9D%92%E5%B2%9B%E5%9B%A0%E6%96%AF%E7%A7%91%E7%BD%91%E7%BB%9C%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&search-type=ss",
    },
    {
      title: "Snap Store",
      description: t("snap-store"),
      demo: (
        <SnapStore className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
      url: "https://snapcraft.io/publisher/insco",
    },
    {
      title: "Flathub",
      description: t("flathub"),
      demo: (
        <Flathub className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
      url: "https://flathub.org/apps/collection/developer/Insco%20LLC/1",
    },
  ];

  return (
    <div className="my-16 w-full max-w-screen-xl">
      <div className="mx-auto w-full max-w-xl px-5 xl:px-0">
        {post && (
          <Link
            href={`/${post.slug}`}
            rel="noreferrer"
            className="mx-auto mb-12 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-[#ff7979] bg-opacity-10 px-7 py-2 text-[#ff7979] transition-colors hover:bg-opacity-20 dark:bg-opacity-20 dark:hover:bg-opacity-30"
          >
            <FaBlog className="h-5 w-5" />
            <p className="text-sm font-semibold">{post.title}</p>
          </Link>
        )}
        <div className="mb-8 flex items-center justify-center space-x-20">
          <Image
            className="rounded-full"
            alt="logo"
            src={`${basePath}/logo.png`}
            width={160}
            height={160}
          />
        </div>
        <h1
          className="font-display animate-fade-up bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-black/80 opacity-0 drop-shadow-sm dark:text-white/80 md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{th("title")}</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-[#ff7979] opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            <RoughNotation
              animate
              type="highlight"
              show={true}
              color="#c7ecee"
              animationDelay={1000}
              animationDuration={2500}
            >
              {t("slogan")}
            </RoughNotation>
          </Balancer>
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <Link
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 dark:bg-black dark:text-white/80"
            href="https://github.com/insco-inc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>
              <span className="sm:inline-block">Star on GitHub</span>
            </p>
          </Link>
          <Link
            className="flex min-w-32 max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 dark:bg-black dark:text-white/80"
            href="support"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiCommunityLine className="h-6 w-6" />
            <p>
              <span className="sm:inline-block">{ts("community")}</span>
            </p>
          </Link>
        </div>
      </div>
      <Section title={t("appstores")} links={appStores} />
    </div>
  );
}
