(()=>{
const defaults=window.PORTFOLIO_CONFIG||{};
const saved=localStorage.getItem("HADES666_PORTFOLIO_V3");
let c=defaults;
try{if(saved)c=JSON.parse(saved)}catch(e){}
document.documentElement.style.setProperty("--accent",c.theme?.accent||"#2487ff");
document.documentElement.style.setProperty("--accent2",c.theme?.accent2||"#66b3ff");
const $=s=>document.querySelector(s), esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
document.title=`${c.identity?.name||"Portfolio"} • ${c.identity?.role||"Manager"}`;
const navItems=[["Inicio","#inicio"],["Presentación","#presentacion"],["Sobre mí","#sobre"],["Cómo trabajo","#trabajo"],["Qué hago","#servicios"],["Experiencia","#experiencia"],["Proyectos","#proyectos"],["Contacto","#contacto"]];
document.body.innerHTML=`
<div class="bg-grid"></div><div class="glow"></div>
<header class="nav"><div class="container navin"><a class="brand" href="#inicio"><img src="${esc(c.identity.logo)}"><b>${esc(c.identity.name)}</b></a><nav class="links">${navItems.map(x=>`<a href="${x[1]}">${x[0]}</a>`).join("")}</nav><button class="menu" id="menu">☰</button></div></header>
<main>
<section class="hero" id="inicio"><div class="container hero-inner"><div><div class="eyebrow">${esc(c.hero.eyebrow)}</div><h1>${esc(c.hero.title)}</h1><p>${esc(c.hero.text)}</p><div class="buttons"><a class="btn primary" href="#experiencia">${esc(c.hero.primaryButton)}</a><a class="btn secondary" href="#contacto">${esc(c.hero.secondaryButton)}</a></div></div><div class="orbit"><img class="avatar" src="${esc(c.identity.logo)}"><div class="tag">${esc(c.identity.role)}</div></div></div></section>
<section id="presentacion" class="reveal"><div class="container"><div class="section-head"><span>01 / PRESENTACIÓN</span><h2>${esc(c.presentation.title)}</h2><p>${esc(c.presentation.text)}</p></div></div></section>
<section id="sobre" class="reveal"><div class="container"><div class="section-head"><span>02 / PERFIL</span><h2>${esc(c.about.title)}</h2><p>${esc(c.about.text)}</p></div><div class="card"><ul class="list">${c.about.points.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div></section>
<section id="trabajo" class="reveal"><div class="container"><div class="section-head"><span>03 / METODOLOGÍA</span><h2>${esc(c.work.title)}</h2><p>${esc(c.work.intro)}</p></div><div class="cardgrid">${c.work.steps.map(x=>`<article class="card"><div class="num">${esc(x.number)}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}</div></div></section>
<section id="servicios" class="reveal"><div class="container"><div class="section-head"><span>04 / CAPACIDADES</span><h2>${esc(c.services.title)}</h2></div><div class="cardgrid">${c.services.items.map(x=>`<article class="card"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}</div></div></section>
<section id="estadisticas" class="reveal"><div class="container"><div class="section-head"><span>05 / DATOS</span><h2>ESTADÍSTICAS</h2></div><div class="stats">${c.stats.map(x=>`<div class="stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join("")}</div></div></section>
<section id="experiencia" class="reveal"><div class="container"><div class="section-head"><span>06 / EXPERIENCIA</span><h2>${esc(c.experience.title)}</h2><p>${esc(c.experience.text)}</p></div><div class="card"><ul class="list">${c.experience.items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div></section>
<section id="proyectos" class="reveal"><div class="container"><div class="section-head"><span>07 / TRABAJO</span><h2>${esc(c.projects.title)}</h2></div><div class="cardgrid">${c.projects.items.map(x=>`<article class="card project"><div><span class="status">${esc(x.status)}</span><h3 style="margin-top:18px">${esc(x.name)}</h3><p>${esc(x.text)}</p></div><small style="color:#74849b">${esc(x.role)}</small></article>`).join("")}</div></div></section>
<section id="valores" class="reveal"><div class="container"><div class="section-head"><span>08 / PRINCIPIOS</span><h2>${esc(c.values.title)}</h2></div><div class="cardgrid">${c.values.items.map(x=>`<article class="card"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join("")}</div></div></section>
<section id="proceso" class="reveal"><div class="container"><div class="section-head"><span>09 / FLUJO</span><h2>${esc(c.process.title)}</h2><p>${esc(c.process.text)}</p></div><div class="cardgrid">${c.process.items.map((x,i)=>`<article class="card"><div class="num">0${i+1}</div><h3>${esc(x)}</h3></article>`).join("")}</div></div></section>
<section id="referencias" class="reveal"><div class="container"><div class="section-head"><span>10 / REFERENCIAS</span><h2>${esc(c.testimonials.title)}</h2></div><div class="cardgrid">${c.testimonials.items.map(x=>`<article class="card"><p>“${esc(x.text)}”</p><h3 style="margin-top:20px">${esc(x.name)}</h3><small style="color:#74849b">${esc(x.role)}</small></article>`).join("")}</div></div></section>
<section id="contacto" class="reveal"><div class="container"><div class="cta"><h2>${esc(c.contact.title)}</h2><p>${esc(c.contact.text)}</p><a class="btn primary" href="${esc(c.contact.discord)}" target="_blank" rel="noopener">${esc(c.contact.discordText)}</a></div></div></section>
</main><footer class="footer">© ${new Date().getFullYear()} ${esc(c.identity.name)} • ${esc(c.identity.role)}</footer>`;
$("#menu").onclick=()=>document.querySelector(".links").classList.toggle("mobile");
document.querySelectorAll(".links a").forEach(a=>a.onclick=()=>document.querySelector(".links").classList.remove("mobile"));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>io.observe(x));
})();