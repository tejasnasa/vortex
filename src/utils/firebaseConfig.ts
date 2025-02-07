import { initializeApp } from "firebase/app";
import { config } from "dotenv";

config();
const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTH_DOMAIN}`,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: `${process.env.STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.MESSAGING_SENDERID}`,
  appId: `${process.env.APPID}`,
  measurementId: `${process.env.MEASURE_ID}`,
};

export const firebaseApp = initializeApp(firebaseConfig);
