// Run before and after every LIVE schedule update: npm run validate-lives
// This is a consistency check, NOT a replacement for checking official sources.
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const begin = source.indexOf('const liveEvents = [');
if (begin < 0) throw Error('liveEvents not found');
const after = source.slice(begin);
const close = after.indexOf('\n];');
if (close < 0) throw Error('liveEvents closing marker not found');
const events = after.slice(0, close).split(/\n  \{(?=\s*\n?\s*id:)/).map((part,i) => i === 0 ? part.slice(part.indexOf('  {') + 3) : part).filter(part => /\bid:\s*'/.test(part));
const field = (s, name) => s.match(new RegExp('\\b' + name + ":\\s*'([^']*)'"))?.[1] ?? '';
const time = (s, label) => {
  const match = s.match(new RegExp('(?:' + label + ')\\s*(\\d{1,2}):(\\d{2})', 'i'));
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
};
const hhmm = (s) => [...s.matchAll(/(\\d{1,2}):(\\d{2})/g)].map(m => Number(m[1])*60+Number(m[2]));
const errors = [], ids = new Set();
for (const block of events) {
  const id=field(block,'id'), status=field(block,'status'), date=field(block,'date');
  if (!id || !date) { errors.push('Missing id/date: ' + block.slice(0,70)); continue; }
  if (ids.has(id)) errors.push(id+': duplicate id');
  ids.add(id);
  if (status !== 'published') continue;
  const os=field(block,'openStart'), perf=field(block,'performance'), until=field(block,'homeUntil');
  const open=time(os,'OPEN|開場'), start=time(os,'START|開演');
  const stages=[...perf.matchAll(/🎤\\s*(\\d{1,2}):(\\d{2})\\s*[–〜~-]\\s*(\\d{1,2}):(\\d{2})/g)]
    .map(m=>[Number(m[1])*60+Number(m[2]),Number(m[3])*60+Number(m[4])]);
  const meets=[...perf.matchAll(/📸[^\\d]*?(\\d{1,2}):(\\d{2})\\s*[–〜~-]\\s*(\\d{1,2}):(\\d{2})/g)]
    .map(m=>[Number(m[1])*60+Number(m[2]),Number(m[3])*60+Number(m[4])]);
  if(open!==null && start!==null && open>start) errors.push(id+': OPEN later than START');
  for(const [a,b] of [...stages,...meets]) if(a>=b) errors.push(id+': invalid time interval');
  if(start!==null) for(const [a] of stages) if(a<start) errors.push(id+': performance earlier than event START');
  if(until && (stages.length || meets.length)) {
    const last=Math.max(...[...stages,...meets].map(pair=>pair[1]));
    const u=hhmm(until).at(-1);
    if(u!==undefined && u<last) errors.push(id+': homeUntil earlier than end of performance/meet');
  }
}
if(errors.length){console.error('LIVE VALIDATION FAILED ('+errors.length+'):\n'+errors.join('\n'));process.exitCode=1;}
else console.log('LIVE VALIDATION OK: '+events.length+' records checked');
