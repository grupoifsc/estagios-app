import{b as G}from"./chunk-7HMRDT6Y.js";import{a as N,b as $,c as B,d as q,e as K,f as J}from"./chunk-WK274B67.js";import{a as A,b as j}from"./chunk-SOUYIAI6.js";import"./chunk-PBY3JU35.js";import{b as M}from"./chunk-GVFXADYD.js";import{a as O}from"./chunk-JJQTQM5B.js";import"./chunk-3LEAUZE5.js";import{n as z,o as R}from"./chunk-LJW6TDUS.js";import"./chunk-U4YWP6KT.js";import"./chunk-P4QSJQM7.js";import"./chunk-XSSXK7EZ.js";import"./chunk-7J7XJZ7Y.js";import"./chunk-MV5KNEQQ.js";import"./chunk-RSZHZ2NF.js";import{e as k,f as V}from"./chunk-C6BRYRYM.js";import{c as D}from"./chunk-O3TBEYO6.js";import"./chunk-6ICFUDYJ.js";import"./chunk-2TSUYDBP.js";import"./chunk-7EHZQ6MH.js";import"./chunk-X7OLMZPY.js";import"./chunk-VELDXNG4.js";import"./chunk-OKHOSK7W.js";import{n as L}from"./chunk-MFXFRBM3.js";import{m as I,p as F,s as P}from"./chunk-6M6X6DMA.js";import{Cb as E,Db as l,Fb as v,Nb as y,Ob as u,Ra as p,Sa as b,Xb as C,Yb as S,_b as T,ba as w,cb as d,fb as f,ka as _,la as g,lb as i,mb as t,nb as m,rb as x,ub as h,vb as c}from"./chunk-OK7OUPQM.js";import"./chunk-JQ2Q4TV4.js";var H=()=>[10,25,50],Q=()=>["titulo","criado_por.nome"],U=()=>[1,2,3];function X(o,r){if(o&1){let a=x();i(0,"div",14)(1,"p-iconField",15),m(2,"input",16,2),i(4,"p-inputIcon",17)(5,"i",18),h("click",function(){_(a);let n=E(3);c();let s=E(1);return g(s.filterGlobal(n.value,"contains"))}),t()()()()}}function Y(o,r){o&1&&(i(0,"tr")(1,"th"),l(2,"T\xEDtulo"),t(),i(3,"th"),l(4,"Criado por"),t(),m(5,"th"),t())}function Z(o,r){if(o&1){let a=x();i(0,"tr")(1,"td"),l(2),t(),i(3,"td"),l(4),t(),i(5,"td")(6,"p-button",19),h("onClick",function(){let n=_(a).$implicit,s=c(2);return g(s.see(n.id,n))}),t()()()}if(o&2){let a=r.$implicit;p(2),v(" ",a.titulo,""),p(2),v(" ",a.criado_por==null?null:a.criado_por.nome," "),p(2),f("rounded",!0)("text",!0)}}function ee(o,r){o&1&&(i(0,"tr")(1,"td",20),l(2,"Nenhuma vaga."),t()())}function te(o,r){if(o&1){let a=x();i(0,"p-table",9,1),h("onLazyLoad",function(n){_(a);let s=c();return g(s.onLazyLoad(n))}),d(2,X,6,0,"ng-template",10)(3,Y,6,0,"ng-template",11)(4,Z,7,4,"ng-template",12),i(5,"div"),l(6),t(),d(7,ee,3,0,"ng-template",13),t()}if(o&2){let a,e=r.ngIf,n=c();f("rows",n.rows)("rowsPerPageOptions",u(12,H))("paginator",!0)("showCurrentPageReport",!0)("totalRecords",n.totalVagas)("first",n.first)("lazy",!0)("pageLinks",5)("lazyLoadOnInit",!1)("globalFilterFields",u(13,Q))("value",(a=e.data==null?null:e.data.content)!==null&&a!==void 0?a:u(14,U)),p(6),v(" ",n.setTotalRecords(e.data==null?null:e.data.totalElements)," ")}}function ie(o,r){o&1&&(i(0,"tr")(1,"th"),l(2,"T\xEDtulo"),t(),i(3,"th"),l(4,"Criado por"),t(),i(5,"th"),l(6,"Status"),t(),i(7,"th"),l(8,"Modera\xE7\xE3o"),t()())}function ne(o,r){o&1&&(i(0,"tr")(1,"td"),m(2,"p-skeleton"),t(),i(3,"td"),m(4,"p-skeleton"),t(),i(5,"td"),m(6,"p-skeleton"),t(),i(7,"td"),m(8,"p-skeleton"),t()())}function oe(o,r){if(o&1){let a=x();i(0,"p-table",21),h("onPage",function(n){_(a);let s=c();return g(s.onPage(n))}),d(1,ie,9,0,"ng-template",11)(2,ne,9,0,"ng-template",12),t()}if(o&2){let a=c();f("rows",a.rows)("rowsPerPageOptions",u(9,H))("paginator",!0)("showCurrentPageReport",!0)("first",a.first)("lazy",!0)("pageLinks",5)("globalFilterFields",u(10,Q))("value",u(11,U))}}var Ie=(()=>{let r=class r{constructor(e,n){this.apiService=e,this.router=n,this.vagas$=this.apiService.getAllApproved(),this.subscriptions=[],this.title="Vagas Recebidas",this.first=0,this.totalVagas=10,this.rows=10,this.search=""}ngOnInit(){}stringify(e){let n=JSON.stringify(e);return console.log(n),n}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe())}see(e,n){this.router.navigate(["demo/vagas/"+e])}onPage(e){this.first=e.first,this.rows=e.rows,this.reloadTable()}onLazyLoad(e){console.log(JSON.stringify(e)),this.first=e.first??0,this.rows=e.rows??10,typeof e.globalFilter=="string"?this.search=e.globalFilter:typeof e.globalFilter=="object"&&e.globalFilter&&(this.search=e.globalFilter.join(" ")),this.reloadTable()}reloadTable(){let e=this.first/this.rows;this.vagas$=this.apiService.getAllApproved(this.search,e,this.rows)}setTotalRecords(e){this.totalVagas=e??0}};r.\u0275fac=function(n){return new(n||r)(b(O),b(D))},r.\u0275cmp=w({type:r,selectors:[["app-disponiveis"]],standalone:!0,features:[y],decls:19,vars:5,consts:[["skeleton",""],["dt1",""],["input",""],[1,"p-4","mt-4"],[1,"mb-6"],[1,"text-4xl"],[1,"bg-teal-50","flex","flex-column","gap-1","p-3","m-2","w-11","text-color-secondary"],[1,"text-green-500"],["dataKey","id",3,"rows","rowsPerPageOptions","paginator","showCurrentPageReport","totalRecords","first","lazy","pageLinks","lazyLoadOnInit","globalFilterFields","value","onLazyLoad",4,"ngIf","ngIfElse"],["dataKey","id",3,"onLazyLoad","rows","rowsPerPageOptions","paginator","showCurrentPageReport","totalRecords","first","lazy","pageLinks","lazyLoadOnInit","globalFilterFields","value"],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"flex","gap-2"],["iconPosition","right",1,"ml-auto"],["pInputText","","type","text","placeholder","Busca"],[1,"cursor-pointer"],[1,"pi","pi-search",3,"click"],["icon","pi pi-eye","title","Ver",3,"onClick","rounded","text"],["colspan","5"],["dataKey","id",3,"onPage","rows","rowsPerPageOptions","paginator","showCurrentPageReport","first","lazy","pageLinks","globalFilterFields","value"]],template:function(n,s){if(n&1&&(i(0,"div",3)(1,"div",4)(2,"h1",5),l(3,"Vagas Aceitas"),t(),i(4,"div",6)(5,"span"),l(6,"Nesta se\xE7\xE3o, voc\xEA visualiza todas as vagas criadas ou aprovadas pela sua institui\xE7\xE3o"),t(),i(7,"span")(8,"strong",7),l(9,"Esta \xE9 a visualiza\xE7\xE3o segura para compartilhamento com os estudantes"),t()(),i(10,"span"),l(11,"Aqui s\xE3o exibidas apenas as vagas que sua IE j\xE1 revisou e considerou adequadas."),t()()(),d(12,te,8,15,"p-table",8),C(13,"async"),i(14,"div")(15,"p"),l(16),t()(),d(17,oe,3,12,"ng-template",null,0,T),t()),n&2){let W=E(18);p(12),f("ngIf",S(13,3,s.vagas$))("ngIfElse",W),p(4),v("Total de vagas: ",s.totalVagas,"")}},dependencies:[P,I,F,j,A,L,V,k,$,N,M,q,B,R,z,G,J,K]});let o=r;return o})();export{Ie as DisponiveisComponent};
