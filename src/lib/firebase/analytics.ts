import { getFirebaseApp } from "@/lib/firebase/client";

export async function initAnalytics() {
  // Analytics só funciona no browser
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) return null;

  // Import dinâmico evita quebrar SSR/build
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  const supported = await isSupported().catch(() => false);
  if (!supported) return null;

  return getAnalytics(getFirebaseApp());
}

