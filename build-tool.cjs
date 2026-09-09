const fs=require('fs'),path=require('path'),root=__dirname;
const data=fs.readFileSync(path.join(root,'example.orb.txt'),'utf8'),brief=fs.readFileSync(path.join(root,'authoring-brief.txt'),'utf8');
const result=require('./orb-file.js').parse(data);if(result.errors.length)throw Error(result.errors.join('\n'));
const runtime=fs.readFileSync(path.join(root,'tool.js'),'utf8').split('// BEGIN GENERATED DATA')[0];
fs.writeFileSync(path.join(root,'tool.js'),runtime+'// BEGIN GENERATED DATA\nconst ORB_EXAMPLE='+JSON.stringify(result.data)+';\n$("brief").value='+JSON.stringify(brief)+';\n');
console.log('Built ORB Share example and authoring brief.');
