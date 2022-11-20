/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 584:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ bar_hotkey_manager; }
});

;// CONCATENATED MODULE: ./node_modules/hotkeys-js/dist/hotkeys.esm.js
/**! 
 * hotkeys-js v3.10.0 
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies. 
 * 
 * Copyright (c) 2022 kenny wong <wowohoo@qq.com> 
 * http://jaywcjlove.github.io/hotkeys 
 * Licensed under the MIT license 
 */

var isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false; // 绑定事件

function addEvent(object, event, method, useCapture) {
  if (object.addEventListener) {
    object.addEventListener(event, method, useCapture);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), function () {
      method(window.event);
    });
  }
} // 修饰键转换成对应的键码


function getMods(modifier, key) {
  var mods = key.slice(0, key.length - 1);

  for (var i = 0; i < mods.length; i++) {
    mods[i] = modifier[mods[i].toLowerCase()];
  }

  return mods;
} // 处理传的key字符串转换成数组


function getKeys(key) {
  if (typeof key !== 'string') key = '';
  key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等

  var keys = key.split(','); // 同时设置多个快捷键，以','分割

  var index = keys.lastIndexOf(''); // 快捷键可能包含','，需特殊处理

  for (; index >= 0;) {
    keys[index - 1] += ',';
    keys.splice(index, 1);
    index = keys.lastIndexOf('');
  }

  return keys;
} // 比较修饰键的数组


function compareArray(a1, a2) {
  var arr1 = a1.length >= a2.length ? a1 : a2;
  var arr2 = a1.length >= a2.length ? a2 : a1;
  var isIndex = true;

  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
  }

  return isIndex;
}

var _keyMap = {
  backspace: 8,
  '⌫': 8,
  tab: 9,
  clear: 12,
  enter: 13,
  '↩': 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  num_0: 96,
  num_1: 97,
  num_2: 98,
  num_3: 99,
  num_4: 100,
  num_5: 101,
  num_6: 102,
  num_7: 103,
  num_8: 104,
  num_9: 105,
  num_multiply: 106,
  num_add: 107,
  num_enter: 108,
  num_subtract: 109,
  num_decimal: 110,
  num_divide: 111,
  '⇪': 20,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': isff ? 173 : 189,
  '=': isff ? 61 : 187,
  ';': isff ? 59 : 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '\\': 220
}; // Modifier Keys

var _modifier = {
  // shiftKey
  '⇧': 16,
  shift: 16,
  // altKey
  '⌥': 18,
  alt: 18,
  option: 18,
  // ctrlKey
  '⌃': 17,
  ctrl: 17,
  control: 17,
  // metaKey
  '⌘': 91,
  cmd: 91,
  command: 91
};
var modifierMap = {
  16: 'shiftKey',
  18: 'altKey',
  17: 'ctrlKey',
  91: 'metaKey',
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
};
var _mods = {
  16: false,
  18: false,
  17: false,
  91: false
};
var _handlers = {}; // F1~F12 special key

for (var k = 1; k < 20; k++) {
  _keyMap["f".concat(k)] = 111 + k;
}

var _downKeys = []; // 记录摁下的绑定键

var winListendFocus = false; // window是否已经监听了focus事件

var _scope = 'all'; // 默认热键范围

var elementHasBindEvent = []; // 已绑定事件的节点记录
// 返回键码

var code = function code(x) {
  return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
};

var getKey = function getKey(x) {
  return Object.keys(_keyMap).find(function (k) {
    return _keyMap[k] === x;
  });
};

var getModifier = function getModifier(x) {
  return Object.keys(_modifier).find(function (k) {
    return _modifier[k] === x;
  });
}; // 设置获取当前范围（默认为'所有'）


function setScope(scope) {
  _scope = scope || 'all';
} // 获取当前范围


function getScope() {
  return _scope || 'all';
} // 获取摁下绑定键的键值


function getPressedKeyCodes() {
  return _downKeys.slice(0);
}

function getPressedKeyString() {
  return _downKeys.map(function (c) {
    return getKey(c) || getModifier(c) || String.fromCharCode(c);
  });
} // 表单控件控件判断 返回 Boolean
// hotkey is effective only when filter return true


function filter(event) {
  var target = event.target || event.srcElement;
  var tagName = target.tagName;
  var flag = true; // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>

  if (target.isContentEditable || (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') && !target.readOnly) {
    flag = false;
  }

  return flag;
} // 判断摁下的键是否为某个键，返回true或者false


function isPressed(keyCode) {
  if (typeof keyCode === 'string') {
    keyCode = code(keyCode); // 转换成键码
  }

  return _downKeys.indexOf(keyCode) !== -1;
} // 循环删除handlers中的所有 scope(范围)


function deleteScope(scope, newScope) {
  var handlers;
  var i; // 没有指定scope，获取scope

  if (!scope) scope = getScope();

  for (var key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];

      for (i = 0; i < handlers.length;) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
      }
    }
  } // 如果scope被删除，将scope重置为all


  if (getScope() === scope) setScope(newScope || 'all');
} // 清除修饰键


function clearModifier(event) {
  var key = event.keyCode || event.which || event.charCode;

  var i = _downKeys.indexOf(key); // 从列表中清除按压过的键


  if (i >= 0) {
    _downKeys.splice(i, 1);
  } // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题


  if (event.key && event.key.toLowerCase() === 'meta') {
    _downKeys.splice(0, _downKeys.length);
  } // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除


  if (key === 93 || key === 224) key = 91;

  if (key in _mods) {
    _mods[key] = false; // 将修饰键重置为false

    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = false;
    }
  }
}

function unbind(keysInfo) {
  // unbind(), unbind all keys
  if (typeof keysInfo === 'undefined') {
    Object.keys(_handlers).forEach(function (key) {
      return delete _handlers[key];
    });
  } else if (Array.isArray(keysInfo)) {
    // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])
    keysInfo.forEach(function (info) {
      if (info.key) eachUnbind(info);
    });
  } else if (typeof keysInfo === 'object') {
    // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})
    if (keysInfo.key) eachUnbind(keysInfo);
  } else if (typeof keysInfo === 'string') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // support old method
    // eslint-disable-line
    var scope = args[0],
        method = args[1];

    if (typeof scope === 'function') {
      method = scope;
      scope = '';
    }

    eachUnbind({
      key: keysInfo,
      scope: scope,
      method: method,
      splitKey: '+'
    });
  }
} // 解除绑定某个范围的快捷键


var eachUnbind = function eachUnbind(_ref) {
  var key = _ref.key,
      scope = _ref.scope,
      method = _ref.method,
      _ref$splitKey = _ref.splitKey,
      splitKey = _ref$splitKey === void 0 ? '+' : _ref$splitKey;
  var multipleKeys = getKeys(key);
  multipleKeys.forEach(function (originKey) {
    var unbindKeys = originKey.split(splitKey);
    var len = unbindKeys.length;
    var lastKey = unbindKeys[len - 1];
    var keyCode = lastKey === '*' ? '*' : code(lastKey);
    if (!_handlers[keyCode]) return; // 判断是否传入范围，没有就获取范围

    if (!scope) scope = getScope();
    var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
    _handlers[keyCode] = _handlers[keyCode].filter(function (record) {
      // 通过函数判断，是否解除绑定，函数相等直接返回
      var isMatchingMethod = method ? record.method === method : true;
      return !(isMatchingMethod && record.scope === scope && compareArray(record.mods, mods));
    });
  });
}; // 对监听对应快捷键的回调函数进行处理


function eventHandler(event, handler, scope, element) {
  if (handler.element !== element) {
    return;
  }

  var modifiersMatch; // 看它是否在当前范围

  if (handler.scope === scope || handler.scope === 'all') {
    // 检查是否匹配修饰符（如果有返回true）
    modifiersMatch = handler.mods.length > 0;

    for (var y in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y)) {
        if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
          modifiersMatch = false;
        }
      }
    } // 调用处理程序，如果是修饰键不做处理


    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault();else event.returnValue = false;
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble) event.cancelBubble = true;
      }
    }
  }
} // 处理keydown事件


function dispatch(event, element) {
  var asterisk = _handlers['*'];
  var key = event.keyCode || event.which || event.charCode; // 表单控件过滤 默认表单控件不触发快捷键

  if (!hotkeys.filter.call(this, event)) return; // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
  // Webkit左右 command 键值不一样

  if (key === 93 || key === 224) key = 91;
  /**
   * Collect bound keys
   * If an Input Method Editor is processing key input and the event is keydown, return 229.
   * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229
   * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
   */

  if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
  /**
   * Jest test cases are required.
   * ===============================
   */

  ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'].forEach(function (keyName) {
    var keyNum = modifierMap[keyName];

    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum);
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1);
    } else if (keyName === 'metaKey' && event[keyName] && _downKeys.length === 3) {
      /**
       * Fix if Command is pressed:
       * ===============================
       */
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
      }
    }
  });
  /**
   * -------------------------------
   */

  if (key in _mods) {
    _mods[key] = true; // 将特殊字符的key注册到 hotkeys 上

    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = true;
    }

    if (!asterisk) return;
  } // 将 modifierMap 里面的修饰键绑定到 event 中


  for (var e in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
      _mods[e] = event[modifierMap[e]];
    }
  }
  /**
   * https://github.com/jaywcjlove/hotkeys/pull/129
   * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.
   * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.
   * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate
   */


  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17);
    }

    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18);
    }

    _mods[17] = true;
    _mods[18] = true;
  } // 获取范围 默认为 `all`


  var scope = getScope(); // 对任何快捷键都需要做的处理

  if (asterisk) {
    for (var i = 0; i < asterisk.length; i++) {
      if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) {
        eventHandler(event, asterisk[i], scope, element);
      }
    }
  } // key 不在 _handlers 中返回


  if (!(key in _handlers)) return;

  for (var _i = 0; _i < _handlers[key].length; _i++) {
    if (event.type === 'keydown' && _handlers[key][_i].keydown || event.type === 'keyup' && _handlers[key][_i].keyup) {
      if (_handlers[key][_i].key) {
        var record = _handlers[key][_i];
        var splitKey = record.splitKey;
        var keyShortcut = record.key.split(splitKey);
        var _downKeysCurrent = []; // 记录当前按键键值

        for (var a = 0; a < keyShortcut.length; a++) {
          _downKeysCurrent.push(code(keyShortcut[a]));
        }

        if (_downKeysCurrent.sort().join('') === _downKeys.sort().join('')) {
          // 找到处理内容
          eventHandler(event, record, scope, element);
        }
      }
    }
  }
} // 判断 element 是否已经绑定事件


function isElementBind(element) {
  return elementHasBindEvent.indexOf(element) > -1;
}

function hotkeys(key, option, method) {
  _downKeys = [];
  var keys = getKeys(key); // 需要处理的快捷键列表

  var mods = [];
  var scope = 'all'; // scope默认为all，所有范围都有效

  var element = document; // 快捷键事件绑定节点

  var i = 0;
  var keyup = false;
  var keydown = true;
  var splitKey = '+';
  var capture = false; // 对为设定范围的判断

  if (method === undefined && typeof option === 'function') {
    method = option;
  }

  if (Object.prototype.toString.call(option) === '[object Object]') {
    if (option.scope) scope = option.scope; // eslint-disable-line

    if (option.element) element = option.element; // eslint-disable-line

    if (option.keyup) keyup = option.keyup; // eslint-disable-line

    if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line

    if (option.capture !== undefined) capture = option.capture; // eslint-disable-line

    if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line
  }

  if (typeof option === 'string') scope = option; // 对于每个快捷键进行处理

  for (; i < keys.length; i++) {
    key = keys[i].split(splitKey); // 按键列表

    mods = []; // 如果是组合快捷键取得组合快捷键

    if (key.length > 1) mods = getMods(_modifier, key); // 将非修饰键转化为键码

    key = key[key.length - 1];
    key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键
    // 判断key是否在_handlers中，不在就赋一个空数组

    if (!(key in _handlers)) _handlers[key] = [];

    _handlers[key].push({
      keyup: keyup,
      keydown: keydown,
      scope: scope,
      mods: mods,
      shortcut: keys[i],
      method: method,
      key: keys[i],
      splitKey: splitKey,
      element: element
    });
  } // 在全局document上设置快捷键


  if (typeof element !== 'undefined' && !isElementBind(element) && window) {
    elementHasBindEvent.push(element);
    addEvent(element, 'keydown', function (e) {
      dispatch(e, element);
    }, capture);

    if (!winListendFocus) {
      winListendFocus = true;
      addEvent(window, 'focus', function () {
        _downKeys = [];
      }, capture);
    }

    addEvent(element, 'keyup', function (e) {
      dispatch(e, element);
      clearModifier(e);
    }, capture);
  }
}

function trigger(shortcut) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
  Object.keys(_handlers).forEach(function (key) {
    var data = _handlers[key].find(function (item) {
      return item.scope === scope && item.shortcut === shortcut;
    });

    if (data && data.method) {
      data.method();
    }
  });
}

var _api = {
  getPressedKeyString: getPressedKeyString,
  setScope: setScope,
  getScope: getScope,
  deleteScope: deleteScope,
  getPressedKeyCodes: getPressedKeyCodes,
  isPressed: isPressed,
  filter: filter,
  trigger: trigger,
  unbind: unbind,
  keyMap: _keyMap,
  modifier: _modifier,
  modifierMap: modifierMap
};

for (var a in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a)) {
    hotkeys[a] = _api[a];
  }
}

if (typeof window !== 'undefined') {
  var _hotkeys = window.hotkeys;

  hotkeys.noConflict = function (deep) {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }

    return hotkeys;
  };

  window.hotkeys = hotkeys;
}



;// CONCATENATED MODULE: ./src/Bar/imports/bar-hotkey-manager.js

hotkeys.filter = function () {
  return true;
}; // allow hotkeys from every element

/* harmony default export */ var bar_hotkey_manager = ({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    isMacLike: () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
    hotkey() {
      let s = this.item.hotkey;
      if (typeof s != "string") return false;
      s = s.toUpperCase();
      s = s.replace(/(shift|⇧)\+/ig, this.isMacLike ? "⇧" : "Shift+");
      s = s.replace(/(control|ctrl|⌃)\+/ig, this.isMacLike ? "⌃" : "Ctrl+");
      s = s.replace(/(option|alt|⌥)\+/ig, this.isMacLike ? "⌥" : "Alt+");
      s = s.replace(/(cmd|command|⌘)\+/ig, this.isMacLike ? "⌘" : "Cmd+");
      return s;
    }
  },
  methods: {
    update_hotkey(new_hotkey, old_hotkey) {
      if (old_hotkey) hotkeys.unbind(old_hotkey, this.hotkey_fn);
      if (new_hotkey) hotkeys(new_hotkey, this.hotkey_fn);
    },
    hotkey_fn(event, handler) {
      event.preventDefault();
      if (this.item.click && !this.item.disabled) this.item.click(event, handler);
    }
  },
  watch: {
    "item.hotkey": {
      handler: "update_hotkey",
      immediate: true
    }
  },
  beforeUnmount() {
    if (this.item.hotkey) hotkeys.unbind(this.item.hotkey, this.hotkey_fn);
  }
});

/***/ }),

/***/ 744:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.Z = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ 600:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ BarMenu; }
});

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(797);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarMenu.vue?vue&type=template&id=0b0941d8

const _hoisted_1 = {
  class: "bar-menu"
};
const _hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
  class: "extended-hover-zone"
}, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", _hoisted_1, [_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
    class: "bar-menu-items",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({
      width: $props.width + 'px',
      minWidth: $props.width + 'px',
      maxHeight: $props.height + 'px',
      overflow: $props.height ? 'auto' : 'visible'
    })
  }, [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($props.menu, (item, index) => {
    return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveDynamicComponent)($options.get_component(item.is)), {
      item: item,
      class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(item.class),
      id: item.id,
      key: 'menu-' + index
    }, null, 8, ["item", "class", "id"]);
  }), 128))], 4)]);
}
;// CONCATENATED MODULE: ./src/Bar/BarMenu.vue?vue&type=template&id=0b0941d8

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarMenuItem.vue?vue&type=template&id=7598ac68

const BarMenuItemvue_type_template_id_7598ac68_hoisted_1 = ["title"];
const BarMenuItemvue_type_template_id_7598ac68_hoisted_2 = {
  key: 1,
  class: "material-icons icon"
};
const _hoisted_3 = {
  key: 1,
  class: "emoji"
};
const _hoisted_4 = {
  key: 2,
  class: "label"
};
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = {
  key: 4,
  class: "hotkey"
};
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = {
  key: 6,
  class: "material-icons chevron"
};
function BarMenuItemvue_type_template_id_7598ac68_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["bar-menu-item", {
      disabled: $props.item.disabled,
      active: $props.item.active
    }]),
    onMousedown: _cache[0] || (_cache[0] = e => e.preventDefault()),
    onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args)),
    title: $props.item.title,
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({
      height: $props.item.height + 'px'
    })
  }, [$props.item.icon ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, {
    key: 0
  }, [typeof $props.item.icon == 'object' ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveDynamicComponent)($props.item.icon), {
    key: 0,
    class: "icon"
  })) : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", BarMenuItemvue_type_template_id_7598ac68_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.item.icon), 1))], 64)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.emoji ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_3, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($options.get_emoji($props.item.emoji)), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.text ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.item.text), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.html ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", {
    key: 3,
    class: "label",
    innerHTML: $props.item.html
  }, null, 8, _hoisted_5)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.hotkey ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)(_ctx.hotkey), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.menu && $props.item.custom_chevron ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", {
    key: 5,
    class: "chevron",
    innerHTML: $props.item.custom_chevron
  }, null, 8, _hoisted_7)) : $props.item.menu ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_8, "chevron_right")) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.menu ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveDynamicComponent)($options.get_component($props.item.menu)), {
    key: 7,
    ref: "menu",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["menu", $props.item.menu_class]),
    menu: $props.item.menu,
    id: $props.item.menu_id,
    width: $props.item.menu_width,
    height: $props.item.menu_height
  }, null, 8, ["menu", "class", "id", "width", "height"])) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true)], 46, BarMenuItemvue_type_template_id_7598ac68_hoisted_1);
}
;// CONCATENATED MODULE: ./src/Bar/BarMenuItem.vue?vue&type=template&id=7598ac68

// EXTERNAL MODULE: ./node_modules/node-emoji/lib/emoji.json
var emoji = __webpack_require__(964);
// EXTERNAL MODULE: ./src/Bar/imports/bar-hotkey-manager.js + 1 modules
var bar_hotkey_manager = __webpack_require__(584);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarMenuItem.vue?vue&type=script&lang=js



/* harmony default export */ var BarMenuItemvue_type_script_lang_js = ({
  mixins: [bar_hotkey_manager/* default */.Z],
  components: {
    BarMenu: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.defineAsyncComponent)(() => Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 600))) // because of circular reference
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    click(e) {
      if (this.item.click && !this.item.disabled) this.item.click(e);else if (!this.$refs.menu || !e.composedPath || !e.composedPath().includes(this.$refs.menu.$el)) {
        e.stopPropagation(); // prevent menu close for touch devices
      }
    },

    get_emoji: emoji_name => emoji_name in emoji ? emoji[emoji_name] : "",
    get_component(is) {
      if (is && !Array.isArray(is) && typeof is == "object") return is; // if component
      else return "bar-menu";
    }
  }
});
;// CONCATENATED MODULE: ./src/Bar/BarMenuItem.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(744);
;// CONCATENATED MODULE: ./src/Bar/BarMenuItem.vue




;
const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(BarMenuItemvue_type_script_lang_js, [['render',BarMenuItemvue_type_template_id_7598ac68_render]])

/* harmony default export */ var BarMenuItem = (__exports__);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarMenuSeparator.vue?vue&type=template&id=4ba03b66

const BarMenuSeparatorvue_type_template_id_4ba03b66_hoisted_1 = {
  class: "bar-menu-separator"
};
function BarMenuSeparatorvue_type_template_id_4ba03b66_render(_ctx, _cache) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", BarMenuSeparatorvue_type_template_id_4ba03b66_hoisted_1);
}
;// CONCATENATED MODULE: ./src/Bar/BarMenuSeparator.vue?vue&type=template&id=4ba03b66

;// CONCATENATED MODULE: ./src/Bar/BarMenuSeparator.vue

const script = {}

;
const BarMenuSeparator_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(script, [['render',BarMenuSeparatorvue_type_template_id_4ba03b66_render]])

/* harmony default export */ var BarMenuSeparator = (BarMenuSeparator_exports_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarMenu.vue?vue&type=script&lang=js


/* harmony default export */ var BarMenuvue_type_script_lang_js = ({
  components: {
    BarMenuItem: BarMenuItem,
    BarMenuSeparator: BarMenuSeparator
  },
  props: {
    menu: {
      type: Array,
      required: true
    },
    width: Number,
    height: Number
  },
  methods: {
    get_component(is) {
      if (typeof is == "object") return is;else if (typeof is == "string") return 'bar-menu-' + is;else return 'bar-menu-item';
    }
  }
});
;// CONCATENATED MODULE: ./src/Bar/BarMenu.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/Bar/BarMenu.vue




;
const BarMenu_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(BarMenuvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var BarMenu = (BarMenu_exports_);

/***/ }),

/***/ 797:
/***/ (function(module) {

module.exports = require("vue");

/***/ }),

/***/ 964:
/***/ (function(module) {

module.exports = JSON.parse('{"100":"💯","1234":"🔢","umbrella_with_rain_drops":"☔","coffee":"☕","aries":"♈","taurus":"♉","sagittarius":"♐","capricorn":"♑","aquarius":"♒","pisces":"♓","anchor":"⚓","white_check_mark":"✅","sparkles":"✨","question":"❓","grey_question":"❔","grey_exclamation":"❕","exclamation":"❗","heavy_exclamation_mark":"❗","heavy_plus_sign":"➕","heavy_minus_sign":"➖","heavy_division_sign":"➗","hash":"#️⃣","keycap_star":"*️⃣","zero":"0️⃣","one":"1️⃣","two":"2️⃣","three":"3️⃣","four":"4️⃣","five":"5️⃣","six":"6️⃣","seven":"7️⃣","eight":"8️⃣","nine":"9️⃣","copyright":"©️","registered":"®️","mahjong":"🀄","black_joker":"🃏","a":"🅰️","b":"🅱️","o2":"🅾️","parking":"🅿️","ab":"🆎","cl":"🆑","cool":"🆒","free":"🆓","id":"🆔","new":"🆕","ng":"🆖","ok":"🆗","sos":"🆘","up":"🆙","vs":"🆚","flag-ac":"🇦🇨","flag-ad":"🇦🇩","flag-ae":"🇦🇪","flag-af":"🇦🇫","flag-ag":"🇦🇬","flag-ai":"🇦🇮","flag-al":"🇦🇱","flag-am":"🇦🇲","flag-ao":"🇦🇴","flag-aq":"🇦🇶","flag-ar":"🇦🇷","flag-as":"🇦🇸","flag-at":"🇦🇹","flag-au":"🇦🇺","flag-aw":"🇦🇼","flag-ax":"🇦🇽","flag-az":"🇦🇿","flag-ba":"🇧🇦","flag-bb":"🇧🇧","flag-bd":"🇧🇩","flag-be":"🇧🇪","flag-bf":"🇧🇫","flag-bg":"🇧🇬","flag-bh":"🇧🇭","flag-bi":"🇧🇮","flag-bj":"🇧🇯","flag-bl":"🇧🇱","flag-bm":"🇧🇲","flag-bn":"🇧🇳","flag-bo":"🇧🇴","flag-bq":"🇧🇶","flag-br":"🇧🇷","flag-bs":"🇧🇸","flag-bt":"🇧🇹","flag-bv":"🇧🇻","flag-bw":"🇧🇼","flag-by":"🇧🇾","flag-bz":"🇧🇿","flag-ca":"🇨🇦","flag-cc":"🇨🇨","flag-cd":"🇨🇩","flag-cf":"🇨🇫","flag-cg":"🇨🇬","flag-ch":"🇨🇭","flag-ci":"🇨🇮","flag-ck":"🇨🇰","flag-cl":"🇨🇱","flag-cm":"🇨🇲","cn":"🇨🇳","flag-cn":"🇨🇳","flag-co":"🇨🇴","flag-cp":"🇨🇵","flag-cr":"🇨🇷","flag-cu":"🇨🇺","flag-cv":"🇨🇻","flag-cw":"🇨🇼","flag-cx":"🇨🇽","flag-cy":"🇨🇾","flag-cz":"🇨🇿","de":"🇩🇪","flag-de":"🇩🇪","flag-dg":"🇩🇬","flag-dj":"🇩🇯","flag-dk":"🇩🇰","flag-dm":"🇩🇲","flag-do":"🇩🇴","flag-dz":"🇩🇿","flag-ea":"🇪🇦","flag-ec":"🇪🇨","flag-ee":"🇪🇪","flag-eg":"🇪🇬","flag-eh":"🇪🇭","flag-er":"🇪🇷","es":"🇪🇸","flag-es":"🇪🇸","flag-et":"🇪🇹","flag-eu":"🇪🇺","flag-fi":"🇫🇮","flag-fj":"🇫🇯","flag-fk":"🇫🇰","flag-fm":"🇫🇲","flag-fo":"🇫🇴","fr":"🇫🇷","flag-fr":"🇫🇷","flag-ga":"🇬🇦","gb":"🇬🇧","uk":"🇬🇧","flag-gb":"🇬🇧","flag-gd":"🇬🇩","flag-ge":"🇬🇪","flag-gf":"🇬🇫","flag-gg":"🇬🇬","flag-gh":"🇬🇭","flag-gi":"🇬🇮","flag-gl":"🇬🇱","flag-gm":"🇬🇲","flag-gn":"🇬🇳","flag-gp":"🇬🇵","flag-gq":"🇬🇶","flag-gr":"🇬🇷","flag-gs":"🇬🇸","flag-gt":"🇬🇹","flag-gu":"🇬🇺","flag-gw":"🇬🇼","flag-gy":"🇬🇾","flag-hk":"🇭🇰","flag-hm":"🇭🇲","flag-hn":"🇭🇳","flag-hr":"🇭🇷","flag-ht":"🇭🇹","flag-hu":"🇭🇺","flag-ic":"🇮🇨","flag-id":"🇮🇩","flag-ie":"🇮🇪","flag-il":"🇮🇱","flag-im":"🇮🇲","flag-in":"🇮🇳","flag-io":"🇮🇴","flag-iq":"🇮🇶","flag-ir":"🇮🇷","flag-is":"🇮🇸","it":"🇮🇹","flag-it":"🇮🇹","flag-je":"🇯🇪","flag-jm":"🇯🇲","flag-jo":"🇯🇴","jp":"🇯🇵","flag-jp":"🇯🇵","flag-ke":"🇰🇪","flag-kg":"🇰🇬","flag-kh":"🇰🇭","flag-ki":"🇰🇮","flag-km":"🇰🇲","flag-kn":"🇰🇳","flag-kp":"🇰🇵","kr":"🇰🇷","flag-kr":"🇰🇷","flag-kw":"🇰🇼","flag-ky":"🇰🇾","flag-kz":"🇰🇿","flag-la":"🇱🇦","flag-lb":"🇱🇧","flag-lc":"🇱🇨","flag-li":"🇱🇮","flag-lk":"🇱🇰","flag-lr":"🇱🇷","flag-ls":"🇱🇸","flag-lt":"🇱🇹","flag-lu":"🇱🇺","flag-lv":"🇱🇻","flag-ly":"🇱🇾","flag-ma":"🇲🇦","flag-mc":"🇲🇨","flag-md":"🇲🇩","flag-me":"🇲🇪","flag-mf":"🇲🇫","flag-mg":"🇲🇬","flag-mh":"🇲🇭","flag-mk":"🇲🇰","flag-ml":"🇲🇱","flag-mm":"🇲🇲","flag-mn":"🇲🇳","flag-mo":"🇲🇴","flag-mp":"🇲🇵","flag-mq":"🇲🇶","flag-mr":"🇲🇷","flag-ms":"🇲🇸","flag-mt":"🇲🇹","flag-mu":"🇲🇺","flag-mv":"🇲🇻","flag-mw":"🇲🇼","flag-mx":"🇲🇽","flag-my":"🇲🇾","flag-mz":"🇲🇿","flag-na":"🇳🇦","flag-nc":"🇳🇨","flag-ne":"🇳🇪","flag-nf":"🇳🇫","flag-ng":"🇳🇬","flag-ni":"🇳🇮","flag-nl":"🇳🇱","flag-no":"🇳🇴","flag-np":"🇳🇵","flag-nr":"🇳🇷","flag-nu":"🇳🇺","flag-nz":"🇳🇿","flag-om":"🇴🇲","flag-pa":"🇵🇦","flag-pe":"🇵🇪","flag-pf":"🇵🇫","flag-pg":"🇵🇬","flag-ph":"🇵🇭","flag-pk":"🇵🇰","flag-pl":"🇵🇱","flag-pm":"🇵🇲","flag-pn":"🇵🇳","flag-pr":"🇵🇷","flag-ps":"🇵🇸","flag-pt":"🇵🇹","flag-pw":"🇵🇼","flag-py":"🇵🇾","flag-qa":"🇶🇦","flag-re":"🇷🇪","flag-ro":"🇷🇴","flag-rs":"🇷🇸","ru":"🇷🇺","flag-ru":"🇷🇺","flag-rw":"🇷🇼","flag-sa":"🇸🇦","flag-sb":"🇸🇧","flag-sc":"🇸🇨","flag-sd":"🇸🇩","flag-se":"🇸🇪","flag-sg":"🇸🇬","flag-sh":"🇸🇭","flag-si":"🇸🇮","flag-sj":"🇸🇯","flag-sk":"🇸🇰","flag-sl":"🇸🇱","flag-sm":"🇸🇲","flag-sn":"🇸🇳","flag-so":"🇸🇴","flag-sr":"🇸🇷","flag-ss":"🇸🇸","flag-st":"🇸🇹","flag-sv":"🇸🇻","flag-sx":"🇸🇽","flag-sy":"🇸🇾","flag-sz":"🇸🇿","flag-ta":"🇹🇦","flag-tc":"🇹🇨","flag-td":"🇹🇩","flag-tf":"🇹🇫","flag-tg":"🇹🇬","flag-th":"🇹🇭","flag-tj":"🇹🇯","flag-tk":"🇹🇰","flag-tl":"🇹🇱","flag-tm":"🇹🇲","flag-tn":"🇹🇳","flag-to":"🇹🇴","flag-tr":"🇹🇷","flag-tt":"🇹🇹","flag-tv":"🇹🇻","flag-tw":"🇹🇼","flag-tz":"🇹🇿","flag-ua":"🇺🇦","flag-ug":"🇺🇬","flag-um":"🇺🇲","flag-un":"🇺🇳","us":"🇺🇸","flag-us":"🇺🇸","flag-uy":"🇺🇾","flag-uz":"🇺🇿","flag-va":"🇻🇦","flag-vc":"🇻🇨","flag-ve":"🇻🇪","flag-vg":"🇻🇬","flag-vi":"🇻🇮","flag-vn":"🇻🇳","flag-vu":"🇻🇺","flag-wf":"🇼🇫","flag-ws":"🇼🇸","flag-xk":"🇽🇰","flag-ye":"🇾🇪","flag-yt":"🇾🇹","flag-za":"🇿🇦","flag-zm":"🇿🇲","flag-zw":"🇿🇼","koko":"🈁","sa":"🈂️","u7121":"🈚","u6307":"🈯","u7981":"🈲","u7a7a":"🈳","u5408":"🈴","u6e80":"🈵","u6709":"🈶","u6708":"🈷️","u7533":"🈸","u5272":"🈹","u55b6":"🈺","ideograph_advantage":"🉐","accept":"🉑","cyclone":"🌀","foggy":"🌁","closed_umbrella":"🌂","night_with_stars":"🌃","sunrise_over_mountains":"🌄","sunrise":"🌅","city_sunset":"🌆","city_sunrise":"🌇","rainbow":"🌈","bridge_at_night":"🌉","ocean":"🌊","volcano":"🌋","milky_way":"🌌","earth_africa":"🌍","earth_americas":"🌎","earth_asia":"🌏","globe_with_meridians":"🌐","new_moon":"🌑","waxing_crescent_moon":"🌒","first_quarter_moon":"🌓","moon":"🌔","waxing_gibbous_moon":"🌔","full_moon":"🌕","waning_gibbous_moon":"🌖","last_quarter_moon":"🌗","waning_crescent_moon":"🌘","crescent_moon":"🌙","new_moon_with_face":"🌚","first_quarter_moon_with_face":"🌛","last_quarter_moon_with_face":"🌜","full_moon_with_face":"🌝","sun_with_face":"🌞","star2":"🌟","stars":"🌠","thermometer":"🌡️","mostly_sunny":"🌤️","sun_small_cloud":"🌤️","barely_sunny":"🌥️","sun_behind_cloud":"🌥️","partly_sunny_rain":"🌦️","sun_behind_rain_cloud":"🌦️","rain_cloud":"🌧️","snow_cloud":"🌨️","lightning":"🌩️","lightning_cloud":"🌩️","tornado":"🌪️","tornado_cloud":"🌪️","fog":"🌫️","wind_blowing_face":"🌬️","hotdog":"🌭","taco":"🌮","burrito":"🌯","chestnut":"🌰","seedling":"🌱","evergreen_tree":"🌲","deciduous_tree":"🌳","palm_tree":"🌴","cactus":"🌵","hot_pepper":"🌶️","tulip":"🌷","cherry_blossom":"🌸","rose":"🌹","hibiscus":"🌺","sunflower":"🌻","blossom":"🌼","corn":"🌽","ear_of_rice":"🌾","herb":"🌿","four_leaf_clover":"🍀","maple_leaf":"🍁","fallen_leaf":"🍂","leaves":"🍃","mushroom":"🍄","tomato":"🍅","eggplant":"🍆","grapes":"🍇","melon":"🍈","watermelon":"🍉","tangerine":"🍊","lemon":"🍋","banana":"🍌","pineapple":"🍍","apple":"🍎","green_apple":"🍏","pear":"🍐","peach":"🍑","cherries":"🍒","strawberry":"🍓","hamburger":"🍔","pizza":"🍕","meat_on_bone":"🍖","poultry_leg":"🍗","rice_cracker":"🍘","rice_ball":"🍙","rice":"🍚","curry":"🍛","ramen":"🍜","spaghetti":"🍝","bread":"🍞","fries":"🍟","sweet_potato":"🍠","dango":"🍡","oden":"🍢","sushi":"🍣","fried_shrimp":"🍤","fish_cake":"🍥","icecream":"🍦","shaved_ice":"🍧","ice_cream":"🍨","doughnut":"🍩","cookie":"🍪","chocolate_bar":"🍫","candy":"🍬","lollipop":"🍭","custard":"🍮","honey_pot":"🍯","cake":"🍰","bento":"🍱","stew":"🍲","fried_egg":"🍳","cooking":"🍳","fork_and_knife":"🍴","tea":"🍵","sake":"🍶","wine_glass":"🍷","cocktail":"🍸","tropical_drink":"🍹","beer":"🍺","beers":"🍻","baby_bottle":"🍼","knife_fork_plate":"🍽️","champagne":"🍾","popcorn":"🍿","ribbon":"🎀","gift":"🎁","birthday":"🎂","jack_o_lantern":"🎃","christmas_tree":"🎄","santa":"🎅","fireworks":"🎆","sparkler":"🎇","balloon":"🎈","tada":"🎉","confetti_ball":"🎊","tanabata_tree":"🎋","crossed_flags":"🎌","bamboo":"🎍","dolls":"🎎","flags":"🎏","wind_chime":"🎐","rice_scene":"🎑","school_satchel":"🎒","mortar_board":"🎓","medal":"🎖️","reminder_ribbon":"🎗️","studio_microphone":"🎙️","level_slider":"🎚️","control_knobs":"🎛️","film_frames":"🎞️","admission_tickets":"🎟️","carousel_horse":"🎠","ferris_wheel":"🎡","roller_coaster":"🎢","fishing_pole_and_fish":"🎣","microphone":"🎤","movie_camera":"🎥","cinema":"🎦","headphones":"🎧","art":"🎨","tophat":"🎩","circus_tent":"🎪","ticket":"🎫","clapper":"🎬","performing_arts":"🎭","video_game":"🎮","dart":"🎯","slot_machine":"🎰","8ball":"🎱","game_die":"🎲","bowling":"🎳","flower_playing_cards":"🎴","musical_note":"🎵","notes":"🎶","saxophone":"🎷","guitar":"🎸","musical_keyboard":"🎹","trumpet":"🎺","violin":"🎻","musical_score":"🎼","running_shirt_with_sash":"🎽","tennis":"🎾","ski":"🎿","basketball":"🏀","checkered_flag":"🏁","snowboarder":"🏂","woman-running":"🏃‍♀️","man-running":"🏃‍♂️","runner":"🏃‍♂️","running":"🏃‍♂️","woman-surfing":"🏄‍♀️","man-surfing":"🏄‍♂️","surfer":"🏄‍♂️","sports_medal":"🏅","trophy":"🏆","horse_racing":"🏇","football":"🏈","rugby_football":"🏉","woman-swimming":"🏊‍♀️","man-swimming":"🏊‍♂️","swimmer":"🏊‍♂️","woman-lifting-weights":"🏋️‍♀️","man-lifting-weights":"🏋️‍♂️","weight_lifter":"🏋️‍♂️","woman-golfing":"🏌️‍♀️","man-golfing":"🏌️‍♂️","golfer":"🏌️‍♂️","racing_motorcycle":"🏍️","racing_car":"🏎️","cricket_bat_and_ball":"🏏","volleyball":"🏐","field_hockey_stick_and_ball":"🏑","ice_hockey_stick_and_puck":"🏒","table_tennis_paddle_and_ball":"🏓","snow_capped_mountain":"🏔️","camping":"🏕️","beach_with_umbrella":"🏖️","building_construction":"🏗️","house_buildings":"🏘️","cityscape":"🏙️","derelict_house_building":"🏚️","classical_building":"🏛️","desert":"🏜️","desert_island":"🏝️","national_park":"🏞️","stadium":"🏟️","house":"🏠","house_with_garden":"🏡","office":"🏢","post_office":"🏣","european_post_office":"🏤","hospital":"🏥","bank":"🏦","atm":"🏧","hotel":"🏨","love_hotel":"🏩","convenience_store":"🏪","school":"🏫","department_store":"🏬","factory":"🏭","izakaya_lantern":"🏮","lantern":"🏮","japanese_castle":"🏯","european_castle":"🏰","rainbow-flag":"🏳️‍🌈","transgender_flag":"🏳️‍⚧️","waving_white_flag":"🏳️","pirate_flag":"🏴‍☠️","flag-england":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","flag-scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","flag-wales":"🏴󠁧󠁢󠁷󠁬󠁳󠁿","waving_black_flag":"🏴","rosette":"🏵️","label":"🏷️","badminton_racquet_and_shuttlecock":"🏸","bow_and_arrow":"🏹","amphora":"🏺","skin-tone-2":"🏻","skin-tone-3":"🏼","skin-tone-4":"🏽","skin-tone-5":"🏾","skin-tone-6":"🏿","rat":"🐀","mouse2":"🐁","ox":"🐂","water_buffalo":"🐃","cow2":"🐄","tiger2":"🐅","leopard":"🐆","rabbit2":"🐇","black_cat":"🐈‍⬛","cat2":"🐈","dragon":"🐉","crocodile":"🐊","whale2":"🐋","snail":"🐌","snake":"🐍","racehorse":"🐎","ram":"🐏","goat":"🐐","sheep":"🐑","monkey":"🐒","rooster":"🐓","chicken":"🐔","service_dog":"🐕‍🦺","dog2":"🐕","pig2":"🐖","boar":"🐗","elephant":"🐘","octopus":"🐙","shell":"🐚","bug":"🐛","ant":"🐜","bee":"🐝","honeybee":"🐝","ladybug":"🐞","lady_beetle":"🐞","fish":"🐟","tropical_fish":"🐠","blowfish":"🐡","turtle":"🐢","hatching_chick":"🐣","baby_chick":"🐤","hatched_chick":"🐥","bird":"🐦","penguin":"🐧","koala":"🐨","poodle":"🐩","dromedary_camel":"🐪","camel":"🐫","dolphin":"🐬","flipper":"🐬","mouse":"🐭","cow":"🐮","tiger":"🐯","rabbit":"🐰","cat":"🐱","dragon_face":"🐲","whale":"🐳","horse":"🐴","monkey_face":"🐵","dog":"🐶","pig":"🐷","frog":"🐸","hamster":"🐹","wolf":"🐺","polar_bear":"🐻‍❄️","bear":"🐻","panda_face":"🐼","pig_nose":"🐽","feet":"🐾","paw_prints":"🐾","chipmunk":"🐿️","eyes":"👀","eye-in-speech-bubble":"👁️‍🗨️","eye":"👁️","ear":"👂","nose":"👃","lips":"👄","tongue":"👅","point_up_2":"👆","point_down":"👇","point_left":"👈","point_right":"👉","facepunch":"👊","punch":"👊","wave":"👋","ok_hand":"👌","+1":"👍","thumbsup":"👍","-1":"👎","thumbsdown":"👎","clap":"👏","open_hands":"👐","crown":"👑","womans_hat":"👒","eyeglasses":"👓","necktie":"👔","shirt":"👕","tshirt":"👕","jeans":"👖","dress":"👗","kimono":"👘","bikini":"👙","womans_clothes":"👚","purse":"👛","handbag":"👜","pouch":"👝","mans_shoe":"👞","shoe":"👞","athletic_shoe":"👟","high_heel":"👠","sandal":"👡","boot":"👢","footprints":"👣","bust_in_silhouette":"👤","busts_in_silhouette":"👥","boy":"👦","girl":"👧","male-farmer":"👨‍🌾","male-cook":"👨‍🍳","man_feeding_baby":"👨‍🍼","male-student":"👨‍🎓","male-singer":"👨‍🎤","male-artist":"👨‍🎨","male-teacher":"👨‍🏫","male-factory-worker":"👨‍🏭","man-boy-boy":"👨‍👦‍👦","man-boy":"👨‍👦","man-girl-boy":"👨‍👧‍👦","man-girl-girl":"👨‍👧‍👧","man-girl":"👨‍👧","man-man-boy":"👨‍👨‍👦","man-man-boy-boy":"👨‍👨‍👦‍👦","man-man-girl":"👨‍👨‍👧","man-man-girl-boy":"👨‍👨‍👧‍👦","man-man-girl-girl":"👨‍👨‍👧‍👧","man-woman-boy":"👨‍👩‍👦","family":"👨‍👩‍👦","man-woman-boy-boy":"👨‍👩‍👦‍👦","man-woman-girl":"👨‍👩‍👧","man-woman-girl-boy":"👨‍👩‍👧‍👦","man-woman-girl-girl":"👨‍👩‍👧‍👧","male-technologist":"👨‍💻","male-office-worker":"👨‍💼","male-mechanic":"👨‍🔧","male-scientist":"👨‍🔬","male-astronaut":"👨‍🚀","male-firefighter":"👨‍🚒","man_with_probing_cane":"👨‍🦯","red_haired_man":"👨‍🦰","curly_haired_man":"👨‍🦱","bald_man":"👨‍🦲","white_haired_man":"👨‍🦳","man_in_motorized_wheelchair":"👨‍🦼","man_in_manual_wheelchair":"👨‍🦽","male-doctor":"👨‍⚕️","male-judge":"👨‍⚖️","male-pilot":"👨‍✈️","man-heart-man":"👨‍❤️‍👨","man-kiss-man":"👨‍❤️‍💋‍👨","man":"👨","female-farmer":"👩‍🌾","female-cook":"👩‍🍳","woman_feeding_baby":"👩‍🍼","female-student":"👩‍🎓","female-singer":"👩‍🎤","female-artist":"👩‍🎨","female-teacher":"👩‍🏫","female-factory-worker":"👩‍🏭","woman-boy-boy":"👩‍👦‍👦","woman-boy":"👩‍👦","woman-girl-boy":"👩‍👧‍👦","woman-girl-girl":"👩‍👧‍👧","woman-girl":"👩‍👧","woman-woman-boy":"👩‍👩‍👦","woman-woman-boy-boy":"👩‍👩‍👦‍👦","woman-woman-girl":"👩‍👩‍👧","woman-woman-girl-boy":"👩‍👩‍👧‍👦","woman-woman-girl-girl":"👩‍👩‍👧‍👧","female-technologist":"👩‍💻","female-office-worker":"👩‍💼","female-mechanic":"👩‍🔧","female-scientist":"👩‍🔬","female-astronaut":"👩‍🚀","female-firefighter":"👩‍🚒","woman_with_probing_cane":"👩‍🦯","red_haired_woman":"👩‍🦰","curly_haired_woman":"👩‍🦱","bald_woman":"👩‍🦲","white_haired_woman":"👩‍🦳","woman_in_motorized_wheelchair":"👩‍🦼","woman_in_manual_wheelchair":"👩‍🦽","female-doctor":"👩‍⚕️","female-judge":"👩‍⚖️","female-pilot":"👩‍✈️","woman-heart-man":"👩‍❤️‍👨","woman-heart-woman":"👩‍❤️‍👩","woman-kiss-man":"👩‍❤️‍💋‍👨","woman-kiss-woman":"👩‍❤️‍💋‍👩","woman":"👩","man_and_woman_holding_hands":"👫","woman_and_man_holding_hands":"👫","couple":"👫","two_men_holding_hands":"👬","men_holding_hands":"👬","two_women_holding_hands":"👭","women_holding_hands":"👭","female-police-officer":"👮‍♀️","male-police-officer":"👮‍♂️","cop":"👮‍♂️","women-with-bunny-ears-partying":"👯‍♀️","woman-with-bunny-ears-partying":"👯‍♀️","dancers":"👯‍♀️","men-with-bunny-ears-partying":"👯‍♂️","man-with-bunny-ears-partying":"👯‍♂️","woman_with_veil":"👰‍♀️","man_with_veil":"👰‍♂️","bride_with_veil":"👰","blond-haired-woman":"👱‍♀️","blond-haired-man":"👱‍♂️","person_with_blond_hair":"👱‍♂️","man_with_gua_pi_mao":"👲","woman-wearing-turban":"👳‍♀️","man-wearing-turban":"👳‍♂️","man_with_turban":"👳‍♂️","older_man":"👴","older_woman":"👵","baby":"👶","female-construction-worker":"👷‍♀️","male-construction-worker":"👷‍♂️","construction_worker":"👷‍♂️","princess":"👸","japanese_ogre":"👹","japanese_goblin":"👺","ghost":"👻","angel":"👼","alien":"👽","space_invader":"👾","imp":"👿","skull":"💀","woman-tipping-hand":"💁‍♀️","information_desk_person":"💁‍♀️","man-tipping-hand":"💁‍♂️","female-guard":"💂‍♀️","male-guard":"💂‍♂️","guardsman":"💂‍♂️","dancer":"💃","lipstick":"💄","nail_care":"💅","woman-getting-massage":"💆‍♀️","massage":"💆‍♀️","man-getting-massage":"💆‍♂️","woman-getting-haircut":"💇‍♀️","haircut":"💇‍♀️","man-getting-haircut":"💇‍♂️","barber":"💈","syringe":"💉","pill":"💊","kiss":"💋","love_letter":"💌","ring":"💍","gem":"💎","couplekiss":"💏","bouquet":"💐","couple_with_heart":"💑","wedding":"💒","heartbeat":"💓","broken_heart":"💔","two_hearts":"💕","sparkling_heart":"💖","heartpulse":"💗","cupid":"💘","blue_heart":"💙","green_heart":"💚","yellow_heart":"💛","purple_heart":"💜","gift_heart":"💝","revolving_hearts":"💞","heart_decoration":"💟","diamond_shape_with_a_dot_inside":"💠","bulb":"💡","anger":"💢","bomb":"💣","zzz":"💤","boom":"💥","collision":"💥","sweat_drops":"💦","droplet":"💧","dash":"💨","hankey":"💩","poop":"💩","shit":"💩","muscle":"💪","dizzy":"💫","speech_balloon":"💬","thought_balloon":"💭","white_flower":"💮","moneybag":"💰","currency_exchange":"💱","heavy_dollar_sign":"💲","credit_card":"💳","yen":"💴","dollar":"💵","euro":"💶","pound":"💷","money_with_wings":"💸","chart":"💹","seat":"💺","computer":"💻","briefcase":"💼","minidisc":"💽","floppy_disk":"💾","cd":"💿","dvd":"📀","file_folder":"📁","open_file_folder":"📂","page_with_curl":"📃","page_facing_up":"📄","date":"📅","calendar":"📆","card_index":"📇","chart_with_upwards_trend":"📈","chart_with_downwards_trend":"📉","bar_chart":"📊","clipboard":"📋","pushpin":"📌","round_pushpin":"📍","paperclip":"📎","straight_ruler":"📏","triangular_ruler":"📐","bookmark_tabs":"📑","ledger":"📒","notebook":"📓","notebook_with_decorative_cover":"📔","closed_book":"📕","book":"📖","open_book":"📖","green_book":"📗","blue_book":"📘","orange_book":"📙","books":"📚","name_badge":"📛","scroll":"📜","memo":"📝","pencil":"📝","telephone_receiver":"📞","pager":"📟","fax":"📠","satellite_antenna":"📡","loudspeaker":"📢","mega":"📣","outbox_tray":"📤","inbox_tray":"📥","package":"📦","e-mail":"📧","incoming_envelope":"📨","envelope_with_arrow":"📩","mailbox_closed":"📪","mailbox":"📫","mailbox_with_mail":"📬","mailbox_with_no_mail":"📭","postbox":"📮","postal_horn":"📯","newspaper":"📰","iphone":"📱","calling":"📲","vibration_mode":"📳","mobile_phone_off":"📴","no_mobile_phones":"📵","signal_strength":"📶","camera":"📷","camera_with_flash":"📸","video_camera":"📹","tv":"📺","radio":"📻","vhs":"📼","film_projector":"📽️","prayer_beads":"📿","twisted_rightwards_arrows":"🔀","repeat":"🔁","repeat_one":"🔂","arrows_clockwise":"🔃","arrows_counterclockwise":"🔄","low_brightness":"🔅","high_brightness":"🔆","mute":"🔇","speaker":"🔈","sound":"🔉","loud_sound":"🔊","battery":"🔋","electric_plug":"🔌","mag":"🔍","mag_right":"🔎","lock_with_ink_pen":"🔏","closed_lock_with_key":"🔐","key":"🔑","lock":"🔒","unlock":"🔓","bell":"🔔","no_bell":"🔕","bookmark":"🔖","link":"🔗","radio_button":"🔘","back":"🔙","end":"🔚","on":"🔛","soon":"🔜","top":"🔝","underage":"🔞","keycap_ten":"🔟","capital_abcd":"🔠","abcd":"🔡","symbols":"🔣","abc":"🔤","fire":"🔥","flashlight":"🔦","wrench":"🔧","hammer":"🔨","nut_and_bolt":"🔩","hocho":"🔪","knife":"🔪","gun":"🔫","microscope":"🔬","telescope":"🔭","crystal_ball":"🔮","six_pointed_star":"🔯","beginner":"🔰","trident":"🔱","black_square_button":"🔲","white_square_button":"🔳","red_circle":"🔴","large_blue_circle":"🔵","large_orange_diamond":"🔶","large_blue_diamond":"🔷","small_orange_diamond":"🔸","small_blue_diamond":"🔹","small_red_triangle":"🔺","small_red_triangle_down":"🔻","arrow_up_small":"🔼","arrow_down_small":"🔽","om_symbol":"🕉️","dove_of_peace":"🕊️","kaaba":"🕋","mosque":"🕌","synagogue":"🕍","menorah_with_nine_branches":"🕎","clock1":"🕐","clock2":"🕑","clock3":"🕒","clock4":"🕓","clock5":"🕔","clock6":"🕕","clock7":"🕖","clock8":"🕗","clock9":"🕘","clock10":"🕙","clock11":"🕚","clock12":"🕛","clock130":"🕜","clock230":"🕝","clock330":"🕞","clock430":"🕟","clock530":"🕠","clock630":"🕡","clock730":"🕢","clock830":"🕣","clock930":"🕤","clock1030":"🕥","clock1130":"🕦","clock1230":"🕧","candle":"🕯️","mantelpiece_clock":"🕰️","hole":"🕳️","man_in_business_suit_levitating":"🕴️","female-detective":"🕵️‍♀️","male-detective":"🕵️‍♂️","sleuth_or_spy":"🕵️‍♂️","dark_sunglasses":"🕶️","spider":"🕷️","spider_web":"🕸️","joystick":"🕹️","man_dancing":"🕺","linked_paperclips":"🖇️","lower_left_ballpoint_pen":"🖊️","lower_left_fountain_pen":"🖋️","lower_left_paintbrush":"🖌️","lower_left_crayon":"🖍️","raised_hand_with_fingers_splayed":"🖐️","middle_finger":"🖕","reversed_hand_with_middle_finger_extended":"🖕","spock-hand":"🖖","black_heart":"🖤","desktop_computer":"🖥️","printer":"🖨️","three_button_mouse":"🖱️","trackball":"🖲️","frame_with_picture":"🖼️","card_index_dividers":"🗂️","card_file_box":"🗃️","file_cabinet":"🗄️","wastebasket":"🗑️","spiral_note_pad":"🗒️","spiral_calendar_pad":"🗓️","compression":"🗜️","old_key":"🗝️","rolled_up_newspaper":"🗞️","dagger_knife":"🗡️","speaking_head_in_silhouette":"🗣️","left_speech_bubble":"🗨️","right_anger_bubble":"🗯️","ballot_box_with_ballot":"🗳️","world_map":"🗺️","mount_fuji":"🗻","tokyo_tower":"🗼","statue_of_liberty":"🗽","japan":"🗾","moyai":"🗿","grinning":"😀","grin":"😁","joy":"😂","smiley":"😃","smile":"😄","sweat_smile":"😅","laughing":"😆","satisfied":"😆","innocent":"😇","smiling_imp":"😈","wink":"😉","blush":"😊","yum":"😋","relieved":"😌","heart_eyes":"😍","sunglasses":"😎","smirk":"😏","neutral_face":"😐","expressionless":"😑","unamused":"😒","sweat":"😓","pensive":"😔","confused":"😕","confounded":"😖","kissing":"😗","kissing_heart":"😘","kissing_smiling_eyes":"😙","kissing_closed_eyes":"😚","stuck_out_tongue":"😛","stuck_out_tongue_winking_eye":"😜","stuck_out_tongue_closed_eyes":"😝","disappointed":"😞","worried":"😟","angry":"😠","rage":"😡","cry":"😢","persevere":"😣","triumph":"😤","disappointed_relieved":"😥","frowning":"😦","anguished":"😧","fearful":"😨","weary":"😩","sleepy":"😪","tired_face":"😫","grimacing":"😬","sob":"😭","face_exhaling":"😮‍💨","open_mouth":"😮","hushed":"😯","cold_sweat":"😰","scream":"😱","astonished":"😲","flushed":"😳","sleeping":"😴","face_with_spiral_eyes":"😵‍💫","dizzy_face":"😵","face_in_clouds":"😶‍🌫️","no_mouth":"😶","mask":"😷","smile_cat":"😸","joy_cat":"😹","smiley_cat":"😺","heart_eyes_cat":"😻","smirk_cat":"😼","kissing_cat":"😽","pouting_cat":"😾","crying_cat_face":"😿","scream_cat":"🙀","slightly_frowning_face":"🙁","slightly_smiling_face":"🙂","upside_down_face":"🙃","face_with_rolling_eyes":"🙄","woman-gesturing-no":"🙅‍♀️","no_good":"🙅‍♀️","man-gesturing-no":"🙅‍♂️","woman-gesturing-ok":"🙆‍♀️","ok_woman":"🙆‍♀️","man-gesturing-ok":"🙆‍♂️","woman-bowing":"🙇‍♀️","man-bowing":"🙇‍♂️","bow":"🙇‍♂️","see_no_evil":"🙈","hear_no_evil":"🙉","speak_no_evil":"🙊","woman-raising-hand":"🙋‍♀️","raising_hand":"🙋‍♀️","man-raising-hand":"🙋‍♂️","raised_hands":"🙌","woman-frowning":"🙍‍♀️","person_frowning":"🙍‍♀️","man-frowning":"🙍‍♂️","woman-pouting":"🙎‍♀️","person_with_pouting_face":"🙎‍♀️","man-pouting":"🙎‍♂️","pray":"🙏","rocket":"🚀","helicopter":"🚁","steam_locomotive":"🚂","railway_car":"🚃","bullettrain_side":"🚄","bullettrain_front":"🚅","train2":"🚆","metro":"🚇","light_rail":"🚈","station":"🚉","tram":"🚊","train":"🚋","bus":"🚌","oncoming_bus":"🚍","trolleybus":"🚎","busstop":"🚏","minibus":"🚐","ambulance":"🚑","fire_engine":"🚒","police_car":"🚓","oncoming_police_car":"🚔","taxi":"🚕","oncoming_taxi":"🚖","car":"🚗","red_car":"🚗","oncoming_automobile":"🚘","blue_car":"🚙","truck":"🚚","articulated_lorry":"🚛","tractor":"🚜","monorail":"🚝","mountain_railway":"🚞","suspension_railway":"🚟","mountain_cableway":"🚠","aerial_tramway":"🚡","ship":"🚢","woman-rowing-boat":"🚣‍♀️","man-rowing-boat":"🚣‍♂️","rowboat":"🚣‍♂️","speedboat":"🚤","traffic_light":"🚥","vertical_traffic_light":"🚦","construction":"🚧","rotating_light":"🚨","triangular_flag_on_post":"🚩","door":"🚪","no_entry_sign":"🚫","smoking":"🚬","no_smoking":"🚭","put_litter_in_its_place":"🚮","do_not_litter":"🚯","potable_water":"🚰","non-potable_water":"🚱","bike":"🚲","no_bicycles":"🚳","woman-biking":"🚴‍♀️","man-biking":"🚴‍♂️","bicyclist":"🚴‍♂️","woman-mountain-biking":"🚵‍♀️","man-mountain-biking":"🚵‍♂️","mountain_bicyclist":"🚵‍♂️","woman-walking":"🚶‍♀️","man-walking":"🚶‍♂️","walking":"🚶‍♂️","no_pedestrians":"🚷","children_crossing":"🚸","mens":"🚹","womens":"🚺","restroom":"🚻","baby_symbol":"🚼","toilet":"🚽","wc":"🚾","shower":"🚿","bath":"🛀","bathtub":"🛁","passport_control":"🛂","customs":"🛃","baggage_claim":"🛄","left_luggage":"🛅","couch_and_lamp":"🛋️","sleeping_accommodation":"🛌","shopping_bags":"🛍️","bellhop_bell":"🛎️","bed":"🛏️","place_of_worship":"🛐","octagonal_sign":"🛑","shopping_trolley":"🛒","hindu_temple":"🛕","hut":"🛖","elevator":"🛗","hammer_and_wrench":"🛠️","shield":"🛡️","oil_drum":"🛢️","motorway":"🛣️","railway_track":"🛤️","motor_boat":"🛥️","small_airplane":"🛩️","airplane_departure":"🛫","airplane_arriving":"🛬","satellite":"🛰️","passenger_ship":"🛳️","scooter":"🛴","motor_scooter":"🛵","canoe":"🛶","sled":"🛷","flying_saucer":"🛸","skateboard":"🛹","auto_rickshaw":"🛺","pickup_truck":"🛻","roller_skate":"🛼","large_orange_circle":"🟠","large_yellow_circle":"🟡","large_green_circle":"🟢","large_purple_circle":"🟣","large_brown_circle":"🟤","large_red_square":"🟥","large_blue_square":"🟦","large_orange_square":"🟧","large_yellow_square":"🟨","large_green_square":"🟩","large_purple_square":"🟪","large_brown_square":"🟫","pinched_fingers":"🤌","white_heart":"🤍","brown_heart":"🤎","pinching_hand":"🤏","zipper_mouth_face":"🤐","money_mouth_face":"🤑","face_with_thermometer":"🤒","nerd_face":"🤓","thinking_face":"🤔","face_with_head_bandage":"🤕","robot_face":"🤖","hugging_face":"🤗","the_horns":"🤘","sign_of_the_horns":"🤘","call_me_hand":"🤙","raised_back_of_hand":"🤚","left-facing_fist":"🤛","right-facing_fist":"🤜","handshake":"🤝","crossed_fingers":"🤞","hand_with_index_and_middle_fingers_crossed":"🤞","i_love_you_hand_sign":"🤟","face_with_cowboy_hat":"🤠","clown_face":"🤡","nauseated_face":"🤢","rolling_on_the_floor_laughing":"🤣","drooling_face":"🤤","lying_face":"🤥","woman-facepalming":"🤦‍♀️","man-facepalming":"🤦‍♂️","face_palm":"🤦","sneezing_face":"🤧","face_with_raised_eyebrow":"🤨","face_with_one_eyebrow_raised":"🤨","star-struck":"🤩","grinning_face_with_star_eyes":"🤩","zany_face":"🤪","grinning_face_with_one_large_and_one_small_eye":"🤪","shushing_face":"🤫","face_with_finger_covering_closed_lips":"🤫","face_with_symbols_on_mouth":"🤬","serious_face_with_symbols_covering_mouth":"🤬","face_with_hand_over_mouth":"🤭","smiling_face_with_smiling_eyes_and_hand_covering_mouth":"🤭","face_vomiting":"🤮","face_with_open_mouth_vomiting":"🤮","exploding_head":"🤯","shocked_face_with_exploding_head":"🤯","pregnant_woman":"🤰","breast-feeding":"🤱","palms_up_together":"🤲","selfie":"🤳","prince":"🤴","woman_in_tuxedo":"🤵‍♀️","man_in_tuxedo":"🤵‍♂️","person_in_tuxedo":"🤵","mrs_claus":"🤶","mother_christmas":"🤶","woman-shrugging":"🤷‍♀️","man-shrugging":"🤷‍♂️","shrug":"🤷","woman-cartwheeling":"🤸‍♀️","man-cartwheeling":"🤸‍♂️","person_doing_cartwheel":"🤸","woman-juggling":"🤹‍♀️","man-juggling":"🤹‍♂️","juggling":"🤹","fencer":"🤺","woman-wrestling":"🤼‍♀️","man-wrestling":"🤼‍♂️","wrestlers":"🤼","woman-playing-water-polo":"🤽‍♀️","man-playing-water-polo":"🤽‍♂️","water_polo":"🤽","woman-playing-handball":"🤾‍♀️","man-playing-handball":"🤾‍♂️","handball":"🤾","diving_mask":"🤿","wilted_flower":"🥀","drum_with_drumsticks":"🥁","clinking_glasses":"🥂","tumbler_glass":"🥃","spoon":"🥄","goal_net":"🥅","first_place_medal":"🥇","second_place_medal":"🥈","third_place_medal":"🥉","boxing_glove":"🥊","martial_arts_uniform":"🥋","curling_stone":"🥌","lacrosse":"🥍","softball":"🥎","flying_disc":"🥏","croissant":"🥐","avocado":"🥑","cucumber":"🥒","bacon":"🥓","potato":"🥔","carrot":"🥕","baguette_bread":"🥖","green_salad":"🥗","shallow_pan_of_food":"🥘","stuffed_flatbread":"🥙","egg":"🥚","glass_of_milk":"🥛","peanuts":"🥜","kiwifruit":"🥝","pancakes":"🥞","dumpling":"🥟","fortune_cookie":"🥠","takeout_box":"🥡","chopsticks":"🥢","bowl_with_spoon":"🥣","cup_with_straw":"🥤","coconut":"🥥","broccoli":"🥦","pie":"🥧","pretzel":"🥨","cut_of_meat":"🥩","sandwich":"🥪","canned_food":"🥫","leafy_green":"🥬","mango":"🥭","moon_cake":"🥮","bagel":"🥯","smiling_face_with_3_hearts":"🥰","yawning_face":"🥱","smiling_face_with_tear":"🥲","partying_face":"🥳","woozy_face":"🥴","hot_face":"🥵","cold_face":"🥶","ninja":"🥷","disguised_face":"🥸","pleading_face":"🥺","sari":"🥻","lab_coat":"🥼","goggles":"🥽","hiking_boot":"🥾","womans_flat_shoe":"🥿","crab":"🦀","lion_face":"🦁","scorpion":"🦂","turkey":"🦃","unicorn_face":"🦄","eagle":"🦅","duck":"🦆","bat":"🦇","shark":"🦈","owl":"🦉","fox_face":"🦊","butterfly":"🦋","deer":"🦌","gorilla":"🦍","lizard":"🦎","rhinoceros":"🦏","shrimp":"🦐","squid":"🦑","giraffe_face":"🦒","zebra_face":"🦓","hedgehog":"🦔","sauropod":"🦕","t-rex":"🦖","cricket":"🦗","kangaroo":"🦘","llama":"🦙","peacock":"🦚","hippopotamus":"🦛","parrot":"🦜","raccoon":"🦝","lobster":"🦞","mosquito":"🦟","microbe":"🦠","badger":"🦡","swan":"🦢","mammoth":"🦣","dodo":"🦤","sloth":"🦥","otter":"🦦","orangutan":"🦧","skunk":"🦨","flamingo":"🦩","oyster":"🦪","beaver":"🦫","bison":"🦬","seal":"🦭","guide_dog":"🦮","probing_cane":"🦯","bone":"🦴","leg":"🦵","foot":"🦶","tooth":"🦷","female_superhero":"🦸‍♀️","male_superhero":"🦸‍♂️","superhero":"🦸","female_supervillain":"🦹‍♀️","male_supervillain":"🦹‍♂️","supervillain":"🦹","safety_vest":"🦺","ear_with_hearing_aid":"🦻","motorized_wheelchair":"🦼","manual_wheelchair":"🦽","mechanical_arm":"🦾","mechanical_leg":"🦿","cheese_wedge":"🧀","cupcake":"🧁","salt":"🧂","beverage_box":"🧃","garlic":"🧄","onion":"🧅","falafel":"🧆","waffle":"🧇","butter":"🧈","mate_drink":"🧉","ice_cube":"🧊","bubble_tea":"🧋","woman_standing":"🧍‍♀️","man_standing":"🧍‍♂️","standing_person":"🧍","woman_kneeling":"🧎‍♀️","man_kneeling":"🧎‍♂️","kneeling_person":"🧎","deaf_woman":"🧏‍♀️","deaf_man":"🧏‍♂️","deaf_person":"🧏","face_with_monocle":"🧐","farmer":"🧑‍🌾","cook":"🧑‍🍳","person_feeding_baby":"🧑‍🍼","mx_claus":"🧑‍🎄","student":"🧑‍🎓","singer":"🧑‍🎤","artist":"🧑‍🎨","teacher":"🧑‍🏫","factory_worker":"🧑‍🏭","technologist":"🧑‍💻","office_worker":"🧑‍💼","mechanic":"🧑‍🔧","scientist":"🧑‍🔬","astronaut":"🧑‍🚀","firefighter":"🧑‍🚒","people_holding_hands":"🧑‍🤝‍🧑","person_with_probing_cane":"🧑‍🦯","red_haired_person":"🧑‍🦰","curly_haired_person":"🧑‍🦱","bald_person":"🧑‍🦲","white_haired_person":"🧑‍🦳","person_in_motorized_wheelchair":"🧑‍🦼","person_in_manual_wheelchair":"🧑‍🦽","health_worker":"🧑‍⚕️","judge":"🧑‍⚖️","pilot":"🧑‍✈️","adult":"🧑","child":"🧒","older_adult":"🧓","woman_with_beard":"🧔‍♀️","man_with_beard":"🧔‍♂️","bearded_person":"🧔","person_with_headscarf":"🧕","woman_in_steamy_room":"🧖‍♀️","man_in_steamy_room":"🧖‍♂️","person_in_steamy_room":"🧖‍♂️","woman_climbing":"🧗‍♀️","person_climbing":"🧗‍♀️","man_climbing":"🧗‍♂️","woman_in_lotus_position":"🧘‍♀️","person_in_lotus_position":"🧘‍♀️","man_in_lotus_position":"🧘‍♂️","female_mage":"🧙‍♀️","mage":"🧙‍♀️","male_mage":"🧙‍♂️","female_fairy":"🧚‍♀️","fairy":"🧚‍♀️","male_fairy":"🧚‍♂️","female_vampire":"🧛‍♀️","vampire":"🧛‍♀️","male_vampire":"🧛‍♂️","mermaid":"🧜‍♀️","merman":"🧜‍♂️","merperson":"🧜‍♂️","female_elf":"🧝‍♀️","male_elf":"🧝‍♂️","elf":"🧝‍♂️","female_genie":"🧞‍♀️","male_genie":"🧞‍♂️","genie":"🧞‍♂️","female_zombie":"🧟‍♀️","male_zombie":"🧟‍♂️","zombie":"🧟‍♂️","brain":"🧠","orange_heart":"🧡","billed_cap":"🧢","scarf":"🧣","gloves":"🧤","coat":"🧥","socks":"🧦","red_envelope":"🧧","firecracker":"🧨","jigsaw":"🧩","test_tube":"🧪","petri_dish":"🧫","dna":"🧬","compass":"🧭","abacus":"🧮","fire_extinguisher":"🧯","toolbox":"🧰","bricks":"🧱","magnet":"🧲","luggage":"🧳","lotion_bottle":"🧴","thread":"🧵","yarn":"🧶","safety_pin":"🧷","teddy_bear":"🧸","broom":"🧹","basket":"🧺","roll_of_paper":"🧻","soap":"🧼","sponge":"🧽","receipt":"🧾","nazar_amulet":"🧿","ballet_shoes":"🩰","one-piece_swimsuit":"🩱","briefs":"🩲","shorts":"🩳","thong_sandal":"🩴","drop_of_blood":"🩸","adhesive_bandage":"🩹","stethoscope":"🩺","yo-yo":"🪀","kite":"🪁","parachute":"🪂","boomerang":"🪃","magic_wand":"🪄","pinata":"🪅","nesting_dolls":"🪆","ringed_planet":"🪐","chair":"🪑","razor":"🪒","axe":"🪓","diya_lamp":"🪔","banjo":"🪕","military_helmet":"🪖","accordion":"🪗","long_drum":"🪘","coin":"🪙","carpentry_saw":"🪚","screwdriver":"🪛","ladder":"🪜","hook":"🪝","mirror":"🪞","window":"🪟","plunger":"🪠","sewing_needle":"🪡","knot":"🪢","bucket":"🪣","mouse_trap":"🪤","toothbrush":"🪥","headstone":"🪦","placard":"🪧","rock":"🪨","fly":"🪰","worm":"🪱","beetle":"🪲","cockroach":"🪳","potted_plant":"🪴","wood":"🪵","feather":"🪶","anatomical_heart":"🫀","lungs":"🫁","people_hugging":"🫂","blueberries":"🫐","bell_pepper":"🫑","olive":"🫒","flatbread":"🫓","tamale":"🫔","fondue":"🫕","teapot":"🫖","bangbang":"‼️","interrobang":"⁉️","tm":"™️","information_source":"ℹ️","left_right_arrow":"↔️","arrow_up_down":"↕️","arrow_upper_left":"↖️","arrow_upper_right":"↗️","arrow_lower_right":"↘️","arrow_lower_left":"↙️","leftwards_arrow_with_hook":"↩️","arrow_right_hook":"↪️","watch":"⌚","hourglass":"⌛","keyboard":"⌨️","eject":"⏏️","fast_forward":"⏩","rewind":"⏪","arrow_double_up":"⏫","arrow_double_down":"⏬","black_right_pointing_double_triangle_with_vertical_bar":"⏭️","black_left_pointing_double_triangle_with_vertical_bar":"⏮️","black_right_pointing_triangle_with_double_vertical_bar":"⏯️","alarm_clock":"⏰","stopwatch":"⏱️","timer_clock":"⏲️","hourglass_flowing_sand":"⏳","double_vertical_bar":"⏸️","black_square_for_stop":"⏹️","black_circle_for_record":"⏺️","m":"Ⓜ️","black_small_square":"▪️","white_small_square":"▫️","arrow_forward":"▶️","arrow_backward":"◀️","white_medium_square":"◻️","black_medium_square":"◼️","white_medium_small_square":"◽","black_medium_small_square":"◾","sunny":"☀️","cloud":"☁️","umbrella":"☂️","snowman":"☃️","comet":"☄️","phone":"☎️","telephone":"☎️","ballot_box_with_check":"☑️","shamrock":"☘️","point_up":"☝️","skull_and_crossbones":"☠️","radioactive_sign":"☢️","biohazard_sign":"☣️","orthodox_cross":"☦️","star_and_crescent":"☪️","peace_symbol":"☮️","yin_yang":"☯️","wheel_of_dharma":"☸️","white_frowning_face":"☹️","relaxed":"☺️","female_sign":"♀️","male_sign":"♂️","gemini":"♊","cancer":"♋","leo":"♌","virgo":"♍","libra":"♎","scorpius":"♏","chess_pawn":"♟️","spades":"♠️","clubs":"♣️","hearts":"♥️","diamonds":"♦️","hotsprings":"♨️","recycle":"♻️","infinity":"♾️","wheelchair":"♿","hammer_and_pick":"⚒️","crossed_swords":"⚔️","medical_symbol":"⚕️","staff_of_aesculapius":"⚕️","scales":"⚖️","alembic":"⚗️","gear":"⚙️","atom_symbol":"⚛️","fleur_de_lis":"⚜️","warning":"⚠️","zap":"⚡","transgender_symbol":"⚧️","white_circle":"⚪","black_circle":"⚫","coffin":"⚰️","funeral_urn":"⚱️","soccer":"⚽","baseball":"⚾","snowman_without_snow":"⛄","partly_sunny":"⛅","thunder_cloud_and_rain":"⛈️","ophiuchus":"⛎","pick":"⛏️","helmet_with_white_cross":"⛑️","chains":"⛓️","no_entry":"⛔","shinto_shrine":"⛩️","church":"⛪","mountain":"⛰️","umbrella_on_ground":"⛱️","fountain":"⛲","golf":"⛳","ferry":"⛴️","boat":"⛵","sailboat":"⛵","skier":"⛷️","ice_skate":"⛸️","woman-bouncing-ball":"⛹️‍♀️","man-bouncing-ball":"⛹️‍♂️","person_with_ball":"⛹️‍♂️","tent":"⛺","fuelpump":"⛽","scissors":"✂️","airplane":"✈️","email":"✉️","envelope":"✉️","fist":"✊","hand":"✋","raised_hand":"✋","v":"✌️","writing_hand":"✍️","pencil2":"✏️","black_nib":"✒️","heavy_check_mark":"✔️","heavy_multiplication_x":"✖️","latin_cross":"✝️","star_of_david":"✡️","eight_spoked_asterisk":"✳️","eight_pointed_black_star":"✴️","snowflake":"❄️","sparkle":"❇️","x":"❌","negative_squared_cross_mark":"❎","heavy_heart_exclamation_mark_ornament":"❣️","heart_on_fire":"❤️‍🔥","mending_heart":"❤️‍🩹","heart":"❤️","arrow_right":"➡️","curly_loop":"➰","loop":"➿","arrow_heading_up":"⤴️","arrow_heading_down":"⤵️","arrow_left":"⬅️","arrow_up":"⬆️","arrow_down":"⬇️","black_large_square":"⬛","white_large_square":"⬜","star":"⭐","o":"⭕","wavy_dash":"〰️","part_alternation_mark":"〽️","congratulations":"㊗️","secret":"㊙️"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(797);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/Bar.vue?vue&type=template&id=517fd311&scoped=true

const _withScopeId = n => (_pushScopeId("data-v-517fd311"), n = n(), _popScopeId(), n);
const _hoisted_1 = {
  class: "bar"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", _hoisted_1, [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($props.content, (item, item_idx) => {
    return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveDynamicComponent)($options.get_component(item.is)), {
      key: 'bar-item-' + item_idx,
      item: item,
      class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(item.class),
      id: item.id,
      is_open: $data.menu_open,
      ref_for: true,
      ref: el => Object.defineProperty(item, '_el', {
        value: el,
        writable: true
      }),
      onClick: $event => $options.toggle_menu(item, $event)
    }, null, 8, ["item", "class", "id", "is_open", "onClick"]);
  }), 128))]);
}
;// CONCATENATED MODULE: ./src/Bar/Bar.vue?vue&type=template&id=517fd311&scoped=true

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarButtonGeneric.vue?vue&type=template&id=d17fed54

const BarButtonGenericvue_type_template_id_d17fed54_hoisted_1 = ["title"];
const _hoisted_2 = {
  key: 1,
  class: "material-icons icon"
};
const _hoisted_3 = {
  key: 1,
  class: "emoji"
};
const _hoisted_4 = {
  key: 2,
  class: "label"
};
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = {
  key: 4,
  class: "material-icons chevron"
};
const _hoisted_7 = ["innerHTML"];
function BarButtonGenericvue_type_template_id_d17fed54_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["bar-button", $options.button_class]),
    title: $options.title,
    onMousedown: _cache[0] || (_cache[0] = e => e.preventDefault()),
    onClick: _cache[1] || (_cache[1] = e => $props.item.click && !$props.item.disabled ? $props.item.click(e) : e.stopPropagation())
  }, [$props.item.icon ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, {
    key: 0
  }, [typeof $props.item.icon == 'object' ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveDynamicComponent)($props.item.icon), {
    key: 0,
    class: "icon"
  })) : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.item.icon), 1))], 64)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.emoji ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_3, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($options.get_emoji($props.item.emoji)), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.text ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.item.text), 1)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.html ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", {
    key: 3,
    class: "label",
    innerHTML: $props.item.html
  }, null, 8, _hoisted_5)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.chevron === true ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_6, "expand_more")) : $props.item.chevron ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", {
    key: 5,
    class: "chevron",
    innerHTML: $props.item.chevron
  }, null, 8, _hoisted_7)) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $props.item.menu ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveDynamicComponent)($options.get_component($props.item.menu)), {
    key: 6,
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["menu", $props.item.menu_class]),
    menu: $props.item.menu,
    id: $props.item.menu_id,
    width: $props.item.menu_width,
    height: $props.item.menu_height
  }, null, 8, ["menu", "class", "id", "width", "height"])) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true)], 42, BarButtonGenericvue_type_template_id_d17fed54_hoisted_1);
}
;// CONCATENATED MODULE: ./src/Bar/BarButtonGeneric.vue?vue&type=template&id=d17fed54

// EXTERNAL MODULE: ./node_modules/node-emoji/lib/emoji.json
var emoji = __webpack_require__(964);
// EXTERNAL MODULE: ./src/Bar/BarMenu.vue + 12 modules
var BarMenu = __webpack_require__(600);
// EXTERNAL MODULE: ./src/Bar/imports/bar-hotkey-manager.js + 1 modules
var bar_hotkey_manager = __webpack_require__(584);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarButtonGeneric.vue?vue&type=script&lang=js



/* harmony default export */ var BarButtonGenericvue_type_script_lang_js = ({
  mixins: [bar_hotkey_manager/* default */.Z],
  components: {
    BarMenu: BarMenu["default"]
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    is_open: Boolean
  },
  computed: {
    is_menu() {
      return this.item.menu ? true : false;
    },
    button_class() {
      const open = this.is_open && this.is_menu;
      const active = this.item.active;
      const disabled = this.item.disabled;
      return {
        open,
        active,
        disabled
      };
    },
    title() {
      if (this.item.title) {
        let title = this.item.title;
        if (this.hotkey) title += " (" + this.hotkey + ")";
        return title;
      } else return null;
    }
  },
  methods: {
    get_emoji: emoji_name => emoji_name in emoji ? emoji[emoji_name] : "",
    get_component(is) {
      if (is && !Array.isArray(is) && typeof is == "object") return is; // if component
      else return "bar-menu";
    }
  }
});
;// CONCATENATED MODULE: ./src/Bar/BarButtonGeneric.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(744);
;// CONCATENATED MODULE: ./src/Bar/BarButtonGeneric.vue




;
const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(BarButtonGenericvue_type_script_lang_js, [['render',BarButtonGenericvue_type_template_id_d17fed54_render]])

/* harmony default export */ var BarButtonGeneric = (__exports__);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarButtonColor.vue?vue&type=template&id=f094c3d0&scoped=true

const BarButtonColorvue_type_template_id_f094c3d0_scoped_true_withScopeId = n => (_pushScopeId("data-v-f094c3d0"), n = n(), _popScopeId(), n);
const BarButtonColorvue_type_template_id_f094c3d0_scoped_true_hoisted_1 = ["title"];
const BarButtonColorvue_type_template_id_f094c3d0_scoped_true_hoisted_2 = ["id"];
function BarButtonColorvue_type_template_id_f094c3d0_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["bar-button", _ctx.button_class]),
    title: _ctx.title,
    onMousedown: _cache[2] || (_cache[2] = (...args) => $options.mousedown_handler && $options.mousedown_handler(...args))
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
    class: "color-square",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({
      'background-color': $options.css_color
    })
  }, null, 4), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["menu", _ctx.item.menu_class]),
    id: _ctx.item.menu_id,
    onClick: _cache[1] || (_cache[1] = e => _ctx.item.stay_open ? e.stopPropagation() : true)
  }, [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveDynamicComponent)(_ctx.item.type || 'compact'), {
    modelValue: $data.color,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.color = $event)
  }, null, 8, ["modelValue"]))], 10, BarButtonColorvue_type_template_id_f094c3d0_scoped_true_hoisted_2)], 42, BarButtonColorvue_type_template_id_f094c3d0_scoped_true_hoisted_1);
}
;// CONCATENATED MODULE: ./src/Bar/BarButtonColor.vue?vue&type=template&id=f094c3d0&scoped=true

;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/style-inject.es-746bb8ed.js
function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/defaultConfig.js
const defaultConfig_name = 'VueColor';
// 自定义组件前缀
const prefix = '';
const cssPrefix = '';
const size = 'medium';



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/utils/compoent.js


const install = function (app, options) {
  const { componentPrefix = prefix } = options || {};
  app.component(`${componentPrefix}${this.name}`, this);
};



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/checkboard/index.js





const _checkboardCache = {};

var script = {
  name: 'Checkboard',
  props: {
    size: {
      type: [Number, String],
      default: 8,
    },
    white: {
      type: String,
      default: '#fff',
    },
    grey: {
      type: String,
      default: '#e6e6e6',
    },
  },
  computed: {
    bgStyle() {
      return {
        'background-image': `url(${getCheckboard(this.white, this.grey, this.size)})`,
      };
    },
  },
};

/**
 * get base 64 data by canvas
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */

function renderCheckboard(c1, c2, size) {
  // Dont Render On Server
  if (typeof document === 'undefined')
    return null;

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size * 2;
  const ctx = canvas.getContext('2d');
  // If no context can be found, return early.
  if (!ctx)
    return null;

  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
}

/**
 * get checkboard base data and cache
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */

function getCheckboard(c1, c2, size) {
  const key = `${c1},${c2},${size}`;

  if (_checkboardCache[key])
    return _checkboardCache[key];

  const checkboard = renderCheckboard(c1, c2, size);
  _checkboardCache[key] = checkboard;
  return checkboard;
}

function checkboard_render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    class: "vc-checkerboard",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)($options.bgStyle)
  }, null, 4 /* STYLE */))
}

var css_248z = ".vc-checkerboard{background-size:contain;bottom:0;left:0;position:absolute;right:0;top:0}";
styleInject(css_248z);

script.render = checkboard_render;
script.__file = "src/components/checkboard/checkboard.vue";

script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/alpha/index.js






var alpha_script = {
  name: 'Alpha',
  components: {
    Checkboard: script,
  },
  props: {
    value: Object,
    onChange: Function,
  },
  computed: {
    colors() {
      return this.value;
    },
    gradientColor() {
      const { rgba } = this.colors;
      const rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
      return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`;
    },
  },
  methods: {
    handleChange(e, skip) {
      !skip && e.preventDefault();
      const { container } = this.$refs;
      if (!container) {
        // for some edge cases, container may not exist. see #220
        return;
      }
      const containerWidth = container.clientWidth;

      const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      const left = pageX - xOffset;

      let a;
      if (left < 0)
        a = 0;
      else if (left > containerWidth)
        a = 1;
      else
        a = Math.round(left * 100 / containerWidth) / 100;

      if (this.colors.a !== a) {
        this.$emit('change', {
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a,
          source: 'rgba',
        });
      }
    },
    handleMouseDown(e) {
      this.handleChange(e, true);
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseUp() {
      this.unbindEventListeners();
    },
    unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    },
  },
};

const alpha_hoisted_1 = { class: "vc-alpha" };
const alpha_hoisted_2 = { class: "vc-alpha-checkboard-wrap" };
const alpha_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-alpha-picker" }, null, -1 /* HOISTED */);
const alpha_hoisted_4 = [
  alpha_hoisted_3
];

function alpha_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Checkboard = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Checkboard");

  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", alpha_hoisted_1, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", alpha_hoisted_2, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Checkboard)
    ]),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
      class: "vc-alpha-gradient",
      style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: $options.gradientColor })
    }, null, 4 /* STYLE */),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
      ref: "container",
      class: "vc-alpha-container",
      onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.handleMouseDown && $options.handleMouseDown(...args))),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => ($options.handleChange && $options.handleChange(...args))),
      onTouchstart: _cache[2] || (_cache[2] = (...args) => ($options.handleChange && $options.handleChange(...args)))
    }, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
        class: "vc-alpha-pointer",
        style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ left: `${$options.colors.a * 100}%` })
      }, alpha_hoisted_4, 4 /* STYLE */)
    ], 544 /* HYDRATE_EVENTS, NEED_PATCH */)
  ]))
}

var alpha_css_248z = ".vc-alpha,.vc-alpha-checkboard-wrap{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-checkboard-wrap{overflow:hidden}.vc-alpha-gradient{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-container{cursor:pointer;height:100%;margin:0 3px;position:relative;z-index:2}.vc-alpha-pointer{position:absolute;z-index:2}.vc-alpha-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}";
styleInject(alpha_css_248z);

alpha_script.render = alpha_render;
alpha_script.__file = "src/components/alpha/alpha.vue";

alpha_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/util.js
/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = '100%';
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    // Automatically convert percentage into number
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
        // If n is a hue given in degrees,
        // wrap around out-of-range values into [0, 360] range
        // then convert into [0, 1].
        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
    }
    else {
        // If n not a hue given in degrees
        // Convert into [0, 1] range if it isn't already.
        n = (n % max) / parseFloat(String(max));
    }
    return n;
}
/**
 * Force a number between 0 and 1
 * @hidden
 */
function clamp01(val) {
    return Math.min(1, Math.max(0, val));
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */
function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */
function convertToPercentage(n) {
    if (n <= 1) {
        return "".concat(Number(n) * 100, "%");
    }
    return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */
function util_pad2(c) {
    return c.length === 1 ? '0' + c : String(c);
}

;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/conversion.js

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */
function rgbToRgb(r, g, b) {
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255,
    };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */
function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        s = 0;
        h = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
        // achromatic
        g = l;
        b = l;
        r = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */
function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        util_pad2(Math.round(r).toString(16)),
        util_pad2(Math.round(g).toString(16)),
        util_pad2(Math.round(b).toString(16)),
    ];
    // Return a 3 character hex if possible
    if (allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color plus alpha transparency to hex
 *
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 */
// eslint-disable-next-line max-params
function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
        util_pad2(Math.round(r).toString(16)),
        util_pad2(Math.round(g).toString(16)),
        util_pad2(Math.round(b).toString(16)),
        util_pad2(convertDecimalToHex(a)),
    ];
    // Return a 4 character hex if possible
    if (allow4Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1)) &&
        hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color to an ARGB Hex8 string
 * Rarely used, but required for "toFilter()"
 */
function rgbaToArgbHex(r, g, b, a) {
    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
    ];
    return hex.join('');
}
/** Converts a decimal to a hex value */
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
    return parseInt(val, 16);
}
function numberInputToObject(color) {
    return {
        r: color >> 16,
        g: (color & 0xff00) >> 8,
        b: color & 0xff,
    };
}

;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js
// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
 * @hidden
 */
var names = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    goldenrod: '#daa520',
    gold: '#ffd700',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavenderblush: '#fff0f5',
    lavender: '#e6e6fa',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};

;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/format-input.js



/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */
function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === 'string') {
        color = stringInputToObject(color);
    }
    if (typeof color === 'object') {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = boundAlpha(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a,
    };
}
// <http://www.w3.org/TR/css3-values/#integers>
var CSS_INTEGER = '[-\\+]?\\d+%?';
// <http://www.w3.org/TR/css3-values/#number-value>
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match = matchers.rgb.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

;// CONCATENATED MODULE: ./node_modules/@ctrl/tinycolor/dist/module/index.js




var TinyColor = /** @class */ (function () {
    function TinyColor(color, opts) {
        if (color === void 0) { color = ''; }
        if (opts === void 0) { opts = {}; }
        var _a;
        // If input is already a tinycolor, return itself
        if (color instanceof TinyColor) {
            // eslint-disable-next-line no-constructor-return
            return color;
        }
        if (typeof color === 'number') {
            color = numberInputToObject(color);
        }
        this.originalInput = color;
        var rgb = inputToRGB(color);
        this.originalInput = color;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.a = rgb.a;
        this.roundA = Math.round(100 * this.a) / 100;
        this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
        this.gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this.r < 1) {
            this.r = Math.round(this.r);
        }
        if (this.g < 1) {
            this.g = Math.round(this.g);
        }
        if (this.b < 1) {
            this.b = Math.round(this.b);
        }
        this.isValid = rgb.ok;
    }
    TinyColor.prototype.isDark = function () {
        return this.getBrightness() < 128;
    };
    TinyColor.prototype.isLight = function () {
        return !this.isDark();
    };
    /**
     * Returns the perceived brightness of the color, from 0-255.
     */
    TinyColor.prototype.getBrightness = function () {
        // http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    };
    /**
     * Returns the perceived luminance of a color, from 0-1.
     */
    TinyColor.prototype.getLuminance = function () {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var R;
        var G;
        var B;
        var RsRGB = rgb.r / 255;
        var GsRGB = rgb.g / 255;
        var BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    /**
     * Returns the alpha value of a color, from 0-1.
     */
    TinyColor.prototype.getAlpha = function () {
        return this.a;
    };
    /**
     * Sets the alpha value on the current color.
     *
     * @param alpha - The new alpha value. The accepted range is 0-1.
     */
    TinyColor.prototype.setAlpha = function (alpha) {
        this.a = boundAlpha(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
    };
    /**
     * Returns the object as a HSVA object.
     */
    TinyColor.prototype.toHsv = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    /**
     * Returns the hsva values interpolated into a string with the following format:
     * "hsva(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHsvString = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        var h = Math.round(hsv.h * 360);
        var s = Math.round(hsv.s * 100);
        var v = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
    };
    /**
     * Returns the object as a HSLA object.
     */
    TinyColor.prototype.toHsl = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    /**
     * Returns the hsla values interpolated into a string with the following format:
     * "hsla(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHslString = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        var h = Math.round(hsl.h * 360);
        var s = Math.round(hsl.s * 100);
        var l = Math.round(hsl.l * 100);
        return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
    };
    /**
     * Returns the hex value of the color.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHex = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    /**
     * Returns the hex value of the color -with a # appened.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHexString = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return '#' + this.toHex(allow3Char);
    };
    /**
     * Returns the hex 8 value of the color.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8 = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    /**
     * Returns the hex 8 value of the color -with a # appened.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8String = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return '#' + this.toHex8(allow4Char);
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toRgb = function () {
        return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA values interpolated into a string with the following format:
     * "RGBA(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toRgbString = function () {
        var r = Math.round(this.r);
        var g = Math.round(this.g);
        var b = Math.round(this.b);
        return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toPercentageRgb = function () {
        var fmt = function (x) { return "".concat(Math.round(bound01(x, 255) * 100), "%"); };
        return {
            r: fmt(this.r),
            g: fmt(this.g),
            b: fmt(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA relative values interpolated into a string
     */
    TinyColor.prototype.toPercentageRgbString = function () {
        var rnd = function (x) { return Math.round(bound01(x, 255) * 100); };
        return this.a === 1
            ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)")
            : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    /**
     * The 'real' name of the color -if there is one.
     */
    TinyColor.prototype.toName = function () {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            return false;
        }
        var hex = '#' + rgbToHex(this.r, this.g, this.b, false);
        for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (hex === value) {
                return key;
            }
        }
        return false;
    };
    TinyColor.prototype.toString = function (format) {
        var formatSet = Boolean(format);
        format = format !== null && format !== void 0 ? format : this.format;
        var formattedString = false;
        var hasAlpha = this.a < 1 && this.a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');
        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === 'name' && this.a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === 'rgb') {
            formattedString = this.toRgbString();
        }
        if (format === 'prgb') {
            formattedString = this.toPercentageRgbString();
        }
        if (format === 'hex' || format === 'hex6') {
            formattedString = this.toHexString();
        }
        if (format === 'hex3') {
            formattedString = this.toHexString(true);
        }
        if (format === 'hex4') {
            formattedString = this.toHex8String(true);
        }
        if (format === 'hex8') {
            formattedString = this.toHex8String();
        }
        if (format === 'name') {
            formattedString = this.toName();
        }
        if (format === 'hsl') {
            formattedString = this.toHslString();
        }
        if (format === 'hsv') {
            formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
    };
    TinyColor.prototype.toNumber = function () {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor.prototype.clone = function () {
        return new TinyColor(this.toString());
    };
    /**
     * Lighten the color a given amount. Providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.lighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Brighten the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.brighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var rgb = this.toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return new TinyColor(rgb);
    };
    /**
     * Darken the color a given amount, from 0 to 100.
     * Providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.darken = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Mix the color with pure white, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.tint = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('white', amount);
    };
    /**
     * Mix the color with pure black, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.shade = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('black', amount);
    };
    /**
     * Desaturate the color a given amount, from 0 to 100.
     * Providing 100 will is the same as calling greyscale
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.desaturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Saturate the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.saturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Completely desaturates a color into greyscale.
     * Same as calling `desaturate(100)`
     */
    TinyColor.prototype.greyscale = function () {
        return this.desaturate(100);
    };
    /**
     * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
     * Values outside of this range will be wrapped into this range.
     */
    TinyColor.prototype.spin = function (amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return new TinyColor(hsl);
    };
    /**
     * Mix the current color a given amount with another color, from 0 to 100.
     * 0 means no mixing (return current color).
     */
    TinyColor.prototype.mix = function (color, amount) {
        if (amount === void 0) { amount = 50; }
        var rgb1 = this.toRgb();
        var rgb2 = new TinyColor(color).toRgb();
        var p = amount / 100;
        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a,
        };
        return new TinyColor(rgba);
    };
    TinyColor.prototype.analogous = function (results, slices) {
        if (results === void 0) { results = 6; }
        if (slices === void 0) { slices = 30; }
        var hsl = this.toHsl();
        var part = 360 / slices;
        var ret = [this];
        for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(new TinyColor(hsl));
        }
        return ret;
    };
    /**
     * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
     */
    TinyColor.prototype.complement = function () {
        var hsl = this.toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return new TinyColor(hsl);
    };
    TinyColor.prototype.monochromatic = function (results) {
        if (results === void 0) { results = 6; }
        var hsv = this.toHsv();
        var h = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var res = [];
        var modification = 1 / results;
        while (results--) {
            res.push(new TinyColor({ h: h, s: s, v: v }));
            v = (v + modification) % 1;
        }
        return res;
    };
    TinyColor.prototype.splitcomplement = function () {
        var hsl = this.toHsl();
        var h = hsl.h;
        return [
            this,
            new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
            new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
        ];
    };
    /**
     * Compute how the color would appear on a background
     */
    TinyColor.prototype.onBackground = function (background) {
        var fg = this.toRgb();
        var bg = new TinyColor(background).toRgb();
        return new TinyColor({
            r: bg.r + (fg.r - bg.r) * fg.a,
            g: bg.g + (fg.g - bg.g) * fg.a,
            b: bg.b + (fg.b - bg.b) * fg.a,
        });
    };
    /**
     * Alias for `polyad(3)`
     */
    TinyColor.prototype.triad = function () {
        return this.polyad(3);
    };
    /**
     * Alias for `polyad(4)`
     */
    TinyColor.prototype.tetrad = function () {
        return this.polyad(4);
    };
    /**
     * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
     * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
     */
    TinyColor.prototype.polyad = function (n) {
        var hsl = this.toHsl();
        var h = hsl.h;
        var result = [this];
        var increment = 360 / n;
        for (var i = 1; i < n; i++) {
            result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
        }
        return result;
    };
    /**
     * compare color vs current color
     */
    TinyColor.prototype.equals = function (color) {
        return this.toRgbString() === new TinyColor(color).toRgbString();
    };
    return TinyColor;
}());

// kept for backwards compatability with v1
function tinycolor(color, opts) {
    if (color === void 0) { color = ''; }
    if (opts === void 0) { opts = {}; }
    return new TinyColor(color, opts);
}

;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/mixin/color.js


function color_tinycolor(...args) {
  return new TinyColor(...args);
}

function _colorChange(data, oldHue) {
  const alpha = data && data.a;
  let color;

  // hsl is better than hex between conversions
  if (data && data.hsl)
    color = color_tinycolor(data.hsl);
  else if (data && data.hex && data.hex.length > 0)
    color = color_tinycolor(data.hex);
  else if (data && data.hsv)
    color = color_tinycolor(data.hsv);
  else if (data && data.rgba)
    color = color_tinycolor(data.rgba);
  else if (data && data.rgb)
    color = color_tinycolor(data.rgb);
  else
    color = color_tinycolor(data);

  if (color && (color._a === undefined || color._a === null))
    color.setAlpha(alpha || color.getAlpha());

  const hsl = color.toHsl();
  const hsv = color.toHsv();

  if (hsl.s === 0)
    hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0;

  /* --- comment this block to fix #109, may cause #25 again --- */
  // when the hsv.v is less than 0.0164 (base on test)
  // because of possible loss of precision
  // the result of hue and saturation would be miscalculated
  // if (hsv.v < 0.0164) {
  //   hsv.h = data.h || (data.hsv && data.hsv.h) || 0
  //   hsv.s = data.s || (data.hsv && data.hsv.s) || 0
  // }

  // if (hsl.l < 0.01) {
  //   hsl.h = data.h || (data.hsl && data.hsl.h) || 0
  //   hsl.s = data.s || (data.hsl && data.hsl.s) || 0
  // }
  /* ------ */

  return {
    hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: color.getAlpha(),
  };
}

var colorMixin = {
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: ['modelValue'],
  data() {
    return {
      val: _colorChange(this.modelValue),
    };
  },
  computed: {
    colors: {
      get() {
        return this.val;
      },
      set(newVal) {
        this.val = newVal;
        this.$emit('update:modelValue', newVal);
      },
    },
  },
  watch: {
    modelValue(newVal) {
      this.val = _colorChange(newVal);
    },
  },
  methods: {
    colorChange(data, oldHue) {
      this.oldHue = this.colors.hsl.h;
      this.colors = _colorChange(data, oldHue || this.oldHue);
    },
    isValidHex(hex) {
      return color_tinycolor(hex).isValid;
    },
    simpleCheckForValidColor(data) {
      const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
      let checked = 0;
      let passed = 0;

      for (let i = 0; i < keysToCheck.length; i++) {
        const letter = keysToCheck[i];
        if (data[letter]) {
          checked++;
          if (!isNaN(data[letter]))
            passed++;
        }
      }

      if (checked === passed)
        return data;
    },
    paletteUpperCase(palette) {
      return palette.map(c => c.toUpperCase());
    },
    isTransparent(color) {
      return color_tinycolor(color).getAlpha() === 0;
    },
  },
};



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/editable-input/index.js





var editable_input_script = {
  name: 'EditableInput',
  props: {
    label: String,
    labelText: String,
    desc: String,
    value: [String, Number],
    max: Number,
    min: Number,
    arrowOffset: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(v) {
        // TODO: min
        if (!(this.max === undefined) && +v > this.max)
          this.$refs.input.value = this.max;
        else
          return v;
      },
    },
    labelId() {
      return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`;
    },
    labelSpanText() {
      return this.labelText || this.label;
    },
  },
  methods: {
    update(e) {
      this.handleChange(e.target.value);
    },
    handleChange(newVal) {
      const data = {};
      data[this.label] = newVal;
      if (data.hex === undefined && data['#'] === undefined)
        this.$emit('change', data);
      else if (newVal.length > 5)
        this.$emit('change', data);
    },
    // **** unused
    // handleBlur (e) {
    //   console.log(e)
    // },
    handleKeyDown(e) {
      let { val } = this;
      const number = Number(val);

      if (number) {
        const amount = this.arrowOffset || 1;

        // Up
        if (e.keyCode === 38) {
          val = number + amount;
          this.handleChange(val);
          e.preventDefault();
        }

        // Down
        if (e.keyCode === 40) {
          val = number - amount;
          this.handleChange(val);
          e.preventDefault();
        }
      }
    },
    // **** unused
    // handleDrag (e) {
    //   console.log(e)
    // },
    // handleMouseDown (e) {
    //   console.log(e)
    // }
  },
};

const editable_input_hoisted_1 = { class: "vc-editable-input" };
const editable_input_hoisted_2 = ["aria-labelledby"];
const editable_input_hoisted_3 = ["id", "for"];
const editable_input_hoisted_4 = { class: "vc-input__desc" };

function editable_input_render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", editable_input_hoisted_1, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("input", {
      ref: "input",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($options.val) = $event)),
      "aria-labelledby": $options.labelId,
      class: "vc-input__input",
      onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.handleKeyDown && $options.handleKeyDown(...args))),
      onInput: _cache[2] || (_cache[2] = (...args) => ($options.update && $options.update(...args)))
    }, null, 40 /* PROPS, HYDRATE_EVENTS */, editable_input_hoisted_2), [
      [external_commonjs_vue_commonjs2_vue_root_Vue_.vModelText, $options.val]
    ]),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
      id: $options.labelId,
      for: $props.label,
      class: "vc-input__label"
    }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($options.labelSpanText), 9 /* TEXT, PROPS */, editable_input_hoisted_3),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", editable_input_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.desc), 1 /* TEXT */)
  ]))
}

var editable_input_css_248z = ".vc-editable-input{position:relative}.vc-input__input{border:0;outline:none;padding:0}.vc-input__label{text-transform:capitalize}";
styleInject(editable_input_css_248z);

editable_input_script.render = editable_input_render;
editable_input_script.__file = "src/components/editable-input/editable-input.vue";

editable_input_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/utils/utils.js
function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value);
}



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/saturation/index.js






var saturation_script = {
  name: 'Saturation',
  props: {
    value: Object,
  },
  computed: {
    colors() {
      return this.value;
    },
    bgColor() {
      return `hsl(${this.colors.hsv.h}, 100%, 50%)`;
    },
    pointerTop() {
      return `${(-(this.colors.hsv.v * 100) + 1) + 100}%`;
    },
    pointerLeft() {
      return `${this.colors.hsv.s * 100}%`;
    },
  },
  methods: {
    handleChange(e, skip) {
      !skip && e.preventDefault();
      const { container } = this.$refs;
      if (!container) {
        // for some edge cases, container may not exist. see #220
        return;
      }
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      const yOffset = container.getBoundingClientRect().top + window.pageYOffset;
      const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
      const left = clamp(pageX - xOffset, 0, containerWidth);
      const top = clamp(pageY - yOffset, 0, containerHeight);
      const saturation = left / containerWidth;
      const bright = clamp(-(top / containerHeight) + 1, 0, 1);

      this.onChange({
        h: this.colors.hsv.h,
        s: saturation,
        v: bright,
        a: this.colors.hsv.a,
        source: 'hsva',
      });
    },
    onChange(param) {
      this.$emit('change', param);
    },
    handleMouseDown(e) {
      // this.handleChange(e, true)
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseUp(e) {
      this.unbindEventListeners();
    },
    unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    },
  },
};

const saturation_hoisted_1 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-saturation--white" }, null, -1 /* HOISTED */);
const saturation_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-saturation--black" }, null, -1 /* HOISTED */);
const saturation_hoisted_3 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-saturation-circle" }, null, -1 /* HOISTED */);
const saturation_hoisted_4 = [
  saturation_hoisted_3
];

function saturation_render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    ref: "container",
    class: "vc-saturation",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: $options.bgColor }),
    onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.handleMouseDown && $options.handleMouseDown(...args))),
    onTouchmove: _cache[1] || (_cache[1] = (...args) => ($options.handleChange && $options.handleChange(...args))),
    onTouchstart: _cache[2] || (_cache[2] = (...args) => ($options.handleChange && $options.handleChange(...args)))
  }, [
    saturation_hoisted_1,
    saturation_hoisted_2,
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
      class: "vc-saturation-pointer",
      style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ top: $options.pointerTop, left: $options.pointerLeft })
    }, saturation_hoisted_4, 4 /* STYLE */)
  ], 36 /* STYLE, HYDRATE_EVENTS */))
}

var saturation_css_248z = ".vc-saturation,.vc-saturation--black,.vc-saturation--white{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.vc-saturation--white{background:linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.vc-saturation--black{background:linear-gradient(0deg,#000,transparent)}.vc-saturation-pointer{cursor:pointer;position:absolute}.vc-saturation-circle{border-radius:50%;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);cursor:head;height:4px;transform:translate(-2px,-2px);width:4px}";
styleInject(saturation_css_248z);

saturation_script.render = saturation_render;
saturation_script.__file = "src/components/saturation/saturation.vue";

saturation_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/hue/index.js





var hue_script = {
  name: 'Hue',
  props: {
    value: Object,
    direction: {
      type: String,
      // [horizontal | vertical]
      default: 'horizontal',
    },
  },
  data() {
    return {
      oldHue: 0,
      pullDirection: '',
    };
  },
  computed: {
    colors() {
      return this.value;
    },
    directionClass() {
      return {
        'vc-hue--horizontal': this.direction === 'horizontal',
        'vc-hue--vertical': this.direction === 'vertical',
      };
    },
    pointerTop() {
      if (this.direction === 'vertical') {
        if (this.colors.hsl.h === 0 && this.pullDirection === 'right')
          return 0;
        return `${-((this.colors.hsl.h * 100) / 360) + 100}%`;
      }
      return 0;
    },
    pointerLeft() {
      if (this.direction === 'vertical')
        return 0;

      if (this.colors.hsl.h === 0 && this.pullDirection === 'right')
        return '100%';
      return `${(this.colors.hsl.h * 100) / 360}%`;
    },
  },
  watch: {
    value: {
      handler(value, oldVal) {
        const { h } = value.hsl;
        if (h !== 0 && h - this.oldHue > 0)
          this.pullDirection = 'right';
        if (h !== 0 && h - this.oldHue < 0)
          this.pullDirection = 'left';
        this.oldHue = h;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleChange(e, skip) {
      !skip && e.preventDefault();

      const { container } = this.$refs;
      if (!container) {
        // for some edge cases, container may not exist. see #220
        return;
      }
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
      const yOffset = container.getBoundingClientRect().top + window.pageYOffset;
      const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
      const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
      const left = pageX - xOffset;
      const top = pageY - yOffset;

      let h;
      let percent;

      if (this.direction === 'vertical') {
        if (top < 0) {
          h = 360;
        }
        else if (top > containerHeight) {
          h = 0;
        }
        else {
          percent = -(top * 100 / containerHeight) + 100;
          h = (360 * percent / 100);
        }

        if (this.colors.hsl.h !== h) {
          this.$emit('change', {
            h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: 'hsl',
          });
        }
      }
      else {
        if (left < 0) {
          h = 0;
        }
        else if (left > containerWidth) {
          h = 360;
        }
        else {
          percent = left * 100 / containerWidth;
          h = (360 * percent / 100);
        }

        if (this.colors.hsl.h !== h) {
          this.$emit('change', {
            h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: 'hsl',
          });
        }
      }
    },
    handleMouseDown(e) {
      this.handleChange(e, true);
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseUp(e) {
      this.unbindEventListeners();
    },
    unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    },
  },
};

const hue_hoisted_1 = ["aria-valuenow"];
const hue_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-hue-picker" }, null, -1 /* HOISTED */);
const hue_hoisted_3 = [
  hue_hoisted_2
];

function hue_render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-hue", [$options.directionClass]])
  }, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
      ref: "container",
      class: "vc-hue-container",
      role: "slider",
      "aria-valuenow": $options.colors.hsl.h,
      "aria-valuemin": "0",
      "aria-valuemax": "360",
      onMousedown: _cache[0] || (_cache[0] = (...args) => ($options.handleMouseDown && $options.handleMouseDown(...args))),
      onTouchmove: _cache[1] || (_cache[1] = (...args) => ($options.handleChange && $options.handleChange(...args))),
      onTouchstart: _cache[2] || (_cache[2] = (...args) => ($options.handleChange && $options.handleChange(...args)))
    }, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
        class: "vc-hue-pointer",
        style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ top: $options.pointerTop, left: $options.pointerLeft }),
        role: "presentation"
      }, hue_hoisted_3, 4 /* STYLE */)
    ], 40 /* PROPS, HYDRATE_EVENTS */, hue_hoisted_1)
  ], 2 /* CLASS */))
}

var hue_css_248z = ".vc-hue{border-radius:2px;bottom:0;left:0;position:absolute;right:0;top:0}.vc-hue--horizontal{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue--vertical{background:linear-gradient(0deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue-container{cursor:pointer;height:100%;margin:0 2px;position:relative}.vc-hue-pointer{position:absolute;z-index:2}.vc-hue-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}";
styleInject(hue_css_248z);

hue_script.render = hue_render;
hue_script.__file = "src/components/hue/hue.vue";

hue_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/chrome/index.js













var chrome_script = {
  name: 'Chrome',
  components: {
    Saturation: saturation_script,
    Hue: hue_script,
    Alpha: alpha_script,
    EdIn: editable_input_script,
    Checkboard: script,
  },
  mixins: [colorMixin],
  props: {
    disableAlpha: {
      type: Boolean,
      default: false,
    },
    disableFields: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fieldsIndex: 0,
      highlight: false,
    };
  },
  computed: {
    hsl() {
      const { h, s, l } = this.colors.hsl;
      return {
        h: h.toFixed(),
        s: `${(s * 100).toFixed()}%`,
        l: `${(l * 100).toFixed()}%`,
      };
    },
    activeColor() {
      const { rgba } = this.colors;
      return `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`;
    },
    hasAlpha() {
      return this.colors.a < 1;
    },
  },
  methods: {
    childChange(data) {
      this.colorChange(data);
    },
    inputChange(data) {
      if (!data)
        return;

      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex',
        });
      }
      else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba',
        });
      }
      else if (data.h || data.s || data.l) {
        const s = data.s ? (data.s.replace('%', '') / 100) : this.colors.hsl.s;
        const l = data.l ? (data.l.replace('%', '') / 100) : this.colors.hsl.l;

        this.colorChange({
          h: data.h || this.colors.hsl.h,
          s,
          l,
          source: 'hsl',
        });
      }
    },
    toggleViews() {
      if (this.fieldsIndex >= 2) {
        this.fieldsIndex = 0;
        return;
      }
      this.fieldsIndex++;
    },
    showHighlight() {
      this.highlight = true;
    },
    hideHighlight() {
      this.highlight = false;
    },
  },
};

const chrome_hoisted_1 = { class: "vc-chrome-saturation-wrap" };
const chrome_hoisted_2 = { class: "vc-chrome-body" };
const chrome_hoisted_3 = { class: "vc-chrome-controls" };
const chrome_hoisted_4 = { class: "vc-chrome-color-wrap" };
const chrome_hoisted_5 = ["aria-label"];
const chrome_hoisted_6 = { class: "vc-chrome-sliders" };
const chrome_hoisted_7 = { class: "vc-chrome-hue-wrap" };
const _hoisted_8 = {
  key: 0,
  class: "vc-chrome-alpha-wrap"
};
const _hoisted_9 = {
  key: 0,
  class: "vc-chrome-fields-wrap"
};
const _hoisted_10 = { class: "vc-chrome-fields" };
const _hoisted_11 = { class: "vc-chrome-field" };
const _hoisted_12 = { class: "vc-chrome-fields" };
const _hoisted_13 = { class: "vc-chrome-field" };
const _hoisted_14 = { class: "vc-chrome-field" };
const _hoisted_15 = { class: "vc-chrome-field" };
const _hoisted_16 = {
  key: 0,
  class: "vc-chrome-field"
};
const _hoisted_17 = { class: "vc-chrome-fields" };
const _hoisted_18 = { class: "vc-chrome-field" };
const _hoisted_19 = { class: "vc-chrome-field" };
const _hoisted_20 = { class: "vc-chrome-field" };
const _hoisted_21 = {
  key: 0,
  class: "vc-chrome-field"
};
const _hoisted_22 = { class: "vc-chrome-toggle-icon" };
const _hoisted_23 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("path", {
  fill: "#333",
  d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
}, null, -1 /* HOISTED */);
const _hoisted_24 = [
  _hoisted_23
];
const _hoisted_25 = { class: "vc-chrome-toggle-icon-highlight" };

function chrome_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Saturation = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Saturation");
  const _component_Checkboard = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Checkboard");
  const _component_Hue = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Hue");
  const _component_Alpha = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Alpha");
  const _component_EdIn = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("EdIn");

  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    role: "application",
    "aria-label": "Chrome color picker",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-chrome", [$props.disableAlpha ? 'vc-chrome__disable-alpha' : '']])
  }, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", chrome_hoisted_1, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Saturation, {
        value: _ctx.colors,
        onChange: $options.childChange
      }, null, 8 /* PROPS */, ["value", "onChange"])
    ]),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", chrome_hoisted_2, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", chrome_hoisted_3, [
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", chrome_hoisted_4, [
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
            "aria-label": `current color is ${_ctx.colors.hex}`,
            class: "vc-chrome-active-color",
            style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: $options.activeColor })
          }, null, 12 /* STYLE, PROPS */, chrome_hoisted_5),
          (!$props.disableAlpha)
            ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_Checkboard, { key: 0 }))
            : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
        ]),
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", chrome_hoisted_6, [
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", chrome_hoisted_7, [
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Hue, {
              value: _ctx.colors,
              onChange: $options.childChange
            }, null, 8 /* PROPS */, ["value", "onChange"])
          ]),
          (!$props.disableAlpha)
            ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", _hoisted_8, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Alpha, {
                  value: _ctx.colors,
                  onChange: $options.childChange
                }, null, 8 /* PROPS */, ["value", "onChange"])
              ]))
            : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
        ])
      ]),
      (!$props.disableFields)
        ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", _hoisted_9, [
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_10, [
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)(" hex "),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_11, [
                (!$options.hasAlpha)
                  ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_EdIn, {
                      key: 0,
                      label: "hex",
                      value: _ctx.colors.hex,
                      onChange: $options.inputChange
                    }, null, 8 /* PROPS */, ["value", "onChange"]))
                  : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true),
                ($options.hasAlpha)
                  ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_EdIn, {
                      key: 1,
                      label: "hex",
                      value: _ctx.colors.hex8,
                      onChange: $options.inputChange
                    }, null, 8 /* PROPS */, ["value", "onChange"]))
                  : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
              ])
            ], 512 /* NEED_PATCH */), [
              [external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.fieldsIndex === 0]
            ]),
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_12, [
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)(" rgba "),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_13, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "r",
                  value: _ctx.colors.rgba.r,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"])
              ]),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_14, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "g",
                  value: _ctx.colors.rgba.g,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"])
              ]),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_15, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "b",
                  value: _ctx.colors.rgba.b,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"])
              ]),
              (!$props.disableAlpha)
                ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", _hoisted_16, [
                    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                      label: "a",
                      value: _ctx.colors.a,
                      "arrow-offset": 0.01,
                      max: 1,
                      onChange: $options.inputChange
                    }, null, 8 /* PROPS */, ["value", "arrow-offset", "onChange"])
                  ]))
                : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
            ], 512 /* NEED_PATCH */), [
              [external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.fieldsIndex === 1]
            ]),
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_17, [
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)(" hsla "),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_18, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "h",
                  value: $options.hsl.h,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"])
              ]),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_19, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "s",
                  value: $options.hsl.s,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"])
              ]),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_20, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "l",
                  value: $options.hsl.l,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"])
              ]),
              (!$props.disableAlpha)
                ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", _hoisted_21, [
                    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                      label: "a",
                      value: _ctx.colors.a,
                      "arrow-offset": 0.01,
                      max: 1,
                      onChange: $options.inputChange
                    }, null, 8 /* PROPS */, ["value", "arrow-offset", "onChange"])
                  ]))
                : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
            ], 512 /* NEED_PATCH */), [
              [external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.fieldsIndex === 2]
            ]),
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)(" btn "),
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
              class: "vc-chrome-toggle-btn",
              role: "button",
              "aria-label": "Change another color definition",
              onClick: _cache[3] || (_cache[3] = (...args) => ($options.toggleViews && $options.toggleViews(...args)))
            }, [
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_22, [
                ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("svg", {
                  style: {"width":"24px","height":"24px"},
                  viewBox: "0 0 24 24",
                  onMouseover: _cache[0] || (_cache[0] = (...args) => ($options.showHighlight && $options.showHighlight(...args))),
                  onMouseenter: _cache[1] || (_cache[1] = (...args) => ($options.showHighlight && $options.showHighlight(...args))),
                  onMouseout: _cache[2] || (_cache[2] = (...args) => ($options.hideHighlight && $options.hideHighlight(...args)))
                }, _hoisted_24, 32 /* HYDRATE_EVENTS */))
              ]),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_25, null, 512 /* NEED_PATCH */), [
                [external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.highlight]
              ])
            ]),
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)(" btn ")
          ]))
        : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
    ])
  ], 2 /* CLASS */))
}

var chrome_css_248z = ".vc-chrome{background:#fff;background-color:#fff;border-radius:2px;box-shadow:0 0 2px rgba(0,0,0,.3),0 4px 8px rgba(0,0,0,.3);box-sizing:initial;font-family:Menlo;width:225px}.vc-chrome-controls{display:flex}.vc-chrome-color-wrap{position:relative;width:36px}.vc-chrome-active-color{border-radius:15px;height:30px;overflow:hidden;position:relative;width:30px;z-index:1}.vc-chrome-color-wrap .vc-checkerboard{background-size:auto;border-radius:15px;height:30px;width:30px}.vc-chrome-sliders{flex:1}.vc-chrome-fields-wrap{display:flex;padding-top:16px}.vc-chrome-fields{display:flex;flex:1;margin-left:-6px}.vc-chrome-field{padding-left:6px;width:100%}.vc-chrome-toggle-btn{position:relative;text-align:right;width:32px}.vc-chrome-toggle-icon{cursor:pointer;margin-right:-4px;margin-top:12px;position:relative;z-index:2}.vc-chrome-toggle-icon-highlight{background:#eee;border-radius:4px;height:28px;left:12px;position:absolute;top:10px;width:24px}.vc-chrome-hue-wrap{margin-bottom:8px}.vc-chrome-alpha-wrap,.vc-chrome-hue-wrap{height:10px;position:relative}.vc-chrome-alpha-wrap .vc-alpha-gradient,.vc-chrome-hue-wrap .vc-hue{border-radius:2px}.vc-chrome-alpha-wrap .vc-alpha-picker,.vc-chrome-hue-wrap .vc-hue-picker{background-color:#f8f8f8;border-radius:6px;box-shadow:0 1px 4px 0 rgba(0,0,0,.37);height:12px;transform:translate(-6px,-2px);width:12px}.vc-chrome-body{background-color:#fff;padding:16px 16px 12px}.vc-chrome-saturation-wrap{border-radius:2px 2px 0 0;overflow:hidden;padding-bottom:55%;position:relative;width:100%}.vc-chrome-saturation-wrap .vc-saturation-circle{height:12px;width:12px}.vc-chrome-fields .vc-input__input{border:none;border-radius:2px;box-shadow:inset 0 0 0 1px #dadada;color:#333;font-size:11px;height:21px;text-align:center;width:100%}.vc-chrome-fields .vc-input__label{color:#969696;display:block;font-size:11px;line-height:11px;margin-top:12px;text-align:center;text-transform:uppercase}.vc-chrome__disable-alpha .vc-chrome-active-color{height:18px;width:18px}.vc-chrome__disable-alpha .vc-chrome-color-wrap{width:30px}.vc-chrome__disable-alpha .vc-chrome-hue-wrap{margin-bottom:4px;margin-top:4px}";
styleInject(chrome_css_248z);

chrome_script.render = chrome_render;
chrome_script.__file = "src/components/chrome/chrome.vue";

chrome_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/compact/index.js







const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
  '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',
];

var compact_script = {
  name: 'Compact',
  mixins: [colorMixin],
  props: {
    palette: {
      type: Array,
      default() {
        return defaultColors;
      },
    },
  },
  computed: {
    pick() {
      return this.colors.hex.toUpperCase();
    },
  },
  methods: {
    handlerClick(c) {
      this.colorChange({
        hex: c,
        source: 'hex',
      });
    },
  },
};

const compact_hoisted_1 = {
  role: "application",
  "aria-label": "Compact color picker",
  class: "vc-compact"
};
const compact_hoisted_2 = {
  class: "vc-compact-colors",
  role: "listbox"
};
const compact_hoisted_3 = ["aria-label", "aria-selected", "onClick"];
const compact_hoisted_4 = { class: "vc-compact-dot" };

function compact_render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", compact_hoisted_1, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("ul", compact_hoisted_2, [
      ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)(_ctx.paletteUpperCase($props.palette), (c) => {
        return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("li", {
          key: c,
          role: "option",
          "aria-label": `color:${c}`,
          "aria-selected": c === $options.pick,
          class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-compact-color-item", { 'vc-compact-color-item--white': c === '#FFFFFF' }]),
          style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: c }),
          onClick: $event => ($options.handlerClick(c))
        }, [
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", compact_hoisted_4, null, 512 /* NEED_PATCH */), [
            [external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, c === $options.pick]
          ])
        ], 14 /* CLASS, STYLE, PROPS */, compact_hoisted_3))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

var compact_css_248z = ".vc-compact{background-color:#fff;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);box-sizing:border-box;padding-left:5px;padding-top:5px;width:245px}.vc-compact-colors{margin:0;overflow:hidden;padding:0}.vc-compact-color-item{cursor:pointer;float:left;height:15px;list-style:none;margin-bottom:5px;margin-right:5px;position:relative;width:15px}.vc-compact-color-item--white{box-shadow:inset 0 0 0 1px #ddd}.vc-compact-color-item--white .vc-compact-dot{background:#000}.vc-compact-dot{background:#fff;border-radius:50%;bottom:5px;left:5px;opacity:1;position:absolute;right:5px;top:5px}";
styleInject(compact_css_248z);

compact_script.render = compact_render;
compact_script.__file = "src/components/compact/compact.vue";

compact_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/grayscale/index.js







const grayscale_defaultColors = [
  '#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3',
  '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959',
  '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000',
];

var grayscale_script = {
  name: 'Grayscale',
  components: {

  },
  mixins: [colorMixin],
  props: {
    palette: {
      type: Array,
      default() {
        return grayscale_defaultColors;
      },
    },
  },
  computed: {
    pick() {
      return this.colors.hex.toUpperCase();
    },
  },
  methods: {
    handlerClick(c) {
      this.colorChange({
        hex: c,
        source: 'hex',
      });
    },
  },
};

const grayscale_hoisted_1 = {
  role: "application",
  "aria-label": "Grayscale color picker",
  class: "vc-grayscale"
};
const grayscale_hoisted_2 = {
  class: "vc-grayscale-colors",
  role: "listbox"
};
const grayscale_hoisted_3 = ["aria-label", "aria-selected", "onClick"];
const grayscale_hoisted_4 = { class: "vc-grayscale-dot" };

function grayscale_render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", grayscale_hoisted_1, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("ul", grayscale_hoisted_2, [
      ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)(_ctx.paletteUpperCase($props.palette), (c) => {
        return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("li", {
          key: c,
          role: "option",
          "aria-label": `Color:${c}`,
          "aria-selected": c === $options.pick,
          class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-grayscale-color-item", { 'vc-grayscale-color-item--white': c === '#FFFFFF' }]),
          style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: c }),
          onClick: $event => ($options.handlerClick(c))
        }, [
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", grayscale_hoisted_4, null, 512 /* NEED_PATCH */), [
            [external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, c === $options.pick]
          ])
        ], 14 /* CLASS, STYLE, PROPS */, grayscale_hoisted_3))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

var grayscale_css_248z = ".vc-grayscale{background-color:#fff;border-radius:2px;box-shadow:0 2px 15px rgba(0,0,0,.12),0 2px 10px rgba(0,0,0,.16);width:125px}.vc-grayscale-colors{border-radius:2px;margin:0;overflow:hidden;padding:0}.vc-grayscale-color-item{cursor:pointer;float:left;height:25px;list-style:none;position:relative;width:25px}.vc-grayscale-color-item--white .vc-grayscale-dot{background:#000}.vc-grayscale-dot{background:#fff;border-radius:50%;height:6px;left:50%;margin:-3px 0 0 -2px;opacity:1;position:absolute;top:50%;width:6px}";
styleInject(grayscale_css_248z);

grayscale_script.render = grayscale_render;
grayscale_script.__file = "src/components/grayscale/grayscale.vue";

grayscale_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/material/index.js








var material_script = {
  name: 'Material',
  components: {
    EdIn: editable_input_script,
  },
  mixins: [colorMixin],
  methods: {
    onChange(data) {
      if (!data)
        return;

      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex',
        });
      }
      else if (data.r || data.g || data.b) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba',
        });
      }
    },
  },
};

const material_hoisted_1 = {
  role: "application",
  "aria-label": "Material color picker",
  class: "vc-material"
};
const material_hoisted_2 = { class: "vc-material-split" };
const material_hoisted_3 = { class: "vc-material-third" };
const material_hoisted_4 = { class: "vc-material-third" };
const material_hoisted_5 = { class: "vc-material-third" };

function material_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EdIn = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("EdIn");

  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", material_hoisted_1, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
      class: "vc-material-hex",
      label: "hex",
      value: _ctx.colors.hex,
      style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ borderColor: _ctx.colors.hex }),
      onChange: $options.onChange
    }, null, 8 /* PROPS */, ["value", "style", "onChange"]),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", material_hoisted_2, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", material_hoisted_3, [
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
          label: "r",
          value: _ctx.colors.rgba.r,
          onChange: $options.onChange
        }, null, 8 /* PROPS */, ["value", "onChange"])
      ]),
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", material_hoisted_4, [
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
          label: "g",
          value: _ctx.colors.rgba.g,
          onChange: $options.onChange
        }, null, 8 /* PROPS */, ["value", "onChange"])
      ]),
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", material_hoisted_5, [
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
          label: "b",
          value: _ctx.colors.rgba.b,
          onChange: $options.onChange
        }, null, 8 /* PROPS */, ["value", "onChange"])
      ])
    ])
  ]))
}

var material_css_248z = ".vc-material{background-color:#fff;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);font-family:Roboto;height:98px;padding:16px;position:relative;width:98px}.vc-material .vc-input__input{color:#333;font-size:15px;height:30px;margin-top:12px;width:100%}.vc-material .vc-input__label{color:#999;font-size:11px;left:0;position:absolute;text-transform:capitalize;top:0}.vc-material-hex{border-bottom-style:solid;border-bottom-width:2px}.vc-material-split{display:flex;margin-right:-10px;padding-top:11px}.vc-material-third{flex:1;padding-right:10px}";
styleInject(material_css_248z);

material_script.render = material_render;
material_script.__file = "src/components/material/material.vue";

material_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/photoshop/index.js











var photoshop_script = {
  name: 'Photoshop',
  components: {
    Saturation: saturation_script,
    Hue: hue_script,
    EdIn: editable_input_script,
  },
  mixins: [colorMixin],
  props: {
    head: {
      type: String,
      default: 'Color Picker',
    },
    disableFields: {
      type: Boolean,
      default: false,
    },
    hasResetButton: {
      type: Boolean,
      default: false,
    },
    acceptLabel: {
      type: String,
      default: 'OK',
    },
    cancelLabel: {
      type: String,
      default: 'Cancel',
    },
    resetLabel: {
      type: String,
      default: 'Reset',
    },
    newLabel: {
      type: String,
      default: 'new',
    },
    currentLabel: {
      type: String,
      default: 'current',
    },
  },
  data() {
    return {
      currentColor: '#FFF',
    };
  },
  computed: {
    hsv() {
      const { hsv } = this.colors;
      return {
        h: hsv.h.toFixed(),
        s: (hsv.s * 100).toFixed(),
        v: (hsv.v * 100).toFixed(),
      };
    },
    hex() {
      const { hex } = this.colors;
      return hex && hex.replace('#', '');
    },
  },
  created() {
    this.currentColor = this.colors.hex;
  },
  methods: {
    childChange(data) {
      this.colorChange(data);
    },
    inputChange(data) {
      if (!data)
        return;

      if (data['#']) {
        this.isValidHex(data['#']) && this.colorChange({
          hex: data['#'],
          source: 'hex',
        });
      }
      else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba',
        });
      }
      else if (data.h || data.s || data.v) {
        this.colorChange({
          h: data.h || this.colors.hsv.h,
          s: (data.s / 100) || this.colors.hsv.s,
          v: (data.v / 100) || this.colors.hsv.v,
          source: 'hsv',
        });
      }
    },
    clickCurrentColor() {
      this.colorChange({
        hex: this.currentColor,
        source: 'hex',
      });
    },
    handleAccept() {
      this.$emit('ok');
    },
    handleCancel() {
      this.$emit('cancel');
    },
    handleReset() {
      this.$emit('reset');
    },
  },

};

const photoshop_hoisted_1 = {
  role: "heading",
  class: "vc-ps-head"
};
const photoshop_hoisted_2 = { class: "vc-ps-body" };
const photoshop_hoisted_3 = { class: "vc-ps-saturation-wrap" };
const photoshop_hoisted_4 = { class: "vc-ps-hue-wrap" };
const photoshop_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-ps-hue-pointer" }, [
  /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", { class: "vc-ps-hue-pointer--left" }),
  /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", { class: "vc-ps-hue-pointer--right" })
], -1 /* HOISTED */);
const photoshop_hoisted_6 = { class: "vc-ps-previews" };
const photoshop_hoisted_7 = { class: "vc-ps-previews__label" };
const photoshop_hoisted_8 = { class: "vc-ps-previews__swatches" };
const photoshop_hoisted_9 = ["aria-label"];
const photoshop_hoisted_10 = ["aria-label"];
const photoshop_hoisted_11 = { class: "vc-ps-previews__label" };
const photoshop_hoisted_12 = {
  key: 0,
  class: "vc-ps-actions"
};
const photoshop_hoisted_13 = ["aria-label"];
const photoshop_hoisted_14 = ["aria-label"];
const photoshop_hoisted_15 = { class: "vc-ps-fields" };
const photoshop_hoisted_16 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-ps-fields__divider" }, null, -1 /* HOISTED */);
const photoshop_hoisted_17 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-ps-fields__divider" }, null, -1 /* HOISTED */);

function photoshop_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Saturation = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Saturation");
  const _component_Hue = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Hue");
  const _component_EdIn = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("EdIn");

  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    role: "application",
    "aria-label": "PhotoShop color picker",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-photoshop", [$props.disableFields ? 'vc-photoshop__disable-fields' : '']])
  }, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", photoshop_hoisted_1, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.head), 1 /* TEXT */),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", photoshop_hoisted_2, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", photoshop_hoisted_3, [
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Saturation, {
          value: _ctx.colors,
          onChange: $options.childChange
        }, null, 8 /* PROPS */, ["value", "onChange"])
      ]),
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", photoshop_hoisted_4, [
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Hue, {
          value: _ctx.colors,
          direction: "vertical",
          onChange: $options.childChange
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [
            photoshop_hoisted_5
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["value", "onChange"])
      ]),
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-ps-controls", [$props.disableFields ? 'vc-ps-controls__disable-fields' : '']])
      }, [
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", photoshop_hoisted_6, [
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", photoshop_hoisted_7, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.newLabel), 1 /* TEXT */),
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", photoshop_hoisted_8, [
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
              class: "vc-ps-previews__pr-color",
              "aria-label": `New color is ${_ctx.colors.hex}`,
              style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: _ctx.colors.hex })
            }, null, 12 /* STYLE, PROPS */, photoshop_hoisted_9),
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
              class: "vc-ps-previews__pr-color",
              "aria-label": `Current color is ${$data.currentColor}`,
              style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: $data.currentColor }),
              onClick: _cache[0] || (_cache[0] = (...args) => ($options.clickCurrentColor && $options.clickCurrentColor(...args)))
            }, null, 12 /* STYLE, PROPS */, photoshop_hoisted_10)
          ]),
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", photoshop_hoisted_11, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.currentLabel), 1 /* TEXT */)
        ]),
        (!$props.disableFields)
          ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", photoshop_hoisted_12, [
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
                class: "vc-ps-ac-btn",
                role: "button",
                "aria-label": $props.acceptLabel,
                onClick: _cache[1] || (_cache[1] = (...args) => ($options.handleAccept && $options.handleAccept(...args)))
              }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.acceptLabel), 9 /* TEXT, PROPS */, photoshop_hoisted_13),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
                class: "vc-ps-ac-btn",
                role: "button",
                "aria-label": $props.cancelLabel,
                onClick: _cache[2] || (_cache[2] = (...args) => ($options.handleCancel && $options.handleCancel(...args)))
              }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.cancelLabel), 9 /* TEXT, PROPS */, photoshop_hoisted_14),
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", photoshop_hoisted_15, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)(" hsla "),
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "h",
                  desc: "°",
                  value: $options.hsv.h,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "s",
                  desc: "%",
                  value: $options.hsv.s,
                  max: 100,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "v",
                  desc: "%",
                  value: $options.hsv.v,
                  max: 100,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                photoshop_hoisted_16,
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)(" rgba "),
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "r",
                  value: _ctx.colors.rgba.r,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "g",
                  value: _ctx.colors.rgba.g,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "b",
                  value: _ctx.colors.rgba.b,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"]),
                photoshop_hoisted_17,
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)(" hex "),
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "#",
                  class: "vc-ps-fields__hex",
                  value: $options.hex,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "onChange"])
              ]),
              ($props.hasResetButton)
                ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
                    key: 0,
                    class: "vc-ps-ac-btn",
                    "aria-label": "reset",
                    onClick: _cache[3] || (_cache[3] = (...args) => ($options.handleReset && $options.handleReset(...args)))
                  }, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)($props.resetLabel), 1 /* TEXT */))
                : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
            ]))
          : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
      ], 2 /* CLASS */)
    ])
  ], 2 /* CLASS */))
}

var photoshop_css_248z = ".vc-photoshop{background:#dcdcdc;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.25),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;font-family:Roboto;width:513px}.vc-photoshop__disable-fields{width:390px}.vc-ps-head{background-image:linear-gradient(-180deg,#f0f0f0,#d4d4d4);border-bottom:1px solid #b1b1b1;border-radius:4px 4px 0 0;box-shadow:inset 0 1px 0 0 hsla(0,0%,100%,.2),inset 0 -1px 0 0 rgba(0,0,0,.02);color:#4d4d4d;font-size:13px;height:23px;line-height:24px;text-align:center}.vc-ps-body{display:flex;padding:15px}.vc-ps-saturation-wrap{border:2px solid #b3b3b3;border-bottom-color:#f0f0f0;height:256px;overflow:hidden;position:relative;width:256px}.vc-ps-saturation-wrap .vc-saturation-circle{height:12px;width:12px}.vc-ps-hue-wrap{border:2px solid #b3b3b3;border-bottom-color:#f0f0f0;height:256px;margin-left:10px;width:19px}.vc-ps-hue-pointer,.vc-ps-hue-wrap{position:relative}.vc-ps-hue-pointer--left,.vc-ps-hue-pointer--right{border-color:transparent transparent transparent #555;border-style:solid;border-width:5px 0 5px 8px;height:0;position:absolute;width:0}.vc-ps-hue-pointer--left:after,.vc-ps-hue-pointer--right:after{border-color:transparent transparent transparent #fff;border-style:solid;border-width:4px 0 4px 6px;content:\"\";height:0;left:1px;position:absolute;top:1px;transform:translate(-8px,-5px);width:0}.vc-ps-hue-pointer--left{transform:translate(-13px,-4px)}.vc-ps-hue-pointer--right{transform:translate(20px,-4px) rotate(180deg)}.vc-ps-controls{display:flex;margin-left:10px;width:180px}.vc-ps-controls__disable-fields{width:auto}.vc-ps-actions{flex:1;margin-left:20px}.vc-ps-ac-btn{background-image:linear-gradient(-180deg,#fff,#e6e6e6);border:1px solid #878787;border-radius:2px;box-shadow:0 1px 0 0 #eaeaea;color:#000;cursor:pointer;font-size:14px;height:20px;line-height:20px;margin-bottom:10px;text-align:center}.vc-ps-previews{width:60px}.vc-ps-previews__swatches{border:1px solid #b3b3b3;border-bottom-color:#f0f0f0;margin-bottom:2px;margin-top:1px}.vc-ps-previews__pr-color{box-shadow:inset 1px 0 0 #000,inset -1px 0 0 #000,inset 0 1px 0 #000;height:34px}.vc-ps-previews__label{color:#000;font-size:14px;text-align:center}.vc-ps-fields{padding-bottom:9px;padding-top:5px;position:relative;width:80px}.vc-ps-fields .vc-input__input{border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;font-size:13px;height:18px;margin-bottom:5px;margin-left:40%;margin-right:10px;padding-left:3px;width:40%}.vc-ps-fields .vc-input__desc,.vc-ps-fields .vc-input__label{font-size:13px;height:18px;line-height:22px;position:absolute;text-transform:uppercase;top:0}.vc-ps-fields .vc-input__label{left:0;width:34px}.vc-ps-fields .vc-input__desc{right:0;width:0}.vc-ps-fields__divider{height:5px}.vc-ps-fields__hex .vc-input__input{border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;font-size:13px;height:18px;margin-bottom:6px;margin-left:20%;padding-left:3px;width:80%}.vc-ps-fields__hex .vc-input__label{font-size:13px;height:18px;left:0;line-height:22px;position:absolute;text-transform:uppercase;top:0;width:14px}";
styleInject(photoshop_css_248z);

photoshop_script.render = photoshop_render;
photoshop_script.__file = "src/components/photoshop/photoshop.vue";

photoshop_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/sketch/index.js













const presetColors = [
  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
  'rgba(0,0,0,0)',
];

var sketch_script = {
  name: 'Sketch',
  components: {
    Saturation: saturation_script,
    Hue: hue_script,
    Alpha: alpha_script,
    EdIn: editable_input_script,
    Checkboard: script,
  },
  mixins: [colorMixin],
  props: {
    presetColors: {
      type: Array,
      default() {
        return presetColors;
      },
    },
    disableAlpha: {
      type: Boolean,
      default: false,
    },
    disableFields: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hex() {
      let hex;
      if (this.colors.a < 1)
        hex = this.colors.hex8;
      else
        hex = this.colors.hex;

      return hex.replace('#', '');
    },
    activeColor() {
      const { rgba } = this.colors;
      return `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`;
    },
  },
  methods: {
    handlePreset(c) {
      this.colorChange(c);
    },
    childChange(data) {
      this.colorChange(data);
    },
    inputChange(data) {
      if (!data)
        return;

      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex',
        });
      }
      else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba',
        });
      }
    },
  },
};

const sketch_hoisted_1 = { class: "vc-sketch-saturation-wrap" };
const sketch_hoisted_2 = { class: "vc-sketch-controls" };
const sketch_hoisted_3 = { class: "vc-sketch-sliders" };
const sketch_hoisted_4 = { class: "vc-sketch-hue-wrap" };
const sketch_hoisted_5 = {
  key: 0,
  class: "vc-sketch-alpha-wrap"
};
const sketch_hoisted_6 = { class: "vc-sketch-color-wrap" };
const sketch_hoisted_7 = ["aria-label"];
const sketch_hoisted_8 = {
  key: 0,
  class: "vc-sketch-field"
};
const sketch_hoisted_9 = { class: "vc-sketch-field--double" };
const sketch_hoisted_10 = { class: "vc-sketch-field--single" };
const sketch_hoisted_11 = { class: "vc-sketch-field--single" };
const sketch_hoisted_12 = { class: "vc-sketch-field--single" };
const sketch_hoisted_13 = {
  key: 0,
  class: "vc-sketch-field--single"
};
const sketch_hoisted_14 = {
  class: "vc-sketch-presets",
  role: "group",
  "aria-label": "A color preset, pick one to set as current color"
};
const sketch_hoisted_15 = ["aria-label", "onClick"];
const sketch_hoisted_16 = ["aria-label", "onClick"];

function sketch_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Saturation = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Saturation");
  const _component_Hue = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Hue");
  const _component_Alpha = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Alpha");
  const _component_Checkboard = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Checkboard");
  const _component_EdIn = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("EdIn");

  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    role: "application",
    "aria-label": "Sketch color picker",
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-sketch", [$props.disableAlpha ? 'vc-sketch__disable-alpha' : '']])
  }, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_1, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Saturation, {
        value: _ctx.colors,
        onChange: $options.childChange
      }, null, 8 /* PROPS */, ["value", "onChange"])
    ]),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_2, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_3, [
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_4, [
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Hue, {
            value: _ctx.colors,
            onChange: $options.childChange
          }, null, 8 /* PROPS */, ["value", "onChange"])
        ]),
        (!$props.disableAlpha)
          ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", sketch_hoisted_5, [
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Alpha, {
                value: _ctx.colors,
                onChange: $options.childChange
              }, null, 8 /* PROPS */, ["value", "onChange"])
            ]))
          : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
      ]),
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_6, [
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
          "aria-label": `Current color is ${$options.activeColor}`,
          class: "vc-sketch-active-color",
          style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: $options.activeColor })
        }, null, 12 /* STYLE, PROPS */, sketch_hoisted_7),
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Checkboard)
      ])
    ]),
    (!$props.disableFields)
      ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", sketch_hoisted_8, [
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)(" rgba "),
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_9, [
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
              label: "hex",
              value: $options.hex,
              onChange: $options.inputChange
            }, null, 8 /* PROPS */, ["value", "onChange"])
          ]),
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_10, [
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
              label: "r",
              value: _ctx.colors.rgba.r,
              onChange: $options.inputChange
            }, null, 8 /* PROPS */, ["value", "onChange"])
          ]),
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_11, [
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
              label: "g",
              value: _ctx.colors.rgba.g,
              onChange: $options.inputChange
            }, null, 8 /* PROPS */, ["value", "onChange"])
          ]),
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_12, [
            (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
              label: "b",
              value: _ctx.colors.rgba.b,
              onChange: $options.inputChange
            }, null, 8 /* PROPS */, ["value", "onChange"])
          ]),
          (!$props.disableAlpha)
            ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", sketch_hoisted_13, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EdIn, {
                  label: "a",
                  value: _ctx.colors.a,
                  "arrow-offset": 0.01,
                  max: 1,
                  onChange: $options.inputChange
                }, null, 8 /* PROPS */, ["value", "arrow-offset", "onChange"])
              ]))
            : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true)
        ]))
      : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("v-if", true),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", sketch_hoisted_14, [
      ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($props.presetColors, (c) => {
        return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, [
          (!_ctx.isTransparent(c))
            ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
                key: `!${c}`,
                class: "vc-sketch-presets-color",
                "aria-label": `Color:${c}`,
                style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: c }),
                onClick: $event => ($options.handlePreset(c))
              }, null, 12 /* STYLE, PROPS */, sketch_hoisted_15))
            : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
                key: c,
                "aria-label": `Color:${c}`,
                class: "vc-sketch-presets-color",
                onClick: $event => ($options.handlePreset(c))
              }, [
                (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Checkboard)
              ], 8 /* PROPS */, sketch_hoisted_16))
        ], 64 /* STABLE_FRAGMENT */))
      }), 256 /* UNKEYED_FRAGMENT */))
    ])
  ], 2 /* CLASS */))
}

var sketch_css_248z = ".vc-sketch{background:#fff;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.15),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;padding:10px 10px 0;position:relative;width:200px}.vc-sketch-saturation-wrap{overflow:hidden;padding-bottom:75%;position:relative;width:100%}.vc-sketch-controls{display:flex}.vc-sketch-sliders{flex:1;padding:4px 0}.vc-sketch-sliders .vc-alpha-gradient,.vc-sketch-sliders .vc-hue{border-radius:2px}.vc-sketch-alpha-wrap,.vc-sketch-hue-wrap{height:10px;position:relative}.vc-sketch-alpha-wrap{margin-top:4px;overflow:hidden}.vc-sketch-color-wrap{border-radius:3px;height:24px;margin-left:4px;margin-top:4px;position:relative;width:24px}.vc-sketch-active-color{border-radius:2px;bottom:0;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15),inset 0 0 4px rgba(0,0,0,.25);left:0;position:absolute;right:0;top:0;z-index:2}.vc-sketch-color-wrap .vc-checkerboard{background-size:auto}.vc-sketch-field{display:flex;padding-top:4px}.vc-sketch-field .vc-input__input{border:none;box-shadow:inset 0 0 0 1px #ccc;font-size:10px;padding:4px 0 3px 10%;width:90%}.vc-sketch-field .vc-input__label{color:#222;display:block;font-size:11px;padding-bottom:4px;padding-top:3px;text-align:center;text-transform:capitalize}.vc-sketch-field--single{flex:1;padding-left:6px}.vc-sketch-field--double{flex:2}.vc-sketch-presets{border-top:1px solid #eee;margin-left:-10px;margin-right:-10px;padding-left:10px;padding-top:10px}.vc-sketch-presets-color{cursor:pointer;display:inline-block;height:16px;margin:0 10px 10px 0;overflow:hidden;position:relative;vertical-align:top;width:16px}.vc-sketch-presets-color,.vc-sketch-presets-color .vc-checkerboard{border-radius:3px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}.vc-sketch__disable-alpha .vc-sketch-color-wrap{height:10px}";
styleInject(sketch_css_248z);

sketch_script.render = sketch_render;
sketch_script.__file = "src/components/sketch/sketch.vue";

sketch_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/slider/index.js








const DEFAULT_SATURATION = 0.5;

var slider_script = {
  name: 'Slider',
  components: {
    Hue: hue_script,
  },
  mixins: [colorMixin],
  props: {
    swatches: {
      type: Array,
      default() {
        // also accepts: ['.80', '.65', '.50', '.35', '.20']
        return [
          { s: DEFAULT_SATURATION, l: 0.8 },
          { s: DEFAULT_SATURATION, l: 0.65 },
          { s: DEFAULT_SATURATION, l: 0.5 },
          { s: DEFAULT_SATURATION, l: 0.35 },
          { s: DEFAULT_SATURATION, l: 0.2 },
        ];
      },
    },
  },
  computed: {
    normalizedSwatches() {
      const { swatches } = this;
      return swatches.map((swatch) => {
        // to be compatible with another data format ['.80', '.65', '.50', '.35', '.20']
        if (typeof swatch !== 'object') {
          return {
            s: DEFAULT_SATURATION,
            l: swatch,
          };
        }
        return swatch;
      });
    },
  },
  methods: {
    isActive(swatch, index) {
      const { hsl } = this.colors;
      if (hsl.l === 1 && swatch.l === 1)
        return true;

      if (hsl.l === 0 && swatch.l === 0)
        return true;

      return (
        Math.abs(hsl.l - swatch.l) < 0.01 && Math.abs(hsl.s - swatch.s) < 0.01
      );
    },
    hueChange(data) {
      this.colorChange(data);
    },
    handleSwClick(index, swatch) {
      this.colorChange({
        h: this.colors.hsl.h,
        s: swatch.s,
        l: swatch.l,
        source: 'hsl',
      });
    },
  },
};

const slider_hoisted_1 = {
  role: "application",
  "aria-label": "Slider color picker",
  class: "vc-slider"
};
const slider_hoisted_2 = { class: "vc-slider-hue-warp" };
const slider_hoisted_3 = {
  class: "vc-slider-swatches",
  role: "group"
};
const slider_hoisted_4 = ["data-index", "aria-label", "onClick"];

function slider_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Hue = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("Hue");

  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", slider_hoisted_1, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", slider_hoisted_2, [
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_Hue, {
        value: _ctx.colors,
        onChange: $options.hueChange
      }, null, 8 /* PROPS */, ["value", "onChange"])
    ]),
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", slider_hoisted_3, [
      ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($options.normalizedSwatches, (swatch, index) => {
        return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
          key: index,
          class: "vc-slider-swatch",
          "data-index": index,
          "aria-label": `color:${_ctx.colors.hex}`,
          role: "button",
          onClick: $event => ($options.handleSwClick(index, swatch))
        }, [
          (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", {
            class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-slider-swatch-picker", { 'vc-slider-swatch-picker--active': $options.isActive(swatch, index), 'vc-slider-swatch-picker--white': swatch.l === 1 }]),
            style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: `hsl(${_ctx.colors.hsl.h}, ${swatch.s * 100}%, ${swatch.l * 100}%)` })
          }, null, 6 /* CLASS, STYLE */)
        ], 8 /* PROPS */, slider_hoisted_4))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

var slider_css_248z = ".vc-slider{position:relative;width:410px}.vc-slider-hue-warp{height:12px;position:relative}.vc-slider-hue-warp .vc-hue-picker{background-color:#f8f8f8;border-radius:6px;box-shadow:0 1px 4px 0 rgba(0,0,0,.37);height:14px;transform:translate(-7px,-2px);width:14px}.vc-slider-swatches{display:flex;margin-top:20px}.vc-slider-swatch{flex:1;margin-right:1px;width:20%}.vc-slider-swatch:first-child{margin-right:1px}.vc-slider-swatch:first-child .vc-slider-swatch-picker{border-radius:2px 0 0 2px}.vc-slider-swatch:last-child{margin-right:0}.vc-slider-swatch:last-child .vc-slider-swatch-picker{border-radius:0 2px 2px 0}.vc-slider-swatch-picker{cursor:pointer;height:12px}.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active{border-radius:3.6px/2px;transform:scaleY(1.8)}.vc-slider-swatch-picker--white{box-shadow:inset 0 0 0 1px #ddd}.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white{box-shadow:inset 0 0 0 .6px #ddd}";
styleInject(slider_css_248z);

slider_script.render = slider_render;
slider_script.__file = "src/components/slider/slider.vue";

slider_script.install = install;



;// CONCATENATED MODULE: ./node_modules/material-colors/dist/colors.es2015.js
var red = {"50":"#ffebee","100":"#ffcdd2","200":"#ef9a9a","300":"#e57373","400":"#ef5350","500":"#f44336","600":"#e53935","700":"#d32f2f","800":"#c62828","900":"#b71c1c","a100":"#ff8a80","a200":"#ff5252","a400":"#ff1744","a700":"#d50000"};
var pink = {"50":"#fce4ec","100":"#f8bbd0","200":"#f48fb1","300":"#f06292","400":"#ec407a","500":"#e91e63","600":"#d81b60","700":"#c2185b","800":"#ad1457","900":"#880e4f","a100":"#ff80ab","a200":"#ff4081","a400":"#f50057","a700":"#c51162"};
var purple = {"50":"#f3e5f5","100":"#e1bee7","200":"#ce93d8","300":"#ba68c8","400":"#ab47bc","500":"#9c27b0","600":"#8e24aa","700":"#7b1fa2","800":"#6a1b9a","900":"#4a148c","a100":"#ea80fc","a200":"#e040fb","a400":"#d500f9","a700":"#aa00ff"};
var deepPurple = {"50":"#ede7f6","100":"#d1c4e9","200":"#b39ddb","300":"#9575cd","400":"#7e57c2","500":"#673ab7","600":"#5e35b1","700":"#512da8","800":"#4527a0","900":"#311b92","a100":"#b388ff","a200":"#7c4dff","a400":"#651fff","a700":"#6200ea"};
var indigo = {"50":"#e8eaf6","100":"#c5cae9","200":"#9fa8da","300":"#7986cb","400":"#5c6bc0","500":"#3f51b5","600":"#3949ab","700":"#303f9f","800":"#283593","900":"#1a237e","a100":"#8c9eff","a200":"#536dfe","a400":"#3d5afe","a700":"#304ffe"};
var blue = {"50":"#e3f2fd","100":"#bbdefb","200":"#90caf9","300":"#64b5f6","400":"#42a5f5","500":"#2196f3","600":"#1e88e5","700":"#1976d2","800":"#1565c0","900":"#0d47a1","a100":"#82b1ff","a200":"#448aff","a400":"#2979ff","a700":"#2962ff"};
var lightBlue = {"50":"#e1f5fe","100":"#b3e5fc","200":"#81d4fa","300":"#4fc3f7","400":"#29b6f6","500":"#03a9f4","600":"#039be5","700":"#0288d1","800":"#0277bd","900":"#01579b","a100":"#80d8ff","a200":"#40c4ff","a400":"#00b0ff","a700":"#0091ea"};
var cyan = {"50":"#e0f7fa","100":"#b2ebf2","200":"#80deea","300":"#4dd0e1","400":"#26c6da","500":"#00bcd4","600":"#00acc1","700":"#0097a7","800":"#00838f","900":"#006064","a100":"#84ffff","a200":"#18ffff","a400":"#00e5ff","a700":"#00b8d4"};
var teal = {"50":"#e0f2f1","100":"#b2dfdb","200":"#80cbc4","300":"#4db6ac","400":"#26a69a","500":"#009688","600":"#00897b","700":"#00796b","800":"#00695c","900":"#004d40","a100":"#a7ffeb","a200":"#64ffda","a400":"#1de9b6","a700":"#00bfa5"};
var green = {"50":"#e8f5e9","100":"#c8e6c9","200":"#a5d6a7","300":"#81c784","400":"#66bb6a","500":"#4caf50","600":"#43a047","700":"#388e3c","800":"#2e7d32","900":"#1b5e20","a100":"#b9f6ca","a200":"#69f0ae","a400":"#00e676","a700":"#00c853"};
var lightGreen = {"50":"#f1f8e9","100":"#dcedc8","200":"#c5e1a5","300":"#aed581","400":"#9ccc65","500":"#8bc34a","600":"#7cb342","700":"#689f38","800":"#558b2f","900":"#33691e","a100":"#ccff90","a200":"#b2ff59","a400":"#76ff03","a700":"#64dd17"};
var lime = {"50":"#f9fbe7","100":"#f0f4c3","200":"#e6ee9c","300":"#dce775","400":"#d4e157","500":"#cddc39","600":"#c0ca33","700":"#afb42b","800":"#9e9d24","900":"#827717","a100":"#f4ff81","a200":"#eeff41","a400":"#c6ff00","a700":"#aeea00"};
var yellow = {"50":"#fffde7","100":"#fff9c4","200":"#fff59d","300":"#fff176","400":"#ffee58","500":"#ffeb3b","600":"#fdd835","700":"#fbc02d","800":"#f9a825","900":"#f57f17","a100":"#ffff8d","a200":"#ffff00","a400":"#ffea00","a700":"#ffd600"};
var amber = {"50":"#fff8e1","100":"#ffecb3","200":"#ffe082","300":"#ffd54f","400":"#ffca28","500":"#ffc107","600":"#ffb300","700":"#ffa000","800":"#ff8f00","900":"#ff6f00","a100":"#ffe57f","a200":"#ffd740","a400":"#ffc400","a700":"#ffab00"};
var orange = {"50":"#fff3e0","100":"#ffe0b2","200":"#ffcc80","300":"#ffb74d","400":"#ffa726","500":"#ff9800","600":"#fb8c00","700":"#f57c00","800":"#ef6c00","900":"#e65100","a100":"#ffd180","a200":"#ffab40","a400":"#ff9100","a700":"#ff6d00"};
var deepOrange = {"50":"#fbe9e7","100":"#ffccbc","200":"#ffab91","300":"#ff8a65","400":"#ff7043","500":"#ff5722","600":"#f4511e","700":"#e64a19","800":"#d84315","900":"#bf360c","a100":"#ff9e80","a200":"#ff6e40","a400":"#ff3d00","a700":"#dd2c00"};
var brown = {"50":"#efebe9","100":"#d7ccc8","200":"#bcaaa4","300":"#a1887f","400":"#8d6e63","500":"#795548","600":"#6d4c41","700":"#5d4037","800":"#4e342e","900":"#3e2723"};
var grey = {"50":"#fafafa","100":"#f5f5f5","200":"#eeeeee","300":"#e0e0e0","400":"#bdbdbd","500":"#9e9e9e","600":"#757575","700":"#616161","800":"#424242","900":"#212121"};
var blueGrey = {"50":"#eceff1","100":"#cfd8dc","200":"#b0bec5","300":"#90a4ae","400":"#78909c","500":"#607d8b","600":"#546e7a","700":"#455a64","800":"#37474f","900":"#263238"};
var darkText = {"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(0, 0, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","dividers":"rgba(0, 0, 0, 0.12)"};
var lightText = {"primary":"rgba(255, 255, 255, 1)","secondary":"rgba(255, 255, 255, 0.7)","disabled":"rgba(255, 255, 255, 0.5)","dividers":"rgba(255, 255, 255, 0.12)"};
var darkIcons = {"active":"rgba(0, 0, 0, 0.54)","inactive":"rgba(0, 0, 0, 0.38)"};
var lightIcons = {"active":"rgba(255, 255, 255, 1)","inactive":"rgba(255, 255, 255, 0.5)"};
var white = "#ffffff";
var black = "#000000";

/* harmony default export */ var colors_es2015 = ({
  red: red,
  pink: pink,
  purple: purple,
  deepPurple: deepPurple,
  indigo: indigo,
  blue: blue,
  lightBlue: lightBlue,
  cyan: cyan,
  teal: teal,
  green: green,
  lightGreen: lightGreen,
  lime: lime,
  yellow: yellow,
  amber: amber,
  orange: orange,
  deepOrange: deepOrange,
  brown: brown,
  grey: grey,
  blueGrey: blueGrey,
  darkText: darkText,
  lightText: lightText,
  darkIcons: darkIcons,
  lightIcons: lightIcons,
  white: white,
  black: black
});

;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/swatches/index.js








const colorMap = [
  'red', 'pink', 'purple', 'deepPurple',
  'indigo', 'blue', 'lightBlue', 'cyan',
  'teal', 'green', 'lightGreen', 'lime',
  'yellow', 'amber', 'orange', 'deepOrange',
  'brown', 'blueGrey', 'black',
];
const colorLevel = ['900', '700', '500', '300', '100'];
const swatches_defaultColors = (() => {
  const colors = [];
  colorMap.forEach((type) => {
    let typeColor = [];
    if (type.toLowerCase() === 'black' || type.toLowerCase() === 'white') {
      typeColor = typeColor.concat(['#000000', '#FFFFFF']);
    }
    else {
      colorLevel.forEach((level) => {
        const color = colors_es2015[type][level];
        typeColor.push(color.toUpperCase());
      });
    }
    colors.push(typeColor);
  });
  return colors;
})();

var swatches_script = {
  name: 'Swatches',
  mixins: [colorMixin],
  props: {
    palette: {
      type: Array,
      default() {
        return swatches_defaultColors;
      },
    },
  },
  computed: {
    pick() {
      return this.colors.hex;
    },
  },
  methods: {
    equal(color) {
      return color.toLowerCase() === this.colors.hex.toLowerCase();
    },
    handlerClick(c) {
      this.colorChange({
        hex: c,
        source: 'hex',
      });
    },
  },

};

const swatches_hoisted_1 = ["data-pick"];
const swatches_hoisted_2 = {
  class: "vc-swatches-box",
  role: "listbox"
};
const swatches_hoisted_3 = ["aria-label", "aria-selected", "data-color", "onClick"];
const swatches_hoisted_4 = { class: "vc-swatches-pick" };
const swatches_hoisted_5 = {
  style: {"width":"24px","height":"24px"},
  viewBox: "0 0 24 24"
};
const swatches_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }, null, -1 /* HOISTED */);
const swatches_hoisted_7 = [
  swatches_hoisted_6
];

function swatches_render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    role: "application",
    "aria-label": "Swatches color picker",
    class: "vc-swatches",
    "data-pick": $options.pick
  }, [
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", swatches_hoisted_2, [
      ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($props.palette, (group, $idx) => {
        return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
          key: $idx,
          class: "vc-swatches-color-group"
        }, [
          ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)(group, (c) => {
            return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
              key: c,
              class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-swatches-color-it", [{ 'vc-swatches-color--white': c === '#FFFFFF' }]]),
              role: "option",
              "aria-label": `Color:${c}`,
              "aria-selected": $options.equal(c),
              "data-color": c,
              style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({ background: c }),
              onClick: $event => ($options.handlerClick(c))
            }, [
              (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", swatches_hoisted_4, [
                ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("svg", swatches_hoisted_5, swatches_hoisted_7))
              ], 512 /* NEED_PATCH */), [
                [external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $options.equal(c)]
              ])
            ], 14 /* CLASS, STYLE, PROPS */, swatches_hoisted_3))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ], 8 /* PROPS */, swatches_hoisted_1))
}

var swatches_css_248z = ".vc-swatches{background-color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);height:240px;overflow-y:scroll;width:320px}.vc-swatches-box{overflow:hidden;padding:16px 0 6px 16px}.vc-swatches-color-group{float:left;margin-right:10px;padding-bottom:10px;width:40px}.vc-swatches-color-it{background:#880e4f;-ms-border-radius:2px 2px 0 0;-moz-border-radius:2px 2px 0 0;-o-border-radius:2px 2px 0 0;-webkit-border-radius:2px 2px 0 0;border-radius:2px 2px 0 0;box-sizing:border-box;cursor:pointer;height:24px;margin-bottom:1px;overflow:hidden;width:40px}.vc-swatches-color--white{border:1px solid #ddd}.vc-swatches-pick{fill:#fff;display:block;margin-left:8px}.vc-swatches-color--white .vc-swatches-pick{fill:#333}";
styleInject(swatches_css_248z);

swatches_script.render = swatches_render;
swatches_script.__file = "src/components/swatches/swatches.vue";

swatches_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components/twitter/index.js








const twitter_defaultColors = [
  '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3',
  '#EB144C', '#F78DA7', '#9900EF',
];

var twitter_script = {
  name: 'Twitter',
  components: {
    EditableInput: editable_input_script,
  },
  mixins: [colorMixin],
  props: {
    width: {
      type: [String, Number],
      default: 276,
    },
    defaultColors: {
      type: Array,
      default() {
        return twitter_defaultColors;
      },
    },
    triangle: {
      default: 'top-left',
      validator(value) {
        return ['hide', 'top-left', 'top-right'].includes(value);
      },
    },
  },
  computed: {
    hsv() {
      const { hsv } = this.colors;
      return {
        h: hsv.h.toFixed(),
        s: (hsv.s * 100).toFixed(),
        v: (hsv.v * 100).toFixed(),
      };
    },
    hex() {
      const { hex } = this.colors;
      return hex && hex.replace('#', '');
    },
  },
  methods: {
    equal(color) {
      return color.toLowerCase() === this.colors.hex.toLowerCase();
    },
    handlerClick(color) {
      this.colorChange({
        hex: color,
        source: 'hex',
      });
    },
    inputChange(data) {
      if (!data)
        return;

      if (data['#']) {
        this.isValidHex(data['#']) && this.colorChange({
          hex: data['#'],
          source: 'hex',
        });
      }
      else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba',
        });
      }
      else if (data.h || data.s || data.v) {
        this.colorChange({
          h: data.h || this.colors.hsv.h,
          s: (data.s / 100) || this.colors.hsv.s,
          v: (data.v / 100) || this.colors.hsv.v,
          source: 'hsv',
        });
      }
    },
  },
};

const twitter_hoisted_1 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-twitter-triangle-shadow" }, null, -1 /* HOISTED */);
const twitter_hoisted_2 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-twitter-triangle" }, null, -1 /* HOISTED */);
const twitter_hoisted_3 = { class: "vc-twitter-body" };
const twitter_hoisted_4 = ["onClick"];
const twitter_hoisted_5 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-twitter-hash" }, " # ", -1 /* HOISTED */);
const twitter_hoisted_6 = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", { class: "vc-twitter-clear" }, null, -1 /* HOISTED */);

function twitter_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EditableInput = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("EditableInput");

  return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["vc-twitter", {
      'vc-twitter-hide-triangle ': $props.triangle === 'hide',
      'vc-twitter-top-left-triangle ': $props.triangle === 'top-left',
      'vc-twitter-top-right-triangle ': $props.triangle === 'top-right',
    }]),
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({
      width: typeof $props.width === 'number' ? `${$props.width}px` : $props.width,
    })
  }, [
    twitter_hoisted_1,
    twitter_hoisted_2,
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", twitter_hoisted_3, [
      ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($props.defaultColors, (color, index) => {
        return ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", {
          key: index,
          class: "vc-twitter-swatch",
          style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({
          background: color,
          boxShadow: `0 0 4px ${$options.equal(color) ? color : 'transparent'}`,
        }),
          onClick: $event => ($options.handlerClick(color))
        }, null, 12 /* STYLE, PROPS */, twitter_hoisted_4))
      }), 128 /* KEYED_FRAGMENT */)),
      twitter_hoisted_5,
      (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_EditableInput, {
        label: "#",
        value: $options.hex,
        onChange: $options.inputChange
      }, null, 8 /* PROPS */, ["value", "onChange"]),
      twitter_hoisted_6
    ])
  ], 6 /* CLASS, STYLE */))
}

var twitter_css_248z = ".vc-twitter{background:#fff;border:0 solid rgba(0,0,0,.25);border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.25);position:relative}.vc-twitter-triangle{border-color:transparent transparent #fff}.vc-twitter-triangle,.vc-twitter-triangle-shadow{border-style:solid;border-width:0 9px 10px;height:0;position:absolute;width:0}.vc-twitter-triangle-shadow{border-color:transparent transparent rgba(0,0,0,.1)}.vc-twitter-body{padding:15px 9px 9px 15px}.vc-twitter .vc-editable-input{position:relative}.vc-twitter .vc-editable-input input{border:0;border-radius:0 4px 4px 0;box-shadow:inset 0 0 0 1px #f0f0f0;box-sizing:content-box;color:#666;float:left;font-size:14px;height:28px;outline:none;padding:1px 1px 1px 8px;width:100px}.vc-twitter .vc-editable-input span{display:none}.vc-twitter-hash{align-items:center;background:#f0f0f0;border-radius:4px 0 0 4px;color:#98a1a4;display:flex;float:left;height:30px;justify-content:center;width:30px}.vc-twitter-swatch{border-radius:4px;cursor:pointer;float:left;height:30px;margin:0 6px 6px 0;outline:none;position:relative;width:30px}.vc-twitter-clear{clear:both}.vc-twitter-hide-triangle .vc-twitter-triangle,.vc-twitter-hide-triangle .vc-twitter-triangle-shadow{display:none}.vc-twitter-top-left-triangle .vc-twitter-triangle{left:12px;top:-10px}.vc-twitter-top-left-triangle .vc-twitter-triangle-shadow{left:12px;top:-11px}.vc-twitter-top-right-triangle .vc-twitter-triangle{right:12px;top:-10px}.vc-twitter-top-right-triangle .vc-twitter-triangle-shadow{right:12px;top:-11px}";
styleInject(twitter_css_248z);

twitter_script.render = twitter_render;
twitter_script.__file = "src/components/twitter/twitter.vue";

twitter_script.install = install;



;// CONCATENATED MODULE: ./node_modules/@ckpack/vue-color/libs/components.js





































/* Do not modify the automatically generated code */

const components = [
  alpha_script,
  script,
  chrome_script,
  compact_script,
  editable_input_script,
  grayscale_script,
  hue_script,
  material_script,
  photoshop_script,
  saturation_script,
  sketch_script,
  slider_script,
  swatches_script,
  twitter_script,
];



;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarButtonColor.vue?vue&type=script&lang=js


/* harmony default export */ var BarButtonColorvue_type_script_lang_js = ({
  mixins: [BarButtonGeneric],
  components: components.reduce((acc, cur) => {
    acc[cur.name] = cur;
    return acc;
  }, {}),
  data() {
    return {
      color: this.item.color
    };
  },
  computed: {
    is_menu() {
      return true;
    },
    css_color() {
      return this.color.hex8 || this.color || "#000";
    }
  },
  methods: {
    mousedown_handler(e) {
      // prevent loosing current text selection, unless the user clicks on an <input> of the color box
      if (e.target.tagName.toLowerCase() != 'input') e.preventDefault();
    }
  },
  watch: {
    "item.color"(item_color) {
      if (this.color != item_color) {
        this._prevent_next_color_update = true;
        this.color = item_color;
      }
    },
    color(new_color) {
      if (this.item.update_color && !this._prevent_next_color_update) {
        this.item.update_color(new_color);
      }
      this._prevent_next_color_update = false;
    }
  }
});
;// CONCATENATED MODULE: ./src/Bar/BarButtonColor.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarButtonColor.vue?vue&type=style&index=0&id=f094c3d0&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/Bar/BarButtonColor.vue?vue&type=style&index=0&id=f094c3d0&scoped=true&lang=css

;// CONCATENATED MODULE: ./src/Bar/BarButtonColor.vue




;


const BarButtonColor_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(BarButtonColorvue_type_script_lang_js, [['render',BarButtonColorvue_type_template_id_f094c3d0_scoped_true_render],['__scopeId',"data-v-f094c3d0"]])

/* harmony default export */ var BarButtonColor = (BarButtonColor_exports_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarSeparator.vue?vue&type=template&id=e81e3406

const BarSeparatorvue_type_template_id_e81e3406_hoisted_1 = {
  class: "bar-separator"
};
function BarSeparatorvue_type_template_id_e81e3406_render(_ctx, _cache) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", BarSeparatorvue_type_template_id_e81e3406_hoisted_1);
}
;// CONCATENATED MODULE: ./src/Bar/BarSeparator.vue?vue&type=template&id=e81e3406

;// CONCATENATED MODULE: ./src/Bar/BarSeparator.vue

const BarSeparator_script = {}

;
const BarSeparator_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(BarSeparator_script, [['render',BarSeparatorvue_type_template_id_e81e3406_render]])

/* harmony default export */ var BarSeparator = (BarSeparator_exports_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/BarSpacer.vue?vue&type=template&id=61af09ed

const BarSpacervue_type_template_id_61af09ed_hoisted_1 = {
  class: "bar-spacer"
};
function BarSpacervue_type_template_id_61af09ed_render(_ctx, _cache) {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", BarSpacervue_type_template_id_61af09ed_hoisted_1);
}
;// CONCATENATED MODULE: ./src/Bar/BarSpacer.vue?vue&type=template&id=61af09ed

;// CONCATENATED MODULE: ./src/Bar/BarSpacer.vue

const BarSpacer_script = {}

;
const BarSpacer_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(BarSpacer_script, [['render',BarSpacervue_type_template_id_61af09ed_render]])

/* harmony default export */ var BarSpacer = (BarSpacer_exports_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/Bar.vue?vue&type=script&lang=js





/* harmony default export */ var Barvue_type_script_lang_js = ({
  components: {
    BarButtonGeneric: BarButtonGeneric,
    BarButtonColor: BarButtonColor,
    BarSeparator: BarSeparator,
    BarSpacer: BarSpacer
  },
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      menu_open: false
    };
  },
  methods: {
    clickaway(e) {
      if (!this.$el.contains(e.target)) this.menu_open = false;
    },
    toggle_menu(item, event) {
      event.stopPropagation();
      const touch = event.sourceCapabilities && event.sourceCapabilities.firesTouchEvents;
      this.menu_open = item._el.is_menu && !item.disabled ? touch ? true : !this.menu_open : false;
    },
    get_component(is) {
      if (is && !Array.isArray(is) && typeof is == "object") return is; // if component
      else if (typeof is == "string") return "bar-" + is;else return "bar-button-generic";
    }
  },
  mounted() {
    document.addEventListener("click", this.clickaway);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.clickaway);
  }
});
;// CONCATENATED MODULE: ./src/Bar/Bar.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/Bar/Bar.vue?vue&type=style&index=0&id=517fd311&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/Bar/Bar.vue?vue&type=style&index=0&id=517fd311&scoped=true&lang=css

;// CONCATENATED MODULE: ./src/Bar/Bar.vue




;


const Bar_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(Barvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-517fd311"]])

/* harmony default export */ var Bar = (Bar_exports_);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (Bar);


}();
module.exports = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=VueFileToolbarMenu.common.js.map