import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/dashboard"];

export default function isProtectedPath(request: NextRequest) {
  const path = request.nextUrl.pathname;
  return PROTECTED_PATHS.some((x) => path.startsWith(x));
}
