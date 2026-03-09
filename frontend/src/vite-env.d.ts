/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_YOUTUBE_API_KEY?: string
  readonly VITE_MEDIA_CLOUD_API_KEY?: string
  readonly VITE_MEDIA_CLOUD_COLLECTION_IDS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
