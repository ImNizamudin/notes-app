export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export type urlBackend = string;

export const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyDH_mJmXLCxq9CcRnEAOodAd_SImwu_QcI",
    authDomain: "fir-ta2022.firebaseapp.com",
    databaseURL: "https://fir-ta2022-default-rtdb.firebaseio.com",
    projectId: "fir-ta2022",
    storageBucket: "fir-ta2022.appspot.com",
    messagingSenderId: "816629212476",
    appId: "1:816629212476:web:e0a68590a7b9935761aa39",
    measurementId: "G-V7H17Q6ZFL"
};

export const urlBackend: urlBackend = "https://dev-notesapp.radarku.online";``