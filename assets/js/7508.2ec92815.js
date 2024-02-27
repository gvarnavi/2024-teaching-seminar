"use strict";
exports.id = 7508;
exports.ids = [7508,9230];
exports.modules = {

/***/ 59719:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.newState = exports.STATE = exports.AbstractMathItem = exports.protoItem = void 0;
function protoItem(open, math, close, n, start, end, display) {
    if (display === void 0) { display = null; }
    var item = { open: open, math: math, close: close,
        n: n, start: { n: start }, end: { n: end }, display: display };
    return item;
}
exports.protoItem = protoItem;
var AbstractMathItem = (function () {
    function AbstractMathItem(math, jax, display, start, end) {
        if (display === void 0) { display = true; }
        if (start === void 0) { start = { i: 0, n: 0, delim: '' }; }
        if (end === void 0) { end = { i: 0, n: 0, delim: '' }; }
        this.root = null;
        this.typesetRoot = null;
        this.metrics = {};
        this.inputData = {};
        this.outputData = {};
        this._state = exports.STATE.UNPROCESSED;
        this.math = math;
        this.inputJax = jax;
        this.display = display;
        this.start = start;
        this.end = end;
        this.root = null;
        this.typesetRoot = null;
        this.metrics = {};
        this.inputData = {};
        this.outputData = {};
    }
    Object.defineProperty(AbstractMathItem.prototype, "isEscaped", {
        get: function () {
            return this.display === null;
        },
        enumerable: false,
        configurable: true
    });
    AbstractMathItem.prototype.render = function (document) {
        document.renderActions.renderMath(this, document);
    };
    AbstractMathItem.prototype.rerender = function (document, start) {
        if (start === void 0) { start = exports.STATE.RERENDER; }
        if (this.state() >= start) {
            this.state(start - 1);
        }
        document.renderActions.renderMath(this, document, start);
    };
    AbstractMathItem.prototype.convert = function (document, end) {
        if (end === void 0) { end = exports.STATE.LAST; }
        document.renderActions.renderConvert(this, document, end);
    };
    AbstractMathItem.prototype.compile = function (document) {
        if (this.state() < exports.STATE.COMPILED) {
            this.root = this.inputJax.compile(this, document);
            this.state(exports.STATE.COMPILED);
        }
    };
    AbstractMathItem.prototype.typeset = function (document) {
        if (this.state() < exports.STATE.TYPESET) {
            this.typesetRoot = document.outputJax[this.isEscaped ? 'escaped' : 'typeset'](this, document);
            this.state(exports.STATE.TYPESET);
        }
    };
    AbstractMathItem.prototype.updateDocument = function (_document) { };
    AbstractMathItem.prototype.removeFromDocument = function (_restore) {
        if (_restore === void 0) { _restore = false; }
    };
    AbstractMathItem.prototype.setMetrics = function (em, ex, cwidth, lwidth, scale) {
        this.metrics = {
            em: em, ex: ex,
            containerWidth: cwidth,
            lineWidth: lwidth,
            scale: scale
        };
    };
    AbstractMathItem.prototype.state = function (state, restore) {
        if (state === void 0) { state = null; }
        if (restore === void 0) { restore = false; }
        if (state != null) {
            if (state < exports.STATE.INSERTED && this._state >= exports.STATE.INSERTED) {
                this.removeFromDocument(restore);
            }
            if (state < exports.STATE.TYPESET && this._state >= exports.STATE.TYPESET) {
                this.outputData = {};
            }
            if (state < exports.STATE.COMPILED && this._state >= exports.STATE.COMPILED) {
                this.inputData = {};
            }
            this._state = state;
        }
        return this._state;
    };
    AbstractMathItem.prototype.reset = function (restore) {
        if (restore === void 0) { restore = false; }
        this.state(exports.STATE.UNPROCESSED, restore);
    };
    return AbstractMathItem;
}());
exports.AbstractMathItem = AbstractMathItem;
exports.STATE = {
    UNPROCESSED: 0,
    FINDMATH: 10,
    COMPILED: 20,
    CONVERT: 100,
    METRICS: 110,
    RERENDER: 125,
    TYPESET: 150,
    INSERTED: 200,
    LAST: 10000
};
function newState(name, state) {
    if (name in exports.STATE) {
        throw Error('State ' + name + ' already exists');
    }
    exports.STATE[name] = state;
}
exports.newState = newState;
//# sourceMappingURL=MathItem.js.map

/***/ }),

/***/ 7013:
/***/ (function(__unused_webpack_module, exports) {


var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Attributes = exports.INHERIT = void 0;
exports.INHERIT = '_inherit_';
var Attributes = (function () {
    function Attributes(defaults, global) {
        this.global = global;
        this.defaults = Object.create(global);
        this.inherited = Object.create(this.defaults);
        this.attributes = Object.create(this.inherited);
        Object.assign(this.defaults, defaults);
    }
    Attributes.prototype.set = function (name, value) {
        this.attributes[name] = value;
    };
    Attributes.prototype.setList = function (list) {
        Object.assign(this.attributes, list);
    };
    Attributes.prototype.get = function (name) {
        var value = this.attributes[name];
        if (value === exports.INHERIT) {
            value = this.global[name];
        }
        return value;
    };
    Attributes.prototype.getExplicit = function (name) {
        if (!this.attributes.hasOwnProperty(name)) {
            return undefined;
        }
        return this.attributes[name];
    };
    Attributes.prototype.getList = function () {
        var e_1, _a;
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        var values = {};
        try {
            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                var name_1 = names_1_1.value;
                values[name_1] = this.get(name_1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return values;
    };
    Attributes.prototype.setInherited = function (name, value) {
        this.inherited[name] = value;
    };
    Attributes.prototype.getInherited = function (name) {
        return this.inherited[name];
    };
    Attributes.prototype.getDefault = function (name) {
        return this.defaults[name];
    };
    Attributes.prototype.isSet = function (name) {
        return this.attributes.hasOwnProperty(name) || this.inherited.hasOwnProperty(name);
    };
    Attributes.prototype.hasDefault = function (name) {
        return (name in this.defaults);
    };
    Attributes.prototype.getExplicitNames = function () {
        return Object.keys(this.attributes);
    };
    Attributes.prototype.getInheritedNames = function () {
        return Object.keys(this.inherited);
    };
    Attributes.prototype.getDefaultNames = function () {
        return Object.keys(this.defaults);
    };
    Attributes.prototype.getGlobalNames = function () {
        return Object.keys(this.global);
    };
    Attributes.prototype.getAllAttributes = function () {
        return this.attributes;
    };
    Attributes.prototype.getAllInherited = function () {
        return this.inherited;
    };
    Attributes.prototype.getAllDefaults = function () {
        return this.defaults;
    };
    Attributes.prototype.getAllGlobals = function () {
        return this.global;
    };
    return Attributes;
}());
exports.Attributes = Attributes;
//# sourceMappingURL=Attributes.js.map

/***/ }),

/***/ 18426:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XMLNode = exports.TextNode = exports.AbstractMmlEmptyNode = exports.AbstractMmlBaseNode = exports.AbstractMmlLayoutNode = exports.AbstractMmlTokenNode = exports.AbstractMmlNode = exports.indentAttributes = exports.TEXCLASSNAMES = exports.TEXCLASS = void 0;
var Attributes_js_1 = __webpack_require__(7013);
var Node_js_1 = __webpack_require__(62335);
exports.TEXCLASS = {
    ORD: 0,
    OP: 1,
    BIN: 2,
    REL: 3,
    OPEN: 4,
    CLOSE: 5,
    PUNCT: 6,
    INNER: 7,
    VCENTER: 8,
    NONE: -1
};
exports.TEXCLASSNAMES = ['ORD', 'OP', 'BIN', 'REL', 'OPEN', 'CLOSE', 'PUNCT', 'INNER', 'VCENTER'];
var TEXSPACELENGTH = ['', 'thinmathspace', 'mediummathspace', 'thickmathspace'];
var TEXSPACE = [
    [0, -1, 2, 3, 0, 0, 0, 1],
    [-1, -1, 0, 3, 0, 0, 0, 1],
    [2, 2, 0, 0, 2, 0, 0, 2],
    [3, 3, 0, 0, 3, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, -1, 2, 3, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1],
    [1, -1, 2, 3, 1, 0, 1, 1]
];
exports.indentAttributes = [
    'indentalign', 'indentalignfirst',
    'indentshift', 'indentshiftfirst'
];
var AbstractMmlNode = (function (_super) {
    __extends(AbstractMmlNode, _super);
    function AbstractMmlNode(factory, attributes, children) {
        if (attributes === void 0) { attributes = {}; }
        if (children === void 0) { children = []; }
        var _this = _super.call(this, factory) || this;
        _this.prevClass = null;
        _this.prevLevel = null;
        _this.texclass = null;
        if (_this.arity < 0) {
            _this.childNodes = [factory.create('inferredMrow')];
            _this.childNodes[0].parent = _this;
        }
        _this.setChildren(children);
        _this.attributes = new Attributes_js_1.Attributes(factory.getNodeClass(_this.kind).defaults, factory.getNodeClass('math').defaults);
        _this.attributes.setList(attributes);
        return _this;
    }
    AbstractMmlNode.prototype.copy = function (keepIds) {
        var e_1, _a, e_2, _b;
        if (keepIds === void 0) { keepIds = false; }
        var node = this.factory.create(this.kind);
        node.properties = __assign({}, this.properties);
        if (this.attributes) {
            var attributes = this.attributes.getAllAttributes();
            try {
                for (var _c = __values(Object.keys(attributes)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var name_1 = _d.value;
                    if (name_1 !== 'id' || keepIds) {
                        node.attributes.set(name_1, attributes[name_1]);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (this.childNodes && this.childNodes.length) {
            var children = this.childNodes;
            if (children.length === 1 && children[0].isInferred) {
                children = children[0].childNodes;
            }
            try {
                for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                    var child = children_1_1.value;
                    if (child) {
                        node.appendChild(child.copy());
                    }
                    else {
                        node.childNodes.push(null);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (children_1_1 && !children_1_1.done && (_b = children_1.return)) _b.call(children_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return node;
    };
    Object.defineProperty(AbstractMmlNode.prototype, "texClass", {
        get: function () {
            return this.texclass;
        },
        set: function (texClass) {
            this.texclass = texClass;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "isToken", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "isEmbellished", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "isSpacelike", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "linebreakContainer", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "hasNewLine", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "arity", {
        get: function () {
            return Infinity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "isInferred", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "Parent", {
        get: function () {
            var parent = this.parent;
            while (parent && parent.notParent) {
                parent = parent.Parent;
            }
            return parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlNode.prototype, "notParent", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    AbstractMmlNode.prototype.setChildren = function (children) {
        if (this.arity < 0) {
            return this.childNodes[0].setChildren(children);
        }
        return _super.prototype.setChildren.call(this, children);
    };
    AbstractMmlNode.prototype.appendChild = function (child) {
        var e_3, _a;
        var _this = this;
        if (this.arity < 0) {
            this.childNodes[0].appendChild(child);
            return child;
        }
        if (child.isInferred) {
            if (this.arity === Infinity) {
                child.childNodes.forEach(function (node) { return _super.prototype.appendChild.call(_this, node); });
                return child;
            }
            var original = child;
            child = this.factory.create('mrow');
            child.setChildren(original.childNodes);
            child.attributes = original.attributes;
            try {
                for (var _b = __values(original.getPropertyNames()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name_2 = _c.value;
                    child.setProperty(name_2, original.getProperty(name_2));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return _super.prototype.appendChild.call(this, child);
    };
    AbstractMmlNode.prototype.replaceChild = function (newChild, oldChild) {
        if (this.arity < 0) {
            this.childNodes[0].replaceChild(newChild, oldChild);
            return newChild;
        }
        return _super.prototype.replaceChild.call(this, newChild, oldChild);
    };
    AbstractMmlNode.prototype.core = function () {
        return this;
    };
    AbstractMmlNode.prototype.coreMO = function () {
        return this;
    };
    AbstractMmlNode.prototype.coreIndex = function () {
        return 0;
    };
    AbstractMmlNode.prototype.childPosition = function () {
        var e_4, _a;
        var child = this;
        var parent = child.parent;
        while (parent && parent.notParent) {
            child = parent;
            parent = parent.parent;
        }
        if (parent) {
            var i = 0;
            try {
                for (var _b = __values(parent.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
                    if (node === child) {
                        return i;
                    }
                    i++;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return null;
    };
    AbstractMmlNode.prototype.setTeXclass = function (prev) {
        this.getPrevClass(prev);
        return (this.texClass != null ? this : prev);
    };
    AbstractMmlNode.prototype.updateTeXclass = function (core) {
        if (core) {
            this.prevClass = core.prevClass;
            this.prevLevel = core.prevLevel;
            core.prevClass = core.prevLevel = null;
            this.texClass = core.texClass;
        }
    };
    AbstractMmlNode.prototype.getPrevClass = function (prev) {
        if (prev) {
            this.prevClass = prev.texClass;
            this.prevLevel = prev.attributes.get('scriptlevel');
        }
    };
    AbstractMmlNode.prototype.texSpacing = function () {
        var prevClass = (this.prevClass != null ? this.prevClass : exports.TEXCLASS.NONE);
        var texClass = this.texClass || exports.TEXCLASS.ORD;
        if (prevClass === exports.TEXCLASS.NONE || texClass === exports.TEXCLASS.NONE) {
            return '';
        }
        if (prevClass === exports.TEXCLASS.VCENTER) {
            prevClass = exports.TEXCLASS.ORD;
        }
        if (texClass === exports.TEXCLASS.VCENTER) {
            texClass = exports.TEXCLASS.ORD;
        }
        var space = TEXSPACE[prevClass][texClass];
        if ((this.prevLevel > 0 || this.attributes.get('scriptlevel') > 0) && space >= 0) {
            return '';
        }
        return TEXSPACELENGTH[Math.abs(space)];
    };
    AbstractMmlNode.prototype.hasSpacingAttributes = function () {
        return this.isEmbellished && this.coreMO().hasSpacingAttributes();
    };
    AbstractMmlNode.prototype.setInheritedAttributes = function (attributes, display, level, prime) {
        var e_5, _a;
        if (attributes === void 0) { attributes = {}; }
        if (display === void 0) { display = false; }
        if (level === void 0) { level = 0; }
        if (prime === void 0) { prime = false; }
        var defaults = this.attributes.getAllDefaults();
        try {
            for (var _b = __values(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (defaults.hasOwnProperty(key) || AbstractMmlNode.alwaysInherit.hasOwnProperty(key)) {
                    var _d = __read(attributes[key], 2), node = _d[0], value = _d[1];
                    var noinherit = (AbstractMmlNode.noInherit[node] || {})[this.kind] || {};
                    if (!noinherit[key]) {
                        this.attributes.setInherited(key, value);
                    }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var displaystyle = this.attributes.getExplicit('displaystyle');
        if (displaystyle === undefined) {
            this.attributes.setInherited('displaystyle', display);
        }
        var scriptlevel = this.attributes.getExplicit('scriptlevel');
        if (scriptlevel === undefined) {
            this.attributes.setInherited('scriptlevel', level);
        }
        if (prime) {
            this.setProperty('texprimestyle', prime);
        }
        var arity = this.arity;
        if (arity >= 0 && arity !== Infinity && ((arity === 1 && this.childNodes.length === 0) ||
            (arity !== 1 && this.childNodes.length !== arity))) {
            if (arity < this.childNodes.length) {
                this.childNodes = this.childNodes.slice(0, arity);
            }
            else {
                while (this.childNodes.length < arity) {
                    this.appendChild(this.factory.create('mrow'));
                }
            }
        }
        this.setChildInheritedAttributes(attributes, display, level, prime);
    };
    AbstractMmlNode.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        var e_6, _a;
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.setInheritedAttributes(attributes, display, level, prime);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    AbstractMmlNode.prototype.addInheritedAttributes = function (current, attributes) {
        var e_7, _a;
        var updated = __assign({}, current);
        try {
            for (var _b = __values(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_3 = _c.value;
                if (name_3 !== 'displaystyle' && name_3 !== 'scriptlevel' && name_3 !== 'style') {
                    updated[name_3] = [this.kind, attributes[name_3]];
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return updated;
    };
    AbstractMmlNode.prototype.inheritAttributesFrom = function (node) {
        var attributes = node.attributes;
        var display = attributes.get('displaystyle');
        var scriptlevel = attributes.get('scriptlevel');
        var defaults = (!attributes.isSet('mathsize') ? {} : {
            mathsize: ['math', attributes.get('mathsize')]
        });
        var prime = node.getProperty('texprimestyle') || false;
        this.setInheritedAttributes(defaults, display, scriptlevel, prime);
    };
    AbstractMmlNode.prototype.verifyTree = function (options) {
        if (options === void 0) { options = null; }
        if (options === null) {
            return;
        }
        this.verifyAttributes(options);
        var arity = this.arity;
        if (options['checkArity']) {
            if (arity >= 0 && arity !== Infinity &&
                ((arity === 1 && this.childNodes.length === 0) ||
                    (arity !== 1 && this.childNodes.length !== arity))) {
                this.mError('Wrong number of children for "' + this.kind + '" node', options, true);
            }
        }
        this.verifyChildren(options);
    };
    AbstractMmlNode.prototype.verifyAttributes = function (options) {
        var e_8, _a;
        if (options['checkAttributes']) {
            var attributes = this.attributes;
            var bad = [];
            try {
                for (var _b = __values(attributes.getExplicitNames()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name_4 = _c.value;
                    if (name_4.substr(0, 5) !== 'data-' && attributes.getDefault(name_4) === undefined &&
                        !name_4.match(/^(?:class|style|id|(?:xlink:)?href)$/)) {
                        bad.push(name_4);
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_8) throw e_8.error; }
            }
            if (bad.length) {
                this.mError('Unknown attributes for ' + this.kind + ' node: ' + bad.join(', '), options);
            }
        }
    };
    AbstractMmlNode.prototype.verifyChildren = function (options) {
        var e_9, _a;
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.verifyTree(options);
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
        }
    };
    AbstractMmlNode.prototype.mError = function (message, options, short) {
        if (short === void 0) { short = false; }
        if (this.parent && this.parent.isKind('merror')) {
            return null;
        }
        var merror = this.factory.create('merror');
        merror.attributes.set('data-mjx-message', message);
        if (options['fullErrors'] || short) {
            var mtext = this.factory.create('mtext');
            var text = this.factory.create('text');
            text.setText(options['fullErrors'] ? message : this.kind);
            mtext.appendChild(text);
            merror.appendChild(mtext);
            this.parent.replaceChild(merror, this);
        }
        else {
            this.parent.replaceChild(merror, this);
            merror.appendChild(this);
        }
        return merror;
    };
    AbstractMmlNode.defaults = {
        mathbackground: Attributes_js_1.INHERIT,
        mathcolor: Attributes_js_1.INHERIT,
        mathsize: Attributes_js_1.INHERIT,
        dir: Attributes_js_1.INHERIT
    };
    AbstractMmlNode.noInherit = {
        mstyle: {
            mpadded: { width: true, height: true, depth: true, lspace: true, voffset: true },
            mtable: { width: true, height: true, depth: true, align: true }
        },
        maligngroup: {
            mrow: { groupalign: true },
            mtable: { groupalign: true }
        }
    };
    AbstractMmlNode.alwaysInherit = {
        scriptminsize: true,
        scriptsizemultiplier: true
    };
    AbstractMmlNode.verifyDefaults = {
        checkArity: true,
        checkAttributes: false,
        fullErrors: false,
        fixMmultiscripts: true,
        fixMtables: true
    };
    return AbstractMmlNode;
}(Node_js_1.AbstractNode));
exports.AbstractMmlNode = AbstractMmlNode;
var AbstractMmlTokenNode = (function (_super) {
    __extends(AbstractMmlTokenNode, _super);
    function AbstractMmlTokenNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractMmlTokenNode.prototype, "isToken", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    AbstractMmlTokenNode.prototype.getText = function () {
        var e_10, _a;
        var text = '';
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child instanceof TextNode) {
                    text += child.getText();
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return text;
    };
    AbstractMmlTokenNode.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        var e_11, _a;
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child instanceof AbstractMmlNode) {
                    child.setInheritedAttributes(attributes, display, level, prime);
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
    };
    AbstractMmlTokenNode.prototype.walkTree = function (func, data) {
        var e_12, _a;
        func(this, data);
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child instanceof AbstractMmlNode) {
                    child.walkTree(func, data);
                }
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return data;
    };
    AbstractMmlTokenNode.defaults = __assign(__assign({}, AbstractMmlNode.defaults), { mathvariant: 'normal', mathsize: Attributes_js_1.INHERIT });
    return AbstractMmlTokenNode;
}(AbstractMmlNode));
exports.AbstractMmlTokenNode = AbstractMmlTokenNode;
var AbstractMmlLayoutNode = (function (_super) {
    __extends(AbstractMmlLayoutNode, _super);
    function AbstractMmlLayoutNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractMmlLayoutNode.prototype, "isSpacelike", {
        get: function () {
            return this.childNodes[0].isSpacelike;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlLayoutNode.prototype, "isEmbellished", {
        get: function () {
            return this.childNodes[0].isEmbellished;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlLayoutNode.prototype, "arity", {
        get: function () {
            return -1;
        },
        enumerable: false,
        configurable: true
    });
    AbstractMmlLayoutNode.prototype.core = function () {
        return this.childNodes[0];
    };
    AbstractMmlLayoutNode.prototype.coreMO = function () {
        return this.childNodes[0].coreMO();
    };
    AbstractMmlLayoutNode.prototype.setTeXclass = function (prev) {
        prev = this.childNodes[0].setTeXclass(prev);
        this.updateTeXclass(this.childNodes[0]);
        return prev;
    };
    AbstractMmlLayoutNode.defaults = AbstractMmlNode.defaults;
    return AbstractMmlLayoutNode;
}(AbstractMmlNode));
exports.AbstractMmlLayoutNode = AbstractMmlLayoutNode;
var AbstractMmlBaseNode = (function (_super) {
    __extends(AbstractMmlBaseNode, _super);
    function AbstractMmlBaseNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractMmlBaseNode.prototype, "isEmbellished", {
        get: function () {
            return this.childNodes[0].isEmbellished;
        },
        enumerable: false,
        configurable: true
    });
    AbstractMmlBaseNode.prototype.core = function () {
        return this.childNodes[0];
    };
    AbstractMmlBaseNode.prototype.coreMO = function () {
        return this.childNodes[0].coreMO();
    };
    AbstractMmlBaseNode.prototype.setTeXclass = function (prev) {
        var e_13, _a;
        this.getPrevClass(prev);
        this.texClass = exports.TEXCLASS.ORD;
        var base = this.childNodes[0];
        if (base) {
            if (this.isEmbellished || base.isKind('mi')) {
                prev = base.setTeXclass(prev);
                this.updateTeXclass(this.core());
            }
            else {
                base.setTeXclass(null);
                prev = this;
            }
        }
        else {
            prev = this;
        }
        try {
            for (var _b = __values(this.childNodes.slice(1)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child) {
                    child.setTeXclass(null);
                }
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return prev;
    };
    AbstractMmlBaseNode.defaults = AbstractMmlNode.defaults;
    return AbstractMmlBaseNode;
}(AbstractMmlNode));
exports.AbstractMmlBaseNode = AbstractMmlBaseNode;
var AbstractMmlEmptyNode = (function (_super) {
    __extends(AbstractMmlEmptyNode, _super);
    function AbstractMmlEmptyNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isToken", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isEmbellished", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isSpacelike", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "linebreakContainer", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "hasNewLine", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "arity", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "isInferred", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "notParent", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "Parent", {
        get: function () {
            return this.parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "texClass", {
        get: function () {
            return exports.TEXCLASS.NONE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "prevClass", {
        get: function () {
            return exports.TEXCLASS.NONE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "prevLevel", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    AbstractMmlEmptyNode.prototype.hasSpacingAttributes = function () {
        return false;
    };
    Object.defineProperty(AbstractMmlEmptyNode.prototype, "attributes", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    AbstractMmlEmptyNode.prototype.core = function () {
        return this;
    };
    AbstractMmlEmptyNode.prototype.coreMO = function () {
        return this;
    };
    AbstractMmlEmptyNode.prototype.coreIndex = function () {
        return 0;
    };
    AbstractMmlEmptyNode.prototype.childPosition = function () {
        return 0;
    };
    AbstractMmlEmptyNode.prototype.setTeXclass = function (prev) {
        return prev;
    };
    AbstractMmlEmptyNode.prototype.texSpacing = function () {
        return '';
    };
    AbstractMmlEmptyNode.prototype.setInheritedAttributes = function (_attributes, _display, _level, _prime) { };
    AbstractMmlEmptyNode.prototype.inheritAttributesFrom = function (_node) { };
    AbstractMmlEmptyNode.prototype.verifyTree = function (_options) { };
    AbstractMmlEmptyNode.prototype.mError = function (_message, _options, _short) {
        if (_short === void 0) { _short = false; }
        return null;
    };
    return AbstractMmlEmptyNode;
}(Node_js_1.AbstractEmptyNode));
exports.AbstractMmlEmptyNode = AbstractMmlEmptyNode;
var TextNode = (function (_super) {
    __extends(TextNode, _super);
    function TextNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = '';
        return _this;
    }
    Object.defineProperty(TextNode.prototype, "kind", {
        get: function () {
            return 'text';
        },
        enumerable: false,
        configurable: true
    });
    TextNode.prototype.getText = function () {
        return this.text;
    };
    TextNode.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    TextNode.prototype.copy = function () {
        return this.factory.create(this.kind).setText(this.getText());
    };
    TextNode.prototype.toString = function () {
        return this.text;
    };
    return TextNode;
}(AbstractMmlEmptyNode));
exports.TextNode = TextNode;
var XMLNode = (function (_super) {
    __extends(XMLNode, _super);
    function XMLNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.xml = null;
        _this.adaptor = null;
        return _this;
    }
    Object.defineProperty(XMLNode.prototype, "kind", {
        get: function () {
            return 'XML';
        },
        enumerable: false,
        configurable: true
    });
    XMLNode.prototype.getXML = function () {
        return this.xml;
    };
    XMLNode.prototype.setXML = function (xml, adaptor) {
        if (adaptor === void 0) { adaptor = null; }
        this.xml = xml;
        this.adaptor = adaptor;
        return this;
    };
    XMLNode.prototype.getSerializedXML = function () {
        return this.adaptor.serializeXML(this.xml);
    };
    XMLNode.prototype.copy = function () {
        return this.factory.create(this.kind).setXML(this.adaptor.clone(this.xml));
    };
    XMLNode.prototype.toString = function () {
        return 'XML data';
    };
    return XMLNode;
}(AbstractMmlEmptyNode));
exports.XMLNode = XMLNode;
//# sourceMappingURL=MmlNode.js.map

/***/ }),

/***/ 66846:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeXAtom = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var mo_js_1 = __webpack_require__(5213);
var TeXAtom = (function (_super) {
    __extends(TeXAtom, _super);
    function TeXAtom(factory, attributes, children) {
        var _this = _super.call(this, factory, attributes, children) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        _this.setProperty('texClass', _this.texClass);
        return _this;
    }
    Object.defineProperty(TeXAtom.prototype, "kind", {
        get: function () {
            return 'TeXAtom';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TeXAtom.prototype, "arity", {
        get: function () {
            return -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TeXAtom.prototype, "notParent", {
        get: function () {
            return this.childNodes[0] && this.childNodes[0].childNodes.length === 1;
        },
        enumerable: false,
        configurable: true
    });
    TeXAtom.prototype.setTeXclass = function (prev) {
        this.childNodes[0].setTeXclass(null);
        return this.adjustTeXclass(prev);
    };
    TeXAtom.prototype.adjustTeXclass = function (prev) {
        return prev;
    };
    TeXAtom.defaults = __assign({}, MmlNode_js_1.AbstractMmlBaseNode.defaults);
    return TeXAtom;
}(MmlNode_js_1.AbstractMmlBaseNode));
exports.TeXAtom = TeXAtom;
TeXAtom.prototype.adjustTeXclass = mo_js_1.MmlMo.prototype.adjustTeXclass;
//# sourceMappingURL=TeXAtom.js.map

/***/ }),

/***/ 79024:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMaction = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMaction = (function (_super) {
    __extends(MmlMaction, _super);
    function MmlMaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMaction.prototype, "kind", {
        get: function () {
            return 'maction';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMaction.prototype, "arity", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMaction.prototype, "selected", {
        get: function () {
            var selection = this.attributes.get('selection');
            var i = Math.max(1, Math.min(this.childNodes.length, selection)) - 1;
            return this.childNodes[i] || this.factory.create('mrow');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMaction.prototype, "isEmbellished", {
        get: function () {
            return this.selected.isEmbellished;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMaction.prototype, "isSpacelike", {
        get: function () {
            return this.selected.isSpacelike;
        },
        enumerable: false,
        configurable: true
    });
    MmlMaction.prototype.core = function () {
        return this.selected.core();
    };
    MmlMaction.prototype.coreMO = function () {
        return this.selected.coreMO();
    };
    MmlMaction.prototype.verifyAttributes = function (options) {
        _super.prototype.verifyAttributes.call(this, options);
        if (this.attributes.get('actiontype') !== 'toggle' &&
            this.attributes.getExplicit('selection') !== undefined) {
            var attributes = this.attributes.getAllAttributes();
            delete attributes.selection;
        }
    };
    MmlMaction.prototype.setTeXclass = function (prev) {
        if (this.attributes.get('actiontype') === 'tooltip' && this.childNodes[1]) {
            this.childNodes[1].setTeXclass(null);
        }
        var selected = this.selected;
        prev = selected.setTeXclass(prev);
        this.updateTeXclass(selected);
        return prev;
    };
    MmlMaction.prototype.nextToggleSelection = function () {
        var selection = Math.max(1, this.attributes.get('selection') + 1);
        if (selection > this.childNodes.length) {
            selection = 1;
        }
        this.attributes.set('selection', selection);
    };
    MmlMaction.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlNode.defaults), { actiontype: 'toggle', selection: 1 });
    return MmlMaction;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMaction = MmlMaction;
//# sourceMappingURL=maction.js.map

/***/ }),

/***/ 27225:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMath = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMath = (function (_super) {
    __extends(MmlMath, _super);
    function MmlMath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMath.prototype, "kind", {
        get: function () {
            return 'math';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMath.prototype, "linebreakContainer", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMath.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        if (this.attributes.get('mode') === 'display') {
            this.attributes.setInherited('display', 'block');
        }
        attributes = this.addInheritedAttributes(attributes, this.attributes.getAllAttributes());
        display = (!!this.attributes.get('displaystyle') ||
            (!this.attributes.get('displaystyle') && this.attributes.get('display') === 'block'));
        this.attributes.setInherited('displaystyle', display);
        level = (this.attributes.get('scriptlevel') ||
            this.constructor.defaults['scriptlevel']);
        _super.prototype.setChildInheritedAttributes.call(this, attributes, display, level, prime);
    };
    MmlMath.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlLayoutNode.defaults), { mathvariant: 'normal', mathsize: 'normal', mathcolor: '', mathbackground: 'transparent', dir: 'ltr', scriptlevel: 0, displaystyle: false, display: 'inline', maxwidth: '', overflow: 'linebreak', altimg: '', 'altimg-width': '', 'altimg-height': '', 'altimg-valign': '', alttext: '', cdgroup: '', scriptsizemultiplier: 1 / Math.sqrt(2), scriptminsize: '8px', infixlinebreakstyle: 'before', lineleading: '1ex', linebreakmultchar: '\u2062', indentshift: 'auto', indentalign: 'auto', indenttarget: '', indentalignfirst: 'indentalign', indentshiftfirst: 'indentshift', indentalignlast: 'indentalign', indentshiftlast: 'indentshift' });
    return MmlMath;
}(MmlNode_js_1.AbstractMmlLayoutNode));
exports.MmlMath = MmlMath;
//# sourceMappingURL=math.js.map

/***/ }),

/***/ 22599:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMenclose = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMenclose = (function (_super) {
    __extends(MmlMenclose, _super);
    function MmlMenclose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMenclose.prototype, "kind", {
        get: function () {
            return 'menclose';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMenclose.prototype, "arity", {
        get: function () {
            return -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMenclose.prototype, "linebreakContininer", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMenclose.prototype.setTeXclass = function (prev) {
        prev = this.childNodes[0].setTeXclass(prev);
        this.updateTeXclass(this.childNodes[0]);
        return prev;
    };
    MmlMenclose.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlNode.defaults), { notation: 'longdiv' });
    return MmlMenclose;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMenclose = MmlMenclose;
//# sourceMappingURL=menclose.js.map

/***/ }),

/***/ 90719:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMfenced = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMfenced = (function (_super) {
    __extends(MmlMfenced, _super);
    function MmlMfenced() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.INNER;
        _this.separators = [];
        _this.open = null;
        _this.close = null;
        return _this;
    }
    Object.defineProperty(MmlMfenced.prototype, "kind", {
        get: function () {
            return 'mfenced';
        },
        enumerable: false,
        configurable: true
    });
    MmlMfenced.prototype.setTeXclass = function (prev) {
        this.getPrevClass(prev);
        if (this.open) {
            prev = this.open.setTeXclass(prev);
        }
        if (this.childNodes[0]) {
            prev = this.childNodes[0].setTeXclass(prev);
        }
        for (var i = 1, m = this.childNodes.length; i < m; i++) {
            if (this.separators[i - 1]) {
                prev = this.separators[i - 1].setTeXclass(prev);
            }
            if (this.childNodes[i]) {
                prev = this.childNodes[i].setTeXclass(prev);
            }
        }
        if (this.close) {
            prev = this.close.setTeXclass(prev);
        }
        this.updateTeXclass(this.open);
        return prev;
    };
    MmlMfenced.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        var e_1, _a;
        this.addFakeNodes();
        try {
            for (var _b = __values([this.open, this.close].concat(this.separators)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child) {
                    child.setInheritedAttributes(attributes, display, level, prime);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _super.prototype.setChildInheritedAttributes.call(this, attributes, display, level, prime);
    };
    MmlMfenced.prototype.addFakeNodes = function () {
        var e_2, _a;
        var _b = this.attributes.getList('open', 'close', 'separators'), open = _b.open, close = _b.close, separators = _b.separators;
        open = open.replace(/[ \t\n\r]/g, '');
        close = close.replace(/[ \t\n\r]/g, '');
        separators = separators.replace(/[ \t\n\r]/g, '');
        if (open) {
            this.open = this.fakeNode(open, { fence: true, form: 'prefix' }, MmlNode_js_1.TEXCLASS.OPEN);
        }
        if (separators) {
            while (separators.length < this.childNodes.length - 1) {
                separators += separators.charAt(separators.length - 1);
            }
            var i = 0;
            try {
                for (var _c = __values(this.childNodes.slice(1)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var child = _d.value;
                    if (child) {
                        this.separators.push(this.fakeNode(separators.charAt(i++)));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (close) {
            this.close = this.fakeNode(close, { fence: true, form: 'postfix' }, MmlNode_js_1.TEXCLASS.CLOSE);
        }
    };
    MmlMfenced.prototype.fakeNode = function (c, properties, texClass) {
        if (properties === void 0) { properties = {}; }
        if (texClass === void 0) { texClass = null; }
        var text = this.factory.create('text').setText(c);
        var node = this.factory.create('mo', properties, [text]);
        node.texClass = texClass;
        node.parent = this;
        return node;
    };
    MmlMfenced.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlNode.defaults), { open: '(', close: ')', separators: ',' });
    return MmlMfenced;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMfenced = MmlMfenced;
//# sourceMappingURL=mfenced.js.map

/***/ }),

/***/ 294:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMfrac = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMfrac = (function (_super) {
    __extends(MmlMfrac, _super);
    function MmlMfrac() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMfrac.prototype, "kind", {
        get: function () {
            return 'mfrac';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMfrac.prototype, "arity", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMfrac.prototype, "linebreakContainer", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMfrac.prototype.setTeXclass = function (prev) {
        var e_1, _a;
        this.getPrevClass(prev);
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.setTeXclass(null);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    MmlMfrac.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        if (!display || level > 0) {
            level++;
        }
        this.childNodes[0].setInheritedAttributes(attributes, false, level, prime);
        this.childNodes[1].setInheritedAttributes(attributes, false, level, true);
    };
    MmlMfrac.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlBaseNode.defaults), { linethickness: 'medium', numalign: 'center', denomalign: 'center', bevelled: false });
    return MmlMfrac;
}(MmlNode_js_1.AbstractMmlBaseNode));
exports.MmlMfrac = MmlMfrac;
//# sourceMappingURL=mfrac.js.map

/***/ }),

/***/ 83954:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMglyph = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMglyph = (function (_super) {
    __extends(MmlMglyph, _super);
    function MmlMglyph() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMglyph.prototype, "kind", {
        get: function () {
            return 'mglyph';
        },
        enumerable: false,
        configurable: true
    });
    MmlMglyph.prototype.verifyAttributes = function (options) {
        var _a = this.attributes.getList('src', 'fontfamily', 'index'), src = _a.src, fontfamily = _a.fontfamily, index = _a.index;
        if (src === '' && (fontfamily === '' || index === '')) {
            this.mError('mglyph must have either src or fontfamily and index attributes', options, true);
        }
        else {
            _super.prototype.verifyAttributes.call(this, options);
        }
    };
    MmlMglyph.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlTokenNode.defaults), { alt: '', src: '', index: '', width: 'auto', height: 'auto', valign: '0em' });
    return MmlMglyph;
}(MmlNode_js_1.AbstractMmlTokenNode));
exports.MmlMglyph = MmlMglyph;
//# sourceMappingURL=mglyph.js.map

/***/ }),

/***/ 16689:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMi = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMi = (function (_super) {
    __extends(MmlMi, _super);
    function MmlMi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMi.prototype, "kind", {
        get: function () {
            return 'mi';
        },
        enumerable: false,
        configurable: true
    });
    MmlMi.prototype.setInheritedAttributes = function (attributes, display, level, prime) {
        if (attributes === void 0) { attributes = {}; }
        if (display === void 0) { display = false; }
        if (level === void 0) { level = 0; }
        if (prime === void 0) { prime = false; }
        _super.prototype.setInheritedAttributes.call(this, attributes, display, level, prime);
        var text = this.getText();
        if (text.match(MmlMi.singleCharacter) && !attributes.mathvariant) {
            this.attributes.setInherited('mathvariant', 'italic');
        }
    };
    MmlMi.prototype.setTeXclass = function (prev) {
        this.getPrevClass(prev);
        var name = this.getText();
        if (name.length > 1 && name.match(MmlMi.operatorName) &&
            this.attributes.get('mathvariant') === 'normal' &&
            this.getProperty('autoOP') === undefined &&
            this.getProperty('texClass') === undefined) {
            this.texClass = MmlNode_js_1.TEXCLASS.OP;
            this.setProperty('autoOP', true);
        }
        return this;
    };
    MmlMi.defaults = __assign({}, MmlNode_js_1.AbstractMmlTokenNode.defaults);
    MmlMi.operatorName = /^[a-z][a-z0-9]*$/i;
    MmlMi.singleCharacter = /^[\uD800-\uDBFF]?.[\u0300-\u036F\u1AB0-\u1ABE\u1DC0-\u1DFF\u20D0-\u20EF]*$/;
    return MmlMi;
}(MmlNode_js_1.AbstractMmlTokenNode));
exports.MmlMi = MmlMi;
//# sourceMappingURL=mi.js.map

/***/ }),

/***/ 13195:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlNone = exports.MmlMprescripts = exports.MmlMmultiscripts = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var msubsup_js_1 = __webpack_require__(74529);
var MmlMmultiscripts = (function (_super) {
    __extends(MmlMmultiscripts, _super);
    function MmlMmultiscripts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMmultiscripts.prototype, "kind", {
        get: function () {
            return 'mmultiscripts';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMmultiscripts.prototype, "arity", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    MmlMmultiscripts.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        this.childNodes[0].setInheritedAttributes(attributes, display, level, prime);
        var prescripts = false;
        for (var i = 1, n = 0; i < this.childNodes.length; i++) {
            var child = this.childNodes[i];
            if (child.isKind('mprescripts')) {
                if (!prescripts) {
                    prescripts = true;
                    if (i % 2 === 0) {
                        var mrow = this.factory.create('mrow');
                        this.childNodes.splice(i, 0, mrow);
                        mrow.parent = this;
                        i++;
                    }
                }
            }
            else {
                var primestyle = prime || (n % 2 === 0);
                child.setInheritedAttributes(attributes, false, level + 1, primestyle);
                n++;
            }
        }
        if (this.childNodes.length % 2 === (prescripts ? 1 : 0)) {
            this.appendChild(this.factory.create('mrow'));
            this.childNodes[this.childNodes.length - 1].setInheritedAttributes(attributes, false, level + 1, prime);
        }
    };
    MmlMmultiscripts.prototype.verifyChildren = function (options) {
        var prescripts = false;
        var fix = options['fixMmultiscripts'];
        for (var i = 0; i < this.childNodes.length; i++) {
            var child = this.childNodes[i];
            if (child.isKind('mprescripts')) {
                if (prescripts) {
                    child.mError(child.kind + ' can only appear once in ' + this.kind, options, true);
                }
                else {
                    prescripts = true;
                    if (i % 2 === 0 && !fix) {
                        this.mError('There must be an equal number of prescripts of each type', options);
                    }
                }
            }
        }
        if (this.childNodes.length % 2 === (prescripts ? 1 : 0) && !fix) {
            this.mError('There must be an equal number of scripts of each type', options);
        }
        _super.prototype.verifyChildren.call(this, options);
    };
    MmlMmultiscripts.defaults = __assign({}, msubsup_js_1.MmlMsubsup.defaults);
    return MmlMmultiscripts;
}(msubsup_js_1.MmlMsubsup));
exports.MmlMmultiscripts = MmlMmultiscripts;
var MmlMprescripts = (function (_super) {
    __extends(MmlMprescripts, _super);
    function MmlMprescripts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMprescripts.prototype, "kind", {
        get: function () {
            return 'mprescripts';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMprescripts.prototype, "arity", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    MmlMprescripts.prototype.verifyTree = function (options) {
        _super.prototype.verifyTree.call(this, options);
        if (this.parent && !this.parent.isKind('mmultiscripts')) {
            this.mError(this.kind + ' must be a child of mmultiscripts', options, true);
        }
    };
    MmlMprescripts.defaults = __assign({}, MmlNode_js_1.AbstractMmlNode.defaults);
    return MmlMprescripts;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMprescripts = MmlMprescripts;
var MmlNone = (function (_super) {
    __extends(MmlNone, _super);
    function MmlNone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlNone.prototype, "kind", {
        get: function () {
            return 'none';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlNone.prototype, "arity", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    MmlNone.prototype.verifyTree = function (options) {
        _super.prototype.verifyTree.call(this, options);
        if (this.parent && !this.parent.isKind('mmultiscripts')) {
            this.mError(this.kind + ' must be a child of mmultiscripts', options, true);
        }
    };
    MmlNone.defaults = __assign({}, MmlNode_js_1.AbstractMmlNode.defaults);
    return MmlNone;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlNone = MmlNone;
//# sourceMappingURL=mmultiscripts.js.map

/***/ }),

/***/ 94411:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMn = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMn = (function (_super) {
    __extends(MmlMn, _super);
    function MmlMn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMn.prototype, "kind", {
        get: function () {
            return 'mn';
        },
        enumerable: false,
        configurable: true
    });
    MmlMn.defaults = __assign({}, MmlNode_js_1.AbstractMmlTokenNode.defaults);
    return MmlMn;
}(MmlNode_js_1.AbstractMmlTokenNode));
exports.MmlMn = MmlMn;
//# sourceMappingURL=mn.js.map

/***/ }),

/***/ 5213:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMo = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var OperatorDictionary_js_1 = __webpack_require__(64432);
var string_js_1 = __webpack_require__(33353);
var MmlMo = (function (_super) {
    __extends(MmlMo, _super);
    function MmlMo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._texClass = null;
        _this.lspace = 5 / 18;
        _this.rspace = 5 / 18;
        return _this;
    }
    Object.defineProperty(MmlMo.prototype, "texClass", {
        get: function () {
            if (this._texClass === null) {
                var mo = this.getText();
                var _a = __read(this.handleExplicitForm(this.getForms()), 3), form1 = _a[0], form2 = _a[1], form3 = _a[2];
                var OPTABLE_1 = this.constructor.OPTABLE;
                var def = OPTABLE_1[form1][mo] || OPTABLE_1[form2][mo] || OPTABLE_1[form3][mo];
                return def ? def[2] : MmlNode_js_1.TEXCLASS.REL;
            }
            return this._texClass;
        },
        set: function (value) {
            this._texClass = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMo.prototype, "kind", {
        get: function () {
            return 'mo';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMo.prototype, "isEmbellished", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMo.prototype, "hasNewLine", {
        get: function () {
            return this.attributes.get('linebreak') === 'newline';
        },
        enumerable: false,
        configurable: true
    });
    MmlMo.prototype.coreParent = function () {
        var embellished = this;
        var parent = this;
        var math = this.factory.getNodeClass('math');
        while (parent && parent.isEmbellished && parent.coreMO() === this && !(parent instanceof math)) {
            embellished = parent;
            parent = parent.parent;
        }
        return embellished;
    };
    MmlMo.prototype.coreText = function (parent) {
        if (!parent) {
            return '';
        }
        if (parent.isEmbellished) {
            return parent.coreMO().getText();
        }
        while ((((parent.isKind('mrow') ||
            (parent.isKind('TeXAtom') && parent.texClass !== MmlNode_js_1.TEXCLASS.VCENTER) ||
            parent.isKind('mstyle') ||
            parent.isKind('mphantom')) && parent.childNodes.length === 1) ||
            parent.isKind('munderover')) && parent.childNodes[0]) {
            parent = parent.childNodes[0];
        }
        return (parent.isToken ? parent.getText() : '');
    };
    MmlMo.prototype.hasSpacingAttributes = function () {
        return this.attributes.isSet('lspace') ||
            this.attributes.isSet('rspace');
    };
    Object.defineProperty(MmlMo.prototype, "isAccent", {
        get: function () {
            var accent = false;
            var node = this.coreParent().parent;
            if (node) {
                var key = (node.isKind('mover') ?
                    (node.childNodes[node.over].coreMO() ?
                        'accent' : '') :
                    node.isKind('munder') ?
                        (node.childNodes[node.under].coreMO() ?
                            'accentunder' : '') :
                        node.isKind('munderover') ?
                            (this === node.childNodes[node.over].coreMO() ?
                                'accent' :
                                this === node.childNodes[node.under].coreMO() ?
                                    'accentunder' : '') :
                            '');
                if (key) {
                    var value = node.attributes.getExplicit(key);
                    accent = (value !== undefined ? accent : this.attributes.get('accent'));
                }
            }
            return accent;
        },
        enumerable: false,
        configurable: true
    });
    MmlMo.prototype.setTeXclass = function (prev) {
        var _a = this.attributes.getList('form', 'fence'), form = _a.form, fence = _a.fence;
        if (this.getProperty('texClass') === undefined &&
            (this.attributes.isSet('lspace') || this.attributes.isSet('rspace'))) {
            return null;
        }
        if (fence && this.texClass === MmlNode_js_1.TEXCLASS.REL) {
            if (form === 'prefix') {
                this.texClass = MmlNode_js_1.TEXCLASS.OPEN;
            }
            if (form === 'postfix') {
                this.texClass = MmlNode_js_1.TEXCLASS.CLOSE;
            }
        }
        return this.adjustTeXclass(prev);
    };
    MmlMo.prototype.adjustTeXclass = function (prev) {
        var texClass = this.texClass;
        var prevClass = this.prevClass;
        if (texClass === MmlNode_js_1.TEXCLASS.NONE) {
            return prev;
        }
        if (prev) {
            if (prev.getProperty('autoOP') && (texClass === MmlNode_js_1.TEXCLASS.BIN || texClass === MmlNode_js_1.TEXCLASS.REL)) {
                prevClass = prev.texClass = MmlNode_js_1.TEXCLASS.ORD;
            }
            prevClass = this.prevClass = (prev.texClass || MmlNode_js_1.TEXCLASS.ORD);
            this.prevLevel = this.attributes.getInherited('scriptlevel');
        }
        else {
            prevClass = this.prevClass = MmlNode_js_1.TEXCLASS.NONE;
        }
        if (texClass === MmlNode_js_1.TEXCLASS.BIN &&
            (prevClass === MmlNode_js_1.TEXCLASS.NONE || prevClass === MmlNode_js_1.TEXCLASS.BIN || prevClass === MmlNode_js_1.TEXCLASS.OP ||
                prevClass === MmlNode_js_1.TEXCLASS.REL || prevClass === MmlNode_js_1.TEXCLASS.OPEN || prevClass === MmlNode_js_1.TEXCLASS.PUNCT)) {
            this.texClass = MmlNode_js_1.TEXCLASS.ORD;
        }
        else if (prevClass === MmlNode_js_1.TEXCLASS.BIN &&
            (texClass === MmlNode_js_1.TEXCLASS.REL || texClass === MmlNode_js_1.TEXCLASS.CLOSE || texClass === MmlNode_js_1.TEXCLASS.PUNCT)) {
            prev.texClass = this.prevClass = MmlNode_js_1.TEXCLASS.ORD;
        }
        else if (texClass === MmlNode_js_1.TEXCLASS.BIN) {
            var child = this;
            var parent_1 = this.parent;
            while (parent_1 && parent_1.parent && parent_1.isEmbellished &&
                (parent_1.childNodes.length === 1 ||
                    (!parent_1.isKind('mrow') && parent_1.core() === child))) {
                child = parent_1;
                parent_1 = parent_1.parent;
            }
            if (parent_1.childNodes[parent_1.childNodes.length - 1] === child) {
                this.texClass = MmlNode_js_1.TEXCLASS.ORD;
            }
        }
        return this;
    };
    MmlMo.prototype.setInheritedAttributes = function (attributes, display, level, prime) {
        if (attributes === void 0) { attributes = {}; }
        if (display === void 0) { display = false; }
        if (level === void 0) { level = 0; }
        if (prime === void 0) { prime = false; }
        _super.prototype.setInheritedAttributes.call(this, attributes, display, level, prime);
        var mo = this.getText();
        this.checkOperatorTable(mo);
        this.checkPseudoScripts(mo);
        this.checkPrimes(mo);
        this.checkMathAccent(mo);
    };
    MmlMo.prototype.checkOperatorTable = function (mo) {
        var e_1, _a;
        var _b = __read(this.handleExplicitForm(this.getForms()), 3), form1 = _b[0], form2 = _b[1], form3 = _b[2];
        this.attributes.setInherited('form', form1);
        var OPTABLE = this.constructor.OPTABLE;
        var def = OPTABLE[form1][mo] || OPTABLE[form2][mo] || OPTABLE[form3][mo];
        if (def) {
            if (this.getProperty('texClass') === undefined) {
                this.texClass = def[2];
            }
            try {
                for (var _c = __values(Object.keys(def[3] || {})), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var name_1 = _d.value;
                    this.attributes.setInherited(name_1, def[3][name_1]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.lspace = (def[0] + 1) / 18;
            this.rspace = (def[1] + 1) / 18;
        }
        else {
            var range = (0, OperatorDictionary_js_1.getRange)(mo);
            if (range) {
                if (this.getProperty('texClass') === undefined) {
                    this.texClass = range[2];
                }
                var spacing = this.constructor.MMLSPACING[range[2]];
                this.lspace = (spacing[0] + 1) / 18;
                this.rspace = (spacing[1] + 1) / 18;
            }
        }
    };
    MmlMo.prototype.getForms = function () {
        var core = this;
        var parent = this.parent;
        var Parent = this.Parent;
        while (Parent && Parent.isEmbellished) {
            core = parent;
            parent = Parent.parent;
            Parent = Parent.Parent;
        }
        if (parent && parent.isKind('mrow') && parent.nonSpaceLength() !== 1) {
            if (parent.firstNonSpace() === core) {
                return ['prefix', 'infix', 'postfix'];
            }
            if (parent.lastNonSpace() === core) {
                return ['postfix', 'infix', 'prefix'];
            }
        }
        return ['infix', 'prefix', 'postfix'];
    };
    MmlMo.prototype.handleExplicitForm = function (forms) {
        if (this.attributes.isSet('form')) {
            var form_1 = this.attributes.get('form');
            forms = [form_1].concat(forms.filter(function (name) { return (name !== form_1); }));
        }
        return forms;
    };
    MmlMo.prototype.checkPseudoScripts = function (mo) {
        var PSEUDOSCRIPTS = this.constructor.pseudoScripts;
        if (!mo.match(PSEUDOSCRIPTS))
            return;
        var parent = this.coreParent().Parent;
        var isPseudo = !parent || !(parent.isKind('msubsup') && !parent.isKind('msub'));
        this.setProperty('pseudoscript', isPseudo);
        if (isPseudo) {
            this.attributes.setInherited('lspace', 0);
            this.attributes.setInherited('rspace', 0);
        }
    };
    MmlMo.prototype.checkPrimes = function (mo) {
        var PRIMES = this.constructor.primes;
        if (!mo.match(PRIMES))
            return;
        var REMAP = this.constructor.remapPrimes;
        var primes = (0, string_js_1.unicodeString)((0, string_js_1.unicodeChars)(mo).map(function (c) { return REMAP[c]; }));
        this.setProperty('primes', primes);
    };
    MmlMo.prototype.checkMathAccent = function (mo) {
        var parent = this.Parent;
        if (this.getProperty('mathaccent') !== undefined || !parent || !parent.isKind('munderover'))
            return;
        var base = parent.childNodes[0];
        if (base.isEmbellished && base.coreMO() === this)
            return;
        var MATHACCENT = this.constructor.mathaccents;
        if (mo.match(MATHACCENT)) {
            this.setProperty('mathaccent', true);
        }
    };
    MmlMo.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlTokenNode.defaults), { form: 'infix', fence: false, separator: false, lspace: 'thickmathspace', rspace: 'thickmathspace', stretchy: false, symmetric: false, maxsize: 'infinity', minsize: '0em', largeop: false, movablelimits: false, accent: false, linebreak: 'auto', lineleading: '1ex', linebreakstyle: 'before', indentalign: 'auto', indentshift: '0', indenttarget: '', indentalignfirst: 'indentalign', indentshiftfirst: 'indentshift', indentalignlast: 'indentalign', indentshiftlast: 'indentshift' });
    MmlMo.MMLSPACING = OperatorDictionary_js_1.MMLSPACING;
    MmlMo.OPTABLE = OperatorDictionary_js_1.OPTABLE;
    MmlMo.pseudoScripts = new RegExp([
        '^["\'*`',
        '\u00AA',
        '\u00B0',
        '\u00B2-\u00B4',
        '\u00B9',
        '\u00BA',
        '\u2018-\u201F',
        '\u2032-\u2037\u2057',
        '\u2070\u2071',
        '\u2074-\u207F',
        '\u2080-\u208E',
        ']+$'
    ].join(''));
    MmlMo.primes = new RegExp([
        '^["\'`',
        '\u2018-\u201F',
        ']+$'
    ].join(''));
    MmlMo.remapPrimes = {
        0x0022: 0x2033,
        0x0027: 0x2032,
        0x0060: 0x2035,
        0x2018: 0x2035,
        0x2019: 0x2032,
        0x201A: 0x2032,
        0x201B: 0x2035,
        0x201C: 0x2036,
        0x201D: 0x2033,
        0x201E: 0x2033,
        0x201F: 0x2036,
    };
    MmlMo.mathaccents = new RegExp([
        '^[',
        '\u00B4\u0301\u02CA',
        '\u0060\u0300\u02CB',
        '\u00A8\u0308',
        '\u007E\u0303\u02DC',
        '\u00AF\u0304\u02C9',
        '\u02D8\u0306',
        '\u02C7\u030C',
        '\u005E\u0302\u02C6',
        '\u2192\u20D7',
        '\u02D9\u0307',
        '\u02DA\u030A',
        '\u20DB',
        '\u20DC',
        ']$'
    ].join(''));
    return MmlMo;
}(MmlNode_js_1.AbstractMmlTokenNode));
exports.MmlMo = MmlMo;
//# sourceMappingURL=mo.js.map

/***/ }),

/***/ 59783:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMpadded = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMpadded = (function (_super) {
    __extends(MmlMpadded, _super);
    function MmlMpadded() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMpadded.prototype, "kind", {
        get: function () {
            return 'mpadded';
        },
        enumerable: false,
        configurable: true
    });
    MmlMpadded.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlLayoutNode.defaults), { width: '', height: '', depth: '', lspace: 0, voffset: 0 });
    return MmlMpadded;
}(MmlNode_js_1.AbstractMmlLayoutNode));
exports.MmlMpadded = MmlMpadded;
//# sourceMappingURL=mpadded.js.map

/***/ }),

/***/ 68091:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMroot = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMroot = (function (_super) {
    __extends(MmlMroot, _super);
    function MmlMroot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMroot.prototype, "kind", {
        get: function () {
            return 'mroot';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMroot.prototype, "arity", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    MmlMroot.prototype.setTeXclass = function (prev) {
        this.getPrevClass(prev);
        this.childNodes[0].setTeXclass(null);
        this.childNodes[1].setTeXclass(null);
        return this;
    };
    MmlMroot.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        this.childNodes[0].setInheritedAttributes(attributes, display, level, true);
        this.childNodes[1].setInheritedAttributes(attributes, false, level + 2, prime);
    };
    MmlMroot.defaults = __assign({}, MmlNode_js_1.AbstractMmlNode.defaults);
    return MmlMroot;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMroot = MmlMroot;
//# sourceMappingURL=mroot.js.map

/***/ }),

/***/ 68550:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlInferredMrow = exports.MmlMrow = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMrow = (function (_super) {
    __extends(MmlMrow, _super);
    function MmlMrow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._core = null;
        return _this;
    }
    Object.defineProperty(MmlMrow.prototype, "kind", {
        get: function () {
            return 'mrow';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMrow.prototype, "isSpacelike", {
        get: function () {
            var e_1, _a;
            try {
                for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    if (!child.isSpacelike) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMrow.prototype, "isEmbellished", {
        get: function () {
            var e_2, _a;
            var embellished = false;
            var i = 0;
            try {
                for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    if (child) {
                        if (child.isEmbellished) {
                            if (embellished) {
                                return false;
                            }
                            embellished = true;
                            this._core = i;
                        }
                        else if (!child.isSpacelike) {
                            return false;
                        }
                    }
                    i++;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return embellished;
        },
        enumerable: false,
        configurable: true
    });
    MmlMrow.prototype.core = function () {
        if (!this.isEmbellished || this._core == null) {
            return this;
        }
        return this.childNodes[this._core];
    };
    MmlMrow.prototype.coreMO = function () {
        if (!this.isEmbellished || this._core == null) {
            return this;
        }
        return this.childNodes[this._core].coreMO();
    };
    MmlMrow.prototype.nonSpaceLength = function () {
        var e_3, _a;
        var n = 0;
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child && !child.isSpacelike) {
                    n++;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return n;
    };
    MmlMrow.prototype.firstNonSpace = function () {
        var e_4, _a;
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child && !child.isSpacelike) {
                    return child;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return null;
    };
    MmlMrow.prototype.lastNonSpace = function () {
        var i = this.childNodes.length;
        while (--i >= 0) {
            var child = this.childNodes[i];
            if (child && !child.isSpacelike) {
                return child;
            }
        }
        return null;
    };
    MmlMrow.prototype.setTeXclass = function (prev) {
        var e_5, _a, e_6, _b;
        if (this.getProperty('open') != null || this.getProperty('close') != null) {
            this.getPrevClass(prev);
            prev = null;
            try {
                for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var child = _d.value;
                    prev = child.setTeXclass(prev);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            if (this.texClass == null) {
                this.texClass = MmlNode_js_1.TEXCLASS.INNER;
            }
        }
        else {
            try {
                for (var _e = __values(this.childNodes), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var child = _f.value;
                    prev = child.setTeXclass(prev);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_6) throw e_6.error; }
            }
            if (this.childNodes[0]) {
                this.updateTeXclass(this.childNodes[0]);
            }
        }
        return prev;
    };
    MmlMrow.defaults = __assign({}, MmlNode_js_1.AbstractMmlNode.defaults);
    return MmlMrow;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMrow = MmlMrow;
var MmlInferredMrow = (function (_super) {
    __extends(MmlInferredMrow, _super);
    function MmlInferredMrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlInferredMrow.prototype, "kind", {
        get: function () {
            return 'inferredMrow';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlInferredMrow.prototype, "isInferred", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlInferredMrow.prototype, "notParent", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlInferredMrow.prototype.toString = function () {
        return '[' + this.childNodes.join(',') + ']';
    };
    MmlInferredMrow.defaults = MmlMrow.defaults;
    return MmlInferredMrow;
}(MmlMrow));
exports.MmlInferredMrow = MmlInferredMrow;
//# sourceMappingURL=mrow.js.map

/***/ }),

/***/ 17931:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMs = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMs = (function (_super) {
    __extends(MmlMs, _super);
    function MmlMs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMs.prototype, "kind", {
        get: function () {
            return 'ms';
        },
        enumerable: false,
        configurable: true
    });
    MmlMs.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlTokenNode.defaults), { lquote: '"', rquote: '"' });
    return MmlMs;
}(MmlNode_js_1.AbstractMmlTokenNode));
exports.MmlMs = MmlMs;
//# sourceMappingURL=ms.js.map

/***/ }),

/***/ 4254:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMspace = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMspace = (function (_super) {
    __extends(MmlMspace, _super);
    function MmlMspace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.NONE;
        return _this;
    }
    MmlMspace.prototype.setTeXclass = function (prev) {
        return prev;
    };
    Object.defineProperty(MmlMspace.prototype, "kind", {
        get: function () {
            return 'mspace';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMspace.prototype, "arity", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMspace.prototype, "isSpacelike", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMspace.prototype, "hasNewline", {
        get: function () {
            var attributes = this.attributes;
            return (attributes.getExplicit('width') == null && attributes.getExplicit('height') == null &&
                attributes.getExplicit('depth') == null && attributes.get('linebreak') === 'newline');
        },
        enumerable: false,
        configurable: true
    });
    MmlMspace.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlTokenNode.defaults), { width: '0em', height: '0ex', depth: '0ex', linebreak: 'auto' });
    return MmlMspace;
}(MmlNode_js_1.AbstractMmlTokenNode));
exports.MmlMspace = MmlMspace;
//# sourceMappingURL=mspace.js.map

/***/ }),

/***/ 53162:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMsqrt = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMsqrt = (function (_super) {
    __extends(MmlMsqrt, _super);
    function MmlMsqrt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMsqrt.prototype, "kind", {
        get: function () {
            return 'msqrt';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsqrt.prototype, "arity", {
        get: function () {
            return -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsqrt.prototype, "linebreakContainer", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMsqrt.prototype.setTeXclass = function (prev) {
        this.getPrevClass(prev);
        this.childNodes[0].setTeXclass(null);
        return this;
    };
    MmlMsqrt.prototype.setChildInheritedAttributes = function (attributes, display, level, _prime) {
        this.childNodes[0].setInheritedAttributes(attributes, display, level, true);
    };
    MmlMsqrt.defaults = __assign({}, MmlNode_js_1.AbstractMmlNode.defaults);
    return MmlMsqrt;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMsqrt = MmlMsqrt;
//# sourceMappingURL=msqrt.js.map

/***/ }),

/***/ 74529:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMsup = exports.MmlMsub = exports.MmlMsubsup = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMsubsup = (function (_super) {
    __extends(MmlMsubsup, _super);
    function MmlMsubsup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMsubsup.prototype, "kind", {
        get: function () {
            return 'msubsup';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsubsup.prototype, "arity", {
        get: function () {
            return 3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsubsup.prototype, "base", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsubsup.prototype, "sub", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsubsup.prototype, "sup", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    MmlMsubsup.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        var nodes = this.childNodes;
        nodes[0].setInheritedAttributes(attributes, display, level, prime);
        nodes[1].setInheritedAttributes(attributes, false, level + 1, prime || this.sub === 1);
        if (!nodes[2]) {
            return;
        }
        nodes[2].setInheritedAttributes(attributes, false, level + 1, prime || this.sub === 2);
    };
    MmlMsubsup.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlBaseNode.defaults), { subscriptshift: '', superscriptshift: '' });
    return MmlMsubsup;
}(MmlNode_js_1.AbstractMmlBaseNode));
exports.MmlMsubsup = MmlMsubsup;
var MmlMsub = (function (_super) {
    __extends(MmlMsub, _super);
    function MmlMsub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMsub.prototype, "kind", {
        get: function () {
            return 'msub';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsub.prototype, "arity", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    MmlMsub.defaults = __assign({}, MmlMsubsup.defaults);
    return MmlMsub;
}(MmlMsubsup));
exports.MmlMsub = MmlMsub;
var MmlMsup = (function (_super) {
    __extends(MmlMsup, _super);
    function MmlMsup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMsup.prototype, "kind", {
        get: function () {
            return 'msup';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsup.prototype, "arity", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsup.prototype, "sup", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMsup.prototype, "sub", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    MmlMsup.defaults = __assign({}, MmlMsubsup.defaults);
    return MmlMsup;
}(MmlMsubsup));
exports.MmlMsup = MmlMsup;
//# sourceMappingURL=msubsup.js.map

/***/ }),

/***/ 7252:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMtable = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var string_js_1 = __webpack_require__(33353);
var MmlMtable = (function (_super) {
    __extends(MmlMtable, _super);
    function MmlMtable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.properties = {
            useHeight: true
        };
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMtable.prototype, "kind", {
        get: function () {
            return 'mtable';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMtable.prototype, "linebreakContainer", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMtable.prototype.setInheritedAttributes = function (attributes, display, level, prime) {
        var e_1, _a;
        try {
            for (var indentAttributes_1 = __values(MmlNode_js_1.indentAttributes), indentAttributes_1_1 = indentAttributes_1.next(); !indentAttributes_1_1.done; indentAttributes_1_1 = indentAttributes_1.next()) {
                var name_1 = indentAttributes_1_1.value;
                if (attributes[name_1]) {
                    this.attributes.setInherited(name_1, attributes[name_1][1]);
                }
                if (this.attributes.getExplicit(name_1) !== undefined) {
                    delete (this.attributes.getAllAttributes())[name_1];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (indentAttributes_1_1 && !indentAttributes_1_1.done && (_a = indentAttributes_1.return)) _a.call(indentAttributes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _super.prototype.setInheritedAttributes.call(this, attributes, display, level, prime);
    };
    MmlMtable.prototype.setChildInheritedAttributes = function (attributes, display, level, _prime) {
        var e_2, _a, e_3, _b;
        try {
            for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var child = _d.value;
                if (!child.isKind('mtr')) {
                    this.replaceChild(this.factory.create('mtr'), child)
                        .appendChild(child);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        level = this.getProperty('scriptlevel') || level;
        display = !!(this.attributes.getExplicit('displaystyle') || this.attributes.getDefault('displaystyle'));
        attributes = this.addInheritedAttributes(attributes, {
            columnalign: this.attributes.get('columnalign'),
            rowalign: 'center'
        });
        var cramped = this.attributes.getExplicit('data-cramped');
        var ralign = (0, string_js_1.split)(this.attributes.get('rowalign'));
        try {
            for (var _e = __values(this.childNodes), _f = _e.next(); !_f.done; _f = _e.next()) {
                var child = _f.value;
                attributes.rowalign[1] = ralign.shift() || attributes.rowalign[1];
                child.setInheritedAttributes(attributes, display, level, !!cramped);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    MmlMtable.prototype.verifyChildren = function (options) {
        var mtr = null;
        var factory = this.factory;
        for (var i = 0; i < this.childNodes.length; i++) {
            var child = this.childNodes[i];
            if (child.isKind('mtr')) {
                mtr = null;
            }
            else {
                var isMtd = child.isKind('mtd');
                if (mtr) {
                    this.removeChild(child);
                    i--;
                }
                else {
                    mtr = this.replaceChild(factory.create('mtr'), child);
                }
                mtr.appendChild(isMtd ? child : factory.create('mtd', {}, [child]));
                if (!options['fixMtables']) {
                    child.parent.removeChild(child);
                    child.parent = this;
                    isMtd && mtr.appendChild(factory.create('mtd'));
                    var merror = child.mError('Children of ' + this.kind + ' must be mtr or mlabeledtr', options, isMtd);
                    mtr.childNodes[mtr.childNodes.length - 1].appendChild(merror);
                }
            }
        }
        _super.prototype.verifyChildren.call(this, options);
    };
    MmlMtable.prototype.setTeXclass = function (prev) {
        var e_4, _a;
        this.getPrevClass(prev);
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.setTeXclass(null);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return this;
    };
    MmlMtable.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlNode.defaults), { align: 'axis', rowalign: 'baseline', columnalign: 'center', groupalign: '{left}', alignmentscope: true, columnwidth: 'auto', width: 'auto', rowspacing: '1ex', columnspacing: '.8em', rowlines: 'none', columnlines: 'none', frame: 'none', framespacing: '0.4em 0.5ex', equalrows: false, equalcolumns: false, displaystyle: false, side: 'right', minlabelspacing: '0.8em' });
    return MmlMtable;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMtable = MmlMtable;
//# sourceMappingURL=mtable.js.map

/***/ }),

/***/ 49016:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMtd = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var Attributes_js_1 = __webpack_require__(7013);
var MmlMtd = (function (_super) {
    __extends(MmlMtd, _super);
    function MmlMtd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMtd.prototype, "kind", {
        get: function () {
            return 'mtd';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMtd.prototype, "arity", {
        get: function () {
            return -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMtd.prototype, "linebreakContainer", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMtd.prototype.verifyChildren = function (options) {
        if (this.parent && !this.parent.isKind('mtr')) {
            this.mError(this.kind + ' can only be a child of an mtr or mlabeledtr', options, true);
            return;
        }
        _super.prototype.verifyChildren.call(this, options);
    };
    MmlMtd.prototype.setTeXclass = function (prev) {
        this.getPrevClass(prev);
        this.childNodes[0].setTeXclass(null);
        return this;
    };
    MmlMtd.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlBaseNode.defaults), { rowspan: 1, columnspan: 1, rowalign: Attributes_js_1.INHERIT, columnalign: Attributes_js_1.INHERIT, groupalign: Attributes_js_1.INHERIT });
    return MmlMtd;
}(MmlNode_js_1.AbstractMmlBaseNode));
exports.MmlMtd = MmlMtd;
//# sourceMappingURL=mtd.js.map

/***/ }),

/***/ 86237:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMtext = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMtext = (function (_super) {
    __extends(MmlMtext, _super);
    function MmlMtext() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMtext.prototype, "kind", {
        get: function () {
            return 'mtext';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMtext.prototype, "isSpacelike", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMtext.defaults = __assign({}, MmlNode_js_1.AbstractMmlTokenNode.defaults);
    return MmlMtext;
}(MmlNode_js_1.AbstractMmlTokenNode));
exports.MmlMtext = MmlMtext;
//# sourceMappingURL=mtext.js.map

/***/ }),

/***/ 2117:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMlabeledtr = exports.MmlMtr = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var Attributes_js_1 = __webpack_require__(7013);
var string_js_1 = __webpack_require__(33353);
var MmlMtr = (function (_super) {
    __extends(MmlMtr, _super);
    function MmlMtr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMtr.prototype, "kind", {
        get: function () {
            return 'mtr';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMtr.prototype, "linebreakContainer", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMtr.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var child = _d.value;
                if (!child.isKind('mtd')) {
                    this.replaceChild(this.factory.create('mtd'), child)
                        .appendChild(child);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var calign = (0, string_js_1.split)(this.attributes.get('columnalign'));
        if (this.arity === 1) {
            calign.unshift(this.parent.attributes.get('side'));
        }
        attributes = this.addInheritedAttributes(attributes, {
            rowalign: this.attributes.get('rowalign'),
            columnalign: 'center'
        });
        try {
            for (var _e = __values(this.childNodes), _f = _e.next(); !_f.done; _f = _e.next()) {
                var child = _f.value;
                attributes.columnalign[1] = calign.shift() || attributes.columnalign[1];
                child.setInheritedAttributes(attributes, display, level, prime);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    MmlMtr.prototype.verifyChildren = function (options) {
        var e_3, _a;
        if (this.parent && !this.parent.isKind('mtable')) {
            this.mError(this.kind + ' can only be a child of an mtable', options, true);
            return;
        }
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (!child.isKind('mtd')) {
                    var mtd = this.replaceChild(this.factory.create('mtd'), child);
                    mtd.appendChild(child);
                    if (!options['fixMtables']) {
                        child.mError('Children of ' + this.kind + ' must be mtd', options);
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        _super.prototype.verifyChildren.call(this, options);
    };
    MmlMtr.prototype.setTeXclass = function (prev) {
        var e_4, _a;
        this.getPrevClass(prev);
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.setTeXclass(null);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return this;
    };
    MmlMtr.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlNode.defaults), { rowalign: Attributes_js_1.INHERIT, columnalign: Attributes_js_1.INHERIT, groupalign: Attributes_js_1.INHERIT });
    return MmlMtr;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMtr = MmlMtr;
var MmlMlabeledtr = (function (_super) {
    __extends(MmlMlabeledtr, _super);
    function MmlMlabeledtr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMlabeledtr.prototype, "kind", {
        get: function () {
            return 'mlabeledtr';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMlabeledtr.prototype, "arity", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    return MmlMlabeledtr;
}(MmlMtr));
exports.MmlMlabeledtr = MmlMlabeledtr;
//# sourceMappingURL=mtr.js.map

/***/ }),

/***/ 75723:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlMover = exports.MmlMunder = exports.MmlMunderover = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMunderover = (function (_super) {
    __extends(MmlMunderover, _super);
    function MmlMunderover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMunderover.prototype, "kind", {
        get: function () {
            return 'munderover';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMunderover.prototype, "arity", {
        get: function () {
            return 3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMunderover.prototype, "base", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMunderover.prototype, "under", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMunderover.prototype, "over", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMunderover.prototype, "linebreakContainer", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMunderover.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        var nodes = this.childNodes;
        nodes[0].setInheritedAttributes(attributes, display, level, prime || !!nodes[this.over]);
        var force = !!(!display && nodes[0].coreMO().attributes.get('movablelimits'));
        var ACCENTS = this.constructor.ACCENTS;
        nodes[1].setInheritedAttributes(attributes, false, this.getScriptlevel(ACCENTS[1], force, level), prime || this.under === 1);
        this.setInheritedAccent(1, ACCENTS[1], display, level, prime, force);
        if (!nodes[2]) {
            return;
        }
        nodes[2].setInheritedAttributes(attributes, false, this.getScriptlevel(ACCENTS[2], force, level), prime || this.under === 2);
        this.setInheritedAccent(2, ACCENTS[2], display, level, prime, force);
    };
    MmlMunderover.prototype.getScriptlevel = function (accent, force, level) {
        if (force || !this.attributes.get(accent)) {
            level++;
        }
        return level;
    };
    MmlMunderover.prototype.setInheritedAccent = function (n, accent, display, level, prime, force) {
        var node = this.childNodes[n];
        if (this.attributes.getExplicit(accent) == null && node.isEmbellished) {
            var value = node.coreMO().attributes.get('accent');
            this.attributes.setInherited(accent, value);
            if (value !== this.attributes.getDefault(accent)) {
                node.setInheritedAttributes({}, display, this.getScriptlevel(accent, force, level), prime);
            }
        }
    };
    MmlMunderover.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlBaseNode.defaults), { accent: false, accentunder: false, align: 'center' });
    MmlMunderover.ACCENTS = ['', 'accentunder', 'accent'];
    return MmlMunderover;
}(MmlNode_js_1.AbstractMmlBaseNode));
exports.MmlMunderover = MmlMunderover;
var MmlMunder = (function (_super) {
    __extends(MmlMunder, _super);
    function MmlMunder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMunder.prototype, "kind", {
        get: function () {
            return 'munder';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMunder.prototype, "arity", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    MmlMunder.defaults = __assign({}, MmlMunderover.defaults);
    return MmlMunder;
}(MmlMunderover));
exports.MmlMunder = MmlMunder;
var MmlMover = (function (_super) {
    __extends(MmlMover, _super);
    function MmlMover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMover.prototype, "kind", {
        get: function () {
            return 'mover';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMover.prototype, "arity", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMover.prototype, "over", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMover.prototype, "under", {
        get: function () {
            return 2;
        },
        enumerable: false,
        configurable: true
    });
    MmlMover.defaults = __assign({}, MmlMunderover.defaults);
    MmlMover.ACCENTS = ['', 'accent', 'accentunder'];
    return MmlMover;
}(MmlMunderover));
exports.MmlMover = MmlMover;
//# sourceMappingURL=munderover.js.map

/***/ }),

/***/ 19223:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MmlAnnotation = exports.MmlAnnotationXML = exports.MmlSemantics = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlSemantics = (function (_super) {
    __extends(MmlSemantics, _super);
    function MmlSemantics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlSemantics.prototype, "kind", {
        get: function () {
            return 'semantics';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlSemantics.prototype, "arity", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlSemantics.prototype, "notParent", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlSemantics.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlBaseNode.defaults), { definitionUrl: null, encoding: null });
    return MmlSemantics;
}(MmlNode_js_1.AbstractMmlBaseNode));
exports.MmlSemantics = MmlSemantics;
var MmlAnnotationXML = (function (_super) {
    __extends(MmlAnnotationXML, _super);
    function MmlAnnotationXML() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlAnnotationXML.prototype, "kind", {
        get: function () {
            return 'annotation-xml';
        },
        enumerable: false,
        configurable: true
    });
    MmlAnnotationXML.prototype.setChildInheritedAttributes = function () { };
    MmlAnnotationXML.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlNode.defaults), { definitionUrl: null, encoding: null, cd: 'mathmlkeys', name: '', src: null });
    return MmlAnnotationXML;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlAnnotationXML = MmlAnnotationXML;
var MmlAnnotation = (function (_super) {
    __extends(MmlAnnotation, _super);
    function MmlAnnotation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.properties = {
            isChars: true
        };
        return _this;
    }
    Object.defineProperty(MmlAnnotation.prototype, "kind", {
        get: function () {
            return 'annotation';
        },
        enumerable: false,
        configurable: true
    });
    MmlAnnotation.defaults = __assign({}, MmlAnnotationXML.defaults);
    return MmlAnnotation;
}(MmlAnnotationXML));
exports.MmlAnnotation = MmlAnnotation;
//# sourceMappingURL=semantics.js.map

/***/ }),

/***/ 64432:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OPTABLE = exports.MMLSPACING = exports.getRange = exports.RANGES = exports.MO = exports.OPDEF = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
function OPDEF(lspace, rspace, texClass, properties) {
    if (texClass === void 0) { texClass = MmlNode_js_1.TEXCLASS.BIN; }
    if (properties === void 0) { properties = null; }
    return [lspace, rspace, texClass, properties];
}
exports.OPDEF = OPDEF;
exports.MO = {
    ORD: OPDEF(0, 0, MmlNode_js_1.TEXCLASS.ORD),
    ORD11: OPDEF(1, 1, MmlNode_js_1.TEXCLASS.ORD),
    ORD21: OPDEF(2, 1, MmlNode_js_1.TEXCLASS.ORD),
    ORD02: OPDEF(0, 2, MmlNode_js_1.TEXCLASS.ORD),
    ORD55: OPDEF(5, 5, MmlNode_js_1.TEXCLASS.ORD),
    NONE: OPDEF(0, 0, MmlNode_js_1.TEXCLASS.NONE),
    OP: OPDEF(1, 2, MmlNode_js_1.TEXCLASS.OP, { largeop: true, movablelimits: true, symmetric: true }),
    OPFIXED: OPDEF(1, 2, MmlNode_js_1.TEXCLASS.OP, { largeop: true, movablelimits: true }),
    INTEGRAL: OPDEF(0, 1, MmlNode_js_1.TEXCLASS.OP, { largeop: true, symmetric: true }),
    INTEGRAL2: OPDEF(1, 2, MmlNode_js_1.TEXCLASS.OP, { largeop: true, symmetric: true }),
    BIN3: OPDEF(3, 3, MmlNode_js_1.TEXCLASS.BIN),
    BIN4: OPDEF(4, 4, MmlNode_js_1.TEXCLASS.BIN),
    BIN01: OPDEF(0, 1, MmlNode_js_1.TEXCLASS.BIN),
    BIN5: OPDEF(5, 5, MmlNode_js_1.TEXCLASS.BIN),
    TALLBIN: OPDEF(4, 4, MmlNode_js_1.TEXCLASS.BIN, { stretchy: true }),
    BINOP: OPDEF(4, 4, MmlNode_js_1.TEXCLASS.BIN, { largeop: true, movablelimits: true }),
    REL: OPDEF(5, 5, MmlNode_js_1.TEXCLASS.REL),
    REL1: OPDEF(1, 1, MmlNode_js_1.TEXCLASS.REL, { stretchy: true }),
    REL4: OPDEF(4, 4, MmlNode_js_1.TEXCLASS.REL),
    RELSTRETCH: OPDEF(5, 5, MmlNode_js_1.TEXCLASS.REL, { stretchy: true }),
    RELACCENT: OPDEF(5, 5, MmlNode_js_1.TEXCLASS.REL, { accent: true }),
    WIDEREL: OPDEF(5, 5, MmlNode_js_1.TEXCLASS.REL, { accent: true, stretchy: true }),
    OPEN: OPDEF(0, 0, MmlNode_js_1.TEXCLASS.OPEN, { fence: true, stretchy: true, symmetric: true }),
    CLOSE: OPDEF(0, 0, MmlNode_js_1.TEXCLASS.CLOSE, { fence: true, stretchy: true, symmetric: true }),
    INNER: OPDEF(0, 0, MmlNode_js_1.TEXCLASS.INNER),
    PUNCT: OPDEF(0, 3, MmlNode_js_1.TEXCLASS.PUNCT),
    ACCENT: OPDEF(0, 0, MmlNode_js_1.TEXCLASS.ORD, { accent: true }),
    WIDEACCENT: OPDEF(0, 0, MmlNode_js_1.TEXCLASS.ORD, { accent: true, stretchy: true })
};
exports.RANGES = [
    [0x0020, 0x007F, MmlNode_js_1.TEXCLASS.REL, 'mo'],
    [0x00A0, 0x00BF, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x00C0, 0x024F, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0x02B0, 0x036F, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x0370, 0x1A20, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0x1AB0, 0x1AFF, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x1B00, 0x1DBF, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0x1DC0, 0x1DFF, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x1E00, 0x1FFF, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0x2000, 0x206F, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x2070, 0x209F, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x2100, 0x214F, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0x2150, 0x218F, MmlNode_js_1.TEXCLASS.ORD, 'mn'],
    [0x2190, 0x21FF, MmlNode_js_1.TEXCLASS.REL, 'mo'],
    [0x2200, 0x22FF, MmlNode_js_1.TEXCLASS.BIN, 'mo'],
    [0x2300, 0x23FF, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x2460, 0x24FF, MmlNode_js_1.TEXCLASS.ORD, 'mn'],
    [0x2500, 0x27EF, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x27F0, 0x27FF, MmlNode_js_1.TEXCLASS.REL, 'mo'],
    [0x2800, 0x28FF, MmlNode_js_1.TEXCLASS.ORD, 'mtext'],
    [0x2900, 0x297F, MmlNode_js_1.TEXCLASS.REL, 'mo'],
    [0x2980, 0x29FF, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x2A00, 0x2AFF, MmlNode_js_1.TEXCLASS.BIN, 'mo'],
    [0x2B00, 0x2B2F, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x2B30, 0x2B4F, MmlNode_js_1.TEXCLASS.REL, 'mo'],
    [0x2B50, 0x2BFF, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x2C00, 0x2DE0, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0x2E00, 0x2E7F, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x2E80, 0x2FDF, MmlNode_js_1.TEXCLASS.ORD, 'mi', 'normal'],
    [0x2FF0, 0x303F, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x3040, 0xA49F, MmlNode_js_1.TEXCLASS.ORD, 'mi', 'normal'],
    [0xA4D0, 0xA82F, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0xA830, 0xA83F, MmlNode_js_1.TEXCLASS.ORD, 'mn'],
    [0xA840, 0xD7FF, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0xF900, 0xFAFF, MmlNode_js_1.TEXCLASS.ORD, 'mi', 'normal'],
    [0xFB00, 0xFDFF, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0xFE00, 0xFE6F, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0xFE70, 0x100FF, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0x10100, 0x1018F, MmlNode_js_1.TEXCLASS.ORD, 'mn'],
    [0x10190, 0x123FF, MmlNode_js_1.TEXCLASS.ORD, 'mi', 'normal'],
    [0x12400, 0x1247F, MmlNode_js_1.TEXCLASS.ORD, 'mn'],
    [0x12480, 0x1BC9F, MmlNode_js_1.TEXCLASS.ORD, 'mi', 'normal'],
    [0x1BCA0, 0x1D25F, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x1D360, 0x1D37F, MmlNode_js_1.TEXCLASS.ORD, 'mn'],
    [0x1D400, 0x1D7CD, MmlNode_js_1.TEXCLASS.ORD, 'mi'],
    [0x1D7CE, 0x1D7FF, MmlNode_js_1.TEXCLASS.ORD, 'mn'],
    [0x1DF00, 0x1F7FF, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x1F800, 0x1F8FF, MmlNode_js_1.TEXCLASS.REL, 'mo'],
    [0x1F900, 0x1F9FF, MmlNode_js_1.TEXCLASS.ORD, 'mo'],
    [0x20000, 0x2FA1F, MmlNode_js_1.TEXCLASS.ORD, 'mi', 'normnal'],
];
function getRange(text) {
    var e_1, _a;
    var n = text.codePointAt(0);
    try {
        for (var RANGES_1 = __values(exports.RANGES), RANGES_1_1 = RANGES_1.next(); !RANGES_1_1.done; RANGES_1_1 = RANGES_1.next()) {
            var range = RANGES_1_1.value;
            if (n <= range[1]) {
                if (n >= range[0]) {
                    return range;
                }
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (RANGES_1_1 && !RANGES_1_1.done && (_a = RANGES_1.return)) _a.call(RANGES_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return null;
}
exports.getRange = getRange;
exports.MMLSPACING = [
    [0, 0],
    [1, 2],
    [3, 3],
    [4, 4],
    [0, 0],
    [0, 0],
    [0, 3]
];
exports.OPTABLE = {
    prefix: {
        '(': exports.MO.OPEN,
        '+': exports.MO.BIN01,
        '-': exports.MO.BIN01,
        '[': exports.MO.OPEN,
        '{': exports.MO.OPEN,
        '|': exports.MO.OPEN,
        '||': [0, 0, MmlNode_js_1.TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }],
        '|||': [0, 0, MmlNode_js_1.TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }],
        '\u00AC': exports.MO.ORD21,
        '\u00B1': exports.MO.BIN01,
        '\u2016': [0, 0, MmlNode_js_1.TEXCLASS.ORD, { fence: true, stretchy: true }],
        '\u2018': [0, 0, MmlNode_js_1.TEXCLASS.OPEN, { fence: true }],
        '\u201C': [0, 0, MmlNode_js_1.TEXCLASS.OPEN, { fence: true }],
        '\u2145': exports.MO.ORD21,
        '\u2146': OPDEF(2, 0, MmlNode_js_1.TEXCLASS.ORD),
        '\u2200': exports.MO.ORD21,
        '\u2202': exports.MO.ORD21,
        '\u2203': exports.MO.ORD21,
        '\u2204': exports.MO.ORD21,
        '\u2207': exports.MO.ORD21,
        '\u220F': exports.MO.OP,
        '\u2210': exports.MO.OP,
        '\u2211': exports.MO.OP,
        '\u2212': exports.MO.BIN01,
        '\u2213': exports.MO.BIN01,
        '\u221A': [1, 1, MmlNode_js_1.TEXCLASS.ORD, { stretchy: true }],
        '\u221B': exports.MO.ORD11,
        '\u221C': exports.MO.ORD11,
        '\u2220': exports.MO.ORD,
        '\u2221': exports.MO.ORD,
        '\u2222': exports.MO.ORD,
        '\u222B': exports.MO.INTEGRAL,
        '\u222C': exports.MO.INTEGRAL,
        '\u222D': exports.MO.INTEGRAL,
        '\u222E': exports.MO.INTEGRAL,
        '\u222F': exports.MO.INTEGRAL,
        '\u2230': exports.MO.INTEGRAL,
        '\u2231': exports.MO.INTEGRAL,
        '\u2232': exports.MO.INTEGRAL,
        '\u2233': exports.MO.INTEGRAL,
        '\u22C0': exports.MO.OP,
        '\u22C1': exports.MO.OP,
        '\u22C2': exports.MO.OP,
        '\u22C3': exports.MO.OP,
        '\u2308': exports.MO.OPEN,
        '\u230A': exports.MO.OPEN,
        '\u2329': exports.MO.OPEN,
        '\u2772': exports.MO.OPEN,
        '\u27E6': exports.MO.OPEN,
        '\u27E8': exports.MO.OPEN,
        '\u27EA': exports.MO.OPEN,
        '\u27EC': exports.MO.OPEN,
        '\u27EE': exports.MO.OPEN,
        '\u2980': [0, 0, MmlNode_js_1.TEXCLASS.ORD, { fence: true, stretchy: true }],
        '\u2983': exports.MO.OPEN,
        '\u2985': exports.MO.OPEN,
        '\u2987': exports.MO.OPEN,
        '\u2989': exports.MO.OPEN,
        '\u298B': exports.MO.OPEN,
        '\u298D': exports.MO.OPEN,
        '\u298F': exports.MO.OPEN,
        '\u2991': exports.MO.OPEN,
        '\u2993': exports.MO.OPEN,
        '\u2995': exports.MO.OPEN,
        '\u2997': exports.MO.OPEN,
        '\u29FC': exports.MO.OPEN,
        '\u2A00': exports.MO.OP,
        '\u2A01': exports.MO.OP,
        '\u2A02': exports.MO.OP,
        '\u2A03': exports.MO.OP,
        '\u2A04': exports.MO.OP,
        '\u2A05': exports.MO.OP,
        '\u2A06': exports.MO.OP,
        '\u2A07': exports.MO.OP,
        '\u2A08': exports.MO.OP,
        '\u2A09': exports.MO.OP,
        '\u2A0A': exports.MO.OP,
        '\u2A0B': exports.MO.INTEGRAL2,
        '\u2A0C': exports.MO.INTEGRAL,
        '\u2A0D': exports.MO.INTEGRAL2,
        '\u2A0E': exports.MO.INTEGRAL2,
        '\u2A0F': exports.MO.INTEGRAL2,
        '\u2A10': exports.MO.OP,
        '\u2A11': exports.MO.OP,
        '\u2A12': exports.MO.OP,
        '\u2A13': exports.MO.OP,
        '\u2A14': exports.MO.OP,
        '\u2A15': exports.MO.INTEGRAL2,
        '\u2A16': exports.MO.INTEGRAL2,
        '\u2A17': exports.MO.INTEGRAL2,
        '\u2A18': exports.MO.INTEGRAL2,
        '\u2A19': exports.MO.INTEGRAL2,
        '\u2A1A': exports.MO.INTEGRAL2,
        '\u2A1B': exports.MO.INTEGRAL2,
        '\u2A1C': exports.MO.INTEGRAL2,
        '\u2AFC': exports.MO.OP,
        '\u2AFF': exports.MO.OP,
    },
    postfix: {
        '!!': OPDEF(1, 0),
        '!': [1, 0, MmlNode_js_1.TEXCLASS.CLOSE, null],
        '"': exports.MO.ACCENT,
        '&': exports.MO.ORD,
        ')': exports.MO.CLOSE,
        '++': OPDEF(0, 0),
        '--': OPDEF(0, 0),
        '..': OPDEF(0, 0),
        '...': exports.MO.ORD,
        '\'': exports.MO.ACCENT,
        ']': exports.MO.CLOSE,
        '^': exports.MO.WIDEACCENT,
        '_': exports.MO.WIDEACCENT,
        '`': exports.MO.ACCENT,
        '|': exports.MO.CLOSE,
        '}': exports.MO.CLOSE,
        '~': exports.MO.WIDEACCENT,
        '||': [0, 0, MmlNode_js_1.TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }],
        '|||': [0, 0, MmlNode_js_1.TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }],
        '\u00A8': exports.MO.ACCENT,
        '\u00AA': exports.MO.ACCENT,
        '\u00AF': exports.MO.WIDEACCENT,
        '\u00B0': exports.MO.ORD,
        '\u00B2': exports.MO.ACCENT,
        '\u00B3': exports.MO.ACCENT,
        '\u00B4': exports.MO.ACCENT,
        '\u00B8': exports.MO.ACCENT,
        '\u00B9': exports.MO.ACCENT,
        '\u00BA': exports.MO.ACCENT,
        '\u02C6': exports.MO.WIDEACCENT,
        '\u02C7': exports.MO.WIDEACCENT,
        '\u02C9': exports.MO.WIDEACCENT,
        '\u02CA': exports.MO.ACCENT,
        '\u02CB': exports.MO.ACCENT,
        '\u02CD': exports.MO.WIDEACCENT,
        '\u02D8': exports.MO.ACCENT,
        '\u02D9': exports.MO.ACCENT,
        '\u02DA': exports.MO.ACCENT,
        '\u02DC': exports.MO.WIDEACCENT,
        '\u02DD': exports.MO.ACCENT,
        '\u02F7': exports.MO.WIDEACCENT,
        '\u0302': exports.MO.WIDEACCENT,
        '\u0311': exports.MO.ACCENT,
        '\u03F6': exports.MO.REL,
        '\u2016': [0, 0, MmlNode_js_1.TEXCLASS.ORD, { fence: true, stretchy: true }],
        '\u2019': [0, 0, MmlNode_js_1.TEXCLASS.CLOSE, { fence: true }],
        '\u201A': exports.MO.ACCENT,
        '\u201B': exports.MO.ACCENT,
        '\u201D': [0, 0, MmlNode_js_1.TEXCLASS.CLOSE, { fence: true }],
        '\u201E': exports.MO.ACCENT,
        '\u201F': exports.MO.ACCENT,
        '\u2032': exports.MO.ORD,
        '\u2033': exports.MO.ACCENT,
        '\u2034': exports.MO.ACCENT,
        '\u2035': exports.MO.ACCENT,
        '\u2036': exports.MO.ACCENT,
        '\u2037': exports.MO.ACCENT,
        '\u203E': exports.MO.WIDEACCENT,
        '\u2057': exports.MO.ACCENT,
        '\u20DB': exports.MO.ACCENT,
        '\u20DC': exports.MO.ACCENT,
        '\u2309': exports.MO.CLOSE,
        '\u230B': exports.MO.CLOSE,
        '\u232A': exports.MO.CLOSE,
        '\u23B4': exports.MO.WIDEACCENT,
        '\u23B5': exports.MO.WIDEACCENT,
        '\u23DC': exports.MO.WIDEACCENT,
        '\u23DD': exports.MO.WIDEACCENT,
        '\u23DE': exports.MO.WIDEACCENT,
        '\u23DF': exports.MO.WIDEACCENT,
        '\u23E0': exports.MO.WIDEACCENT,
        '\u23E1': exports.MO.WIDEACCENT,
        '\u25A0': exports.MO.BIN3,
        '\u25A1': exports.MO.BIN3,
        '\u25AA': exports.MO.BIN3,
        '\u25AB': exports.MO.BIN3,
        '\u25AD': exports.MO.BIN3,
        '\u25AE': exports.MO.BIN3,
        '\u25AF': exports.MO.BIN3,
        '\u25B0': exports.MO.BIN3,
        '\u25B1': exports.MO.BIN3,
        '\u25B2': exports.MO.BIN4,
        '\u25B4': exports.MO.BIN4,
        '\u25B6': exports.MO.BIN4,
        '\u25B7': exports.MO.BIN4,
        '\u25B8': exports.MO.BIN4,
        '\u25BC': exports.MO.BIN4,
        '\u25BE': exports.MO.BIN4,
        '\u25C0': exports.MO.BIN4,
        '\u25C1': exports.MO.BIN4,
        '\u25C2': exports.MO.BIN4,
        '\u25C4': exports.MO.BIN4,
        '\u25C5': exports.MO.BIN4,
        '\u25C6': exports.MO.BIN4,
        '\u25C7': exports.MO.BIN4,
        '\u25C8': exports.MO.BIN4,
        '\u25C9': exports.MO.BIN4,
        '\u25CC': exports.MO.BIN4,
        '\u25CD': exports.MO.BIN4,
        '\u25CE': exports.MO.BIN4,
        '\u25CF': exports.MO.BIN4,
        '\u25D6': exports.MO.BIN4,
        '\u25D7': exports.MO.BIN4,
        '\u25E6': exports.MO.BIN4,
        '\u266D': exports.MO.ORD02,
        '\u266E': exports.MO.ORD02,
        '\u266F': exports.MO.ORD02,
        '\u2773': exports.MO.CLOSE,
        '\u27E7': exports.MO.CLOSE,
        '\u27E9': exports.MO.CLOSE,
        '\u27EB': exports.MO.CLOSE,
        '\u27ED': exports.MO.CLOSE,
        '\u27EF': exports.MO.CLOSE,
        '\u2980': [0, 0, MmlNode_js_1.TEXCLASS.ORD, { fence: true, stretchy: true }],
        '\u2984': exports.MO.CLOSE,
        '\u2986': exports.MO.CLOSE,
        '\u2988': exports.MO.CLOSE,
        '\u298A': exports.MO.CLOSE,
        '\u298C': exports.MO.CLOSE,
        '\u298E': exports.MO.CLOSE,
        '\u2990': exports.MO.CLOSE,
        '\u2992': exports.MO.CLOSE,
        '\u2994': exports.MO.CLOSE,
        '\u2996': exports.MO.CLOSE,
        '\u2998': exports.MO.CLOSE,
        '\u29FD': exports.MO.CLOSE,
    },
    infix: {
        '!=': exports.MO.BIN4,
        '#': exports.MO.ORD,
        '$': exports.MO.ORD,
        '%': [3, 3, MmlNode_js_1.TEXCLASS.ORD, null],
        '&&': exports.MO.BIN4,
        '': exports.MO.ORD,
        '*': exports.MO.BIN3,
        '**': OPDEF(1, 1),
        '*=': exports.MO.BIN4,
        '+': exports.MO.BIN4,
        '+=': exports.MO.BIN4,
        ',': [0, 3, MmlNode_js_1.TEXCLASS.PUNCT, { linebreakstyle: 'after', separator: true }],
        '-': exports.MO.BIN4,
        '-=': exports.MO.BIN4,
        '->': exports.MO.BIN5,
        '.': [0, 3, MmlNode_js_1.TEXCLASS.PUNCT, { separator: true }],
        '/': exports.MO.ORD11,
        '//': OPDEF(1, 1),
        '/=': exports.MO.BIN4,
        ':': [1, 2, MmlNode_js_1.TEXCLASS.REL, null],
        ':=': exports.MO.BIN4,
        ';': [0, 3, MmlNode_js_1.TEXCLASS.PUNCT, { linebreakstyle: 'after', separator: true }],
        '<': exports.MO.REL,
        '<=': exports.MO.BIN5,
        '<>': OPDEF(1, 1),
        '=': exports.MO.REL,
        '==': exports.MO.BIN4,
        '>': exports.MO.REL,
        '>=': exports.MO.BIN5,
        '?': [1, 1, MmlNode_js_1.TEXCLASS.CLOSE, null],
        '@': exports.MO.ORD11,
        '\\': exports.MO.ORD,
        '^': exports.MO.ORD11,
        '_': exports.MO.ORD11,
        '|': [2, 2, MmlNode_js_1.TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }],
        '||': [2, 2, MmlNode_js_1.TEXCLASS.BIN, { fence: true, stretchy: true, symmetric: true }],
        '|||': [2, 2, MmlNode_js_1.TEXCLASS.ORD, { fence: true, stretchy: true, symmetric: true }],
        '\u00B1': exports.MO.BIN4,
        '\u00B7': exports.MO.BIN4,
        '\u00D7': exports.MO.BIN4,
        '\u00F7': exports.MO.BIN4,
        '\u02B9': exports.MO.ORD,
        '\u0300': exports.MO.ACCENT,
        '\u0301': exports.MO.ACCENT,
        '\u0303': exports.MO.WIDEACCENT,
        '\u0304': exports.MO.ACCENT,
        '\u0306': exports.MO.ACCENT,
        '\u0307': exports.MO.ACCENT,
        '\u0308': exports.MO.ACCENT,
        '\u030C': exports.MO.ACCENT,
        '\u0332': exports.MO.WIDEACCENT,
        '\u0338': exports.MO.REL4,
        '\u2015': [0, 0, MmlNode_js_1.TEXCLASS.ORD, { stretchy: true }],
        '\u2017': [0, 0, MmlNode_js_1.TEXCLASS.ORD, { stretchy: true }],
        '\u2020': exports.MO.BIN3,
        '\u2021': exports.MO.BIN3,
        '\u2022': exports.MO.BIN4,
        '\u2026': exports.MO.INNER,
        '\u2043': exports.MO.BIN4,
        '\u2044': exports.MO.TALLBIN,
        '\u2061': exports.MO.NONE,
        '\u2062': exports.MO.NONE,
        '\u2063': [0, 0, MmlNode_js_1.TEXCLASS.NONE, { linebreakstyle: 'after', separator: true }],
        '\u2064': exports.MO.NONE,
        '\u20D7': exports.MO.ACCENT,
        '\u2111': exports.MO.ORD,
        '\u2113': exports.MO.ORD,
        '\u2118': exports.MO.ORD,
        '\u211C': exports.MO.ORD,
        '\u2190': exports.MO.WIDEREL,
        '\u2191': exports.MO.RELSTRETCH,
        '\u2192': exports.MO.WIDEREL,
        '\u2193': exports.MO.RELSTRETCH,
        '\u2194': exports.MO.WIDEREL,
        '\u2195': exports.MO.RELSTRETCH,
        '\u2196': exports.MO.RELSTRETCH,
        '\u2197': exports.MO.RELSTRETCH,
        '\u2198': exports.MO.RELSTRETCH,
        '\u2199': exports.MO.RELSTRETCH,
        '\u219A': exports.MO.RELACCENT,
        '\u219B': exports.MO.RELACCENT,
        '\u219C': exports.MO.WIDEREL,
        '\u219D': exports.MO.WIDEREL,
        '\u219E': exports.MO.WIDEREL,
        '\u219F': exports.MO.WIDEREL,
        '\u21A0': exports.MO.WIDEREL,
        '\u21A1': exports.MO.RELSTRETCH,
        '\u21A2': exports.MO.WIDEREL,
        '\u21A3': exports.MO.WIDEREL,
        '\u21A4': exports.MO.WIDEREL,
        '\u21A5': exports.MO.RELSTRETCH,
        '\u21A6': exports.MO.WIDEREL,
        '\u21A7': exports.MO.RELSTRETCH,
        '\u21A8': exports.MO.RELSTRETCH,
        '\u21A9': exports.MO.WIDEREL,
        '\u21AA': exports.MO.WIDEREL,
        '\u21AB': exports.MO.WIDEREL,
        '\u21AC': exports.MO.WIDEREL,
        '\u21AD': exports.MO.WIDEREL,
        '\u21AE': exports.MO.RELACCENT,
        '\u21AF': exports.MO.RELSTRETCH,
        '\u21B0': exports.MO.RELSTRETCH,
        '\u21B1': exports.MO.RELSTRETCH,
        '\u21B2': exports.MO.RELSTRETCH,
        '\u21B3': exports.MO.RELSTRETCH,
        '\u21B4': exports.MO.RELSTRETCH,
        '\u21B5': exports.MO.RELSTRETCH,
        '\u21B6': exports.MO.RELACCENT,
        '\u21B7': exports.MO.RELACCENT,
        '\u21B8': exports.MO.REL,
        '\u21B9': exports.MO.WIDEREL,
        '\u21BA': exports.MO.REL,
        '\u21BB': exports.MO.REL,
        '\u21BC': exports.MO.WIDEREL,
        '\u21BD': exports.MO.WIDEREL,
        '\u21BE': exports.MO.RELSTRETCH,
        '\u21BF': exports.MO.RELSTRETCH,
        '\u21C0': exports.MO.WIDEREL,
        '\u21C1': exports.MO.WIDEREL,
        '\u21C2': exports.MO.RELSTRETCH,
        '\u21C3': exports.MO.RELSTRETCH,
        '\u21C4': exports.MO.WIDEREL,
        '\u21C5': exports.MO.RELSTRETCH,
        '\u21C6': exports.MO.WIDEREL,
        '\u21C7': exports.MO.WIDEREL,
        '\u21C8': exports.MO.RELSTRETCH,
        '\u21C9': exports.MO.WIDEREL,
        '\u21CA': exports.MO.RELSTRETCH,
        '\u21CB': exports.MO.WIDEREL,
        '\u21CC': exports.MO.WIDEREL,
        '\u21CD': exports.MO.RELACCENT,
        '\u21CE': exports.MO.RELACCENT,
        '\u21CF': exports.MO.RELACCENT,
        '\u21D0': exports.MO.WIDEREL,
        '\u21D1': exports.MO.RELSTRETCH,
        '\u21D2': exports.MO.WIDEREL,
        '\u21D3': exports.MO.RELSTRETCH,
        '\u21D4': exports.MO.WIDEREL,
        '\u21D5': exports.MO.RELSTRETCH,
        '\u21D6': exports.MO.RELSTRETCH,
        '\u21D7': exports.MO.RELSTRETCH,
        '\u21D8': exports.MO.RELSTRETCH,
        '\u21D9': exports.MO.RELSTRETCH,
        '\u21DA': exports.MO.WIDEREL,
        '\u21DB': exports.MO.WIDEREL,
        '\u21DC': exports.MO.WIDEREL,
        '\u21DD': exports.MO.WIDEREL,
        '\u21DE': exports.MO.REL,
        '\u21DF': exports.MO.REL,
        '\u21E0': exports.MO.WIDEREL,
        '\u21E1': exports.MO.RELSTRETCH,
        '\u21E2': exports.MO.WIDEREL,
        '\u21E3': exports.MO.RELSTRETCH,
        '\u21E4': exports.MO.WIDEREL,
        '\u21E5': exports.MO.WIDEREL,
        '\u21E6': exports.MO.WIDEREL,
        '\u21E7': exports.MO.RELSTRETCH,
        '\u21E8': exports.MO.WIDEREL,
        '\u21E9': exports.MO.RELSTRETCH,
        '\u21EA': exports.MO.RELSTRETCH,
        '\u21EB': exports.MO.RELSTRETCH,
        '\u21EC': exports.MO.RELSTRETCH,
        '\u21ED': exports.MO.RELSTRETCH,
        '\u21EE': exports.MO.RELSTRETCH,
        '\u21EF': exports.MO.RELSTRETCH,
        '\u21F0': exports.MO.WIDEREL,
        '\u21F1': exports.MO.REL,
        '\u21F2': exports.MO.REL,
        '\u21F3': exports.MO.RELSTRETCH,
        '\u21F4': exports.MO.RELACCENT,
        '\u21F5': exports.MO.RELSTRETCH,
        '\u21F6': exports.MO.WIDEREL,
        '\u21F7': exports.MO.RELACCENT,
        '\u21F8': exports.MO.RELACCENT,
        '\u21F9': exports.MO.RELACCENT,
        '\u21FA': exports.MO.RELACCENT,
        '\u21FB': exports.MO.RELACCENT,
        '\u21FC': exports.MO.RELACCENT,
        '\u21FD': exports.MO.WIDEREL,
        '\u21FE': exports.MO.WIDEREL,
        '\u21FF': exports.MO.WIDEREL,
        '\u2201': OPDEF(1, 2, MmlNode_js_1.TEXCLASS.ORD),
        '\u2205': exports.MO.ORD,
        '\u2206': exports.MO.BIN3,
        '\u2208': exports.MO.REL,
        '\u2209': exports.MO.REL,
        '\u220A': exports.MO.REL,
        '\u220B': exports.MO.REL,
        '\u220C': exports.MO.REL,
        '\u220D': exports.MO.REL,
        '\u220E': exports.MO.BIN3,
        '\u2212': exports.MO.BIN4,
        '\u2213': exports.MO.BIN4,
        '\u2214': exports.MO.BIN4,
        '\u2215': exports.MO.TALLBIN,
        '\u2216': exports.MO.BIN4,
        '\u2217': exports.MO.BIN4,
        '\u2218': exports.MO.BIN4,
        '\u2219': exports.MO.BIN4,
        '\u221D': exports.MO.REL,
        '\u221E': exports.MO.ORD,
        '\u221F': exports.MO.REL,
        '\u2223': exports.MO.REL,
        '\u2224': exports.MO.REL,
        '\u2225': exports.MO.REL,
        '\u2226': exports.MO.REL,
        '\u2227': exports.MO.BIN4,
        '\u2228': exports.MO.BIN4,
        '\u2229': exports.MO.BIN4,
        '\u222A': exports.MO.BIN4,
        '\u2234': exports.MO.REL,
        '\u2235': exports.MO.REL,
        '\u2236': exports.MO.REL,
        '\u2237': exports.MO.REL,
        '\u2238': exports.MO.BIN4,
        '\u2239': exports.MO.REL,
        '\u223A': exports.MO.BIN4,
        '\u223B': exports.MO.REL,
        '\u223C': exports.MO.REL,
        '\u223D': exports.MO.REL,
        '\u223D\u0331': exports.MO.BIN3,
        '\u223E': exports.MO.REL,
        '\u223F': exports.MO.BIN3,
        '\u2240': exports.MO.BIN4,
        '\u2241': exports.MO.REL,
        '\u2242': exports.MO.REL,
        '\u2242\u0338': exports.MO.REL,
        '\u2243': exports.MO.REL,
        '\u2244': exports.MO.REL,
        '\u2245': exports.MO.REL,
        '\u2246': exports.MO.REL,
        '\u2247': exports.MO.REL,
        '\u2248': exports.MO.REL,
        '\u2249': exports.MO.REL,
        '\u224A': exports.MO.REL,
        '\u224B': exports.MO.REL,
        '\u224C': exports.MO.REL,
        '\u224D': exports.MO.REL,
        '\u224E': exports.MO.REL,
        '\u224E\u0338': exports.MO.REL,
        '\u224F': exports.MO.REL,
        '\u224F\u0338': exports.MO.REL,
        '\u2250': exports.MO.REL,
        '\u2251': exports.MO.REL,
        '\u2252': exports.MO.REL,
        '\u2253': exports.MO.REL,
        '\u2254': exports.MO.REL,
        '\u2255': exports.MO.REL,
        '\u2256': exports.MO.REL,
        '\u2257': exports.MO.REL,
        '\u2258': exports.MO.REL,
        '\u2259': exports.MO.REL,
        '\u225A': exports.MO.REL,
        '\u225B': exports.MO.REL,
        '\u225C': exports.MO.REL,
        '\u225D': exports.MO.REL,
        '\u225E': exports.MO.REL,
        '\u225F': exports.MO.REL,
        '\u2260': exports.MO.REL,
        '\u2261': exports.MO.REL,
        '\u2262': exports.MO.REL,
        '\u2263': exports.MO.REL,
        '\u2264': exports.MO.REL,
        '\u2265': exports.MO.REL,
        '\u2266': exports.MO.REL,
        '\u2266\u0338': exports.MO.REL,
        '\u2267': exports.MO.REL,
        '\u2268': exports.MO.REL,
        '\u2269': exports.MO.REL,
        '\u226A': exports.MO.REL,
        '\u226A\u0338': exports.MO.REL,
        '\u226B': exports.MO.REL,
        '\u226B\u0338': exports.MO.REL,
        '\u226C': exports.MO.REL,
        '\u226D': exports.MO.REL,
        '\u226E': exports.MO.REL,
        '\u226F': exports.MO.REL,
        '\u2270': exports.MO.REL,
        '\u2271': exports.MO.REL,
        '\u2272': exports.MO.REL,
        '\u2273': exports.MO.REL,
        '\u2274': exports.MO.REL,
        '\u2275': exports.MO.REL,
        '\u2276': exports.MO.REL,
        '\u2277': exports.MO.REL,
        '\u2278': exports.MO.REL,
        '\u2279': exports.MO.REL,
        '\u227A': exports.MO.REL,
        '\u227B': exports.MO.REL,
        '\u227C': exports.MO.REL,
        '\u227D': exports.MO.REL,
        '\u227E': exports.MO.REL,
        '\u227F': exports.MO.REL,
        '\u227F\u0338': exports.MO.REL,
        '\u2280': exports.MO.REL,
        '\u2281': exports.MO.REL,
        '\u2282': exports.MO.REL,
        '\u2282\u20D2': exports.MO.REL,
        '\u2283': exports.MO.REL,
        '\u2283\u20D2': exports.MO.REL,
        '\u2284': exports.MO.REL,
        '\u2285': exports.MO.REL,
        '\u2286': exports.MO.REL,
        '\u2287': exports.MO.REL,
        '\u2288': exports.MO.REL,
        '\u2289': exports.MO.REL,
        '\u228A': exports.MO.REL,
        '\u228B': exports.MO.REL,
        '\u228C': exports.MO.BIN4,
        '\u228D': exports.MO.BIN4,
        '\u228E': exports.MO.BIN4,
        '\u228F': exports.MO.REL,
        '\u228F\u0338': exports.MO.REL,
        '\u2290': exports.MO.REL,
        '\u2290\u0338': exports.MO.REL,
        '\u2291': exports.MO.REL,
        '\u2292': exports.MO.REL,
        '\u2293': exports.MO.BIN4,
        '\u2294': exports.MO.BIN4,
        '\u2295': exports.MO.BIN4,
        '\u2296': exports.MO.BIN4,
        '\u2297': exports.MO.BIN4,
        '\u2298': exports.MO.BIN4,
        '\u2299': exports.MO.BIN4,
        '\u229A': exports.MO.BIN4,
        '\u229B': exports.MO.BIN4,
        '\u229C': exports.MO.BIN4,
        '\u229D': exports.MO.BIN4,
        '\u229E': exports.MO.BIN4,
        '\u229F': exports.MO.BIN4,
        '\u22A0': exports.MO.BIN4,
        '\u22A1': exports.MO.BIN4,
        '\u22A2': exports.MO.REL,
        '\u22A3': exports.MO.REL,
        '\u22A4': exports.MO.ORD55,
        '\u22A5': exports.MO.REL,
        '\u22A6': exports.MO.REL,
        '\u22A7': exports.MO.REL,
        '\u22A8': exports.MO.REL,
        '\u22A9': exports.MO.REL,
        '\u22AA': exports.MO.REL,
        '\u22AB': exports.MO.REL,
        '\u22AC': exports.MO.REL,
        '\u22AD': exports.MO.REL,
        '\u22AE': exports.MO.REL,
        '\u22AF': exports.MO.REL,
        '\u22B0': exports.MO.REL,
        '\u22B1': exports.MO.REL,
        '\u22B2': exports.MO.REL,
        '\u22B3': exports.MO.REL,
        '\u22B4': exports.MO.REL,
        '\u22B5': exports.MO.REL,
        '\u22B6': exports.MO.REL,
        '\u22B7': exports.MO.REL,
        '\u22B8': exports.MO.REL,
        '\u22B9': exports.MO.REL,
        '\u22BA': exports.MO.BIN4,
        '\u22BB': exports.MO.BIN4,
        '\u22BC': exports.MO.BIN4,
        '\u22BD': exports.MO.BIN4,
        '\u22BE': exports.MO.BIN3,
        '\u22BF': exports.MO.BIN3,
        '\u22C4': exports.MO.BIN4,
        '\u22C5': exports.MO.BIN4,
        '\u22C6': exports.MO.BIN4,
        '\u22C7': exports.MO.BIN4,
        '\u22C8': exports.MO.REL,
        '\u22C9': exports.MO.BIN4,
        '\u22CA': exports.MO.BIN4,
        '\u22CB': exports.MO.BIN4,
        '\u22CC': exports.MO.BIN4,
        '\u22CD': exports.MO.REL,
        '\u22CE': exports.MO.BIN4,
        '\u22CF': exports.MO.BIN4,
        '\u22D0': exports.MO.REL,
        '\u22D1': exports.MO.REL,
        '\u22D2': exports.MO.BIN4,
        '\u22D3': exports.MO.BIN4,
        '\u22D4': exports.MO.REL,
        '\u22D5': exports.MO.REL,
        '\u22D6': exports.MO.REL,
        '\u22D7': exports.MO.REL,
        '\u22D8': exports.MO.REL,
        '\u22D9': exports.MO.REL,
        '\u22DA': exports.MO.REL,
        '\u22DB': exports.MO.REL,
        '\u22DC': exports.MO.REL,
        '\u22DD': exports.MO.REL,
        '\u22DE': exports.MO.REL,
        '\u22DF': exports.MO.REL,
        '\u22E0': exports.MO.REL,
        '\u22E1': exports.MO.REL,
        '\u22E2': exports.MO.REL,
        '\u22E3': exports.MO.REL,
        '\u22E4': exports.MO.REL,
        '\u22E5': exports.MO.REL,
        '\u22E6': exports.MO.REL,
        '\u22E7': exports.MO.REL,
        '\u22E8': exports.MO.REL,
        '\u22E9': exports.MO.REL,
        '\u22EA': exports.MO.REL,
        '\u22EB': exports.MO.REL,
        '\u22EC': exports.MO.REL,
        '\u22ED': exports.MO.REL,
        '\u22EE': exports.MO.ORD55,
        '\u22EF': exports.MO.INNER,
        '\u22F0': exports.MO.REL,
        '\u22F1': [5, 5, MmlNode_js_1.TEXCLASS.INNER, null],
        '\u22F2': exports.MO.REL,
        '\u22F3': exports.MO.REL,
        '\u22F4': exports.MO.REL,
        '\u22F5': exports.MO.REL,
        '\u22F6': exports.MO.REL,
        '\u22F7': exports.MO.REL,
        '\u22F8': exports.MO.REL,
        '\u22F9': exports.MO.REL,
        '\u22FA': exports.MO.REL,
        '\u22FB': exports.MO.REL,
        '\u22FC': exports.MO.REL,
        '\u22FD': exports.MO.REL,
        '\u22FE': exports.MO.REL,
        '\u22FF': exports.MO.REL,
        '\u2305': exports.MO.BIN3,
        '\u2306': exports.MO.BIN3,
        '\u2322': exports.MO.REL4,
        '\u2323': exports.MO.REL4,
        '\u2329': exports.MO.OPEN,
        '\u232A': exports.MO.CLOSE,
        '\u23AA': exports.MO.ORD,
        '\u23AF': [0, 0, MmlNode_js_1.TEXCLASS.ORD, { stretchy: true }],
        '\u23B0': exports.MO.OPEN,
        '\u23B1': exports.MO.CLOSE,
        '\u2500': exports.MO.ORD,
        '\u25B3': exports.MO.BIN4,
        '\u25B5': exports.MO.BIN4,
        '\u25B9': exports.MO.BIN4,
        '\u25BD': exports.MO.BIN4,
        '\u25BF': exports.MO.BIN4,
        '\u25C3': exports.MO.BIN4,
        '\u25EF': exports.MO.BIN3,
        '\u2660': exports.MO.ORD,
        '\u2661': exports.MO.ORD,
        '\u2662': exports.MO.ORD,
        '\u2663': exports.MO.ORD,
        '\u2758': exports.MO.REL,
        '\u27F0': exports.MO.RELSTRETCH,
        '\u27F1': exports.MO.RELSTRETCH,
        '\u27F5': exports.MO.WIDEREL,
        '\u27F6': exports.MO.WIDEREL,
        '\u27F7': exports.MO.WIDEREL,
        '\u27F8': exports.MO.WIDEREL,
        '\u27F9': exports.MO.WIDEREL,
        '\u27FA': exports.MO.WIDEREL,
        '\u27FB': exports.MO.WIDEREL,
        '\u27FC': exports.MO.WIDEREL,
        '\u27FD': exports.MO.WIDEREL,
        '\u27FE': exports.MO.WIDEREL,
        '\u27FF': exports.MO.WIDEREL,
        '\u2900': exports.MO.RELACCENT,
        '\u2901': exports.MO.RELACCENT,
        '\u2902': exports.MO.RELACCENT,
        '\u2903': exports.MO.RELACCENT,
        '\u2904': exports.MO.RELACCENT,
        '\u2905': exports.MO.RELACCENT,
        '\u2906': exports.MO.RELACCENT,
        '\u2907': exports.MO.RELACCENT,
        '\u2908': exports.MO.REL,
        '\u2909': exports.MO.REL,
        '\u290A': exports.MO.RELSTRETCH,
        '\u290B': exports.MO.RELSTRETCH,
        '\u290C': exports.MO.WIDEREL,
        '\u290D': exports.MO.WIDEREL,
        '\u290E': exports.MO.WIDEREL,
        '\u290F': exports.MO.WIDEREL,
        '\u2910': exports.MO.WIDEREL,
        '\u2911': exports.MO.RELACCENT,
        '\u2912': exports.MO.RELSTRETCH,
        '\u2913': exports.MO.RELSTRETCH,
        '\u2914': exports.MO.RELACCENT,
        '\u2915': exports.MO.RELACCENT,
        '\u2916': exports.MO.RELACCENT,
        '\u2917': exports.MO.RELACCENT,
        '\u2918': exports.MO.RELACCENT,
        '\u2919': exports.MO.RELACCENT,
        '\u291A': exports.MO.RELACCENT,
        '\u291B': exports.MO.RELACCENT,
        '\u291C': exports.MO.RELACCENT,
        '\u291D': exports.MO.RELACCENT,
        '\u291E': exports.MO.RELACCENT,
        '\u291F': exports.MO.RELACCENT,
        '\u2920': exports.MO.RELACCENT,
        '\u2921': exports.MO.RELSTRETCH,
        '\u2922': exports.MO.RELSTRETCH,
        '\u2923': exports.MO.REL,
        '\u2924': exports.MO.REL,
        '\u2925': exports.MO.REL,
        '\u2926': exports.MO.REL,
        '\u2927': exports.MO.REL,
        '\u2928': exports.MO.REL,
        '\u2929': exports.MO.REL,
        '\u292A': exports.MO.REL,
        '\u292B': exports.MO.REL,
        '\u292C': exports.MO.REL,
        '\u292D': exports.MO.REL,
        '\u292E': exports.MO.REL,
        '\u292F': exports.MO.REL,
        '\u2930': exports.MO.REL,
        '\u2931': exports.MO.REL,
        '\u2932': exports.MO.REL,
        '\u2933': exports.MO.RELACCENT,
        '\u2934': exports.MO.REL,
        '\u2935': exports.MO.REL,
        '\u2936': exports.MO.REL,
        '\u2937': exports.MO.REL,
        '\u2938': exports.MO.REL,
        '\u2939': exports.MO.REL,
        '\u293A': exports.MO.RELACCENT,
        '\u293B': exports.MO.RELACCENT,
        '\u293C': exports.MO.RELACCENT,
        '\u293D': exports.MO.RELACCENT,
        '\u293E': exports.MO.REL,
        '\u293F': exports.MO.REL,
        '\u2940': exports.MO.REL,
        '\u2941': exports.MO.REL,
        '\u2942': exports.MO.RELACCENT,
        '\u2943': exports.MO.RELACCENT,
        '\u2944': exports.MO.RELACCENT,
        '\u2945': exports.MO.RELACCENT,
        '\u2946': exports.MO.RELACCENT,
        '\u2947': exports.MO.RELACCENT,
        '\u2948': exports.MO.RELACCENT,
        '\u2949': exports.MO.REL,
        '\u294A': exports.MO.RELACCENT,
        '\u294B': exports.MO.RELACCENT,
        '\u294C': exports.MO.REL,
        '\u294D': exports.MO.REL,
        '\u294E': exports.MO.WIDEREL,
        '\u294F': exports.MO.RELSTRETCH,
        '\u2950': exports.MO.WIDEREL,
        '\u2951': exports.MO.RELSTRETCH,
        '\u2952': exports.MO.WIDEREL,
        '\u2953': exports.MO.WIDEREL,
        '\u2954': exports.MO.RELSTRETCH,
        '\u2955': exports.MO.RELSTRETCH,
        '\u2956': exports.MO.RELSTRETCH,
        '\u2957': exports.MO.RELSTRETCH,
        '\u2958': exports.MO.RELSTRETCH,
        '\u2959': exports.MO.RELSTRETCH,
        '\u295A': exports.MO.WIDEREL,
        '\u295B': exports.MO.WIDEREL,
        '\u295C': exports.MO.RELSTRETCH,
        '\u295D': exports.MO.RELSTRETCH,
        '\u295E': exports.MO.WIDEREL,
        '\u295F': exports.MO.WIDEREL,
        '\u2960': exports.MO.RELSTRETCH,
        '\u2961': exports.MO.RELSTRETCH,
        '\u2962': exports.MO.RELACCENT,
        '\u2963': exports.MO.REL,
        '\u2964': exports.MO.RELACCENT,
        '\u2965': exports.MO.REL,
        '\u2966': exports.MO.RELACCENT,
        '\u2967': exports.MO.RELACCENT,
        '\u2968': exports.MO.RELACCENT,
        '\u2969': exports.MO.RELACCENT,
        '\u296A': exports.MO.RELACCENT,
        '\u296B': exports.MO.RELACCENT,
        '\u296C': exports.MO.RELACCENT,
        '\u296D': exports.MO.RELACCENT,
        '\u296E': exports.MO.RELSTRETCH,
        '\u296F': exports.MO.RELSTRETCH,
        '\u2970': exports.MO.RELACCENT,
        '\u2971': exports.MO.RELACCENT,
        '\u2972': exports.MO.RELACCENT,
        '\u2973': exports.MO.RELACCENT,
        '\u2974': exports.MO.RELACCENT,
        '\u2975': exports.MO.RELACCENT,
        '\u2976': exports.MO.RELACCENT,
        '\u2977': exports.MO.RELACCENT,
        '\u2978': exports.MO.RELACCENT,
        '\u2979': exports.MO.RELACCENT,
        '\u297A': exports.MO.RELACCENT,
        '\u297B': exports.MO.RELACCENT,
        '\u297C': exports.MO.RELACCENT,
        '\u297D': exports.MO.RELACCENT,
        '\u297E': exports.MO.REL,
        '\u297F': exports.MO.REL,
        '\u2981': exports.MO.BIN3,
        '\u2982': exports.MO.BIN3,
        '\u2999': exports.MO.BIN3,
        '\u299A': exports.MO.BIN3,
        '\u299B': exports.MO.BIN3,
        '\u299C': exports.MO.BIN3,
        '\u299D': exports.MO.BIN3,
        '\u299E': exports.MO.BIN3,
        '\u299F': exports.MO.BIN3,
        '\u29A0': exports.MO.BIN3,
        '\u29A1': exports.MO.BIN3,
        '\u29A2': exports.MO.BIN3,
        '\u29A3': exports.MO.BIN3,
        '\u29A4': exports.MO.BIN3,
        '\u29A5': exports.MO.BIN3,
        '\u29A6': exports.MO.BIN3,
        '\u29A7': exports.MO.BIN3,
        '\u29A8': exports.MO.BIN3,
        '\u29A9': exports.MO.BIN3,
        '\u29AA': exports.MO.BIN3,
        '\u29AB': exports.MO.BIN3,
        '\u29AC': exports.MO.BIN3,
        '\u29AD': exports.MO.BIN3,
        '\u29AE': exports.MO.BIN3,
        '\u29AF': exports.MO.BIN3,
        '\u29B0': exports.MO.BIN3,
        '\u29B1': exports.MO.BIN3,
        '\u29B2': exports.MO.BIN3,
        '\u29B3': exports.MO.BIN3,
        '\u29B4': exports.MO.BIN3,
        '\u29B5': exports.MO.BIN3,
        '\u29B6': exports.MO.BIN4,
        '\u29B7': exports.MO.BIN4,
        '\u29B8': exports.MO.BIN4,
        '\u29B9': exports.MO.BIN4,
        '\u29BA': exports.MO.BIN4,
        '\u29BB': exports.MO.BIN4,
        '\u29BC': exports.MO.BIN4,
        '\u29BD': exports.MO.BIN4,
        '\u29BE': exports.MO.BIN4,
        '\u29BF': exports.MO.BIN4,
        '\u29C0': exports.MO.REL,
        '\u29C1': exports.MO.REL,
        '\u29C2': exports.MO.BIN3,
        '\u29C3': exports.MO.BIN3,
        '\u29C4': exports.MO.BIN4,
        '\u29C5': exports.MO.BIN4,
        '\u29C6': exports.MO.BIN4,
        '\u29C7': exports.MO.BIN4,
        '\u29C8': exports.MO.BIN4,
        '\u29C9': exports.MO.BIN3,
        '\u29CA': exports.MO.BIN3,
        '\u29CB': exports.MO.BIN3,
        '\u29CC': exports.MO.BIN3,
        '\u29CD': exports.MO.BIN3,
        '\u29CE': exports.MO.REL,
        '\u29CF': exports.MO.REL,
        '\u29CF\u0338': exports.MO.REL,
        '\u29D0': exports.MO.REL,
        '\u29D0\u0338': exports.MO.REL,
        '\u29D1': exports.MO.REL,
        '\u29D2': exports.MO.REL,
        '\u29D3': exports.MO.REL,
        '\u29D4': exports.MO.REL,
        '\u29D5': exports.MO.REL,
        '\u29D6': exports.MO.BIN4,
        '\u29D7': exports.MO.BIN4,
        '\u29D8': exports.MO.BIN3,
        '\u29D9': exports.MO.BIN3,
        '\u29DB': exports.MO.BIN3,
        '\u29DC': exports.MO.BIN3,
        '\u29DD': exports.MO.BIN3,
        '\u29DE': exports.MO.REL,
        '\u29DF': exports.MO.BIN3,
        '\u29E0': exports.MO.BIN3,
        '\u29E1': exports.MO.REL,
        '\u29E2': exports.MO.BIN4,
        '\u29E3': exports.MO.REL,
        '\u29E4': exports.MO.REL,
        '\u29E5': exports.MO.REL,
        '\u29E6': exports.MO.REL,
        '\u29E7': exports.MO.BIN3,
        '\u29E8': exports.MO.BIN3,
        '\u29E9': exports.MO.BIN3,
        '\u29EA': exports.MO.BIN3,
        '\u29EB': exports.MO.BIN3,
        '\u29EC': exports.MO.BIN3,
        '\u29ED': exports.MO.BIN3,
        '\u29EE': exports.MO.BIN3,
        '\u29EF': exports.MO.BIN3,
        '\u29F0': exports.MO.BIN3,
        '\u29F1': exports.MO.BIN3,
        '\u29F2': exports.MO.BIN3,
        '\u29F3': exports.MO.BIN3,
        '\u29F4': exports.MO.REL,
        '\u29F5': exports.MO.BIN4,
        '\u29F6': exports.MO.BIN4,
        '\u29F7': exports.MO.BIN4,
        '\u29F8': exports.MO.BIN3,
        '\u29F9': exports.MO.BIN3,
        '\u29FA': exports.MO.BIN3,
        '\u29FB': exports.MO.BIN3,
        '\u29FE': exports.MO.BIN4,
        '\u29FF': exports.MO.BIN4,
        '\u2A1D': exports.MO.BIN3,
        '\u2A1E': exports.MO.BIN3,
        '\u2A1F': exports.MO.BIN3,
        '\u2A20': exports.MO.BIN3,
        '\u2A21': exports.MO.BIN3,
        '\u2A22': exports.MO.BIN4,
        '\u2A23': exports.MO.BIN4,
        '\u2A24': exports.MO.BIN4,
        '\u2A25': exports.MO.BIN4,
        '\u2A26': exports.MO.BIN4,
        '\u2A27': exports.MO.BIN4,
        '\u2A28': exports.MO.BIN4,
        '\u2A29': exports.MO.BIN4,
        '\u2A2A': exports.MO.BIN4,
        '\u2A2B': exports.MO.BIN4,
        '\u2A2C': exports.MO.BIN4,
        '\u2A2D': exports.MO.BIN4,
        '\u2A2E': exports.MO.BIN4,
        '\u2A2F': exports.MO.BIN4,
        '\u2A30': exports.MO.BIN4,
        '\u2A31': exports.MO.BIN4,
        '\u2A32': exports.MO.BIN4,
        '\u2A33': exports.MO.BIN4,
        '\u2A34': exports.MO.BIN4,
        '\u2A35': exports.MO.BIN4,
        '\u2A36': exports.MO.BIN4,
        '\u2A37': exports.MO.BIN4,
        '\u2A38': exports.MO.BIN4,
        '\u2A39': exports.MO.BIN4,
        '\u2A3A': exports.MO.BIN4,
        '\u2A3B': exports.MO.BIN4,
        '\u2A3C': exports.MO.BIN4,
        '\u2A3D': exports.MO.BIN4,
        '\u2A3E': exports.MO.BIN4,
        '\u2A3F': exports.MO.BIN4,
        '\u2A40': exports.MO.BIN4,
        '\u2A41': exports.MO.BIN4,
        '\u2A42': exports.MO.BIN4,
        '\u2A43': exports.MO.BIN4,
        '\u2A44': exports.MO.BIN4,
        '\u2A45': exports.MO.BIN4,
        '\u2A46': exports.MO.BIN4,
        '\u2A47': exports.MO.BIN4,
        '\u2A48': exports.MO.BIN4,
        '\u2A49': exports.MO.BIN4,
        '\u2A4A': exports.MO.BIN4,
        '\u2A4B': exports.MO.BIN4,
        '\u2A4C': exports.MO.BIN4,
        '\u2A4D': exports.MO.BIN4,
        '\u2A4E': exports.MO.BIN4,
        '\u2A4F': exports.MO.BIN4,
        '\u2A50': exports.MO.BIN4,
        '\u2A51': exports.MO.BIN4,
        '\u2A52': exports.MO.BIN4,
        '\u2A53': exports.MO.BIN4,
        '\u2A54': exports.MO.BIN4,
        '\u2A55': exports.MO.BIN4,
        '\u2A56': exports.MO.BIN4,
        '\u2A57': exports.MO.BIN4,
        '\u2A58': exports.MO.BIN4,
        '\u2A59': exports.MO.REL,
        '\u2A5A': exports.MO.BIN4,
        '\u2A5B': exports.MO.BIN4,
        '\u2A5C': exports.MO.BIN4,
        '\u2A5D': exports.MO.BIN4,
        '\u2A5E': exports.MO.BIN4,
        '\u2A5F': exports.MO.BIN4,
        '\u2A60': exports.MO.BIN4,
        '\u2A61': exports.MO.BIN4,
        '\u2A62': exports.MO.BIN4,
        '\u2A63': exports.MO.BIN4,
        '\u2A64': exports.MO.BIN4,
        '\u2A65': exports.MO.BIN4,
        '\u2A66': exports.MO.REL,
        '\u2A67': exports.MO.REL,
        '\u2A68': exports.MO.REL,
        '\u2A69': exports.MO.REL,
        '\u2A6A': exports.MO.REL,
        '\u2A6B': exports.MO.REL,
        '\u2A6C': exports.MO.REL,
        '\u2A6D': exports.MO.REL,
        '\u2A6E': exports.MO.REL,
        '\u2A6F': exports.MO.REL,
        '\u2A70': exports.MO.REL,
        '\u2A71': exports.MO.BIN4,
        '\u2A72': exports.MO.BIN4,
        '\u2A73': exports.MO.REL,
        '\u2A74': exports.MO.REL,
        '\u2A75': exports.MO.REL,
        '\u2A76': exports.MO.REL,
        '\u2A77': exports.MO.REL,
        '\u2A78': exports.MO.REL,
        '\u2A79': exports.MO.REL,
        '\u2A7A': exports.MO.REL,
        '\u2A7B': exports.MO.REL,
        '\u2A7C': exports.MO.REL,
        '\u2A7D': exports.MO.REL,
        '\u2A7D\u0338': exports.MO.REL,
        '\u2A7E': exports.MO.REL,
        '\u2A7E\u0338': exports.MO.REL,
        '\u2A7F': exports.MO.REL,
        '\u2A80': exports.MO.REL,
        '\u2A81': exports.MO.REL,
        '\u2A82': exports.MO.REL,
        '\u2A83': exports.MO.REL,
        '\u2A84': exports.MO.REL,
        '\u2A85': exports.MO.REL,
        '\u2A86': exports.MO.REL,
        '\u2A87': exports.MO.REL,
        '\u2A88': exports.MO.REL,
        '\u2A89': exports.MO.REL,
        '\u2A8A': exports.MO.REL,
        '\u2A8B': exports.MO.REL,
        '\u2A8C': exports.MO.REL,
        '\u2A8D': exports.MO.REL,
        '\u2A8E': exports.MO.REL,
        '\u2A8F': exports.MO.REL,
        '\u2A90': exports.MO.REL,
        '\u2A91': exports.MO.REL,
        '\u2A92': exports.MO.REL,
        '\u2A93': exports.MO.REL,
        '\u2A94': exports.MO.REL,
        '\u2A95': exports.MO.REL,
        '\u2A96': exports.MO.REL,
        '\u2A97': exports.MO.REL,
        '\u2A98': exports.MO.REL,
        '\u2A99': exports.MO.REL,
        '\u2A9A': exports.MO.REL,
        '\u2A9B': exports.MO.REL,
        '\u2A9C': exports.MO.REL,
        '\u2A9D': exports.MO.REL,
        '\u2A9E': exports.MO.REL,
        '\u2A9F': exports.MO.REL,
        '\u2AA0': exports.MO.REL,
        '\u2AA1': exports.MO.REL,
        '\u2AA1\u0338': exports.MO.REL,
        '\u2AA2': exports.MO.REL,
        '\u2AA2\u0338': exports.MO.REL,
        '\u2AA3': exports.MO.REL,
        '\u2AA4': exports.MO.REL,
        '\u2AA5': exports.MO.REL,
        '\u2AA6': exports.MO.REL,
        '\u2AA7': exports.MO.REL,
        '\u2AA8': exports.MO.REL,
        '\u2AA9': exports.MO.REL,
        '\u2AAA': exports.MO.REL,
        '\u2AAB': exports.MO.REL,
        '\u2AAC': exports.MO.REL,
        '\u2AAD': exports.MO.REL,
        '\u2AAE': exports.MO.REL,
        '\u2AAF': exports.MO.REL,
        '\u2AAF\u0338': exports.MO.REL,
        '\u2AB0': exports.MO.REL,
        '\u2AB0\u0338': exports.MO.REL,
        '\u2AB1': exports.MO.REL,
        '\u2AB2': exports.MO.REL,
        '\u2AB3': exports.MO.REL,
        '\u2AB4': exports.MO.REL,
        '\u2AB5': exports.MO.REL,
        '\u2AB6': exports.MO.REL,
        '\u2AB7': exports.MO.REL,
        '\u2AB8': exports.MO.REL,
        '\u2AB9': exports.MO.REL,
        '\u2ABA': exports.MO.REL,
        '\u2ABB': exports.MO.REL,
        '\u2ABC': exports.MO.REL,
        '\u2ABD': exports.MO.REL,
        '\u2ABE': exports.MO.REL,
        '\u2ABF': exports.MO.REL,
        '\u2AC0': exports.MO.REL,
        '\u2AC1': exports.MO.REL,
        '\u2AC2': exports.MO.REL,
        '\u2AC3': exports.MO.REL,
        '\u2AC4': exports.MO.REL,
        '\u2AC5': exports.MO.REL,
        '\u2AC6': exports.MO.REL,
        '\u2AC7': exports.MO.REL,
        '\u2AC8': exports.MO.REL,
        '\u2AC9': exports.MO.REL,
        '\u2ACA': exports.MO.REL,
        '\u2ACB': exports.MO.REL,
        '\u2ACC': exports.MO.REL,
        '\u2ACD': exports.MO.REL,
        '\u2ACE': exports.MO.REL,
        '\u2ACF': exports.MO.REL,
        '\u2AD0': exports.MO.REL,
        '\u2AD1': exports.MO.REL,
        '\u2AD2': exports.MO.REL,
        '\u2AD3': exports.MO.REL,
        '\u2AD4': exports.MO.REL,
        '\u2AD5': exports.MO.REL,
        '\u2AD6': exports.MO.REL,
        '\u2AD7': exports.MO.REL,
        '\u2AD8': exports.MO.REL,
        '\u2AD9': exports.MO.REL,
        '\u2ADA': exports.MO.REL,
        '\u2ADB': exports.MO.REL,
        '\u2ADD': exports.MO.REL,
        '\u2ADD\u0338': exports.MO.REL,
        '\u2ADE': exports.MO.REL,
        '\u2ADF': exports.MO.REL,
        '\u2AE0': exports.MO.REL,
        '\u2AE1': exports.MO.REL,
        '\u2AE2': exports.MO.REL,
        '\u2AE3': exports.MO.REL,
        '\u2AE4': exports.MO.REL,
        '\u2AE5': exports.MO.REL,
        '\u2AE6': exports.MO.REL,
        '\u2AE7': exports.MO.REL,
        '\u2AE8': exports.MO.REL,
        '\u2AE9': exports.MO.REL,
        '\u2AEA': exports.MO.REL,
        '\u2AEB': exports.MO.REL,
        '\u2AEC': exports.MO.REL,
        '\u2AED': exports.MO.REL,
        '\u2AEE': exports.MO.REL,
        '\u2AEF': exports.MO.REL,
        '\u2AF0': exports.MO.REL,
        '\u2AF1': exports.MO.REL,
        '\u2AF2': exports.MO.REL,
        '\u2AF3': exports.MO.REL,
        '\u2AF4': exports.MO.BIN4,
        '\u2AF5': exports.MO.BIN4,
        '\u2AF6': exports.MO.BIN4,
        '\u2AF7': exports.MO.REL,
        '\u2AF8': exports.MO.REL,
        '\u2AF9': exports.MO.REL,
        '\u2AFA': exports.MO.REL,
        '\u2AFB': exports.MO.BIN4,
        '\u2AFD': exports.MO.BIN4,
        '\u2AFE': exports.MO.BIN3,
        '\u2B45': exports.MO.RELSTRETCH,
        '\u2B46': exports.MO.RELSTRETCH,
        '\u3008': exports.MO.OPEN,
        '\u3009': exports.MO.CLOSE,
        '\uFE37': exports.MO.WIDEACCENT,
        '\uFE38': exports.MO.WIDEACCENT,
    }
};
exports.OPTABLE.infix["^"] = exports.MO.WIDEREL;
exports.OPTABLE.infix._ = exports.MO.WIDEREL;
exports.OPTABLE.infix["⫝̸"] = exports.MO.REL;
//# sourceMappingURL=OperatorDictionary.js.map

/***/ }),

/***/ 73290:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractOutputJax = void 0;
var Options_js_1 = __webpack_require__(36059);
var FunctionList_js_1 = __webpack_require__(64905);
var AbstractOutputJax = (function () {
    function AbstractOutputJax(options) {
        if (options === void 0) { options = {}; }
        this.adaptor = null;
        var CLASS = this.constructor;
        this.options = (0, Options_js_1.userOptions)((0, Options_js_1.defaultOptions)({}, CLASS.OPTIONS), options);
        this.postFilters = new FunctionList_js_1.FunctionList();
    }
    Object.defineProperty(AbstractOutputJax.prototype, "name", {
        get: function () {
            return this.constructor.NAME;
        },
        enumerable: false,
        configurable: true
    });
    AbstractOutputJax.prototype.setAdaptor = function (adaptor) {
        this.adaptor = adaptor;
    };
    AbstractOutputJax.prototype.initialize = function () {
    };
    AbstractOutputJax.prototype.reset = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
    };
    AbstractOutputJax.prototype.getMetrics = function (_document) {
    };
    AbstractOutputJax.prototype.styleSheet = function (_document) {
        return null;
    };
    AbstractOutputJax.prototype.pageElements = function (_document) {
        return null;
    };
    AbstractOutputJax.prototype.executeFilters = function (filters, math, document, data) {
        var args = { math: math, document: document, data: data };
        filters.execute(args);
        return args.data;
    };
    AbstractOutputJax.NAME = 'generic';
    AbstractOutputJax.OPTIONS = {};
    return AbstractOutputJax;
}());
exports.AbstractOutputJax = AbstractOutputJax;
//# sourceMappingURL=OutputJax.js.map

/***/ }),

/***/ 86161:
/***/ (function(__unused_webpack_module, exports) {


var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractFactory = void 0;
var AbstractFactory = (function () {
    function AbstractFactory(nodes) {
        var e_1, _a;
        if (nodes === void 0) { nodes = null; }
        this.defaultKind = 'unknown';
        this.nodeMap = new Map();
        this.node = {};
        if (nodes === null) {
            nodes = this.constructor.defaultNodes;
        }
        try {
            for (var _b = __values(Object.keys(nodes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var kind = _c.value;
                this.setNodeClass(kind, nodes[kind]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    AbstractFactory.prototype.create = function (kind) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (this.node[kind] || this.node[this.defaultKind]).apply(void 0, __spreadArray([], __read(args), false));
    };
    AbstractFactory.prototype.setNodeClass = function (kind, nodeClass) {
        this.nodeMap.set(kind, nodeClass);
        var THIS = this;
        var KIND = this.nodeMap.get(kind);
        this.node[kind] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new (KIND.bind.apply(KIND, __spreadArray([void 0, THIS], __read(args), false)))();
        };
    };
    AbstractFactory.prototype.getNodeClass = function (kind) {
        return this.nodeMap.get(kind);
    };
    AbstractFactory.prototype.deleteNodeClass = function (kind) {
        this.nodeMap.delete(kind);
        delete this.node[kind];
    };
    AbstractFactory.prototype.nodeIsKind = function (node, kind) {
        return (node instanceof this.getNodeClass(kind));
    };
    AbstractFactory.prototype.getKinds = function () {
        return Array.from(this.nodeMap.keys());
    };
    AbstractFactory.defaultNodes = {};
    return AbstractFactory;
}());
exports.AbstractFactory = AbstractFactory;
//# sourceMappingURL=Factory.js.map

/***/ }),

/***/ 62335:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractEmptyNode = exports.AbstractNode = void 0;
var AbstractNode = (function () {
    function AbstractNode(factory, properties, children) {
        var e_1, _a;
        if (properties === void 0) { properties = {}; }
        if (children === void 0) { children = []; }
        this.factory = factory;
        this.parent = null;
        this.properties = {};
        this.childNodes = [];
        try {
            for (var _b = __values(Object.keys(properties)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                this.setProperty(name_1, properties[name_1]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (children.length) {
            this.setChildren(children);
        }
    }
    Object.defineProperty(AbstractNode.prototype, "kind", {
        get: function () {
            return 'unknown';
        },
        enumerable: false,
        configurable: true
    });
    AbstractNode.prototype.setProperty = function (name, value) {
        this.properties[name] = value;
    };
    AbstractNode.prototype.getProperty = function (name) {
        return this.properties[name];
    };
    AbstractNode.prototype.getPropertyNames = function () {
        return Object.keys(this.properties);
    };
    AbstractNode.prototype.getAllProperties = function () {
        return this.properties;
    };
    AbstractNode.prototype.removeProperty = function () {
        var e_2, _a;
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        try {
            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                var name_2 = names_1_1.value;
                delete this.properties[name_2];
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    AbstractNode.prototype.isKind = function (kind) {
        return this.factory.nodeIsKind(this, kind);
    };
    AbstractNode.prototype.setChildren = function (children) {
        var e_3, _a;
        this.childNodes = [];
        try {
            for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                var child = children_1_1.value;
                this.appendChild(child);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    AbstractNode.prototype.appendChild = function (child) {
        this.childNodes.push(child);
        child.parent = this;
        return child;
    };
    AbstractNode.prototype.replaceChild = function (newChild, oldChild) {
        var i = this.childIndex(oldChild);
        if (i !== null) {
            this.childNodes[i] = newChild;
            newChild.parent = this;
            oldChild.parent = null;
        }
        return newChild;
    };
    AbstractNode.prototype.removeChild = function (child) {
        var i = this.childIndex(child);
        if (i !== null) {
            this.childNodes.splice(i, 1);
            child.parent = null;
        }
        return child;
    };
    AbstractNode.prototype.childIndex = function (node) {
        var i = this.childNodes.indexOf(node);
        return (i === -1 ? null : i);
    };
    AbstractNode.prototype.copy = function () {
        var e_4, _a;
        var node = this.factory.create(this.kind);
        node.properties = __assign({}, this.properties);
        try {
            for (var _b = __values(this.childNodes || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child) {
                    node.appendChild(child.copy());
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return node;
    };
    AbstractNode.prototype.findNodes = function (kind) {
        var nodes = [];
        this.walkTree(function (node) {
            if (node.isKind(kind)) {
                nodes.push(node);
            }
        });
        return nodes;
    };
    AbstractNode.prototype.walkTree = function (func, data) {
        var e_5, _a;
        func(this, data);
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child) {
                    child.walkTree(func, data);
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return data;
    };
    AbstractNode.prototype.toString = function () {
        return this.kind + '(' + this.childNodes.join(',') + ')';
    };
    return AbstractNode;
}());
exports.AbstractNode = AbstractNode;
var AbstractEmptyNode = (function (_super) {
    __extends(AbstractEmptyNode, _super);
    function AbstractEmptyNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractEmptyNode.prototype.setChildren = function (_children) {
    };
    AbstractEmptyNode.prototype.appendChild = function (child) {
        return child;
    };
    AbstractEmptyNode.prototype.replaceChild = function (_newChild, oldChild) {
        return oldChild;
    };
    AbstractEmptyNode.prototype.childIndex = function (_node) {
        return null;
    };
    AbstractEmptyNode.prototype.walkTree = function (func, data) {
        func(this, data);
        return data;
    };
    AbstractEmptyNode.prototype.toString = function () {
        return this.kind;
    };
    return AbstractEmptyNode;
}(AbstractNode));
exports.AbstractEmptyNode = AbstractEmptyNode;
//# sourceMappingURL=Node.js.map

/***/ }),

/***/ 96301:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractWrapper = void 0;
var AbstractWrapper = (function () {
    function AbstractWrapper(factory, node) {
        this.factory = factory;
        this.node = node;
    }
    Object.defineProperty(AbstractWrapper.prototype, "kind", {
        get: function () {
            return this.node.kind;
        },
        enumerable: false,
        configurable: true
    });
    AbstractWrapper.prototype.wrap = function (node) {
        return this.factory.wrap(node);
    };
    return AbstractWrapper;
}());
exports.AbstractWrapper = AbstractWrapper;
//# sourceMappingURL=Wrapper.js.map

/***/ }),

/***/ 56586:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractWrapperFactory = void 0;
var Factory_js_1 = __webpack_require__(86161);
var AbstractWrapperFactory = (function (_super) {
    __extends(AbstractWrapperFactory, _super);
    function AbstractWrapperFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractWrapperFactory.prototype.wrap = function (node) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.create.apply(this, __spreadArray([node.kind, node], __read(args), false));
    };
    return AbstractWrapperFactory;
}(Factory_js_1.AbstractFactory));
exports.AbstractWrapperFactory = AbstractWrapperFactory;
//# sourceMappingURL=WrapperFactory.js.map

/***/ }),

/***/ 37508:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTML = void 0;
var OutputJax_js_1 = __webpack_require__(90247);
var StyleList_js_1 = __webpack_require__(24219);
var WrapperFactory_js_1 = __webpack_require__(65008);
var Usage_js_1 = __webpack_require__(92931);
var tex_js_1 = __webpack_require__(59230);
var LENGTHS = __importStar(__webpack_require__(77130));
var string_js_1 = __webpack_require__(33353);
var CHTML = (function (_super) {
    __extends(CHTML, _super);
    function CHTML(options) {
        if (options === void 0) { options = null; }
        var _this = _super.call(this, options, WrapperFactory_js_1.CHTMLWrapperFactory, tex_js_1.TeXFont) || this;
        _this.chtmlStyles = null;
        _this.font.adaptiveCSS(_this.options.adaptiveCSS);
        _this.wrapperUsage = new Usage_js_1.Usage();
        return _this;
    }
    CHTML.prototype.escaped = function (math, html) {
        this.setDocument(html);
        return this.html('span', {}, [this.text(math.math)]);
    };
    CHTML.prototype.styleSheet = function (html) {
        if (this.chtmlStyles) {
            if (this.options.adaptiveCSS) {
                var styles = new StyleList_js_1.CssStyles();
                this.addWrapperStyles(styles);
                this.updateFontStyles(styles);
                this.adaptor.insertRules(this.chtmlStyles, styles.getStyleRules());
            }
            return this.chtmlStyles;
        }
        var sheet = this.chtmlStyles = _super.prototype.styleSheet.call(this, html);
        this.adaptor.setAttribute(sheet, 'id', CHTML.STYLESHEETID);
        this.wrapperUsage.update();
        return sheet;
    };
    CHTML.prototype.updateFontStyles = function (styles) {
        styles.addStyles(this.font.updateStyles({}));
    };
    CHTML.prototype.addWrapperStyles = function (styles) {
        var e_1, _a;
        if (!this.options.adaptiveCSS) {
            _super.prototype.addWrapperStyles.call(this, styles);
            return;
        }
        try {
            for (var _b = __values(this.wrapperUsage.update()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var kind = _c.value;
                var wrapper = this.factory.getNodeClass(kind);
                wrapper && this.addClassStyles(wrapper, styles);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CHTML.prototype.addClassStyles = function (wrapper, styles) {
        var _a;
        var CLASS = wrapper;
        if (CLASS.autoStyle && CLASS.kind !== 'unknown') {
            styles.addStyles((_a = {},
                _a['mjx-' + CLASS.kind] = {
                    display: 'inline-block',
                    'text-align': 'left'
                },
                _a));
        }
        this.wrapperUsage.add(CLASS.kind);
        _super.prototype.addClassStyles.call(this, wrapper, styles);
    };
    CHTML.prototype.processMath = function (math, parent) {
        this.factory.wrap(math).toCHTML(parent);
    };
    CHTML.prototype.clearCache = function () {
        this.cssStyles.clear();
        this.font.clearCache();
        this.wrapperUsage.clear();
        this.chtmlStyles = null;
    };
    CHTML.prototype.reset = function () {
        this.clearCache();
    };
    CHTML.prototype.unknownText = function (text, variant, width) {
        if (width === void 0) { width = null; }
        var styles = {};
        var scale = 100 / this.math.metrics.scale;
        if (scale !== 100) {
            styles['font-size'] = this.fixed(scale, 1) + '%';
            styles.padding = LENGTHS.em(75 / scale) + ' 0 ' + LENGTHS.em(20 / scale) + ' 0';
        }
        if (variant !== '-explicitFont') {
            var c = (0, string_js_1.unicodeChars)(text);
            if (c.length !== 1 || c[0] < 0x1D400 || c[0] > 0x1D7FF) {
                this.cssFontStyles(this.font.getCssFont(variant), styles);
            }
        }
        if (width !== null) {
            var metrics = this.math.metrics;
            styles.width = Math.round(width * metrics.em * metrics.scale) + 'px';
        }
        return this.html('mjx-utext', { variant: variant, style: styles }, [this.text(text)]);
    };
    CHTML.prototype.measureTextNode = function (textNode) {
        var adaptor = this.adaptor;
        var text = adaptor.clone(textNode);
        adaptor.setStyle(text, 'font-family', adaptor.getStyle(text, 'font-family').replace(/MJXZERO, /g, ''));
        var style = { position: 'absolute', 'white-space': 'nowrap' };
        var node = this.html('mjx-measure-text', { style: style }, [text]);
        adaptor.append(adaptor.parent(this.math.start.node), this.container);
        adaptor.append(this.container, node);
        var w = adaptor.nodeSize(text, this.math.metrics.em)[0] / this.math.metrics.scale;
        adaptor.remove(this.container);
        adaptor.remove(node);
        return { w: w, h: .75, d: .2 };
    };
    CHTML.NAME = 'CHTML';
    CHTML.OPTIONS = __assign(__assign({}, OutputJax_js_1.CommonOutputJax.OPTIONS), { adaptiveCSS: true, matchFontHeight: true });
    CHTML.commonStyles = {
        'mjx-container[jax="CHTML"]': { 'line-height': 0 },
        'mjx-container [space="1"]': { 'margin-left': '.111em' },
        'mjx-container [space="2"]': { 'margin-left': '.167em' },
        'mjx-container [space="3"]': { 'margin-left': '.222em' },
        'mjx-container [space="4"]': { 'margin-left': '.278em' },
        'mjx-container [space="5"]': { 'margin-left': '.333em' },
        'mjx-container [rspace="1"]': { 'margin-right': '.111em' },
        'mjx-container [rspace="2"]': { 'margin-right': '.167em' },
        'mjx-container [rspace="3"]': { 'margin-right': '.222em' },
        'mjx-container [rspace="4"]': { 'margin-right': '.278em' },
        'mjx-container [rspace="5"]': { 'margin-right': '.333em' },
        'mjx-container [size="s"]': { 'font-size': '70.7%' },
        'mjx-container [size="ss"]': { 'font-size': '50%' },
        'mjx-container [size="Tn"]': { 'font-size': '60%' },
        'mjx-container [size="sm"]': { 'font-size': '85%' },
        'mjx-container [size="lg"]': { 'font-size': '120%' },
        'mjx-container [size="Lg"]': { 'font-size': '144%' },
        'mjx-container [size="LG"]': { 'font-size': '173%' },
        'mjx-container [size="hg"]': { 'font-size': '207%' },
        'mjx-container [size="HG"]': { 'font-size': '249%' },
        'mjx-container [width="full"]': { width: '100%' },
        'mjx-box': { display: 'inline-block' },
        'mjx-block': { display: 'block' },
        'mjx-itable': { display: 'inline-table' },
        'mjx-row': { display: 'table-row' },
        'mjx-row > *': { display: 'table-cell' },
        'mjx-mtext': {
            display: 'inline-block'
        },
        'mjx-mstyle': {
            display: 'inline-block'
        },
        'mjx-merror': {
            display: 'inline-block',
            color: 'red',
            'background-color': 'yellow'
        },
        'mjx-mphantom': {
            visibility: 'hidden'
        },
        '_::-webkit-full-page-media, _:future, :root mjx-container': {
            'will-change': 'opacity'
        }
    };
    CHTML.STYLESHEETID = 'MJX-CHTML-styles';
    return CHTML;
}(OutputJax_js_1.CommonOutputJax));
exports.CHTML = CHTML;
//# sourceMappingURL=chtml.js.map

/***/ }),

/***/ 73779:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddCSS = exports.CHTMLFontData = void 0;
var FontData_js_1 = __webpack_require__(88284);
var Usage_js_1 = __webpack_require__(92931);
var lengths_js_1 = __webpack_require__(77130);
__exportStar(__webpack_require__(88284), exports);
var CHTMLFontData = (function (_super) {
    __extends(CHTMLFontData, _super);
    function CHTMLFontData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.charUsage = new Usage_js_1.Usage();
        _this.delimUsage = new Usage_js_1.Usage();
        return _this;
    }
    CHTMLFontData.charOptions = function (font, n) {
        return _super.charOptions.call(this, font, n);
    };
    CHTMLFontData.prototype.adaptiveCSS = function (adapt) {
        this.options.adaptiveCSS = adapt;
    };
    CHTMLFontData.prototype.clearCache = function () {
        if (this.options.adaptiveCSS) {
            this.charUsage.clear();
            this.delimUsage.clear();
        }
    };
    CHTMLFontData.prototype.createVariant = function (name, inherit, link) {
        if (inherit === void 0) { inherit = null; }
        if (link === void 0) { link = null; }
        _super.prototype.createVariant.call(this, name, inherit, link);
        var CLASS = this.constructor;
        this.variant[name].classes = CLASS.defaultVariantClasses[name];
        this.variant[name].letter = CLASS.defaultVariantLetters[name];
    };
    CHTMLFontData.prototype.defineChars = function (name, chars) {
        var e_1, _a;
        _super.prototype.defineChars.call(this, name, chars);
        var letter = this.variant[name].letter;
        try {
            for (var _b = __values(Object.keys(chars)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var n = _c.value;
                var options = CHTMLFontData.charOptions(chars, parseInt(n));
                if (options.f === undefined) {
                    options.f = letter;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Object.defineProperty(CHTMLFontData.prototype, "styles", {
        get: function () {
            var CLASS = this.constructor;
            var styles = __assign({}, CLASS.defaultStyles);
            this.addFontURLs(styles, CLASS.defaultFonts, this.options.fontURL);
            if (this.options.adaptiveCSS) {
                this.updateStyles(styles);
            }
            else {
                this.allStyles(styles);
            }
            return styles;
        },
        enumerable: false,
        configurable: true
    });
    CHTMLFontData.prototype.updateStyles = function (styles) {
        var e_2, _a, e_3, _b;
        try {
            for (var _c = __values(this.delimUsage.update()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var N = _d.value;
                this.addDelimiterStyles(styles, N, this.delimiters[N]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var _e = __values(this.charUsage.update()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var _g = __read(_f.value, 2), name_1 = _g[0], N = _g[1];
                var variant = this.variant[name_1];
                this.addCharStyles(styles, variant.letter, N, variant.chars[N]);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return styles;
    };
    CHTMLFontData.prototype.allStyles = function (styles) {
        var e_4, _a, e_5, _b, e_6, _c;
        try {
            for (var _d = __values(Object.keys(this.delimiters)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var n = _e.value;
                var N = parseInt(n);
                this.addDelimiterStyles(styles, N, this.delimiters[N]);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_4) throw e_4.error; }
        }
        try {
            for (var _f = __values(Object.keys(this.variant)), _g = _f.next(); !_g.done; _g = _f.next()) {
                var name_2 = _g.value;
                var variant = this.variant[name_2];
                var vletter = variant.letter;
                try {
                    for (var _h = (e_6 = void 0, __values(Object.keys(variant.chars))), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var n = _j.value;
                        var N = parseInt(n);
                        var char = variant.chars[N];
                        if ((char[3] || {}).smp)
                            continue;
                        if (char.length < 4) {
                            char[3] = {};
                        }
                        this.addCharStyles(styles, vletter, N, char);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    CHTMLFontData.prototype.addFontURLs = function (styles, fonts, url) {
        var e_7, _a;
        try {
            for (var _b = __values(Object.keys(fonts)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_3 = _c.value;
                var font = __assign({}, fonts[name_3]);
                font.src = font.src.replace(/%%URL%%/, url);
                styles[name_3] = font;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    CHTMLFontData.prototype.addDelimiterStyles = function (styles, n, data) {
        var c = this.charSelector(n);
        if (data.c && data.c !== n) {
            c = this.charSelector(data.c);
            styles['.mjx-stretched mjx-c' + c + '::before'] = {
                content: this.charContent(data.c)
            };
        }
        if (!data.stretch)
            return;
        if (data.dir === 1) {
            this.addDelimiterVStyles(styles, c, data);
        }
        else {
            this.addDelimiterHStyles(styles, c, data);
        }
    };
    CHTMLFontData.prototype.addDelimiterVStyles = function (styles, c, data) {
        var HDW = data.HDW;
        var _a = __read(data.stretch, 4), beg = _a[0], ext = _a[1], end = _a[2], mid = _a[3];
        var Hb = this.addDelimiterVPart(styles, c, 'beg', beg, HDW);
        this.addDelimiterVPart(styles, c, 'ext', ext, HDW);
        var He = this.addDelimiterVPart(styles, c, 'end', end, HDW);
        var css = {};
        if (mid) {
            var Hm = this.addDelimiterVPart(styles, c, 'mid', mid, HDW);
            css.height = '50%';
            styles['mjx-stretchy-v' + c + ' > mjx-mid'] = {
                'margin-top': this.em(-Hm / 2),
                'margin-bottom': this.em(-Hm / 2)
            };
        }
        if (Hb) {
            css['border-top-width'] = this.em0(Hb - .03);
        }
        if (He) {
            css['border-bottom-width'] = this.em0(He - .03);
            styles['mjx-stretchy-v' + c + ' > mjx-end'] = { 'margin-top': this.em(-He) };
        }
        if (Object.keys(css).length) {
            styles['mjx-stretchy-v' + c + ' > mjx-ext'] = css;
        }
    };
    CHTMLFontData.prototype.addDelimiterVPart = function (styles, c, part, n, HDW) {
        if (!n)
            return 0;
        var data = this.getDelimiterData(n);
        var dw = (HDW[2] - data[2]) / 2;
        var css = { content: this.charContent(n) };
        if (part !== 'ext') {
            css.padding = this.padding(data, dw);
        }
        else {
            css.width = this.em0(HDW[2]);
            if (dw) {
                css['padding-left'] = this.em0(dw);
            }
        }
        styles['mjx-stretchy-v' + c + ' mjx-' + part + ' mjx-c::before'] = css;
        return data[0] + data[1];
    };
    CHTMLFontData.prototype.addDelimiterHStyles = function (styles, c, data) {
        var _a = __read(data.stretch, 4), beg = _a[0], ext = _a[1], end = _a[2], mid = _a[3];
        var HDW = data.HDW;
        this.addDelimiterHPart(styles, c, 'beg', beg, HDW);
        this.addDelimiterHPart(styles, c, 'ext', ext, HDW);
        this.addDelimiterHPart(styles, c, 'end', end, HDW);
        if (mid) {
            this.addDelimiterHPart(styles, c, 'mid', mid, HDW);
            styles['mjx-stretchy-h' + c + ' > mjx-ext'] = { width: '50%' };
        }
    };
    CHTMLFontData.prototype.addDelimiterHPart = function (styles, c, part, n, HDW) {
        if (!n)
            return;
        var data = this.getDelimiterData(n);
        var options = data[3];
        var css = { content: (options && options.c ? '"' + options.c + '"' : this.charContent(n)) };
        css.padding = this.padding(HDW, 0, -HDW[2]);
        styles['mjx-stretchy-h' + c + ' mjx-' + part + ' mjx-c::before'] = css;
    };
    CHTMLFontData.prototype.addCharStyles = function (styles, vletter, n, data) {
        var options = data[3];
        var letter = (options.f !== undefined ? options.f : vletter);
        var selector = 'mjx-c' + this.charSelector(n) + (letter ? '.TEX-' + letter : '');
        styles[selector + '::before'] = {
            padding: this.padding(data, 0, options.ic || 0),
            content: (options.c != null ? '"' + options.c + '"' : this.charContent(n))
        };
    };
    CHTMLFontData.prototype.getDelimiterData = function (n) {
        return this.getChar('-smallop', n);
    };
    CHTMLFontData.prototype.em = function (n) {
        return (0, lengths_js_1.em)(n);
    };
    CHTMLFontData.prototype.em0 = function (n) {
        return (0, lengths_js_1.em)(Math.max(0, n));
    };
    CHTMLFontData.prototype.padding = function (_a, dw, ic) {
        var _b = __read(_a, 3), h = _b[0], d = _b[1], w = _b[2];
        if (dw === void 0) { dw = 0; }
        if (ic === void 0) { ic = 0; }
        return [h, w + ic, d, dw].map(this.em0).join(' ');
    };
    CHTMLFontData.prototype.charContent = function (n) {
        return '"' + (n >= 0x20 && n <= 0x7E && n !== 0x22 && n !== 0x27 && n !== 0x5C ?
            String.fromCharCode(n) : '\\' + n.toString(16).toUpperCase()) + '"';
    };
    CHTMLFontData.prototype.charSelector = function (n) {
        return '.mjx-c' + n.toString(16).toUpperCase();
    };
    CHTMLFontData.OPTIONS = __assign(__assign({}, FontData_js_1.FontData.OPTIONS), { fontURL: 'js/output/chtml/fonts/tex-woff-v2' });
    CHTMLFontData.JAX = 'CHTML';
    CHTMLFontData.defaultVariantClasses = {};
    CHTMLFontData.defaultVariantLetters = {};
    CHTMLFontData.defaultStyles = {
        'mjx-c::before': {
            display: 'block',
            width: 0
        }
    };
    CHTMLFontData.defaultFonts = {
        '@font-face /* 0 */': {
            'font-family': 'MJXZERO',
            src: 'url("%%URL%%/MathJax_Zero.woff") format("woff")'
        }
    };
    return CHTMLFontData;
}(FontData_js_1.FontData));
exports.CHTMLFontData = CHTMLFontData;
function AddCSS(font, options) {
    var e_8, _a;
    try {
        for (var _b = __values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var c = _c.value;
            var n = parseInt(c);
            Object.assign(FontData_js_1.FontData.charOptions(font, n), options[n]);
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_8) throw e_8.error; }
    }
    return font;
}
exports.AddCSS = AddCSS;
//# sourceMappingURL=FontData.js.map

/***/ }),

/***/ 55043:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Arrow = exports.DiagonalArrow = exports.DiagonalStrike = exports.Border2 = exports.Border = exports.RenderElement = void 0;
var Notation = __importStar(__webpack_require__(77988));
__exportStar(__webpack_require__(77988), exports);
var RenderElement = function (name, offset) {
    if (offset === void 0) { offset = ''; }
    return (function (node, _child) {
        var shape = node.adjustBorder(node.html('mjx-' + name));
        if (offset) {
            var d = node.getOffset(offset);
            if (node.thickness !== Notation.THICKNESS || d) {
                var transform = "translate".concat(offset, "(").concat(node.em(node.thickness / 2 - d), ")");
                node.adaptor.setStyle(shape, 'transform', transform);
            }
        }
        node.adaptor.append(node.chtml, shape);
    });
};
exports.RenderElement = RenderElement;
var Border = function (side) {
    return Notation.CommonBorder(function (node, child) {
        node.adaptor.setStyle(child, 'border-' + side, node.em(node.thickness) + ' solid');
    })(side);
};
exports.Border = Border;
var Border2 = function (name, side1, side2) {
    return Notation.CommonBorder2(function (node, child) {
        var border = node.em(node.thickness) + ' solid';
        node.adaptor.setStyle(child, 'border-' + side1, border);
        node.adaptor.setStyle(child, 'border-' + side2, border);
    })(name, side1, side2);
};
exports.Border2 = Border2;
var DiagonalStrike = function (name, neg) {
    return Notation.CommonDiagonalStrike(function (cname) { return function (node, _child) {
        var _a = node.getBBox(), w = _a.w, h = _a.h, d = _a.d;
        var _b = __read(node.getArgMod(w, h + d), 2), a = _b[0], W = _b[1];
        var t = neg * node.thickness / 2;
        var strike = node.adjustBorder(node.html(cname, { style: {
                width: node.em(W),
                transform: 'rotate(' + node.fixed(-neg * a) + 'rad) translateY(' + t + 'em)',
            } }));
        node.adaptor.append(node.chtml, strike);
    }; })(name);
};
exports.DiagonalStrike = DiagonalStrike;
var DiagonalArrow = function (name) {
    return Notation.CommonDiagonalArrow(function (node, arrow) {
        node.adaptor.append(node.chtml, arrow);
    })(name);
};
exports.DiagonalArrow = DiagonalArrow;
var Arrow = function (name) {
    return Notation.CommonArrow(function (node, arrow) {
        node.adaptor.append(node.chtml, arrow);
    })(name);
};
exports.Arrow = Arrow;
//# sourceMappingURL=Notation.js.map

/***/ }),

/***/ 92931:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Usage = void 0;
var Usage = (function () {
    function Usage() {
        this.used = new Set();
        this.needsUpdate = [];
    }
    Usage.prototype.add = function (item) {
        var name = JSON.stringify(item);
        if (!this.used.has(name)) {
            this.needsUpdate.push(item);
        }
        this.used.add(name);
    };
    Usage.prototype.has = function (item) {
        return this.used.has(JSON.stringify(item));
    };
    Usage.prototype.clear = function () {
        this.used.clear();
        this.needsUpdate = [];
    };
    Usage.prototype.update = function () {
        var update = this.needsUpdate;
        this.needsUpdate = [];
        return update;
    };
    return Usage;
}());
exports.Usage = Usage;
//# sourceMappingURL=Usage.js.map

/***/ }),

/***/ 81129:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLWrapper = exports.SPACE = exports.FONTSIZE = void 0;
var LENGTHS = __importStar(__webpack_require__(77130));
var Wrapper_js_1 = __webpack_require__(56757);
var BBox_js_1 = __webpack_require__(83292);
exports.FONTSIZE = {
    '70.7%': 's',
    '70%': 's',
    '50%': 'ss',
    '60%': 'Tn',
    '85%': 'sm',
    '120%': 'lg',
    '144%': 'Lg',
    '173%': 'LG',
    '207%': 'hg',
    '249%': 'HG'
};
exports.SPACE = (_a = {},
    _a[LENGTHS.em(2 / 18)] = '1',
    _a[LENGTHS.em(3 / 18)] = '2',
    _a[LENGTHS.em(4 / 18)] = '3',
    _a[LENGTHS.em(5 / 18)] = '4',
    _a[LENGTHS.em(6 / 18)] = '5',
    _a);
var CHTMLWrapper = (function (_super) {
    __extends(CHTMLWrapper, _super);
    function CHTMLWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chtml = null;
        return _this;
    }
    CHTMLWrapper.prototype.toCHTML = function (parent) {
        var e_1, _a;
        var chtml = this.standardCHTMLnode(parent);
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.toCHTML(chtml);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CHTMLWrapper.prototype.standardCHTMLnode = function (parent) {
        this.markUsed();
        var chtml = this.createCHTMLnode(parent);
        this.handleStyles();
        this.handleVariant();
        this.handleScale();
        this.handleColor();
        this.handleSpace();
        this.handleAttributes();
        this.handlePWidth();
        return chtml;
    };
    CHTMLWrapper.prototype.markUsed = function () {
        this.jax.wrapperUsage.add(this.kind);
    };
    CHTMLWrapper.prototype.createCHTMLnode = function (parent) {
        var href = this.node.attributes.get('href');
        if (href) {
            parent = this.adaptor.append(parent, this.html('a', { href: href }));
        }
        this.chtml = this.adaptor.append(parent, this.html('mjx-' + this.node.kind));
        return this.chtml;
    };
    CHTMLWrapper.prototype.handleStyles = function () {
        if (!this.styles)
            return;
        var styles = this.styles.cssText;
        if (styles) {
            this.adaptor.setAttribute(this.chtml, 'style', styles);
            var family = this.styles.get('font-family');
            if (family) {
                this.adaptor.setStyle(this.chtml, 'font-family', 'MJXZERO, ' + family);
            }
        }
    };
    CHTMLWrapper.prototype.handleVariant = function () {
        if (this.node.isToken && this.variant !== '-explicitFont') {
            this.adaptor.setAttribute(this.chtml, 'class', (this.font.getVariant(this.variant) || this.font.getVariant('normal')).classes);
        }
    };
    CHTMLWrapper.prototype.handleScale = function () {
        this.setScale(this.chtml, this.bbox.rscale);
    };
    CHTMLWrapper.prototype.setScale = function (chtml, rscale) {
        var scale = (Math.abs(rscale - 1) < .001 ? 1 : rscale);
        if (chtml && scale !== 1) {
            var size = this.percent(scale);
            if (exports.FONTSIZE[size]) {
                this.adaptor.setAttribute(chtml, 'size', exports.FONTSIZE[size]);
            }
            else {
                this.adaptor.setStyle(chtml, 'fontSize', size);
            }
        }
        return chtml;
    };
    CHTMLWrapper.prototype.handleSpace = function () {
        var e_2, _a;
        try {
            for (var _b = __values([[this.bbox.L, 'space', 'marginLeft'],
                [this.bbox.R, 'rspace', 'marginRight']]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var data = _c.value;
                var _d = __read(data, 3), dimen = _d[0], name_1 = _d[1], margin = _d[2];
                if (dimen) {
                    var space = this.em(dimen);
                    if (exports.SPACE[space]) {
                        this.adaptor.setAttribute(this.chtml, name_1, exports.SPACE[space]);
                    }
                    else {
                        this.adaptor.setStyle(this.chtml, margin, space);
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    CHTMLWrapper.prototype.handleColor = function () {
        var attributes = this.node.attributes;
        var mathcolor = attributes.getExplicit('mathcolor');
        var color = attributes.getExplicit('color');
        var mathbackground = attributes.getExplicit('mathbackground');
        var background = attributes.getExplicit('background');
        if (mathcolor || color) {
            this.adaptor.setStyle(this.chtml, 'color', mathcolor || color);
        }
        if (mathbackground || background) {
            this.adaptor.setStyle(this.chtml, 'backgroundColor', mathbackground || background);
        }
    };
    CHTMLWrapper.prototype.handleAttributes = function () {
        var e_3, _a, e_4, _b;
        var attributes = this.node.attributes;
        var defaults = attributes.getAllDefaults();
        var skip = CHTMLWrapper.skipAttributes;
        try {
            for (var _c = __values(attributes.getExplicitNames()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var name_2 = _d.value;
                if (skip[name_2] === false || (!(name_2 in defaults) && !skip[name_2] &&
                    !this.adaptor.hasAttribute(this.chtml, name_2))) {
                    this.adaptor.setAttribute(this.chtml, name_2, attributes.getExplicit(name_2));
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (attributes.get('class')) {
            var names = attributes.get('class').trim().split(/ +/);
            try {
                for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                    var name_3 = names_1_1.value;
                    this.adaptor.addClass(this.chtml, name_3);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (names_1_1 && !names_1_1.done && (_b = names_1.return)) _b.call(names_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
    };
    CHTMLWrapper.prototype.handlePWidth = function () {
        if (this.bbox.pwidth) {
            if (this.bbox.pwidth === BBox_js_1.BBox.fullWidth) {
                this.adaptor.setAttribute(this.chtml, 'width', 'full');
            }
            else {
                this.adaptor.setStyle(this.chtml, 'width', this.bbox.pwidth);
            }
        }
    };
    CHTMLWrapper.prototype.setIndent = function (chtml, align, shift) {
        var adaptor = this.adaptor;
        if (align === 'center' || align === 'left') {
            var L = this.getBBox().L;
            adaptor.setStyle(chtml, 'margin-left', this.em(shift + L));
        }
        if (align === 'center' || align === 'right') {
            var R = this.getBBox().R;
            adaptor.setStyle(chtml, 'margin-right', this.em(-shift + R));
        }
    };
    CHTMLWrapper.prototype.drawBBox = function () {
        var _a = this.getBBox(), w = _a.w, h = _a.h, d = _a.d, R = _a.R;
        var box = this.html('mjx-box', { style: {
                opacity: .25, 'margin-left': this.em(-w - R)
            } }, [
            this.html('mjx-box', { style: {
                    height: this.em(h),
                    width: this.em(w),
                    'background-color': 'red'
                } }),
            this.html('mjx-box', { style: {
                    height: this.em(d),
                    width: this.em(w),
                    'margin-left': this.em(-w),
                    'vertical-align': this.em(-d),
                    'background-color': 'green'
                } })
        ]);
        var node = this.chtml || this.parent.chtml;
        var size = this.adaptor.getAttribute(node, 'size');
        if (size) {
            this.adaptor.setAttribute(box, 'size', size);
        }
        var fontsize = this.adaptor.getStyle(node, 'fontSize');
        if (fontsize) {
            this.adaptor.setStyle(box, 'fontSize', fontsize);
        }
        this.adaptor.append(this.adaptor.parent(node), box);
        this.adaptor.setStyle(node, 'backgroundColor', '#FFEE00');
    };
    CHTMLWrapper.prototype.html = function (type, def, content) {
        if (def === void 0) { def = {}; }
        if (content === void 0) { content = []; }
        return this.jax.html(type, def, content);
    };
    CHTMLWrapper.prototype.text = function (text) {
        return this.jax.text(text);
    };
    CHTMLWrapper.prototype.char = function (n) {
        return this.font.charSelector(n).substr(1);
    };
    CHTMLWrapper.kind = 'unknown';
    CHTMLWrapper.autoStyle = true;
    return CHTMLWrapper;
}(Wrapper_js_1.CommonWrapper));
exports.CHTMLWrapper = CHTMLWrapper;
//# sourceMappingURL=Wrapper.js.map

/***/ }),

/***/ 65008:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLWrapperFactory = void 0;
var WrapperFactory_js_1 = __webpack_require__(49557);
var Wrappers_js_1 = __webpack_require__(2166);
var CHTMLWrapperFactory = (function (_super) {
    __extends(CHTMLWrapperFactory, _super);
    function CHTMLWrapperFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLWrapperFactory.defaultNodes = Wrappers_js_1.CHTMLWrappers;
    return CHTMLWrapperFactory;
}(WrapperFactory_js_1.CommonWrapperFactory));
exports.CHTMLWrapperFactory = CHTMLWrapperFactory;
//# sourceMappingURL=WrapperFactory.js.map

/***/ }),

/***/ 2166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLWrappers = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var math_js_1 = __webpack_require__(5229);
var mi_js_1 = __webpack_require__(91307);
var mo_js_1 = __webpack_require__(53241);
var mn_js_1 = __webpack_require__(61422);
var ms_js_1 = __webpack_require__(16851);
var mtext_js_1 = __webpack_require__(90659);
var mspace_js_1 = __webpack_require__(48929);
var mpadded_js_1 = __webpack_require__(74926);
var menclose_js_1 = __webpack_require__(49469);
var mrow_js_1 = __webpack_require__(86255);
var mfenced_js_1 = __webpack_require__(7233);
var mfrac_js_1 = __webpack_require__(72929);
var msqrt_js_1 = __webpack_require__(10128);
var mroot_js_1 = __webpack_require__(32829);
var msubsup_js_1 = __webpack_require__(37717);
var munderover_js_1 = __webpack_require__(94987);
var mmultiscripts_js_1 = __webpack_require__(7331);
var mtable_js_1 = __webpack_require__(48582);
var mtr_js_1 = __webpack_require__(93594);
var mtd_js_1 = __webpack_require__(82132);
var maction_js_1 = __webpack_require__(64677);
var mglyph_js_1 = __webpack_require__(47354);
var semantics_js_1 = __webpack_require__(8044);
var TeXAtom_js_1 = __webpack_require__(51534);
var TextNode_js_1 = __webpack_require__(12853);
exports.CHTMLWrappers = (_a = {},
    _a[math_js_1.CHTMLmath.kind] = math_js_1.CHTMLmath,
    _a[mrow_js_1.CHTMLmrow.kind] = mrow_js_1.CHTMLmrow,
    _a[mrow_js_1.CHTMLinferredMrow.kind] = mrow_js_1.CHTMLinferredMrow,
    _a[mi_js_1.CHTMLmi.kind] = mi_js_1.CHTMLmi,
    _a[mo_js_1.CHTMLmo.kind] = mo_js_1.CHTMLmo,
    _a[mn_js_1.CHTMLmn.kind] = mn_js_1.CHTMLmn,
    _a[ms_js_1.CHTMLms.kind] = ms_js_1.CHTMLms,
    _a[mtext_js_1.CHTMLmtext.kind] = mtext_js_1.CHTMLmtext,
    _a[mspace_js_1.CHTMLmspace.kind] = mspace_js_1.CHTMLmspace,
    _a[mpadded_js_1.CHTMLmpadded.kind] = mpadded_js_1.CHTMLmpadded,
    _a[menclose_js_1.CHTMLmenclose.kind] = menclose_js_1.CHTMLmenclose,
    _a[mfrac_js_1.CHTMLmfrac.kind] = mfrac_js_1.CHTMLmfrac,
    _a[msqrt_js_1.CHTMLmsqrt.kind] = msqrt_js_1.CHTMLmsqrt,
    _a[mroot_js_1.CHTMLmroot.kind] = mroot_js_1.CHTMLmroot,
    _a[msubsup_js_1.CHTMLmsub.kind] = msubsup_js_1.CHTMLmsub,
    _a[msubsup_js_1.CHTMLmsup.kind] = msubsup_js_1.CHTMLmsup,
    _a[msubsup_js_1.CHTMLmsubsup.kind] = msubsup_js_1.CHTMLmsubsup,
    _a[munderover_js_1.CHTMLmunder.kind] = munderover_js_1.CHTMLmunder,
    _a[munderover_js_1.CHTMLmover.kind] = munderover_js_1.CHTMLmover,
    _a[munderover_js_1.CHTMLmunderover.kind] = munderover_js_1.CHTMLmunderover,
    _a[mmultiscripts_js_1.CHTMLmmultiscripts.kind] = mmultiscripts_js_1.CHTMLmmultiscripts,
    _a[mfenced_js_1.CHTMLmfenced.kind] = mfenced_js_1.CHTMLmfenced,
    _a[mtable_js_1.CHTMLmtable.kind] = mtable_js_1.CHTMLmtable,
    _a[mtr_js_1.CHTMLmtr.kind] = mtr_js_1.CHTMLmtr,
    _a[mtr_js_1.CHTMLmlabeledtr.kind] = mtr_js_1.CHTMLmlabeledtr,
    _a[mtd_js_1.CHTMLmtd.kind] = mtd_js_1.CHTMLmtd,
    _a[maction_js_1.CHTMLmaction.kind] = maction_js_1.CHTMLmaction,
    _a[mglyph_js_1.CHTMLmglyph.kind] = mglyph_js_1.CHTMLmglyph,
    _a[semantics_js_1.CHTMLsemantics.kind] = semantics_js_1.CHTMLsemantics,
    _a[semantics_js_1.CHTMLannotation.kind] = semantics_js_1.CHTMLannotation,
    _a[semantics_js_1.CHTMLannotationXML.kind] = semantics_js_1.CHTMLannotationXML,
    _a[semantics_js_1.CHTMLxml.kind] = semantics_js_1.CHTMLxml,
    _a[TeXAtom_js_1.CHTMLTeXAtom.kind] = TeXAtom_js_1.CHTMLTeXAtom,
    _a[TextNode_js_1.CHTMLTextNode.kind] = TextNode_js_1.CHTMLTextNode,
    _a[Wrapper_js_1.CHTMLWrapper.kind] = Wrapper_js_1.CHTMLWrapper,
    _a);
//# sourceMappingURL=Wrappers.js.map

/***/ }),

/***/ 51534:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLTeXAtom = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var TeXAtom_js_1 = __webpack_require__(28324);
var TeXAtom_js_2 = __webpack_require__(66846);
var MmlNode_js_1 = __webpack_require__(18426);
var CHTMLTeXAtom = (function (_super) {
    __extends(CHTMLTeXAtom, _super);
    function CHTMLTeXAtom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLTeXAtom.prototype.toCHTML = function (parent) {
        _super.prototype.toCHTML.call(this, parent);
        this.adaptor.setAttribute(this.chtml, 'texclass', MmlNode_js_1.TEXCLASSNAMES[this.node.texClass]);
        if (this.node.texClass === MmlNode_js_1.TEXCLASS.VCENTER) {
            var bbox = this.childNodes[0].getBBox();
            var h = bbox.h, d = bbox.d;
            var a = this.font.params.axis_height;
            var dh = ((h + d) / 2 + a) - h;
            this.adaptor.setStyle(this.chtml, 'verticalAlign', this.em(dh));
        }
    };
    CHTMLTeXAtom.kind = TeXAtom_js_2.TeXAtom.prototype.kind;
    return CHTMLTeXAtom;
}((0, TeXAtom_js_1.CommonTeXAtomMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLTeXAtom = CHTMLTeXAtom;
//# sourceMappingURL=TeXAtom.js.map

/***/ }),

/***/ 12853:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLTextNode = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var Wrapper_js_1 = __webpack_require__(81129);
var TextNode_js_1 = __webpack_require__(2169);
var CHTMLTextNode = (function (_super) {
    __extends(CHTMLTextNode, _super);
    function CHTMLTextNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLTextNode.prototype.toCHTML = function (parent) {
        var e_1, _a;
        this.markUsed();
        var adaptor = this.adaptor;
        var variant = this.parent.variant;
        var text = this.node.getText();
        if (text.length === 0)
            return;
        if (variant === '-explicitFont') {
            adaptor.append(parent, this.jax.unknownText(text, variant, this.getBBox().w));
        }
        else {
            var chars = this.remappedText(text, variant);
            try {
                for (var chars_1 = __values(chars), chars_1_1 = chars_1.next(); !chars_1_1.done; chars_1_1 = chars_1.next()) {
                    var n = chars_1_1.value;
                    var data = this.getVariantChar(variant, n)[3];
                    var font = (data.f ? ' TEX-' + data.f : '');
                    var node = (data.unknown ?
                        this.jax.unknownText(String.fromCodePoint(n), variant) :
                        this.html('mjx-c', { class: this.char(n) + font }));
                    adaptor.append(parent, node);
                    !data.unknown && this.font.charUsage.add([variant, n]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (chars_1_1 && !chars_1_1.done && (_a = chars_1.return)) _a.call(chars_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    CHTMLTextNode.kind = MmlNode_js_1.TextNode.prototype.kind;
    CHTMLTextNode.autoStyle = false;
    CHTMLTextNode.styles = {
        'mjx-c': {
            display: 'inline-block'
        },
        'mjx-utext': {
            display: 'inline-block',
            padding: '.75em 0 .2em 0'
        }
    };
    return CHTMLTextNode;
}((0, TextNode_js_1.CommonTextNodeMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLTextNode = CHTMLTextNode;
//# sourceMappingURL=TextNode.js.map

/***/ }),

/***/ 64677:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmaction = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var maction_js_1 = __webpack_require__(86561);
var maction_js_2 = __webpack_require__(86561);
var maction_js_3 = __webpack_require__(79024);
var CHTMLmaction = (function (_super) {
    __extends(CHTMLmaction, _super);
    function CHTMLmaction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmaction.prototype.toCHTML = function (parent) {
        var chtml = this.standardCHTMLnode(parent);
        var child = this.selected;
        child.toCHTML(chtml);
        this.action(this, this.data);
    };
    CHTMLmaction.prototype.setEventHandler = function (type, handler) {
        this.chtml.addEventListener(type, handler);
    };
    CHTMLmaction.kind = maction_js_3.MmlMaction.prototype.kind;
    CHTMLmaction.styles = {
        'mjx-maction': {
            position: 'relative'
        },
        'mjx-maction > mjx-tool': {
            display: 'none',
            position: 'absolute',
            bottom: 0, right: 0,
            width: 0, height: 0,
            'z-index': 500
        },
        'mjx-tool > mjx-tip': {
            display: 'inline-block',
            padding: '.2em',
            border: '1px solid #888',
            'font-size': '70%',
            'background-color': '#F8F8F8',
            color: 'black',
            'box-shadow': '2px 2px 5px #AAAAAA'
        },
        'mjx-maction[toggle]': {
            cursor: 'pointer'
        },
        'mjx-status': {
            display: 'block',
            position: 'fixed',
            left: '1em',
            bottom: '1em',
            'min-width': '25%',
            padding: '.2em .4em',
            border: '1px solid #888',
            'font-size': '90%',
            'background-color': '#F8F8F8',
            color: 'black'
        }
    };
    CHTMLmaction.actions = new Map([
        ['toggle', [function (node, _data) {
                    node.adaptor.setAttribute(node.chtml, 'toggle', node.node.attributes.get('selection'));
                    var math = node.factory.jax.math;
                    var document = node.factory.jax.document;
                    var mml = node.node;
                    node.setEventHandler('click', function (event) {
                        if (!math.end.node) {
                            math.start.node = math.end.node = math.typesetRoot;
                            math.start.n = math.end.n = 0;
                        }
                        mml.nextToggleSelection();
                        math.rerender(document);
                        event.stopPropagation();
                    });
                }, {}]],
        ['tooltip', [function (node, data) {
                    var tip = node.childNodes[1];
                    if (!tip)
                        return;
                    if (tip.node.isKind('mtext')) {
                        var text = tip.node.getText();
                        node.adaptor.setAttribute(node.chtml, 'title', text);
                    }
                    else {
                        var adaptor_1 = node.adaptor;
                        var tool_1 = adaptor_1.append(node.chtml, node.html('mjx-tool', {
                            style: { bottom: node.em(-node.dy), right: node.em(-node.dx) }
                        }, [node.html('mjx-tip')]));
                        tip.toCHTML(adaptor_1.firstChild(tool_1));
                        node.setEventHandler('mouseover', function (event) {
                            data.stopTimers(node, data);
                            var timeout = setTimeout(function () { return adaptor_1.setStyle(tool_1, 'display', 'block'); }, data.postDelay);
                            data.hoverTimer.set(node, timeout);
                            event.stopPropagation();
                        });
                        node.setEventHandler('mouseout', function (event) {
                            data.stopTimers(node, data);
                            var timeout = setTimeout(function () { return adaptor_1.setStyle(tool_1, 'display', ''); }, data.clearDelay);
                            data.clearTimer.set(node, timeout);
                            event.stopPropagation();
                        });
                    }
                }, maction_js_2.TooltipData]],
        ['statusline', [function (node, data) {
                    var tip = node.childNodes[1];
                    if (!tip)
                        return;
                    if (tip.node.isKind('mtext')) {
                        var adaptor_2 = node.adaptor;
                        var text_1 = tip.node.getText();
                        adaptor_2.setAttribute(node.chtml, 'statusline', text_1);
                        node.setEventHandler('mouseover', function (event) {
                            if (data.status === null) {
                                var body = adaptor_2.body(adaptor_2.document);
                                data.status = adaptor_2.append(body, node.html('mjx-status', {}, [node.text(text_1)]));
                            }
                            event.stopPropagation();
                        });
                        node.setEventHandler('mouseout', function (event) {
                            if (data.status) {
                                adaptor_2.remove(data.status);
                                data.status = null;
                            }
                            event.stopPropagation();
                        });
                    }
                }, {
                    status: null
                }]]
    ]);
    return CHTMLmaction;
}((0, maction_js_1.CommonMactionMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmaction = CHTMLmaction;
//# sourceMappingURL=maction.js.map

/***/ }),

/***/ 5229:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmath = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var math_js_1 = __webpack_require__(68467);
var math_js_2 = __webpack_require__(27225);
var BBox_js_1 = __webpack_require__(83292);
var CHTMLmath = (function (_super) {
    __extends(CHTMLmath, _super);
    function CHTMLmath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmath.prototype.toCHTML = function (parent) {
        _super.prototype.toCHTML.call(this, parent);
        var chtml = this.chtml;
        var adaptor = this.adaptor;
        var display = (this.node.attributes.get('display') === 'block');
        if (display) {
            adaptor.setAttribute(chtml, 'display', 'true');
            adaptor.setAttribute(parent, 'display', 'true');
            this.handleDisplay(parent);
        }
        else {
            this.handleInline(parent);
        }
        adaptor.addClass(chtml, 'MJX-TEX');
    };
    CHTMLmath.prototype.handleDisplay = function (parent) {
        var adaptor = this.adaptor;
        var _a = __read(this.getAlignShift(), 2), align = _a[0], shift = _a[1];
        if (align !== 'center') {
            adaptor.setAttribute(parent, 'justify', align);
        }
        if (this.bbox.pwidth === BBox_js_1.BBox.fullWidth) {
            adaptor.setAttribute(parent, 'width', 'full');
            if (this.jax.table) {
                var _b = this.jax.table.getOuterBBox(), L = _b.L, w = _b.w, R = _b.R;
                if (align === 'right') {
                    R = Math.max(R || -shift, -shift);
                }
                else if (align === 'left') {
                    L = Math.max(L || shift, shift);
                }
                else if (align === 'center') {
                    w += 2 * Math.abs(shift);
                }
                var W = this.em(Math.max(0, L + w + R));
                adaptor.setStyle(parent, 'min-width', W);
                adaptor.setStyle(this.jax.table.chtml, 'min-width', W);
            }
        }
        else {
            this.setIndent(this.chtml, align, shift);
        }
    };
    CHTMLmath.prototype.handleInline = function (parent) {
        var adaptor = this.adaptor;
        var margin = adaptor.getStyle(this.chtml, 'margin-right');
        if (margin) {
            adaptor.setStyle(this.chtml, 'margin-right', '');
            adaptor.setStyle(parent, 'margin-right', margin);
            adaptor.setStyle(parent, 'width', '0');
        }
    };
    CHTMLmath.prototype.setChildPWidths = function (recompute, w, clear) {
        if (w === void 0) { w = null; }
        if (clear === void 0) { clear = true; }
        return (this.parent ? _super.prototype.setChildPWidths.call(this, recompute, w, clear) : false);
    };
    CHTMLmath.kind = math_js_2.MmlMath.prototype.kind;
    CHTMLmath.styles = {
        'mjx-math': {
            'line-height': 0,
            'text-align': 'left',
            'text-indent': 0,
            'font-style': 'normal',
            'font-weight': 'normal',
            'font-size': '100%',
            'font-size-adjust': 'none',
            'letter-spacing': 'normal',
            'border-collapse': 'collapse',
            'word-wrap': 'normal',
            'word-spacing': 'normal',
            'white-space': 'nowrap',
            'direction': 'ltr',
            'padding': '1px 0'
        },
        'mjx-container[jax="CHTML"][display="true"]': {
            display: 'block',
            'text-align': 'center',
            margin: '1em 0'
        },
        'mjx-container[jax="CHTML"][display="true"][width="full"]': {
            display: 'flex'
        },
        'mjx-container[jax="CHTML"][display="true"] mjx-math': {
            padding: 0
        },
        'mjx-container[jax="CHTML"][justify="left"]': {
            'text-align': 'left'
        },
        'mjx-container[jax="CHTML"][justify="right"]': {
            'text-align': 'right'
        }
    };
    return CHTMLmath;
}((0, math_js_1.CommonMathMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmath = CHTMLmath;
//# sourceMappingURL=math.js.map

/***/ }),

/***/ 49469:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmenclose = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var menclose_js_1 = __webpack_require__(32306);
var Notation = __importStar(__webpack_require__(55043));
var menclose_js_2 = __webpack_require__(22599);
var lengths_js_1 = __webpack_require__(77130);
function Angle(x, y) {
    return Math.atan2(x, y).toFixed(3).replace(/\.?0+$/, '');
}
var ANGLE = Angle(Notation.ARROWDX, Notation.ARROWY);
var CHTMLmenclose = (function (_super) {
    __extends(CHTMLmenclose, _super);
    function CHTMLmenclose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmenclose.prototype.toCHTML = function (parent) {
        var e_1, _a, e_2, _b;
        var adaptor = this.adaptor;
        var chtml = this.standardCHTMLnode(parent);
        var block = adaptor.append(chtml, this.html('mjx-box'));
        if (this.renderChild) {
            this.renderChild(this, block);
        }
        else {
            this.childNodes[0].toCHTML(block);
        }
        try {
            for (var _c = __values(Object.keys(this.notations)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var name_1 = _d.value;
                var notation = this.notations[name_1];
                !notation.renderChild && notation.renderer(this, block);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var pbox = this.getPadding();
        try {
            for (var _e = __values(Notation.sideNames), _f = _e.next(); !_f.done; _f = _e.next()) {
                var name_2 = _f.value;
                var i = Notation.sideIndex[name_2];
                pbox[i] > 0 && adaptor.setStyle(block, 'padding-' + name_2, this.em(pbox[i]));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    CHTMLmenclose.prototype.arrow = function (w, a, double, offset, dist) {
        if (offset === void 0) { offset = ''; }
        if (dist === void 0) { dist = 0; }
        var W = this.getBBox().w;
        var style = { width: this.em(w) };
        if (W !== w) {
            style.left = this.em((W - w) / 2);
        }
        if (a) {
            style.transform = 'rotate(' + this.fixed(a) + 'rad)';
        }
        var arrow = this.html('mjx-arrow', { style: style }, [
            this.html('mjx-aline'), this.html('mjx-rthead'), this.html('mjx-rbhead')
        ]);
        if (double) {
            this.adaptor.append(arrow, this.html('mjx-lthead'));
            this.adaptor.append(arrow, this.html('mjx-lbhead'));
            this.adaptor.setAttribute(arrow, 'double', 'true');
        }
        this.adjustArrow(arrow, double);
        this.moveArrow(arrow, offset, dist);
        return arrow;
    };
    CHTMLmenclose.prototype.adjustArrow = function (arrow, double) {
        var _this = this;
        var t = this.thickness;
        var head = this.arrowhead;
        if (head.x === Notation.ARROWX && head.y === Notation.ARROWY &&
            head.dx === Notation.ARROWDX && t === Notation.THICKNESS)
            return;
        var _a = __read([t * head.x, t * head.y].map(function (x) { return _this.em(x); }), 2), x = _a[0], y = _a[1];
        var a = Angle(head.dx, head.y);
        var _b = __read(this.adaptor.childNodes(arrow), 5), line = _b[0], rthead = _b[1], rbhead = _b[2], lthead = _b[3], lbhead = _b[4];
        this.adjustHead(rthead, [y, '0', '1px', x], a);
        this.adjustHead(rbhead, ['1px', '0', y, x], '-' + a);
        this.adjustHead(lthead, [y, x, '1px', '0'], '-' + a);
        this.adjustHead(lbhead, ['1px', x, y, '0'], a);
        this.adjustLine(line, t, head.x, double);
    };
    CHTMLmenclose.prototype.adjustHead = function (head, border, a) {
        if (head) {
            this.adaptor.setStyle(head, 'border-width', border.join(' '));
            this.adaptor.setStyle(head, 'transform', 'skewX(' + a + 'rad)');
        }
    };
    CHTMLmenclose.prototype.adjustLine = function (line, t, x, double) {
        this.adaptor.setStyle(line, 'borderTop', this.em(t) + ' solid');
        this.adaptor.setStyle(line, 'top', this.em(-t / 2));
        this.adaptor.setStyle(line, 'right', this.em(t * (x - 1)));
        if (double) {
            this.adaptor.setStyle(line, 'left', this.em(t * (x - 1)));
        }
    };
    CHTMLmenclose.prototype.moveArrow = function (arrow, offset, d) {
        if (!d)
            return;
        var transform = this.adaptor.getStyle(arrow, 'transform');
        this.adaptor.setStyle(arrow, 'transform', "translate".concat(offset, "(").concat(this.em(-d), ")").concat((transform ? ' ' + transform : '')));
    };
    CHTMLmenclose.prototype.adjustBorder = function (node) {
        if (this.thickness !== Notation.THICKNESS) {
            this.adaptor.setStyle(node, 'borderWidth', this.em(this.thickness));
        }
        return node;
    };
    CHTMLmenclose.prototype.adjustThickness = function (shape) {
        if (this.thickness !== Notation.THICKNESS) {
            this.adaptor.setStyle(shape, 'strokeWidth', this.fixed(this.thickness));
        }
        return shape;
    };
    CHTMLmenclose.prototype.fixed = function (m, n) {
        if (n === void 0) { n = 3; }
        if (Math.abs(m) < .0006) {
            return '0';
        }
        return m.toFixed(n).replace(/\.?0+$/, '');
    };
    CHTMLmenclose.prototype.em = function (m) {
        return _super.prototype.em.call(this, m);
    };
    CHTMLmenclose.kind = menclose_js_2.MmlMenclose.prototype.kind;
    CHTMLmenclose.styles = {
        'mjx-menclose': {
            position: 'relative'
        },
        'mjx-menclose > mjx-dstrike': {
            display: 'inline-block',
            left: 0, top: 0,
            position: 'absolute',
            'border-top': Notation.SOLID,
            'transform-origin': 'top left'
        },
        'mjx-menclose > mjx-ustrike': {
            display: 'inline-block',
            left: 0, bottom: 0,
            position: 'absolute',
            'border-top': Notation.SOLID,
            'transform-origin': 'bottom left'
        },
        'mjx-menclose > mjx-hstrike': {
            'border-top': Notation.SOLID,
            position: 'absolute',
            left: 0, right: 0, bottom: '50%',
            transform: 'translateY(' + (0, lengths_js_1.em)(Notation.THICKNESS / 2) + ')'
        },
        'mjx-menclose > mjx-vstrike': {
            'border-left': Notation.SOLID,
            position: 'absolute',
            top: 0, bottom: 0, right: '50%',
            transform: 'translateX(' + (0, lengths_js_1.em)(Notation.THICKNESS / 2) + ')'
        },
        'mjx-menclose > mjx-rbox': {
            position: 'absolute',
            top: 0, bottom: 0, right: 0, left: 0,
            'border': Notation.SOLID,
            'border-radius': (0, lengths_js_1.em)(Notation.THICKNESS + Notation.PADDING)
        },
        'mjx-menclose > mjx-cbox': {
            position: 'absolute',
            top: 0, bottom: 0, right: 0, left: 0,
            'border': Notation.SOLID,
            'border-radius': '50%'
        },
        'mjx-menclose > mjx-arrow': {
            position: 'absolute',
            left: 0, bottom: '50%', height: 0, width: 0
        },
        'mjx-menclose > mjx-arrow > *': {
            display: 'block',
            position: 'absolute',
            'transform-origin': 'bottom',
            'border-left': (0, lengths_js_1.em)(Notation.THICKNESS * Notation.ARROWX) + ' solid',
            'border-right': 0,
            'box-sizing': 'border-box'
        },
        'mjx-menclose > mjx-arrow > mjx-aline': {
            left: 0, top: (0, lengths_js_1.em)(-Notation.THICKNESS / 2),
            right: (0, lengths_js_1.em)(Notation.THICKNESS * (Notation.ARROWX - 1)), height: 0,
            'border-top': (0, lengths_js_1.em)(Notation.THICKNESS) + ' solid',
            'border-left': 0
        },
        'mjx-menclose > mjx-arrow[double] > mjx-aline': {
            left: (0, lengths_js_1.em)(Notation.THICKNESS * (Notation.ARROWX - 1)), height: 0,
        },
        'mjx-menclose > mjx-arrow > mjx-rthead': {
            transform: 'skewX(' + ANGLE + 'rad)',
            right: 0, bottom: '-1px',
            'border-bottom': '1px solid transparent',
            'border-top': (0, lengths_js_1.em)(Notation.THICKNESS * Notation.ARROWY) + ' solid transparent'
        },
        'mjx-menclose > mjx-arrow > mjx-rbhead': {
            transform: 'skewX(-' + ANGLE + 'rad)',
            'transform-origin': 'top',
            right: 0, top: '-1px',
            'border-top': '1px solid transparent',
            'border-bottom': (0, lengths_js_1.em)(Notation.THICKNESS * Notation.ARROWY) + ' solid transparent'
        },
        'mjx-menclose > mjx-arrow > mjx-lthead': {
            transform: 'skewX(-' + ANGLE + 'rad)',
            left: 0, bottom: '-1px',
            'border-left': 0,
            'border-right': (0, lengths_js_1.em)(Notation.THICKNESS * Notation.ARROWX) + ' solid',
            'border-bottom': '1px solid transparent',
            'border-top': (0, lengths_js_1.em)(Notation.THICKNESS * Notation.ARROWY) + ' solid transparent'
        },
        'mjx-menclose > mjx-arrow > mjx-lbhead': {
            transform: 'skewX(' + ANGLE + 'rad)',
            'transform-origin': 'top',
            left: 0, top: '-1px',
            'border-left': 0,
            'border-right': (0, lengths_js_1.em)(Notation.THICKNESS * Notation.ARROWX) + ' solid',
            'border-top': '1px solid transparent',
            'border-bottom': (0, lengths_js_1.em)(Notation.THICKNESS * Notation.ARROWY) + ' solid transparent'
        },
        'mjx-menclose > dbox': {
            position: 'absolute',
            top: 0, bottom: 0, left: (0, lengths_js_1.em)(-1.5 * Notation.PADDING),
            width: (0, lengths_js_1.em)(3 * Notation.PADDING),
            border: (0, lengths_js_1.em)(Notation.THICKNESS) + ' solid',
            'border-radius': '50%',
            'clip-path': 'inset(0 0 0 ' + (0, lengths_js_1.em)(1.5 * Notation.PADDING) + ')',
            'box-sizing': 'border-box'
        }
    };
    CHTMLmenclose.notations = new Map([
        Notation.Border('top'),
        Notation.Border('right'),
        Notation.Border('bottom'),
        Notation.Border('left'),
        Notation.Border2('actuarial', 'top', 'right'),
        Notation.Border2('madruwb', 'bottom', 'right'),
        Notation.DiagonalStrike('up', 1),
        Notation.DiagonalStrike('down', -1),
        ['horizontalstrike', {
                renderer: Notation.RenderElement('hstrike', 'Y'),
                bbox: function (node) { return [0, node.padding, 0, node.padding]; }
            }],
        ['verticalstrike', {
                renderer: Notation.RenderElement('vstrike', 'X'),
                bbox: function (node) { return [node.padding, 0, node.padding, 0]; }
            }],
        ['box', {
                renderer: function (node, child) {
                    node.adaptor.setStyle(child, 'border', node.em(node.thickness) + ' solid');
                },
                bbox: Notation.fullBBox,
                border: Notation.fullBorder,
                remove: 'left right top bottom'
            }],
        ['roundedbox', {
                renderer: Notation.RenderElement('rbox'),
                bbox: Notation.fullBBox
            }],
        ['circle', {
                renderer: Notation.RenderElement('cbox'),
                bbox: Notation.fullBBox
            }],
        ['phasorangle', {
                renderer: function (node, child) {
                    var _a = node.getBBox(), h = _a.h, d = _a.d;
                    var _b = __read(node.getArgMod(1.75 * node.padding, h + d), 2), a = _b[0], W = _b[1];
                    var t = node.thickness * Math.sin(a) * .9;
                    node.adaptor.setStyle(child, 'border-bottom', node.em(node.thickness) + ' solid');
                    var strike = node.adjustBorder(node.html('mjx-ustrike', { style: {
                            width: node.em(W),
                            transform: 'translateX(' + node.em(t) + ') rotate(' + node.fixed(-a) + 'rad)',
                        } }));
                    node.adaptor.append(node.chtml, strike);
                },
                bbox: function (node) {
                    var p = node.padding / 2;
                    var t = node.thickness;
                    return [2 * p, p, p + t, 3 * p + t];
                },
                border: function (node) { return [0, 0, node.thickness, 0]; },
                remove: 'bottom'
            }],
        Notation.Arrow('up'),
        Notation.Arrow('down'),
        Notation.Arrow('left'),
        Notation.Arrow('right'),
        Notation.Arrow('updown'),
        Notation.Arrow('leftright'),
        Notation.DiagonalArrow('updiagonal'),
        Notation.DiagonalArrow('northeast'),
        Notation.DiagonalArrow('southeast'),
        Notation.DiagonalArrow('northwest'),
        Notation.DiagonalArrow('southwest'),
        Notation.DiagonalArrow('northeastsouthwest'),
        Notation.DiagonalArrow('northwestsoutheast'),
        ['longdiv', {
                renderer: function (node, child) {
                    var adaptor = node.adaptor;
                    adaptor.setStyle(child, 'border-top', node.em(node.thickness) + ' solid');
                    var arc = adaptor.append(node.chtml, node.html('dbox'));
                    var t = node.thickness;
                    var p = node.padding;
                    if (t !== Notation.THICKNESS) {
                        adaptor.setStyle(arc, 'border-width', node.em(t));
                    }
                    if (p !== Notation.PADDING) {
                        adaptor.setStyle(arc, 'left', node.em(-1.5 * p));
                        adaptor.setStyle(arc, 'width', node.em(3 * p));
                        adaptor.setStyle(arc, 'clip-path', 'inset(0 0 0 ' + node.em(1.5 * p) + ')');
                    }
                },
                bbox: function (node) {
                    var p = node.padding;
                    var t = node.thickness;
                    return [p + t, p, p, 2 * p + t / 2];
                }
            }],
        ['radical', {
                renderer: function (node, child) {
                    node.msqrt.toCHTML(child);
                    var TRBL = node.sqrtTRBL();
                    node.adaptor.setStyle(node.msqrt.chtml, 'margin', TRBL.map(function (x) { return node.em(-x); }).join(' '));
                },
                init: function (node) {
                    node.msqrt = node.createMsqrt(node.childNodes[0]);
                },
                bbox: function (node) { return node.sqrtTRBL(); },
                renderChild: true
            }]
    ]);
    return CHTMLmenclose;
}((0, menclose_js_1.CommonMencloseMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmenclose = CHTMLmenclose;
//# sourceMappingURL=menclose.js.map

/***/ }),

/***/ 7233:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmfenced = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mfenced_js_1 = __webpack_require__(5043);
var mfenced_js_2 = __webpack_require__(90719);
var CHTMLmfenced = (function (_super) {
    __extends(CHTMLmfenced, _super);
    function CHTMLmfenced() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmfenced.prototype.toCHTML = function (parent) {
        var chtml = this.standardCHTMLnode(parent);
        this.mrow.toCHTML(chtml);
    };
    CHTMLmfenced.kind = mfenced_js_2.MmlMfenced.prototype.kind;
    return CHTMLmfenced;
}((0, mfenced_js_1.CommonMfencedMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmfenced = CHTMLmfenced;
//# sourceMappingURL=mfenced.js.map

/***/ }),

/***/ 72929:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmfrac = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mfrac_js_1 = __webpack_require__(30811);
var mfrac_js_2 = __webpack_require__(294);
var CHTMLmfrac = (function (_super) {
    __extends(CHTMLmfrac, _super);
    function CHTMLmfrac() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmfrac.prototype.toCHTML = function (parent) {
        this.standardCHTMLnode(parent);
        var _a = this.node.attributes.getList('linethickness', 'bevelled'), linethickness = _a.linethickness, bevelled = _a.bevelled;
        var display = this.isDisplay();
        if (bevelled) {
            this.makeBevelled(display);
        }
        else {
            var thickness = this.length2em(String(linethickness), .06);
            if (thickness === 0) {
                this.makeAtop(display);
            }
            else {
                this.makeFraction(display, thickness);
            }
        }
    };
    CHTMLmfrac.prototype.makeFraction = function (display, t) {
        var _a = this.node.attributes.getList('numalign', 'denomalign'), numalign = _a.numalign, denomalign = _a.denomalign;
        var withDelims = this.node.getProperty('withDelims');
        var attr = (display ? { type: 'd' } : {});
        var fattr = (withDelims ? __assign(__assign({}, attr), { delims: 'true' }) : __assign({}, attr));
        var nattr = (numalign !== 'center' ? { align: numalign } : {});
        var dattr = (denomalign !== 'center' ? { align: denomalign } : {});
        var dsattr = __assign({}, attr), nsattr = __assign({}, attr);
        var tex = this.font.params;
        if (t !== .06) {
            var a = tex.axis_height;
            var tEm = this.em(t);
            var _b = this.getTUV(display, t), T = _b.T, u = _b.u, v = _b.v;
            var m = (display ? this.em(3 * t) : tEm) + ' -.1em';
            attr.style = { height: tEm, 'border-top': tEm + ' solid', margin: m };
            var nh = this.em(Math.max(0, u));
            nsattr.style = { height: nh, 'vertical-align': '-' + nh };
            dsattr.style = { height: this.em(Math.max(0, v)) };
            fattr.style = { 'vertical-align': this.em(a - T) };
        }
        var num, den;
        this.adaptor.append(this.chtml, this.html('mjx-frac', fattr, [
            num = this.html('mjx-num', nattr, [this.html('mjx-nstrut', nsattr)]),
            this.html('mjx-dbox', {}, [
                this.html('mjx-dtable', {}, [
                    this.html('mjx-line', attr),
                    this.html('mjx-row', {}, [
                        den = this.html('mjx-den', dattr, [this.html('mjx-dstrut', dsattr)])
                    ])
                ])
            ])
        ]));
        this.childNodes[0].toCHTML(num);
        this.childNodes[1].toCHTML(den);
    };
    CHTMLmfrac.prototype.makeAtop = function (display) {
        var _a = this.node.attributes.getList('numalign', 'denomalign'), numalign = _a.numalign, denomalign = _a.denomalign;
        var withDelims = this.node.getProperty('withDelims');
        var attr = (display ? { type: 'd', atop: true } : { atop: true });
        var fattr = (withDelims ? __assign(__assign({}, attr), { delims: true }) : __assign({}, attr));
        var nattr = (numalign !== 'center' ? { align: numalign } : {});
        var dattr = (denomalign !== 'center' ? { align: denomalign } : {});
        var _b = this.getUVQ(display), v = _b.v, q = _b.q;
        nattr.style = { 'padding-bottom': this.em(q) };
        fattr.style = { 'vertical-align': this.em(-v) };
        var num, den;
        this.adaptor.append(this.chtml, this.html('mjx-frac', fattr, [
            num = this.html('mjx-num', nattr),
            den = this.html('mjx-den', dattr)
        ]));
        this.childNodes[0].toCHTML(num);
        this.childNodes[1].toCHTML(den);
    };
    CHTMLmfrac.prototype.makeBevelled = function (display) {
        var adaptor = this.adaptor;
        adaptor.setAttribute(this.chtml, 'bevelled', 'ture');
        var num = adaptor.append(this.chtml, this.html('mjx-num'));
        this.childNodes[0].toCHTML(num);
        this.bevel.toCHTML(this.chtml);
        var den = adaptor.append(this.chtml, this.html('mjx-den'));
        this.childNodes[1].toCHTML(den);
        var _a = this.getBevelData(display), u = _a.u, v = _a.v, delta = _a.delta, nbox = _a.nbox, dbox = _a.dbox;
        if (u) {
            adaptor.setStyle(num, 'verticalAlign', this.em(u / nbox.scale));
        }
        if (v) {
            adaptor.setStyle(den, 'verticalAlign', this.em(v / dbox.scale));
        }
        var dx = this.em(-delta / 2);
        adaptor.setStyle(this.bevel.chtml, 'marginLeft', dx);
        adaptor.setStyle(this.bevel.chtml, 'marginRight', dx);
    };
    CHTMLmfrac.kind = mfrac_js_2.MmlMfrac.prototype.kind;
    CHTMLmfrac.styles = {
        'mjx-frac': {
            display: 'inline-block',
            'vertical-align': '0.17em',
            padding: '0 .22em'
        },
        'mjx-frac[type="d"]': {
            'vertical-align': '.04em'
        },
        'mjx-frac[delims]': {
            padding: '0 .1em'
        },
        'mjx-frac[atop]': {
            padding: '0 .12em'
        },
        'mjx-frac[atop][delims]': {
            padding: '0'
        },
        'mjx-dtable': {
            display: 'inline-table',
            width: '100%'
        },
        'mjx-dtable > *': {
            'font-size': '2000%'
        },
        'mjx-dbox': {
            display: 'block',
            'font-size': '5%'
        },
        'mjx-num': {
            display: 'block',
            'text-align': 'center'
        },
        'mjx-den': {
            display: 'block',
            'text-align': 'center'
        },
        'mjx-mfrac[bevelled] > mjx-num': {
            display: 'inline-block'
        },
        'mjx-mfrac[bevelled] > mjx-den': {
            display: 'inline-block'
        },
        'mjx-den[align="right"], mjx-num[align="right"]': {
            'text-align': 'right'
        },
        'mjx-den[align="left"], mjx-num[align="left"]': {
            'text-align': 'left'
        },
        'mjx-nstrut': {
            display: 'inline-block',
            height: '.054em',
            width: 0,
            'vertical-align': '-.054em'
        },
        'mjx-nstrut[type="d"]': {
            height: '.217em',
            'vertical-align': '-.217em',
        },
        'mjx-dstrut': {
            display: 'inline-block',
            height: '.505em',
            width: 0
        },
        'mjx-dstrut[type="d"]': {
            height: '.726em',
        },
        'mjx-line': {
            display: 'block',
            'box-sizing': 'border-box',
            'min-height': '1px',
            height: '.06em',
            'border-top': '.06em solid',
            margin: '.06em -.1em',
            overflow: 'hidden'
        },
        'mjx-line[type="d"]': {
            margin: '.18em -.1em'
        }
    };
    return CHTMLmfrac;
}((0, mfrac_js_1.CommonMfracMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmfrac = CHTMLmfrac;
//# sourceMappingURL=mfrac.js.map

/***/ }),

/***/ 47354:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmglyph = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mglyph_js_1 = __webpack_require__(981);
var mglyph_js_2 = __webpack_require__(83954);
var CHTMLmglyph = (function (_super) {
    __extends(CHTMLmglyph, _super);
    function CHTMLmglyph() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmglyph.prototype.toCHTML = function (parent) {
        var chtml = this.standardCHTMLnode(parent);
        if (this.charWrapper) {
            this.charWrapper.toCHTML(chtml);
            return;
        }
        var _a = this.node.attributes.getList('src', 'alt'), src = _a.src, alt = _a.alt;
        var styles = {
            width: this.em(this.width),
            height: this.em(this.height)
        };
        if (this.valign) {
            styles.verticalAlign = this.em(this.valign);
        }
        var img = this.html('img', { src: src, style: styles, alt: alt, title: alt });
        this.adaptor.append(chtml, img);
    };
    CHTMLmglyph.kind = mglyph_js_2.MmlMglyph.prototype.kind;
    CHTMLmglyph.styles = {
        'mjx-mglyph > img': {
            display: 'inline-block',
            border: 0,
            padding: 0
        }
    };
    return CHTMLmglyph;
}((0, mglyph_js_1.CommonMglyphMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmglyph = CHTMLmglyph;
//# sourceMappingURL=mglyph.js.map

/***/ }),

/***/ 91307:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmi = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mi_js_1 = __webpack_require__(98296);
var mi_js_2 = __webpack_require__(16689);
var CHTMLmi = (function (_super) {
    __extends(CHTMLmi, _super);
    function CHTMLmi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmi.kind = mi_js_2.MmlMi.prototype.kind;
    return CHTMLmi;
}((0, mi_js_1.CommonMiMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmi = CHTMLmi;
//# sourceMappingURL=mi.js.map

/***/ }),

/***/ 7331:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmmultiscripts = void 0;
var msubsup_js_1 = __webpack_require__(37717);
var mmultiscripts_js_1 = __webpack_require__(86720);
var mmultiscripts_js_2 = __webpack_require__(13195);
var string_js_1 = __webpack_require__(33353);
var CHTMLmmultiscripts = (function (_super) {
    __extends(CHTMLmmultiscripts, _super);
    function CHTMLmmultiscripts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmmultiscripts.prototype.toCHTML = function (parent) {
        var chtml = this.standardCHTMLnode(parent);
        var data = this.scriptData;
        var scriptalign = this.node.getProperty('scriptalign') || 'right left';
        var _a = __read((0, string_js_1.split)(scriptalign + ' ' + scriptalign), 2), preAlign = _a[0], postAlign = _a[1];
        var sub = this.combinePrePost(data.sub, data.psub);
        var sup = this.combinePrePost(data.sup, data.psup);
        var _b = __read(this.getUVQ(sub, sup), 2), u = _b[0], v = _b[1];
        if (data.numPrescripts) {
            var scripts = this.addScripts(u, -v, true, data.psub, data.psup, this.firstPrescript, data.numPrescripts);
            preAlign !== 'right' && this.adaptor.setAttribute(scripts, 'script-align', preAlign);
        }
        this.childNodes[0].toCHTML(chtml);
        if (data.numScripts) {
            var scripts = this.addScripts(u, -v, false, data.sub, data.sup, 1, data.numScripts);
            postAlign !== 'left' && this.adaptor.setAttribute(scripts, 'script-align', postAlign);
        }
    };
    CHTMLmmultiscripts.prototype.addScripts = function (u, v, isPre, sub, sup, i, n) {
        var adaptor = this.adaptor;
        var q = (u - sup.d) + (v - sub.h);
        var U = (u < 0 && v === 0 ? sub.h + u : u);
        var rowdef = (q > 0 ? { style: { height: this.em(q) } } : {});
        var tabledef = (U ? { style: { 'vertical-align': this.em(U) } } : {});
        var supRow = this.html('mjx-row');
        var sepRow = this.html('mjx-row', rowdef);
        var subRow = this.html('mjx-row');
        var name = 'mjx-' + (isPre ? 'pre' : '') + 'scripts';
        var m = i + 2 * n;
        while (i < m) {
            this.childNodes[i++].toCHTML(adaptor.append(subRow, this.html('mjx-cell')));
            this.childNodes[i++].toCHTML(adaptor.append(supRow, this.html('mjx-cell')));
        }
        return adaptor.append(this.chtml, this.html(name, tabledef, [supRow, sepRow, subRow]));
    };
    CHTMLmmultiscripts.kind = mmultiscripts_js_2.MmlMmultiscripts.prototype.kind;
    CHTMLmmultiscripts.styles = {
        'mjx-prescripts': {
            display: 'inline-table',
            'padding-left': '.05em'
        },
        'mjx-scripts': {
            display: 'inline-table',
            'padding-right': '.05em'
        },
        'mjx-prescripts > mjx-row > mjx-cell': {
            'text-align': 'right'
        },
        '[script-align="left"] > mjx-row > mjx-cell': {
            'text-align': 'left'
        },
        '[script-align="center"] > mjx-row > mjx-cell': {
            'text-align': 'center'
        },
        '[script-align="right"] > mjx-row > mjx-cell': {
            'text-align': 'right'
        }
    };
    return CHTMLmmultiscripts;
}((0, mmultiscripts_js_1.CommonMmultiscriptsMixin)(msubsup_js_1.CHTMLmsubsup)));
exports.CHTMLmmultiscripts = CHTMLmmultiscripts;
//# sourceMappingURL=mmultiscripts.js.map

/***/ }),

/***/ 61422:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmn = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mn_js_1 = __webpack_require__(72309);
var mn_js_2 = __webpack_require__(94411);
var CHTMLmn = (function (_super) {
    __extends(CHTMLmn, _super);
    function CHTMLmn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmn.kind = mn_js_2.MmlMn.prototype.kind;
    return CHTMLmn;
}((0, mn_js_1.CommonMnMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmn = CHTMLmn;
//# sourceMappingURL=mn.js.map

/***/ }),

/***/ 53241:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmo = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mo_js_1 = __webpack_require__(9579);
var mo_js_2 = __webpack_require__(5213);
var CHTMLmo = (function (_super) {
    __extends(CHTMLmo, _super);
    function CHTMLmo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmo.prototype.toCHTML = function (parent) {
        var e_1, _a;
        var attributes = this.node.attributes;
        var symmetric = attributes.get('symmetric') && this.stretch.dir !== 2;
        var stretchy = this.stretch.dir !== 0;
        if (stretchy && this.size === null) {
            this.getStretchedVariant([]);
        }
        var chtml = this.standardCHTMLnode(parent);
        if (stretchy && this.size < 0) {
            this.stretchHTML(chtml);
        }
        else {
            if (symmetric || attributes.get('largeop')) {
                var u = this.em(this.getCenterOffset());
                if (u !== '0') {
                    this.adaptor.setStyle(chtml, 'verticalAlign', u);
                }
            }
            if (this.node.getProperty('mathaccent')) {
                this.adaptor.setStyle(chtml, 'width', '0');
                this.adaptor.setStyle(chtml, 'margin-left', this.em(this.getAccentOffset()));
            }
            try {
                for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    child.toCHTML(chtml);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    CHTMLmo.prototype.stretchHTML = function (chtml) {
        var c = this.getText().codePointAt(0);
        this.font.delimUsage.add(c);
        this.childNodes[0].markUsed();
        var delim = this.stretch;
        var stretch = delim.stretch;
        var content = [];
        if (stretch[0]) {
            content.push(this.html('mjx-beg', {}, [this.html('mjx-c')]));
        }
        content.push(this.html('mjx-ext', {}, [this.html('mjx-c')]));
        if (stretch.length === 4) {
            content.push(this.html('mjx-mid', {}, [this.html('mjx-c')]), this.html('mjx-ext', {}, [this.html('mjx-c')]));
        }
        if (stretch[2]) {
            content.push(this.html('mjx-end', {}, [this.html('mjx-c')]));
        }
        var styles = {};
        var _a = this.bbox, h = _a.h, d = _a.d, w = _a.w;
        if (delim.dir === 1) {
            content.push(this.html('mjx-mark'));
            styles.height = this.em(h + d);
            styles.verticalAlign = this.em(-d);
        }
        else {
            styles.width = this.em(w);
        }
        var dir = mo_js_1.DirectionVH[delim.dir];
        var properties = { class: this.char(delim.c || c), style: styles };
        var html = this.html('mjx-stretchy-' + dir, properties, content);
        this.adaptor.append(chtml, html);
    };
    CHTMLmo.kind = mo_js_2.MmlMo.prototype.kind;
    CHTMLmo.styles = {
        'mjx-stretchy-h': {
            display: 'inline-table',
            width: '100%'
        },
        'mjx-stretchy-h > *': {
            display: 'table-cell',
            width: 0
        },
        'mjx-stretchy-h > * > mjx-c': {
            display: 'inline-block',
            transform: 'scalex(1.0000001)'
        },
        'mjx-stretchy-h > * > mjx-c::before': {
            display: 'inline-block',
            width: 'initial'
        },
        'mjx-stretchy-h > mjx-ext': {
            '/* IE */ overflow': 'hidden',
            '/* others */ overflow': 'clip visible',
            width: '100%'
        },
        'mjx-stretchy-h > mjx-ext > mjx-c::before': {
            transform: 'scalex(500)'
        },
        'mjx-stretchy-h > mjx-ext > mjx-c': {
            width: 0
        },
        'mjx-stretchy-h > mjx-beg > mjx-c': {
            'margin-right': '-.1em'
        },
        'mjx-stretchy-h > mjx-end > mjx-c': {
            'margin-left': '-.1em'
        },
        'mjx-stretchy-v': {
            display: 'inline-block'
        },
        'mjx-stretchy-v > *': {
            display: 'block'
        },
        'mjx-stretchy-v > mjx-beg': {
            height: 0
        },
        'mjx-stretchy-v > mjx-end > mjx-c': {
            display: 'block'
        },
        'mjx-stretchy-v > * > mjx-c': {
            transform: 'scaley(1.0000001)',
            'transform-origin': 'left center',
            overflow: 'hidden'
        },
        'mjx-stretchy-v > mjx-ext': {
            display: 'block',
            height: '100%',
            'box-sizing': 'border-box',
            border: '0px solid transparent',
            '/* IE */ overflow': 'hidden',
            '/* others */ overflow': 'visible clip',
        },
        'mjx-stretchy-v > mjx-ext > mjx-c::before': {
            width: 'initial',
            'box-sizing': 'border-box'
        },
        'mjx-stretchy-v > mjx-ext > mjx-c': {
            transform: 'scaleY(500) translateY(.075em)',
            overflow: 'visible'
        },
        'mjx-mark': {
            display: 'inline-block',
            height: '0px'
        }
    };
    return CHTMLmo;
}((0, mo_js_1.CommonMoMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmo = CHTMLmo;
//# sourceMappingURL=mo.js.map

/***/ }),

/***/ 74926:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmpadded = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mpadded_js_1 = __webpack_require__(50303);
var mpadded_js_2 = __webpack_require__(59783);
var CHTMLmpadded = (function (_super) {
    __extends(CHTMLmpadded, _super);
    function CHTMLmpadded() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmpadded.prototype.toCHTML = function (parent) {
        var e_1, _a;
        var chtml = this.standardCHTMLnode(parent);
        var content = [];
        var style = {};
        var _b = __read(this.getDimens(), 9), W = _b[2], dh = _b[3], dd = _b[4], dw = _b[5], x = _b[6], y = _b[7], dx = _b[8];
        if (dw) {
            style.width = this.em(W + dw);
        }
        if (dh || dd) {
            style.margin = this.em(dh) + ' 0 ' + this.em(dd);
        }
        if (x + dx || y) {
            style.position = 'relative';
            var rbox = this.html('mjx-rbox', {
                style: { left: this.em(x + dx), top: this.em(-y), 'max-width': style.width }
            });
            if (x + dx && this.childNodes[0].getBBox().pwidth) {
                this.adaptor.setAttribute(rbox, 'width', 'full');
                this.adaptor.setStyle(rbox, 'left', this.em(x));
            }
            content.push(rbox);
        }
        chtml = this.adaptor.append(chtml, this.html('mjx-block', { style: style }, content));
        try {
            for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var child = _d.value;
                child.toCHTML(content[0] || chtml);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CHTMLmpadded.kind = mpadded_js_2.MmlMpadded.prototype.kind;
    CHTMLmpadded.styles = {
        'mjx-mpadded': {
            display: 'inline-block'
        },
        'mjx-rbox': {
            display: 'inline-block',
            position: 'relative'
        }
    };
    return CHTMLmpadded;
}((0, mpadded_js_1.CommonMpaddedMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmpadded = CHTMLmpadded;
//# sourceMappingURL=mpadded.js.map

/***/ }),

/***/ 32829:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmroot = void 0;
var msqrt_js_1 = __webpack_require__(10128);
var mroot_js_1 = __webpack_require__(62315);
var mroot_js_2 = __webpack_require__(68091);
var CHTMLmroot = (function (_super) {
    __extends(CHTMLmroot, _super);
    function CHTMLmroot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmroot.prototype.addRoot = function (ROOT, root, sbox, H) {
        root.toCHTML(ROOT);
        var _a = __read(this.getRootDimens(sbox, H), 3), x = _a[0], h = _a[1], dx = _a[2];
        this.adaptor.setStyle(ROOT, 'verticalAlign', this.em(h));
        this.adaptor.setStyle(ROOT, 'width', this.em(x));
        if (dx) {
            this.adaptor.setStyle(this.adaptor.firstChild(ROOT), 'paddingLeft', this.em(dx));
        }
    };
    CHTMLmroot.kind = mroot_js_2.MmlMroot.prototype.kind;
    return CHTMLmroot;
}((0, mroot_js_1.CommonMrootMixin)(msqrt_js_1.CHTMLmsqrt)));
exports.CHTMLmroot = CHTMLmroot;
//# sourceMappingURL=mroot.js.map

/***/ }),

/***/ 86255:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLinferredMrow = exports.CHTMLmrow = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mrow_js_1 = __webpack_require__(33257);
var mrow_js_2 = __webpack_require__(33257);
var mrow_js_3 = __webpack_require__(68550);
var CHTMLmrow = (function (_super) {
    __extends(CHTMLmrow, _super);
    function CHTMLmrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmrow.prototype.toCHTML = function (parent) {
        var e_1, _a;
        var chtml = (this.node.isInferred ? (this.chtml = parent) : this.standardCHTMLnode(parent));
        var hasNegative = false;
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.toCHTML(chtml);
                if (child.bbox.w < 0) {
                    hasNegative = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (hasNegative) {
            var w = this.getBBox().w;
            if (w) {
                this.adaptor.setStyle(chtml, 'width', this.em(Math.max(0, w)));
                if (w < 0) {
                    this.adaptor.setStyle(chtml, 'marginRight', this.em(w));
                }
            }
        }
    };
    CHTMLmrow.kind = mrow_js_3.MmlMrow.prototype.kind;
    return CHTMLmrow;
}((0, mrow_js_1.CommonMrowMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmrow = CHTMLmrow;
var CHTMLinferredMrow = (function (_super) {
    __extends(CHTMLinferredMrow, _super);
    function CHTMLinferredMrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLinferredMrow.kind = mrow_js_3.MmlInferredMrow.prototype.kind;
    return CHTMLinferredMrow;
}((0, mrow_js_2.CommonInferredMrowMixin)(CHTMLmrow)));
exports.CHTMLinferredMrow = CHTMLinferredMrow;
//# sourceMappingURL=mrow.js.map

/***/ }),

/***/ 16851:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLms = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var ms_js_1 = __webpack_require__(23745);
var ms_js_2 = __webpack_require__(17931);
var CHTMLms = (function (_super) {
    __extends(CHTMLms, _super);
    function CHTMLms() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLms.kind = ms_js_2.MmlMs.prototype.kind;
    return CHTMLms;
}((0, ms_js_1.CommonMsMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLms = CHTMLms;
//# sourceMappingURL=ms.js.map

/***/ }),

/***/ 48929:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmspace = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mspace_js_1 = __webpack_require__(84533);
var mspace_js_2 = __webpack_require__(4254);
var CHTMLmspace = (function (_super) {
    __extends(CHTMLmspace, _super);
    function CHTMLmspace() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmspace.prototype.toCHTML = function (parent) {
        var chtml = this.standardCHTMLnode(parent);
        var _a = this.getBBox(), w = _a.w, h = _a.h, d = _a.d;
        if (w < 0) {
            this.adaptor.setStyle(chtml, 'marginRight', this.em(w));
            w = 0;
        }
        if (w) {
            this.adaptor.setStyle(chtml, 'width', this.em(w));
        }
        h = Math.max(0, h + d);
        if (h) {
            this.adaptor.setStyle(chtml, 'height', this.em(Math.max(0, h)));
        }
        if (d) {
            this.adaptor.setStyle(chtml, 'verticalAlign', this.em(-d));
        }
    };
    CHTMLmspace.kind = mspace_js_2.MmlMspace.prototype.kind;
    return CHTMLmspace;
}((0, mspace_js_1.CommonMspaceMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmspace = CHTMLmspace;
//# sourceMappingURL=mspace.js.map

/***/ }),

/***/ 10128:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmsqrt = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var msqrt_js_1 = __webpack_require__(29266);
var msqrt_js_2 = __webpack_require__(53162);
var CHTMLmsqrt = (function (_super) {
    __extends(CHTMLmsqrt, _super);
    function CHTMLmsqrt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmsqrt.prototype.toCHTML = function (parent) {
        var surd = this.childNodes[this.surd];
        var base = this.childNodes[this.base];
        var sbox = surd.getBBox();
        var bbox = base.getOuterBBox();
        var _a = __read(this.getPQ(sbox), 2), q = _a[1];
        var t = this.font.params.rule_thickness;
        var H = bbox.h + q + t;
        var CHTML = this.standardCHTMLnode(parent);
        var SURD, BASE, ROOT, root;
        if (this.root != null) {
            ROOT = this.adaptor.append(CHTML, this.html('mjx-root'));
            root = this.childNodes[this.root];
        }
        var SQRT = this.adaptor.append(CHTML, this.html('mjx-sqrt', {}, [
            SURD = this.html('mjx-surd'),
            BASE = this.html('mjx-box', { style: { paddingTop: this.em(q) } })
        ]));
        this.addRoot(ROOT, root, sbox, H);
        surd.toCHTML(SURD);
        base.toCHTML(BASE);
        if (surd.size < 0) {
            this.adaptor.addClass(SQRT, 'mjx-tall');
        }
    };
    CHTMLmsqrt.prototype.addRoot = function (_ROOT, _root, _sbox, _H) {
    };
    CHTMLmsqrt.kind = msqrt_js_2.MmlMsqrt.prototype.kind;
    CHTMLmsqrt.styles = {
        'mjx-root': {
            display: 'inline-block',
            'white-space': 'nowrap'
        },
        'mjx-surd': {
            display: 'inline-block',
            'vertical-align': 'top'
        },
        'mjx-sqrt': {
            display: 'inline-block',
            'padding-top': '.07em'
        },
        'mjx-sqrt > mjx-box': {
            'border-top': '.07em solid'
        },
        'mjx-sqrt.mjx-tall > mjx-box': {
            'padding-left': '.3em',
            'margin-left': '-.3em'
        }
    };
    return CHTMLmsqrt;
}((0, msqrt_js_1.CommonMsqrtMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmsqrt = CHTMLmsqrt;
//# sourceMappingURL=msqrt.js.map

/***/ }),

/***/ 37717:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmsubsup = exports.CHTMLmsup = exports.CHTMLmsub = void 0;
var scriptbase_js_1 = __webpack_require__(90949);
var msubsup_js_1 = __webpack_require__(27726);
var msubsup_js_2 = __webpack_require__(27726);
var msubsup_js_3 = __webpack_require__(27726);
var msubsup_js_4 = __webpack_require__(74529);
var CHTMLmsub = (function (_super) {
    __extends(CHTMLmsub, _super);
    function CHTMLmsub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmsub.kind = msubsup_js_4.MmlMsub.prototype.kind;
    return CHTMLmsub;
}((0, msubsup_js_1.CommonMsubMixin)(scriptbase_js_1.CHTMLscriptbase)));
exports.CHTMLmsub = CHTMLmsub;
var CHTMLmsup = (function (_super) {
    __extends(CHTMLmsup, _super);
    function CHTMLmsup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmsup.kind = msubsup_js_4.MmlMsup.prototype.kind;
    return CHTMLmsup;
}((0, msubsup_js_2.CommonMsupMixin)(scriptbase_js_1.CHTMLscriptbase)));
exports.CHTMLmsup = CHTMLmsup;
var CHTMLmsubsup = (function (_super) {
    __extends(CHTMLmsubsup, _super);
    function CHTMLmsubsup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmsubsup.prototype.toCHTML = function (parent) {
        var adaptor = this.adaptor;
        var chtml = this.standardCHTMLnode(parent);
        var _a = __read([this.baseChild, this.supChild, this.subChild], 3), base = _a[0], sup = _a[1], sub = _a[2];
        var _b = __read(this.getUVQ(), 3), v = _b[1], q = _b[2];
        var style = { 'vertical-align': this.em(v) };
        base.toCHTML(chtml);
        var stack = adaptor.append(chtml, this.html('mjx-script', { style: style }));
        sup.toCHTML(stack);
        adaptor.append(stack, this.html('mjx-spacer', { style: { 'margin-top': this.em(q) } }));
        sub.toCHTML(stack);
        var ic = this.getAdjustedIc();
        if (ic) {
            adaptor.setStyle(sup.chtml, 'marginLeft', this.em(ic / sup.bbox.rscale));
        }
        if (this.baseRemoveIc) {
            adaptor.setStyle(stack, 'marginLeft', this.em(-this.baseIc));
        }
    };
    CHTMLmsubsup.kind = msubsup_js_4.MmlMsubsup.prototype.kind;
    CHTMLmsubsup.styles = {
        'mjx-script': {
            display: 'inline-block',
            'padding-right': '.05em',
            'padding-left': '.033em'
        },
        'mjx-script > mjx-spacer': {
            display: 'block'
        }
    };
    return CHTMLmsubsup;
}((0, msubsup_js_3.CommonMsubsupMixin)(scriptbase_js_1.CHTMLscriptbase)));
exports.CHTMLmsubsup = CHTMLmsubsup;
//# sourceMappingURL=msubsup.js.map

/***/ }),

/***/ 48582:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmtable = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mtable_js_1 = __webpack_require__(8747);
var mtable_js_2 = __webpack_require__(7252);
var string_js_1 = __webpack_require__(33353);
var CHTMLmtable = (function (_super) {
    __extends(CHTMLmtable, _super);
    function CHTMLmtable(factory, node, parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, factory, node, parent) || this;
        _this.itable = _this.html('mjx-itable');
        _this.labels = _this.html('mjx-itable');
        return _this;
    }
    CHTMLmtable.prototype.getAlignShift = function () {
        var data = _super.prototype.getAlignShift.call(this);
        if (!this.isTop) {
            data[1] = 0;
        }
        return data;
    };
    CHTMLmtable.prototype.toCHTML = function (parent) {
        var e_1, _a;
        var chtml = this.standardCHTMLnode(parent);
        this.adaptor.append(chtml, this.html('mjx-table', {}, [this.itable]));
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.toCHTML(this.itable);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.padRows();
        this.handleColumnSpacing();
        this.handleColumnLines();
        this.handleColumnWidths();
        this.handleRowSpacing();
        this.handleRowLines();
        this.handleRowHeights();
        this.handleFrame();
        this.handleWidth();
        this.handleLabels();
        this.handleAlign();
        this.handleJustify();
        this.shiftColor();
    };
    CHTMLmtable.prototype.shiftColor = function () {
        var adaptor = this.adaptor;
        var color = adaptor.getStyle(this.chtml, 'backgroundColor');
        if (color) {
            adaptor.setStyle(this.chtml, 'backgroundColor', '');
            adaptor.setStyle(this.itable, 'backgroundColor', color);
        }
    };
    CHTMLmtable.prototype.padRows = function () {
        var e_2, _a;
        var adaptor = this.adaptor;
        try {
            for (var _b = __values(adaptor.childNodes(this.itable)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var row = _c.value;
                while (adaptor.childNodes(row).length < this.numCols) {
                    adaptor.append(row, this.html('mjx-mtd', { 'extra': true }));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    CHTMLmtable.prototype.handleColumnSpacing = function () {
        var e_3, _a, e_4, _b;
        var scale = (this.childNodes[0] ? 1 / this.childNodes[0].getBBox().rscale : 1);
        var spacing = this.getEmHalfSpacing(this.fSpace[0], this.cSpace, scale);
        var frame = this.frame;
        try {
            for (var _c = __values(this.tableRows), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var i = 0;
                try {
                    for (var _e = (e_4 = void 0, __values(row.tableCells)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        var lspace = spacing[i++];
                        var rspace = spacing[i];
                        var styleNode = (cell ? cell.chtml : this.adaptor.childNodes(row.chtml)[i]);
                        if ((i > 1 && lspace !== '0.4em') || (frame && i === 1)) {
                            this.adaptor.setStyle(styleNode, 'paddingLeft', lspace);
                        }
                        if ((i < this.numCols && rspace !== '0.4em') || (frame && i === this.numCols)) {
                            this.adaptor.setStyle(styleNode, 'paddingRight', rspace);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    CHTMLmtable.prototype.handleColumnLines = function () {
        var e_5, _a, e_6, _b;
        if (this.node.attributes.get('columnlines') === 'none')
            return;
        var lines = this.getColumnAttributes('columnlines');
        try {
            for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var i = 0;
                try {
                    for (var _e = (e_6 = void 0, __values(this.adaptor.childNodes(row.chtml).slice(1))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        var line = lines[i++];
                        if (line === 'none')
                            continue;
                        this.adaptor.setStyle(cell, 'borderLeft', '.07em ' + line);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    CHTMLmtable.prototype.handleColumnWidths = function () {
        var e_7, _a, e_8, _b;
        try {
            for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var i = 0;
                try {
                    for (var _e = (e_8 = void 0, __values(this.adaptor.childNodes(row.chtml))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        var w = this.cWidths[i++];
                        if (w !== null) {
                            var width = (typeof w === 'number' ? this.em(w) : w);
                            this.adaptor.setStyle(cell, 'width', width);
                            this.adaptor.setStyle(cell, 'maxWidth', width);
                            this.adaptor.setStyle(cell, 'minWidth', width);
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    CHTMLmtable.prototype.handleRowSpacing = function () {
        var e_9, _a, e_10, _b;
        var scale = (this.childNodes[0] ? 1 / this.childNodes[0].getBBox().rscale : 1);
        var spacing = this.getEmHalfSpacing(this.fSpace[1], this.rSpace, scale);
        var frame = this.frame;
        var i = 0;
        try {
            for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var tspace = spacing[i++];
                var bspace = spacing[i];
                try {
                    for (var _e = (e_10 = void 0, __values(row.childNodes)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        if ((i > 1 && tspace !== '0.215em') || (frame && i === 1)) {
                            this.adaptor.setStyle(cell.chtml, 'paddingTop', tspace);
                        }
                        if ((i < this.numRows && bspace !== '0.215em') || (frame && i === this.numRows)) {
                            this.adaptor.setStyle(cell.chtml, 'paddingBottom', bspace);
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_9) throw e_9.error; }
        }
    };
    CHTMLmtable.prototype.handleRowLines = function () {
        var e_11, _a, e_12, _b;
        if (this.node.attributes.get('rowlines') === 'none')
            return;
        var lines = this.getRowAttributes('rowlines');
        var i = 0;
        try {
            for (var _c = __values(this.childNodes.slice(1)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var line = lines[i++];
                if (line === 'none')
                    continue;
                try {
                    for (var _e = (e_12 = void 0, __values(this.adaptor.childNodes(row.chtml))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        this.adaptor.setStyle(cell, 'borderTop', '.07em ' + line);
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_12) throw e_12.error; }
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_11) throw e_11.error; }
        }
    };
    CHTMLmtable.prototype.handleRowHeights = function () {
        if (this.node.attributes.get('equalrows')) {
            this.handleEqualRows();
        }
    };
    CHTMLmtable.prototype.handleEqualRows = function () {
        var space = this.getRowHalfSpacing();
        var _a = this.getTableData(), H = _a.H, D = _a.D, NH = _a.NH, ND = _a.ND;
        var HD = this.getEqualRowHeight();
        for (var i = 0; i < this.numRows; i++) {
            var row = this.childNodes[i];
            this.setRowHeight(row, HD + space[i] + space[i + 1] + this.rLines[i]);
            if (HD !== NH[i] + ND[i]) {
                this.setRowBaseline(row, HD, (HD - H[i] + D[i]) / 2);
            }
        }
    };
    CHTMLmtable.prototype.setRowHeight = function (row, HD) {
        this.adaptor.setStyle(row.chtml, 'height', this.em(HD));
    };
    CHTMLmtable.prototype.setRowBaseline = function (row, HD, D) {
        var e_13, _a;
        var ralign = row.node.attributes.get('rowalign');
        try {
            for (var _b = __values(row.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cell = _c.value;
                if (this.setCellBaseline(cell, ralign, HD, D))
                    break;
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_13) throw e_13.error; }
        }
    };
    CHTMLmtable.prototype.setCellBaseline = function (cell, ralign, HD, D) {
        var calign = cell.node.attributes.get('rowalign');
        if (calign === 'baseline' || calign === 'axis') {
            var adaptor = this.adaptor;
            var child = adaptor.lastChild(cell.chtml);
            adaptor.setStyle(child, 'height', this.em(HD));
            adaptor.setStyle(child, 'verticalAlign', this.em(-D));
            var row = cell.parent;
            if ((!row.node.isKind('mlabeledtr') || cell !== row.childNodes[0]) &&
                (ralign === 'baseline' || ralign === 'axis')) {
                return true;
            }
        }
        return false;
    };
    CHTMLmtable.prototype.handleFrame = function () {
        if (this.frame && this.fLine) {
            this.adaptor.setStyle(this.itable, 'border', '.07em ' + this.node.attributes.get('frame'));
        }
    };
    CHTMLmtable.prototype.handleWidth = function () {
        var adaptor = this.adaptor;
        var _a = this.getBBox(), w = _a.w, L = _a.L, R = _a.R;
        adaptor.setStyle(this.chtml, 'minWidth', this.em(L + w + R));
        var W = this.node.attributes.get('width');
        if ((0, string_js_1.isPercent)(W)) {
            adaptor.setStyle(this.chtml, 'width', '');
            adaptor.setAttribute(this.chtml, 'width', 'full');
        }
        else if (!this.hasLabels) {
            if (W === 'auto')
                return;
            W = this.em(this.length2em(W) + 2 * this.fLine);
        }
        var table = adaptor.firstChild(this.chtml);
        adaptor.setStyle(table, 'width', W);
        adaptor.setStyle(table, 'minWidth', this.em(w));
        if (L || R) {
            adaptor.setStyle(this.chtml, 'margin', '');
            var style = (this.node.attributes.get('data-width-includes-label') ? 'padding' : 'margin');
            if (L === R) {
                adaptor.setStyle(table, style, '0 ' + this.em(R));
            }
            else {
                adaptor.setStyle(table, style, '0 ' + this.em(R) + ' 0 ' + this.em(L));
            }
        }
        adaptor.setAttribute(this.itable, 'width', 'full');
    };
    CHTMLmtable.prototype.handleAlign = function () {
        var _a = __read(this.getAlignmentRow(), 2), align = _a[0], row = _a[1];
        if (row === null) {
            if (align !== 'axis') {
                this.adaptor.setAttribute(this.chtml, 'align', align);
            }
        }
        else {
            var y = this.getVerticalPosition(row, align);
            this.adaptor.setAttribute(this.chtml, 'align', 'top');
            this.adaptor.setStyle(this.chtml, 'verticalAlign', this.em(y));
        }
    };
    CHTMLmtable.prototype.handleJustify = function () {
        var align = this.getAlignShift()[0];
        if (align !== 'center') {
            this.adaptor.setAttribute(this.chtml, 'justify', align);
        }
    };
    CHTMLmtable.prototype.handleLabels = function () {
        if (!this.hasLabels)
            return;
        var labels = this.labels;
        var attributes = this.node.attributes;
        var adaptor = this.adaptor;
        var side = attributes.get('side');
        adaptor.setAttribute(this.chtml, 'side', side);
        adaptor.setAttribute(labels, 'align', side);
        adaptor.setStyle(labels, side, '0');
        var _a = __read(this.addLabelPadding(side), 2), align = _a[0], shift = _a[1];
        if (shift) {
            var table = adaptor.firstChild(this.chtml);
            this.setIndent(table, align, shift);
        }
        this.updateRowHeights();
        this.addLabelSpacing();
    };
    CHTMLmtable.prototype.addLabelPadding = function (side) {
        var _a = __read(this.getPadAlignShift(side), 3), align = _a[1], shift = _a[2];
        var styles = {};
        if (side === 'right' && !this.node.attributes.get('data-width-includes-label')) {
            var W = this.node.attributes.get('width');
            var _b = this.getBBox(), w = _b.w, L = _b.L, R = _b.R;
            styles.style = {
                width: ((0, string_js_1.isPercent)(W) ? 'calc(' + W + ' + ' + this.em(L + R) + ')' : this.em(L + w + R))
            };
        }
        this.adaptor.append(this.chtml, this.html('mjx-labels', styles, [this.labels]));
        return [align, shift];
    };
    CHTMLmtable.prototype.updateRowHeights = function () {
        var _a = this.getTableData(), H = _a.H, D = _a.D, NH = _a.NH, ND = _a.ND;
        var space = this.getRowHalfSpacing();
        for (var i = 0; i < this.numRows; i++) {
            var row = this.childNodes[i];
            this.setRowHeight(row, H[i] + D[i] + space[i] + space[i + 1] + this.rLines[i]);
            if (H[i] !== NH[i] || D[i] !== ND[i]) {
                this.setRowBaseline(row, H[i] + D[i], D[i]);
            }
            else if (row.node.isKind('mlabeledtr')) {
                this.setCellBaseline(row.childNodes[0], '', H[i] + D[i], D[i]);
            }
        }
    };
    CHTMLmtable.prototype.addLabelSpacing = function () {
        var adaptor = this.adaptor;
        var equal = this.node.attributes.get('equalrows');
        var _a = this.getTableData(), H = _a.H, D = _a.D;
        var HD = (equal ? this.getEqualRowHeight() : 0);
        var space = this.getRowHalfSpacing();
        var h = this.fLine;
        var current = adaptor.firstChild(this.labels);
        for (var i = 0; i < this.numRows; i++) {
            var row = this.childNodes[i];
            if (row.node.isKind('mlabeledtr')) {
                h && adaptor.insert(this.html('mjx-mtr', { style: { height: this.em(h) } }), current);
                adaptor.setStyle(current, 'height', this.em((equal ? HD : H[i] + D[i]) + space[i] + space[i + 1]));
                current = adaptor.next(current);
                h = this.rLines[i];
            }
            else {
                h += space[i] + (equal ? HD : H[i] + D[i]) + space[i + 1] + this.rLines[i];
            }
        }
    };
    CHTMLmtable.kind = mtable_js_2.MmlMtable.prototype.kind;
    CHTMLmtable.styles = {
        'mjx-mtable': {
            'vertical-align': '.25em',
            'text-align': 'center',
            'position': 'relative',
            'box-sizing': 'border-box',
            'border-spacing': 0,
            'border-collapse': 'collapse'
        },
        'mjx-mstyle[size="s"] mjx-mtable': {
            'vertical-align': '.354em'
        },
        'mjx-labels': {
            position: 'absolute',
            left: 0,
            top: 0
        },
        'mjx-table': {
            'display': 'inline-block',
            'vertical-align': '-.5ex',
            'box-sizing': 'border-box'
        },
        'mjx-table > mjx-itable': {
            'vertical-align': 'middle',
            'text-align': 'left',
            'box-sizing': 'border-box'
        },
        'mjx-labels > mjx-itable': {
            position: 'absolute',
            top: 0
        },
        'mjx-mtable[justify="left"]': {
            'text-align': 'left'
        },
        'mjx-mtable[justify="right"]': {
            'text-align': 'right'
        },
        'mjx-mtable[justify="left"][side="left"]': {
            'padding-right': '0 ! important'
        },
        'mjx-mtable[justify="left"][side="right"]': {
            'padding-left': '0 ! important'
        },
        'mjx-mtable[justify="right"][side="left"]': {
            'padding-right': '0 ! important'
        },
        'mjx-mtable[justify="right"][side="right"]': {
            'padding-left': '0 ! important'
        },
        'mjx-mtable[align]': {
            'vertical-align': 'baseline'
        },
        'mjx-mtable[align="top"] > mjx-table': {
            'vertical-align': 'top'
        },
        'mjx-mtable[align="bottom"] > mjx-table': {
            'vertical-align': 'bottom'
        },
        'mjx-mtable[side="right"] mjx-labels': {
            'min-width': '100%'
        }
    };
    return CHTMLmtable;
}((0, mtable_js_1.CommonMtableMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmtable = CHTMLmtable;
//# sourceMappingURL=mtable.js.map

/***/ }),

/***/ 82132:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmtd = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mtd_js_1 = __webpack_require__(32506);
var mtd_js_2 = __webpack_require__(49016);
var CHTMLmtd = (function (_super) {
    __extends(CHTMLmtd, _super);
    function CHTMLmtd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmtd.prototype.toCHTML = function (parent) {
        _super.prototype.toCHTML.call(this, parent);
        var ralign = this.node.attributes.get('rowalign');
        var calign = this.node.attributes.get('columnalign');
        var palign = this.parent.node.attributes.get('rowalign');
        if (ralign !== palign) {
            this.adaptor.setAttribute(this.chtml, 'rowalign', ralign);
        }
        if (calign !== 'center' &&
            (this.parent.kind !== 'mlabeledtr' || this !== this.parent.childNodes[0] ||
                calign !== this.parent.parent.node.attributes.get('side'))) {
            this.adaptor.setStyle(this.chtml, 'textAlign', calign);
        }
        if (this.parent.parent.node.getProperty('useHeight')) {
            this.adaptor.append(this.chtml, this.html('mjx-tstrut'));
        }
    };
    CHTMLmtd.kind = mtd_js_2.MmlMtd.prototype.kind;
    CHTMLmtd.styles = {
        'mjx-mtd': {
            display: 'table-cell',
            'text-align': 'center',
            'padding': '.215em .4em'
        },
        'mjx-mtd:first-child': {
            'padding-left': 0
        },
        'mjx-mtd:last-child': {
            'padding-right': 0
        },
        'mjx-mtable > * > mjx-itable > *:first-child > mjx-mtd': {
            'padding-top': 0
        },
        'mjx-mtable > * > mjx-itable > *:last-child > mjx-mtd': {
            'padding-bottom': 0
        },
        'mjx-tstrut': {
            display: 'inline-block',
            height: '1em',
            'vertical-align': '-.25em'
        },
        'mjx-labels[align="left"] > mjx-mtr > mjx-mtd': {
            'text-align': 'left'
        },
        'mjx-labels[align="right"] > mjx-mtr > mjx-mtd': {
            'text-align': 'right'
        },
        'mjx-mtd[extra]': {
            padding: 0
        },
        'mjx-mtd[rowalign="top"]': {
            'vertical-align': 'top'
        },
        'mjx-mtd[rowalign="center"]': {
            'vertical-align': 'middle'
        },
        'mjx-mtd[rowalign="bottom"]': {
            'vertical-align': 'bottom'
        },
        'mjx-mtd[rowalign="baseline"]': {
            'vertical-align': 'baseline'
        },
        'mjx-mtd[rowalign="axis"]': {
            'vertical-align': '.25em'
        }
    };
    return CHTMLmtd;
}((0, mtd_js_1.CommonMtdMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmtd = CHTMLmtd;
//# sourceMappingURL=mtd.js.map

/***/ }),

/***/ 90659:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmtext = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mtext_js_1 = __webpack_require__(84894);
var mtext_js_2 = __webpack_require__(86237);
var CHTMLmtext = (function (_super) {
    __extends(CHTMLmtext, _super);
    function CHTMLmtext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmtext.kind = mtext_js_2.MmlMtext.prototype.kind;
    return CHTMLmtext;
}((0, mtext_js_1.CommonMtextMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmtext = CHTMLmtext;
//# sourceMappingURL=mtext.js.map

/***/ }),

/***/ 93594:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmlabeledtr = exports.CHTMLmtr = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var mtr_js_1 = __webpack_require__(79598);
var mtr_js_2 = __webpack_require__(79598);
var mtr_js_3 = __webpack_require__(2117);
var CHTMLmtr = (function (_super) {
    __extends(CHTMLmtr, _super);
    function CHTMLmtr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmtr.prototype.toCHTML = function (parent) {
        _super.prototype.toCHTML.call(this, parent);
        var align = this.node.attributes.get('rowalign');
        if (align !== 'baseline') {
            this.adaptor.setAttribute(this.chtml, 'rowalign', align);
        }
    };
    CHTMLmtr.kind = mtr_js_3.MmlMtr.prototype.kind;
    CHTMLmtr.styles = {
        'mjx-mtr': {
            display: 'table-row',
        },
        'mjx-mtr[rowalign="top"] > mjx-mtd': {
            'vertical-align': 'top'
        },
        'mjx-mtr[rowalign="center"] > mjx-mtd': {
            'vertical-align': 'middle'
        },
        'mjx-mtr[rowalign="bottom"] > mjx-mtd': {
            'vertical-align': 'bottom'
        },
        'mjx-mtr[rowalign="baseline"] > mjx-mtd': {
            'vertical-align': 'baseline'
        },
        'mjx-mtr[rowalign="axis"] > mjx-mtd': {
            'vertical-align': '.25em'
        }
    };
    return CHTMLmtr;
}((0, mtr_js_1.CommonMtrMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmtr = CHTMLmtr;
var CHTMLmlabeledtr = (function (_super) {
    __extends(CHTMLmlabeledtr, _super);
    function CHTMLmlabeledtr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmlabeledtr.prototype.toCHTML = function (parent) {
        _super.prototype.toCHTML.call(this, parent);
        var child = this.adaptor.firstChild(this.chtml);
        if (child) {
            this.adaptor.remove(child);
            var align = this.node.attributes.get('rowalign');
            var attr = (align !== 'baseline' && align !== 'axis' ? { rowalign: align } : {});
            var row = this.html('mjx-mtr', attr, [child]);
            this.adaptor.append(this.parent.labels, row);
        }
    };
    CHTMLmlabeledtr.prototype.markUsed = function () {
        _super.prototype.markUsed.call(this);
        this.jax.wrapperUsage.add(CHTMLmtr.kind);
    };
    CHTMLmlabeledtr.kind = mtr_js_3.MmlMlabeledtr.prototype.kind;
    CHTMLmlabeledtr.styles = {
        'mjx-mlabeledtr': {
            display: 'table-row'
        },
        'mjx-mlabeledtr[rowalign="top"] > mjx-mtd': {
            'vertical-align': 'top'
        },
        'mjx-mlabeledtr[rowalign="center"] > mjx-mtd': {
            'vertical-align': 'middle'
        },
        'mjx-mlabeledtr[rowalign="bottom"] > mjx-mtd': {
            'vertical-align': 'bottom'
        },
        'mjx-mlabeledtr[rowalign="baseline"] > mjx-mtd': {
            'vertical-align': 'baseline'
        },
        'mjx-mlabeledtr[rowalign="axis"] > mjx-mtd': {
            'vertical-align': '.25em'
        }
    };
    return CHTMLmlabeledtr;
}((0, mtr_js_2.CommonMlabeledtrMixin)(CHTMLmtr)));
exports.CHTMLmlabeledtr = CHTMLmlabeledtr;
//# sourceMappingURL=mtr.js.map

/***/ }),

/***/ 94987:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLmunderover = exports.CHTMLmover = exports.CHTMLmunder = void 0;
var msubsup_js_1 = __webpack_require__(37717);
var munderover_js_1 = __webpack_require__(17358);
var munderover_js_2 = __webpack_require__(17358);
var munderover_js_3 = __webpack_require__(17358);
var munderover_js_4 = __webpack_require__(75723);
var CHTMLmunder = (function (_super) {
    __extends(CHTMLmunder, _super);
    function CHTMLmunder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmunder.prototype.toCHTML = function (parent) {
        if (this.hasMovableLimits()) {
            _super.prototype.toCHTML.call(this, parent);
            this.adaptor.setAttribute(this.chtml, 'limits', 'false');
            return;
        }
        this.chtml = this.standardCHTMLnode(parent);
        var base = this.adaptor.append(this.adaptor.append(this.chtml, this.html('mjx-row')), this.html('mjx-base'));
        var under = this.adaptor.append(this.adaptor.append(this.chtml, this.html('mjx-row')), this.html('mjx-under'));
        this.baseChild.toCHTML(base);
        this.scriptChild.toCHTML(under);
        var basebox = this.baseChild.getOuterBBox();
        var underbox = this.scriptChild.getOuterBBox();
        var k = this.getUnderKV(basebox, underbox)[0];
        var delta = (this.isLineBelow ? 0 : this.getDelta(true));
        this.adaptor.setStyle(under, 'paddingTop', this.em(k));
        this.setDeltaW([base, under], this.getDeltaW([basebox, underbox], [0, -delta]));
        this.adjustUnderDepth(under, underbox);
    };
    CHTMLmunder.kind = munderover_js_4.MmlMunder.prototype.kind;
    CHTMLmunder.styles = {
        'mjx-over': {
            'text-align': 'left'
        },
        'mjx-munder:not([limits="false"])': {
            display: 'inline-table',
        },
        'mjx-munder > mjx-row': {
            'text-align': 'left'
        },
        'mjx-under': {
            'padding-bottom': '.1em'
        }
    };
    return CHTMLmunder;
}((0, munderover_js_1.CommonMunderMixin)(msubsup_js_1.CHTMLmsub)));
exports.CHTMLmunder = CHTMLmunder;
var CHTMLmover = (function (_super) {
    __extends(CHTMLmover, _super);
    function CHTMLmover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmover.prototype.toCHTML = function (parent) {
        if (this.hasMovableLimits()) {
            _super.prototype.toCHTML.call(this, parent);
            this.adaptor.setAttribute(this.chtml, 'limits', 'false');
            return;
        }
        this.chtml = this.standardCHTMLnode(parent);
        var over = this.adaptor.append(this.chtml, this.html('mjx-over'));
        var base = this.adaptor.append(this.chtml, this.html('mjx-base'));
        this.scriptChild.toCHTML(over);
        this.baseChild.toCHTML(base);
        var overbox = this.scriptChild.getOuterBBox();
        var basebox = this.baseChild.getOuterBBox();
        this.adjustBaseHeight(base, basebox);
        var k = this.getOverKU(basebox, overbox)[0];
        var delta = (this.isLineAbove ? 0 : this.getDelta());
        this.adaptor.setStyle(over, 'paddingBottom', this.em(k));
        this.setDeltaW([base, over], this.getDeltaW([basebox, overbox], [0, delta]));
        this.adjustOverDepth(over, overbox);
    };
    CHTMLmover.kind = munderover_js_4.MmlMover.prototype.kind;
    CHTMLmover.styles = {
        'mjx-mover:not([limits="false"])': {
            'padding-top': '.1em'
        },
        'mjx-mover:not([limits="false"]) > *': {
            display: 'block',
            'text-align': 'left'
        }
    };
    return CHTMLmover;
}((0, munderover_js_2.CommonMoverMixin)(msubsup_js_1.CHTMLmsup)));
exports.CHTMLmover = CHTMLmover;
var CHTMLmunderover = (function (_super) {
    __extends(CHTMLmunderover, _super);
    function CHTMLmunderover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmunderover.prototype.toCHTML = function (parent) {
        if (this.hasMovableLimits()) {
            _super.prototype.toCHTML.call(this, parent);
            this.adaptor.setAttribute(this.chtml, 'limits', 'false');
            return;
        }
        this.chtml = this.standardCHTMLnode(parent);
        var over = this.adaptor.append(this.chtml, this.html('mjx-over'));
        var table = this.adaptor.append(this.adaptor.append(this.chtml, this.html('mjx-box')), this.html('mjx-munder'));
        var base = this.adaptor.append(this.adaptor.append(table, this.html('mjx-row')), this.html('mjx-base'));
        var under = this.adaptor.append(this.adaptor.append(table, this.html('mjx-row')), this.html('mjx-under'));
        this.overChild.toCHTML(over);
        this.baseChild.toCHTML(base);
        this.underChild.toCHTML(under);
        var overbox = this.overChild.getOuterBBox();
        var basebox = this.baseChild.getOuterBBox();
        var underbox = this.underChild.getOuterBBox();
        this.adjustBaseHeight(base, basebox);
        var ok = this.getOverKU(basebox, overbox)[0];
        var uk = this.getUnderKV(basebox, underbox)[0];
        var delta = this.getDelta();
        this.adaptor.setStyle(over, 'paddingBottom', this.em(ok));
        this.adaptor.setStyle(under, 'paddingTop', this.em(uk));
        this.setDeltaW([base, under, over], this.getDeltaW([basebox, underbox, overbox], [0, this.isLineBelow ? 0 : -delta, this.isLineAbove ? 0 : delta]));
        this.adjustOverDepth(over, overbox);
        this.adjustUnderDepth(under, underbox);
    };
    CHTMLmunderover.prototype.markUsed = function () {
        _super.prototype.markUsed.call(this);
        this.jax.wrapperUsage.add(msubsup_js_1.CHTMLmsubsup.kind);
    };
    CHTMLmunderover.kind = munderover_js_4.MmlMunderover.prototype.kind;
    CHTMLmunderover.styles = {
        'mjx-munderover:not([limits="false"])': {
            'padding-top': '.1em'
        },
        'mjx-munderover:not([limits="false"]) > *': {
            display: 'block'
        },
    };
    return CHTMLmunderover;
}((0, munderover_js_3.CommonMunderoverMixin)(msubsup_js_1.CHTMLmsubsup)));
exports.CHTMLmunderover = CHTMLmunderover;
//# sourceMappingURL=munderover.js.map

/***/ }),

/***/ 90949:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLscriptbase = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var scriptbase_js_1 = __webpack_require__(78214);
var CHTMLscriptbase = (function (_super) {
    __extends(CHTMLscriptbase, _super);
    function CHTMLscriptbase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLscriptbase.prototype.toCHTML = function (parent) {
        this.chtml = this.standardCHTMLnode(parent);
        var _a = __read(this.getOffset(), 2), x = _a[0], v = _a[1];
        var dx = x - (this.baseRemoveIc ? this.baseIc : 0);
        var style = { 'vertical-align': this.em(v) };
        if (dx) {
            style['margin-left'] = this.em(dx);
        }
        this.baseChild.toCHTML(this.chtml);
        this.scriptChild.toCHTML(this.adaptor.append(this.chtml, this.html('mjx-script', { style: style })));
    };
    CHTMLscriptbase.prototype.setDeltaW = function (nodes, dx) {
        for (var i = 0; i < dx.length; i++) {
            if (dx[i]) {
                this.adaptor.setStyle(nodes[i], 'paddingLeft', this.em(dx[i]));
            }
        }
    };
    CHTMLscriptbase.prototype.adjustOverDepth = function (over, overbox) {
        if (overbox.d >= 0)
            return;
        this.adaptor.setStyle(over, 'marginBottom', this.em(overbox.d * overbox.rscale));
    };
    CHTMLscriptbase.prototype.adjustUnderDepth = function (under, underbox) {
        var e_1, _a;
        if (underbox.d >= 0)
            return;
        var adaptor = this.adaptor;
        var v = this.em(underbox.d);
        var box = this.html('mjx-box', { style: { 'margin-bottom': v, 'vertical-align': v } });
        try {
            for (var _b = __values(adaptor.childNodes(adaptor.firstChild(under))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                adaptor.append(box, child);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        adaptor.append(adaptor.firstChild(under), box);
    };
    CHTMLscriptbase.prototype.adjustBaseHeight = function (base, basebox) {
        if (this.node.attributes.get('accent')) {
            var minH = this.font.params.x_height * basebox.scale;
            if (basebox.h < minH) {
                this.adaptor.setStyle(base, 'paddingTop', this.em(minH - basebox.h));
                basebox.h = minH;
            }
        }
    };
    CHTMLscriptbase.kind = 'scriptbase';
    return CHTMLscriptbase;
}((0, scriptbase_js_1.CommonScriptbaseMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLscriptbase = CHTMLscriptbase;
//# sourceMappingURL=scriptbase.js.map

/***/ }),

/***/ 8044:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHTMLxml = exports.CHTMLannotationXML = exports.CHTMLannotation = exports.CHTMLsemantics = void 0;
var Wrapper_js_1 = __webpack_require__(81129);
var semantics_js_1 = __webpack_require__(44974);
var semantics_js_2 = __webpack_require__(19223);
var MmlNode_js_1 = __webpack_require__(18426);
var CHTMLsemantics = (function (_super) {
    __extends(CHTMLsemantics, _super);
    function CHTMLsemantics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLsemantics.prototype.toCHTML = function (parent) {
        var chtml = this.standardCHTMLnode(parent);
        if (this.childNodes.length) {
            this.childNodes[0].toCHTML(chtml);
        }
    };
    CHTMLsemantics.kind = semantics_js_2.MmlSemantics.prototype.kind;
    return CHTMLsemantics;
}((0, semantics_js_1.CommonSemanticsMixin)(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLsemantics = CHTMLsemantics;
var CHTMLannotation = (function (_super) {
    __extends(CHTMLannotation, _super);
    function CHTMLannotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLannotation.prototype.toCHTML = function (parent) {
        _super.prototype.toCHTML.call(this, parent);
    };
    CHTMLannotation.prototype.computeBBox = function () {
        return this.bbox;
    };
    CHTMLannotation.kind = semantics_js_2.MmlAnnotation.prototype.kind;
    return CHTMLannotation;
}(Wrapper_js_1.CHTMLWrapper));
exports.CHTMLannotation = CHTMLannotation;
var CHTMLannotationXML = (function (_super) {
    __extends(CHTMLannotationXML, _super);
    function CHTMLannotationXML() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLannotationXML.kind = semantics_js_2.MmlAnnotationXML.prototype.kind;
    CHTMLannotationXML.styles = {
        'mjx-annotation-xml': {
            'font-family': 'initial',
            'line-height': 'normal'
        }
    };
    return CHTMLannotationXML;
}(Wrapper_js_1.CHTMLWrapper));
exports.CHTMLannotationXML = CHTMLannotationXML;
var CHTMLxml = (function (_super) {
    __extends(CHTMLxml, _super);
    function CHTMLxml() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLxml.prototype.toCHTML = function (parent) {
        this.chtml = this.adaptor.append(parent, this.adaptor.clone(this.node.getXML()));
    };
    CHTMLxml.prototype.computeBBox = function (bbox, _recompute) {
        if (_recompute === void 0) { _recompute = false; }
        var _a = this.jax.measureXMLnode(this.node.getXML()), w = _a.w, h = _a.h, d = _a.d;
        bbox.w = w;
        bbox.h = h;
        bbox.d = d;
    };
    CHTMLxml.prototype.getStyles = function () { };
    CHTMLxml.prototype.getScale = function () { };
    CHTMLxml.prototype.getVariant = function () { };
    CHTMLxml.kind = MmlNode_js_1.XMLNode.prototype.kind;
    CHTMLxml.autoStyle = false;
    return CHTMLxml;
}(Wrapper_js_1.CHTMLWrapper));
exports.CHTMLxml = CHTMLxml;
//# sourceMappingURL=semantics.js.map

/***/ }),

/***/ 59230:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeXFont = void 0;
var FontData_js_1 = __webpack_require__(73779);
var tex_js_1 = __webpack_require__(63410);
var bold_italic_js_1 = __webpack_require__(17682);
var bold_js_1 = __webpack_require__(95071);
var double_struck_js_1 = __webpack_require__(23663);
var fraktur_bold_js_1 = __webpack_require__(36126);
var fraktur_js_1 = __webpack_require__(27680);
var italic_js_1 = __webpack_require__(60582);
var largeop_js_1 = __webpack_require__(11160);
var monospace_js_1 = __webpack_require__(50713);
var normal_js_1 = __webpack_require__(78642);
var sans_serif_bold_italic_js_1 = __webpack_require__(10402);
var sans_serif_bold_js_1 = __webpack_require__(13274);
var sans_serif_italic_js_1 = __webpack_require__(20038);
var sans_serif_js_1 = __webpack_require__(74395);
var script_bold_js_1 = __webpack_require__(40126);
var script_js_1 = __webpack_require__(91543);
var smallop_js_1 = __webpack_require__(33156);
var tex_calligraphic_bold_js_1 = __webpack_require__(73182);
var tex_calligraphic_js_1 = __webpack_require__(56725);
var tex_mathit_js_1 = __webpack_require__(2763);
var tex_oldstyle_bold_js_1 = __webpack_require__(61315);
var tex_oldstyle_js_1 = __webpack_require__(77446);
var tex_size3_js_1 = __webpack_require__(11105);
var tex_size4_js_1 = __webpack_require__(97425);
var tex_variant_js_1 = __webpack_require__(30188);
var delimiters_js_1 = __webpack_require__(4465);
var TeXFont = (function (_super) {
    __extends(TeXFont, _super);
    function TeXFont() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeXFont.defaultCssFamilyPrefix = 'MJXZERO';
    TeXFont.defaultVariantClasses = {
        'normal': 'mjx-n',
        'bold': 'mjx-b',
        'italic': 'mjx-i',
        'bold-italic': 'mjx-b mjx-i',
        'double-struck': 'mjx-ds mjx-b',
        'fraktur': 'mjx-fr',
        'bold-fraktur': 'mjx-fr mjx-b',
        'script': 'mjx-sc mjx-i',
        'bold-script': 'mjx-sc mjx-b mjx-i',
        'sans-serif': 'mjx-ss',
        'bold-sans-serif': 'mjx-ss mjx-b',
        'sans-serif-italic': 'mjx-ss mjx-i',
        'sans-serif-bold-italic': 'mjx-ss mjx-b mjx-i',
        'monospace': 'mjx-ty',
        '-smallop': 'mjx-sop',
        '-largeop': 'mjx-lop',
        '-size3': 'mjx-s3',
        '-size4': 'mjx-s4',
        '-tex-calligraphic': 'mjx-cal mjx-i',
        '-tex-bold-calligraphic': 'mjx-cal mjx-b',
        '-tex-mathit': 'mjx-mit mjx-i',
        '-tex-oldstyle': 'mjx-os',
        '-tex-bold-oldstyle': 'mjx-os mjx-b',
        '-tex-variant': 'mjx-var'
    };
    TeXFont.defaultVariantLetters = {
        'normal': '',
        'bold': 'B',
        'italic': 'MI',
        'bold-italic': 'BI',
        'double-struck': 'A',
        'fraktur': 'FR',
        'bold-fraktur': 'FRB',
        'script': 'SC',
        'bold-script': 'SCB',
        'sans-serif': 'SS',
        'bold-sans-serif': 'SSB',
        'sans-serif-italic': 'SSI',
        'sans-serif-bold-italic': 'SSBI',
        'monospace': 'T',
        '-smallop': 'S1',
        '-largeop': 'S2',
        '-size3': 'S3',
        '-size4': 'S4',
        '-tex-calligraphic': 'C',
        '-tex-bold-calligraphic': 'CB',
        '-tex-mathit': 'MI',
        '-tex-oldstyle': 'C',
        '-tex-bold-oldstyle': 'CB',
        '-tex-variant': 'A'
    };
    TeXFont.defaultDelimiters = delimiters_js_1.delimiters;
    TeXFont.defaultChars = {
        'normal': normal_js_1.normal,
        'bold': bold_js_1.bold,
        'italic': italic_js_1.italic,
        'bold-italic': bold_italic_js_1.boldItalic,
        'double-struck': double_struck_js_1.doubleStruck,
        'fraktur': fraktur_js_1.fraktur,
        'bold-fraktur': fraktur_bold_js_1.frakturBold,
        'script': script_js_1.script,
        'bold-script': script_bold_js_1.scriptBold,
        'sans-serif': sans_serif_js_1.sansSerif,
        'bold-sans-serif': sans_serif_bold_js_1.sansSerifBold,
        'sans-serif-italic': sans_serif_italic_js_1.sansSerifItalic,
        'sans-serif-bold-italic': sans_serif_bold_italic_js_1.sansSerifBoldItalic,
        'monospace': monospace_js_1.monospace,
        '-smallop': smallop_js_1.smallop,
        '-largeop': largeop_js_1.largeop,
        '-size3': tex_size3_js_1.texSize3,
        '-size4': tex_size4_js_1.texSize4,
        '-tex-calligraphic': tex_calligraphic_js_1.texCalligraphic,
        '-tex-bold-calligraphic': tex_calligraphic_bold_js_1.texCalligraphicBold,
        '-tex-mathit': tex_mathit_js_1.texMathit,
        '-tex-oldstyle': tex_oldstyle_js_1.texOldstyle,
        '-tex-bold-oldstyle': tex_oldstyle_bold_js_1.texOldstyleBold,
        '-tex-variant': tex_variant_js_1.texVariant
    };
    TeXFont.defaultStyles = __assign(__assign({}, FontData_js_1.CHTMLFontData.defaultStyles), { '.MJX-TEX': {
            'font-family': 'MJXZERO, MJXTEX'
        }, '.TEX-B': {
            'font-family': 'MJXZERO, MJXTEX-B'
        }, '.TEX-I': {
            'font-family': 'MJXZERO, MJXTEX-I'
        }, '.TEX-MI': {
            'font-family': 'MJXZERO, MJXTEX-MI'
        }, '.TEX-BI': {
            'font-family': 'MJXZERO, MJXTEX-BI'
        }, '.TEX-S1': {
            'font-family': 'MJXZERO, MJXTEX-S1'
        }, '.TEX-S2': {
            'font-family': 'MJXZERO, MJXTEX-S2'
        }, '.TEX-S3': {
            'font-family': 'MJXZERO, MJXTEX-S3'
        }, '.TEX-S4': {
            'font-family': 'MJXZERO, MJXTEX-S4'
        }, '.TEX-A': {
            'font-family': 'MJXZERO, MJXTEX-A'
        }, '.TEX-C': {
            'font-family': 'MJXZERO, MJXTEX-C'
        }, '.TEX-CB': {
            'font-family': 'MJXZERO, MJXTEX-CB'
        }, '.TEX-FR': {
            'font-family': 'MJXZERO, MJXTEX-FR'
        }, '.TEX-FRB': {
            'font-family': 'MJXZERO, MJXTEX-FRB'
        }, '.TEX-SS': {
            'font-family': 'MJXZERO, MJXTEX-SS'
        }, '.TEX-SSB': {
            'font-family': 'MJXZERO, MJXTEX-SSB'
        }, '.TEX-SSI': {
            'font-family': 'MJXZERO, MJXTEX-SSI'
        }, '.TEX-SC': {
            'font-family': 'MJXZERO, MJXTEX-SC'
        }, '.TEX-T': {
            'font-family': 'MJXZERO, MJXTEX-T'
        }, '.TEX-V': {
            'font-family': 'MJXZERO, MJXTEX-V'
        }, '.TEX-VB': {
            'font-family': 'MJXZERO, MJXTEX-VB'
        }, 'mjx-stretchy-v mjx-c, mjx-stretchy-h mjx-c': {
            'font-family': 'MJXZERO, MJXTEX-S1, MJXTEX-S4, MJXTEX, MJXTEX-A ! important'
        } });
    TeXFont.defaultFonts = __assign(__assign({}, FontData_js_1.CHTMLFontData.defaultFonts), { '@font-face /* 1 */': {
            'font-family': 'MJXTEX',
            src: 'url("%%URL%%/MathJax_Main-Regular.woff") format("woff")'
        }, '@font-face /* 2 */': {
            'font-family': 'MJXTEX-B',
            src: 'url("%%URL%%/MathJax_Main-Bold.woff") format("woff")'
        }, '@font-face /* 3 */': {
            'font-family': 'MJXTEX-I',
            src: 'url("%%URL%%/MathJax_Math-Italic.woff") format("woff")'
        }, '@font-face /* 4 */': {
            'font-family': 'MJXTEX-MI',
            src: 'url("%%URL%%/MathJax_Main-Italic.woff") format("woff")'
        }, '@font-face /* 5 */': {
            'font-family': 'MJXTEX-BI',
            src: 'url("%%URL%%/MathJax_Math-BoldItalic.woff") format("woff")'
        }, '@font-face /* 6 */': {
            'font-family': 'MJXTEX-S1',
            src: 'url("%%URL%%/MathJax_Size1-Regular.woff") format("woff")'
        }, '@font-face /* 7 */': {
            'font-family': 'MJXTEX-S2',
            src: 'url("%%URL%%/MathJax_Size2-Regular.woff") format("woff")'
        }, '@font-face /* 8 */': {
            'font-family': 'MJXTEX-S3',
            src: 'url("%%URL%%/MathJax_Size3-Regular.woff") format("woff")'
        }, '@font-face /* 9 */': {
            'font-family': 'MJXTEX-S4',
            src: 'url("%%URL%%/MathJax_Size4-Regular.woff") format("woff")'
        }, '@font-face /* 10 */': {
            'font-family': 'MJXTEX-A',
            src: 'url("%%URL%%/MathJax_AMS-Regular.woff") format("woff")'
        }, '@font-face /* 11 */': {
            'font-family': 'MJXTEX-C',
            src: 'url("%%URL%%/MathJax_Calligraphic-Regular.woff") format("woff")'
        }, '@font-face /* 12 */': {
            'font-family': 'MJXTEX-CB',
            src: 'url("%%URL%%/MathJax_Calligraphic-Bold.woff") format("woff")'
        }, '@font-face /* 13 */': {
            'font-family': 'MJXTEX-FR',
            src: 'url("%%URL%%/MathJax_Fraktur-Regular.woff") format("woff")'
        }, '@font-face /* 14 */': {
            'font-family': 'MJXTEX-FRB',
            src: 'url("%%URL%%/MathJax_Fraktur-Bold.woff") format("woff")'
        }, '@font-face /* 15 */': {
            'font-family': 'MJXTEX-SS',
            src: 'url("%%URL%%/MathJax_SansSerif-Regular.woff") format("woff")'
        }, '@font-face /* 16 */': {
            'font-family': 'MJXTEX-SSB',
            src: 'url("%%URL%%/MathJax_SansSerif-Bold.woff") format("woff")'
        }, '@font-face /* 17 */': {
            'font-family': 'MJXTEX-SSI',
            src: 'url("%%URL%%/MathJax_SansSerif-Italic.woff") format("woff")'
        }, '@font-face /* 18 */': {
            'font-family': 'MJXTEX-SC',
            src: 'url("%%URL%%/MathJax_Script-Regular.woff") format("woff")'
        }, '@font-face /* 19 */': {
            'font-family': 'MJXTEX-T',
            src: 'url("%%URL%%/MathJax_Typewriter-Regular.woff") format("woff")'
        }, '@font-face /* 20 */': {
            'font-family': 'MJXTEX-V',
            src: 'url("%%URL%%/MathJax_Vector-Regular.woff") format("woff")'
        }, '@font-face /* 21 */': {
            'font-family': 'MJXTEX-VB',
            src: 'url("%%URL%%/MathJax_Vector-Bold.woff") format("woff")'
        } });
    return TeXFont;
}((0, tex_js_1.CommonTeXFontMixin)(FontData_js_1.CHTMLFontData)));
exports.TeXFont = TeXFont;
//# sourceMappingURL=tex.js.map

/***/ }),

/***/ 17682:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boldItalic = void 0;
var FontData_js_1 = __webpack_require__(73779);
var bold_italic_js_1 = __webpack_require__(21453);
exports.boldItalic = (0, FontData_js_1.AddCSS)(bold_italic_js_1.boldItalic, {
    0x131: { f: 'B' },
    0x237: { f: 'B' },
    0x2044: { c: '/' },
    0x2206: { c: '\\394' },
    0x29F8: { c: '/' },
});
//# sourceMappingURL=bold-italic.js.map

/***/ }),

/***/ 95071:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bold = void 0;
var FontData_js_1 = __webpack_require__(73779);
var bold_js_1 = __webpack_require__(74585);
exports.bold = (0, FontData_js_1.AddCSS)(bold_js_1.bold, {
    0xB7: { c: '\\22C5' },
    0x131: { f: '' },
    0x237: { f: '' },
    0x2B9: { c: '\\2032' },
    0x2002: { c: '' },
    0x2003: { c: '' },
    0x2004: { c: '' },
    0x2005: { c: '' },
    0x2006: { c: '' },
    0x2009: { c: '' },
    0x200A: { c: '' },
    0x2015: { c: '\\2014' },
    0x2016: { c: '\\2225' },
    0x2017: { c: '_' },
    0x2022: { c: '\\2219' },
    0x2033: { c: '\\2032\\2032' },
    0x2034: { c: '\\2032\\2032\\2032' },
    0x203E: { c: '\\2C9' },
    0x2044: { c: '/' },
    0x2057: { c: '\\2032\\2032\\2032\\2032' },
    0x20D7: { c: '\\2192', f: 'VB' },
    0x219A: { c: '\\2190\\338' },
    0x219B: { c: '\\2192\\338' },
    0x21AE: { c: '\\2194\\338' },
    0x21CD: { c: '\\21D0\\338' },
    0x21CE: { c: '\\21D4\\338' },
    0x21CF: { c: '\\21D2\\338' },
    0x2204: { c: '\\2203\\338' },
    0x2206: { c: '\\394' },
    0x220C: { c: '\\220B\\338' },
    0x2224: { c: '\\2223\\338' },
    0x2226: { c: '\\2225\\338' },
    0x2241: { c: '\\223C\\338' },
    0x2244: { c: '\\2243\\338' },
    0x2247: { c: '\\2245\\338' },
    0x2249: { c: '\\2248\\338' },
    0x2262: { c: '\\2261\\338' },
    0x226D: { c: '\\224D\\338' },
    0x226E: { c: '<\\338' },
    0x226F: { c: '>\\338' },
    0x2270: { c: '\\2264\\338' },
    0x2271: { c: '\\2265\\338' },
    0x2280: { c: '\\227A\\338' },
    0x2281: { c: '\\227B\\338' },
    0x2284: { c: '\\2282\\338' },
    0x2285: { c: '\\2283\\338' },
    0x2288: { c: '\\2286\\338' },
    0x2289: { c: '\\2287\\338' },
    0x22AC: { c: '\\22A2\\338' },
    0x22AD: { c: '\\22A8\\338' },
    0x22E2: { c: '\\2291\\338' },
    0x22E3: { c: '\\2292\\338' },
    0x2329: { c: '\\27E8' },
    0x232A: { c: '\\27E9' },
    0x25B5: { c: '\\25B3' },
    0x25BF: { c: '\\25BD' },
    0x2758: { c: '\\2223' },
    0x29F8: { c: '/', f: 'BI' },
    0x2A2F: { c: '\\D7' },
    0x3008: { c: '\\27E8' },
    0x3009: { c: '\\27E9' },
});
//# sourceMappingURL=bold.js.map

/***/ }),

/***/ 23663:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.doubleStruck = void 0;
var double_struck_js_1 = __webpack_require__(42206);
Object.defineProperty(exports, "doubleStruck", ({ enumerable: true, get: function () { return double_struck_js_1.doubleStruck; } }));
//# sourceMappingURL=double-struck.js.map

/***/ }),

/***/ 36126:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.frakturBold = void 0;
var FontData_js_1 = __webpack_require__(73779);
var fraktur_bold_js_1 = __webpack_require__(84297);
exports.frakturBold = (0, FontData_js_1.AddCSS)(fraktur_bold_js_1.frakturBold, {
    0x2044: { c: '/' },
});
//# sourceMappingURL=fraktur-bold.js.map

/***/ }),

/***/ 27680:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fraktur = void 0;
var FontData_js_1 = __webpack_require__(73779);
var fraktur_js_1 = __webpack_require__(46441);
exports.fraktur = (0, FontData_js_1.AddCSS)(fraktur_js_1.fraktur, {
    0x2044: { c: '/' },
});
//# sourceMappingURL=fraktur.js.map

/***/ }),

/***/ 60582:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.italic = void 0;
var FontData_js_1 = __webpack_require__(73779);
var italic_js_1 = __webpack_require__(11091);
exports.italic = (0, FontData_js_1.AddCSS)(italic_js_1.italic, {
    0x2F: { f: 'I' },
    0x3DD: { c: '\\E008', f: 'A' },
    0x2015: { c: '\\2014' },
    0x2017: { c: '_' },
    0x2044: { c: '/', f: 'I' },
    0x2206: { c: '\\394', f: 'I' },
    0x29F8: { c: '/', f: 'I' },
});
//# sourceMappingURL=italic.js.map

/***/ }),

/***/ 11160:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.largeop = void 0;
var FontData_js_1 = __webpack_require__(73779);
var largeop_js_1 = __webpack_require__(40123);
exports.largeop = (0, FontData_js_1.AddCSS)(largeop_js_1.largeop, {
    0x2016: { f: 'S1' },
    0x2044: { c: '/' },
    0x2191: { f: 'S1' },
    0x2193: { f: 'S1' },
    0x21D1: { f: 'S1' },
    0x21D3: { f: 'S1' },
    0x2223: { f: 'S1' },
    0x2225: { f: 'S1' },
    0x2329: { c: '\\27E8' },
    0x232A: { c: '\\27E9' },
    0x23D0: { f: 'S1' },
    0x2758: { c: '\\2223', f: 'S1' },
    0x2A0C: { c: '\\222C\\222C' },
    0x3008: { c: '\\27E8' },
    0x3009: { c: '\\27E9' },
});
//# sourceMappingURL=largeop.js.map

/***/ }),

/***/ 50713:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.monospace = void 0;
var FontData_js_1 = __webpack_require__(73779);
var monospace_js_1 = __webpack_require__(61314);
exports.monospace = (0, FontData_js_1.AddCSS)(monospace_js_1.monospace, {
    0x2B9: { c: '\\2032' },
    0x391: { c: 'A' },
    0x392: { c: 'B' },
    0x395: { c: 'E' },
    0x396: { c: 'Z' },
    0x397: { c: 'H' },
    0x399: { c: 'I' },
    0x39A: { c: 'K' },
    0x39C: { c: 'M' },
    0x39D: { c: 'N' },
    0x39F: { c: 'O' },
    0x3A1: { c: 'P' },
    0x3A4: { c: 'T' },
    0x3A7: { c: 'X' },
    0x2017: { c: '_' },
    0x2033: { c: '\\2032\\2032' },
    0x2034: { c: '\\2032\\2032\\2032' },
    0x2044: { c: '/' },
    0x2057: { c: '\\2032\\2032\\2032\\2032' },
    0x2206: { c: '\\394' },
});
//# sourceMappingURL=monospace.js.map

/***/ }),

/***/ 78642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.normal = void 0;
var FontData_js_1 = __webpack_require__(73779);
var normal_js_1 = __webpack_require__(22785);
exports.normal = (0, FontData_js_1.AddCSS)(normal_js_1.normal, {
    0xA3: { f: 'MI' },
    0xA5: { f: 'A' },
    0xAE: { f: 'A' },
    0xB7: { c: '\\22C5' },
    0xF0: { f: 'A' },
    0x2B9: { c: '\\2032' },
    0x391: { c: 'A' },
    0x392: { c: 'B' },
    0x395: { c: 'E' },
    0x396: { c: 'Z' },
    0x397: { c: 'H' },
    0x399: { c: 'I' },
    0x39A: { c: 'K' },
    0x39C: { c: 'M' },
    0x39D: { c: 'N' },
    0x39F: { c: 'O' },
    0x3A1: { c: 'P' },
    0x3A4: { c: 'T' },
    0x3A7: { c: 'X' },
    0x2000: { c: '' },
    0x2001: { c: '' },
    0x2002: { c: '' },
    0x2003: { c: '' },
    0x2004: { c: '' },
    0x2005: { c: '' },
    0x2006: { c: '' },
    0x2009: { c: '' },
    0x200A: { c: '' },
    0x200B: { c: '' },
    0x200C: { c: '' },
    0x2015: { c: '\\2014' },
    0x2016: { c: '\\2225' },
    0x2017: { c: '_' },
    0x2022: { c: '\\2219' },
    0x2033: { c: '\\2032\\2032' },
    0x2034: { c: '\\2032\\2032\\2032' },
    0x2035: { f: 'A' },
    0x2036: { c: '\\2035\\2035', f: 'A' },
    0x2037: { c: '\\2035\\2035\\2035', f: 'A' },
    0x203E: { c: '\\2C9' },
    0x2044: { c: '/' },
    0x2057: { c: '\\2032\\2032\\2032\\2032' },
    0x2060: { c: '' },
    0x2061: { c: '' },
    0x2062: { c: '' },
    0x2063: { c: '' },
    0x2064: { c: '' },
    0x20D7: { c: '\\2192', f: 'V' },
    0x2102: { c: 'C', f: 'A' },
    0x210B: { c: 'H', f: 'SC' },
    0x210C: { c: 'H', f: 'FR' },
    0x210D: { c: 'H', f: 'A' },
    0x210E: { c: 'h', f: 'I' },
    0x210F: { f: 'A' },
    0x2110: { c: 'I', f: 'SC' },
    0x2111: { c: 'I', f: 'FR' },
    0x2112: { c: 'L', f: 'SC' },
    0x2115: { c: 'N', f: 'A' },
    0x2119: { c: 'P', f: 'A' },
    0x211A: { c: 'Q', f: 'A' },
    0x211B: { c: 'R', f: 'SC' },
    0x211C: { c: 'R', f: 'FR' },
    0x211D: { c: 'R', f: 'A' },
    0x2124: { c: 'Z', f: 'A' },
    0x2126: { c: '\\3A9' },
    0x2127: { f: 'A' },
    0x2128: { c: 'Z', f: 'FR' },
    0x212C: { c: 'B', f: 'SC' },
    0x212D: { c: 'C', f: 'FR' },
    0x2130: { c: 'E', f: 'SC' },
    0x2131: { c: 'F', f: 'SC' },
    0x2132: { f: 'A' },
    0x2133: { c: 'M', f: 'SC' },
    0x2136: { f: 'A' },
    0x2137: { f: 'A' },
    0x2138: { f: 'A' },
    0x2141: { f: 'A' },
    0x219A: { f: 'A' },
    0x219B: { f: 'A' },
    0x219E: { f: 'A' },
    0x21A0: { f: 'A' },
    0x21A2: { f: 'A' },
    0x21A3: { f: 'A' },
    0x21AB: { f: 'A' },
    0x21AC: { f: 'A' },
    0x21AD: { f: 'A' },
    0x21AE: { f: 'A' },
    0x21B0: { f: 'A' },
    0x21B1: { f: 'A' },
    0x21B6: { f: 'A' },
    0x21B7: { f: 'A' },
    0x21BA: { f: 'A' },
    0x21BB: { f: 'A' },
    0x21BE: { f: 'A' },
    0x21BF: { f: 'A' },
    0x21C2: { f: 'A' },
    0x21C3: { f: 'A' },
    0x21C4: { f: 'A' },
    0x21C6: { f: 'A' },
    0x21C7: { f: 'A' },
    0x21C8: { f: 'A' },
    0x21C9: { f: 'A' },
    0x21CA: { f: 'A' },
    0x21CB: { f: 'A' },
    0x21CD: { f: 'A' },
    0x21CE: { f: 'A' },
    0x21CF: { f: 'A' },
    0x21DA: { f: 'A' },
    0x21DB: { f: 'A' },
    0x21DD: { f: 'A' },
    0x21E0: { f: 'A' },
    0x21E2: { f: 'A' },
    0x2201: { f: 'A' },
    0x2204: { c: '\\2203\\338' },
    0x2206: { c: '\\394' },
    0x220C: { c: '\\220B\\338' },
    0x220D: { f: 'A' },
    0x220F: { f: 'S1' },
    0x2210: { f: 'S1' },
    0x2211: { f: 'S1' },
    0x2214: { f: 'A' },
    0x2221: { f: 'A' },
    0x2222: { f: 'A' },
    0x2224: { f: 'A' },
    0x2226: { f: 'A' },
    0x222C: { f: 'S1' },
    0x222D: { f: 'S1' },
    0x222E: { f: 'S1' },
    0x2234: { f: 'A' },
    0x2235: { f: 'A' },
    0x223D: { f: 'A' },
    0x2241: { f: 'A' },
    0x2242: { f: 'A' },
    0x2244: { c: '\\2243\\338' },
    0x2247: { c: '\\2246', f: 'A' },
    0x2249: { c: '\\2248\\338' },
    0x224A: { f: 'A' },
    0x224E: { f: 'A' },
    0x224F: { f: 'A' },
    0x2251: { f: 'A' },
    0x2252: { f: 'A' },
    0x2253: { f: 'A' },
    0x2256: { f: 'A' },
    0x2257: { f: 'A' },
    0x225C: { f: 'A' },
    0x2262: { c: '\\2261\\338' },
    0x2266: { f: 'A' },
    0x2267: { f: 'A' },
    0x2268: { f: 'A' },
    0x2269: { f: 'A' },
    0x226C: { f: 'A' },
    0x226D: { c: '\\224D\\338' },
    0x226E: { f: 'A' },
    0x226F: { f: 'A' },
    0x2270: { f: 'A' },
    0x2271: { f: 'A' },
    0x2272: { f: 'A' },
    0x2273: { f: 'A' },
    0x2274: { c: '\\2272\\338' },
    0x2275: { c: '\\2273\\338' },
    0x2276: { f: 'A' },
    0x2277: { f: 'A' },
    0x2278: { c: '\\2276\\338' },
    0x2279: { c: '\\2277\\338' },
    0x227C: { f: 'A' },
    0x227D: { f: 'A' },
    0x227E: { f: 'A' },
    0x227F: { f: 'A' },
    0x2280: { f: 'A' },
    0x2281: { f: 'A' },
    0x2284: { c: '\\2282\\338' },
    0x2285: { c: '\\2283\\338' },
    0x2288: { f: 'A' },
    0x2289: { f: 'A' },
    0x228A: { f: 'A' },
    0x228B: { f: 'A' },
    0x228F: { f: 'A' },
    0x2290: { f: 'A' },
    0x229A: { f: 'A' },
    0x229B: { f: 'A' },
    0x229D: { f: 'A' },
    0x229E: { f: 'A' },
    0x229F: { f: 'A' },
    0x22A0: { f: 'A' },
    0x22A1: { f: 'A' },
    0x22A9: { f: 'A' },
    0x22AA: { f: 'A' },
    0x22AC: { f: 'A' },
    0x22AD: { f: 'A' },
    0x22AE: { f: 'A' },
    0x22AF: { f: 'A' },
    0x22B2: { f: 'A' },
    0x22B3: { f: 'A' },
    0x22B4: { f: 'A' },
    0x22B5: { f: 'A' },
    0x22B8: { f: 'A' },
    0x22BA: { f: 'A' },
    0x22BB: { f: 'A' },
    0x22BC: { f: 'A' },
    0x22C0: { f: 'S1' },
    0x22C1: { f: 'S1' },
    0x22C2: { f: 'S1' },
    0x22C3: { f: 'S1' },
    0x22C7: { f: 'A' },
    0x22C9: { f: 'A' },
    0x22CA: { f: 'A' },
    0x22CB: { f: 'A' },
    0x22CC: { f: 'A' },
    0x22CD: { f: 'A' },
    0x22CE: { f: 'A' },
    0x22CF: { f: 'A' },
    0x22D0: { f: 'A' },
    0x22D1: { f: 'A' },
    0x22D2: { f: 'A' },
    0x22D3: { f: 'A' },
    0x22D4: { f: 'A' },
    0x22D6: { f: 'A' },
    0x22D7: { f: 'A' },
    0x22D8: { f: 'A' },
    0x22D9: { f: 'A' },
    0x22DA: { f: 'A' },
    0x22DB: { f: 'A' },
    0x22DE: { f: 'A' },
    0x22DF: { f: 'A' },
    0x22E0: { f: 'A' },
    0x22E1: { f: 'A' },
    0x22E2: { c: '\\2291\\338' },
    0x22E3: { c: '\\2292\\338' },
    0x22E6: { f: 'A' },
    0x22E7: { f: 'A' },
    0x22E8: { f: 'A' },
    0x22E9: { f: 'A' },
    0x22EA: { f: 'A' },
    0x22EB: { f: 'A' },
    0x22EC: { f: 'A' },
    0x22ED: { f: 'A' },
    0x2305: { c: '\\22BC', f: 'A' },
    0x2306: { c: '\\2A5E', f: 'A' },
    0x231C: { c: '\\250C', f: 'A' },
    0x231D: { c: '\\2510', f: 'A' },
    0x231E: { c: '\\2514', f: 'A' },
    0x231F: { c: '\\2518', f: 'A' },
    0x2329: { c: '\\27E8' },
    0x232A: { c: '\\27E9' },
    0x23D0: { f: 'S1' },
    0x24C8: { f: 'A' },
    0x250C: { f: 'A' },
    0x2510: { f: 'A' },
    0x2514: { f: 'A' },
    0x2518: { f: 'A' },
    0x2571: { f: 'A' },
    0x2572: { f: 'A' },
    0x25A0: { f: 'A' },
    0x25A1: { f: 'A' },
    0x25AA: { c: '\\25A0', f: 'A' },
    0x25B2: { f: 'A' },
    0x25B4: { c: '\\25B2', f: 'A' },
    0x25B5: { c: '\\25B3' },
    0x25B6: { f: 'A' },
    0x25B8: { c: '\\25B6', f: 'A' },
    0x25BC: { f: 'A' },
    0x25BE: { c: '\\25BC', f: 'A' },
    0x25BF: { c: '\\25BD' },
    0x25C0: { f: 'A' },
    0x25C2: { c: '\\25C0', f: 'A' },
    0x25CA: { f: 'A' },
    0x25FB: { c: '\\25A1', f: 'A' },
    0x25FC: { c: '\\25A0', f: 'A' },
    0x2605: { f: 'A' },
    0x2713: { f: 'A' },
    0x2720: { f: 'A' },
    0x2758: { c: '\\2223' },
    0x29EB: { f: 'A' },
    0x29F8: { c: '/', f: 'I' },
    0x2A00: { f: 'S1' },
    0x2A01: { f: 'S1' },
    0x2A02: { f: 'S1' },
    0x2A04: { f: 'S1' },
    0x2A06: { f: 'S1' },
    0x2A0C: { c: '\\222C\\222C', f: 'S1' },
    0x2A2F: { c: '\\D7' },
    0x2A5E: { f: 'A' },
    0x2A7D: { f: 'A' },
    0x2A7E: { f: 'A' },
    0x2A85: { f: 'A' },
    0x2A86: { f: 'A' },
    0x2A87: { f: 'A' },
    0x2A88: { f: 'A' },
    0x2A89: { f: 'A' },
    0x2A8A: { f: 'A' },
    0x2A8B: { f: 'A' },
    0x2A8C: { f: 'A' },
    0x2A95: { f: 'A' },
    0x2A96: { f: 'A' },
    0x2AB5: { f: 'A' },
    0x2AB6: { f: 'A' },
    0x2AB7: { f: 'A' },
    0x2AB8: { f: 'A' },
    0x2AB9: { f: 'A' },
    0x2ABA: { f: 'A' },
    0x2AC5: { f: 'A' },
    0x2AC6: { f: 'A' },
    0x2ACB: { f: 'A' },
    0x2ACC: { f: 'A' },
    0x3008: { c: '\\27E8' },
    0x3009: { c: '\\27E9' },
    0xE006: { f: 'A' },
    0xE007: { f: 'A' },
    0xE008: { f: 'A' },
    0xE009: { f: 'A' },
    0xE00C: { f: 'A' },
    0xE00D: { f: 'A' },
    0xE00E: { f: 'A' },
    0xE00F: { f: 'A' },
    0xE010: { f: 'A' },
    0xE011: { f: 'A' },
    0xE016: { f: 'A' },
    0xE017: { f: 'A' },
    0xE018: { f: 'A' },
    0xE019: { f: 'A' },
    0xE01A: { f: 'A' },
    0xE01B: { f: 'A' },
    0x1D400: { c: 'A', f: 'B' },
    0x1D401: { c: 'B', f: 'B' },
    0x1D402: { c: 'C', f: 'B' },
    0x1D403: { c: 'D', f: 'B' },
    0x1D404: { c: 'E', f: 'B' },
    0x1D405: { c: 'F', f: 'B' },
    0x1D406: { c: 'G', f: 'B' },
    0x1D407: { c: 'H', f: 'B' },
    0x1D408: { c: 'I', f: 'B' },
    0x1D409: { c: 'J', f: 'B' },
    0x1D40A: { c: 'K', f: 'B' },
    0x1D40B: { c: 'L', f: 'B' },
    0x1D40C: { c: 'M', f: 'B' },
    0x1D40D: { c: 'N', f: 'B' },
    0x1D40E: { c: 'O', f: 'B' },
    0x1D40F: { c: 'P', f: 'B' },
    0x1D410: { c: 'Q', f: 'B' },
    0x1D411: { c: 'R', f: 'B' },
    0x1D412: { c: 'S', f: 'B' },
    0x1D413: { c: 'T', f: 'B' },
    0x1D414: { c: 'U', f: 'B' },
    0x1D415: { c: 'V', f: 'B' },
    0x1D416: { c: 'W', f: 'B' },
    0x1D417: { c: 'X', f: 'B' },
    0x1D418: { c: 'Y', f: 'B' },
    0x1D419: { c: 'Z', f: 'B' },
    0x1D41A: { c: 'a', f: 'B' },
    0x1D41B: { c: 'b', f: 'B' },
    0x1D41C: { c: 'c', f: 'B' },
    0x1D41D: { c: 'd', f: 'B' },
    0x1D41E: { c: 'e', f: 'B' },
    0x1D41F: { c: 'f', f: 'B' },
    0x1D420: { c: 'g', f: 'B' },
    0x1D421: { c: 'h', f: 'B' },
    0x1D422: { c: 'i', f: 'B' },
    0x1D423: { c: 'j', f: 'B' },
    0x1D424: { c: 'k', f: 'B' },
    0x1D425: { c: 'l', f: 'B' },
    0x1D426: { c: 'm', f: 'B' },
    0x1D427: { c: 'n', f: 'B' },
    0x1D428: { c: 'o', f: 'B' },
    0x1D429: { c: 'p', f: 'B' },
    0x1D42A: { c: 'q', f: 'B' },
    0x1D42B: { c: 'r', f: 'B' },
    0x1D42C: { c: 's', f: 'B' },
    0x1D42D: { c: 't', f: 'B' },
    0x1D42E: { c: 'u', f: 'B' },
    0x1D42F: { c: 'v', f: 'B' },
    0x1D430: { c: 'w', f: 'B' },
    0x1D431: { c: 'x', f: 'B' },
    0x1D432: { c: 'y', f: 'B' },
    0x1D433: { c: 'z', f: 'B' },
    0x1D434: { c: 'A', f: 'I' },
    0x1D435: { c: 'B', f: 'I' },
    0x1D436: { c: 'C', f: 'I' },
    0x1D437: { c: 'D', f: 'I' },
    0x1D438: { c: 'E', f: 'I' },
    0x1D439: { c: 'F', f: 'I' },
    0x1D43A: { c: 'G', f: 'I' },
    0x1D43B: { c: 'H', f: 'I' },
    0x1D43C: { c: 'I', f: 'I' },
    0x1D43D: { c: 'J', f: 'I' },
    0x1D43E: { c: 'K', f: 'I' },
    0x1D43F: { c: 'L', f: 'I' },
    0x1D440: { c: 'M', f: 'I' },
    0x1D441: { c: 'N', f: 'I' },
    0x1D442: { c: 'O', f: 'I' },
    0x1D443: { c: 'P', f: 'I' },
    0x1D444: { c: 'Q', f: 'I' },
    0x1D445: { c: 'R', f: 'I' },
    0x1D446: { c: 'S', f: 'I' },
    0x1D447: { c: 'T', f: 'I' },
    0x1D448: { c: 'U', f: 'I' },
    0x1D449: { c: 'V', f: 'I' },
    0x1D44A: { c: 'W', f: 'I' },
    0x1D44B: { c: 'X', f: 'I' },
    0x1D44C: { c: 'Y', f: 'I' },
    0x1D44D: { c: 'Z', f: 'I' },
    0x1D44E: { c: 'a', f: 'I' },
    0x1D44F: { c: 'b', f: 'I' },
    0x1D450: { c: 'c', f: 'I' },
    0x1D451: { c: 'd', f: 'I' },
    0x1D452: { c: 'e', f: 'I' },
    0x1D453: { c: 'f', f: 'I' },
    0x1D454: { c: 'g', f: 'I' },
    0x1D456: { c: 'i', f: 'I' },
    0x1D457: { c: 'j', f: 'I' },
    0x1D458: { c: 'k', f: 'I' },
    0x1D459: { c: 'l', f: 'I' },
    0x1D45A: { c: 'm', f: 'I' },
    0x1D45B: { c: 'n', f: 'I' },
    0x1D45C: { c: 'o', f: 'I' },
    0x1D45D: { c: 'p', f: 'I' },
    0x1D45E: { c: 'q', f: 'I' },
    0x1D45F: { c: 'r', f: 'I' },
    0x1D460: { c: 's', f: 'I' },
    0x1D461: { c: 't', f: 'I' },
    0x1D462: { c: 'u', f: 'I' },
    0x1D463: { c: 'v', f: 'I' },
    0x1D464: { c: 'w', f: 'I' },
    0x1D465: { c: 'x', f: 'I' },
    0x1D466: { c: 'y', f: 'I' },
    0x1D467: { c: 'z', f: 'I' },
    0x1D468: { c: 'A', f: 'BI' },
    0x1D469: { c: 'B', f: 'BI' },
    0x1D46A: { c: 'C', f: 'BI' },
    0x1D46B: { c: 'D', f: 'BI' },
    0x1D46C: { c: 'E', f: 'BI' },
    0x1D46D: { c: 'F', f: 'BI' },
    0x1D46E: { c: 'G', f: 'BI' },
    0x1D46F: { c: 'H', f: 'BI' },
    0x1D470: { c: 'I', f: 'BI' },
    0x1D471: { c: 'J', f: 'BI' },
    0x1D472: { c: 'K', f: 'BI' },
    0x1D473: { c: 'L', f: 'BI' },
    0x1D474: { c: 'M', f: 'BI' },
    0x1D475: { c: 'N', f: 'BI' },
    0x1D476: { c: 'O', f: 'BI' },
    0x1D477: { c: 'P', f: 'BI' },
    0x1D478: { c: 'Q', f: 'BI' },
    0x1D479: { c: 'R', f: 'BI' },
    0x1D47A: { c: 'S', f: 'BI' },
    0x1D47B: { c: 'T', f: 'BI' },
    0x1D47C: { c: 'U', f: 'BI' },
    0x1D47D: { c: 'V', f: 'BI' },
    0x1D47E: { c: 'W', f: 'BI' },
    0x1D47F: { c: 'X', f: 'BI' },
    0x1D480: { c: 'Y', f: 'BI' },
    0x1D481: { c: 'Z', f: 'BI' },
    0x1D482: { c: 'a', f: 'BI' },
    0x1D483: { c: 'b', f: 'BI' },
    0x1D484: { c: 'c', f: 'BI' },
    0x1D485: { c: 'd', f: 'BI' },
    0x1D486: { c: 'e', f: 'BI' },
    0x1D487: { c: 'f', f: 'BI' },
    0x1D488: { c: 'g', f: 'BI' },
    0x1D489: { c: 'h', f: 'BI' },
    0x1D48A: { c: 'i', f: 'BI' },
    0x1D48B: { c: 'j', f: 'BI' },
    0x1D48C: { c: 'k', f: 'BI' },
    0x1D48D: { c: 'l', f: 'BI' },
    0x1D48E: { c: 'm', f: 'BI' },
    0x1D48F: { c: 'n', f: 'BI' },
    0x1D490: { c: 'o', f: 'BI' },
    0x1D491: { c: 'p', f: 'BI' },
    0x1D492: { c: 'q', f: 'BI' },
    0x1D493: { c: 'r', f: 'BI' },
    0x1D494: { c: 's', f: 'BI' },
    0x1D495: { c: 't', f: 'BI' },
    0x1D496: { c: 'u', f: 'BI' },
    0x1D497: { c: 'v', f: 'BI' },
    0x1D498: { c: 'w', f: 'BI' },
    0x1D499: { c: 'x', f: 'BI' },
    0x1D49A: { c: 'y', f: 'BI' },
    0x1D49B: { c: 'z', f: 'BI' },
    0x1D49C: { c: 'A', f: 'SC' },
    0x1D49E: { c: 'C', f: 'SC' },
    0x1D49F: { c: 'D', f: 'SC' },
    0x1D4A2: { c: 'G', f: 'SC' },
    0x1D4A5: { c: 'J', f: 'SC' },
    0x1D4A6: { c: 'K', f: 'SC' },
    0x1D4A9: { c: 'N', f: 'SC' },
    0x1D4AA: { c: 'O', f: 'SC' },
    0x1D4AB: { c: 'P', f: 'SC' },
    0x1D4AC: { c: 'Q', f: 'SC' },
    0x1D4AE: { c: 'S', f: 'SC' },
    0x1D4AF: { c: 'T', f: 'SC' },
    0x1D4B0: { c: 'U', f: 'SC' },
    0x1D4B1: { c: 'V', f: 'SC' },
    0x1D4B2: { c: 'W', f: 'SC' },
    0x1D4B3: { c: 'X', f: 'SC' },
    0x1D4B4: { c: 'Y', f: 'SC' },
    0x1D4B5: { c: 'Z', f: 'SC' },
    0x1D504: { c: 'A', f: 'FR' },
    0x1D505: { c: 'B', f: 'FR' },
    0x1D507: { c: 'D', f: 'FR' },
    0x1D508: { c: 'E', f: 'FR' },
    0x1D509: { c: 'F', f: 'FR' },
    0x1D50A: { c: 'G', f: 'FR' },
    0x1D50D: { c: 'J', f: 'FR' },
    0x1D50E: { c: 'K', f: 'FR' },
    0x1D50F: { c: 'L', f: 'FR' },
    0x1D510: { c: 'M', f: 'FR' },
    0x1D511: { c: 'N', f: 'FR' },
    0x1D512: { c: 'O', f: 'FR' },
    0x1D513: { c: 'P', f: 'FR' },
    0x1D514: { c: 'Q', f: 'FR' },
    0x1D516: { c: 'S', f: 'FR' },
    0x1D517: { c: 'T', f: 'FR' },
    0x1D518: { c: 'U', f: 'FR' },
    0x1D519: { c: 'V', f: 'FR' },
    0x1D51A: { c: 'W', f: 'FR' },
    0x1D51B: { c: 'X', f: 'FR' },
    0x1D51C: { c: 'Y', f: 'FR' },
    0x1D51E: { c: 'a', f: 'FR' },
    0x1D51F: { c: 'b', f: 'FR' },
    0x1D520: { c: 'c', f: 'FR' },
    0x1D521: { c: 'd', f: 'FR' },
    0x1D522: { c: 'e', f: 'FR' },
    0x1D523: { c: 'f', f: 'FR' },
    0x1D524: { c: 'g', f: 'FR' },
    0x1D525: { c: 'h', f: 'FR' },
    0x1D526: { c: 'i', f: 'FR' },
    0x1D527: { c: 'j', f: 'FR' },
    0x1D528: { c: 'k', f: 'FR' },
    0x1D529: { c: 'l', f: 'FR' },
    0x1D52A: { c: 'm', f: 'FR' },
    0x1D52B: { c: 'n', f: 'FR' },
    0x1D52C: { c: 'o', f: 'FR' },
    0x1D52D: { c: 'p', f: 'FR' },
    0x1D52E: { c: 'q', f: 'FR' },
    0x1D52F: { c: 'r', f: 'FR' },
    0x1D530: { c: 's', f: 'FR' },
    0x1D531: { c: 't', f: 'FR' },
    0x1D532: { c: 'u', f: 'FR' },
    0x1D533: { c: 'v', f: 'FR' },
    0x1D534: { c: 'w', f: 'FR' },
    0x1D535: { c: 'x', f: 'FR' },
    0x1D536: { c: 'y', f: 'FR' },
    0x1D537: { c: 'z', f: 'FR' },
    0x1D538: { c: 'A', f: 'A' },
    0x1D539: { c: 'B', f: 'A' },
    0x1D53B: { c: 'D', f: 'A' },
    0x1D53C: { c: 'E', f: 'A' },
    0x1D53D: { c: 'F', f: 'A' },
    0x1D53E: { c: 'G', f: 'A' },
    0x1D540: { c: 'I', f: 'A' },
    0x1D541: { c: 'J', f: 'A' },
    0x1D542: { c: 'K', f: 'A' },
    0x1D543: { c: 'L', f: 'A' },
    0x1D544: { c: 'M', f: 'A' },
    0x1D546: { c: 'O', f: 'A' },
    0x1D54A: { c: 'S', f: 'A' },
    0x1D54B: { c: 'T', f: 'A' },
    0x1D54C: { c: 'U', f: 'A' },
    0x1D54D: { c: 'V', f: 'A' },
    0x1D54E: { c: 'W', f: 'A' },
    0x1D54F: { c: 'X', f: 'A' },
    0x1D550: { c: 'Y', f: 'A' },
    0x1D56C: { c: 'A', f: 'FRB' },
    0x1D56D: { c: 'B', f: 'FRB' },
    0x1D56E: { c: 'C', f: 'FRB' },
    0x1D56F: { c: 'D', f: 'FRB' },
    0x1D570: { c: 'E', f: 'FRB' },
    0x1D571: { c: 'F', f: 'FRB' },
    0x1D572: { c: 'G', f: 'FRB' },
    0x1D573: { c: 'H', f: 'FRB' },
    0x1D574: { c: 'I', f: 'FRB' },
    0x1D575: { c: 'J', f: 'FRB' },
    0x1D576: { c: 'K', f: 'FRB' },
    0x1D577: { c: 'L', f: 'FRB' },
    0x1D578: { c: 'M', f: 'FRB' },
    0x1D579: { c: 'N', f: 'FRB' },
    0x1D57A: { c: 'O', f: 'FRB' },
    0x1D57B: { c: 'P', f: 'FRB' },
    0x1D57C: { c: 'Q', f: 'FRB' },
    0x1D57D: { c: 'R', f: 'FRB' },
    0x1D57E: { c: 'S', f: 'FRB' },
    0x1D57F: { c: 'T', f: 'FRB' },
    0x1D580: { c: 'U', f: 'FRB' },
    0x1D581: { c: 'V', f: 'FRB' },
    0x1D582: { c: 'W', f: 'FRB' },
    0x1D583: { c: 'X', f: 'FRB' },
    0x1D584: { c: 'Y', f: 'FRB' },
    0x1D585: { c: 'Z', f: 'FRB' },
    0x1D586: { c: 'a', f: 'FRB' },
    0x1D587: { c: 'b', f: 'FRB' },
    0x1D588: { c: 'c', f: 'FRB' },
    0x1D589: { c: 'd', f: 'FRB' },
    0x1D58A: { c: 'e', f: 'FRB' },
    0x1D58B: { c: 'f', f: 'FRB' },
    0x1D58C: { c: 'g', f: 'FRB' },
    0x1D58D: { c: 'h', f: 'FRB' },
    0x1D58E: { c: 'i', f: 'FRB' },
    0x1D58F: { c: 'j', f: 'FRB' },
    0x1D590: { c: 'k', f: 'FRB' },
    0x1D591: { c: 'l', f: 'FRB' },
    0x1D592: { c: 'm', f: 'FRB' },
    0x1D593: { c: 'n', f: 'FRB' },
    0x1D594: { c: 'o', f: 'FRB' },
    0x1D595: { c: 'p', f: 'FRB' },
    0x1D596: { c: 'q', f: 'FRB' },
    0x1D597: { c: 'r', f: 'FRB' },
    0x1D598: { c: 's', f: 'FRB' },
    0x1D599: { c: 't', f: 'FRB' },
    0x1D59A: { c: 'u', f: 'FRB' },
    0x1D59B: { c: 'v', f: 'FRB' },
    0x1D59C: { c: 'w', f: 'FRB' },
    0x1D59D: { c: 'x', f: 'FRB' },
    0x1D59E: { c: 'y', f: 'FRB' },
    0x1D59F: { c: 'z', f: 'FRB' },
    0x1D5A0: { c: 'A', f: 'SS' },
    0x1D5A1: { c: 'B', f: 'SS' },
    0x1D5A2: { c: 'C', f: 'SS' },
    0x1D5A3: { c: 'D', f: 'SS' },
    0x1D5A4: { c: 'E', f: 'SS' },
    0x1D5A5: { c: 'F', f: 'SS' },
    0x1D5A6: { c: 'G', f: 'SS' },
    0x1D5A7: { c: 'H', f: 'SS' },
    0x1D5A8: { c: 'I', f: 'SS' },
    0x1D5A9: { c: 'J', f: 'SS' },
    0x1D5AA: { c: 'K', f: 'SS' },
    0x1D5AB: { c: 'L', f: 'SS' },
    0x1D5AC: { c: 'M', f: 'SS' },
    0x1D5AD: { c: 'N', f: 'SS' },
    0x1D5AE: { c: 'O', f: 'SS' },
    0x1D5AF: { c: 'P', f: 'SS' },
    0x1D5B0: { c: 'Q', f: 'SS' },
    0x1D5B1: { c: 'R', f: 'SS' },
    0x1D5B2: { c: 'S', f: 'SS' },
    0x1D5B3: { c: 'T', f: 'SS' },
    0x1D5B4: { c: 'U', f: 'SS' },
    0x1D5B5: { c: 'V', f: 'SS' },
    0x1D5B6: { c: 'W', f: 'SS' },
    0x1D5B7: { c: 'X', f: 'SS' },
    0x1D5B8: { c: 'Y', f: 'SS' },
    0x1D5B9: { c: 'Z', f: 'SS' },
    0x1D5BA: { c: 'a', f: 'SS' },
    0x1D5BB: { c: 'b', f: 'SS' },
    0x1D5BC: { c: 'c', f: 'SS' },
    0x1D5BD: { c: 'd', f: 'SS' },
    0x1D5BE: { c: 'e', f: 'SS' },
    0x1D5BF: { c: 'f', f: 'SS' },
    0x1D5C0: { c: 'g', f: 'SS' },
    0x1D5C1: { c: 'h', f: 'SS' },
    0x1D5C2: { c: 'i', f: 'SS' },
    0x1D5C3: { c: 'j', f: 'SS' },
    0x1D5C4: { c: 'k', f: 'SS' },
    0x1D5C5: { c: 'l', f: 'SS' },
    0x1D5C6: { c: 'm', f: 'SS' },
    0x1D5C7: { c: 'n', f: 'SS' },
    0x1D5C8: { c: 'o', f: 'SS' },
    0x1D5C9: { c: 'p', f: 'SS' },
    0x1D5CA: { c: 'q', f: 'SS' },
    0x1D5CB: { c: 'r', f: 'SS' },
    0x1D5CC: { c: 's', f: 'SS' },
    0x1D5CD: { c: 't', f: 'SS' },
    0x1D5CE: { c: 'u', f: 'SS' },
    0x1D5CF: { c: 'v', f: 'SS' },
    0x1D5D0: { c: 'w', f: 'SS' },
    0x1D5D1: { c: 'x', f: 'SS' },
    0x1D5D2: { c: 'y', f: 'SS' },
    0x1D5D3: { c: 'z', f: 'SS' },
    0x1D5D4: { c: 'A', f: 'SSB' },
    0x1D5D5: { c: 'B', f: 'SSB' },
    0x1D5D6: { c: 'C', f: 'SSB' },
    0x1D5D7: { c: 'D', f: 'SSB' },
    0x1D5D8: { c: 'E', f: 'SSB' },
    0x1D5D9: { c: 'F', f: 'SSB' },
    0x1D5DA: { c: 'G', f: 'SSB' },
    0x1D5DB: { c: 'H', f: 'SSB' },
    0x1D5DC: { c: 'I', f: 'SSB' },
    0x1D5DD: { c: 'J', f: 'SSB' },
    0x1D5DE: { c: 'K', f: 'SSB' },
    0x1D5DF: { c: 'L', f: 'SSB' },
    0x1D5E0: { c: 'M', f: 'SSB' },
    0x1D5E1: { c: 'N', f: 'SSB' },
    0x1D5E2: { c: 'O', f: 'SSB' },
    0x1D5E3: { c: 'P', f: 'SSB' },
    0x1D5E4: { c: 'Q', f: 'SSB' },
    0x1D5E5: { c: 'R', f: 'SSB' },
    0x1D5E6: { c: 'S', f: 'SSB' },
    0x1D5E7: { c: 'T', f: 'SSB' },
    0x1D5E8: { c: 'U', f: 'SSB' },
    0x1D5E9: { c: 'V', f: 'SSB' },
    0x1D5EA: { c: 'W', f: 'SSB' },
    0x1D5EB: { c: 'X', f: 'SSB' },
    0x1D5EC: { c: 'Y', f: 'SSB' },
    0x1D5ED: { c: 'Z', f: 'SSB' },
    0x1D5EE: { c: 'a', f: 'SSB' },
    0x1D5EF: { c: 'b', f: 'SSB' },
    0x1D5F0: { c: 'c', f: 'SSB' },
    0x1D5F1: { c: 'd', f: 'SSB' },
    0x1D5F2: { c: 'e', f: 'SSB' },
    0x1D5F3: { c: 'f', f: 'SSB' },
    0x1D5F4: { c: 'g', f: 'SSB' },
    0x1D5F5: { c: 'h', f: 'SSB' },
    0x1D5F6: { c: 'i', f: 'SSB' },
    0x1D5F7: { c: 'j', f: 'SSB' },
    0x1D5F8: { c: 'k', f: 'SSB' },
    0x1D5F9: { c: 'l', f: 'SSB' },
    0x1D5FA: { c: 'm', f: 'SSB' },
    0x1D5FB: { c: 'n', f: 'SSB' },
    0x1D5FC: { c: 'o', f: 'SSB' },
    0x1D5FD: { c: 'p', f: 'SSB' },
    0x1D5FE: { c: 'q', f: 'SSB' },
    0x1D5FF: { c: 'r', f: 'SSB' },
    0x1D600: { c: 's', f: 'SSB' },
    0x1D601: { c: 't', f: 'SSB' },
    0x1D602: { c: 'u', f: 'SSB' },
    0x1D603: { c: 'v', f: 'SSB' },
    0x1D604: { c: 'w', f: 'SSB' },
    0x1D605: { c: 'x', f: 'SSB' },
    0x1D606: { c: 'y', f: 'SSB' },
    0x1D607: { c: 'z', f: 'SSB' },
    0x1D608: { c: 'A', f: 'SSI' },
    0x1D609: { c: 'B', f: 'SSI' },
    0x1D60A: { c: 'C', f: 'SSI' },
    0x1D60B: { c: 'D', f: 'SSI' },
    0x1D60C: { c: 'E', f: 'SSI' },
    0x1D60D: { c: 'F', f: 'SSI' },
    0x1D60E: { c: 'G', f: 'SSI' },
    0x1D60F: { c: 'H', f: 'SSI' },
    0x1D610: { c: 'I', f: 'SSI' },
    0x1D611: { c: 'J', f: 'SSI' },
    0x1D612: { c: 'K', f: 'SSI' },
    0x1D613: { c: 'L', f: 'SSI' },
    0x1D614: { c: 'M', f: 'SSI' },
    0x1D615: { c: 'N', f: 'SSI' },
    0x1D616: { c: 'O', f: 'SSI' },
    0x1D617: { c: 'P', f: 'SSI' },
    0x1D618: { c: 'Q', f: 'SSI' },
    0x1D619: { c: 'R', f: 'SSI' },
    0x1D61A: { c: 'S', f: 'SSI' },
    0x1D61B: { c: 'T', f: 'SSI' },
    0x1D61C: { c: 'U', f: 'SSI' },
    0x1D61D: { c: 'V', f: 'SSI' },
    0x1D61E: { c: 'W', f: 'SSI' },
    0x1D61F: { c: 'X', f: 'SSI' },
    0x1D620: { c: 'Y', f: 'SSI' },
    0x1D621: { c: 'Z', f: 'SSI' },
    0x1D622: { c: 'a', f: 'SSI' },
    0x1D623: { c: 'b', f: 'SSI' },
    0x1D624: { c: 'c', f: 'SSI' },
    0x1D625: { c: 'd', f: 'SSI' },
    0x1D626: { c: 'e', f: 'SSI' },
    0x1D627: { c: 'f', f: 'SSI' },
    0x1D628: { c: 'g', f: 'SSI' },
    0x1D629: { c: 'h', f: 'SSI' },
    0x1D62A: { c: 'i', f: 'SSI' },
    0x1D62B: { c: 'j', f: 'SSI' },
    0x1D62C: { c: 'k', f: 'SSI' },
    0x1D62D: { c: 'l', f: 'SSI' },
    0x1D62E: { c: 'm', f: 'SSI' },
    0x1D62F: { c: 'n', f: 'SSI' },
    0x1D630: { c: 'o', f: 'SSI' },
    0x1D631: { c: 'p', f: 'SSI' },
    0x1D632: { c: 'q', f: 'SSI' },
    0x1D633: { c: 'r', f: 'SSI' },
    0x1D634: { c: 's', f: 'SSI' },
    0x1D635: { c: 't', f: 'SSI' },
    0x1D636: { c: 'u', f: 'SSI' },
    0x1D637: { c: 'v', f: 'SSI' },
    0x1D638: { c: 'w', f: 'SSI' },
    0x1D639: { c: 'x', f: 'SSI' },
    0x1D63A: { c: 'y', f: 'SSI' },
    0x1D63B: { c: 'z', f: 'SSI' },
    0x1D670: { c: 'A', f: 'T' },
    0x1D671: { c: 'B', f: 'T' },
    0x1D672: { c: 'C', f: 'T' },
    0x1D673: { c: 'D', f: 'T' },
    0x1D674: { c: 'E', f: 'T' },
    0x1D675: { c: 'F', f: 'T' },
    0x1D676: { c: 'G', f: 'T' },
    0x1D677: { c: 'H', f: 'T' },
    0x1D678: { c: 'I', f: 'T' },
    0x1D679: { c: 'J', f: 'T' },
    0x1D67A: { c: 'K', f: 'T' },
    0x1D67B: { c: 'L', f: 'T' },
    0x1D67C: { c: 'M', f: 'T' },
    0x1D67D: { c: 'N', f: 'T' },
    0x1D67E: { c: 'O', f: 'T' },
    0x1D67F: { c: 'P', f: 'T' },
    0x1D680: { c: 'Q', f: 'T' },
    0x1D681: { c: 'R', f: 'T' },
    0x1D682: { c: 'S', f: 'T' },
    0x1D683: { c: 'T', f: 'T' },
    0x1D684: { c: 'U', f: 'T' },
    0x1D685: { c: 'V', f: 'T' },
    0x1D686: { c: 'W', f: 'T' },
    0x1D687: { c: 'X', f: 'T' },
    0x1D688: { c: 'Y', f: 'T' },
    0x1D689: { c: 'Z', f: 'T' },
    0x1D68A: { c: 'a', f: 'T' },
    0x1D68B: { c: 'b', f: 'T' },
    0x1D68C: { c: 'c', f: 'T' },
    0x1D68D: { c: 'd', f: 'T' },
    0x1D68E: { c: 'e', f: 'T' },
    0x1D68F: { c: 'f', f: 'T' },
    0x1D690: { c: 'g', f: 'T' },
    0x1D691: { c: 'h', f: 'T' },
    0x1D692: { c: 'i', f: 'T' },
    0x1D693: { c: 'j', f: 'T' },
    0x1D694: { c: 'k', f: 'T' },
    0x1D695: { c: 'l', f: 'T' },
    0x1D696: { c: 'm', f: 'T' },
    0x1D697: { c: 'n', f: 'T' },
    0x1D698: { c: 'o', f: 'T' },
    0x1D699: { c: 'p', f: 'T' },
    0x1D69A: { c: 'q', f: 'T' },
    0x1D69B: { c: 'r', f: 'T' },
    0x1D69C: { c: 's', f: 'T' },
    0x1D69D: { c: 't', f: 'T' },
    0x1D69E: { c: 'u', f: 'T' },
    0x1D69F: { c: 'v', f: 'T' },
    0x1D6A0: { c: 'w', f: 'T' },
    0x1D6A1: { c: 'x', f: 'T' },
    0x1D6A2: { c: 'y', f: 'T' },
    0x1D6A3: { c: 'z', f: 'T' },
    0x1D6A8: { c: 'A', f: 'B' },
    0x1D6A9: { c: 'B', f: 'B' },
    0x1D6AA: { c: '\\393', f: 'B' },
    0x1D6AB: { c: '\\394', f: 'B' },
    0x1D6AC: { c: 'E', f: 'B' },
    0x1D6AD: { c: 'Z', f: 'B' },
    0x1D6AE: { c: 'H', f: 'B' },
    0x1D6AF: { c: '\\398', f: 'B' },
    0x1D6B0: { c: 'I', f: 'B' },
    0x1D6B1: { c: 'K', f: 'B' },
    0x1D6B2: { c: '\\39B', f: 'B' },
    0x1D6B3: { c: 'M', f: 'B' },
    0x1D6B4: { c: 'N', f: 'B' },
    0x1D6B5: { c: '\\39E', f: 'B' },
    0x1D6B6: { c: 'O', f: 'B' },
    0x1D6B7: { c: '\\3A0', f: 'B' },
    0x1D6B8: { c: 'P', f: 'B' },
    0x1D6BA: { c: '\\3A3', f: 'B' },
    0x1D6BB: { c: 'T', f: 'B' },
    0x1D6BC: { c: '\\3A5', f: 'B' },
    0x1D6BD: { c: '\\3A6', f: 'B' },
    0x1D6BE: { c: 'X', f: 'B' },
    0x1D6BF: { c: '\\3A8', f: 'B' },
    0x1D6C0: { c: '\\3A9', f: 'B' },
    0x1D6C1: { c: '\\2207', f: 'B' },
    0x1D6E2: { c: 'A', f: 'I' },
    0x1D6E3: { c: 'B', f: 'I' },
    0x1D6E4: { c: '\\393', f: 'I' },
    0x1D6E5: { c: '\\394', f: 'I' },
    0x1D6E6: { c: 'E', f: 'I' },
    0x1D6E7: { c: 'Z', f: 'I' },
    0x1D6E8: { c: 'H', f: 'I' },
    0x1D6E9: { c: '\\398', f: 'I' },
    0x1D6EA: { c: 'I', f: 'I' },
    0x1D6EB: { c: 'K', f: 'I' },
    0x1D6EC: { c: '\\39B', f: 'I' },
    0x1D6ED: { c: 'M', f: 'I' },
    0x1D6EE: { c: 'N', f: 'I' },
    0x1D6EF: { c: '\\39E', f: 'I' },
    0x1D6F0: { c: 'O', f: 'I' },
    0x1D6F1: { c: '\\3A0', f: 'I' },
    0x1D6F2: { c: 'P', f: 'I' },
    0x1D6F4: { c: '\\3A3', f: 'I' },
    0x1D6F5: { c: 'T', f: 'I' },
    0x1D6F6: { c: '\\3A5', f: 'I' },
    0x1D6F7: { c: '\\3A6', f: 'I' },
    0x1D6F8: { c: 'X', f: 'I' },
    0x1D6F9: { c: '\\3A8', f: 'I' },
    0x1D6FA: { c: '\\3A9', f: 'I' },
    0x1D6FC: { c: '\\3B1', f: 'I' },
    0x1D6FD: { c: '\\3B2', f: 'I' },
    0x1D6FE: { c: '\\3B3', f: 'I' },
    0x1D6FF: { c: '\\3B4', f: 'I' },
    0x1D700: { c: '\\3B5', f: 'I' },
    0x1D701: { c: '\\3B6', f: 'I' },
    0x1D702: { c: '\\3B7', f: 'I' },
    0x1D703: { c: '\\3B8', f: 'I' },
    0x1D704: { c: '\\3B9', f: 'I' },
    0x1D705: { c: '\\3BA', f: 'I' },
    0x1D706: { c: '\\3BB', f: 'I' },
    0x1D707: { c: '\\3BC', f: 'I' },
    0x1D708: { c: '\\3BD', f: 'I' },
    0x1D709: { c: '\\3BE', f: 'I' },
    0x1D70A: { c: '\\3BF', f: 'I' },
    0x1D70B: { c: '\\3C0', f: 'I' },
    0x1D70C: { c: '\\3C1', f: 'I' },
    0x1D70D: { c: '\\3C2', f: 'I' },
    0x1D70E: { c: '\\3C3', f: 'I' },
    0x1D70F: { c: '\\3C4', f: 'I' },
    0x1D710: { c: '\\3C5', f: 'I' },
    0x1D711: { c: '\\3C6', f: 'I' },
    0x1D712: { c: '\\3C7', f: 'I' },
    0x1D713: { c: '\\3C8', f: 'I' },
    0x1D714: { c: '\\3C9', f: 'I' },
    0x1D715: { c: '\\2202' },
    0x1D716: { c: '\\3F5', f: 'I' },
    0x1D717: { c: '\\3D1', f: 'I' },
    0x1D718: { c: '\\E009', f: 'A' },
    0x1D719: { c: '\\3D5', f: 'I' },
    0x1D71A: { c: '\\3F1', f: 'I' },
    0x1D71B: { c: '\\3D6', f: 'I' },
    0x1D71C: { c: 'A', f: 'BI' },
    0x1D71D: { c: 'B', f: 'BI' },
    0x1D71E: { c: '\\393', f: 'BI' },
    0x1D71F: { c: '\\394', f: 'BI' },
    0x1D720: { c: 'E', f: 'BI' },
    0x1D721: { c: 'Z', f: 'BI' },
    0x1D722: { c: 'H', f: 'BI' },
    0x1D723: { c: '\\398', f: 'BI' },
    0x1D724: { c: 'I', f: 'BI' },
    0x1D725: { c: 'K', f: 'BI' },
    0x1D726: { c: '\\39B', f: 'BI' },
    0x1D727: { c: 'M', f: 'BI' },
    0x1D728: { c: 'N', f: 'BI' },
    0x1D729: { c: '\\39E', f: 'BI' },
    0x1D72A: { c: 'O', f: 'BI' },
    0x1D72B: { c: '\\3A0', f: 'BI' },
    0x1D72C: { c: 'P', f: 'BI' },
    0x1D72E: { c: '\\3A3', f: 'BI' },
    0x1D72F: { c: 'T', f: 'BI' },
    0x1D730: { c: '\\3A5', f: 'BI' },
    0x1D731: { c: '\\3A6', f: 'BI' },
    0x1D732: { c: 'X', f: 'BI' },
    0x1D733: { c: '\\3A8', f: 'BI' },
    0x1D734: { c: '\\3A9', f: 'BI' },
    0x1D736: { c: '\\3B1', f: 'BI' },
    0x1D737: { c: '\\3B2', f: 'BI' },
    0x1D738: { c: '\\3B3', f: 'BI' },
    0x1D739: { c: '\\3B4', f: 'BI' },
    0x1D73A: { c: '\\3B5', f: 'BI' },
    0x1D73B: { c: '\\3B6', f: 'BI' },
    0x1D73C: { c: '\\3B7', f: 'BI' },
    0x1D73D: { c: '\\3B8', f: 'BI' },
    0x1D73E: { c: '\\3B9', f: 'BI' },
    0x1D73F: { c: '\\3BA', f: 'BI' },
    0x1D740: { c: '\\3BB', f: 'BI' },
    0x1D741: { c: '\\3BC', f: 'BI' },
    0x1D742: { c: '\\3BD', f: 'BI' },
    0x1D743: { c: '\\3BE', f: 'BI' },
    0x1D744: { c: '\\3BF', f: 'BI' },
    0x1D745: { c: '\\3C0', f: 'BI' },
    0x1D746: { c: '\\3C1', f: 'BI' },
    0x1D747: { c: '\\3C2', f: 'BI' },
    0x1D748: { c: '\\3C3', f: 'BI' },
    0x1D749: { c: '\\3C4', f: 'BI' },
    0x1D74A: { c: '\\3C5', f: 'BI' },
    0x1D74B: { c: '\\3C6', f: 'BI' },
    0x1D74C: { c: '\\3C7', f: 'BI' },
    0x1D74D: { c: '\\3C8', f: 'BI' },
    0x1D74E: { c: '\\3C9', f: 'BI' },
    0x1D74F: { c: '\\2202', f: 'B' },
    0x1D750: { c: '\\3F5', f: 'BI' },
    0x1D751: { c: '\\3D1', f: 'BI' },
    0x1D752: { c: '\\E009', f: 'A' },
    0x1D753: { c: '\\3D5', f: 'BI' },
    0x1D754: { c: '\\3F1', f: 'BI' },
    0x1D755: { c: '\\3D6', f: 'BI' },
    0x1D756: { c: 'A', f: 'SSB' },
    0x1D757: { c: 'B', f: 'SSB' },
    0x1D758: { c: '\\393', f: 'SSB' },
    0x1D759: { c: '\\394', f: 'SSB' },
    0x1D75A: { c: 'E', f: 'SSB' },
    0x1D75B: { c: 'Z', f: 'SSB' },
    0x1D75C: { c: 'H', f: 'SSB' },
    0x1D75D: { c: '\\398', f: 'SSB' },
    0x1D75E: { c: 'I', f: 'SSB' },
    0x1D75F: { c: 'K', f: 'SSB' },
    0x1D760: { c: '\\39B', f: 'SSB' },
    0x1D761: { c: 'M', f: 'SSB' },
    0x1D762: { c: 'N', f: 'SSB' },
    0x1D763: { c: '\\39E', f: 'SSB' },
    0x1D764: { c: 'O', f: 'SSB' },
    0x1D765: { c: '\\3A0', f: 'SSB' },
    0x1D766: { c: 'P', f: 'SSB' },
    0x1D768: { c: '\\3A3', f: 'SSB' },
    0x1D769: { c: 'T', f: 'SSB' },
    0x1D76A: { c: '\\3A5', f: 'SSB' },
    0x1D76B: { c: '\\3A6', f: 'SSB' },
    0x1D76C: { c: 'X', f: 'SSB' },
    0x1D76D: { c: '\\3A8', f: 'SSB' },
    0x1D76E: { c: '\\3A9', f: 'SSB' },
    0x1D7CE: { c: '0', f: 'B' },
    0x1D7CF: { c: '1', f: 'B' },
    0x1D7D0: { c: '2', f: 'B' },
    0x1D7D1: { c: '3', f: 'B' },
    0x1D7D2: { c: '4', f: 'B' },
    0x1D7D3: { c: '5', f: 'B' },
    0x1D7D4: { c: '6', f: 'B' },
    0x1D7D5: { c: '7', f: 'B' },
    0x1D7D6: { c: '8', f: 'B' },
    0x1D7D7: { c: '9', f: 'B' },
    0x1D7E2: { c: '0', f: 'SS' },
    0x1D7E3: { c: '1', f: 'SS' },
    0x1D7E4: { c: '2', f: 'SS' },
    0x1D7E5: { c: '3', f: 'SS' },
    0x1D7E6: { c: '4', f: 'SS' },
    0x1D7E7: { c: '5', f: 'SS' },
    0x1D7E8: { c: '6', f: 'SS' },
    0x1D7E9: { c: '7', f: 'SS' },
    0x1D7EA: { c: '8', f: 'SS' },
    0x1D7EB: { c: '9', f: 'SS' },
    0x1D7EC: { c: '0', f: 'SSB' },
    0x1D7ED: { c: '1', f: 'SSB' },
    0x1D7EE: { c: '2', f: 'SSB' },
    0x1D7EF: { c: '3', f: 'SSB' },
    0x1D7F0: { c: '4', f: 'SSB' },
    0x1D7F1: { c: '5', f: 'SSB' },
    0x1D7F2: { c: '6', f: 'SSB' },
    0x1D7F3: { c: '7', f: 'SSB' },
    0x1D7F4: { c: '8', f: 'SSB' },
    0x1D7F5: { c: '9', f: 'SSB' },
    0x1D7F6: { c: '0', f: 'T' },
    0x1D7F7: { c: '1', f: 'T' },
    0x1D7F8: { c: '2', f: 'T' },
    0x1D7F9: { c: '3', f: 'T' },
    0x1D7FA: { c: '4', f: 'T' },
    0x1D7FB: { c: '5', f: 'T' },
    0x1D7FC: { c: '6', f: 'T' },
    0x1D7FD: { c: '7', f: 'T' },
    0x1D7FE: { c: '8', f: 'T' },
    0x1D7FF: { c: '9', f: 'T' },
});
//# sourceMappingURL=normal.js.map

/***/ }),

/***/ 10402:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sansSerifBoldItalic = void 0;
var FontData_js_1 = __webpack_require__(73779);
var sans_serif_bold_italic_js_1 = __webpack_require__(92351);
exports.sansSerifBoldItalic = (0, FontData_js_1.AddCSS)(sans_serif_bold_italic_js_1.sansSerifBoldItalic, {
    0x131: { f: 'SSB' },
    0x237: { f: 'SSB' },
});
//# sourceMappingURL=sans-serif-bold-italic.js.map

/***/ }),

/***/ 13274:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sansSerifBold = void 0;
var FontData_js_1 = __webpack_require__(73779);
var sans_serif_bold_js_1 = __webpack_require__(57175);
exports.sansSerifBold = (0, FontData_js_1.AddCSS)(sans_serif_bold_js_1.sansSerifBold, {
    0x2015: { c: '\\2014' },
    0x2017: { c: '_' },
    0x2044: { c: '/' },
    0x2206: { c: '\\394' },
});
//# sourceMappingURL=sans-serif-bold.js.map

/***/ }),

/***/ 20038:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sansSerifItalic = void 0;
var FontData_js_1 = __webpack_require__(73779);
var sans_serif_italic_js_1 = __webpack_require__(3076);
exports.sansSerifItalic = (0, FontData_js_1.AddCSS)(sans_serif_italic_js_1.sansSerifItalic, {
    0x391: { c: 'A' },
    0x392: { c: 'B' },
    0x395: { c: 'E' },
    0x396: { c: 'Z' },
    0x397: { c: 'H' },
    0x399: { c: 'I' },
    0x39A: { c: 'K' },
    0x39C: { c: 'M' },
    0x39D: { c: 'N' },
    0x39F: { c: 'O' },
    0x3A1: { c: 'P' },
    0x3A4: { c: 'T' },
    0x3A7: { c: 'X' },
    0x2015: { c: '\\2014' },
    0x2017: { c: '_' },
    0x2044: { c: '/' },
    0x2206: { c: '\\394' },
});
//# sourceMappingURL=sans-serif-italic.js.map

/***/ }),

/***/ 74395:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sansSerif = void 0;
var FontData_js_1 = __webpack_require__(73779);
var sans_serif_js_1 = __webpack_require__(76798);
exports.sansSerif = (0, FontData_js_1.AddCSS)(sans_serif_js_1.sansSerif, {
    0x391: { c: 'A' },
    0x392: { c: 'B' },
    0x395: { c: 'E' },
    0x396: { c: 'Z' },
    0x397: { c: 'H' },
    0x399: { c: 'I' },
    0x39A: { c: 'K' },
    0x39C: { c: 'M' },
    0x39D: { c: 'N' },
    0x39F: { c: 'O' },
    0x3A1: { c: 'P' },
    0x3A4: { c: 'T' },
    0x3A7: { c: 'X' },
    0x2015: { c: '\\2014' },
    0x2017: { c: '_' },
    0x2044: { c: '/' },
    0x2206: { c: '\\394' },
});
//# sourceMappingURL=sans-serif.js.map

/***/ }),

/***/ 40126:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scriptBold = void 0;
var script_bold_js_1 = __webpack_require__(84356);
Object.defineProperty(exports, "scriptBold", ({ enumerable: true, get: function () { return script_bold_js_1.scriptBold; } }));
//# sourceMappingURL=script-bold.js.map

/***/ }),

/***/ 91543:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.script = void 0;
var script_js_1 = __webpack_require__(77383);
Object.defineProperty(exports, "script", ({ enumerable: true, get: function () { return script_js_1.script; } }));
//# sourceMappingURL=script.js.map

/***/ }),

/***/ 33156:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.smallop = void 0;
var FontData_js_1 = __webpack_require__(73779);
var smallop_js_1 = __webpack_require__(62993);
exports.smallop = (0, FontData_js_1.AddCSS)(smallop_js_1.smallop, {
    0x2044: { c: '/' },
    0x2329: { c: '\\27E8' },
    0x232A: { c: '\\27E9' },
    0x2758: { c: '\\2223' },
    0x2A0C: { c: '\\222C\\222C' },
    0x3008: { c: '\\27E8' },
    0x3009: { c: '\\27E9' },
});
//# sourceMappingURL=smallop.js.map

/***/ }),

/***/ 73182:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texCalligraphicBold = void 0;
var FontData_js_1 = __webpack_require__(73779);
var tex_calligraphic_bold_js_1 = __webpack_require__(65410);
exports.texCalligraphicBold = (0, FontData_js_1.AddCSS)(tex_calligraphic_bold_js_1.texCalligraphicBold, {
    0x131: { f: 'B' },
    0x237: { f: 'B' },
});
//# sourceMappingURL=tex-calligraphic-bold.js.map

/***/ }),

/***/ 56725:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texCalligraphic = void 0;
var tex_calligraphic_js_1 = __webpack_require__(77270);
Object.defineProperty(exports, "texCalligraphic", ({ enumerable: true, get: function () { return tex_calligraphic_js_1.texCalligraphic; } }));
//# sourceMappingURL=tex-calligraphic.js.map

/***/ }),

/***/ 2763:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texMathit = void 0;
var tex_mathit_js_1 = __webpack_require__(29503);
Object.defineProperty(exports, "texMathit", ({ enumerable: true, get: function () { return tex_mathit_js_1.texMathit; } }));
//# sourceMappingURL=tex-mathit.js.map

/***/ }),

/***/ 61315:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texOldstyleBold = void 0;
var tex_oldstyle_bold_js_1 = __webpack_require__(11709);
Object.defineProperty(exports, "texOldstyleBold", ({ enumerable: true, get: function () { return tex_oldstyle_bold_js_1.texOldstyleBold; } }));
//# sourceMappingURL=tex-oldstyle-bold.js.map

/***/ }),

/***/ 77446:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texOldstyle = void 0;
var tex_oldstyle_js_1 = __webpack_require__(49176);
Object.defineProperty(exports, "texOldstyle", ({ enumerable: true, get: function () { return tex_oldstyle_js_1.texOldstyle; } }));
//# sourceMappingURL=tex-oldstyle.js.map

/***/ }),

/***/ 11105:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texSize3 = void 0;
var FontData_js_1 = __webpack_require__(73779);
var tex_size3_js_1 = __webpack_require__(77839);
exports.texSize3 = (0, FontData_js_1.AddCSS)(tex_size3_js_1.texSize3, {
    0x2044: { c: '/' },
    0x2329: { c: '\\27E8' },
    0x232A: { c: '\\27E9' },
    0x3008: { c: '\\27E8' },
    0x3009: { c: '\\27E9' },
});
//# sourceMappingURL=tex-size3.js.map

/***/ }),

/***/ 97425:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texSize4 = void 0;
var FontData_js_1 = __webpack_require__(73779);
var tex_size4_js_1 = __webpack_require__(68291);
exports.texSize4 = (0, FontData_js_1.AddCSS)(tex_size4_js_1.texSize4, {
    0x2044: { c: '/' },
    0x2329: { c: '\\27E8' },
    0x232A: { c: '\\27E9' },
    0x3008: { c: '\\27E8' },
    0x3009: { c: '\\27E9' },
    0xE155: { c: '\\E153\\E152' },
    0xE156: { c: '\\E151\\E150' },
});
//# sourceMappingURL=tex-size4.js.map

/***/ }),

/***/ 30188:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texVariant = void 0;
var FontData_js_1 = __webpack_require__(73779);
var tex_variant_js_1 = __webpack_require__(19539);
exports.texVariant = (0, FontData_js_1.AddCSS)(tex_variant_js_1.texVariant, {
    0x3F0: { c: '\\E009' },
    0x210F: { f: '' },
    0x2224: { c: '\\E006' },
    0x2226: { c: '\\E007' },
    0x2268: { c: '\\E00C' },
    0x2269: { c: '\\E00D' },
    0x2270: { c: '\\E011' },
    0x2271: { c: '\\E00E' },
    0x2288: { c: '\\E016' },
    0x2289: { c: '\\E018' },
    0x228A: { c: '\\E01A' },
    0x228B: { c: '\\E01B' },
    0x2A87: { c: '\\E010' },
    0x2A88: { c: '\\E00F' },
    0x2ACB: { c: '\\E017' },
    0x2ACC: { c: '\\E019' },
});
//# sourceMappingURL=tex-variant.js.map

/***/ }),

/***/ 88284:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FontData = exports.NOSTRETCH = exports.H = exports.V = void 0;
var Options_js_1 = __webpack_require__(36059);
exports.V = 1;
exports.H = 2;
exports.NOSTRETCH = { dir: 0 };
var FontData = (function () {
    function FontData(options) {
        var e_1, _a, e_2, _b;
        if (options === void 0) { options = null; }
        this.variant = {};
        this.delimiters = {};
        this.cssFontMap = {};
        this.remapChars = {};
        this.skewIcFactor = .75;
        var CLASS = this.constructor;
        this.options = (0, Options_js_1.userOptions)((0, Options_js_1.defaultOptions)({}, CLASS.OPTIONS), options);
        this.params = __assign({}, CLASS.defaultParams);
        this.sizeVariants = __spreadArray([], __read(CLASS.defaultSizeVariants), false);
        this.stretchVariants = __spreadArray([], __read(CLASS.defaultStretchVariants), false);
        this.cssFontMap = __assign({}, CLASS.defaultCssFonts);
        try {
            for (var _c = __values(Object.keys(this.cssFontMap)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var name_1 = _d.value;
                if (this.cssFontMap[name_1][0] === 'unknown') {
                    this.cssFontMap[name_1][0] = this.options.unknownFamily;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.cssFamilyPrefix = CLASS.defaultCssFamilyPrefix;
        this.createVariants(CLASS.defaultVariants);
        this.defineDelimiters(CLASS.defaultDelimiters);
        try {
            for (var _e = __values(Object.keys(CLASS.defaultChars)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var name_2 = _f.value;
                this.defineChars(name_2, CLASS.defaultChars[name_2]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.defineRemap('accent', CLASS.defaultAccentMap);
        this.defineRemap('mo', CLASS.defaultMoMap);
        this.defineRemap('mn', CLASS.defaultMnMap);
    }
    FontData.charOptions = function (font, n) {
        var char = font[n];
        if (char.length === 3) {
            char[3] = {};
        }
        return char[3];
    };
    Object.defineProperty(FontData.prototype, "styles", {
        get: function () {
            return this._styles;
        },
        set: function (style) {
            this._styles = style;
        },
        enumerable: false,
        configurable: true
    });
    FontData.prototype.createVariant = function (name, inherit, link) {
        if (inherit === void 0) { inherit = null; }
        if (link === void 0) { link = null; }
        var variant = {
            linked: [],
            chars: (inherit ? Object.create(this.variant[inherit].chars) : {})
        };
        if (link && this.variant[link]) {
            Object.assign(variant.chars, this.variant[link].chars);
            this.variant[link].linked.push(variant.chars);
            variant.chars = Object.create(variant.chars);
        }
        this.remapSmpChars(variant.chars, name);
        this.variant[name] = variant;
    };
    FontData.prototype.remapSmpChars = function (chars, name) {
        var e_3, _a, e_4, _b;
        var CLASS = this.constructor;
        if (CLASS.VariantSmp[name]) {
            var SmpRemap = CLASS.SmpRemap;
            var SmpGreek = [null, null, CLASS.SmpRemapGreekU, CLASS.SmpRemapGreekL];
            try {
                for (var _c = __values(CLASS.SmpRanges), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 3), i = _e[0], lo = _e[1], hi = _e[2];
                    var base = CLASS.VariantSmp[name][i];
                    if (!base)
                        continue;
                    for (var n = lo; n <= hi; n++) {
                        if (n === 0x3A2)
                            continue;
                        var smp = base + n - lo;
                        chars[n] = this.smpChar(SmpRemap[smp] || smp);
                    }
                    if (SmpGreek[i]) {
                        try {
                            for (var _f = (e_4 = void 0, __values(Object.keys(SmpGreek[i]).map(function (x) { return parseInt(x); }))), _g = _f.next(); !_g.done; _g = _f.next()) {
                                var n = _g.value;
                                chars[n] = this.smpChar(base + SmpGreek[i][n]);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        if (name === 'bold') {
            chars[0x3DC] = this.smpChar(0x1D7CA);
            chars[0x3DD] = this.smpChar(0x1D7CB);
        }
    };
    FontData.prototype.smpChar = function (n) {
        return [, , , { smp: n }];
    };
    FontData.prototype.createVariants = function (variants) {
        var e_5, _a;
        try {
            for (var variants_1 = __values(variants), variants_1_1 = variants_1.next(); !variants_1_1.done; variants_1_1 = variants_1.next()) {
                var variant = variants_1_1.value;
                this.createVariant(variant[0], variant[1], variant[2]);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (variants_1_1 && !variants_1_1.done && (_a = variants_1.return)) _a.call(variants_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    FontData.prototype.defineChars = function (name, chars) {
        var e_6, _a;
        var variant = this.variant[name];
        Object.assign(variant.chars, chars);
        try {
            for (var _b = __values(variant.linked), _c = _b.next(); !_c.done; _c = _b.next()) {
                var link = _c.value;
                Object.assign(link, chars);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    FontData.prototype.defineDelimiters = function (delims) {
        Object.assign(this.delimiters, delims);
    };
    FontData.prototype.defineRemap = function (name, remap) {
        if (!this.remapChars.hasOwnProperty(name)) {
            this.remapChars[name] = {};
        }
        Object.assign(this.remapChars[name], remap);
    };
    FontData.prototype.getDelimiter = function (n) {
        return this.delimiters[n];
    };
    FontData.prototype.getSizeVariant = function (n, i) {
        if (this.delimiters[n].variants) {
            i = this.delimiters[n].variants[i];
        }
        return this.sizeVariants[i];
    };
    FontData.prototype.getStretchVariant = function (n, i) {
        return this.stretchVariants[this.delimiters[n].stretchv ? this.delimiters[n].stretchv[i] : 0];
    };
    FontData.prototype.getChar = function (name, n) {
        return this.variant[name].chars[n];
    };
    FontData.prototype.getVariant = function (name) {
        return this.variant[name];
    };
    FontData.prototype.getCssFont = function (variant) {
        return this.cssFontMap[variant] || ['serif', false, false];
    };
    FontData.prototype.getFamily = function (family) {
        return (this.cssFamilyPrefix ? this.cssFamilyPrefix + ', ' + family : family);
    };
    FontData.prototype.getRemappedChar = function (name, c) {
        var map = this.remapChars[name] || {};
        return map[c];
    };
    FontData.OPTIONS = {
        unknownFamily: 'serif'
    };
    FontData.JAX = 'common';
    FontData.NAME = '';
    FontData.defaultVariants = [
        ['normal'],
        ['bold', 'normal'],
        ['italic', 'normal'],
        ['bold-italic', 'italic', 'bold'],
        ['double-struck', 'bold'],
        ['fraktur', 'normal'],
        ['bold-fraktur', 'bold', 'fraktur'],
        ['script', 'italic'],
        ['bold-script', 'bold-italic', 'script'],
        ['sans-serif', 'normal'],
        ['bold-sans-serif', 'bold', 'sans-serif'],
        ['sans-serif-italic', 'italic', 'sans-serif'],
        ['sans-serif-bold-italic', 'bold-italic', 'bold-sans-serif'],
        ['monospace', 'normal']
    ];
    FontData.defaultCssFonts = {
        normal: ['unknown', false, false],
        bold: ['unknown', false, true],
        italic: ['unknown', true, false],
        'bold-italic': ['unknown', true, true],
        'double-struck': ['unknown', false, true],
        fraktur: ['unknown', false, false],
        'bold-fraktur': ['unknown', false, true],
        script: ['cursive', false, false],
        'bold-script': ['cursive', false, true],
        'sans-serif': ['sans-serif', false, false],
        'bold-sans-serif': ['sans-serif', false, true],
        'sans-serif-italic': ['sans-serif', true, false],
        'sans-serif-bold-italic': ['sans-serif', true, true],
        monospace: ['monospace', false, false]
    };
    FontData.defaultCssFamilyPrefix = '';
    FontData.VariantSmp = {
        bold: [0x1D400, 0x1D41A, 0x1D6A8, 0x1D6C2, 0x1D7CE],
        italic: [0x1D434, 0x1D44E, 0x1D6E2, 0x1D6FC],
        'bold-italic': [0x1D468, 0x1D482, 0x1D71C, 0x1D736],
        script: [0x1D49C, 0x1D4B6],
        'bold-script': [0x1D4D0, 0x1D4EA],
        fraktur: [0x1D504, 0x1D51E],
        'double-struck': [0x1D538, 0x1D552, , , 0x1D7D8],
        'bold-fraktur': [0x1D56C, 0x1D586],
        'sans-serif': [0x1D5A0, 0x1D5BA, , , 0x1D7E2],
        'bold-sans-serif': [0x1D5D4, 0x1D5EE, 0x1D756, 0x1D770, 0x1D7EC],
        'sans-serif-italic': [0x1D608, 0x1D622],
        'sans-serif-bold-italic': [0x1D63C, 0x1D656, 0x1D790, 0x1D7AA],
        'monospace': [0x1D670, 0x1D68A, , , 0x1D7F6]
    };
    FontData.SmpRanges = [
        [0, 0x41, 0x5A],
        [1, 0x61, 0x7A],
        [2, 0x391, 0x3A9],
        [3, 0x3B1, 0x3C9],
        [4, 0x30, 0x39]
    ];
    FontData.SmpRemap = {
        0x1D455: 0x210E,
        0x1D49D: 0x212C,
        0x1D4A0: 0x2130,
        0x1D4A1: 0x2131,
        0x1D4A3: 0x210B,
        0x1D4A4: 0x2110,
        0x1D4A7: 0x2112,
        0x1D4A8: 0x2133,
        0x1D4AD: 0x211B,
        0x1D4BA: 0x212F,
        0x1D4BC: 0x210A,
        0x1D4C4: 0x2134,
        0x1D506: 0x212D,
        0x1D50B: 0x210C,
        0x1D50C: 0x2111,
        0x1D515: 0x211C,
        0x1D51D: 0x2128,
        0x1D53A: 0x2102,
        0x1D53F: 0x210D,
        0x1D545: 0x2115,
        0x1D547: 0x2119,
        0x1D548: 0x211A,
        0x1D549: 0x211D,
        0x1D551: 0x2124,
    };
    FontData.SmpRemapGreekU = {
        0x2207: 0x19,
        0x03F4: 0x11
    };
    FontData.SmpRemapGreekL = {
        0x3D1: 0x1B,
        0x3D5: 0x1D,
        0x3D6: 0x1F,
        0x3F0: 0x1C,
        0x3F1: 0x1E,
        0x3F5: 0x1A,
        0x2202: 0x19
    };
    FontData.defaultAccentMap = {
        0x0300: '\u02CB',
        0x0301: '\u02CA',
        0x0302: '\u02C6',
        0x0303: '\u02DC',
        0x0304: '\u02C9',
        0x0306: '\u02D8',
        0x0307: '\u02D9',
        0x0308: '\u00A8',
        0x030A: '\u02DA',
        0x030C: '\u02C7',
        0x2192: '\u20D7',
        0x2032: '\'',
        0x2033: '\'\'',
        0x2034: '\'\'\'',
        0x2035: '`',
        0x2036: '``',
        0x2037: '```',
        0x2057: '\'\'\'\'',
        0x20D0: '\u21BC',
        0x20D1: '\u21C0',
        0x20D6: '\u2190',
        0x20E1: '\u2194',
        0x20F0: '*',
        0x20DB: '...',
        0x20DC: '....',
        0x20EC: '\u21C1',
        0x20ED: '\u21BD',
        0x20EE: '\u2190',
        0x20EF: '\u2192'
    };
    FontData.defaultMoMap = {
        0x002D: '\u2212'
    };
    FontData.defaultMnMap = {
        0x002D: '\u2212'
    };
    FontData.defaultParams = {
        x_height: .442,
        quad: 1,
        num1: .676,
        num2: .394,
        num3: .444,
        denom1: .686,
        denom2: .345,
        sup1: .413,
        sup2: .363,
        sup3: .289,
        sub1: .15,
        sub2: .247,
        sup_drop: .386,
        sub_drop: .05,
        delim1: 2.39,
        delim2: 1.0,
        axis_height: .25,
        rule_thickness: .06,
        big_op_spacing1: .111,
        big_op_spacing2: .167,
        big_op_spacing3: .2,
        big_op_spacing4: .6,
        big_op_spacing5: .1,
        surd_height: .075,
        scriptspace: .05,
        nulldelimiterspace: .12,
        delimiterfactor: 901,
        delimitershortfall: .3,
        min_rule_thickness: 1.25,
        separation_factor: 1.75,
        extra_ic: .033
    };
    FontData.defaultDelimiters = {};
    FontData.defaultChars = {};
    FontData.defaultSizeVariants = [];
    FontData.defaultStretchVariants = [];
    return FontData;
}());
exports.FontData = FontData;
//# sourceMappingURL=FontData.js.map

/***/ }),

/***/ 77988:
/***/ (function(__unused_webpack_module, exports) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonArrow = exports.CommonDiagonalArrow = exports.CommonDiagonalStrike = exports.CommonBorder2 = exports.CommonBorder = exports.arrowBBox = exports.diagonalArrowDef = exports.arrowDef = exports.arrowBBoxW = exports.arrowBBoxHD = exports.arrowHead = exports.fullBorder = exports.fullPadding = exports.fullBBox = exports.sideNames = exports.sideIndex = exports.SOLID = exports.PADDING = exports.THICKNESS = exports.ARROWY = exports.ARROWDX = exports.ARROWX = void 0;
exports.ARROWX = 4, exports.ARROWDX = 1, exports.ARROWY = 2;
exports.THICKNESS = .067;
exports.PADDING = .2;
exports.SOLID = exports.THICKNESS + 'em solid';
exports.sideIndex = { top: 0, right: 1, bottom: 2, left: 3 };
exports.sideNames = Object.keys(exports.sideIndex);
exports.fullBBox = (function (node) { return new Array(4).fill(node.thickness + node.padding); });
exports.fullPadding = (function (node) { return new Array(4).fill(node.padding); });
exports.fullBorder = (function (node) { return new Array(4).fill(node.thickness); });
var arrowHead = function (node) {
    return Math.max(node.padding, node.thickness * (node.arrowhead.x + node.arrowhead.dx + 1));
};
exports.arrowHead = arrowHead;
var arrowBBoxHD = function (node, TRBL) {
    if (node.childNodes[0]) {
        var _a = node.childNodes[0].getBBox(), h = _a.h, d = _a.d;
        TRBL[0] = TRBL[2] = Math.max(0, node.thickness * node.arrowhead.y - (h + d) / 2);
    }
    return TRBL;
};
exports.arrowBBoxHD = arrowBBoxHD;
var arrowBBoxW = function (node, TRBL) {
    if (node.childNodes[0]) {
        var w = node.childNodes[0].getBBox().w;
        TRBL[1] = TRBL[3] = Math.max(0, node.thickness * node.arrowhead.y - w / 2);
    }
    return TRBL;
};
exports.arrowBBoxW = arrowBBoxW;
exports.arrowDef = {
    up: [-Math.PI / 2, false, true, 'verticalstrike'],
    down: [Math.PI / 2, false, true, 'verticakstrike'],
    right: [0, false, false, 'horizontalstrike'],
    left: [Math.PI, false, false, 'horizontalstrike'],
    updown: [Math.PI / 2, true, true, 'verticalstrike uparrow downarrow'],
    leftright: [0, true, false, 'horizontalstrike leftarrow rightarrow']
};
exports.diagonalArrowDef = {
    updiagonal: [-1, 0, false, 'updiagonalstrike northeastarrow'],
    northeast: [-1, 0, false, 'updiagonalstrike updiagonalarrow'],
    southeast: [1, 0, false, 'downdiagonalstrike'],
    northwest: [1, Math.PI, false, 'downdiagonalstrike'],
    southwest: [-1, Math.PI, false, 'updiagonalstrike'],
    northeastsouthwest: [-1, 0, true, 'updiagonalstrike northeastarrow updiagonalarrow southwestarrow'],
    northwestsoutheast: [1, 0, true, 'downdiagonalstrike northwestarrow southeastarrow']
};
exports.arrowBBox = {
    up: function (node) { return (0, exports.arrowBBoxW)(node, [(0, exports.arrowHead)(node), 0, node.padding, 0]); },
    down: function (node) { return (0, exports.arrowBBoxW)(node, [node.padding, 0, (0, exports.arrowHead)(node), 0]); },
    right: function (node) { return (0, exports.arrowBBoxHD)(node, [0, (0, exports.arrowHead)(node), 0, node.padding]); },
    left: function (node) { return (0, exports.arrowBBoxHD)(node, [0, node.padding, 0, (0, exports.arrowHead)(node)]); },
    updown: function (node) { return (0, exports.arrowBBoxW)(node, [(0, exports.arrowHead)(node), 0, (0, exports.arrowHead)(node), 0]); },
    leftright: function (node) { return (0, exports.arrowBBoxHD)(node, [0, (0, exports.arrowHead)(node), 0, (0, exports.arrowHead)(node)]); }
};
var CommonBorder = function (render) {
    return function (side) {
        var i = exports.sideIndex[side];
        return [side, {
                renderer: render,
                bbox: function (node) {
                    var bbox = [0, 0, 0, 0];
                    bbox[i] = node.thickness + node.padding;
                    return bbox;
                },
                border: function (node) {
                    var bbox = [0, 0, 0, 0];
                    bbox[i] = node.thickness;
                    return bbox;
                }
            }];
    };
};
exports.CommonBorder = CommonBorder;
var CommonBorder2 = function (render) {
    return function (name, side1, side2) {
        var i1 = exports.sideIndex[side1];
        var i2 = exports.sideIndex[side2];
        return [name, {
                renderer: render,
                bbox: function (node) {
                    var t = node.thickness + node.padding;
                    var bbox = [0, 0, 0, 0];
                    bbox[i1] = bbox[i2] = t;
                    return bbox;
                },
                border: function (node) {
                    var bbox = [0, 0, 0, 0];
                    bbox[i1] = bbox[i2] = node.thickness;
                    return bbox;
                },
                remove: side1 + ' ' + side2
            }];
    };
};
exports.CommonBorder2 = CommonBorder2;
var CommonDiagonalStrike = function (render) {
    return function (name) {
        var cname = 'mjx-' + name.charAt(0) + 'strike';
        return [name + 'diagonalstrike', {
                renderer: render(cname),
                bbox: exports.fullBBox
            }];
    };
};
exports.CommonDiagonalStrike = CommonDiagonalStrike;
var CommonDiagonalArrow = function (render) {
    return function (name) {
        var _a = __read(exports.diagonalArrowDef[name], 4), c = _a[0], pi = _a[1], double = _a[2], remove = _a[3];
        return [name + 'arrow', {
                renderer: function (node, _child) {
                    var _a = __read(node.arrowAW(), 2), a = _a[0], W = _a[1];
                    var arrow = node.arrow(W, c * (a - pi), double);
                    render(node, arrow);
                },
                bbox: function (node) {
                    var _a = node.arrowData(), a = _a.a, x = _a.x, y = _a.y;
                    var _b = __read([node.arrowhead.x, node.arrowhead.y, node.arrowhead.dx], 3), ax = _b[0], ay = _b[1], adx = _b[2];
                    var _c = __read(node.getArgMod(ax + adx, ay), 2), b = _c[0], ar = _c[1];
                    var dy = y + (b > a ? node.thickness * ar * Math.sin(b - a) : 0);
                    var dx = x + (b > Math.PI / 2 - a ? node.thickness * ar * Math.sin(b + a - Math.PI / 2) : 0);
                    return [dy, dx, dy, dx];
                },
                remove: remove
            }];
    };
};
exports.CommonDiagonalArrow = CommonDiagonalArrow;
var CommonArrow = function (render) {
    return function (name) {
        var _a = __read(exports.arrowDef[name], 4), angle = _a[0], double = _a[1], isVertical = _a[2], remove = _a[3];
        return [name + 'arrow', {
                renderer: function (node, _child) {
                    var _a = node.getBBox(), w = _a.w, h = _a.h, d = _a.d;
                    var _b = __read((isVertical ? [h + d, 'X'] : [w, 'Y']), 2), W = _b[0], offset = _b[1];
                    var dd = node.getOffset(offset);
                    var arrow = node.arrow(W, angle, double, offset, dd);
                    render(node, arrow);
                },
                bbox: exports.arrowBBox[name],
                remove: remove
            }];
    };
};
exports.CommonArrow = CommonArrow;
//# sourceMappingURL=Notation.js.map

/***/ }),

/***/ 90247:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonOutputJax = void 0;
var OutputJax_js_1 = __webpack_require__(73290);
var MathItem_js_1 = __webpack_require__(59719);
var Options_js_1 = __webpack_require__(36059);
var lengths_js_1 = __webpack_require__(77130);
var Styles_js_1 = __webpack_require__(30502);
var StyleList_js_1 = __webpack_require__(24219);
var CommonOutputJax = (function (_super) {
    __extends(CommonOutputJax, _super);
    function CommonOutputJax(options, defaultFactory, defaultFont) {
        if (options === void 0) { options = null; }
        if (defaultFactory === void 0) { defaultFactory = null; }
        if (defaultFont === void 0) { defaultFont = null; }
        var _this = this;
        var _a = __read((0, Options_js_1.separateOptions)(options, defaultFont.OPTIONS), 2), jaxOptions = _a[0], fontOptions = _a[1];
        _this = _super.call(this, jaxOptions) || this;
        _this.factory = _this.options.wrapperFactory ||
            new defaultFactory();
        _this.factory.jax = _this;
        _this.cssStyles = _this.options.cssStyles || new StyleList_js_1.CssStyles();
        _this.font = _this.options.font || new defaultFont(fontOptions);
        _this.unknownCache = new Map();
        return _this;
    }
    CommonOutputJax.prototype.typeset = function (math, html) {
        this.setDocument(html);
        var node = this.createNode();
        this.toDOM(math, node, html);
        return node;
    };
    CommonOutputJax.prototype.createNode = function () {
        var jax = this.constructor.NAME;
        return this.html('mjx-container', { 'class': 'MathJax', jax: jax });
    };
    CommonOutputJax.prototype.setScale = function (node) {
        var scale = this.math.metrics.scale * this.options.scale;
        if (scale !== 1) {
            this.adaptor.setStyle(node, 'fontSize', (0, lengths_js_1.percent)(scale));
        }
    };
    CommonOutputJax.prototype.toDOM = function (math, node, html) {
        if (html === void 0) { html = null; }
        this.setDocument(html);
        this.math = math;
        this.pxPerEm = math.metrics.ex / this.font.params.x_height;
        math.root.setTeXclass(null);
        this.setScale(node);
        this.nodeMap = new Map();
        this.container = node;
        this.processMath(math.root, node);
        this.nodeMap = null;
        this.executeFilters(this.postFilters, math, html, node);
    };
    CommonOutputJax.prototype.getBBox = function (math, html) {
        this.setDocument(html);
        this.math = math;
        math.root.setTeXclass(null);
        this.nodeMap = new Map();
        var bbox = this.factory.wrap(math.root).getOuterBBox();
        this.nodeMap = null;
        return bbox;
    };
    CommonOutputJax.prototype.getMetrics = function (html) {
        var e_1, _a;
        this.setDocument(html);
        var adaptor = this.adaptor;
        var maps = this.getMetricMaps(html);
        try {
            for (var _b = __values(html.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                var math = _c.value;
                var parent_1 = adaptor.parent(math.start.node);
                if (math.state() < MathItem_js_1.STATE.METRICS && parent_1) {
                    var map = maps[math.display ? 1 : 0];
                    var _d = map.get(parent_1), em = _d.em, ex = _d.ex, containerWidth = _d.containerWidth, lineWidth = _d.lineWidth, scale = _d.scale, family = _d.family;
                    math.setMetrics(em, ex, containerWidth, lineWidth, scale);
                    if (this.options.mtextInheritFont) {
                        math.outputData.mtextFamily = family;
                    }
                    if (this.options.merrorInheritFont) {
                        math.outputData.merrorFamily = family;
                    }
                    math.state(MathItem_js_1.STATE.METRICS);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CommonOutputJax.prototype.getMetricsFor = function (node, display) {
        var getFamily = (this.options.mtextInheritFont || this.options.merrorInheritFont);
        var test = this.getTestElement(node, display);
        var metrics = this.measureMetrics(test, getFamily);
        this.adaptor.remove(test);
        return metrics;
    };
    CommonOutputJax.prototype.getMetricMaps = function (html) {
        var e_2, _a, e_3, _b, e_4, _c, e_5, _d, e_6, _e;
        var adaptor = this.adaptor;
        var domMaps = [new Map(), new Map()];
        try {
            for (var _f = __values(html.math), _g = _f.next(); !_g.done; _g = _f.next()) {
                var math = _g.value;
                var node = adaptor.parent(math.start.node);
                if (node && math.state() < MathItem_js_1.STATE.METRICS) {
                    var map = domMaps[math.display ? 1 : 0];
                    if (!map.has(node)) {
                        map.set(node, this.getTestElement(node, math.display));
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var getFamily = this.options.mtextInheritFont || this.options.merrorInheritFont;
        var maps = [new Map(), new Map()];
        try {
            for (var _h = __values(maps.keys()), _j = _h.next(); !_j.done; _j = _h.next()) {
                var i = _j.value;
                try {
                    for (var _k = (e_4 = void 0, __values(domMaps[i].keys())), _l = _k.next(); !_l.done; _l = _k.next()) {
                        var node = _l.value;
                        maps[i].set(node, this.measureMetrics(domMaps[i].get(node), getFamily));
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _m = __values(maps.keys()), _o = _m.next(); !_o.done; _o = _m.next()) {
                var i = _o.value;
                try {
                    for (var _p = (e_6 = void 0, __values(domMaps[i].values())), _q = _p.next(); !_q.done; _q = _p.next()) {
                        var node = _q.value;
                        adaptor.remove(node);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return maps;
    };
    CommonOutputJax.prototype.getTestElement = function (node, display) {
        var adaptor = this.adaptor;
        if (!this.testInline) {
            this.testInline = this.html('mjx-test', { style: {
                    display: 'inline-block',
                    width: '100%',
                    'font-style': 'normal',
                    'font-weight': 'normal',
                    'font-size': '100%',
                    'font-size-adjust': 'none',
                    'text-indent': 0,
                    'text-transform': 'none',
                    'letter-spacing': 'normal',
                    'word-spacing': 'normal',
                    overflow: 'hidden',
                    height: '1px',
                    'margin-right': '-1px'
                } }, [
                this.html('mjx-left-box', { style: {
                        display: 'inline-block',
                        width: 0,
                        'float': 'left'
                    } }),
                this.html('mjx-ex-box', { style: {
                        position: 'absolute',
                        overflow: 'hidden',
                        width: '1px', height: '60ex'
                    } }),
                this.html('mjx-right-box', { style: {
                        display: 'inline-block',
                        width: 0,
                        'float': 'right'
                    } })
            ]);
            this.testDisplay = adaptor.clone(this.testInline);
            adaptor.setStyle(this.testDisplay, 'display', 'table');
            adaptor.setStyle(this.testDisplay, 'margin-right', '');
            adaptor.setStyle(adaptor.firstChild(this.testDisplay), 'display', 'none');
            var right = adaptor.lastChild(this.testDisplay);
            adaptor.setStyle(right, 'display', 'table-cell');
            adaptor.setStyle(right, 'width', '10000em');
            adaptor.setStyle(right, 'float', '');
        }
        return adaptor.append(node, adaptor.clone(display ? this.testDisplay : this.testInline));
    };
    CommonOutputJax.prototype.measureMetrics = function (node, getFamily) {
        var adaptor = this.adaptor;
        var family = (getFamily ? adaptor.fontFamily(node) : '');
        var em = adaptor.fontSize(node);
        var _a = __read(adaptor.nodeSize(adaptor.childNode(node, 1)), 2), w = _a[0], h = _a[1];
        var ex = (w ? h / 60 : em * this.options.exFactor);
        var containerWidth = (!w ? 1000000 : adaptor.getStyle(node, 'display') === 'table' ?
            adaptor.nodeSize(adaptor.lastChild(node))[0] - 1 :
            adaptor.nodeBBox(adaptor.lastChild(node)).left -
                adaptor.nodeBBox(adaptor.firstChild(node)).left - 2);
        var scale = Math.max(this.options.minScale, this.options.matchFontHeight ? ex / this.font.params.x_height / em : 1);
        var lineWidth = 1000000;
        return { em: em, ex: ex, containerWidth: containerWidth, lineWidth: lineWidth, scale: scale, family: family };
    };
    CommonOutputJax.prototype.styleSheet = function (html) {
        var e_7, _a;
        this.setDocument(html);
        this.cssStyles.clear();
        this.cssStyles.addStyles(this.constructor.commonStyles);
        if ('getStyles' in html) {
            try {
                for (var _b = __values(html.getStyles()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var styles = _c.value;
                    this.cssStyles.addStyles(styles);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        this.addWrapperStyles(this.cssStyles);
        this.addFontStyles(this.cssStyles);
        var sheet = this.html('style', { id: 'MJX-styles' }, [this.text('\n' + this.cssStyles.cssText + '\n')]);
        return sheet;
    };
    CommonOutputJax.prototype.addFontStyles = function (styles) {
        styles.addStyles(this.font.styles);
    };
    CommonOutputJax.prototype.addWrapperStyles = function (styles) {
        var e_8, _a;
        try {
            for (var _b = __values(this.factory.getKinds()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var kind = _c.value;
                this.addClassStyles(this.factory.getNodeClass(kind), styles);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
    };
    CommonOutputJax.prototype.addClassStyles = function (CLASS, styles) {
        styles.addStyles(CLASS.styles);
    };
    CommonOutputJax.prototype.setDocument = function (html) {
        if (html) {
            this.document = html;
            this.adaptor.document = html.document;
        }
    };
    CommonOutputJax.prototype.html = function (type, def, content, ns) {
        if (def === void 0) { def = {}; }
        if (content === void 0) { content = []; }
        return this.adaptor.node(type, def, content, ns);
    };
    CommonOutputJax.prototype.text = function (text) {
        return this.adaptor.text(text);
    };
    CommonOutputJax.prototype.fixed = function (m, n) {
        if (n === void 0) { n = 3; }
        if (Math.abs(m) < .0006) {
            return '0';
        }
        return m.toFixed(n).replace(/\.?0+$/, '');
    };
    CommonOutputJax.prototype.measureText = function (text, variant, font) {
        if (font === void 0) { font = ['', false, false]; }
        var node = this.unknownText(text, variant);
        if (variant === '-explicitFont') {
            var styles = this.cssFontStyles(font);
            this.adaptor.setAttributes(node, { style: styles });
        }
        return this.measureTextNodeWithCache(node, text, variant, font);
    };
    CommonOutputJax.prototype.measureTextNodeWithCache = function (text, chars, variant, font) {
        if (font === void 0) { font = ['', false, false]; }
        if (variant === '-explicitFont') {
            variant = [font[0], font[1] ? 'T' : 'F', font[2] ? 'T' : 'F', ''].join('-');
        }
        if (!this.unknownCache.has(variant)) {
            this.unknownCache.set(variant, new Map());
        }
        var map = this.unknownCache.get(variant);
        var cached = map.get(chars);
        if (cached)
            return cached;
        var bbox = this.measureTextNode(text);
        map.set(chars, bbox);
        return bbox;
    };
    CommonOutputJax.prototype.measureXMLnode = function (xml) {
        var adaptor = this.adaptor;
        var content = this.html('mjx-xml-block', { style: { display: 'inline-block' } }, [adaptor.clone(xml)]);
        var base = this.html('mjx-baseline', { style: { display: 'inline-block', width: 0, height: 0 } });
        var style = {
            position: 'absolute',
            display: 'inline-block',
            'font-family': 'initial',
            'line-height': 'normal'
        };
        var node = this.html('mjx-measure-xml', { style: style }, [base, content]);
        adaptor.append(adaptor.parent(this.math.start.node), this.container);
        adaptor.append(this.container, node);
        var em = this.math.metrics.em * this.math.metrics.scale;
        var _a = adaptor.nodeBBox(content), left = _a.left, right = _a.right, bottom = _a.bottom, top = _a.top;
        var w = (right - left) / em;
        var h = (adaptor.nodeBBox(base).top - top) / em;
        var d = (bottom - top) / em - h;
        adaptor.remove(this.container);
        adaptor.remove(node);
        return { w: w, h: h, d: d };
    };
    CommonOutputJax.prototype.cssFontStyles = function (font, styles) {
        if (styles === void 0) { styles = {}; }
        var _a = __read(font, 3), family = _a[0], italic = _a[1], bold = _a[2];
        styles['font-family'] = this.font.getFamily(family);
        if (italic)
            styles['font-style'] = 'italic';
        if (bold)
            styles['font-weight'] = 'bold';
        return styles;
    };
    CommonOutputJax.prototype.getFontData = function (styles) {
        if (!styles) {
            styles = new Styles_js_1.Styles();
        }
        return [this.font.getFamily(styles.get('font-family')),
            styles.get('font-style') === 'italic',
            styles.get('font-weight') === 'bold'];
    };
    CommonOutputJax.NAME = 'Common';
    CommonOutputJax.OPTIONS = __assign(__assign({}, OutputJax_js_1.AbstractOutputJax.OPTIONS), { scale: 1, minScale: .5, mtextInheritFont: false, merrorInheritFont: false, mtextFont: '', merrorFont: 'serif', mathmlSpacing: false, skipAttributes: {}, exFactor: .5, displayAlign: 'center', displayIndent: '0', wrapperFactory: null, font: null, cssStyles: null });
    CommonOutputJax.commonStyles = {};
    return CommonOutputJax;
}(OutputJax_js_1.AbstractOutputJax));
exports.CommonOutputJax = CommonOutputJax;
//# sourceMappingURL=OutputJax.js.map

/***/ }),

/***/ 56757:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonWrapper = void 0;
var Wrapper_js_1 = __webpack_require__(96301);
var MmlNode_js_1 = __webpack_require__(18426);
var string_js_1 = __webpack_require__(33353);
var LENGTHS = __importStar(__webpack_require__(77130));
var Styles_js_1 = __webpack_require__(30502);
var BBox_js_1 = __webpack_require__(83292);
var FontData_js_1 = __webpack_require__(88284);
var SMALLSIZE = 2 / 18;
function MathMLSpace(script, size) {
    return (script ? size < SMALLSIZE ? 0 : SMALLSIZE : size);
}
var CommonWrapper = (function (_super) {
    __extends(CommonWrapper, _super);
    function CommonWrapper(factory, node, parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, factory, node) || this;
        _this.parent = null;
        _this.removedStyles = null;
        _this.styles = null;
        _this.variant = '';
        _this.bboxComputed = false;
        _this.stretch = FontData_js_1.NOSTRETCH;
        _this.font = null;
        _this.parent = parent;
        _this.font = factory.jax.font;
        _this.bbox = BBox_js_1.BBox.zero();
        _this.getStyles();
        _this.getVariant();
        _this.getScale();
        _this.getSpace();
        _this.childNodes = node.childNodes.map(function (child) {
            var wrapped = _this.wrap(child);
            if (wrapped.bbox.pwidth && (node.notParent || node.isKind('math'))) {
                _this.bbox.pwidth = BBox_js_1.BBox.fullWidth;
            }
            return wrapped;
        });
        return _this;
    }
    Object.defineProperty(CommonWrapper.prototype, "jax", {
        get: function () {
            return this.factory.jax;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonWrapper.prototype, "adaptor", {
        get: function () {
            return this.factory.jax.adaptor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonWrapper.prototype, "metrics", {
        get: function () {
            return this.factory.jax.math.metrics;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommonWrapper.prototype, "fixesPWidth", {
        get: function () {
            return !this.node.notParent && !this.node.isToken;
        },
        enumerable: false,
        configurable: true
    });
    CommonWrapper.prototype.wrap = function (node, parent) {
        if (parent === void 0) { parent = null; }
        var wrapped = this.factory.wrap(node, parent || this);
        if (parent) {
            parent.childNodes.push(wrapped);
        }
        this.jax.nodeMap.set(node, wrapped);
        return wrapped;
    };
    CommonWrapper.prototype.getBBox = function (save) {
        if (save === void 0) { save = true; }
        if (this.bboxComputed) {
            return this.bbox;
        }
        var bbox = (save ? this.bbox : BBox_js_1.BBox.zero());
        this.computeBBox(bbox);
        this.bboxComputed = save;
        return bbox;
    };
    CommonWrapper.prototype.getOuterBBox = function (save) {
        var e_1, _a;
        if (save === void 0) { save = true; }
        var bbox = this.getBBox(save);
        if (!this.styles)
            return bbox;
        var obox = new BBox_js_1.BBox();
        Object.assign(obox, bbox);
        try {
            for (var _b = __values(BBox_js_1.BBox.StyleAdjust), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), name_1 = _d[0], side = _d[1];
                var x = this.styles.get(name_1);
                if (x) {
                    obox[side] += this.length2em(x, 1, obox.rscale);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return obox;
    };
    CommonWrapper.prototype.computeBBox = function (bbox, recompute) {
        var e_2, _a;
        if (recompute === void 0) { recompute = false; }
        bbox.empty();
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                bbox.append(child.getOuterBBox());
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        bbox.clean();
        if (this.fixesPWidth && this.setChildPWidths(recompute)) {
            this.computeBBox(bbox, true);
        }
    };
    CommonWrapper.prototype.setChildPWidths = function (recompute, w, clear) {
        var e_3, _a;
        if (w === void 0) { w = null; }
        if (clear === void 0) { clear = true; }
        if (recompute) {
            return false;
        }
        if (clear) {
            this.bbox.pwidth = '';
        }
        var changed = false;
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                var cbox = child.getOuterBBox();
                if (cbox.pwidth && child.setChildPWidths(recompute, w === null ? cbox.w : w, clear)) {
                    changed = true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return changed;
    };
    CommonWrapper.prototype.invalidateBBox = function () {
        if (this.bboxComputed) {
            this.bboxComputed = false;
            if (this.parent) {
                this.parent.invalidateBBox();
            }
        }
    };
    CommonWrapper.prototype.copySkewIC = function (bbox) {
        var first = this.childNodes[0];
        if (first === null || first === void 0 ? void 0 : first.bbox.sk) {
            bbox.sk = first.bbox.sk;
        }
        if (first === null || first === void 0 ? void 0 : first.bbox.dx) {
            bbox.dx = first.bbox.dx;
        }
        var last = this.childNodes[this.childNodes.length - 1];
        if (last === null || last === void 0 ? void 0 : last.bbox.ic) {
            bbox.ic = last.bbox.ic;
            bbox.w += bbox.ic;
        }
    };
    CommonWrapper.prototype.getStyles = function () {
        var styleString = this.node.attributes.getExplicit('style');
        if (!styleString)
            return;
        var style = this.styles = new Styles_js_1.Styles(styleString);
        for (var i = 0, m = CommonWrapper.removeStyles.length; i < m; i++) {
            var id = CommonWrapper.removeStyles[i];
            if (style.get(id)) {
                if (!this.removedStyles)
                    this.removedStyles = {};
                this.removedStyles[id] = style.get(id);
                style.set(id, '');
            }
        }
    };
    CommonWrapper.prototype.getVariant = function () {
        if (!this.node.isToken)
            return;
        var attributes = this.node.attributes;
        var variant = attributes.get('mathvariant');
        if (!attributes.getExplicit('mathvariant')) {
            var values = attributes.getList('fontfamily', 'fontweight', 'fontstyle');
            if (this.removedStyles) {
                var style = this.removedStyles;
                if (style.fontFamily)
                    values.family = style.fontFamily;
                if (style.fontWeight)
                    values.weight = style.fontWeight;
                if (style.fontStyle)
                    values.style = style.fontStyle;
            }
            if (values.fontfamily)
                values.family = values.fontfamily;
            if (values.fontweight)
                values.weight = values.fontweight;
            if (values.fontstyle)
                values.style = values.fontstyle;
            if (values.weight && values.weight.match(/^\d+$/)) {
                values.weight = (parseInt(values.weight) > 600 ? 'bold' : 'normal');
            }
            if (values.family) {
                variant = this.explicitVariant(values.family, values.weight, values.style);
            }
            else {
                if (this.node.getProperty('variantForm'))
                    variant = '-tex-variant';
                variant = (CommonWrapper.BOLDVARIANTS[values.weight] || {})[variant] || variant;
                variant = (CommonWrapper.ITALICVARIANTS[values.style] || {})[variant] || variant;
            }
        }
        this.variant = variant;
    };
    CommonWrapper.prototype.explicitVariant = function (fontFamily, fontWeight, fontStyle) {
        var style = this.styles;
        if (!style)
            style = this.styles = new Styles_js_1.Styles();
        style.set('fontFamily', fontFamily);
        if (fontWeight)
            style.set('fontWeight', fontWeight);
        if (fontStyle)
            style.set('fontStyle', fontStyle);
        return '-explicitFont';
    };
    CommonWrapper.prototype.getScale = function () {
        var scale = 1, parent = this.parent;
        var pscale = (parent ? parent.bbox.scale : 1);
        var attributes = this.node.attributes;
        var scriptlevel = Math.min(attributes.get('scriptlevel'), 2);
        var fontsize = attributes.get('fontsize');
        var mathsize = (this.node.isToken || this.node.isKind('mstyle') ?
            attributes.get('mathsize') : attributes.getInherited('mathsize'));
        if (scriptlevel !== 0) {
            scale = Math.pow(attributes.get('scriptsizemultiplier'), scriptlevel);
            var scriptminsize = this.length2em(attributes.get('scriptminsize'), .8, 1);
            if (scale < scriptminsize)
                scale = scriptminsize;
        }
        if (this.removedStyles && this.removedStyles.fontSize && !fontsize) {
            fontsize = this.removedStyles.fontSize;
        }
        if (fontsize && !attributes.getExplicit('mathsize')) {
            mathsize = fontsize;
        }
        if (mathsize !== '1') {
            scale *= this.length2em(mathsize, 1, 1);
        }
        this.bbox.scale = scale;
        this.bbox.rscale = scale / pscale;
    };
    CommonWrapper.prototype.getSpace = function () {
        var isTop = this.isTopEmbellished();
        var hasSpacing = this.node.hasSpacingAttributes();
        if (this.jax.options.mathmlSpacing || hasSpacing) {
            isTop && this.getMathMLSpacing();
        }
        else {
            this.getTeXSpacing(isTop, hasSpacing);
        }
    };
    CommonWrapper.prototype.getMathMLSpacing = function () {
        var node = this.node.coreMO();
        var child = node.coreParent();
        var parent = child.parent;
        if (!parent || !parent.isKind('mrow') || parent.childNodes.length === 1)
            return;
        var attributes = node.attributes;
        var isScript = (attributes.get('scriptlevel') > 0);
        this.bbox.L = (attributes.isSet('lspace') ?
            Math.max(0, this.length2em(attributes.get('lspace'))) :
            MathMLSpace(isScript, node.lspace));
        this.bbox.R = (attributes.isSet('rspace') ?
            Math.max(0, this.length2em(attributes.get('rspace'))) :
            MathMLSpace(isScript, node.rspace));
        var n = parent.childIndex(child);
        if (n === 0)
            return;
        var prev = parent.childNodes[n - 1];
        if (!prev.isEmbellished)
            return;
        var bbox = this.jax.nodeMap.get(prev).getBBox();
        if (bbox.R) {
            this.bbox.L = Math.max(0, this.bbox.L - bbox.R);
        }
    };
    CommonWrapper.prototype.getTeXSpacing = function (isTop, hasSpacing) {
        if (!hasSpacing) {
            var space = this.node.texSpacing();
            if (space) {
                this.bbox.L = this.length2em(space);
            }
        }
        if (isTop || hasSpacing) {
            var attributes = this.node.coreMO().attributes;
            if (attributes.isSet('lspace')) {
                this.bbox.L = Math.max(0, this.length2em(attributes.get('lspace')));
            }
            if (attributes.isSet('rspace')) {
                this.bbox.R = Math.max(0, this.length2em(attributes.get('rspace')));
            }
        }
    };
    CommonWrapper.prototype.isTopEmbellished = function () {
        return (this.node.isEmbellished &&
            !(this.node.parent && this.node.parent.isEmbellished));
    };
    CommonWrapper.prototype.core = function () {
        return this.jax.nodeMap.get(this.node.core());
    };
    CommonWrapper.prototype.coreMO = function () {
        return this.jax.nodeMap.get(this.node.coreMO());
    };
    CommonWrapper.prototype.getText = function () {
        var e_4, _a;
        var text = '';
        if (this.node.isToken) {
            try {
                for (var _b = __values(this.node.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    if (child instanceof MmlNode_js_1.TextNode) {
                        text += child.getText();
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return text;
    };
    CommonWrapper.prototype.canStretch = function (direction) {
        this.stretch = FontData_js_1.NOSTRETCH;
        if (this.node.isEmbellished) {
            var core = this.core();
            if (core && core.node !== this.node) {
                if (core.canStretch(direction)) {
                    this.stretch = core.stretch;
                }
            }
        }
        return this.stretch.dir !== 0;
    };
    CommonWrapper.prototype.getAlignShift = function () {
        var _a;
        var _b = (_a = this.node.attributes).getList.apply(_a, __spreadArray([], __read(MmlNode_js_1.indentAttributes), false)), indentalign = _b.indentalign, indentshift = _b.indentshift, indentalignfirst = _b.indentalignfirst, indentshiftfirst = _b.indentshiftfirst;
        if (indentalignfirst !== 'indentalign') {
            indentalign = indentalignfirst;
        }
        if (indentalign === 'auto') {
            indentalign = this.jax.options.displayAlign;
        }
        if (indentshiftfirst !== 'indentshift') {
            indentshift = indentshiftfirst;
        }
        if (indentshift === 'auto') {
            indentshift = this.jax.options.displayIndent;
            if (indentalign === 'right' && !indentshift.match(/^\s*0[a-z]*\s*$/)) {
                indentshift = ('-' + indentshift.trim()).replace(/^--/, '');
            }
        }
        var shift = this.length2em(indentshift, this.metrics.containerWidth);
        return [indentalign, shift];
    };
    CommonWrapper.prototype.getAlignX = function (W, bbox, align) {
        return (align === 'right' ? W - (bbox.w + bbox.R) * bbox.rscale :
            align === 'left' ? bbox.L * bbox.rscale :
                (W - bbox.w * bbox.rscale) / 2);
    };
    CommonWrapper.prototype.getAlignY = function (H, D, h, d, align) {
        return (align === 'top' ? H - h :
            align === 'bottom' ? d - D :
                align === 'center' ? ((H - h) - (D - d)) / 2 :
                    0);
    };
    CommonWrapper.prototype.getWrapWidth = function (i) {
        return this.childNodes[i].getBBox().w;
    };
    CommonWrapper.prototype.getChildAlign = function (_i) {
        return 'left';
    };
    CommonWrapper.prototype.percent = function (m) {
        return LENGTHS.percent(m);
    };
    CommonWrapper.prototype.em = function (m) {
        return LENGTHS.em(m);
    };
    CommonWrapper.prototype.px = function (m, M) {
        if (M === void 0) { M = -LENGTHS.BIGDIMEN; }
        return LENGTHS.px(m, M, this.metrics.em);
    };
    CommonWrapper.prototype.length2em = function (length, size, scale) {
        if (size === void 0) { size = 1; }
        if (scale === void 0) { scale = null; }
        if (scale === null) {
            scale = this.bbox.scale;
        }
        return LENGTHS.length2em(length, size, scale, this.jax.pxPerEm);
    };
    CommonWrapper.prototype.unicodeChars = function (text, name) {
        if (name === void 0) { name = this.variant; }
        var chars = (0, string_js_1.unicodeChars)(text);
        var variant = this.font.getVariant(name);
        if (variant && variant.chars) {
            var map_1 = variant.chars;
            chars = chars.map(function (n) { return ((map_1[n] || [])[3] || {}).smp || n; });
        }
        return chars;
    };
    CommonWrapper.prototype.remapChars = function (chars) {
        return chars;
    };
    CommonWrapper.prototype.mmlText = function (text) {
        return this.node.factory.create('text').setText(text);
    };
    CommonWrapper.prototype.mmlNode = function (kind, properties, children) {
        if (properties === void 0) { properties = {}; }
        if (children === void 0) { children = []; }
        return this.node.factory.create(kind, properties, children);
    };
    CommonWrapper.prototype.createMo = function (text) {
        var mmlFactory = this.node.factory;
        var textNode = mmlFactory.create('text').setText(text);
        var mml = mmlFactory.create('mo', { stretchy: true }, [textNode]);
        mml.inheritAttributesFrom(this.node);
        var node = this.wrap(mml);
        node.parent = this;
        return node;
    };
    CommonWrapper.prototype.getVariantChar = function (variant, n) {
        var char = this.font.getChar(variant, n) || [0, 0, 0, { unknown: true }];
        if (char.length === 3) {
            char[3] = {};
        }
        return char;
    };
    CommonWrapper.kind = 'unknown';
    CommonWrapper.styles = {};
    CommonWrapper.removeStyles = [
        'fontSize', 'fontFamily', 'fontWeight',
        'fontStyle', 'fontVariant', 'font'
    ];
    CommonWrapper.skipAttributes = {
        fontfamily: true, fontsize: true, fontweight: true, fontstyle: true,
        color: true, background: true,
        'class': true, href: true, style: true,
        xmlns: true
    };
    CommonWrapper.BOLDVARIANTS = {
        bold: {
            normal: 'bold',
            italic: 'bold-italic',
            fraktur: 'bold-fraktur',
            script: 'bold-script',
            'sans-serif': 'bold-sans-serif',
            'sans-serif-italic': 'sans-serif-bold-italic'
        },
        normal: {
            bold: 'normal',
            'bold-italic': 'italic',
            'bold-fraktur': 'fraktur',
            'bold-script': 'script',
            'bold-sans-serif': 'sans-serif',
            'sans-serif-bold-italic': 'sans-serif-italic'
        }
    };
    CommonWrapper.ITALICVARIANTS = {
        italic: {
            normal: 'italic',
            bold: 'bold-italic',
            'sans-serif': 'sans-serif-italic',
            'bold-sans-serif': 'sans-serif-bold-italic'
        },
        normal: {
            italic: 'normal',
            'bold-italic': 'bold',
            'sans-serif-italic': 'sans-serif',
            'sans-serif-bold-italic': 'bold-sans-serif'
        }
    };
    return CommonWrapper;
}(Wrapper_js_1.AbstractWrapper));
exports.CommonWrapper = CommonWrapper;
//# sourceMappingURL=Wrapper.js.map

/***/ }),

/***/ 49557:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonWrapperFactory = void 0;
var WrapperFactory_js_1 = __webpack_require__(56586);
var CommonWrapperFactory = (function (_super) {
    __extends(CommonWrapperFactory, _super);
    function CommonWrapperFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jax = null;
        return _this;
    }
    Object.defineProperty(CommonWrapperFactory.prototype, "Wrappers", {
        get: function () {
            return this.node;
        },
        enumerable: false,
        configurable: true
    });
    CommonWrapperFactory.defaultNodes = {};
    return CommonWrapperFactory;
}(WrapperFactory_js_1.AbstractWrapperFactory));
exports.CommonWrapperFactory = CommonWrapperFactory;
//# sourceMappingURL=WrapperFactory.js.map

/***/ }),

/***/ 28324:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonTeXAtomMixin = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
function CommonTeXAtomMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.computeBBox = function (bbox, recompute) {
            if (recompute === void 0) { recompute = false; }
            _super.prototype.computeBBox.call(this, bbox, recompute);
            if (this.childNodes[0] && this.childNodes[0].bbox.ic) {
                bbox.ic = this.childNodes[0].bbox.ic;
            }
            if (this.node.texClass === MmlNode_js_1.TEXCLASS.VCENTER) {
                var h = bbox.h, d = bbox.d;
                var a = this.font.params.axis_height;
                var dh = ((h + d) / 2 + a) - h;
                bbox.h += dh;
                bbox.d -= dh;
            }
        };
        return class_1;
    }(Base));
}
exports.CommonTeXAtomMixin = CommonTeXAtomMixin;
//# sourceMappingURL=TeXAtom.js.map

/***/ }),

/***/ 2169:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonTextNodeMixin = void 0;
function CommonTextNodeMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.computeBBox = function (bbox, _recompute) {
            var e_1, _a;
            if (_recompute === void 0) { _recompute = false; }
            var variant = this.parent.variant;
            var text = this.node.getText();
            if (variant === '-explicitFont') {
                var font = this.jax.getFontData(this.parent.styles);
                var _b = this.jax.measureText(text, variant, font), w = _b.w, h = _b.h, d = _b.d;
                bbox.h = h;
                bbox.d = d;
                bbox.w = w;
            }
            else {
                var chars = this.remappedText(text, variant);
                bbox.empty();
                try {
                    for (var chars_1 = __values(chars), chars_1_1 = chars_1.next(); !chars_1_1.done; chars_1_1 = chars_1.next()) {
                        var char = chars_1_1.value;
                        var _c = __read(this.getVariantChar(variant, char), 4), h = _c[0], d = _c[1], w = _c[2], data = _c[3];
                        if (data.unknown) {
                            var cbox = this.jax.measureText(String.fromCodePoint(char), variant);
                            w = cbox.w;
                            h = cbox.h;
                            d = cbox.d;
                        }
                        bbox.w += w;
                        if (h > bbox.h)
                            bbox.h = h;
                        if (d > bbox.d)
                            bbox.d = d;
                        bbox.ic = data.ic || 0;
                        bbox.sk = data.sk || 0;
                        bbox.dx = data.dx || 0;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (chars_1_1 && !chars_1_1.done && (_a = chars_1.return)) _a.call(chars_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (chars.length > 1) {
                    bbox.sk = 0;
                }
                bbox.clean();
            }
        };
        class_1.prototype.remappedText = function (text, variant) {
            var c = this.parent.stretch.c;
            return (c ? [c] : this.parent.remapChars(this.unicodeChars(text, variant)));
        };
        class_1.prototype.getStyles = function () { };
        class_1.prototype.getVariant = function () { };
        class_1.prototype.getScale = function () { };
        class_1.prototype.getSpace = function () { };
        return class_1;
    }(Base));
}
exports.CommonTextNodeMixin = CommonTextNodeMixin;
//# sourceMappingURL=TextNode.js.map

/***/ }),

/***/ 86561:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMactionMixin = exports.TooltipData = void 0;
var string_js_1 = __webpack_require__(33353);
exports.TooltipData = {
    dx: '.2em',
    dy: '.1em',
    postDelay: 600,
    clearDelay: 100,
    hoverTimer: new Map(),
    clearTimer: new Map(),
    stopTimers: function (node, data) {
        if (data.clearTimer.has(node)) {
            clearTimeout(data.clearTimer.get(node));
            data.clearTimer.delete(node);
        }
        if (data.hoverTimer.has(node)) {
            clearTimeout(data.hoverTimer.get(node));
            data.hoverTimer.delete(node);
        }
    }
};
function CommonMactionMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            var actions = _this.constructor.actions;
            var action = _this.node.attributes.get('actiontype');
            var _a = __read(actions.get(action) || [(function (_node, _data) { }), {}], 2), handler = _a[0], data = _a[1];
            _this.action = handler;
            _this.data = data;
            _this.getParameters();
            return _this;
        }
        Object.defineProperty(class_1.prototype, "selected", {
            get: function () {
                var selection = this.node.attributes.get('selection');
                var i = Math.max(1, Math.min(this.childNodes.length, selection)) - 1;
                return this.childNodes[i] || this.wrap(this.node.selected);
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.getParameters = function () {
            var offsets = this.node.attributes.get('data-offsets');
            var _a = __read((0, string_js_1.split)(offsets || ''), 2), dx = _a[0], dy = _a[1];
            this.dx = this.length2em(dx || exports.TooltipData.dx);
            this.dy = this.length2em(dy || exports.TooltipData.dy);
        };
        class_1.prototype.computeBBox = function (bbox, recompute) {
            if (recompute === void 0) { recompute = false; }
            bbox.updateFrom(this.selected.getOuterBBox());
            this.selected.setChildPWidths(recompute);
        };
        return class_1;
    }(Base));
}
exports.CommonMactionMixin = CommonMactionMixin;
//# sourceMappingURL=maction.js.map

/***/ }),

/***/ 68467:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMathMixin = void 0;
function CommonMathMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getWrapWidth = function (_i) {
            return (this.parent ? this.getBBox().w : this.metrics.containerWidth / this.jax.pxPerEm);
        };
        return class_1;
    }(Base));
}
exports.CommonMathMixin = CommonMathMixin;
//# sourceMappingURL=math.js.map

/***/ }),

/***/ 32306:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMencloseMixin = void 0;
var Notation = __importStar(__webpack_require__(77988));
var string_js_1 = __webpack_require__(33353);
function CommonMencloseMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.notations = {};
            _this.renderChild = null;
            _this.msqrt = null;
            _this.padding = Notation.PADDING;
            _this.thickness = Notation.THICKNESS;
            _this.arrowhead = { x: Notation.ARROWX, y: Notation.ARROWY, dx: Notation.ARROWDX };
            _this.TRBL = [0, 0, 0, 0];
            _this.getParameters();
            _this.getNotations();
            _this.removeRedundantNotations();
            _this.initializeNotations();
            _this.TRBL = _this.getBBoxExtenders();
            return _this;
        }
        class_1.prototype.getParameters = function () {
            var attributes = this.node.attributes;
            var padding = attributes.get('data-padding');
            if (padding !== undefined) {
                this.padding = this.length2em(padding, Notation.PADDING);
            }
            var thickness = attributes.get('data-thickness');
            if (thickness !== undefined) {
                this.thickness = this.length2em(thickness, Notation.THICKNESS);
            }
            var arrowhead = attributes.get('data-arrowhead');
            if (arrowhead !== undefined) {
                var _b = __read((0, string_js_1.split)(arrowhead), 3), x = _b[0], y = _b[1], dx = _b[2];
                this.arrowhead = {
                    x: (x ? parseFloat(x) : Notation.ARROWX),
                    y: (y ? parseFloat(y) : Notation.ARROWY),
                    dx: (dx ? parseFloat(dx) : Notation.ARROWDX)
                };
            }
        };
        class_1.prototype.getNotations = function () {
            var e_1, _b;
            var Notations = this.constructor.notations;
            try {
                for (var _c = __values((0, string_js_1.split)(this.node.attributes.get('notation'))), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var name_1 = _d.value;
                    var notation = Notations.get(name_1);
                    if (notation) {
                        this.notations[name_1] = notation;
                        if (notation.renderChild) {
                            this.renderChild = notation.renderer;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        class_1.prototype.removeRedundantNotations = function () {
            var e_2, _b, e_3, _c;
            try {
                for (var _d = __values(Object.keys(this.notations)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var name_2 = _e.value;
                    if (this.notations[name_2]) {
                        var remove = this.notations[name_2].remove || '';
                        try {
                            for (var _f = (e_3 = void 0, __values(remove.split(/ /))), _g = _f.next(); !_g.done; _g = _f.next()) {
                                var notation = _g.value;
                                delete this.notations[notation];
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        class_1.prototype.initializeNotations = function () {
            var e_4, _b;
            try {
                for (var _c = __values(Object.keys(this.notations)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var name_3 = _d.value;
                    var init = this.notations[name_3].init;
                    init && init(this);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        class_1.prototype.computeBBox = function (bbox, recompute) {
            if (recompute === void 0) { recompute = false; }
            var _b = __read(this.TRBL, 4), T = _b[0], R = _b[1], B = _b[2], L = _b[3];
            var child = this.childNodes[0].getBBox();
            bbox.combine(child, L, 0);
            bbox.h += T;
            bbox.d += B;
            bbox.w += R;
            this.setChildPWidths(recompute);
        };
        class_1.prototype.getBBoxExtenders = function () {
            var e_5, _b;
            var TRBL = [0, 0, 0, 0];
            try {
                for (var _c = __values(Object.keys(this.notations)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var name_4 = _d.value;
                    this.maximizeEntries(TRBL, this.notations[name_4].bbox(this));
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return TRBL;
        };
        class_1.prototype.getPadding = function () {
            var e_6, _b;
            var _this = this;
            var BTRBL = [0, 0, 0, 0];
            try {
                for (var _c = __values(Object.keys(this.notations)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var name_5 = _d.value;
                    var border = this.notations[name_5].border;
                    if (border) {
                        this.maximizeEntries(BTRBL, border(this));
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return [0, 1, 2, 3].map(function (i) { return _this.TRBL[i] - BTRBL[i]; });
        };
        class_1.prototype.maximizeEntries = function (X, Y) {
            for (var i = 0; i < X.length; i++) {
                if (X[i] < Y[i]) {
                    X[i] = Y[i];
                }
            }
        };
        class_1.prototype.getOffset = function (direction) {
            var _b = __read(this.TRBL, 4), T = _b[0], R = _b[1], B = _b[2], L = _b[3];
            var d = (direction === 'X' ? R - L : B - T) / 2;
            return (Math.abs(d) > .001 ? d : 0);
        };
        class_1.prototype.getArgMod = function (w, h) {
            return [Math.atan2(h, w), Math.sqrt(w * w + h * h)];
        };
        class_1.prototype.arrow = function (_w, _a, _double, _offset, _dist) {
            if (_offset === void 0) { _offset = ''; }
            if (_dist === void 0) { _dist = 0; }
            return null;
        };
        class_1.prototype.arrowData = function () {
            var _b = __read([this.padding, this.thickness], 2), p = _b[0], t = _b[1];
            var r = t * (this.arrowhead.x + Math.max(1, this.arrowhead.dx));
            var _c = this.childNodes[0].getBBox(), h = _c.h, d = _c.d, w = _c.w;
            var H = h + d;
            var R = Math.sqrt(H * H + w * w);
            var x = Math.max(p, r * w / R);
            var y = Math.max(p, r * H / R);
            var _d = __read(this.getArgMod(w + 2 * x, H + 2 * y), 2), a = _d[0], W = _d[1];
            return { a: a, W: W, x: x, y: y };
        };
        class_1.prototype.arrowAW = function () {
            var _b = this.childNodes[0].getBBox(), h = _b.h, d = _b.d, w = _b.w;
            var _c = __read(this.TRBL, 4), T = _c[0], R = _c[1], B = _c[2], L = _c[3];
            return this.getArgMod(L + w + R, T + h + d + B);
        };
        class_1.prototype.createMsqrt = function (child) {
            var mmlFactory = this.node.factory;
            var mml = mmlFactory.create('msqrt');
            mml.inheritAttributesFrom(this.node);
            mml.childNodes[0] = child.node;
            var node = this.wrap(mml);
            node.parent = this;
            return node;
        };
        class_1.prototype.sqrtTRBL = function () {
            var bbox = this.msqrt.getBBox();
            var cbox = this.msqrt.childNodes[0].getBBox();
            return [bbox.h - cbox.h, 0, bbox.d - cbox.d, bbox.w - cbox.w];
        };
        return class_1;
    }(Base));
}
exports.CommonMencloseMixin = CommonMencloseMixin;
//# sourceMappingURL=menclose.js.map

/***/ }),

/***/ 5043:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMfencedMixin = void 0;
function CommonMfencedMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.mrow = null;
            _this.createMrow();
            _this.addMrowChildren();
            return _this;
        }
        class_1.prototype.createMrow = function () {
            var mmlFactory = this.node.factory;
            var mrow = mmlFactory.create('inferredMrow');
            mrow.inheritAttributesFrom(this.node);
            this.mrow = this.wrap(mrow);
            this.mrow.parent = this;
        };
        class_1.prototype.addMrowChildren = function () {
            var e_1, _a;
            var mfenced = this.node;
            var mrow = this.mrow;
            this.addMo(mfenced.open);
            if (this.childNodes.length) {
                mrow.childNodes.push(this.childNodes[0]);
            }
            var i = 0;
            try {
                for (var _b = __values(this.childNodes.slice(1)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    this.addMo(mfenced.separators[i++]);
                    mrow.childNodes.push(child);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.addMo(mfenced.close);
            mrow.stretchChildren();
        };
        class_1.prototype.addMo = function (node) {
            if (!node)
                return;
            var mo = this.wrap(node);
            this.mrow.childNodes.push(mo);
            mo.parent = this.mrow;
        };
        class_1.prototype.computeBBox = function (bbox, recompute) {
            if (recompute === void 0) { recompute = false; }
            bbox.updateFrom(this.mrow.getOuterBBox());
            this.setChildPWidths(recompute);
        };
        return class_1;
    }(Base));
}
exports.CommonMfencedMixin = CommonMfencedMixin;
//# sourceMappingURL=mfenced.js.map

/***/ }),

/***/ 30811:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMfracMixin = void 0;
function CommonMfracMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.bevel = null;
            _this.pad = (_this.node.getProperty('withDelims') ? 0 : _this.font.params.nulldelimiterspace);
            if (_this.node.attributes.get('bevelled')) {
                var H = _this.getBevelData(_this.isDisplay()).H;
                var bevel = _this.bevel = _this.createMo('/');
                bevel.node.attributes.set('symmetric', true);
                bevel.canStretch(1);
                bevel.getStretchedVariant([H], true);
            }
            return _this;
        }
        class_1.prototype.computeBBox = function (bbox, recompute) {
            if (recompute === void 0) { recompute = false; }
            bbox.empty();
            var _a = this.node.attributes.getList('linethickness', 'bevelled'), linethickness = _a.linethickness, bevelled = _a.bevelled;
            var display = this.isDisplay();
            var w = null;
            if (bevelled) {
                this.getBevelledBBox(bbox, display);
            }
            else {
                var thickness = this.length2em(String(linethickness), .06);
                w = -2 * this.pad;
                if (thickness === 0) {
                    this.getAtopBBox(bbox, display);
                }
                else {
                    this.getFractionBBox(bbox, display, thickness);
                    w -= .2;
                }
                w += bbox.w;
            }
            bbox.clean();
            this.setChildPWidths(recompute, w);
        };
        class_1.prototype.getFractionBBox = function (bbox, display, t) {
            var nbox = this.childNodes[0].getOuterBBox();
            var dbox = this.childNodes[1].getOuterBBox();
            var tex = this.font.params;
            var a = tex.axis_height;
            var _a = this.getTUV(display, t), T = _a.T, u = _a.u, v = _a.v;
            bbox.combine(nbox, 0, a + T + Math.max(nbox.d * nbox.rscale, u));
            bbox.combine(dbox, 0, a - T - Math.max(dbox.h * dbox.rscale, v));
            bbox.w += 2 * this.pad + .2;
        };
        class_1.prototype.getTUV = function (display, t) {
            var tex = this.font.params;
            var a = tex.axis_height;
            var T = (display ? 3.5 : 1.5) * t;
            return { T: (display ? 3.5 : 1.5) * t,
                u: (display ? tex.num1 : tex.num2) - a - T,
                v: (display ? tex.denom1 : tex.denom2) + a - T };
        };
        class_1.prototype.getAtopBBox = function (bbox, display) {
            var _a = this.getUVQ(display), u = _a.u, v = _a.v, nbox = _a.nbox, dbox = _a.dbox;
            bbox.combine(nbox, 0, u);
            bbox.combine(dbox, 0, -v);
            bbox.w += 2 * this.pad;
        };
        class_1.prototype.getUVQ = function (display) {
            var nbox = this.childNodes[0].getOuterBBox();
            var dbox = this.childNodes[1].getOuterBBox();
            var tex = this.font.params;
            var _a = __read((display ? [tex.num1, tex.denom1] : [tex.num3, tex.denom2]), 2), u = _a[0], v = _a[1];
            var p = (display ? 7 : 3) * tex.rule_thickness;
            var q = (u - nbox.d * nbox.scale) - (dbox.h * dbox.scale - v);
            if (q < p) {
                u += (p - q) / 2;
                v += (p - q) / 2;
                q = p;
            }
            return { u: u, v: v, q: q, nbox: nbox, dbox: dbox };
        };
        class_1.prototype.getBevelledBBox = function (bbox, display) {
            var _a = this.getBevelData(display), u = _a.u, v = _a.v, delta = _a.delta, nbox = _a.nbox, dbox = _a.dbox;
            var lbox = this.bevel.getOuterBBox();
            bbox.combine(nbox, 0, u);
            bbox.combine(lbox, bbox.w - delta / 2, 0);
            bbox.combine(dbox, bbox.w - delta / 2, v);
        };
        class_1.prototype.getBevelData = function (display) {
            var nbox = this.childNodes[0].getOuterBBox();
            var dbox = this.childNodes[1].getOuterBBox();
            var delta = (display ? .4 : .15);
            var H = Math.max(nbox.scale * (nbox.h + nbox.d), dbox.scale * (dbox.h + dbox.d)) + 2 * delta;
            var a = this.font.params.axis_height;
            var u = nbox.scale * (nbox.d - nbox.h) / 2 + a + delta;
            var v = dbox.scale * (dbox.d - dbox.h) / 2 + a - delta;
            return { H: H, delta: delta, u: u, v: v, nbox: nbox, dbox: dbox };
        };
        class_1.prototype.canStretch = function (_direction) {
            return false;
        };
        class_1.prototype.isDisplay = function () {
            var _a = this.node.attributes.getList('displaystyle', 'scriptlevel'), displaystyle = _a.displaystyle, scriptlevel = _a.scriptlevel;
            return displaystyle && scriptlevel === 0;
        };
        class_1.prototype.getWrapWidth = function (i) {
            var attributes = this.node.attributes;
            if (attributes.get('bevelled')) {
                return this.childNodes[i].getOuterBBox().w;
            }
            var w = this.getBBox().w;
            var thickness = this.length2em(attributes.get('linethickness'));
            return w - (thickness ? .2 : 0) - 2 * this.pad;
        };
        class_1.prototype.getChildAlign = function (i) {
            var attributes = this.node.attributes;
            return (attributes.get('bevelled') ? 'left' : attributes.get(['numalign', 'denomalign'][i]));
        };
        return class_1;
    }(Base));
}
exports.CommonMfracMixin = CommonMfracMixin;
//# sourceMappingURL=mfrac.js.map

/***/ }),

/***/ 981:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMglyphMixin = void 0;
function CommonMglyphMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.getParameters();
            return _this;
        }
        class_1.prototype.getParameters = function () {
            var _a = this.node.attributes.getList('width', 'height', 'valign', 'src', 'index'), width = _a.width, height = _a.height, valign = _a.valign, src = _a.src, index = _a.index;
            if (src) {
                this.width = (width === 'auto' ? 1 : this.length2em(width));
                this.height = (height === 'auto' ? 1 : this.length2em(height));
                this.valign = this.length2em(valign || '0');
            }
            else {
                var text = String.fromCodePoint(parseInt(index));
                var mmlFactory = this.node.factory;
                this.charWrapper = this.wrap(mmlFactory.create('text').setText(text));
                this.charWrapper.parent = this;
            }
        };
        class_1.prototype.computeBBox = function (bbox, _recompute) {
            if (_recompute === void 0) { _recompute = false; }
            if (this.charWrapper) {
                bbox.updateFrom(this.charWrapper.getBBox());
            }
            else {
                bbox.w = this.width;
                bbox.h = this.height + this.valign;
                bbox.d = -this.valign;
            }
        };
        return class_1;
    }(Base));
}
exports.CommonMglyphMixin = CommonMglyphMixin;
//# sourceMappingURL=mglyph.js.map

/***/ }),

/***/ 98296:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMiMixin = void 0;
function CommonMiMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.computeBBox = function (bbox, _recompute) {
            if (_recompute === void 0) { _recompute = false; }
            _super.prototype.computeBBox.call(this, bbox);
            this.copySkewIC(bbox);
        };
        return class_1;
    }(Base));
}
exports.CommonMiMixin = CommonMiMixin;
//# sourceMappingURL=mi.js.map

/***/ }),

/***/ 86720:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMmultiscriptsMixin = exports.ScriptNames = exports.NextScript = void 0;
var BBox_js_1 = __webpack_require__(83292);
exports.NextScript = {
    base: 'subList',
    subList: 'supList',
    supList: 'subList',
    psubList: 'psupList',
    psupList: 'psubList',
};
exports.ScriptNames = ['sup', 'sup', 'psup', 'psub'];
function CommonMmultiscriptsMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.scriptData = null;
            _this.firstPrescript = 0;
            _this.getScriptData();
            return _this;
        }
        class_1.prototype.combinePrePost = function (pre, post) {
            var bbox = new BBox_js_1.BBox(pre);
            bbox.combine(post, 0, 0);
            return bbox;
        };
        class_1.prototype.computeBBox = function (bbox, recompute) {
            if (recompute === void 0) { recompute = false; }
            var scriptspace = this.font.params.scriptspace;
            var data = this.scriptData;
            var sub = this.combinePrePost(data.sub, data.psub);
            var sup = this.combinePrePost(data.sup, data.psup);
            var _a = __read(this.getUVQ(sub, sup), 2), u = _a[0], v = _a[1];
            bbox.empty();
            if (data.numPrescripts) {
                bbox.combine(data.psup, scriptspace, u);
                bbox.combine(data.psub, scriptspace, v);
            }
            bbox.append(data.base);
            if (data.numScripts) {
                var w = bbox.w;
                bbox.combine(data.sup, w, u);
                bbox.combine(data.sub, w, v);
                bbox.w += scriptspace;
            }
            bbox.clean();
            this.setChildPWidths(recompute);
        };
        class_1.prototype.getScriptData = function () {
            var data = this.scriptData = {
                base: null, sub: BBox_js_1.BBox.empty(), sup: BBox_js_1.BBox.empty(), psub: BBox_js_1.BBox.empty(), psup: BBox_js_1.BBox.empty(),
                numPrescripts: 0, numScripts: 0
            };
            var lists = this.getScriptBBoxLists();
            this.combineBBoxLists(data.sub, data.sup, lists.subList, lists.supList);
            this.combineBBoxLists(data.psub, data.psup, lists.psubList, lists.psupList);
            data.base = lists.base[0];
            data.numPrescripts = lists.psubList.length;
            data.numScripts = lists.subList.length;
        };
        class_1.prototype.getScriptBBoxLists = function () {
            var e_1, _a;
            var lists = {
                base: [], subList: [], supList: [], psubList: [], psupList: []
            };
            var script = 'base';
            try {
                for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    if (child.node.isKind('mprescripts')) {
                        script = 'psubList';
                    }
                    else {
                        lists[script].push(child.getOuterBBox());
                        script = exports.NextScript[script];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.firstPrescript = lists.subList.length + lists.supList.length + 2;
            this.padLists(lists.subList, lists.supList);
            this.padLists(lists.psubList, lists.psupList);
            return lists;
        };
        class_1.prototype.padLists = function (list1, list2) {
            if (list1.length > list2.length) {
                list2.push(BBox_js_1.BBox.empty());
            }
        };
        class_1.prototype.combineBBoxLists = function (bbox1, bbox2, list1, list2) {
            for (var i = 0; i < list1.length; i++) {
                var _a = __read(this.getScaledWHD(list1[i]), 3), w1 = _a[0], h1 = _a[1], d1 = _a[2];
                var _b = __read(this.getScaledWHD(list2[i]), 3), w2 = _b[0], h2 = _b[1], d2 = _b[2];
                var w = Math.max(w1, w2);
                bbox1.w += w;
                bbox2.w += w;
                if (h1 > bbox1.h)
                    bbox1.h = h1;
                if (d1 > bbox1.d)
                    bbox1.d = d1;
                if (h2 > bbox2.h)
                    bbox2.h = h2;
                if (d2 > bbox2.d)
                    bbox2.d = d2;
            }
        };
        class_1.prototype.getScaledWHD = function (bbox) {
            var w = bbox.w, h = bbox.h, d = bbox.d, rscale = bbox.rscale;
            return [w * rscale, h * rscale, d * rscale];
        };
        class_1.prototype.getUVQ = function (subbox, supbox) {
            var _a;
            if (!this.UVQ) {
                var _b = __read([0, 0, 0], 3), u = _b[0], v = _b[1], q = _b[2];
                if (subbox.h === 0 && subbox.d === 0) {
                    u = this.getU();
                }
                else if (supbox.h === 0 && supbox.d === 0) {
                    u = -this.getV();
                }
                else {
                    _a = __read(_super.prototype.getUVQ.call(this, subbox, supbox), 3), u = _a[0], v = _a[1], q = _a[2];
                }
                this.UVQ = [u, v, q];
            }
            return this.UVQ;
        };
        return class_1;
    }(Base));
}
exports.CommonMmultiscriptsMixin = CommonMmultiscriptsMixin;
//# sourceMappingURL=mmultiscripts.js.map

/***/ }),

/***/ 72309:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMnMixin = void 0;
function CommonMnMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.remapChars = function (chars) {
            if (chars.length) {
                var text = this.font.getRemappedChar('mn', chars[0]);
                if (text) {
                    var c = this.unicodeChars(text, this.variant);
                    if (c.length === 1) {
                        chars[0] = c[0];
                    }
                    else {
                        chars = c.concat(chars.slice(1));
                    }
                }
            }
            return chars;
        };
        return class_1;
    }(Base));
}
exports.CommonMnMixin = CommonMnMixin;
//# sourceMappingURL=mn.js.map

/***/ }),

/***/ 9579:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMoMixin = exports.DirectionVH = void 0;
var BBox_js_1 = __webpack_require__(83292);
var string_js_1 = __webpack_require__(33353);
var FontData_js_1 = __webpack_require__(88284);
exports.DirectionVH = (_a = {},
    _a[1] = 'v',
    _a[2] = 'h',
    _a);
function CommonMoMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.size = null;
            _this.isAccent = _this.node.isAccent;
            return _this;
        }
        class_1.prototype.computeBBox = function (bbox, _recompute) {
            if (_recompute === void 0) { _recompute = false; }
            this.protoBBox(bbox);
            if (this.node.attributes.get('symmetric') &&
                this.stretch.dir !== 2) {
                var d = this.getCenterOffset(bbox);
                bbox.h += d;
                bbox.d -= d;
            }
            if (this.node.getProperty('mathaccent') &&
                (this.stretch.dir === 0 || this.size >= 0)) {
                bbox.w = 0;
            }
        };
        class_1.prototype.protoBBox = function (bbox) {
            var stretchy = (this.stretch.dir !== 0);
            if (stretchy && this.size === null) {
                this.getStretchedVariant([0]);
            }
            if (stretchy && this.size < 0)
                return;
            _super.prototype.computeBBox.call(this, bbox);
            this.copySkewIC(bbox);
        };
        class_1.prototype.getAccentOffset = function () {
            var bbox = BBox_js_1.BBox.empty();
            this.protoBBox(bbox);
            return -bbox.w / 2;
        };
        class_1.prototype.getCenterOffset = function (bbox) {
            if (bbox === void 0) { bbox = null; }
            if (!bbox) {
                bbox = BBox_js_1.BBox.empty();
                _super.prototype.computeBBox.call(this, bbox);
            }
            return ((bbox.h + bbox.d) / 2 + this.font.params.axis_height) - bbox.h;
        };
        class_1.prototype.getVariant = function () {
            if (this.node.attributes.get('largeop')) {
                this.variant = (this.node.attributes.get('displaystyle') ? '-largeop' : '-smallop');
                return;
            }
            if (!this.node.attributes.getExplicit('mathvariant') &&
                this.node.getProperty('pseudoscript') === false) {
                this.variant = '-tex-variant';
                return;
            }
            _super.prototype.getVariant.call(this);
        };
        class_1.prototype.canStretch = function (direction) {
            if (this.stretch.dir !== 0) {
                return this.stretch.dir === direction;
            }
            var attributes = this.node.attributes;
            if (!attributes.get('stretchy'))
                return false;
            var c = this.getText();
            if (Array.from(c).length !== 1)
                return false;
            var delim = this.font.getDelimiter(c.codePointAt(0));
            this.stretch = (delim && delim.dir === direction ? delim : FontData_js_1.NOSTRETCH);
            return this.stretch.dir !== 0;
        };
        class_1.prototype.getStretchedVariant = function (WH, exact) {
            var e_1, _a;
            if (exact === void 0) { exact = false; }
            if (this.stretch.dir !== 0) {
                var D = this.getWH(WH);
                var min = this.getSize('minsize', 0);
                var max = this.getSize('maxsize', Infinity);
                var mathaccent = this.node.getProperty('mathaccent');
                D = Math.max(min, Math.min(max, D));
                var df = this.font.params.delimiterfactor / 1000;
                var ds = this.font.params.delimitershortfall;
                var m = (min || exact ? D : mathaccent ? Math.min(D / df, D + ds) : Math.max(D * df, D - ds));
                var delim = this.stretch;
                var c = delim.c || this.getText().codePointAt(0);
                var i = 0;
                if (delim.sizes) {
                    try {
                        for (var _b = __values(delim.sizes), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var d = _c.value;
                            if (d >= m) {
                                if (mathaccent && i) {
                                    i--;
                                }
                                this.variant = this.font.getSizeVariant(c, i);
                                this.size = i;
                                if (delim.schar && delim.schar[i]) {
                                    this.stretch = __assign(__assign({}, this.stretch), { c: delim.schar[i] });
                                }
                                return;
                            }
                            i++;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                if (delim.stretch) {
                    this.size = -1;
                    this.invalidateBBox();
                    this.getStretchBBox(WH, this.checkExtendedHeight(D, delim), delim);
                }
                else {
                    this.variant = this.font.getSizeVariant(c, i - 1);
                    this.size = i - 1;
                }
            }
        };
        class_1.prototype.getSize = function (name, value) {
            var attributes = this.node.attributes;
            if (attributes.isSet(name)) {
                value = this.length2em(attributes.get(name), 1, 1);
            }
            return value;
        };
        class_1.prototype.getWH = function (WH) {
            if (WH.length === 0)
                return 0;
            if (WH.length === 1)
                return WH[0];
            var _a = __read(WH, 2), H = _a[0], D = _a[1];
            var a = this.font.params.axis_height;
            return (this.node.attributes.get('symmetric') ? 2 * Math.max(H - a, D + a) : H + D);
        };
        class_1.prototype.getStretchBBox = function (WHD, D, C) {
            var _a;
            if (C.hasOwnProperty('min') && C.min > D) {
                D = C.min;
            }
            var _b = __read(C.HDW, 3), h = _b[0], d = _b[1], w = _b[2];
            if (this.stretch.dir === 1) {
                _a = __read(this.getBaseline(WHD, D, C), 2), h = _a[0], d = _a[1];
            }
            else {
                w = D;
            }
            this.bbox.h = h;
            this.bbox.d = d;
            this.bbox.w = w;
        };
        class_1.prototype.getBaseline = function (WHD, HD, C) {
            var hasWHD = (WHD.length === 2 && WHD[0] + WHD[1] === HD);
            var symmetric = this.node.attributes.get('symmetric');
            var _a = __read((hasWHD ? WHD : [HD, 0]), 2), H = _a[0], D = _a[1];
            var _b = __read([H + D, 0], 2), h = _b[0], d = _b[1];
            if (symmetric) {
                var a = this.font.params.axis_height;
                if (hasWHD) {
                    h = 2 * Math.max(H - a, D + a);
                }
                d = h / 2 - a;
            }
            else if (hasWHD) {
                d = D;
            }
            else {
                var _c = __read((C.HDW || [.75, .25]), 2), ch = _c[0], cd = _c[1];
                d = cd * (h / (ch + cd));
            }
            return [h - d, d];
        };
        class_1.prototype.checkExtendedHeight = function (D, C) {
            if (C.fullExt) {
                var _a = __read(C.fullExt, 2), extSize = _a[0], endSize = _a[1];
                var n = Math.ceil(Math.max(0, D - endSize) / extSize);
                D = endSize + n * extSize;
            }
            return D;
        };
        class_1.prototype.remapChars = function (chars) {
            var primes = this.node.getProperty('primes');
            if (primes) {
                return (0, string_js_1.unicodeChars)(primes);
            }
            if (chars.length === 1) {
                var parent_1 = this.node.coreParent().parent;
                var isAccent = this.isAccent && !parent_1.isKind('mrow');
                var map = (isAccent ? 'accent' : 'mo');
                var text = this.font.getRemappedChar(map, chars[0]);
                if (text) {
                    chars = this.unicodeChars(text, this.variant);
                }
            }
            return chars;
        };
        return class_1;
    }(Base));
}
exports.CommonMoMixin = CommonMoMixin;
//# sourceMappingURL=mo.js.map

/***/ }),

/***/ 50303:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMpaddedMixin = void 0;
function CommonMpaddedMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getDimens = function () {
            var values = this.node.attributes.getList('width', 'height', 'depth', 'lspace', 'voffset');
            var bbox = this.childNodes[0].getBBox();
            var w = bbox.w, h = bbox.h, d = bbox.d;
            var W = w, H = h, D = d, x = 0, y = 0, dx = 0;
            if (values.width !== '')
                w = this.dimen(values.width, bbox, 'w', 0);
            if (values.height !== '')
                h = this.dimen(values.height, bbox, 'h', 0);
            if (values.depth !== '')
                d = this.dimen(values.depth, bbox, 'd', 0);
            if (values.voffset !== '')
                y = this.dimen(values.voffset, bbox);
            if (values.lspace !== '')
                x = this.dimen(values.lspace, bbox);
            var align = this.node.attributes.get('data-align');
            if (align) {
                dx = this.getAlignX(w, bbox, align);
            }
            return [H, D, W, h - H, d - D, w - W, x, y, dx];
        };
        class_1.prototype.dimen = function (length, bbox, d, m) {
            if (d === void 0) { d = ''; }
            if (m === void 0) { m = null; }
            length = String(length);
            var match = length.match(/width|height|depth/);
            var size = (match ? bbox[match[0].charAt(0)] :
                (d ? bbox[d] : 0));
            var dimen = (this.length2em(length, size) || 0);
            if (length.match(/^[-+]/) && d) {
                dimen += size;
            }
            if (m != null) {
                dimen = Math.max(m, dimen);
            }
            return dimen;
        };
        class_1.prototype.computeBBox = function (bbox, recompute) {
            if (recompute === void 0) { recompute = false; }
            var _a = __read(this.getDimens(), 6), H = _a[0], D = _a[1], W = _a[2], dh = _a[3], dd = _a[4], dw = _a[5];
            bbox.w = W + dw;
            bbox.h = H + dh;
            bbox.d = D + dd;
            this.setChildPWidths(recompute, bbox.w);
        };
        class_1.prototype.getWrapWidth = function (_i) {
            return this.getBBox().w;
        };
        class_1.prototype.getChildAlign = function (_i) {
            return this.node.attributes.get('data-align') || 'left';
        };
        return class_1;
    }(Base));
}
exports.CommonMpaddedMixin = CommonMpaddedMixin;
//# sourceMappingURL=mpadded.js.map

/***/ }),

/***/ 62315:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMrootMixin = void 0;
function CommonMrootMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(class_1.prototype, "surd", {
            get: function () {
                return 2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_1.prototype, "root", {
            get: function () {
                return 1;
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.combineRootBBox = function (BBOX, sbox, H) {
            var bbox = this.childNodes[this.root].getOuterBBox();
            var h = this.getRootDimens(sbox, H)[1];
            BBOX.combine(bbox, 0, h);
        };
        class_1.prototype.getRootDimens = function (sbox, H) {
            var surd = this.childNodes[this.surd];
            var bbox = this.childNodes[this.root].getOuterBBox();
            var offset = (surd.size < 0 ? .5 : .6) * sbox.w;
            var w = bbox.w, rscale = bbox.rscale;
            var W = Math.max(w, offset / rscale);
            var dx = Math.max(0, W - w);
            var h = this.rootHeight(bbox, sbox, surd.size, H);
            var x = W * rscale - offset;
            return [x, h, dx];
        };
        class_1.prototype.rootHeight = function (rbox, sbox, size, H) {
            var h = sbox.h + sbox.d;
            var b = (size < 0 ? 1.9 : .55 * h) - (h - H);
            return b + Math.max(0, rbox.d * rbox.rscale);
        };
        return class_1;
    }(Base));
}
exports.CommonMrootMixin = CommonMrootMixin;
//# sourceMappingURL=mroot.js.map

/***/ }),

/***/ 33257:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonInferredMrowMixin = exports.CommonMrowMixin = void 0;
var BBox_js_1 = __webpack_require__(83292);
function CommonMrowMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var e_1, _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.stretchChildren();
            try {
                for (var _b = __values(_this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    if (child.bbox.pwidth) {
                        _this.bbox.pwidth = BBox_js_1.BBox.fullWidth;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return _this;
        }
        Object.defineProperty(class_1.prototype, "fixesPWidth", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.stretchChildren = function () {
            var e_2, _a, e_3, _b, e_4, _c;
            var stretchy = [];
            try {
                for (var _d = __values(this.childNodes), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var child = _e.value;
                    if (child.canStretch(1)) {
                        stretchy.push(child);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var count = stretchy.length;
            var nodeCount = this.childNodes.length;
            if (count && nodeCount > 1) {
                var H = 0, D = 0;
                var all = (count > 1 && count === nodeCount);
                try {
                    for (var _f = __values(this.childNodes), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var child = _g.value;
                        var noStretch = (child.stretch.dir === 0);
                        if (all || noStretch) {
                            var _h = child.getOuterBBox(noStretch), h = _h.h, d = _h.d, rscale = _h.rscale;
                            h *= rscale;
                            d *= rscale;
                            if (h > H)
                                H = h;
                            if (d > D)
                                D = d;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                try {
                    for (var stretchy_1 = __values(stretchy), stretchy_1_1 = stretchy_1.next(); !stretchy_1_1.done; stretchy_1_1 = stretchy_1.next()) {
                        var child = stretchy_1_1.value;
                        child.coreMO().getStretchedVariant([H, D]);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (stretchy_1_1 && !stretchy_1_1.done && (_c = stretchy_1.return)) _c.call(stretchy_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        };
        return class_1;
    }(Base));
}
exports.CommonMrowMixin = CommonMrowMixin;
function CommonInferredMrowMixin(Base) {
    return (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_2.prototype.getScale = function () {
            this.bbox.scale = this.parent.bbox.scale;
            this.bbox.rscale = 1;
        };
        return class_2;
    }(Base));
}
exports.CommonInferredMrowMixin = CommonInferredMrowMixin;
//# sourceMappingURL=mrow.js.map

/***/ }),

/***/ 23745:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMsMixin = void 0;
function CommonMsMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            var attributes = _this.node.attributes;
            var quotes = attributes.getList('lquote', 'rquote');
            if (_this.variant !== 'monospace') {
                if (!attributes.isSet('lquote') && quotes.lquote === '"')
                    quotes.lquote = '\u201C';
                if (!attributes.isSet('rquote') && quotes.rquote === '"')
                    quotes.rquote = '\u201D';
            }
            _this.childNodes.unshift(_this.createText(quotes.lquote));
            _this.childNodes.push(_this.createText(quotes.rquote));
            return _this;
        }
        class_1.prototype.createText = function (text) {
            var node = this.wrap(this.mmlText(text));
            node.parent = this;
            return node;
        };
        return class_1;
    }(Base));
}
exports.CommonMsMixin = CommonMsMixin;
//# sourceMappingURL=ms.js.map

/***/ }),

/***/ 84533:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMspaceMixin = void 0;
function CommonMspaceMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.computeBBox = function (bbox, _recompute) {
            if (_recompute === void 0) { _recompute = false; }
            var attributes = this.node.attributes;
            bbox.w = this.length2em(attributes.get('width'), 0);
            bbox.h = this.length2em(attributes.get('height'), 0);
            bbox.d = this.length2em(attributes.get('depth'), 0);
        };
        class_1.prototype.handleVariant = function () {
        };
        return class_1;
    }(Base));
}
exports.CommonMspaceMixin = CommonMspaceMixin;
//# sourceMappingURL=mspace.js.map

/***/ }),

/***/ 29266:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMsqrtMixin = void 0;
var BBox_js_1 = __webpack_require__(83292);
function CommonMsqrtMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            var surd = _this.createMo('\u221A');
            surd.canStretch(1);
            var _a = _this.childNodes[_this.base].getOuterBBox(), h = _a.h, d = _a.d;
            var t = _this.font.params.rule_thickness;
            var p = (_this.node.attributes.get('displaystyle') ? _this.font.params.x_height : t);
            _this.surdH = h + d + 2 * t + p / 4;
            surd.getStretchedVariant([_this.surdH - d, d], true);
            return _this;
        }
        Object.defineProperty(class_1.prototype, "base", {
            get: function () {
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_1.prototype, "surd", {
            get: function () {
                return 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_1.prototype, "root", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.createMo = function (text) {
            var node = _super.prototype.createMo.call(this, text);
            this.childNodes.push(node);
            return node;
        };
        class_1.prototype.computeBBox = function (bbox, recompute) {
            if (recompute === void 0) { recompute = false; }
            var surdbox = this.childNodes[this.surd].getBBox();
            var basebox = new BBox_js_1.BBox(this.childNodes[this.base].getOuterBBox());
            var q = this.getPQ(surdbox)[1];
            var t = this.font.params.rule_thickness;
            var H = basebox.h + q + t;
            var _a = __read(this.getRootDimens(surdbox, H), 1), x = _a[0];
            bbox.h = H + t;
            this.combineRootBBox(bbox, surdbox, H);
            bbox.combine(surdbox, x, H - surdbox.h);
            bbox.combine(basebox, x + surdbox.w, 0);
            bbox.clean();
            this.setChildPWidths(recompute);
        };
        class_1.prototype.combineRootBBox = function (_bbox, _sbox, _H) {
        };
        class_1.prototype.getPQ = function (sbox) {
            var t = this.font.params.rule_thickness;
            var p = (this.node.attributes.get('displaystyle') ? this.font.params.x_height : t);
            var q = (sbox.h + sbox.d > this.surdH ?
                ((sbox.h + sbox.d) - (this.surdH - 2 * t - p / 2)) / 2 :
                t + p / 4);
            return [p, q];
        };
        class_1.prototype.getRootDimens = function (_sbox, _H) {
            return [0, 0, 0, 0];
        };
        return class_1;
    }(Base));
}
exports.CommonMsqrtMixin = CommonMsqrtMixin;
//# sourceMappingURL=msqrt.js.map

/***/ }),

/***/ 27726:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMsubsupMixin = exports.CommonMsupMixin = exports.CommonMsubMixin = void 0;
function CommonMsubMixin(Base) {
    var _a;
    return _a = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(class_1.prototype, "scriptChild", {
                get: function () {
                    return this.childNodes[this.node.sub];
                },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.getOffset = function () {
                return [0, -this.getV()];
            };
            return class_1;
        }(Base)),
        _a.useIC = false,
        _a;
}
exports.CommonMsubMixin = CommonMsubMixin;
function CommonMsupMixin(Base) {
    return (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(class_2.prototype, "scriptChild", {
            get: function () {
                return this.childNodes[this.node.sup];
            },
            enumerable: false,
            configurable: true
        });
        class_2.prototype.getOffset = function () {
            var x = this.getAdjustedIc() - (this.baseRemoveIc ? 0 : this.baseIc);
            return [x, this.getU()];
        };
        return class_2;
    }(Base));
}
exports.CommonMsupMixin = CommonMsupMixin;
function CommonMsubsupMixin(Base) {
    var _a;
    return _a = (function (_super) {
            __extends(class_3, _super);
            function class_3() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.UVQ = null;
                return _this;
            }
            Object.defineProperty(class_3.prototype, "subChild", {
                get: function () {
                    return this.childNodes[this.node.sub];
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_3.prototype, "supChild", {
                get: function () {
                    return this.childNodes[this.node.sup];
                },
                enumerable: false,
                configurable: true
            });
            class_3.prototype.computeBBox = function (bbox, recompute) {
                if (recompute === void 0) { recompute = false; }
                var basebox = this.baseChild.getOuterBBox();
                var _a = __read([this.subChild.getOuterBBox(), this.supChild.getOuterBBox()], 2), subbox = _a[0], supbox = _a[1];
                bbox.empty();
                bbox.append(basebox);
                var w = this.getBaseWidth();
                var x = this.getAdjustedIc();
                var _b = __read(this.getUVQ(), 2), u = _b[0], v = _b[1];
                bbox.combine(subbox, w, v);
                bbox.combine(supbox, w + x, u);
                bbox.w += this.font.params.scriptspace;
                bbox.clean();
                this.setChildPWidths(recompute);
            };
            class_3.prototype.getUVQ = function (subbox, supbox) {
                if (subbox === void 0) { subbox = this.subChild.getOuterBBox(); }
                if (supbox === void 0) { supbox = this.supChild.getOuterBBox(); }
                var basebox = this.baseCore.getOuterBBox();
                if (this.UVQ)
                    return this.UVQ;
                var tex = this.font.params;
                var t = 3 * tex.rule_thickness;
                var subscriptshift = this.length2em(this.node.attributes.get('subscriptshift'), tex.sub2);
                var drop = this.baseCharZero(basebox.d * this.baseScale + tex.sub_drop * subbox.rscale);
                var _a = __read([this.getU(), Math.max(drop, subscriptshift)], 2), u = _a[0], v = _a[1];
                var q = (u - supbox.d * supbox.rscale) - (subbox.h * subbox.rscale - v);
                if (q < t) {
                    v += t - q;
                    var p = (4 / 5) * tex.x_height - (u - supbox.d * supbox.rscale);
                    if (p > 0) {
                        u += p;
                        v -= p;
                    }
                }
                u = Math.max(this.length2em(this.node.attributes.get('superscriptshift'), u), u);
                v = Math.max(this.length2em(this.node.attributes.get('subscriptshift'), v), v);
                q = (u - supbox.d * supbox.rscale) - (subbox.h * subbox.rscale - v);
                this.UVQ = [u, -v, q];
                return this.UVQ;
            };
            return class_3;
        }(Base)),
        _a.useIC = false,
        _a;
}
exports.CommonMsubsupMixin = CommonMsubsupMixin;
//# sourceMappingURL=msubsup.js.map

/***/ }),

/***/ 8747:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMtableMixin = void 0;
var BBox_js_1 = __webpack_require__(83292);
var string_js_1 = __webpack_require__(33353);
var numeric_js_1 = __webpack_require__(72125);
function CommonMtableMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.numCols = 0;
            _this.numRows = 0;
            _this.data = null;
            _this.pwidthCells = [];
            _this.pWidth = 0;
            _this.numCols = (0, numeric_js_1.max)(_this.tableRows.map(function (row) { return row.numCells; }));
            _this.numRows = _this.childNodes.length;
            _this.hasLabels = _this.childNodes.reduce(function (value, row) { return value || row.node.isKind('mlabeledtr'); }, false);
            _this.findContainer();
            _this.isTop = !_this.container || (_this.container.node.isKind('math') && !_this.container.parent);
            if (_this.isTop) {
                _this.jax.table = _this;
            }
            _this.getPercentageWidth();
            var attributes = _this.node.attributes;
            _this.frame = attributes.get('frame') !== 'none';
            _this.fLine = (_this.frame && attributes.get('frame') ? .07 : 0);
            _this.fSpace = (_this.frame ? _this.convertLengths(_this.getAttributeArray('framespacing')) : [0, 0]);
            _this.cSpace = _this.convertLengths(_this.getColumnAttributes('columnspacing'));
            _this.rSpace = _this.convertLengths(_this.getRowAttributes('rowspacing'));
            _this.cLines = _this.getColumnAttributes('columnlines').map(function (x) { return (x === 'none' ? 0 : .07); });
            _this.rLines = _this.getRowAttributes('rowlines').map(function (x) { return (x === 'none' ? 0 : .07); });
            _this.cWidths = _this.getColumnWidths();
            _this.stretchRows();
            _this.stretchColumns();
            return _this;
        }
        Object.defineProperty(class_1.prototype, "tableRows", {
            get: function () {
                return this.childNodes;
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.findContainer = function () {
            var node = this;
            var parent = node.parent;
            while (parent && (parent.node.notParent || parent.node.isKind('mrow'))) {
                node = parent;
                parent = parent.parent;
            }
            this.container = parent;
            this.containerI = node.node.childPosition();
        };
        class_1.prototype.getPercentageWidth = function () {
            if (this.hasLabels) {
                this.bbox.pwidth = BBox_js_1.BBox.fullWidth;
            }
            else {
                var width = this.node.attributes.get('width');
                if ((0, string_js_1.isPercent)(width)) {
                    this.bbox.pwidth = width;
                }
            }
        };
        class_1.prototype.stretchRows = function () {
            var equal = this.node.attributes.get('equalrows');
            var HD = (equal ? this.getEqualRowHeight() : 0);
            var _a = (equal ? this.getTableData() : { H: [0], D: [0] }), H = _a.H, D = _a.D;
            var rows = this.tableRows;
            for (var i = 0; i < this.numRows; i++) {
                var hd = (equal ? [(HD + H[i] - D[i]) / 2, (HD - H[i] + D[i]) / 2] : null);
                rows[i].stretchChildren(hd);
            }
        };
        class_1.prototype.stretchColumns = function () {
            for (var i = 0; i < this.numCols; i++) {
                var width = (typeof this.cWidths[i] === 'number' ? this.cWidths[i] : null);
                this.stretchColumn(i, width);
            }
        };
        class_1.prototype.stretchColumn = function (i, W) {
            var e_1, _a, e_2, _b, e_3, _c;
            var stretchy = [];
            try {
                for (var _d = __values(this.tableRows), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var row = _e.value;
                    var cell = row.getChild(i);
                    if (cell) {
                        var child = cell.childNodes[0];
                        if (child.stretch.dir === 0 &&
                            child.canStretch(2)) {
                            stretchy.push(child);
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var count = stretchy.length;
            var nodeCount = this.childNodes.length;
            if (count && nodeCount > 1) {
                if (W === null) {
                    W = 0;
                    var all = (count > 1 && count === nodeCount);
                    try {
                        for (var _f = __values(this.tableRows), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var row = _g.value;
                            var cell = row.getChild(i);
                            if (cell) {
                                var child = cell.childNodes[0];
                                var noStretch = (child.stretch.dir === 0);
                                if (all || noStretch) {
                                    var w = child.getBBox(noStretch).w;
                                    if (w > W) {
                                        W = w;
                                    }
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                try {
                    for (var stretchy_1 = __values(stretchy), stretchy_1_1 = stretchy_1.next(); !stretchy_1_1.done; stretchy_1_1 = stretchy_1.next()) {
                        var child = stretchy_1_1.value;
                        child.coreMO().getStretchedVariant([W]);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (stretchy_1_1 && !stretchy_1_1.done && (_c = stretchy_1.return)) _c.call(stretchy_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        };
        class_1.prototype.getTableData = function () {
            if (this.data) {
                return this.data;
            }
            var H = new Array(this.numRows).fill(0);
            var D = new Array(this.numRows).fill(0);
            var W = new Array(this.numCols).fill(0);
            var NH = new Array(this.numRows);
            var ND = new Array(this.numRows);
            var LW = [0];
            var rows = this.tableRows;
            for (var j = 0; j < rows.length; j++) {
                var M = 0;
                var row = rows[j];
                var align = row.node.attributes.get('rowalign');
                for (var i = 0; i < row.numCells; i++) {
                    var cell = row.getChild(i);
                    M = this.updateHDW(cell, i, j, align, H, D, W, M);
                    this.recordPWidthCell(cell, i);
                }
                NH[j] = H[j];
                ND[j] = D[j];
                if (row.labeled) {
                    M = this.updateHDW(row.childNodes[0], 0, j, align, H, D, LW, M);
                }
                this.extendHD(j, H, D, M);
                this.extendHD(j, NH, ND, M);
            }
            var L = LW[0];
            this.data = { H: H, D: D, W: W, NH: NH, ND: ND, L: L };
            return this.data;
        };
        class_1.prototype.updateHDW = function (cell, i, j, align, H, D, W, M) {
            var _a = cell.getBBox(), h = _a.h, d = _a.d, w = _a.w;
            var scale = cell.parent.bbox.rscale;
            if (cell.parent.bbox.rscale !== 1) {
                h *= scale;
                d *= scale;
                w *= scale;
            }
            if (this.node.getProperty('useHeight')) {
                if (h < .75)
                    h = .75;
                if (d < .25)
                    d = .25;
            }
            var m = 0;
            align = cell.node.attributes.get('rowalign') || align;
            if (align !== 'baseline' && align !== 'axis') {
                m = h + d;
                h = d = 0;
            }
            if (h > H[j])
                H[j] = h;
            if (d > D[j])
                D[j] = d;
            if (m > M)
                M = m;
            if (W && w > W[i])
                W[i] = w;
            return M;
        };
        class_1.prototype.extendHD = function (i, H, D, M) {
            var d = (M - (H[i] + D[i])) / 2;
            if (d < .00001)
                return;
            H[i] += d;
            D[i] += d;
        };
        class_1.prototype.recordPWidthCell = function (cell, i) {
            if (cell.childNodes[0] && cell.childNodes[0].getBBox().pwidth) {
                this.pwidthCells.push([cell, i]);
            }
        };
        class_1.prototype.computeBBox = function (bbox, _recompute) {
            if (_recompute === void 0) { _recompute = false; }
            var _a = this.getTableData(), H = _a.H, D = _a.D;
            var height, width;
            if (this.node.attributes.get('equalrows')) {
                var HD = this.getEqualRowHeight();
                height = (0, numeric_js_1.sum)([].concat(this.rLines, this.rSpace)) + HD * this.numRows;
            }
            else {
                height = (0, numeric_js_1.sum)(H.concat(D, this.rLines, this.rSpace));
            }
            height += 2 * (this.fLine + this.fSpace[1]);
            var CW = this.getComputedWidths();
            width = (0, numeric_js_1.sum)(CW.concat(this.cLines, this.cSpace)) + 2 * (this.fLine + this.fSpace[0]);
            var w = this.node.attributes.get('width');
            if (w !== 'auto') {
                width = Math.max(this.length2em(w, 0) + 2 * this.fLine, width);
            }
            var _b = __read(this.getBBoxHD(height), 2), h = _b[0], d = _b[1];
            bbox.h = h;
            bbox.d = d;
            bbox.w = width;
            var _c = __read(this.getBBoxLR(), 2), L = _c[0], R = _c[1];
            bbox.L = L;
            bbox.R = R;
            if (!(0, string_js_1.isPercent)(w)) {
                this.setColumnPWidths();
            }
        };
        class_1.prototype.setChildPWidths = function (_recompute, cwidth, _clear) {
            var width = this.node.attributes.get('width');
            if (!(0, string_js_1.isPercent)(width))
                return false;
            if (!this.hasLabels) {
                this.bbox.pwidth = '';
                this.container.bbox.pwidth = '';
            }
            var _a = this.bbox, w = _a.w, L = _a.L, R = _a.R;
            var labelInWidth = this.node.attributes.get('data-width-includes-label');
            var W = Math.max(w, this.length2em(width, Math.max(cwidth, L + w + R))) - (labelInWidth ? L + R : 0);
            var cols = (this.node.attributes.get('equalcolumns') ?
                Array(this.numCols).fill(this.percent(1 / Math.max(1, this.numCols))) :
                this.getColumnAttributes('columnwidth', 0));
            this.cWidths = this.getColumnWidthsFixed(cols, W);
            var CW = this.getComputedWidths();
            this.pWidth = (0, numeric_js_1.sum)(CW.concat(this.cLines, this.cSpace)) + 2 * (this.fLine + this.fSpace[0]);
            if (this.isTop) {
                this.bbox.w = this.pWidth;
            }
            this.setColumnPWidths();
            if (this.pWidth !== w) {
                this.parent.invalidateBBox();
            }
            return this.pWidth !== w;
        };
        class_1.prototype.setColumnPWidths = function () {
            var e_4, _a;
            var W = this.cWidths;
            try {
                for (var _b = __values(this.pwidthCells), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), cell = _d[0], i = _d[1];
                    if (cell.setChildPWidths(false, W[i])) {
                        cell.invalidateBBox();
                        cell.getBBox();
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        class_1.prototype.getBBoxHD = function (height) {
            var _a = __read(this.getAlignmentRow(), 2), align = _a[0], row = _a[1];
            if (row === null) {
                var a = this.font.params.axis_height;
                var h2 = height / 2;
                var HD = {
                    top: [0, height],
                    center: [h2, h2],
                    bottom: [height, 0],
                    baseline: [h2, h2],
                    axis: [h2 + a, h2 - a]
                };
                return HD[align] || [h2, h2];
            }
            else {
                var y = this.getVerticalPosition(row, align);
                return [y, height - y];
            }
        };
        class_1.prototype.getBBoxLR = function () {
            if (this.hasLabels) {
                var attributes = this.node.attributes;
                var side = attributes.get('side');
                var _a = __read(this.getPadAlignShift(side), 2), pad = _a[0], align = _a[1];
                var labels = this.hasLabels && !!attributes.get('data-width-includes-label');
                if (labels && this.frame && this.fSpace[0]) {
                    pad -= this.fSpace[0];
                }
                return (align === 'center' && !labels ? [pad, pad] :
                    side === 'left' ? [pad, 0] : [0, pad]);
            }
            return [0, 0];
        };
        class_1.prototype.getPadAlignShift = function (side) {
            var L = this.getTableData().L;
            var sep = this.length2em(this.node.attributes.get('minlabelspacing'));
            var pad = L + sep;
            var _a = __read((this.styles == null ? ['', ''] :
                [this.styles.get('padding-left'), this.styles.get('padding-right')]), 2), lpad = _a[0], rpad = _a[1];
            if (lpad || rpad) {
                pad = Math.max(pad, this.length2em(lpad || '0'), this.length2em(rpad || '0'));
            }
            var _b = __read(this.getAlignShift(), 2), align = _b[0], shift = _b[1];
            if (align === side) {
                shift = (side === 'left' ? Math.max(pad, shift) - pad : Math.min(-pad, shift) + pad);
            }
            return [pad, align, shift];
        };
        class_1.prototype.getAlignShift = function () {
            return (this.isTop ? _super.prototype.getAlignShift.call(this) :
                [this.container.getChildAlign(this.containerI), 0]);
        };
        class_1.prototype.getWidth = function () {
            return this.pWidth || this.getBBox().w;
        };
        class_1.prototype.getEqualRowHeight = function () {
            var _a = this.getTableData(), H = _a.H, D = _a.D;
            var HD = Array.from(H.keys()).map(function (i) { return H[i] + D[i]; });
            return Math.max.apply(Math, HD);
        };
        class_1.prototype.getComputedWidths = function () {
            var _this = this;
            var W = this.getTableData().W;
            var CW = Array.from(W.keys()).map(function (i) {
                return (typeof _this.cWidths[i] === 'number' ? _this.cWidths[i] : W[i]);
            });
            if (this.node.attributes.get('equalcolumns')) {
                CW = Array(CW.length).fill((0, numeric_js_1.max)(CW));
            }
            return CW;
        };
        class_1.prototype.getColumnWidths = function () {
            var width = this.node.attributes.get('width');
            if (this.node.attributes.get('equalcolumns')) {
                return this.getEqualColumns(width);
            }
            var swidths = this.getColumnAttributes('columnwidth', 0);
            if (width === 'auto') {
                return this.getColumnWidthsAuto(swidths);
            }
            if ((0, string_js_1.isPercent)(width)) {
                return this.getColumnWidthsPercent(swidths);
            }
            return this.getColumnWidthsFixed(swidths, this.length2em(width));
        };
        class_1.prototype.getEqualColumns = function (width) {
            var n = Math.max(1, this.numCols);
            var cwidth;
            if (width === 'auto') {
                var W = this.getTableData().W;
                cwidth = (0, numeric_js_1.max)(W);
            }
            else if ((0, string_js_1.isPercent)(width)) {
                cwidth = this.percent(1 / n);
            }
            else {
                var w = (0, numeric_js_1.sum)([].concat(this.cLines, this.cSpace)) + 2 * this.fSpace[0];
                cwidth = Math.max(0, this.length2em(width) - w) / n;
            }
            return Array(this.numCols).fill(cwidth);
        };
        class_1.prototype.getColumnWidthsAuto = function (swidths) {
            var _this = this;
            return swidths.map(function (x) {
                if (x === 'auto' || x === 'fit')
                    return null;
                if ((0, string_js_1.isPercent)(x))
                    return x;
                return _this.length2em(x);
            });
        };
        class_1.prototype.getColumnWidthsPercent = function (swidths) {
            var _this = this;
            var hasFit = swidths.indexOf('fit') >= 0;
            var W = (hasFit ? this.getTableData() : { W: null }).W;
            return Array.from(swidths.keys()).map(function (i) {
                var x = swidths[i];
                if (x === 'fit')
                    return null;
                if (x === 'auto')
                    return (hasFit ? W[i] : null);
                if ((0, string_js_1.isPercent)(x))
                    return x;
                return _this.length2em(x);
            });
        };
        class_1.prototype.getColumnWidthsFixed = function (swidths, width) {
            var _this = this;
            var indices = Array.from(swidths.keys());
            var fit = indices.filter(function (i) { return swidths[i] === 'fit'; });
            var auto = indices.filter(function (i) { return swidths[i] === 'auto'; });
            var n = fit.length || auto.length;
            var W = (n ? this.getTableData() : { W: null }).W;
            var cwidth = width - (0, numeric_js_1.sum)([].concat(this.cLines, this.cSpace)) - 2 * this.fSpace[0];
            var dw = cwidth;
            indices.forEach(function (i) {
                var x = swidths[i];
                dw -= (x === 'fit' || x === 'auto' ? W[i] : _this.length2em(x, cwidth));
            });
            var fw = (n && dw > 0 ? dw / n : 0);
            return indices.map(function (i) {
                var x = swidths[i];
                if (x === 'fit')
                    return W[i] + fw;
                if (x === 'auto')
                    return W[i] + (fit.length === 0 ? fw : 0);
                return _this.length2em(x, cwidth);
            });
        };
        class_1.prototype.getVerticalPosition = function (i, align) {
            var equal = this.node.attributes.get('equalrows');
            var _a = this.getTableData(), H = _a.H, D = _a.D;
            var HD = (equal ? this.getEqualRowHeight() : 0);
            var space = this.getRowHalfSpacing();
            var y = this.fLine;
            for (var j = 0; j < i; j++) {
                y += space[j] + (equal ? HD : H[j] + D[j]) + space[j + 1] + this.rLines[j];
            }
            var _b = __read((equal ? [(HD + H[i] - D[i]) / 2, (HD - H[i] + D[i]) / 2] : [H[i], D[i]]), 2), h = _b[0], d = _b[1];
            var offset = {
                top: 0,
                center: space[i] + (h + d) / 2,
                bottom: space[i] + h + d + space[i + 1],
                baseline: space[i] + h,
                axis: space[i] + h - .25
            };
            y += offset[align] || 0;
            return y;
        };
        class_1.prototype.getEmHalfSpacing = function (fspace, space, scale) {
            if (scale === void 0) { scale = 1; }
            var fspaceEm = this.em(fspace * scale);
            var spaceEm = this.addEm(space, 2 / scale);
            spaceEm.unshift(fspaceEm);
            spaceEm.push(fspaceEm);
            return spaceEm;
        };
        class_1.prototype.getRowHalfSpacing = function () {
            var space = this.rSpace.map(function (x) { return x / 2; });
            space.unshift(this.fSpace[1]);
            space.push(this.fSpace[1]);
            return space;
        };
        class_1.prototype.getColumnHalfSpacing = function () {
            var space = this.cSpace.map(function (x) { return x / 2; });
            space.unshift(this.fSpace[0]);
            space.push(this.fSpace[0]);
            return space;
        };
        class_1.prototype.getAlignmentRow = function () {
            var _a = __read((0, string_js_1.split)(this.node.attributes.get('align')), 2), align = _a[0], row = _a[1];
            if (row == null)
                return [align, null];
            var i = parseInt(row);
            if (i < 0)
                i += this.numRows + 1;
            return [align, i < 1 || i > this.numRows ? null : i - 1];
        };
        class_1.prototype.getColumnAttributes = function (name, i) {
            if (i === void 0) { i = 1; }
            var n = this.numCols - i;
            var columns = this.getAttributeArray(name);
            if (columns.length === 0)
                return null;
            while (columns.length < n) {
                columns.push(columns[columns.length - 1]);
            }
            if (columns.length > n) {
                columns.splice(n);
            }
            return columns;
        };
        class_1.prototype.getRowAttributes = function (name, i) {
            if (i === void 0) { i = 1; }
            var n = this.numRows - i;
            var rows = this.getAttributeArray(name);
            if (rows.length === 0)
                return null;
            while (rows.length < n) {
                rows.push(rows[rows.length - 1]);
            }
            if (rows.length > n) {
                rows.splice(n);
            }
            return rows;
        };
        class_1.prototype.getAttributeArray = function (name) {
            var value = this.node.attributes.get(name);
            if (!value)
                return [this.node.attributes.getDefault(name)];
            return (0, string_js_1.split)(value);
        };
        class_1.prototype.addEm = function (list, n) {
            var _this = this;
            if (n === void 0) { n = 1; }
            if (!list)
                return null;
            return list.map(function (x) { return _this.em(x / n); });
        };
        class_1.prototype.convertLengths = function (list) {
            var _this = this;
            if (!list)
                return null;
            return list.map(function (x) { return _this.length2em(x); });
        };
        return class_1;
    }(Base));
}
exports.CommonMtableMixin = CommonMtableMixin;
//# sourceMappingURL=mtable.js.map

/***/ }),

/***/ 32506:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMtdMixin = void 0;
function CommonMtdMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(class_1.prototype, "fixesPWidth", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.invalidateBBox = function () {
            this.bboxComputed = false;
        };
        class_1.prototype.getWrapWidth = function (_j) {
            var table = this.parent.parent;
            var row = this.parent;
            var i = this.node.childPosition() - (row.labeled ? 1 : 0);
            return (typeof (table.cWidths[i]) === 'number' ? table.cWidths[i] : table.getTableData().W[i]);
        };
        class_1.prototype.getChildAlign = function (_i) {
            return this.node.attributes.get('columnalign');
        };
        return class_1;
    }(Base));
}
exports.CommonMtdMixin = CommonMtdMixin;
//# sourceMappingURL=mtd.js.map

/***/ }),

/***/ 84894:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMtextMixin = void 0;
function CommonMtextMixin(Base) {
    var _a;
    return _a = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.getVariant = function () {
                var options = this.jax.options;
                var data = this.jax.math.outputData;
                var merror = ((!!data.merrorFamily || !!options.merrorFont) && this.node.Parent.isKind('merror'));
                if (!!data.mtextFamily || !!options.mtextFont || merror) {
                    var variant = this.node.attributes.get('mathvariant');
                    var font = this.constructor.INHERITFONTS[variant] || this.jax.font.getCssFont(variant);
                    var family = font[0] || (merror ? data.merrorFamily || options.merrorFont :
                        data.mtextFamily || options.mtextFont);
                    this.variant = this.explicitVariant(family, font[2] ? 'bold' : '', font[1] ? 'italic' : '');
                    return;
                }
                _super.prototype.getVariant.call(this);
            };
            return class_1;
        }(Base)),
        _a.INHERITFONTS = {
            normal: ['', false, false],
            bold: ['', false, true],
            italic: ['', true, false],
            'bold-italic': ['', true, true]
        },
        _a;
}
exports.CommonMtextMixin = CommonMtextMixin;
//# sourceMappingURL=mtext.js.map

/***/ }),

/***/ 79598:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMlabeledtrMixin = exports.CommonMtrMixin = void 0;
function CommonMtrMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(class_1.prototype, "fixesPWidth", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_1.prototype, "numCells", {
            get: function () {
                return this.childNodes.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_1.prototype, "labeled", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_1.prototype, "tableCells", {
            get: function () {
                return this.childNodes;
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.getChild = function (i) {
            return this.childNodes[i];
        };
        class_1.prototype.getChildBBoxes = function () {
            return this.childNodes.map(function (cell) { return cell.getBBox(); });
        };
        class_1.prototype.stretchChildren = function (HD) {
            var e_1, _a, e_2, _b, e_3, _c;
            if (HD === void 0) { HD = null; }
            var stretchy = [];
            var children = (this.labeled ? this.childNodes.slice(1) : this.childNodes);
            try {
                for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                    var mtd = children_1_1.value;
                    var child = mtd.childNodes[0];
                    if (child.canStretch(1)) {
                        stretchy.push(child);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var count = stretchy.length;
            var nodeCount = this.childNodes.length;
            if (count && nodeCount > 1) {
                if (HD === null) {
                    var H = 0, D = 0;
                    var all = (count > 1 && count === nodeCount);
                    try {
                        for (var children_2 = __values(children), children_2_1 = children_2.next(); !children_2_1.done; children_2_1 = children_2.next()) {
                            var mtd = children_2_1.value;
                            var child = mtd.childNodes[0];
                            var noStretch = (child.stretch.dir === 0);
                            if (all || noStretch) {
                                var _d = child.getBBox(noStretch), h = _d.h, d = _d.d;
                                if (h > H) {
                                    H = h;
                                }
                                if (d > D) {
                                    D = d;
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (children_2_1 && !children_2_1.done && (_b = children_2.return)) _b.call(children_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    HD = [H, D];
                }
                try {
                    for (var stretchy_1 = __values(stretchy), stretchy_1_1 = stretchy_1.next(); !stretchy_1_1.done; stretchy_1_1 = stretchy_1.next()) {
                        var child = stretchy_1_1.value;
                        child.coreMO().getStretchedVariant(HD);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (stretchy_1_1 && !stretchy_1_1.done && (_c = stretchy_1.return)) _c.call(stretchy_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        };
        return class_1;
    }(Base));
}
exports.CommonMtrMixin = CommonMtrMixin;
function CommonMlabeledtrMixin(Base) {
    return (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(class_2.prototype, "numCells", {
            get: function () {
                return Math.max(0, this.childNodes.length - 1);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_2.prototype, "labeled", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_2.prototype, "tableCells", {
            get: function () {
                return this.childNodes.slice(1);
            },
            enumerable: false,
            configurable: true
        });
        class_2.prototype.getChild = function (i) {
            return this.childNodes[i + 1];
        };
        class_2.prototype.getChildBBoxes = function () {
            return this.childNodes.slice(1).map(function (cell) { return cell.getBBox(); });
        };
        return class_2;
    }(Base));
}
exports.CommonMlabeledtrMixin = CommonMlabeledtrMixin;
//# sourceMappingURL=mtr.js.map

/***/ }),

/***/ 17358:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonMunderoverMixin = exports.CommonMoverMixin = exports.CommonMunderMixin = void 0;
function CommonMunderMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.stretchChildren();
            return _this;
        }
        Object.defineProperty(class_1.prototype, "scriptChild", {
            get: function () {
                return this.childNodes[this.node.under];
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.computeBBox = function (bbox, recompute) {
            if (recompute === void 0) { recompute = false; }
            if (this.hasMovableLimits()) {
                _super.prototype.computeBBox.call(this, bbox, recompute);
                return;
            }
            bbox.empty();
            var basebox = this.baseChild.getOuterBBox();
            var underbox = this.scriptChild.getOuterBBox();
            var v = this.getUnderKV(basebox, underbox)[1];
            var delta = (this.isLineBelow ? 0 : this.getDelta(true));
            var _a = __read(this.getDeltaW([basebox, underbox], [0, -delta]), 2), bw = _a[0], uw = _a[1];
            bbox.combine(basebox, bw, 0);
            bbox.combine(underbox, uw, v);
            bbox.d += this.font.params.big_op_spacing5;
            bbox.clean();
            this.setChildPWidths(recompute);
        };
        return class_1;
    }(Base));
}
exports.CommonMunderMixin = CommonMunderMixin;
function CommonMoverMixin(Base) {
    return (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.stretchChildren();
            return _this;
        }
        Object.defineProperty(class_2.prototype, "scriptChild", {
            get: function () {
                return this.childNodes[this.node.over];
            },
            enumerable: false,
            configurable: true
        });
        class_2.prototype.computeBBox = function (bbox) {
            if (this.hasMovableLimits()) {
                _super.prototype.computeBBox.call(this, bbox);
                return;
            }
            bbox.empty();
            var basebox = this.baseChild.getOuterBBox();
            var overbox = this.scriptChild.getOuterBBox();
            if (this.node.attributes.get('accent')) {
                basebox.h = Math.max(basebox.h, this.font.params.x_height * basebox.scale);
            }
            var u = this.getOverKU(basebox, overbox)[1];
            var delta = (this.isLineAbove ? 0 : this.getDelta());
            var _a = __read(this.getDeltaW([basebox, overbox], [0, delta]), 2), bw = _a[0], ow = _a[1];
            bbox.combine(basebox, bw, 0);
            bbox.combine(overbox, ow, u);
            bbox.h += this.font.params.big_op_spacing5;
            bbox.clean();
        };
        return class_2;
    }(Base));
}
exports.CommonMoverMixin = CommonMoverMixin;
function CommonMunderoverMixin(Base) {
    return (function (_super) {
        __extends(class_3, _super);
        function class_3() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
            _this.stretchChildren();
            return _this;
        }
        Object.defineProperty(class_3.prototype, "underChild", {
            get: function () {
                return this.childNodes[this.node.under];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_3.prototype, "overChild", {
            get: function () {
                return this.childNodes[this.node.over];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_3.prototype, "subChild", {
            get: function () {
                return this.underChild;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_3.prototype, "supChild", {
            get: function () {
                return this.overChild;
            },
            enumerable: false,
            configurable: true
        });
        class_3.prototype.computeBBox = function (bbox) {
            if (this.hasMovableLimits()) {
                _super.prototype.computeBBox.call(this, bbox);
                return;
            }
            bbox.empty();
            var overbox = this.overChild.getOuterBBox();
            var basebox = this.baseChild.getOuterBBox();
            var underbox = this.underChild.getOuterBBox();
            if (this.node.attributes.get('accent')) {
                basebox.h = Math.max(basebox.h, this.font.params.x_height * basebox.scale);
            }
            var u = this.getOverKU(basebox, overbox)[1];
            var v = this.getUnderKV(basebox, underbox)[1];
            var delta = this.getDelta();
            var _a = __read(this.getDeltaW([basebox, underbox, overbox], [0, this.isLineBelow ? 0 : -delta, this.isLineAbove ? 0 : delta]), 3), bw = _a[0], uw = _a[1], ow = _a[2];
            bbox.combine(basebox, bw, 0);
            bbox.combine(overbox, ow, u);
            bbox.combine(underbox, uw, v);
            var z = this.font.params.big_op_spacing5;
            bbox.h += z;
            bbox.d += z;
            bbox.clean();
        };
        return class_3;
    }(Base));
}
exports.CommonMunderoverMixin = CommonMunderoverMixin;
//# sourceMappingURL=munderover.js.map

/***/ }),

/***/ 78214:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonScriptbaseMixin = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
function CommonScriptbaseMixin(Base) {
    var _a;
    return _a = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                _this.baseScale = 1;
                _this.baseIc = 0;
                _this.baseRemoveIc = false;
                _this.baseIsChar = false;
                _this.baseHasAccentOver = null;
                _this.baseHasAccentUnder = null;
                _this.isLineAbove = false;
                _this.isLineBelow = false;
                _this.isMathAccent = false;
                var core = _this.baseCore = _this.getBaseCore();
                if (!core)
                    return _this;
                _this.setBaseAccentsFor(core);
                _this.baseScale = _this.getBaseScale();
                _this.baseIc = _this.getBaseIc();
                _this.baseIsChar = _this.isCharBase();
                _this.isMathAccent = _this.baseIsChar &&
                    (_this.scriptChild && !!_this.scriptChild.coreMO().node.getProperty('mathaccent'));
                _this.checkLineAccents();
                _this.baseRemoveIc = !_this.isLineAbove && !_this.isLineBelow &&
                    (!_this.constructor.useIC || _this.isMathAccent);
                return _this;
            }
            Object.defineProperty(class_1.prototype, "baseChild", {
                get: function () {
                    return this.childNodes[this.node.base];
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_1.prototype, "scriptChild", {
                get: function () {
                    return this.childNodes[1];
                },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.getBaseCore = function () {
                var core = this.getSemanticBase() || this.childNodes[0];
                while (core &&
                    ((core.childNodes.length === 1 &&
                        (core.node.isKind('mrow') ||
                            (core.node.isKind('TeXAtom') && core.node.texClass !== MmlNode_js_1.TEXCLASS.VCENTER) ||
                            core.node.isKind('mstyle') || core.node.isKind('mpadded') ||
                            core.node.isKind('mphantom') || core.node.isKind('semantics'))) ||
                        (core.node.isKind('munderover') && core.isMathAccent))) {
                    this.setBaseAccentsFor(core);
                    core = core.childNodes[0];
                }
                if (!core) {
                    this.baseHasAccentOver = this.baseHasAccentUnder = false;
                }
                return core || this.childNodes[0];
            };
            class_1.prototype.setBaseAccentsFor = function (core) {
                if (core.node.isKind('munderover')) {
                    if (this.baseHasAccentOver === null) {
                        this.baseHasAccentOver = !!core.node.attributes.get('accent');
                    }
                    if (this.baseHasAccentUnder === null) {
                        this.baseHasAccentUnder = !!core.node.attributes.get('accentunder');
                    }
                }
            };
            class_1.prototype.getSemanticBase = function () {
                var fence = this.node.attributes.getExplicit('data-semantic-fencepointer');
                return this.getBaseFence(this.baseChild, fence);
            };
            class_1.prototype.getBaseFence = function (fence, id) {
                var e_1, _a;
                if (!fence || !fence.node.attributes || !id) {
                    return null;
                }
                if (fence.node.attributes.getExplicit('data-semantic-id') === id) {
                    return fence;
                }
                try {
                    for (var _b = __values(fence.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        var result = this.getBaseFence(child, id);
                        if (result) {
                            return result;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return null;
            };
            class_1.prototype.getBaseScale = function () {
                var child = this.baseCore;
                var scale = 1;
                while (child && child !== this) {
                    var bbox = child.getOuterBBox();
                    scale *= bbox.rscale;
                    child = child.parent;
                }
                return scale;
            };
            class_1.prototype.getBaseIc = function () {
                return this.baseCore.getOuterBBox().ic * this.baseScale;
            };
            class_1.prototype.getAdjustedIc = function () {
                var bbox = this.baseCore.getOuterBBox();
                return (bbox.ic ? 1.05 * bbox.ic + .05 : 0) * this.baseScale;
            };
            class_1.prototype.isCharBase = function () {
                var base = this.baseCore;
                return (((base.node.isKind('mo') && base.size === null) ||
                    base.node.isKind('mi') || base.node.isKind('mn')) &&
                    base.bbox.rscale === 1 && Array.from(base.getText()).length === 1);
            };
            class_1.prototype.checkLineAccents = function () {
                if (!this.node.isKind('munderover'))
                    return;
                if (this.node.isKind('mover')) {
                    this.isLineAbove = this.isLineAccent(this.scriptChild);
                }
                else if (this.node.isKind('munder')) {
                    this.isLineBelow = this.isLineAccent(this.scriptChild);
                }
                else {
                    var mml = this;
                    this.isLineAbove = this.isLineAccent(mml.overChild);
                    this.isLineBelow = this.isLineAccent(mml.underChild);
                }
            };
            class_1.prototype.isLineAccent = function (script) {
                var node = script.coreMO().node;
                return (node.isToken && node.getText() === '\u2015');
            };
            class_1.prototype.getBaseWidth = function () {
                var bbox = this.baseChild.getOuterBBox();
                return bbox.w * bbox.rscale - (this.baseRemoveIc ? this.baseIc : 0) + this.font.params.extra_ic;
            };
            class_1.prototype.computeBBox = function (bbox, recompute) {
                if (recompute === void 0) { recompute = false; }
                var w = this.getBaseWidth();
                var _a = __read(this.getOffset(), 2), x = _a[0], y = _a[1];
                bbox.append(this.baseChild.getOuterBBox());
                bbox.combine(this.scriptChild.getOuterBBox(), w + x, y);
                bbox.w += this.font.params.scriptspace;
                bbox.clean();
                this.setChildPWidths(recompute);
            };
            class_1.prototype.getOffset = function () {
                return [0, 0];
            };
            class_1.prototype.baseCharZero = function (n) {
                var largeop = !!this.baseCore.node.attributes.get('largeop');
                var scale = this.baseScale;
                return (this.baseIsChar && !largeop && scale === 1 ? 0 : n);
            };
            class_1.prototype.getV = function () {
                var bbox = this.baseCore.getOuterBBox();
                var sbox = this.scriptChild.getOuterBBox();
                var tex = this.font.params;
                var subscriptshift = this.length2em(this.node.attributes.get('subscriptshift'), tex.sub1);
                return Math.max(this.baseCharZero(bbox.d * this.baseScale + tex.sub_drop * sbox.rscale), subscriptshift, sbox.h * sbox.rscale - (4 / 5) * tex.x_height);
            };
            class_1.prototype.getU = function () {
                var bbox = this.baseCore.getOuterBBox();
                var sbox = this.scriptChild.getOuterBBox();
                var tex = this.font.params;
                var attr = this.node.attributes.getList('displaystyle', 'superscriptshift');
                var prime = this.node.getProperty('texprimestyle');
                var p = prime ? tex.sup3 : (attr.displaystyle ? tex.sup1 : tex.sup2);
                var superscriptshift = this.length2em(attr.superscriptshift, p);
                return Math.max(this.baseCharZero(bbox.h * this.baseScale - tex.sup_drop * sbox.rscale), superscriptshift, sbox.d * sbox.rscale + (1 / 4) * tex.x_height);
            };
            class_1.prototype.hasMovableLimits = function () {
                var display = this.node.attributes.get('displaystyle');
                var mo = this.baseChild.coreMO().node;
                return (!display && !!mo.attributes.get('movablelimits'));
            };
            class_1.prototype.getOverKU = function (basebox, overbox) {
                var accent = this.node.attributes.get('accent');
                var tex = this.font.params;
                var d = overbox.d * overbox.rscale;
                var t = tex.rule_thickness * tex.separation_factor;
                var delta = (this.baseHasAccentOver ? t : 0);
                var T = (this.isLineAbove ? 3 * tex.rule_thickness : t);
                var k = (accent ? T : Math.max(tex.big_op_spacing1, tex.big_op_spacing3 - Math.max(0, d))) - delta;
                return [k, basebox.h * basebox.rscale + k + d];
            };
            class_1.prototype.getUnderKV = function (basebox, underbox) {
                var accent = this.node.attributes.get('accentunder');
                var tex = this.font.params;
                var h = underbox.h * underbox.rscale;
                var t = tex.rule_thickness * tex.separation_factor;
                var delta = (this.baseHasAccentUnder ? t : 0);
                var T = (this.isLineBelow ? 3 * tex.rule_thickness : t);
                var k = (accent ? T : Math.max(tex.big_op_spacing2, tex.big_op_spacing4 - h)) - delta;
                return [k, -(basebox.d * basebox.rscale + k + h)];
            };
            class_1.prototype.getDeltaW = function (boxes, delta) {
                var e_2, _a, e_3, _b;
                if (delta === void 0) { delta = [0, 0, 0]; }
                var align = this.node.attributes.get('align');
                var widths = boxes.map(function (box) { return box.w * box.rscale; });
                widths[0] -= (this.baseRemoveIc && !this.baseCore.node.attributes.get('largeop') ? this.baseIc : 0);
                var w = Math.max.apply(Math, __spreadArray([], __read(widths), false));
                var dw = [];
                var m = 0;
                try {
                    for (var _c = __values(widths.keys()), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var i = _d.value;
                        dw[i] = (align === 'center' ? (w - widths[i]) / 2 :
                            align === 'right' ? w - widths[i] : 0) + delta[i];
                        if (dw[i] < m) {
                            m = -dw[i];
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                if (m) {
                    try {
                        for (var _e = __values(dw.keys()), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var i = _f.value;
                            dw[i] += m;
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                [1, 2].map(function (i) { return dw[i] += (boxes[i] ? boxes[i].dx * boxes[0].scale : 0); });
                return dw;
            };
            class_1.prototype.getDelta = function (noskew) {
                if (noskew === void 0) { noskew = false; }
                var accent = this.node.attributes.get('accent');
                var _a = this.baseCore.getOuterBBox(), sk = _a.sk, ic = _a.ic;
                return ((accent && !noskew ? sk : 0) + this.font.skewIcFactor * ic) * this.baseScale;
            };
            class_1.prototype.stretchChildren = function () {
                var e_4, _a, e_5, _b, e_6, _c;
                var stretchy = [];
                try {
                    for (var _d = __values(this.childNodes), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var child = _e.value;
                        if (child.canStretch(2)) {
                            stretchy.push(child);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                var count = stretchy.length;
                var nodeCount = this.childNodes.length;
                if (count && nodeCount > 1) {
                    var W = 0;
                    var all = (count > 1 && count === nodeCount);
                    try {
                        for (var _f = __values(this.childNodes), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var child = _g.value;
                            var noStretch = (child.stretch.dir === 0);
                            if (all || noStretch) {
                                var _h = child.getOuterBBox(noStretch), w = _h.w, rscale = _h.rscale;
                                if (w * rscale > W)
                                    W = w * rscale;
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    try {
                        for (var stretchy_1 = __values(stretchy), stretchy_1_1 = stretchy_1.next(); !stretchy_1_1.done; stretchy_1_1 = stretchy_1.next()) {
                            var child = stretchy_1_1.value;
                            child.coreMO().getStretchedVariant([W / child.bbox.rscale]);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (stretchy_1_1 && !stretchy_1_1.done && (_c = stretchy_1.return)) _c.call(stretchy_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                }
            };
            return class_1;
        }(Base)),
        _a.useIC = true,
        _a;
}
exports.CommonScriptbaseMixin = CommonScriptbaseMixin;
//# sourceMappingURL=scriptbase.js.map

/***/ }),

/***/ 44974:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonSemanticsMixin = void 0;
function CommonSemanticsMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.computeBBox = function (bbox, _recompute) {
            if (_recompute === void 0) { _recompute = false; }
            if (this.childNodes.length) {
                var _a = this.childNodes[0].getBBox(), w = _a.w, h = _a.h, d = _a.d;
                bbox.w = w;
                bbox.h = h;
                bbox.d = d;
            }
        };
        return class_1;
    }(Base));
}
exports.CommonSemanticsMixin = CommonSemanticsMixin;
//# sourceMappingURL=semantics.js.map

/***/ }),

/***/ 63410:
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonTeXFontMixin = void 0;
function CommonTeXFontMixin(Base) {
    var _a;
    return _a = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.getDelimiterData = function (n) {
                return this.getChar('-smallop', n) || this.getChar('-size4', n);
            };
            return class_1;
        }(Base)),
        _a.NAME = 'TeX',
        _a.defaultVariants = __spreadArray(__spreadArray([], __read(Base.defaultVariants), false), [
            ['-smallop', 'normal'],
            ['-largeop', 'normal'],
            ['-size3', 'normal'],
            ['-size4', 'normal'],
            ['-tex-calligraphic', 'italic'],
            ['-tex-bold-calligraphic', 'bold-italic'],
            ['-tex-oldstyle', 'normal'],
            ['-tex-bold-oldstyle', 'bold'],
            ['-tex-mathit', 'italic'],
            ['-tex-variant', 'normal']
        ], false),
        _a.defaultCssFonts = __assign(__assign({}, Base.defaultCssFonts), { '-smallop': ['serif', false, false], '-largeop': ['serif', false, false], '-size3': ['serif', false, false], '-size4': ['serif', false, false], '-tex-calligraphic': ['cursive', true, false], '-tex-bold-calligraphic': ['cursive', true, true], '-tex-oldstyle': ['serif', false, false], '-tex-bold-oldstyle': ['serif', false, true], '-tex-mathit': ['serif', true, false] }),
        _a.defaultSizeVariants = ['normal', '-smallop', '-largeop', '-size3', '-size4', '-tex-variant'],
        _a.defaultStretchVariants = ['-size4'],
        _a;
}
exports.CommonTeXFontMixin = CommonTeXFontMixin;
//# sourceMappingURL=tex.js.map

/***/ }),

/***/ 21453:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boldItalic = void 0;
exports.boldItalic = {
    0x2F: [.711, .21, .894],
    0x131: [.452, .008, .394, { sk: .0319 }],
    0x237: [.451, .201, .439, { sk: .0958 }],
    0x2044: [.711, .21, .894],
    0x2206: [.711, 0, .958, { sk: .192 }],
    0x29F8: [.711, .21, .894],
};
//# sourceMappingURL=bold-italic.js.map

/***/ }),

/***/ 74585:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bold = void 0;
exports.bold = {
    0x21: [.705, 0, .35],
    0x22: [.694, -0.329, .603],
    0x23: [.694, .193, .958],
    0x24: [.75, .056, .575],
    0x25: [.75, .056, .958],
    0x26: [.705, .011, .894],
    0x27: [.694, -0.329, .319],
    0x28: [.75, .249, .447],
    0x29: [.75, .249, .447],
    0x2A: [.75, -0.306, .575],
    0x2B: [.633, .131, .894],
    0x2C: [.171, .194, .319],
    0x2D: [.278, -0.166, .383],
    0x2E: [.171, 0, .319],
    0x2F: [.75, .25, .575],
    0x3A: [.444, 0, .319],
    0x3B: [.444, .194, .319],
    0x3C: [.587, .085, .894],
    0x3D: [.393, -0.109, .894],
    0x3E: [.587, .085, .894],
    0x3F: [.7, 0, .543],
    0x40: [.699, .006, .894],
    0x5B: [.75, .25, .319],
    0x5C: [.75, .25, .575],
    0x5D: [.75, .25, .319],
    0x5E: [.694, -0.52, .575],
    0x5F: [-0.01, .061, .575],
    0x60: [.706, -0.503, .575],
    0x7B: [.75, .25, .575],
    0x7C: [.75, .249, .319],
    0x7D: [.75, .25, .575],
    0x7E: [.344, -0.202, .575],
    0xA8: [.695, -0.535, .575],
    0xAC: [.371, -0.061, .767],
    0xAF: [.607, -0.54, .575],
    0xB0: [.702, -0.536, .575],
    0xB1: [.728, .035, .894],
    0xB4: [.706, -0.503, .575],
    0xB7: [.336, -0.166, .319],
    0xD7: [.53, .028, .894],
    0xF7: [.597, .096, .894],
    0x131: [.442, 0, .278, { sk: .0278 }],
    0x237: [.442, .205, .306, { sk: .0833 }],
    0x2B9: [.563, -0.033, .344],
    0x2C6: [.694, -0.52, .575],
    0x2C7: [.66, -0.515, .575],
    0x2C9: [.607, -0.54, .575],
    0x2CA: [.706, -0.503, .575],
    0x2CB: [.706, -0.503, .575],
    0x2D8: [.694, -0.5, .575],
    0x2D9: [.695, -0.525, .575],
    0x2DA: [.702, -0.536, .575],
    0x2DC: [.694, -0.552, .575],
    0x300: [.706, -0.503, 0],
    0x301: [.706, -0.503, 0],
    0x302: [.694, -0.52, 0],
    0x303: [.694, -0.552, 0],
    0x304: [.607, -0.54, 0],
    0x306: [.694, -0.5, 0],
    0x307: [.695, -0.525, 0],
    0x308: [.695, -0.535, 0],
    0x30A: [.702, -0.536, 0],
    0x30B: [.714, -0.511, 0],
    0x30C: [.66, -0.515, 0],
    0x338: [.711, .21, 0],
    0x2002: [0, 0, .5],
    0x2003: [0, 0, .999],
    0x2004: [0, 0, .333],
    0x2005: [0, 0, .25],
    0x2006: [0, 0, .167],
    0x2009: [0, 0, .167],
    0x200A: [0, 0, .083],
    0x2013: [.3, -0.249, .575],
    0x2014: [.3, -0.249, 1.15],
    0x2015: [.3, -0.249, 1.15],
    0x2016: [.75, .248, .575],
    0x2017: [-0.01, .061, .575],
    0x2018: [.694, -0.329, .319],
    0x2019: [.694, -0.329, .319],
    0x201C: [.694, -0.329, .603],
    0x201D: [.694, -0.329, .603],
    0x2020: [.702, .211, .511],
    0x2021: [.702, .202, .511],
    0x2022: [.474, -0.028, .575],
    0x2026: [.171, 0, 1.295],
    0x2032: [.563, -0.033, .344],
    0x2033: [.563, 0, .688],
    0x2034: [.563, 0, 1.032],
    0x203E: [.607, -0.54, .575],
    0x2044: [.75, .25, .575],
    0x2057: [.563, 0, 1.376],
    0x20D7: [.723, -0.513, .575],
    0x210F: [.694, .008, .668, { sk: -0.0319 }],
    0x2113: [.702, .019, .474, { sk: .128 }],
    0x2118: [.461, .21, .74],
    0x2135: [.694, 0, .703],
    0x2190: [.518, .017, 1.15],
    0x2191: [.694, .193, .575],
    0x2192: [.518, .017, 1.15],
    0x2193: [.694, .194, .575],
    0x2194: [.518, .017, 1.15],
    0x2195: [.767, .267, .575],
    0x2196: [.724, .194, 1.15],
    0x2197: [.724, .193, 1.15],
    0x2198: [.694, .224, 1.15],
    0x2199: [.694, .224, 1.15],
    0x219A: [.711, .21, 1.15],
    0x219B: [.711, .21, 1.15],
    0x21A6: [.518, .017, 1.15],
    0x21A9: [.518, .017, 1.282],
    0x21AA: [.518, .017, 1.282],
    0x21AE: [.711, .21, 1.15],
    0x21BC: [.518, -0.22, 1.15],
    0x21BD: [.281, .017, 1.15],
    0x21C0: [.518, -0.22, 1.15],
    0x21C1: [.281, .017, 1.15],
    0x21CC: [.718, .017, 1.15],
    0x21CD: [.711, .21, 1.15],
    0x21CE: [.711, .21, 1.15],
    0x21CF: [.711, .21, 1.15],
    0x21D0: [.547, .046, 1.15],
    0x21D1: [.694, .193, .703],
    0x21D2: [.547, .046, 1.15],
    0x21D3: [.694, .194, .703],
    0x21D4: [.547, .046, 1.15],
    0x21D5: [.767, .267, .703],
    0x2200: [.694, .016, .639],
    0x2203: [.694, 0, .639],
    0x2204: [.711, .21, .639],
    0x2205: [.767, .073, .575],
    0x2206: [.698, 0, .958],
    0x2208: [.587, .086, .767],
    0x2209: [.711, .21, .767],
    0x220B: [.587, .086, .767],
    0x220C: [.711, .21, .767],
    0x2212: [.281, -0.221, .894],
    0x2213: [.537, .227, .894],
    0x2215: [.75, .25, .575],
    0x2216: [.75, .25, .575],
    0x2217: [.472, -0.028, .575],
    0x2218: [.474, -0.028, .575],
    0x2219: [.474, -0.028, .575],
    0x221A: [.82, .18, .958, { ic: .03 }],
    0x221D: [.451, .008, .894],
    0x221E: [.452, .008, 1.15],
    0x2220: [.714, 0, .722],
    0x2223: [.75, .249, .319],
    0x2224: [.75, .249, .319],
    0x2225: [.75, .248, .575],
    0x2226: [.75, .248, .575],
    0x2227: [.604, .017, .767],
    0x2228: [.604, .016, .767],
    0x2229: [.603, .016, .767],
    0x222A: [.604, .016, .767],
    0x222B: [.711, .211, .569, { ic: .063 }],
    0x223C: [.391, -0.109, .894],
    0x2240: [.583, .082, .319],
    0x2241: [.711, .21, .894],
    0x2243: [.502, 0, .894],
    0x2244: [.711, .21, .894],
    0x2245: [.638, .027, .894],
    0x2247: [.711, .21, .894],
    0x2248: [.524, -0.032, .894],
    0x2249: [.711, .21, .894],
    0x224D: [.533, .032, .894],
    0x2250: [.721, -0.109, .894],
    0x2260: [.711, .21, .894],
    0x2261: [.505, 0, .894],
    0x2262: [.711, .21, .894],
    0x2264: [.697, .199, .894],
    0x2265: [.697, .199, .894],
    0x226A: [.617, .116, 1.15],
    0x226B: [.618, .116, 1.15],
    0x226D: [.711, .21, .894],
    0x226E: [.711, .21, .894],
    0x226F: [.711, .21, .894],
    0x2270: [.711, .21, .894],
    0x2271: [.711, .21, .894],
    0x227A: [.585, .086, .894],
    0x227B: [.586, .086, .894],
    0x2280: [.711, .21, .894],
    0x2281: [.711, .21, .894],
    0x2282: [.587, .085, .894],
    0x2283: [.587, .086, .894],
    0x2284: [.711, .21, .894],
    0x2285: [.711, .21, .894],
    0x2286: [.697, .199, .894],
    0x2287: [.697, .199, .894],
    0x2288: [.711, .21, .894],
    0x2289: [.711, .21, .894],
    0x228E: [.604, .016, .767],
    0x2291: [.697, .199, .894],
    0x2292: [.697, .199, .894],
    0x2293: [.604, 0, .767],
    0x2294: [.604, 0, .767],
    0x2295: [.632, .132, .894],
    0x2296: [.632, .132, .894],
    0x2297: [.632, .132, .894],
    0x2298: [.632, .132, .894],
    0x2299: [.632, .132, .894],
    0x22A2: [.693, 0, .703],
    0x22A3: [.693, 0, .703],
    0x22A4: [.694, 0, .894],
    0x22A5: [.693, 0, .894],
    0x22A8: [.75, .249, .974],
    0x22AC: [.711, .21, .703],
    0x22AD: [.75, .249, .974],
    0x22C4: [.523, .021, .575],
    0x22C5: [.336, -0.166, .319],
    0x22C6: [.502, 0, .575],
    0x22C8: [.54, .039, 1],
    0x22E2: [.711, .21, .894],
    0x22E3: [.711, .21, .894],
    0x22EE: [.951, .029, .319],
    0x22EF: [.336, -0.166, 1.295],
    0x22F1: [.871, -0.101, 1.323],
    0x2308: [.75, .248, .511],
    0x2309: [.75, .248, .511],
    0x230A: [.749, .248, .511],
    0x230B: [.749, .248, .511],
    0x2322: [.405, -0.108, 1.15],
    0x2323: [.392, -0.126, 1.15],
    0x2329: [.75, .249, .447],
    0x232A: [.75, .249, .447],
    0x25B3: [.711, 0, 1.022],
    0x25B5: [.711, 0, 1.022],
    0x25B9: [.54, .039, .575],
    0x25BD: [.5, .21, 1.022],
    0x25BF: [.5, .21, 1.022],
    0x25C3: [.539, .038, .575],
    0x25EF: [.711, .211, 1.15],
    0x2660: [.719, .129, .894],
    0x2661: [.711, .024, .894],
    0x2662: [.719, .154, .894],
    0x2663: [.719, .129, .894],
    0x266D: [.75, .017, .447],
    0x266E: [.741, .223, .447],
    0x266F: [.724, .224, .447],
    0x2758: [.75, .249, .319],
    0x27E8: [.75, .249, .447],
    0x27E9: [.75, .249, .447],
    0x27F5: [.518, .017, 1.805],
    0x27F6: [.518, .017, 1.833],
    0x27F7: [.518, .017, 2.126],
    0x27F8: [.547, .046, 1.868],
    0x27F9: [.547, .046, 1.87],
    0x27FA: [.547, .046, 2.126],
    0x27FC: [.518, .017, 1.833],
    0x29F8: [.711, .21, .894],
    0x2A2F: [.53, .028, .894],
    0x2A3F: [.686, 0, .9],
    0x2AAF: [.696, .199, .894],
    0x2AB0: [.697, .199, .894],
    0x3008: [.75, .249, .447],
    0x3009: [.75, .249, .447],
};
//# sourceMappingURL=bold.js.map

/***/ }),

/***/ 4465:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.delimiters = exports.VSIZES = exports.HDW3 = exports.HDW2 = exports.HDW1 = void 0;
var FontData_js_1 = __webpack_require__(88284);
exports.HDW1 = [.75, .25, .875];
exports.HDW2 = [.85, .349, .667];
exports.HDW3 = [.583, .082, .5];
exports.VSIZES = [1, 1.2, 1.8, 2.4, 3];
var DELIM2F = { c: 0x2F, dir: FontData_js_1.V, sizes: exports.VSIZES };
var DELIMAF = { c: 0xAF, dir: FontData_js_1.H, sizes: [.5], stretch: [0, 0xAF], HDW: [.59, -0.544, .5] };
var DELIM2C6 = { c: 0x2C6, dir: FontData_js_1.H, sizes: [.5, .556, 1, 1.444, 1.889] };
var DELIM2DC = { c: 0x2DC, dir: FontData_js_1.H, sizes: [.5, .556, 1, 1.444, 1.889] };
var DELIM2013 = { c: 0x2013, dir: FontData_js_1.H, sizes: [.5], stretch: [0, 0x2013], HDW: [.285, -0.248, .5] };
var DELIM2190 = { c: 0x2190, dir: FontData_js_1.H, sizes: [1], stretch: [0x2190, 0x2212], HDW: exports.HDW3 };
var DELIM2192 = { c: 0x2192, dir: FontData_js_1.H, sizes: [1], stretch: [0, 0x2212, 0x2192], HDW: exports.HDW3 };
var DELIM2194 = { c: 0x2194, dir: FontData_js_1.H, sizes: [1], stretch: [0x2190, 0x2212, 0x2192], HDW: exports.HDW3 };
var DELIM21A4 = { c: 0x21A4, dir: FontData_js_1.H, stretch: [0x2190, 0x2212, 0x2223], HDW: exports.HDW3, min: 1.278 };
var DELIM21A6 = { c: 0x21A6, dir: FontData_js_1.H, sizes: [1], stretch: [0x2223, 0x2212, 0x2192], HDW: exports.HDW3 };
var DELIM21D0 = { c: 0x21D0, dir: FontData_js_1.H, sizes: [1], stretch: [0x21D0, 0x3D], HDW: exports.HDW3 };
var DELIM21D2 = { c: 0x21D2, dir: FontData_js_1.H, sizes: [1], stretch: [0, 0x3D, 0x21D2], HDW: exports.HDW3 };
var DELIM21D4 = { c: 0x21D4, dir: FontData_js_1.H, sizes: [1], stretch: [0x21D0, 0x3D, 0x21D2], HDW: exports.HDW3 };
var DELIM2212 = { c: 0x2212, dir: FontData_js_1.H, sizes: [.778], stretch: [0, 0x2212], HDW: exports.HDW3 };
var DELIM2223 = { c: 0x2223, dir: FontData_js_1.V, sizes: [1], stretch: [0, 0x2223], HDW: [.627, .015, .333] };
var DELIM23DC = { c: 0x23DC, dir: FontData_js_1.H, sizes: [.778, 1], schar: [0x2322, 0x2322], variants: [5, 0],
    stretch: [0xE150, 0xE154, 0xE151], HDW: [.32, .2, .5] };
var DELIM23DD = { c: 0x23DD, dir: FontData_js_1.H, sizes: [.778, 1], schar: [0x2323, 0x2323], variants: [5, 0],
    stretch: [0xE152, 0xE154, 0xE153], HDW: [.32, .2, .5] };
var DELIM23DE = { c: 0x23DE, dir: FontData_js_1.H, stretch: [0xE150, 0xE154, 0xE151, 0xE155], HDW: [.32, .2, .5], min: 1.8 };
var DELIM23DF = { c: 0x23DF, dir: FontData_js_1.H, stretch: [0xE152, 0xE154, 0xE153, 0xE156], HDW: [.32, .2, .5], min: 1.8 };
var DELIM27E8 = { c: 0x27E8, dir: FontData_js_1.V, sizes: exports.VSIZES };
var DELIM27E9 = { c: 0x27E9, dir: FontData_js_1.V, sizes: exports.VSIZES };
var DELIM2906 = { c: 0x2906, dir: FontData_js_1.H, stretch: [0x21D0, 0x3D, 0x2223], HDW: exports.HDW3, min: 1.278 };
var DELIM2907 = { c: 0x2907, dir: FontData_js_1.H, stretch: [0x22A8, 0x3D, 0x21D2], HDW: exports.HDW3, min: 1.278 };
exports.delimiters = {
    0x28: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0x239B, 0x239C, 0x239D], HDW: [.85, .349, .875] },
    0x29: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0x239E, 0x239F, 0x23A0], HDW: [.85, .349, .875] },
    0x2D: DELIM2212,
    0x2F: DELIM2F,
    0x3D: { dir: FontData_js_1.H, sizes: [.778], stretch: [0, 0x3D], HDW: exports.HDW3 },
    0x5B: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0x23A1, 0x23A2, 0x23A3], HDW: exports.HDW2 },
    0x5C: { dir: FontData_js_1.V, sizes: exports.VSIZES },
    0x5D: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0x23A4, 0x23A5, 0x23A6], HDW: exports.HDW2 },
    0x5E: DELIM2C6,
    0x5F: DELIM2013,
    0x7B: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0x23A7, 0x23AA, 0x23A9, 0x23A8], HDW: [.85, .349, .889] },
    0x7C: { dir: FontData_js_1.V, sizes: [1], stretch: [0, 0x2223], HDW: [.75, .25, .333] },
    0x7D: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0x23AB, 0x23AA, 0x23AD, 0x23AC], HDW: [.85, .349, .889] },
    0x7E: DELIM2DC,
    0xAF: DELIMAF,
    0x2C6: DELIM2C6,
    0x2C9: DELIMAF,
    0x2DC: DELIM2DC,
    0x302: DELIM2C6,
    0x303: DELIM2DC,
    0x332: DELIM2013,
    0x2013: DELIM2013,
    0x2014: DELIM2013,
    0x2015: DELIM2013,
    0x2016: { dir: FontData_js_1.V, sizes: [.602, 1], schar: [0, 0x2225], variants: [1, 0], stretch: [0, 0x2225], HDW: [.602, 0, .556] },
    0x2017: DELIM2013,
    0x203E: DELIMAF,
    0x20D7: DELIM2192,
    0x2190: DELIM2190,
    0x2191: { dir: FontData_js_1.V, sizes: [.888], stretch: [0x2191, 0x23D0], HDW: [.6, 0, .667] },
    0x2192: DELIM2192,
    0x2193: { dir: FontData_js_1.V, sizes: [.888], stretch: [0, 0x23D0, 0x2193], HDW: [.6, 0, .667] },
    0x2194: DELIM2194,
    0x2195: { dir: FontData_js_1.V, sizes: [1.044], stretch: [0x2191, 0x23D0, 0x2193], HDW: exports.HDW1 },
    0x219E: { dir: FontData_js_1.H, sizes: [1], stretch: [0x219E, 0x2212], HDW: exports.HDW3 },
    0x21A0: { dir: FontData_js_1.H, sizes: [1], stretch: [0, 0x2212, 0x21A0], HDW: exports.HDW3 },
    0x21A4: DELIM21A4,
    0x21A5: { dir: FontData_js_1.V, stretch: [0x2191, 0x23D0, 0x22A5], HDW: exports.HDW1, min: 1.555 },
    0x21A6: DELIM21A6,
    0x21A7: { dir: FontData_js_1.V, stretch: [0x22A4, 0x23D0, 0x2193], HDW: exports.HDW1, min: 1.555 },
    0x21B0: { dir: FontData_js_1.V, sizes: [.722], stretch: [0x21B0, 0x23D0], HDW: exports.HDW1 },
    0x21B1: { dir: FontData_js_1.V, sizes: [.722], stretch: [0x21B1, 0x23D0], HDW: exports.HDW1 },
    0x21BC: { dir: FontData_js_1.H, sizes: [1], stretch: [0x21BC, 0x2212], HDW: exports.HDW3 },
    0x21BD: { dir: FontData_js_1.H, sizes: [1], stretch: [0x21BD, 0x2212], HDW: exports.HDW3 },
    0x21BE: { dir: FontData_js_1.V, sizes: [.888], stretch: [0x21BE, 0x23D0], HDW: exports.HDW1 },
    0x21BF: { dir: FontData_js_1.V, sizes: [.888], stretch: [0x21BF, 0x23D0], HDW: exports.HDW1 },
    0x21C0: { dir: FontData_js_1.H, sizes: [1], stretch: [0, 0x2212, 0x21C0], HDW: exports.HDW3 },
    0x21C1: { dir: FontData_js_1.H, sizes: [1], stretch: [0, 0x2212, 0x21C1], HDW: exports.HDW3 },
    0x21C2: { dir: FontData_js_1.V, sizes: [.888], stretch: [0, 0x23D0, 0x21C2], HDW: exports.HDW1 },
    0x21C3: { dir: FontData_js_1.V, sizes: [.888], stretch: [0, 0x23D0, 0x21C3], HDW: exports.HDW1 },
    0x21D0: DELIM21D0,
    0x21D1: { dir: FontData_js_1.V, sizes: [.888], stretch: [0x21D1, 0x2016], HDW: [.599, 0, .778] },
    0x21D2: DELIM21D2,
    0x21D3: { dir: FontData_js_1.V, sizes: [.888], stretch: [0, 0x2016, 0x21D3], HDW: [.6, 0, .778] },
    0x21D4: DELIM21D4,
    0x21D5: { dir: FontData_js_1.V, sizes: [1.044], stretch: [0x21D1, 0x2016, 0x21D3], HDW: [.75, .25, .778] },
    0x21DA: { dir: FontData_js_1.H, sizes: [1], stretch: [0x21DA, 0x2261], HDW: [.464, -0.036, .5] },
    0x21DB: { dir: FontData_js_1.H, sizes: [1], stretch: [0, 0x2261, 0x21DB], HDW: [.464, -0.036, .5] },
    0x2212: DELIM2212,
    0x2215: DELIM2F,
    0x221A: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0xE001, 0xE000, 0x23B7], fullExt: [.65, 2.3], HDW: [.85, .35, 1.056] },
    0x2223: DELIM2223,
    0x2225: { dir: FontData_js_1.V, sizes: [1], stretch: [0, 0x2225], HDW: [.627, .015, .556] },
    0x2308: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0x23A1, 0x23A2], HDW: exports.HDW2 },
    0x2309: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0x23A4, 0x23A5], HDW: exports.HDW2 },
    0x230A: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0, 0x23A2, 0x23A3], HDW: exports.HDW2 },
    0x230B: { dir: FontData_js_1.V, sizes: exports.VSIZES, stretch: [0, 0x23A5, 0x23A6], HDW: exports.HDW2 },
    0x2312: DELIM23DC,
    0x2322: DELIM23DC,
    0x2323: DELIM23DD,
    0x2329: DELIM27E8,
    0x232A: DELIM27E9,
    0x23AA: { dir: FontData_js_1.V, sizes: [.32], stretch: [0x23AA, 0x23AA, 0x23AA], HDW: [.29, .015, .889] },
    0x23AF: DELIM2013,
    0x23B0: { dir: FontData_js_1.V, sizes: [.989], stretch: [0x23A7, 0x23AA, 0x23AD], HDW: [.75, .25, .889] },
    0x23B1: { dir: FontData_js_1.V, sizes: [.989], stretch: [0x23AB, 0x23AA, 0x23A9], HDW: [.75, .25, .889] },
    0x23B4: { dir: FontData_js_1.H, stretch: [0x250C, 0x2212, 0x2510], HDW: exports.HDW3, min: 1 },
    0x23B5: { dir: FontData_js_1.H, stretch: [0x2514, 0x2212, 0x2518], HDW: exports.HDW3, min: 1 },
    0x23D0: { dir: FontData_js_1.V, sizes: [.602, 1], schar: [0, 0x2223], variants: [1, 0], stretch: [0, 0x2223], HDW: [.602, 0, .333] },
    0x23DC: DELIM23DC,
    0x23DD: DELIM23DD,
    0x23DE: DELIM23DE,
    0x23DF: DELIM23DF,
    0x23E0: { dir: FontData_js_1.H, stretch: [0x2CA, 0x2C9, 0x2CB], HDW: [.59, -0.544, .5], min: 1 },
    0x23E1: { dir: FontData_js_1.H, stretch: [0x2CB, 0x2C9, 0x2CA], HDW: [.59, -0.544, .5], min: 1 },
    0x2500: DELIM2013,
    0x2758: DELIM2223,
    0x27E8: DELIM27E8,
    0x27E9: DELIM27E9,
    0x27EE: { dir: FontData_js_1.V, sizes: [.989], stretch: [0x23A7, 0x23AA, 0x23A9], HDW: [.75, .25, .889] },
    0x27EF: { dir: FontData_js_1.V, sizes: [.989], stretch: [0x23AB, 0x23AA, 0x23AD], HDW: [.75, .25, .889] },
    0x27F5: DELIM2190,
    0x27F6: DELIM2192,
    0x27F7: DELIM2194,
    0x27F8: DELIM21D0,
    0x27F9: DELIM21D2,
    0x27FA: DELIM21D4,
    0x27FB: DELIM21A4,
    0x27FC: DELIM21A6,
    0x27FD: DELIM2906,
    0x27FE: DELIM2907,
    0x2906: DELIM2906,
    0x2907: DELIM2907,
    0x294E: { dir: FontData_js_1.H, stretch: [0x21BC, 0x2212, 0x21C0], HDW: exports.HDW3, min: 2 },
    0x294F: { dir: FontData_js_1.V, stretch: [0x21BE, 0x23D0, 0x21C2], HDW: exports.HDW1, min: 1.776 },
    0x2950: { dir: FontData_js_1.H, stretch: [0x21BD, 0x2212, 0x21C1], HDW: exports.HDW3, min: 2 },
    0x2951: { dir: FontData_js_1.V, stretch: [0x21BF, 0x23D0, 0x21C3], HDW: exports.HDW1, min: .5 },
    0x295A: { dir: FontData_js_1.H, stretch: [0x21BC, 0x2212, 0x2223], HDW: exports.HDW3, min: 1.278 },
    0x295B: { dir: FontData_js_1.H, stretch: [0x2223, 0x2212, 0x21C0], HDW: exports.HDW3, min: 1.278 },
    0x295C: { dir: FontData_js_1.V, stretch: [0x21BE, 0x23D0, 0x22A5], HDW: exports.HDW1, min: 1.556 },
    0x295D: { dir: FontData_js_1.V, stretch: [0x22A4, 0x23D0, 0x21C2], HDW: exports.HDW1, min: 1.556 },
    0x295E: { dir: FontData_js_1.H, stretch: [0x21BD, 0x2212, 0x2223], HDW: exports.HDW3, min: 1.278 },
    0x295F: { dir: FontData_js_1.H, stretch: [0x2223, 0x2212, 0x21C1], HDW: exports.HDW3, min: 1.278 },
    0x2960: { dir: FontData_js_1.V, stretch: [0x21BF, 0x23D0, 0x22A5], HDW: exports.HDW1, min: 1.776 },
    0x2961: { dir: FontData_js_1.V, stretch: [0x22A4, 0x23D0, 0x21C3], HDW: exports.HDW1, min: 1.776 },
    0x3008: DELIM27E8,
    0x3009: DELIM27E9,
    0xFE37: DELIM23DE,
    0xFE38: DELIM23DF,
};
//# sourceMappingURL=delimiters.js.map

/***/ }),

/***/ 42206:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.doubleStruck = void 0;
exports.doubleStruck = {};
//# sourceMappingURL=double-struck.js.map

/***/ }),

/***/ 84297:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.frakturBold = void 0;
exports.frakturBold = {
    0x21: [.689, .012, .349],
    0x22: [.695, -0.432, .254],
    0x26: [.696, .016, .871],
    0x27: [.695, -0.436, .25],
    0x28: [.737, .186, .459],
    0x29: [.735, .187, .459],
    0x2A: [.692, -0.449, .328],
    0x2B: [.598, .082, .893],
    0x2C: [.107, .191, .328],
    0x2D: [.275, -0.236, .893],
    0x2E: [.102, .015, .328],
    0x2F: [.721, .182, .593],
    0x30: [.501, .012, .593],
    0x31: [.489, 0, .593],
    0x32: [.491, 0, .593],
    0x33: [.487, .193, .593],
    0x34: [.495, .196, .593],
    0x35: [.481, .19, .593],
    0x36: [.704, .012, .593],
    0x37: [.479, .197, .593],
    0x38: [.714, .005, .593],
    0x39: [.487, .195, .593],
    0x3A: [.457, .012, .255],
    0x3B: [.458, .19, .255],
    0x3D: [.343, -0.168, .582],
    0x3F: [.697, .014, .428],
    0x5B: [.74, .13, .257],
    0x5D: [.738, .132, .257],
    0x5E: [.734, -0.452, .59],
    0x2018: [.708, -0.411, .254],
    0x2019: [.692, -0.394, .254],
    0x2044: [.721, .182, .593],
    0xE301: [.63, .027, .587],
    0xE302: [.693, .212, .394, { ic: .014 }],
    0xE303: [.681, .219, .387],
    0xE304: [.473, .212, .593],
    0xE305: [.684, .027, .393],
    0xE308: [.679, .22, .981],
    0xE309: [.717, .137, .727],
};
//# sourceMappingURL=fraktur-bold.js.map

/***/ }),

/***/ 46441:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fraktur = void 0;
exports.fraktur = {
    0x21: [.689, .012, .296],
    0x22: [.695, -0.432, .215],
    0x26: [.698, .011, .738],
    0x27: [.695, -0.436, .212],
    0x28: [.737, .186, .389],
    0x29: [.735, .187, .389],
    0x2A: [.692, -0.449, .278],
    0x2B: [.598, .082, .756],
    0x2C: [.107, .191, .278],
    0x2D: [.275, -0.236, .756],
    0x2E: [.102, .015, .278],
    0x2F: [.721, .182, .502],
    0x30: [.492, .013, .502],
    0x31: [.468, 0, .502],
    0x32: [.474, 0, .502],
    0x33: [.473, .182, .502],
    0x34: [.476, .191, .502],
    0x35: [.458, .184, .502],
    0x36: [.7, .013, .502],
    0x37: [.468, .181, .502],
    0x38: [.705, .01, .502],
    0x39: [.469, .182, .502],
    0x3A: [.457, .012, .216],
    0x3B: [.458, .189, .216],
    0x3D: [.368, -0.132, .756],
    0x3F: [.693, .011, .362],
    0x5B: [.74, .13, .278],
    0x5D: [.738, .131, .278],
    0x5E: [.734, -0.452, .5],
    0x2018: [.708, -0.41, .215],
    0x2019: [.692, -0.395, .215],
    0x2044: [.721, .182, .502],
    0xE300: [.683, .032, .497],
    0xE301: [.616, .03, .498],
    0xE302: [.68, .215, .333],
    0xE303: [.679, .224, .329],
    0xE304: [.471, .214, .503],
    0xE305: [.686, .02, .333],
    0xE306: [.577, .021, .334, { ic: .013 }],
    0xE307: [.475, .022, .501, { ic: .013 }],
};
//# sourceMappingURL=fraktur.js.map

/***/ }),

/***/ 11091:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.italic = void 0;
exports.italic = {
    0x21: [.716, 0, .307, { ic: .073 }],
    0x22: [.694, -0.379, .514, { ic: .024 }],
    0x23: [.694, .194, .818, { ic: .01 }],
    0x25: [.75, .056, .818, { ic: .029 }],
    0x26: [.716, .022, .767, { ic: .035 }],
    0x27: [.694, -0.379, .307, { ic: .07 }],
    0x28: [.75, .25, .409, { ic: .108 }],
    0x29: [.75, .25, .409],
    0x2A: [.75, -0.32, .511, { ic: .073 }],
    0x2B: [.557, .057, .767],
    0x2C: [.121, .194, .307],
    0x2D: [.251, -0.18, .358],
    0x2E: [.121, 0, .307],
    0x2F: [.716, .215, .778],
    0x30: [.665, .021, .511, { ic: .051 }],
    0x31: [.666, 0, .511],
    0x32: [.666, .022, .511, { ic: .04 }],
    0x33: [.666, .022, .511, { ic: .051 }],
    0x34: [.666, .194, .511],
    0x35: [.666, .022, .511, { ic: .056 }],
    0x36: [.665, .022, .511, { ic: .054 }],
    0x37: [.666, .022, .511, { ic: .123 }],
    0x38: [.666, .021, .511, { ic: .042 }],
    0x39: [.666, .022, .511, { ic: .042 }],
    0x3A: [.431, 0, .307],
    0x3B: [.431, .194, .307],
    0x3D: [.367, -0.133, .767],
    0x3F: [.716, 0, .511, { ic: .04 }],
    0x40: [.705, .011, .767, { ic: .022 }],
    0x5B: [.75, .25, .307, { ic: .139 }],
    0x5D: [.75, .25, .307, { ic: .052 }],
    0x5E: [.694, -0.527, .511, { ic: .017 }],
    0x5F: [-0.025, .062, .511, { ic: .043 }],
    0x7E: [.318, -0.208, .511, { ic: .06 }],
    0x131: [.441, .01, .307, { ic: .033 }],
    0x237: [.442, .204, .332],
    0x300: [.697, -0.5, 0],
    0x301: [.697, -0.5, 0, { ic: .039 }],
    0x302: [.694, -0.527, 0, { ic: .017 }],
    0x303: [.668, -0.558, 0, { ic: .06 }],
    0x304: [.589, -0.544, 0, { ic: .054 }],
    0x306: [.694, -0.515, 0, { ic: .062 }],
    0x307: [.669, -0.548, 0],
    0x308: [.669, -0.554, 0, { ic: .045 }],
    0x30A: [.716, -0.542, 0],
    0x30B: [.697, -0.503, 0, { ic: .065 }],
    0x30C: [.638, -0.502, 0, { ic: .029 }],
    0x3DD: [.605, .085, .778],
    0x2013: [.285, -0.248, .511, { ic: .043 }],
    0x2014: [.285, -0.248, 1.022, { ic: .016 }],
    0x2015: [.285, -0.248, 1.022, { ic: .016 }],
    0x2017: [-0.025, .062, .511, { ic: .043 }],
    0x2018: [.694, -0.379, .307, { ic: .055 }],
    0x2019: [.694, -0.379, .307, { ic: .07 }],
    0x201C: [.694, -0.379, .514, { ic: .092 }],
    0x201D: [.694, -0.379, .514, { ic: .024 }],
    0x2044: [.716, .215, .778],
    0x210F: [.695, .013, .54, { ic: .022 }],
    0x2206: [.716, 0, .833, { sk: .167 }],
    0x29F8: [.716, .215, .778],
};
//# sourceMappingURL=italic.js.map

/***/ }),

/***/ 40123:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.largeop = void 0;
exports.largeop = {
    0x28: [1.15, .649, .597],
    0x29: [1.15, .649, .597],
    0x2F: [1.15, .649, .811],
    0x5B: [1.15, .649, .472],
    0x5C: [1.15, .649, .811],
    0x5D: [1.15, .649, .472],
    0x7B: [1.15, .649, .667],
    0x7D: [1.15, .649, .667],
    0x2C6: [.772, -0.565, 1],
    0x2DC: [.75, -0.611, 1],
    0x302: [.772, -0.565, 0],
    0x303: [.75, -0.611, 0],
    0x2016: [.602, 0, .778],
    0x2044: [1.15, .649, .811],
    0x2191: [.6, 0, .667],
    0x2193: [.6, 0, .667],
    0x21D1: [.599, 0, .778],
    0x21D3: [.6, 0, .778],
    0x220F: [.95, .45, 1.278],
    0x2210: [.95, .45, 1.278],
    0x2211: [.95, .45, 1.444],
    0x221A: [1.15, .65, 1, { ic: .02 }],
    0x2223: [.627, .015, .333],
    0x2225: [.627, .015, .556],
    0x222B: [1.36, .862, .556, { ic: .388 }],
    0x222C: [1.36, .862, 1.084, { ic: .388 }],
    0x222D: [1.36, .862, 1.592, { ic: .388 }],
    0x222E: [1.36, .862, .556, { ic: .388 }],
    0x22C0: [.95, .45, 1.111],
    0x22C1: [.95, .45, 1.111],
    0x22C2: [.949, .45, 1.111],
    0x22C3: [.95, .449, 1.111],
    0x2308: [1.15, .649, .528],
    0x2309: [1.15, .649, .528],
    0x230A: [1.15, .649, .528],
    0x230B: [1.15, .649, .528],
    0x2329: [1.15, .649, .611],
    0x232A: [1.15, .649, .611],
    0x23D0: [.602, 0, .667],
    0x2758: [.627, .015, .333],
    0x27E8: [1.15, .649, .611],
    0x27E9: [1.15, .649, .611],
    0x2A00: [.949, .449, 1.511],
    0x2A01: [.949, .449, 1.511],
    0x2A02: [.949, .449, 1.511],
    0x2A04: [.95, .449, 1.111],
    0x2A06: [.95, .45, 1.111],
    0x2A0C: [1.36, .862, 2.168, { ic: .388 }],
    0x3008: [1.15, .649, .611],
    0x3009: [1.15, .649, .611],
};
//# sourceMappingURL=largeop.js.map

/***/ }),

/***/ 61314:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.monospace = void 0;
exports.monospace = {
    0x20: [0, 0, .525],
    0x21: [.622, 0, .525],
    0x22: [.623, -0.333, .525],
    0x23: [.611, 0, .525],
    0x24: [.694, .082, .525],
    0x25: [.694, .083, .525],
    0x26: [.622, .011, .525],
    0x27: [.611, -0.287, .525],
    0x28: [.694, .082, .525],
    0x29: [.694, .082, .525],
    0x2A: [.52, -0.09, .525],
    0x2B: [.531, -0.081, .525],
    0x2C: [.14, .139, .525],
    0x2D: [.341, -0.271, .525],
    0x2E: [.14, 0, .525],
    0x2F: [.694, .083, .525],
    0x3A: [.431, 0, .525],
    0x3B: [.431, .139, .525],
    0x3C: [.557, -0.055, .525],
    0x3D: [.417, -0.195, .525],
    0x3E: [.557, -0.055, .525],
    0x3F: [.617, 0, .525],
    0x40: [.617, .006, .525],
    0x5B: [.694, .082, .525],
    0x5C: [.694, .083, .525],
    0x5D: [.694, .082, .525],
    0x5E: [.611, -0.46, .525],
    0x5F: [-0.025, .095, .525],
    0x60: [.681, -0.357, .525],
    0x7B: [.694, .083, .525],
    0x7C: [.694, .082, .525],
    0x7D: [.694, .083, .525],
    0x7E: [.611, -0.466, .525],
    0x7F: [.612, -0.519, .525],
    0xA0: [0, 0, .525],
    0x131: [.431, 0, .525],
    0x237: [.431, .228, .525],
    0x2B9: [.623, -0.334, .525],
    0x300: [.611, -0.485, 0],
    0x301: [.611, -0.485, 0],
    0x302: [.611, -0.46, 0],
    0x303: [.611, -0.466, 0],
    0x304: [.577, -0.5, 0],
    0x306: [.611, -0.504, 0],
    0x308: [.612, -0.519, 0],
    0x30A: [.619, -0.499, 0],
    0x30C: [.577, -0.449, 0],
    0x391: [.623, 0, .525],
    0x392: [.611, 0, .525],
    0x393: [.611, 0, .525],
    0x394: [.623, 0, .525],
    0x395: [.611, 0, .525],
    0x396: [.611, 0, .525],
    0x397: [.611, 0, .525],
    0x398: [.621, .01, .525],
    0x399: [.611, 0, .525],
    0x39A: [.611, 0, .525],
    0x39B: [.623, 0, .525],
    0x39C: [.611, 0, .525],
    0x39D: [.611, 0, .525],
    0x39E: [.611, 0, .525],
    0x39F: [.621, .01, .525],
    0x3A0: [.611, 0, .525],
    0x3A1: [.611, 0, .525],
    0x3A3: [.611, 0, .525],
    0x3A4: [.611, 0, .525],
    0x3A5: [.622, 0, .525],
    0x3A6: [.611, 0, .525],
    0x3A7: [.611, 0, .525],
    0x3A8: [.611, 0, .525],
    0x3A9: [.622, 0, .525],
    0x2017: [-0.025, .095, .525],
    0x2032: [.623, -0.334, .525],
    0x2033: [.623, 0, 1.05],
    0x2034: [.623, 0, 1.575],
    0x2044: [.694, .083, .525],
    0x2057: [.623, 0, 2.1],
    0x2206: [.623, 0, .525],
};
//# sourceMappingURL=monospace.js.map

/***/ }),

/***/ 22785:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.normal = void 0;
exports.normal = {
    0x20: [0, 0, .25],
    0x21: [.716, 0, .278],
    0x22: [.694, -0.379, .5],
    0x23: [.694, .194, .833],
    0x24: [.75, .056, .5],
    0x25: [.75, .056, .833],
    0x26: [.716, .022, .778],
    0x27: [.694, -0.379, .278],
    0x28: [.75, .25, .389],
    0x29: [.75, .25, .389],
    0x2A: [.75, -0.32, .5],
    0x2B: [.583, .082, .778],
    0x2C: [.121, .194, .278],
    0x2D: [.252, -0.179, .333],
    0x2E: [.12, 0, .278],
    0x2F: [.75, .25, .5],
    0x30: [.666, .022, .5],
    0x31: [.666, 0, .5],
    0x32: [.666, 0, .5],
    0x33: [.665, .022, .5],
    0x34: [.677, 0, .5],
    0x35: [.666, .022, .5],
    0x36: [.666, .022, .5],
    0x37: [.676, .022, .5],
    0x38: [.666, .022, .5],
    0x39: [.666, .022, .5],
    0x3A: [.43, 0, .278],
    0x3B: [.43, .194, .278],
    0x3C: [.54, .04, .778],
    0x3D: [.583, .082, .778],
    0x3E: [.54, .04, .778],
    0x3F: [.705, 0, .472],
    0x40: [.705, .011, .778],
    0x41: [.716, 0, .75],
    0x42: [.683, 0, .708],
    0x43: [.705, .021, .722],
    0x44: [.683, 0, .764],
    0x45: [.68, 0, .681],
    0x46: [.68, 0, .653],
    0x47: [.705, .022, .785],
    0x48: [.683, 0, .75],
    0x49: [.683, 0, .361],
    0x4A: [.683, .022, .514],
    0x4B: [.683, 0, .778],
    0x4C: [.683, 0, .625],
    0x4D: [.683, 0, .917],
    0x4E: [.683, 0, .75],
    0x4F: [.705, .022, .778],
    0x50: [.683, 0, .681],
    0x51: [.705, .193, .778],
    0x52: [.683, .022, .736],
    0x53: [.705, .022, .556],
    0x54: [.677, 0, .722],
    0x55: [.683, .022, .75],
    0x56: [.683, .022, .75],
    0x57: [.683, .022, 1.028],
    0x58: [.683, 0, .75],
    0x59: [.683, 0, .75],
    0x5A: [.683, 0, .611],
    0x5B: [.75, .25, .278],
    0x5C: [.75, .25, .5],
    0x5D: [.75, .25, .278],
    0x5E: [.694, -0.531, .5],
    0x5F: [-0.025, .062, .5],
    0x60: [.699, -0.505, .5],
    0x61: [.448, .011, .5],
    0x62: [.694, .011, .556],
    0x63: [.448, .011, .444],
    0x64: [.694, .011, .556],
    0x65: [.448, .011, .444],
    0x66: [.705, 0, .306, { ic: .066 }],
    0x67: [.453, .206, .5],
    0x68: [.694, 0, .556],
    0x69: [.669, 0, .278],
    0x6A: [.669, .205, .306],
    0x6B: [.694, 0, .528],
    0x6C: [.694, 0, .278],
    0x6D: [.442, 0, .833],
    0x6E: [.442, 0, .556],
    0x6F: [.448, .01, .5],
    0x70: [.442, .194, .556],
    0x71: [.442, .194, .528],
    0x72: [.442, 0, .392],
    0x73: [.448, .011, .394],
    0x74: [.615, .01, .389],
    0x75: [.442, .011, .556],
    0x76: [.431, .011, .528],
    0x77: [.431, .011, .722],
    0x78: [.431, 0, .528],
    0x79: [.431, .204, .528],
    0x7A: [.431, 0, .444],
    0x7B: [.75, .25, .5],
    0x7C: [.75, .249, .278],
    0x7D: [.75, .25, .5],
    0x7E: [.318, -0.215, .5],
    0xA0: [0, 0, .25],
    0xA3: [.714, .011, .769],
    0xA5: [.683, 0, .75],
    0xA8: [.669, -0.554, .5],
    0xAC: [.356, -0.089, .667],
    0xAE: [.709, .175, .947],
    0xAF: [.59, -0.544, .5],
    0xB0: [.715, -0.542, .5],
    0xB1: [.666, 0, .778],
    0xB4: [.699, -0.505, .5],
    0xB7: [.31, -0.19, .278],
    0xD7: [.491, -0.009, .778],
    0xF0: [.749, .021, .556],
    0xF7: [.537, .036, .778],
    0x131: [.442, 0, .278, { sk: .0278 }],
    0x237: [.442, .205, .306, { sk: .0833 }],
    0x2B9: [.56, -0.043, .275],
    0x2C6: [.694, -0.531, .5],
    0x2C7: [.644, -0.513, .5],
    0x2C9: [.59, -0.544, .5],
    0x2CA: [.699, -0.505, .5],
    0x2CB: [.699, -0.505, .5],
    0x2D8: [.694, -0.515, .5],
    0x2D9: [.669, -0.549, .5],
    0x2DA: [.715, -0.542, .5],
    0x2DC: [.668, -0.565, .5],
    0x300: [.699, -0.505, 0],
    0x301: [.699, -0.505, 0],
    0x302: [.694, -0.531, 0],
    0x303: [.668, -0.565, 0],
    0x304: [.59, -0.544, 0],
    0x306: [.694, -0.515, 0],
    0x307: [.669, -0.549, 0],
    0x308: [.669, -0.554, 0],
    0x30A: [.715, -0.542, 0],
    0x30B: [.701, -0.51, 0],
    0x30C: [.644, -0.513, 0],
    0x338: [.716, .215, 0],
    0x391: [.716, 0, .75],
    0x392: [.683, 0, .708],
    0x393: [.68, 0, .625],
    0x394: [.716, 0, .833],
    0x395: [.68, 0, .681],
    0x396: [.683, 0, .611],
    0x397: [.683, 0, .75],
    0x398: [.705, .022, .778],
    0x399: [.683, 0, .361],
    0x39A: [.683, 0, .778],
    0x39B: [.716, 0, .694],
    0x39C: [.683, 0, .917],
    0x39D: [.683, 0, .75],
    0x39E: [.677, 0, .667],
    0x39F: [.705, .022, .778],
    0x3A0: [.68, 0, .75],
    0x3A1: [.683, 0, .681],
    0x3A3: [.683, 0, .722],
    0x3A4: [.677, 0, .722],
    0x3A5: [.705, 0, .778],
    0x3A6: [.683, 0, .722],
    0x3A7: [.683, 0, .75],
    0x3A8: [.683, 0, .778],
    0x3A9: [.704, 0, .722],
    0x2000: [0, 0, .5],
    0x2001: [0, 0, 1],
    0x2002: [0, 0, .5],
    0x2003: [0, 0, 1],
    0x2004: [0, 0, .333],
    0x2005: [0, 0, .25],
    0x2006: [0, 0, .167],
    0x2009: [0, 0, .167],
    0x200A: [0, 0, .1],
    0x200B: [0, 0, 0],
    0x200C: [0, 0, 0],
    0x2013: [.285, -0.248, .5],
    0x2014: [.285, -0.248, 1],
    0x2015: [.285, -0.248, 1],
    0x2016: [.75, .25, .5],
    0x2017: [-0.025, .062, .5],
    0x2018: [.694, -0.379, .278],
    0x2019: [.694, -0.379, .278],
    0x201C: [.694, -0.379, .5],
    0x201D: [.694, -0.379, .5],
    0x2020: [.705, .216, .444],
    0x2021: [.705, .205, .444],
    0x2022: [.444, -0.055, .5],
    0x2026: [.12, 0, 1.172],
    0x2032: [.56, -0.043, .275],
    0x2033: [.56, 0, .55],
    0x2034: [.56, 0, .825],
    0x2035: [.56, -0.043, .275],
    0x2036: [.56, 0, .55],
    0x2037: [.56, 0, .825],
    0x203E: [.59, -0.544, .5],
    0x2044: [.75, .25, .5],
    0x2057: [.56, 0, 1.1],
    0x2060: [0, 0, 0],
    0x2061: [0, 0, 0],
    0x2062: [0, 0, 0],
    0x2063: [0, 0, 0],
    0x2064: [0, 0, 0],
    0x20D7: [.714, -0.516, .5],
    0x2102: [.702, .019, .722],
    0x210B: [.717, .036, .969, { ic: .272, sk: .333 }],
    0x210C: [.666, .133, .72],
    0x210D: [.683, 0, .778],
    0x210E: [.694, .011, .576, { sk: -0.0278 }],
    0x210F: [.695, .013, .54, { ic: .022 }],
    0x2110: [.717, .017, .809, { ic: .137, sk: .333 }],
    0x2111: [.686, .026, .554],
    0x2112: [.717, .017, .874, { ic: .161, sk: .306 }],
    0x2113: [.705, .02, .417, { sk: .111 }],
    0x2115: [.683, .02, .722],
    0x2118: [.453, .216, .636, { sk: .111 }],
    0x2119: [.683, 0, .611],
    0x211A: [.701, .181, .778],
    0x211B: [.717, .017, .85, { ic: .037, sk: .194 }],
    0x211C: [.686, .026, .828],
    0x211D: [.683, 0, .722],
    0x2124: [.683, 0, .667],
    0x2126: [.704, 0, .722],
    0x2127: [.684, .022, .722],
    0x2128: [.729, .139, .602],
    0x212C: [.708, .028, .908, { ic: .02, sk: .194 }],
    0x212D: [.685, .024, .613],
    0x2130: [.707, .008, .562, { ic: .156, sk: .139 }],
    0x2131: [.735, .036, .895, { ic: .095, sk: .222 }],
    0x2132: [.695, 0, .556],
    0x2133: [.721, .05, 1.08, { ic: .136, sk: .444 }],
    0x2135: [.694, 0, .611],
    0x2136: [.763, .021, .667, { ic: .02 }],
    0x2137: [.764, .043, .444],
    0x2138: [.764, .043, .667],
    0x2141: [.705, .023, .639],
    0x2190: [.511, .011, 1],
    0x2191: [.694, .193, .5],
    0x2192: [.511, .011, 1],
    0x2193: [.694, .194, .5],
    0x2194: [.511, .011, 1],
    0x2195: [.772, .272, .5],
    0x2196: [.72, .195, 1],
    0x2197: [.72, .195, 1],
    0x2198: [.695, .22, 1],
    0x2199: [.695, .22, 1],
    0x219A: [.437, -0.06, 1],
    0x219B: [.437, -0.06, 1],
    0x219E: [.417, -0.083, 1],
    0x21A0: [.417, -0.083, 1],
    0x21A2: [.417, -0.083, 1.111],
    0x21A3: [.417, -0.083, 1.111],
    0x21A6: [.511, .011, 1],
    0x21A9: [.511, .011, 1.126],
    0x21AA: [.511, .011, 1.126],
    0x21AB: [.575, .041, 1],
    0x21AC: [.575, .041, 1],
    0x21AD: [.417, -0.083, 1.389],
    0x21AE: [.437, -0.06, 1],
    0x21B0: [.722, 0, .5],
    0x21B1: [.722, 0, .5],
    0x21B6: [.461, 0, 1],
    0x21B7: [.46, 0, 1],
    0x21BA: [.65, .083, .778],
    0x21BB: [.65, .083, .778],
    0x21BC: [.511, -0.23, 1],
    0x21BD: [.27, .011, 1],
    0x21BE: [.694, .194, .417],
    0x21BF: [.694, .194, .417],
    0x21C0: [.511, -0.23, 1],
    0x21C1: [.27, .011, 1],
    0x21C2: [.694, .194, .417],
    0x21C3: [.694, .194, .417],
    0x21C4: [.667, 0, 1],
    0x21C6: [.667, 0, 1],
    0x21C7: [.583, .083, 1],
    0x21C8: [.694, .193, .833],
    0x21C9: [.583, .083, 1],
    0x21CA: [.694, .194, .833],
    0x21CB: [.514, .014, 1],
    0x21CC: [.671, .011, 1],
    0x21CD: [.534, .035, 1],
    0x21CE: [.534, .037, 1],
    0x21CF: [.534, .035, 1],
    0x21D0: [.525, .024, 1],
    0x21D1: [.694, .194, .611],
    0x21D2: [.525, .024, 1],
    0x21D3: [.694, .194, .611],
    0x21D4: [.526, .025, 1],
    0x21D5: [.772, .272, .611],
    0x21DA: [.611, .111, 1],
    0x21DB: [.611, .111, 1],
    0x21DD: [.417, -0.083, 1],
    0x21E0: [.437, -0.064, 1.334],
    0x21E2: [.437, -0.064, 1.334],
    0x2200: [.694, .022, .556],
    0x2201: [.846, .021, .5],
    0x2202: [.715, .022, .531, { ic: .035, sk: .0833 }],
    0x2203: [.694, 0, .556],
    0x2204: [.716, .215, .556],
    0x2205: [.772, .078, .5],
    0x2206: [.716, 0, .833],
    0x2207: [.683, .033, .833],
    0x2208: [.54, .04, .667],
    0x2209: [.716, .215, .667],
    0x220B: [.54, .04, .667],
    0x220C: [.716, .215, .667],
    0x220D: [.44, 0, .429, { ic: .027 }],
    0x220F: [.75, .25, .944],
    0x2210: [.75, .25, .944],
    0x2211: [.75, .25, 1.056],
    0x2212: [.583, .082, .778],
    0x2213: [.5, .166, .778],
    0x2214: [.766, .093, .778],
    0x2215: [.75, .25, .5],
    0x2216: [.75, .25, .5],
    0x2217: [.465, -0.035, .5],
    0x2218: [.444, -0.055, .5],
    0x2219: [.444, -0.055, .5],
    0x221A: [.8, .2, .833, { ic: .02 }],
    0x221D: [.442, .011, .778],
    0x221E: [.442, .011, 1],
    0x2220: [.694, 0, .722],
    0x2221: [.714, .02, .722],
    0x2222: [.551, .051, .722],
    0x2223: [.75, .249, .278],
    0x2224: [.75, .252, .278, { ic: .019 }],
    0x2225: [.75, .25, .5],
    0x2226: [.75, .25, .5, { ic: .018 }],
    0x2227: [.598, .022, .667],
    0x2228: [.598, .022, .667],
    0x2229: [.598, .022, .667],
    0x222A: [.598, .022, .667],
    0x222B: [.716, .216, .417, { ic: .055 }],
    0x222C: [.805, .306, .819, { ic: .138 }],
    0x222D: [.805, .306, 1.166, { ic: .138 }],
    0x222E: [.805, .306, .472, { ic: .138 }],
    0x2234: [.471, .082, .667],
    0x2235: [.471, .082, .667],
    0x223C: [.367, -0.133, .778],
    0x223D: [.367, -0.133, .778],
    0x2240: [.583, .083, .278],
    0x2241: [.467, -0.032, .778],
    0x2242: [.463, -0.034, .778],
    0x2243: [.464, -0.036, .778],
    0x2244: [.716, .215, .778],
    0x2245: [.589, -0.022, .778],
    0x2247: [.652, .155, .778],
    0x2248: [.483, -0.055, .778],
    0x2249: [.716, .215, .778],
    0x224A: [.579, .039, .778],
    0x224D: [.484, -0.016, .778],
    0x224E: [.492, -0.008, .778],
    0x224F: [.492, -0.133, .778],
    0x2250: [.67, -0.133, .778],
    0x2251: [.609, .108, .778],
    0x2252: [.601, .101, .778],
    0x2253: [.601, .102, .778],
    0x2256: [.367, -0.133, .778],
    0x2257: [.721, -0.133, .778],
    0x225C: [.859, -0.133, .778],
    0x2260: [.716, .215, .778],
    0x2261: [.464, -0.036, .778],
    0x2262: [.716, .215, .778],
    0x2264: [.636, .138, .778],
    0x2265: [.636, .138, .778],
    0x2266: [.753, .175, .778],
    0x2267: [.753, .175, .778],
    0x2268: [.752, .286, .778],
    0x2269: [.752, .286, .778],
    0x226A: [.568, .067, 1],
    0x226B: [.567, .067, 1],
    0x226C: [.75, .25, .5],
    0x226D: [.716, .215, .778],
    0x226E: [.708, .209, .778],
    0x226F: [.708, .209, .778],
    0x2270: [.801, .303, .778],
    0x2271: [.801, .303, .778],
    0x2272: [.732, .228, .778],
    0x2273: [.732, .228, .778],
    0x2274: [.732, .228, .778],
    0x2275: [.732, .228, .778],
    0x2276: [.681, .253, .778],
    0x2277: [.681, .253, .778],
    0x2278: [.716, .253, .778],
    0x2279: [.716, .253, .778],
    0x227A: [.539, .041, .778],
    0x227B: [.539, .041, .778],
    0x227C: [.58, .153, .778],
    0x227D: [.58, .154, .778],
    0x227E: [.732, .228, .778],
    0x227F: [.732, .228, .778],
    0x2280: [.705, .208, .778],
    0x2281: [.705, .208, .778],
    0x2282: [.54, .04, .778],
    0x2283: [.54, .04, .778],
    0x2284: [.716, .215, .778],
    0x2285: [.716, .215, .778],
    0x2286: [.636, .138, .778],
    0x2287: [.636, .138, .778],
    0x2288: [.801, .303, .778],
    0x2289: [.801, .303, .778],
    0x228A: [.635, .241, .778],
    0x228B: [.635, .241, .778],
    0x228E: [.598, .022, .667],
    0x228F: [.539, .041, .778],
    0x2290: [.539, .041, .778],
    0x2291: [.636, .138, .778],
    0x2292: [.636, .138, .778],
    0x2293: [.598, 0, .667],
    0x2294: [.598, 0, .667],
    0x2295: [.583, .083, .778],
    0x2296: [.583, .083, .778],
    0x2297: [.583, .083, .778],
    0x2298: [.583, .083, .778],
    0x2299: [.583, .083, .778],
    0x229A: [.582, .082, .778],
    0x229B: [.582, .082, .778],
    0x229D: [.582, .082, .778],
    0x229E: [.689, 0, .778],
    0x229F: [.689, 0, .778],
    0x22A0: [.689, 0, .778],
    0x22A1: [.689, 0, .778],
    0x22A2: [.694, 0, .611],
    0x22A3: [.694, 0, .611],
    0x22A4: [.668, 0, .778],
    0x22A5: [.668, 0, .778],
    0x22A8: [.75, .249, .867],
    0x22A9: [.694, 0, .722],
    0x22AA: [.694, 0, .889],
    0x22AC: [.695, 0, .611],
    0x22AD: [.695, 0, .611],
    0x22AE: [.695, 0, .722],
    0x22AF: [.695, 0, .722],
    0x22B2: [.539, .041, .778],
    0x22B3: [.539, .041, .778],
    0x22B4: [.636, .138, .778],
    0x22B5: [.636, .138, .778],
    0x22B8: [.408, -0.092, 1.111],
    0x22BA: [.431, .212, .556],
    0x22BB: [.716, 0, .611],
    0x22BC: [.716, 0, .611],
    0x22C0: [.75, .249, .833],
    0x22C1: [.75, .249, .833],
    0x22C2: [.75, .249, .833],
    0x22C3: [.75, .249, .833],
    0x22C4: [.488, -0.012, .5],
    0x22C5: [.31, -0.19, .278],
    0x22C6: [.486, -0.016, .5],
    0x22C7: [.545, .044, .778],
    0x22C8: [.505, .005, .9],
    0x22C9: [.492, -0.008, .778],
    0x22CA: [.492, -0.008, .778],
    0x22CB: [.694, .022, .778],
    0x22CC: [.694, .022, .778],
    0x22CD: [.464, -0.036, .778],
    0x22CE: [.578, .021, .76],
    0x22CF: [.578, .022, .76],
    0x22D0: [.54, .04, .778],
    0x22D1: [.54, .04, .778],
    0x22D2: [.598, .022, .667],
    0x22D3: [.598, .022, .667],
    0x22D4: [.736, .022, .667],
    0x22D6: [.541, .041, .778],
    0x22D7: [.541, .041, .778],
    0x22D8: [.568, .067, 1.333],
    0x22D9: [.568, .067, 1.333],
    0x22DA: [.886, .386, .778],
    0x22DB: [.886, .386, .778],
    0x22DE: [.734, 0, .778],
    0x22DF: [.734, 0, .778],
    0x22E0: [.801, .303, .778],
    0x22E1: [.801, .303, .778],
    0x22E2: [.716, .215, .778],
    0x22E3: [.716, .215, .778],
    0x22E6: [.73, .359, .778],
    0x22E7: [.73, .359, .778],
    0x22E8: [.73, .359, .778],
    0x22E9: [.73, .359, .778],
    0x22EA: [.706, .208, .778],
    0x22EB: [.706, .208, .778],
    0x22EC: [.802, .303, .778],
    0x22ED: [.801, .303, .778],
    0x22EE: [1.3, .03, .278],
    0x22EF: [.31, -0.19, 1.172],
    0x22F1: [1.52, -0.1, 1.282],
    0x2305: [.716, 0, .611],
    0x2306: [.813, .097, .611],
    0x2308: [.75, .25, .444],
    0x2309: [.75, .25, .444],
    0x230A: [.75, .25, .444],
    0x230B: [.75, .25, .444],
    0x231C: [.694, -0.306, .5],
    0x231D: [.694, -0.306, .5],
    0x231E: [.366, .022, .5],
    0x231F: [.366, .022, .5],
    0x2322: [.388, -0.122, 1],
    0x2323: [.378, -0.134, 1],
    0x2329: [.75, .25, .389],
    0x232A: [.75, .25, .389],
    0x23B0: [.744, .244, .412],
    0x23B1: [.744, .244, .412],
    0x23D0: [.602, 0, .667],
    0x24C8: [.709, .175, .902],
    0x250C: [.694, -0.306, .5],
    0x2510: [.694, -0.306, .5],
    0x2514: [.366, .022, .5],
    0x2518: [.366, .022, .5],
    0x2571: [.694, .195, .889],
    0x2572: [.694, .195, .889],
    0x25A0: [.689, 0, .778],
    0x25A1: [.689, 0, .778],
    0x25AA: [.689, 0, .778],
    0x25B2: [.575, .02, .722],
    0x25B3: [.716, 0, .889],
    0x25B4: [.575, .02, .722],
    0x25B5: [.716, 0, .889],
    0x25B6: [.539, .041, .778],
    0x25B8: [.539, .041, .778],
    0x25B9: [.505, .005, .5],
    0x25BC: [.576, .019, .722],
    0x25BD: [.5, .215, .889],
    0x25BE: [.576, .019, .722],
    0x25BF: [.5, .215, .889],
    0x25C0: [.539, .041, .778],
    0x25C2: [.539, .041, .778],
    0x25C3: [.505, .005, .5],
    0x25CA: [.716, .132, .667],
    0x25EF: [.715, .215, 1],
    0x25FB: [.689, 0, .778],
    0x25FC: [.689, 0, .778],
    0x2605: [.694, .111, .944],
    0x2660: [.727, .13, .778],
    0x2661: [.716, .033, .778],
    0x2662: [.727, .162, .778],
    0x2663: [.726, .13, .778],
    0x266D: [.75, .022, .389],
    0x266E: [.734, .223, .389],
    0x266F: [.723, .223, .389],
    0x2713: [.706, .034, .833],
    0x2720: [.716, .022, .833],
    0x2758: [.75, .249, .278],
    0x27E8: [.75, .25, .389],
    0x27E9: [.75, .25, .389],
    0x27EE: [.744, .244, .412],
    0x27EF: [.744, .244, .412],
    0x27F5: [.511, .011, 1.609],
    0x27F6: [.511, .011, 1.638],
    0x27F7: [.511, .011, 1.859],
    0x27F8: [.525, .024, 1.609],
    0x27F9: [.525, .024, 1.638],
    0x27FA: [.525, .024, 1.858],
    0x27FC: [.511, .011, 1.638],
    0x29EB: [.716, .132, .667],
    0x29F8: [.716, .215, .778],
    0x2A00: [.75, .25, 1.111],
    0x2A01: [.75, .25, 1.111],
    0x2A02: [.75, .25, 1.111],
    0x2A04: [.75, .249, .833],
    0x2A06: [.75, .249, .833],
    0x2A0C: [.805, .306, 1.638, { ic: .138 }],
    0x2A2F: [.491, -0.009, .778],
    0x2A3F: [.683, 0, .75],
    0x2A5E: [.813, .097, .611],
    0x2A7D: [.636, .138, .778],
    0x2A7E: [.636, .138, .778],
    0x2A85: [.762, .29, .778],
    0x2A86: [.762, .29, .778],
    0x2A87: [.635, .241, .778],
    0x2A88: [.635, .241, .778],
    0x2A89: [.761, .387, .778],
    0x2A8A: [.761, .387, .778],
    0x2A8B: [1.003, .463, .778],
    0x2A8C: [1.003, .463, .778],
    0x2A95: [.636, .138, .778],
    0x2A96: [.636, .138, .778],
    0x2AAF: [.636, .138, .778],
    0x2AB0: [.636, .138, .778],
    0x2AB5: [.752, .286, .778],
    0x2AB6: [.752, .286, .778],
    0x2AB7: [.761, .294, .778],
    0x2AB8: [.761, .294, .778],
    0x2AB9: [.761, .337, .778],
    0x2ABA: [.761, .337, .778],
    0x2AC5: [.753, .215, .778],
    0x2AC6: [.753, .215, .778],
    0x2ACB: [.783, .385, .778],
    0x2ACC: [.783, .385, .778],
    0x3008: [.75, .25, .389],
    0x3009: [.75, .25, .389],
    0xE006: [.43, .023, .222, { ic: .018 }],
    0xE007: [.431, .024, .389, { ic: .018 }],
    0xE008: [.605, .085, .778],
    0xE009: [.434, .006, .667, { ic: .067 }],
    0xE00C: [.752, .284, .778],
    0xE00D: [.752, .284, .778],
    0xE00E: [.919, .421, .778],
    0xE00F: [.801, .303, .778],
    0xE010: [.801, .303, .778],
    0xE011: [.919, .421, .778],
    0xE016: [.828, .33, .778],
    0xE017: [.752, .332, .778],
    0xE018: [.828, .33, .778],
    0xE019: [.752, .333, .778],
    0xE01A: [.634, .255, .778],
    0xE01B: [.634, .254, .778],
    0x1D400: [.698, 0, .869],
    0x1D401: [.686, 0, .818],
    0x1D402: [.697, .011, .831],
    0x1D403: [.686, 0, .882],
    0x1D404: [.68, 0, .756],
    0x1D405: [.68, 0, .724],
    0x1D406: [.697, .01, .904],
    0x1D407: [.686, 0, .9],
    0x1D408: [.686, 0, .436],
    0x1D409: [.686, .011, .594],
    0x1D40A: [.686, 0, .901],
    0x1D40B: [.686, 0, .692],
    0x1D40C: [.686, 0, 1.092],
    0x1D40D: [.686, 0, .9],
    0x1D40E: [.696, .01, .864],
    0x1D40F: [.686, 0, .786],
    0x1D410: [.696, .193, .864],
    0x1D411: [.686, .011, .862],
    0x1D412: [.697, .011, .639],
    0x1D413: [.675, 0, .8],
    0x1D414: [.686, .011, .885],
    0x1D415: [.686, .007, .869],
    0x1D416: [.686, .007, 1.189],
    0x1D417: [.686, 0, .869],
    0x1D418: [.686, 0, .869],
    0x1D419: [.686, 0, .703],
    0x1D41A: [.453, .006, .559],
    0x1D41B: [.694, .006, .639],
    0x1D41C: [.453, .006, .511],
    0x1D41D: [.694, .006, .639],
    0x1D41E: [.452, .006, .527],
    0x1D41F: [.7, 0, .351, { ic: .101 }],
    0x1D420: [.455, .201, .575],
    0x1D421: [.694, 0, .639],
    0x1D422: [.695, 0, .319],
    0x1D423: [.695, .2, .351],
    0x1D424: [.694, 0, .607],
    0x1D425: [.694, 0, .319],
    0x1D426: [.45, 0, .958],
    0x1D427: [.45, 0, .639],
    0x1D428: [.452, .005, .575],
    0x1D429: [.45, .194, .639],
    0x1D42A: [.45, .194, .607],
    0x1D42B: [.45, 0, .474],
    0x1D42C: [.453, .006, .454],
    0x1D42D: [.635, .005, .447],
    0x1D42E: [.45, .006, .639],
    0x1D42F: [.444, 0, .607],
    0x1D430: [.444, 0, .831],
    0x1D431: [.444, 0, .607],
    0x1D432: [.444, .2, .607],
    0x1D433: [.444, 0, .511],
    0x1D434: [.716, 0, .75, { sk: .139 }],
    0x1D435: [.683, 0, .759, { sk: .0833 }],
    0x1D436: [.705, .022, .715, { ic: .045, sk: .0833 }],
    0x1D437: [.683, 0, .828, { sk: .0556 }],
    0x1D438: [.68, 0, .738, { ic: .026, sk: .0833 }],
    0x1D439: [.68, 0, .643, { ic: .106, sk: .0833 }],
    0x1D43A: [.705, .022, .786, { sk: .0833 }],
    0x1D43B: [.683, 0, .831, { ic: .057, sk: .0556 }],
    0x1D43C: [.683, 0, .44, { ic: .064, sk: .111 }],
    0x1D43D: [.683, .022, .555, { ic: .078, sk: .167 }],
    0x1D43E: [.683, 0, .849, { ic: .04, sk: .0556 }],
    0x1D43F: [.683, 0, .681, { sk: .0278 }],
    0x1D440: [.683, 0, .97, { ic: .081, sk: .0833 }],
    0x1D441: [.683, 0, .803, { ic: .085, sk: .0833 }],
    0x1D442: [.704, .022, .763, { sk: .0833 }],
    0x1D443: [.683, 0, .642, { ic: .109, sk: .0833 }],
    0x1D444: [.704, .194, .791, { sk: .0833 }],
    0x1D445: [.683, .021, .759, { sk: .0833 }],
    0x1D446: [.705, .022, .613, { ic: .032, sk: .0833 }],
    0x1D447: [.677, 0, .584, { ic: .12, sk: .0833 }],
    0x1D448: [.683, .022, .683, { ic: .084, sk: .0278 }],
    0x1D449: [.683, .022, .583, { ic: .186 }],
    0x1D44A: [.683, .022, .944, { ic: .104 }],
    0x1D44B: [.683, 0, .828, { ic: .024, sk: .0833 }],
    0x1D44C: [.683, 0, .581, { ic: .182 }],
    0x1D44D: [.683, 0, .683, { ic: .04, sk: .0833 }],
    0x1D44E: [.441, .01, .529],
    0x1D44F: [.694, .011, .429],
    0x1D450: [.442, .011, .433, { sk: .0556 }],
    0x1D451: [.694, .01, .52, { sk: .167 }],
    0x1D452: [.442, .011, .466, { sk: .0556 }],
    0x1D453: [.705, .205, .49, { ic: .06, sk: .167 }],
    0x1D454: [.442, .205, .477, { sk: .0278 }],
    0x1D456: [.661, .011, .345],
    0x1D457: [.661, .204, .412],
    0x1D458: [.694, .011, .521],
    0x1D459: [.694, .011, .298, { sk: .0833 }],
    0x1D45A: [.442, .011, .878],
    0x1D45B: [.442, .011, .6],
    0x1D45C: [.441, .011, .485, { sk: .0556 }],
    0x1D45D: [.442, .194, .503, { sk: .0833 }],
    0x1D45E: [.442, .194, .446, { ic: .014, sk: .0833 }],
    0x1D45F: [.442, .011, .451, { sk: .0556 }],
    0x1D460: [.442, .01, .469, { sk: .0556 }],
    0x1D461: [.626, .011, .361, { sk: .0833 }],
    0x1D462: [.442, .011, .572, { sk: .0278 }],
    0x1D463: [.443, .011, .485, { sk: .0278 }],
    0x1D464: [.443, .011, .716, { sk: .0833 }],
    0x1D465: [.442, .011, .572, { sk: .0278 }],
    0x1D466: [.442, .205, .49, { sk: .0556 }],
    0x1D467: [.442, .011, .465, { sk: .0556 }],
    0x1D468: [.711, 0, .869, { sk: .16 }],
    0x1D469: [.686, 0, .866, { sk: .0958 }],
    0x1D46A: [.703, .017, .817, { ic: .038, sk: .0958 }],
    0x1D46B: [.686, 0, .938, { sk: .0639 }],
    0x1D46C: [.68, 0, .81, { ic: .015, sk: .0958 }],
    0x1D46D: [.68, 0, .689, { ic: .12, sk: .0958 }],
    0x1D46E: [.703, .016, .887, { sk: .0958 }],
    0x1D46F: [.686, 0, .982, { ic: .045, sk: .0639 }],
    0x1D470: [.686, 0, .511, { ic: .062, sk: .128 }],
    0x1D471: [.686, .017, .631, { ic: .063, sk: .192 }],
    0x1D472: [.686, 0, .971, { ic: .032, sk: .0639 }],
    0x1D473: [.686, 0, .756, { sk: .0319 }],
    0x1D474: [.686, 0, 1.142, { ic: .077, sk: .0958 }],
    0x1D475: [.686, 0, .95, { ic: .077, sk: .0958 }],
    0x1D476: [.703, .017, .837, { sk: .0958 }],
    0x1D477: [.686, 0, .723, { ic: .124, sk: .0958 }],
    0x1D478: [.703, .194, .869, { sk: .0958 }],
    0x1D479: [.686, .017, .872, { sk: .0958 }],
    0x1D47A: [.703, .017, .693, { ic: .021, sk: .0958 }],
    0x1D47B: [.675, 0, .637, { ic: .135, sk: .0958 }],
    0x1D47C: [.686, .016, .8, { ic: .077, sk: .0319 }],
    0x1D47D: [.686, .016, .678, { ic: .208 }],
    0x1D47E: [.686, .017, 1.093, { ic: .114 }],
    0x1D47F: [.686, 0, .947, { sk: .0958 }],
    0x1D480: [.686, 0, .675, { ic: .201 }],
    0x1D481: [.686, 0, .773, { ic: .032, sk: .0958 }],
    0x1D482: [.452, .008, .633],
    0x1D483: [.694, .008, .521],
    0x1D484: [.451, .008, .513, { sk: .0639 }],
    0x1D485: [.694, .008, .61, { sk: .192 }],
    0x1D486: [.452, .008, .554, { sk: .0639 }],
    0x1D487: [.701, .201, .568, { ic: .056, sk: .192 }],
    0x1D488: [.452, .202, .545, { sk: .0319 }],
    0x1D489: [.694, .008, .668, { sk: -0.0319 }],
    0x1D48A: [.694, .008, .405],
    0x1D48B: [.694, .202, .471],
    0x1D48C: [.694, .008, .604],
    0x1D48D: [.694, .008, .348, { sk: .0958 }],
    0x1D48E: [.452, .008, 1.032],
    0x1D48F: [.452, .008, .713],
    0x1D490: [.452, .008, .585, { sk: .0639 }],
    0x1D491: [.452, .194, .601, { sk: .0958 }],
    0x1D492: [.452, .194, .542, { sk: .0958 }],
    0x1D493: [.452, .008, .529, { sk: .0639 }],
    0x1D494: [.451, .008, .531, { sk: .0639 }],
    0x1D495: [.643, .007, .415, { sk: .0958 }],
    0x1D496: [.452, .008, .681, { sk: .0319 }],
    0x1D497: [.453, .008, .567, { sk: .0319 }],
    0x1D498: [.453, .008, .831, { sk: .0958 }],
    0x1D499: [.452, .008, .659, { sk: .0319 }],
    0x1D49A: [.452, .202, .59, { sk: .0639 }],
    0x1D49B: [.452, .008, .555, { sk: .0639 }],
    0x1D49C: [.717, .008, .803, { ic: .213, sk: .389 }],
    0x1D49E: [.728, .026, .666, { ic: .153, sk: .278 }],
    0x1D49F: [.708, .031, .774, { ic: .081, sk: .111 }],
    0x1D4A2: [.717, .037, .61, { ic: .128, sk: .25 }],
    0x1D4A5: [.717, .314, 1.052, { ic: .081, sk: .417 }],
    0x1D4A6: [.717, .037, .914, { ic: .29, sk: .361 }],
    0x1D4A9: [.726, .036, .902, { ic: .306, sk: .389 }],
    0x1D4AA: [.707, .008, .738, { ic: .067, sk: .167 }],
    0x1D4AB: [.716, .037, 1.013, { ic: .018, sk: .222 }],
    0x1D4AC: [.717, .017, .883, { sk: .278 }],
    0x1D4AE: [.708, .036, .868, { ic: .148, sk: .333 }],
    0x1D4AF: [.735, .037, .747, { ic: .249, sk: .222 }],
    0x1D4B0: [.717, .017, .8, { ic: .16, sk: .25 }],
    0x1D4B1: [.717, .017, .622, { ic: .228, sk: .222 }],
    0x1D4B2: [.717, .017, .805, { ic: .221, sk: .25 }],
    0x1D4B3: [.717, .017, .944, { ic: .187, sk: .278 }],
    0x1D4B4: [.716, .017, .71, { ic: .249, sk: .194 }],
    0x1D4B5: [.717, .016, .821, { ic: .211, sk: .306 }],
    0x1D504: [.696, .026, .718],
    0x1D505: [.691, .027, .884],
    0x1D507: [.685, .027, .832],
    0x1D508: [.685, .024, .663],
    0x1D509: [.686, .153, .611],
    0x1D50A: [.69, .026, .785],
    0x1D50D: [.686, .139, .552],
    0x1D50E: [.68, .027, .668, { ic: .014 }],
    0x1D50F: [.686, .026, .666],
    0x1D510: [.692, .027, 1.05],
    0x1D511: [.686, .025, .832],
    0x1D512: [.729, .027, .827],
    0x1D513: [.692, .218, .828],
    0x1D514: [.729, .069, .827],
    0x1D516: [.692, .027, .829],
    0x1D517: [.701, .027, .669],
    0x1D518: [.697, .027, .646, { ic: .019 }],
    0x1D519: [.686, .026, .831],
    0x1D51A: [.686, .027, 1.046],
    0x1D51B: [.688, .027, .719],
    0x1D51C: [.686, .218, .833],
    0x1D51E: [.47, .035, .5],
    0x1D51F: [.685, .031, .513],
    0x1D520: [.466, .029, .389],
    0x1D521: [.609, .033, .499],
    0x1D522: [.467, .03, .401],
    0x1D523: [.681, .221, .326],
    0x1D524: [.47, .209, .504],
    0x1D525: [.688, .205, .521],
    0x1D526: [.673, .02, .279],
    0x1D527: [.672, .208, .281],
    0x1D528: [.689, .025, .389],
    0x1D529: [.685, .02, .28],
    0x1D52A: [.475, .026, .767],
    0x1D52B: [.475, .022, .527],
    0x1D52C: [.48, .028, .489],
    0x1D52D: [.541, .212, .5],
    0x1D52E: [.479, .219, .489],
    0x1D52F: [.474, .021, .389],
    0x1D530: [.478, .029, .443],
    0x1D531: [.64, .02, .333, { ic: .015 }],
    0x1D532: [.474, .023, .517],
    0x1D533: [.53, .028, .512],
    0x1D534: [.532, .028, .774],
    0x1D535: [.472, .188, .389],
    0x1D536: [.528, .218, .499],
    0x1D537: [.471, .214, .391],
    0x1D538: [.701, 0, .722],
    0x1D539: [.683, 0, .667],
    0x1D53B: [.683, 0, .722],
    0x1D53C: [.683, 0, .667],
    0x1D53D: [.683, 0, .611],
    0x1D53E: [.702, .019, .778],
    0x1D540: [.683, 0, .389],
    0x1D541: [.683, .077, .5],
    0x1D542: [.683, 0, .778],
    0x1D543: [.683, 0, .667],
    0x1D544: [.683, 0, .944],
    0x1D546: [.701, .019, .778],
    0x1D54A: [.702, .012, .556],
    0x1D54B: [.683, 0, .667],
    0x1D54C: [.683, .019, .722],
    0x1D54D: [.683, .02, .722],
    0x1D54E: [.683, .019, 1],
    0x1D54F: [.683, 0, .722],
    0x1D550: [.683, 0, .722],
    0x1D56C: [.686, .031, .847],
    0x1D56D: [.684, .031, 1.044],
    0x1D56E: [.676, .032, .723],
    0x1D56F: [.683, .029, .982],
    0x1D570: [.686, .029, .783],
    0x1D571: [.684, .146, .722],
    0x1D572: [.687, .029, .927],
    0x1D573: [.683, .126, .851],
    0x1D574: [.681, .025, .655],
    0x1D575: [.68, .141, .652],
    0x1D576: [.681, .026, .789, { ic: .017 }],
    0x1D577: [.683, .028, .786],
    0x1D578: [.683, .032, 1.239],
    0x1D579: [.679, .03, .983],
    0x1D57A: [.726, .03, .976],
    0x1D57B: [.688, .223, .977],
    0x1D57C: [.726, .083, .976],
    0x1D57D: [.688, .028, .978],
    0x1D57E: [.685, .031, .978],
    0x1D57F: [.686, .03, .79, { ic: .012 }],
    0x1D580: [.688, .039, .851, { ic: .02 }],
    0x1D581: [.685, .029, .982],
    0x1D582: [.683, .03, 1.235],
    0x1D583: [.681, .035, .849],
    0x1D584: [.688, .214, .984],
    0x1D585: [.677, .148, .711],
    0x1D586: [.472, .032, .603],
    0x1D587: [.69, .032, .59],
    0x1D588: [.473, .026, .464],
    0x1D589: [.632, .028, .589],
    0x1D58A: [.471, .027, .472],
    0x1D58B: [.687, .222, .388],
    0x1D58C: [.472, .208, .595],
    0x1D58D: [.687, .207, .615],
    0x1D58E: [.686, .025, .331],
    0x1D58F: [.682, .203, .332],
    0x1D590: [.682, .025, .464],
    0x1D591: [.681, .024, .337],
    0x1D592: [.476, .031, .921],
    0x1D593: [.473, .028, .654],
    0x1D594: [.482, .034, .609],
    0x1D595: [.557, .207, .604],
    0x1D596: [.485, .211, .596],
    0x1D597: [.472, .026, .46],
    0x1D598: [.479, .034, .523],
    0x1D599: [.648, .027, .393, { ic: .014 }],
    0x1D59A: [.472, .032, .589, { ic: .014 }],
    0x1D59B: [.546, .027, .604],
    0x1D59C: [.549, .032, .918],
    0x1D59D: [.471, .188, .459],
    0x1D59E: [.557, .221, .589],
    0x1D59F: [.471, .214, .461],
    0x1D5A0: [.694, 0, .667],
    0x1D5A1: [.694, 0, .667],
    0x1D5A2: [.705, .011, .639],
    0x1D5A3: [.694, 0, .722],
    0x1D5A4: [.691, 0, .597],
    0x1D5A5: [.691, 0, .569],
    0x1D5A6: [.704, .011, .667],
    0x1D5A7: [.694, 0, .708],
    0x1D5A8: [.694, 0, .278],
    0x1D5A9: [.694, .022, .472],
    0x1D5AA: [.694, 0, .694],
    0x1D5AB: [.694, 0, .542],
    0x1D5AC: [.694, 0, .875],
    0x1D5AD: [.694, 0, .708],
    0x1D5AE: [.715, .022, .736],
    0x1D5AF: [.694, 0, .639],
    0x1D5B0: [.715, .125, .736],
    0x1D5B1: [.694, 0, .646],
    0x1D5B2: [.716, .022, .556],
    0x1D5B3: [.688, 0, .681],
    0x1D5B4: [.694, .022, .688],
    0x1D5B5: [.694, 0, .667],
    0x1D5B6: [.694, 0, .944],
    0x1D5B7: [.694, 0, .667],
    0x1D5B8: [.694, 0, .667],
    0x1D5B9: [.694, 0, .611],
    0x1D5BA: [.46, .01, .481],
    0x1D5BB: [.694, .011, .517],
    0x1D5BC: [.46, .01, .444],
    0x1D5BD: [.694, .01, .517],
    0x1D5BE: [.461, .01, .444],
    0x1D5BF: [.705, 0, .306, { ic: .041 }],
    0x1D5C0: [.455, .206, .5],
    0x1D5C1: [.694, 0, .517],
    0x1D5C2: [.68, 0, .239],
    0x1D5C3: [.68, .205, .267],
    0x1D5C4: [.694, 0, .489],
    0x1D5C5: [.694, 0, .239],
    0x1D5C6: [.455, 0, .794],
    0x1D5C7: [.455, 0, .517],
    0x1D5C8: [.46, .01, .5],
    0x1D5C9: [.455, .194, .517],
    0x1D5CA: [.455, .194, .517],
    0x1D5CB: [.455, 0, .342],
    0x1D5CC: [.46, .01, .383],
    0x1D5CD: [.571, .01, .361],
    0x1D5CE: [.444, .01, .517],
    0x1D5CF: [.444, 0, .461],
    0x1D5D0: [.444, 0, .683],
    0x1D5D1: [.444, 0, .461],
    0x1D5D2: [.444, .204, .461],
    0x1D5D3: [.444, 0, .435],
    0x1D5D4: [.694, 0, .733],
    0x1D5D5: [.694, 0, .733],
    0x1D5D6: [.704, .011, .703],
    0x1D5D7: [.694, 0, .794],
    0x1D5D8: [.691, 0, .642],
    0x1D5D9: [.691, 0, .611],
    0x1D5DA: [.705, .011, .733],
    0x1D5DB: [.694, 0, .794],
    0x1D5DC: [.694, 0, .331],
    0x1D5DD: [.694, .022, .519],
    0x1D5DE: [.694, 0, .764],
    0x1D5DF: [.694, 0, .581],
    0x1D5E0: [.694, 0, .978],
    0x1D5E1: [.694, 0, .794],
    0x1D5E2: [.716, .022, .794],
    0x1D5E3: [.694, 0, .703],
    0x1D5E4: [.716, .106, .794],
    0x1D5E5: [.694, 0, .703],
    0x1D5E6: [.716, .022, .611],
    0x1D5E7: [.688, 0, .733],
    0x1D5E8: [.694, .022, .764],
    0x1D5E9: [.694, 0, .733],
    0x1D5EA: [.694, 0, 1.039],
    0x1D5EB: [.694, 0, .733],
    0x1D5EC: [.694, 0, .733],
    0x1D5ED: [.694, 0, .672],
    0x1D5EE: [.475, .011, .525],
    0x1D5EF: [.694, .01, .561],
    0x1D5F0: [.475, .011, .489],
    0x1D5F1: [.694, .011, .561],
    0x1D5F2: [.474, .01, .511],
    0x1D5F3: [.705, 0, .336, { ic: .045 }],
    0x1D5F4: [.469, .206, .55],
    0x1D5F5: [.694, 0, .561],
    0x1D5F6: [.695, 0, .256],
    0x1D5F7: [.695, .205, .286],
    0x1D5F8: [.694, 0, .531],
    0x1D5F9: [.694, 0, .256],
    0x1D5FA: [.469, 0, .867],
    0x1D5FB: [.468, 0, .561],
    0x1D5FC: [.474, .011, .55],
    0x1D5FD: [.469, .194, .561],
    0x1D5FE: [.469, .194, .561],
    0x1D5FF: [.469, 0, .372],
    0x1D600: [.474, .01, .422],
    0x1D601: [.589, .01, .404],
    0x1D602: [.458, .011, .561],
    0x1D603: [.458, 0, .5],
    0x1D604: [.458, 0, .744],
    0x1D605: [.458, 0, .5],
    0x1D606: [.458, .205, .5],
    0x1D607: [.458, 0, .476],
    0x1D608: [.694, 0, .667],
    0x1D609: [.694, 0, .667, { ic: .029 }],
    0x1D60A: [.705, .01, .639, { ic: .08 }],
    0x1D60B: [.694, 0, .722, { ic: .025 }],
    0x1D60C: [.691, 0, .597, { ic: .091 }],
    0x1D60D: [.691, 0, .569, { ic: .104 }],
    0x1D60E: [.705, .011, .667, { ic: .063 }],
    0x1D60F: [.694, 0, .708, { ic: .06 }],
    0x1D610: [.694, 0, .278, { ic: .06 }],
    0x1D611: [.694, .022, .472, { ic: .063 }],
    0x1D612: [.694, 0, .694, { ic: .091 }],
    0x1D613: [.694, 0, .542],
    0x1D614: [.694, 0, .875, { ic: .054 }],
    0x1D615: [.694, 0, .708, { ic: .058 }],
    0x1D616: [.716, .022, .736, { ic: .027 }],
    0x1D617: [.694, 0, .639, { ic: .051 }],
    0x1D618: [.716, .125, .736, { ic: .027 }],
    0x1D619: [.694, 0, .646, { ic: .052 }],
    0x1D61A: [.716, .022, .556, { ic: .053 }],
    0x1D61B: [.688, 0, .681, { ic: .109 }],
    0x1D61C: [.694, .022, .688, { ic: .059 }],
    0x1D61D: [.694, 0, .667, { ic: .132 }],
    0x1D61E: [.694, 0, .944, { ic: .132 }],
    0x1D61F: [.694, 0, .667, { ic: .091 }],
    0x1D620: [.694, 0, .667, { ic: .143 }],
    0x1D621: [.694, 0, .611, { ic: .091 }],
    0x1D622: [.461, .01, .481],
    0x1D623: [.694, .011, .517, { ic: .022 }],
    0x1D624: [.46, .011, .444, { ic: .055 }],
    0x1D625: [.694, .01, .517, { ic: .071 }],
    0x1D626: [.46, .011, .444, { ic: .028 }],
    0x1D627: [.705, 0, .306, { ic: .188 }],
    0x1D628: [.455, .206, .5, { ic: .068 }],
    0x1D629: [.694, 0, .517],
    0x1D62A: [.68, 0, .239, { ic: .076 }],
    0x1D62B: [.68, .204, .267, { ic: .069 }],
    0x1D62C: [.694, 0, .489, { ic: .054 }],
    0x1D62D: [.694, 0, .239, { ic: .072 }],
    0x1D62E: [.455, 0, .794],
    0x1D62F: [.454, 0, .517],
    0x1D630: [.461, .011, .5, { ic: .023 }],
    0x1D631: [.455, .194, .517, { ic: .021 }],
    0x1D632: [.455, .194, .517, { ic: .021 }],
    0x1D633: [.455, 0, .342, { ic: .082 }],
    0x1D634: [.461, .011, .383, { ic: .053 }],
    0x1D635: [.571, .011, .361, { ic: .049 }],
    0x1D636: [.444, .01, .517, { ic: .02 }],
    0x1D637: [.444, 0, .461, { ic: .079 }],
    0x1D638: [.444, 0, .683, { ic: .079 }],
    0x1D639: [.444, 0, .461, { ic: .076 }],
    0x1D63A: [.444, .205, .461, { ic: .079 }],
    0x1D63B: [.444, 0, .435, { ic: .059 }],
    0x1D670: [.623, 0, .525],
    0x1D671: [.611, 0, .525],
    0x1D672: [.622, .011, .525],
    0x1D673: [.611, 0, .525],
    0x1D674: [.611, 0, .525],
    0x1D675: [.611, 0, .525],
    0x1D676: [.622, .011, .525],
    0x1D677: [.611, 0, .525],
    0x1D678: [.611, 0, .525],
    0x1D679: [.611, .011, .525],
    0x1D67A: [.611, 0, .525],
    0x1D67B: [.611, 0, .525],
    0x1D67C: [.611, 0, .525],
    0x1D67D: [.611, 0, .525],
    0x1D67E: [.621, .01, .525],
    0x1D67F: [.611, 0, .525],
    0x1D680: [.621, .138, .525],
    0x1D681: [.611, .011, .525],
    0x1D682: [.622, .011, .525],
    0x1D683: [.611, 0, .525],
    0x1D684: [.611, .011, .525],
    0x1D685: [.611, .007, .525],
    0x1D686: [.611, .007, .525],
    0x1D687: [.611, 0, .525],
    0x1D688: [.611, 0, .525],
    0x1D689: [.611, 0, .525],
    0x1D68A: [.439, .006, .525],
    0x1D68B: [.611, .006, .525],
    0x1D68C: [.44, .006, .525],
    0x1D68D: [.611, .006, .525],
    0x1D68E: [.44, .006, .525],
    0x1D68F: [.617, 0, .525],
    0x1D690: [.442, .229, .525],
    0x1D691: [.611, 0, .525],
    0x1D692: [.612, 0, .525],
    0x1D693: [.612, .228, .525],
    0x1D694: [.611, 0, .525],
    0x1D695: [.611, 0, .525],
    0x1D696: [.436, 0, .525, { ic: .011 }],
    0x1D697: [.436, 0, .525],
    0x1D698: [.44, .006, .525],
    0x1D699: [.437, .221, .525],
    0x1D69A: [.437, .221, .525, { ic: .02 }],
    0x1D69B: [.437, 0, .525],
    0x1D69C: [.44, .006, .525],
    0x1D69D: [.554, .006, .525],
    0x1D69E: [.431, .005, .525],
    0x1D69F: [.431, 0, .525],
    0x1D6A0: [.431, 0, .525],
    0x1D6A1: [.431, 0, .525],
    0x1D6A2: [.431, .228, .525],
    0x1D6A3: [.431, 0, .525],
    0x1D6A8: [.698, 0, .869],
    0x1D6A9: [.686, 0, .818],
    0x1D6AA: [.68, 0, .692],
    0x1D6AB: [.698, 0, .958],
    0x1D6AC: [.68, 0, .756],
    0x1D6AD: [.686, 0, .703],
    0x1D6AE: [.686, 0, .9],
    0x1D6AF: [.696, .01, .894],
    0x1D6B0: [.686, 0, .436],
    0x1D6B1: [.686, 0, .901],
    0x1D6B2: [.698, 0, .806],
    0x1D6B3: [.686, 0, 1.092],
    0x1D6B4: [.686, 0, .9],
    0x1D6B5: [.675, 0, .767],
    0x1D6B6: [.696, .01, .864],
    0x1D6B7: [.68, 0, .9],
    0x1D6B8: [.686, 0, .786],
    0x1D6BA: [.686, 0, .831],
    0x1D6BB: [.675, 0, .8],
    0x1D6BC: [.697, 0, .894],
    0x1D6BD: [.686, 0, .831],
    0x1D6BE: [.686, 0, .869],
    0x1D6BF: [.686, 0, .894],
    0x1D6C0: [.696, 0, .831],
    0x1D6C1: [.686, .024, .958],
    0x1D6E2: [.716, 0, .75, { sk: .139 }],
    0x1D6E3: [.683, 0, .759, { sk: .0833 }],
    0x1D6E4: [.68, 0, .615, { ic: .106, sk: .0833 }],
    0x1D6E5: [.716, 0, .833, { sk: .167 }],
    0x1D6E6: [.68, 0, .738, { ic: .026, sk: .0833 }],
    0x1D6E7: [.683, 0, .683, { ic: .04, sk: .0833 }],
    0x1D6E8: [.683, 0, .831, { ic: .057, sk: .0556 }],
    0x1D6E9: [.704, .022, .763, { sk: .0833 }],
    0x1D6EA: [.683, 0, .44, { ic: .064, sk: .111 }],
    0x1D6EB: [.683, 0, .849, { ic: .04, sk: .0556 }],
    0x1D6EC: [.716, 0, .694, { sk: .167 }],
    0x1D6ED: [.683, 0, .97, { ic: .081, sk: .0833 }],
    0x1D6EE: [.683, 0, .803, { ic: .085, sk: .0833 }],
    0x1D6EF: [.677, 0, .742, { ic: .035, sk: .0833 }],
    0x1D6F0: [.704, .022, .763, { sk: .0833 }],
    0x1D6F1: [.68, 0, .831, { ic: .056, sk: .0556 }],
    0x1D6F2: [.683, 0, .642, { ic: .109, sk: .0833 }],
    0x1D6F4: [.683, 0, .78, { ic: .026, sk: .0833 }],
    0x1D6F5: [.677, 0, .584, { ic: .12, sk: .0833 }],
    0x1D6F6: [.705, 0, .583, { ic: .117, sk: .0556 }],
    0x1D6F7: [.683, 0, .667, { sk: .0833 }],
    0x1D6F8: [.683, 0, .828, { ic: .024, sk: .0833 }],
    0x1D6F9: [.683, 0, .612, { ic: .08, sk: .0556 }],
    0x1D6FA: [.704, 0, .772, { ic: .014, sk: .0833 }],
    0x1D6FC: [.442, .011, .64, { sk: .0278 }],
    0x1D6FD: [.705, .194, .566, { sk: .0833 }],
    0x1D6FE: [.441, .216, .518, { ic: .025 }],
    0x1D6FF: [.717, .01, .444, { sk: .0556 }],
    0x1D700: [.452, .022, .466, { sk: .0833 }],
    0x1D701: [.704, .204, .438, { ic: .033, sk: .0833 }],
    0x1D702: [.442, .216, .497, { sk: .0556 }],
    0x1D703: [.705, .01, .469, { sk: .0833 }],
    0x1D704: [.442, .01, .354, { sk: .0556 }],
    0x1D705: [.442, .011, .576],
    0x1D706: [.694, .012, .583],
    0x1D707: [.442, .216, .603, { sk: .0278 }],
    0x1D708: [.442, 0, .494, { ic: .036, sk: .0278 }],
    0x1D709: [.704, .205, .438, { sk: .111 }],
    0x1D70A: [.441, .011, .485, { sk: .0556 }],
    0x1D70B: [.431, .011, .57],
    0x1D70C: [.442, .216, .517, { sk: .0833 }],
    0x1D70D: [.442, .107, .363, { ic: .042, sk: .0833 }],
    0x1D70E: [.431, .011, .571],
    0x1D70F: [.431, .013, .437, { ic: .08, sk: .0278 }],
    0x1D710: [.443, .01, .54, { sk: .0278 }],
    0x1D711: [.442, .218, .654, { sk: .0833 }],
    0x1D712: [.442, .204, .626, { sk: .0556 }],
    0x1D713: [.694, .205, .651, { sk: .111 }],
    0x1D714: [.443, .011, .622],
    0x1D715: [.715, .022, .531, { ic: .035, sk: .0833 }],
    0x1D716: [.431, .011, .406, { sk: .0556 }],
    0x1D717: [.705, .011, .591, { sk: .0833 }],
    0x1D718: [.434, .006, .667, { ic: .067 }],
    0x1D719: [.694, .205, .596, { sk: .0833 }],
    0x1D71A: [.442, .194, .517, { sk: .0833 }],
    0x1D71B: [.431, .01, .828],
    0x1D71C: [.711, 0, .869, { sk: .16 }],
    0x1D71D: [.686, 0, .866, { sk: .0958 }],
    0x1D71E: [.68, 0, .657, { ic: .12, sk: .0958 }],
    0x1D71F: [.711, 0, .958, { sk: .192 }],
    0x1D720: [.68, 0, .81, { ic: .015, sk: .0958 }],
    0x1D721: [.686, 0, .773, { ic: .032, sk: .0958 }],
    0x1D722: [.686, 0, .982, { ic: .045, sk: .0639 }],
    0x1D723: [.702, .017, .867, { sk: .0958 }],
    0x1D724: [.686, 0, .511, { ic: .062, sk: .128 }],
    0x1D725: [.686, 0, .971, { ic: .032, sk: .0639 }],
    0x1D726: [.711, 0, .806, { sk: .192 }],
    0x1D727: [.686, 0, 1.142, { ic: .077, sk: .0958 }],
    0x1D728: [.686, 0, .95, { ic: .077, sk: .0958 }],
    0x1D729: [.675, 0, .841, { ic: .026, sk: .0958 }],
    0x1D72A: [.703, .017, .837, { sk: .0958 }],
    0x1D72B: [.68, 0, .982, { ic: .044, sk: .0639 }],
    0x1D72C: [.686, 0, .723, { ic: .124, sk: .0958 }],
    0x1D72E: [.686, 0, .885, { ic: .017, sk: .0958 }],
    0x1D72F: [.675, 0, .637, { ic: .135, sk: .0958 }],
    0x1D730: [.703, 0, .671, { ic: .131, sk: .0639 }],
    0x1D731: [.686, 0, .767, { sk: .0958 }],
    0x1D732: [.686, 0, .947, { sk: .0958 }],
    0x1D733: [.686, 0, .714, { ic: .076, sk: .0639 }],
    0x1D734: [.703, 0, .879, { sk: .0958 }],
    0x1D736: [.452, .008, .761, { sk: .0319 }],
    0x1D737: [.701, .194, .66, { sk: .0958 }],
    0x1D738: [.451, .211, .59, { ic: .027 }],
    0x1D739: [.725, .008, .522, { sk: .0639 }],
    0x1D73A: [.461, .017, .529, { sk: .0958 }],
    0x1D73B: [.711, .202, .508, { ic: .013, sk: .0958 }],
    0x1D73C: [.452, .211, .6, { sk: .0639 }],
    0x1D73D: [.702, .008, .562, { sk: .0958 }],
    0x1D73E: [.452, .008, .412, { sk: .0639 }],
    0x1D73F: [.452, .008, .668],
    0x1D740: [.694, .013, .671],
    0x1D741: [.452, .211, .708, { sk: .0319 }],
    0x1D742: [.452, 0, .577, { ic: .031, sk: .0319 }],
    0x1D743: [.711, .201, .508, { sk: .128 }],
    0x1D744: [.452, .008, .585, { sk: .0639 }],
    0x1D745: [.444, .008, .682],
    0x1D746: [.451, .211, .612, { sk: .0958 }],
    0x1D747: [.451, .105, .424, { ic: .033, sk: .0958 }],
    0x1D748: [.444, .008, .686],
    0x1D749: [.444, .013, .521, { ic: .089, sk: .0319 }],
    0x1D74A: [.453, .008, .631, { sk: .0319 }],
    0x1D74B: [.452, .216, .747, { sk: .0958 }],
    0x1D74C: [.452, .201, .718, { sk: .0639 }],
    0x1D74D: [.694, .202, .758, { sk: .128 }],
    0x1D74E: [.453, .008, .718],
    0x1D74F: [.71, .017, .628, { ic: .029, sk: .0958 }],
    0x1D750: [.444, .007, .483, { sk: .0639 }],
    0x1D751: [.701, .008, .692, { sk: .0958 }],
    0x1D752: [.434, .006, .667, { ic: .067 }],
    0x1D753: [.694, .202, .712, { sk: .0958 }],
    0x1D754: [.451, .194, .612, { sk: .0958 }],
    0x1D755: [.444, .008, .975],
    0x1D756: [.694, 0, .733],
    0x1D757: [.694, 0, .733],
    0x1D758: [.691, 0, .581],
    0x1D759: [.694, 0, .917],
    0x1D75A: [.691, 0, .642],
    0x1D75B: [.694, 0, .672],
    0x1D75C: [.694, 0, .794],
    0x1D75D: [.716, .022, .856],
    0x1D75E: [.694, 0, .331],
    0x1D75F: [.694, 0, .764],
    0x1D760: [.694, 0, .672],
    0x1D761: [.694, 0, .978],
    0x1D762: [.694, 0, .794],
    0x1D763: [.688, 0, .733],
    0x1D764: [.716, .022, .794],
    0x1D765: [.691, 0, .794],
    0x1D766: [.694, 0, .703],
    0x1D768: [.694, 0, .794],
    0x1D769: [.688, 0, .733],
    0x1D76A: [.715, 0, .856],
    0x1D76B: [.694, 0, .794],
    0x1D76C: [.694, 0, .733],
    0x1D76D: [.694, 0, .856],
    0x1D76E: [.716, 0, .794],
    0x1D7CE: [.654, .01, .575],
    0x1D7CF: [.655, 0, .575],
    0x1D7D0: [.654, 0, .575],
    0x1D7D1: [.655, .011, .575],
    0x1D7D2: [.656, 0, .575],
    0x1D7D3: [.655, .011, .575],
    0x1D7D4: [.655, .011, .575],
    0x1D7D5: [.676, .011, .575],
    0x1D7D6: [.654, .011, .575],
    0x1D7D7: [.654, .011, .575],
    0x1D7E2: [.678, .022, .5],
    0x1D7E3: [.678, 0, .5],
    0x1D7E4: [.677, 0, .5],
    0x1D7E5: [.678, .022, .5],
    0x1D7E6: [.656, 0, .5],
    0x1D7E7: [.656, .021, .5],
    0x1D7E8: [.677, .022, .5],
    0x1D7E9: [.656, .011, .5],
    0x1D7EA: [.678, .022, .5],
    0x1D7EB: [.677, .022, .5],
    0x1D7EC: [.715, .022, .55],
    0x1D7ED: [.716, 0, .55],
    0x1D7EE: [.716, 0, .55],
    0x1D7EF: [.716, .022, .55],
    0x1D7F0: [.694, 0, .55],
    0x1D7F1: [.694, .022, .55],
    0x1D7F2: [.716, .022, .55],
    0x1D7F3: [.695, .011, .55],
    0x1D7F4: [.715, .022, .55],
    0x1D7F5: [.716, .022, .55],
    0x1D7F6: [.621, .01, .525],
    0x1D7F7: [.622, 0, .525],
    0x1D7F8: [.622, 0, .525],
    0x1D7F9: [.622, .011, .525],
    0x1D7FA: [.624, 0, .525],
    0x1D7FB: [.611, .01, .525],
    0x1D7FC: [.622, .011, .525],
    0x1D7FD: [.627, .01, .525],
    0x1D7FE: [.621, .01, .525],
    0x1D7FF: [.622, .011, .525],
};
//# sourceMappingURL=normal.js.map

/***/ }),

/***/ 92351:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sansSerifBoldItalic = void 0;
exports.sansSerifBoldItalic = {
    0x131: [.458, 0, .256],
    0x237: [.458, .205, .286],
};
//# sourceMappingURL=sans-serif-bold-italic.js.map

/***/ }),

/***/ 57175:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sansSerifBold = void 0;
exports.sansSerifBold = {
    0x21: [.694, 0, .367],
    0x22: [.694, -0.442, .558],
    0x23: [.694, .193, .917],
    0x24: [.75, .056, .55],
    0x25: [.75, .056, 1.029],
    0x26: [.716, .022, .831],
    0x27: [.694, -0.442, .306],
    0x28: [.75, .249, .428],
    0x29: [.75, .25, .428],
    0x2A: [.75, -0.293, .55],
    0x2B: [.617, .116, .856],
    0x2C: [.146, .106, .306],
    0x2D: [.273, -0.186, .367],
    0x2E: [.146, 0, .306],
    0x2F: [.75, .249, .55],
    0x3A: [.458, 0, .306],
    0x3B: [.458, .106, .306],
    0x3D: [.407, -0.094, .856],
    0x3F: [.705, 0, .519],
    0x40: [.704, .011, .733],
    0x5B: [.75, .25, .343],
    0x5D: [.75, .25, .343],
    0x5E: [.694, -0.537, .55],
    0x5F: [-0.023, .11, .55],
    0x7E: [.344, -0.198, .55],
    0x131: [.458, 0, .256],
    0x237: [.458, .205, .286],
    0x300: [.694, -0.537, 0],
    0x301: [.694, -0.537, 0],
    0x302: [.694, -0.537, 0],
    0x303: [.694, -0.548, 0],
    0x304: [.66, -0.56, 0],
    0x306: [.694, -0.552, 0],
    0x307: [.695, -0.596, 0],
    0x308: [.695, -0.595, 0],
    0x30A: [.694, -0.538, 0],
    0x30B: [.694, -0.537, 0],
    0x30C: [.657, -0.5, 0],
    0x2013: [.327, -0.24, .55],
    0x2014: [.327, -0.24, 1.1],
    0x2015: [.327, -0.24, 1.1],
    0x2017: [-0.023, .11, .55],
    0x2018: [.694, -0.443, .306],
    0x2019: [.694, -0.442, .306],
    0x201C: [.694, -0.443, .558],
    0x201D: [.694, -0.442, .558],
    0x2044: [.75, .249, .55],
    0x2206: [.694, 0, .917],
};
//# sourceMappingURL=sans-serif-bold.js.map

/***/ }),

/***/ 3076:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sansSerifItalic = void 0;
exports.sansSerifItalic = {
    0x21: [.694, 0, .319, { ic: .036 }],
    0x22: [.694, -0.471, .5],
    0x23: [.694, .194, .833, { ic: .018 }],
    0x24: [.75, .056, .5, { ic: .065 }],
    0x25: [.75, .056, .833],
    0x26: [.716, .022, .758],
    0x27: [.694, -0.471, .278, { ic: .057 }],
    0x28: [.75, .25, .389, { ic: .102 }],
    0x29: [.75, .25, .389],
    0x2A: [.75, -0.306, .5, { ic: .068 }],
    0x2B: [.583, .083, .778],
    0x2C: [.098, .125, .278],
    0x2D: [.259, -0.186, .333],
    0x2E: [.098, 0, .278],
    0x2F: [.75, .25, .5, { ic: .1 }],
    0x30: [.678, .022, .5, { ic: .049 }],
    0x31: [.678, 0, .5],
    0x32: [.678, 0, .5, { ic: .051 }],
    0x33: [.678, .022, .5, { ic: .044 }],
    0x34: [.656, 0, .5, { ic: .021 }],
    0x35: [.656, .022, .5, { ic: .055 }],
    0x36: [.678, .022, .5, { ic: .048 }],
    0x37: [.656, .011, .5, { ic: .096 }],
    0x38: [.678, .022, .5, { ic: .054 }],
    0x39: [.677, .022, .5, { ic: .045 }],
    0x3A: [.444, 0, .278],
    0x3B: [.444, .125, .278],
    0x3D: [.37, -0.13, .778, { ic: .018 }],
    0x3F: [.704, 0, .472, { ic: .064 }],
    0x40: [.705, .01, .667, { ic: .04 }],
    0x5B: [.75, .25, .289, { ic: .136 }],
    0x5D: [.75, .25, .289, { ic: .064 }],
    0x5E: [.694, -0.527, .5, { ic: .033 }],
    0x5F: [-0.038, .114, .5, { ic: .065 }],
    0x7E: [.327, -0.193, .5, { ic: .06 }],
    0x131: [.444, 0, .239, { ic: .019 }],
    0x237: [.444, .204, .267, { ic: .019 }],
    0x300: [.694, -0.527, 0],
    0x301: [.694, -0.527, 0, { ic: .063 }],
    0x302: [.694, -0.527, 0, { ic: .033 }],
    0x303: [.677, -0.543, 0, { ic: .06 }],
    0x304: [.631, -0.552, 0, { ic: .064 }],
    0x306: [.694, -0.508, 0, { ic: .073 }],
    0x307: [.68, -0.576, 0],
    0x308: [.68, -0.582, 0, { ic: .04 }],
    0x30A: [.693, -0.527, 0],
    0x30B: [.694, -0.527, 0, { ic: .063 }],
    0x30C: [.654, -0.487, 0, { ic: .06 }],
    0x391: [.694, 0, .667],
    0x392: [.694, 0, .667, { ic: .029 }],
    0x393: [.691, 0, .542, { ic: .104 }],
    0x394: [.694, 0, .833],
    0x395: [.691, 0, .597, { ic: .091 }],
    0x396: [.694, 0, .611, { ic: .091 }],
    0x397: [.694, 0, .708, { ic: .06 }],
    0x398: [.715, .022, .778, { ic: .026 }],
    0x399: [.694, 0, .278, { ic: .06 }],
    0x39A: [.694, 0, .694, { ic: .091 }],
    0x39B: [.694, 0, .611],
    0x39C: [.694, 0, .875, { ic: .054 }],
    0x39D: [.694, 0, .708, { ic: .058 }],
    0x39E: [.688, 0, .667, { ic: .098 }],
    0x39F: [.716, .022, .736, { ic: .027 }],
    0x3A0: [.691, 0, .708, { ic: .06 }],
    0x3A1: [.694, 0, .639, { ic: .051 }],
    0x3A3: [.694, 0, .722, { ic: .091 }],
    0x3A4: [.688, 0, .681, { ic: .109 }],
    0x3A5: [.716, 0, .778, { ic: .065 }],
    0x3A6: [.694, 0, .722, { ic: .021 }],
    0x3A7: [.694, 0, .667, { ic: .091 }],
    0x3A8: [.694, 0, .778, { ic: .076 }],
    0x3A9: [.716, 0, .722, { ic: .047 }],
    0x2013: [.312, -0.236, .5, { ic: .065 }],
    0x2014: [.312, -0.236, 1, { ic: .065 }],
    0x2015: [.312, -0.236, 1, { ic: .065 }],
    0x2017: [-0.038, .114, .5, { ic: .065 }],
    0x2018: [.694, -0.471, .278, { ic: .058 }],
    0x2019: [.694, -0.471, .278, { ic: .057 }],
    0x201C: [.694, -0.471, .5, { ic: .114 }],
    0x201D: [.694, -0.471, .5],
    0x2044: [.75, .25, .5, { ic: .1 }],
    0x2206: [.694, 0, .833],
};
//# sourceMappingURL=sans-serif-italic.js.map

/***/ }),

/***/ 76798:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sansSerif = void 0;
exports.sansSerif = {
    0x21: [.694, 0, .319],
    0x22: [.694, -0.471, .5],
    0x23: [.694, .194, .833],
    0x24: [.75, .056, .5],
    0x25: [.75, .056, .833],
    0x26: [.716, .022, .758],
    0x27: [.694, -0.471, .278],
    0x28: [.75, .25, .389],
    0x29: [.75, .25, .389],
    0x2A: [.75, -0.306, .5],
    0x2B: [.583, .082, .778],
    0x2C: [.098, .125, .278],
    0x2D: [.259, -0.186, .333],
    0x2E: [.098, 0, .278],
    0x2F: [.75, .25, .5],
    0x3A: [.444, 0, .278],
    0x3B: [.444, .125, .278],
    0x3D: [.37, -0.13, .778],
    0x3F: [.704, 0, .472],
    0x40: [.704, .011, .667],
    0x5B: [.75, .25, .289],
    0x5D: [.75, .25, .289],
    0x5E: [.694, -0.527, .5],
    0x5F: [-0.038, .114, .5],
    0x7E: [.327, -0.193, .5],
    0x131: [.444, 0, .239],
    0x237: [.444, .205, .267],
    0x300: [.694, -0.527, 0],
    0x301: [.694, -0.527, 0],
    0x302: [.694, -0.527, 0],
    0x303: [.677, -0.543, 0],
    0x304: [.631, -0.552, 0],
    0x306: [.694, -0.508, 0],
    0x307: [.68, -0.576, 0],
    0x308: [.68, -0.582, 0],
    0x30A: [.694, -0.527, 0],
    0x30B: [.694, -0.527, 0],
    0x30C: [.654, -0.487, 0],
    0x391: [.694, 0, .667],
    0x392: [.694, 0, .667],
    0x393: [.691, 0, .542],
    0x394: [.694, 0, .833],
    0x395: [.691, 0, .597],
    0x396: [.694, 0, .611],
    0x397: [.694, 0, .708],
    0x398: [.716, .021, .778],
    0x399: [.694, 0, .278],
    0x39A: [.694, 0, .694],
    0x39B: [.694, 0, .611],
    0x39C: [.694, 0, .875],
    0x39D: [.694, 0, .708],
    0x39E: [.688, 0, .667],
    0x39F: [.715, .022, .736],
    0x3A0: [.691, 0, .708],
    0x3A1: [.694, 0, .639],
    0x3A3: [.694, 0, .722],
    0x3A4: [.688, 0, .681],
    0x3A5: [.716, 0, .778],
    0x3A6: [.694, 0, .722],
    0x3A7: [.694, 0, .667],
    0x3A8: [.694, 0, .778],
    0x3A9: [.716, 0, .722],
    0x2013: [.312, -0.236, .5],
    0x2014: [.312, -0.236, 1],
    0x2015: [.312, -0.236, 1],
    0x2017: [-0.038, .114, .5],
    0x2018: [.694, -0.471, .278],
    0x2019: [.694, -0.471, .278],
    0x201C: [.694, -0.471, .5],
    0x201D: [.694, -0.471, .5],
    0x2044: [.75, .25, .5],
    0x2206: [.694, 0, .833],
};
//# sourceMappingURL=sans-serif.js.map

/***/ }),

/***/ 84356:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scriptBold = void 0;
exports.scriptBold = {};
//# sourceMappingURL=script-bold.js.map

/***/ }),

/***/ 77383:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.script = void 0;
exports.script = {};
//# sourceMappingURL=script.js.map

/***/ }),

/***/ 62993:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.smallop = void 0;
exports.smallop = {
    0x28: [.85, .349, .458],
    0x29: [.85, .349, .458],
    0x2F: [.85, .349, .578],
    0x5B: [.85, .349, .417],
    0x5C: [.85, .349, .578],
    0x5D: [.85, .349, .417],
    0x7B: [.85, .349, .583],
    0x7D: [.85, .349, .583],
    0x2C6: [.744, -0.551, .556],
    0x2DC: [.722, -0.597, .556],
    0x302: [.744, -0.551, 0],
    0x303: [.722, -0.597, 0],
    0x2016: [.602, 0, .778],
    0x2044: [.85, .349, .578],
    0x2191: [.6, 0, .667],
    0x2193: [.6, 0, .667],
    0x21D1: [.599, 0, .778],
    0x21D3: [.6, 0, .778],
    0x220F: [.75, .25, .944],
    0x2210: [.75, .25, .944],
    0x2211: [.75, .25, 1.056],
    0x221A: [.85, .35, 1, { ic: .02 }],
    0x2223: [.627, .015, .333],
    0x2225: [.627, .015, .556],
    0x222B: [.805, .306, .472, { ic: .138 }],
    0x222C: [.805, .306, .819, { ic: .138 }],
    0x222D: [.805, .306, 1.166, { ic: .138 }],
    0x222E: [.805, .306, .472, { ic: .138 }],
    0x22C0: [.75, .249, .833],
    0x22C1: [.75, .249, .833],
    0x22C2: [.75, .249, .833],
    0x22C3: [.75, .249, .833],
    0x2308: [.85, .349, .472],
    0x2309: [.85, .349, .472],
    0x230A: [.85, .349, .472],
    0x230B: [.85, .349, .472],
    0x2329: [.85, .35, .472],
    0x232A: [.85, .35, .472],
    0x23D0: [.602, 0, .667],
    0x2758: [.627, .015, .333],
    0x27E8: [.85, .35, .472],
    0x27E9: [.85, .35, .472],
    0x2A00: [.75, .25, 1.111],
    0x2A01: [.75, .25, 1.111],
    0x2A02: [.75, .25, 1.111],
    0x2A04: [.75, .249, .833],
    0x2A06: [.75, .249, .833],
    0x2A0C: [.805, .306, 1.638, { ic: .138 }],
    0x3008: [.85, .35, .472],
    0x3009: [.85, .35, .472],
};
//# sourceMappingURL=smallop.js.map

/***/ }),

/***/ 65410:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texCalligraphicBold = void 0;
exports.texCalligraphicBold = {
    0x41: [.751, .049, .921, { ic: .068, sk: .224 }],
    0x42: [.705, .017, .748, { sk: .16 }],
    0x43: [.703, .02, .613, { sk: .16 }],
    0x44: [.686, 0, .892, { sk: .0958 }],
    0x45: [.703, .016, .607, { ic: .02, sk: .128 }],
    0x46: [.686, .03, .814, { ic: .116, sk: .128 }],
    0x47: [.703, .113, .682, { sk: .128 }],
    0x48: [.686, .048, .987, { sk: .128 }],
    0x49: [.686, 0, .642, { ic: .104, sk: .0319 }],
    0x4A: [.686, .114, .779, { ic: .158, sk: .192 }],
    0x4B: [.703, .017, .871, { sk: .0639 }],
    0x4C: [.703, .017, .788, { sk: .16 }],
    0x4D: [.703, .049, 1.378, { sk: .16 }],
    0x4E: [.84, .049, .937, { ic: .168, sk: .0958 }],
    0x4F: [.703, .017, .906, { sk: .128 }],
    0x50: [.686, .067, .81, { ic: .036, sk: .0958 }],
    0x51: [.703, .146, .939, { sk: .128 }],
    0x52: [.686, .017, .99, { sk: .0958 }],
    0x53: [.703, .016, .696, { ic: .025, sk: .16 }],
    0x54: [.72, .069, .644, { ic: .303, sk: .0319 }],
    0x55: [.686, .024, .715, { ic: .056, sk: .0958 }],
    0x56: [.686, .077, .737, { ic: .037, sk: .0319 }],
    0x57: [.686, .077, 1.169, { ic: .037, sk: .0958 }],
    0x58: [.686, 0, .817, { ic: .089, sk: .16 }],
    0x59: [.686, .164, .759, { ic: .038, sk: .0958 }],
    0x5A: [.686, 0, .818, { ic: .035, sk: .16 }],
    0x131: [.452, .008, .394, { sk: .0319 }],
    0x237: [.451, .201, .439, { sk: .0958 }],
};
//# sourceMappingURL=tex-calligraphic-bold.js.map

/***/ }),

/***/ 77270:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texCalligraphic = void 0;
exports.texCalligraphic = {
    0x41: [.728, .05, .798, { ic: .021, sk: .194 }],
    0x42: [.705, .022, .657, { sk: .139 }],
    0x43: [.705, .025, .527, { sk: .139 }],
    0x44: [.683, 0, .771, { sk: .0833 }],
    0x45: [.705, .022, .528, { ic: .036, sk: .111 }],
    0x46: [.683, .032, .719, { ic: .11, sk: .111 }],
    0x47: [.704, .119, .595, { sk: .111 }],
    0x48: [.683, .048, .845, { sk: .111 }],
    0x49: [.683, 0, .545, { ic: .097, sk: .0278 }],
    0x4A: [.683, .119, .678, { ic: .161, sk: .167 }],
    0x4B: [.705, .022, .762, { sk: .0556 }],
    0x4C: [.705, .022, .69, { sk: .139 }],
    0x4D: [.705, .05, 1.201, { sk: .139 }],
    0x4E: [.789, .05, .82, { ic: .159, sk: .0833 }],
    0x4F: [.705, .022, .796, { sk: .111 }],
    0x50: [.683, .057, .696, { ic: .037, sk: .0833 }],
    0x51: [.705, .131, .817, { sk: .111 }],
    0x52: [.682, .022, .848, { sk: .0833 }],
    0x53: [.705, .022, .606, { ic: .036, sk: .139 }],
    0x54: [.717, .068, .545, { ic: .288, sk: .0278 }],
    0x55: [.683, .028, .626, { ic: .061, sk: .0833 }],
    0x56: [.683, .052, .613, { ic: .045, sk: .0278 }],
    0x57: [.683, .053, .988, { ic: .046, sk: .0833 }],
    0x58: [.683, 0, .713, { ic: .094, sk: .139 }],
    0x59: [.683, .143, .668, { ic: .046, sk: .0833 }],
    0x5A: [.683, 0, .725, { ic: .042, sk: .139 }],
};
//# sourceMappingURL=tex-calligraphic.js.map

/***/ }),

/***/ 29503:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texMathit = void 0;
exports.texMathit = {
    0x41: [.716, 0, .743],
    0x42: [.683, 0, .704],
    0x43: [.705, .021, .716],
    0x44: [.683, 0, .755],
    0x45: [.68, 0, .678],
    0x46: [.68, 0, .653],
    0x47: [.705, .022, .774],
    0x48: [.683, 0, .743],
    0x49: [.683, 0, .386],
    0x4A: [.683, .021, .525],
    0x4B: [.683, 0, .769],
    0x4C: [.683, 0, .627],
    0x4D: [.683, 0, .897],
    0x4E: [.683, 0, .743],
    0x4F: [.704, .022, .767],
    0x50: [.683, 0, .678],
    0x51: [.704, .194, .767],
    0x52: [.683, .022, .729],
    0x53: [.705, .022, .562],
    0x54: [.677, 0, .716],
    0x55: [.683, .022, .743],
    0x56: [.683, .022, .743],
    0x57: [.683, .022, .999],
    0x58: [.683, 0, .743],
    0x59: [.683, 0, .743],
    0x5A: [.683, 0, .613],
    0x61: [.442, .011, .511],
    0x62: [.694, .011, .46],
    0x63: [.441, .01, .46],
    0x64: [.694, .011, .511],
    0x65: [.442, .01, .46],
    0x66: [.705, .204, .307],
    0x67: [.442, .205, .46],
    0x68: [.694, .011, .511],
    0x69: [.656, .01, .307],
    0x6A: [.656, .204, .307],
    0x6B: [.694, .011, .46],
    0x6C: [.694, .011, .256],
    0x6D: [.442, .011, .818],
    0x6E: [.442, .011, .562],
    0x6F: [.442, .011, .511],
    0x70: [.442, .194, .511],
    0x71: [.442, .194, .46],
    0x72: [.442, .011, .422],
    0x73: [.442, .011, .409],
    0x74: [.626, .011, .332],
    0x75: [.441, .011, .537],
    0x76: [.443, .01, .46],
    0x77: [.443, .011, .664],
    0x78: [.442, .011, .464],
    0x79: [.441, .205, .486],
    0x7A: [.442, .011, .409],
};
//# sourceMappingURL=tex-mathit.js.map

/***/ }),

/***/ 11709:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texOldstyleBold = void 0;
exports.texOldstyleBold = {
    0x30: [.46, .017, .575],
    0x31: [.461, 0, .575],
    0x32: [.46, 0, .575],
    0x33: [.461, .211, .575],
    0x34: [.469, .194, .575],
    0x35: [.461, .211, .575],
    0x36: [.66, .017, .575],
    0x37: [.476, .211, .575],
    0x38: [.661, .017, .575],
    0x39: [.461, .21, .575],
    0x41: [.751, .049, .921, { ic: .068, sk: .224 }],
    0x42: [.705, .017, .748, { sk: .16 }],
    0x43: [.703, .02, .613, { sk: .16 }],
    0x44: [.686, 0, .892, { sk: .0958 }],
    0x45: [.703, .016, .607, { ic: .02, sk: .128 }],
    0x46: [.686, .03, .814, { ic: .116, sk: .128 }],
    0x47: [.703, .113, .682, { sk: .128 }],
    0x48: [.686, .048, .987, { sk: .128 }],
    0x49: [.686, 0, .642, { ic: .104, sk: .0319 }],
    0x4A: [.686, .114, .779, { ic: .158, sk: .192 }],
    0x4B: [.703, .017, .871, { sk: .0639 }],
    0x4C: [.703, .017, .788, { sk: .16 }],
    0x4D: [.703, .049, 1.378, { sk: .16 }],
    0x4E: [.84, .049, .937, { ic: .168, sk: .0958 }],
    0x4F: [.703, .017, .906, { sk: .128 }],
    0x50: [.686, .067, .81, { ic: .036, sk: .0958 }],
    0x51: [.703, .146, .939, { sk: .128 }],
    0x52: [.686, .017, .99, { sk: .0958 }],
    0x53: [.703, .016, .696, { ic: .025, sk: .16 }],
    0x54: [.72, .069, .644, { ic: .303, sk: .0319 }],
    0x55: [.686, .024, .715, { ic: .056, sk: .0958 }],
    0x56: [.686, .077, .737, { ic: .037, sk: .0319 }],
    0x57: [.686, .077, 1.169, { ic: .037, sk: .0958 }],
    0x58: [.686, 0, .817, { ic: .089, sk: .16 }],
    0x59: [.686, .164, .759, { ic: .038, sk: .0958 }],
    0x5A: [.686, 0, .818, { ic: .035, sk: .16 }],
};
//# sourceMappingURL=tex-oldstyle-bold.js.map

/***/ }),

/***/ 49176:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texOldstyle = void 0;
exports.texOldstyle = {
    0x30: [.452, .022, .5],
    0x31: [.453, 0, .5],
    0x32: [.453, 0, .5],
    0x33: [.452, .216, .5],
    0x34: [.464, .194, .5],
    0x35: [.453, .216, .5],
    0x36: [.665, .022, .5],
    0x37: [.463, .216, .5],
    0x38: [.666, .021, .5],
    0x39: [.453, .216, .5],
    0x41: [.728, .05, .798, { ic: .021, sk: .194 }],
    0x42: [.705, .022, .657, { sk: .139 }],
    0x43: [.705, .025, .527, { sk: .139 }],
    0x44: [.683, 0, .771, { sk: .0833 }],
    0x45: [.705, .022, .528, { ic: .036, sk: .111 }],
    0x46: [.683, .032, .719, { ic: .11, sk: .111 }],
    0x47: [.704, .119, .595, { sk: .111 }],
    0x48: [.683, .048, .845, { sk: .111 }],
    0x49: [.683, 0, .545, { ic: .097, sk: .0278 }],
    0x4A: [.683, .119, .678, { ic: .161, sk: .167 }],
    0x4B: [.705, .022, .762, { sk: .0556 }],
    0x4C: [.705, .022, .69, { sk: .139 }],
    0x4D: [.705, .05, 1.201, { sk: .139 }],
    0x4E: [.789, .05, .82, { ic: .159, sk: .0833 }],
    0x4F: [.705, .022, .796, { sk: .111 }],
    0x50: [.683, .057, .696, { ic: .037, sk: .0833 }],
    0x51: [.705, .131, .817, { sk: .111 }],
    0x52: [.682, .022, .848, { sk: .0833 }],
    0x53: [.705, .022, .606, { ic: .036, sk: .139 }],
    0x54: [.717, .068, .545, { ic: .288, sk: .0278 }],
    0x55: [.683, .028, .626, { ic: .061, sk: .0833 }],
    0x56: [.683, .052, .613, { ic: .045, sk: .0278 }],
    0x57: [.683, .053, .988, { ic: .046, sk: .0833 }],
    0x58: [.683, 0, .713, { ic: .094, sk: .139 }],
    0x59: [.683, .143, .668, { ic: .046, sk: .0833 }],
    0x5A: [.683, 0, .725, { ic: .042, sk: .139 }],
};
//# sourceMappingURL=tex-oldstyle.js.map

/***/ }),

/***/ 77839:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texSize3 = void 0;
exports.texSize3 = {
    0x28: [1.45, .949, .736],
    0x29: [1.45, .949, .736],
    0x2F: [1.45, .949, 1.044],
    0x5B: [1.45, .949, .528],
    0x5C: [1.45, .949, 1.044],
    0x5D: [1.45, .949, .528],
    0x7B: [1.45, .949, .75],
    0x7D: [1.45, .949, .75],
    0x2C6: [.772, -0.564, 1.444],
    0x2DC: [.749, -0.61, 1.444],
    0x302: [.772, -0.564, 0],
    0x303: [.749, -0.61, 0],
    0x2044: [1.45, .949, 1.044],
    0x221A: [1.45, .95, 1, { ic: .02 }],
    0x2308: [1.45, .949, .583],
    0x2309: [1.45, .949, .583],
    0x230A: [1.45, .949, .583],
    0x230B: [1.45, .949, .583],
    0x2329: [1.45, .95, .75],
    0x232A: [1.45, .949, .75],
    0x27E8: [1.45, .95, .75],
    0x27E9: [1.45, .949, .75],
    0x3008: [1.45, .95, .75],
    0x3009: [1.45, .949, .75],
};
//# sourceMappingURL=tex-size3.js.map

/***/ }),

/***/ 68291:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texSize4 = void 0;
exports.texSize4 = {
    0x28: [1.75, 1.249, .792],
    0x29: [1.75, 1.249, .792],
    0x2F: [1.75, 1.249, 1.278],
    0x5B: [1.75, 1.249, .583],
    0x5C: [1.75, 1.249, 1.278],
    0x5D: [1.75, 1.249, .583],
    0x7B: [1.75, 1.249, .806],
    0x7D: [1.75, 1.249, .806],
    0x2C6: [.845, -0.561, 1.889, { ic: .013 }],
    0x2DC: [.823, -0.583, 1.889],
    0x302: [.845, -0.561, 0, { ic: .013 }],
    0x303: [.823, -0.583, 0],
    0x2044: [1.75, 1.249, 1.278],
    0x221A: [1.75, 1.25, 1, { ic: .02 }],
    0x2308: [1.75, 1.249, .639],
    0x2309: [1.75, 1.249, .639],
    0x230A: [1.75, 1.249, .639],
    0x230B: [1.75, 1.249, .639],
    0x2329: [1.75, 1.248, .806],
    0x232A: [1.75, 1.248, .806],
    0x239B: [1.154, .655, .875],
    0x239C: [.61, .01, .875],
    0x239D: [1.165, .644, .875],
    0x239E: [1.154, .655, .875],
    0x239F: [.61, .01, .875],
    0x23A0: [1.165, .644, .875],
    0x23A1: [1.154, .645, .667],
    0x23A2: [.602, 0, .667],
    0x23A3: [1.155, .644, .667],
    0x23A4: [1.154, .645, .667],
    0x23A5: [.602, 0, .667],
    0x23A6: [1.155, .644, .667],
    0x23A7: [.899, .01, .889],
    0x23A8: [1.16, .66, .889],
    0x23A9: [.01, .899, .889],
    0x23AA: [.29, .015, .889],
    0x23AB: [.899, .01, .889],
    0x23AC: [1.16, .66, .889],
    0x23AD: [.01, .899, .889],
    0x23B7: [.935, .885, 1.056],
    0x27E8: [1.75, 1.248, .806],
    0x27E9: [1.75, 1.248, .806],
    0x3008: [1.75, 1.248, .806],
    0x3009: [1.75, 1.248, .806],
    0xE000: [.625, .014, 1.056],
    0xE001: [.605, .014, 1.056, { ic: .02 }],
    0xE150: [.12, .213, .45, { ic: .01 }],
    0xE151: [.12, .213, .45, { ic: .024 }],
    0xE152: [.333, 0, .45, { ic: .01 }],
    0xE153: [.333, 0, .45, { ic: .024 }],
    0xE154: [.32, .2, .4, { ic: .01 }],
    0xE155: [.333, 0, .9, { ic: .01 }],
    0xE156: [.12, .213, .9, { ic: .01 }],
};
//# sourceMappingURL=tex-size4.js.map

/***/ }),

/***/ 19539:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.texVariant = void 0;
exports.texVariant = {
    0x2C6: [.845, -0.561, 2.333, { ic: .013 }],
    0x2DC: [.899, -0.628, 2.333],
    0x302: [.845, -0.561, 0, { ic: .013 }],
    0x303: [.899, -0.628, 0],
    0x3F0: [.434, .006, .667, { ic: .067 }],
    0x210F: [.695, .013, .54, { ic: .022 }],
    0x2190: [.437, -0.064, .5],
    0x2192: [.437, -0.064, .5],
    0x21CC: [.514, .014, 1],
    0x2204: [.86, .166, .556],
    0x2205: [.587, 0, .778],
    0x2212: [.27, -0.23, .5],
    0x2216: [.43, .023, .778],
    0x221D: [.472, -0.028, .778],
    0x2223: [.43, .023, .222],
    0x2224: [.43, .023, .222, { ic: .018 }],
    0x2225: [.431, .023, .389],
    0x2226: [.431, .024, .389, { ic: .018 }],
    0x223C: [.365, -0.132, .778],
    0x2248: [.481, -0.05, .778],
    0x2268: [.752, .284, .778],
    0x2269: [.752, .284, .778],
    0x2270: [.919, .421, .778],
    0x2271: [.919, .421, .778],
    0x2288: [.828, .33, .778],
    0x2289: [.828, .33, .778],
    0x228A: [.634, .255, .778],
    0x228B: [.634, .254, .778],
    0x22A8: [.694, 0, .611],
    0x22C5: [.189, 0, .278],
    0x2322: [.378, -0.122, .778],
    0x2323: [.378, -0.143, .778],
    0x25B3: [.575, .02, .722],
    0x25BD: [.576, .019, .722],
    0x2A87: [.801, .303, .778],
    0x2A88: [.801, .303, .778],
    0x2ACB: [.752, .332, .778],
    0x2ACC: [.752, .333, .778],
};
//# sourceMappingURL=tex-variant.js.map

/***/ }),

/***/ 83292:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BBox = void 0;
var lengths_js_1 = __webpack_require__(77130);
var BBox = (function () {
    function BBox(def) {
        if (def === void 0) { def = { w: 0, h: -lengths_js_1.BIGDIMEN, d: -lengths_js_1.BIGDIMEN }; }
        this.w = def.w || 0;
        this.h = ('h' in def ? def.h : -lengths_js_1.BIGDIMEN);
        this.d = ('d' in def ? def.d : -lengths_js_1.BIGDIMEN);
        this.L = this.R = this.ic = this.sk = this.dx = 0;
        this.scale = this.rscale = 1;
        this.pwidth = '';
    }
    BBox.zero = function () {
        return new BBox({ h: 0, d: 0, w: 0 });
    };
    BBox.empty = function () {
        return new BBox();
    };
    BBox.prototype.empty = function () {
        this.w = 0;
        this.h = this.d = -lengths_js_1.BIGDIMEN;
        return this;
    };
    BBox.prototype.clean = function () {
        if (this.w === -lengths_js_1.BIGDIMEN)
            this.w = 0;
        if (this.h === -lengths_js_1.BIGDIMEN)
            this.h = 0;
        if (this.d === -lengths_js_1.BIGDIMEN)
            this.d = 0;
    };
    BBox.prototype.rescale = function (scale) {
        this.w *= scale;
        this.h *= scale;
        this.d *= scale;
    };
    BBox.prototype.combine = function (cbox, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var rscale = cbox.rscale;
        var w = x + rscale * (cbox.w + cbox.L + cbox.R);
        var h = y + rscale * cbox.h;
        var d = rscale * cbox.d - y;
        if (w > this.w)
            this.w = w;
        if (h > this.h)
            this.h = h;
        if (d > this.d)
            this.d = d;
    };
    BBox.prototype.append = function (cbox) {
        var scale = cbox.rscale;
        this.w += scale * (cbox.w + cbox.L + cbox.R);
        if (scale * cbox.h > this.h) {
            this.h = scale * cbox.h;
        }
        if (scale * cbox.d > this.d) {
            this.d = scale * cbox.d;
        }
    };
    BBox.prototype.updateFrom = function (cbox) {
        this.h = cbox.h;
        this.d = cbox.d;
        this.w = cbox.w;
        if (cbox.pwidth) {
            this.pwidth = cbox.pwidth;
        }
    };
    BBox.fullWidth = '100%';
    BBox.StyleAdjust = [
        ['borderTopWidth', 'h'],
        ['borderRightWidth', 'w'],
        ['borderBottomWidth', 'd'],
        ['borderLeftWidth', 'w', 0],
        ['paddingTop', 'h'],
        ['paddingRight', 'w'],
        ['paddingBottom', 'd'],
        ['paddingLeft', 'w', 0]
    ];
    return BBox;
}());
exports.BBox = BBox;
//# sourceMappingURL=BBox.js.map

/***/ }),

/***/ 64905:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FunctionList = void 0;
var PrioritizedList_js_1 = __webpack_require__(4180);
var FunctionList = (function (_super) {
    __extends(FunctionList, _super);
    function FunctionList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionList.prototype.execute = function () {
        var e_1, _a;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                var result = item.item.apply(item, __spreadArray([], __read(data), false));
                if (result === false) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    FunctionList.prototype.asyncExecute = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        var i = -1;
        var items = this.items;
        return new Promise(function (ok, fail) {
            (function execute() {
                var _a;
                while (++i < items.length) {
                    var result = (_a = items[i]).item.apply(_a, __spreadArray([], __read(data), false));
                    if (result instanceof Promise) {
                        result.then(execute).catch(function (err) { return fail(err); });
                        return;
                    }
                    if (result === false) {
                        ok(false);
                        return;
                    }
                }
                ok(true);
            })();
        });
    };
    return FunctionList;
}(PrioritizedList_js_1.PrioritizedList));
exports.FunctionList = FunctionList;
//# sourceMappingURL=FunctionList.js.map

/***/ }),

/***/ 36059:
/***/ (function(__unused_webpack_module, exports) {


var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lookup = exports.separateOptions = exports.selectOptionsFromKeys = exports.selectOptions = exports.userOptions = exports.defaultOptions = exports.insert = exports.copy = exports.keys = exports.makeArray = exports.expandable = exports.Expandable = exports.OPTIONS = exports.REMOVE = exports.APPEND = exports.isObject = void 0;
var OBJECT = {}.constructor;
function isObject(obj) {
    return typeof obj === 'object' && obj !== null &&
        (obj.constructor === OBJECT || obj.constructor === Expandable);
}
exports.isObject = isObject;
exports.APPEND = '[+]';
exports.REMOVE = '[-]';
exports.OPTIONS = {
    invalidOption: 'warn',
    optionError: function (message, _key) {
        if (exports.OPTIONS.invalidOption === 'fatal') {
            throw new Error(message);
        }
        console.warn('MathJax: ' + message);
    }
};
var Expandable = (function () {
    function Expandable() {
    }
    return Expandable;
}());
exports.Expandable = Expandable;
function expandable(def) {
    return Object.assign(Object.create(Expandable.prototype), def);
}
exports.expandable = expandable;
function makeArray(x) {
    return Array.isArray(x) ? x : [x];
}
exports.makeArray = makeArray;
function keys(def) {
    if (!def) {
        return [];
    }
    return Object.keys(def).concat(Object.getOwnPropertySymbols(def));
}
exports.keys = keys;
function copy(def) {
    var e_1, _a;
    var props = {};
    try {
        for (var _b = __values(keys(def)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var prop = Object.getOwnPropertyDescriptor(def, key);
            var value = prop.value;
            if (Array.isArray(value)) {
                prop.value = insert([], value, false);
            }
            else if (isObject(value)) {
                prop.value = copy(value);
            }
            if (prop.enumerable) {
                props[key] = prop;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return Object.defineProperties(def.constructor === Expandable ? expandable({}) : {}, props);
}
exports.copy = copy;
function insert(dst, src, warn) {
    var e_2, _a;
    if (warn === void 0) { warn = true; }
    var _loop_1 = function (key) {
        if (warn && dst[key] === undefined && dst.constructor !== Expandable) {
            if (typeof key === 'symbol') {
                key = key.toString();
            }
            exports.OPTIONS.optionError("Invalid option \"".concat(key, "\" (no default value)."), key);
            return "continue";
        }
        var sval = src[key], dval = dst[key];
        if (isObject(sval) && dval !== null &&
            (typeof dval === 'object' || typeof dval === 'function')) {
            var ids = keys(sval);
            if (Array.isArray(dval) &&
                ((ids.length === 1 && (ids[0] === exports.APPEND || ids[0] === exports.REMOVE) && Array.isArray(sval[ids[0]])) ||
                    (ids.length === 2 && ids.sort().join(',') === exports.APPEND + ',' + exports.REMOVE &&
                        Array.isArray(sval[exports.APPEND]) && Array.isArray(sval[exports.REMOVE])))) {
                if (sval[exports.REMOVE]) {
                    dval = dst[key] = dval.filter(function (x) { return sval[exports.REMOVE].indexOf(x) < 0; });
                }
                if (sval[exports.APPEND]) {
                    dst[key] = __spreadArray(__spreadArray([], __read(dval), false), __read(sval[exports.APPEND]), false);
                }
            }
            else {
                insert(dval, sval, warn);
            }
        }
        else if (Array.isArray(sval)) {
            dst[key] = [];
            insert(dst[key], sval, false);
        }
        else if (isObject(sval)) {
            dst[key] = copy(sval);
        }
        else {
            dst[key] = sval;
        }
    };
    try {
        for (var _b = __values(keys(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            _loop_1(key);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return dst;
}
exports.insert = insert;
function defaultOptions(options) {
    var defs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        defs[_i - 1] = arguments[_i];
    }
    defs.forEach(function (def) { return insert(options, def, false); });
    return options;
}
exports.defaultOptions = defaultOptions;
function userOptions(options) {
    var defs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        defs[_i - 1] = arguments[_i];
    }
    defs.forEach(function (def) { return insert(options, def, true); });
    return options;
}
exports.userOptions = userOptions;
function selectOptions(options) {
    var e_3, _a;
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var subset = {};
    try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            if (options.hasOwnProperty(key)) {
                subset[key] = options[key];
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return subset;
}
exports.selectOptions = selectOptions;
function selectOptionsFromKeys(options, object) {
    return selectOptions.apply(void 0, __spreadArray([options], __read(Object.keys(object)), false));
}
exports.selectOptionsFromKeys = selectOptionsFromKeys;
function separateOptions(options) {
    var e_4, _a, e_5, _b;
    var objects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
    }
    var results = [];
    try {
        for (var objects_1 = __values(objects), objects_1_1 = objects_1.next(); !objects_1_1.done; objects_1_1 = objects_1.next()) {
            var object = objects_1_1.value;
            var exists = {}, missing = {};
            try {
                for (var _c = (e_5 = void 0, __values(Object.keys(options || {}))), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var key = _d.value;
                    (object[key] === undefined ? missing : exists)[key] = options[key];
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            results.push(exists);
            options = missing;
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (objects_1_1 && !objects_1_1.done && (_a = objects_1.return)) _a.call(objects_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    results.unshift(options);
    return results;
}
exports.separateOptions = separateOptions;
function lookup(name, lookup, def) {
    if (def === void 0) { def = null; }
    return (lookup.hasOwnProperty(name) ? lookup[name] : def);
}
exports.lookup = lookup;
//# sourceMappingURL=Options.js.map

/***/ }),

/***/ 4180:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrioritizedList = void 0;
var PrioritizedList = (function () {
    function PrioritizedList() {
        this.items = [];
        this.items = [];
    }
    PrioritizedList.prototype[Symbol.iterator] = function () {
        var i = 0;
        var items = this.items;
        return {
            next: function () {
                return { value: items[i++], done: (i > items.length) };
            }
        };
    };
    PrioritizedList.prototype.add = function (item, priority) {
        if (priority === void 0) { priority = PrioritizedList.DEFAULTPRIORITY; }
        var i = this.items.length;
        do {
            i--;
        } while (i >= 0 && priority < this.items[i].priority);
        this.items.splice(i + 1, 0, { item: item, priority: priority });
        return item;
    };
    PrioritizedList.prototype.remove = function (item) {
        var i = this.items.length;
        do {
            i--;
        } while (i >= 0 && this.items[i].item !== item);
        if (i >= 0) {
            this.items.splice(i, 1);
        }
    };
    PrioritizedList.DEFAULTPRIORITY = 5;
    return PrioritizedList;
}());
exports.PrioritizedList = PrioritizedList;
//# sourceMappingURL=PrioritizedList.js.map

/***/ }),

/***/ 24219:
/***/ (function(__unused_webpack_module, exports) {


var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssStyles = void 0;
var CssStyles = (function () {
    function CssStyles(styles) {
        if (styles === void 0) { styles = null; }
        this.styles = {};
        this.addStyles(styles);
    }
    Object.defineProperty(CssStyles.prototype, "cssText", {
        get: function () {
            return this.getStyleString();
        },
        enumerable: false,
        configurable: true
    });
    CssStyles.prototype.addStyles = function (styles) {
        var e_1, _a;
        if (!styles)
            return;
        try {
            for (var _b = __values(Object.keys(styles)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var style = _c.value;
                if (!this.styles[style]) {
                    this.styles[style] = {};
                }
                Object.assign(this.styles[style], styles[style]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CssStyles.prototype.removeStyles = function () {
        var e_2, _a;
        var selectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selectors[_i] = arguments[_i];
        }
        try {
            for (var selectors_1 = __values(selectors), selectors_1_1 = selectors_1.next(); !selectors_1_1.done; selectors_1_1 = selectors_1.next()) {
                var selector = selectors_1_1.value;
                delete this.styles[selector];
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (selectors_1_1 && !selectors_1_1.done && (_a = selectors_1.return)) _a.call(selectors_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    CssStyles.prototype.clear = function () {
        this.styles = {};
    };
    CssStyles.prototype.getStyleString = function () {
        return this.getStyleRules().join('\n\n');
    };
    CssStyles.prototype.getStyleRules = function () {
        var e_3, _a;
        var selectors = Object.keys(this.styles);
        var defs = new Array(selectors.length);
        var i = 0;
        try {
            for (var selectors_2 = __values(selectors), selectors_2_1 = selectors_2.next(); !selectors_2_1.done; selectors_2_1 = selectors_2.next()) {
                var selector = selectors_2_1.value;
                defs[i++] = selector + ' {\n' + this.getStyleDefString(this.styles[selector]) + '\n}';
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (selectors_2_1 && !selectors_2_1.done && (_a = selectors_2.return)) _a.call(selectors_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return defs;
    };
    CssStyles.prototype.getStyleDefString = function (styles) {
        var e_4, _a;
        var properties = Object.keys(styles);
        var values = new Array(properties.length);
        var i = 0;
        try {
            for (var properties_1 = __values(properties), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                var property = properties_1_1.value;
                values[i++] = '  ' + property + ': ' + styles[property] + ';';
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return values.join('\n');
    };
    return CssStyles;
}());
exports.CssStyles = CssStyles;
//# sourceMappingURL=StyleList.js.map

/***/ }),

/***/ 30502:
/***/ (function(__unused_webpack_module, exports) {


var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Styles = void 0;
var TRBL = ['top', 'right', 'bottom', 'left'];
var WSC = ['width', 'style', 'color'];
function splitSpaces(text) {
    var parts = text.split(/((?:'[^']*'|"[^"]*"|,[\s\n]|[^\s\n])*)/g);
    var split = [];
    while (parts.length > 1) {
        parts.shift();
        split.push(parts.shift());
    }
    return split;
}
function splitTRBL(name) {
    var e_1, _a;
    var parts = splitSpaces(this.styles[name]);
    if (parts.length === 0) {
        parts.push('');
    }
    if (parts.length === 1) {
        parts.push(parts[0]);
    }
    if (parts.length === 2) {
        parts.push(parts[0]);
    }
    if (parts.length === 3) {
        parts.push(parts[1]);
    }
    try {
        for (var _b = __values(Styles.connect[name].children), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            this.setStyle(this.childName(name, child), parts.shift());
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function combineTRBL(name) {
    var e_2, _a;
    var children = Styles.connect[name].children;
    var parts = [];
    try {
        for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
            var child = children_1_1.value;
            var part = this.styles[name + '-' + child];
            if (!part) {
                delete this.styles[name];
                return;
            }
            parts.push(part);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (parts[3] === parts[1]) {
        parts.pop();
        if (parts[2] === parts[0]) {
            parts.pop();
            if (parts[1] === parts[0]) {
                parts.pop();
            }
        }
    }
    this.styles[name] = parts.join(' ');
}
function splitSame(name) {
    var e_3, _a;
    try {
        for (var _b = __values(Styles.connect[name].children), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            this.setStyle(this.childName(name, child), this.styles[name]);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
}
function combineSame(name) {
    var e_4, _a;
    var children = __spreadArray([], __read(Styles.connect[name].children), false);
    var value = this.styles[this.childName(name, children.shift())];
    try {
        for (var children_2 = __values(children), children_2_1 = children_2.next(); !children_2_1.done; children_2_1 = children_2.next()) {
            var child = children_2_1.value;
            if (this.styles[this.childName(name, child)] !== value) {
                delete this.styles[name];
                return;
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (children_2_1 && !children_2_1.done && (_a = children_2.return)) _a.call(children_2);
        }
        finally { if (e_4) throw e_4.error; }
    }
    this.styles[name] = value;
}
var BORDER = {
    width: /^(?:[\d.]+(?:[a-z]+)|thin|medium|thick|inherit|initial|unset)$/,
    style: /^(?:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit|initial|unset)$/
};
function splitWSC(name) {
    var e_5, _a, e_6, _b;
    var parts = { width: '', style: '', color: '' };
    try {
        for (var _c = __values(splitSpaces(this.styles[name])), _d = _c.next(); !_d.done; _d = _c.next()) {
            var part = _d.value;
            if (part.match(BORDER.width) && parts.width === '') {
                parts.width = part;
            }
            else if (part.match(BORDER.style) && parts.style === '') {
                parts.style = part;
            }
            else {
                parts.color = part;
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_5) throw e_5.error; }
    }
    try {
        for (var _e = __values(Styles.connect[name].children), _f = _e.next(); !_f.done; _f = _e.next()) {
            var child = _f.value;
            this.setStyle(this.childName(name, child), parts[child]);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_6) throw e_6.error; }
    }
}
function combineWSC(name) {
    var e_7, _a;
    var parts = [];
    try {
        for (var _b = __values(Styles.connect[name].children), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            var value = this.styles[this.childName(name, child)];
            if (value) {
                parts.push(value);
            }
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_7) throw e_7.error; }
    }
    if (parts.length) {
        this.styles[name] = parts.join(' ');
    }
    else {
        delete this.styles[name];
    }
}
var FONT = {
    style: /^(?:normal|italic|oblique|inherit|initial|unset)$/,
    variant: new RegExp('^(?:' +
        ['normal|none',
            'inherit|initial|unset',
            'common-ligatures|no-common-ligatures',
            'discretionary-ligatures|no-discretionary-ligatures',
            'historical-ligatures|no-historical-ligatures',
            'contextual|no-contextual',
            '(?:stylistic|character-variant|swash|ornaments|annotation)\\([^)]*\\)',
            'small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps',
            'lining-nums|oldstyle-nums|proportional-nums|tabular-nums',
            'diagonal-fractions|stacked-fractions',
            'ordinal|slashed-zero',
            'jis78|jis83|jis90|jis04|simplified|traditional',
            'full-width|proportional-width',
            'ruby'].join('|') + ')$'),
    weight: /^(?:normal|bold|bolder|lighter|[1-9]00|inherit|initial|unset)$/,
    stretch: new RegExp('^(?:' +
        ['normal',
            '(?:(?:ultra|extra|semi)-)?condensed',
            '(?:(?:semi|extra|ulta)-)?expanded',
            'inherit|initial|unset'].join('|') + ')$'),
    size: new RegExp('^(?:' +
        ['xx-small|x-small|small|medium|large|x-large|xx-large|larger|smaller',
            '[\d.]+%|[\d.]+[a-z]+',
            'inherit|initial|unset'].join('|') + ')' +
        '(?:\/(?:normal|[\d.\+](?:%|[a-z]+)?))?$')
};
function splitFont(name) {
    var e_8, _a, e_9, _b;
    var parts = splitSpaces(this.styles[name]);
    var value = {
        style: '', variant: [], weight: '', stretch: '',
        size: '', family: '', 'line-height': ''
    };
    try {
        for (var parts_1 = __values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
            var part = parts_1_1.value;
            value.family = part;
            try {
                for (var _c = (e_9 = void 0, __values(Object.keys(FONT))), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var name_1 = _d.value;
                    if ((Array.isArray(value[name_1]) || value[name_1] === '') && part.match(FONT[name_1])) {
                        if (name_1 === 'size') {
                            var _e = __read(part.split(/\//), 2), size = _e[0], height = _e[1];
                            value[name_1] = size;
                            if (height) {
                                value['line-height'] = height;
                            }
                        }
                        else if (value.size === '') {
                            if (Array.isArray(value[name_1])) {
                                value[name_1].push(part);
                            }
                            else {
                                value[name_1] = part;
                            }
                        }
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) _a.call(parts_1);
        }
        finally { if (e_8) throw e_8.error; }
    }
    saveFontParts(name, value);
    delete this.styles[name];
}
function saveFontParts(name, value) {
    var e_10, _a;
    try {
        for (var _b = __values(Styles.connect[name].children), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            var cname = this.childName(name, child);
            if (Array.isArray(value[child])) {
                var values = value[child];
                if (values.length) {
                    this.styles[cname] = values.join(' ');
                }
            }
            else if (value[child] !== '') {
                this.styles[cname] = value[child];
            }
        }
    }
    catch (e_10_1) { e_10 = { error: e_10_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_10) throw e_10.error; }
    }
}
function combineFont(_name) { }
var Styles = (function () {
    function Styles(cssText) {
        if (cssText === void 0) { cssText = ''; }
        this.parse(cssText);
    }
    Object.defineProperty(Styles.prototype, "cssText", {
        get: function () {
            var e_11, _a;
            var styles = [];
            try {
                for (var _b = __values(Object.keys(this.styles)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name_2 = _c.value;
                    var parent_1 = this.parentName(name_2);
                    if (!this.styles[parent_1]) {
                        styles.push(name_2 + ': ' + this.styles[name_2] + ';');
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
            return styles.join(' ');
        },
        enumerable: false,
        configurable: true
    });
    Styles.prototype.set = function (name, value) {
        name = this.normalizeName(name);
        this.setStyle(name, value);
        if (Styles.connect[name] && !Styles.connect[name].combine) {
            this.combineChildren(name);
            delete this.styles[name];
        }
        while (name.match(/-/)) {
            name = this.parentName(name);
            if (!Styles.connect[name])
                break;
            Styles.connect[name].combine.call(this, name);
        }
    };
    Styles.prototype.get = function (name) {
        name = this.normalizeName(name);
        return (this.styles.hasOwnProperty(name) ? this.styles[name] : '');
    };
    Styles.prototype.setStyle = function (name, value) {
        this.styles[name] = value;
        if (Styles.connect[name] && Styles.connect[name].children) {
            Styles.connect[name].split.call(this, name);
        }
        if (value === '') {
            delete this.styles[name];
        }
    };
    Styles.prototype.combineChildren = function (name) {
        var e_12, _a;
        var parent = this.parentName(name);
        try {
            for (var _b = __values(Styles.connect[name].children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                var cname = this.childName(parent, child);
                Styles.connect[cname].combine.call(this, cname);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_12) throw e_12.error; }
        }
    };
    Styles.prototype.parentName = function (name) {
        var parent = name.replace(/-[^-]*$/, '');
        return (name === parent ? '' : parent);
    };
    Styles.prototype.childName = function (name, child) {
        if (child.match(/-/)) {
            return child;
        }
        if (Styles.connect[name] && !Styles.connect[name].combine) {
            child += name.replace(/.*-/, '-');
            name = this.parentName(name);
        }
        return name + '-' + child;
    };
    Styles.prototype.normalizeName = function (name) {
        return name.replace(/[A-Z]/g, function (c) { return '-' + c.toLowerCase(); });
    };
    Styles.prototype.parse = function (cssText) {
        if (cssText === void 0) { cssText = ''; }
        var PATTERN = this.constructor.pattern;
        this.styles = {};
        var parts = cssText.replace(PATTERN.comment, '').split(PATTERN.style);
        while (parts.length > 1) {
            var _a = __read(parts.splice(0, 3), 3), space = _a[0], name_3 = _a[1], value = _a[2];
            if (space.match(/[^\s\n]/))
                return;
            this.set(name_3, value);
        }
    };
    Styles.pattern = {
        style: /([-a-z]+)[\s\n]*:[\s\n]*((?:'[^']*'|"[^"]*"|\n|.)*?)[\s\n]*(?:;|$)/g,
        comment: /\/\*[^]*?\*\//g
    };
    Styles.connect = {
        padding: {
            children: TRBL,
            split: splitTRBL,
            combine: combineTRBL
        },
        border: {
            children: TRBL,
            split: splitSame,
            combine: combineSame
        },
        'border-top': {
            children: WSC,
            split: splitWSC,
            combine: combineWSC
        },
        'border-right': {
            children: WSC,
            split: splitWSC,
            combine: combineWSC
        },
        'border-bottom': {
            children: WSC,
            split: splitWSC,
            combine: combineWSC
        },
        'border-left': {
            children: WSC,
            split: splitWSC,
            combine: combineWSC
        },
        'border-width': {
            children: TRBL,
            split: splitTRBL,
            combine: null
        },
        'border-style': {
            children: TRBL,
            split: splitTRBL,
            combine: null
        },
        'border-color': {
            children: TRBL,
            split: splitTRBL,
            combine: null
        },
        font: {
            children: ['style', 'variant', 'weight', 'stretch', 'line-height', 'size', 'family'],
            split: splitFont,
            combine: combineFont
        }
    };
    return Styles;
}());
exports.Styles = Styles;
//# sourceMappingURL=Styles.js.map

/***/ }),

/***/ 77130:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.px = exports.emRounded = exports.em = exports.percent = exports.length2em = exports.MATHSPACE = exports.RELUNITS = exports.UNITS = exports.BIGDIMEN = void 0;
exports.BIGDIMEN = 1000000;
exports.UNITS = {
    px: 1,
    'in': 96,
    cm: 96 / 2.54,
    mm: 96 / 25.4
};
exports.RELUNITS = {
    em: 1,
    ex: .431,
    pt: 1 / 10,
    pc: 12 / 10,
    mu: 1 / 18
};
exports.MATHSPACE = {
    veryverythinmathspace: 1 / 18,
    verythinmathspace: 2 / 18,
    thinmathspace: 3 / 18,
    mediummathspace: 4 / 18,
    thickmathspace: 5 / 18,
    verythickmathspace: 6 / 18,
    veryverythickmathspace: 7 / 18,
    negativeveryverythinmathspace: -1 / 18,
    negativeverythinmathspace: -2 / 18,
    negativethinmathspace: -3 / 18,
    negativemediummathspace: -4 / 18,
    negativethickmathspace: -5 / 18,
    negativeverythickmathspace: -6 / 18,
    negativeveryverythickmathspace: -7 / 18,
    thin: .04,
    medium: .06,
    thick: .1,
    normal: 1,
    big: 2,
    small: 1 / Math.sqrt(2),
    infinity: exports.BIGDIMEN
};
function length2em(length, size, scale, em) {
    if (size === void 0) { size = 0; }
    if (scale === void 0) { scale = 1; }
    if (em === void 0) { em = 16; }
    if (typeof length !== 'string') {
        length = String(length);
    }
    if (length === '' || length == null) {
        return size;
    }
    if (exports.MATHSPACE[length]) {
        return exports.MATHSPACE[length];
    }
    var match = length.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
    if (!match) {
        return size;
    }
    var m = parseFloat(match[1] || '1'), unit = match[2];
    if (exports.UNITS.hasOwnProperty(unit)) {
        return m * exports.UNITS[unit] / em / scale;
    }
    if (exports.RELUNITS.hasOwnProperty(unit)) {
        return m * exports.RELUNITS[unit];
    }
    if (unit === '%') {
        return m / 100 * size;
    }
    return m * size;
}
exports.length2em = length2em;
function percent(m) {
    return (100 * m).toFixed(1).replace(/\.?0+$/, '') + '%';
}
exports.percent = percent;
function em(m) {
    if (Math.abs(m) < .001)
        return '0';
    return (m.toFixed(3).replace(/\.?0+$/, '')) + 'em';
}
exports.em = em;
function emRounded(m, em) {
    if (em === void 0) { em = 16; }
    m = (Math.round(m * em) + .05) / em;
    if (Math.abs(m) < .001)
        return '0em';
    return m.toFixed(3).replace(/\.?0+$/, '') + 'em';
}
exports.emRounded = emRounded;
function px(m, M, em) {
    if (M === void 0) { M = -exports.BIGDIMEN; }
    if (em === void 0) { em = 16; }
    m *= em;
    if (M && m < M)
        m = M;
    if (Math.abs(m) < .1)
        return '0';
    return m.toFixed(1).replace(/\.0$/, '') + 'px';
}
exports.px = px;
//# sourceMappingURL=lengths.js.map

/***/ }),

/***/ 72125:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.max = exports.sum = void 0;
function sum(A) {
    return A.reduce(function (a, b) { return a + b; }, 0);
}
exports.sum = sum;
function max(A) {
    return A.reduce(function (a, b) { return Math.max(a, b); }, 0);
}
exports.max = max;
//# sourceMappingURL=numeric.js.map

/***/ }),

/***/ 33353:
/***/ (function(__unused_webpack_module, exports) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.split = exports.isPercent = exports.unicodeString = exports.unicodeChars = exports.quotePattern = exports.sortLength = void 0;
function sortLength(a, b) {
    return a.length !== b.length ? b.length - a.length : a === b ? 0 : a < b ? -1 : 1;
}
exports.sortLength = sortLength;
function quotePattern(text) {
    return text.replace(/([\^$(){}+*?\-|\[\]\:\\])/g, '\\$1');
}
exports.quotePattern = quotePattern;
function unicodeChars(text) {
    return Array.from(text).map(function (c) { return c.codePointAt(0); });
}
exports.unicodeChars = unicodeChars;
function unicodeString(data) {
    return String.fromCodePoint.apply(String, __spreadArray([], __read(data), false));
}
exports.unicodeString = unicodeString;
function isPercent(x) {
    return !!x.match(/%\s*$/);
}
exports.isPercent = isPercent;
function split(x) {
    return x.trim().split(/\s+/);
}
exports.split = split;
//# sourceMappingURL=string.js.map

/***/ })

};
;