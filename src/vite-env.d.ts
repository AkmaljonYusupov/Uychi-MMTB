/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // boshqa environment o'zgaruvchilari
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface Timeout extends globalThis.Timeout {}
  interface Timer extends globalThis.Timer {}
}