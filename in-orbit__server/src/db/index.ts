// Esse arquivo faz a conexão com o banco de dados

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../env'

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema, logger: true }) // logger: true -> Mostra todas as queries feitas no banco no terminal
