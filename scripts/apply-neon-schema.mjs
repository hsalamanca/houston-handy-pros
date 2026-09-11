import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

const sql = neon(url);
const schema = readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8');
const statements = schema
  .split(';')
  .map((s) => s.replace(/--.*$/gm, '').trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}

const ping = await sql`SELECT now() AS now`;
console.log('Neon schema ready', ping[0].now);
