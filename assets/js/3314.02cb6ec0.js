"use strict";(self.webpackChunk_2024teaching_seminar=self.webpackChunk_2024teaching_seminar||[]).push([[3314],{43314:(n,e,t)=>{t.r(e),t.d(e,{ntriples:()=>x});var r=0,i=1,a=2,u=3,s=4,c=5,l=6,o=7,h=8,f=9,p=10,v=11,b=12;function k(n,e){var t,k=n.location;t=k==r&&"<"==e?i:k==r&&"_"==e?a:k==u&&"<"==e?s:k==c&&"<"==e?l:k==c&&"_"==e?o:k==c&&'"'==e?h:k==i&&">"==e||k==a&&" "==e?u:k==s&&">"==e?c:k==l&&">"==e||k==o&&" "==e||k==h&&'"'==e||k==f&&" "==e||k==p&&">"==e?v:k==h&&"@"==e?f:k==h&&"^"==e?p:" "!=e||k!=r&&k!=u&&k!=c&&k!=v?k==v&&"."==e?r:b:k,n.location=t}const x={name:"ntriples",startState:function(){return{location:r,uris:[],anchors:[],bnodes:[],langs:[],types:[]}},token:function(n,e){var t=n.next();if("<"==t){k(e,t);var r="";return n.eatWhile((function(n){return"#"!=n&&">"!=n&&(r+=n,!0)})),e.uris.push(r),n.match("#",!1)?"variable":(n.next(),k(e,">"),"variable")}if("#"==t){var i="";return n.eatWhile((function(n){return">"!=n&&" "!=n&&(i+=n,!0)})),e.anchors.push(i),"url"}if(">"==t)return k(e,">"),"variable";if("_"==t){k(e,t);var a="";return n.eatWhile((function(n){return" "!=n&&(a+=n,!0)})),e.bnodes.push(a),n.next(),k(e," "),"builtin"}if('"'==t)return k(e,t),n.eatWhile((function(n){return'"'!=n})),n.next(),"@"!=n.peek()&&"^"!=n.peek()&&k(e,'"'),"string";if("@"==t){k(e,"@");var u="";return n.eatWhile((function(n){return" "!=n&&(u+=n,!0)})),e.langs.push(u),n.next(),k(e," "),"string.special"}if("^"==t){n.next(),k(e,"^");var s="";return n.eatWhile((function(n){return">"!=n&&(s+=n,!0)})),e.types.push(s),n.next(),k(e,">"),"variable"}" "==t&&k(e,t),"."==t&&k(e,t)}}}}]);