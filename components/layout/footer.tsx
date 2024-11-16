"use client";
import Image from "next/image";
import Link from "next/link";
import { FaRss } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { cacheRealSourceKey, domain } from "@/constants";
import { useTranslation } from "@/i18n/client";
import type { LngProps } from "@/types/i18next-lng";

const startDate: number = 2024;

export default function Footer(props: LngProps) {
  const { t } = useTranslation(props.lng, "footer");
  const { t: th } = useTranslation(props.lng, "header");
  const [cookies] = useCookies([cacheRealSourceKey]);

  const fullYear = new Date().getFullYear();

  return (
    <div className="absolute w-full border-b border-gray-200 py-5 text-center dark:border-gray-700">
      <p className="mt-2 flex items-center justify-center">
        <Link
          className="font-medium text-gray-800 underline transition-colors dark:text-white/90"
          href={`/${props.lng}/legal/privacy`}
          rel="noopener noreferrer"
        >
          {t("privacy")}
        </Link>
        &nbsp;&nbsp;
        <Link
          className="font-medium text-gray-800 underline transition-colors dark:text-white/90"
          href={`/${props.lng}/legal/terms-of-use`}
          rel="noopener noreferrer"
        >
          {t("terms-of-use")}
        </Link>
      </p>
      <span className="mt-2 flex flex-wrap items-center justify-center text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © {`${startDate}${fullYear === startDate ? "" : `-${fullYear}`}`}&nbsp;
        <a href="https://www.insco.io" className="hover:underline">
          {th("title")}
        </a>
        . {t("copyright")}&nbsp;
        <a href={`${domain}/rss.xml`} rel="noreferrer" target="_blank">
          <FaRss color="#ff7979" size="20px" />
        </a>
        &nbsp;
        <a href={`${domain}/sitemap.xml`} rel="noreferrer" target="_blank">
          {t("sitemap")}
        </a>
        &nbsp;
        {process.env.VERCEL_GIT_COMMIT_SHA && (
          <>
            <p className="flex items-center justify-center">
              <a
                href={`https://github.com/insco-inc/websites/commit/${process.env.VERCEL_GIT_COMMIT_SHA}`}
                target="_blank"
                className="hover:underline"
                rel="noreferrer"
              >
                {process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 8)}
              </a>
            </p>
            &nbsp;
          </>
        )}
        <Image
          src="https://visitor-badge.laobi.icu/badge?page_id=insco.io"
          width={60}
          height={20}
          alt="visitor badge"
        />
      </span>
      {cookies[cacheRealSourceKey] ? (
        <span className="mt-2 flex flex-wrap items-center justify-center text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          <a href="https://beian.miit.gov.cn/" target="_blank">
            {cookies[cacheRealSourceKey] === "cn"
              ? "鲁ICP备18053123号-1"
              : "鲁ICP备18053123号-4"}
          </a>
        </span>
      ) : null}
    </div>
  );
}
