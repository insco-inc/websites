import { allPosts } from "contentlayer/generated";
import { domain, sitemapUrls } from "@/constants";
import { languages } from "@/i18n/settings";

import { MetadataRoute } from "next";

export async function GET(request: Request) {
  const originHost = request.headers.get("custom-forwarded-host");
  console.log("originHost:", originHost);
  const host = originHost ? `https://${originHost}` : domain;

  let sitemaps = allPosts
    .sort((a, b) => {
      return new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1;
    })
    .filter((post) => post.slug.startsWith("en/"))
    .map((post) => ({
      url: `${host}/${post.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    }));

  sitemaps = sitemaps.concat(
    sitemapUrls.flatMap((url: string) => {
      return languages
        .filter((language) => language === "en")
        .map((lng: string) => ({
          url: `${host}/${lng}/${url}`,
          lastModified: new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 1,
        }));
    }),
  );

  return new Response(generateSitemap(sitemaps as MetadataRoute.Sitemap), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

// 生成 Sitemap XML 内容的函数
function generateSitemap(urls: MetadataRoute.Sitemap) {
  const urlSet = urls
    .map((url) => {
      return `
      <url>
        <loc>${url.url}</loc>
        <lastmod>${url.lastModified}</lastmod>
        <changefreq>${url.changeFrequency}</changefreq>
        <priority>${url.priority}</priority>
      </url>
    `;
    })
    .join("");

  return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlSet}
    </urlset>
  `;
}
