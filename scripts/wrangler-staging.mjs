// Escribe ./wrangler.jsonc para desplegar staging desde CI (C22).
// Parte del wrangler.jsonc del repo (así hereda crons, límites y compatibilidad) y solo cambia
// lo propio de staging: nombre del Worker, D1 con su id y variables de la tienda. Staging no
// tiene R2, igual que la configuración que se desplegaba a mano. Solo se usa en una copia
// desechable del repo (el checkout de Actions); en local sigue el despliegue manual.
// uso: D1_DATABASE_ID=... node scripts/wrangler-staging.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'jsonc-parser';

const id = process.env.D1_DATABASE_ID ?? '';
if (!/^[0-9a-f-]{36}$/.test(id)) throw new Error('D1_DATABASE_ID ausente o con forma rara');

const base = parse(readFileSync('wrangler.jsonc', 'utf8'));
const config = {
  ...base,
  name: 'automatizasinhumo-staging',
  d1_databases: [{ binding: 'DB', database_name: 'automatizasinhumo-staging-db', database_id: id, migrations_dir: 'migrations' }],
  vars: { ...(base.vars ?? {}), STORE_NAME: 'Automatiza sin humo', TIME_ZONE: 'Europe/Madrid' },
};
delete config.r2_buckets;
delete config.$schema;
writeFileSync('wrangler.jsonc', JSON.stringify(config, null, 2) + '\n');
console.log(`wrangler.jsonc de staging listo (${config.name}, ${Object.keys(config).length} claves)`);
