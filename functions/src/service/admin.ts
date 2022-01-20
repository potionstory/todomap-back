import * as admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";
import config from "./config";

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    projectId: serviceAccount.project_id,
  }),
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket,
});

export const db = admin.firestore();
