import 'dotenv/config'
import { confirm } from '@inquirer/prompts'
import { sql } from 'drizzle-orm'

import { db } from '.'

if (!('DATABASE_URL' in process.env)) throw new Error('DATABASE_URL not found in .env')

const main = async () => {
  const databaseUrl = process.env.DATABASE_URL
  const isRemoteDB = !(databaseUrl?.includes('localhost') || databaseUrl?.includes('127.0.0.1'))

  if (isRemoteDB) {
    console.info("⚠️ Be careful, You're dealing with a remote database.")
    const isConfirmed = await confirm({
      message: 'Are you sure you want to clean the remote database?',
      default: false,
    })

    if (!isConfirmed) {
      console.info('❌ Operation aborted.')
      return
    }
  }

  console.info('🌱 CLEANING STARTED')

  try {
    await db.transaction(async (tx) => {
      // Terminate all connections except our own
      await tx.execute(sql`
        SELECT pg_terminate_backend(pid)
        FROM pg_stat_activity
        WHERE pid <> pg_backend_pid()
        AND datname = current_database();
      `)

      // Check if pg_cron extension exists
      const pgCronExists = await tx.execute(sql`
        SELECT EXISTS(
          SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
        ) as exists;
      `)

      const hasPgCron = pgCronExists.rows[0]?.exists

      if (hasPgCron) {
        console.info('📅 pg_cron extension detected - preserving cron schema completely')
      }

      // Drop all schemas except system schemas and cron (if pg_cron exists)
      await tx.execute(sql`
        DO $$ DECLARE
          r RECORD;
        BEGIN
          FOR r IN (
            SELECT nspname 
            FROM pg_namespace 
            WHERE nspname NOT LIKE 'pg_%' 
              AND nspname != 'information_schema'
              AND nspname != 'cron'
          )
          LOOP
            EXECUTE 'DROP SCHEMA IF EXISTS ' || quote_ident(r.nspname) || ' CASCADE';
          END LOOP;
        END $$;
      `)

      // Recreate public schema
      await tx.execute(sql`CREATE SCHEMA public;`)

      // Reset all sequences in public schema
      await tx.execute(sql`
        DO $$ DECLARE
          r RECORD;
        BEGIN
          FOR r IN (SELECT sequencename FROM pg_sequences WHERE schemaname = 'public')
          LOOP
            EXECUTE 'ALTER SEQUENCE ' || quote_ident(r.sequencename) || ' RESTART WITH 1';
          END LOOP;
        END $$;
      `)

      // Reset search path
      await tx.execute(sql`SELECT set_config('search_path', 'public', false);`)

      // Grant privileges back to public
      await tx.execute(sql`
        GRANT ALL ON SCHEMA public TO public;
        GRANT ALL ON ALL TABLES IN SCHEMA public TO public;
        GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO public;
      `)
    })

    console.info('✅ CLEANING COMPLETED')
  } catch (error) {
    console.error('Error clearing database:', error)
    throw error
  }
}

main()
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
