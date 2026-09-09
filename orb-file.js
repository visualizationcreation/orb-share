/* ORB File 1 · shared, dependency-free validation. Input remains authored data. */
(function(root){
 'use strict';
 const directions=['up','down','left','right','forward','backward'];
 const MAX_BYTES=2*1024*1024;
 function validate(data){
  const errors=[],warnings=[];
  const fail=(path,message)=>errors.push(path+': '+message);
  const object=(v,path,keys)=>{if(!v||typeof v!=='object'||Array.isArray(v)){fail(path,'expected an object');return false;}for(const key of Object.keys(v))if(!keys.includes(key))fail(path+'.'+key,'unsupported field in ORB File 1; keep it in the original file until it can be mapped');return true;};
  const text=(v,path,max=100000)=>{if(typeof v!=='string'||!v.trim()||v.length>max){fail(path,'expected nonempty text, at most '+max+' characters');return false;}return true;};
  const id=(v,path)=>{if(typeof v!=='string'||!/^[-a-zA-Z0-9_.]{1,80}$/.test(v))fail(path,'use 1–80 letters, numbers, hyphens, underscores or dots');};
  const array=(v,path,max)=>{if(!Array.isArray(v)||v.length>max){fail(path,'expected a list of at most '+max+' items');return false;}return true;};
  if(!object(data,'ORB',['format','formatVersion','id','title','summary','creator','edition','authorship','entry','points','route','scripts']))return {errors,warnings};
  if(data.format!=='orb')fail('format','must be "orb"');
  if(data.formatVersion!==1)fail('formatVersion','this reader supports version 1 only; the original file has not been changed');
  id(data.id,'id');text(data.title,'title',80);text(data.summary,'summary',400);text(data.creator,'creator',60);text(data.edition,'edition',80);id(data.entry,'entry');
  if(data.authorship!==undefined&&object(data.authorship,'authorship',['modelLabel','modelId','skillVersion']))for(const [k,v]of Object.entries(data.authorship))if(v!==null)text(v,'authorship.'+k,150);
  const ids=new Set();
  if(array(data.points,'points',200)){
   if(!data.points.length)fail('points','include at least one authored point');
   data.points.forEach((p,i)=>{
    const at='points['+i+']';if(!object(p,at,['id','title','reading','sources','thread','links','floor']))return;
    id(p.id,at+'.id');if(ids.has(p.id))fail(at+'.id','duplicate point ID');ids.add(p.id);
    text(p.title,at+'.title',160);text(p.reading,at+'.reading');text(p.thread,at+'.thread',160);
    if(array(p.sources,at+'.sources',40)){if(!p.sources.length)warnings.push(p.title+': no sources recorded. Check whether its claims need evidence.');p.sources.forEach((s,n)=>{if(!object(s,at+'.sources['+n+']',['title','url']))return;text(s.title,at+'.source.title',300);try{const u=new URL(s.url);if(u.protocol!=='https:'||u.username||u.password)throw Error();}catch{fail(at+'.source.url','use an HTTPS source URL without credentials');}});}
    if(object(p.links,at+'.links',directions))for(const dir of directions){const l=p.links[dir];if(!object(l,at+'.links.'+dir,['to','label','reason']))continue;if(l.to!==undefined){id(l.to,at+'.links.'+dir+'.to');text(l.label,at+'.links.'+dir+'.label',160);if(l.reason!==undefined)fail(at+'.links.'+dir,'choose a destination or an unavailable reason');}else{text(l.reason,at+'.links.'+dir+'.reason',400);if(l.label!==undefined)fail(at+'.links.'+dir,'an unavailable direction uses reason only');}}
    if(p.floor!==undefined&&object(p.floor,at+'.floor',['kind','known','question','unknown'])){if(!['open-question','unresearched','hypothesis'].includes(p.floor.kind))fail(at+'.floor.kind','use open-question, unresearched or hypothesis');for(const key of ['known','question','unknown'])text(p.floor[key],at+'.floor.'+key,5000);}
   });
   if(!ids.has(data.entry))fail('entry','does not refer to an existing point');
   for(const p of data.points)for(const [dir,l]of Object.entries(p?.links||{}))if(l?.to&&!ids.has(l.to))fail(String(p.id)+'.'+dir,'destination "'+l.to+'" is missing');
  }
  if(array(data.route,'route',200)){const routeIds=new Set();for(const pointId of data.route){if(!ids.has(pointId))fail('route','unknown point "'+pointId+'"');if(routeIds.has(pointId))fail('route','duplicate point "'+pointId+'"');routeIds.add(pointId);}if(!data.route.length)fail('route','include at least one point');if(data.route.length<ids.size)warnings.push('The spiral route covers a selection of points; all points remain available in the map list.');}
  if(data.scripts!==undefined&&array(data.scripts,'scripts',10)){const scriptIds=new Set();for(const s of data.scripts){if(!object(s,'script',['id','title','mode','revision','passages']))continue;id(s.id,'script.id');if(scriptIds.has(s.id))fail('script.id','duplicate script ID');scriptIds.add(s.id);text(s.title,'script.title',160);text(s.revision,'script.revision',80);if(!['learn','feel'].includes(s.mode))fail('script.mode','use learn or feel');if(array(s.passages,'script.passages',1000)){if(!s.passages.length)fail('script.passages','include at least one passage');for(const p of s.passages){if(!object(p,'passage',['point','text']))continue;if(!ids.has(p.point))fail('passage.point','unknown point');text(p.text,'passage.text');}}}}
  if(!errors.length){const seen=new Set([data.entry]),queue=[data.entry];while(queue.length){const next=queue.shift(),p=data.points.find(p=>p.id===next);for(const l of Object.values(p.links))if(l.to&&!seen.has(l.to)){seen.add(l.to);queue.push(l.to);}}if(seen.size<ids.size)warnings.push('Some points cannot be reached from the entry through the compass. They remain available in the map list; review the connections.');}
  return {errors,warnings};
 }
 function parse(raw){if(new TextEncoder().encode(raw).length>MAX_BYTES)throw Error('This reader accepts ORB files up to 2 MB.');let data;try{data=JSON.parse(raw.replace(/^\uFEFF/,''));}catch{throw Error('This is not an ORB File 1 JSON document. Use the authoring brief and example; legacy terrain files need conversion.');}const result=validate(data);return {...result,data};}
 const api={directions,MAX_BYTES,validate,parse};if(typeof module!=='undefined')module.exports=api;else root.OrbFile=api;
})(globalThis);
