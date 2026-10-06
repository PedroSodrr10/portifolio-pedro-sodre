import { createInquiryHandler } from "@/lib/inquiry-handler";
import { serverDependencies } from "@/lib/inquiry-server";
export const runtime = "nodejs";
export const maxDuration = 30;
export async function POST(request: Request) {
  return createInquiryHandler(serverDependencies())(request);
}
