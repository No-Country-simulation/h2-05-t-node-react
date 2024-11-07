/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_URL: string;
    // Declara otras variables de entorno de Vite aquí si tienes más
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  