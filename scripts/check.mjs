import {readFile,access} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
execFileSync(process.execPath,['--check',fileURLToPath(new URL('dist/app.js',root))],{stdio:'inherit'});
const html=await readFile(new URL('dist/index.html',root),'utf8');
for(const file of ['dist/style.css','dist/assets/intro.mp4']) await access(new URL(file,root));
if(!html.includes('app.js')||!html.includes('style.css')) throw new Error('Missing entry references');
console.log('確認完了 — dist がそのまま公開対象です コンパイルは不要です');
