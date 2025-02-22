import { manifest } from "@/constants";

export async function GET() {
  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
