import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User,
  onIdTokenChanged,
} from "firebase/auth";

import { getFirebaseAuth } from "@/lib/firebase/client";

export type MardrixClaims = {
  tenant_id?: string;
  role?: string;
  plan?: string;
};

export async function loginWithEmail(email: string, senha: string) {
  const auth = getFirebaseAuth();
  await setPersistence(auth, browserLocalPersistence);
  const cred = await signInWithEmailAndPassword(auth, email, senha);
  return cred.user;
}

export async function logout() {
  const auth = getFirebaseAuth();
  await signOut(auth);
}

export async function resetPassword(email: string) {
  const auth = getFirebaseAuth();
  await sendPasswordResetEmail(auth, email);
}

export async function getIdToken(forceRefresh = false): Promise<string | null> {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken(forceRefresh);
}

export async function getClaims(user: User): Promise<MardrixClaims> {
  const token = await user.getIdTokenResult();
  const claims = token.claims as Record<string, unknown>;
  return {
    tenant_id: typeof claims.tenant_id === "string" ? claims.tenant_id : undefined,
    role: typeof claims.role === "string" ? claims.role : undefined,
    plan: typeof claims.plan === "string" ? claims.plan : undefined,
  };
}

export function onAuthTokenChanged(cb: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  return onIdTokenChanged(auth, cb);
}

export async function signUpWithEmail(email: string, senha: string) {
  const auth = getFirebaseAuth();
  await setPersistence(auth, browserLocalPersistence);
  const cred = await createUserWithEmailAndPassword(auth, email, senha);
  return cred.user;
}
