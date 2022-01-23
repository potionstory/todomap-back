import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import admin from "./admin";
import config from "./config";

const app = initializeApp(config);
const auth = getAuth(app);
const db = admin.firestore();

export { admin, auth, config, db };
