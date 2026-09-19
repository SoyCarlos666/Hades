const KEY="HADES666_PORTFOLIO_V3", PASSWORD="Hades661";
let data=window.PORTFOLIO_CONFIG;
const saved=localStorage.getItem(KEY); if(saved) try{data=JSON.parse(saved)}catch(e){}
const $=s=>document.querySelector(s);
function save(){localStorage.setItem(KEY,JSON.stringify(data)); alert("Cambios guardados en este navegador.");}
function download(){const blob=new Blob(["window.PORTFOLIO_CONFIG = "+JSON.stringify(data,null,2)+";"],{type:"text/javascript"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="config.js";a.click();URL.revokeObjectURL(a.href)}
function render(){
$("#editor").innerHTML=`
<h2>Identidad</h2><div class="grid">
${field("identity.name","Nombre",data.identity.name)}
${field("identity.role","Rol",data.identity.role)}
${field("identity.location","Ubicación / enfoque",data.identity.location)}
${field("identity.logo","URL del logo",data.identity.logo)}
</div>
<h2>Hero</h2><div class="grid">${field("hero.eyebrow","Etiqueta",data.hero.eyebrow)}${field("hero.title","Título",data.hero.title)}${field("hero.text","Descripción",data.hero.text)}${field("hero.primaryButton","Botón 1",data.hero.primaryButton)}${field("hero.secondaryButton","Botón 2",data.hero.secondaryButton)}</div>
<h2>Presentación</h2>${field("presentation.title","Título",data.presentation.title)}${area("presentation.text","Texto",data.presentation.text)}
<h2>Sobre mí</h2>${area("about.text","Descripción",data.about.text)}${arrayEditor("about.points","Puntos",data.about.points)}
<h2>Cómo trabajo</h2>${area("work.intro","Introducción",data.work.intro)}${objectArrayEditor("work.steps","Pasos",data.work.steps,["number","title","text"])}
<h2>Qué hago</h2>${objectArrayEditor("services.items","Servicios",data.services.items,["title","text"])}
<h2>Estadísticas</h2>${objectArrayEditor("stats","Estadísticas",data.stats,["value","label"])}
<h2>Experiencia</h2>${area("experience.text","Descripción",data.experience.text)}${arrayEditor("experience.items","Responsabilidades",data.experience.items)}
<h2>Proyectos</h2>${objectArrayEditor("projects.items","Proyectos",data.projects.items,["name","role","status","text"])}
<h2>Valores</h2>${objectArrayEditor("values.items","Principios",data.values.items,["title","text"])}
<h2>Proceso</h2>${area("process.text","Descripción",data.process.text)}${arrayEditor("process.items","Pasos",data.process.items)}
<h2>Referencias</h2>${objectArrayEditor("testimonials.items","Referencias",data.testimonials.items,["name","role","text"])}
<h2>Contacto</h2><div class="grid">${field("contact.title","Título",data.contact.title)}${field("contact.discord","Discord URL",data.contact.discord)}${field("contact.discordText","Texto botón",data.contact.discordText)}</div>${area("contact.text","Texto",data.contact.text)}
<h2>Colores</h2><div class="grid">${field("theme.accent","Color principal",data.theme.accent)}${field("theme.accent2","Color secundario",data.theme.accent2)}${field("theme.background","Fondo",data.theme.background)}${field("theme.card","Tarjetas",data.theme.card)}</div>`;
bind();
}
function get(path){return path.split(".").reduce((o,k)=>o?.[k],data)}
function set(path,v){let p=path.split("."),o=data;for(let i=0;i<p.length-1;i++)o=o[p[i]];o[p.at(-1)]=v}
function field(path,label,value){return `<label>${label}<input data-path="${path}" value="${String(value??"").replace(/"/g,"&quot;")}"></label>`}
function area(path,label,value){return `<label>${label}<textarea data-path="${path}">${String(value??"")}</textarea></label>`}
function arrayEditor(path,label,arr){return `<div class="arraybox"><b>${label}</b>${arr.map((v,i)=>`<div class="row"><input data-array="${path}" data-index="${i}" value="${String(v??"").replace(/"/g,"&quot;")}"><button class="del" data-del="${path}" data-index="${i}">×</button></div>`).join("")}<button class="add" data-add="${path}">+ Agregar</button></div>`}
function objectArrayEditor(path,label,arr,keys){return `<div class="arraybox"><b>${label}</b>${arr.map((obj,i)=>`<div class="obj">${keys.map(k=>`<input placeholder="${k}" data-obj="${path}" data-index="${i}" data-key="${k}" value="${String(obj[k]??"").replace(/"/g,"&quot;")}">`).join("")}<button class="del" data-objdel="${path}" data-index="${i}">Eliminar</button></div>`).join("")}<button class="add" data-objadd="${path}">+ Agregar</button></div>`}
function bind(){
document.querySelectorAll("[data-path]").forEach(x=>x.oninput=()=>set(x.dataset.path,x.value));
document.querySelectorAll("[data-array]").forEach(x=>x.oninput=()=>data[x.dataset.array][+x.dataset.index]=x.value);
document.querySelectorAll("[data-obj]").forEach(x=>x.oninput=()=>data[x.dataset.obj][+x.dataset.index][x.dataset.key]=x.value);
document.querySelectorAll("[data-add]").forEach(x=>x.onclick=()=>{data[x.dataset.add].push("");render()});
document.querySelectorAll("[data-del]").forEach(x=>x.onclick=()=>{data[x.dataset.del].splice(+x.dataset.index,1);render()});
document.querySelectorAll("[data-objadd]").forEach(x=>{x.onclick=()=>{const keys={ "work.steps":["number","title","text"],"services.items":["title","text"],"stats":["value","label"],"projects.items":["name","role","status","text"],"values.items":["title","text"],"testimonials.items":["name","role","text"]}[x.dataset.objadd]||["title","text"];let o={};keys.forEach(k=>o[k]="");data[x.dataset.objadd].push(o);render()}});
document.querySelectorAll("[data-objdel]").forEach(x=>x.onclick=()=>{data[x.dataset.objdel].splice(+x.dataset.index,1);render()});
}
function login(){if($("#pass").value===PASSWORD){$("#login").style.display="none";$("#app").style.display="block";render()}else $("#error").textContent="Contraseña incorrecta."}
document.addEventListener("DOMContentLoaded",()=>{$("#enter").onclick=login;$("#pass").onkeydown=e=>e.key==="Enter"&&login();$("#save").onclick=save;$("#download").onclick=download;$("#reset").onclick=()=>{if(confirm("¿Restaurar configuración original?")){localStorage.removeItem(KEY);location.reload()}}});
