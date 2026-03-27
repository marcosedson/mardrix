import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function assertConfig() {
  const entries = Object.entries(firebaseConfig) as Array<[string, string | undefined]>;
  const missing = entries.filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) {
    // Não joga erro em build; só quando o código rodar no browser.
    // Ajuda dev a perceber config faltando.
    console.warn(
      `[mardrix] Firebase config ausente: ${missing.join(", ")}. ` +
        `Defina vars NEXT_PUBLIC_FIREBASE_* no .env.local.`
    );
  }
}

export function getFirebaseApp() {
  assertConfig();
  if (!getApps().length) initializeApp(firebaseConfig);
  return getApps()[0]!;
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}
