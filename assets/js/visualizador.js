/* ==========================================================================
   VISUALIZADOR DE MOLECULAS (visualizador.html)
   --------------------------------------------------------------------------
   Desenha a molecula em Canvas 2D (nao precisa de WebGL nem de biblioteca
   externa), detecta ligacoes de hidrogenio D-H...A, mede distancias e exporta
   PNG com largura fisica (cm) e resolucao (dpi) gravadas no arquivo.
   Os exemplos do menu vem de dados/moleculas-exemplo.js.
   Tudo roda no navegador de quem usa: nenhuma coordenada sai do computador.
   ========================================================================== */
(function () {
"use strict";
const EXEMPLOS = (typeof MOLECULAS_EXEMPLO !== "undefined") ? MOLECULAS_EXEMPLO : {};
;
const Z2S = ["X","H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe"];
const COV = {H:.31,C:.76,N:.71,O:.66,F:.57,S:1.05,P:1.07,Cl:1.02,Br:1.20,I:1.39,B:.84,Si:1.11,Zn:1.22,Cu:1.32,Fe:1.32,Na:1.66,K:2.03};
const VDW = {H:1.10,C:1.70,N:1.55,O:1.52,F:1.47,S:1.80,P:1.80,Cl:1.75,Br:1.85,I:1.98,B:1.92,Si:2.10,Zn:1.39,Cu:1.40,Fe:1.40,Na:2.27,K:2.75};
const JMOL = {H:"#FFFFFF",C:"#909090",N:"#3050F8",O:"#FF0D0D",F:"#90E050",S:"#FFFF30",P:"#FF8000",Cl:"#1FF01F",Br:"#A62929",I:"#940094",B:"#FFB5B5",Si:"#F0C8A0",Zn:"#7D80B0",Cu:"#C88033",Fe:"#E06633",Na:"#AB5CF2",K:"#8F40D4"};
const $ = id => document.getElementById(id);
const cv = $("cv"), ctx = cv.getContext("2d");
let atoms = [], bonds = [], style = "bs", measures = [], picked = [];
let R = [[1,0,0],[0,1,0],[0,0,1]], zoom = 1, pan = {x:0, y:0}, center = {x:0,y:0,z:0}, extent = 5, ex = 5, ey = 5;

function parse(txt){
  const out = [], isNum = s => /^[-+]?(\d+\.?\d*|\.\d+)([eEdD][-+]?\d+)?$/.test(s), num = s => +s.replace(/[dD]/,"e");
  for (const raw of txt.split(/\r?\n/)){
    const p = raw.trim().split(/[\s,;]+/);
    if (p.length < 4) continue;
    let el, c;
    if (/^[A-Za-z]{1,2}\d*$/.test(p[0]) && p.slice(1,4).every(isNum)) { el = p[0].replace(/\d+$/,""); c = p.slice(1,4); }
    else if (p.length >= 6 && /^\d+$/.test(p[0]) && /^\d+$/.test(p[1]) && p.slice(3,6).every(isNum)) { el = Z2S[+p[1]]; c = p.slice(3,6); }
    else if (p.length >= 5 && /^\d+$/.test(p[0]) && /^[A-Za-z]{1,2}$/.test(p[1]) && p.slice(2,5).every(isNum)) { el = p[1]; c = p.slice(2,5); }
    else continue;
    if (!el) continue;
    el = el[0].toUpperCase() + el.slice(1).toLowerCase();
    out.push({el, x:num(c[0]), y:num(c[1]), z:num(c[2])});
  }
  return out;
}
const dist = (a,b) => Math.hypot(a.x-b.x, a.y-b.y, a.z-b.z);
function ang(a,b,c){ const u=[a.x-b.x,a.y-b.y,a.z-b.z], v=[c.x-b.x,c.y-b.y,c.z-b.z];
  return Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1]+u[2]*v[2])/Math.hypot(...u)/Math.hypot(...v))))*180/Math.PI; }
const fmt = (v,n) => v.toFixed(n).replace(".", $("decSel").value);
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const isBond = (a,b) => dist(a,b) < ((COV[a.el]||1.5)+(COV[b.el]||1.5))*1.15;

function hbonds(){
  const cut=+$("hbCut").value, amin=+$("hbAng").value, ACC=new Set(["N","O","F"]), res=[];
  atoms.forEach((h,i)=>{
    if (h.el!=="H") return;
    let D=-1, dd=9; atoms.forEach((x,k)=>{ if(ACC.has(x.el)){ const r=dist(h,x); if(r<1.25&&r<dd){dd=r;D=k;} } });
    if (D<0) return;
    atoms.forEach((a,j)=>{
      if (j===D || !ACC.has(a.el)) return;
      const r=dist(h,a); if (r>cut || r<1.3 || isBond(atoms[D],a)) return;
      const th=ang(atoms[D],h,a); if (th<amin) return;
      res.push({D,H:i,A:j,dHA:r,dDA:dist(atoms[D],a),th});
    });
  });
  return res;
}

// orientação inicial: eixos principais (maior extensão na horizontal, menor ao longo da visada)
function jacobi(A){
  const a=A.map(r=>r.slice()), V=[[1,0,0],[0,1,0],[0,0,1]];
  for (let s=0;s<50;s++){
    let p=0,q=1; for (const [i,j] of [[0,1],[0,2],[1,2]]) if (Math.abs(a[i][j])>Math.abs(a[p][q])) {p=i;q=j;}
    if (Math.abs(a[p][q])<1e-12) break;
    const th=0.5*Math.atan2(2*a[p][q], a[q][q]-a[p][p]), c=Math.cos(th), sn=Math.sin(th);
    for (let k=0;k<3;k++){ const akp=a[k][p], akq=a[k][q]; a[k][p]=c*akp-sn*akq; a[k][q]=sn*akp+c*akq; }
    for (let k=0;k<3;k++){ const apk=a[p][k], aqk=a[q][k]; a[p][k]=c*apk-sn*aqk; a[q][k]=sn*apk+c*aqk; }
    for (let k=0;k<3;k++){ const vkp=V[k][p], vkq=V[k][q]; V[k][p]=c*vkp-sn*vkq; V[k][q]=sn*vkp+c*vkq; }
  }
  return {w:[a[0][0],a[1][1],a[2][2]], V};
}
function orient(){
  const n=atoms.length; center={x:0,y:0,z:0};
  atoms.forEach(a=>{center.x+=a.x/n;center.y+=a.y/n;center.z+=a.z/n;});
  const C=[[0,0,0],[0,0,0],[0,0,0]];
  atoms.forEach(a=>{ const v=[a.x-center.x,a.y-center.y,a.z-center.z]; for(let i=0;i<3;i++)for(let j=0;j<3;j++)C[i][j]+=v[i]*v[j]; });
  const {w,V}=jacobi(C), idx=[0,1,2].sort((i,j)=>w[j]-w[i]);
  const ax=idx.map(k=>[V[0][k],V[1][k],V[2][k]]);
  const cr=[ax[0][1]*ax[1][2]-ax[0][2]*ax[1][1], ax[0][2]*ax[1][0]-ax[0][0]*ax[1][2], ax[0][0]*ax[1][1]-ax[0][1]*ax[1][0]];
  R=[ax[0], ax[1], cr];
  extent = Math.max(2, ...atoms.map(a=>Math.hypot(a.x-center.x,a.y-center.y,a.z-center.z)+1.2));
  const Q=atoms.map(proj); ex=Math.max(1.5,...Q.map(q=>Math.abs(q.X)))+1.0; ey=Math.max(1.5,...Q.map(q=>Math.abs(q.Y)))+1.0;
  zoom=1; pan={x:0,y:0};
}
function rotate(dx,dy){
  const a=dy*0.01, b=dx*0.01;
  const Rx=[[1,0,0],[0,Math.cos(a),-Math.sin(a)],[0,Math.sin(a),Math.cos(a)]];
  const Ry=[[Math.cos(b),0,Math.sin(b)],[0,1,0],[-Math.sin(b),0,Math.cos(b)]];
  const mul=(A,B)=>A.map(r=>[0,1,2].map(j=>r[0]*B[0][j]+r[1]*B[1][j]+r[2]*B[2][j]));
  R=mul(Ry,mul(Rx,R));
}
function proj(a){ const v=[a.x-center.x,a.y-center.y,a.z-center.z];
  return {X:R[0][0]*v[0]+R[0][1]*v[1]+R[0][2]*v[2], Y:R[1][0]*v[0]+R[1][1]*v[1]+R[1][2]*v[2], Z:R[2][0]*v[0]+R[2][1]*v[1]+R[2][2]*v[2]}; }

function shade(hex,f){ const n=parseInt(hex.slice(1),16); let r=n>>16,g=n>>8&255,b=n&255;
  if (f>0){ r+= (255-r)*f; g+=(255-g)*f; b+=(255-b)*f; } else { r*=1+f; g*=1+f; b*=1+f; }
  return `rgb(${r|0},${g|0},${b|0})`; }
function colorOf(el){ let c=JMOL[el]||"#FF1493"; if (el==="C" && !$("greyC").checked) c="#505050"; return c; }

// desenha a cena num contexto qualquer (tela ou exportação), com largura W e altura H em px
function render(g, W, H, opts){
  const bg=opts.bg, k=opts.k||1;
  const ox=opts.ox||0, oy=opts.oy||0, cw=opts.cw||W, ch=opts.ch||H;
  g.setTransform(1,0,0,1,-ox,-oy);
  g.clearRect(ox,oy,cw,ch);
  if (bg!=="transparent"){ g.fillStyle = bg==="black" ? "#000" : "#fff"; g.fillRect(ox,oy,cw,ch); }
  if (!atoms.length) return;
  const s = Math.min(W/(2*ex), H/(2*ey))*0.92*zoom, cx=W/2+pan.x*k, cy=H/2+pan.y*k;
  const P = atoms.map(proj).map(p=>({x:cx+p.X*s, y:cy-p.Y*s, z:p.Z}));
  const rad = i => { const el=atoms[i].el;
    return style==="sphere" ? (VDW[el]||1.7)*s : style==="bs" ? (el==="H"?0.20:0.30)*s : style==="stick" ? 0.16*s : 0; };
  const bw = style==="stick" ? 0.32*s : style==="bs" ? 0.20*s : Math.max(1.5,0.06*s);
  const items=[];
  if (style!=="sphere") bonds.forEach(([i,j])=>{
    const m={x:(P[i].x+P[j].x)/2, y:(P[i].y+P[j].y)/2};
    items.push({z:P[i].z-0.001, t:"b", a:P[i], b:m, c:colorOf(atoms[i].el)});
    items.push({z:P[j].z-0.001, t:"b", a:P[j], b:m, c:colorOf(atoms[j].el)});
  });
  if (style!=="line") atoms.forEach((a,i)=>items.push({z:P[i].z, t:"a", p:P[i], r:rad(i), c:colorOf(a.el)}));
  items.sort((u,v)=>u.z-v.z);
  const edge = bg==="black" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.55)", lw=Math.max(0.6, 0.012*s);
  g.lineCap="round";
  for (const it of items){
    if (it.t==="b"){
      g.strokeStyle=edge; g.lineWidth=bw+2*lw; g.beginPath(); g.moveTo(it.a.x,it.a.y); g.lineTo(it.b.x,it.b.y); g.stroke();
      g.strokeStyle=shade(it.c,-0.12); g.lineWidth=bw; g.stroke();
      if (bw>4){ g.strokeStyle=shade(it.c,0.35); g.lineWidth=bw*0.35; g.stroke(); }
    } else {
      const {p,r,c}=it, gr=g.createRadialGradient(p.x-r*0.35,p.y-r*0.35,r*0.08,p.x,p.y,r);
      gr.addColorStop(0,shade(c,0.75)); gr.addColorStop(0.45,c); gr.addColorStop(1,shade(c,-0.45));
      g.fillStyle=gr; g.beginPath(); g.arc(p.x,p.y,r,0,2*Math.PI); g.fill();
      g.strokeStyle=edge; g.lineWidth=lw; g.stroke();
    }
  }
  const label=(txt,x,y,color,size)=>{
    g.font=`600 ${size}px "Source Sans 3", system-ui, sans-serif`; g.textAlign="center"; g.textBaseline="middle";
    g.lineWidth=size*0.28; g.strokeStyle= bg==="black" ? "#000" : "#fff"; g.lineJoin="round"; g.strokeText(txt,x,y);
    g.fillStyle=color; g.fillText(txt,x,y);
  };
  const hbc = opts.hbc;
  if ($("showHB").checked) hbonds().forEach(b=>{
    const a=P[b.H], c=P[b.A];
    g.save(); g.strokeStyle=hbc; g.lineWidth=Math.max(2,0.07*s); g.setLineDash([0.16*s,0.11*s]); g.lineCap="butt";
    g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(c.x,c.y); g.stroke(); g.restore();
    if ($("hbLab").checked){
      const mx=(a.x+c.x)/2, my=(a.y+c.y)/2, L=Math.hypot(c.x-a.x,c.y-a.y)||1, nx=-(c.y-a.y)/L, ny=(c.x-a.x)/L, off=0.45*s;
      label(fmt(b.dHA,2)+" Å", mx+nx*off, my+ny*off, hbc, Math.max(12,0.30*s));
    }
  });
  measures.forEach(([i,j])=>{
    const a=P[i], c=P[j];
    g.save(); g.strokeStyle="#14456b"; g.lineWidth=Math.max(1.5,0.04*s); g.setLineDash([0.08*s,0.08*s]);
    g.beginPath(); g.moveTo(a.x,a.y); g.lineTo(c.x,c.y); g.stroke(); g.restore();
    label(fmt(dist(atoms[i],atoms[j]),2)+" Å",(a.x+c.x)/2,(a.y+c.y)/2-0.25*s,"#14456b",Math.max(11,0.26*s));
  });
  if ($("showIdx").checked) atoms.forEach((a,i)=>label(a.el+(i+1),P[i].x,P[i].y, bg==="black"?"#fff":"#1b2230",Math.max(9,0.20*s)));
  picked.forEach(i=>{ g.strokeStyle="#14456b"; g.lineWidth=2*k; g.beginPath(); g.arc(P[i].x,P[i].y,Math.max(rad(i),6)+4*k,0,2*Math.PI); g.stroke(); });
  P.s=s; P.rad=rad; return P;
}

let lastP=[];
function draw(){
  const box=$("viewer"), dpr=window.devicePixelRatio||1, W=box.clientWidth, H=box.clientHeight;
  cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr); cv.style.width=W+"px"; cv.style.height=H+"px";
  const bg=$("bgSel").value==="black"?"black":"white";
  box.style.background = bg==="black" ? "#000" : "#fff";
  const P=render(ctx, cv.width, cv.height, {bg, k:dpr, hbc:"#ed7a2c"});
  lastP=(P||[]).map(p=>({x:p.x/dpr,y:p.y/dpr}));
  table($("showHB").checked && atoms.length ? hbonds() : []);
}

function table(hb){
  if (!hb.length){ $("hbTable").innerHTML=""; return; }
  const nm=i=>atoms[i].el+(i+1);
  $("hbTable").innerHTML=`<table><thead><tr><th>D-H···A</th><th class="r">H···A / Å</th><th class="r">D···A / Å</th><th class="r">∠ D-H···A</th></tr></thead><tbody>${
    hb.map(b=>`<tr><td>${nm(b.D)}-${nm(b.H)}···${nm(b.A)}</td><td class="r num">${fmt(b.dHA,2)}</td><td class="r num">${fmt(b.dDA,2)}</td><td class="r num">${fmt(b.th,1)}°</td></tr>`).join("")}</tbody></table>`;
}

function status(msg){
  if (msg){ $("status").textContent=msg; return; }
  const n={}; atoms.forEach(a=>n[a.el]=(n[a.el]||0)+1);
  const f=Object.keys(n).sort((a,b)=>(a==="C"?-1:b==="C"?1:a==="H"?-1:b==="H"?1:a.localeCompare(b))).map(e=>e+(n[e]>1?n[e]:"")).join("");
  $("status").innerHTML = atoms.length ? `<b>${atoms.length} átomos</b> · ${f} · arraste para girar, Shift+arraste para mover, role para zoom, clique em dois átomos para medir${measures.length?` · <a href="#" id="clrM">limpar medidas</a>`:""}` : "Nenhum átomo reconhecido no texto.";
  const c=$("clrM"); if (c) c.onclick=e=>{ e.preventDefault(); measures=[]; draw(); status(); };
}

function load(){
  atoms=parse($("xyz").value); bonds=[];
  for (let i=0;i<atoms.length;i++) for (let j=i+1;j<atoms.length;j++) if (isBond(atoms[i],atoms[j])) bonds.push([i,j]);
  measures=[]; picked=[];
  if (atoms.length) orient();
  draw(); status();
}

// PNG com dimensão física: largura (cm) × dpi, com o dpi gravado no arquivo (bloco pHYs)
function crc32(b){ let c, t=crc32.t||(crc32.t=Array.from({length:256},(_,n)=>{ c=n; for(let k=0;k<8;k++) c=c&1?0xEDB88320^(c>>>1):c>>>1; return c>>>0; }));
  c=0xFFFFFFFF; for (const x of b) c=t[(c^x)&255]^(c>>>8); return (c^0xFFFFFFFF)>>>0; }
async function comDpi(blob, dpi){
  const a=new Uint8Array(await blob.arrayBuffer()), ppm=Math.round(dpi/0.0254);
  const ch=new Uint8Array(21), dv=new DataView(ch.buffer);
  dv.setUint32(0,9); ch.set([112,72,89,115],4); dv.setUint32(8,ppm); dv.setUint32(12,ppm); ch[16]=1;
  dv.setUint32(17, crc32(ch.subarray(4,17)));
  const out=new Uint8Array(a.length+21); out.set(a.subarray(0,33)); out.set(ch,33); out.set(a.subarray(33),54);
  return new Blob([out],{type:"image/png"});
}
function exporta(){
  const box=$("viewer"), W0=box.clientWidth, H0=box.clientHeight, dpi=+$("dpiSel").value, cm=+$("wSel").value;
  const T=Math.round(cm/2.54*dpi), bg=$("bgSel").value, sel=picked; picked=[];
  const dummy=document.createElement("canvas"); dummy.width=dummy.height=1;
  const P=render(dummy.getContext("2d"), W0, H0, {bg, k:1, hbc:"#ed7a2c", cw:1, ch:1});
  let x0=0,y0=0,x1=W0,y1=H0;
  if ($("cropC").checked && P && P.length){
    const pad=0.55*P.s; x0=1e9; y0=1e9; x1=-1e9; y1=-1e9;
    P.forEach((q,i)=>{ const r=Math.max(P.rad(i),0)+pad; x0=Math.min(x0,q.x-r); y0=Math.min(y0,q.y-r); x1=Math.max(x1,q.x+r); y1=Math.max(y1,q.y+r); });
  }
  const k=T/(x1-x0), fin=document.createElement("canvas");
  fin.width=T; fin.height=Math.round((y1-y0)*k);
  render(fin.getContext("2d"), W0*k, H0*k, {bg, k, hbc:"#ed7a2c", ox:x0*k, oy:y0*k, cw:fin.width, ch:fin.height});
  picked=sel;
  return {fin, dpi, cm};
}
function png(){
  const {fin, dpi, cm}=exporta();
  const blobP=new Promise(res=>fin.toBlob(b=>comDpi(b,dpi).then(res)));
  const info=`PNG ${fin.width} × ${fin.height} px · ${String(cm).replace(".",",")} × ${(fin.height/dpi*2.54).toFixed(1).replace(".",",")} cm a ${dpi} dpi`;
  $("out").innerHTML=`<span class="lab">${info}</span><img id="pngImg" alt="Imagem exportada da molécula"><div class="row"><a class="botao" id="btnDown" download="molecula_${dpi}dpi.png">Baixar PNG</a><button class="botao botao--secundario" type="button" id="btnCopy">Copiar de novo</button></div><span class="hint" id="copyMsg">Copiando para a área de transferência…</span>`;
  blobP.then(b=>{ const u=URL.createObjectURL(b); $("pngImg").src=u; $("btnDown").href=u; });
  const copia=()=>{
    try {
      navigator.clipboard.write([new ClipboardItem({"image/png":blobP})])
        .then(()=>{ $("copyMsg").textContent="Imagem copiada: cole com Ctrl+V no Word, PowerPoint ou Inkscape. O arquivo baixado guarda o dpi; a cópia, não."; })
        .catch(()=>{ $("copyMsg").textContent="O navegador bloqueou a cópia. Use o botão Baixar PNG."; });
    } catch(e){ $("copyMsg").textContent="Este navegador não copia imagens. Use o botão Baixar PNG."; }
  };
  copia();
  $("btnCopy").onclick=copia;
}

// interação: arrastar gira, Shift+arrastar move, roda dá zoom, clique seleciona
let drag=null;
cv.addEventListener("pointerdown",e=>{ drag={x:e.clientX,y:e.clientY,moved:0,shift:e.shiftKey}; cv.setPointerCapture(e.pointerId); });
cv.addEventListener("pointermove",e=>{
  if (!drag) return;
  const dx=e.clientX-drag.x, dy=e.clientY-drag.y; drag.moved+=Math.abs(dx)+Math.abs(dy); drag.x=e.clientX; drag.y=e.clientY;
  if (drag.shift){ pan.x+=dx; pan.y+=dy; } else rotate(dx,dy);
  draw();
});
cv.addEventListener("pointerup",e=>{
  if (drag && drag.moved<4 && atoms.length){
    const r=cv.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
    let best=-1,bd=14; lastP.forEach((p,i)=>{ const d=Math.hypot(p.x-x,p.y-y); if(d<bd){bd=d;best=i;} });
    if (best>=0){ picked.push(best);
      if (picked.length===2){ if (picked[0]!==picked[1]) measures.push(picked.slice()); picked=[]; draw(); status(); }
      else { draw(); status(`Átomo ${atoms[best].el}${best+1} selecionado: clique em outro para medir a distância.`); } }
  }
  drag=null;
});
cv.addEventListener("wheel",e=>{ e.preventDefault(); zoom*=Math.exp(-e.deltaY*0.0015); zoom=Math.max(0.2,Math.min(8,zoom)); draw(); },{passive:false});

function init(){
  const sel=$("exSel");
  Object.keys(EXEMPLOS).forEach(k=>{ const o=document.createElement("option"); o.value=k; o.textContent=k; sel.appendChild(o); });
  sel.onchange=()=>{ if (sel.value){ $("xyz").value=EXEMPLOS[sel.value]; load(); } };
  $("xyz").value=EXEMPLOS[Object.keys(EXEMPLOS)[0]]; sel.selectedIndex=1;
  $("btnLoad").onclick=load;
  $("styleSeg").querySelectorAll("button").forEach(b=>b.onclick=()=>{
    style=b.dataset.v; $("styleSeg").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed", x===b)); draw(); });
  ["greyC","showIdx","showHB","hbLab","decSel","bgSel"].forEach(id=>$(id).onchange=draw);
  $("hbCut").oninput=()=>{ $("hbCutV").textContent=(+$("hbCut").value).toFixed(2)+" Å"; draw(); };
  $("hbAng").oninput=()=>{ $("hbAngV").textContent=$("hbAng").value+"°"; draw(); };
  $("btnPng").onclick=png;
  $("btnReset").onclick=()=>{ if (atoms.length) orient(); draw(); };
  $("xyz").addEventListener("keydown",e=>{ if ((e.ctrlKey||e.metaKey) && e.key==="Enter") load(); });
  new ResizeObserver(()=>draw()).observe($("viewer"));
  load();
}
init();
})();
