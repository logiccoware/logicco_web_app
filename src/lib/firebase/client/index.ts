import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBQGDxkEbETbe37yoGFlRDGTDf-IkZvLB4",
  authDomain: "logicco-dev.firebaseapp.com",
  databaseURL: "https://logicco-dev-default-rtdb.firebaseio.com",
  projectId: "logicco-dev",
  storageBucket: "logicco-dev.firebasestorage.app",
  messagingSenderId: "486871825594",
  appId: "1:486871825594:web:c67ea88068d94c298bd683",
};

export const firebaseApp = initializeApp(firebaseConfig);
