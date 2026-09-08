'use strict';
let copyTimer;
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const field = document.getElementById(button.dataset.copy), status = document.getElementById('copy-status');
  try {await navigator.clipboard.writeText(field.value); status.textContent = 'Copied. Ready to paste.';}
  catch {field.focus(); field.select(); status.textContent = 'Select and copy the highlighted text.';}
  clearTimeout(copyTimer); copyTimer = setTimeout(() => {status.textContent = '';}, 5000);
}));
const form = document.getElementById('listing-form');
form.addEventListener('submit', event => {
  event.preventDefault(); const result = document.getElementById('generated'), error = document.getElementById('form-error');
  result.hidden = true; error.textContent = '';
  try {
    const f = new FormData(form), text = k => String(f.get(k) || '').trim();
    const safeURL = value => {const u = new URL(value); if (u.protocol !== 'https:' || u.username || u.password || u.port || ['localhost','127.0.0.1','[::1]'].includes(u.hostname) || value.length > 500 || /[\x00-\x20<>]/.test(value)) throw Error('Use public HTTPS URLs without credentials, spaces or ports.'); return u.href;};
    const title = text('title'), description = text('description'), creator = text('creator');
    const tags = [...new Set(text('tags').split(',').map(t => t.trim()).filter(Boolean))];
    if (title.length < 3 || description.length < 20 || /[\x00-\x1f<>]/.test(title + description)) throw Error('Use a plain-text title (3–100 characters) and description (20–300 characters).');
    if (tags.length < 1 || tags.length > 5 || tags.some(t => t.length < 2 || t.length > 30 || /[\x00-\x1f<>]/.test(t))) throw Error('Use 1–5 tags, each 2–30 plain-text characters.');
    const repository = safeURL(text('repository')).replace(/\/$/,'');
    if (!/^https:\/\/github\.com\/[a-z\d-]+\/[\w.-]+$/i.test(repository)) throw Error('Use a GitHub repository URL such as https://github.com/username/repository.');
    const id = (creator + '-' + title).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').slice(0,100).replace(/-$/,'');
    const listing = {id, title, creator, description, url:safeURL(text('url')), repository, revision:text('revision').toLowerCase(), tags, media:{audio:f.has('audio'),video:f.has('video')}};
    document.getElementById('listing-json').value = JSON.stringify(listing,null,2);
    result.hidden = false; result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  } catch (e) {error.textContent = e.message;}
});
