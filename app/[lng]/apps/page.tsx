"use client";
import { useCallback } from "react";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { RoughNotation } from "react-rough-notation";
import Card from "@/components/home/card";
import { useTranslation } from "@/i18n/client";

export default function Support({
  params,
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = useTranslation(params.lng, "apps");

  const Section = useCallback(
    ({ title, links }: { title: string; links: any[] }) => {
      return (
        <div className="mt-14 w-full max-w-screen-xl animate-fade-up px-5 xl:px-0">
          <div className="flex flex-row flex-nowrap items-center justify-center text-center text-3xl before:mr-5 before:h-[1px] before:max-w-xs before:flex-1 before:border-b-[1px] before:border-dashed before:border-b-gray-300 before:content-[''] after:ml-5 after:h-[1px] after:max-w-xs after:flex-1 after:border-b-[1px] after:border-dashed after:border-b-gray-300 after:content-[''] dark:before:border-b-gray-600 dark:after:border-b-gray-600">
            {title}
          </div>
          <div className="mt-6 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {links.map(({ title, description, demo, url }) => (
              <Card
                key={title}
                title={title}
                description={description}
                demo={demo}
                url={url}
              />
            ))}
          </div>
        </div>
      );
    },
    [],
  );

  const apps = [
    {
      title: t("pg-app-name"),
      description: t("pg-app-description"),
      demo: (
        <Image
          className="rounded-full shadow-lg shadow-black/[0.03]"
          src="https://www.picguard.app/logo.png"
          width={96}
          height={96}
          alt={t("pg-app-name")}
        />
      ),
      url: "https://www.picguard.app",
      large: false,
    },
    {
      title: t("fr-app-name"),
      description: t("fr-app-description"),
      demo: (
        <Image
          className="rounded-full shadow-lg shadow-black/[0.03]"
          src="https://www.fafarunner.com/logo.jpg"
          width={96}
          height={96}
          alt="FaFa Runner,发发跑酷"
        />
      ),
      url: "https://www.fafarunner.com",
      large: false,
    },
    {
      title: t("aty-app-name"),
      description: t("aty-app-description"),
      demo: (
        <Image
          className="rounded-full shadow-lg shadow-black/[0.03]"
          src="https://www.artifylabs.org/logo.png"
          width={96}
          height={96}
          alt={t("aty-app-name")}
        />
      ),
      url: "https://www.artifylabs.org",
      large: false,
    },
    {
      title: t("kty-app-name"),
      description: t("kty-app-description"),
      demo: (
        <Image
          className="rounded-full shadow-lg shadow-black/[0.03]"
          src="https://www.kitifylabs.com/logo.png"
          width={96}
          height={96}
          alt={t("kty-app-name")}
        />
      ),
      url: "https://www.kitifylabs.com",
      large: false,
    },
  ];

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="font-display animate-fade-up bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-black/80 opacity-0 drop-shadow-sm dark:text-white/80 md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t("apps")}</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-red-400 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            <RoughNotation
              animate
              type="highlight"
              show={true}
              color="rgb(36, 54, 110)"
              animationDelay={1000}
              animationDuration={2500}
            >
              {t("description")}
            </RoughNotation>
          </Balancer>
        </p>
      </div>
      <Section title={t("apps")} links={apps} />
    </>
  );
}
