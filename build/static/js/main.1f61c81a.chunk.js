(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{42:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),c=t(17),i=t.n(c),o=t(18),u=t(3),s=t(0),d=function(e){var n=e.everything,t=e.handleEverything;return Object(s.jsxs)("div",{children:["Filter shown with: ",Object(s.jsx)("input",{value:n,onChange:t})]})},l=function(e){var n=e.persons,t=e.handleDeliete;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Numbers"}),n.map((function(e,n){return Object(s.jsxs)("p",{children:[e.name," ",e.number,Object(s.jsx)("button",{onClick:function(n){return function(e){window.confirm("Delete ".concat(e.name,"?"))&&t(e.id)}(e)},children:"delete"})]},n)}))," "," "]})},j=function(e){var n=e.addPerson,t=e.newNumber,r=e.handleNewNumber,a=e.newName,c=e.handleNewName;return Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:a,onChange:c})]}),Object(s.jsx)("br",{}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:t,onChange:r})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.message;return null===n?n:Object(s.jsx)("div",{className:"message",children:n})},h=(t(8),t(5)),m=t.n(h),f="http://localhost:3001/api/persons",O=function(e){return m.a.post(f,e)},v=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],c=Object(r.useState)(""),i=Object(u.a)(c,2),h=i[0],v=i[1],p=Object(r.useState)(""),x=Object(u.a)(p,2),w=x[0],g=x[1],N=Object(r.useState)(""),y=Object(u.a)(N,2),C=y[0],k=y[1],S=Object(r.useState)(null),D=Object(u.a)(S,2),E=D[0],L=D[1];Object(r.useEffect)((function(){m.a.get(f).then((function(e){a(e.data),g(e.data)}))}),[]);var P=t.filter((function(e){var n;return(null===(n=e.name)||void 0===n?void 0:n.trim().toLowerCase().indexOf(C.trim().toLowerCase()))>-1})),T=C.trim().length?P:t;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),E&&Object(s.jsx)(b,{message:E}),Object(s.jsx)(d,{everything:C,handleEverything:function(e){return k(e.target.value)}}),Object(s.jsx)("h3",{children:"Add a new"}),Object(s.jsx)(j,{addPerson:function(e){if(e.preventDefault(),console.log("im here",{persons:t}),!h.trim())return null;var n=t.find((function(e){return e.name.toLowerCase().trim()===h.toLowerCase()}));if(n){if(window.confirm("".concat(h," is already added to phonebook, replace the old number with a new one?")))(function(e,n){return m.a.put("".concat(f,"/").concat(e),n)})(n.id,{name:n.name,number:w.trim()}).then((function(e){return a((function(n){return n.map((function(n){return n.id===e.data.id&&(n.number=e.data.number),n}))})),v(""),g(""),null}));var r={name:h.trim(),number:w.trim()};O(r).then((function(e){a([].concat(Object(o.a)(t),[e.data])),L("updated ".concat(h)),setTimeout((function(){L(null)}),5e3),v(""),g("")}))}else O({name:h,number:w}).then((function(e){var n=e.data;a(t.concat(n)),L("Added ".concat(h)),setTimeout((function(){L(null)}),5e3)})).catch((function(e){L(e.response.data.payload.errors.name.message),setTimeout((function(){L(null)}),5e3)}))},newName:h,handleNewName:function(e){return v(e.target.value)},handleNewNumber:function(e){return g(e.target.value)}}),Object(s.jsx)(l,{persons:T,handleDeliete:function(e){a(T.filter((function(n){return n.id!==e})))}})]})};i.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(v,{})}),document.getElementById("root"))},8:function(e,n,t){}},[[42,1,2]]]);
//# sourceMappingURL=main.1f61c81a.chunk.js.map