import { domain } from "@/constants";

export async function GET(request: Request) {
  const originHost = request.headers.get("custom-forwarded-host");
  console.log("originHost:", originHost);
  const host = originHost ? `https://${originHost}` : domain;

  const robotsContent = `User-Agent: *
Allow: /
Disallow: /zh/
Disallow: /_next/

Sitemap: ${host}/sitemap.xml`;

  return new Response(robotsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
