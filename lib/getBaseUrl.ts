export function getBaseUrl() {
  // Client-side
  if (typeof window !== "undefined") {
    return "";
  }

  // Production (Vercel)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.NEXTAUTH_URL}`;
  }

  // Local development
  return "http://localhost:3000";
}
