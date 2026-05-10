import{c as a,j as s,b as n,L as c}from"./index-C6Hq-ohD.js";import{P as r,m as e}from"./PageTransition-DwWO0LRq.js";/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t=a("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=a("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);function h(){return s.jsxs(r,{className:"page",children:[s.jsxs("div",{className:"page-kicker",children:[s.jsx(t,{size:15})," Articles"]}),s.jsx("div",{className:"section-header",children:s.jsxs("div",{children:[s.jsx("h1",{className:"section-title",children:"Marketplace Playbooks"}),s.jsx("p",{className:"section-description",children:"Practical guidance for buying, previewing, uploading, and selling high-quality 3D assets."})]})}),s.jsx(e.div,{className:"article-grid",initial:"hidden",animate:"show",variants:{hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.1}}},children:n.map(i=>s.jsx(e.div,{variants:{hidden:{opacity:0,y:20},show:{opacity:1,y:0}},children:s.jsxs(c,{className:"article-card",to:"/blog",children:[s.jsx("img",{src:i.image,alt:""}),s.jsxs("div",{children:[s.jsxs("span",{children:[s.jsx(o,{size:13}),i.date," - ",i.readTime]}),s.jsx("strong",{children:i.title}),s.jsx("p",{children:i.excerpt})]})]})},i.id))})]})}export{h as default};
