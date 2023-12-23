(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();window.onload=()=>{const e=document.getElementById("apply"),t=document.getElementById("ex1"),o=document.getElementById("ex2"),c=document.getElementById("ex3");e.onclick=f,t.onclick=C,o.onclick=I,c.onclick=L};function f(){p(["unreachable","unreachable-res"]);const e=A(),t=g(e),o=y(t);h(o,"unreachable-res",1)}function p(e){e.forEach(t=>{const o=document.getElementById(t);o.innerHTML=""})}function h(e,t,o){const c=document.getElementById(t),n=document.createElement("span");n.innerHTML=`P${o===1?"'":"''"}:`,c.appendChild(n),Object.entries(e).forEach(([r,i])=>{let s="";i.forEach((d,u)=>{s+=d,u+1<i.length&&(s+=" | ")});let a=`${r} → ${s}`;const l=document.createElement("div");l.innerHTML=a,c.appendChild(l)})}function m(e,t,o){const c=Array.from(e);let n=`y<sub>${t}</sub> = `;c.length===0?n+="ø":(n+="{",c.forEach((s,a)=>{n+=a+1<c.length?`${s}, `:`${s}}`}));const r=document.createElement("div");r.innerHTML=n,document.getElementById(o).appendChild(r)}function y(e){const t=new Set;t.add("S");let o=!0,c=0;for(m(t,c,"unreachable");o;){const r=t.size;Array.from(t).forEach(s=>{if(E(s)){const a=e[s];a&&a.forEach(l=>{l.match(/\\?.|./g).forEach(u=>{t.add(u)})})}}),o=t.size>r,m(t,++c,"unreachable")}return Object.fromEntries(Object.entries(e).filter(([r])=>t.has(r)))}function b(e){return e.toLowerCase()!==e.toUpperCase()}function E(e){return e.toUpperCase()===e&&b(e)}function g(e){const t=B(e),o={};return t.forEach(c=>{let[n,r]=c.split("->");r=r.split("|"),o[n]=r}),o}function B(e){let t=e.split(`
`);return t=t.map(o=>o.replaceAll(" ","")),t=t.filter(o=>!!o),t}function A(){return document.getElementById("input").value}function C(){const e=document.getElementById("input");e.value=`S -> Ab|Bb
A -> ab|+B|@C
B -> *C
C -> BA|Cb
D -> Acb|\\e`}function I(){const e=document.getElementById("input");e.value=`S -> cE|AA
A -> EA|cc|a
B -> B|BaB|a
C -> bb|a|c
E -> a`}function L(){const e=document.getElementById("input");e.value=`S -> A|01
A -> 1|000|\\e
B -> 01|1B0 
C -> D1|\\e
D -> A0|B1|1C`}
