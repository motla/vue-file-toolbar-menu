(function(){"use strict";var e={747:function(e,t,o){var i=o(515);i.Z.filter=function(){return!0},t["Z"]={props:{item:{type:Object,required:!0}},computed:{isMacLike:()=>/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),hotkey(){let e=this.item.hotkey;return"string"==typeof e&&(e=e.toUpperCase(),e=e.replace(/(shift|⇧)\+/gi,this.isMacLike?"⇧":"Shift+"),e=e.replace(/(control|ctrl|⌃)\+/gi,this.isMacLike?"⌃":"Ctrl+"),e=e.replace(/(option|alt|⌥)\+/gi,this.isMacLike?"⌥":"Alt+"),e=e.replace(/(cmd|command|⌘)\+/gi,this.isMacLike?"⌘":"Cmd+"),e)}},methods:{update_hotkey(e,t){t&&i.Z.unbind(t,this.hotkey_fn),e&&(0,i.Z)(e,this.hotkey_fn)},hotkey_fn(e,t){e.preventDefault(),this.item.click&&!this.item.disabled&&this.item.click(e,t)}},watch:{"item.hotkey":{handler:"update_hotkey",immediate:!0}},beforeUnmount(){this.item.hotkey&&i.Z.unbind(this.item.hotkey,this.hotkey_fn)}}},571:function(e,t,o){var i=o(963),n=o(252);const r=e=>((0,n.dD)("data-v-0572395a"),e=e(),(0,n.Cn)(),e),a={class:"main"},c=(0,n.uE)('<div class="title" data-v-0572395a>vue-file-toolbar-menu</div><div class="subtitle" data-v-0572395a><svg class="github" width="20" height="20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" data-v-0572395a><path d="M500,10C236.3,10,22.6,229.4,22.6,500c0,270.6,213.8,490,477.4,490c263.7,0,477.4-219.4,477.4-490C977.4,229.4,763.7,10,500,10z M643.3,940.1c-23,4.6-31.1-9.9-31.1-22.3c0-15.2,0.5-65.2,0.5-127.2c0-43.3-14.5-71.6-30.7-86c100.8-11.4,206.5-50.7,206.5-228.8c0-50.6-17.5-92.1-46.5-124.5c4.6-11.7,20.2-58.8-4.5-122.7c0,0-37.9-12.5-124.3,47.6c-36.1-10.3-74.8-15.5-113.2-15.7c-38.5,0.2-77.2,5.3-113.2,15.7c-86.4-60-124.4-47.6-124.4-47.6c-24.6,63.9-9.1,111-4.4,122.7c-28.9,32.4-46.5,73.8-46.5,124.5c0,177.7,105.6,217.5,206,229.2c-12.9,11.6-24.6,32-28.7,62c-25.8,11.8-91.3,32.3-131.6-38.6c0,0-23.9-44.5-69.3-47.8c0,0-44.2-0.6-3.1,28.2c0,0,29.7,14.2,50.2,67.8c0,0,26.6,90.2,152.4,62.2c0.2,38.7,0.6,67.9,0.6,78.9c0,12.3-8.2,26.6-30.9,22.3c-179.8-61.3-309.3-235.1-309.3-440C47.7,244,250.2,36.4,500,36.4c249.8,0,452.3,207.6,452.3,463.8C952.3,705,822.8,878.7,643.3,940.1z" data-v-0572395a></path></svg><a href="https://github.com/motla/vue-file-toolbar-menu" data-v-0572395a>view docs on github</a></div>',2),s={class:"styles"},l=r((()=>(0,n._)("option",{value:"default"},"Default style (Vue.js)",-1))),m=r((()=>(0,n._)("option",{value:"google-docs"},'"Google Docs"-like style',-1))),u=r((()=>(0,n._)("option",{value:"mac-os"},'"macOS"-like style',-1))),d=[l,m,u],h={class:"experiment"},p={class:"bars"},b=["contenteditable","innerHTML"];function g(e,t,o,r,l,m){const u=(0,n.up)("v-style"),g=(0,n.up)("vue-file-toolbar-menu");return(0,n.wg)(),(0,n.iD)("div",a,[c,(0,n._)("div",s,[(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>l.theme=e)},d,512),[[i.bM,l.theme]])]),"google-docs"==l.theme?((0,n.wg)(),(0,n.j4)(u,{key:0},{default:(0,n.w5)((()=>[(0,n.Uk)(" body { background-color: rgb(248, 249, 250); box-shadow: none; } ::selection { background-color: rgb(186, 212, 253); } :root { --demo-font-color: #222; --demo-bars-bkg: rgb(255, 255, 255); --demo-bars-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.15); --demo-bars-padding: 5px; --demo-bars-border-radius: 1px; --demo-text-bkg-color: white; --demo-text-box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.15); --bar-font-color: rgb(32, 33, 36); --bar-font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif; --bar-font-size: 15px; --bar-font-weight: 500; --bar-letter-spacing: 0.2px; --bar-padding: 3px; --bar-button-icon-size: 20px; --bar-button-padding: 4px 6px; --bar-button-radius: 4px; --bar-button-hover-bkg: rgb(241, 243, 244); --bar-button-active-color: rgb(26, 115, 232); --bar-button-active-bkg: rgb(232, 240, 254); --bar-button-open-color: rgb(32, 33, 36); --bar-button-open-bkg: rgb(232, 240, 254); --bar-menu-bkg: white; --bar-menu-border-radius: 0 0 3px 3px; --bar-menu-item-chevron-margin: 0; --bar-menu-item-hover-bkg: rgb(241, 243, 244); --bar-menu-item-padding: 5px 8px 5px 35px; --bar-menu-item-icon-size: 15px; --bar-menu-item-icon-margin: 0 9px 0 -25px; --bar-menu-padding: 6px 1px; --bar-menu-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.15); --bar-menu-separator-height: 1px; --bar-menu-separator-margin: 5px 0 5px 34px; --bar-menu-separator-color: rgb(227, 229, 233); --bar-separator-color: rgb(218, 220, 224); --bar-separator-width: 1px; --bar-sub-menu-border-radius: 3px; } .bars > .bar:first-child { border-bottom: 1px solid rgb(218, 220, 224); margin-bottom: 3px; } ")])),_:1})):"mac-os"==l.theme?((0,n.wg)(),(0,n.j4)(u,{key:1},{default:(0,n.w5)((()=>[(0,n.Uk)(' body { background-color: rgb(215, 215, 215); box-shadow: none; } ::selection { background-color: rgb(179, 215, 255); } :root { --demo-font-color: #222; --demo-bars-bkg: rgb(239, 239, 239); --demo-bars-shadow: none; --demo-bars-padding: 0 0 2px 0; --demo-text-bkg-color: rgba(0, 0, 0, 0.04); --bar-font-color: rgba(0, 0, 0, 0.75); --bar-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; --bar-font-size: 15.5px; --bar-button-icon-size: 20px; --bar-button-padding: 4px 7px 5px 7px; --bar-button-radius: 0; --bar-button-hover-bkg: none; --bar-button-active-color: white; --bar-button-active-bkg: rgba(41, 122, 255, 0.9); --bar-button-open-color: white; --bar-button-open-bkg: rgba(41, 122, 255, 0.9); --bar-menu-bkg: rgba(255, 255, 255, 0.95); --bar-menu-backdrop-filter: saturate(180%) blur(20px); --bar-menu-backdrop-filter-bkg: rgba(255, 255, 255, 0.3); --bar-menu-border: solid 1px #BBB; --bar-menu-border-radius: 0 0 6px 6px; --bar-menu-item-chevron-margin: 0; --bar-menu-item-hover-color: white; --bar-menu-item-hover-bkg: rgba(41, 122, 255, 0.9); --bar-menu-item-padding: 1px 12px 2px 25px; --bar-menu-item-icon-size: 16px; --bar-menu-item-icon-margin: 0 4px 0 -20px; --bar-menu-padding: 3px 0; --bar-menu-shadow: 0 6px 13px 0 rgba(60, 60, 60, 0.4); --bar-menu-separator-height: 2px; --bar-menu-separator-margin: 5px 0; --bar-menu-separator-color: rgba(0, 0, 0, 0.08); --bar-separator-color: rgba(0, 0, 0, 0.1); --bar-separator-width: 2px; --bar-separator-margin: 5px 7px; --bar-sub-menu-border-radius: 6px; } .bars > .bar:not(:first-child) { padding: 5px; } .bars > .bar:first-child { border-bottom: solid 1px #CCC; margin-bottom: 3px; } .bars > .bar:first-child > .bar-button:first-child { margin-left: 10px; } ')])),_:1})):(0,n.kq)("",!0),(0,n._)("div",h,[(0,n._)("div",p,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(m.bars_content,((e,t)=>((0,n.wg)(),(0,n.j4)(g,{key:"bar-"+t,content:e},null,8,["content"])))),128))]),(0,n._)("div",{ref:"text",class:"text",contenteditable:l.edit_mode,spellcheck:"false",innerHTML:l.initial_html},null,8,b)])])}var k=o(577);const f={class:"bar"};function _(e,t,o,i,r,a){return(0,n.wg)(),(0,n.iD)("div",f,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.content,((e,t)=>((0,n.wg)(),(0,n.j4)((0,n.LL)(a.get_component(e.is)),{key:"bar-item-"+t,item:e,class:(0,k.C_)(e.class),id:e.id,is_open:r.menu_open,ref_for:!0,ref:t=>Object.defineProperty(e,"_el",{value:t,writable:!0}),onClick:t=>a.toggle_menu(e,t)},null,8,["item","class","id","is_open","onClick"])))),128))])}const x=["title"],v={key:0,class:"material-icons icon"},w={key:1,class:"emoji"},y={key:2,class:"label"},C=["innerHTML"],j={key:4,class:"material-icons chevron"},M=["innerHTML"];function L(e,t,o,i,r,a){return(0,n.wg)(),(0,n.iD)("div",{class:(0,k.C_)(["bar-button",a.button_class]),title:a.title,onMousedown:t[0]||(t[0]=e=>e.preventDefault()),onClick:t[1]||(t[1]=e=>o.item.click&&!o.item.disabled?o.item.click(e):e.stopPropagation())},[o.item.icon?((0,n.wg)(),(0,n.iD)("span",v,(0,k.zw)(o.item.icon),1)):(0,n.kq)("",!0),o.item.emoji?((0,n.wg)(),(0,n.iD)("span",w,(0,k.zw)(a.get_emoji(o.item.emoji)),1)):(0,n.kq)("",!0),o.item.text?((0,n.wg)(),(0,n.iD)("span",y,(0,k.zw)(o.item.text),1)):(0,n.kq)("",!0),o.item.html?((0,n.wg)(),(0,n.iD)("span",{key:3,class:"label",innerHTML:o.item.html},null,8,C)):(0,n.kq)("",!0),!0===o.item.chevron?((0,n.wg)(),(0,n.iD)("span",j,"expand_more")):o.item.chevron?((0,n.wg)(),(0,n.iD)("span",{key:5,class:"chevron",innerHTML:o.item.chevron},null,8,M)):(0,n.kq)("",!0),o.item.menu?((0,n.wg)(),(0,n.j4)((0,n.LL)(a.get_component(o.item.menu)),{key:6,class:(0,k.C_)(["menu",o.item.menu_class]),menu:o.item.menu,id:o.item.menu_id,width:o.item.menu_width,height:o.item.menu_height},null,8,["menu","class","id","width","height"])):(0,n.kq)("",!0)],42,x)}var D=o(964),P=o(234),H=o(747),O={mixins:[H.Z],components:{BarMenu:P["default"]},props:{item:{type:Object,required:!0},is_open:Boolean},computed:{is_menu(){return!!this.item.menu},button_class(){const e=this.is_open&&this.is_menu,t=this.item.active,o=this.item.disabled;return{open:e,active:t,disabled:o}},title(){if(this.item.title){let e=this.item.title;return this.hotkey&&(e+=" ("+this.hotkey+")"),e}return null}},methods:{get_emoji:e=>e in D?D[e]:"",get_component(e){return e&&!Array.isArray(e)&&"object"==typeof e?e:"bar-menu"}}},A=o(744);const T=(0,A.Z)(O,[["render",L]]);var B=T;const q=["title"],z=["id"];function S(e,t,o,i,r,a){return(0,n.wg)(),(0,n.iD)("div",{class:(0,k.C_)(["bar-button",e.button_class]),title:e.title,onMousedown:t[2]||(t[2]=(...e)=>a.mousedown_handler&&a.mousedown_handler(...e))},[(0,n._)("div",{class:"color-square",style:(0,k.j5)({"background-color":a.css_color})},null,4),(0,n._)("div",{class:(0,k.C_)(["menu",e.item.menu_class]),id:e.item.menu_id,onClick:t[1]||(t[1]=t=>!e.item.stay_open||t.stopPropagation())},[((0,n.wg)(),(0,n.j4)((0,n.LL)(e.item.type||"compact"),{modelValue:r.color,"onUpdate:modelValue":t[0]||(t[0]=e=>r.color=e)},null,8,["modelValue"]))],10,z)],42,q)}var Z=o(856),I={mixins:[B],components:Z.wx.reduce(((e,t)=>(e[t.name]=t,e)),{}),data(){return{color:this.item.color}},computed:{is_menu(){return!0},css_color(){return this.color.hex8||this.color||"#000"}},methods:{mousedown_handler(e){"input"!=e.target.tagName.toLowerCase()&&e.preventDefault()}},watch:{"item.color"(e){this.color!=e&&(this._prevent_next_color_update=!0,this.color=e)},color(e){this.item.update_color&&!this._prevent_next_color_update&&this.item.update_color(e),this._prevent_next_color_update=!1}}};const N=(0,A.Z)(I,[["render",S],["__scopeId","data-v-f094c3d0"]]);var U=N;const E={class:"bar-separator"};function R(e,t){return(0,n.wg)(),(0,n.iD)("div",E)}const Y={},F=(0,A.Z)(Y,[["render",R]]);var V=F;const $={class:"bar-spacer"};function G(e,t){return(0,n.wg)(),(0,n.iD)("div",$)}const K={},W=(0,A.Z)(K,[["render",G]]);var J=W,Q={components:{BarButtonGeneric:B,BarButtonColor:U,BarSeparator:V,BarSpacer:J},props:{content:{type:Array,required:!0}},data(){return{menu_open:!1}},methods:{clickaway(e){this.$el.contains(e.target)||(this.menu_open=!1)},toggle_menu(e,t){t.stopPropagation();const o=t.sourceCapabilities&&t.sourceCapabilities.firesTouchEvents;this.menu_open=!(!e._el.is_menu||e.disabled)&&(!!o||!this.menu_open)},get_component(e){return e&&!Array.isArray(e)&&"object"==typeof e?e:"string"==typeof e?"bar-"+e:"bar-button-generic"}},mounted(){document.addEventListener("click",this.clickaway)},beforeUnmount(){document.removeEventListener("click",this.clickaway)}};const X=(0,A.Z)(Q,[["render",_],["__scopeId","data-v-517fd311"]]);var ee=X;const te={class:"label"};function oe(e,t,o,i,r,a){return(0,n.wg)(),(0,n.iD)("div",{class:"bar-button",onMousedown:t[0]||(t[0]=e=>e.preventDefault()),onClick:t[1]||(t[1]=e=>o.item.click&&!o.item.disabled?o.item.click(e):e.stopPropagation())},[(0,n._)("div",te,(0,k.zw)(o.item.text),1)],32)}var ie={props:{item:Object}};const ne=(0,A.Z)(ie,[["render",oe],["__scopeId","data-v-17ab7ad4"]]);var re=ne;const ae={class:"label"};function ce(e,t,o,i,r,a){return(0,n.wg)(),(0,n.iD)("div",{class:"bar-menu-item",onMousedown:t[0]||(t[0]=e=>e.preventDefault()),onClick:t[1]||(t[1]=e=>o.item.click&&!o.item.disabled?o.item.click(e):e.stopPropagation())},[(0,n._)("div",ae,(0,k.zw)(o.item.text),1)],32)}var se={props:{item:Object}};const le=(0,A.Z)(se,[["render",ce],["__scopeId","data-v-a87171f6"]]);var me=le,ue={components:{VueFileToolbarMenu:ee},data(){return{initial_html:"Try me! Here is some <strong>contenteditable</strong> &lt;div&gt; for the demo.",color:"rgb(74, 238, 164)",font:"Avenir",theme:"default",edit_mode:!0,check1:!1,check2:!1,check3:!0}},computed:{bars_content(){const e="mac-os"==this.theme?[{html:'<svg width="16" height="16" viewBox="0 0 16 16" style="fill: var(--bar-font-color, black)" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"/></svg>',menu:[{text:"Log Out",hotkey:"shift+command+q",click:()=>alert("No way!")}]},{html:'<span style="font-weight:700">YourApp</span>',menu:[{text:"Quit",hotkey:"command+q",click:()=>alert("No way!")}]}]:[];return[[...e,{text:"File",menu:[{text:"New",click:()=>{this.$refs.text.innerHTML=this.initial_html,this.focus_text()}},{text:"Save...",click:()=>alert("You're amazing, "+(prompt("What's your name?")||"friend")+"!")},{is:"separator"},{text:"Print...",click:()=>window.print()},{is:"separator"},{text:"Close",click(){confirm("Do you want to close the page?")&&window.close()}}]},{text:"Edit",menu:[{text:"Cut",click:()=>document.execCommand("cut")},{text:"Copy",click:()=>document.execCommand("copy")},{text:"Paste",click(){navigator.clipboard.readText().then((e=>{document.execCommand("insertText",!1,e)}))}}]},{text:"Formats",menu:[{text:"Basic"},{text:"Disabled",disabled:!0},{text:"Sub-menus",custom_chevron:"default"!=this.theme&&"►",menu:[{text:"Hello!"},{text:"I'm a sub-menu",custom_chevron:"default"!=this.theme&&"►",menu:[{text:"And I'm another sub-menu!",click:()=>console.log("Sub-menu clicked!")}],menu_width:240}],menu_width:200},{text:"Hotkey",hotkey:this.isMacLike?"command+e":"ctrl+e",click(){alert("Hotkey menu triggered either via clicking or shortcut.")}},{text:"Material icon",icon:"shopping_cart",click:()=>window.open("https://material.io/resources/icons","_blank")},{text:"Platform emoji",emoji:"call_me_hand",click:()=>window.open("https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json","_blank")},{text:"Menu text is wrapped when it is too long"},{is:me,text:"Your component",click:()=>alert("Your custom action!")},{is:"separator"},{text:"Option 1",icon:this.check1?"radio_button_unchecked":"radio_button_checked",click:e=>{e.stopPropagation(),this.check1=!1}},{text:"Option 2",icon:this.check1?"radio_button_checked":"radio_button_unchecked",click:e=>{e.stopPropagation(),this.check1=!0}},{is:"separator"},{text:"Option 3",icon:this.check2?"check_box":"check_box_outline_blank",click:e=>{e.stopPropagation(),this.check2=!this.check2}},{text:"Option 4",icon:this.check3?"check_box":"check_box_outline_blank",click:e=>{e.stopPropagation(),this.check3=!this.check3}}],menu_width:220},{text:"Help",menu:[{text:"About",icon:"help",click:()=>alert("vue-file-toolbar-menu\nhttps://github.com/motla/vue-file-toolbar-menu\nby @motla\nMIT License")},{is:"separator"},{text:"Repository",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu")},{text:"API",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu/blob/master/API.md")},{text:"Report Issue",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu/issues")},{text:"Release Notes",icon:"exit_to_app",click:()=>window.open("https://github.com/motla/vue-file-toolbar-menu/blob/master/CHANGELOG.md")}],menu_width:220},{is:"spacer"},{icon:this.edit_mode?"lock_open":"lock",title:"Toggle edit mode",active:!this.edit_mode,click:()=>{this.edit_mode=!this.edit_mode}}],[{icon:"format_align_left",title:"Align left",hotkey:this.isMacLike?"shift+command+l":"ctrl+shift+l",click:()=>document.execCommand("justifyLeft")},{icon:"format_align_center",title:"Align center",hotkey:this.isMacLike?"shift+command+e":"ctrl+shift+e",click:()=>document.execCommand("justifyCenter")},{icon:"format_align_right",title:"Align right",hotkey:this.isMacLike?"shift+command+r":"ctrl+shift+r",click:()=>document.execCommand("justifyRight")},{icon:"format_align_justify",title:"Justify content",hotkey:this.isMacLike?"shift+command+j":"ctrl+shift+j",click:()=>document.execCommand("justifyFull")},{is:"separator"},{icon:"format_bold",title:"Bold",hotkey:this.isMacLike?"command+b":"ctrl+b",click:()=>document.execCommand("bold")},{icon:"format_italic",title:"Italic",hotkey:this.isMacLike?"command+i":"ctrl+i",click:()=>document.execCommand("italic")},{icon:"format_underline",title:"Underline",hotkey:this.isMacLike?"command+u":"ctrl+u",click:()=>document.execCommand("underline")},{icon:"format_strikethrough",title:"Strike through",click:()=>document.execCommand("strikethrough")},{is:"button-color",type:"compact",menu_class:"align-center",stay_open:!1,color:this.color,update_color:e=>{this.color=e,document.execCommand("foreColor",!1,e.hex8)}},{is:"separator"},{html:'<div class="ellipsis" style="width: 80px; font-size: 95%;">'+this.font+"</div>",title:"Font",chevron:!0,menu:this.font_menu,menu_height:200},{is:"separator"},{icon:"format_list_numbered",title:"Numbered list",click:()=>document.execCommand("insertOrderedList")},{icon:"format_list_bulleted",title:"Bulleted list",click:()=>document.execCommand("insertUnorderedList")},{is:"separator"},{icon:"format_indent_increase",title:"Increase indent",click:()=>document.execCommand("indent")},{icon:"format_indent_decrease",title:"Decrease indent",click:()=>document.execCommand("outdent")},{is:"separator"},{is:re,text:"Your component",click:()=>alert("Your custom action!")},{is:"separator"},{html:"<b>H1</b>",title:"Header 1",click:()=>document.execCommand("formatBlock",!1,"<h1>")},{html:"<b>H2</b>",title:"Header 2",click:()=>document.execCommand("formatBlock",!1,"<h2>")},{html:"<b>H3</b>",title:"Header 3",click:()=>document.execCommand("formatBlock",!1,"<h3>")},{icon:"format_clear",text:"Clear",title:"Clear format",click(){document.execCommand("removeFormat"),document.execCommand("formatBlock",!1,"<div>")}}]]},isMacLike:()=>/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),font_menu(){return this.font_list.map((e=>({html:'<span class="ellipsis" style="font-family:'+e+'">'+e+"</span>",icon:"default"!=this.theme&&this.font==e&&"check",active:this.font==e,height:20,click:()=>{document.execCommand("fontName",!1,e),this.font=e}})))},font_list:()=>["Arial","Avenir","Courier New","Garamond","Georgia","Impact","Helvetica","Palatino","Roboto","Times New Roman","Verdana"],is_touch_device:()=>"ontouchstart"in window||window.navigator.msMaxTouchPoints>0},methods:{focus_text(){this.$refs.text.focus(),document.execCommand("selectAll",!1,null),document.getSelection().collapseToEnd()}},mounted(){this.is_touch_device||this.focus_text()}};const de=(0,A.Z)(ue,[["render",g],["__scopeId","data-v-0572395a"]]);var he=de;const pe=(0,i.ri)(he);pe.config.devtools=!0,pe.component("v-style",{render(){return(0,n.h)("style",{},this.$slots.default())}}),pe.mount("#app")},234:function(e,t,o){o.r(t),o.d(t,{default:function(){return H}});var i=o(252),n=o(577);const r={class:"bar-menu"},a=(0,i._)("div",{class:"extended-hover-zone"},null,-1);function c(e,t,o,c,s,l){return(0,i.wg)(),(0,i.iD)("div",r,[a,(0,i._)("div",{class:"bar-menu-items",style:(0,n.j5)({width:o.width+"px",minWidth:o.width+"px",maxHeight:o.height+"px",overflow:o.height?"auto":"visible"})},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.menu,((e,t)=>((0,i.wg)(),(0,i.j4)((0,i.LL)(l.get_component(e.is)),{item:e,class:(0,n.C_)(e.class),id:e.id,key:"menu-"+t},null,8,["item","class","id"])))),128))],4)])}const s=["title"],l={key:0,class:"material-icons icon"},m={key:1,class:"emoji"},u={key:2,class:"label"},d=["innerHTML"],h={key:4,class:"hotkey"},p=["innerHTML"],b={key:6,class:"material-icons chevron"};function g(e,t,o,r,a,c){return(0,i.wg)(),(0,i.iD)("div",{class:(0,n.C_)(["bar-menu-item",{disabled:o.item.disabled,active:o.item.active}]),onMousedown:t[0]||(t[0]=e=>e.preventDefault()),onClick:t[1]||(t[1]=(...e)=>c.click&&c.click(...e)),title:o.item.title,style:(0,n.j5)({height:o.item.height+"px"})},[o.item.icon?((0,i.wg)(),(0,i.iD)("span",l,(0,n.zw)(o.item.icon),1)):(0,i.kq)("",!0),o.item.emoji?((0,i.wg)(),(0,i.iD)("span",m,(0,n.zw)(c.get_emoji(o.item.emoji)),1)):(0,i.kq)("",!0),o.item.text?((0,i.wg)(),(0,i.iD)("span",u,(0,n.zw)(o.item.text),1)):(0,i.kq)("",!0),o.item.html?((0,i.wg)(),(0,i.iD)("span",{key:3,class:"label",innerHTML:o.item.html},null,8,d)):(0,i.kq)("",!0),o.item.hotkey?((0,i.wg)(),(0,i.iD)("span",h,(0,n.zw)(e.hotkey),1)):(0,i.kq)("",!0),o.item.menu&&o.item.custom_chevron?((0,i.wg)(),(0,i.iD)("span",{key:5,class:"chevron",innerHTML:o.item.custom_chevron},null,8,p)):o.item.menu?((0,i.wg)(),(0,i.iD)("span",b,"chevron_right")):(0,i.kq)("",!0),o.item.menu?((0,i.wg)(),(0,i.j4)((0,i.LL)(c.get_component(o.item.menu)),{key:7,ref:"menu",class:(0,n.C_)(["menu",o.item.menu_class]),menu:o.item.menu,id:o.item.menu_id,width:o.item.menu_width,height:o.item.menu_height},null,8,["menu","class","id","width","height"])):(0,i.kq)("",!0)],46,s)}var k=o(964),f=o(747),_={mixins:[f.Z],components:{BarMenu:(0,i.RC)((()=>Promise.resolve().then(o.bind(o,234))))},props:{item:{type:Object,required:!0}},methods:{click(e){this.item.click&&!this.item.disabled?this.item.click(e):this.$refs.menu&&e.composedPath&&e.composedPath().includes(this.$refs.menu.$el)||e.stopPropagation()},get_emoji:e=>e in k?k[e]:"",get_component(e){return e&&!Array.isArray(e)&&"object"==typeof e?e:"bar-menu"}}},x=o(744);const v=(0,x.Z)(_,[["render",g]]);var w=v;const y={class:"bar-menu-separator"};function C(e,t){return(0,i.wg)(),(0,i.iD)("div",y)}const j={},M=(0,x.Z)(j,[["render",C]]);var L=M,D={components:{BarMenuItem:w,BarMenuSeparator:L},props:{menu:{type:Array,required:!0},width:Number,height:Number},methods:{get_component(e){return"object"==typeof e?e:"string"==typeof e?"bar-menu-"+e:"bar-menu-item"}}};const P=(0,x.Z)(D,[["render",c]]);var H=P}},t={};function o(i){var n=t[i];if(void 0!==n)return n.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,i,n,r){if(!i){var a=1/0;for(m=0;m<e.length;m++){i=e[m][0],n=e[m][1],r=e[m][2];for(var c=!0,s=0;s<i.length;s++)(!1&r||a>=r)&&Object.keys(o.O).every((function(e){return o.O[e](i[s])}))?i.splice(s--,1):(c=!1,r<a&&(a=r));if(c){e.splice(m--,1);var l=n();void 0!==l&&(t=l)}}return t}r=r||0;for(var m=e.length;m>0&&e[m-1][2]>r;m--)e[m]=e[m-1];e[m]=[i,n,r]}}(),function(){o.d=function(e,t){for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,i){var n,r,a=i[0],c=i[1],s=i[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(n in c)o.o(c,n)&&(o.m[n]=c[n]);if(s)var m=s(o)}for(t&&t(i);l<a.length;l++)r=a[l],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(m)},i=self["webpackChunkvue_file_toolbar_menu"]=self["webpackChunkvue_file_toolbar_menu"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=o.O(void 0,[998],(function(){return o(571)}));i=o.O(i)})();
//# sourceMappingURL=app.bc96f8a3.js.map