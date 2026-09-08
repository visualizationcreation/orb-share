'use strict';
let copyTimer;
document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const field=document.getElementById(button.dataset.copy),status=document.getElementById('copy-status');
  try {await navigator.clipboard.writeText(field.value);status.textContent='Copied. Ready to paste.';}
  catch {field.focus();field.select();status.textContent='Copy the highlighted text.';}
  clearTimeout(copyTimer);copyTimer=setTimeout(()=>{status.textContent='';},5000);
}));
const form=document.getElementById('intake-form'),result=document.getElementById('generated');
form.addEventListener('input',()=>{result.hidden=true;});
form.addEventListener('submit',event=>{
  event.preventDefault();result.hidden=true;const error=document.getElementById('form-error');error.textContent='';
  try {
    const f=new FormData(form),read=k=>String(f.get(k)||'').trim();
    const title=read('title'),credit=read('credit'),summary=read('summary'),url=read('url'),attach=f.has('attach');
    if(title.length<3||credit.length<1||summary.length<20)throw Error('Add a title, creator credit and a description of at least 20 characters.');
    if(/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(title+credit+summary))throw Error('Please use readable text in your submission.');
    if(!url&&!attach)throw Error('Provide a link, or choose to attach your HTML/ZIP file on GitHub.');
    if(url){let u;try{u=new URL(url);}catch{throw Error('Enter a valid public HTTPS link.');}if(u.protocol!=='https:'||u.username||u.password||u.port||['localhost','127.0.0.1','[::1]'].includes(u.hostname))throw Error('Use a public HTTPS link without passwords or local addresses.');}
    if(!['format','rights','public'].every(k=>f.has(k)))throw Error('Please confirm the format, sharing permission and public submission requirements.');
    const body=['## ORB submission','', '### ORB title',title,'','### Creator credit',credit,'','### Original perspective / audience',summary,'','### ORB link or file',url||'I will attach the HTML/ZIP below before submitting.',attach?'File attachment: please see attached HTML/ZIP.':'','','### Creator confirmations','- [x] I used the ORB Skill or its published ORB prompt and checked the required ORB format.','- [x] I created this contribution or have permission to submit it, and permit ORB Archive to host and feature this submitted edition with creator credit.','- [x] I understand this submission and its attachments are public and featuring requires owner approval.','','---','Intake only. No approval or publication is implied.'].join('\n');
    const destination=new URL('https://github.com/visualizationcreation/orb-share/issues/new');destination.searchParams.set('title','ORB submission: '+title);destination.searchParams.set('body',body);
    const longLink=destination.href.length>7000;
    if(longLink)destination.searchParams.delete('body');
    document.getElementById('submission-text').value=body;document.getElementById('github-submit').href=destination.href;
    document.getElementById('next-step').textContent=(longLink?'Your text is too long for a prefilled link. Open the preview below and copy the submission text, then paste it into the GitHub description. ':'')+(attach?'Attach your HTML or ZIP in the GitHub description box before sending. This page has not uploaded your file.':'Your link and creator details are ready. Open GitHub to review and send them.');
    result.hidden=false;result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }catch(e){error.textContent=e.message;}
});
