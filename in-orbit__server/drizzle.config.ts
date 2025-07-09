import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'

export default defineConfig({
  schema: './src/db/schema.ts',

  // Caminho de onde ficarão as migrations
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // Url do banco de dados
    url: env.DATABASE_URL,
  },
})
