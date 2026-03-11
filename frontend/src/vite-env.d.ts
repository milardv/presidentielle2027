/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_YOUTUBE_API_KEY?: string
  readonly VITE_MEDIA_CLOUD_API_KEY?: string
  readonly VITE_MEDIA_CLOUD_COLLECTION_IDS?: string
  readonly VITE_ADMIN_SYNC_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
