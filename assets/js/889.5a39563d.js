"use strict";(self.webpackChunk_2024teaching_seminar=self.webpackChunk_2024teaching_seminar||[]).push([[889],{70889:(n,e,t)=>{t.r(e),t.d(e,{cmake:()=>c});var a=/({)?[a-zA-Z0-9_]+(})?/;function i(n,e){for(var t,a,i=!1;!n.eol()&&(t=n.next())!=e.pending;){if("$"===t&&"\\"!=a&&'"'==e.pending){i=!0;break}a=t}return i&&n.backUp(1),t==e.pending?e.continueString=!1:e.continueString=!0,"string"}const c={name:"cmake",startState:function(){var n={inDefinition:!1,inInclude:!1,continueString:!1,pending:!1};return n},token:function(n,e){return n.eatSpace()?null:function(n,e){var t=n.next();return"$"===t?n.match(a)?"variableName.special":"variable":e.continueString?(n.backUp(1),i(n,e)):n.match(/(\s+)?\w+\(/)||n.match(/(\s+)?\w+\ \(/)?(n.backUp(1),"def"):"#"==t?(n.skipToEnd(),"comment"):"'"==t||'"'==t?(e.pending=t,i(n,e)):"("==t||")"==t?"bracket":t.match(/[0-9]/)?"number":(n.eatWhile(/[\w-]/),null)}(n,e)}}}}]);