'use strict';
const $=s=>document.querySelector(s);
const menu=$('.menu-toggle');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'收起导航':'展开导航');$('#nav-links').classList.toggle('open',open);});
document.querySelectorAll('#nav-links a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','展开导航');$('#nav-links').classList.remove('open');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');$('#nav-links').classList.remove('open');}});
const screenshotNames={overview:'身体总览',trends:'变化趋势',photos:'阶段照片'};
document.querySelectorAll('[data-screenshot]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.screenshot,dialog=$('.image-dialog');dialog.querySelector('img').src='assets/'+key+'-real.jpg';dialog.querySelector('img').alt='myBody '+screenshotNames[key]+'截图大图';dialog.showModal();}));
$('.close-image').addEventListener('click',()=>$('.image-dialog').close());
$('.image-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close();});
let toastTimer;function toast(text){$('.toast').textContent=text;$('.toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('.toast').classList.remove('visible'),3000);}
const CHECKSUM='8bebb25845cb830f471511f9400d5f2158f83b574723f5cee69163d44aad56ad';
$('#copy-checksum').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(CHECKSUM);toast('校验值已复制');}catch{toast('无法自动复制，请长按或选中校验值复制。');}});
let controller;
$('#cancel-download').addEventListener('click',()=>controller?.abort());
$('#download-apk').addEventListener('click',async()=>{
 if(controller)return;
 controller=new AbortController();const signal=controller.signal,button=$('#download-apk');button.disabled=true;$('.download-progress').hidden=false;$('#download-error').textContent='';$('#download-progress').value=0;
 try{
  const chunks=[];let received=0;
  for(let i=1;i<=3;i++){
   const response=await fetch(`downloads/myBody-0.6.0.part${i}`,{signal});if(!response.ok)throw new Error('download');
   const reader=response.body.getReader();
   for(;;){const {value,done}=await reader.read();if(done)break;chunks.push(value);received+=value.byteLength;$('#download-progress').value=received;$('#download-status').textContent=`正在下载 ${Math.min(100,Math.round(received/47001102*100))}% · ${(received/1048576).toFixed(1)} / 44.8 MiB`;}
  }
  if(received!==47001102)throw new Error('incomplete');
  $('#download-status').textContent='正在校验安装包…';
  const blob=new Blob(chunks,{type:'application/vnd.android.package-archive'});
  const hash=await crypto.subtle.digest('SHA-256',await blob.arrayBuffer());const hex=[...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('');if(hex!==CHECKSUM)throw new Error('checksum');
  if(signal.aborted)throw new DOMException('Aborted','AbortError');
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='myBody-0.6.0-internal.apk';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);$('#download-status').textContent='校验通过，安装包已交给浏览器保存。';toast('下载就绪，请在 Android 上打开 APK 安装。');
 }catch(error){if(error.name==='AbortError'){$('#download-status').textContent='下载已取消';}else{$('#download-error').textContent=error.message==='checksum'?'安装包校验未通过，请重新下载。':'下载暂未完成，请检查网络后重试。';$('#download-status').textContent='下载未完成';}}
 finally{controller=null;button.disabled=false;}
});
