// Validate data, never execute files or scripts from a contributor's repository.
const fs = require('node:fs');
function validate(data) {
  const errors = [], ids = new Set(), urls = new Set();
  const issue = (i, message) => errors.push(`Entry ${i + 1}: ${message}`);
  if (!data || data.schemaVersion !== 1 || !Array.isArray(data.orbs)) return ['Expected schemaVersion 1 and an orbs array.'];
  if (data.orbs.length > 1000) errors.push('Catalogue exceeds 1000 entries.');
  const string = (s, min, max) => typeof s === 'string' && s.length >= min && s.length <= max && s === s.trim() && !/[\x00-\x1f<>]/.test(s);
  const https = s => {try {const u = new URL(s); return string(s, 8, 500) && u.protocol === 'https:' && !u.username && !u.password && !u.port && !['localhost','127.0.0.1','[::1]'].includes(u.hostname);} catch {return false;}};
  data.orbs.forEach((o, i) => {
    if (!o || typeof o !== 'object' || Array.isArray(o)) {issue(i,'expected an object'); return;}
    const allowed = ['id','title','creator','description','url','repository','revision','tags','media'];
    for (const key of Object.keys(o)) if (!allowed.includes(key)) issue(i,`unknown field ${key}`);
    if (!string(o.id, 3, 100) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(o.id)) issue(i,'id must be a lowercase hyphenated slug');
    if (ids.has(o.id)) issue(i,'duplicate id'); ids.add(o.id);
    if (!string(o.title, 3, 100)) issue(i,'title must be 3–100 plain-text characters');
    if (!string(o.description, 20, 300)) issue(i,'description must be 20–300 plain-text characters');
    if (!string(o.creator, 1, 39) || !/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(o.creator)) issue(i,'invalid GitHub username');
    if (!https(o.url)) issue(i,'live URL must be a public HTTPS URL without credentials or a port');
    if (urls.has(o.url)) issue(i,'duplicate live URL'); urls.add(o.url);
    if (!https(o.repository) || !/^https:\/\/github\.com\/[a-z\d-]+\/[\w.-]+$/i.test(o.repository)) issue(i,'repository must be a GitHub repository URL without a trailing slash');
    if (!/^[a-f\d]{40}$/.test(o.revision || '')) issue(i,'revision must be a full lowercase 40-character commit SHA');
    if (!Array.isArray(o.tags) || o.tags.length < 1 || o.tags.length > 5 || o.tags.some(t => !string(t, 2, 30)) || new Set(o.tags).size !== o.tags.length) issue(i,'provide 1–5 unique plain-text tags, 2–30 characters each');
    if (!o.media || typeof o.media.audio !== 'boolean' || typeof o.media.video !== 'boolean' || Object.keys(o.media).some(k => !['audio','video'].includes(k))) issue(i,'media must contain boolean audio and video fields');
  });
  return errors;
}
if (require.main === module) {
  try {
    const path = process.argv[2] || require('node:path').join(__dirname,'orbs.json');
    if (fs.statSync(path).size > 2000000) throw Error('Manifest exceeds 2 MB.');
    const errors = validate(JSON.parse(fs.readFileSync(path,'utf8')));
    if (errors.length) throw Error(errors.join('\n'));
    console.log('Catalogue valid. Owner review is still required before merge.');
  } catch (e) {console.error(e.message); process.exitCode = 1;}
}
module.exports = {validate};
