const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const root=document.getElementById('galeria');
const lightbox=document.getElementById('lightbox'); const lbImg=document.getElementById('lightbox-img'); const lbCaption=document.getElementById('lightbox-caption');
let galleryFlat=[]; let current=0;
function renderGallery(){
  root.innerHTML=''; galleryFlat=[];
  Object.entries(window.GALLERY_DATA).forEach(([group,items])=>{
    const section=document.createElement('section'); section.className='gallery-group';
    const title=document.createElement('div'); title.className='gallery-title'; title.innerHTML=`<h3>${group}</h3><span></span>`; section.appendChild(title);
    const grid=document.createElement('div'); grid.className='gallery-grid';
    items.slice(0,9).forEach((file,i)=>{
      const idx=galleryFlat.length; galleryFlat.push({file,group});
      const button=document.createElement('button'); button.className='gallery-item'; button.type='button';
      button.innerHTML=`<img loading="lazy" src="assets/gallery/${file}" alt="${group} - 24/6 Ingeniería">`;
      button.addEventListener('click',()=>openLightbox(idx)); grid.appendChild(button);
    }); section.appendChild(grid); root.appendChild(section);
  });
}
function openLightbox(i){current=i;const item=galleryFlat[current];lbImg.src=`assets/gallery/${item.file}`;lbImg.alt=`${item.group} - 24/6 Ingeniería`;lbCaption.textContent=item.group;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll')}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll')}
function move(dir){current=(current+dir+galleryFlat.length)%galleryFlat.length;openLightbox(current)}
document.querySelector('.lightbox-close').addEventListener('click',closeLightbox);document.querySelector('.lightbox-prev').addEventListener('click',()=>move(-1));document.querySelector('.lightbox-next').addEventListener('click',()=>move(1));lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)});
renderGallery();

document.getElementById('contact-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const subject=encodeURIComponent(`Consulta web 24/6 Ingeniería - ${f.get('necesidad')}`);const body=encodeURIComponent(`Nombre: ${f.get('nombre')}\nEmpresa / organización: ${f.get('empresa')||'-'}\nTeléfono: ${f.get('telefono')}\nCorreo: ${f.get('correo')}\nNecesidad: ${f.get('necesidad')}\n\nMensaje:\n${f.get('mensaje')||'-'}`);window.location.href=`mailto:246proyectos@gmail.com?subject=${subject}&body=${body}`});
