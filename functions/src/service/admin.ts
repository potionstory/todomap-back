import { credential, initializeApp } from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";
import config from "./config";

const admin = initializeApp({
  credential: credential.cert({
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    projectId: serviceAccount.project_id,
  }),
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket,
});

export default admin;
