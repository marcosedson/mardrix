import * as admin from "firebase-admin";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

export function getFirebaseAdmin() {
  if (admin.apps.length) return admin.app();

  if (serviceAccount) {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // Fallback para ADC (Application Default Credentials) em prod (Google Cloud)
  return admin.initializeApp();
}

export async function verifyIdToken(token: string) {
  const app = getFirebaseAdmin();
  return app.auth().verifyIdToken(token);
}
