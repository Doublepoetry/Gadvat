import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const errors = [];
const err = (m) => errors.push(m);

let forts;
try { forts = JSON.parse(readFileSync('data/forts.json', 'utf8')); }
catch (e) { console.error('data/forts.json is not valid JSON: ' + e.message); process.exit(1); }
if (!Array.isArray(forts)) { console.error('data/forts.json must be an array'); process.exit(1); }

const TYPES = ['Hill', 'Sea', 'Coastal', 'Land'];
const REQ = ['id', 'name', 'name_marathi', 'type', 'location_accuracy'];
const WANT = ['district', 'region'];
const warnings = [];
const ACC = ['close', 'approx', 'rough', 'none'];
const ids = new Set();
for (const [i, f] of forts.entries()) {
  const at = `forts[${i}] ${f.id || ''} ${f.name || ''}`.trim();
  for (const k of REQ) if (f[k] === undefined || f[k] === '') err(`${at}: missing "${k}"`);
  for (const k of WANT) if (!f[k]) warnings.push(`${at}: no ${k} yet`);
  if (f.id && !/^F\d{3,}$/.test(f.id)) err(`${at}: id must look like F001`);
  if (ids.has(f.id)) err(`${at}: duplicate id`); ids.add(f.id);
  if (f.type && !TYPES.includes(f.type)) err(`${at}: type must be one of ${TYPES.join(', ')}`);
  if (f.location_accuracy && f.location_accuracy !== 'none' && (!f.latitude || !f.longitude)) err(`${at}: latitude/longitude required unless location_accuracy is none`);
  const lat = +f.latitude, lon = +f.longitude;
  if (f.latitude !== '' && (isNaN(lat) || lat < 15.5 || lat > 22.2)) err(`${at}: latitude outside Maharashtra`);
  if (f.longitude !== '' && (isNaN(lon) || lon < 72.5 || lon > 81)) err(`${at}: longitude outside Maharashtra`);
  if (f.location_accuracy && !ACC.includes(f.location_accuracy)) err(`${at}: location_accuracy must be one of ${ACC.join(', ')}`);
  if (f.elevation_m !== undefined && f.elevation_m !== '' && isNaN(+f.elevation_m)) err(`${at}: elevation_m must be a number`);
}

const IMG = ['.jpg', '.jpeg', '.png', '.webp'];
const walk = (d) => readdirSync(d).flatMap(n => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
if (existsSync('content')) {
  for (const dir of readdirSync('content')) {
    const p = join('content', dir);
    if (!statSync(p).isDirectory()) continue;
    if (!ids.has(dir)) err(`${p}: folder name must be a fort id from data/forts.json`);
    for (const file of walk(p)) {
      const ext = extname(file).toLowerCase();
      if (IMG.includes(ext) && statSync(file).size > 1024 * 1024) err(`${file}: image over 1 MB`);
      if (file.includes(join('routes', '')) && ext === '.md' && !/Last walked:\s*\S/i.test(readFileSync(file, 'utf8'))) err(`${file}: route needs a "Last walked:" line`);
    }
  }
}

if (warnings.length) console.log(`! ${warnings.length} gaps to fill (not blocking):\n` + warnings.map(w => '  ' + w).join('\n') + '\n');
if (errors.length) { console.error(errors.map(e => '✗ ' + e).join('\n')); console.error(`\n${errors.length} problem(s) found.`); process.exit(1); }
console.log(`✓ ${forts.length} forts OK`);
