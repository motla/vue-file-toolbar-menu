(function(){"use strict";var t={2989:function(t,e,o){o.r(e),o.d(e,{default:function(){return C}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bar-menu"},[e("div",{staticClass:"extended-hover-zone"}),e("div",{staticClass:"bar-menu-items",style:{width:t.width+"px",minWidth:t.width+"px",maxHeight:t.height+"px",overflow:t.height?"auto":"visible"}},t._l(t.menu,(function(o,i){return e(t.get_component(o.is),{key:"menu-"+i,tag:"component",class:o.class,attrs:{item:o,id:o.id}})})),1)])},n=[],r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bar-menu-item",class:{disabled:t.item.disabled,active:t.item.active},style:{height:t.item.height+"px"},attrs:{title:t.item.title},on:{mousedown:t=>t.preventDefault(),click:t.click}},[t.item.icon?["object"==typeof t.item.icon?e(t.item.icon,{tag:"component",staticClass:"icon"}):e("span",{staticClass:"material-icons icon"},[t._v(t._s(t.item.icon))])]:t._e(),t.item.emoji?e("span",{staticClass:"emoji"},[t._v(t._s(t.get_emoji(t.item.emoji)))]):t._e(),t.item.text?e("span",{staticClass:"label"},[t._v(t._s(t.item.text))]):t._e(),t.item.html?e("span",{staticClass:"label",domProps:{innerHTML:t._s(t.item.html)}}):t._e(),t.item.hotkey?e("span",{staticClass:"hotkey"},[t._v(t._s(t.hotkey))]):t._e(),t.item.menu&&t.item.custom_chevron?e("span",{staticClass:"chevron",domProps:{innerHTML:t._s(t.item.custom_chevron)}}):t.item.menu?e("span",{staticClass:"material-icons chevron"},[t._v("chevron_right")]):t._e(),t.item.menu?e(t.get_component(t.item.menu),{ref:"menu",tag:"component",staticClass:"menu",class:t.item.menu_class,attrs:{menu:t.item.menu,id:t.item.menu_id,width:t.item.menu_width,height:t.item.menu_height}}):t._e()],2)},a=[],s=o(8445),c=o.n(s),l=o(8959),m={mixins:[l.Z],components:{BarMenu:()=>Promise.resolve().then(o.bind(o,2989))},props:{item:{type:Object,required:!0}},methods:{click(t){this.item.click&&!this.item.disabled?this.item.click(t):this.$refs.menu&&t.composedPath&&t.composedPath().includes(this.$refs.menu.$el)||t.stopPropagation()},get_emoji:t=>c().get(t),get_component(t){return t&&!Array.isArray(t)&&"object"==typeof t?t:"bar-menu"}}},u=m,d=o(1001),p=(0,d.Z)(u,r,a,!1,null,null,null),h=p.exports,b=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bar-menu-separator"})},_=[],f={},g=(0,d.Z)(f,b,_,!1,null,null,null),x=g.exports,k={components:{BarMenuItem:h,BarMenuSeparator:x},props:{menu:{type:Array,required:!0},width:Number,height:Number},methods:{get_component(t){return"object"==typeof t?t:"string"==typeof t?"bar-menu-"+t:"bar-menu-item"}}},v=k,y=(0,d.Z)(v,i,n,!1,null,null,null),C=y.exports},8959:function(t,e,o){var i=o(8515);i.Z.filter=function(){return!0},e["Z"]={props:{item:{type:Object,required:!0}},computed:{isMacLike:()=>/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),hotkey(){let t=this.item.hotkey;return"string"==typeof t&&(t=t.toUpperCase(),t=t.replace(/(shift|⇧)\+/gi,this.isMacLike?"⇧":"Shift+"),t=t.replace(/(control|ctrl|⌃)\+/gi,this.isMacLike?"⌃":"Ctrl+"),t=t.replace(/(option|alt|⌥)\+/gi,this.isMacLike?"⌥":"Alt+"),t=t.replace(/(cmd|command|⌘)\+/gi,this.isMacLike?"⌘":"Cmd+"),t)}},methods:{update_hotkey(t,e){e&&i.Z.unbind(e,this.hotkey_fn),t&&(0,i.Z)(t,this.hotkey_fn)},hotkey_fn(t,e){t.preventDefault(),this.item.click&&!this.item.disabled&&this.item.click(t,e)}},watch:{"item.hotkey":{handler:"update_hotkey",immediate:!0}},beforeDestroy(){this.item.hotkey&&i.Z.unbind(this.item.hotkey,this.hotkey_fn)}}},2067:function(t,e,o){var i=o(144),n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"main"},[e("div",{staticClass:"title"},[t._v("vue-file-toolbar-menu")]),e("div",{staticClass:"subtitle"},[e("svg",{staticClass:"github",attrs:{width:"20",height:"20",viewBox:"0 0 1000 1000",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{d:"M500,10C236.3,10,22.6,229.4,22.6,500c0,270.6,213.8,490,477.4,490c263.7,0,477.4-219.4,477.4-490C977.4,229.4,763.7,10,500,10z M643.3,940.1c-23,4.6-31.1-9.9-31.1-22.3c0-15.2,0.5-65.2,0.5-127.2c0-43.3-14.5-71.6-30.7-86c100.8-11.4,206.5-50.7,206.5-228.8c0-50.6-17.5-92.1-46.5-124.5c4.6-11.7,20.2-58.8-4.5-122.7c0,0-37.9-12.5-124.3,47.6c-36.1-10.3-74.8-15.5-113.2-15.7c-38.5,0.2-77.2,5.3-113.2,15.7c-86.4-60-124.4-47.6-124.4-47.6c-24.6,63.9-9.1,111-4.4,122.7c-28.9,32.4-46.5,73.8-46.5,124.5c0,177.7,105.6,217.5,206,229.2c-12.9,11.6-24.6,32-28.7,62c-25.8,11.8-91.3,32.3-131.6-38.6c0,0-23.9-44.5-69.3-47.8c0,0-44.2-0.6-3.1,28.2c0,0,29.7,14.2,50.2,67.8c0,0,26.6,90.2,152.4,62.2c0.2,38.7,0.6,67.9,0.6,78.9c0,12.3-8.2,26.6-30.9,22.3c-179.8-61.3-309.3-235.1-309.3-440C47.7,244,250.2,36.4,500,36.4c249.8,0,452.3,207.6,452.3,463.8C952.3,705,822.8,878.7,643.3,940.1z"}})]),e("a",{attrs:{href:"https://github.com/motla/vue-file-toolbar-menu"}},[t._v("view docs on github")])]),e("div",{staticClass:"styles"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.theme,expression:"theme"}],on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.theme=e.target.multiple?o:o[0]}}},[e("option",{attrs:{value:"default"}},[t._v("Default style (Vue.js)")]),e("option",{attrs:{value:"google-docs"}},[t._v('"Google Docs"-like style')]),e("option",{attrs:{value:"mac-os"}},[t._v('"macOS"-like style')])])]),"google-docs"==t.theme?e("v-style",[t._v(" body { background-color: rgb(248, 249, 250); box-shadow: none; } ::selection { background-color: rgb(186, 212, 253); } :root { --demo-font-color: #222; --demo-bars-bkg: rgb(255, 255, 255); --demo-bars-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.15); --demo-bars-padding: 5px; --demo-bars-border-radius: 1px; --demo-text-bkg-color: white; --demo-text-box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.15); --bar-font-color: rgb(32, 33, 36); --bar-font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; --bar-font-size: 15px; --bar-font-weight: 500; --bar-letter-spacing: 0.2px; --bar-padding: 3px; --bar-button-icon-size: 20px; --bar-button-padding: 4px 6px; --bar-button-radius: 4px; --bar-button-hover-bkg: rgb(241, 243, 244); --bar-button-active-color: rgb(26, 115, 232); --bar-button-active-bkg: rgb(232, 240, 254); --bar-button-open-color: rgb(32, 33, 36); --bar-button-open-bkg: rgb(232, 240, 254); --bar-menu-bkg: white; --bar-menu-border-radius: 0 0 3px 3px; --bar-menu-item-chevron-margin: 0; --bar-menu-item-hover-bkg: rgb(241, 243, 244); --bar-menu-item-padding: 5px 8px 5px 35px; --bar-menu-item-icon-size: 15px; --bar-menu-item-icon-margin: 0 9px 0 -25px; --bar-menu-padding: 6px 1px; --bar-menu-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.15); --bar-menu-separator-height: 1px; --bar-menu-separator-margin: 5px 0 5px 34px; --bar-menu-separator-color: rgb(227, 229, 233); --bar-separator-color: rgb(218, 220, 224); --bar-separator-width: 1px; --bar-sub-menu-border-radius: 3px; } .bars > .bar:first-child { border-bottom: 1px solid rgb(218, 220, 224); margin-bottom: 3px; } ")]):"mac-os"==t.theme?e("v-style",[t._v(' body { background-color: rgb(215, 215, 215); box-shadow: none; } ::selection { background-color: rgb(179, 215, 255); } :root { --demo-font-color: #222; --demo-bars-bkg: rgb(239, 239, 239); --demo-bars-shadow: none; --demo-bars-padding: 0 0 2px 0; --demo-text-bkg-color: rgba(0, 0, 0, 0.04); --bar-font-color: rgba(0, 0, 0, 0.75); --bar-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; --bar-font-size: 15.5px; --bar-button-icon-size: 20px; --bar-button-padding: 4px 7px 5px 7px; --bar-button-radius: 0; --bar-button-hover-bkg: none; --bar-button-active-color: white; --bar-button-active-bkg: rgba(41, 122, 255, 0.9); --bar-button-open-color: white; --bar-button-open-bkg: rgba(41, 122, 255, 0.9); --bar-menu-bkg: rgba(255, 255, 255, 0.95); --bar-menu-backdrop-filter: saturate(180%) blur(20px); --bar-menu-backdrop-filter-bkg: rgba(255, 255, 255, 0.3); --bar-menu-border: solid 1px #BBB; --bar-menu-border-radius: 0 0 6px 6px; --bar-menu-item-chevron-margin: 0; --bar-menu-item-hover-color: white; --bar-menu-item-hover-bkg: rgba(41, 122, 255, 0.9); --bar-menu-item-padding: 1px 12px 2px 25px; --bar-menu-item-icon-size: 16px; --bar-menu-item-icon-margin: 0 4px 0 -20px; --bar-menu-padding: 3px 0; --bar-menu-shadow: 0 6px 13px 0 rgba(60, 60, 60, 0.4); --bar-menu-separator-height: 2px; --bar-menu-separator-margin: 5px 0; --bar-menu-separator-color: rgba(0, 0, 0, 0.08); --bar-separator-color: rgba(0, 0, 0, 0.1); --bar-separator-width: 2px; --bar-separator-margin: 5px 7px; --bar-sub-menu-border-radius: 6px; } .bars > .bar:not(:first-child) { padding: 5px; } .bars > .bar:first-child { border-bottom: solid 1px #CCC; margin-bottom: 3px; } .bars > .bar:first-child > .bar-button:first-child { margin-left: 10px; } ')]):t._e(),e("div",{staticClass:"experiment"},[e("div",{staticClass:"bars"},t._l(t.bars_content,(function(t,o){return e("vue-file-toolbar-menu",{key:"bar-"+o,attrs:{content:t}})})),1),e("div",{ref:"text",staticClass:"text",attrs:{contenteditable:t.edit_mode,spellcheck:"false"},domProps:{innerHTML:t._s(t.initial_html)}})])],1)},r=[],a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bar"},t._l(t.content,(function(o,i){return e(t.get_component(o.is),{key:"bar-item-"+i,ref:"bar-item-"+i,refInFor:!0,tag:"component",class:o.class,attrs:{item:o,id:o.id,is_open:t.menu_open},on:{click:e=>t.toggle_menu("bar-item-"+i,e)}})})),1)},s=[],c=function(){var t=this,e=t._self._c;return e("div",t._g({staticClass:"bar-button",class:t.button_class,attrs:{title:t.title},on:{mousedown:t=>t.preventDefault(),click:e=>t.item.click&&!t.item.disabled?t.item.click(e):e.stopPropagation()}},t.$listeners),[t.item.icon?["object"==typeof t.item.icon?e(t.item.icon,{tag:"component",staticClass:"icon"}):e("span",{staticClass:"material-icons icon"},[t._v(t._s(t.item.icon))])]:t._e(),t.item.emoji?e("span",{staticClass:"emoji"},[t._v(t._s(t.get_emoji(t.item.emoji)))]):t._e(),t.item.text?e("span",{staticClass:"label"},[t._v(t._s(t.item.text))]):t._e(),t.item.html?e("span",{staticClass:"label",domProps:{innerHTML:t._s(t.item.html)}}):t._e(),!0===t.item.chevron?e("span",{staticClass:"material-icons chevron"},[t._v("expand_more")]):t.item.chevron?e("span",{staticClass:"chevron",domProps:{innerHTML:t._s(t.item.chevron)}}):t._e(),t.item.menu?e(t.get_component(t.item.menu),{tag:"component",staticClass:"menu",class:t.item.menu_class,attrs:{menu:t.item.menu,id:t.item.menu_id,width:t.item.menu_width,height:t.item.menu_height}}):t._e()],2)},l=[],m=o(8445),u=o.n(m),d=o(2989),p=o(8959),h={mixins:[p.Z],components:{BarMenu:d["default"]},props:{item:{type:Object,required:!0},is_open:Boolean},computed:{is_menu(){return!!this.item.menu},button_class(){const t=this.is_open&&this.is_menu,e=this.item.active,o=this.item.disabled;return{open:t,active:e,disabled:o}},title(){if(this.item.title){let t=this.item.title;return this.hotkey&&(t+=" ("+this.hotkey+")"),t}return!1}},methods:{get_emoji:t=>u().get(t),get_component(t){return t&&!Array.isArray(t)&&"object"==typeof t?t:"bar-menu"}}},b=h,_=o(1001),f=(0,_.Z)(b,c,l,!1,null,null,null),g=f.exports,x=function(){var t=this,e=t._self._c;return e("div",t._g({staticClass:"bar-button",class:t.button_class,attrs:{title:t.title},on:{mousedown:t.mousedown_handler}},t.$listeners),[e("div",{staticClass:"color-square",style:{"background-color":t.css_color}}),e("div",{staticClass:"menu",class:t.item.menu_class,attrs:{id:t.item.menu_id},on:{click:e=>!t.item.stay_open||e.stopPropagation()}},[e(t.item.type||"compact",{tag:"component",model:{value:t.color,callback:function(e){t.color=e},expression:"color"}})],1)])},k=[],v=o(4023),y=o.n(v),C={mixins:[g],components:{...y()},data(){return{color:this.item.color}},computed:{is_menu(){return!0},css_color(){return this.color.hex8||this.color||"#000"}},methods:{mousedown_handler(t){"input"!=t.target.tagName.toLowerCase()&&t.preventDefault()}},watch:{"item.color"(t){this.color!=t&&(this._prevent_next_color_update=!0,this.color=t)},color(t){this.item.update_color&&!this._prevent_next_color_update&&this.item.update_color(t),this._prevent_next_color_update=!1}}},w=C,j=(0,_.Z)(w,x,k,!1,null,"1c919db4",null),M=j.exports,P=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bar-separator"})},L=[],A={},O=(0,_.Z)(A,P,L,!1,null,null,null),B=O.exports,H=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bar-spacer"})},Z=[],T={},S=(0,_.Z)(T,H,Z,!1,null,null,null),D=S.exports,I={components:{BarButtonGeneric:g,BarButtonColor:M,BarSeparator:B,BarSpacer:D},props:{content:{type:Array,required:!0}},data(){return{menu_open:!1}},methods:{clickaway(t){this.$el.contains(t.target)||(this.menu_open=!1)},toggle_menu(t,e){e.stopPropagation();const o=this.$refs[t][0],i=o.item&&o.item.disabled,n=e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents;this.menu_open=!(!o.is_menu||i)&&(!!n||!this.menu_open)},get_component(t){return t&&!Array.isArray(t)&&"object"==typeof t?t:"string"==typeof t?"bar-"+t:"bar-button-generic"}},mounted(){document.addEventListener("click",this.clickaway)},beforeDestroy(){document.removeEventListener("click",this.clickaway)}},N=I,z=(0,_.Z)(N,a,s,!1,null,"6767c098",null),$=z.exports,E=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bar-button",on:{mousedown:t=>t.preventDefault(),click:e=>t.item.click&&!t.item.disabled?t.item.click(e):e.stopPropagation()}},[e("div",{staticClass:"label"},[t._v(t._s(t.item.text))])])},F=[],R={props:{item:Object}},q=R,G=(0,_.Z)(q,E,F,!1,null,"17ab7ad4",null),U=G.exports,Y=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bar-menu-item",on:{mousedown:t=>t.preventDefault(),click:e=>t.item.click&&!t.item.disabled?t.item.click(e):e.stopPropagation()}},[e("div",{staticClass:"label"},[t._v(t._s(t.item.text))])])},V=[],W={props:{item:Object}},J=W,Q=(0,_.Z)(J,Y,V,!1,null,"a87171f6",null),K=Q.exports;i.ZP.component("v-style",{render(t){return t("style",this.$slots.default)}});var X={components:{VueFileToolbarMenu:$},data(){return{initial_html:"Try me! Here is some <strong>contenteditable</strong> &lt;div&gt; for the demo.",color:"rgb(74, 238, 164)",font:"Avenir",theme:"default",edit_mode:!0,check1:!1,check2:!1,check3:!0}},computed:{bars_content(){const t="mac-os"==this.theme?[{html:'<svg width="16" height="16" viewBox="0 0 16 16" style="fill: var(--bar-font-color, black)" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"/></svg>',menu:[{text:"Log Out",hotkey:"shift+command+q",click:()=>alert("No way!")}]},{html:'<span style="font-weight:700">YourApp</span>',menu:[{text:"Quit",hotkey:"command+q",click:()=>alert("No way!")}]}]:[];return[[...t,{text:"File",menu:[{text:"New",click:()=>{this.$refs.text.innerHTML=this.initial_html,this.focus_text()}},{text:"Save...",click:()=>alert("You're amazing, "+(prompt("What's your name?")||"friend")+"!")},{is:"separator"},{text:"Print...",click:()=>window.print()},{is:"separator"},{text:"Close",click(){confirm("Do you want to close the page?")&&window.close()}}]},{text:"Edit",menu:[{text:"Cut",click:()=>document.execCommand("cut")},{text:"Copy",click:()=>document.execCommand("copy")},{text:"Paste",click(){navigator.clipboard.readText().then((t=>{document.execCommand("insertText",!1,t)}))}}]},{text:"Formats",menu:[{text:"Basic"},{text:"Disabled",disabled:!0},{text:"Sub-menus",custom_chevron:"default"!=this.theme&&"►",menu:[{text:"Hello!"},{text:"I'm a sub-menu",custom_chevron:"default"!=this.theme&&"►",menu:[{text:"And I'm another sub-menu!"}],menu_width:240}],menu_width:200},{text:"Hotkey",hotkey:this.isMacLike?"command+e":"ctrl+e",click(){alert("Hotkey menu triggered either via clicking or shortcut.")}},{text:"Material icon",icon:"shopping_cart",click:()=>window.open("https://material.io/resources/icons","_blank")},{text:"Platform emoji",emoji:"call_me_hand",click:()=>window.open("https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json","_blank")},{text:"Menu text is wrapped when it is too long"},{is:K,text:"Your component",click:()=>alert("Your custom action!")},{is:"separator"},{text:"Option 1",icon:this.check1?"radio_button_unchecked":"radio_button_checked",click:t=>{t.stopPropagation(),this.check1=!1}},{text:"Option 2",icon:this.check1?"radio_button_checked":"radio_button_unchecked",click:t=>{t.stopPropagation(),this.check1=!0}},{is:"separator"},{text:"Option 3",icon:this.check2?"check_box":"check_box_outline_blank",click:t=>{t.stopPropagation(),this.check2=!this.check2}},{text:"Option 4",icon:this.check3?"check_box":"check_box_outline_blank",click:t=>{t.stopPropagation(),this.check3=!this.check3}}],menu_width:220},{text:"Help",menu:[{text:"About",icon:"help",click:()=>alert("vue-file-toolbar-menu\nhttps://github.com/motla/vue-file-toolbar-menu\nby @motla\nMIT License")},{is:"separator"},{text:"Repository",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu")},{text:"API",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu/blob/master/API.md")},{text:"Report Issue",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu/issues")},{text:"Release Notes",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu/blob/master/CHANGELOG.md")}],menu_width:220},{is:"spacer"},{icon:this.edit_mode?"lock_open":"lock",title:"Toggle edit mode",active:!this.edit_mode,click:()=>{this.edit_mode=!this.edit_mode}}],[{icon:"format_align_left",title:"Align left",hotkey:this.isMacLike?"shift+command+l":"ctrl+shift+l",click:()=>document.execCommand("justifyLeft")},{icon:"format_align_center",title:"Align center",hotkey:this.isMacLike?"shift+command+e":"ctrl+shift+e",click:()=>document.execCommand("justifyCenter")},{icon:"format_align_right",title:"Align right",hotkey:this.isMacLike?"shift+command+r":"ctrl+shift+r",click:()=>document.execCommand("justifyRight")},{icon:"format_align_justify",title:"Justify content",hotkey:this.isMacLike?"shift+command+j":"ctrl+shift+j",click:()=>document.execCommand("justifyFull")},{is:"separator"},{icon:"format_bold",title:"Bold",hotkey:this.isMacLike?"command+b":"ctrl+b",click:()=>document.execCommand("bold")},{icon:"format_italic",title:"Italic",hotkey:this.isMacLike?"command+i":"ctrl+i",click:()=>document.execCommand("italic")},{icon:"format_underline",title:"Underline",hotkey:this.isMacLike?"command+u":"ctrl+u",click:()=>document.execCommand("underline")},{icon:"format_strikethrough",title:"Strike through",click:()=>document.execCommand("strikethrough")},{is:"button-color",type:"compact",menu_class:"align-center",stay_open:!1,color:this.color,update_color:t=>{this.color=t,document.execCommand("foreColor",!1,t.hex8)}},{is:"separator"},{html:'<div class="ellipsis" style="width: 80px; font-size: 95%;">'+this.font+"</div>",title:"Font",chevron:!0,menu:this.font_menu,menu_height:200},{is:"separator"},{icon:"format_list_numbered",title:"Numbered list",click:()=>document.execCommand("insertOrderedList")},{icon:"format_list_bulleted",title:"Bulleted list",click:()=>document.execCommand("insertUnorderedList")},{is:"separator"},{icon:"format_indent_increase",title:"Increase indent",click:()=>document.execCommand("indent")},{icon:"format_indent_decrease",title:"Decrease indent",click:()=>document.execCommand("outdent")},{is:"separator"},{is:U,text:"Your component",click:()=>alert("Your custom action!")},{is:"separator"},{html:"<b>H1</b>",title:"Header 1",click:()=>document.execCommand("formatBlock",!1,"<h1>")},{html:"<b>H2</b>",title:"Header 2",click:()=>document.execCommand("formatBlock",!1,"<h2>")},{html:"<b>H3</b>",title:"Header 3",click:()=>document.execCommand("formatBlock",!1,"<h3>")},{icon:"format_clear",text:"Clear",title:"Clear format",click(){document.execCommand("removeFormat"),document.execCommand("formatBlock",!1,"<div>")}}]]},isMacLike:()=>/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),font_menu(){return this.font_list.map((t=>({html:'<span class="ellipsis" style="font-family:'+t+'">'+t+"</span>",icon:"default"!=this.theme&&this.font==t&&"check",active:this.font==t,height:20,click:()=>{document.execCommand("fontName",!1,t),this.font=t}})))},font_list:()=>["Arial","Avenir","Courier New","Garamond","Georgia","Impact","Helvetica","Palatino","Roboto","Times New Roman","Verdana"],is_touch_device:()=>"ontouchstart"in window||window.navigator.msMaxTouchPoints>0},methods:{focus_text(){this.$refs.text.focus(),document.execCommand("selectAll",!1,null),document.getSelection().collapseToEnd()}},mounted(){this.is_touch_device||this.focus_text()}},tt=X,et=(0,_.Z)(tt,n,r,!1,null,"52fe8aac",null),ot=et.exports;i.ZP.config.productionTip=!1,new i.ZP({render:t=>t(ot)}).$mount("#app")}},e={};function o(i){var n=e[i];if(void 0!==n)return n.exports;var r=e[i]={id:i,loaded:!1,exports:{}};return t[i].call(r.exports,r,r.exports,o),r.loaded=!0,r.exports}o.m=t,function(){var t=[];o.O=function(e,i,n,r){if(!i){var a=1/0;for(m=0;m<t.length;m++){i=t[m][0],n=t[m][1],r=t[m][2];for(var s=!0,c=0;c<i.length;c++)(!1&r||a>=r)&&Object.keys(o.O).every((function(t){return o.O[t](i[c])}))?i.splice(c--,1):(s=!1,r<a&&(a=r));if(s){t.splice(m--,1);var l=n();void 0!==l&&(e=l)}}return e}r=r||0;for(var m=t.length;m>0&&t[m-1][2]>r;m--)t[m]=t[m-1];t[m]=[i,n,r]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){o.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};o.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,r,a=i[0],s=i[1],c=i[2],l=0;if(a.some((function(e){return 0!==t[e]}))){for(n in s)o.o(s,n)&&(o.m[n]=s[n]);if(c)var m=c(o)}for(e&&e(i);l<a.length;l++)r=a[l],o.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return o.O(m)},i=self["webpackChunkvue_file_toolbar_menu"]=self["webpackChunkvue_file_toolbar_menu"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=o.O(void 0,[998],(function(){return o(2067)}));i=o.O(i)})();
//# sourceMappingURL=app.af7ffe3d.js.map