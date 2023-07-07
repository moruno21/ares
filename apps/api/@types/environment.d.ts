declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EVENTSTOREDB_URI: string
      MONGODB_URI: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}
