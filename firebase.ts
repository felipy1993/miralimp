import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase da Miralimp
const firebaseConfig = {
  apiKey: "AIzaSyCzijKh0O13qRk96ixS8B4jwCUfBwsih6M",
  authDomain: "miralimp.firebaseapp.com",
  databaseURL: "https://miralimp-default-rtdb.firebaseio.com",
  projectId: "miralimp",
  storageBucket: "miralimp.firebasestorage.app",
  messagingSenderId: "631219076852",
  appId: "1:631219076852:web:8fa66f128166199b4aa8a1"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias
export const db = getDatabase(app);
export const auth = getAuth(app);
