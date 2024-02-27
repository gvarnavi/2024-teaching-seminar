"use strict";
exports.id = 9826;
exports.ids = [9826,786];
exports.modules = {

/***/ 73132:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VERSION = void 0;
exports.VERSION = '3.2.2';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ 43582:
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
exports.HandlerList = void 0;
var PrioritizedList_js_1 = __webpack_require__(4180);
var HandlerList = (function (_super) {
    __extends(HandlerList, _super);
    function HandlerList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HandlerList.prototype.register = function (handler) {
        return this.add(handler, handler.priority);
    };
    HandlerList.prototype.unregister = function (handler) {
        this.remove(handler);
    };
    HandlerList.prototype.handlesDocument = function (document) {
        var e_1, _a;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                var handler = item.item;
                if (handler.handlesDocument(document)) {
                    return handler;
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
        throw new Error("Can't find handler for document");
    };
    HandlerList.prototype.document = function (document, options) {
        if (options === void 0) { options = null; }
        return this.handlesDocument(document).create(document, options);
    };
    return HandlerList;
}(PrioritizedList_js_1.PrioritizedList));
exports.HandlerList = HandlerList;
//# sourceMappingURL=HandlerList.js.map

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

/***/ 89826:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllPackages = void 0;
__webpack_require__(19890);
__webpack_require__(13646);
__webpack_require__(53379);
__webpack_require__(49799);
__webpack_require__(27535);
__webpack_require__(9146);
__webpack_require__(17151);
__webpack_require__(2518);
__webpack_require__(34801);
__webpack_require__(30813);
__webpack_require__(30241);
__webpack_require__(76083);
__webpack_require__(28361);
__webpack_require__(53293);
__webpack_require__(87542);
__webpack_require__(31334);
__webpack_require__(96295);
__webpack_require__(66910);
__webpack_require__(57987);
__webpack_require__(75259);
__webpack_require__(56379);
__webpack_require__(57434);
__webpack_require__(25112);
__webpack_require__(8163);
__webpack_require__(75514);
__webpack_require__(60816);
__webpack_require__(33644);
__webpack_require__(32020);
__webpack_require__(7646);
__webpack_require__(77760);
__webpack_require__(36240);
__webpack_require__(19471);
__webpack_require__(54305);
if (typeof MathJax !== 'undefined' && MathJax.loader) {
    MathJax.loader.preLoad('[tex]/action', '[tex]/ams', '[tex]/amscd', '[tex]/bbox', '[tex]/boldsymbol', '[tex]/braket', '[tex]/bussproofs', '[tex]/cancel', '[tex]/cases', '[tex]/centernot', '[tex]/color', '[tex]/colorv2', '[tex]/colortbl', '[tex]/empheq', '[tex]/enclose', '[tex]/extpfeil', '[tex]/gensymb', '[tex]/html', '[tex]/mathtools', '[tex]/mhchem', '[tex]/newcommand', '[tex]/noerrors', '[tex]/noundefined', '[tex]/physics', '[tex]/upgreek', '[tex]/unicode', '[tex]/verb', '[tex]/configmacros', '[tex]/tagformat', '[tex]/textcomp', '[tex]/textmacros', '[tex]/setoptions');
}
exports.AllPackages = [
    'base',
    'action',
    'ams',
    'amscd',
    'bbox',
    'boldsymbol',
    'braket',
    'bussproofs',
    'cancel',
    'cases',
    'centernot',
    'color',
    'colortbl',
    'empheq',
    'enclose',
    'extpfeil',
    'gensymb',
    'html',
    'mathtools',
    'mhchem',
    'newcommand',
    'noerrors',
    'noundefined',
    'upgreek',
    'unicode',
    'verb',
    'configmacros',
    'tagformat',
    'textcomp',
    'textmacros'
];
//# sourceMappingURL=AllPackages.js.map

/***/ }),

/***/ 23644:
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
exports.ParserConfiguration = exports.ConfigurationHandler = exports.Configuration = void 0;
var Options_js_1 = __webpack_require__(36059);
var MapHandler_js_1 = __webpack_require__(84858);
var FunctionList_js_1 = __webpack_require__(64905);
var PrioritizedList_js_1 = __webpack_require__(4180);
var Tags_js_1 = __webpack_require__(56711);
var Configuration = (function () {
    function Configuration(name, handler, fallback, items, tags, options, nodes, preprocessors, postprocessors, initMethod, configMethod, priority, parser) {
        if (handler === void 0) { handler = {}; }
        if (fallback === void 0) { fallback = {}; }
        if (items === void 0) { items = {}; }
        if (tags === void 0) { tags = {}; }
        if (options === void 0) { options = {}; }
        if (nodes === void 0) { nodes = {}; }
        if (preprocessors === void 0) { preprocessors = []; }
        if (postprocessors === void 0) { postprocessors = []; }
        if (initMethod === void 0) { initMethod = null; }
        if (configMethod === void 0) { configMethod = null; }
        this.name = name;
        this.handler = handler;
        this.fallback = fallback;
        this.items = items;
        this.tags = tags;
        this.options = options;
        this.nodes = nodes;
        this.preprocessors = preprocessors;
        this.postprocessors = postprocessors;
        this.initMethod = initMethod;
        this.configMethod = configMethod;
        this.priority = priority;
        this.parser = parser;
        this.handler = Object.assign({ character: [], delimiter: [], macro: [], environment: [] }, handler);
    }
    Configuration.makeProcessor = function (func, priority) {
        return Array.isArray(func) ? func : [func, priority];
    };
    Configuration._create = function (name, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var priority = config.priority || PrioritizedList_js_1.PrioritizedList.DEFAULTPRIORITY;
        var init = config.init ? this.makeProcessor(config.init, priority) : null;
        var conf = config.config ? this.makeProcessor(config.config, priority) : null;
        var preprocessors = (config.preprocessors || []).map(function (pre) { return _this.makeProcessor(pre, priority); });
        var postprocessors = (config.postprocessors || []).map(function (post) { return _this.makeProcessor(post, priority); });
        var parser = config.parser || 'tex';
        return new Configuration(name, config.handler || {}, config.fallback || {}, config.items || {}, config.tags || {}, config.options || {}, config.nodes || {}, preprocessors, postprocessors, init, conf, priority, parser);
    };
    Configuration.create = function (name, config) {
        if (config === void 0) { config = {}; }
        var configuration = Configuration._create(name, config);
        ConfigurationHandler.set(name, configuration);
        return configuration;
    };
    Configuration.local = function (config) {
        if (config === void 0) { config = {}; }
        return Configuration._create('', config);
    };
    Object.defineProperty(Configuration.prototype, "init", {
        get: function () {
            return this.initMethod ? this.initMethod[0] : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "config", {
        get: function () {
            return this.configMethod ? this.configMethod[0] : null;
        },
        enumerable: false,
        configurable: true
    });
    return Configuration;
}());
exports.Configuration = Configuration;
var ConfigurationHandler;
(function (ConfigurationHandler) {
    var maps = new Map();
    ConfigurationHandler.set = function (name, map) {
        maps.set(name, map);
    };
    ConfigurationHandler.get = function (name) {
        return maps.get(name);
    };
    ConfigurationHandler.keys = function () {
        return maps.keys();
    };
})(ConfigurationHandler = exports.ConfigurationHandler || (exports.ConfigurationHandler = {}));
var ParserConfiguration = (function () {
    function ParserConfiguration(packages, parsers) {
        var e_1, _a, e_2, _b;
        if (parsers === void 0) { parsers = ['tex']; }
        this.initMethod = new FunctionList_js_1.FunctionList();
        this.configMethod = new FunctionList_js_1.FunctionList();
        this.configurations = new PrioritizedList_js_1.PrioritizedList();
        this.parsers = [];
        this.handlers = new MapHandler_js_1.SubHandlers();
        this.items = {};
        this.tags = {};
        this.options = {};
        this.nodes = {};
        this.parsers = parsers;
        try {
            for (var _c = __values(packages.slice().reverse()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var pkg = _d.value;
                this.addPackage(pkg);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _e = __values(this.configurations), _f = _e.next(); !_f.done; _f = _e.next()) {
                var _g = _f.value, config = _g.item, priority = _g.priority;
                this.append(config, priority);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    ParserConfiguration.prototype.init = function () {
        this.initMethod.execute(this);
    };
    ParserConfiguration.prototype.config = function (jax) {
        var e_3, _a;
        this.configMethod.execute(this, jax);
        try {
            for (var _b = __values(this.configurations), _c = _b.next(); !_c.done; _c = _b.next()) {
                var config = _c.value;
                this.addFilters(jax, config.item);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    ParserConfiguration.prototype.addPackage = function (pkg) {
        var name = typeof pkg === 'string' ? pkg : pkg[0];
        var conf = this.getPackage(name);
        conf && this.configurations.add(conf, typeof pkg === 'string' ? conf.priority : pkg[1]);
    };
    ParserConfiguration.prototype.add = function (name, jax, options) {
        var e_4, _a;
        if (options === void 0) { options = {}; }
        var config = this.getPackage(name);
        this.append(config);
        this.configurations.add(config, config.priority);
        this.init();
        var parser = jax.parseOptions;
        parser.nodeFactory.setCreators(config.nodes);
        try {
            for (var _b = __values(Object.keys(config.items)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var kind = _c.value;
                parser.itemFactory.setNodeClass(kind, config.items[kind]);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        Tags_js_1.TagsFactory.addTags(config.tags);
        (0, Options_js_1.defaultOptions)(parser.options, config.options);
        (0, Options_js_1.userOptions)(parser.options, options);
        this.addFilters(jax, config);
        if (config.config) {
            config.config(this, jax);
        }
    };
    ParserConfiguration.prototype.getPackage = function (name) {
        var config = ConfigurationHandler.get(name);
        if (config && this.parsers.indexOf(config.parser) < 0) {
            throw Error("Package ".concat(name, " doesn't target the proper parser"));
        }
        return config;
    };
    ParserConfiguration.prototype.append = function (config, priority) {
        priority = priority || config.priority;
        if (config.initMethod) {
            this.initMethod.add(config.initMethod[0], config.initMethod[1]);
        }
        if (config.configMethod) {
            this.configMethod.add(config.configMethod[0], config.configMethod[1]);
        }
        this.handlers.add(config.handler, config.fallback, priority);
        Object.assign(this.items, config.items);
        Object.assign(this.tags, config.tags);
        (0, Options_js_1.defaultOptions)(this.options, config.options);
        Object.assign(this.nodes, config.nodes);
    };
    ParserConfiguration.prototype.addFilters = function (jax, config) {
        var e_5, _a, e_6, _b;
        try {
            for (var _c = __values(config.preprocessors), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), pre = _e[0], priority = _e[1];
                jax.preFilters.add(pre, priority);
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
            for (var _f = __values(config.postprocessors), _g = _f.next(); !_g.done; _g = _f.next()) {
                var _h = __read(_g.value, 2), post = _h[0], priority = _h[1];
                jax.postFilters.add(post, priority);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    return ParserConfiguration;
}());
exports.ParserConfiguration = ParserConfiguration;
//# sourceMappingURL=Configuration.js.map

/***/ }),

/***/ 84858:
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
exports.SubHandlers = exports.SubHandler = exports.MapHandler = void 0;
var PrioritizedList_js_1 = __webpack_require__(4180);
var FunctionList_js_1 = __webpack_require__(64905);
var MapHandler;
(function (MapHandler) {
    var maps = new Map();
    MapHandler.register = function (map) {
        maps.set(map.name, map);
    };
    MapHandler.getMap = function (name) {
        return maps.get(name);
    };
})(MapHandler = exports.MapHandler || (exports.MapHandler = {}));
var SubHandler = (function () {
    function SubHandler() {
        this._configuration = new PrioritizedList_js_1.PrioritizedList();
        this._fallback = new FunctionList_js_1.FunctionList();
    }
    SubHandler.prototype.add = function (maps, fallback, priority) {
        var e_1, _a;
        if (priority === void 0) { priority = PrioritizedList_js_1.PrioritizedList.DEFAULTPRIORITY; }
        try {
            for (var _b = __values(maps.slice().reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                var map = MapHandler.getMap(name_1);
                if (!map) {
                    this.warn('Configuration ' + name_1 + ' not found! Omitted.');
                    return;
                }
                this._configuration.add(map, priority);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (fallback) {
            this._fallback.add(fallback, priority);
        }
    };
    SubHandler.prototype.parse = function (input) {
        var e_2, _a;
        try {
            for (var _b = __values(this._configuration), _c = _b.next(); !_c.done; _c = _b.next()) {
                var map = _c.value.item;
                var result = map.parse(input);
                if (result) {
                    return result;
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
        var _d = __read(input, 2), env = _d[0], symbol = _d[1];
        Array.from(this._fallback)[0].item(env, symbol);
    };
    SubHandler.prototype.lookup = function (symbol) {
        var map = this.applicable(symbol);
        return map ? map.lookup(symbol) : null;
    };
    SubHandler.prototype.contains = function (symbol) {
        return this.applicable(symbol) ? true : false;
    };
    SubHandler.prototype.toString = function () {
        var e_3, _a;
        var names = [];
        try {
            for (var _b = __values(this._configuration), _c = _b.next(); !_c.done; _c = _b.next()) {
                var map = _c.value.item;
                names.push(map.name);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return names.join(', ');
    };
    SubHandler.prototype.applicable = function (symbol) {
        var e_4, _a;
        try {
            for (var _b = __values(this._configuration), _c = _b.next(); !_c.done; _c = _b.next()) {
                var map = _c.value.item;
                if (map.contains(symbol)) {
                    return map;
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
    SubHandler.prototype.retrieve = function (name) {
        var e_5, _a;
        try {
            for (var _b = __values(this._configuration), _c = _b.next(); !_c.done; _c = _b.next()) {
                var map = _c.value.item;
                if (map.name === name) {
                    return map;
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
        return null;
    };
    SubHandler.prototype.warn = function (message) {
        console.log('TexParser Warning: ' + message);
    };
    return SubHandler;
}());
exports.SubHandler = SubHandler;
var SubHandlers = (function () {
    function SubHandlers() {
        this.map = new Map();
    }
    SubHandlers.prototype.add = function (handlers, fallbacks, priority) {
        var e_6, _a;
        if (priority === void 0) { priority = PrioritizedList_js_1.PrioritizedList.DEFAULTPRIORITY; }
        try {
            for (var _b = __values(Object.keys(handlers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var name_2 = key;
                var subHandler = this.get(name_2);
                if (!subHandler) {
                    subHandler = new SubHandler();
                    this.set(name_2, subHandler);
                }
                subHandler.add(handlers[name_2], fallbacks[name_2], priority);
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
    SubHandlers.prototype.set = function (name, subHandler) {
        this.map.set(name, subHandler);
    };
    SubHandlers.prototype.get = function (name) {
        return this.map.get(name);
    };
    SubHandlers.prototype.retrieve = function (name) {
        var e_7, _a;
        try {
            for (var _b = __values(this.map.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                var map = handler.retrieve(name);
                if (map) {
                    return map;
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
        return null;
    };
    SubHandlers.prototype.keys = function () {
        return this.map.keys();
    };
    return SubHandlers;
}());
exports.SubHandlers = SubHandlers;
//# sourceMappingURL=MapHandler.js.map

/***/ }),

/***/ 38624:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeFactory = void 0;
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var NodeFactory = (function () {
    function NodeFactory() {
        this.mmlFactory = null;
        this.factory = { 'node': NodeFactory.createNode,
            'token': NodeFactory.createToken,
            'text': NodeFactory.createText,
            'error': NodeFactory.createError
        };
    }
    NodeFactory.createNode = function (factory, kind, children, def, text) {
        if (children === void 0) { children = []; }
        if (def === void 0) { def = {}; }
        var node = factory.mmlFactory.create(kind);
        node.setChildren(children);
        if (text) {
            node.appendChild(text);
        }
        NodeUtil_js_1.default.setProperties(node, def);
        return node;
    };
    NodeFactory.createToken = function (factory, kind, def, text) {
        if (def === void 0) { def = {}; }
        if (text === void 0) { text = ''; }
        var textNode = factory.create('text', text);
        return factory.create('node', kind, [], def, textNode);
    };
    NodeFactory.createText = function (factory, text) {
        if (text == null) {
            return null;
        }
        return factory.mmlFactory.create('text').setText(text);
    };
    NodeFactory.createError = function (factory, message) {
        var text = factory.create('text', message);
        var mtext = factory.create('node', 'mtext', [], {}, text);
        var error = factory.create('node', 'merror', [mtext], { 'data-mjx-error': message });
        return error;
    };
    NodeFactory.prototype.setMmlFactory = function (mmlFactory) {
        this.mmlFactory = mmlFactory;
    };
    NodeFactory.prototype.set = function (kind, func) {
        this.factory[kind] = func;
    };
    NodeFactory.prototype.setCreators = function (maps) {
        for (var kind in maps) {
            this.set(kind, maps[kind]);
        }
    };
    NodeFactory.prototype.create = function (kind) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var func = this.factory[kind] || this.factory['node'];
        var node = func.apply(void 0, __spreadArray([this, rest[0]], __read(rest.slice(1)), false));
        if (kind === 'node') {
            this.configuration.addNode(rest[0], node);
        }
        return node;
    };
    NodeFactory.prototype.get = function (kind) {
        return this.factory[kind];
    };
    return NodeFactory;
}());
exports.NodeFactory = NodeFactory;
//# sourceMappingURL=NodeFactory.js.map

/***/ }),

/***/ 72895:
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
var MmlNode_js_1 = __webpack_require__(18426);
var mo_js_1 = __webpack_require__(5213);
var NodeUtil;
(function (NodeUtil) {
    var attrs = new Map([
        ['autoOP', true],
        ['fnOP', true],
        ['movesupsub', true],
        ['subsupOK', true],
        ['texprimestyle', true],
        ['useHeight', true],
        ['variantForm', true],
        ['withDelims', true],
        ['mathaccent', true],
        ['open', true],
        ['close', true]
    ]);
    function createEntity(code) {
        return String.fromCodePoint(parseInt(code, 16));
    }
    NodeUtil.createEntity = createEntity;
    function getChildren(node) {
        return node.childNodes;
    }
    NodeUtil.getChildren = getChildren;
    function getText(node) {
        return node.getText();
    }
    NodeUtil.getText = getText;
    function appendChildren(node, children) {
        var e_1, _a;
        try {
            for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                var child = children_1_1.value;
                node.appendChild(child);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    NodeUtil.appendChildren = appendChildren;
    function setAttribute(node, attribute, value) {
        node.attributes.set(attribute, value);
    }
    NodeUtil.setAttribute = setAttribute;
    function setProperty(node, property, value) {
        node.setProperty(property, value);
    }
    NodeUtil.setProperty = setProperty;
    function setProperties(node, properties) {
        var e_2, _a;
        try {
            for (var _b = __values(Object.keys(properties)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                var value = properties[name_1];
                if (name_1 === 'texClass') {
                    node.texClass = value;
                    node.setProperty(name_1, value);
                }
                else if (name_1 === 'movablelimits') {
                    node.setProperty('movablelimits', value);
                    if (node.isKind('mo') || node.isKind('mstyle')) {
                        node.attributes.set('movablelimits', value);
                    }
                }
                else if (name_1 === 'inferred') {
                }
                else if (attrs.has(name_1)) {
                    node.setProperty(name_1, value);
                }
                else {
                    node.attributes.set(name_1, value);
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
    }
    NodeUtil.setProperties = setProperties;
    function getProperty(node, property) {
        return node.getProperty(property);
    }
    NodeUtil.getProperty = getProperty;
    function getAttribute(node, attr) {
        return node.attributes.get(attr);
    }
    NodeUtil.getAttribute = getAttribute;
    function removeProperties(node) {
        var properties = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            properties[_i - 1] = arguments[_i];
        }
        node.removeProperty.apply(node, __spreadArray([], __read(properties), false));
    }
    NodeUtil.removeProperties = removeProperties;
    function getChildAt(node, position) {
        return node.childNodes[position];
    }
    NodeUtil.getChildAt = getChildAt;
    function setChild(node, position, child) {
        var children = node.childNodes;
        children[position] = child;
        if (child) {
            child.parent = node;
        }
    }
    NodeUtil.setChild = setChild;
    function copyChildren(oldNode, newNode) {
        var children = oldNode.childNodes;
        for (var i = 0; i < children.length; i++) {
            setChild(newNode, i, children[i]);
        }
    }
    NodeUtil.copyChildren = copyChildren;
    function copyAttributes(oldNode, newNode) {
        newNode.attributes = oldNode.attributes;
        setProperties(newNode, oldNode.getAllProperties());
    }
    NodeUtil.copyAttributes = copyAttributes;
    function isType(node, kind) {
        return node.isKind(kind);
    }
    NodeUtil.isType = isType;
    function isEmbellished(node) {
        return node.isEmbellished;
    }
    NodeUtil.isEmbellished = isEmbellished;
    function getTexClass(node) {
        return node.texClass;
    }
    NodeUtil.getTexClass = getTexClass;
    function getCoreMO(node) {
        return node.coreMO();
    }
    NodeUtil.getCoreMO = getCoreMO;
    function isNode(item) {
        return item instanceof MmlNode_js_1.AbstractMmlNode || item instanceof MmlNode_js_1.AbstractMmlEmptyNode;
    }
    NodeUtil.isNode = isNode;
    function isInferred(node) {
        return node.isInferred;
    }
    NodeUtil.isInferred = isInferred;
    function getForm(node) {
        var e_3, _a;
        if (!isType(node, 'mo')) {
            return null;
        }
        var mo = node;
        var forms = mo.getForms();
        try {
            for (var forms_1 = __values(forms), forms_1_1 = forms_1.next(); !forms_1_1.done; forms_1_1 = forms_1.next()) {
                var form = forms_1_1.value;
                var symbol = mo_js_1.MmlMo.OPTABLE[form][mo.getText()];
                if (symbol) {
                    return symbol;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (forms_1_1 && !forms_1_1.done && (_a = forms_1.return)) _a.call(forms_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return null;
    }
    NodeUtil.getForm = getForm;
})(NodeUtil || (NodeUtil = {}));
exports["default"] = NodeUtil;
//# sourceMappingURL=NodeUtil.js.map

/***/ }),

/***/ 96004:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var TexConstants_js_1 = __webpack_require__(48948);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var ParseMethods;
(function (ParseMethods) {
    function variable(parser, c) {
        var def = ParseUtil_js_1.default.getFontDef(parser);
        var env = parser.stack.env;
        if (env.multiLetterIdentifiers && env.font !== '') {
            c = parser.string.substr(parser.i - 1).match(env.multiLetterIdentifiers)[0];
            parser.i += c.length - 1;
            if (def.mathvariant === TexConstants_js_1.TexConstant.Variant.NORMAL && env.noAutoOP && c.length > 1) {
                def.autoOP = false;
            }
        }
        var node = parser.create('token', 'mi', def, c);
        parser.Push(node);
    }
    ParseMethods.variable = variable;
    function digit(parser, c) {
        var mml;
        var pattern = parser.configuration.options['digits'];
        var n = parser.string.slice(parser.i - 1).match(pattern);
        var def = ParseUtil_js_1.default.getFontDef(parser);
        if (n) {
            mml = parser.create('token', 'mn', def, n[0].replace(/[{}]/g, ''));
            parser.i += n[0].length - 1;
        }
        else {
            mml = parser.create('token', 'mo', def, c);
        }
        parser.Push(mml);
    }
    ParseMethods.digit = digit;
    function controlSequence(parser, _c) {
        var name = parser.GetCS();
        parser.parse('macro', [parser, name]);
    }
    ParseMethods.controlSequence = controlSequence;
    function mathchar0mi(parser, mchar) {
        var def = mchar.attributes || { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC };
        var node = parser.create('token', 'mi', def, mchar.char);
        parser.Push(node);
    }
    ParseMethods.mathchar0mi = mathchar0mi;
    function mathchar0mo(parser, mchar) {
        var def = mchar.attributes || {};
        def['stretchy'] = false;
        var node = parser.create('token', 'mo', def, mchar.char);
        NodeUtil_js_1.default.setProperty(node, 'fixStretchy', true);
        parser.configuration.addNode('fixStretchy', node);
        parser.Push(node);
    }
    ParseMethods.mathchar0mo = mathchar0mo;
    function mathchar7(parser, mchar) {
        var def = mchar.attributes || { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL };
        if (parser.stack.env['font']) {
            def['mathvariant'] = parser.stack.env['font'];
        }
        var node = parser.create('token', 'mi', def, mchar.char);
        parser.Push(node);
    }
    ParseMethods.mathchar7 = mathchar7;
    function delimiter(parser, delim) {
        var def = delim.attributes || {};
        def = Object.assign({ fence: false, stretchy: false }, def);
        var node = parser.create('token', 'mo', def, delim.char);
        parser.Push(node);
    }
    ParseMethods.delimiter = delimiter;
    function environment(parser, env, func, args) {
        var end = args[0];
        var mml = parser.itemFactory.create('begin').setProperties({ name: env, end: end });
        mml = func.apply(void 0, __spreadArray([parser, mml], __read(args.slice(1)), false));
        parser.Push(mml);
    }
    ParseMethods.environment = environment;
})(ParseMethods || (ParseMethods = {}));
exports["default"] = ParseMethods;
//# sourceMappingURL=ParseMethods.js.map

/***/ }),

/***/ 1331:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var StackItemFactory_js_1 = __importDefault(__webpack_require__(57394));
var NodeFactory_js_1 = __webpack_require__(38624);
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var Options_js_1 = __webpack_require__(36059);
var ParseOptions = (function () {
    function ParseOptions(configuration, options) {
        if (options === void 0) { options = []; }
        this.options = {};
        this.packageData = new Map();
        this.parsers = [];
        this.root = null;
        this.nodeLists = {};
        this.error = false;
        this.handlers = configuration.handlers;
        this.nodeFactory = new NodeFactory_js_1.NodeFactory();
        this.nodeFactory.configuration = this;
        this.nodeFactory.setCreators(configuration.nodes);
        this.itemFactory = new StackItemFactory_js_1.default(configuration.items);
        this.itemFactory.configuration = this;
        Options_js_1.defaultOptions.apply(void 0, __spreadArray([this.options], __read(options), false));
        (0, Options_js_1.defaultOptions)(this.options, configuration.options);
    }
    ParseOptions.prototype.pushParser = function (parser) {
        this.parsers.unshift(parser);
    };
    ParseOptions.prototype.popParser = function () {
        this.parsers.shift();
    };
    Object.defineProperty(ParseOptions.prototype, "parser", {
        get: function () {
            return this.parsers[0];
        },
        enumerable: false,
        configurable: true
    });
    ParseOptions.prototype.clear = function () {
        this.parsers = [];
        this.root = null;
        this.nodeLists = {};
        this.error = false;
        this.tags.resetTag();
    };
    ParseOptions.prototype.addNode = function (property, node) {
        var list = this.nodeLists[property];
        if (!list) {
            list = this.nodeLists[property] = [];
        }
        list.push(node);
        if (node.kind !== property) {
            var inlists = (NodeUtil_js_1.default.getProperty(node, 'in-lists') || '');
            var lists = (inlists ? inlists.split(/,/) : []).concat(property).join(',');
            NodeUtil_js_1.default.setProperty(node, 'in-lists', lists);
        }
    };
    ParseOptions.prototype.getList = function (property) {
        var e_1, _a;
        var list = this.nodeLists[property] || [];
        var result = [];
        try {
            for (var list_1 = __values(list), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                var node = list_1_1.value;
                if (this.inTree(node)) {
                    result.push(node);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (list_1_1 && !list_1_1.done && (_a = list_1.return)) _a.call(list_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.nodeLists[property] = result;
        return result;
    };
    ParseOptions.prototype.removeFromList = function (property, nodes) {
        var e_2, _a;
        var list = this.nodeLists[property] || [];
        try {
            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var node = nodes_1_1.value;
                var i = list.indexOf(node);
                if (i >= 0) {
                    list.splice(i, 1);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    ParseOptions.prototype.inTree = function (node) {
        while (node && node !== this.root) {
            node = node.parent;
        }
        return !!node;
    };
    return ParseOptions;
}());
exports["default"] = ParseOptions;
//# sourceMappingURL=ParseOptions.js.map

/***/ }),

/***/ 3378:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var MmlNode_js_1 = __webpack_require__(18426);
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var Entities_js_1 = __webpack_require__(63411);
var ParseUtil;
(function (ParseUtil) {
    var emPerInch = 7.2;
    var pxPerInch = 72;
    var UNIT_CASES = {
        'em': function (m) { return m; },
        'ex': function (m) { return m * .43; },
        'pt': function (m) { return m / 10; },
        'pc': function (m) { return m * 1.2; },
        'px': function (m) { return m * emPerInch / pxPerInch; },
        'in': function (m) { return m * emPerInch; },
        'cm': function (m) { return m * emPerInch / 2.54; },
        'mm': function (m) { return m * emPerInch / 25.4; },
        'mu': function (m) { return m / 18; },
    };
    var num = '([-+]?([.,]\\d+|\\d+([.,]\\d*)?))';
    var unit = '(pt|em|ex|mu|px|mm|cm|in|pc)';
    var dimenEnd = RegExp('^\\s*' + num + '\\s*' + unit + '\\s*$');
    var dimenRest = RegExp('^\\s*' + num + '\\s*' + unit + ' ?');
    function matchDimen(dim, rest) {
        if (rest === void 0) { rest = false; }
        var match = dim.match(rest ? dimenRest : dimenEnd);
        return match ?
            muReplace([match[1].replace(/,/, '.'), match[4], match[0].length]) :
            [null, null, 0];
    }
    ParseUtil.matchDimen = matchDimen;
    function muReplace(_a) {
        var _b = __read(_a, 3), value = _b[0], unit = _b[1], length = _b[2];
        if (unit !== 'mu') {
            return [value, unit, length];
        }
        var em = Em(UNIT_CASES[unit](parseFloat(value || '1')));
        return [em.slice(0, -2), 'em', length];
    }
    function dimen2em(dim) {
        var _a = __read(matchDimen(dim), 2), value = _a[0], unit = _a[1];
        var m = parseFloat(value || '1');
        var func = UNIT_CASES[unit];
        return func ? func(m) : 0;
    }
    ParseUtil.dimen2em = dimen2em;
    function Em(m) {
        if (Math.abs(m) < .0006) {
            return '0em';
        }
        return m.toFixed(3).replace(/\.?0+$/, '') + 'em';
    }
    ParseUtil.Em = Em;
    function cols() {
        var W = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            W[_i] = arguments[_i];
        }
        return W.map(function (n) { return Em(n); }).join(' ');
    }
    ParseUtil.cols = cols;
    function fenced(configuration, open, mml, close, big, color) {
        if (big === void 0) { big = ''; }
        if (color === void 0) { color = ''; }
        var nf = configuration.nodeFactory;
        var mrow = nf.create('node', 'mrow', [], { open: open, close: close, texClass: MmlNode_js_1.TEXCLASS.INNER });
        var mo;
        if (big) {
            mo = new TexParser_js_1.default('\\' + big + 'l' + open, configuration.parser.stack.env, configuration).mml();
        }
        else {
            var openNode = nf.create('text', open);
            mo = nf.create('node', 'mo', [], { fence: true, stretchy: true, symmetric: true, texClass: MmlNode_js_1.TEXCLASS.OPEN }, openNode);
        }
        NodeUtil_js_1.default.appendChildren(mrow, [mo, mml]);
        if (big) {
            mo = new TexParser_js_1.default('\\' + big + 'r' + close, configuration.parser.stack.env, configuration).mml();
        }
        else {
            var closeNode = nf.create('text', close);
            mo = nf.create('node', 'mo', [], { fence: true, stretchy: true, symmetric: true, texClass: MmlNode_js_1.TEXCLASS.CLOSE }, closeNode);
        }
        color && mo.attributes.set('mathcolor', color);
        NodeUtil_js_1.default.appendChildren(mrow, [mo]);
        return mrow;
    }
    ParseUtil.fenced = fenced;
    function fixedFence(configuration, open, mml, close) {
        var mrow = configuration.nodeFactory.create('node', 'mrow', [], { open: open, close: close, texClass: MmlNode_js_1.TEXCLASS.ORD });
        if (open) {
            NodeUtil_js_1.default.appendChildren(mrow, [mathPalette(configuration, open, 'l')]);
        }
        if (NodeUtil_js_1.default.isType(mml, 'mrow')) {
            NodeUtil_js_1.default.appendChildren(mrow, NodeUtil_js_1.default.getChildren(mml));
        }
        else {
            NodeUtil_js_1.default.appendChildren(mrow, [mml]);
        }
        if (close) {
            NodeUtil_js_1.default.appendChildren(mrow, [mathPalette(configuration, close, 'r')]);
        }
        return mrow;
    }
    ParseUtil.fixedFence = fixedFence;
    function mathPalette(configuration, fence, side) {
        if (fence === '{' || fence === '}') {
            fence = '\\' + fence;
        }
        var D = '{\\bigg' + side + ' ' + fence + '}';
        var T = '{\\big' + side + ' ' + fence + '}';
        return new TexParser_js_1.default('\\mathchoice' + D + T + T + T, {}, configuration).mml();
    }
    ParseUtil.mathPalette = mathPalette;
    function fixInitialMO(configuration, nodes) {
        for (var i = 0, m = nodes.length; i < m; i++) {
            var child = nodes[i];
            if (child && (!NodeUtil_js_1.default.isType(child, 'mspace') &&
                (!NodeUtil_js_1.default.isType(child, 'TeXAtom') ||
                    (NodeUtil_js_1.default.getChildren(child)[0] &&
                        NodeUtil_js_1.default.getChildren(NodeUtil_js_1.default.getChildren(child)[0]).length)))) {
                if (NodeUtil_js_1.default.isEmbellished(child) ||
                    (NodeUtil_js_1.default.isType(child, 'TeXAtom') && NodeUtil_js_1.default.getTexClass(child) === MmlNode_js_1.TEXCLASS.REL)) {
                    var mi = configuration.nodeFactory.create('node', 'mi');
                    nodes.unshift(mi);
                }
                break;
            }
        }
    }
    ParseUtil.fixInitialMO = fixInitialMO;
    function internalMath(parser, text, level, font) {
        if (parser.configuration.options.internalMath) {
            return parser.configuration.options.internalMath(parser, text, level, font);
        }
        var mathvariant = font || parser.stack.env.font;
        var def = (mathvariant ? { mathvariant: mathvariant } : {});
        var mml = [], i = 0, k = 0, c, node, match = '', braces = 0;
        if (text.match(/\\?[${}\\]|\\\(|\\(eq)?ref\s*\{/)) {
            while (i < text.length) {
                c = text.charAt(i++);
                if (c === '$') {
                    if (match === '$' && braces === 0) {
                        node = parser.create('node', 'TeXAtom', [(new TexParser_js_1.default(text.slice(k, i - 1), {}, parser.configuration)).mml()]);
                        mml.push(node);
                        match = '';
                        k = i;
                    }
                    else if (match === '') {
                        if (k < i - 1) {
                            mml.push(internalText(parser, text.slice(k, i - 1), def));
                        }
                        match = '$';
                        k = i;
                    }
                }
                else if (c === '{' && match !== '') {
                    braces++;
                }
                else if (c === '}') {
                    if (match === '}' && braces === 0) {
                        var atom = (new TexParser_js_1.default(text.slice(k, i), {}, parser.configuration)).mml();
                        node = parser.create('node', 'TeXAtom', [atom], def);
                        mml.push(node);
                        match = '';
                        k = i;
                    }
                    else if (match !== '') {
                        if (braces) {
                            braces--;
                        }
                    }
                }
                else if (c === '\\') {
                    if (match === '' && text.substr(i).match(/^(eq)?ref\s*\{/)) {
                        var len = RegExp['$&'].length;
                        if (k < i - 1) {
                            mml.push(internalText(parser, text.slice(k, i - 1), def));
                        }
                        match = '}';
                        k = i - 1;
                        i += len;
                    }
                    else {
                        c = text.charAt(i++);
                        if (c === '(' && match === '') {
                            if (k < i - 2) {
                                mml.push(internalText(parser, text.slice(k, i - 2), def));
                            }
                            match = ')';
                            k = i;
                        }
                        else if (c === ')' && match === ')' && braces === 0) {
                            node = parser.create('node', 'TeXAtom', [(new TexParser_js_1.default(text.slice(k, i - 2), {}, parser.configuration)).mml()]);
                            mml.push(node);
                            match = '';
                            k = i;
                        }
                        else if (c.match(/[${}\\]/) && match === '') {
                            i--;
                            text = text.substr(0, i - 1) + text.substr(i);
                        }
                    }
                }
            }
            if (match !== '') {
                throw new TexError_js_1.default('MathNotTerminated', 'Math not terminated in text box');
            }
        }
        if (k < text.length) {
            mml.push(internalText(parser, text.slice(k), def));
        }
        if (level != null) {
            mml = [parser.create('node', 'mstyle', mml, { displaystyle: false, scriptlevel: level })];
        }
        else if (mml.length > 1) {
            mml = [parser.create('node', 'mrow', mml)];
        }
        return mml;
    }
    ParseUtil.internalMath = internalMath;
    function internalText(parser, text, def) {
        text = text.replace(/^\s+/, Entities_js_1.entities.nbsp).replace(/\s+$/, Entities_js_1.entities.nbsp);
        var textNode = parser.create('text', text);
        return parser.create('node', 'mtext', [], def, textNode);
    }
    ParseUtil.internalText = internalText;
    function underOver(parser, base, script, pos, stack) {
        ParseUtil.checkMovableLimits(base);
        if (NodeUtil_js_1.default.isType(base, 'munderover') && NodeUtil_js_1.default.isEmbellished(base)) {
            NodeUtil_js_1.default.setProperties(NodeUtil_js_1.default.getCoreMO(base), { lspace: 0, rspace: 0 });
            var mo = parser.create('node', 'mo', [], { rspace: 0 });
            base = parser.create('node', 'mrow', [mo, base]);
        }
        var mml = parser.create('node', 'munderover', [base]);
        NodeUtil_js_1.default.setChild(mml, pos === 'over' ? mml.over : mml.under, script);
        var node = mml;
        if (stack) {
            node = parser.create('node', 'TeXAtom', [mml], { texClass: MmlNode_js_1.TEXCLASS.OP, movesupsub: true });
        }
        NodeUtil_js_1.default.setProperty(node, 'subsupOK', true);
        return node;
    }
    ParseUtil.underOver = underOver;
    function checkMovableLimits(base) {
        var symbol = (NodeUtil_js_1.default.isType(base, 'mo') ? NodeUtil_js_1.default.getForm(base) : null);
        if (NodeUtil_js_1.default.getProperty(base, 'movablelimits') || (symbol && symbol[3] && symbol[3].movablelimits)) {
            NodeUtil_js_1.default.setProperties(base, { movablelimits: false });
        }
    }
    ParseUtil.checkMovableLimits = checkMovableLimits;
    function trimSpaces(text) {
        if (typeof (text) !== 'string') {
            return text;
        }
        var TEXT = text.trim();
        if (TEXT.match(/\\$/) && text.match(/ $/)) {
            TEXT += ' ';
        }
        return TEXT;
    }
    ParseUtil.trimSpaces = trimSpaces;
    function setArrayAlign(array, align) {
        align = ParseUtil.trimSpaces(align || '');
        if (align === 't') {
            array.arraydef.align = 'baseline 1';
        }
        else if (align === 'b') {
            array.arraydef.align = 'baseline -1';
        }
        else if (align === 'c') {
            array.arraydef.align = 'axis';
        }
        else if (align) {
            array.arraydef.align = align;
        }
        return array;
    }
    ParseUtil.setArrayAlign = setArrayAlign;
    function substituteArgs(parser, args, str) {
        var text = '';
        var newstring = '';
        var i = 0;
        while (i < str.length) {
            var c = str.charAt(i++);
            if (c === '\\') {
                text += c + str.charAt(i++);
            }
            else if (c === '#') {
                c = str.charAt(i++);
                if (c === '#') {
                    text += c;
                }
                else {
                    if (!c.match(/[1-9]/) || parseInt(c, 10) > args.length) {
                        throw new TexError_js_1.default('IllegalMacroParam', 'Illegal macro parameter reference');
                    }
                    newstring = addArgs(parser, addArgs(parser, newstring, text), args[parseInt(c, 10) - 1]);
                    text = '';
                }
            }
            else {
                text += c;
            }
        }
        return addArgs(parser, newstring, text);
    }
    ParseUtil.substituteArgs = substituteArgs;
    function addArgs(parser, s1, s2) {
        if (s2.match(/^[a-z]/i) && s1.match(/(^|[^\\])(\\\\)*\\[a-z]+$/i)) {
            s1 += ' ';
        }
        if (s1.length + s2.length > parser.configuration.options['maxBuffer']) {
            throw new TexError_js_1.default('MaxBufferSize', 'MathJax internal buffer size exceeded; is there a' +
                ' recursive macro call?');
        }
        return s1 + s2;
    }
    ParseUtil.addArgs = addArgs;
    function checkMaxMacros(parser, isMacro) {
        if (isMacro === void 0) { isMacro = true; }
        if (++parser.macroCount <= parser.configuration.options['maxMacros']) {
            return;
        }
        if (isMacro) {
            throw new TexError_js_1.default('MaxMacroSub1', 'MathJax maximum macro substitution count exceeded; ' +
                'is here a recursive macro call?');
        }
        else {
            throw new TexError_js_1.default('MaxMacroSub2', 'MathJax maximum substitution count exceeded; ' +
                'is there a recursive latex environment?');
        }
    }
    ParseUtil.checkMaxMacros = checkMaxMacros;
    function checkEqnEnv(parser) {
        if (parser.stack.global.eqnenv) {
            throw new TexError_js_1.default('ErroneousNestingEq', 'Erroneous nesting of equation structures');
        }
        parser.stack.global.eqnenv = true;
    }
    ParseUtil.checkEqnEnv = checkEqnEnv;
    function copyNode(node, parser) {
        var tree = node.copy();
        var options = parser.configuration;
        tree.walkTree(function (n) {
            var e_1, _a;
            options.addNode(n.kind, n);
            var lists = (n.getProperty('in-lists') || '').split(/,/);
            try {
                for (var lists_1 = __values(lists), lists_1_1 = lists_1.next(); !lists_1_1.done; lists_1_1 = lists_1.next()) {
                    var list = lists_1_1.value;
                    list && options.addNode(list, n);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (lists_1_1 && !lists_1_1.done && (_a = lists_1.return)) _a.call(lists_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
        return tree;
    }
    ParseUtil.copyNode = copyNode;
    function MmlFilterAttribute(_parser, _name, value) {
        return value;
    }
    ParseUtil.MmlFilterAttribute = MmlFilterAttribute;
    function getFontDef(parser) {
        var font = parser.stack.env['font'];
        return (font ? { mathvariant: font } : {});
    }
    ParseUtil.getFontDef = getFontDef;
    function keyvalOptions(attrib, allowed, error) {
        var e_2, _a;
        if (allowed === void 0) { allowed = null; }
        if (error === void 0) { error = false; }
        var def = readKeyval(attrib);
        if (allowed) {
            try {
                for (var _b = __values(Object.keys(def)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if (!allowed.hasOwnProperty(key)) {
                        if (error) {
                            throw new TexError_js_1.default('InvalidOption', 'Invalid option: %1', key);
                        }
                        delete def[key];
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
        }
        return def;
    }
    ParseUtil.keyvalOptions = keyvalOptions;
    function readKeyval(text) {
        var _a, _b;
        var options = {};
        var rest = text;
        var end, key, val;
        while (rest) {
            _a = __read(readValue(rest, ['=', ',']), 3), key = _a[0], end = _a[1], rest = _a[2];
            if (end === '=') {
                _b = __read(readValue(rest, [',']), 3), val = _b[0], end = _b[1], rest = _b[2];
                val = (val === 'false' || val === 'true') ?
                    JSON.parse(val) : val;
                options[key] = val;
            }
            else if (key) {
                options[key] = true;
            }
        }
        return options;
    }
    function removeBraces(text, count) {
        while (count > 0) {
            text = text.trim().slice(1, -1);
            count--;
        }
        return text.trim();
    }
    function readValue(text, end) {
        var length = text.length;
        var braces = 0;
        var value = '';
        var index = 0;
        var start = 0;
        var startCount = true;
        var stopCount = false;
        while (index < length) {
            var c = text[index++];
            switch (c) {
                case ' ':
                    break;
                case '{':
                    if (startCount) {
                        start++;
                    }
                    else {
                        stopCount = false;
                        if (start > braces) {
                            start = braces;
                        }
                    }
                    braces++;
                    break;
                case '}':
                    if (braces) {
                        braces--;
                    }
                    if (startCount || stopCount) {
                        start--;
                        stopCount = true;
                    }
                    startCount = false;
                    break;
                default:
                    if (!braces && end.indexOf(c) !== -1) {
                        return [stopCount ? 'true' :
                                removeBraces(value, start), c, text.slice(index)];
                    }
                    startCount = false;
                    stopCount = false;
            }
            value += c;
        }
        if (braces) {
            throw new TexError_js_1.default('ExtraOpenMissingClose', 'Extra open brace or missing close brace');
        }
        return [stopCount ? 'true' : removeBraces(value, start), '', text.slice(index)];
    }
})(ParseUtil || (ParseUtil = {}));
exports["default"] = ParseUtil;
//# sourceMappingURL=ParseUtil.js.map

/***/ }),

/***/ 14577:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var Stack = (function () {
    function Stack(_factory, _env, inner) {
        this._factory = _factory;
        this._env = _env;
        this.global = {};
        this.stack = [];
        this.global = { isInner: inner };
        this.stack = [this._factory.create('start', this.global)];
        if (_env) {
            this.stack[0].env = _env;
        }
        this.env = this.stack[0].env;
    }
    Object.defineProperty(Stack.prototype, "env", {
        get: function () {
            return this._env;
        },
        set: function (env) {
            this._env = env;
        },
        enumerable: false,
        configurable: true
    });
    Stack.prototype.Push = function () {
        var e_1, _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var node = args_1_1.value;
                if (!node) {
                    continue;
                }
                var item = NodeUtil_js_1.default.isNode(node) ?
                    this._factory.create('mml', node) : node;
                item.global = this.global;
                var _b = __read(this.stack.length ? this.Top().checkItem(item) : [null, true], 2), top_1 = _b[0], success = _b[1];
                if (!success) {
                    continue;
                }
                if (top_1) {
                    this.Pop();
                    this.Push.apply(this, __spreadArray([], __read(top_1), false));
                    continue;
                }
                this.stack.push(item);
                if (item.env) {
                    if (item.copyEnv) {
                        Object.assign(item.env, this.env);
                    }
                    this.env = item.env;
                }
                else {
                    item.env = this.env;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Stack.prototype.Pop = function () {
        var item = this.stack.pop();
        if (!item.isOpen) {
            delete item.env;
        }
        this.env = (this.stack.length ? this.Top().env : {});
        return item;
    };
    Stack.prototype.Top = function (n) {
        if (n === void 0) { n = 1; }
        return this.stack.length < n ? null : this.stack[this.stack.length - n];
    };
    Stack.prototype.Prev = function (noPop) {
        var top = this.Top();
        return noPop ? top.First : top.Pop();
    };
    Stack.prototype.toString = function () {
        return 'stack[\n  ' + this.stack.join('\n  ') + '\n]';
    };
    return Stack;
}());
exports["default"] = Stack;
//# sourceMappingURL=Stack.js.map

/***/ }),

/***/ 34726:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseItem = exports.MmlStack = void 0;
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var MmlStack = (function () {
    function MmlStack(_nodes) {
        this._nodes = _nodes;
    }
    Object.defineProperty(MmlStack.prototype, "nodes", {
        get: function () {
            return this._nodes;
        },
        enumerable: false,
        configurable: true
    });
    MmlStack.prototype.Push = function () {
        var _a;
        var nodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodes[_i] = arguments[_i];
        }
        (_a = this._nodes).push.apply(_a, __spreadArray([], __read(nodes), false));
    };
    MmlStack.prototype.Pop = function () {
        return this._nodes.pop();
    };
    Object.defineProperty(MmlStack.prototype, "First", {
        get: function () {
            return this._nodes[this.Size() - 1];
        },
        set: function (node) {
            this._nodes[this.Size() - 1] = node;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlStack.prototype, "Last", {
        get: function () {
            return this._nodes[0];
        },
        set: function (node) {
            this._nodes[0] = node;
        },
        enumerable: false,
        configurable: true
    });
    MmlStack.prototype.Peek = function (n) {
        if (n == null) {
            n = 1;
        }
        return this._nodes.slice(this.Size() - n);
    };
    MmlStack.prototype.Size = function () {
        return this._nodes.length;
    };
    MmlStack.prototype.Clear = function () {
        this._nodes = [];
    };
    MmlStack.prototype.toMml = function (inferred, forceRow) {
        if (inferred === void 0) { inferred = true; }
        if (this._nodes.length === 1 && !forceRow) {
            return this.First;
        }
        return this.create('node', inferred ? 'inferredMrow' : 'mrow', this._nodes, {});
    };
    MmlStack.prototype.create = function (kind) {
        var _a;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return (_a = this.factory.configuration.nodeFactory).create.apply(_a, __spreadArray([kind], __read(rest), false));
    };
    return MmlStack;
}());
exports.MmlStack = MmlStack;
var BaseItem = (function (_super) {
    __extends(BaseItem, _super);
    function BaseItem(factory) {
        var nodes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            nodes[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, nodes) || this;
        _this.factory = factory;
        _this.global = {};
        _this._properties = {};
        if (_this.isOpen) {
            _this._env = {};
        }
        return _this;
    }
    Object.defineProperty(BaseItem.prototype, "kind", {
        get: function () {
            return 'base';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "env", {
        get: function () {
            return this._env;
        },
        set: function (value) {
            this._env = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "copyEnv", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    BaseItem.prototype.getProperty = function (key) {
        return this._properties[key];
    };
    BaseItem.prototype.setProperty = function (key, value) {
        this._properties[key] = value;
        return this;
    };
    Object.defineProperty(BaseItem.prototype, "isOpen", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "isClose", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseItem.prototype, "isFinal", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    BaseItem.prototype.isKind = function (kind) {
        return kind === this.kind;
    };
    BaseItem.prototype.checkItem = function (item) {
        if (item.isKind('over') && this.isOpen) {
            item.setProperty('num', this.toMml(false));
            this.Clear();
        }
        if (item.isKind('cell') && this.isOpen) {
            if (item.getProperty('linebreak')) {
                return BaseItem.fail;
            }
            throw new TexError_js_1.default('Misplaced', 'Misplaced %1', item.getName());
        }
        if (item.isClose && this.getErrors(item.kind)) {
            var _a = __read(this.getErrors(item.kind), 2), id = _a[0], message = _a[1];
            throw new TexError_js_1.default(id, message, item.getName());
        }
        if (!item.isFinal) {
            return BaseItem.success;
        }
        this.Push(item.First);
        return BaseItem.fail;
    };
    BaseItem.prototype.clearEnv = function () {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(this.env)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                delete this.env[id];
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
    BaseItem.prototype.setProperties = function (def) {
        Object.assign(this._properties, def);
        return this;
    };
    BaseItem.prototype.getName = function () {
        return this.getProperty('name');
    };
    BaseItem.prototype.toString = function () {
        return this.kind + '[' + this.nodes.join('; ') + ']';
    };
    BaseItem.prototype.getErrors = function (kind) {
        var CLASS = this.constructor;
        return (CLASS.errors || {})[kind] || BaseItem.errors[kind];
    };
    BaseItem.fail = [null, false];
    BaseItem.success = [null, true];
    BaseItem.errors = {
        end: ['MissingBeginExtraEnd', 'Missing \\begin{%1} or extra \\end{%1}'],
        close: ['ExtraCloseMissingOpen', 'Extra close brace or missing open brace'],
        right: ['MissingLeftExtraRight', 'Missing \\left or extra \\right'],
        middle: ['ExtraMiddle', 'Extra \\middle']
    };
    return BaseItem;
}(MmlStack));
exports.BaseItem = BaseItem;
//# sourceMappingURL=StackItem.js.map

/***/ }),

/***/ 57394:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
var StackItem_js_1 = __webpack_require__(34726);
var Factory_js_1 = __webpack_require__(86161);
var DummyItem = (function (_super) {
    __extends(DummyItem, _super);
    function DummyItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DummyItem;
}(StackItem_js_1.BaseItem));
var StackItemFactory = (function (_super) {
    __extends(StackItemFactory, _super);
    function StackItemFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultKind = 'dummy';
        _this.configuration = null;
        return _this;
    }
    StackItemFactory.DefaultStackItems = (_a = {},
        _a[DummyItem.prototype.kind] = DummyItem,
        _a);
    return StackItemFactory;
}(Factory_js_1.AbstractFactory));
exports["default"] = StackItemFactory;
//# sourceMappingURL=StackItemFactory.js.map

/***/ }),

/***/ 56941:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Macro = exports.Symbol = void 0;
var Symbol = (function () {
    function Symbol(_symbol, _char, _attributes) {
        this._symbol = _symbol;
        this._char = _char;
        this._attributes = _attributes;
    }
    Object.defineProperty(Symbol.prototype, "symbol", {
        get: function () {
            return this._symbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Symbol.prototype, "char", {
        get: function () {
            return this._char;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Symbol.prototype, "attributes", {
        get: function () {
            return this._attributes;
        },
        enumerable: false,
        configurable: true
    });
    return Symbol;
}());
exports.Symbol = Symbol;
var Macro = (function () {
    function Macro(_symbol, _func, _args) {
        if (_args === void 0) { _args = []; }
        this._symbol = _symbol;
        this._func = _func;
        this._args = _args;
    }
    Object.defineProperty(Macro.prototype, "symbol", {
        get: function () {
            return this._symbol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Macro.prototype, "func", {
        get: function () {
            return this._func;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Macro.prototype, "args", {
        get: function () {
            return this._args;
        },
        enumerable: false,
        configurable: true
    });
    return Macro;
}());
exports.Macro = Macro;
//# sourceMappingURL=Symbol.js.map

/***/ }),

/***/ 92715:
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
exports.EnvironmentMap = exports.CommandMap = exports.MacroMap = exports.DelimiterMap = exports.CharacterMap = exports.AbstractParseMap = exports.RegExpMap = exports.AbstractSymbolMap = exports.parseResult = void 0;
var Symbol_js_1 = __webpack_require__(56941);
var MapHandler_js_1 = __webpack_require__(84858);
function parseResult(result) {
    return result === void 0 ? true : result;
}
exports.parseResult = parseResult;
var AbstractSymbolMap = (function () {
    function AbstractSymbolMap(_name, _parser) {
        this._name = _name;
        this._parser = _parser;
        MapHandler_js_1.MapHandler.register(this);
    }
    Object.defineProperty(AbstractSymbolMap.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    AbstractSymbolMap.prototype.parserFor = function (symbol) {
        return this.contains(symbol) ? this.parser : null;
    };
    AbstractSymbolMap.prototype.parse = function (_a) {
        var _b = __read(_a, 2), env = _b[0], symbol = _b[1];
        var parser = this.parserFor(symbol);
        var mapped = this.lookup(symbol);
        return (parser && mapped) ? parseResult(parser(env, mapped)) : null;
    };
    Object.defineProperty(AbstractSymbolMap.prototype, "parser", {
        get: function () {
            return this._parser;
        },
        set: function (parser) {
            this._parser = parser;
        },
        enumerable: false,
        configurable: true
    });
    return AbstractSymbolMap;
}());
exports.AbstractSymbolMap = AbstractSymbolMap;
var RegExpMap = (function (_super) {
    __extends(RegExpMap, _super);
    function RegExpMap(name, parser, _regExp) {
        var _this = _super.call(this, name, parser) || this;
        _this._regExp = _regExp;
        return _this;
    }
    RegExpMap.prototype.contains = function (symbol) {
        return this._regExp.test(symbol);
    };
    RegExpMap.prototype.lookup = function (symbol) {
        return this.contains(symbol) ? symbol : null;
    };
    return RegExpMap;
}(AbstractSymbolMap));
exports.RegExpMap = RegExpMap;
var AbstractParseMap = (function (_super) {
    __extends(AbstractParseMap, _super);
    function AbstractParseMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = new Map();
        return _this;
    }
    AbstractParseMap.prototype.lookup = function (symbol) {
        return this.map.get(symbol);
    };
    AbstractParseMap.prototype.contains = function (symbol) {
        return this.map.has(symbol);
    };
    AbstractParseMap.prototype.add = function (symbol, object) {
        this.map.set(symbol, object);
    };
    AbstractParseMap.prototype.remove = function (symbol) {
        this.map.delete(symbol);
    };
    return AbstractParseMap;
}(AbstractSymbolMap));
exports.AbstractParseMap = AbstractParseMap;
var CharacterMap = (function (_super) {
    __extends(CharacterMap, _super);
    function CharacterMap(name, parser, json) {
        var e_1, _a;
        var _this = _super.call(this, name, parser) || this;
        try {
            for (var _b = __values(Object.keys(json)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var value = json[key];
                var _d = __read((typeof (value) === 'string') ? [value, null] : value, 2), char = _d[0], attrs = _d[1];
                var character = new Symbol_js_1.Symbol(key, char, attrs);
                _this.add(key, character);
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
    return CharacterMap;
}(AbstractParseMap));
exports.CharacterMap = CharacterMap;
var DelimiterMap = (function (_super) {
    __extends(DelimiterMap, _super);
    function DelimiterMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DelimiterMap.prototype.parse = function (_a) {
        var _b = __read(_a, 2), env = _b[0], symbol = _b[1];
        return _super.prototype.parse.call(this, [env, '\\' + symbol]);
    };
    return DelimiterMap;
}(CharacterMap));
exports.DelimiterMap = DelimiterMap;
var MacroMap = (function (_super) {
    __extends(MacroMap, _super);
    function MacroMap(name, json, functionMap) {
        var e_2, _a;
        var _this = _super.call(this, name, null) || this;
        try {
            for (var _b = __values(Object.keys(json)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var value = json[key];
                var _d = __read((typeof (value) === 'string') ? [value] : value), func = _d[0], attrs = _d.slice(1);
                var character = new Symbol_js_1.Macro(key, functionMap[func], attrs);
                _this.add(key, character);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return _this;
    }
    MacroMap.prototype.parserFor = function (symbol) {
        var macro = this.lookup(symbol);
        return macro ? macro.func : null;
    };
    MacroMap.prototype.parse = function (_a) {
        var _b = __read(_a, 2), env = _b[0], symbol = _b[1];
        var macro = this.lookup(symbol);
        var parser = this.parserFor(symbol);
        if (!macro || !parser) {
            return null;
        }
        return parseResult(parser.apply(void 0, __spreadArray([env, macro.symbol], __read(macro.args), false)));
    };
    return MacroMap;
}(AbstractParseMap));
exports.MacroMap = MacroMap;
var CommandMap = (function (_super) {
    __extends(CommandMap, _super);
    function CommandMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandMap.prototype.parse = function (_a) {
        var _b = __read(_a, 2), env = _b[0], symbol = _b[1];
        var macro = this.lookup(symbol);
        var parser = this.parserFor(symbol);
        if (!macro || !parser) {
            return null;
        }
        var saveCommand = env.currentCS;
        env.currentCS = '\\' + symbol;
        var result = parser.apply(void 0, __spreadArray([env, '\\' + macro.symbol], __read(macro.args), false));
        env.currentCS = saveCommand;
        return parseResult(result);
    };
    return CommandMap;
}(MacroMap));
exports.CommandMap = CommandMap;
var EnvironmentMap = (function (_super) {
    __extends(EnvironmentMap, _super);
    function EnvironmentMap(name, parser, json, functionMap) {
        var _this = _super.call(this, name, json, functionMap) || this;
        _this.parser = parser;
        return _this;
    }
    EnvironmentMap.prototype.parse = function (_a) {
        var _b = __read(_a, 2), env = _b[0], symbol = _b[1];
        var macro = this.lookup(symbol);
        var envParser = this.parserFor(symbol);
        if (!macro || !envParser) {
            return null;
        }
        return parseResult(this.parser(env, macro.symbol, envParser, macro.args));
    };
    return EnvironmentMap;
}(MacroMap));
exports.EnvironmentMap = EnvironmentMap;
//# sourceMappingURL=SymbolMap.js.map

/***/ }),

/***/ 56711:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagsFactory = exports.AllTags = exports.NoTags = exports.AbstractTags = exports.TagInfo = exports.Label = void 0;
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var Label = (function () {
    function Label(tag, id) {
        if (tag === void 0) { tag = '???'; }
        if (id === void 0) { id = ''; }
        this.tag = tag;
        this.id = id;
    }
    return Label;
}());
exports.Label = Label;
var TagInfo = (function () {
    function TagInfo(env, taggable, defaultTags, tag, tagId, tagFormat, noTag, labelId) {
        if (env === void 0) { env = ''; }
        if (taggable === void 0) { taggable = false; }
        if (defaultTags === void 0) { defaultTags = false; }
        if (tag === void 0) { tag = null; }
        if (tagId === void 0) { tagId = ''; }
        if (tagFormat === void 0) { tagFormat = ''; }
        if (noTag === void 0) { noTag = false; }
        if (labelId === void 0) { labelId = ''; }
        this.env = env;
        this.taggable = taggable;
        this.defaultTags = defaultTags;
        this.tag = tag;
        this.tagId = tagId;
        this.tagFormat = tagFormat;
        this.noTag = noTag;
        this.labelId = labelId;
    }
    return TagInfo;
}());
exports.TagInfo = TagInfo;
var AbstractTags = (function () {
    function AbstractTags() {
        this.counter = 0;
        this.allCounter = 0;
        this.configuration = null;
        this.ids = {};
        this.allIds = {};
        this.labels = {};
        this.allLabels = {};
        this.redo = false;
        this.refUpdate = false;
        this.currentTag = new TagInfo();
        this.history = [];
        this.stack = [];
        this.enTag = function (node, tag) {
            var nf = this.configuration.nodeFactory;
            var cell = nf.create('node', 'mtd', [node]);
            var row = nf.create('node', 'mlabeledtr', [tag, cell]);
            var table = nf.create('node', 'mtable', [row], {
                side: this.configuration.options['tagSide'],
                minlabelspacing: this.configuration.options['tagIndent'],
                displaystyle: true
            });
            return table;
        };
    }
    AbstractTags.prototype.start = function (env, taggable, defaultTags) {
        if (this.currentTag) {
            this.stack.push(this.currentTag);
        }
        this.currentTag = new TagInfo(env, taggable, defaultTags);
    };
    Object.defineProperty(AbstractTags.prototype, "env", {
        get: function () {
            return this.currentTag.env;
        },
        enumerable: false,
        configurable: true
    });
    AbstractTags.prototype.end = function () {
        this.history.push(this.currentTag);
        this.currentTag = this.stack.pop();
    };
    AbstractTags.prototype.tag = function (tag, noFormat) {
        this.currentTag.tag = tag;
        this.currentTag.tagFormat = noFormat ? tag : this.formatTag(tag);
        this.currentTag.noTag = false;
    };
    AbstractTags.prototype.notag = function () {
        this.tag('', true);
        this.currentTag.noTag = true;
    };
    Object.defineProperty(AbstractTags.prototype, "noTag", {
        get: function () {
            return this.currentTag.noTag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractTags.prototype, "label", {
        get: function () {
            return this.currentTag.labelId;
        },
        set: function (label) {
            this.currentTag.labelId = label;
        },
        enumerable: false,
        configurable: true
    });
    AbstractTags.prototype.formatUrl = function (id, base) {
        return base + '#' + encodeURIComponent(id);
    };
    AbstractTags.prototype.formatTag = function (tag) {
        return '(' + tag + ')';
    };
    AbstractTags.prototype.formatId = function (id) {
        return 'mjx-eqn:' + id.replace(/\s/g, '_');
    };
    AbstractTags.prototype.formatNumber = function (n) {
        return n.toString();
    };
    AbstractTags.prototype.autoTag = function () {
        if (this.currentTag.tag == null) {
            this.counter++;
            this.tag(this.formatNumber(this.counter), false);
        }
    };
    AbstractTags.prototype.clearTag = function () {
        this.label = '';
        this.tag(null, true);
        this.currentTag.tagId = '';
    };
    AbstractTags.prototype.getTag = function (force) {
        if (force === void 0) { force = false; }
        if (force) {
            this.autoTag();
            return this.makeTag();
        }
        var ct = this.currentTag;
        if (ct.taggable && !ct.noTag) {
            if (ct.defaultTags) {
                this.autoTag();
            }
            if (ct.tag) {
                return this.makeTag();
            }
        }
        return null;
    };
    AbstractTags.prototype.resetTag = function () {
        this.history = [];
        this.redo = false;
        this.refUpdate = false;
        this.clearTag();
    };
    AbstractTags.prototype.reset = function (offset) {
        if (offset === void 0) { offset = 0; }
        this.resetTag();
        this.counter = this.allCounter = offset;
        this.allLabels = {};
        this.allIds = {};
    };
    AbstractTags.prototype.startEquation = function (math) {
        this.history = [];
        this.stack = [];
        this.clearTag();
        this.currentTag = new TagInfo('', undefined, undefined);
        this.labels = {};
        this.ids = {};
        this.counter = this.allCounter;
        this.redo = false;
        var recompile = math.inputData.recompile;
        if (recompile) {
            this.refUpdate = true;
            this.counter = recompile.counter;
        }
    };
    AbstractTags.prototype.finishEquation = function (math) {
        if (this.redo) {
            math.inputData.recompile = {
                state: math.state(),
                counter: this.allCounter
            };
        }
        if (!this.refUpdate) {
            this.allCounter = this.counter;
        }
        Object.assign(this.allIds, this.ids);
        Object.assign(this.allLabels, this.labels);
    };
    AbstractTags.prototype.finalize = function (node, env) {
        if (!env.display || this.currentTag.env ||
            this.currentTag.tag == null) {
            return node;
        }
        var tag = this.makeTag();
        var table = this.enTag(node, tag);
        return table;
    };
    AbstractTags.prototype.makeId = function () {
        this.currentTag.tagId = this.formatId(this.configuration.options['useLabelIds'] ?
            (this.label || this.currentTag.tag) : this.currentTag.tag);
    };
    AbstractTags.prototype.makeTag = function () {
        this.makeId();
        if (this.label) {
            this.labels[this.label] = new Label(this.currentTag.tag, this.currentTag.tagId);
        }
        var mml = new TexParser_js_1.default('\\text{' + this.currentTag.tagFormat + '}', {}, this.configuration).mml();
        return this.configuration.nodeFactory.create('node', 'mtd', [mml], { id: this.currentTag.tagId });
    };
    return AbstractTags;
}());
exports.AbstractTags = AbstractTags;
var NoTags = (function (_super) {
    __extends(NoTags, _super);
    function NoTags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoTags.prototype.autoTag = function () { };
    NoTags.prototype.getTag = function () {
        return !this.currentTag.tag ? null : _super.prototype.getTag.call(this);
    };
    return NoTags;
}(AbstractTags));
exports.NoTags = NoTags;
var AllTags = (function (_super) {
    __extends(AllTags, _super);
    function AllTags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllTags.prototype.finalize = function (node, env) {
        if (!env.display || this.history.find(function (x) { return x.taggable; })) {
            return node;
        }
        var tag = this.getTag(true);
        return this.enTag(node, tag);
    };
    return AllTags;
}(AbstractTags));
exports.AllTags = AllTags;
var TagsFactory;
(function (TagsFactory) {
    var tagsMapping = new Map([
        ['none', NoTags],
        ['all', AllTags]
    ]);
    var defaultTags = 'none';
    TagsFactory.OPTIONS = {
        tags: defaultTags,
        tagSide: 'right',
        tagIndent: '0.8em',
        useLabelIds: true,
        ignoreDuplicateLabels: false
    };
    TagsFactory.add = function (name, constr) {
        tagsMapping.set(name, constr);
    };
    TagsFactory.addTags = function (tags) {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(tags)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                TagsFactory.add(key, tags[key]);
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
    TagsFactory.create = function (name) {
        var constr = tagsMapping.get(name) || tagsMapping.get(defaultTags);
        if (!constr) {
            throw Error('Unknown tags class');
        }
        return new constr();
    };
    TagsFactory.setDefault = function (name) {
        defaultTags = name;
    };
    TagsFactory.getDefault = function () {
        return TagsFactory.create(defaultTags);
    };
})(TagsFactory = exports.TagsFactory || (exports.TagsFactory = {}));
//# sourceMappingURL=Tags.js.map

/***/ }),

/***/ 48948:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TexConstant = void 0;
var TexConstant;
(function (TexConstant) {
    TexConstant.Variant = {
        NORMAL: 'normal',
        BOLD: 'bold',
        ITALIC: 'italic',
        BOLDITALIC: 'bold-italic',
        DOUBLESTRUCK: 'double-struck',
        FRAKTUR: 'fraktur',
        BOLDFRAKTUR: 'bold-fraktur',
        SCRIPT: 'script',
        BOLDSCRIPT: 'bold-script',
        SANSSERIF: 'sans-serif',
        BOLDSANSSERIF: 'bold-sans-serif',
        SANSSERIFITALIC: 'sans-serif-italic',
        SANSSERIFBOLDITALIC: 'sans-serif-bold-italic',
        MONOSPACE: 'monospace',
        INITIAL: 'inital',
        TAILED: 'tailed',
        LOOPED: 'looped',
        STRETCHED: 'stretched',
        CALLIGRAPHIC: '-tex-calligraphic',
        BOLDCALLIGRAPHIC: '-tex-bold-calligraphic',
        OLDSTYLE: '-tex-oldstyle',
        BOLDOLDSTYLE: '-tex-bold-oldstyle',
        MATHITALIC: '-tex-mathit'
    };
    TexConstant.Form = {
        PREFIX: 'prefix',
        INFIX: 'infix',
        POSTFIX: 'postfix'
    };
    TexConstant.LineBreak = {
        AUTO: 'auto',
        NEWLINE: 'newline',
        NOBREAK: 'nobreak',
        GOODBREAK: 'goodbreak',
        BADBREAK: 'badbreak'
    };
    TexConstant.LineBreakStyle = {
        BEFORE: 'before',
        AFTER: 'after',
        DUPLICATE: 'duplicate',
        INFIXLINBREAKSTYLE: 'infixlinebreakstyle'
    };
    TexConstant.IndentAlign = {
        LEFT: 'left',
        CENTER: 'center',
        RIGHT: 'right',
        AUTO: 'auto',
        ID: 'id',
        INDENTALIGN: 'indentalign'
    };
    TexConstant.IndentShift = {
        INDENTSHIFT: 'indentshift'
    };
    TexConstant.LineThickness = {
        THIN: 'thin',
        MEDIUM: 'medium',
        THICK: 'thick'
    };
    TexConstant.Notation = {
        LONGDIV: 'longdiv',
        ACTUARIAL: 'actuarial',
        PHASORANGLE: 'phasorangle',
        RADICAL: 'radical',
        BOX: 'box',
        ROUNDEDBOX: 'roundedbox',
        CIRCLE: 'circle',
        LEFT: 'left',
        RIGHT: 'right',
        TOP: 'top',
        BOTTOM: 'bottom',
        UPDIAGONALSTRIKE: 'updiagonalstrike',
        DOWNDIAGONALSTRIKE: 'downdiagonalstrike',
        VERTICALSTRIKE: 'verticalstrike',
        HORIZONTALSTRIKE: 'horizontalstrike',
        NORTHEASTARROW: 'northeastarrow',
        MADRUWB: 'madruwb',
        UPDIAGONALARROW: 'updiagonalarrow'
    };
    TexConstant.Align = {
        TOP: 'top',
        BOTTOM: 'bottom',
        CENTER: 'center',
        BASELINE: 'baseline',
        AXIS: 'axis',
        LEFT: 'left',
        RIGHT: 'right'
    };
    TexConstant.Lines = {
        NONE: 'none',
        SOLID: 'solid',
        DASHED: 'dashed'
    };
    TexConstant.Side = {
        LEFT: 'left',
        RIGHT: 'right',
        LEFTOVERLAP: 'leftoverlap',
        RIGHTOVERLAP: 'rightoverlap'
    };
    TexConstant.Width = {
        AUTO: 'auto',
        FIT: 'fit'
    };
    TexConstant.Actiontype = {
        TOGGLE: 'toggle',
        STATUSLINE: 'statusline',
        TOOLTIP: 'tooltip',
        INPUT: 'input'
    };
    TexConstant.Overflow = {
        LINBREAK: 'linebreak',
        SCROLL: 'scroll',
        ELIDE: 'elide',
        TRUNCATE: 'truncate',
        SCALE: 'scale'
    };
    TexConstant.Unit = {
        EM: 'em',
        EX: 'ex',
        PX: 'px',
        IN: 'in',
        CM: 'cm',
        MM: 'mm',
        PT: 'pt',
        PC: 'pc'
    };
})(TexConstant = exports.TexConstant || (exports.TexConstant = {}));
//# sourceMappingURL=TexConstants.js.map

/***/ }),

/***/ 48406:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var TexError = (function () {
    function TexError(id, message) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        this.id = id;
        this.message = TexError.processString(message, rest);
    }
    TexError.processString = function (str, args) {
        var parts = str.split(TexError.pattern);
        for (var i = 1, m = parts.length; i < m; i += 2) {
            var c = parts[i].charAt(0);
            if (c >= '0' && c <= '9') {
                parts[i] = args[parseInt(parts[i], 10) - 1];
                if (typeof parts[i] === 'number') {
                    parts[i] = parts[i].toString();
                }
            }
            else if (c === '{') {
                c = parts[i].substr(1);
                if (c >= '0' && c <= '9') {
                    parts[i] = args[parseInt(parts[i].substr(1, parts[i].length - 2), 10) - 1];
                    if (typeof parts[i] === 'number') {
                        parts[i] = parts[i].toString();
                    }
                }
                else {
                    var match = parts[i].match(/^\{([a-z]+):%(\d+)\|(.*)\}$/);
                    if (match) {
                        parts[i] = '%' + parts[i];
                    }
                }
            }
            if (parts[i] == null) {
                parts[i] = '???';
            }
        }
        return parts.join('');
    };
    TexError.pattern = /%(\d+|\{\d+\}|\{[a-z]+:\%\d+(?:\|(?:%\{\d+\}|%.|[^\}])*)+\}|.)/g;
    return TexError;
}());
exports["default"] = TexError;
//# sourceMappingURL=TexError.js.map

/***/ }),

/***/ 42880:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var Stack_js_1 = __importDefault(__webpack_require__(14577));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var MmlNode_js_1 = __webpack_require__(18426);
var TexParser = (function () {
    function TexParser(_string, env, configuration) {
        var e_1, _a;
        this._string = _string;
        this.configuration = configuration;
        this.macroCount = 0;
        this.i = 0;
        this.currentCS = '';
        var inner = env.hasOwnProperty('isInner');
        var isInner = env['isInner'];
        delete env['isInner'];
        var ENV;
        if (env) {
            ENV = {};
            try {
                for (var _b = __values(Object.keys(env)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var id = _c.value;
                    ENV[id] = env[id];
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
        this.configuration.pushParser(this);
        this.stack = new Stack_js_1.default(this.itemFactory, ENV, inner ? isInner : true);
        this.Parse();
        this.Push(this.itemFactory.create('stop'));
    }
    Object.defineProperty(TexParser.prototype, "options", {
        get: function () {
            return this.configuration.options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TexParser.prototype, "itemFactory", {
        get: function () {
            return this.configuration.itemFactory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TexParser.prototype, "tags", {
        get: function () {
            return this.configuration.tags;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TexParser.prototype, "string", {
        get: function () {
            return this._string;
        },
        set: function (str) {
            this._string = str;
        },
        enumerable: false,
        configurable: true
    });
    TexParser.prototype.parse = function (kind, input) {
        return this.configuration.handlers.get(kind).parse(input);
    };
    TexParser.prototype.lookup = function (kind, symbol) {
        return this.configuration.handlers.get(kind).lookup(symbol);
    };
    TexParser.prototype.contains = function (kind, symbol) {
        return this.configuration.handlers.get(kind).contains(symbol);
    };
    TexParser.prototype.toString = function () {
        var e_2, _a;
        var str = '';
        try {
            for (var _b = __values(Array.from(this.configuration.handlers.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var config = _c.value;
                str += config + ': ' +
                    this.configuration.handlers.get(config) + '\n';
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return str;
    };
    TexParser.prototype.Parse = function () {
        var c;
        while (this.i < this.string.length) {
            c = this.getCodePoint();
            this.i += c.length;
            this.parse('character', [this, c]);
        }
    };
    TexParser.prototype.Push = function (arg) {
        if (arg instanceof MmlNode_js_1.AbstractMmlNode && arg.isInferred) {
            this.PushAll(arg.childNodes);
        }
        else {
            this.stack.Push(arg);
        }
    };
    TexParser.prototype.PushAll = function (args) {
        var e_3, _a;
        try {
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var arg = args_1_1.value;
                this.stack.Push(arg);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    TexParser.prototype.mml = function () {
        if (!this.stack.Top().isKind('mml')) {
            return null;
        }
        var node = this.stack.Top().First;
        this.configuration.popParser();
        return node;
    };
    TexParser.prototype.convertDelimiter = function (c) {
        var symbol = this.lookup('delimiter', c);
        return symbol ? symbol.char : null;
    };
    TexParser.prototype.getCodePoint = function () {
        var code = this.string.codePointAt(this.i);
        return code === undefined ? '' : String.fromCodePoint(code);
    };
    TexParser.prototype.nextIsSpace = function () {
        return !!this.string.charAt(this.i).match(/\s/);
    };
    TexParser.prototype.GetNext = function () {
        while (this.nextIsSpace()) {
            this.i++;
        }
        return this.getCodePoint();
    };
    TexParser.prototype.GetCS = function () {
        var CS = this.string.slice(this.i).match(/^(([a-z]+) ?|[\uD800-\uDBFF].|.)/i);
        if (CS) {
            this.i += CS[0].length;
            return CS[2] || CS[1];
        }
        else {
            this.i++;
            return ' ';
        }
    };
    TexParser.prototype.GetArgument = function (_name, noneOK) {
        switch (this.GetNext()) {
            case '':
                if (!noneOK) {
                    throw new TexError_js_1.default('MissingArgFor', 'Missing argument for %1', this.currentCS);
                }
                return null;
            case '}':
                if (!noneOK) {
                    throw new TexError_js_1.default('ExtraCloseMissingOpen', 'Extra close brace or missing open brace');
                }
                return null;
            case '\\':
                this.i++;
                return '\\' + this.GetCS();
            case '{':
                var j = ++this.i, parens = 1;
                while (this.i < this.string.length) {
                    switch (this.string.charAt(this.i++)) {
                        case '\\':
                            this.i++;
                            break;
                        case '{':
                            parens++;
                            break;
                        case '}':
                            if (--parens === 0) {
                                return this.string.slice(j, this.i - 1);
                            }
                            break;
                    }
                }
                throw new TexError_js_1.default('MissingCloseBrace', 'Missing close brace');
        }
        var c = this.getCodePoint();
        this.i += c.length;
        return c;
    };
    TexParser.prototype.GetBrackets = function (_name, def) {
        if (this.GetNext() !== '[') {
            return def;
        }
        var j = ++this.i, parens = 0;
        while (this.i < this.string.length) {
            switch (this.string.charAt(this.i++)) {
                case '{':
                    parens++;
                    break;
                case '\\':
                    this.i++;
                    break;
                case '}':
                    if (parens-- <= 0) {
                        throw new TexError_js_1.default('ExtraCloseLooking', 'Extra close brace while looking for %1', '\']\'');
                    }
                    break;
                case ']':
                    if (parens === 0) {
                        return this.string.slice(j, this.i - 1);
                    }
                    break;
            }
        }
        throw new TexError_js_1.default('MissingCloseBracket', 'Could not find closing \']\' for argument to %1', this.currentCS);
    };
    TexParser.prototype.GetDelimiter = function (name, braceOK) {
        var c = this.GetNext();
        this.i += c.length;
        if (this.i <= this.string.length) {
            if (c === '\\') {
                c += this.GetCS();
            }
            else if (c === '{' && braceOK) {
                this.i--;
                c = this.GetArgument(name).trim();
            }
            if (this.contains('delimiter', c)) {
                return this.convertDelimiter(c);
            }
        }
        throw new TexError_js_1.default('MissingOrUnrecognizedDelim', 'Missing or unrecognized delimiter for %1', this.currentCS);
    };
    TexParser.prototype.GetDimen = function (name) {
        if (this.GetNext() === '{') {
            var dimen = this.GetArgument(name);
            var _a = __read(ParseUtil_js_1.default.matchDimen(dimen), 2), value = _a[0], unit = _a[1];
            if (value) {
                return value + unit;
            }
        }
        else {
            var dimen = this.string.slice(this.i);
            var _b = __read(ParseUtil_js_1.default.matchDimen(dimen, true), 3), value = _b[0], unit = _b[1], length_1 = _b[2];
            if (value) {
                this.i += length_1;
                return value + unit;
            }
        }
        throw new TexError_js_1.default('MissingDimOrUnits', 'Missing dimension or its units for %1', this.currentCS);
    };
    TexParser.prototype.GetUpTo = function (_name, token) {
        while (this.nextIsSpace()) {
            this.i++;
        }
        var j = this.i;
        var parens = 0;
        while (this.i < this.string.length) {
            var k = this.i;
            var c = this.GetNext();
            this.i += c.length;
            switch (c) {
                case '\\':
                    c += this.GetCS();
                    break;
                case '{':
                    parens++;
                    break;
                case '}':
                    if (parens === 0) {
                        throw new TexError_js_1.default('ExtraCloseLooking', 'Extra close brace while looking for %1', token);
                    }
                    parens--;
                    break;
            }
            if (parens === 0 && c === token) {
                return this.string.slice(j, k);
            }
        }
        throw new TexError_js_1.default('TokenNotFoundForCommand', 'Could not find %1 for %2', token, this.currentCS);
    };
    TexParser.prototype.ParseArg = function (name) {
        return new TexParser(this.GetArgument(name), this.stack.env, this.configuration).mml();
    };
    TexParser.prototype.ParseUpTo = function (name, token) {
        return new TexParser(this.GetUpTo(name, token), this.stack.env, this.configuration).mml();
    };
    TexParser.prototype.GetDelimiterArg = function (name) {
        var c = ParseUtil_js_1.default.trimSpaces(this.GetArgument(name));
        if (c === '') {
            return null;
        }
        if (this.contains('delimiter', c)) {
            return c;
        }
        throw new TexError_js_1.default('MissingOrUnrecognizedDelim', 'Missing or unrecognized delimiter for %1', this.currentCS);
    };
    TexParser.prototype.GetStar = function () {
        var star = (this.GetNext() === '*');
        if (star) {
            this.i++;
        }
        return star;
    };
    TexParser.prototype.create = function (kind) {
        var _a;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return (_a = this.configuration.nodeFactory).create.apply(_a, __spreadArray([kind], __read(rest), false));
    };
    return TexParser;
}());
exports["default"] = TexParser;
//# sourceMappingURL=TexParser.js.map

/***/ }),

/***/ 13646:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionConfiguration = exports.ActionMethods = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var SymbolMap_js_1 = __webpack_require__(92715);
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
exports.ActionMethods = {};
exports.ActionMethods.Macro = BaseMethods_js_1.default.Macro;
exports.ActionMethods.Toggle = function (parser, name) {
    var children = [];
    var arg;
    while ((arg = parser.GetArgument(name)) !== '\\endtoggle') {
        children.push(new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml());
    }
    parser.Push(parser.create('node', 'maction', children, { actiontype: 'toggle' }));
};
exports.ActionMethods.Mathtip = function (parser, name) {
    var arg = parser.ParseArg(name);
    var tip = parser.ParseArg(name);
    parser.Push(parser.create('node', 'maction', [arg, tip], { actiontype: 'tooltip' }));
};
new SymbolMap_js_1.CommandMap('action-macros', {
    toggle: 'Toggle',
    mathtip: 'Mathtip',
    texttip: ['Macro', '\\mathtip{#1}{\\text{#2}}', 2]
}, exports.ActionMethods);
exports.ActionConfiguration = Configuration_js_1.Configuration.create('action', { handler: { macro: ['action-macros'] } });
//# sourceMappingURL=ActionConfiguration.js.map

/***/ }),

/***/ 53379:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AmsConfiguration = exports.AmsTags = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var AmsItems_js_1 = __webpack_require__(30354);
var Tags_js_1 = __webpack_require__(56711);
var AmsMethods_js_1 = __webpack_require__(42828);
__webpack_require__(83280);
var SymbolMap_js_1 = __webpack_require__(92715);
var AmsTags = (function (_super) {
    __extends(AmsTags, _super);
    function AmsTags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AmsTags;
}(Tags_js_1.AbstractTags));
exports.AmsTags = AmsTags;
var init = function (config) {
    new SymbolMap_js_1.CommandMap(AmsMethods_js_1.NEW_OPS, {}, {});
    config.append(Configuration_js_1.Configuration.local({ handler: { macro: [AmsMethods_js_1.NEW_OPS] },
        priority: -1 }));
};
exports.AmsConfiguration = Configuration_js_1.Configuration.create('ams', {
    handler: {
        character: ['AMSmath-operatorLetter'],
        delimiter: ['AMSsymbols-delimiter', 'AMSmath-delimiter'],
        macro: ['AMSsymbols-mathchar0mi', 'AMSsymbols-mathchar0mo',
            'AMSsymbols-delimiter', 'AMSsymbols-macros',
            'AMSmath-mathchar0mo', 'AMSmath-macros', 'AMSmath-delimiter'],
        environment: ['AMSmath-environment']
    },
    items: (_a = {},
        _a[AmsItems_js_1.MultlineItem.prototype.kind] = AmsItems_js_1.MultlineItem,
        _a[AmsItems_js_1.FlalignItem.prototype.kind] = AmsItems_js_1.FlalignItem,
        _a),
    tags: { 'ams': AmsTags },
    init: init,
    config: function (_config, jax) {
        if (jax.parseOptions.options.multlineWidth) {
            jax.parseOptions.options.ams.multlineWidth = jax.parseOptions.options.multlineWidth;
        }
        delete jax.parseOptions.options.multlineWidth;
    },
    options: {
        multlineWidth: '',
        ams: {
            multlineWidth: '100%',
            multlineIndent: '1em',
        }
    }
});
//# sourceMappingURL=AmsConfiguration.js.map

/***/ }),

/***/ 30354:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlalignItem = exports.MultlineItem = void 0;
var BaseItems_js_1 = __webpack_require__(5065);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var TexConstants_js_1 = __webpack_require__(48948);
var MultlineItem = (function (_super) {
    __extends(MultlineItem, _super);
    function MultlineItem(factory) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, factory) || this;
        _this.factory.configuration.tags.start('multline', true, args[0]);
        return _this;
    }
    Object.defineProperty(MultlineItem.prototype, "kind", {
        get: function () {
            return 'multline';
        },
        enumerable: false,
        configurable: true
    });
    MultlineItem.prototype.EndEntry = function () {
        if (this.table.length) {
            ParseUtil_js_1.default.fixInitialMO(this.factory.configuration, this.nodes);
        }
        var shove = this.getProperty('shove');
        var mtd = this.create('node', 'mtd', this.nodes, shove ? { columnalign: shove } : {});
        this.setProperty('shove', null);
        this.row.push(mtd);
        this.Clear();
    };
    MultlineItem.prototype.EndRow = function () {
        if (this.row.length !== 1) {
            throw new TexError_js_1.default('MultlineRowsOneCol', 'The rows within the %1 environment must have exactly one column', 'multline');
        }
        var row = this.create('node', 'mtr', this.row);
        this.table.push(row);
        this.row = [];
    };
    MultlineItem.prototype.EndTable = function () {
        _super.prototype.EndTable.call(this);
        if (this.table.length) {
            var m = this.table.length - 1, label = -1;
            if (!NodeUtil_js_1.default.getAttribute(NodeUtil_js_1.default.getChildren(this.table[0])[0], 'columnalign')) {
                NodeUtil_js_1.default.setAttribute(NodeUtil_js_1.default.getChildren(this.table[0])[0], 'columnalign', TexConstants_js_1.TexConstant.Align.LEFT);
            }
            if (!NodeUtil_js_1.default.getAttribute(NodeUtil_js_1.default.getChildren(this.table[m])[0], 'columnalign')) {
                NodeUtil_js_1.default.setAttribute(NodeUtil_js_1.default.getChildren(this.table[m])[0], 'columnalign', TexConstants_js_1.TexConstant.Align.RIGHT);
            }
            var tag = this.factory.configuration.tags.getTag();
            if (tag) {
                label = (this.arraydef.side === TexConstants_js_1.TexConstant.Align.LEFT ? 0 : this.table.length - 1);
                var mtr = this.table[label];
                var mlabel = this.create('node', 'mlabeledtr', [tag].concat(NodeUtil_js_1.default.getChildren(mtr)));
                NodeUtil_js_1.default.copyAttributes(mtr, mlabel);
                this.table[label] = mlabel;
            }
        }
        this.factory.configuration.tags.end();
    };
    return MultlineItem;
}(BaseItems_js_1.ArrayItem));
exports.MultlineItem = MultlineItem;
var FlalignItem = (function (_super) {
    __extends(FlalignItem, _super);
    function FlalignItem(factory, name, numbered, padded, center) {
        var _this = _super.call(this, factory) || this;
        _this.name = name;
        _this.numbered = numbered;
        _this.padded = padded;
        _this.center = center;
        _this.factory.configuration.tags.start(name, numbered, numbered);
        return _this;
    }
    Object.defineProperty(FlalignItem.prototype, "kind", {
        get: function () {
            return 'flalign';
        },
        enumerable: false,
        configurable: true
    });
    FlalignItem.prototype.EndEntry = function () {
        _super.prototype.EndEntry.call(this);
        var n = this.getProperty('xalignat');
        if (!n)
            return;
        if (this.row.length > n) {
            throw new TexError_js_1.default('XalignOverflow', 'Extra %1 in row of %2', '&', this.name);
        }
    };
    FlalignItem.prototype.EndRow = function () {
        var cell;
        var row = this.row;
        var n = this.getProperty('xalignat');
        while (row.length < n) {
            row.push(this.create('node', 'mtd'));
        }
        this.row = [];
        if (this.padded) {
            this.row.push(this.create('node', 'mtd'));
        }
        while ((cell = row.shift())) {
            this.row.push(cell);
            cell = row.shift();
            if (cell)
                this.row.push(cell);
            if (row.length || this.padded) {
                this.row.push(this.create('node', 'mtd'));
            }
        }
        if (this.row.length > this.maxrow) {
            this.maxrow = this.row.length;
        }
        _super.prototype.EndRow.call(this);
        var mtr = this.table[this.table.length - 1];
        if (this.getProperty('zeroWidthLabel') && mtr.isKind('mlabeledtr')) {
            var mtd = NodeUtil_js_1.default.getChildren(mtr)[0];
            var side = this.factory.configuration.options['tagSide'];
            var def = __assign({ width: 0 }, (side === 'right' ? { lspace: '-1width' } : {}));
            var mpadded = this.create('node', 'mpadded', NodeUtil_js_1.default.getChildren(mtd), def);
            mtd.setChildren([mpadded]);
        }
    };
    FlalignItem.prototype.EndTable = function () {
        _super.prototype.EndTable.call(this);
        if (this.center) {
            if (this.maxrow <= 2) {
                var def = this.arraydef;
                delete def.width;
                delete this.global.indentalign;
            }
        }
    };
    return FlalignItem;
}(BaseItems_js_1.EqnArrayItem));
exports.FlalignItem = FlalignItem;
//# sourceMappingURL=AmsItems.js.map

/***/ }),

/***/ 83280:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var AmsMethods_js_1 = __webpack_require__(42828);
var sm = __importStar(__webpack_require__(92715));
var TexConstants_js_1 = __webpack_require__(48948);
var ParseMethods_js_1 = __importDefault(__webpack_require__(96004));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var MmlNode_js_1 = __webpack_require__(18426);
var lengths_js_1 = __webpack_require__(77130);
new sm.CharacterMap('AMSmath-mathchar0mo', ParseMethods_js_1.default.mathchar0mo, {
    iiiint: ['\u2A0C', { texClass: MmlNode_js_1.TEXCLASS.OP }]
});
new sm.RegExpMap('AMSmath-operatorLetter', AmsMethods_js_1.AmsMethods.operatorLetter, /[-*]/i);
new sm.CommandMap('AMSmath-macros', {
    mathring: ['Accent', '02DA'],
    nobreakspace: 'Tilde',
    negmedspace: ['Spacer', lengths_js_1.MATHSPACE.negativemediummathspace],
    negthickspace: ['Spacer', lengths_js_1.MATHSPACE.negativethickmathspace],
    idotsint: ['MultiIntegral', '\\int\\cdots\\int'],
    dddot: ['Accent', '20DB'],
    ddddot: ['Accent', '20DC'],
    sideset: 'SideSet',
    boxed: ['Macro', '\\fbox{$\\displaystyle{#1}$}', 1],
    tag: 'HandleTag',
    notag: 'HandleNoTag',
    eqref: ['HandleRef', true],
    substack: ['Macro', '\\begin{subarray}{c}#1\\end{subarray}', 1],
    injlim: ['NamedOp', 'inj&thinsp;lim'],
    projlim: ['NamedOp', 'proj&thinsp;lim'],
    varliminf: ['Macro', '\\mathop{\\underline{\\mmlToken{mi}{lim}}}'],
    varlimsup: ['Macro', '\\mathop{\\overline{\\mmlToken{mi}{lim}}}'],
    varinjlim: ['Macro', '\\mathop{\\underrightarrow{\\mmlToken{mi}{lim}}}'],
    varprojlim: ['Macro', '\\mathop{\\underleftarrow{\\mmlToken{mi}{lim}}}'],
    DeclareMathOperator: 'HandleDeclareOp',
    operatorname: 'HandleOperatorName',
    genfrac: 'Genfrac',
    frac: ['Genfrac', '', '', '', ''],
    tfrac: ['Genfrac', '', '', '', '1'],
    dfrac: ['Genfrac', '', '', '', '0'],
    binom: ['Genfrac', '(', ')', '0', ''],
    tbinom: ['Genfrac', '(', ')', '0', '1'],
    dbinom: ['Genfrac', '(', ')', '0', '0'],
    cfrac: 'CFrac',
    shoveleft: ['HandleShove', TexConstants_js_1.TexConstant.Align.LEFT],
    shoveright: ['HandleShove', TexConstants_js_1.TexConstant.Align.RIGHT],
    xrightarrow: ['xArrow', 0x2192, 5, 10],
    xleftarrow: ['xArrow', 0x2190, 10, 5]
}, AmsMethods_js_1.AmsMethods);
new sm.EnvironmentMap('AMSmath-environment', ParseMethods_js_1.default.environment, {
    'equation*': ['Equation', null, false],
    'eqnarray*': ['EqnArray', null, false, true, 'rcl',
        ParseUtil_js_1.default.cols(0, lengths_js_1.MATHSPACE.thickmathspace), '.5em'],
    align: ['EqnArray', null, true, true, 'rl', ParseUtil_js_1.default.cols(0, 2)],
    'align*': ['EqnArray', null, false, true, 'rl', ParseUtil_js_1.default.cols(0, 2)],
    multline: ['Multline', null, true],
    'multline*': ['Multline', null, false],
    split: ['EqnArray', null, false, false, 'rl', ParseUtil_js_1.default.cols(0)],
    gather: ['EqnArray', null, true, true, 'c'],
    'gather*': ['EqnArray', null, false, true, 'c'],
    alignat: ['AlignAt', null, true, true],
    'alignat*': ['AlignAt', null, false, true],
    alignedat: ['AlignAt', null, false, false],
    aligned: ['AmsEqnArray', null, null, null, 'rl', ParseUtil_js_1.default.cols(0, 2), '.5em', 'D'],
    gathered: ['AmsEqnArray', null, null, null, 'c', null, '.5em', 'D'],
    xalignat: ['XalignAt', null, true, true],
    'xalignat*': ['XalignAt', null, false, true],
    xxalignat: ['XalignAt', null, false, false],
    flalign: ['FlalignArray', null, true, false, true, 'rlc', 'auto auto fit'],
    'flalign*': ['FlalignArray', null, false, false, true, 'rlc', 'auto auto fit'],
    subarray: ['Array', null, null, null, null, ParseUtil_js_1.default.cols(0), '0.1em', 'S', 1],
    smallmatrix: ['Array', null, null, null, 'c', ParseUtil_js_1.default.cols(1 / 3),
        '.2em', 'S', 1],
    matrix: ['Array', null, null, null, 'c'],
    pmatrix: ['Array', null, '(', ')', 'c'],
    bmatrix: ['Array', null, '[', ']', 'c'],
    Bmatrix: ['Array', null, '\\{', '\\}', 'c'],
    vmatrix: ['Array', null, '\\vert', '\\vert', 'c'],
    Vmatrix: ['Array', null, '\\Vert', '\\Vert', 'c'],
    cases: ['Array', null, '\\{', '.', 'll', null, '.2em', 'T']
}, AmsMethods_js_1.AmsMethods);
new sm.DelimiterMap('AMSmath-delimiter', ParseMethods_js_1.default.delimiter, {
    '\\lvert': ['\u007C', { texClass: MmlNode_js_1.TEXCLASS.OPEN }],
    '\\rvert': ['\u007C', { texClass: MmlNode_js_1.TEXCLASS.CLOSE }],
    '\\lVert': ['\u2016', { texClass: MmlNode_js_1.TEXCLASS.OPEN }],
    '\\rVert': ['\u2016', { texClass: MmlNode_js_1.TEXCLASS.CLOSE }]
});
new sm.CharacterMap('AMSsymbols-mathchar0mi', ParseMethods_js_1.default.mathchar0mi, {
    digamma: '\u03DD',
    varkappa: '\u03F0',
    varGamma: ['\u0393', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varDelta: ['\u0394', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varTheta: ['\u0398', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varLambda: ['\u039B', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varXi: ['\u039E', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varPi: ['\u03A0', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varSigma: ['\u03A3', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varUpsilon: ['\u03A5', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varPhi: ['\u03A6', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varPsi: ['\u03A8', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    varOmega: ['\u03A9', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    beth: '\u2136',
    gimel: '\u2137',
    daleth: '\u2138',
    backprime: ['\u2035', { variantForm: true }],
    hslash: '\u210F',
    varnothing: ['\u2205', { variantForm: true }],
    blacktriangle: '\u25B4',
    triangledown: ['\u25BD', { variantForm: true }],
    blacktriangledown: '\u25BE',
    square: '\u25FB',
    Box: '\u25FB',
    blacksquare: '\u25FC',
    lozenge: '\u25CA',
    Diamond: '\u25CA',
    blacklozenge: '\u29EB',
    circledS: ['\u24C8', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    bigstar: '\u2605',
    sphericalangle: '\u2222',
    measuredangle: '\u2221',
    nexists: '\u2204',
    complement: '\u2201',
    mho: '\u2127',
    eth: ['\u00F0', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    Finv: '\u2132',
    diagup: '\u2571',
    Game: '\u2141',
    diagdown: '\u2572',
    Bbbk: ['\u006B',
        { mathvariant: TexConstants_js_1.TexConstant.Variant.DOUBLESTRUCK }],
    yen: '\u00A5',
    circledR: '\u00AE',
    checkmark: '\u2713',
    maltese: '\u2720'
});
new sm.CharacterMap('AMSsymbols-mathchar0mo', ParseMethods_js_1.default.mathchar0mo, {
    dotplus: '\u2214',
    ltimes: '\u22C9',
    smallsetminus: ['\u2216', { variantForm: true }],
    rtimes: '\u22CA',
    Cap: '\u22D2',
    doublecap: '\u22D2',
    leftthreetimes: '\u22CB',
    Cup: '\u22D3',
    doublecup: '\u22D3',
    rightthreetimes: '\u22CC',
    barwedge: '\u22BC',
    curlywedge: '\u22CF',
    veebar: '\u22BB',
    curlyvee: '\u22CE',
    doublebarwedge: '\u2A5E',
    boxminus: '\u229F',
    circleddash: '\u229D',
    boxtimes: '\u22A0',
    circledast: '\u229B',
    boxdot: '\u22A1',
    circledcirc: '\u229A',
    boxplus: '\u229E',
    centerdot: ['\u22C5', { variantForm: true }],
    divideontimes: '\u22C7',
    intercal: '\u22BA',
    leqq: '\u2266',
    geqq: '\u2267',
    leqslant: '\u2A7D',
    geqslant: '\u2A7E',
    eqslantless: '\u2A95',
    eqslantgtr: '\u2A96',
    lesssim: '\u2272',
    gtrsim: '\u2273',
    lessapprox: '\u2A85',
    gtrapprox: '\u2A86',
    approxeq: '\u224A',
    lessdot: '\u22D6',
    gtrdot: '\u22D7',
    lll: '\u22D8',
    llless: '\u22D8',
    ggg: '\u22D9',
    gggtr: '\u22D9',
    lessgtr: '\u2276',
    gtrless: '\u2277',
    lesseqgtr: '\u22DA',
    gtreqless: '\u22DB',
    lesseqqgtr: '\u2A8B',
    gtreqqless: '\u2A8C',
    doteqdot: '\u2251',
    Doteq: '\u2251',
    eqcirc: '\u2256',
    risingdotseq: '\u2253',
    circeq: '\u2257',
    fallingdotseq: '\u2252',
    triangleq: '\u225C',
    backsim: '\u223D',
    thicksim: ['\u223C', { variantForm: true }],
    backsimeq: '\u22CD',
    thickapprox: ['\u2248', { variantForm: true }],
    subseteqq: '\u2AC5',
    supseteqq: '\u2AC6',
    Subset: '\u22D0',
    Supset: '\u22D1',
    sqsubset: '\u228F',
    sqsupset: '\u2290',
    preccurlyeq: '\u227C',
    succcurlyeq: '\u227D',
    curlyeqprec: '\u22DE',
    curlyeqsucc: '\u22DF',
    precsim: '\u227E',
    succsim: '\u227F',
    precapprox: '\u2AB7',
    succapprox: '\u2AB8',
    vartriangleleft: '\u22B2',
    lhd: '\u22B2',
    vartriangleright: '\u22B3',
    rhd: '\u22B3',
    trianglelefteq: '\u22B4',
    unlhd: '\u22B4',
    trianglerighteq: '\u22B5',
    unrhd: '\u22B5',
    vDash: ['\u22A8', { variantForm: true }],
    Vdash: '\u22A9',
    Vvdash: '\u22AA',
    smallsmile: ['\u2323', { variantForm: true }],
    shortmid: ['\u2223', { variantForm: true }],
    smallfrown: ['\u2322', { variantForm: true }],
    shortparallel: ['\u2225', { variantForm: true }],
    bumpeq: '\u224F',
    between: '\u226C',
    Bumpeq: '\u224E',
    pitchfork: '\u22D4',
    varpropto: ['\u221D', { variantForm: true }],
    backepsilon: '\u220D',
    blacktriangleleft: '\u25C2',
    blacktriangleright: '\u25B8',
    therefore: '\u2234',
    because: '\u2235',
    eqsim: '\u2242',
    vartriangle: ['\u25B3', { variantForm: true }],
    Join: '\u22C8',
    nless: '\u226E',
    ngtr: '\u226F',
    nleq: '\u2270',
    ngeq: '\u2271',
    nleqslant: ['\u2A87', { variantForm: true }],
    ngeqslant: ['\u2A88', { variantForm: true }],
    nleqq: ['\u2270', { variantForm: true }],
    ngeqq: ['\u2271', { variantForm: true }],
    lneq: '\u2A87',
    gneq: '\u2A88',
    lneqq: '\u2268',
    gneqq: '\u2269',
    lvertneqq: ['\u2268', { variantForm: true }],
    gvertneqq: ['\u2269', { variantForm: true }],
    lnsim: '\u22E6',
    gnsim: '\u22E7',
    lnapprox: '\u2A89',
    gnapprox: '\u2A8A',
    nprec: '\u2280',
    nsucc: '\u2281',
    npreceq: ['\u22E0', { variantForm: true }],
    nsucceq: ['\u22E1', { variantForm: true }],
    precneqq: '\u2AB5',
    succneqq: '\u2AB6',
    precnsim: '\u22E8',
    succnsim: '\u22E9',
    precnapprox: '\u2AB9',
    succnapprox: '\u2ABA',
    nsim: '\u2241',
    ncong: '\u2247',
    nshortmid: ['\u2224', { variantForm: true }],
    nshortparallel: ['\u2226', { variantForm: true }],
    nmid: '\u2224',
    nparallel: '\u2226',
    nvdash: '\u22AC',
    nvDash: '\u22AD',
    nVdash: '\u22AE',
    nVDash: '\u22AF',
    ntriangleleft: '\u22EA',
    ntriangleright: '\u22EB',
    ntrianglelefteq: '\u22EC',
    ntrianglerighteq: '\u22ED',
    nsubseteq: '\u2288',
    nsupseteq: '\u2289',
    nsubseteqq: ['\u2288', { variantForm: true }],
    nsupseteqq: ['\u2289', { variantForm: true }],
    subsetneq: '\u228A',
    supsetneq: '\u228B',
    varsubsetneq: ['\u228A', { variantForm: true }],
    varsupsetneq: ['\u228B', { variantForm: true }],
    subsetneqq: '\u2ACB',
    supsetneqq: '\u2ACC',
    varsubsetneqq: ['\u2ACB', { variantForm: true }],
    varsupsetneqq: ['\u2ACC', { variantForm: true }],
    leftleftarrows: '\u21C7',
    rightrightarrows: '\u21C9',
    leftrightarrows: '\u21C6',
    rightleftarrows: '\u21C4',
    Lleftarrow: '\u21DA',
    Rrightarrow: '\u21DB',
    twoheadleftarrow: '\u219E',
    twoheadrightarrow: '\u21A0',
    leftarrowtail: '\u21A2',
    rightarrowtail: '\u21A3',
    looparrowleft: '\u21AB',
    looparrowright: '\u21AC',
    leftrightharpoons: '\u21CB',
    rightleftharpoons: ['\u21CC', { variantForm: true }],
    curvearrowleft: '\u21B6',
    curvearrowright: '\u21B7',
    circlearrowleft: '\u21BA',
    circlearrowright: '\u21BB',
    Lsh: '\u21B0',
    Rsh: '\u21B1',
    upuparrows: '\u21C8',
    downdownarrows: '\u21CA',
    upharpoonleft: '\u21BF',
    upharpoonright: '\u21BE',
    downharpoonleft: '\u21C3',
    restriction: '\u21BE',
    multimap: '\u22B8',
    downharpoonright: '\u21C2',
    leftrightsquigarrow: '\u21AD',
    rightsquigarrow: '\u21DD',
    leadsto: '\u21DD',
    dashrightarrow: '\u21E2',
    dashleftarrow: '\u21E0',
    nleftarrow: '\u219A',
    nrightarrow: '\u219B',
    nLeftarrow: '\u21CD',
    nRightarrow: '\u21CF',
    nleftrightarrow: '\u21AE',
    nLeftrightarrow: '\u21CE'
});
new sm.DelimiterMap('AMSsymbols-delimiter', ParseMethods_js_1.default.delimiter, {
    '\\ulcorner': '\u231C',
    '\\urcorner': '\u231D',
    '\\llcorner': '\u231E',
    '\\lrcorner': '\u231F'
});
new sm.CommandMap('AMSsymbols-macros', {
    implies: ['Macro', '\\;\\Longrightarrow\\;'],
    impliedby: ['Macro', '\\;\\Longleftarrow\\;']
}, AmsMethods_js_1.AmsMethods);
//# sourceMappingURL=AmsMappings.js.map

/***/ }),

/***/ 42828:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NEW_OPS = exports.AmsMethods = void 0;
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var ParseMethods_js_1 = __importDefault(__webpack_require__(96004));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var TexConstants_js_1 = __webpack_require__(48948);
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var Symbol_js_1 = __webpack_require__(56941);
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
var MmlNode_js_1 = __webpack_require__(18426);
exports.AmsMethods = {};
exports.AmsMethods.AmsEqnArray = function (parser, begin, numbered, taggable, align, spacing, style) {
    var args = parser.GetBrackets('\\begin{' + begin.getName() + '}');
    var array = BaseMethods_js_1.default.EqnArray(parser, begin, numbered, taggable, align, spacing, style);
    return ParseUtil_js_1.default.setArrayAlign(array, args);
};
exports.AmsMethods.AlignAt = function (parser, begin, numbered, taggable) {
    var name = begin.getName();
    var n, valign, align = '', spacing = [];
    if (!taggable) {
        valign = parser.GetBrackets('\\begin{' + name + '}');
    }
    n = parser.GetArgument('\\begin{' + name + '}');
    if (n.match(/[^0-9]/)) {
        throw new TexError_js_1.default('PositiveIntegerArg', 'Argument to %1 must me a positive integer', '\\begin{' + name + '}');
    }
    var count = parseInt(n, 10);
    while (count > 0) {
        align += 'rl';
        spacing.push('0em 0em');
        count--;
    }
    var spaceStr = spacing.join(' ');
    if (taggable) {
        return exports.AmsMethods.EqnArray(parser, begin, numbered, taggable, align, spaceStr);
    }
    var array = exports.AmsMethods.EqnArray(parser, begin, numbered, taggable, align, spaceStr);
    return ParseUtil_js_1.default.setArrayAlign(array, valign);
};
exports.AmsMethods.Multline = function (parser, begin, numbered) {
    parser.Push(begin);
    ParseUtil_js_1.default.checkEqnEnv(parser);
    var item = parser.itemFactory.create('multline', numbered, parser.stack);
    item.arraydef = {
        displaystyle: true,
        rowspacing: '.5em',
        columnspacing: '100%',
        width: parser.options.ams['multlineWidth'],
        side: parser.options['tagSide'],
        minlabelspacing: parser.options['tagIndent'],
        framespacing: parser.options.ams['multlineIndent'] + ' 0',
        frame: '',
        'data-width-includes-label': true
    };
    return item;
};
exports.AmsMethods.XalignAt = function (parser, begin, numbered, padded) {
    var n = parser.GetArgument('\\begin{' + begin.getName() + '}');
    if (n.match(/[^0-9]/)) {
        throw new TexError_js_1.default('PositiveIntegerArg', 'Argument to %1 must me a positive integer', '\\begin{' + begin.getName() + '}');
    }
    var align = (padded ? 'crl' : 'rlc');
    var width = (padded ? 'fit auto auto' : 'auto auto fit');
    var item = exports.AmsMethods.FlalignArray(parser, begin, numbered, padded, false, align, width, true);
    item.setProperty('xalignat', 2 * parseInt(n));
    return item;
};
exports.AmsMethods.FlalignArray = function (parser, begin, numbered, padded, center, align, width, zeroWidthLabel) {
    if (zeroWidthLabel === void 0) { zeroWidthLabel = false; }
    parser.Push(begin);
    ParseUtil_js_1.default.checkEqnEnv(parser);
    align = align
        .split('')
        .join(' ')
        .replace(/r/g, 'right')
        .replace(/l/g, 'left')
        .replace(/c/g, 'center');
    var item = parser.itemFactory.create('flalign', begin.getName(), numbered, padded, center, parser.stack);
    item.arraydef = {
        width: '100%',
        displaystyle: true,
        columnalign: align,
        columnspacing: '0em',
        columnwidth: width,
        rowspacing: '3pt',
        side: parser.options['tagSide'],
        minlabelspacing: (zeroWidthLabel ? '0' : parser.options['tagIndent']),
        'data-width-includes-label': true,
    };
    item.setProperty('zeroWidthLabel', zeroWidthLabel);
    return item;
};
exports.NEW_OPS = 'ams-declare-ops';
exports.AmsMethods.HandleDeclareOp = function (parser, name) {
    var star = (parser.GetStar() ? '*' : '');
    var cs = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(name));
    if (cs.charAt(0) === '\\') {
        cs = cs.substr(1);
    }
    var op = parser.GetArgument(name);
    parser.configuration.handlers.retrieve(exports.NEW_OPS).
        add(cs, new Symbol_js_1.Macro(cs, exports.AmsMethods.Macro, ["\\operatorname".concat(star, "{").concat(op, "}")]));
};
exports.AmsMethods.HandleOperatorName = function (parser, name) {
    var star = parser.GetStar();
    var op = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(name));
    var mml = new TexParser_js_1.default(op, __assign(__assign({}, parser.stack.env), { font: TexConstants_js_1.TexConstant.Variant.NORMAL, multiLetterIdentifiers: /^[-*a-z]+/i, operatorLetters: true }), parser.configuration).mml();
    if (!mml.isKind('mi')) {
        mml = parser.create('node', 'TeXAtom', [mml]);
    }
    NodeUtil_js_1.default.setProperties(mml, { movesupsub: star, movablelimits: true, texClass: MmlNode_js_1.TEXCLASS.OP });
    if (!star) {
        var c = parser.GetNext(), i = parser.i;
        if (c === '\\' && ++parser.i && parser.GetCS() !== 'limits') {
            parser.i = i;
        }
    }
    parser.Push(mml);
};
exports.AmsMethods.SideSet = function (parser, name) {
    var _a = __read(splitSideSet(parser.ParseArg(name)), 2), preScripts = _a[0], preRest = _a[1];
    var _b = __read(splitSideSet(parser.ParseArg(name)), 2), postScripts = _b[0], postRest = _b[1];
    var base = parser.ParseArg(name);
    var mml = base;
    if (preScripts) {
        if (preRest) {
            preScripts.replaceChild(parser.create('node', 'mphantom', [
                parser.create('node', 'mpadded', [ParseUtil_js_1.default.copyNode(base, parser)], { width: 0 })
            ]), NodeUtil_js_1.default.getChildAt(preScripts, 0));
        }
        else {
            mml = parser.create('node', 'mmultiscripts', [base]);
            if (postScripts) {
                NodeUtil_js_1.default.appendChildren(mml, [
                    NodeUtil_js_1.default.getChildAt(postScripts, 1) || parser.create('node', 'none'),
                    NodeUtil_js_1.default.getChildAt(postScripts, 2) || parser.create('node', 'none')
                ]);
            }
            NodeUtil_js_1.default.setProperty(mml, 'scriptalign', 'left');
            NodeUtil_js_1.default.appendChildren(mml, [
                parser.create('node', 'mprescripts'),
                NodeUtil_js_1.default.getChildAt(preScripts, 1) || parser.create('node', 'none'),
                NodeUtil_js_1.default.getChildAt(preScripts, 2) || parser.create('node', 'none')
            ]);
        }
    }
    if (postScripts && mml === base) {
        postScripts.replaceChild(base, NodeUtil_js_1.default.getChildAt(postScripts, 0));
        mml = postScripts;
    }
    var mrow = parser.create('node', 'TeXAtom', [], { texClass: MmlNode_js_1.TEXCLASS.OP, movesupsub: true, movablelimits: true });
    if (preRest) {
        preScripts && mrow.appendChild(preScripts);
        mrow.appendChild(preRest);
    }
    mrow.appendChild(mml);
    postRest && mrow.appendChild(postRest);
    parser.Push(mrow);
};
function splitSideSet(mml) {
    if (!mml || (mml.isInferred && mml.childNodes.length === 0))
        return [null, null];
    if (mml.isKind('msubsup') && checkSideSetBase(mml))
        return [mml, null];
    var child = NodeUtil_js_1.default.getChildAt(mml, 0);
    if (!(mml.isInferred && child && checkSideSetBase(child)))
        return [null, mml];
    mml.childNodes.splice(0, 1);
    return [child, mml];
}
function checkSideSetBase(mml) {
    var base = mml.childNodes[0];
    return base && base.isKind('mi') && base.getText() === '';
}
exports.AmsMethods.operatorLetter = function (parser, c) {
    return parser.stack.env.operatorLetters ? ParseMethods_js_1.default.variable(parser, c) : false;
};
exports.AmsMethods.MultiIntegral = function (parser, name, integral) {
    var next = parser.GetNext();
    if (next === '\\') {
        var i = parser.i;
        next = parser.GetArgument(name);
        parser.i = i;
        if (next === '\\limits') {
            if (name === '\\idotsint') {
                integral = '\\!\\!\\mathop{\\,\\,' + integral + '}';
            }
            else {
                integral = '\\!\\!\\!\\mathop{\\,\\,\\,' + integral + '}';
            }
        }
    }
    parser.string = integral + ' ' + parser.string.slice(parser.i);
    parser.i = 0;
};
exports.AmsMethods.xArrow = function (parser, name, chr, l, r) {
    var def = { width: '+' + ParseUtil_js_1.default.Em((l + r) / 18), lspace: ParseUtil_js_1.default.Em(l / 18) };
    var bot = parser.GetBrackets(name);
    var first = parser.ParseArg(name);
    var dstrut = parser.create('node', 'mspace', [], { depth: '.25em' });
    var arrow = parser.create('token', 'mo', { stretchy: true, texClass: MmlNode_js_1.TEXCLASS.REL }, String.fromCodePoint(chr));
    arrow = parser.create('node', 'mstyle', [arrow], { scriptlevel: 0 });
    var mml = parser.create('node', 'munderover', [arrow]);
    var mpadded = parser.create('node', 'mpadded', [first, dstrut], def);
    NodeUtil_js_1.default.setAttribute(mpadded, 'voffset', '-.2em');
    NodeUtil_js_1.default.setAttribute(mpadded, 'height', '-.2em');
    NodeUtil_js_1.default.setChild(mml, mml.over, mpadded);
    if (bot) {
        var bottom = new TexParser_js_1.default(bot, parser.stack.env, parser.configuration).mml();
        var bstrut = parser.create('node', 'mspace', [], { height: '.75em' });
        mpadded = parser.create('node', 'mpadded', [bottom, bstrut], def);
        NodeUtil_js_1.default.setAttribute(mpadded, 'voffset', '.15em');
        NodeUtil_js_1.default.setAttribute(mpadded, 'depth', '-.15em');
        NodeUtil_js_1.default.setChild(mml, mml.under, mpadded);
    }
    NodeUtil_js_1.default.setProperty(mml, 'subsupOK', true);
    parser.Push(mml);
};
exports.AmsMethods.HandleShove = function (parser, _name, shove) {
    var top = parser.stack.Top();
    if (top.kind !== 'multline') {
        throw new TexError_js_1.default('CommandOnlyAllowedInEnv', '%1 only allowed in %2 environment', parser.currentCS, 'multline');
    }
    if (top.Size()) {
        throw new TexError_js_1.default('CommandAtTheBeginingOfLine', '%1 must come at the beginning of the line', parser.currentCS);
    }
    top.setProperty('shove', shove);
};
exports.AmsMethods.CFrac = function (parser, name) {
    var lr = ParseUtil_js_1.default.trimSpaces(parser.GetBrackets(name, ''));
    var num = parser.GetArgument(name);
    var den = parser.GetArgument(name);
    var lrMap = {
        l: TexConstants_js_1.TexConstant.Align.LEFT, r: TexConstants_js_1.TexConstant.Align.RIGHT, '': ''
    };
    var numNode = new TexParser_js_1.default('\\strut\\textstyle{' + num + '}', parser.stack.env, parser.configuration).mml();
    var denNode = new TexParser_js_1.default('\\strut\\textstyle{' + den + '}', parser.stack.env, parser.configuration).mml();
    var frac = parser.create('node', 'mfrac', [numNode, denNode]);
    lr = lrMap[lr];
    if (lr == null) {
        throw new TexError_js_1.default('IllegalAlign', 'Illegal alignment specified in %1', parser.currentCS);
    }
    if (lr) {
        NodeUtil_js_1.default.setProperties(frac, { numalign: lr, denomalign: lr });
    }
    parser.Push(frac);
};
exports.AmsMethods.Genfrac = function (parser, name, left, right, thick, style) {
    if (left == null) {
        left = parser.GetDelimiterArg(name);
    }
    if (right == null) {
        right = parser.GetDelimiterArg(name);
    }
    if (thick == null) {
        thick = parser.GetArgument(name);
    }
    if (style == null) {
        style = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(name));
    }
    var num = parser.ParseArg(name);
    var den = parser.ParseArg(name);
    var frac = parser.create('node', 'mfrac', [num, den]);
    if (thick !== '') {
        NodeUtil_js_1.default.setAttribute(frac, 'linethickness', thick);
    }
    if (left || right) {
        NodeUtil_js_1.default.setProperty(frac, 'withDelims', true);
        frac = ParseUtil_js_1.default.fixedFence(parser.configuration, left, frac, right);
    }
    if (style !== '') {
        var styleDigit = parseInt(style, 10);
        var styleAlpha = ['D', 'T', 'S', 'SS'][styleDigit];
        if (styleAlpha == null) {
            throw new TexError_js_1.default('BadMathStyleFor', 'Bad math style for %1', parser.currentCS);
        }
        frac = parser.create('node', 'mstyle', [frac]);
        if (styleAlpha === 'D') {
            NodeUtil_js_1.default.setProperties(frac, { displaystyle: true, scriptlevel: 0 });
        }
        else {
            NodeUtil_js_1.default.setProperties(frac, { displaystyle: false,
                scriptlevel: styleDigit - 1 });
        }
    }
    parser.Push(frac);
};
exports.AmsMethods.HandleTag = function (parser, name) {
    if (!parser.tags.currentTag.taggable && parser.tags.env) {
        throw new TexError_js_1.default('CommandNotAllowedInEnv', '%1 not allowed in %2 environment', parser.currentCS, parser.tags.env);
    }
    if (parser.tags.currentTag.tag) {
        throw new TexError_js_1.default('MultipleCommand', 'Multiple %1', parser.currentCS);
    }
    var star = parser.GetStar();
    var tagId = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(name));
    parser.tags.tag(tagId, star);
};
exports.AmsMethods.HandleNoTag = BaseMethods_js_1.default.HandleNoTag;
exports.AmsMethods.HandleRef = BaseMethods_js_1.default.HandleRef;
exports.AmsMethods.Macro = BaseMethods_js_1.default.Macro;
exports.AmsMethods.Accent = BaseMethods_js_1.default.Accent;
exports.AmsMethods.Tilde = BaseMethods_js_1.default.Tilde;
exports.AmsMethods.Array = BaseMethods_js_1.default.Array;
exports.AmsMethods.Spacer = BaseMethods_js_1.default.Spacer;
exports.AmsMethods.NamedOp = BaseMethods_js_1.default.NamedOp;
exports.AmsMethods.EqnArray = BaseMethods_js_1.default.EqnArray;
exports.AmsMethods.Equation = BaseMethods_js_1.default.Equation;
//# sourceMappingURL=AmsMethods.js.map

/***/ }),

/***/ 49799:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AmsCdConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
__webpack_require__(1158);
exports.AmsCdConfiguration = Configuration_js_1.Configuration.create('amscd', {
    handler: {
        character: ['amscd_special'],
        macro: ['amscd_macros'],
        environment: ['amscd_environment']
    },
    options: {
        amscd: {
            colspace: '5pt',
            rowspace: '5pt',
            harrowsize: '2.75em',
            varrowsize: '1.75em',
            hideHorizontalLabels: false
        }
    }
});
//# sourceMappingURL=AmsCdConfiguration.js.map

/***/ }),

/***/ 1158:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var sm = __importStar(__webpack_require__(92715));
var ParseMethods_js_1 = __importDefault(__webpack_require__(96004));
var AmsCdMethods_js_1 = __importDefault(__webpack_require__(33755));
new sm.EnvironmentMap('amscd_environment', ParseMethods_js_1.default.environment, { CD: 'CD' }, AmsCdMethods_js_1.default);
new sm.CommandMap('amscd_macros', {
    minCDarrowwidth: 'minCDarrowwidth',
    minCDarrowheight: 'minCDarrowheight',
}, AmsCdMethods_js_1.default);
new sm.MacroMap('amscd_special', { '@': 'arrow' }, AmsCdMethods_js_1.default);
//# sourceMappingURL=AmsCdMappings.js.map

/***/ }),

/***/ 33755:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var BaseConfiguration_js_1 = __webpack_require__(19890);
var MmlNode_js_1 = __webpack_require__(18426);
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var AmsCdMethods = {};
AmsCdMethods.CD = function (parser, begin) {
    parser.Push(begin);
    var item = parser.itemFactory.create('array');
    var options = parser.configuration.options.amscd;
    item.setProperties({
        minw: parser.stack.env.CD_minw || options.harrowsize,
        minh: parser.stack.env.CD_minh || options.varrowsize
    });
    item.arraydef = {
        columnalign: 'center',
        columnspacing: options.colspace,
        rowspacing: options.rowspace,
        displaystyle: true
    };
    return item;
};
AmsCdMethods.arrow = function (parser, name) {
    var c = parser.string.charAt(parser.i);
    if (!c.match(/[><VA.|=]/)) {
        return (0, BaseConfiguration_js_1.Other)(parser, name);
    }
    else {
        parser.i++;
    }
    var first = parser.stack.Top();
    if (!first.isKind('array') || first.Size()) {
        AmsCdMethods.cell(parser, name);
        first = parser.stack.Top();
    }
    var top = first;
    var arrowRow = ((top.table.length % 2) === 1);
    var n = (top.row.length + (arrowRow ? 0 : 1)) % 2;
    while (n) {
        AmsCdMethods.cell(parser, name);
        n--;
    }
    var mml;
    var hdef = { minsize: top.getProperty('minw'), stretchy: true }, vdef = { minsize: top.getProperty('minh'),
        stretchy: true, symmetric: true, lspace: 0, rspace: 0 };
    if (c === '.') {
    }
    else if (c === '|') {
        mml = parser.create('token', 'mo', vdef, '\u2225');
    }
    else if (c === '=') {
        mml = parser.create('token', 'mo', hdef, '=');
    }
    else {
        var arrow = {
            '>': '\u2192', '<': '\u2190', 'V': '\u2193', 'A': '\u2191'
        }[c];
        var a = parser.GetUpTo(name + c, c);
        var b = parser.GetUpTo(name + c, c);
        if (c === '>' || c === '<') {
            mml = parser.create('token', 'mo', hdef, arrow);
            if (!a) {
                a = '\\kern ' + top.getProperty('minw');
            }
            if (a || b) {
                var pad = { width: '+.67em', lspace: '.33em' };
                mml = parser.create('node', 'munderover', [mml]);
                if (a) {
                    var nodeA = new TexParser_js_1.default(a, parser.stack.env, parser.configuration).mml();
                    var mpadded = parser.create('node', 'mpadded', [nodeA], pad);
                    NodeUtil_js_1.default.setAttribute(mpadded, 'voffset', '.1em');
                    NodeUtil_js_1.default.setChild(mml, mml.over, mpadded);
                }
                if (b) {
                    var nodeB = new TexParser_js_1.default(b, parser.stack.env, parser.configuration).mml();
                    NodeUtil_js_1.default.setChild(mml, mml.under, parser.create('node', 'mpadded', [nodeB], pad));
                }
                if (parser.configuration.options.amscd.hideHorizontalLabels) {
                    mml = parser.create('node', 'mpadded', mml, { depth: 0, height: '.67em' });
                }
            }
        }
        else {
            var arrowNode = parser.create('token', 'mo', vdef, arrow);
            mml = arrowNode;
            if (a || b) {
                mml = parser.create('node', 'mrow');
                if (a) {
                    NodeUtil_js_1.default.appendChildren(mml, [new TexParser_js_1.default('\\scriptstyle\\llap{' + a + '}', parser.stack.env, parser.configuration).mml()]);
                }
                arrowNode.texClass = MmlNode_js_1.TEXCLASS.ORD;
                NodeUtil_js_1.default.appendChildren(mml, [arrowNode]);
                if (b) {
                    NodeUtil_js_1.default.appendChildren(mml, [new TexParser_js_1.default('\\scriptstyle\\rlap{' + b + '}', parser.stack.env, parser.configuration).mml()]);
                }
            }
        }
    }
    if (mml) {
        parser.Push(mml);
    }
    AmsCdMethods.cell(parser, name);
};
AmsCdMethods.cell = function (parser, name) {
    var top = parser.stack.Top();
    if ((top.table || []).length % 2 === 0 && (top.row || []).length === 0) {
        parser.Push(parser.create('node', 'mpadded', [], { height: '8.5pt', depth: '2pt' }));
    }
    parser.Push(parser.itemFactory.create('cell').setProperties({ isEntry: true, name: name }));
};
AmsCdMethods.minCDarrowwidth = function (parser, name) {
    parser.stack.env.CD_minw = parser.GetDimen(name);
};
AmsCdMethods.minCDarrowheight = function (parser, name) {
    parser.stack.env.CD_minh = parser.GetDimen(name);
};
exports["default"] = AmsCdMethods;
//# sourceMappingURL=AmsCdMethods.js.map

/***/ }),

/***/ 19890:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseConfiguration = exports.BaseTags = exports.Other = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var MapHandler_js_1 = __webpack_require__(84858);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var SymbolMap_js_1 = __webpack_require__(92715);
var bitem = __importStar(__webpack_require__(5065));
var Tags_js_1 = __webpack_require__(56711);
__webpack_require__(83031);
var OperatorDictionary_js_1 = __webpack_require__(64432);
new SymbolMap_js_1.CharacterMap('remap', null, {
    '-': '\u2212',
    '*': '\u2217',
    '`': '\u2018'
});
function Other(parser, char) {
    var font = parser.stack.env['font'];
    var def = font ?
        { mathvariant: parser.stack.env['font'] } : {};
    var remap = MapHandler_js_1.MapHandler.getMap('remap').lookup(char);
    var range = (0, OperatorDictionary_js_1.getRange)(char);
    var type = (range ? range[3] : 'mo');
    var mo = parser.create('token', type, def, (remap ? remap.char : char));
    range[4] && mo.attributes.set('mathvariant', range[4]);
    if (type === 'mo') {
        NodeUtil_js_1.default.setProperty(mo, 'fixStretchy', true);
        parser.configuration.addNode('fixStretchy', mo);
    }
    parser.Push(mo);
}
exports.Other = Other;
function csUndefined(_parser, name) {
    throw new TexError_js_1.default('UndefinedControlSequence', 'Undefined control sequence %1', '\\' + name);
}
function envUndefined(_parser, env) {
    throw new TexError_js_1.default('UnknownEnv', 'Unknown environment \'%1\'', env);
}
function filterNonscript(_a) {
    var e_1, _b;
    var data = _a.data;
    try {
        for (var _c = __values(data.getList('nonscript')), _d = _c.next(); !_d.done; _d = _c.next()) {
            var mml = _d.value;
            if (mml.attributes.get('scriptlevel') > 0) {
                var parent_1 = mml.parent;
                parent_1.childNodes.splice(parent_1.childIndex(mml), 1);
                data.removeFromList(mml.kind, [mml]);
                if (mml.isKind('mrow')) {
                    var mstyle = mml.childNodes[0];
                    data.removeFromList('mstyle', [mstyle]);
                    data.removeFromList('mspace', mstyle.childNodes[0].childNodes);
                }
            }
            else if (mml.isKind('mrow')) {
                mml.parent.replaceChild(mml.childNodes[0], mml);
                data.removeFromList('mrow', [mml]);
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
}
var BaseTags = (function (_super) {
    __extends(BaseTags, _super);
    function BaseTags() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseTags;
}(Tags_js_1.AbstractTags));
exports.BaseTags = BaseTags;
exports.BaseConfiguration = Configuration_js_1.Configuration.create('base', {
    handler: {
        character: ['command', 'special', 'letter', 'digit'],
        delimiter: ['delimiter'],
        macro: ['delimiter', 'macros', 'mathchar0mi', 'mathchar0mo', 'mathchar7'],
        environment: ['environment']
    },
    fallback: {
        character: Other,
        macro: csUndefined,
        environment: envUndefined
    },
    items: (_a = {},
        _a[bitem.StartItem.prototype.kind] = bitem.StartItem,
        _a[bitem.StopItem.prototype.kind] = bitem.StopItem,
        _a[bitem.OpenItem.prototype.kind] = bitem.OpenItem,
        _a[bitem.CloseItem.prototype.kind] = bitem.CloseItem,
        _a[bitem.PrimeItem.prototype.kind] = bitem.PrimeItem,
        _a[bitem.SubsupItem.prototype.kind] = bitem.SubsupItem,
        _a[bitem.OverItem.prototype.kind] = bitem.OverItem,
        _a[bitem.LeftItem.prototype.kind] = bitem.LeftItem,
        _a[bitem.Middle.prototype.kind] = bitem.Middle,
        _a[bitem.RightItem.prototype.kind] = bitem.RightItem,
        _a[bitem.BeginItem.prototype.kind] = bitem.BeginItem,
        _a[bitem.EndItem.prototype.kind] = bitem.EndItem,
        _a[bitem.StyleItem.prototype.kind] = bitem.StyleItem,
        _a[bitem.PositionItem.prototype.kind] = bitem.PositionItem,
        _a[bitem.CellItem.prototype.kind] = bitem.CellItem,
        _a[bitem.MmlItem.prototype.kind] = bitem.MmlItem,
        _a[bitem.FnItem.prototype.kind] = bitem.FnItem,
        _a[bitem.NotItem.prototype.kind] = bitem.NotItem,
        _a[bitem.NonscriptItem.prototype.kind] = bitem.NonscriptItem,
        _a[bitem.DotsItem.prototype.kind] = bitem.DotsItem,
        _a[bitem.ArrayItem.prototype.kind] = bitem.ArrayItem,
        _a[bitem.EqnArrayItem.prototype.kind] = bitem.EqnArrayItem,
        _a[bitem.EquationItem.prototype.kind] = bitem.EquationItem,
        _a),
    options: {
        maxMacros: 1000,
        baseURL: (typeof (document) === 'undefined' ||
            document.getElementsByTagName('base').length === 0) ?
            '' : String(document.location).replace(/#.*$/, '')
    },
    tags: {
        base: BaseTags
    },
    postprocessors: [[filterNonscript, -4]]
});
//# sourceMappingURL=BaseConfiguration.js.map

/***/ }),

/***/ 5065:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EquationItem = exports.EqnArrayItem = exports.ArrayItem = exports.DotsItem = exports.NonscriptItem = exports.NotItem = exports.FnItem = exports.MmlItem = exports.CellItem = exports.PositionItem = exports.StyleItem = exports.EndItem = exports.BeginItem = exports.RightItem = exports.Middle = exports.LeftItem = exports.OverItem = exports.SubsupItem = exports.PrimeItem = exports.CloseItem = exports.OpenItem = exports.StopItem = exports.StartItem = void 0;
var MapHandler_js_1 = __webpack_require__(84858);
var Entities_js_1 = __webpack_require__(63411);
var MmlNode_js_1 = __webpack_require__(18426);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var StackItem_js_1 = __webpack_require__(34726);
var StartItem = (function (_super) {
    __extends(StartItem, _super);
    function StartItem(factory, global) {
        var _this = _super.call(this, factory) || this;
        _this.global = global;
        return _this;
    }
    Object.defineProperty(StartItem.prototype, "kind", {
        get: function () {
            return 'start';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StartItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    StartItem.prototype.checkItem = function (item) {
        if (item.isKind('stop')) {
            var node = this.toMml();
            if (!this.global.isInner) {
                node = this.factory.configuration.tags.finalize(node, this.env);
            }
            return [[this.factory.create('mml', node)], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return StartItem;
}(StackItem_js_1.BaseItem));
exports.StartItem = StartItem;
var StopItem = (function (_super) {
    __extends(StopItem, _super);
    function StopItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StopItem.prototype, "kind", {
        get: function () {
            return 'stop';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StopItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return StopItem;
}(StackItem_js_1.BaseItem));
exports.StopItem = StopItem;
var OpenItem = (function (_super) {
    __extends(OpenItem, _super);
    function OpenItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(OpenItem.prototype, "kind", {
        get: function () {
            return 'open';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OpenItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    OpenItem.prototype.checkItem = function (item) {
        if (item.isKind('close')) {
            var mml = this.toMml();
            var node = this.create('node', 'TeXAtom', [mml]);
            return [[this.factory.create('mml', node)], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    OpenItem.errors = Object.assign(Object.create(StackItem_js_1.BaseItem.errors), {
        'stop': ['ExtraOpenMissingClose',
            'Extra open brace or missing close brace']
    });
    return OpenItem;
}(StackItem_js_1.BaseItem));
exports.OpenItem = OpenItem;
var CloseItem = (function (_super) {
    __extends(CloseItem, _super);
    function CloseItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CloseItem.prototype, "kind", {
        get: function () {
            return 'close';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloseItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return CloseItem;
}(StackItem_js_1.BaseItem));
exports.CloseItem = CloseItem;
var PrimeItem = (function (_super) {
    __extends(PrimeItem, _super);
    function PrimeItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PrimeItem.prototype, "kind", {
        get: function () {
            return 'prime';
        },
        enumerable: false,
        configurable: true
    });
    PrimeItem.prototype.checkItem = function (item) {
        var _a = __read(this.Peek(2), 2), top0 = _a[0], top1 = _a[1];
        if (!NodeUtil_js_1.default.isType(top0, 'msubsup') || NodeUtil_js_1.default.isType(top0, 'msup')) {
            var node = this.create('node', 'msup', [top0, top1]);
            return [[node, item], true];
        }
        NodeUtil_js_1.default.setChild(top0, top0.sup, top1);
        return [[top0, item], true];
    };
    return PrimeItem;
}(StackItem_js_1.BaseItem));
exports.PrimeItem = PrimeItem;
var SubsupItem = (function (_super) {
    __extends(SubsupItem, _super);
    function SubsupItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubsupItem.prototype, "kind", {
        get: function () {
            return 'subsup';
        },
        enumerable: false,
        configurable: true
    });
    SubsupItem.prototype.checkItem = function (item) {
        if (item.isKind('open') || item.isKind('left')) {
            return StackItem_js_1.BaseItem.success;
        }
        var top = this.First;
        var position = this.getProperty('position');
        if (item.isKind('mml')) {
            if (this.getProperty('primes')) {
                if (position !== 2) {
                    NodeUtil_js_1.default.setChild(top, 2, this.getProperty('primes'));
                }
                else {
                    NodeUtil_js_1.default.setProperty(this.getProperty('primes'), 'variantForm', true);
                    var node = this.create('node', 'mrow', [this.getProperty('primes'), item.First]);
                    item.First = node;
                }
            }
            NodeUtil_js_1.default.setChild(top, position, item.First);
            if (this.getProperty('movesupsub') != null) {
                NodeUtil_js_1.default.setProperty(top, 'movesupsub', this.getProperty('movesupsub'));
            }
            var result = this.factory.create('mml', top);
            return [[result], true];
        }
        if (_super.prototype.checkItem.call(this, item)[1]) {
            var error = this.getErrors(['', 'sub', 'sup'][position]);
            throw new (TexError_js_1.default.bind.apply(TexError_js_1.default, __spreadArray([void 0, error[0], error[1]], __read(error.splice(2)), false)))();
        }
        return null;
    };
    SubsupItem.errors = Object.assign(Object.create(StackItem_js_1.BaseItem.errors), {
        'stop': ['MissingScript',
            'Missing superscript or subscript argument'],
        'sup': ['MissingOpenForSup',
            'Missing open brace for superscript'],
        'sub': ['MissingOpenForSub',
            'Missing open brace for subscript']
    });
    return SubsupItem;
}(StackItem_js_1.BaseItem));
exports.SubsupItem = SubsupItem;
var OverItem = (function (_super) {
    __extends(OverItem, _super);
    function OverItem(factory) {
        var _this = _super.call(this, factory) || this;
        _this.setProperty('name', '\\over');
        return _this;
    }
    Object.defineProperty(OverItem.prototype, "kind", {
        get: function () {
            return 'over';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    OverItem.prototype.checkItem = function (item) {
        if (item.isKind('over')) {
            throw new TexError_js_1.default('AmbiguousUseOf', 'Ambiguous use of %1', item.getName());
        }
        if (item.isClose) {
            var mml = this.create('node', 'mfrac', [this.getProperty('num'), this.toMml(false)]);
            if (this.getProperty('thickness') != null) {
                NodeUtil_js_1.default.setAttribute(mml, 'linethickness', this.getProperty('thickness'));
            }
            if (this.getProperty('open') || this.getProperty('close')) {
                NodeUtil_js_1.default.setProperty(mml, 'withDelims', true);
                mml = ParseUtil_js_1.default.fixedFence(this.factory.configuration, this.getProperty('open'), mml, this.getProperty('close'));
            }
            return [[this.factory.create('mml', mml), item], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    OverItem.prototype.toString = function () {
        return 'over[' + this.getProperty('num') +
            ' / ' + this.nodes.join('; ') + ']';
    };
    return OverItem;
}(StackItem_js_1.BaseItem));
exports.OverItem = OverItem;
var LeftItem = (function (_super) {
    __extends(LeftItem, _super);
    function LeftItem(factory, delim) {
        var _this = _super.call(this, factory) || this;
        _this.setProperty('delim', delim);
        return _this;
    }
    Object.defineProperty(LeftItem.prototype, "kind", {
        get: function () {
            return 'left';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LeftItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    LeftItem.prototype.checkItem = function (item) {
        if (item.isKind('right')) {
            return [[this.factory.create('mml', ParseUtil_js_1.default.fenced(this.factory.configuration, this.getProperty('delim'), this.toMml(), item.getProperty('delim'), '', item.getProperty('color')))], true];
        }
        if (item.isKind('middle')) {
            var def = { stretchy: true };
            if (item.getProperty('color')) {
                def.mathcolor = item.getProperty('color');
            }
            this.Push(this.create('node', 'TeXAtom', [], { texClass: MmlNode_js_1.TEXCLASS.CLOSE }), this.create('token', 'mo', def, item.getProperty('delim')), this.create('node', 'TeXAtom', [], { texClass: MmlNode_js_1.TEXCLASS.OPEN }));
            this.env = {};
            return [[this], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    LeftItem.errors = Object.assign(Object.create(StackItem_js_1.BaseItem.errors), {
        'stop': ['ExtraLeftMissingRight',
            'Extra \\left or missing \\right']
    });
    return LeftItem;
}(StackItem_js_1.BaseItem));
exports.LeftItem = LeftItem;
var Middle = (function (_super) {
    __extends(Middle, _super);
    function Middle(factory, delim, color) {
        var _this = _super.call(this, factory) || this;
        _this.setProperty('delim', delim);
        color && _this.setProperty('color', color);
        return _this;
    }
    Object.defineProperty(Middle.prototype, "kind", {
        get: function () {
            return 'middle';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Middle.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return Middle;
}(StackItem_js_1.BaseItem));
exports.Middle = Middle;
var RightItem = (function (_super) {
    __extends(RightItem, _super);
    function RightItem(factory, delim, color) {
        var _this = _super.call(this, factory) || this;
        _this.setProperty('delim', delim);
        color && _this.setProperty('color', color);
        return _this;
    }
    Object.defineProperty(RightItem.prototype, "kind", {
        get: function () {
            return 'right';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RightItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return RightItem;
}(StackItem_js_1.BaseItem));
exports.RightItem = RightItem;
var BeginItem = (function (_super) {
    __extends(BeginItem, _super);
    function BeginItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BeginItem.prototype, "kind", {
        get: function () {
            return 'begin';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BeginItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    BeginItem.prototype.checkItem = function (item) {
        if (item.isKind('end')) {
            if (item.getName() !== this.getName()) {
                throw new TexError_js_1.default('EnvBadEnd', '\\begin{%1} ended with \\end{%2}', this.getName(), item.getName());
            }
            if (!this.getProperty('end')) {
                return [[this.factory.create('mml', this.toMml())], true];
            }
            return StackItem_js_1.BaseItem.fail;
        }
        if (item.isKind('stop')) {
            throw new TexError_js_1.default('EnvMissingEnd', 'Missing \\end{%1}', this.getName());
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return BeginItem;
}(StackItem_js_1.BaseItem));
exports.BeginItem = BeginItem;
var EndItem = (function (_super) {
    __extends(EndItem, _super);
    function EndItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EndItem.prototype, "kind", {
        get: function () {
            return 'end';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EndItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return EndItem;
}(StackItem_js_1.BaseItem));
exports.EndItem = EndItem;
var StyleItem = (function (_super) {
    __extends(StyleItem, _super);
    function StyleItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StyleItem.prototype, "kind", {
        get: function () {
            return 'style';
        },
        enumerable: false,
        configurable: true
    });
    StyleItem.prototype.checkItem = function (item) {
        if (!item.isClose) {
            return _super.prototype.checkItem.call(this, item);
        }
        var mml = this.create('node', 'mstyle', this.nodes, this.getProperty('styles'));
        return [[this.factory.create('mml', mml), item], true];
    };
    return StyleItem;
}(StackItem_js_1.BaseItem));
exports.StyleItem = StyleItem;
var PositionItem = (function (_super) {
    __extends(PositionItem, _super);
    function PositionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PositionItem.prototype, "kind", {
        get: function () {
            return 'position';
        },
        enumerable: false,
        configurable: true
    });
    PositionItem.prototype.checkItem = function (item) {
        if (item.isClose) {
            throw new TexError_js_1.default('MissingBoxFor', 'Missing box for %1', this.getName());
        }
        if (item.isFinal) {
            var mml = item.toMml();
            switch (this.getProperty('move')) {
                case 'vertical':
                    mml = this.create('node', 'mpadded', [mml], { height: this.getProperty('dh'),
                        depth: this.getProperty('dd'),
                        voffset: this.getProperty('dh') });
                    return [[this.factory.create('mml', mml)], true];
                case 'horizontal':
                    return [[this.factory.create('mml', this.getProperty('left')), item,
                            this.factory.create('mml', this.getProperty('right'))], true];
            }
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return PositionItem;
}(StackItem_js_1.BaseItem));
exports.PositionItem = PositionItem;
var CellItem = (function (_super) {
    __extends(CellItem, _super);
    function CellItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CellItem.prototype, "kind", {
        get: function () {
            return 'cell';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return CellItem;
}(StackItem_js_1.BaseItem));
exports.CellItem = CellItem;
var MmlItem = (function (_super) {
    __extends(MmlItem, _super);
    function MmlItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlItem.prototype, "isFinal", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlItem.prototype, "kind", {
        get: function () {
            return 'mml';
        },
        enumerable: false,
        configurable: true
    });
    return MmlItem;
}(StackItem_js_1.BaseItem));
exports.MmlItem = MmlItem;
var FnItem = (function (_super) {
    __extends(FnItem, _super);
    function FnItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FnItem.prototype, "kind", {
        get: function () {
            return 'fn';
        },
        enumerable: false,
        configurable: true
    });
    FnItem.prototype.checkItem = function (item) {
        var top = this.First;
        if (top) {
            if (item.isOpen) {
                return StackItem_js_1.BaseItem.success;
            }
            if (!item.isKind('fn')) {
                var mml = item.First;
                if (!item.isKind('mml') || !mml) {
                    return [[top, item], true];
                }
                if ((NodeUtil_js_1.default.isType(mml, 'mstyle') && mml.childNodes.length &&
                    NodeUtil_js_1.default.isType(mml.childNodes[0].childNodes[0], 'mspace')) ||
                    NodeUtil_js_1.default.isType(mml, 'mspace')) {
                    return [[top, item], true];
                }
                if (NodeUtil_js_1.default.isEmbellished(mml)) {
                    mml = NodeUtil_js_1.default.getCoreMO(mml);
                }
                var form = NodeUtil_js_1.default.getForm(mml);
                if (form != null && [0, 0, 1, 1, 0, 1, 1, 0, 0, 0][form[2]]) {
                    return [[top, item], true];
                }
            }
            var node = this.create('token', 'mo', { texClass: MmlNode_js_1.TEXCLASS.NONE }, Entities_js_1.entities.ApplyFunction);
            return [[top, node, item], true];
        }
        return _super.prototype.checkItem.apply(this, arguments);
    };
    return FnItem;
}(StackItem_js_1.BaseItem));
exports.FnItem = FnItem;
var NotItem = (function (_super) {
    __extends(NotItem, _super);
    function NotItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remap = MapHandler_js_1.MapHandler.getMap('not_remap');
        return _this;
    }
    Object.defineProperty(NotItem.prototype, "kind", {
        get: function () {
            return 'not';
        },
        enumerable: false,
        configurable: true
    });
    NotItem.prototype.checkItem = function (item) {
        var mml;
        var c;
        var textNode;
        if (item.isKind('open') || item.isKind('left')) {
            return StackItem_js_1.BaseItem.success;
        }
        if (item.isKind('mml') &&
            (NodeUtil_js_1.default.isType(item.First, 'mo') || NodeUtil_js_1.default.isType(item.First, 'mi') ||
                NodeUtil_js_1.default.isType(item.First, 'mtext'))) {
            mml = item.First;
            c = NodeUtil_js_1.default.getText(mml);
            if (c.length === 1 && !NodeUtil_js_1.default.getProperty(mml, 'movesupsub') &&
                NodeUtil_js_1.default.getChildren(mml).length === 1) {
                if (this.remap.contains(c)) {
                    textNode = this.create('text', this.remap.lookup(c).char);
                    NodeUtil_js_1.default.setChild(mml, 0, textNode);
                }
                else {
                    textNode = this.create('text', '\u0338');
                    NodeUtil_js_1.default.appendChildren(mml, [textNode]);
                }
                return [[item], true];
            }
        }
        textNode = this.create('text', '\u29F8');
        var mtextNode = this.create('node', 'mtext', [], {}, textNode);
        var paddedNode = this.create('node', 'mpadded', [mtextNode], { width: 0 });
        mml = this.create('node', 'TeXAtom', [paddedNode], { texClass: MmlNode_js_1.TEXCLASS.REL });
        return [[mml, item], true];
    };
    return NotItem;
}(StackItem_js_1.BaseItem));
exports.NotItem = NotItem;
var NonscriptItem = (function (_super) {
    __extends(NonscriptItem, _super);
    function NonscriptItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NonscriptItem.prototype, "kind", {
        get: function () {
            return 'nonscript';
        },
        enumerable: false,
        configurable: true
    });
    NonscriptItem.prototype.checkItem = function (item) {
        if (item.isKind('mml') && item.Size() === 1) {
            var mml = item.First;
            if (mml.isKind('mstyle') && mml.notParent) {
                mml = NodeUtil_js_1.default.getChildren(NodeUtil_js_1.default.getChildren(mml)[0])[0];
            }
            if (mml.isKind('mspace')) {
                if (mml !== item.First) {
                    var mrow = this.create('node', 'mrow', [item.Pop()]);
                    item.Push(mrow);
                }
                this.factory.configuration.addNode('nonscript', item.First);
            }
        }
        return [[item], true];
    };
    return NonscriptItem;
}(StackItem_js_1.BaseItem));
exports.NonscriptItem = NonscriptItem;
var DotsItem = (function (_super) {
    __extends(DotsItem, _super);
    function DotsItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DotsItem.prototype, "kind", {
        get: function () {
            return 'dots';
        },
        enumerable: false,
        configurable: true
    });
    DotsItem.prototype.checkItem = function (item) {
        if (item.isKind('open') || item.isKind('left')) {
            return StackItem_js_1.BaseItem.success;
        }
        var dots = this.getProperty('ldots');
        var top = item.First;
        if (item.isKind('mml') && NodeUtil_js_1.default.isEmbellished(top)) {
            var tclass = NodeUtil_js_1.default.getTexClass(NodeUtil_js_1.default.getCoreMO(top));
            if (tclass === MmlNode_js_1.TEXCLASS.BIN || tclass === MmlNode_js_1.TEXCLASS.REL) {
                dots = this.getProperty('cdots');
            }
        }
        return [[dots, item], true];
    };
    return DotsItem;
}(StackItem_js_1.BaseItem));
exports.DotsItem = DotsItem;
var ArrayItem = (function (_super) {
    __extends(ArrayItem, _super);
    function ArrayItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.table = [];
        _this.row = [];
        _this.frame = [];
        _this.hfill = [];
        _this.arraydef = {};
        _this.dashed = false;
        return _this;
    }
    Object.defineProperty(ArrayItem.prototype, "kind", {
        get: function () {
            return 'array';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrayItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ArrayItem.prototype, "copyEnv", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    ArrayItem.prototype.checkItem = function (item) {
        if (item.isClose && !item.isKind('over')) {
            if (item.getProperty('isEntry')) {
                this.EndEntry();
                this.clearEnv();
                return StackItem_js_1.BaseItem.fail;
            }
            if (item.getProperty('isCR')) {
                this.EndEntry();
                this.EndRow();
                this.clearEnv();
                return StackItem_js_1.BaseItem.fail;
            }
            this.EndTable();
            this.clearEnv();
            var newItem = this.factory.create('mml', this.createMml());
            if (this.getProperty('requireClose')) {
                if (item.isKind('close')) {
                    return [[newItem], true];
                }
                throw new TexError_js_1.default('MissingCloseBrace', 'Missing close brace');
            }
            return [[newItem, item], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    ArrayItem.prototype.createMml = function () {
        var scriptlevel = this.arraydef['scriptlevel'];
        delete this.arraydef['scriptlevel'];
        var mml = this.create('node', 'mtable', this.table, this.arraydef);
        if (scriptlevel) {
            mml.setProperty('scriptlevel', scriptlevel);
        }
        if (this.frame.length === 4) {
            NodeUtil_js_1.default.setAttribute(mml, 'frame', this.dashed ? 'dashed' : 'solid');
        }
        else if (this.frame.length) {
            if (this.arraydef['rowlines']) {
                this.arraydef['rowlines'] =
                    this.arraydef['rowlines'].replace(/none( none)+$/, 'none');
            }
            NodeUtil_js_1.default.setAttribute(mml, 'frame', '');
            mml = this.create('node', 'menclose', [mml], { notation: this.frame.join(' ') });
            if ((this.arraydef['columnlines'] || 'none') !== 'none' ||
                (this.arraydef['rowlines'] || 'none') !== 'none') {
                NodeUtil_js_1.default.setAttribute(mml, 'data-padding', 0);
            }
        }
        if (this.getProperty('open') || this.getProperty('close')) {
            mml = ParseUtil_js_1.default.fenced(this.factory.configuration, this.getProperty('open'), mml, this.getProperty('close'));
        }
        return mml;
    };
    ArrayItem.prototype.EndEntry = function () {
        var mtd = this.create('node', 'mtd', this.nodes);
        if (this.hfill.length) {
            if (this.hfill[0] === 0) {
                NodeUtil_js_1.default.setAttribute(mtd, 'columnalign', 'right');
            }
            if (this.hfill[this.hfill.length - 1] === this.Size()) {
                NodeUtil_js_1.default.setAttribute(mtd, 'columnalign', NodeUtil_js_1.default.getAttribute(mtd, 'columnalign') ? 'center' : 'left');
            }
        }
        this.row.push(mtd);
        this.Clear();
        this.hfill = [];
    };
    ArrayItem.prototype.EndRow = function () {
        var node;
        if (this.getProperty('isNumbered') && this.row.length === 3) {
            this.row.unshift(this.row.pop());
            node = this.create('node', 'mlabeledtr', this.row);
        }
        else {
            node = this.create('node', 'mtr', this.row);
        }
        this.table.push(node);
        this.row = [];
    };
    ArrayItem.prototype.EndTable = function () {
        if (this.Size() || this.row.length) {
            this.EndEntry();
            this.EndRow();
        }
        this.checkLines();
    };
    ArrayItem.prototype.checkLines = function () {
        if (this.arraydef['rowlines']) {
            var lines = this.arraydef['rowlines'].split(/ /);
            if (lines.length === this.table.length) {
                this.frame.push('bottom');
                lines.pop();
                this.arraydef['rowlines'] = lines.join(' ');
            }
            else if (lines.length < this.table.length - 1) {
                this.arraydef['rowlines'] += ' none';
            }
        }
        if (this.getProperty('rowspacing')) {
            var rows = this.arraydef['rowspacing'].split(/ /);
            while (rows.length < this.table.length) {
                rows.push(this.getProperty('rowspacing') + 'em');
            }
            this.arraydef['rowspacing'] = rows.join(' ');
        }
    };
    ArrayItem.prototype.addRowSpacing = function (spacing) {
        if (this.arraydef['rowspacing']) {
            var rows = this.arraydef['rowspacing'].split(/ /);
            if (!this.getProperty('rowspacing')) {
                var dimem = ParseUtil_js_1.default.dimen2em(rows[0]);
                this.setProperty('rowspacing', dimem);
            }
            var rowspacing = this.getProperty('rowspacing');
            while (rows.length < this.table.length) {
                rows.push(ParseUtil_js_1.default.Em(rowspacing));
            }
            rows[this.table.length - 1] = ParseUtil_js_1.default.Em(Math.max(0, rowspacing + ParseUtil_js_1.default.dimen2em(spacing)));
            this.arraydef['rowspacing'] = rows.join(' ');
        }
    };
    return ArrayItem;
}(StackItem_js_1.BaseItem));
exports.ArrayItem = ArrayItem;
var EqnArrayItem = (function (_super) {
    __extends(EqnArrayItem, _super);
    function EqnArrayItem(factory) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, factory) || this;
        _this.maxrow = 0;
        _this.factory.configuration.tags.start(args[0], args[2], args[1]);
        return _this;
    }
    Object.defineProperty(EqnArrayItem.prototype, "kind", {
        get: function () {
            return 'eqnarray';
        },
        enumerable: false,
        configurable: true
    });
    EqnArrayItem.prototype.EndEntry = function () {
        if (this.row.length) {
            ParseUtil_js_1.default.fixInitialMO(this.factory.configuration, this.nodes);
        }
        var node = this.create('node', 'mtd', this.nodes);
        this.row.push(node);
        this.Clear();
    };
    EqnArrayItem.prototype.EndRow = function () {
        if (this.row.length > this.maxrow) {
            this.maxrow = this.row.length;
        }
        var mtr = 'mtr';
        var tag = this.factory.configuration.tags.getTag();
        if (tag) {
            this.row = [tag].concat(this.row);
            mtr = 'mlabeledtr';
        }
        this.factory.configuration.tags.clearTag();
        var node = this.create('node', mtr, this.row);
        this.table.push(node);
        this.row = [];
    };
    EqnArrayItem.prototype.EndTable = function () {
        _super.prototype.EndTable.call(this);
        this.factory.configuration.tags.end();
        this.extendArray('columnalign', this.maxrow);
        this.extendArray('columnwidth', this.maxrow);
        this.extendArray('columnspacing', this.maxrow - 1);
    };
    EqnArrayItem.prototype.extendArray = function (name, max) {
        if (!this.arraydef[name])
            return;
        var repeat = this.arraydef[name].split(/ /);
        var columns = __spreadArray([], __read(repeat), false);
        if (columns.length > 1) {
            while (columns.length < max) {
                columns.push.apply(columns, __spreadArray([], __read(repeat), false));
            }
            this.arraydef[name] = columns.slice(0, max).join(' ');
        }
    };
    return EqnArrayItem;
}(ArrayItem));
exports.EqnArrayItem = EqnArrayItem;
var EquationItem = (function (_super) {
    __extends(EquationItem, _super);
    function EquationItem(factory) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, factory) || this;
        _this.factory.configuration.tags.start('equation', true, args[0]);
        return _this;
    }
    Object.defineProperty(EquationItem.prototype, "kind", {
        get: function () {
            return 'equation';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EquationItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    EquationItem.prototype.checkItem = function (item) {
        if (item.isKind('end')) {
            var mml = this.toMml();
            var tag = this.factory.configuration.tags.getTag();
            this.factory.configuration.tags.end();
            return [[tag ? this.factory.configuration.tags.enTag(mml, tag) : mml, item], true];
        }
        if (item.isKind('stop')) {
            throw new TexError_js_1.default('EnvMissingEnd', 'Missing \\end{%1}', this.getName());
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return EquationItem;
}(StackItem_js_1.BaseItem));
exports.EquationItem = EquationItem;
//# sourceMappingURL=BaseItems.js.map

/***/ }),

/***/ 83031:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var sm = __importStar(__webpack_require__(92715));
var TexConstants_js_1 = __webpack_require__(48948);
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
var ParseMethods_js_1 = __importDefault(__webpack_require__(96004));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var MmlNode_js_1 = __webpack_require__(18426);
var lengths_js_1 = __webpack_require__(77130);
new sm.RegExpMap('letter', ParseMethods_js_1.default.variable, /[a-z]/i);
new sm.RegExpMap('digit', ParseMethods_js_1.default.digit, /[0-9.,]/);
new sm.RegExpMap('command', ParseMethods_js_1.default.controlSequence, /^\\/);
new sm.MacroMap('special', {
    '{': 'Open',
    '}': 'Close',
    '~': 'Tilde',
    '^': 'Superscript',
    '_': 'Subscript',
    ' ': 'Space',
    '\t': 'Space',
    '\r': 'Space',
    '\n': 'Space',
    '\'': 'Prime',
    '%': 'Comment',
    '&': 'Entry',
    '#': 'Hash',
    '\u00A0': 'Space',
    '\u2019': 'Prime'
}, BaseMethods_js_1.default);
new sm.CharacterMap('mathchar0mi', ParseMethods_js_1.default.mathchar0mi, {
    alpha: '\u03B1',
    beta: '\u03B2',
    gamma: '\u03B3',
    delta: '\u03B4',
    epsilon: '\u03F5',
    zeta: '\u03B6',
    eta: '\u03B7',
    theta: '\u03B8',
    iota: '\u03B9',
    kappa: '\u03BA',
    lambda: '\u03BB',
    mu: '\u03BC',
    nu: '\u03BD',
    xi: '\u03BE',
    omicron: '\u03BF',
    pi: '\u03C0',
    rho: '\u03C1',
    sigma: '\u03C3',
    tau: '\u03C4',
    upsilon: '\u03C5',
    phi: '\u03D5',
    chi: '\u03C7',
    psi: '\u03C8',
    omega: '\u03C9',
    varepsilon: '\u03B5',
    vartheta: '\u03D1',
    varpi: '\u03D6',
    varrho: '\u03F1',
    varsigma: '\u03C2',
    varphi: '\u03C6',
    S: ['\u00A7', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    aleph: ['\u2135', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    hbar: ['\u210F', { variantForm: true }],
    imath: '\u0131',
    jmath: '\u0237',
    ell: '\u2113',
    wp: ['\u2118', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    Re: ['\u211C', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    Im: ['\u2111', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    partial: ['\u2202', { mathvariant: TexConstants_js_1.TexConstant.Variant.ITALIC }],
    infty: ['\u221E', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    prime: ['\u2032', { variantForm: true }],
    emptyset: ['\u2205', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    nabla: ['\u2207', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    top: ['\u22A4', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    bot: ['\u22A5', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    angle: ['\u2220', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    triangle: ['\u25B3', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    backslash: ['\u2216', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    forall: ['\u2200', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    exists: ['\u2203', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    neg: ['\u00AC', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    lnot: ['\u00AC', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    flat: ['\u266D', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    natural: ['\u266E', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    sharp: ['\u266F', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    clubsuit: ['\u2663', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    diamondsuit: ['\u2662', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    heartsuit: ['\u2661', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    spadesuit: ['\u2660', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }]
});
new sm.CharacterMap('mathchar0mo', ParseMethods_js_1.default.mathchar0mo, {
    surd: '\u221A',
    coprod: ['\u2210', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    bigvee: ['\u22C1', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    bigwedge: ['\u22C0', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    biguplus: ['\u2A04', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    bigcap: ['\u22C2', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    bigcup: ['\u22C3', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    'int': ['\u222B', { texClass: MmlNode_js_1.TEXCLASS.OP }],
    intop: ['\u222B', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true, movablelimits: true }],
    iint: ['\u222C', { texClass: MmlNode_js_1.TEXCLASS.OP }],
    iiint: ['\u222D', { texClass: MmlNode_js_1.TEXCLASS.OP }],
    prod: ['\u220F', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    sum: ['\u2211', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    bigotimes: ['\u2A02', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    bigoplus: ['\u2A01', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    bigodot: ['\u2A00', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    oint: ['\u222E', { texClass: MmlNode_js_1.TEXCLASS.OP }],
    bigsqcup: ['\u2A06', { texClass: MmlNode_js_1.TEXCLASS.OP,
            movesupsub: true }],
    smallint: ['\u222B', { largeop: false }],
    triangleleft: '\u25C3',
    triangleright: '\u25B9',
    bigtriangleup: '\u25B3',
    bigtriangledown: '\u25BD',
    wedge: '\u2227',
    land: '\u2227',
    vee: '\u2228',
    lor: '\u2228',
    cap: '\u2229',
    cup: '\u222A',
    ddagger: '\u2021',
    dagger: '\u2020',
    sqcap: '\u2293',
    sqcup: '\u2294',
    uplus: '\u228E',
    amalg: '\u2A3F',
    diamond: '\u22C4',
    bullet: '\u2219',
    wr: '\u2240',
    div: '\u00F7',
    divsymbol: '\u00F7',
    odot: ['\u2299', { largeop: false }],
    oslash: ['\u2298', { largeop: false }],
    otimes: ['\u2297', { largeop: false }],
    ominus: ['\u2296', { largeop: false }],
    oplus: ['\u2295', { largeop: false }],
    mp: '\u2213',
    pm: '\u00B1',
    circ: '\u2218',
    bigcirc: '\u25EF',
    setminus: '\u2216',
    cdot: '\u22C5',
    ast: '\u2217',
    times: '\u00D7',
    star: '\u22C6',
    propto: '\u221D',
    sqsubseteq: '\u2291',
    sqsupseteq: '\u2292',
    parallel: '\u2225',
    mid: '\u2223',
    dashv: '\u22A3',
    vdash: '\u22A2',
    leq: '\u2264',
    le: '\u2264',
    geq: '\u2265',
    ge: '\u2265',
    lt: '\u003C',
    gt: '\u003E',
    succ: '\u227B',
    prec: '\u227A',
    approx: '\u2248',
    succeq: '\u2AB0',
    preceq: '\u2AAF',
    supset: '\u2283',
    subset: '\u2282',
    supseteq: '\u2287',
    subseteq: '\u2286',
    'in': '\u2208',
    ni: '\u220B',
    notin: '\u2209',
    owns: '\u220B',
    gg: '\u226B',
    ll: '\u226A',
    sim: '\u223C',
    simeq: '\u2243',
    perp: '\u22A5',
    equiv: '\u2261',
    asymp: '\u224D',
    smile: '\u2323',
    frown: '\u2322',
    ne: '\u2260',
    neq: '\u2260',
    cong: '\u2245',
    doteq: '\u2250',
    bowtie: '\u22C8',
    models: '\u22A8',
    notChar: '\u29F8',
    Leftrightarrow: '\u21D4',
    Leftarrow: '\u21D0',
    Rightarrow: '\u21D2',
    leftrightarrow: '\u2194',
    leftarrow: '\u2190',
    gets: '\u2190',
    rightarrow: '\u2192',
    to: ['\u2192', { accent: false }],
    mapsto: '\u21A6',
    leftharpoonup: '\u21BC',
    leftharpoondown: '\u21BD',
    rightharpoonup: '\u21C0',
    rightharpoondown: '\u21C1',
    nearrow: '\u2197',
    searrow: '\u2198',
    nwarrow: '\u2196',
    swarrow: '\u2199',
    rightleftharpoons: '\u21CC',
    hookrightarrow: '\u21AA',
    hookleftarrow: '\u21A9',
    longleftarrow: '\u27F5',
    Longleftarrow: '\u27F8',
    longrightarrow: '\u27F6',
    Longrightarrow: '\u27F9',
    Longleftrightarrow: '\u27FA',
    longleftrightarrow: '\u27F7',
    longmapsto: '\u27FC',
    ldots: '\u2026',
    cdots: '\u22EF',
    vdots: '\u22EE',
    ddots: '\u22F1',
    dotsc: '\u2026',
    dotsb: '\u22EF',
    dotsm: '\u22EF',
    dotsi: '\u22EF',
    dotso: '\u2026',
    ldotp: ['\u002E', { texClass: MmlNode_js_1.TEXCLASS.PUNCT }],
    cdotp: ['\u22C5', { texClass: MmlNode_js_1.TEXCLASS.PUNCT }],
    colon: ['\u003A', { texClass: MmlNode_js_1.TEXCLASS.PUNCT }]
});
new sm.CharacterMap('mathchar7', ParseMethods_js_1.default.mathchar7, {
    Gamma: '\u0393',
    Delta: '\u0394',
    Theta: '\u0398',
    Lambda: '\u039B',
    Xi: '\u039E',
    Pi: '\u03A0',
    Sigma: '\u03A3',
    Upsilon: '\u03A5',
    Phi: '\u03A6',
    Psi: '\u03A8',
    Omega: '\u03A9',
    '_': '\u005F',
    '#': '\u0023',
    '$': '\u0024',
    '%': '\u0025',
    '&': '\u0026',
    And: '\u0026'
});
new sm.DelimiterMap('delimiter', ParseMethods_js_1.default.delimiter, {
    '(': '(',
    ')': ')',
    '[': '[',
    ']': ']',
    '<': '\u27E8',
    '>': '\u27E9',
    '\\lt': '\u27E8',
    '\\gt': '\u27E9',
    '/': '/',
    '|': ['|', { texClass: MmlNode_js_1.TEXCLASS.ORD }],
    '.': '',
    '\\\\': '\\',
    '\\lmoustache': '\u23B0',
    '\\rmoustache': '\u23B1',
    '\\lgroup': '\u27EE',
    '\\rgroup': '\u27EF',
    '\\arrowvert': '\u23D0',
    '\\Arrowvert': '\u2016',
    '\\bracevert': '\u23AA',
    '\\Vert': ['\u2016', { texClass: MmlNode_js_1.TEXCLASS.ORD }],
    '\\|': ['\u2016', { texClass: MmlNode_js_1.TEXCLASS.ORD }],
    '\\vert': ['|', { texClass: MmlNode_js_1.TEXCLASS.ORD }],
    '\\uparrow': '\u2191',
    '\\downarrow': '\u2193',
    '\\updownarrow': '\u2195',
    '\\Uparrow': '\u21D1',
    '\\Downarrow': '\u21D3',
    '\\Updownarrow': '\u21D5',
    '\\backslash': '\\',
    '\\rangle': '\u27E9',
    '\\langle': '\u27E8',
    '\\rbrace': '}',
    '\\lbrace': '{',
    '\\}': '}',
    '\\{': '{',
    '\\rceil': '\u2309',
    '\\lceil': '\u2308',
    '\\rfloor': '\u230B',
    '\\lfloor': '\u230A',
    '\\lbrack': '[',
    '\\rbrack': ']'
});
new sm.CommandMap('macros', {
    displaystyle: ['SetStyle', 'D', true, 0],
    textstyle: ['SetStyle', 'T', false, 0],
    scriptstyle: ['SetStyle', 'S', false, 1],
    scriptscriptstyle: ['SetStyle', 'SS', false, 2],
    rm: ['SetFont', TexConstants_js_1.TexConstant.Variant.NORMAL],
    mit: ['SetFont', TexConstants_js_1.TexConstant.Variant.ITALIC],
    oldstyle: ['SetFont', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    cal: ['SetFont', TexConstants_js_1.TexConstant.Variant.CALLIGRAPHIC],
    it: ['SetFont', TexConstants_js_1.TexConstant.Variant.MATHITALIC],
    bf: ['SetFont', TexConstants_js_1.TexConstant.Variant.BOLD],
    bbFont: ['SetFont', TexConstants_js_1.TexConstant.Variant.DOUBLESTRUCK],
    scr: ['SetFont', TexConstants_js_1.TexConstant.Variant.SCRIPT],
    frak: ['SetFont', TexConstants_js_1.TexConstant.Variant.FRAKTUR],
    sf: ['SetFont', TexConstants_js_1.TexConstant.Variant.SANSSERIF],
    tt: ['SetFont', TexConstants_js_1.TexConstant.Variant.MONOSPACE],
    mathrm: ['MathFont', TexConstants_js_1.TexConstant.Variant.NORMAL],
    mathup: ['MathFont', TexConstants_js_1.TexConstant.Variant.NORMAL],
    mathnormal: ['MathFont', ''],
    mathbf: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLD],
    mathbfup: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLD],
    mathit: ['MathFont', TexConstants_js_1.TexConstant.Variant.MATHITALIC],
    mathbfit: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDITALIC],
    mathbb: ['MathFont', TexConstants_js_1.TexConstant.Variant.DOUBLESTRUCK],
    Bbb: ['MathFont', TexConstants_js_1.TexConstant.Variant.DOUBLESTRUCK],
    mathfrak: ['MathFont', TexConstants_js_1.TexConstant.Variant.FRAKTUR],
    mathbffrak: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDFRAKTUR],
    mathscr: ['MathFont', TexConstants_js_1.TexConstant.Variant.SCRIPT],
    mathbfscr: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDSCRIPT],
    mathsf: ['MathFont', TexConstants_js_1.TexConstant.Variant.SANSSERIF],
    mathsfup: ['MathFont', TexConstants_js_1.TexConstant.Variant.SANSSERIF],
    mathbfsf: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDSANSSERIF],
    mathbfsfup: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDSANSSERIF],
    mathsfit: ['MathFont', TexConstants_js_1.TexConstant.Variant.SANSSERIFITALIC],
    mathbfsfit: ['MathFont', TexConstants_js_1.TexConstant.Variant.SANSSERIFBOLDITALIC],
    mathtt: ['MathFont', TexConstants_js_1.TexConstant.Variant.MONOSPACE],
    mathcal: ['MathFont', TexConstants_js_1.TexConstant.Variant.CALLIGRAPHIC],
    mathbfcal: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDCALLIGRAPHIC],
    symrm: ['MathFont', TexConstants_js_1.TexConstant.Variant.NORMAL],
    symup: ['MathFont', TexConstants_js_1.TexConstant.Variant.NORMAL],
    symnormal: ['MathFont', ''],
    symbf: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLD],
    symbfup: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLD],
    symit: ['MathFont', TexConstants_js_1.TexConstant.Variant.ITALIC],
    symbfit: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDITALIC],
    symbb: ['MathFont', TexConstants_js_1.TexConstant.Variant.DOUBLESTRUCK],
    symfrak: ['MathFont', TexConstants_js_1.TexConstant.Variant.FRAKTUR],
    symbffrak: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDFRAKTUR],
    symscr: ['MathFont', TexConstants_js_1.TexConstant.Variant.SCRIPT],
    symbfscr: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDSCRIPT],
    symsf: ['MathFont', TexConstants_js_1.TexConstant.Variant.SANSSERIF],
    symsfup: ['MathFont', TexConstants_js_1.TexConstant.Variant.SANSSERIF],
    symbfsf: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDSANSSERIF],
    symbfsfup: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDSANSSERIF],
    symsfit: ['MathFont', TexConstants_js_1.TexConstant.Variant.SANSSERIFITALIC],
    symbfsfit: ['MathFont', TexConstants_js_1.TexConstant.Variant.SANSSERIFBOLDITALIC],
    symtt: ['MathFont', TexConstants_js_1.TexConstant.Variant.MONOSPACE],
    symcal: ['MathFont', TexConstants_js_1.TexConstant.Variant.CALLIGRAPHIC],
    symbfcal: ['MathFont', TexConstants_js_1.TexConstant.Variant.BOLDCALLIGRAPHIC],
    textrm: ['HBox', null, TexConstants_js_1.TexConstant.Variant.NORMAL],
    textup: ['HBox', null, TexConstants_js_1.TexConstant.Variant.NORMAL],
    textnormal: ['HBox'],
    textit: ['HBox', null, TexConstants_js_1.TexConstant.Variant.ITALIC],
    textbf: ['HBox', null, TexConstants_js_1.TexConstant.Variant.BOLD],
    textsf: ['HBox', null, TexConstants_js_1.TexConstant.Variant.SANSSERIF],
    texttt: ['HBox', null, TexConstants_js_1.TexConstant.Variant.MONOSPACE],
    tiny: ['SetSize', 0.5],
    Tiny: ['SetSize', 0.6],
    scriptsize: ['SetSize', 0.7],
    small: ['SetSize', 0.85],
    normalsize: ['SetSize', 1.0],
    large: ['SetSize', 1.2],
    Large: ['SetSize', 1.44],
    LARGE: ['SetSize', 1.73],
    huge: ['SetSize', 2.07],
    Huge: ['SetSize', 2.49],
    arcsin: 'NamedFn',
    arccos: 'NamedFn',
    arctan: 'NamedFn',
    arg: 'NamedFn',
    cos: 'NamedFn',
    cosh: 'NamedFn',
    cot: 'NamedFn',
    coth: 'NamedFn',
    csc: 'NamedFn',
    deg: 'NamedFn',
    det: 'NamedOp',
    dim: 'NamedFn',
    exp: 'NamedFn',
    gcd: 'NamedOp',
    hom: 'NamedFn',
    inf: 'NamedOp',
    ker: 'NamedFn',
    lg: 'NamedFn',
    lim: 'NamedOp',
    liminf: ['NamedOp', 'lim&thinsp;inf'],
    limsup: ['NamedOp', 'lim&thinsp;sup'],
    ln: 'NamedFn',
    log: 'NamedFn',
    max: 'NamedOp',
    min: 'NamedOp',
    Pr: 'NamedOp',
    sec: 'NamedFn',
    sin: 'NamedFn',
    sinh: 'NamedFn',
    sup: 'NamedOp',
    tan: 'NamedFn',
    tanh: 'NamedFn',
    limits: ['Limits', 1],
    nolimits: ['Limits', 0],
    overline: ['UnderOver', '2015'],
    underline: ['UnderOver', '2015'],
    overbrace: ['UnderOver', '23DE', 1],
    underbrace: ['UnderOver', '23DF', 1],
    overparen: ['UnderOver', '23DC'],
    underparen: ['UnderOver', '23DD'],
    overrightarrow: ['UnderOver', '2192'],
    underrightarrow: ['UnderOver', '2192'],
    overleftarrow: ['UnderOver', '2190'],
    underleftarrow: ['UnderOver', '2190'],
    overleftrightarrow: ['UnderOver', '2194'],
    underleftrightarrow: ['UnderOver', '2194'],
    overset: 'Overset',
    underset: 'Underset',
    overunderset: 'Overunderset',
    stackrel: ['Macro', '\\mathrel{\\mathop{#2}\\limits^{#1}}', 2],
    stackbin: ['Macro', '\\mathbin{\\mathop{#2}\\limits^{#1}}', 2],
    over: 'Over',
    overwithdelims: 'Over',
    atop: 'Over',
    atopwithdelims: 'Over',
    above: 'Over',
    abovewithdelims: 'Over',
    brace: ['Over', '{', '}'],
    brack: ['Over', '[', ']'],
    choose: ['Over', '(', ')'],
    frac: 'Frac',
    sqrt: 'Sqrt',
    root: 'Root',
    uproot: ['MoveRoot', 'upRoot'],
    leftroot: ['MoveRoot', 'leftRoot'],
    left: 'LeftRight',
    right: 'LeftRight',
    middle: 'LeftRight',
    llap: 'Lap',
    rlap: 'Lap',
    raise: 'RaiseLower',
    lower: 'RaiseLower',
    moveleft: 'MoveLeftRight',
    moveright: 'MoveLeftRight',
    ',': ['Spacer', lengths_js_1.MATHSPACE.thinmathspace],
    ':': ['Spacer', lengths_js_1.MATHSPACE.mediummathspace],
    '>': ['Spacer', lengths_js_1.MATHSPACE.mediummathspace],
    ';': ['Spacer', lengths_js_1.MATHSPACE.thickmathspace],
    '!': ['Spacer', lengths_js_1.MATHSPACE.negativethinmathspace],
    enspace: ['Spacer', .5],
    quad: ['Spacer', 1],
    qquad: ['Spacer', 2],
    thinspace: ['Spacer', lengths_js_1.MATHSPACE.thinmathspace],
    negthinspace: ['Spacer', lengths_js_1.MATHSPACE.negativethinmathspace],
    hskip: 'Hskip',
    hspace: 'Hskip',
    kern: 'Hskip',
    mskip: 'Hskip',
    mspace: 'Hskip',
    mkern: 'Hskip',
    rule: 'rule',
    Rule: ['Rule'],
    Space: ['Rule', 'blank'],
    nonscript: 'Nonscript',
    big: ['MakeBig', MmlNode_js_1.TEXCLASS.ORD, 0.85],
    Big: ['MakeBig', MmlNode_js_1.TEXCLASS.ORD, 1.15],
    bigg: ['MakeBig', MmlNode_js_1.TEXCLASS.ORD, 1.45],
    Bigg: ['MakeBig', MmlNode_js_1.TEXCLASS.ORD, 1.75],
    bigl: ['MakeBig', MmlNode_js_1.TEXCLASS.OPEN, 0.85],
    Bigl: ['MakeBig', MmlNode_js_1.TEXCLASS.OPEN, 1.15],
    biggl: ['MakeBig', MmlNode_js_1.TEXCLASS.OPEN, 1.45],
    Biggl: ['MakeBig', MmlNode_js_1.TEXCLASS.OPEN, 1.75],
    bigr: ['MakeBig', MmlNode_js_1.TEXCLASS.CLOSE, 0.85],
    Bigr: ['MakeBig', MmlNode_js_1.TEXCLASS.CLOSE, 1.15],
    biggr: ['MakeBig', MmlNode_js_1.TEXCLASS.CLOSE, 1.45],
    Biggr: ['MakeBig', MmlNode_js_1.TEXCLASS.CLOSE, 1.75],
    bigm: ['MakeBig', MmlNode_js_1.TEXCLASS.REL, 0.85],
    Bigm: ['MakeBig', MmlNode_js_1.TEXCLASS.REL, 1.15],
    biggm: ['MakeBig', MmlNode_js_1.TEXCLASS.REL, 1.45],
    Biggm: ['MakeBig', MmlNode_js_1.TEXCLASS.REL, 1.75],
    mathord: ['TeXAtom', MmlNode_js_1.TEXCLASS.ORD],
    mathop: ['TeXAtom', MmlNode_js_1.TEXCLASS.OP],
    mathopen: ['TeXAtom', MmlNode_js_1.TEXCLASS.OPEN],
    mathclose: ['TeXAtom', MmlNode_js_1.TEXCLASS.CLOSE],
    mathbin: ['TeXAtom', MmlNode_js_1.TEXCLASS.BIN],
    mathrel: ['TeXAtom', MmlNode_js_1.TEXCLASS.REL],
    mathpunct: ['TeXAtom', MmlNode_js_1.TEXCLASS.PUNCT],
    mathinner: ['TeXAtom', MmlNode_js_1.TEXCLASS.INNER],
    vcenter: ['TeXAtom', MmlNode_js_1.TEXCLASS.VCENTER],
    buildrel: 'BuildRel',
    hbox: ['HBox', 0],
    text: 'HBox',
    mbox: ['HBox', 0],
    fbox: 'FBox',
    boxed: ['Macro', '\\fbox{$\\displaystyle{#1}$}', 1],
    framebox: 'FrameBox',
    strut: 'Strut',
    mathstrut: ['Macro', '\\vphantom{(}'],
    phantom: 'Phantom',
    vphantom: ['Phantom', 1, 0],
    hphantom: ['Phantom', 0, 1],
    smash: 'Smash',
    acute: ['Accent', '00B4'],
    grave: ['Accent', '0060'],
    ddot: ['Accent', '00A8'],
    tilde: ['Accent', '007E'],
    bar: ['Accent', '00AF'],
    breve: ['Accent', '02D8'],
    check: ['Accent', '02C7'],
    hat: ['Accent', '005E'],
    vec: ['Accent', '2192'],
    dot: ['Accent', '02D9'],
    widetilde: ['Accent', '007E', 1],
    widehat: ['Accent', '005E', 1],
    matrix: 'Matrix',
    array: 'Matrix',
    pmatrix: ['Matrix', '(', ')'],
    cases: ['Matrix', '{', '', 'left left', null, '.1em', null,
        true],
    eqalign: ['Matrix', null, null, 'right left',
        (0, lengths_js_1.em)(lengths_js_1.MATHSPACE.thickmathspace), '.5em', 'D'],
    displaylines: ['Matrix', null, null, 'center', null, '.5em', 'D'],
    cr: 'Cr',
    '\\': 'CrLaTeX',
    newline: ['CrLaTeX', true],
    hline: ['HLine', 'solid'],
    hdashline: ['HLine', 'dashed'],
    eqalignno: ['Matrix', null, null, 'right left',
        (0, lengths_js_1.em)(lengths_js_1.MATHSPACE.thickmathspace), '.5em', 'D', null,
        'right'],
    leqalignno: ['Matrix', null, null, 'right left',
        (0, lengths_js_1.em)(lengths_js_1.MATHSPACE.thickmathspace), '.5em', 'D', null,
        'left'],
    hfill: 'HFill',
    hfil: 'HFill',
    hfilll: 'HFill',
    bmod: ['Macro', '\\mmlToken{mo}[lspace="thickmathspace"' +
            ' rspace="thickmathspace"]{mod}'],
    pmod: ['Macro', '\\pod{\\mmlToken{mi}{mod}\\kern 6mu #1}', 1],
    mod: ['Macro', '\\mathchoice{\\kern18mu}{\\kern12mu}' +
            '{\\kern12mu}{\\kern12mu}\\mmlToken{mi}{mod}\\,\\,#1',
        1],
    pod: ['Macro', '\\mathchoice{\\kern18mu}{\\kern8mu}' +
            '{\\kern8mu}{\\kern8mu}(#1)', 1],
    iff: ['Macro', '\\;\\Longleftrightarrow\\;'],
    skew: ['Macro', '{{#2{#3\\mkern#1mu}\\mkern-#1mu}{}}', 3],
    pmb: ['Macro', '\\rlap{#1}\\kern1px{#1}', 1],
    TeX: ['Macro', 'T\\kern-.14em\\lower.5ex{E}\\kern-.115em X'],
    LaTeX: ['Macro', 'L\\kern-.325em\\raise.21em' +
            '{\\scriptstyle{A}}\\kern-.17em\\TeX'],
    ' ': ['Macro', '\\text{ }'],
    not: 'Not',
    dots: 'Dots',
    space: 'Tilde',
    '\u00A0': 'Tilde',
    begin: 'BeginEnd',
    end: 'BeginEnd',
    label: 'HandleLabel',
    ref: 'HandleRef',
    nonumber: 'HandleNoTag',
    mathchoice: 'MathChoice',
    mmlToken: 'MmlToken'
}, BaseMethods_js_1.default);
new sm.EnvironmentMap('environment', ParseMethods_js_1.default.environment, {
    array: ['AlignedArray'],
    equation: ['Equation', null, true],
    eqnarray: ['EqnArray', null, true, true, 'rcl',
        ParseUtil_js_1.default.cols(0, lengths_js_1.MATHSPACE.thickmathspace), '.5em']
}, BaseMethods_js_1.default);
new sm.CharacterMap('not_remap', null, {
    '\u2190': '\u219A',
    '\u2192': '\u219B',
    '\u2194': '\u21AE',
    '\u21D0': '\u21CD',
    '\u21D2': '\u21CF',
    '\u21D4': '\u21CE',
    '\u2208': '\u2209',
    '\u220B': '\u220C',
    '\u2223': '\u2224',
    '\u2225': '\u2226',
    '\u223C': '\u2241',
    '\u007E': '\u2241',
    '\u2243': '\u2244',
    '\u2245': '\u2247',
    '\u2248': '\u2249',
    '\u224D': '\u226D',
    '\u003D': '\u2260',
    '\u2261': '\u2262',
    '\u003C': '\u226E',
    '\u003E': '\u226F',
    '\u2264': '\u2270',
    '\u2265': '\u2271',
    '\u2272': '\u2274',
    '\u2273': '\u2275',
    '\u2276': '\u2278',
    '\u2277': '\u2279',
    '\u227A': '\u2280',
    '\u227B': '\u2281',
    '\u2282': '\u2284',
    '\u2283': '\u2285',
    '\u2286': '\u2288',
    '\u2287': '\u2289',
    '\u22A2': '\u22AC',
    '\u22A8': '\u22AD',
    '\u22A9': '\u22AE',
    '\u22AB': '\u22AF',
    '\u227C': '\u22E0',
    '\u227D': '\u22E1',
    '\u2291': '\u22E2',
    '\u2292': '\u22E3',
    '\u22B2': '\u22EA',
    '\u22B3': '\u22EB',
    '\u22B4': '\u22EC',
    '\u22B5': '\u22ED',
    '\u2203': '\u2204'
});
//# sourceMappingURL=BaseMappings.js.map

/***/ }),

/***/ 40871:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var sitem = __importStar(__webpack_require__(5065));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var TexConstants_js_1 = __webpack_require__(48948);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var MmlNode_js_1 = __webpack_require__(18426);
var Tags_js_1 = __webpack_require__(56711);
var lengths_js_1 = __webpack_require__(77130);
var Entities_js_1 = __webpack_require__(63411);
var Options_js_1 = __webpack_require__(36059);
var BaseMethods = {};
var P_HEIGHT = 1.2 / .85;
var MmlTokenAllow = {
    fontfamily: 1, fontsize: 1, fontweight: 1, fontstyle: 1,
    color: 1, background: 1,
    id: 1, 'class': 1, href: 1, style: 1
};
BaseMethods.Open = function (parser, _c) {
    parser.Push(parser.itemFactory.create('open'));
};
BaseMethods.Close = function (parser, _c) {
    parser.Push(parser.itemFactory.create('close'));
};
BaseMethods.Tilde = function (parser, _c) {
    parser.Push(parser.create('token', 'mtext', {}, Entities_js_1.entities.nbsp));
};
BaseMethods.Space = function (_parser, _c) { };
BaseMethods.Superscript = function (parser, _c) {
    var _a;
    if (parser.GetNext().match(/\d/)) {
        parser.string = parser.string.substr(0, parser.i + 1) +
            ' ' + parser.string.substr(parser.i + 1);
    }
    var primes;
    var base;
    var top = parser.stack.Top();
    if (top.isKind('prime')) {
        _a = __read(top.Peek(2), 2), base = _a[0], primes = _a[1];
        parser.stack.Pop();
    }
    else {
        base = parser.stack.Prev();
        if (!base) {
            base = parser.create('token', 'mi', {}, '');
        }
    }
    var movesupsub = NodeUtil_js_1.default.getProperty(base, 'movesupsub');
    var position = NodeUtil_js_1.default.isType(base, 'msubsup') ? base.sup :
        base.over;
    if ((NodeUtil_js_1.default.isType(base, 'msubsup') && !NodeUtil_js_1.default.isType(base, 'msup') &&
        NodeUtil_js_1.default.getChildAt(base, base.sup)) ||
        (NodeUtil_js_1.default.isType(base, 'munderover') && !NodeUtil_js_1.default.isType(base, 'mover') &&
            NodeUtil_js_1.default.getChildAt(base, base.over) &&
            !NodeUtil_js_1.default.getProperty(base, 'subsupOK'))) {
        throw new TexError_js_1.default('DoubleExponent', 'Double exponent: use braces to clarify');
    }
    if (!NodeUtil_js_1.default.isType(base, 'msubsup') || NodeUtil_js_1.default.isType(base, 'msup')) {
        if (movesupsub) {
            if (!NodeUtil_js_1.default.isType(base, 'munderover') || NodeUtil_js_1.default.isType(base, 'mover') ||
                NodeUtil_js_1.default.getChildAt(base, base.over)) {
                base = parser.create('node', 'munderover', [base], { movesupsub: true });
            }
            position = base.over;
        }
        else {
            base = parser.create('node', 'msubsup', [base]);
            position = base.sup;
        }
    }
    parser.Push(parser.itemFactory.create('subsup', base).setProperties({
        position: position, primes: primes, movesupsub: movesupsub
    }));
};
BaseMethods.Subscript = function (parser, _c) {
    var _a;
    if (parser.GetNext().match(/\d/)) {
        parser.string =
            parser.string.substr(0, parser.i + 1) + ' ' +
                parser.string.substr(parser.i + 1);
    }
    var primes, base;
    var top = parser.stack.Top();
    if (top.isKind('prime')) {
        _a = __read(top.Peek(2), 2), base = _a[0], primes = _a[1];
        parser.stack.Pop();
    }
    else {
        base = parser.stack.Prev();
        if (!base) {
            base = parser.create('token', 'mi', {}, '');
        }
    }
    var movesupsub = NodeUtil_js_1.default.getProperty(base, 'movesupsub');
    var position = NodeUtil_js_1.default.isType(base, 'msubsup') ?
        base.sub : base.under;
    if ((NodeUtil_js_1.default.isType(base, 'msubsup') && !NodeUtil_js_1.default.isType(base, 'msup') &&
        NodeUtil_js_1.default.getChildAt(base, base.sub)) ||
        (NodeUtil_js_1.default.isType(base, 'munderover') && !NodeUtil_js_1.default.isType(base, 'mover') &&
            NodeUtil_js_1.default.getChildAt(base, base.under) &&
            !NodeUtil_js_1.default.getProperty(base, 'subsupOK'))) {
        throw new TexError_js_1.default('DoubleSubscripts', 'Double subscripts: use braces to clarify');
    }
    if (!NodeUtil_js_1.default.isType(base, 'msubsup') || NodeUtil_js_1.default.isType(base, 'msup')) {
        if (movesupsub) {
            if (!NodeUtil_js_1.default.isType(base, 'munderover') || NodeUtil_js_1.default.isType(base, 'mover') ||
                NodeUtil_js_1.default.getChildAt(base, base.under)) {
                base = parser.create('node', 'munderover', [base], { movesupsub: true });
            }
            position = base.under;
        }
        else {
            base = parser.create('node', 'msubsup', [base]);
            position = base.sub;
        }
    }
    parser.Push(parser.itemFactory.create('subsup', base).setProperties({
        position: position, primes: primes, movesupsub: movesupsub
    }));
};
BaseMethods.Prime = function (parser, c) {
    var base = parser.stack.Prev();
    if (!base) {
        base = parser.create('node', 'mi');
    }
    if (NodeUtil_js_1.default.isType(base, 'msubsup') && !NodeUtil_js_1.default.isType(base, 'msup') &&
        NodeUtil_js_1.default.getChildAt(base, base.sup)) {
        throw new TexError_js_1.default('DoubleExponentPrime', 'Prime causes double exponent: use braces to clarify');
    }
    var sup = '';
    parser.i--;
    do {
        sup += Entities_js_1.entities.prime;
        parser.i++, c = parser.GetNext();
    } while (c === '\'' || c === Entities_js_1.entities.rsquo);
    sup = ['', '\u2032', '\u2033', '\u2034', '\u2057'][sup.length] || sup;
    var node = parser.create('token', 'mo', { variantForm: true }, sup);
    parser.Push(parser.itemFactory.create('prime', base, node));
};
BaseMethods.Comment = function (parser, _c) {
    while (parser.i < parser.string.length && parser.string.charAt(parser.i) !== '\n') {
        parser.i++;
    }
};
BaseMethods.Hash = function (_parser, _c) {
    throw new TexError_js_1.default('CantUseHash1', 'You can\'t use \'macro parameter character #\' in math mode');
};
BaseMethods.MathFont = function (parser, name, variant) {
    var text = parser.GetArgument(name);
    var mml = new TexParser_js_1.default(text, __assign(__assign({}, parser.stack.env), { font: variant, multiLetterIdentifiers: /^[a-zA-Z]+/, noAutoOP: true }), parser.configuration).mml();
    parser.Push(parser.create('node', 'TeXAtom', [mml]));
};
BaseMethods.SetFont = function (parser, _name, font) {
    parser.stack.env['font'] = font;
};
BaseMethods.SetStyle = function (parser, _name, texStyle, style, level) {
    parser.stack.env['style'] = texStyle;
    parser.stack.env['level'] = level;
    parser.Push(parser.itemFactory.create('style').setProperty('styles', { displaystyle: style, scriptlevel: level }));
};
BaseMethods.SetSize = function (parser, _name, size) {
    parser.stack.env['size'] = size;
    parser.Push(parser.itemFactory.create('style').setProperty('styles', { mathsize: (0, lengths_js_1.em)(size) }));
};
BaseMethods.Spacer = function (parser, _name, space) {
    var node = parser.create('node', 'mspace', [], { width: (0, lengths_js_1.em)(space) });
    var style = parser.create('node', 'mstyle', [node], { scriptlevel: 0 });
    parser.Push(style);
};
BaseMethods.LeftRight = function (parser, name) {
    var first = name.substr(1);
    parser.Push(parser.itemFactory.create(first, parser.GetDelimiter(name), parser.stack.env.color));
};
BaseMethods.NamedFn = function (parser, name, id) {
    if (!id) {
        id = name.substr(1);
    }
    var mml = parser.create('token', 'mi', { texClass: MmlNode_js_1.TEXCLASS.OP }, id);
    parser.Push(parser.itemFactory.create('fn', mml));
};
BaseMethods.NamedOp = function (parser, name, id) {
    if (!id) {
        id = name.substr(1);
    }
    id = id.replace(/&thinsp;/, '\u2006');
    var mml = parser.create('token', 'mo', {
        movablelimits: true,
        movesupsub: true,
        form: TexConstants_js_1.TexConstant.Form.PREFIX,
        texClass: MmlNode_js_1.TEXCLASS.OP
    }, id);
    parser.Push(mml);
};
BaseMethods.Limits = function (parser, _name, limits) {
    var op = parser.stack.Prev(true);
    if (!op || (NodeUtil_js_1.default.getTexClass(NodeUtil_js_1.default.getCoreMO(op)) !== MmlNode_js_1.TEXCLASS.OP &&
        NodeUtil_js_1.default.getProperty(op, 'movesupsub') == null)) {
        throw new TexError_js_1.default('MisplacedLimits', '%1 is allowed only on operators', parser.currentCS);
    }
    var top = parser.stack.Top();
    var node;
    if (NodeUtil_js_1.default.isType(op, 'munderover') && !limits) {
        node = parser.create('node', 'msubsup');
        NodeUtil_js_1.default.copyChildren(op, node);
        op = top.Last = node;
    }
    else if (NodeUtil_js_1.default.isType(op, 'msubsup') && limits) {
        node = parser.create('node', 'munderover');
        NodeUtil_js_1.default.copyChildren(op, node);
        op = top.Last = node;
    }
    NodeUtil_js_1.default.setProperty(op, 'movesupsub', limits ? true : false);
    NodeUtil_js_1.default.setProperties(NodeUtil_js_1.default.getCoreMO(op), { 'movablelimits': false });
    if (NodeUtil_js_1.default.getAttribute(op, 'movablelimits') ||
        NodeUtil_js_1.default.getProperty(op, 'movablelimits')) {
        NodeUtil_js_1.default.setProperties(op, { 'movablelimits': false });
    }
};
BaseMethods.Over = function (parser, name, open, close) {
    var mml = parser.itemFactory.create('over').setProperty('name', parser.currentCS);
    if (open || close) {
        mml.setProperty('open', open);
        mml.setProperty('close', close);
    }
    else if (name.match(/withdelims$/)) {
        mml.setProperty('open', parser.GetDelimiter(name));
        mml.setProperty('close', parser.GetDelimiter(name));
    }
    if (name.match(/^\\above/)) {
        mml.setProperty('thickness', parser.GetDimen(name));
    }
    else if (name.match(/^\\atop/) || open || close) {
        mml.setProperty('thickness', 0);
    }
    parser.Push(mml);
};
BaseMethods.Frac = function (parser, name) {
    var num = parser.ParseArg(name);
    var den = parser.ParseArg(name);
    var node = parser.create('node', 'mfrac', [num, den]);
    parser.Push(node);
};
BaseMethods.Sqrt = function (parser, name) {
    var n = parser.GetBrackets(name);
    var arg = parser.GetArgument(name);
    if (arg === '\\frac') {
        arg += '{' + parser.GetArgument(arg) + '}{' + parser.GetArgument(arg) + '}';
    }
    var mml = new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml();
    if (!n) {
        mml = parser.create('node', 'msqrt', [mml]);
    }
    else {
        mml = parser.create('node', 'mroot', [mml, parseRoot(parser, n)]);
    }
    parser.Push(mml);
};
function parseRoot(parser, n) {
    var env = parser.stack.env;
    var inRoot = env['inRoot'];
    env['inRoot'] = true;
    var newParser = new TexParser_js_1.default(n, env, parser.configuration);
    var node = newParser.mml();
    var global = newParser.stack.global;
    if (global['leftRoot'] || global['upRoot']) {
        var def = {};
        if (global['leftRoot']) {
            def['width'] = global['leftRoot'];
        }
        if (global['upRoot']) {
            def['voffset'] = global['upRoot'];
            def['height'] = global['upRoot'];
        }
        node = parser.create('node', 'mpadded', [node], def);
    }
    env['inRoot'] = inRoot;
    return node;
}
BaseMethods.Root = function (parser, name) {
    var n = parser.GetUpTo(name, '\\of');
    var arg = parser.ParseArg(name);
    var node = parser.create('node', 'mroot', [arg, parseRoot(parser, n)]);
    parser.Push(node);
};
BaseMethods.MoveRoot = function (parser, name, id) {
    if (!parser.stack.env['inRoot']) {
        throw new TexError_js_1.default('MisplacedMoveRoot', '%1 can appear only within a root', parser.currentCS);
    }
    if (parser.stack.global[id]) {
        throw new TexError_js_1.default('MultipleMoveRoot', 'Multiple use of %1', parser.currentCS);
    }
    var n = parser.GetArgument(name);
    if (!n.match(/-?[0-9]+/)) {
        throw new TexError_js_1.default('IntegerArg', 'The argument to %1 must be an integer', parser.currentCS);
    }
    n = (parseInt(n, 10) / 15) + 'em';
    if (n.substr(0, 1) !== '-') {
        n = '+' + n;
    }
    parser.stack.global[id] = n;
};
BaseMethods.Accent = function (parser, name, accent, stretchy) {
    var c = parser.ParseArg(name);
    var def = __assign(__assign({}, ParseUtil_js_1.default.getFontDef(parser)), { accent: true, mathaccent: true });
    var entity = NodeUtil_js_1.default.createEntity(accent);
    var moNode = parser.create('token', 'mo', def, entity);
    var mml = moNode;
    NodeUtil_js_1.default.setAttribute(mml, 'stretchy', stretchy ? true : false);
    var mo = (NodeUtil_js_1.default.isEmbellished(c) ? NodeUtil_js_1.default.getCoreMO(c) : c);
    if (NodeUtil_js_1.default.isType(mo, 'mo') || NodeUtil_js_1.default.getProperty(mo, 'movablelimits')) {
        NodeUtil_js_1.default.setProperties(mo, { 'movablelimits': false });
    }
    var muoNode = parser.create('node', 'munderover');
    NodeUtil_js_1.default.setChild(muoNode, 0, c);
    NodeUtil_js_1.default.setChild(muoNode, 1, null);
    NodeUtil_js_1.default.setChild(muoNode, 2, mml);
    var texAtom = parser.create('node', 'TeXAtom', [muoNode]);
    parser.Push(texAtom);
};
BaseMethods.UnderOver = function (parser, name, c, stack) {
    var entity = NodeUtil_js_1.default.createEntity(c);
    var mo = parser.create('token', 'mo', { stretchy: true, accent: true }, entity);
    var pos = (name.charAt(1) === 'o' ? 'over' : 'under');
    var base = parser.ParseArg(name);
    parser.Push(ParseUtil_js_1.default.underOver(parser, base, mo, pos, stack));
};
BaseMethods.Overset = function (parser, name) {
    var top = parser.ParseArg(name);
    var base = parser.ParseArg(name);
    ParseUtil_js_1.default.checkMovableLimits(base);
    if (top.isKind('mo')) {
        NodeUtil_js_1.default.setAttribute(top, 'accent', false);
    }
    var node = parser.create('node', 'mover', [base, top]);
    parser.Push(node);
};
BaseMethods.Underset = function (parser, name) {
    var bot = parser.ParseArg(name);
    var base = parser.ParseArg(name);
    ParseUtil_js_1.default.checkMovableLimits(base);
    if (bot.isKind('mo')) {
        NodeUtil_js_1.default.setAttribute(bot, 'accent', false);
    }
    var node = parser.create('node', 'munder', [base, bot], { accentunder: false });
    parser.Push(node);
};
BaseMethods.Overunderset = function (parser, name) {
    var top = parser.ParseArg(name);
    var bot = parser.ParseArg(name);
    var base = parser.ParseArg(name);
    ParseUtil_js_1.default.checkMovableLimits(base);
    if (top.isKind('mo')) {
        NodeUtil_js_1.default.setAttribute(top, 'accent', false);
    }
    if (bot.isKind('mo')) {
        NodeUtil_js_1.default.setAttribute(bot, 'accent', false);
    }
    var node = parser.create('node', 'munderover', [base, bot, top], { accent: false, accentunder: false });
    parser.Push(node);
};
BaseMethods.TeXAtom = function (parser, name, mclass) {
    var def = { texClass: mclass };
    var mml;
    var node;
    var parsed;
    if (mclass === MmlNode_js_1.TEXCLASS.OP) {
        def['movesupsub'] = def['movablelimits'] = true;
        var arg = parser.GetArgument(name);
        var match = arg.match(/^\s*\\rm\s+([a-zA-Z0-9 ]+)$/);
        if (match) {
            def['mathvariant'] = TexConstants_js_1.TexConstant.Variant.NORMAL;
            node = parser.create('token', 'mi', def, match[1]);
        }
        else {
            parsed = new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml();
            node = parser.create('node', 'TeXAtom', [parsed], def);
        }
        mml = parser.itemFactory.create('fn', node);
    }
    else {
        parsed = parser.ParseArg(name);
        mml = parser.create('node', 'TeXAtom', [parsed], def);
    }
    parser.Push(mml);
};
BaseMethods.MmlToken = function (parser, name) {
    var kind = parser.GetArgument(name);
    var attr = parser.GetBrackets(name, '').replace(/^\s+/, '');
    var text = parser.GetArgument(name);
    var def = {};
    var keep = [];
    var node;
    try {
        node = parser.create('node', kind);
    }
    catch (e) {
        node = null;
    }
    if (!node || !node.isToken) {
        throw new TexError_js_1.default('NotMathMLToken', '%1 is not a token element', kind);
    }
    while (attr !== '') {
        var match = attr.match(/^([a-z]+)\s*=\s*('[^']*'|"[^"]*"|[^ ,]*)\s*,?\s*/i);
        if (!match) {
            throw new TexError_js_1.default('InvalidMathMLAttr', 'Invalid MathML attribute: %1', attr);
        }
        if (!node.attributes.hasDefault(match[1]) && !MmlTokenAllow[match[1]]) {
            throw new TexError_js_1.default('UnknownAttrForElement', '%1 is not a recognized attribute for %2', match[1], kind);
        }
        var value = ParseUtil_js_1.default.MmlFilterAttribute(parser, match[1], match[2].replace(/^(['"])(.*)\1$/, '$2'));
        if (value) {
            if (value.toLowerCase() === 'true') {
                value = true;
            }
            else if (value.toLowerCase() === 'false') {
                value = false;
            }
            def[match[1]] = value;
            keep.push(match[1]);
        }
        attr = attr.substr(match[0].length);
    }
    if (keep.length) {
        def['mjx-keep-attrs'] = keep.join(' ');
    }
    var textNode = parser.create('text', text);
    node.appendChild(textNode);
    NodeUtil_js_1.default.setProperties(node, def);
    parser.Push(node);
};
BaseMethods.Strut = function (parser, _name) {
    var row = parser.create('node', 'mrow');
    var padded = parser.create('node', 'mpadded', [row], { height: '8.6pt', depth: '3pt', width: 0 });
    parser.Push(padded);
};
BaseMethods.Phantom = function (parser, name, v, h) {
    var box = parser.create('node', 'mphantom', [parser.ParseArg(name)]);
    if (v || h) {
        box = parser.create('node', 'mpadded', [box]);
        if (h) {
            NodeUtil_js_1.default.setAttribute(box, 'height', 0);
            NodeUtil_js_1.default.setAttribute(box, 'depth', 0);
        }
        if (v) {
            NodeUtil_js_1.default.setAttribute(box, 'width', 0);
        }
    }
    var atom = parser.create('node', 'TeXAtom', [box]);
    parser.Push(atom);
};
BaseMethods.Smash = function (parser, name) {
    var bt = ParseUtil_js_1.default.trimSpaces(parser.GetBrackets(name, ''));
    var smash = parser.create('node', 'mpadded', [parser.ParseArg(name)]);
    switch (bt) {
        case 'b':
            NodeUtil_js_1.default.setAttribute(smash, 'depth', 0);
            break;
        case 't':
            NodeUtil_js_1.default.setAttribute(smash, 'height', 0);
            break;
        default:
            NodeUtil_js_1.default.setAttribute(smash, 'height', 0);
            NodeUtil_js_1.default.setAttribute(smash, 'depth', 0);
    }
    var atom = parser.create('node', 'TeXAtom', [smash]);
    parser.Push(atom);
};
BaseMethods.Lap = function (parser, name) {
    var mml = parser.create('node', 'mpadded', [parser.ParseArg(name)], { width: 0 });
    if (name === '\\llap') {
        NodeUtil_js_1.default.setAttribute(mml, 'lspace', '-1width');
    }
    var atom = parser.create('node', 'TeXAtom', [mml]);
    parser.Push(atom);
};
BaseMethods.RaiseLower = function (parser, name) {
    var h = parser.GetDimen(name);
    var item = parser.itemFactory.create('position').setProperties({ name: parser.currentCS, move: 'vertical' });
    if (h.charAt(0) === '-') {
        h = h.slice(1);
        name = name.substr(1) === 'raise' ? '\\lower' : '\\raise';
    }
    if (name === '\\lower') {
        item.setProperty('dh', '-' + h);
        item.setProperty('dd', '+' + h);
    }
    else {
        item.setProperty('dh', '+' + h);
        item.setProperty('dd', '-' + h);
    }
    parser.Push(item);
};
BaseMethods.MoveLeftRight = function (parser, name) {
    var h = parser.GetDimen(name);
    var nh = (h.charAt(0) === '-' ? h.slice(1) : '-' + h);
    if (name === '\\moveleft') {
        var tmp = h;
        h = nh;
        nh = tmp;
    }
    parser.Push(parser.itemFactory.create('position').setProperties({
        name: parser.currentCS, move: 'horizontal',
        left: parser.create('node', 'mspace', [], { width: h }),
        right: parser.create('node', 'mspace', [], { width: nh })
    }));
};
BaseMethods.Hskip = function (parser, name) {
    var node = parser.create('node', 'mspace', [], { width: parser.GetDimen(name) });
    parser.Push(node);
};
BaseMethods.Nonscript = function (parser, _name) {
    parser.Push(parser.itemFactory.create('nonscript'));
};
BaseMethods.Rule = function (parser, name, style) {
    var w = parser.GetDimen(name), h = parser.GetDimen(name), d = parser.GetDimen(name);
    var def = { width: w, height: h, depth: d };
    if (style !== 'blank') {
        def['mathbackground'] = (parser.stack.env['color'] || 'black');
    }
    var node = parser.create('node', 'mspace', [], def);
    parser.Push(node);
};
BaseMethods.rule = function (parser, name) {
    var v = parser.GetBrackets(name), w = parser.GetDimen(name), h = parser.GetDimen(name);
    var mml = parser.create('node', 'mspace', [], {
        width: w, height: h,
        mathbackground: (parser.stack.env['color'] || 'black')
    });
    if (v) {
        mml = parser.create('node', 'mpadded', [mml], { voffset: v });
        if (v.match(/^\-/)) {
            NodeUtil_js_1.default.setAttribute(mml, 'height', v);
            NodeUtil_js_1.default.setAttribute(mml, 'depth', '+' + v.substr(1));
        }
        else {
            NodeUtil_js_1.default.setAttribute(mml, 'height', '+' + v);
        }
    }
    parser.Push(mml);
};
BaseMethods.MakeBig = function (parser, name, mclass, size) {
    size *= P_HEIGHT;
    var sizeStr = String(size).replace(/(\.\d\d\d).+/, '$1') + 'em';
    var delim = parser.GetDelimiter(name, true);
    var mo = parser.create('token', 'mo', {
        minsize: sizeStr, maxsize: sizeStr,
        fence: true, stretchy: true, symmetric: true
    }, delim);
    var node = parser.create('node', 'TeXAtom', [mo], { texClass: mclass });
    parser.Push(node);
};
BaseMethods.BuildRel = function (parser, name) {
    var top = parser.ParseUpTo(name, '\\over');
    var bot = parser.ParseArg(name);
    var node = parser.create('node', 'munderover');
    NodeUtil_js_1.default.setChild(node, 0, bot);
    NodeUtil_js_1.default.setChild(node, 1, null);
    NodeUtil_js_1.default.setChild(node, 2, top);
    var atom = parser.create('node', 'TeXAtom', [node], { texClass: MmlNode_js_1.TEXCLASS.REL });
    parser.Push(atom);
};
BaseMethods.HBox = function (parser, name, style, font) {
    parser.PushAll(ParseUtil_js_1.default.internalMath(parser, parser.GetArgument(name), style, font));
};
BaseMethods.FBox = function (parser, name) {
    var internal = ParseUtil_js_1.default.internalMath(parser, parser.GetArgument(name));
    var node = parser.create('node', 'menclose', internal, { notation: 'box' });
    parser.Push(node);
};
BaseMethods.FrameBox = function (parser, name) {
    var width = parser.GetBrackets(name);
    var pos = parser.GetBrackets(name) || 'c';
    var mml = ParseUtil_js_1.default.internalMath(parser, parser.GetArgument(name));
    if (width) {
        mml = [parser.create('node', 'mpadded', mml, {
                width: width,
                'data-align': (0, Options_js_1.lookup)(pos, { l: 'left', r: 'right' }, 'center')
            })];
    }
    var node = parser.create('node', 'TeXAtom', [parser.create('node', 'menclose', mml, { notation: 'box' })], { texClass: MmlNode_js_1.TEXCLASS.ORD });
    parser.Push(node);
};
BaseMethods.Not = function (parser, _name) {
    parser.Push(parser.itemFactory.create('not'));
};
BaseMethods.Dots = function (parser, _name) {
    var ldotsEntity = NodeUtil_js_1.default.createEntity('2026');
    var cdotsEntity = NodeUtil_js_1.default.createEntity('22EF');
    var ldots = parser.create('token', 'mo', { stretchy: false }, ldotsEntity);
    var cdots = parser.create('token', 'mo', { stretchy: false }, cdotsEntity);
    parser.Push(parser.itemFactory.create('dots').setProperties({
        ldots: ldots,
        cdots: cdots
    }));
};
BaseMethods.Matrix = function (parser, _name, open, close, align, spacing, vspacing, style, cases, numbered) {
    var c = parser.GetNext();
    if (c === '') {
        throw new TexError_js_1.default('MissingArgFor', 'Missing argument for %1', parser.currentCS);
    }
    if (c === '{') {
        parser.i++;
    }
    else {
        parser.string = c + '}' + parser.string.slice(parser.i + 1);
        parser.i = 0;
    }
    var array = parser.itemFactory.create('array').setProperty('requireClose', true);
    array.arraydef = {
        rowspacing: (vspacing || '4pt'),
        columnspacing: (spacing || '1em')
    };
    if (cases) {
        array.setProperty('isCases', true);
    }
    if (numbered) {
        array.setProperty('isNumbered', true);
        array.arraydef.side = numbered;
    }
    if (open || close) {
        array.setProperty('open', open);
        array.setProperty('close', close);
    }
    if (style === 'D') {
        array.arraydef.displaystyle = true;
    }
    if (align != null) {
        array.arraydef.columnalign = align;
    }
    parser.Push(array);
};
BaseMethods.Entry = function (parser, name) {
    parser.Push(parser.itemFactory.create('cell').setProperties({ isEntry: true, name: name }));
    var top = parser.stack.Top();
    var env = top.getProperty('casesEnv');
    var cases = top.getProperty('isCases');
    if (!cases && !env)
        return;
    var str = parser.string;
    var braces = 0, close = -1, i = parser.i, m = str.length;
    var end = (env ? new RegExp("^\\\\end\\s*\\{".concat(env.replace(/\*/, '\\*'), "\\}")) : null);
    while (i < m) {
        var c = str.charAt(i);
        if (c === '{') {
            braces++;
            i++;
        }
        else if (c === '}') {
            if (braces === 0) {
                m = 0;
            }
            else {
                braces--;
                if (braces === 0 && close < 0) {
                    close = i - parser.i;
                }
                i++;
            }
        }
        else if (c === '&' && braces === 0) {
            throw new TexError_js_1.default('ExtraAlignTab', 'Extra alignment tab in \\cases text');
        }
        else if (c === '\\') {
            var rest = str.substr(i);
            if (rest.match(/^((\\cr)[^a-zA-Z]|\\\\)/) || (end && rest.match(end))) {
                m = 0;
            }
            else {
                i += 2;
            }
        }
        else {
            i++;
        }
    }
    var text = str.substr(parser.i, i - parser.i);
    if (!text.match(/^\s*\\text[^a-zA-Z]/) || close !== text.replace(/\s+$/, '').length - 1) {
        var internal = ParseUtil_js_1.default.internalMath(parser, ParseUtil_js_1.default.trimSpaces(text), 0);
        parser.PushAll(internal);
        parser.i = i;
    }
};
BaseMethods.Cr = function (parser, name) {
    parser.Push(parser.itemFactory.create('cell').setProperties({ isCR: true, name: name }));
};
BaseMethods.CrLaTeX = function (parser, name, nobrackets) {
    if (nobrackets === void 0) { nobrackets = false; }
    var n;
    if (!nobrackets) {
        if (parser.string.charAt(parser.i) === '*') {
            parser.i++;
        }
        if (parser.string.charAt(parser.i) === '[') {
            var dim = parser.GetBrackets(name, '');
            var _a = __read(ParseUtil_js_1.default.matchDimen(dim), 2), value = _a[0], unit = _a[1];
            if (dim && !value) {
                throw new TexError_js_1.default('BracketMustBeDimension', 'Bracket argument to %1 must be a dimension', parser.currentCS);
            }
            n = value + unit;
        }
    }
    parser.Push(parser.itemFactory.create('cell').setProperties({ isCR: true, name: name, linebreak: true }));
    var top = parser.stack.Top();
    var node;
    if (top instanceof sitem.ArrayItem) {
        if (n) {
            top.addRowSpacing(n);
        }
    }
    else {
        if (n) {
            node = parser.create('node', 'mspace', [], { depth: n });
            parser.Push(node);
        }
        node = parser.create('node', 'mspace', [], { linebreak: TexConstants_js_1.TexConstant.LineBreak.NEWLINE });
        parser.Push(node);
    }
};
BaseMethods.HLine = function (parser, _name, style) {
    if (style == null) {
        style = 'solid';
    }
    var top = parser.stack.Top();
    if (!(top instanceof sitem.ArrayItem) || top.Size()) {
        throw new TexError_js_1.default('Misplaced', 'Misplaced %1', parser.currentCS);
    }
    if (!top.table.length) {
        top.frame.push('top');
    }
    else {
        var lines = (top.arraydef['rowlines'] ? top.arraydef['rowlines'].split(/ /) : []);
        while (lines.length < top.table.length) {
            lines.push('none');
        }
        lines[top.table.length - 1] = style;
        top.arraydef['rowlines'] = lines.join(' ');
    }
};
BaseMethods.HFill = function (parser, _name) {
    var top = parser.stack.Top();
    if (top instanceof sitem.ArrayItem) {
        top.hfill.push(top.Size());
    }
    else {
        throw new TexError_js_1.default('UnsupportedHFill', 'Unsupported use of %1', parser.currentCS);
    }
};
BaseMethods.BeginEnd = function (parser, name) {
    var env = parser.GetArgument(name);
    if (env.match(/\\/i)) {
        throw new TexError_js_1.default('InvalidEnv', 'Invalid environment name \'%1\'', env);
    }
    var macro = parser.configuration.handlers.get('environment').lookup(env);
    if (macro && name === '\\end') {
        if (!macro.args[0]) {
            var mml = parser.itemFactory.create('end').setProperty('name', env);
            parser.Push(mml);
            return;
        }
        parser.stack.env['closing'] = env;
    }
    ParseUtil_js_1.default.checkMaxMacros(parser, false);
    parser.parse('environment', [parser, env]);
};
BaseMethods.Array = function (parser, begin, open, close, align, spacing, vspacing, style, raggedHeight) {
    if (!align) {
        align = parser.GetArgument('\\begin{' + begin.getName() + '}');
    }
    var lines = ('c' + align).replace(/[^clr|:]/g, '').replace(/[^|:]([|:])+/g, '$1');
    align = align.replace(/[^clr]/g, '').split('').join(' ');
    align = align.replace(/l/g, 'left').replace(/r/g, 'right').replace(/c/g, 'center');
    var array = parser.itemFactory.create('array');
    array.arraydef = {
        columnalign: align,
        columnspacing: (spacing || '1em'),
        rowspacing: (vspacing || '4pt')
    };
    if (lines.match(/[|:]/)) {
        if (lines.charAt(0).match(/[|:]/)) {
            array.frame.push('left');
            array.dashed = lines.charAt(0) === ':';
        }
        if (lines.charAt(lines.length - 1).match(/[|:]/)) {
            array.frame.push('right');
        }
        lines = lines.substr(1, lines.length - 2);
        array.arraydef.columnlines =
            lines.split('').join(' ').replace(/[^|: ]/g, 'none').replace(/\|/g, 'solid').replace(/:/g, 'dashed');
    }
    if (open) {
        array.setProperty('open', parser.convertDelimiter(open));
    }
    if (close) {
        array.setProperty('close', parser.convertDelimiter(close));
    }
    if ((style || '').charAt(1) === '\'') {
        array.arraydef['data-cramped'] = true;
        style = style.charAt(0);
    }
    if (style === 'D') {
        array.arraydef['displaystyle'] = true;
    }
    else if (style) {
        array.arraydef['displaystyle'] = false;
    }
    if (style === 'S') {
        array.arraydef['scriptlevel'] = 1;
    }
    if (raggedHeight) {
        array.arraydef['useHeight'] = false;
    }
    parser.Push(begin);
    return array;
};
BaseMethods.AlignedArray = function (parser, begin) {
    var align = parser.GetBrackets('\\begin{' + begin.getName() + '}');
    var item = BaseMethods.Array(parser, begin);
    return ParseUtil_js_1.default.setArrayAlign(item, align);
};
BaseMethods.Equation = function (parser, begin, numbered) {
    parser.Push(begin);
    ParseUtil_js_1.default.checkEqnEnv(parser);
    return parser.itemFactory.create('equation', numbered).
        setProperty('name', begin.getName());
};
BaseMethods.EqnArray = function (parser, begin, numbered, taggable, align, spacing) {
    parser.Push(begin);
    if (taggable) {
        ParseUtil_js_1.default.checkEqnEnv(parser);
    }
    align = align.replace(/[^clr]/g, '').split('').join(' ');
    align = align.replace(/l/g, 'left').replace(/r/g, 'right').replace(/c/g, 'center');
    var newItem = parser.itemFactory.create('eqnarray', begin.getName(), numbered, taggable, parser.stack.global);
    newItem.arraydef = {
        displaystyle: true,
        columnalign: align,
        columnspacing: (spacing || '1em'),
        rowspacing: '3pt',
        side: parser.options['tagSide'],
        minlabelspacing: parser.options['tagIndent']
    };
    return newItem;
};
BaseMethods.HandleNoTag = function (parser, _name) {
    parser.tags.notag();
};
BaseMethods.HandleLabel = function (parser, name) {
    var label = parser.GetArgument(name);
    if (label === '') {
        return;
    }
    if (!parser.tags.refUpdate) {
        if (parser.tags.label) {
            throw new TexError_js_1.default('MultipleCommand', 'Multiple %1', parser.currentCS);
        }
        parser.tags.label = label;
        if ((parser.tags.allLabels[label] || parser.tags.labels[label]) && !parser.options['ignoreDuplicateLabels']) {
            throw new TexError_js_1.default('MultipleLabel', 'Label \'%1\' multiply defined', label);
        }
        parser.tags.labels[label] = new Tags_js_1.Label();
    }
};
BaseMethods.HandleRef = function (parser, name, eqref) {
    var label = parser.GetArgument(name);
    var ref = parser.tags.allLabels[label] || parser.tags.labels[label];
    if (!ref) {
        if (!parser.tags.refUpdate) {
            parser.tags.redo = true;
        }
        ref = new Tags_js_1.Label();
    }
    var tag = ref.tag;
    if (eqref) {
        tag = parser.tags.formatTag(tag);
    }
    var node = parser.create('node', 'mrow', ParseUtil_js_1.default.internalMath(parser, tag), {
        href: parser.tags.formatUrl(ref.id, parser.options.baseURL), 'class': 'MathJax_ref'
    });
    parser.Push(node);
};
BaseMethods.Macro = function (parser, name, macro, argcount, def) {
    if (argcount) {
        var args = [];
        if (def != null) {
            var optional = parser.GetBrackets(name);
            args.push(optional == null ? def : optional);
        }
        for (var i = args.length; i < argcount; i++) {
            args.push(parser.GetArgument(name));
        }
        macro = ParseUtil_js_1.default.substituteArgs(parser, args, macro);
    }
    parser.string = ParseUtil_js_1.default.addArgs(parser, macro, parser.string.slice(parser.i));
    parser.i = 0;
    ParseUtil_js_1.default.checkMaxMacros(parser);
};
BaseMethods.MathChoice = function (parser, name) {
    var D = parser.ParseArg(name);
    var T = parser.ParseArg(name);
    var S = parser.ParseArg(name);
    var SS = parser.ParseArg(name);
    parser.Push(parser.create('node', 'MathChoice', [D, T, S, SS]));
};
exports["default"] = BaseMethods;
//# sourceMappingURL=BaseMethods.js.map

/***/ }),

/***/ 27535:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BboxConfiguration = exports.BboxMethods = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
exports.BboxMethods = {};
exports.BboxMethods.BBox = function (parser, name) {
    var bbox = parser.GetBrackets(name, '');
    var math = parser.ParseArg(name);
    var parts = bbox.split(/,/);
    var def, background, style;
    for (var i = 0, m = parts.length; i < m; i++) {
        var part = parts[i].trim();
        var match = part.match(/^(\.\d+|\d+(\.\d*)?)(pt|em|ex|mu|px|in|cm|mm)$/);
        if (match) {
            if (def) {
                throw new TexError_js_1.default('MultipleBBoxProperty', '%1 specified twice in %2', 'Padding', name);
            }
            var pad = BBoxPadding(match[1] + match[3]);
            if (pad) {
                def = {
                    height: '+' + pad,
                    depth: '+' + pad,
                    lspace: pad,
                    width: '+' + (2 * parseInt(match[1], 10)) + match[3]
                };
            }
        }
        else if (part.match(/^([a-z0-9]+|\#[0-9a-f]{6}|\#[0-9a-f]{3})$/i)) {
            if (background) {
                throw new TexError_js_1.default('MultipleBBoxProperty', '%1 specified twice in %2', 'Background', name);
            }
            background = part;
        }
        else if (part.match(/^[-a-z]+:/i)) {
            if (style) {
                throw new TexError_js_1.default('MultipleBBoxProperty', '%1 specified twice in %2', 'Style', name);
            }
            style = BBoxStyle(part);
        }
        else if (part !== '') {
            throw new TexError_js_1.default('InvalidBBoxProperty', '"%1" doesn\'t look like a color, a padding dimension, or a style', part);
        }
    }
    if (def) {
        math = parser.create('node', 'mpadded', [math], def);
    }
    if (background || style) {
        def = {};
        if (background) {
            Object.assign(def, { mathbackground: background });
        }
        if (style) {
            Object.assign(def, { style: style });
        }
        math = parser.create('node', 'mstyle', [math], def);
    }
    parser.Push(math);
};
var BBoxStyle = function (styles) {
    return styles;
};
var BBoxPadding = function (pad) {
    return pad;
};
new SymbolMap_js_1.CommandMap('bbox', { bbox: 'BBox' }, exports.BboxMethods);
exports.BboxConfiguration = Configuration_js_1.Configuration.create('bbox', { handler: { macro: ['bbox'] } });
//# sourceMappingURL=BboxConfiguration.js.map

/***/ }),

/***/ 9146:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoldsymbolConfiguration = exports.rewriteBoldTokens = exports.createBoldToken = exports.BoldsymbolMethods = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var TexConstants_js_1 = __webpack_require__(48948);
var SymbolMap_js_1 = __webpack_require__(92715);
var NodeFactory_js_1 = __webpack_require__(38624);
var BOLDVARIANT = {};
BOLDVARIANT[TexConstants_js_1.TexConstant.Variant.NORMAL] = TexConstants_js_1.TexConstant.Variant.BOLD;
BOLDVARIANT[TexConstants_js_1.TexConstant.Variant.ITALIC] = TexConstants_js_1.TexConstant.Variant.BOLDITALIC;
BOLDVARIANT[TexConstants_js_1.TexConstant.Variant.FRAKTUR] = TexConstants_js_1.TexConstant.Variant.BOLDFRAKTUR;
BOLDVARIANT[TexConstants_js_1.TexConstant.Variant.SCRIPT] = TexConstants_js_1.TexConstant.Variant.BOLDSCRIPT;
BOLDVARIANT[TexConstants_js_1.TexConstant.Variant.SANSSERIF] = TexConstants_js_1.TexConstant.Variant.BOLDSANSSERIF;
BOLDVARIANT['-tex-calligraphic'] = '-tex-bold-calligraphic';
BOLDVARIANT['-tex-oldstyle'] = '-tex-bold-oldstyle';
BOLDVARIANT['-tex-mathit'] = TexConstants_js_1.TexConstant.Variant.BOLDITALIC;
exports.BoldsymbolMethods = {};
exports.BoldsymbolMethods.Boldsymbol = function (parser, name) {
    var boldsymbol = parser.stack.env['boldsymbol'];
    parser.stack.env['boldsymbol'] = true;
    var mml = parser.ParseArg(name);
    parser.stack.env['boldsymbol'] = boldsymbol;
    parser.Push(mml);
};
new SymbolMap_js_1.CommandMap('boldsymbol', { boldsymbol: 'Boldsymbol' }, exports.BoldsymbolMethods);
function createBoldToken(factory, kind, def, text) {
    var token = NodeFactory_js_1.NodeFactory.createToken(factory, kind, def, text);
    if (kind !== 'mtext' &&
        factory.configuration.parser.stack.env['boldsymbol']) {
        NodeUtil_js_1.default.setProperty(token, 'fixBold', true);
        factory.configuration.addNode('fixBold', token);
    }
    return token;
}
exports.createBoldToken = createBoldToken;
function rewriteBoldTokens(arg) {
    var e_1, _a;
    try {
        for (var _b = __values(arg.data.getList('fixBold')), _c = _b.next(); !_c.done; _c = _b.next()) {
            var node = _c.value;
            if (NodeUtil_js_1.default.getProperty(node, 'fixBold')) {
                var variant = NodeUtil_js_1.default.getAttribute(node, 'mathvariant');
                if (variant == null) {
                    NodeUtil_js_1.default.setAttribute(node, 'mathvariant', TexConstants_js_1.TexConstant.Variant.BOLD);
                }
                else {
                    NodeUtil_js_1.default.setAttribute(node, 'mathvariant', BOLDVARIANT[variant] || variant);
                }
                NodeUtil_js_1.default.removeProperties(node, 'fixBold');
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
}
exports.rewriteBoldTokens = rewriteBoldTokens;
exports.BoldsymbolConfiguration = Configuration_js_1.Configuration.create('boldsymbol', {
    handler: { macro: ['boldsymbol'] },
    nodes: { 'token': createBoldToken },
    postprocessors: [rewriteBoldTokens]
});
//# sourceMappingURL=BoldsymbolConfiguration.js.map

/***/ }),

/***/ 17151:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BraketConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var BraketItems_js_1 = __webpack_require__(60555);
__webpack_require__(46857);
exports.BraketConfiguration = Configuration_js_1.Configuration.create('braket', {
    handler: {
        character: ['Braket-characters'],
        macro: ['Braket-macros']
    },
    items: (_a = {},
        _a[BraketItems_js_1.BraketItem.prototype.kind] = BraketItems_js_1.BraketItem,
        _a)
});
//# sourceMappingURL=BraketConfiguration.js.map

/***/ }),

/***/ 60555:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BraketItem = void 0;
var StackItem_js_1 = __webpack_require__(34726);
var MmlNode_js_1 = __webpack_require__(18426);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var BraketItem = (function (_super) {
    __extends(BraketItem, _super);
    function BraketItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BraketItem.prototype, "kind", {
        get: function () {
            return 'braket';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BraketItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    BraketItem.prototype.checkItem = function (item) {
        if (item.isKind('close')) {
            return [[this.factory.create('mml', this.toMml())], true];
        }
        if (item.isKind('mml')) {
            this.Push(item.toMml());
            if (this.getProperty('single')) {
                return [[this.toMml()], true];
            }
            return StackItem_js_1.BaseItem.fail;
        }
        return _super.prototype.checkItem.call(this, item);
    };
    BraketItem.prototype.toMml = function () {
        var inner = _super.prototype.toMml.call(this);
        var open = this.getProperty('open');
        var close = this.getProperty('close');
        if (this.getProperty('stretchy')) {
            return ParseUtil_js_1.default.fenced(this.factory.configuration, open, inner, close);
        }
        var attrs = { fence: true, stretchy: false, symmetric: true, texClass: MmlNode_js_1.TEXCLASS.OPEN };
        var openNode = this.create('token', 'mo', attrs, open);
        attrs.texClass = MmlNode_js_1.TEXCLASS.CLOSE;
        var closeNode = this.create('token', 'mo', attrs, close);
        var mrow = this.create('node', 'mrow', [openNode, inner, closeNode], { open: open, close: close, texClass: MmlNode_js_1.TEXCLASS.INNER });
        return mrow;
    };
    return BraketItem;
}(StackItem_js_1.BaseItem));
exports.BraketItem = BraketItem;
//# sourceMappingURL=BraketItems.js.map

/***/ }),

/***/ 46857:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SymbolMap_js_1 = __webpack_require__(92715);
var BraketMethods_js_1 = __importDefault(__webpack_require__(17960));
new SymbolMap_js_1.CommandMap('Braket-macros', {
    bra: ['Macro', '{\\langle {#1} \\vert}', 1],
    ket: ['Macro', '{\\vert {#1} \\rangle}', 1],
    braket: ['Braket', '\u27E8', '\u27E9', false, Infinity],
    'set': ['Braket', '{', '}', false, 1],
    Bra: ['Macro', '{\\left\\langle {#1} \\right\\vert}', 1],
    Ket: ['Macro', '{\\left\\vert {#1} \\right\\rangle}', 1],
    Braket: ['Braket', '\u27E8', '\u27E9', true, Infinity],
    Set: ['Braket', '{', '}', true, 1],
    ketbra: ['Macro', '{\\vert {#1} \\rangle\\langle {#2} \\vert}', 2],
    Ketbra: ['Macro', '{\\left\\vert {#1} \\right\\rangle\\left\\langle {#2} \\right\\vert}', 2],
    '|': 'Bar'
}, BraketMethods_js_1.default);
new SymbolMap_js_1.MacroMap('Braket-characters', {
    '|': 'Bar'
}, BraketMethods_js_1.default);
//# sourceMappingURL=BraketMappings.js.map

/***/ }),

/***/ 17960:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
var MmlNode_js_1 = __webpack_require__(18426);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var BraketMethods = {};
BraketMethods.Macro = BaseMethods_js_1.default.Macro;
BraketMethods.Braket = function (parser, _name, open, close, stretchy, barmax) {
    var next = parser.GetNext();
    if (next === '') {
        throw new TexError_js_1.default('MissingArgFor', 'Missing argument for %1', parser.currentCS);
    }
    var single = true;
    if (next === '{') {
        parser.i++;
        single = false;
    }
    parser.Push(parser.itemFactory.create('braket')
        .setProperties({ barmax: barmax, barcount: 0, open: open,
        close: close, stretchy: stretchy, single: single }));
};
BraketMethods.Bar = function (parser, name) {
    var c = name === '|' ? '|' : '\u2225';
    var top = parser.stack.Top();
    if (top.kind !== 'braket' ||
        top.getProperty('barcount') >= top.getProperty('barmax')) {
        var mml = parser.create('token', 'mo', { texClass: MmlNode_js_1.TEXCLASS.ORD, stretchy: false }, c);
        parser.Push(mml);
        return;
    }
    if (c === '|' && parser.GetNext() === '|') {
        parser.i++;
        c = '\u2225';
    }
    var stretchy = top.getProperty('stretchy');
    if (!stretchy) {
        var node_1 = parser.create('token', 'mo', { stretchy: false, braketbar: true }, c);
        parser.Push(node_1);
        return;
    }
    var node = parser.create('node', 'TeXAtom', [], { texClass: MmlNode_js_1.TEXCLASS.CLOSE });
    parser.Push(node);
    top.setProperty('barcount', top.getProperty('barcount') + 1);
    node = parser.create('token', 'mo', { stretchy: true, braketbar: true }, c);
    parser.Push(node);
    node = parser.create('node', 'TeXAtom', [], { texClass: MmlNode_js_1.TEXCLASS.OPEN });
    parser.Push(node);
};
exports["default"] = BraketMethods;
//# sourceMappingURL=BraketMethods.js.map

/***/ }),

/***/ 2518:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BussproofsConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var BussproofsItems_js_1 = __webpack_require__(36833);
var BussproofsUtil_js_1 = __webpack_require__(15641);
__webpack_require__(91336);
exports.BussproofsConfiguration = Configuration_js_1.Configuration.create('bussproofs', {
    handler: {
        macro: ['Bussproofs-macros'],
        environment: ['Bussproofs-environments']
    },
    items: (_a = {},
        _a[BussproofsItems_js_1.ProofTreeItem.prototype.kind] = BussproofsItems_js_1.ProofTreeItem,
        _a),
    preprocessors: [
        [BussproofsUtil_js_1.saveDocument, 1]
    ],
    postprocessors: [
        [BussproofsUtil_js_1.clearDocument, 3],
        [BussproofsUtil_js_1.makeBsprAttributes, 2],
        [BussproofsUtil_js_1.balanceRules, 1]
    ]
});
//# sourceMappingURL=BussproofsConfiguration.js.map

/***/ }),

/***/ 36833:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProofTreeItem = void 0;
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var StackItem_js_1 = __webpack_require__(34726);
var Stack_js_1 = __importDefault(__webpack_require__(14577));
var BussproofsUtil = __importStar(__webpack_require__(15641));
var ProofTreeItem = (function (_super) {
    __extends(ProofTreeItem, _super);
    function ProofTreeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leftLabel = null;
        _this.rigthLabel = null;
        _this.innerStack = new Stack_js_1.default(_this.factory, {}, true);
        return _this;
    }
    Object.defineProperty(ProofTreeItem.prototype, "kind", {
        get: function () {
            return 'proofTree';
        },
        enumerable: false,
        configurable: true
    });
    ProofTreeItem.prototype.checkItem = function (item) {
        if (item.isKind('end') && item.getName() === 'prooftree') {
            var node = this.toMml();
            BussproofsUtil.setProperty(node, 'proof', true);
            return [[this.factory.create('mml', node), item], true];
        }
        if (item.isKind('stop')) {
            throw new TexError_js_1.default('EnvMissingEnd', 'Missing \\end{%1}', this.getName());
        }
        this.innerStack.Push(item);
        return StackItem_js_1.BaseItem.fail;
    };
    ProofTreeItem.prototype.toMml = function () {
        var tree = _super.prototype.toMml.call(this);
        var start = this.innerStack.Top();
        if (start.isKind('start') && !start.Size()) {
            return tree;
        }
        this.innerStack.Push(this.factory.create('stop'));
        var prefix = this.innerStack.Top().toMml();
        return this.create('node', 'mrow', [prefix, tree], {});
    };
    return ProofTreeItem;
}(StackItem_js_1.BaseItem));
exports.ProofTreeItem = ProofTreeItem;
//# sourceMappingURL=BussproofsItems.js.map

/***/ }),

/***/ 91336:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var BussproofsMethods_js_1 = __importDefault(__webpack_require__(55837));
var ParseMethods_js_1 = __importDefault(__webpack_require__(96004));
var SymbolMap_js_1 = __webpack_require__(92715);
new SymbolMap_js_1.CommandMap('Bussproofs-macros', {
    AxiomC: 'Axiom',
    UnaryInfC: ['Inference', 1],
    BinaryInfC: ['Inference', 2],
    TrinaryInfC: ['Inference', 3],
    QuaternaryInfC: ['Inference', 4],
    QuinaryInfC: ['Inference', 5],
    RightLabel: ['Label', 'right'],
    LeftLabel: ['Label', 'left'],
    AXC: 'Axiom',
    UIC: ['Inference', 1],
    BIC: ['Inference', 2],
    TIC: ['Inference', 3],
    RL: ['Label', 'right'],
    LL: ['Label', 'left'],
    noLine: ['SetLine', 'none', false],
    singleLine: ['SetLine', 'solid', false],
    solidLine: ['SetLine', 'solid', false],
    dashedLine: ['SetLine', 'dashed', false],
    alwaysNoLine: ['SetLine', 'none', true],
    alwaysSingleLine: ['SetLine', 'solid', true],
    alwaysSolidLine: ['SetLine', 'solid', true],
    alwaysDashedLine: ['SetLine', 'dashed', true],
    rootAtTop: ['RootAtTop', true],
    alwaysRootAtTop: ['RootAtTop', true],
    rootAtBottom: ['RootAtTop', false],
    alwaysRootAtBottom: ['RootAtTop', false],
    fCenter: 'FCenter',
    Axiom: 'AxiomF',
    UnaryInf: ['InferenceF', 1],
    BinaryInf: ['InferenceF', 2],
    TrinaryInf: ['InferenceF', 3],
    QuaternaryInf: ['InferenceF', 4],
    QuinaryInf: ['InferenceF', 5]
}, BussproofsMethods_js_1.default);
new SymbolMap_js_1.EnvironmentMap('Bussproofs-environments', ParseMethods_js_1.default.environment, {
    prooftree: ['Prooftree', null, false]
}, BussproofsMethods_js_1.default);
//# sourceMappingURL=BussproofsMappings.js.map

/***/ }),

/***/ 55837:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var BussproofsUtil = __importStar(__webpack_require__(15641));
var BussproofsMethods = {};
BussproofsMethods.Prooftree = function (parser, begin) {
    parser.Push(begin);
    var newItem = parser.itemFactory.create('proofTree').
        setProperties({ name: begin.getName(),
        line: 'solid', currentLine: 'solid', rootAtTop: false });
    return newItem;
};
BussproofsMethods.Axiom = function (parser, name) {
    var top = parser.stack.Top();
    if (top.kind !== 'proofTree') {
        throw new TexError_js_1.default('IllegalProofCommand', 'Proof commands only allowed in prooftree environment.');
    }
    var content = paddedContent(parser, parser.GetArgument(name));
    BussproofsUtil.setProperty(content, 'axiom', true);
    top.Push(content);
};
var paddedContent = function (parser, content) {
    var nodes = ParseUtil_js_1.default.internalMath(parser, ParseUtil_js_1.default.trimSpaces(content), 0);
    if (!nodes[0].childNodes[0].childNodes.length) {
        return parser.create('node', 'mrow', []);
    }
    var lpad = parser.create('node', 'mspace', [], { width: '.5ex' });
    var rpad = parser.create('node', 'mspace', [], { width: '.5ex' });
    return parser.create('node', 'mrow', __spreadArray(__spreadArray([lpad], __read(nodes), false), [rpad], false));
};
BussproofsMethods.Inference = function (parser, name, n) {
    var top = parser.stack.Top();
    if (top.kind !== 'proofTree') {
        throw new TexError_js_1.default('IllegalProofCommand', 'Proof commands only allowed in prooftree environment.');
    }
    if (top.Size() < n) {
        throw new TexError_js_1.default('BadProofTree', 'Proof tree badly specified.');
    }
    var rootAtTop = top.getProperty('rootAtTop');
    var childCount = (n === 1 && !top.Peek()[0].childNodes.length) ? 0 : n;
    var children = [];
    do {
        if (children.length) {
            children.unshift(parser.create('node', 'mtd', [], {}));
        }
        children.unshift(parser.create('node', 'mtd', [top.Pop()], { 'rowalign': (rootAtTop ? 'top' : 'bottom') }));
        n--;
    } while (n > 0);
    var row = parser.create('node', 'mtr', children, {});
    var table = parser.create('node', 'mtable', [row], { framespacing: '0 0' });
    var conclusion = paddedContent(parser, parser.GetArgument(name));
    var style = top.getProperty('currentLine');
    if (style !== top.getProperty('line')) {
        top.setProperty('currentLine', top.getProperty('line'));
    }
    var rule = createRule(parser, table, [conclusion], top.getProperty('left'), top.getProperty('right'), style, rootAtTop);
    top.setProperty('left', null);
    top.setProperty('right', null);
    BussproofsUtil.setProperty(rule, 'inference', childCount);
    parser.configuration.addNode('inference', rule);
    top.Push(rule);
};
function createRule(parser, premise, conclusions, left, right, style, rootAtTop) {
    var upper = parser.create('node', 'mtr', [parser.create('node', 'mtd', [premise], {})], {});
    var lower = parser.create('node', 'mtr', [parser.create('node', 'mtd', conclusions, {})], {});
    var rule = parser.create('node', 'mtable', rootAtTop ? [lower, upper] : [upper, lower], { align: 'top 2', rowlines: style, framespacing: '0 0' });
    BussproofsUtil.setProperty(rule, 'inferenceRule', rootAtTop ? 'up' : 'down');
    var leftLabel, rightLabel;
    if (left) {
        leftLabel = parser.create('node', 'mpadded', [left], { height: '+.5em', width: '+.5em', voffset: '-.15em' });
        BussproofsUtil.setProperty(leftLabel, 'prooflabel', 'left');
    }
    if (right) {
        rightLabel = parser.create('node', 'mpadded', [right], { height: '+.5em', width: '+.5em', voffset: '-.15em' });
        BussproofsUtil.setProperty(rightLabel, 'prooflabel', 'right');
    }
    var children, label;
    if (left && right) {
        children = [leftLabel, rule, rightLabel];
        label = 'both';
    }
    else if (left) {
        children = [leftLabel, rule];
        label = 'left';
    }
    else if (right) {
        children = [rule, rightLabel];
        label = 'right';
    }
    else {
        return rule;
    }
    rule = parser.create('node', 'mrow', children);
    BussproofsUtil.setProperty(rule, 'labelledRule', label);
    return rule;
}
BussproofsMethods.Label = function (parser, name, side) {
    var top = parser.stack.Top();
    if (top.kind !== 'proofTree') {
        throw new TexError_js_1.default('IllegalProofCommand', 'Proof commands only allowed in prooftree environment.');
    }
    var content = ParseUtil_js_1.default.internalMath(parser, parser.GetArgument(name), 0);
    var label = (content.length > 1) ?
        parser.create('node', 'mrow', content, {}) : content[0];
    top.setProperty(side, label);
};
BussproofsMethods.SetLine = function (parser, _name, style, always) {
    var top = parser.stack.Top();
    if (top.kind !== 'proofTree') {
        throw new TexError_js_1.default('IllegalProofCommand', 'Proof commands only allowed in prooftree environment.');
    }
    top.setProperty('currentLine', style);
    if (always) {
        top.setProperty('line', style);
    }
};
BussproofsMethods.RootAtTop = function (parser, _name, where) {
    var top = parser.stack.Top();
    if (top.kind !== 'proofTree') {
        throw new TexError_js_1.default('IllegalProofCommand', 'Proof commands only allowed in prooftree environment.');
    }
    top.setProperty('rootAtTop', where);
};
BussproofsMethods.AxiomF = function (parser, name) {
    var top = parser.stack.Top();
    if (top.kind !== 'proofTree') {
        throw new TexError_js_1.default('IllegalProofCommand', 'Proof commands only allowed in prooftree environment.');
    }
    var line = parseFCenterLine(parser, name);
    BussproofsUtil.setProperty(line, 'axiom', true);
    top.Push(line);
};
function parseFCenterLine(parser, name) {
    var dollar = parser.GetNext();
    if (dollar !== '$') {
        throw new TexError_js_1.default('IllegalUseOfCommand', 'Use of %1 does not match it\'s definition.', name);
    }
    parser.i++;
    var axiom = parser.GetUpTo(name, '$');
    if (axiom.indexOf('\\fCenter') === -1) {
        throw new TexError_js_1.default('IllegalUseOfCommand', 'Missing \\fCenter in %1.', name);
    }
    var _a = __read(axiom.split('\\fCenter'), 2), prem = _a[0], conc = _a[1];
    var premise = (new TexParser_js_1.default(prem, parser.stack.env, parser.configuration)).mml();
    var conclusion = (new TexParser_js_1.default(conc, parser.stack.env, parser.configuration)).mml();
    var fcenter = (new TexParser_js_1.default('\\fCenter', parser.stack.env, parser.configuration)).mml();
    var left = parser.create('node', 'mtd', [premise], {});
    var middle = parser.create('node', 'mtd', [fcenter], {});
    var right = parser.create('node', 'mtd', [conclusion], {});
    var row = parser.create('node', 'mtr', [left, middle, right], {});
    var table = parser.create('node', 'mtable', [row], { columnspacing: '.5ex', columnalign: 'center 2' });
    BussproofsUtil.setProperty(table, 'sequent', true);
    parser.configuration.addNode('sequent', row);
    return table;
}
BussproofsMethods.FCenter = function (_parser, _name) { };
BussproofsMethods.InferenceF = function (parser, name, n) {
    var top = parser.stack.Top();
    if (top.kind !== 'proofTree') {
        throw new TexError_js_1.default('IllegalProofCommand', 'Proof commands only allowed in prooftree environment.');
    }
    if (top.Size() < n) {
        throw new TexError_js_1.default('BadProofTree', 'Proof tree badly specified.');
    }
    var rootAtTop = top.getProperty('rootAtTop');
    var childCount = (n === 1 && !top.Peek()[0].childNodes.length) ? 0 : n;
    var children = [];
    do {
        if (children.length) {
            children.unshift(parser.create('node', 'mtd', [], {}));
        }
        children.unshift(parser.create('node', 'mtd', [top.Pop()], { 'rowalign': (rootAtTop ? 'top' : 'bottom') }));
        n--;
    } while (n > 0);
    var row = parser.create('node', 'mtr', children, {});
    var table = parser.create('node', 'mtable', [row], { framespacing: '0 0' });
    var conclusion = parseFCenterLine(parser, name);
    var style = top.getProperty('currentLine');
    if (style !== top.getProperty('line')) {
        top.setProperty('currentLine', top.getProperty('line'));
    }
    var rule = createRule(parser, table, [conclusion], top.getProperty('left'), top.getProperty('right'), style, rootAtTop);
    top.setProperty('left', null);
    top.setProperty('right', null);
    BussproofsUtil.setProperty(rule, 'inference', childCount);
    parser.configuration.addNode('inference', rule);
    top.Push(rule);
};
exports["default"] = BussproofsMethods;
//# sourceMappingURL=BussproofsMethods.js.map

/***/ }),

/***/ 15641:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clearDocument = exports.saveDocument = exports.makeBsprAttributes = exports.removeProperty = exports.getProperty = exports.setProperty = exports.balanceRules = void 0;
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var doc = null;
var item = null;
var getBBox = function (node) {
    item.root = node;
    var width = doc.outputJax.getBBox(item, doc).w;
    return width;
};
var getRule = function (node) {
    var i = 0;
    while (node && !NodeUtil_js_1.default.isType(node, 'mtable')) {
        if (NodeUtil_js_1.default.isType(node, 'text')) {
            return null;
        }
        if (NodeUtil_js_1.default.isType(node, 'mrow')) {
            node = node.childNodes[0];
            i = 0;
            continue;
        }
        node = node.parent.childNodes[i];
        i++;
    }
    return node;
};
var getPremises = function (rule, direction) {
    return rule.childNodes[direction === 'up' ? 1 : 0].childNodes[0].
        childNodes[0].childNodes[0].childNodes[0];
};
var getPremise = function (premises, n) {
    return premises.childNodes[n].childNodes[0].childNodes[0];
};
var firstPremise = function (premises) {
    return getPremise(premises, 0);
};
var lastPremise = function (premises) {
    return getPremise(premises, premises.childNodes.length - 1);
};
var getConclusion = function (rule, direction) {
    return rule.childNodes[direction === 'up' ? 0 : 1].childNodes[0].childNodes[0].childNodes[0];
};
var getColumn = function (inf) {
    while (inf && !NodeUtil_js_1.default.isType(inf, 'mtd')) {
        inf = inf.parent;
    }
    return inf;
};
var nextSibling = function (inf) {
    return inf.parent.childNodes[inf.parent.childNodes.indexOf(inf) + 1];
};
var previousSibling = function (inf) {
    return inf.parent.childNodes[inf.parent.childNodes.indexOf(inf) - 1];
};
var getParentInf = function (inf) {
    while (inf && (0, exports.getProperty)(inf, 'inference') == null) {
        inf = inf.parent;
    }
    return inf;
};
var getSpaces = function (inf, rule, right) {
    if (right === void 0) { right = false; }
    var result = 0;
    if (inf === rule) {
        return result;
    }
    if (inf !== rule.parent) {
        var children_1 = inf.childNodes;
        var index_1 = right ? children_1.length - 1 : 0;
        if (NodeUtil_js_1.default.isType(children_1[index_1], 'mspace')) {
            result += getBBox(children_1[index_1]);
        }
        inf = rule.parent;
    }
    if (inf === rule) {
        return result;
    }
    var children = inf.childNodes;
    var index = right ? children.length - 1 : 0;
    if (children[index] !== rule) {
        result += getBBox(children[index]);
    }
    return result;
};
var adjustValue = function (inf, right) {
    if (right === void 0) { right = false; }
    var rule = getRule(inf);
    var conc = getConclusion(rule, (0, exports.getProperty)(rule, 'inferenceRule'));
    var w = getSpaces(inf, rule, right);
    var x = getBBox(rule);
    var y = getBBox(conc);
    return w + ((x - y) / 2);
};
var addSpace = function (config, inf, space, right) {
    if (right === void 0) { right = false; }
    if ((0, exports.getProperty)(inf, 'inferenceRule') ||
        (0, exports.getProperty)(inf, 'labelledRule')) {
        var mrow = config.nodeFactory.create('node', 'mrow');
        inf.parent.replaceChild(mrow, inf);
        mrow.setChildren([inf]);
        moveProperties(inf, mrow);
        inf = mrow;
    }
    var index = right ? inf.childNodes.length - 1 : 0;
    var mspace = inf.childNodes[index];
    if (NodeUtil_js_1.default.isType(mspace, 'mspace')) {
        NodeUtil_js_1.default.setAttribute(mspace, 'width', ParseUtil_js_1.default.Em(ParseUtil_js_1.default.dimen2em(NodeUtil_js_1.default.getAttribute(mspace, 'width')) + space));
        return;
    }
    mspace = config.nodeFactory.create('node', 'mspace', [], { width: ParseUtil_js_1.default.Em(space) });
    if (right) {
        inf.appendChild(mspace);
        return;
    }
    mspace.parent = inf;
    inf.childNodes.unshift(mspace);
};
var moveProperties = function (src, dest) {
    var props = ['inference', 'proof', 'maxAdjust', 'labelledRule'];
    props.forEach(function (x) {
        var value = (0, exports.getProperty)(src, x);
        if (value != null) {
            (0, exports.setProperty)(dest, x, value);
            (0, exports.removeProperty)(src, x);
        }
    });
};
var adjustSequents = function (config) {
    var sequents = config.nodeLists['sequent'];
    if (!sequents) {
        return;
    }
    for (var i = sequents.length - 1, seq = void 0; seq = sequents[i]; i--) {
        if ((0, exports.getProperty)(seq, 'sequentProcessed')) {
            (0, exports.removeProperty)(seq, 'sequentProcessed');
            continue;
        }
        var collect = [];
        var inf = getParentInf(seq);
        if ((0, exports.getProperty)(inf, 'inference') !== 1) {
            continue;
        }
        collect.push(seq);
        while ((0, exports.getProperty)(inf, 'inference') === 1) {
            inf = getRule(inf);
            var premise = firstPremise(getPremises(inf, (0, exports.getProperty)(inf, 'inferenceRule')));
            var sequent = ((0, exports.getProperty)(premise, 'inferenceRule')) ?
                getConclusion(premise, (0, exports.getProperty)(premise, 'inferenceRule')) :
                premise;
            if ((0, exports.getProperty)(sequent, 'sequent')) {
                seq = sequent.childNodes[0];
                collect.push(seq);
                (0, exports.setProperty)(seq, 'sequentProcessed', true);
            }
            inf = premise;
        }
        adjustSequentPairwise(config, collect);
    }
};
var addSequentSpace = function (config, sequent, position, direction, width) {
    var mspace = config.nodeFactory.create('node', 'mspace', [], { width: ParseUtil_js_1.default.Em(width) });
    if (direction === 'left') {
        var row = sequent.childNodes[position].childNodes[0];
        mspace.parent = row;
        row.childNodes.unshift(mspace);
    }
    else {
        sequent.childNodes[position].appendChild(mspace);
    }
    (0, exports.setProperty)(sequent.parent, 'sequentAdjust_' + direction, width);
};
var adjustSequentPairwise = function (config, sequents) {
    var top = sequents.pop();
    while (sequents.length) {
        var bottom = sequents.pop();
        var _a = __read(compareSequents(top, bottom), 2), left = _a[0], right = _a[1];
        if ((0, exports.getProperty)(top.parent, 'axiom')) {
            addSequentSpace(config, left < 0 ? top : bottom, 0, 'left', Math.abs(left));
            addSequentSpace(config, right < 0 ? top : bottom, 2, 'right', Math.abs(right));
        }
        top = bottom;
    }
};
var compareSequents = function (top, bottom) {
    var tr = getBBox(top.childNodes[2]);
    var br = getBBox(bottom.childNodes[2]);
    var tl = getBBox(top.childNodes[0]);
    var bl = getBBox(bottom.childNodes[0]);
    var dl = tl - bl;
    var dr = tr - br;
    return [dl, dr];
};
var balanceRules = function (arg) {
    var e_1, _a;
    item = new arg.document.options.MathItem('', null, arg.math.display);
    var config = arg.data;
    adjustSequents(config);
    var inferences = config.nodeLists['inference'] || [];
    try {
        for (var inferences_1 = __values(inferences), inferences_1_1 = inferences_1.next(); !inferences_1_1.done; inferences_1_1 = inferences_1.next()) {
            var inf = inferences_1_1.value;
            var isProof = (0, exports.getProperty)(inf, 'proof');
            var rule = getRule(inf);
            var premises = getPremises(rule, (0, exports.getProperty)(rule, 'inferenceRule'));
            var premiseF = firstPremise(premises);
            if ((0, exports.getProperty)(premiseF, 'inference')) {
                var adjust_1 = adjustValue(premiseF);
                if (adjust_1) {
                    addSpace(config, premiseF, -adjust_1);
                    var w_1 = getSpaces(inf, rule, false);
                    addSpace(config, inf, adjust_1 - w_1);
                }
            }
            var premiseL = lastPremise(premises);
            if ((0, exports.getProperty)(premiseL, 'inference') == null) {
                continue;
            }
            var adjust = adjustValue(premiseL, true);
            addSpace(config, premiseL, -adjust, true);
            var w = getSpaces(inf, rule, true);
            var maxAdjust = (0, exports.getProperty)(inf, 'maxAdjust');
            if (maxAdjust != null) {
                adjust = Math.max(adjust, maxAdjust);
            }
            var column = void 0;
            if (isProof || !(column = getColumn(inf))) {
                addSpace(config, (0, exports.getProperty)(inf, 'proof') ? inf : inf.parent, adjust - w, true);
                continue;
            }
            var sibling = nextSibling(column);
            if (sibling) {
                var pos = config.nodeFactory.create('node', 'mspace', [], { width: adjust - w + 'em' });
                sibling.appendChild(pos);
                inf.removeProperty('maxAdjust');
                continue;
            }
            var parentRule = getParentInf(column);
            if (!parentRule) {
                continue;
            }
            adjust = (0, exports.getProperty)(parentRule, 'maxAdjust') ?
                Math.max((0, exports.getProperty)(parentRule, 'maxAdjust'), adjust) : adjust;
            (0, exports.setProperty)(parentRule, 'maxAdjust', adjust);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (inferences_1_1 && !inferences_1_1.done && (_a = inferences_1.return)) _a.call(inferences_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
};
exports.balanceRules = balanceRules;
var property_prefix = 'bspr_';
var blacklistedProperties = (_a = {},
    _a[property_prefix + 'maxAdjust'] = true,
    _a);
var setProperty = function (node, property, value) {
    NodeUtil_js_1.default.setProperty(node, property_prefix + property, value);
};
exports.setProperty = setProperty;
var getProperty = function (node, property) {
    return NodeUtil_js_1.default.getProperty(node, property_prefix + property);
};
exports.getProperty = getProperty;
var removeProperty = function (node, property) {
    node.removeProperty(property_prefix + property);
};
exports.removeProperty = removeProperty;
var makeBsprAttributes = function (arg) {
    arg.data.root.walkTree(function (mml, _data) {
        var attr = [];
        mml.getPropertyNames().forEach(function (x) {
            if (!blacklistedProperties[x] && x.match(RegExp('^' + property_prefix))) {
                attr.push(x + ':' + mml.getProperty(x));
            }
        });
        if (attr.length) {
            NodeUtil_js_1.default.setAttribute(mml, 'semantics', attr.join(';'));
        }
    });
};
exports.makeBsprAttributes = makeBsprAttributes;
var saveDocument = function (arg) {
    doc = arg.document;
    if (!('getBBox' in doc.outputJax)) {
        throw Error('The bussproofs extension requires an output jax with a getBBox() method');
    }
};
exports.saveDocument = saveDocument;
var clearDocument = function (_arg) {
    doc = null;
};
exports.clearDocument = clearDocument;
//# sourceMappingURL=BussproofsUtil.js.map

/***/ }),

/***/ 34801:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CancelConfiguration = exports.CancelMethods = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var TexConstants_js_1 = __webpack_require__(48948);
var SymbolMap_js_1 = __webpack_require__(92715);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var EncloseConfiguration_js_1 = __webpack_require__(96295);
exports.CancelMethods = {};
exports.CancelMethods.Cancel = function (parser, name, notation) {
    var attr = parser.GetBrackets(name, '');
    var math = parser.ParseArg(name);
    var def = ParseUtil_js_1.default.keyvalOptions(attr, EncloseConfiguration_js_1.ENCLOSE_OPTIONS);
    def['notation'] = notation;
    parser.Push(parser.create('node', 'menclose', [math], def));
};
exports.CancelMethods.CancelTo = function (parser, name) {
    var attr = parser.GetBrackets(name, '');
    var value = parser.ParseArg(name);
    var math = parser.ParseArg(name);
    var def = ParseUtil_js_1.default.keyvalOptions(attr, EncloseConfiguration_js_1.ENCLOSE_OPTIONS);
    def['notation'] = [TexConstants_js_1.TexConstant.Notation.UPDIAGONALSTRIKE,
        TexConstants_js_1.TexConstant.Notation.UPDIAGONALARROW,
        TexConstants_js_1.TexConstant.Notation.NORTHEASTARROW].join(' ');
    value = parser.create('node', 'mpadded', [value], { depth: '-.1em', height: '+.1em', voffset: '.1em' });
    parser.Push(parser.create('node', 'msup', [parser.create('node', 'menclose', [math], def), value]));
};
new SymbolMap_js_1.CommandMap('cancel', {
    cancel: ['Cancel', TexConstants_js_1.TexConstant.Notation.UPDIAGONALSTRIKE],
    bcancel: ['Cancel', TexConstants_js_1.TexConstant.Notation.DOWNDIAGONALSTRIKE],
    xcancel: ['Cancel', TexConstants_js_1.TexConstant.Notation.UPDIAGONALSTRIKE + ' ' +
            TexConstants_js_1.TexConstant.Notation.DOWNDIAGONALSTRIKE],
    cancelto: 'CancelTo'
}, exports.CancelMethods);
exports.CancelConfiguration = Configuration_js_1.Configuration.create('cancel', { handler: { macro: ['cancel'] } });
//# sourceMappingURL=CancelConfiguration.js.map

/***/ }),

/***/ 30813:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CasesConfiguration = exports.CasesMethods = exports.CasesTags = exports.CasesBeginItem = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var BaseItems_js_1 = __webpack_require__(5065);
var AmsConfiguration_js_1 = __webpack_require__(53379);
var EmpheqUtil_js_1 = __webpack_require__(75734);
var CasesBeginItem = (function (_super) {
    __extends(CasesBeginItem, _super);
    function CasesBeginItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CasesBeginItem.prototype, "kind", {
        get: function () {
            return 'cases-begin';
        },
        enumerable: false,
        configurable: true
    });
    CasesBeginItem.prototype.checkItem = function (item) {
        if (item.isKind('end') && item.getName() === this.getName()) {
            if (this.getProperty('end')) {
                this.setProperty('end', false);
                return [[], true];
            }
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return CasesBeginItem;
}(BaseItems_js_1.BeginItem));
exports.CasesBeginItem = CasesBeginItem;
var CasesTags = (function (_super) {
    __extends(CasesTags, _super);
    function CasesTags() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subcounter = 0;
        return _this;
    }
    CasesTags.prototype.start = function (env, taggable, defaultTags) {
        this.subcounter = 0;
        _super.prototype.start.call(this, env, taggable, defaultTags);
    };
    CasesTags.prototype.autoTag = function () {
        if (this.currentTag.tag != null)
            return;
        if (this.currentTag.env === 'subnumcases') {
            if (this.subcounter === 0)
                this.counter++;
            this.subcounter++;
            this.tag(this.formatNumber(this.counter, this.subcounter), false);
        }
        else {
            if (this.subcounter === 0 || this.currentTag.env !== 'numcases-left')
                this.counter++;
            this.tag(this.formatNumber(this.counter), false);
        }
    };
    CasesTags.prototype.formatNumber = function (n, m) {
        if (m === void 0) { m = null; }
        return n.toString() + (m === null ? '' : String.fromCharCode(0x60 + m));
    };
    return CasesTags;
}(AmsConfiguration_js_1.AmsTags));
exports.CasesTags = CasesTags;
exports.CasesMethods = {
    NumCases: function (parser, begin) {
        if (parser.stack.env.closing === begin.getName()) {
            delete parser.stack.env.closing;
            parser.Push(parser.itemFactory.create('end').setProperty('name', begin.getName()));
            var cases = parser.stack.Top();
            var table = cases.Last;
            var original = ParseUtil_js_1.default.copyNode(table, parser);
            var left = cases.getProperty('left');
            EmpheqUtil_js_1.EmpheqUtil.left(table, original, left + '\\empheqlbrace\\,', parser, 'numcases-left');
            parser.Push(parser.itemFactory.create('end').setProperty('name', begin.getName()));
            return null;
        }
        else {
            var left = parser.GetArgument('\\begin{' + begin.getName() + '}');
            begin.setProperty('left', left);
            var array = BaseMethods_js_1.default.EqnArray(parser, begin, true, true, 'll');
            array.arraydef.displaystyle = false;
            array.arraydef.rowspacing = '.2em';
            array.setProperty('numCases', true);
            parser.Push(begin);
            return array;
        }
    },
    Entry: function (parser, name) {
        if (!parser.stack.Top().getProperty('numCases')) {
            return BaseMethods_js_1.default.Entry(parser, name);
        }
        parser.Push(parser.itemFactory.create('cell').setProperties({ isEntry: true, name: name }));
        var tex = parser.string;
        var braces = 0, i = parser.i, m = tex.length;
        while (i < m) {
            var c = tex.charAt(i);
            if (c === '{') {
                braces++;
                i++;
            }
            else if (c === '}') {
                if (braces === 0) {
                    break;
                }
                else {
                    braces--;
                    i++;
                }
            }
            else if (c === '&' && braces === 0) {
                throw new TexError_js_1.default('ExtraCasesAlignTab', 'Extra alignment tab in text for numcase environment');
            }
            else if (c === '\\' && braces === 0) {
                var cs = (tex.slice(i + 1).match(/^[a-z]+|./i) || [])[0];
                if (cs === '\\' || cs === 'cr' || cs === 'end' || cs === 'label') {
                    break;
                }
                else {
                    i += cs.length;
                }
            }
            else {
                i++;
            }
        }
        var text = tex.substr(parser.i, i - parser.i).replace(/^\s*/, '');
        parser.PushAll(ParseUtil_js_1.default.internalMath(parser, text, 0));
        parser.i = i;
    }
};
new SymbolMap_js_1.EnvironmentMap('cases-env', EmpheqUtil_js_1.EmpheqUtil.environment, {
    numcases: ['NumCases', 'cases'],
    subnumcases: ['NumCases', 'cases']
}, exports.CasesMethods);
new SymbolMap_js_1.MacroMap('cases-macros', {
    '&': 'Entry'
}, exports.CasesMethods);
exports.CasesConfiguration = Configuration_js_1.Configuration.create('cases', {
    handler: {
        environment: ['cases-env'],
        character: ['cases-macros']
    },
    items: (_a = {},
        _a[CasesBeginItem.prototype.kind] = CasesBeginItem,
        _a),
    tags: { 'cases': CasesTags }
});
//# sourceMappingURL=CasesConfiguration.js.map

/***/ }),

/***/ 30241:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CenternotConfiguration = exports.filterCenterOver = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var SymbolMap_js_1 = __webpack_require__(92715);
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
new SymbolMap_js_1.CommandMap('centernot', {
    centerOver: 'CenterOver',
    centernot: ['Macro', '\\centerOver{#1}{{\u29F8}}', 1]
}, {
    CenterOver: function (parser, name) {
        var arg = '{' + parser.GetArgument(name) + '}';
        var over = parser.ParseArg(name);
        var base = new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml();
        var mml = parser.create('node', 'TeXAtom', [
            new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml(),
            parser.create('node', 'mpadded', [
                parser.create('node', 'mpadded', [over], { width: 0, lspace: '-.5width' }),
                parser.create('node', 'mphantom', [base])
            ], { width: 0, lspace: '-.5width' })
        ]);
        parser.configuration.addNode('centerOver', base);
        parser.Push(mml);
    },
    Macro: BaseMethods_js_1.default.Macro
});
function filterCenterOver(_a) {
    var e_1, _b;
    var data = _a.data;
    try {
        for (var _c = __values(data.getList('centerOver')), _d = _c.next(); !_d.done; _d = _c.next()) {
            var base = _d.value;
            var texClass = NodeUtil_js_1.default.getTexClass(base.childNodes[0].childNodes[0]);
            if (texClass !== null) {
                NodeUtil_js_1.default.setProperties(base.parent.parent.parent.parent.parent.parent, { texClass: texClass });
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
}
exports.filterCenterOver = filterCenterOver;
exports.CenternotConfiguration = Configuration_js_1.Configuration.create('centernot', {
    handler: { macro: ['centernot'] },
    postprocessors: [filterCenterOver]
});
//# sourceMappingURL=CenternotConfiguration.js.map

/***/ }),

/***/ 76083:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorConfiguration = void 0;
var SymbolMap_js_1 = __webpack_require__(92715);
var Configuration_js_1 = __webpack_require__(23644);
var ColorMethods_js_1 = __webpack_require__(86101);
var ColorUtil_js_1 = __webpack_require__(93648);
new SymbolMap_js_1.CommandMap('color', {
    color: 'Color',
    textcolor: 'TextColor',
    definecolor: 'DefineColor',
    colorbox: 'ColorBox',
    fcolorbox: 'FColorBox'
}, ColorMethods_js_1.ColorMethods);
var config = function (_config, jax) {
    jax.parseOptions.packageData.set('color', { model: new ColorUtil_js_1.ColorModel() });
};
exports.ColorConfiguration = Configuration_js_1.Configuration.create('color', {
    handler: {
        macro: ['color'],
    },
    options: {
        color: {
            padding: '5px',
            borderWidth: '2px'
        }
    },
    config: config
});
//# sourceMappingURL=ColorConfiguration.js.map

/***/ }),

/***/ 15916:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COLORS = void 0;
exports.COLORS = new Map([
    ['Apricot', '#FBB982'],
    ['Aquamarine', '#00B5BE'],
    ['Bittersweet', '#C04F17'],
    ['Black', '#221E1F'],
    ['Blue', '#2D2F92'],
    ['BlueGreen', '#00B3B8'],
    ['BlueViolet', '#473992'],
    ['BrickRed', '#B6321C'],
    ['Brown', '#792500'],
    ['BurntOrange', '#F7921D'],
    ['CadetBlue', '#74729A'],
    ['CarnationPink', '#F282B4'],
    ['Cerulean', '#00A2E3'],
    ['CornflowerBlue', '#41B0E4'],
    ['Cyan', '#00AEEF'],
    ['Dandelion', '#FDBC42'],
    ['DarkOrchid', '#A4538A'],
    ['Emerald', '#00A99D'],
    ['ForestGreen', '#009B55'],
    ['Fuchsia', '#8C368C'],
    ['Goldenrod', '#FFDF42'],
    ['Gray', '#949698'],
    ['Green', '#00A64F'],
    ['GreenYellow', '#DFE674'],
    ['JungleGreen', '#00A99A'],
    ['Lavender', '#F49EC4'],
    ['LimeGreen', '#8DC73E'],
    ['Magenta', '#EC008C'],
    ['Mahogany', '#A9341F'],
    ['Maroon', '#AF3235'],
    ['Melon', '#F89E7B'],
    ['MidnightBlue', '#006795'],
    ['Mulberry', '#A93C93'],
    ['NavyBlue', '#006EB8'],
    ['OliveGreen', '#3C8031'],
    ['Orange', '#F58137'],
    ['OrangeRed', '#ED135A'],
    ['Orchid', '#AF72B0'],
    ['Peach', '#F7965A'],
    ['Periwinkle', '#7977B8'],
    ['PineGreen', '#008B72'],
    ['Plum', '#92268F'],
    ['ProcessBlue', '#00B0F0'],
    ['Purple', '#99479B'],
    ['RawSienna', '#974006'],
    ['Red', '#ED1B23'],
    ['RedOrange', '#F26035'],
    ['RedViolet', '#A1246B'],
    ['Rhodamine', '#EF559F'],
    ['RoyalBlue', '#0071BC'],
    ['RoyalPurple', '#613F99'],
    ['RubineRed', '#ED017D'],
    ['Salmon', '#F69289'],
    ['SeaGreen', '#3FBC9D'],
    ['Sepia', '#671800'],
    ['SkyBlue', '#46C5DD'],
    ['SpringGreen', '#C6DC67'],
    ['Tan', '#DA9D76'],
    ['TealBlue', '#00AEB3'],
    ['Thistle', '#D883B7'],
    ['Turquoise', '#00B4CE'],
    ['Violet', '#58429B'],
    ['VioletRed', '#EF58A0'],
    ['White', '#FFFFFF'],
    ['WildStrawberry', '#EE2967'],
    ['Yellow', '#FFF200'],
    ['YellowGreen', '#98CC70'],
    ['YellowOrange', '#FAA21A'],
]);
//# sourceMappingURL=ColorConstants.js.map

/***/ }),

/***/ 86101:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorMethods = void 0;
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
function padding(colorPadding) {
    var pad = "+".concat(colorPadding);
    var unit = colorPadding.replace(/^.*?([a-z]*)$/, '$1');
    var pad2 = 2 * parseFloat(pad);
    return {
        width: "+".concat(pad2).concat(unit),
        height: pad,
        depth: pad,
        lspace: colorPadding,
    };
}
exports.ColorMethods = {};
exports.ColorMethods.Color = function (parser, name) {
    var model = parser.GetBrackets(name, '');
    var colorDef = parser.GetArgument(name);
    var colorModel = parser.configuration.packageData.get('color').model;
    var color = colorModel.getColor(model, colorDef);
    var style = parser.itemFactory.create('style')
        .setProperties({ styles: { mathcolor: color } });
    parser.stack.env['color'] = color;
    parser.Push(style);
};
exports.ColorMethods.TextColor = function (parser, name) {
    var model = parser.GetBrackets(name, '');
    var colorDef = parser.GetArgument(name);
    var colorModel = parser.configuration.packageData.get('color').model;
    var color = colorModel.getColor(model, colorDef);
    var old = parser.stack.env['color'];
    parser.stack.env['color'] = color;
    var math = parser.ParseArg(name);
    if (old) {
        parser.stack.env['color'] = old;
    }
    else {
        delete parser.stack.env['color'];
    }
    var node = parser.create('node', 'mstyle', [math], { mathcolor: color });
    parser.Push(node);
};
exports.ColorMethods.DefineColor = function (parser, name) {
    var cname = parser.GetArgument(name);
    var model = parser.GetArgument(name);
    var def = parser.GetArgument(name);
    var colorModel = parser.configuration.packageData.get('color').model;
    colorModel.defineColor(model, cname, def);
};
exports.ColorMethods.ColorBox = function (parser, name) {
    var cname = parser.GetArgument(name);
    var math = ParseUtil_js_1.default.internalMath(parser, parser.GetArgument(name));
    var colorModel = parser.configuration.packageData.get('color').model;
    var node = parser.create('node', 'mpadded', math, {
        mathbackground: colorModel.getColor('named', cname)
    });
    NodeUtil_js_1.default.setProperties(node, padding(parser.options.color.padding));
    parser.Push(node);
};
exports.ColorMethods.FColorBox = function (parser, name) {
    var fname = parser.GetArgument(name);
    var cname = parser.GetArgument(name);
    var math = ParseUtil_js_1.default.internalMath(parser, parser.GetArgument(name));
    var options = parser.options.color;
    var colorModel = parser.configuration.packageData.get('color').model;
    var node = parser.create('node', 'mpadded', math, {
        mathbackground: colorModel.getColor('named', cname),
        style: "border: ".concat(options.borderWidth, " solid ").concat(colorModel.getColor('named', fname))
    });
    NodeUtil_js_1.default.setProperties(node, padding(options.padding));
    parser.Push(node);
};
//# sourceMappingURL=ColorMethods.js.map

/***/ }),

/***/ 93648:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorModel = void 0;
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var ColorConstants_js_1 = __webpack_require__(15916);
var ColorModelProcessors = new Map();
var ColorModel = (function () {
    function ColorModel() {
        this.userColors = new Map();
    }
    ColorModel.prototype.normalizeColor = function (model, def) {
        if (!model || model === 'named') {
            return def;
        }
        if (ColorModelProcessors.has(model)) {
            var modelProcessor = ColorModelProcessors.get(model);
            return modelProcessor(def);
        }
        throw new TexError_js_1.default('UndefinedColorModel', 'Color model \'%1\' not defined', model);
    };
    ColorModel.prototype.getColor = function (model, def) {
        if (!model || model === 'named') {
            return this.getColorByName(def);
        }
        return this.normalizeColor(model, def);
    };
    ColorModel.prototype.getColorByName = function (name) {
        if (this.userColors.has(name)) {
            return this.userColors.get(name);
        }
        if (ColorConstants_js_1.COLORS.has(name)) {
            return ColorConstants_js_1.COLORS.get(name);
        }
        return name;
    };
    ColorModel.prototype.defineColor = function (model, name, def) {
        var normalized = this.normalizeColor(model, def);
        this.userColors.set(name, normalized);
    };
    return ColorModel;
}());
exports.ColorModel = ColorModel;
ColorModelProcessors.set('rgb', function (rgb) {
    var e_1, _a;
    var rgbParts = rgb.trim().split(/\s*,\s*/);
    var RGB = '#';
    if (rgbParts.length !== 3) {
        throw new TexError_js_1.default('ModelArg1', 'Color values for the %1 model require 3 numbers', 'rgb');
    }
    try {
        for (var rgbParts_1 = __values(rgbParts), rgbParts_1_1 = rgbParts_1.next(); !rgbParts_1_1.done; rgbParts_1_1 = rgbParts_1.next()) {
            var rgbPart = rgbParts_1_1.value;
            if (!rgbPart.match(/^(\d+(\.\d*)?|\.\d+)$/)) {
                throw new TexError_js_1.default('InvalidDecimalNumber', 'Invalid decimal number');
            }
            var n = parseFloat(rgbPart);
            if (n < 0 || n > 1) {
                throw new TexError_js_1.default('ModelArg2', 'Color values for the %1 model must be between %2 and %3', 'rgb', '0', '1');
            }
            var pn = Math.floor(n * 255).toString(16);
            if (pn.length < 2) {
                pn = '0' + pn;
            }
            RGB += pn;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (rgbParts_1_1 && !rgbParts_1_1.done && (_a = rgbParts_1.return)) _a.call(rgbParts_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return RGB;
});
ColorModelProcessors.set('RGB', function (rgb) {
    var e_2, _a;
    var rgbParts = rgb.trim().split(/\s*,\s*/);
    var RGB = '#';
    if (rgbParts.length !== 3) {
        throw new TexError_js_1.default('ModelArg1', 'Color values for the %1 model require 3 numbers', 'RGB');
    }
    try {
        for (var rgbParts_2 = __values(rgbParts), rgbParts_2_1 = rgbParts_2.next(); !rgbParts_2_1.done; rgbParts_2_1 = rgbParts_2.next()) {
            var rgbPart = rgbParts_2_1.value;
            if (!rgbPart.match(/^\d+$/)) {
                throw new TexError_js_1.default('InvalidNumber', 'Invalid number');
            }
            var n = parseInt(rgbPart);
            if (n > 255) {
                throw new TexError_js_1.default('ModelArg2', 'Color values for the %1 model must be between %2 and %3', 'RGB', '0', '255');
            }
            var pn = n.toString(16);
            if (pn.length < 2) {
                pn = '0' + pn;
            }
            RGB += pn;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (rgbParts_2_1 && !rgbParts_2_1.done && (_a = rgbParts_2.return)) _a.call(rgbParts_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return RGB;
});
ColorModelProcessors.set('gray', function (gray) {
    if (!gray.match(/^\s*(\d+(\.\d*)?|\.\d+)\s*$/)) {
        throw new TexError_js_1.default('InvalidDecimalNumber', 'Invalid decimal number');
    }
    var n = parseFloat(gray);
    if (n < 0 || n > 1) {
        throw new TexError_js_1.default('ModelArg2', 'Color values for the %1 model must be between %2 and %3', 'gray', '0', '1');
    }
    var pn = Math.floor(n * 255).toString(16);
    if (pn.length < 2) {
        pn = '0' + pn;
    }
    return "#".concat(pn).concat(pn).concat(pn);
});
//# sourceMappingURL=ColorUtil.js.map

/***/ }),

/***/ 53293:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColortblConfiguration = exports.ColorArrayItem = void 0;
var BaseItems_js_1 = __webpack_require__(5065);
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var ColorArrayItem = (function (_super) {
    __extends(ColorArrayItem, _super);
    function ColorArrayItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color = {
            cell: '',
            row: '',
            col: []
        };
        _this.hasColor = false;
        return _this;
    }
    ColorArrayItem.prototype.EndEntry = function () {
        _super.prototype.EndEntry.call(this);
        var cell = this.row[this.row.length - 1];
        var color = this.color.cell || this.color.row || this.color.col[this.row.length - 1];
        if (color) {
            cell.attributes.set('mathbackground', color);
            this.color.cell = '';
            this.hasColor = true;
        }
    };
    ColorArrayItem.prototype.EndRow = function () {
        _super.prototype.EndRow.call(this);
        this.color.row = '';
    };
    ColorArrayItem.prototype.createMml = function () {
        var mml = _super.prototype.createMml.call(this);
        var table = (mml.isKind('mrow') ? mml.childNodes[1] : mml);
        if (table.isKind('menclose')) {
            table = table.childNodes[0].childNodes[0];
        }
        if (this.hasColor && table.attributes.get('frame') === 'none') {
            table.attributes.set('frame', '');
        }
        return mml;
    };
    return ColorArrayItem;
}(BaseItems_js_1.ArrayItem));
exports.ColorArrayItem = ColorArrayItem;
new SymbolMap_js_1.CommandMap('colortbl', {
    cellcolor: ['TableColor', 'cell'],
    rowcolor: ['TableColor', 'row'],
    columncolor: ['TableColor', 'col']
}, {
    TableColor: function (parser, name, type) {
        var lookup = parser.configuration.packageData.get('color').model;
        var model = parser.GetBrackets(name, '');
        var color = lookup.getColor(model, parser.GetArgument(name));
        var top = parser.stack.Top();
        if (!(top instanceof ColorArrayItem)) {
            throw new TexError_js_1.default('UnsupportedTableColor', 'Unsupported use of %1', parser.currentCS);
        }
        if (type === 'col') {
            if (top.table.length) {
                throw new TexError_js_1.default('ColumnColorNotTop', '%1 must be in the top row', name);
            }
            top.color.col[top.row.length] = color;
            if (parser.GetBrackets(name, '')) {
                parser.GetBrackets(name, '');
            }
        }
        else {
            top.color[type] = color;
            if (type === 'row' && (top.Size() || top.row.length)) {
                throw new TexError_js_1.default('RowColorNotFirst', '%1 must be at the beginning of a row', name);
            }
        }
    }
});
var config = function (config, jax) {
    if (!jax.parseOptions.packageData.has('color')) {
        Configuration_js_1.ConfigurationHandler.get('color').config(config, jax);
    }
};
exports.ColortblConfiguration = Configuration_js_1.Configuration.create('colortbl', {
    handler: { macro: ['colortbl'] },
    items: { 'array': ColorArrayItem },
    priority: 10,
    config: [config, 10]
});
//# sourceMappingURL=ColortblConfiguration.js.map

/***/ }),

/***/ 28361:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColorConfiguration = exports.ColorV2Methods = void 0;
var SymbolMap_js_1 = __webpack_require__(92715);
var Configuration_js_1 = __webpack_require__(23644);
exports.ColorV2Methods = {
    Color: function (parser, name) {
        var color = parser.GetArgument(name);
        var old = parser.stack.env['color'];
        parser.stack.env['color'] = color;
        var math = parser.ParseArg(name);
        if (old) {
            parser.stack.env['color'] = old;
        }
        else {
            delete parser.stack.env['color'];
        }
        var node = parser.create('node', 'mstyle', [math], { mathcolor: color });
        parser.Push(node);
    }
};
new SymbolMap_js_1.CommandMap('colorv2', { color: 'Color' }, exports.ColorV2Methods);
exports.ColorConfiguration = Configuration_js_1.Configuration.create('colorv2', { handler: { macro: ['colorv2'] } });
//# sourceMappingURL=ColorV2Configuration.js.map

/***/ }),

/***/ 87542:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigMacrosConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var Options_js_1 = __webpack_require__(36059);
var SymbolMap_js_1 = __webpack_require__(92715);
var ParseMethods_js_1 = __importDefault(__webpack_require__(96004));
var Symbol_js_1 = __webpack_require__(56941);
var NewcommandMethods_js_1 = __importDefault(__webpack_require__(57860));
var NewcommandItems_js_1 = __webpack_require__(40421);
var MACROSMAP = 'configmacros-map';
var ENVIRONMENTMAP = 'configmacros-env-map';
function configmacrosInit(config) {
    new SymbolMap_js_1.CommandMap(MACROSMAP, {}, {});
    new SymbolMap_js_1.EnvironmentMap(ENVIRONMENTMAP, ParseMethods_js_1.default.environment, {}, {});
    config.append(Configuration_js_1.Configuration.local({
        handler: {
            macro: [MACROSMAP],
            environment: [ENVIRONMENTMAP]
        },
        priority: 3
    }));
}
function configmacrosConfig(_config, jax) {
    configMacros(jax);
    configEnvironments(jax);
}
function configMacros(jax) {
    var e_1, _a;
    var handler = jax.parseOptions.handlers.retrieve(MACROSMAP);
    var macros = jax.parseOptions.options.macros;
    try {
        for (var _b = __values(Object.keys(macros)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var cs = _c.value;
            var def = (typeof macros[cs] === 'string' ? [macros[cs]] : macros[cs]);
            var macro = Array.isArray(def[2]) ?
                new Symbol_js_1.Macro(cs, NewcommandMethods_js_1.default.MacroWithTemplate, def.slice(0, 2).concat(def[2])) :
                new Symbol_js_1.Macro(cs, NewcommandMethods_js_1.default.Macro, def);
            handler.add(cs, macro);
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
function configEnvironments(jax) {
    var e_2, _a;
    var handler = jax.parseOptions.handlers.retrieve(ENVIRONMENTMAP);
    var environments = jax.parseOptions.options.environments;
    try {
        for (var _b = __values(Object.keys(environments)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var env = _c.value;
            handler.add(env, new Symbol_js_1.Macro(env, NewcommandMethods_js_1.default.BeginEnv, [true].concat(environments[env])));
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
exports.ConfigMacrosConfiguration = Configuration_js_1.Configuration.create('configmacros', {
    init: configmacrosInit,
    config: configmacrosConfig,
    items: (_a = {},
        _a[NewcommandItems_js_1.BeginEnvItem.prototype.kind] = NewcommandItems_js_1.BeginEnvItem,
        _a),
    options: {
        macros: (0, Options_js_1.expandable)({}),
        environments: (0, Options_js_1.expandable)({})
    }
});
//# sourceMappingURL=ConfigMacrosConfiguration.js.map

/***/ }),

/***/ 31334:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmpheqConfiguration = exports.EmpheqMethods = exports.EmpheqBeginItem = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var BaseItems_js_1 = __webpack_require__(5065);
var EmpheqUtil_js_1 = __webpack_require__(75734);
var EmpheqBeginItem = (function (_super) {
    __extends(EmpheqBeginItem, _super);
    function EmpheqBeginItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EmpheqBeginItem.prototype, "kind", {
        get: function () {
            return 'empheq-begin';
        },
        enumerable: false,
        configurable: true
    });
    EmpheqBeginItem.prototype.checkItem = function (item) {
        if (item.isKind('end') && item.getName() === this.getName()) {
            this.setProperty('end', false);
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return EmpheqBeginItem;
}(BaseItems_js_1.BeginItem));
exports.EmpheqBeginItem = EmpheqBeginItem;
exports.EmpheqMethods = {
    Empheq: function (parser, begin) {
        if (parser.stack.env.closing === begin.getName()) {
            delete parser.stack.env.closing;
            parser.Push(parser.itemFactory.create('end').setProperty('name', parser.stack.global.empheq));
            parser.stack.global.empheq = '';
            var empheq = parser.stack.Top();
            EmpheqUtil_js_1.EmpheqUtil.adjustTable(empheq, parser);
            parser.Push(parser.itemFactory.create('end').setProperty('name', 'empheq'));
        }
        else {
            ParseUtil_js_1.default.checkEqnEnv(parser);
            delete parser.stack.global.eqnenv;
            var opts = parser.GetBrackets('\\begin{' + begin.getName() + '}') || '';
            var _a = __read((parser.GetArgument('\\begin{' + begin.getName() + '}') || '').split(/=/), 2), env = _a[0], n = _a[1];
            if (!EmpheqUtil_js_1.EmpheqUtil.checkEnv(env)) {
                throw new TexError_js_1.default('UnknownEnv', 'Unknown environment "%1"', env);
            }
            if (opts) {
                begin.setProperties(EmpheqUtil_js_1.EmpheqUtil.splitOptions(opts, { left: 1, right: 1 }));
            }
            parser.stack.global.empheq = env;
            parser.string = '\\begin{' + env + '}' + (n ? '{' + n + '}' : '') + parser.string.slice(parser.i);
            parser.i = 0;
            parser.Push(begin);
        }
    },
    EmpheqMO: function (parser, _name, c) {
        parser.Push(parser.create('token', 'mo', {}, c));
    },
    EmpheqDelim: function (parser, name) {
        var c = parser.GetDelimiter(name);
        parser.Push(parser.create('token', 'mo', { stretchy: true, symmetric: true }, c));
    }
};
new SymbolMap_js_1.EnvironmentMap('empheq-env', EmpheqUtil_js_1.EmpheqUtil.environment, {
    empheq: ['Empheq', 'empheq'],
}, exports.EmpheqMethods);
new SymbolMap_js_1.CommandMap('empheq-macros', {
    empheqlbrace: ['EmpheqMO', '{'],
    empheqrbrace: ['EmpheqMO', '}'],
    empheqlbrack: ['EmpheqMO', '['],
    empheqrbrack: ['EmpheqMO', ']'],
    empheqlangle: ['EmpheqMO', '\u27E8'],
    empheqrangle: ['EmpheqMO', '\u27E9'],
    empheqlparen: ['EmpheqMO', '('],
    empheqrparen: ['EmpheqMO', ')'],
    empheqlvert: ['EmpheqMO', '|'],
    empheqrvert: ['EmpheqMO', '|'],
    empheqlVert: ['EmpheqMO', '\u2016'],
    empheqrVert: ['EmpheqMO', '\u2016'],
    empheqlfloor: ['EmpheqMO', '\u230A'],
    empheqrfloor: ['EmpheqMO', '\u230B'],
    empheqlceil: ['EmpheqMO', '\u2308'],
    empheqrceil: ['EmpheqMO', '\u2309'],
    empheqbiglbrace: ['EmpheqMO', '{'],
    empheqbigrbrace: ['EmpheqMO', '}'],
    empheqbiglbrack: ['EmpheqMO', '['],
    empheqbigrbrack: ['EmpheqMO', ']'],
    empheqbiglangle: ['EmpheqMO', '\u27E8'],
    empheqbigrangle: ['EmpheqMO', '\u27E9'],
    empheqbiglparen: ['EmpheqMO', '('],
    empheqbigrparen: ['EmpheqMO', ')'],
    empheqbiglvert: ['EmpheqMO', '|'],
    empheqbigrvert: ['EmpheqMO', '|'],
    empheqbiglVert: ['EmpheqMO', '\u2016'],
    empheqbigrVert: ['EmpheqMO', '\u2016'],
    empheqbiglfloor: ['EmpheqMO', '\u230A'],
    empheqbigrfloor: ['EmpheqMO', '\u230B'],
    empheqbiglceil: ['EmpheqMO', '\u2308'],
    empheqbigrceil: ['EmpheqMO', '\u2309'],
    empheql: 'EmpheqDelim',
    empheqr: 'EmpheqDelim',
    empheqbigl: 'EmpheqDelim',
    empheqbigr: 'EmpheqDelim'
}, exports.EmpheqMethods);
exports.EmpheqConfiguration = Configuration_js_1.Configuration.create('empheq', {
    handler: {
        macro: ['empheq-macros'],
        environment: ['empheq-env'],
    },
    items: (_a = {},
        _a[EmpheqBeginItem.prototype.kind] = EmpheqBeginItem,
        _a)
});
//# sourceMappingURL=EmpheqConfiguration.js.map

/***/ }),

/***/ 75734:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmpheqUtil = void 0;
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
exports.EmpheqUtil = {
    environment: function (parser, env, func, args) {
        var name = args[0];
        var item = parser.itemFactory.create(name + '-begin').setProperties({ name: env, end: name });
        parser.Push(func.apply(void 0, __spreadArray([parser, item], __read(args.slice(1)), false)));
    },
    splitOptions: function (text, allowed) {
        if (allowed === void 0) { allowed = null; }
        return ParseUtil_js_1.default.keyvalOptions(text, allowed, true);
    },
    columnCount: function (table) {
        var e_1, _a;
        var m = 0;
        try {
            for (var _b = __values(table.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var row = _c.value;
                var n = row.childNodes.length - (row.isKind('mlabeledtr') ? 1 : 0);
                if (n > m)
                    m = n;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return m;
    },
    cellBlock: function (tex, table, parser, env) {
        var e_2, _a;
        var mpadded = parser.create('node', 'mpadded', [], { height: 0, depth: 0, voffset: '-1height' });
        var result = new TexParser_js_1.default(tex, parser.stack.env, parser.configuration);
        var mml = result.mml();
        if (env && result.configuration.tags.label) {
            result.configuration.tags.currentTag.env = env;
            result.configuration.tags.getTag(true);
        }
        try {
            for (var _b = __values((mml.isInferred ? mml.childNodes : [mml])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                mpadded.appendChild(child);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        mpadded.appendChild(parser.create('node', 'mphantom', [
            parser.create('node', 'mpadded', [table], { width: 0 })
        ]));
        return mpadded;
    },
    topRowTable: function (original, parser) {
        var table = ParseUtil_js_1.default.copyNode(original, parser);
        table.setChildren(table.childNodes.slice(0, 1));
        table.attributes.set('align', 'baseline 1');
        return original.factory.create('mphantom', {}, [parser.create('node', 'mpadded', [table], { width: 0 })]);
    },
    rowspanCell: function (mtd, tex, table, parser, env) {
        mtd.appendChild(parser.create('node', 'mpadded', [
            this.cellBlock(tex, ParseUtil_js_1.default.copyNode(table, parser), parser, env),
            this.topRowTable(table, parser)
        ], { height: 0, depth: 0, voffset: 'height' }));
    },
    left: function (table, original, left, parser, env) {
        var e_3, _a;
        if (env === void 0) { env = ''; }
        table.attributes.set('columnalign', 'right ' + (table.attributes.get('columnalign') || ''));
        table.attributes.set('columnspacing', '0em ' + (table.attributes.get('columnspacing') || ''));
        var mtd;
        try {
            for (var _b = __values(table.childNodes.slice(0).reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var row = _c.value;
                mtd = parser.create('node', 'mtd');
                row.childNodes.unshift(mtd);
                mtd.parent = row;
                if (row.isKind('mlabeledtr')) {
                    row.childNodes[0] = row.childNodes[1];
                    row.childNodes[1] = mtd;
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
        this.rowspanCell(mtd, left, original, parser, env);
    },
    right: function (table, original, right, parser, env) {
        if (env === void 0) { env = ''; }
        if (table.childNodes.length === 0) {
            table.appendChild(parser.create('node', 'mtr'));
        }
        var m = exports.EmpheqUtil.columnCount(table);
        var row = table.childNodes[0];
        while (row.childNodes.length < m)
            row.appendChild(parser.create('node', 'mtd'));
        var mtd = row.appendChild(parser.create('node', 'mtd'));
        exports.EmpheqUtil.rowspanCell(mtd, right, original, parser, env);
        table.attributes.set('columnalign', (table.attributes.get('columnalign') || '').split(/ /).slice(0, m).join(' ') + ' left');
        table.attributes.set('columnspacing', (table.attributes.get('columnspacing') || '').split(/ /).slice(0, m - 1).join(' ') + ' 0em');
    },
    adjustTable: function (empheq, parser) {
        var left = empheq.getProperty('left');
        var right = empheq.getProperty('right');
        if (left || right) {
            var table = empheq.Last;
            var original = ParseUtil_js_1.default.copyNode(table, parser);
            if (left)
                this.left(table, original, left, parser);
            if (right)
                this.right(table, original, right, parser);
        }
    },
    allowEnv: {
        equation: true,
        align: true,
        gather: true,
        flalign: true,
        alignat: true,
        multline: true
    },
    checkEnv: function (env) {
        return this.allowEnv.hasOwnProperty(env.replace(/\*$/, '')) || false;
    }
};
//# sourceMappingURL=EmpheqUtil.js.map

/***/ }),

/***/ 96295:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EncloseConfiguration = exports.EncloseMethods = exports.ENCLOSE_OPTIONS = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
exports.ENCLOSE_OPTIONS = {
    'data-arrowhead': 1,
    color: 1,
    mathcolor: 1,
    background: 1,
    mathbackground: 1,
    'data-padding': 1,
    'data-thickness': 1
};
exports.EncloseMethods = {};
exports.EncloseMethods.Enclose = function (parser, name) {
    var notation = parser.GetArgument(name).replace(/,/g, ' ');
    var attr = parser.GetBrackets(name, '');
    var math = parser.ParseArg(name);
    var def = ParseUtil_js_1.default.keyvalOptions(attr, exports.ENCLOSE_OPTIONS);
    def.notation = notation;
    parser.Push(parser.create('node', 'menclose', [math], def));
};
new SymbolMap_js_1.CommandMap('enclose', { enclose: 'Enclose' }, exports.EncloseMethods);
exports.EncloseConfiguration = Configuration_js_1.Configuration.create('enclose', { handler: { macro: ['enclose'] } });
//# sourceMappingURL=EncloseConfiguration.js.map

/***/ }),

/***/ 66910:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtpfeilConfiguration = exports.ExtpfeilMethods = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var AmsMethods_js_1 = __webpack_require__(42828);
var NewcommandUtil_js_1 = __importDefault(__webpack_require__(97981));
var NewcommandConfiguration_js_1 = __webpack_require__(25112);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
exports.ExtpfeilMethods = {};
exports.ExtpfeilMethods.xArrow = AmsMethods_js_1.AmsMethods.xArrow;
exports.ExtpfeilMethods.NewExtArrow = function (parser, name) {
    var cs = parser.GetArgument(name);
    var space = parser.GetArgument(name);
    var chr = parser.GetArgument(name);
    if (!cs.match(/^\\([a-z]+|.)$/i)) {
        throw new TexError_js_1.default('NewextarrowArg1', 'First argument to %1 must be a control sequence name', name);
    }
    if (!space.match(/^(\d+),(\d+)$/)) {
        throw new TexError_js_1.default('NewextarrowArg2', 'Second argument to %1 must be two integers separated by a comma', name);
    }
    if (!chr.match(/^(\d+|0x[0-9A-F]+)$/i)) {
        throw new TexError_js_1.default('NewextarrowArg3', 'Third argument to %1 must be a unicode character number', name);
    }
    cs = cs.substr(1);
    var spaces = space.split(',');
    NewcommandUtil_js_1.default.addMacro(parser, cs, exports.ExtpfeilMethods.xArrow, [parseInt(chr), parseInt(spaces[0]), parseInt(spaces[1])]);
};
new SymbolMap_js_1.CommandMap('extpfeil', {
    xtwoheadrightarrow: ['xArrow', 0x21A0, 12, 16],
    xtwoheadleftarrow: ['xArrow', 0x219E, 17, 13],
    xmapsto: ['xArrow', 0x21A6, 6, 7],
    xlongequal: ['xArrow', 0x003D, 7, 7],
    xtofrom: ['xArrow', 0x21C4, 12, 12],
    Newextarrow: 'NewExtArrow'
}, exports.ExtpfeilMethods);
var init = function (config) {
    NewcommandConfiguration_js_1.NewcommandConfiguration.init(config);
};
exports.ExtpfeilConfiguration = Configuration_js_1.Configuration.create('extpfeil', {
    handler: { macro: ['extpfeil'] },
    init: init
});
//# sourceMappingURL=ExtpfeilConfiguration.js.map

/***/ }),

/***/ 57987:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GensymbConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var TexConstants_js_1 = __webpack_require__(48948);
var SymbolMap_js_1 = __webpack_require__(92715);
function mathcharUnit(parser, mchar) {
    var def = mchar.attributes || {};
    def.mathvariant = TexConstants_js_1.TexConstant.Variant.NORMAL;
    def.class = 'MathML-Unit';
    var node = parser.create('token', 'mi', def, mchar.char);
    parser.Push(node);
}
new SymbolMap_js_1.CharacterMap('gensymb-symbols', mathcharUnit, {
    ohm: '\u2126',
    degree: '\u00B0',
    celsius: '\u2103',
    perthousand: '\u2030',
    micro: '\u00B5'
});
exports.GensymbConfiguration = Configuration_js_1.Configuration.create('gensymb', {
    handler: { macro: ['gensymb-symbols'] },
});
//# sourceMappingURL=GensymbConfiguration.js.map

/***/ }),

/***/ 75259:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var HtmlMethods_js_1 = __importDefault(__webpack_require__(53582));
new SymbolMap_js_1.CommandMap('html_macros', {
    href: 'Href',
    'class': 'Class',
    style: 'Style',
    cssId: 'Id'
}, HtmlMethods_js_1.default);
exports.HtmlConfiguration = Configuration_js_1.Configuration.create('html', { handler: { macro: ['html_macros'] } });
//# sourceMappingURL=HtmlConfiguration.js.map

/***/ }),

/***/ 53582:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var HtmlMethods = {};
HtmlMethods.Href = function (parser, name) {
    var url = parser.GetArgument(name);
    var arg = GetArgumentMML(parser, name);
    NodeUtil_js_1.default.setAttribute(arg, 'href', url);
    parser.Push(arg);
};
HtmlMethods.Class = function (parser, name) {
    var CLASS = parser.GetArgument(name);
    var arg = GetArgumentMML(parser, name);
    var oldClass = NodeUtil_js_1.default.getAttribute(arg, 'class');
    if (oldClass) {
        CLASS = oldClass + ' ' + CLASS;
    }
    NodeUtil_js_1.default.setAttribute(arg, 'class', CLASS);
    parser.Push(arg);
};
HtmlMethods.Style = function (parser, name) {
    var style = parser.GetArgument(name);
    var arg = GetArgumentMML(parser, name);
    var oldStyle = NodeUtil_js_1.default.getAttribute(arg, 'style');
    if (oldStyle) {
        if (style.charAt(style.length - 1) !== ';') {
            style += ';';
        }
        style = oldStyle + ' ' + style;
    }
    NodeUtil_js_1.default.setAttribute(arg, 'style', style);
    parser.Push(arg);
};
HtmlMethods.Id = function (parser, name) {
    var ID = parser.GetArgument(name);
    var arg = GetArgumentMML(parser, name);
    NodeUtil_js_1.default.setAttribute(arg, 'id', ID);
    parser.Push(arg);
};
var GetArgumentMML = function (parser, name) {
    var arg = parser.ParseArg(name);
    if (!NodeUtil_js_1.default.isInferred(arg)) {
        return arg;
    }
    var children = NodeUtil_js_1.default.getChildren(arg);
    if (children.length === 1) {
        return children[0];
    }
    var mrow = parser.create('node', 'mrow');
    NodeUtil_js_1.default.copyChildren(arg, mrow);
    NodeUtil_js_1.default.copyAttributes(arg, mrow);
    return mrow;
};
exports["default"] = HtmlMethods;
//# sourceMappingURL=HtmlMethods.js.map

/***/ }),

/***/ 56379:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MathtoolsConfiguration = exports.fixPrescripts = exports.PAIREDDELIMS = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var Options_js_1 = __webpack_require__(36059);
__webpack_require__(44621);
var MathtoolsUtil_js_1 = __webpack_require__(71893);
var MathtoolsTags_js_1 = __webpack_require__(47778);
var MathtoolsItems_js_1 = __webpack_require__(14508);
exports.PAIREDDELIMS = 'mathtools-paired-delims';
function initMathtools(config) {
    new SymbolMap_js_1.CommandMap(exports.PAIREDDELIMS, {}, {});
    config.append(Configuration_js_1.Configuration.local({ handler: { macro: [exports.PAIREDDELIMS] }, priority: -5 }));
}
function configMathtools(config, jax) {
    var e_1, _a;
    var parser = jax.parseOptions;
    var pairedDelims = parser.options.mathtools.pairedDelimiters;
    try {
        for (var _b = __values(Object.keys(pairedDelims)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var cs = _c.value;
            MathtoolsUtil_js_1.MathtoolsUtil.addPairedDelims(parser, cs, pairedDelims[cs]);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    (0, MathtoolsTags_js_1.MathtoolsTagFormat)(config, jax);
}
function fixPrescripts(_a) {
    var e_2, _b, e_3, _c, e_4, _d;
    var data = _a.data;
    try {
        for (var _e = __values(data.getList('mmultiscripts')), _f = _e.next(); !_f.done; _f = _e.next()) {
            var node = _f.value;
            if (!node.getProperty('fixPrescript'))
                continue;
            var childNodes = NodeUtil_js_1.default.getChildren(node);
            var n = 0;
            try {
                for (var _g = (e_3 = void 0, __values([1, 2])), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var i = _h.value;
                    if (!childNodes[i]) {
                        NodeUtil_js_1.default.setChild(node, i, data.nodeFactory.create('node', 'none'));
                        n++;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var _j = (e_4 = void 0, __values([4, 5])), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var i = _k.value;
                    if (NodeUtil_js_1.default.isType(childNodes[i], 'mrow') && NodeUtil_js_1.default.getChildren(childNodes[i]).length === 0) {
                        NodeUtil_js_1.default.setChild(node, i, data.nodeFactory.create('node', 'none'));
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
                }
                finally { if (e_4) throw e_4.error; }
            }
            if (n === 2) {
                childNodes.splice(1, 2);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
exports.fixPrescripts = fixPrescripts;
exports.MathtoolsConfiguration = Configuration_js_1.Configuration.create('mathtools', {
    handler: {
        macro: ['mathtools-macros', 'mathtools-delimiters'],
        environment: ['mathtools-environments'],
        delimiter: ['mathtools-delimiters'],
        character: ['mathtools-characters']
    },
    items: (_a = {},
        _a[MathtoolsItems_js_1.MultlinedItem.prototype.kind] = MathtoolsItems_js_1.MultlinedItem,
        _a),
    init: initMathtools,
    config: configMathtools,
    postprocessors: [[fixPrescripts, -6]],
    options: {
        mathtools: {
            'multlinegap': '1em',
            'multlined-pos': 'c',
            'firstline-afterskip': '',
            'lastline-preskip': '',
            'smallmatrix-align': 'c',
            'shortvdotsadjustabove': '.2em',
            'shortvdotsadjustbelow': '.2em',
            'centercolon': false,
            'centercolon-offset': '.04em',
            'thincolon-dx': '-.04em',
            'thincolon-dw': '-.08em',
            'use-unicode': false,
            'prescript-sub-format': '',
            'prescript-sup-format': '',
            'prescript-arg-format': '',
            'allow-mathtoolsset': true,
            pairedDelimiters: (0, Options_js_1.expandable)({}),
            tagforms: (0, Options_js_1.expandable)({}),
        }
    }
});
//# sourceMappingURL=MathtoolsConfiguration.js.map

/***/ }),

/***/ 14508:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MultlinedItem = void 0;
var AmsItems_js_1 = __webpack_require__(30354);
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var TexConstants_js_1 = __webpack_require__(48948);
var MultlinedItem = (function (_super) {
    __extends(MultlinedItem, _super);
    function MultlinedItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MultlinedItem.prototype, "kind", {
        get: function () {
            return 'multlined';
        },
        enumerable: false,
        configurable: true
    });
    MultlinedItem.prototype.EndTable = function () {
        if (this.Size() || this.row.length) {
            this.EndEntry();
            this.EndRow();
        }
        if (this.table.length > 1) {
            var options = this.factory.configuration.options.mathtools;
            var gap = options.multlinegap;
            var firstskip = options['firstline-afterskip'] || gap;
            var lastskip = options['lastline-preskip'] || gap;
            var first = NodeUtil_js_1.default.getChildren(this.table[0])[0];
            if (NodeUtil_js_1.default.getAttribute(first, 'columnalign') !== TexConstants_js_1.TexConstant.Align.RIGHT) {
                first.appendChild(this.create('node', 'mspace', [], { width: firstskip }));
            }
            var last = NodeUtil_js_1.default.getChildren(this.table[this.table.length - 1])[0];
            if (NodeUtil_js_1.default.getAttribute(last, 'columnalign') !== TexConstants_js_1.TexConstant.Align.LEFT) {
                var top_1 = NodeUtil_js_1.default.getChildren(last)[0];
                top_1.childNodes.unshift(null);
                var space = this.create('node', 'mspace', [], { width: lastskip });
                NodeUtil_js_1.default.setChild(top_1, 0, space);
            }
        }
        _super.prototype.EndTable.call(this);
    };
    return MultlinedItem;
}(AmsItems_js_1.MultlineItem));
exports.MultlinedItem = MultlinedItem;
//# sourceMappingURL=MathtoolsItems.js.map

/***/ }),

/***/ 44621:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ParseMethods_js_1 = __importDefault(__webpack_require__(96004));
var SymbolMap_js_1 = __webpack_require__(92715);
var TexConstants_js_1 = __webpack_require__(48948);
var MathtoolsMethods_js_1 = __webpack_require__(27899);
new SymbolMap_js_1.CommandMap('mathtools-macros', {
    shoveleft: ['HandleShove', TexConstants_js_1.TexConstant.Align.LEFT],
    shoveright: ['HandleShove', TexConstants_js_1.TexConstant.Align.RIGHT],
    xleftrightarrow: ['xArrow', 0x2194, 10, 10],
    xLeftarrow: ['xArrow', 0x21D0, 12, 7],
    xRightarrow: ['xArrow', 0x21D2, 7, 12],
    xLeftrightarrow: ['xArrow', 0x21D4, 12, 12],
    xhookleftarrow: ['xArrow', 0x21A9, 10, 5],
    xhookrightarrow: ['xArrow', 0x21AA, 5, 10],
    xmapsto: ['xArrow', 0x21A6, 10, 10],
    xrightharpoondown: ['xArrow', 0x21C1, 5, 10],
    xleftharpoondown: ['xArrow', 0x21BD, 10, 5],
    xrightleftharpoons: ['xArrow', 0x21CC, 10, 10],
    xrightharpoonup: ['xArrow', 0x21C0, 5, 10],
    xleftharpoonup: ['xArrow', 0x21BC, 10, 5],
    xleftrightharpoons: ['xArrow', 0x21CB, 10, 10],
    mathllap: ['MathLap', 'l', false],
    mathrlap: ['MathLap', 'r', false],
    mathclap: ['MathLap', 'c', false],
    clap: ['MtLap', 'c'],
    textllap: ['MtLap', 'l'],
    textrlap: ['MtLap', 'r'],
    textclap: ['MtLap', 'c'],
    cramped: 'Cramped',
    crampedllap: ['MathLap', 'l', true],
    crampedrlap: ['MathLap', 'r', true],
    crampedclap: ['MathLap', 'c', true],
    crampedsubstack: ['Macro', '\\begin{crampedsubarray}{c}#1\\end{crampedsubarray}', 1],
    mathmbox: 'MathMBox',
    mathmakebox: 'MathMakeBox',
    overbracket: 'UnderOverBracket',
    underbracket: 'UnderOverBracket',
    refeq: 'HandleRef',
    MoveEqLeft: ['Macro', '\\hspace{#1em}&\\hspace{-#1em}', 1, '2'],
    Aboxed: 'Aboxed',
    ArrowBetweenLines: 'ArrowBetweenLines',
    vdotswithin: 'VDotsWithin',
    shortvdotswithin: 'ShortVDotsWithin',
    MTFlushSpaceAbove: 'FlushSpaceAbove',
    MTFlushSpaceBelow: 'FlushSpaceBelow',
    DeclarePairedDelimiter: 'DeclarePairedDelimiter',
    DeclarePairedDelimiterX: 'DeclarePairedDelimiterX',
    DeclarePairedDelimiterXPP: 'DeclarePairedDelimiterXPP',
    DeclarePairedDelimiters: 'DeclarePairedDelimiter',
    DeclarePairedDelimitersX: 'DeclarePairedDelimiterX',
    DeclarePairedDelimitersXPP: 'DeclarePairedDelimiterXPP',
    centercolon: ['CenterColon', true, true],
    ordinarycolon: ['CenterColon', false],
    MTThinColon: ['CenterColon', true, true, true],
    coloneqq: ['Relation', ':=', '\u2254'],
    Coloneqq: ['Relation', '::=', '\u2A74'],
    coloneq: ['Relation', ':-'],
    Coloneq: ['Relation', '::-'],
    eqqcolon: ['Relation', '=:', '\u2255'],
    Eqqcolon: ['Relation', '=::'],
    eqcolon: ['Relation', '-:', '\u2239'],
    Eqcolon: ['Relation', '-::'],
    colonapprox: ['Relation', ':\\approx'],
    Colonapprox: ['Relation', '::\\approx'],
    colonsim: ['Relation', ':\\sim'],
    Colonsim: ['Relation', '::\\sim'],
    dblcolon: ['Relation', '::', '\u2237'],
    nuparrow: ['NArrow', '\u2191', '.06em'],
    ndownarrow: ['NArrow', '\u2193', '.25em'],
    bigtimes: ['Macro', '\\mathop{\\Large\\kern-.1em\\boldsymbol{\\times}\\kern-.1em}'],
    splitfrac: ['SplitFrac', false],
    splitdfrac: ['SplitFrac', true],
    xmathstrut: 'XMathStrut',
    prescript: 'Prescript',
    newtagform: ['NewTagForm', false],
    renewtagform: ['NewTagForm', true],
    usetagform: 'UseTagForm',
    adjustlimits: [
        'MacroWithTemplate',
        '\\mathop{{#1}\\vphantom{{#3}}}_{{#2}\\vphantom{{#4}}}\\mathop{{#3}\\vphantom{{#1}}}_{{#4}\\vphantom{{#2}}}',
        4, , '_', , '_'
    ],
    mathtoolsset: 'SetOptions'
}, MathtoolsMethods_js_1.MathtoolsMethods);
new SymbolMap_js_1.EnvironmentMap('mathtools-environments', ParseMethods_js_1.default.environment, {
    dcases: ['Array', null, '\\{', '', 'll', null, '.2em', 'D'],
    rcases: ['Array', null, '', '\\}', 'll', null, '.2em'],
    drcases: ['Array', null, '', '\\}', 'll', null, '.2em', 'D'],
    'dcases*': ['Cases', null, '{', '', 'D'],
    'rcases*': ['Cases', null, '', '}'],
    'drcases*': ['Cases', null, '', '}', 'D'],
    'cases*': ['Cases', null, '{', ''],
    'matrix*': ['MtMatrix', null, null, null],
    'pmatrix*': ['MtMatrix', null, '(', ')'],
    'bmatrix*': ['MtMatrix', null, '[', ']'],
    'Bmatrix*': ['MtMatrix', null, '\\{', '\\}'],
    'vmatrix*': ['MtMatrix', null, '\\vert', '\\vert'],
    'Vmatrix*': ['MtMatrix', null, '\\Vert', '\\Vert'],
    'smallmatrix*': ['MtSmallMatrix', null, null, null],
    psmallmatrix: ['MtSmallMatrix', null, '(', ')', 'c'],
    'psmallmatrix*': ['MtSmallMatrix', null, '(', ')'],
    bsmallmatrix: ['MtSmallMatrix', null, '[', ']', 'c'],
    'bsmallmatrix*': ['MtSmallMatrix', null, '[', ']'],
    Bsmallmatrix: ['MtSmallMatrix', null, '\\{', '\\}', 'c'],
    'Bsmallmatrix*': ['MtSmallMatrix', null, '\\{', '\\}'],
    vsmallmatrix: ['MtSmallMatrix', null, '\\vert', '\\vert', 'c'],
    'vsmallmatrix*': ['MtSmallMatrix', null, '\\vert', '\\vert'],
    Vsmallmatrix: ['MtSmallMatrix', null, '\\Vert', '\\Vert', 'c'],
    'Vsmallmatrix*': ['MtSmallMatrix', null, '\\Vert', '\\Vert'],
    crampedsubarray: ['Array', null, null, null, null, '0em', '0.1em', 'S\'', 1],
    multlined: 'MtMultlined',
    spreadlines: ['SpreadLines', true],
    lgathered: ['AmsEqnArray', null, null, null, 'l', null, '.5em', 'D'],
    rgathered: ['AmsEqnArray', null, null, null, 'r', null, '.5em', 'D'],
}, MathtoolsMethods_js_1.MathtoolsMethods);
new SymbolMap_js_1.DelimiterMap('mathtools-delimiters', ParseMethods_js_1.default.delimiter, {
    '\\lparen': '(',
    '\\rparen': ')'
});
new SymbolMap_js_1.CommandMap('mathtools-characters', {
    ':': ['CenterColon', true]
}, MathtoolsMethods_js_1.MathtoolsMethods);
//# sourceMappingURL=MathtoolsMappings.js.map

/***/ }),

/***/ 27899:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MathtoolsMethods = void 0;
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var AmsMethods_js_1 = __webpack_require__(42828);
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var MmlNode_js_1 = __webpack_require__(18426);
var lengths_js_1 = __webpack_require__(77130);
var Options_js_1 = __webpack_require__(36059);
var NewcommandUtil_js_1 = __importDefault(__webpack_require__(97981));
var NewcommandMethods_js_1 = __importDefault(__webpack_require__(57860));
var MathtoolsUtil_js_1 = __webpack_require__(71893);
exports.MathtoolsMethods = {
    MtMatrix: function (parser, begin, open, close) {
        var align = parser.GetBrackets("\\begin{".concat(begin.getName(), "}"), 'c');
        return exports.MathtoolsMethods.Array(parser, begin, open, close, align);
    },
    MtSmallMatrix: function (parser, begin, open, close, align) {
        if (!align) {
            align = parser.GetBrackets("\\begin{".concat(begin.getName(), "}"), parser.options.mathtools['smallmatrix-align']);
        }
        return exports.MathtoolsMethods.Array(parser, begin, open, close, align, ParseUtil_js_1.default.Em(1 / 3), '.2em', 'S', 1);
    },
    MtMultlined: function (parser, begin) {
        var _a;
        var name = "\\begin{".concat(begin.getName(), "}");
        var pos = parser.GetBrackets(name, parser.options.mathtools['multlined-pos'] || 'c');
        var width = pos ? parser.GetBrackets(name, '') : '';
        if (pos && !pos.match(/^[cbt]$/)) {
            _a = __read([pos, width], 2), width = _a[0], pos = _a[1];
        }
        parser.Push(begin);
        var item = parser.itemFactory.create('multlined', parser, begin);
        item.arraydef = {
            displaystyle: true,
            rowspacing: '.5em',
            width: width || 'auto',
            columnwidth: '100%',
        };
        return ParseUtil_js_1.default.setArrayAlign(item, pos || 'c');
    },
    HandleShove: function (parser, name, shove) {
        var top = parser.stack.Top();
        if (top.kind !== 'multline' && top.kind !== 'multlined') {
            throw new TexError_js_1.default('CommandInMultlined', '%1 can only appear within the multline or multlined environments', name);
        }
        if (top.Size()) {
            throw new TexError_js_1.default('CommandAtTheBeginingOfLine', '%1 must come at the beginning of the line', name);
        }
        top.setProperty('shove', shove);
        var shift = parser.GetBrackets(name);
        var mml = parser.ParseArg(name);
        if (shift) {
            var mrow = parser.create('node', 'mrow', []);
            var mspace = parser.create('node', 'mspace', [], { width: shift });
            if (shove === 'left') {
                mrow.appendChild(mspace);
                mrow.appendChild(mml);
            }
            else {
                mrow.appendChild(mml);
                mrow.appendChild(mspace);
            }
            mml = mrow;
        }
        parser.Push(mml);
    },
    SpreadLines: function (parser, begin) {
        var e_1, _a;
        if (parser.stack.env.closing === begin.getName()) {
            delete parser.stack.env.closing;
            var top_1 = parser.stack.Pop();
            var mml = top_1.toMml();
            var spread = top_1.getProperty('spread');
            if (mml.isInferred) {
                try {
                    for (var _b = __values(NodeUtil_js_1.default.getChildren(mml)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        MathtoolsUtil_js_1.MathtoolsUtil.spreadLines(child, spread);
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
            else {
                MathtoolsUtil_js_1.MathtoolsUtil.spreadLines(mml, spread);
            }
            parser.Push(mml);
        }
        else {
            var spread = parser.GetDimen("\\begin{".concat(begin.getName(), "}"));
            begin.setProperty('spread', spread);
            parser.Push(begin);
        }
    },
    Cases: function (parser, begin, open, close, style) {
        var array = parser.itemFactory.create('array').setProperty('casesEnv', begin.getName());
        array.arraydef = {
            rowspacing: '.2em',
            columnspacing: '1em',
            columnalign: 'left'
        };
        if (style === 'D') {
            array.arraydef.displaystyle = true;
        }
        array.setProperties({ open: open, close: close });
        parser.Push(begin);
        return array;
    },
    MathLap: function (parser, name, pos, cramped) {
        var style = parser.GetBrackets(name, '').trim();
        var mml = parser.create('node', 'mstyle', [
            parser.create('node', 'mpadded', [parser.ParseArg(name)], __assign({ width: 0 }, (pos === 'r' ? {} : { lspace: (pos === 'l' ? '-1width' : '-.5width') })))
        ], { 'data-cramped': cramped });
        MathtoolsUtil_js_1.MathtoolsUtil.setDisplayLevel(mml, style);
        parser.Push(parser.create('node', 'TeXAtom', [mml]));
    },
    Cramped: function (parser, name) {
        var style = parser.GetBrackets(name, '').trim();
        var arg = parser.ParseArg(name);
        var mml = parser.create('node', 'mstyle', [arg], { 'data-cramped': true });
        MathtoolsUtil_js_1.MathtoolsUtil.setDisplayLevel(mml, style);
        parser.Push(mml);
    },
    MtLap: function (parser, name, pos) {
        var content = ParseUtil_js_1.default.internalMath(parser, parser.GetArgument(name), 0);
        var mml = parser.create('node', 'mpadded', content, { width: 0 });
        if (pos !== 'r') {
            NodeUtil_js_1.default.setAttribute(mml, 'lspace', pos === 'l' ? '-1width' : '-.5width');
        }
        parser.Push(mml);
    },
    MathMakeBox: function (parser, name) {
        var width = parser.GetBrackets(name);
        var pos = parser.GetBrackets(name, 'c');
        var mml = parser.create('node', 'mpadded', [parser.ParseArg(name)]);
        if (width) {
            NodeUtil_js_1.default.setAttribute(mml, 'width', width);
        }
        var align = (0, Options_js_1.lookup)(pos, { c: 'center', r: 'right' }, '');
        if (align) {
            NodeUtil_js_1.default.setAttribute(mml, 'data-align', align);
        }
        parser.Push(mml);
    },
    MathMBox: function (parser, name) {
        parser.Push(parser.create('node', 'mrow', [parser.ParseArg(name)]));
    },
    UnderOverBracket: function (parser, name) {
        var thickness = (0, lengths_js_1.length2em)(parser.GetBrackets(name, '.1em'), .1);
        var height = parser.GetBrackets(name, '.2em');
        var arg = parser.GetArgument(name);
        var _a = __read((name.charAt(1) === 'o' ?
            ['over', 'accent', 'bottom'] :
            ['under', 'accentunder', 'top']), 3), pos = _a[0], accent = _a[1], border = _a[2];
        var t = (0, lengths_js_1.em)(thickness);
        var base = new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml();
        var copy = new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml();
        var script = parser.create('node', 'mpadded', [
            parser.create('node', 'mphantom', [copy])
        ], {
            style: "border: ".concat(t, " solid; border-").concat(border, ": none"),
            height: height,
            depth: 0
        });
        var node = ParseUtil_js_1.default.underOver(parser, base, script, pos, true);
        var munderover = NodeUtil_js_1.default.getChildAt(NodeUtil_js_1.default.getChildAt(node, 0), 0);
        NodeUtil_js_1.default.setAttribute(munderover, accent, true);
        parser.Push(node);
    },
    Aboxed: function (parser, name) {
        var top = MathtoolsUtil_js_1.MathtoolsUtil.checkAlignment(parser, name);
        if (top.row.length % 2 === 1) {
            top.row.push(parser.create('node', 'mtd', []));
        }
        var arg = parser.GetArgument(name);
        var rest = parser.string.substr(parser.i);
        parser.string = arg + '&&\\endAboxed';
        parser.i = 0;
        var left = parser.GetUpTo(name, '&');
        var right = parser.GetUpTo(name, '&');
        parser.GetUpTo(name, '\\endAboxed');
        var tex = ParseUtil_js_1.default.substituteArgs(parser, [left, right], '\\rlap{\\boxed{#1{}#2}}\\kern.267em\\phantom{#1}&\\phantom{{}#2}\\kern.267em');
        parser.string = tex + rest;
        parser.i = 0;
    },
    ArrowBetweenLines: function (parser, name) {
        var top = MathtoolsUtil_js_1.MathtoolsUtil.checkAlignment(parser, name);
        if (top.Size() || top.row.length) {
            throw new TexError_js_1.default('BetweenLines', '%1 must be on a row by itself', name);
        }
        var star = parser.GetStar();
        var symbol = parser.GetBrackets(name, '\\Updownarrow');
        if (star) {
            top.EndEntry();
            top.EndEntry();
        }
        var tex = (star ? '\\quad' + symbol : symbol + '\\quad');
        var mml = new TexParser_js_1.default(tex, parser.stack.env, parser.configuration).mml();
        parser.Push(mml);
        top.EndEntry();
        top.EndRow();
    },
    VDotsWithin: function (parser, name) {
        var top = parser.stack.Top();
        var isFlush = (top.getProperty('flushspaceabove') === top.table.length);
        var arg = '\\mmlToken{mi}{}' + parser.GetArgument(name) + '\\mmlToken{mi}{}';
        var base = new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml();
        var mml = parser.create('node', 'mpadded', [
            parser.create('node', 'mpadded', [
                parser.create('node', 'mo', [
                    parser.create('text', '\u22EE')
                ])
            ], __assign({ width: 0, lspace: '-.5width' }, (isFlush ? { height: '-.6em', voffset: '-.18em' } : {}))),
            parser.create('node', 'mphantom', [base])
        ], {
            lspace: '.5width'
        });
        parser.Push(mml);
    },
    ShortVDotsWithin: function (parser, _name) {
        var top = parser.stack.Top();
        var star = parser.GetStar();
        exports.MathtoolsMethods.FlushSpaceAbove(parser, '\\MTFlushSpaceAbove');
        !star && top.EndEntry();
        exports.MathtoolsMethods.VDotsWithin(parser, '\\vdotswithin');
        star && top.EndEntry();
        exports.MathtoolsMethods.FlushSpaceBelow(parser, '\\MTFlushSpaceBelow');
    },
    FlushSpaceAbove: function (parser, name) {
        var top = MathtoolsUtil_js_1.MathtoolsUtil.checkAlignment(parser, name);
        top.setProperty('flushspaceabove', top.table.length);
        top.addRowSpacing('-' + parser.options.mathtools['shortvdotsadjustabove']);
    },
    FlushSpaceBelow: function (parser, name) {
        var top = MathtoolsUtil_js_1.MathtoolsUtil.checkAlignment(parser, name);
        top.Size() && top.EndEntry();
        top.EndRow();
        top.addRowSpacing('-' + parser.options.mathtools['shortvdotsadjustbelow']);
    },
    PairedDelimiters: function (parser, name, open, close, body, n, pre, post) {
        if (body === void 0) { body = '#1'; }
        if (n === void 0) { n = 1; }
        if (pre === void 0) { pre = ''; }
        if (post === void 0) { post = ''; }
        var star = parser.GetStar();
        var size = (star ? '' : parser.GetBrackets(name));
        var _a = __read((star ? ['\\left', '\\right'] : size ? [size + 'l', size + 'r'] : ['', '']), 2), left = _a[0], right = _a[1];
        var delim = (star ? '\\middle' : size || '');
        if (n) {
            var args = [];
            for (var i = args.length; i < n; i++) {
                args.push(parser.GetArgument(name));
            }
            pre = ParseUtil_js_1.default.substituteArgs(parser, args, pre);
            body = ParseUtil_js_1.default.substituteArgs(parser, args, body);
            post = ParseUtil_js_1.default.substituteArgs(parser, args, post);
        }
        body = body.replace(/\\delimsize/g, delim);
        parser.string = [pre, left, open, body, right, close, post, parser.string.substr(parser.i)]
            .reduce(function (s, part) { return ParseUtil_js_1.default.addArgs(parser, s, part); }, '');
        parser.i = 0;
        ParseUtil_js_1.default.checkMaxMacros(parser);
    },
    DeclarePairedDelimiter: function (parser, name) {
        var cs = NewcommandUtil_js_1.default.GetCsNameArgument(parser, name);
        var open = parser.GetArgument(name);
        var close = parser.GetArgument(name);
        MathtoolsUtil_js_1.MathtoolsUtil.addPairedDelims(parser.configuration, cs, [open, close]);
    },
    DeclarePairedDelimiterX: function (parser, name) {
        var cs = NewcommandUtil_js_1.default.GetCsNameArgument(parser, name);
        var n = NewcommandUtil_js_1.default.GetArgCount(parser, name);
        var open = parser.GetArgument(name);
        var close = parser.GetArgument(name);
        var body = parser.GetArgument(name);
        MathtoolsUtil_js_1.MathtoolsUtil.addPairedDelims(parser.configuration, cs, [open, close, body, n]);
    },
    DeclarePairedDelimiterXPP: function (parser, name) {
        var cs = NewcommandUtil_js_1.default.GetCsNameArgument(parser, name);
        var n = NewcommandUtil_js_1.default.GetArgCount(parser, name);
        var pre = parser.GetArgument(name);
        var open = parser.GetArgument(name);
        var close = parser.GetArgument(name);
        var post = parser.GetArgument(name);
        var body = parser.GetArgument(name);
        MathtoolsUtil_js_1.MathtoolsUtil.addPairedDelims(parser.configuration, cs, [open, close, body, n, pre, post]);
    },
    CenterColon: function (parser, _name, center, force, thin) {
        if (force === void 0) { force = false; }
        if (thin === void 0) { thin = false; }
        var options = parser.options.mathtools;
        var mml = parser.create('token', 'mo', {}, ':');
        if (center && (options['centercolon'] || force)) {
            var dy = options['centercolon-offset'];
            mml = parser.create('node', 'mpadded', [mml], __assign({ voffset: dy, height: "+".concat(dy), depth: "-".concat(dy) }, (thin ? { width: options['thincolon-dw'], lspace: options['thincolon-dx'] } : {})));
        }
        parser.Push(mml);
    },
    Relation: function (parser, _name, tex, unicode) {
        var options = parser.options.mathtools;
        if (options['use-unicode'] && unicode) {
            parser.Push(parser.create('token', 'mo', { texClass: MmlNode_js_1.TEXCLASS.REL }, unicode));
        }
        else {
            tex = '\\mathrel{' + tex.replace(/:/g, '\\MTThinColon').replace(/-/g, '\\mathrel{-}') + '}';
            parser.string = ParseUtil_js_1.default.addArgs(parser, tex, parser.string.substr(parser.i));
            parser.i = 0;
        }
    },
    NArrow: function (parser, _name, c, dy) {
        parser.Push(parser.create('node', 'TeXAtom', [
            parser.create('token', 'mtext', {}, c),
            parser.create('node', 'mpadded', [
                parser.create('node', 'mpadded', [
                    parser.create('node', 'menclose', [
                        parser.create('node', 'mspace', [], { height: '.2em', depth: 0, width: '.4em' })
                    ], { notation: 'updiagonalstrike', 'data-thickness': '.05em', 'data-padding': 0 })
                ], { width: 0, lspace: '-.5width', voffset: dy }),
                parser.create('node', 'mphantom', [
                    parser.create('token', 'mtext', {}, c)
                ])
            ], { width: 0, lspace: '-.5width' })
        ], { texClass: MmlNode_js_1.TEXCLASS.REL }));
    },
    SplitFrac: function (parser, name, display) {
        var num = parser.ParseArg(name);
        var den = parser.ParseArg(name);
        parser.Push(parser.create('node', 'mstyle', [
            parser.create('node', 'mfrac', [
                parser.create('node', 'mstyle', [
                    num,
                    parser.create('token', 'mi'),
                    parser.create('token', 'mspace', { width: '1em' })
                ], { scriptlevel: 0 }),
                parser.create('node', 'mstyle', [
                    parser.create('token', 'mspace', { width: '1em' }),
                    parser.create('token', 'mi'),
                    den
                ], { scriptlevel: 0 })
            ], { linethickness: 0, numalign: 'left', denomalign: 'right' })
        ], { displaystyle: display, scriptlevel: 0 }));
    },
    XMathStrut: function (parser, name) {
        var dd = parser.GetBrackets(name);
        var dh = parser.GetArgument(name);
        dh = MathtoolsUtil_js_1.MathtoolsUtil.plusOrMinus(name, dh);
        dd = MathtoolsUtil_js_1.MathtoolsUtil.plusOrMinus(name, dd || dh);
        parser.Push(parser.create('node', 'TeXAtom', [
            parser.create('node', 'mpadded', [
                parser.create('node', 'mphantom', [
                    parser.create('token', 'mo', { stretchy: false }, '(')
                ])
            ], { width: 0, height: dh + 'height', depth: dd + 'depth' })
        ], { texClass: MmlNode_js_1.TEXCLASS.ORD }));
    },
    Prescript: function (parser, name) {
        var sup = MathtoolsUtil_js_1.MathtoolsUtil.getScript(parser, name, 'sup');
        var sub = MathtoolsUtil_js_1.MathtoolsUtil.getScript(parser, name, 'sub');
        var base = MathtoolsUtil_js_1.MathtoolsUtil.getScript(parser, name, 'arg');
        if (NodeUtil_js_1.default.isType(sup, 'none') && NodeUtil_js_1.default.isType(sub, 'none')) {
            parser.Push(base);
            return;
        }
        var mml = parser.create('node', 'mmultiscripts', [base]);
        NodeUtil_js_1.default.getChildren(mml).push(null, null);
        NodeUtil_js_1.default.appendChildren(mml, [parser.create('node', 'mprescripts'), sub, sup]);
        mml.setProperty('fixPrescript', true);
        parser.Push(mml);
    },
    NewTagForm: function (parser, name, renew) {
        if (renew === void 0) { renew = false; }
        var tags = parser.tags;
        if (!('mtFormats' in tags)) {
            throw new TexError_js_1.default('TagsNotMT', '%1 can only be used with ams or mathtools tags', name);
        }
        var id = parser.GetArgument(name).trim();
        if (!id) {
            throw new TexError_js_1.default('InvalidTagFormID', 'Tag form name can\'t be empty');
        }
        var format = parser.GetBrackets(name, '');
        var left = parser.GetArgument(name);
        var right = parser.GetArgument(name);
        if (!renew && tags.mtFormats.has(id)) {
            throw new TexError_js_1.default('DuplicateTagForm', 'Duplicate tag form: %1', id);
        }
        tags.mtFormats.set(id, [left, right, format]);
    },
    UseTagForm: function (parser, name) {
        var tags = parser.tags;
        if (!('mtFormats' in tags)) {
            throw new TexError_js_1.default('TagsNotMT', '%1 can only be used with ams or mathtools tags', name);
        }
        var id = parser.GetArgument(name).trim();
        if (!id) {
            tags.mtCurrent = null;
            return;
        }
        if (!tags.mtFormats.has(id)) {
            throw new TexError_js_1.default('UndefinedTagForm', 'Undefined tag form: %1', id);
        }
        tags.mtCurrent = tags.mtFormats.get(id);
    },
    SetOptions: function (parser, name) {
        var e_2, _a;
        var options = parser.options.mathtools;
        if (!options['allow-mathtoolsset']) {
            throw new TexError_js_1.default('ForbiddenMathtoolsSet', '%1 is disabled', name);
        }
        var allowed = {};
        Object.keys(options).forEach(function (id) {
            if (id !== 'pariedDelimiters' && id !== 'tagforms' && id !== 'allow-mathtoolsset') {
                allowed[id] = 1;
            }
        });
        var args = parser.GetArgument(name);
        var keys = ParseUtil_js_1.default.keyvalOptions(args, allowed, true);
        try {
            for (var _b = __values(Object.keys(keys)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                options[id] = keys[id];
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    },
    Array: BaseMethods_js_1.default.Array,
    Macro: BaseMethods_js_1.default.Macro,
    xArrow: AmsMethods_js_1.AmsMethods.xArrow,
    HandleRef: AmsMethods_js_1.AmsMethods.HandleRef,
    AmsEqnArray: AmsMethods_js_1.AmsMethods.AmsEqnArray,
    MacroWithTemplate: NewcommandMethods_js_1.default.MacroWithTemplate,
};
//# sourceMappingURL=MathtoolsMethods.js.map

/***/ }),

/***/ 47778:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MathtoolsTagFormat = void 0;
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var Tags_js_1 = __webpack_require__(56711);
var tagID = 0;
function MathtoolsTagFormat(config, jax) {
    var tags = jax.parseOptions.options.tags;
    if (tags !== 'base' && config.tags.hasOwnProperty(tags)) {
        Tags_js_1.TagsFactory.add(tags, config.tags[tags]);
    }
    var TagClass = Tags_js_1.TagsFactory.create(jax.parseOptions.options.tags).constructor;
    var TagFormat = (function (_super) {
        __extends(TagFormat, _super);
        function TagFormat() {
            var e_1, _a;
            var _this = _super.call(this) || this;
            _this.mtFormats = new Map();
            _this.mtCurrent = null;
            var forms = jax.parseOptions.options.mathtools.tagforms;
            try {
                for (var _b = __values(Object.keys(forms)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var form = _c.value;
                    if (!Array.isArray(forms[form]) || forms[form].length !== 3) {
                        throw new TexError_js_1.default('InvalidTagFormDef', 'The tag form definition for "%1" should be an array fo three strings', form);
                    }
                    _this.mtFormats.set(form, forms[form]);
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
        TagFormat.prototype.formatTag = function (tag) {
            if (this.mtCurrent) {
                var _a = __read(this.mtCurrent, 3), left = _a[0], right = _a[1], format = _a[2];
                return (format ? "".concat(left).concat(format, "{").concat(tag, "}").concat(right) : "".concat(left).concat(tag).concat(right));
            }
            return _super.prototype.formatTag.call(this, tag);
        };
        return TagFormat;
    }(TagClass));
    tagID++;
    var tagName = 'MathtoolsTags-' + tagID;
    Tags_js_1.TagsFactory.add(tagName, TagFormat);
    jax.parseOptions.options.tags = tagName;
}
exports.MathtoolsTagFormat = MathtoolsTagFormat;
//# sourceMappingURL=MathtoolsTags.js.map

/***/ }),

/***/ 71893:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MathtoolsUtil = void 0;
var BaseItems_js_1 = __webpack_require__(5065);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var Symbol_js_1 = __webpack_require__(56941);
var Options_js_1 = __webpack_require__(36059);
var MathtoolsMethods_js_1 = __webpack_require__(27899);
var MathtoolsConfiguration_js_1 = __webpack_require__(56379);
exports.MathtoolsUtil = {
    setDisplayLevel: function (mml, style) {
        if (!style)
            return;
        var _a = __read((0, Options_js_1.lookup)(style, {
            '\\displaystyle': [true, 0],
            '\\textstyle': [false, 0],
            '\\scriptstyle': [false, 1],
            '\\scriptscriptstyle': [false, 2]
        }, [null, null]), 2), display = _a[0], script = _a[1];
        if (display !== null) {
            mml.attributes.set('displaystyle', display);
            mml.attributes.set('scriptlevel', script);
        }
    },
    checkAlignment: function (parser, name) {
        var top = parser.stack.Top();
        if (top.kind !== BaseItems_js_1.EqnArrayItem.prototype.kind) {
            throw new TexError_js_1.default('NotInAlignment', '%1 can only be used in aligment environments', name);
        }
        return top;
    },
    addPairedDelims: function (config, cs, args) {
        var delims = config.handlers.retrieve(MathtoolsConfiguration_js_1.PAIREDDELIMS);
        delims.add(cs, new Symbol_js_1.Macro(cs, MathtoolsMethods_js_1.MathtoolsMethods.PairedDelimiters, args));
    },
    spreadLines: function (mtable, spread) {
        if (!mtable.isKind('mtable'))
            return;
        var rowspacing = mtable.attributes.get('rowspacing');
        if (rowspacing) {
            var add_1 = ParseUtil_js_1.default.dimen2em(spread);
            rowspacing = rowspacing
                .split(/ /)
                .map(function (s) { return ParseUtil_js_1.default.Em(Math.max(0, ParseUtil_js_1.default.dimen2em(s) + add_1)); })
                .join(' ');
        }
        else {
            rowspacing = spread;
        }
        mtable.attributes.set('rowspacing', rowspacing);
    },
    plusOrMinus: function (name, n) {
        n = n.trim();
        if (!n.match(/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/)) {
            throw new TexError_js_1.default('NotANumber', 'Argument to %1 is not a number', name);
        }
        return (n.match(/^[-+]/) ? n : '+' + n);
    },
    getScript: function (parser, name, pos) {
        var arg = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(name));
        if (arg === '') {
            return parser.create('node', 'none');
        }
        var format = parser.options.mathtools["prescript-".concat(pos, "-format")];
        format && (arg = "".concat(format, "{").concat(arg, "}"));
        return new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml();
    }
};
//# sourceMappingURL=MathtoolsUtil.js.map

/***/ }),

/***/ 57434:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MhchemConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
var AmsMethods_js_1 = __webpack_require__(42828);
var mhchemParser_js_1 = __webpack_require__(13090);
var MhchemMethods = {};
MhchemMethods.Macro = BaseMethods_js_1.default.Macro;
MhchemMethods.xArrow = AmsMethods_js_1.AmsMethods.xArrow;
MhchemMethods.Machine = function (parser, name, machine) {
    var arg = parser.GetArgument(name);
    var tex;
    try {
        tex = mhchemParser_js_1.mhchemParser.toTex(arg, machine);
    }
    catch (err) {
        throw new TexError_js_1.default(err[0], err[1]);
    }
    parser.string = tex + parser.string.substr(parser.i);
    parser.i = 0;
};
new SymbolMap_js_1.CommandMap('mhchem', {
    ce: ['Machine', 'ce'],
    pu: ['Machine', 'pu'],
    longrightleftharpoons: [
        'Macro',
        '\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}'
    ],
    longRightleftharpoons: [
        'Macro',
        '\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\smash{\\leftharpoondown}}'
    ],
    longLeftrightharpoons: [
        'Macro',
        '\\stackrel{\\textstyle\\vphantom{{-}}{\\rightharpoonup}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}'
    ],
    longleftrightarrows: [
        'Macro',
        '\\stackrel{\\longrightarrow}{\\smash{\\longleftarrow}\\Rule{0px}{.25em}{0px}}'
    ],
    tripledash: [
        'Macro',
        '\\vphantom{-}\\raise2mu{\\kern2mu\\tiny\\text{-}\\kern1mu\\text{-}\\kern1mu\\text{-}\\kern2mu}'
    ],
    xleftrightarrow: ['xArrow', 0x2194, 6, 6],
    xrightleftharpoons: ['xArrow', 0x21CC, 5, 7],
    xRightleftharpoons: ['xArrow', 0x21CC, 5, 7],
    xLeftrightharpoons: ['xArrow', 0x21CC, 5, 7]
}, MhchemMethods);
exports.MhchemConfiguration = Configuration_js_1.Configuration.create('mhchem', { handler: { macro: ['mhchem'] } });
//# sourceMappingURL=MhchemConfiguration.js.map

/***/ }),

/***/ 25112:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewcommandConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var NewcommandItems_js_1 = __webpack_require__(40421);
var NewcommandUtil_js_1 = __importDefault(__webpack_require__(97981));
__webpack_require__(2921);
var ParseMethods_js_1 = __importDefault(__webpack_require__(96004));
var sm = __importStar(__webpack_require__(92715));
var init = function (config) {
    new sm.DelimiterMap(NewcommandUtil_js_1.default.NEW_DELIMITER, ParseMethods_js_1.default.delimiter, {});
    new sm.CommandMap(NewcommandUtil_js_1.default.NEW_COMMAND, {}, {});
    new sm.EnvironmentMap(NewcommandUtil_js_1.default.NEW_ENVIRONMENT, ParseMethods_js_1.default.environment, {}, {});
    config.append(Configuration_js_1.Configuration.local({ handler: { character: [],
            delimiter: [NewcommandUtil_js_1.default.NEW_DELIMITER],
            macro: [NewcommandUtil_js_1.default.NEW_DELIMITER,
                NewcommandUtil_js_1.default.NEW_COMMAND],
            environment: [NewcommandUtil_js_1.default.NEW_ENVIRONMENT]
        },
        priority: -1 }));
};
exports.NewcommandConfiguration = Configuration_js_1.Configuration.create('newcommand', {
    handler: {
        macro: ['Newcommand-macros']
    },
    items: (_a = {},
        _a[NewcommandItems_js_1.BeginEnvItem.prototype.kind] = NewcommandItems_js_1.BeginEnvItem,
        _a),
    options: { maxMacros: 1000 },
    init: init
});
//# sourceMappingURL=NewcommandConfiguration.js.map

/***/ }),

/***/ 40421:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BeginEnvItem = void 0;
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var StackItem_js_1 = __webpack_require__(34726);
var BeginEnvItem = (function (_super) {
    __extends(BeginEnvItem, _super);
    function BeginEnvItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BeginEnvItem.prototype, "kind", {
        get: function () {
            return 'beginEnv';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BeginEnvItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    BeginEnvItem.prototype.checkItem = function (item) {
        if (item.isKind('end')) {
            if (item.getName() !== this.getName()) {
                throw new TexError_js_1.default('EnvBadEnd', '\\begin{%1} ended with \\end{%2}', this.getName(), item.getName());
            }
            return [[this.factory.create('mml', this.toMml())], true];
        }
        if (item.isKind('stop')) {
            throw new TexError_js_1.default('EnvMissingEnd', 'Missing \\end{%1}', this.getName());
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return BeginEnvItem;
}(StackItem_js_1.BaseItem));
exports.BeginEnvItem = BeginEnvItem;
//# sourceMappingURL=NewcommandItems.js.map

/***/ }),

/***/ 2921:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var NewcommandMethods_js_1 = __importDefault(__webpack_require__(57860));
var SymbolMap_js_1 = __webpack_require__(92715);
new SymbolMap_js_1.CommandMap('Newcommand-macros', {
    newcommand: 'NewCommand',
    renewcommand: 'NewCommand',
    newenvironment: 'NewEnvironment',
    renewenvironment: 'NewEnvironment',
    def: 'MacroDef',
    'let': 'Let'
}, NewcommandMethods_js_1.default);
//# sourceMappingURL=NewcommandMappings.js.map

/***/ }),

/***/ 57860:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var sm = __importStar(__webpack_require__(92715));
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var NewcommandUtil_js_1 = __importDefault(__webpack_require__(97981));
var NewcommandMethods = {};
NewcommandMethods.NewCommand = function (parser, name) {
    var cs = NewcommandUtil_js_1.default.GetCsNameArgument(parser, name);
    var n = NewcommandUtil_js_1.default.GetArgCount(parser, name);
    var opt = parser.GetBrackets(name);
    var def = parser.GetArgument(name);
    NewcommandUtil_js_1.default.addMacro(parser, cs, NewcommandMethods.Macro, [def, n, opt]);
};
NewcommandMethods.NewEnvironment = function (parser, name) {
    var env = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(name));
    var n = NewcommandUtil_js_1.default.GetArgCount(parser, name);
    var opt = parser.GetBrackets(name);
    var bdef = parser.GetArgument(name);
    var edef = parser.GetArgument(name);
    NewcommandUtil_js_1.default.addEnvironment(parser, env, NewcommandMethods.BeginEnv, [true, bdef, edef, n, opt]);
};
NewcommandMethods.MacroDef = function (parser, name) {
    var cs = NewcommandUtil_js_1.default.GetCSname(parser, name);
    var params = NewcommandUtil_js_1.default.GetTemplate(parser, name, '\\' + cs);
    var def = parser.GetArgument(name);
    !(params instanceof Array) ?
        NewcommandUtil_js_1.default.addMacro(parser, cs, NewcommandMethods.Macro, [def, params]) :
        NewcommandUtil_js_1.default.addMacro(parser, cs, NewcommandMethods.MacroWithTemplate, [def].concat(params));
};
NewcommandMethods.Let = function (parser, name) {
    var cs = NewcommandUtil_js_1.default.GetCSname(parser, name);
    var c = parser.GetNext();
    if (c === '=') {
        parser.i++;
        c = parser.GetNext();
    }
    var handlers = parser.configuration.handlers;
    if (c === '\\') {
        name = NewcommandUtil_js_1.default.GetCSname(parser, name);
        var macro_1 = handlers.get('delimiter').lookup('\\' + name);
        if (macro_1) {
            NewcommandUtil_js_1.default.addDelimiter(parser, '\\' + cs, macro_1.char, macro_1.attributes);
            return;
        }
        var map_1 = handlers.get('macro').applicable(name);
        if (!map_1) {
            return;
        }
        if (map_1 instanceof sm.MacroMap) {
            var macro_2 = map_1.lookup(name);
            NewcommandUtil_js_1.default.addMacro(parser, cs, macro_2.func, macro_2.args, macro_2.symbol);
            return;
        }
        macro_1 = map_1.lookup(name);
        var newArgs = NewcommandUtil_js_1.default.disassembleSymbol(cs, macro_1);
        var method = function (p, _cs) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            var symb = NewcommandUtil_js_1.default.assembleSymbol(rest);
            return map_1.parser(p, symb);
        };
        NewcommandUtil_js_1.default.addMacro(parser, cs, method, newArgs);
        return;
    }
    parser.i++;
    var macro = handlers.get('delimiter').lookup(c);
    if (macro) {
        NewcommandUtil_js_1.default.addDelimiter(parser, '\\' + cs, macro.char, macro.attributes);
        return;
    }
    NewcommandUtil_js_1.default.addMacro(parser, cs, NewcommandMethods.Macro, [c]);
};
NewcommandMethods.MacroWithTemplate = function (parser, name, text, n) {
    var params = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        params[_i - 4] = arguments[_i];
    }
    var argCount = parseInt(n, 10);
    if (argCount) {
        var args = [];
        parser.GetNext();
        if (params[0] && !NewcommandUtil_js_1.default.MatchParam(parser, params[0])) {
            throw new TexError_js_1.default('MismatchUseDef', 'Use of %1 doesn\'t match its definition', name);
        }
        for (var i = 0; i < argCount; i++) {
            args.push(NewcommandUtil_js_1.default.GetParameter(parser, name, params[i + 1]));
        }
        text = ParseUtil_js_1.default.substituteArgs(parser, args, text);
    }
    parser.string = ParseUtil_js_1.default.addArgs(parser, text, parser.string.slice(parser.i));
    parser.i = 0;
    ParseUtil_js_1.default.checkMaxMacros(parser);
};
NewcommandMethods.BeginEnv = function (parser, begin, bdef, edef, n, def) {
    if (begin.getProperty('end') && parser.stack.env['closing'] === begin.getName()) {
        delete parser.stack.env['closing'];
        var rest = parser.string.slice(parser.i);
        parser.string = edef;
        parser.i = 0;
        parser.Parse();
        parser.string = rest;
        parser.i = 0;
        return parser.itemFactory.create('end').setProperty('name', begin.getName());
    }
    if (n) {
        var args = [];
        if (def != null) {
            var optional = parser.GetBrackets('\\begin{' + begin.getName() + '}');
            args.push(optional == null ? def : optional);
        }
        for (var i = args.length; i < n; i++) {
            args.push(parser.GetArgument('\\begin{' + begin.getName() + '}'));
        }
        bdef = ParseUtil_js_1.default.substituteArgs(parser, args, bdef);
        edef = ParseUtil_js_1.default.substituteArgs(parser, [], edef);
    }
    parser.string = ParseUtil_js_1.default.addArgs(parser, bdef, parser.string.slice(parser.i));
    parser.i = 0;
    return parser.itemFactory.create('beginEnv').setProperty('name', begin.getName());
};
NewcommandMethods.Macro = BaseMethods_js_1.default.Macro;
exports["default"] = NewcommandMethods;
//# sourceMappingURL=NewcommandMethods.js.map

/***/ }),

/***/ 97981:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var Symbol_js_1 = __webpack_require__(56941);
var NewcommandUtil;
(function (NewcommandUtil) {
    function disassembleSymbol(name, symbol) {
        var newArgs = [name, symbol.char];
        if (symbol.attributes) {
            for (var key in symbol.attributes) {
                newArgs.push(key);
                newArgs.push(symbol.attributes[key]);
            }
        }
        return newArgs;
    }
    NewcommandUtil.disassembleSymbol = disassembleSymbol;
    function assembleSymbol(args) {
        var name = args[0];
        var char = args[1];
        var attrs = {};
        for (var i = 2; i < args.length; i = i + 2) {
            attrs[args[i]] = args[i + 1];
        }
        return new Symbol_js_1.Symbol(name, char, attrs);
    }
    NewcommandUtil.assembleSymbol = assembleSymbol;
    function GetCSname(parser, cmd) {
        var c = parser.GetNext();
        if (c !== '\\') {
            throw new TexError_js_1.default('MissingCS', '%1 must be followed by a control sequence', cmd);
        }
        var cs = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(cmd));
        return cs.substr(1);
    }
    NewcommandUtil.GetCSname = GetCSname;
    function GetCsNameArgument(parser, name) {
        var cs = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(name));
        if (cs.charAt(0) === '\\') {
            cs = cs.substr(1);
        }
        if (!cs.match(/^(.|[a-z]+)$/i)) {
            throw new TexError_js_1.default('IllegalControlSequenceName', 'Illegal control sequence name for %1', name);
        }
        return cs;
    }
    NewcommandUtil.GetCsNameArgument = GetCsNameArgument;
    function GetArgCount(parser, name) {
        var n = parser.GetBrackets(name);
        if (n) {
            n = ParseUtil_js_1.default.trimSpaces(n);
            if (!n.match(/^[0-9]+$/)) {
                throw new TexError_js_1.default('IllegalParamNumber', 'Illegal number of parameters specified in %1', name);
            }
        }
        return n;
    }
    NewcommandUtil.GetArgCount = GetArgCount;
    function GetTemplate(parser, cmd, cs) {
        var c = parser.GetNext();
        var params = [];
        var n = 0;
        var i = parser.i;
        while (parser.i < parser.string.length) {
            c = parser.GetNext();
            if (c === '#') {
                if (i !== parser.i) {
                    params[n] = parser.string.substr(i, parser.i - i);
                }
                c = parser.string.charAt(++parser.i);
                if (!c.match(/^[1-9]$/)) {
                    throw new TexError_js_1.default('CantUseHash2', 'Illegal use of # in template for %1', cs);
                }
                if (parseInt(c) !== ++n) {
                    throw new TexError_js_1.default('SequentialParam', 'Parameters for %1 must be numbered sequentially', cs);
                }
                i = parser.i + 1;
            }
            else if (c === '{') {
                if (i !== parser.i) {
                    params[n] = parser.string.substr(i, parser.i - i);
                }
                if (params.length > 0) {
                    return [n.toString()].concat(params);
                }
                else {
                    return n;
                }
            }
            parser.i++;
        }
        throw new TexError_js_1.default('MissingReplacementString', 'Missing replacement string for definition of %1', cmd);
    }
    NewcommandUtil.GetTemplate = GetTemplate;
    function GetParameter(parser, name, param) {
        if (param == null) {
            return parser.GetArgument(name);
        }
        var i = parser.i;
        var j = 0;
        var hasBraces = 0;
        while (parser.i < parser.string.length) {
            var c = parser.string.charAt(parser.i);
            if (c === '{') {
                if (parser.i === i) {
                    hasBraces = 1;
                }
                parser.GetArgument(name);
                j = parser.i - i;
            }
            else if (MatchParam(parser, param)) {
                if (hasBraces) {
                    i++;
                    j -= 2;
                }
                return parser.string.substr(i, j);
            }
            else if (c === '\\') {
                parser.i++;
                j++;
                hasBraces = 0;
                var match = parser.string.substr(parser.i).match(/[a-z]+|./i);
                if (match) {
                    parser.i += match[0].length;
                    j = parser.i - i;
                }
            }
            else {
                parser.i++;
                j++;
                hasBraces = 0;
            }
        }
        throw new TexError_js_1.default('RunawayArgument', 'Runaway argument for %1?', name);
    }
    NewcommandUtil.GetParameter = GetParameter;
    function MatchParam(parser, param) {
        if (parser.string.substr(parser.i, param.length) !== param) {
            return 0;
        }
        if (param.match(/\\[a-z]+$/i) &&
            parser.string.charAt(parser.i + param.length).match(/[a-z]/i)) {
            return 0;
        }
        parser.i += param.length;
        return 1;
    }
    NewcommandUtil.MatchParam = MatchParam;
    function addDelimiter(parser, cs, char, attr) {
        var handlers = parser.configuration.handlers;
        var handler = handlers.retrieve(NewcommandUtil.NEW_DELIMITER);
        handler.add(cs, new Symbol_js_1.Symbol(cs, char, attr));
    }
    NewcommandUtil.addDelimiter = addDelimiter;
    function addMacro(parser, cs, func, attr, symbol) {
        if (symbol === void 0) { symbol = ''; }
        var handlers = parser.configuration.handlers;
        var handler = handlers.retrieve(NewcommandUtil.NEW_COMMAND);
        handler.add(cs, new Symbol_js_1.Macro(symbol ? symbol : cs, func, attr));
    }
    NewcommandUtil.addMacro = addMacro;
    function addEnvironment(parser, env, func, attr) {
        var handlers = parser.configuration.handlers;
        var handler = handlers.retrieve(NewcommandUtil.NEW_ENVIRONMENT);
        handler.add(env, new Symbol_js_1.Macro(env, func, attr));
    }
    NewcommandUtil.addEnvironment = addEnvironment;
    NewcommandUtil.NEW_DELIMITER = 'new-Delimiter';
    NewcommandUtil.NEW_COMMAND = 'new-Command';
    NewcommandUtil.NEW_ENVIRONMENT = 'new-Environment';
})(NewcommandUtil || (NewcommandUtil = {}));
exports["default"] = NewcommandUtil;
//# sourceMappingURL=NewcommandUtil.js.map

/***/ }),

/***/ 8163:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoErrorsConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
function noErrors(factory, message, _id, expr) {
    var mtext = factory.create('token', 'mtext', {}, expr.replace(/\n/g, ' '));
    var error = factory.create('node', 'merror', [mtext], { 'data-mjx-error': message, title: message });
    return error;
}
exports.NoErrorsConfiguration = Configuration_js_1.Configuration.create('noerrors', { nodes: { 'error': noErrors } });
//# sourceMappingURL=NoErrorsConfiguration.js.map

/***/ }),

/***/ 75514:
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
exports.NoUndefinedConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
function noUndefined(parser, name) {
    var e_1, _a;
    var textNode = parser.create('text', '\\' + name);
    var options = parser.options.noundefined || {};
    var def = {};
    try {
        for (var _b = __values(['color', 'background', 'size']), _c = _b.next(); !_c.done; _c = _b.next()) {
            var id = _c.value;
            if (options[id]) {
                def['math' + id] = options[id];
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
    parser.Push(parser.create('node', 'mtext', [], def, textNode));
}
exports.NoUndefinedConfiguration = Configuration_js_1.Configuration.create('noundefined', {
    fallback: { macro: noUndefined },
    options: {
        noundefined: {
            color: 'red',
            background: '',
            size: ''
        }
    },
    priority: 3
});
//# sourceMappingURL=NoUndefinedConfiguration.js.map

/***/ }),

/***/ 60816:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PhysicsConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var PhysicsItems_js_1 = __webpack_require__(53254);
__webpack_require__(24193);
exports.PhysicsConfiguration = Configuration_js_1.Configuration.create('physics', {
    handler: {
        macro: [
            'Physics-automatic-bracing-macros',
            'Physics-vector-macros',
            'Physics-vector-mo',
            'Physics-vector-mi',
            'Physics-derivative-macros',
            'Physics-expressions-macros',
            'Physics-quick-quad-macros',
            'Physics-bra-ket-macros',
            'Physics-matrix-macros'
        ],
        character: ['Physics-characters'],
        environment: ['Physics-aux-envs']
    },
    items: (_a = {},
        _a[PhysicsItems_js_1.AutoOpen.prototype.kind] = PhysicsItems_js_1.AutoOpen,
        _a),
    options: {
        physics: {
            italicdiff: false,
            arrowdel: false
        }
    }
});
//# sourceMappingURL=PhysicsConfiguration.js.map

/***/ }),

/***/ 53254:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoOpen = void 0;
var StackItem_js_1 = __webpack_require__(34726);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var AutoOpen = (function (_super) {
    __extends(AutoOpen, _super);
    function AutoOpen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openCount = 0;
        return _this;
    }
    Object.defineProperty(AutoOpen.prototype, "kind", {
        get: function () {
            return 'auto open';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AutoOpen.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    AutoOpen.prototype.toMml = function () {
        var parser = this.factory.configuration.parser;
        var right = this.getProperty('right');
        if (this.getProperty('smash')) {
            var mml_1 = _super.prototype.toMml.call(this);
            var smash = parser.create('node', 'mpadded', [mml_1], { height: 0, depth: 0 });
            this.Clear();
            this.Push(parser.create('node', 'TeXAtom', [smash]));
        }
        if (right) {
            this.Push(new TexParser_js_1.default(right, parser.stack.env, parser.configuration).mml());
        }
        var mml = ParseUtil_js_1.default.fenced(this.factory.configuration, this.getProperty('open'), _super.prototype.toMml.call(this), this.getProperty('close'), this.getProperty('big'));
        NodeUtil_js_1.default.removeProperties(mml, 'open', 'close', 'texClass');
        return mml;
    };
    AutoOpen.prototype.checkItem = function (item) {
        if (item.isKind('mml') && item.Size() === 1) {
            var mml = item.toMml();
            if (mml.isKind('mo') && mml.getText() === this.getProperty('open')) {
                this.openCount++;
            }
        }
        var close = item.getProperty('autoclose');
        if (close && close === this.getProperty('close') && !this.openCount--) {
            if (this.getProperty('ignore')) {
                this.Clear();
                return [[], true];
            }
            return [[this.toMml()], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    AutoOpen.errors = Object.assign(Object.create(StackItem_js_1.BaseItem.errors), {
        'stop': ['ExtraOrMissingDelims', 'Extra open or missing close delimiter']
    });
    return AutoOpen;
}(StackItem_js_1.BaseItem));
exports.AutoOpen = AutoOpen;
//# sourceMappingURL=PhysicsItems.js.map

/***/ }),

/***/ 24193:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SymbolMap_js_1 = __webpack_require__(92715);
var PhysicsMethods_js_1 = __importDefault(__webpack_require__(74844));
var TexConstants_js_1 = __webpack_require__(48948);
var ParseMethods_js_1 = __importDefault(__webpack_require__(96004));
var MmlNode_js_1 = __webpack_require__(18426);
new SymbolMap_js_1.CommandMap('Physics-automatic-bracing-macros', {
    'quantity': 'Quantity',
    'qty': 'Quantity',
    'pqty': ['Quantity', '(', ')', true],
    'bqty': ['Quantity', '[', ']', true],
    'vqty': ['Quantity', '|', '|', true],
    'Bqty': ['Quantity', '\\{', '\\}', true],
    'absolutevalue': ['Quantity', '|', '|', true],
    'abs': ['Quantity', '|', '|', true],
    'norm': ['Quantity', '\\|', '\\|', true],
    'evaluated': 'Eval',
    'eval': 'Eval',
    'order': ['Quantity', '(', ')', true, 'O',
        TexConstants_js_1.TexConstant.Variant.CALLIGRAPHIC],
    'commutator': 'Commutator',
    'comm': 'Commutator',
    'anticommutator': ['Commutator', '\\{', '\\}'],
    'acomm': ['Commutator', '\\{', '\\}'],
    'poissonbracket': ['Commutator', '\\{', '\\}'],
    'pb': ['Commutator', '\\{', '\\}']
}, PhysicsMethods_js_1.default);
new SymbolMap_js_1.CharacterMap('Physics-vector-mo', ParseMethods_js_1.default.mathchar0mo, {
    dotproduct: ['\u22C5', { mathvariant: TexConstants_js_1.TexConstant.Variant.BOLD }],
    vdot: ['\u22C5', { mathvariant: TexConstants_js_1.TexConstant.Variant.BOLD }],
    crossproduct: '\u00D7',
    cross: '\u00D7',
    cp: '\u00D7',
    gradientnabla: ['\u2207', { mathvariant: TexConstants_js_1.TexConstant.Variant.BOLD }]
});
new SymbolMap_js_1.CharacterMap('Physics-vector-mi', ParseMethods_js_1.default.mathchar0mi, {
    real: ['\u211C', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }],
    imaginary: ['\u2111', { mathvariant: TexConstants_js_1.TexConstant.Variant.NORMAL }]
});
new SymbolMap_js_1.CommandMap('Physics-vector-macros', {
    'vnabla': 'Vnabla',
    'vectorbold': 'VectorBold',
    'vb': 'VectorBold',
    'vectorarrow': ['StarMacro', 1, '\\vec{\\vb', '{#1}}'],
    'va': ['StarMacro', 1, '\\vec{\\vb', '{#1}}'],
    'vectorunit': ['StarMacro', 1, '\\hat{\\vb', '{#1}}'],
    'vu': ['StarMacro', 1, '\\hat{\\vb', '{#1}}'],
    'gradient': ['OperatorApplication', '\\vnabla', '(', '['],
    'grad': ['OperatorApplication', '\\vnabla', '(', '['],
    'divergence': ['VectorOperator', '\\vnabla\\vdot', '(', '['],
    'div': ['VectorOperator', '\\vnabla\\vdot', '(', '['],
    'curl': ['VectorOperator', '\\vnabla\\crossproduct', '(', '['],
    'laplacian': ['OperatorApplication', '\\nabla^2', '(', '['],
}, PhysicsMethods_js_1.default);
new SymbolMap_js_1.CommandMap('Physics-expressions-macros', {
    'sin': 'Expression',
    'sinh': 'Expression',
    'arcsin': 'Expression',
    'asin': 'Expression',
    'cos': 'Expression',
    'cosh': 'Expression',
    'arccos': 'Expression',
    'acos': 'Expression',
    'tan': 'Expression',
    'tanh': 'Expression',
    'arctan': 'Expression',
    'atan': 'Expression',
    'csc': 'Expression',
    'csch': 'Expression',
    'arccsc': 'Expression',
    'acsc': 'Expression',
    'sec': 'Expression',
    'sech': 'Expression',
    'arcsec': 'Expression',
    'asec': 'Expression',
    'cot': 'Expression',
    'coth': 'Expression',
    'arccot': 'Expression',
    'acot': 'Expression',
    'exp': ['Expression', false],
    'log': 'Expression',
    'ln': 'Expression',
    'det': ['Expression', false],
    'Pr': ['Expression', false],
    'tr': ['Expression', false],
    'trace': ['Expression', false, 'tr'],
    'Tr': ['Expression', false],
    'Trace': ['Expression', false, 'Tr'],
    'rank': 'NamedFn',
    'erf': ['Expression', false],
    'Residue': ['Macro', '\\mathrm{Res}'],
    'Res': ['OperatorApplication', '\\Residue', '(', '[', '{'],
    'principalvalue': ['OperatorApplication', '{\\cal P}'],
    'pv': ['OperatorApplication', '{\\cal P}'],
    'PV': ['OperatorApplication', '{\\rm P.V.}'],
    'Re': ['OperatorApplication', '\\mathrm{Re}', '{'],
    'Im': ['OperatorApplication', '\\mathrm{Im}', '{'],
    'sine': ['NamedFn', 'sin'],
    'hypsine': ['NamedFn', 'sinh'],
    'arcsine': ['NamedFn', 'arcsin'],
    'asine': ['NamedFn', 'asin'],
    'cosine': ['NamedFn', 'cos'],
    'hypcosine': ['NamedFn', 'cosh'],
    'arccosine': ['NamedFn', 'arccos'],
    'acosine': ['NamedFn', 'acos'],
    'tangent': ['NamedFn', 'tan'],
    'hyptangent': ['NamedFn', 'tanh'],
    'arctangent': ['NamedFn', 'arctan'],
    'atangent': ['NamedFn', 'atan'],
    'cosecant': ['NamedFn', 'csc'],
    'hypcosecant': ['NamedFn', 'csch'],
    'arccosecant': ['NamedFn', 'arccsc'],
    'acosecant': ['NamedFn', 'acsc'],
    'secant': ['NamedFn', 'sec'],
    'hypsecant': ['NamedFn', 'sech'],
    'arcsecant': ['NamedFn', 'arcsec'],
    'asecant': ['NamedFn', 'asec'],
    'cotangent': ['NamedFn', 'cot'],
    'hypcotangent': ['NamedFn', 'coth'],
    'arccotangent': ['NamedFn', 'arccot'],
    'acotangent': ['NamedFn', 'acot'],
    'exponential': ['NamedFn', 'exp'],
    'logarithm': ['NamedFn', 'log'],
    'naturallogarithm': ['NamedFn', 'ln'],
    'determinant': ['NamedFn', 'det'],
    'Probability': ['NamedFn', 'Pr'],
}, PhysicsMethods_js_1.default);
new SymbolMap_js_1.CommandMap('Physics-quick-quad-macros', {
    'qqtext': 'Qqtext',
    'qq': 'Qqtext',
    'qcomma': ['Macro', '\\qqtext*{,}'],
    'qc': ['Macro', '\\qqtext*{,}'],
    'qcc': ['Qqtext', 'c.c.'],
    'qif': ['Qqtext', 'if'],
    'qthen': ['Qqtext', 'then'],
    'qelse': ['Qqtext', 'else'],
    'qotherwise': ['Qqtext', 'otherwise'],
    'qunless': ['Qqtext', 'unless'],
    'qgiven': ['Qqtext', 'given'],
    'qusing': ['Qqtext', 'using'],
    'qassume': ['Qqtext', 'assume'],
    'qsince': ['Qqtext', 'since'],
    'qlet': ['Qqtext', 'let'],
    'qfor': ['Qqtext', 'for'],
    'qall': ['Qqtext', 'all'],
    'qeven': ['Qqtext', 'even'],
    'qodd': ['Qqtext', 'odd'],
    'qinteger': ['Qqtext', 'integer'],
    'qand': ['Qqtext', 'and'],
    'qor': ['Qqtext', 'or'],
    'qas': ['Qqtext', 'as'],
    'qin': ['Qqtext', 'in'],
}, PhysicsMethods_js_1.default);
new SymbolMap_js_1.CommandMap('Physics-derivative-macros', {
    'diffd': 'DiffD',
    'flatfrac': ['Macro', '\\left.#1\\middle/#2\\right.', 2],
    'differential': ['Differential', '\\diffd'],
    'dd': ['Differential', '\\diffd'],
    'variation': ['Differential', '\\delta'],
    'var': ['Differential', '\\delta'],
    'derivative': ['Derivative', 2, '\\diffd'],
    'dv': ['Derivative', 2, '\\diffd'],
    'partialderivative': ['Derivative', 3, '\\partial'],
    'pderivative': ['Derivative', 3, '\\partial'],
    'pdv': ['Derivative', 3, '\\partial'],
    'functionalderivative': ['Derivative', 2, '\\delta'],
    'fderivative': ['Derivative', 2, '\\delta'],
    'fdv': ['Derivative', 2, '\\delta'],
}, PhysicsMethods_js_1.default);
new SymbolMap_js_1.CommandMap('Physics-bra-ket-macros', {
    'bra': 'Bra',
    'ket': 'Ket',
    'innerproduct': 'BraKet',
    'ip': 'BraKet',
    'braket': 'BraKet',
    'outerproduct': 'KetBra',
    'dyad': 'KetBra',
    'ketbra': 'KetBra',
    'op': 'KetBra',
    'expectationvalue': 'Expectation',
    'expval': 'Expectation',
    'ev': 'Expectation',
    'matrixelement': 'MatrixElement',
    'matrixel': 'MatrixElement',
    'mel': 'MatrixElement',
}, PhysicsMethods_js_1.default);
new SymbolMap_js_1.CommandMap('Physics-matrix-macros', {
    'matrixquantity': 'MatrixQuantity',
    'mqty': 'MatrixQuantity',
    'pmqty': ['Macro', '\\mqty(#1)', 1],
    'Pmqty': ['Macro', '\\mqty*(#1)', 1],
    'bmqty': ['Macro', '\\mqty[#1]', 1],
    'vmqty': ['Macro', '\\mqty|#1|', 1],
    'smallmatrixquantity': ['MatrixQuantity', true],
    'smqty': ['MatrixQuantity', true],
    'spmqty': ['Macro', '\\smqty(#1)', 1],
    'sPmqty': ['Macro', '\\smqty*(#1)', 1],
    'sbmqty': ['Macro', '\\smqty[#1]', 1],
    'svmqty': ['Macro', '\\smqty|#1|', 1],
    'matrixdeterminant': ['Macro', '\\vmqty{#1}', 1],
    'mdet': ['Macro', '\\vmqty{#1}', 1],
    'smdet': ['Macro', '\\svmqty{#1}', 1],
    'identitymatrix': 'IdentityMatrix',
    'imat': 'IdentityMatrix',
    'xmatrix': 'XMatrix',
    'xmat': 'XMatrix',
    'zeromatrix': ['Macro', '\\xmat{0}{#1}{#2}', 2],
    'zmat': ['Macro', '\\xmat{0}{#1}{#2}', 2],
    'paulimatrix': 'PauliMatrix',
    'pmat': 'PauliMatrix',
    'diagonalmatrix': 'DiagonalMatrix',
    'dmat': 'DiagonalMatrix',
    'antidiagonalmatrix': ['DiagonalMatrix', true],
    'admat': ['DiagonalMatrix', true]
}, PhysicsMethods_js_1.default);
new SymbolMap_js_1.EnvironmentMap('Physics-aux-envs', ParseMethods_js_1.default.environment, {
    smallmatrix: ['Array', null, null, null, 'c', '0.333em', '.2em', 'S', 1]
}, PhysicsMethods_js_1.default);
new SymbolMap_js_1.MacroMap('Physics-characters', {
    '|': ['AutoClose', MmlNode_js_1.TEXCLASS.ORD],
    ')': 'AutoClose',
    ']': 'AutoClose'
}, PhysicsMethods_js_1.default);
//# sourceMappingURL=PhysicsMappings.js.map

/***/ }),

/***/ 74844:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var MmlNode_js_1 = __webpack_require__(18426);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var NodeFactory_js_1 = __webpack_require__(38624);
var PhysicsMethods = {};
var pairs = {
    '(': ')',
    '[': ']',
    '{': '}',
    '|': '|',
};
var biggs = /^(b|B)i(g{1,2})$/;
PhysicsMethods.Quantity = function (parser, name, open, close, arg, named, variant) {
    if (open === void 0) { open = '('; }
    if (close === void 0) { close = ')'; }
    if (arg === void 0) { arg = false; }
    if (named === void 0) { named = ''; }
    if (variant === void 0) { variant = ''; }
    var star = arg ? parser.GetStar() : false;
    var next = parser.GetNext();
    var position = parser.i;
    var big = null;
    if (next === '\\') {
        parser.i++;
        big = parser.GetCS();
        if (!big.match(biggs)) {
            var empty = parser.create('node', 'mrow');
            parser.Push(ParseUtil_js_1.default.fenced(parser.configuration, open, empty, close));
            parser.i = position;
            return;
        }
        next = parser.GetNext();
    }
    var right = pairs[next];
    if (arg && next !== '{') {
        throw new TexError_js_1.default('MissingArgFor', 'Missing argument for %1', parser.currentCS);
    }
    if (!right) {
        var empty = parser.create('node', 'mrow');
        parser.Push(ParseUtil_js_1.default.fenced(parser.configuration, open, empty, close));
        parser.i = position;
        return;
    }
    if (named) {
        var mml = parser.create('token', 'mi', { texClass: MmlNode_js_1.TEXCLASS.OP }, named);
        if (variant) {
            NodeUtil_js_1.default.setAttribute(mml, 'mathvariant', variant);
        }
        parser.Push(parser.itemFactory.create('fn', mml));
    }
    if (next === '{') {
        var argument = parser.GetArgument(name);
        next = arg ? open : '\\{';
        right = arg ? close : '\\}';
        argument = star ? next + ' ' + argument + ' ' + right :
            (big ?
                '\\' + big + 'l' + next + ' ' + argument + ' ' + '\\' + big + 'r' + right :
                '\\left' + next + ' ' + argument + ' ' + '\\right' + right);
        parser.Push(new TexParser_js_1.default(argument, parser.stack.env, parser.configuration).mml());
        return;
    }
    if (arg) {
        next = open;
        right = close;
    }
    parser.i++;
    parser.Push(parser.itemFactory.create('auto open')
        .setProperties({ open: next, close: right, big: big }));
};
PhysicsMethods.Eval = function (parser, name) {
    var star = parser.GetStar();
    var next = parser.GetNext();
    if (next === '{') {
        var arg = parser.GetArgument(name);
        var replace = '\\left. ' +
            (star ? '\\smash{' + arg + '}' : arg) +
            ' ' + '\\vphantom{\\int}\\right|';
        parser.string = parser.string.slice(0, parser.i) + replace +
            parser.string.slice(parser.i);
        return;
    }
    if (next === '(' || next === '[') {
        parser.i++;
        parser.Push(parser.itemFactory.create('auto open')
            .setProperties({ open: next, close: '|',
            smash: star, right: '\\vphantom{\\int}' }));
        return;
    }
    throw new TexError_js_1.default('MissingArgFor', 'Missing argument for %1', parser.currentCS);
};
PhysicsMethods.Commutator = function (parser, name, open, close) {
    if (open === void 0) { open = '['; }
    if (close === void 0) { close = ']'; }
    var star = parser.GetStar();
    var next = parser.GetNext();
    var big = null;
    if (next === '\\') {
        parser.i++;
        big = parser.GetCS();
        if (!big.match(biggs)) {
            throw new TexError_js_1.default('MissingArgFor', 'Missing argument for %1', parser.currentCS);
        }
        next = parser.GetNext();
    }
    if (next !== '{') {
        throw new TexError_js_1.default('MissingArgFor', 'Missing argument for %1', parser.currentCS);
    }
    var arg1 = parser.GetArgument(name);
    var arg2 = parser.GetArgument(name);
    var argument = arg1 + ',' + arg2;
    argument = star ? open + ' ' + argument + ' ' + close :
        (big ?
            '\\' + big + 'l' + open + ' ' + argument + ' ' + '\\' + big + 'r' + close :
            '\\left' + open + ' ' + argument + ' ' + '\\right' + close);
    parser.Push(new TexParser_js_1.default(argument, parser.stack.env, parser.configuration).mml());
};
var latinCap = [0x41, 0x5A];
var latinSmall = [0x61, 0x7A];
var greekCap = [0x391, 0x3A9];
var greekSmall = [0x3B1, 0x3C9];
var digits = [0x30, 0x39];
function inRange(value, range) {
    return (value >= range[0] && value <= range[1]);
}
function createVectorToken(factory, kind, def, text) {
    var parser = factory.configuration.parser;
    var token = NodeFactory_js_1.NodeFactory.createToken(factory, kind, def, text);
    var code = text.codePointAt(0);
    if (text.length === 1 && !parser.stack.env.font &&
        parser.stack.env.vectorFont &&
        (inRange(code, latinCap) || inRange(code, latinSmall) ||
            inRange(code, greekCap) || inRange(code, digits) ||
            (inRange(code, greekSmall) && parser.stack.env.vectorStar) ||
            NodeUtil_js_1.default.getAttribute(token, 'accent'))) {
        NodeUtil_js_1.default.setAttribute(token, 'mathvariant', parser.stack.env.vectorFont);
    }
    return token;
}
PhysicsMethods.VectorBold = function (parser, name) {
    var star = parser.GetStar();
    var arg = parser.GetArgument(name);
    var oldToken = parser.configuration.nodeFactory.get('token');
    var oldFont = parser.stack.env.font;
    delete parser.stack.env.font;
    parser.configuration.nodeFactory.set('token', createVectorToken);
    parser.stack.env.vectorFont = star ? 'bold-italic' : 'bold';
    parser.stack.env.vectorStar = star;
    var node = new TexParser_js_1.default(arg, parser.stack.env, parser.configuration).mml();
    if (oldFont) {
        parser.stack.env.font = oldFont;
    }
    delete parser.stack.env.vectorFont;
    delete parser.stack.env.vectorStar;
    parser.configuration.nodeFactory.set('token', oldToken);
    parser.Push(node);
};
PhysicsMethods.StarMacro = function (parser, name, argcount) {
    var parts = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        parts[_i - 3] = arguments[_i];
    }
    var star = parser.GetStar();
    var args = [];
    if (argcount) {
        for (var i = args.length; i < argcount; i++) {
            args.push(parser.GetArgument(name));
        }
    }
    var macro = parts.join(star ? '*' : '');
    macro = ParseUtil_js_1.default.substituteArgs(parser, args, macro);
    parser.string = ParseUtil_js_1.default.addArgs(parser, macro, parser.string.slice(parser.i));
    parser.i = 0;
    ParseUtil_js_1.default.checkMaxMacros(parser);
};
var vectorApplication = function (parser, kind, name, operator, fences) {
    var op = new TexParser_js_1.default(operator, parser.stack.env, parser.configuration).mml();
    parser.Push(parser.itemFactory.create(kind, op));
    var left = parser.GetNext();
    var right = pairs[left];
    if (!right) {
        return;
    }
    var lfence = '', rfence = '', arg = '';
    var enlarge = fences.indexOf(left) !== -1;
    if (left === '{') {
        arg = parser.GetArgument(name);
        lfence = enlarge ? '\\left\\{' : '';
        rfence = enlarge ? '\\right\\}' : '';
        var macro = lfence + ' ' + arg + ' ' + rfence;
        parser.string = macro + parser.string.slice(parser.i);
        parser.i = 0;
        return;
    }
    if (!enlarge) {
        return;
    }
    parser.i++;
    parser.Push(parser.itemFactory.create('auto open')
        .setProperties({ open: left, close: right }));
};
PhysicsMethods.OperatorApplication = function (parser, name, operator) {
    var fences = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        fences[_i - 3] = arguments[_i];
    }
    vectorApplication(parser, 'fn', name, operator, fences);
};
PhysicsMethods.VectorOperator = function (parser, name, operator) {
    var fences = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        fences[_i - 3] = arguments[_i];
    }
    vectorApplication(parser, 'mml', name, operator, fences);
};
PhysicsMethods.Expression = function (parser, name, opt, id) {
    if (opt === void 0) { opt = true; }
    if (id === void 0) { id = ''; }
    id = id || name.slice(1);
    var exp = opt ? parser.GetBrackets(name) : null;
    var mml = parser.create('token', 'mi', { texClass: MmlNode_js_1.TEXCLASS.OP }, id);
    if (exp) {
        var sup = new TexParser_js_1.default(exp, parser.stack.env, parser.configuration).mml();
        mml = parser.create('node', 'msup', [mml, sup]);
    }
    parser.Push(parser.itemFactory.create('fn', mml));
    if (parser.GetNext() !== '(') {
        return;
    }
    parser.i++;
    parser.Push(parser.itemFactory.create('auto open')
        .setProperties({ open: '(', close: ')' }));
};
PhysicsMethods.Qqtext = function (parser, name, text) {
    var star = parser.GetStar();
    var arg = text ? text : parser.GetArgument(name);
    var replace = (star ? '' : '\\quad') + '\\text{' + arg + '}\\quad ';
    parser.string = parser.string.slice(0, parser.i) + replace +
        parser.string.slice(parser.i);
};
PhysicsMethods.Differential = function (parser, name, op) {
    var optArg = parser.GetBrackets(name);
    var power = optArg != null ? '^{' + optArg + '}' : ' ';
    var parens = parser.GetNext() === '(';
    var braces = parser.GetNext() === '{';
    var macro = op + power;
    if (!(parens || braces)) {
        macro += parser.GetArgument(name, true) || '';
        var mml = new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml();
        parser.Push(mml);
        return;
    }
    if (braces) {
        macro += parser.GetArgument(name);
        var mml = new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml();
        parser.Push(parser.create('node', 'TeXAtom', [mml], { texClass: MmlNode_js_1.TEXCLASS.OP }));
        return;
    }
    parser.Push(new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml());
    parser.i++;
    parser.Push(parser.itemFactory.create('auto open')
        .setProperties({ open: '(', close: ')' }));
};
PhysicsMethods.Derivative = function (parser, name, argMax, op) {
    var star = parser.GetStar();
    var optArg = parser.GetBrackets(name);
    var argCounter = 1;
    var args = [];
    args.push(parser.GetArgument(name));
    while (parser.GetNext() === '{' && argCounter < argMax) {
        args.push(parser.GetArgument(name));
        argCounter++;
    }
    var ignore = false;
    var power1 = ' ';
    var power2 = ' ';
    if (argMax > 2 && args.length > 2) {
        power1 = '^{' + (args.length - 1) + '}';
        ignore = true;
    }
    else if (optArg != null) {
        if (argMax > 2 && args.length > 1) {
            ignore = true;
        }
        power1 = '^{' + optArg + '}';
        power2 = power1;
    }
    var frac = star ? '\\flatfrac' : '\\frac';
    var first = args.length > 1 ? args[0] : '';
    var second = args.length > 1 ? args[1] : args[0];
    var rest = '';
    for (var i = 2, arg = void 0; arg = args[i]; i++) {
        rest += op + ' ' + arg;
    }
    var macro = frac + '{' + op + power1 + first + '}' +
        '{' + op + ' ' + second + power2 + ' ' + rest + '}';
    parser.Push(new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml());
    if (parser.GetNext() === '(') {
        parser.i++;
        parser.Push(parser.itemFactory.create('auto open')
            .setProperties({ open: '(', close: ')', ignore: ignore }));
    }
};
PhysicsMethods.Bra = function (parser, name) {
    var starBra = parser.GetStar();
    var bra = parser.GetArgument(name);
    var ket = '';
    var hasKet = false;
    var starKet = false;
    if (parser.GetNext() === '\\') {
        var saveI = parser.i;
        parser.i++;
        var cs = parser.GetCS();
        var symbol = parser.lookup('macro', cs);
        if (symbol && symbol.symbol === 'ket') {
            hasKet = true;
            saveI = parser.i;
            starKet = parser.GetStar();
            if (parser.GetNext() === '{') {
                ket = parser.GetArgument(cs, true);
            }
            else {
                parser.i = saveI;
                starKet = false;
            }
        }
        else {
            parser.i = saveI;
        }
    }
    var macro = '';
    if (hasKet) {
        macro = (starBra || starKet) ?
            "\\langle{".concat(bra, "}\\vert{").concat(ket, "}\\rangle") :
            "\\left\\langle{".concat(bra, "}\\middle\\vert{").concat(ket, "}\\right\\rangle");
    }
    else {
        macro = (starBra || starKet) ?
            "\\langle{".concat(bra, "}\\vert") : "\\left\\langle{".concat(bra, "}\\right\\vert{").concat(ket, "}");
    }
    parser.Push(new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml());
};
PhysicsMethods.Ket = function (parser, name) {
    var star = parser.GetStar();
    var ket = parser.GetArgument(name);
    var macro = star ? "\\vert{".concat(ket, "}\\rangle") :
        "\\left\\vert{".concat(ket, "}\\right\\rangle");
    parser.Push(new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml());
};
PhysicsMethods.BraKet = function (parser, name) {
    var star = parser.GetStar();
    var bra = parser.GetArgument(name);
    var ket = null;
    if (parser.GetNext() === '{') {
        ket = parser.GetArgument(name, true);
    }
    var macro = '';
    if (ket == null) {
        macro = star ?
            "\\langle{".concat(bra, "}\\vert{").concat(bra, "}\\rangle") :
            "\\left\\langle{".concat(bra, "}\\middle\\vert{").concat(bra, "}\\right\\rangle");
    }
    else {
        macro = star ?
            "\\langle{".concat(bra, "}\\vert{").concat(ket, "}\\rangle") :
            "\\left\\langle{".concat(bra, "}\\middle\\vert{").concat(ket, "}\\right\\rangle");
    }
    parser.Push(new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml());
};
PhysicsMethods.KetBra = function (parser, name) {
    var star = parser.GetStar();
    var ket = parser.GetArgument(name);
    var bra = null;
    if (parser.GetNext() === '{') {
        bra = parser.GetArgument(name, true);
    }
    var macro = '';
    if (bra == null) {
        macro = star ?
            "\\vert{".concat(ket, "}\\rangle\\!\\langle{").concat(ket, "}\\vert") :
            "\\left\\vert{".concat(ket, "}\\middle\\rangle\\!\\middle\\langle{").concat(ket, "}\\right\\vert");
    }
    else {
        macro = star ?
            "\\vert{".concat(ket, "}\\rangle\\!\\langle{").concat(bra, "}\\vert") :
            "\\left\\vert{".concat(ket, "}\\middle\\rangle\\!\\middle\\langle{").concat(bra, "}\\right\\vert");
    }
    parser.Push(new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml());
};
function outputBraket(_a, star1, star2) {
    var _b = __read(_a, 3), arg1 = _b[0], arg2 = _b[1], arg3 = _b[2];
    return (star1 && star2) ?
        "\\left\\langle{".concat(arg1, "}\\middle\\vert{").concat(arg2, "}\\middle\\vert{").concat(arg3, "}\\right\\rangle") :
        (star1 ? "\\langle{".concat(arg1, "}\\vert{").concat(arg2, "}\\vert{").concat(arg3, "}\\rangle") :
            "\\left\\langle{".concat(arg1, "}\\right\\vert{").concat(arg2, "}\\left\\vert{").concat(arg3, "}\\right\\rangle"));
}
PhysicsMethods.Expectation = function (parser, name) {
    var star1 = parser.GetStar();
    var star2 = star1 && parser.GetStar();
    var arg1 = parser.GetArgument(name);
    var arg2 = null;
    if (parser.GetNext() === '{') {
        arg2 = parser.GetArgument(name, true);
    }
    var macro = (arg1 && arg2) ?
        outputBraket([arg2, arg1, arg2], star1, star2) :
        (star1 ? "\\langle {".concat(arg1, "} \\rangle") :
            "\\left\\langle {".concat(arg1, "} \\right\\rangle"));
    parser.Push(new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml());
};
PhysicsMethods.MatrixElement = function (parser, name) {
    var star1 = parser.GetStar();
    var star2 = star1 && parser.GetStar();
    var arg1 = parser.GetArgument(name);
    var arg2 = parser.GetArgument(name);
    var arg3 = parser.GetArgument(name);
    var macro = outputBraket([arg1, arg2, arg3], star1, star2);
    parser.Push(new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml());
};
PhysicsMethods.MatrixQuantity = function (parser, name, small) {
    var star = parser.GetStar();
    var next = parser.GetNext();
    var array = small ? 'smallmatrix' : 'array';
    var arg = '';
    var open = '';
    var close = '';
    switch (next) {
        case '{':
            arg = parser.GetArgument(name);
            break;
        case '(':
            parser.i++;
            open = star ? '\\lgroup' : '(';
            close = star ? '\\rgroup' : ')';
            arg = parser.GetUpTo(name, ')');
            break;
        case '[':
            parser.i++;
            open = '[';
            close = ']';
            arg = parser.GetUpTo(name, ']');
            break;
        case '|':
            parser.i++;
            open = '|';
            close = '|';
            arg = parser.GetUpTo(name, '|');
            break;
        default:
            open = '(';
            close = ')';
            break;
    }
    var macro = (open ? '\\left' : '') + open +
        '\\begin{' + array + '}{} ' + arg + '\\end{' + array + '}' +
        (open ? '\\right' : '') + close;
    parser.Push(new TexParser_js_1.default(macro, parser.stack.env, parser.configuration).mml());
};
PhysicsMethods.IdentityMatrix = function (parser, name) {
    var arg = parser.GetArgument(name);
    var size = parseInt(arg, 10);
    if (isNaN(size)) {
        throw new TexError_js_1.default('InvalidNumber', 'Invalid number');
    }
    if (size <= 1) {
        parser.string = '1' + parser.string.slice(parser.i);
        parser.i = 0;
        return;
    }
    var zeros = Array(size).fill('0');
    var columns = [];
    for (var i = 0; i < size; i++) {
        var row = zeros.slice();
        row[i] = '1';
        columns.push(row.join(' & '));
    }
    parser.string = columns.join('\\\\ ') + parser.string.slice(parser.i);
    parser.i = 0;
};
PhysicsMethods.XMatrix = function (parser, name) {
    var star = parser.GetStar();
    var arg1 = parser.GetArgument(name);
    var arg2 = parser.GetArgument(name);
    var arg3 = parser.GetArgument(name);
    var n = parseInt(arg2, 10);
    var m = parseInt(arg3, 10);
    if (isNaN(n) || isNaN(m) || m.toString() !== arg3 || n.toString() !== arg2) {
        throw new TexError_js_1.default('InvalidNumber', 'Invalid number');
    }
    n = n < 1 ? 1 : n;
    m = m < 1 ? 1 : m;
    if (!star) {
        var row = Array(m).fill(arg1).join(' & ');
        var matrix_1 = Array(n).fill(row).join('\\\\ ');
        parser.string = matrix_1 + parser.string.slice(parser.i);
        parser.i = 0;
        return;
    }
    var matrix = '';
    if (n === 1 && m === 1) {
        matrix = arg1;
    }
    else if (n === 1) {
        var row = [];
        for (var i = 1; i <= m; i++) {
            row.push("".concat(arg1, "_{").concat(i, "}"));
        }
        matrix = row.join(' & ');
    }
    else if (m === 1) {
        var row = [];
        for (var i = 1; i <= n; i++) {
            row.push("".concat(arg1, "_{").concat(i, "}"));
        }
        matrix = row.join('\\\\ ');
    }
    else {
        var rows = [];
        for (var i = 1; i <= n; i++) {
            var row = [];
            for (var j = 1; j <= m; j++) {
                row.push("".concat(arg1, "_{{").concat(i, "}{").concat(j, "}}"));
            }
            rows.push(row.join(' & '));
        }
        matrix = rows.join('\\\\ ');
    }
    parser.string = matrix + parser.string.slice(parser.i);
    parser.i = 0;
    return;
};
PhysicsMethods.PauliMatrix = function (parser, name) {
    var arg = parser.GetArgument(name);
    var matrix = arg.slice(1);
    switch (arg[0]) {
        case '0':
            matrix += ' 1 & 0\\\\ 0 & 1';
            break;
        case '1':
        case 'x':
            matrix += ' 0 & 1\\\\ 1 & 0';
            break;
        case '2':
        case 'y':
            matrix += ' 0 & -i\\\\ i & 0';
            break;
        case '3':
        case 'z':
            matrix += ' 1 & 0\\\\ 0 & -1';
            break;
        default:
    }
    parser.string = matrix + parser.string.slice(parser.i);
    parser.i = 0;
};
PhysicsMethods.DiagonalMatrix = function (parser, name, anti) {
    if (parser.GetNext() !== '{') {
        return;
    }
    var startI = parser.i;
    parser.GetArgument(name);
    var endI = parser.i;
    parser.i = startI + 1;
    var elements = [];
    var element = '';
    var currentI = parser.i;
    while (currentI < endI) {
        try {
            element = parser.GetUpTo(name, ',');
        }
        catch (e) {
            parser.i = endI;
            elements.push(parser.string.slice(currentI, endI - 1));
            break;
        }
        if (parser.i >= endI) {
            elements.push(parser.string.slice(currentI, endI));
            break;
        }
        currentI = parser.i;
        elements.push(element);
    }
    parser.string = makeDiagMatrix(elements, anti) + parser.string.slice(endI);
    parser.i = 0;
};
function makeDiagMatrix(elements, anti) {
    var length = elements.length;
    var matrix = [];
    for (var i = 0; i < length; i++) {
        matrix.push(Array(anti ? length - i : i + 1).join('&') +
            '\\mqty{' + elements[i] + '}');
    }
    return matrix.join('\\\\ ');
}
PhysicsMethods.AutoClose = function (parser, fence, _texclass) {
    var mo = parser.create('token', 'mo', { stretchy: false }, fence);
    var item = parser.itemFactory.create('mml', mo).
        setProperties({ autoclose: fence });
    parser.Push(item);
};
PhysicsMethods.Vnabla = function (parser, _name) {
    var argument = parser.options.physics.arrowdel ?
        '\\vec{\\gradientnabla}' : '{\\gradientnabla}';
    return parser.Push(new TexParser_js_1.default(argument, parser.stack.env, parser.configuration).mml());
};
PhysicsMethods.DiffD = function (parser, _name) {
    var argument = parser.options.physics.italicdiff ? 'd' : '{\\rm d}';
    return parser.Push(new TexParser_js_1.default(argument, parser.stack.env, parser.configuration).mml());
};
PhysicsMethods.Macro = BaseMethods_js_1.default.Macro;
PhysicsMethods.NamedFn = BaseMethods_js_1.default.NamedFn;
PhysicsMethods.Array = BaseMethods_js_1.default.Array;
exports["default"] = PhysicsMethods;
//# sourceMappingURL=PhysicsMethods.js.map

/***/ }),

/***/ 33644:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetOptionsConfiguration = exports.SetOptionsUtil = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var Symbol_js_1 = __webpack_require__(56941);
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
var Options_js_1 = __webpack_require__(36059);
exports.SetOptionsUtil = {
    filterPackage: function (parser, extension) {
        if (extension !== 'tex' && !Configuration_js_1.ConfigurationHandler.get(extension)) {
            throw new TexError_js_1.default('NotAPackage', 'Not a defined package: %1', extension);
        }
        var config = parser.options.setoptions;
        var options = config.allowOptions[extension];
        if ((options === undefined && !config.allowPackageDefault) || options === false) {
            throw new TexError_js_1.default('PackageNotSettable', 'Options can\'t be set for package "%1"', extension);
        }
        return true;
    },
    filterOption: function (parser, extension, option) {
        var _a;
        var config = parser.options.setoptions;
        var options = config.allowOptions[extension] || {};
        var allow = (options.hasOwnProperty(option) && !(0, Options_js_1.isObject)(options[option]) ? options[option] : null);
        if (allow === false || (allow === null && !config.allowOptionsDefault)) {
            throw new TexError_js_1.default('OptionNotSettable', 'Option "%1" is not allowed to be set', option);
        }
        if (!((_a = (extension === 'tex' ? parser.options : parser.options[extension])) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(option))) {
            if (extension === 'tex') {
                throw new TexError_js_1.default('InvalidTexOption', 'Invalid TeX option "%1"', option);
            }
            else {
                throw new TexError_js_1.default('InvalidOptionKey', 'Invalid option "%1" for package "%2"', option, extension);
            }
        }
        return true;
    },
    filterValue: function (_parser, _extension, _option, value) {
        return value;
    }
};
var setOptionsMap = new SymbolMap_js_1.CommandMap('setoptions', {
    setOptions: 'SetOptions'
}, {
    SetOptions: function (parser, name) {
        var e_1, _a;
        var extension = parser.GetBrackets(name) || 'tex';
        var options = ParseUtil_js_1.default.keyvalOptions(parser.GetArgument(name));
        var config = parser.options.setoptions;
        if (!config.filterPackage(parser, extension))
            return;
        try {
            for (var _b = __values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (config.filterOption(parser, extension, key)) {
                    (extension === 'tex' ? parser.options : parser.options[extension])[key] =
                        config.filterValue(parser, extension, key, options[key]);
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
    }
});
function setoptionsConfig(_config, jax) {
    var require = jax.parseOptions.handlers.get('macro').lookup('require');
    if (require) {
        setOptionsMap.add('Require', new Symbol_js_1.Macro('Require', require._func));
        setOptionsMap.add('require', new Symbol_js_1.Macro('require', BaseMethods_js_1.default.Macro, ['\\Require{#2}\\setOptions[#2]{#1}', 2, '']));
    }
}
exports.SetOptionsConfiguration = Configuration_js_1.Configuration.create('setoptions', {
    handler: { macro: ['setoptions'] },
    config: setoptionsConfig,
    priority: 3,
    options: {
        setoptions: {
            filterPackage: exports.SetOptionsUtil.filterPackage,
            filterOption: exports.SetOptionsUtil.filterOption,
            filterValue: exports.SetOptionsUtil.filterValue,
            allowPackageDefault: true,
            allowOptionsDefault: true,
            allowOptions: (0, Options_js_1.expandable)({
                tex: {
                    FindTeX: false,
                    formatError: false,
                    package: false,
                    baseURL: false,
                    tags: false,
                    maxBuffer: false,
                    maxMaxros: false,
                    macros: false,
                    environments: false
                },
                setoptions: false,
                autoload: false,
                require: false,
                configmacros: false,
                tagformat: false
            })
        }
    }
});
//# sourceMappingURL=SetOptionsConfiguration.js.map

/***/ }),

/***/ 32020:
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
exports.TagFormatConfiguration = exports.tagformatConfig = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var Tags_js_1 = __webpack_require__(56711);
var tagID = 0;
function tagformatConfig(config, jax) {
    var tags = jax.parseOptions.options.tags;
    if (tags !== 'base' && config.tags.hasOwnProperty(tags)) {
        Tags_js_1.TagsFactory.add(tags, config.tags[tags]);
    }
    var TagClass = Tags_js_1.TagsFactory.create(jax.parseOptions.options.tags).constructor;
    var TagFormat = (function (_super) {
        __extends(TagFormat, _super);
        function TagFormat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TagFormat.prototype.formatNumber = function (n) {
            return jax.parseOptions.options.tagformat.number(n);
        };
        TagFormat.prototype.formatTag = function (tag) {
            return jax.parseOptions.options.tagformat.tag(tag);
        };
        TagFormat.prototype.formatId = function (id) {
            return jax.parseOptions.options.tagformat.id(id);
        };
        TagFormat.prototype.formatUrl = function (id, base) {
            return jax.parseOptions.options.tagformat.url(id, base);
        };
        return TagFormat;
    }(TagClass));
    tagID++;
    var tagName = 'configTags-' + tagID;
    Tags_js_1.TagsFactory.add(tagName, TagFormat);
    jax.parseOptions.options.tags = tagName;
}
exports.tagformatConfig = tagformatConfig;
exports.TagFormatConfiguration = Configuration_js_1.Configuration.create('tagformat', {
    config: [tagformatConfig, 10],
    options: {
        tagformat: {
            number: function (n) { return n.toString(); },
            tag: function (tag) { return '(' + tag + ')'; },
            id: function (id) { return 'mjx-eqn:' + id.replace(/\s/g, '_'); },
            url: function (id, base) { return base + '#' + encodeURIComponent(id); },
        }
    }
});
//# sourceMappingURL=TagFormatConfiguration.js.map

/***/ }),

/***/ 7646:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextcompConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
__webpack_require__(60169);
exports.TextcompConfiguration = Configuration_js_1.Configuration.create('textcomp', {
    handler: { macro: ['textcomp-macros'] }
});
//# sourceMappingURL=TextcompConfiguration.js.map

/***/ }),

/***/ 60169:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SymbolMap_js_1 = __webpack_require__(92715);
var TexConstants_js_1 = __webpack_require__(48948);
var TextMacrosMethods_js_1 = __webpack_require__(14712);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var TextParser_js_1 = __webpack_require__(52888);
new SymbolMap_js_1.CommandMap('textcomp-macros', {
    'textasciicircum': ['Insert', '\u005E'],
    'textasciitilde': ['Insert', '\u007E'],
    'textasteriskcentered': ['Insert', '\u002A'],
    'textbackslash': ['Insert', '\u005C'],
    'textbar': ['Insert', '\u007C'],
    'textbraceleft': ['Insert', '\u007B'],
    'textbraceright': ['Insert', '\u007D'],
    'textbullet': ['Insert', '\u2022'],
    'textdagger': ['Insert', '\u2020'],
    'textdaggerdbl': ['Insert', '\u2021'],
    'textellipsis': ['Insert', '\u2026'],
    'textemdash': ['Insert', '\u2014'],
    'textendash': ['Insert', '\u2013'],
    'textexclamdown': ['Insert', '\u00A1'],
    'textgreater': ['Insert', '\u003E'],
    'textless': ['Insert', '\u003C'],
    'textordfeminine': ['Insert', '\u00AA'],
    'textordmasculine': ['Insert', '\u00BA'],
    'textparagraph': ['Insert', '\u00B6'],
    'textperiodcentered': ['Insert', '\u00B7'],
    'textquestiondown': ['Insert', '\u00BF'],
    'textquotedblleft': ['Insert', '\u201C'],
    'textquotedblright': ['Insert', '\u201D'],
    'textquoteleft': ['Insert', '\u2018'],
    'textquoteright': ['Insert', '\u2019'],
    'textsection': ['Insert', '\u00A7'],
    'textunderscore': ['Insert', '\u005F'],
    'textvisiblespace': ['Insert', '\u2423'],
    'textacutedbl': ['Insert', '\u02DD'],
    'textasciiacute': ['Insert', '\u00B4'],
    'textasciibreve': ['Insert', '\u02D8'],
    'textasciicaron': ['Insert', '\u02C7'],
    'textasciidieresis': ['Insert', '\u00A8'],
    'textasciimacron': ['Insert', '\u00AF'],
    'textgravedbl': ['Insert', '\u02F5'],
    'texttildelow': ['Insert', '\u02F7'],
    'textbaht': ['Insert', '\u0E3F'],
    'textcent': ['Insert', '\u00A2'],
    'textcolonmonetary': ['Insert', '\u20A1'],
    'textcurrency': ['Insert', '\u00A4'],
    'textdollar': ['Insert', '\u0024'],
    'textdong': ['Insert', '\u20AB'],
    'texteuro': ['Insert', '\u20AC'],
    'textflorin': ['Insert', '\u0192'],
    'textguarani': ['Insert', '\u20B2'],
    'textlira': ['Insert', '\u20A4'],
    'textnaira': ['Insert', '\u20A6'],
    'textpeso': ['Insert', '\u20B1'],
    'textsterling': ['Insert', '\u00A3'],
    'textwon': ['Insert', '\u20A9'],
    'textyen': ['Insert', '\u00A5'],
    'textcircledP': ['Insert', '\u2117'],
    'textcompwordmark': ['Insert', '\u200C'],
    'textcopyleft': ['Insert', "\uD83C\uDD2F"],
    'textcopyright': ['Insert', '\u00A9'],
    'textregistered': ['Insert', '\u00AE'],
    'textservicemark': ['Insert', '\u2120'],
    'texttrademark': ['Insert', '\u2122'],
    'textbardbl': ['Insert', '\u2016'],
    'textbigcircle': ['Insert', '\u25EF'],
    'textblank': ['Insert', '\u2422'],
    'textbrokenbar': ['Insert', '\u00A6'],
    'textdiscount': ['Insert', '\u2052'],
    'textestimated': ['Insert', '\u212E'],
    'textinterrobang': ['Insert', '\u203D'],
    'textinterrobangdown': ['Insert', '\u2E18'],
    'textmusicalnote': ['Insert', '\u266A'],
    'textnumero': ['Insert', '\u2116'],
    'textopenbullet': ['Insert', '\u25E6'],
    'textpertenthousand': ['Insert', '\u2031'],
    'textperthousand': ['Insert', '\u2030'],
    'textrecipe': ['Insert', '\u211E'],
    'textreferencemark': ['Insert', '\u203B'],
    'textlangle': ['Insert', '\u2329'],
    'textrangle': ['Insert', '\u232A'],
    'textlbrackdbl': ['Insert', '\u27E6'],
    'textrbrackdbl': ['Insert', '\u27E7'],
    'textlquill': ['Insert', '\u2045'],
    'textrquill': ['Insert', '\u2046'],
    'textcelsius': ['Insert', '\u2103'],
    'textdegree': ['Insert', '\u00B0'],
    'textdiv': ['Insert', '\u00F7'],
    'textdownarrow': ['Insert', '\u2193'],
    'textfractionsolidus': ['Insert', '\u2044'],
    'textleftarrow': ['Insert', '\u2190'],
    'textlnot': ['Insert', '\u00AC'],
    'textmho': ['Insert', '\u2127'],
    'textminus': ['Insert', '\u2212'],
    'textmu': ['Insert', '\u00B5'],
    'textohm': ['Insert', '\u2126'],
    'textonehalf': ['Insert', '\u00BD'],
    'textonequarter': ['Insert', '\u00BC'],
    'textonesuperior': ['Insert', '\u00B9'],
    'textpm': ['Insert', '\u00B1'],
    'textrightarrow': ['Insert', '\u2192'],
    'textsurd': ['Insert', '\u221A'],
    'textthreequarters': ['Insert', '\u00BE'],
    'textthreesuperior': ['Insert', '\u00B3'],
    'texttimes': ['Insert', '\u00D7'],
    'texttwosuperior': ['Insert', '\u00B2'],
    'textuparrow': ['Insert', '\u2191'],
    'textborn': ['Insert', '\u002A'],
    'textdied': ['Insert', '\u2020'],
    'textdivorced': ['Insert', '\u26AE'],
    'textmarried': ['Insert', '\u26AD'],
    'textcentoldstyle': ['Insert', '\u00A2', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'textdollaroldstyle': ['Insert', '\u0024', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'textzerooldstyle': ['Insert', '0', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'textoneoldstyle': ['Insert', '1', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'texttwooldstyle': ['Insert', '2', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'textthreeoldstyle': ['Insert', '3', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'textfouroldstyle': ['Insert', '4', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'textfiveoldstyle': ['Insert', '5', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'textsixoldstyle': ['Insert', '6', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'textsevenoldstyle': ['Insert', '7', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'texteightoldstyle': ['Insert', '8', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    'textnineoldstyle': ['Insert', '9', TexConstants_js_1.TexConstant.Variant.OLDSTYLE]
}, {
    Insert: function (parser, name, c, font) {
        if (parser instanceof TextParser_js_1.TextParser) {
            if (!font) {
                TextMacrosMethods_js_1.TextMacrosMethods.Insert(parser, name, c);
                return;
            }
            parser.saveText();
        }
        parser.Push(ParseUtil_js_1.default.internalText(parser, c, font ? { mathvariant: font } : {}));
    }
});
//# sourceMappingURL=TextcompMappings.js.map

/***/ }),

/***/ 77760:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextMacrosConfiguration = exports.TextBaseConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var ParseOptions_js_1 = __importDefault(__webpack_require__(1331));
var Tags_js_1 = __webpack_require__(56711);
var BaseItems_js_1 = __webpack_require__(5065);
var TextParser_js_1 = __webpack_require__(52888);
var TextMacrosMethods_js_1 = __webpack_require__(14712);
__webpack_require__(84186);
exports.TextBaseConfiguration = Configuration_js_1.Configuration.create('text-base', {
    parser: 'text',
    handler: {
        character: ['command', 'text-special'],
        macro: ['text-macros']
    },
    fallback: {
        character: function (parser, c) {
            parser.text += c;
        },
        macro: function (parser, name) {
            var texParser = parser.texParser;
            var macro = texParser.lookup('macro', name);
            if (macro && macro._func !== TextMacrosMethods_js_1.TextMacrosMethods.Macro) {
                parser.Error('MathMacro', '%1 is only supported in math mode', '\\' + name);
            }
            texParser.parse('macro', [parser, name]);
        }
    },
    items: (_a = {},
        _a[BaseItems_js_1.StartItem.prototype.kind] = BaseItems_js_1.StartItem,
        _a[BaseItems_js_1.StopItem.prototype.kind] = BaseItems_js_1.StopItem,
        _a[BaseItems_js_1.MmlItem.prototype.kind] = BaseItems_js_1.MmlItem,
        _a[BaseItems_js_1.StyleItem.prototype.kind] = BaseItems_js_1.StyleItem,
        _a)
});
function internalMath(parser, text, level, mathvariant) {
    var config = parser.configuration.packageData.get('textmacros');
    if (!(parser instanceof TextParser_js_1.TextParser)) {
        config.texParser = parser;
    }
    return [(new TextParser_js_1.TextParser(text, mathvariant ? { mathvariant: mathvariant } : {}, config.parseOptions, level)).mml()];
}
exports.TextMacrosConfiguration = Configuration_js_1.Configuration.create('textmacros', {
    config: function (_config, jax) {
        var textConf = new Configuration_js_1.ParserConfiguration(jax.parseOptions.options.textmacros.packages, ['tex', 'text']);
        textConf.init();
        var parseOptions = new ParseOptions_js_1.default(textConf, []);
        parseOptions.options = jax.parseOptions.options;
        textConf.config(jax);
        Tags_js_1.TagsFactory.addTags(textConf.tags);
        parseOptions.tags = Tags_js_1.TagsFactory.getDefault();
        parseOptions.tags.configuration = parseOptions;
        parseOptions.packageData = jax.parseOptions.packageData;
        parseOptions.packageData.set('textmacros', { parseOptions: parseOptions, jax: jax, texParser: null });
        parseOptions.options.internalMath = internalMath;
    },
    preprocessors: [function (data) {
            var config = data.data.packageData.get('textmacros');
            config.parseOptions.nodeFactory.setMmlFactory(config.jax.mmlFactory);
        }],
    options: {
        textmacros: {
            packages: ['text-base']
        }
    }
});
//# sourceMappingURL=TextMacrosConfiguration.js.map

/***/ }),

/***/ 84186:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var SymbolMap_js_1 = __webpack_require__(92715);
var TexConstants_js_1 = __webpack_require__(48948);
var TextMacrosMethods_js_1 = __webpack_require__(14712);
var lengths_js_1 = __webpack_require__(77130);
new SymbolMap_js_1.MacroMap('text-special', {
    '$': 'Math',
    '%': 'Comment',
    '^': 'MathModeOnly',
    '_': 'MathModeOnly',
    '&': 'Misplaced',
    '#': 'Misplaced',
    '~': 'Tilde',
    ' ': 'Space',
    '\t': 'Space',
    '\r': 'Space',
    '\n': 'Space',
    '\u00A0': 'Tilde',
    '{': 'OpenBrace',
    '}': 'CloseBrace',
    '`': 'OpenQuote',
    '\'': 'CloseQuote'
}, TextMacrosMethods_js_1.TextMacrosMethods);
new SymbolMap_js_1.CommandMap('text-macros', {
    '(': 'Math',
    '$': 'SelfQuote',
    '_': 'SelfQuote',
    '%': 'SelfQuote',
    '{': 'SelfQuote',
    '}': 'SelfQuote',
    ' ': 'SelfQuote',
    '&': 'SelfQuote',
    '#': 'SelfQuote',
    '\\': 'SelfQuote',
    '\'': ['Accent', '\u00B4'],
    '\u2019': ['Accent', '\u00B4'],
    '`': ['Accent', '\u0060'],
    '\u2018': ['Accent', '\u0060'],
    '^': ['Accent', '^'],
    '\"': ['Accent', '\u00A8'],
    '~': ['Accent', '~'],
    '=': ['Accent', '\u00AF'],
    '.': ['Accent', '\u02D9'],
    'u': ['Accent', '\u02D8'],
    'v': ['Accent', '\u02C7'],
    emph: 'Emph',
    rm: ['SetFont', TexConstants_js_1.TexConstant.Variant.NORMAL],
    mit: ['SetFont', TexConstants_js_1.TexConstant.Variant.ITALIC],
    oldstyle: ['SetFont', TexConstants_js_1.TexConstant.Variant.OLDSTYLE],
    cal: ['SetFont', TexConstants_js_1.TexConstant.Variant.CALLIGRAPHIC],
    it: ['SetFont', '-tex-mathit'],
    bf: ['SetFont', TexConstants_js_1.TexConstant.Variant.BOLD],
    bbFont: ['SetFont', TexConstants_js_1.TexConstant.Variant.DOUBLESTRUCK],
    scr: ['SetFont', TexConstants_js_1.TexConstant.Variant.SCRIPT],
    frak: ['SetFont', TexConstants_js_1.TexConstant.Variant.FRAKTUR],
    sf: ['SetFont', TexConstants_js_1.TexConstant.Variant.SANSSERIF],
    tt: ['SetFont', TexConstants_js_1.TexConstant.Variant.MONOSPACE],
    tiny: ['SetSize', 0.5],
    Tiny: ['SetSize', 0.6],
    scriptsize: ['SetSize', 0.7],
    small: ['SetSize', 0.85],
    normalsize: ['SetSize', 1.0],
    large: ['SetSize', 1.2],
    Large: ['SetSize', 1.44],
    LARGE: ['SetSize', 1.73],
    huge: ['SetSize', 2.07],
    Huge: ['SetSize', 2.49],
    Bbb: ['Macro', '{\\bbFont #1}', 1],
    textnormal: ['Macro', '{\\rm #1}', 1],
    textup: ['Macro', '{\\rm #1}', 1],
    textrm: ['Macro', '{\\rm #1}', 1],
    textit: ['Macro', '{\\it #1}', 1],
    textbf: ['Macro', '{\\bf #1}', 1],
    textsf: ['Macro', '{\\sf #1}', 1],
    texttt: ['Macro', '{\\tt #1}', 1],
    dagger: ['Insert', '\u2020'],
    ddagger: ['Insert', '\u2021'],
    S: ['Insert', '\u00A7'],
    ',': ['Spacer', lengths_js_1.MATHSPACE.thinmathspace],
    ':': ['Spacer', lengths_js_1.MATHSPACE.mediummathspace],
    '>': ['Spacer', lengths_js_1.MATHSPACE.mediummathspace],
    ';': ['Spacer', lengths_js_1.MATHSPACE.thickmathspace],
    '!': ['Spacer', lengths_js_1.MATHSPACE.negativethinmathspace],
    enspace: ['Spacer', .5],
    quad: ['Spacer', 1],
    qquad: ['Spacer', 2],
    thinspace: ['Spacer', lengths_js_1.MATHSPACE.thinmathspace],
    negthinspace: ['Spacer', lengths_js_1.MATHSPACE.negativethinmathspace],
    hskip: 'Hskip',
    hspace: 'Hskip',
    kern: 'Hskip',
    mskip: 'Hskip',
    mspace: 'Hskip',
    mkern: 'Hskip',
    rule: 'rule',
    Rule: ['Rule'],
    Space: ['Rule', 'blank'],
    color: 'CheckAutoload',
    textcolor: 'CheckAutoload',
    colorbox: 'CheckAutoload',
    fcolorbox: 'CheckAutoload',
    href: 'CheckAutoload',
    style: 'CheckAutoload',
    class: 'CheckAutoload',
    cssId: 'CheckAutoload',
    unicode: 'CheckAutoload',
    ref: ['HandleRef', false],
    eqref: ['HandleRef', true],
}, TextMacrosMethods_js_1.TextMacrosMethods);
//# sourceMappingURL=TextMacrosMappings.js.map

/***/ }),

/***/ 14712:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextMacrosMethods = void 0;
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var Retries_js_1 = __webpack_require__(97000);
var BaseMethods_js_1 = __importDefault(__webpack_require__(40871));
exports.TextMacrosMethods = {
    Comment: function (parser, _c) {
        while (parser.i < parser.string.length && parser.string.charAt(parser.i) !== '\n') {
            parser.i++;
        }
        parser.i++;
    },
    Math: function (parser, open) {
        parser.saveText();
        var i = parser.i;
        var j, c;
        var braces = 0;
        while ((c = parser.GetNext())) {
            j = parser.i++;
            switch (c) {
                case '\\':
                    var cs = parser.GetCS();
                    if (cs === ')')
                        c = '\\(';
                case '$':
                    if (braces === 0 && open === c) {
                        var config = parser.texParser.configuration;
                        var mml = (new TexParser_js_1.default(parser.string.substr(i, j - i), parser.stack.env, config)).mml();
                        parser.PushMath(mml);
                        return;
                    }
                    break;
                case '{':
                    braces++;
                    break;
                case '}':
                    if (braces === 0) {
                        parser.Error('ExtraCloseMissingOpen', 'Extra close brace or missing open brace');
                    }
                    braces--;
                    break;
            }
        }
        parser.Error('MathNotTerminated', 'Math-mode is not properly terminated');
    },
    MathModeOnly: function (parser, c) {
        parser.Error('MathModeOnly', '\'%1\' allowed only in math mode', c);
    },
    Misplaced: function (parser, c) {
        parser.Error('Misplaced', '\'%1\' can not be used here', c);
    },
    OpenBrace: function (parser, _c) {
        var env = parser.stack.env;
        parser.envStack.push(env);
        parser.stack.env = Object.assign({}, env);
    },
    CloseBrace: function (parser, _c) {
        if (parser.envStack.length) {
            parser.saveText();
            parser.stack.env = parser.envStack.pop();
        }
        else {
            parser.Error('ExtraCloseMissingOpen', 'Extra close brace or missing open brace');
        }
    },
    OpenQuote: function (parser, c) {
        if (parser.string.charAt(parser.i) === c) {
            parser.text += '\u201C';
            parser.i++;
        }
        else {
            parser.text += '\u2018';
        }
    },
    CloseQuote: function (parser, c) {
        if (parser.string.charAt(parser.i) === c) {
            parser.text += '\u201D';
            parser.i++;
        }
        else {
            parser.text += '\u2019';
        }
    },
    Tilde: function (parser, _c) {
        parser.text += '\u00A0';
    },
    Space: function (parser, _c) {
        parser.text += ' ';
        while (parser.GetNext().match(/\s/))
            parser.i++;
    },
    SelfQuote: function (parser, name) {
        parser.text += name.substr(1);
    },
    Insert: function (parser, _name, c) {
        parser.text += c;
    },
    Accent: function (parser, name, c) {
        var base = parser.ParseArg(name);
        var accent = parser.create('token', 'mo', {}, c);
        parser.addAttributes(accent);
        parser.Push(parser.create('node', 'mover', [base, accent]));
    },
    Emph: function (parser, name) {
        var variant = (parser.stack.env.mathvariant === '-tex-mathit' ? 'normal' : '-tex-mathit');
        parser.Push(parser.ParseTextArg(name, { mathvariant: variant }));
    },
    SetFont: function (parser, _name, variant) {
        parser.saveText();
        parser.stack.env.mathvariant = variant;
    },
    SetSize: function (parser, _name, size) {
        parser.saveText();
        parser.stack.env.mathsize = size;
    },
    CheckAutoload: function (parser, name) {
        var autoload = parser.configuration.packageData.get('autoload');
        var texParser = parser.texParser;
        name = name.slice(1);
        var macro = texParser.lookup('macro', name);
        if (!macro || (autoload && macro._func === autoload.Autoload)) {
            texParser.parse('macro', [texParser, name]);
            if (!macro)
                return;
            (0, Retries_js_1.retryAfter)(Promise.resolve());
        }
        texParser.parse('macro', [parser, name]);
    },
    Macro: BaseMethods_js_1.default.Macro,
    Spacer: BaseMethods_js_1.default.Spacer,
    Hskip: BaseMethods_js_1.default.Hskip,
    rule: BaseMethods_js_1.default.rule,
    Rule: BaseMethods_js_1.default.Rule,
    HandleRef: BaseMethods_js_1.default.HandleRef
};
//# sourceMappingURL=TextMacrosMethods.js.map

/***/ }),

/***/ 52888:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextParser = void 0;
var TexParser_js_1 = __importDefault(__webpack_require__(42880));
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var MmlNode_js_1 = __webpack_require__(18426);
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var BaseItems_js_1 = __webpack_require__(5065);
var TextParser = (function (_super) {
    __extends(TextParser, _super);
    function TextParser(text, env, configuration, level) {
        var _this = _super.call(this, text, env, configuration) || this;
        _this.level = level;
        return _this;
    }
    Object.defineProperty(TextParser.prototype, "texParser", {
        get: function () {
            return this.configuration.packageData.get('textmacros').texParser;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextParser.prototype, "tags", {
        get: function () {
            return this.texParser.tags;
        },
        enumerable: false,
        configurable: true
    });
    TextParser.prototype.mml = function () {
        return (this.level != null ?
            this.create('node', 'mstyle', this.nodes, { displaystyle: false, scriptlevel: this.level }) :
            this.nodes.length === 1 ? this.nodes[0] : this.create('node', 'mrow', this.nodes));
    };
    TextParser.prototype.Parse = function () {
        this.text = '';
        this.nodes = [];
        this.envStack = [];
        _super.prototype.Parse.call(this);
    };
    TextParser.prototype.saveText = function () {
        if (this.text) {
            var mathvariant = this.stack.env.mathvariant;
            var text = ParseUtil_js_1.default.internalText(this, this.text, mathvariant ? { mathvariant: mathvariant } : {});
            this.text = '';
            this.Push(text);
        }
    };
    TextParser.prototype.Push = function (mml) {
        if (this.text) {
            this.saveText();
        }
        if (mml instanceof BaseItems_js_1.StopItem) {
            return _super.prototype.Push.call(this, mml);
        }
        if (mml instanceof BaseItems_js_1.StyleItem) {
            this.stack.env.mathcolor = this.stack.env.color;
            return;
        }
        if (mml instanceof MmlNode_js_1.AbstractMmlNode) {
            this.addAttributes(mml);
            this.nodes.push(mml);
        }
    };
    TextParser.prototype.PushMath = function (mml) {
        var e_1, _a;
        var env = this.stack.env;
        if (!mml.isKind('TeXAtom')) {
            mml = this.create('node', 'TeXAtom', [mml]);
        }
        try {
            for (var _b = __values(['mathsize', 'mathcolor']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                if (env[name_1] && !mml.attributes.getExplicit(name_1)) {
                    if (!mml.isToken && !mml.isKind('mstyle')) {
                        mml = this.create('node', 'mstyle', [mml]);
                    }
                    NodeUtil_js_1.default.setAttribute(mml, name_1, env[name_1]);
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
        if (mml.isInferred) {
            mml = this.create('node', 'mrow', mml.childNodes);
        }
        this.nodes.push(mml);
    };
    TextParser.prototype.addAttributes = function (mml) {
        var e_2, _a;
        var env = this.stack.env;
        if (!mml.isToken)
            return;
        try {
            for (var _b = __values(['mathsize', 'mathcolor', 'mathvariant']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_2 = _c.value;
                if (env[name_2] && !mml.attributes.getExplicit(name_2)) {
                    NodeUtil_js_1.default.setAttribute(mml, name_2, env[name_2]);
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
    TextParser.prototype.ParseTextArg = function (name, env) {
        var text = this.GetArgument(name);
        env = Object.assign(Object.assign({}, this.stack.env), env);
        return (new TextParser(text, env, this.configuration)).mml();
    };
    TextParser.prototype.ParseArg = function (name) {
        return (new TextParser(this.GetArgument(name), this.stack.env, this.configuration)).mml();
    };
    TextParser.prototype.Error = function (id, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        throw new (TexError_js_1.default.bind.apply(TexError_js_1.default, __spreadArray([void 0, id, message], __read(args), false)))();
    };
    return TextParser;
}(TexParser_js_1.default));
exports.TextParser = TextParser;
//# sourceMappingURL=TextParser.js.map

/***/ }),

/***/ 19471:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnicodeConfiguration = exports.UnicodeMethods = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
var SymbolMap_js_1 = __webpack_require__(92715);
var ParseUtil_js_1 = __importDefault(__webpack_require__(3378));
var NodeUtil_js_1 = __importDefault(__webpack_require__(72895));
var Entities_js_1 = __webpack_require__(63411);
exports.UnicodeMethods = {};
var UnicodeCache = {};
exports.UnicodeMethods.Unicode = function (parser, name) {
    var HD = parser.GetBrackets(name);
    var HDsplit = null;
    var font = null;
    if (HD) {
        if (HD.replace(/ /g, '').
            match(/^(\d+(\.\d*)?|\.\d+),(\d+(\.\d*)?|\.\d+)$/)) {
            HDsplit = HD.replace(/ /g, '').split(/,/);
            font = parser.GetBrackets(name);
        }
        else {
            font = HD;
        }
    }
    var n = ParseUtil_js_1.default.trimSpaces(parser.GetArgument(name)).replace(/^0x/, 'x');
    if (!n.match(/^(x[0-9A-Fa-f]+|[0-9]+)$/)) {
        throw new TexError_js_1.default('BadUnicode', 'Argument to \\unicode must be a number');
    }
    var N = parseInt(n.match(/^x/) ? '0' + n : n);
    if (!UnicodeCache[N]) {
        UnicodeCache[N] = [800, 200, font, N];
    }
    else if (!font) {
        font = UnicodeCache[N][2];
    }
    if (HDsplit) {
        UnicodeCache[N][0] = Math.floor(parseFloat(HDsplit[0]) * 1000);
        UnicodeCache[N][1] = Math.floor(parseFloat(HDsplit[1]) * 1000);
    }
    var variant = parser.stack.env.font;
    var def = {};
    if (font) {
        UnicodeCache[N][2] = def.fontfamily = font.replace(/'/g, '\'');
        if (variant) {
            if (variant.match(/bold/)) {
                def.fontweight = 'bold';
            }
            if (variant.match(/italic|-mathit/)) {
                def.fontstyle = 'italic';
            }
        }
    }
    else if (variant) {
        def.mathvariant = variant;
    }
    var node = parser.create('token', 'mtext', def, (0, Entities_js_1.numeric)(n));
    NodeUtil_js_1.default.setProperty(node, 'unicode', true);
    parser.Push(node);
};
new SymbolMap_js_1.CommandMap('unicode', { unicode: 'Unicode' }, exports.UnicodeMethods);
exports.UnicodeConfiguration = Configuration_js_1.Configuration.create('unicode', { handler: { macro: ['unicode'] } });
//# sourceMappingURL=UnicodeConfiguration.js.map

/***/ }),

/***/ 36240:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpgreekConfiguration = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var SymbolMap_js_1 = __webpack_require__(92715);
var TexConstants_js_1 = __webpack_require__(48948);
function mathchar0miNormal(parser, mchar) {
    var def = mchar.attributes || {};
    def.mathvariant = TexConstants_js_1.TexConstant.Variant.NORMAL;
    var node = parser.create('token', 'mi', def, mchar.char);
    parser.Push(node);
}
new SymbolMap_js_1.CharacterMap('upgreek', mathchar0miNormal, {
    upalpha: '\u03B1',
    upbeta: '\u03B2',
    upgamma: '\u03B3',
    updelta: '\u03B4',
    upepsilon: '\u03F5',
    upzeta: '\u03B6',
    upeta: '\u03B7',
    uptheta: '\u03B8',
    upiota: '\u03B9',
    upkappa: '\u03BA',
    uplambda: '\u03BB',
    upmu: '\u03BC',
    upnu: '\u03BD',
    upxi: '\u03BE',
    upomicron: '\u03BF',
    uppi: '\u03C0',
    uprho: '\u03C1',
    upsigma: '\u03C3',
    uptau: '\u03C4',
    upupsilon: '\u03C5',
    upphi: '\u03D5',
    upchi: '\u03C7',
    uppsi: '\u03C8',
    upomega: '\u03C9',
    upvarepsilon: '\u03B5',
    upvartheta: '\u03D1',
    upvarpi: '\u03D6',
    upvarrho: '\u03F1',
    upvarsigma: '\u03C2',
    upvarphi: '\u03C6',
    Upgamma: '\u0393',
    Updelta: '\u0394',
    Uptheta: '\u0398',
    Uplambda: '\u039B',
    Upxi: '\u039E',
    Uppi: '\u03A0',
    Upsigma: '\u03A3',
    Upupsilon: '\u03A5',
    Upphi: '\u03A6',
    Uppsi: '\u03A8',
    Upomega: '\u03A9'
});
exports.UpgreekConfiguration = Configuration_js_1.Configuration.create('upgreek', {
    handler: { macro: ['upgreek'] },
});
//# sourceMappingURL=UpgreekConfiguration.js.map

/***/ }),

/***/ 54305:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerbConfiguration = exports.VerbMethods = void 0;
var Configuration_js_1 = __webpack_require__(23644);
var TexConstants_js_1 = __webpack_require__(48948);
var SymbolMap_js_1 = __webpack_require__(92715);
var TexError_js_1 = __importDefault(__webpack_require__(48406));
exports.VerbMethods = {};
exports.VerbMethods.Verb = function (parser, name) {
    var c = parser.GetNext();
    var start = ++parser.i;
    if (c === '') {
        throw new TexError_js_1.default('MissingArgFor', 'Missing argument for %1', name);
    }
    while (parser.i < parser.string.length &&
        parser.string.charAt(parser.i) !== c) {
        parser.i++;
    }
    if (parser.i === parser.string.length) {
        throw new TexError_js_1.default('NoClosingDelim', 'Can\'t find closing delimiter for %1', parser.currentCS);
    }
    var text = parser.string.slice(start, parser.i).replace(/ /g, '\u00A0');
    parser.i++;
    parser.Push(parser.create('token', 'mtext', { mathvariant: TexConstants_js_1.TexConstant.Variant.MONOSPACE }, text));
};
new SymbolMap_js_1.CommandMap('verb', { verb: 'Verb' }, exports.VerbMethods);
exports.VerbConfiguration = Configuration_js_1.Configuration.create('verb', { handler: { macro: ['verb'] } });
//# sourceMappingURL=VerbConfiguration.js.map

/***/ }),

/***/ 90786:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mathjax = void 0;
var version_js_1 = __webpack_require__(73132);
var HandlerList_js_1 = __webpack_require__(43582);
var Retries_js_1 = __webpack_require__(97000);
exports.mathjax = {
    version: version_js_1.VERSION,
    handlers: new HandlerList_js_1.HandlerList(),
    document: function (document, options) {
        return exports.mathjax.handlers.document(document, options);
    },
    handleRetriesFor: Retries_js_1.handleRetriesFor,
    retryAfter: Retries_js_1.retryAfter,
    asyncLoad: null,
};
//# sourceMappingURL=mathjax.js.map

/***/ }),

/***/ 26859:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asyncLoad = void 0;
var mathjax_js_1 = __webpack_require__(90786);
function asyncLoad(name) {
    if (!mathjax_js_1.mathjax.asyncLoad) {
        return Promise.reject("Can't load '".concat(name, "': No asyncLoad method specified"));
    }
    return new Promise(function (ok, fail) {
        var result = mathjax_js_1.mathjax.asyncLoad(name);
        if (result instanceof Promise) {
            result.then(function (value) { return ok(value); }).catch(function (err) { return fail(err); });
        }
        else {
            ok(result);
        }
    });
}
exports.asyncLoad = asyncLoad;
//# sourceMappingURL=AsyncLoad.js.map

/***/ }),

/***/ 63411:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.numeric = exports.translate = exports.remove = exports.add = exports.entities = exports.options = void 0;
var Retries_js_1 = __webpack_require__(97000);
var AsyncLoad_js_1 = __webpack_require__(26859);
exports.options = {
    loadMissingEntities: true
};
exports.entities = {
    ApplyFunction: '\u2061',
    Backslash: '\u2216',
    Because: '\u2235',
    Breve: '\u02D8',
    Cap: '\u22D2',
    CenterDot: '\u00B7',
    CircleDot: '\u2299',
    CircleMinus: '\u2296',
    CirclePlus: '\u2295',
    CircleTimes: '\u2297',
    Congruent: '\u2261',
    ContourIntegral: '\u222E',
    Coproduct: '\u2210',
    Cross: '\u2A2F',
    Cup: '\u22D3',
    CupCap: '\u224D',
    Dagger: '\u2021',
    Del: '\u2207',
    Delta: '\u0394',
    Diamond: '\u22C4',
    DifferentialD: '\u2146',
    DotEqual: '\u2250',
    DoubleDot: '\u00A8',
    DoubleRightTee: '\u22A8',
    DoubleVerticalBar: '\u2225',
    DownArrow: '\u2193',
    DownLeftVector: '\u21BD',
    DownRightVector: '\u21C1',
    DownTee: '\u22A4',
    Downarrow: '\u21D3',
    Element: '\u2208',
    EqualTilde: '\u2242',
    Equilibrium: '\u21CC',
    Exists: '\u2203',
    ExponentialE: '\u2147',
    FilledVerySmallSquare: '\u25AA',
    ForAll: '\u2200',
    Gamma: '\u0393',
    Gg: '\u22D9',
    GreaterEqual: '\u2265',
    GreaterEqualLess: '\u22DB',
    GreaterFullEqual: '\u2267',
    GreaterLess: '\u2277',
    GreaterSlantEqual: '\u2A7E',
    GreaterTilde: '\u2273',
    Hacek: '\u02C7',
    Hat: '\u005E',
    HumpDownHump: '\u224E',
    HumpEqual: '\u224F',
    Im: '\u2111',
    ImaginaryI: '\u2148',
    Integral: '\u222B',
    Intersection: '\u22C2',
    InvisibleComma: '\u2063',
    InvisibleTimes: '\u2062',
    Lambda: '\u039B',
    Larr: '\u219E',
    LeftAngleBracket: '\u27E8',
    LeftArrow: '\u2190',
    LeftArrowRightArrow: '\u21C6',
    LeftCeiling: '\u2308',
    LeftDownVector: '\u21C3',
    LeftFloor: '\u230A',
    LeftRightArrow: '\u2194',
    LeftTee: '\u22A3',
    LeftTriangle: '\u22B2',
    LeftTriangleEqual: '\u22B4',
    LeftUpVector: '\u21BF',
    LeftVector: '\u21BC',
    Leftarrow: '\u21D0',
    Leftrightarrow: '\u21D4',
    LessEqualGreater: '\u22DA',
    LessFullEqual: '\u2266',
    LessGreater: '\u2276',
    LessSlantEqual: '\u2A7D',
    LessTilde: '\u2272',
    Ll: '\u22D8',
    Lleftarrow: '\u21DA',
    LongLeftArrow: '\u27F5',
    LongLeftRightArrow: '\u27F7',
    LongRightArrow: '\u27F6',
    Longleftarrow: '\u27F8',
    Longleftrightarrow: '\u27FA',
    Longrightarrow: '\u27F9',
    Lsh: '\u21B0',
    MinusPlus: '\u2213',
    NestedGreaterGreater: '\u226B',
    NestedLessLess: '\u226A',
    NotDoubleVerticalBar: '\u2226',
    NotElement: '\u2209',
    NotEqual: '\u2260',
    NotExists: '\u2204',
    NotGreater: '\u226F',
    NotGreaterEqual: '\u2271',
    NotLeftTriangle: '\u22EA',
    NotLeftTriangleEqual: '\u22EC',
    NotLess: '\u226E',
    NotLessEqual: '\u2270',
    NotPrecedes: '\u2280',
    NotPrecedesSlantEqual: '\u22E0',
    NotRightTriangle: '\u22EB',
    NotRightTriangleEqual: '\u22ED',
    NotSubsetEqual: '\u2288',
    NotSucceeds: '\u2281',
    NotSucceedsSlantEqual: '\u22E1',
    NotSupersetEqual: '\u2289',
    NotTilde: '\u2241',
    NotVerticalBar: '\u2224',
    Omega: '\u03A9',
    OverBar: '\u203E',
    OverBrace: '\u23DE',
    PartialD: '\u2202',
    Phi: '\u03A6',
    Pi: '\u03A0',
    PlusMinus: '\u00B1',
    Precedes: '\u227A',
    PrecedesEqual: '\u2AAF',
    PrecedesSlantEqual: '\u227C',
    PrecedesTilde: '\u227E',
    Product: '\u220F',
    Proportional: '\u221D',
    Psi: '\u03A8',
    Rarr: '\u21A0',
    Re: '\u211C',
    ReverseEquilibrium: '\u21CB',
    RightAngleBracket: '\u27E9',
    RightArrow: '\u2192',
    RightArrowLeftArrow: '\u21C4',
    RightCeiling: '\u2309',
    RightDownVector: '\u21C2',
    RightFloor: '\u230B',
    RightTee: '\u22A2',
    RightTeeArrow: '\u21A6',
    RightTriangle: '\u22B3',
    RightTriangleEqual: '\u22B5',
    RightUpVector: '\u21BE',
    RightVector: '\u21C0',
    Rightarrow: '\u21D2',
    Rrightarrow: '\u21DB',
    Rsh: '\u21B1',
    Sigma: '\u03A3',
    SmallCircle: '\u2218',
    Sqrt: '\u221A',
    Square: '\u25A1',
    SquareIntersection: '\u2293',
    SquareSubset: '\u228F',
    SquareSubsetEqual: '\u2291',
    SquareSuperset: '\u2290',
    SquareSupersetEqual: '\u2292',
    SquareUnion: '\u2294',
    Star: '\u22C6',
    Subset: '\u22D0',
    SubsetEqual: '\u2286',
    Succeeds: '\u227B',
    SucceedsEqual: '\u2AB0',
    SucceedsSlantEqual: '\u227D',
    SucceedsTilde: '\u227F',
    SuchThat: '\u220B',
    Sum: '\u2211',
    Superset: '\u2283',
    SupersetEqual: '\u2287',
    Supset: '\u22D1',
    Therefore: '\u2234',
    Theta: '\u0398',
    Tilde: '\u223C',
    TildeEqual: '\u2243',
    TildeFullEqual: '\u2245',
    TildeTilde: '\u2248',
    UnderBar: '\u005F',
    UnderBrace: '\u23DF',
    Union: '\u22C3',
    UnionPlus: '\u228E',
    UpArrow: '\u2191',
    UpDownArrow: '\u2195',
    UpTee: '\u22A5',
    Uparrow: '\u21D1',
    Updownarrow: '\u21D5',
    Upsilon: '\u03A5',
    Vdash: '\u22A9',
    Vee: '\u22C1',
    VerticalBar: '\u2223',
    VerticalTilde: '\u2240',
    Vvdash: '\u22AA',
    Wedge: '\u22C0',
    Xi: '\u039E',
    amp: '\u0026',
    acute: '\u00B4',
    aleph: '\u2135',
    alpha: '\u03B1',
    amalg: '\u2A3F',
    and: '\u2227',
    ang: '\u2220',
    angmsd: '\u2221',
    angsph: '\u2222',
    ape: '\u224A',
    backprime: '\u2035',
    backsim: '\u223D',
    backsimeq: '\u22CD',
    beta: '\u03B2',
    beth: '\u2136',
    between: '\u226C',
    bigcirc: '\u25EF',
    bigodot: '\u2A00',
    bigoplus: '\u2A01',
    bigotimes: '\u2A02',
    bigsqcup: '\u2A06',
    bigstar: '\u2605',
    bigtriangledown: '\u25BD',
    bigtriangleup: '\u25B3',
    biguplus: '\u2A04',
    blacklozenge: '\u29EB',
    blacktriangle: '\u25B4',
    blacktriangledown: '\u25BE',
    blacktriangleleft: '\u25C2',
    bowtie: '\u22C8',
    boxdl: '\u2510',
    boxdr: '\u250C',
    boxminus: '\u229F',
    boxplus: '\u229E',
    boxtimes: '\u22A0',
    boxul: '\u2518',
    boxur: '\u2514',
    bsol: '\u005C',
    bull: '\u2022',
    cap: '\u2229',
    check: '\u2713',
    chi: '\u03C7',
    circ: '\u02C6',
    circeq: '\u2257',
    circlearrowleft: '\u21BA',
    circlearrowright: '\u21BB',
    circledR: '\u00AE',
    circledS: '\u24C8',
    circledast: '\u229B',
    circledcirc: '\u229A',
    circleddash: '\u229D',
    clubs: '\u2663',
    colon: '\u003A',
    comp: '\u2201',
    ctdot: '\u22EF',
    cuepr: '\u22DE',
    cuesc: '\u22DF',
    cularr: '\u21B6',
    cup: '\u222A',
    curarr: '\u21B7',
    curlyvee: '\u22CE',
    curlywedge: '\u22CF',
    dagger: '\u2020',
    daleth: '\u2138',
    ddarr: '\u21CA',
    deg: '\u00B0',
    delta: '\u03B4',
    digamma: '\u03DD',
    div: '\u00F7',
    divideontimes: '\u22C7',
    dot: '\u02D9',
    doteqdot: '\u2251',
    dotplus: '\u2214',
    dotsquare: '\u22A1',
    dtdot: '\u22F1',
    ecir: '\u2256',
    efDot: '\u2252',
    egs: '\u2A96',
    ell: '\u2113',
    els: '\u2A95',
    empty: '\u2205',
    epsi: '\u03B5',
    epsiv: '\u03F5',
    erDot: '\u2253',
    eta: '\u03B7',
    eth: '\u00F0',
    flat: '\u266D',
    fork: '\u22D4',
    frown: '\u2322',
    gEl: '\u2A8C',
    gamma: '\u03B3',
    gap: '\u2A86',
    gimel: '\u2137',
    gnE: '\u2269',
    gnap: '\u2A8A',
    gne: '\u2A88',
    gnsim: '\u22E7',
    gt: '\u003E',
    gtdot: '\u22D7',
    harrw: '\u21AD',
    hbar: '\u210F',
    hellip: '\u2026',
    hookleftarrow: '\u21A9',
    hookrightarrow: '\u21AA',
    imath: '\u0131',
    infin: '\u221E',
    intcal: '\u22BA',
    iota: '\u03B9',
    jmath: '\u0237',
    kappa: '\u03BA',
    kappav: '\u03F0',
    lEg: '\u2A8B',
    lambda: '\u03BB',
    lap: '\u2A85',
    larrlp: '\u21AB',
    larrtl: '\u21A2',
    lbrace: '\u007B',
    lbrack: '\u005B',
    le: '\u2264',
    leftleftarrows: '\u21C7',
    leftthreetimes: '\u22CB',
    lessdot: '\u22D6',
    lmoust: '\u23B0',
    lnE: '\u2268',
    lnap: '\u2A89',
    lne: '\u2A87',
    lnsim: '\u22E6',
    longmapsto: '\u27FC',
    looparrowright: '\u21AC',
    lowast: '\u2217',
    loz: '\u25CA',
    lt: '\u003C',
    ltimes: '\u22C9',
    ltri: '\u25C3',
    macr: '\u00AF',
    malt: '\u2720',
    mho: '\u2127',
    mu: '\u03BC',
    multimap: '\u22B8',
    nLeftarrow: '\u21CD',
    nLeftrightarrow: '\u21CE',
    nRightarrow: '\u21CF',
    nVDash: '\u22AF',
    nVdash: '\u22AE',
    natur: '\u266E',
    nearr: '\u2197',
    nharr: '\u21AE',
    nlarr: '\u219A',
    not: '\u00AC',
    nrarr: '\u219B',
    nu: '\u03BD',
    nvDash: '\u22AD',
    nvdash: '\u22AC',
    nwarr: '\u2196',
    omega: '\u03C9',
    omicron: '\u03BF',
    or: '\u2228',
    osol: '\u2298',
    period: '\u002E',
    phi: '\u03C6',
    phiv: '\u03D5',
    pi: '\u03C0',
    piv: '\u03D6',
    prap: '\u2AB7',
    precnapprox: '\u2AB9',
    precneqq: '\u2AB5',
    precnsim: '\u22E8',
    prime: '\u2032',
    psi: '\u03C8',
    quot: '\u0022',
    rarrtl: '\u21A3',
    rbrace: '\u007D',
    rbrack: '\u005D',
    rho: '\u03C1',
    rhov: '\u03F1',
    rightrightarrows: '\u21C9',
    rightthreetimes: '\u22CC',
    ring: '\u02DA',
    rmoust: '\u23B1',
    rtimes: '\u22CA',
    rtri: '\u25B9',
    scap: '\u2AB8',
    scnE: '\u2AB6',
    scnap: '\u2ABA',
    scnsim: '\u22E9',
    sdot: '\u22C5',
    searr: '\u2198',
    sect: '\u00A7',
    sharp: '\u266F',
    sigma: '\u03C3',
    sigmav: '\u03C2',
    simne: '\u2246',
    smile: '\u2323',
    spades: '\u2660',
    sub: '\u2282',
    subE: '\u2AC5',
    subnE: '\u2ACB',
    subne: '\u228A',
    supE: '\u2AC6',
    supnE: '\u2ACC',
    supne: '\u228B',
    swarr: '\u2199',
    tau: '\u03C4',
    theta: '\u03B8',
    thetav: '\u03D1',
    tilde: '\u02DC',
    times: '\u00D7',
    triangle: '\u25B5',
    triangleq: '\u225C',
    upsi: '\u03C5',
    upuparrows: '\u21C8',
    veebar: '\u22BB',
    vellip: '\u22EE',
    weierp: '\u2118',
    xi: '\u03BE',
    yen: '\u00A5',
    zeta: '\u03B6',
    zigrarr: '\u21DD',
    nbsp: '\u00A0',
    rsquo: '\u2019',
    lsquo: '\u2018'
};
var loaded = {};
function add(additions, file) {
    Object.assign(exports.entities, additions);
    loaded[file] = true;
}
exports.add = add;
function remove(entity) {
    delete exports.entities[entity];
}
exports.remove = remove;
function translate(text) {
    return text.replace(/&([a-z][a-z0-9]*|#(?:[0-9]+|x[0-9a-f]+));/ig, replace);
}
exports.translate = translate;
function replace(match, entity) {
    if (entity.charAt(0) === '#') {
        return numeric(entity.slice(1));
    }
    if (exports.entities[entity]) {
        return exports.entities[entity];
    }
    if (exports.options['loadMissingEntities']) {
        var file = (entity.match(/^[a-zA-Z](fr|scr|opf)$/) ? RegExp.$1 : entity.charAt(0).toLowerCase());
        if (!loaded[file]) {
            loaded[file] = true;
            (0, Retries_js_1.retryAfter)((0, AsyncLoad_js_1.asyncLoad)('./util/entities/' + file + '.js'));
        }
    }
    return match;
}
function numeric(entity) {
    var n = (entity.charAt(0) === 'x' ?
        parseInt(entity.slice(1), 16) :
        parseInt(entity));
    return String.fromCodePoint(n);
}
exports.numeric = numeric;
//# sourceMappingURL=Entities.js.map

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

/***/ 97000:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.retryAfter = exports.handleRetriesFor = void 0;
function handleRetriesFor(code) {
    return new Promise(function run(ok, fail) {
        try {
            ok(code());
        }
        catch (err) {
            if (err.retry && err.retry instanceof Promise) {
                err.retry.then(function () { return run(ok, fail); })
                    .catch(function (perr) { return fail(perr); });
            }
            else if (err.restart && err.restart.isCallback) {
                MathJax.Callback.After(function () { return run(ok, fail); }, err.restart);
            }
            else {
                fail(err);
            }
        }
    });
}
exports.handleRetriesFor = handleRetriesFor;
function retryAfter(promise) {
    var err = new Error('MathJax retry');
    err.retry = promise;
    throw err;
}
exports.retryAfter = retryAfter;
//# sourceMappingURL=Retries.js.map

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

/***/ }),

/***/ 13090:
/***/ ((__unused_webpack_module, exports) => {


/*!
 *************************************************************************
 *
 *  mhchemParser.ts
 *  4.2.1
 *
 *  Parser for the \ce command and \pu command for MathJax and Co.
 *
 *  mhchem's \ce is a tool for writing beautiful chemical equations easily.
 *  mhchem's \pu is a tool for writing physical units easily.
 *
 *  ----------------------------------------------------------------------
 *
 *  Copyright (c) 2015-2023 Martin Hensel
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *  ----------------------------------------------------------------------
 *
 *  https://github.com/mhchem/mhchemParser
 *
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mhchemParser = void 0;
var mhchemParser = (function () {
    function mhchemParser() {
    }
    mhchemParser.toTex = function (input, type) {
        return _mhchemTexify.go(_mhchemParser.go(input, type), type !== "tex");
    };
    return mhchemParser;
}());
exports.mhchemParser = mhchemParser;
function _mhchemCreateTransitions(o) {
    var pattern, state;
    var transitions = {};
    for (pattern in o) {
        for (state in o[pattern]) {
            var stateArray = state.split("|");
            o[pattern][state].stateArray = stateArray;
            for (var i = 0; i < stateArray.length; i++) {
                transitions[stateArray[i]] = [];
            }
        }
    }
    for (pattern in o) {
        for (state in o[pattern]) {
            var stateArray = o[pattern][state].stateArray || [];
            for (var i = 0; i < stateArray.length; i++) {
                var p = o[pattern][state];
                p.action_ = [].concat(p.action_);
                for (var k = 0; k < p.action_.length; k++) {
                    if (typeof p.action_[k] === "string") {
                        p.action_[k] = { type_: p.action_[k] };
                    }
                }
                var patternArray = pattern.split("|");
                for (var j = 0; j < patternArray.length; j++) {
                    if (stateArray[i] === '*') {
                        var t = void 0;
                        for (t in transitions) {
                            transitions[t].push({ pattern: patternArray[j], task: p });
                        }
                    }
                    else {
                        transitions[stateArray[i]].push({ pattern: patternArray[j], task: p });
                    }
                }
            }
        }
    }
    return transitions;
}
;
var _mhchemParser = {
    go: function (input, stateMachine) {
        if (!input) {
            return [];
        }
        if (stateMachine === undefined) {
            stateMachine = 'ce';
        }
        var state = '0';
        var buffer = {};
        buffer['parenthesisLevel'] = 0;
        input = input.replace(/\n/g, " ");
        input = input.replace(/[\u2212\u2013\u2014\u2010]/g, "-");
        input = input.replace(/[\u2026]/g, "...");
        var lastInput;
        var watchdog = 10;
        var output = [];
        while (true) {
            if (lastInput !== input) {
                watchdog = 10;
                lastInput = input;
            }
            else {
                watchdog--;
            }
            var machine = _mhchemParser.stateMachines[stateMachine];
            var t = machine.transitions[state] || machine.transitions['*'];
            iterateTransitions: for (var i = 0; i < t.length; i++) {
                var matches = _mhchemParser.patterns.match_(t[i].pattern, input);
                if (matches) {
                    var task = t[i].task;
                    for (var iA = 0; iA < task.action_.length; iA++) {
                        var o = void 0;
                        if (machine.actions[task.action_[iA].type_]) {
                            o = machine.actions[task.action_[iA].type_](buffer, matches.match_, task.action_[iA].option);
                        }
                        else if (_mhchemParser.actions[task.action_[iA].type_]) {
                            o = _mhchemParser.actions[task.action_[iA].type_](buffer, matches.match_, task.action_[iA].option);
                        }
                        else {
                            throw ["MhchemBugA", "mhchem bug A. Please report. (" + task.action_[iA].type_ + ")"];
                        }
                        _mhchemParser.concatArray(output, o);
                    }
                    state = task.nextState || state;
                    if (input.length > 0) {
                        if (!task.revisit) {
                            input = matches.remainder;
                        }
                        if (!task.toContinue) {
                            break iterateTransitions;
                        }
                    }
                    else {
                        return output;
                    }
                }
            }
            if (watchdog <= 0) {
                throw ["MhchemBugU", "mhchem bug U. Please report."];
            }
        }
    },
    concatArray: function (a, b) {
        if (b) {
            if (Array.isArray(b)) {
                for (var iB = 0; iB < b.length; iB++) {
                    a.push(b[iB]);
                }
            }
            else {
                a.push(b);
            }
        }
    },
    patterns: {
        patterns: {
            'empty': /^$/,
            'else': /^./,
            'else2': /^./,
            'space': /^\s/,
            'space A': /^\s(?=[A-Z\\$])/,
            'space$': /^\s$/,
            'a-z': /^[a-z]/,
            'x': /^x/,
            'x$': /^x$/,
            'i$': /^i$/,
            'letters': /^(?:[a-zA-Z\u03B1-\u03C9\u0391-\u03A9?@]|(?:\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))))+/,
            '\\greek': /^\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega)(?:\s+|\{\}|(?![a-zA-Z]))/,
            'one lowercase latin letter $': /^(?:([a-z])(?:$|[^a-zA-Z]))$/,
            '$one lowercase latin letter$ $': /^\$(?:([a-z])(?:$|[^a-zA-Z]))\$$/,
            'one lowercase greek letter $': /^(?:\$?[\u03B1-\u03C9]\$?|\$?\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|omicron|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)\s*\$?)(?:\s+|\{\}|(?![a-zA-Z]))$/,
            'digits': /^[0-9]+/,
            '-9.,9': /^[+\-]?(?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))/,
            '-9.,9 no missing 0': /^[+\-]?[0-9]+(?:[.,][0-9]+)?/,
            '(-)(9.,9)(e)(99)': function (input) {
                var match = input.match(/^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))?(\((?:[0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+))\))?(?:(?:([eE])|\s*(\*|x|\\times|\u00D7)\s*10\^)([+\-]?[0-9]+|\{[+\-]?[0-9]+\}))?/);
                if (match && match[0]) {
                    return { match_: match.slice(1), remainder: input.substr(match[0].length) };
                }
                return null;
            },
            '(-)(9)^(-9)': /^(\+\-|\+\/\-|\+|\-|\\pm\s?)?([0-9]+(?:[,.][0-9]+)?|[0-9]*(?:\.[0-9]+)?)\^([+\-]?[0-9]+|\{[+\-]?[0-9]+\})/,
            'state of aggregation $': function (input) {
                var a = _mhchemParser.patterns.findObserveGroups(input, "", /^\([a-z]{1,3}(?=[\),])/, ")", "");
                if (a && a.remainder.match(/^($|[\s,;\)\]\}])/)) {
                    return a;
                }
                var match = input.match(/^(?:\((?:\\ca\s?)?\$[amothc]\$\))/);
                if (match) {
                    return { match_: match[0], remainder: input.substr(match[0].length) };
                }
                return null;
            },
            '_{(state of aggregation)}$': /^_\{(\([a-z]{1,3}\))\}/,
            '{[(': /^(?:\\\{|\[|\()/,
            ')]}': /^(?:\)|\]|\\\})/,
            ', ': /^[,;]\s*/,
            ',': /^[,;]/,
            '.': /^[.]/,
            '. __* ': /^([.\u22C5\u00B7\u2022]|[*])\s*/,
            '...': /^\.\.\.(?=$|[^.])/,
            '^{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "^{", "", "", "}"); },
            '^($...$)': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "^", "$", "$", ""); },
            '^a': /^\^([0-9]+|[^\\_])/,
            '^\\x{}{}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "^", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", true); },
            '^\\x{}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "^", /^\\[a-zA-Z]+\{/, "}", ""); },
            '^\\x': /^\^(\\[a-zA-Z]+)\s*/,
            '^(-1)': /^\^(-?\d+)/,
            '\'': /^'/,
            '_{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "_{", "", "", "}"); },
            '_($...$)': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "_", "$", "$", ""); },
            '_9': /^_([+\-]?[0-9]+|[^\\])/,
            '_\\x{}{}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "_", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", true); },
            '_\\x{}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "_", /^\\[a-zA-Z]+\{/, "}", ""); },
            '_\\x': /^_(\\[a-zA-Z]+)\s*/,
            '^_': /^(?:\^(?=_)|\_(?=\^)|[\^_]$)/,
            '{}^': /^\{\}(?=\^)/,
            '{}': /^\{\}/,
            '{...}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "", "{", "}", ""); },
            '{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "{", "", "", "}"); },
            '$...$': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "", "$", "$", ""); },
            '${(...)}$__$(...)$': function (input) {
                return _mhchemParser.patterns.findObserveGroups(input, "${", "", "", "}$") || _mhchemParser.patterns.findObserveGroups(input, "$", "", "", "$");
            },
            '=<>': /^[=<>]/,
            '#': /^[#\u2261]/,
            '+': /^\+/,
            '-$': /^-(?=[\s_},;\]/]|$|\([a-z]+\))/,
            '-9': /^-(?=[0-9])/,
            '- orbital overlap': /^-(?=(?:[spd]|sp)(?:$|[\s,;\)\]\}]))/,
            '-': /^-/,
            'pm-operator': /^(?:\\pm|\$\\pm\$|\+-|\+\/-)/,
            'operator': /^(?:\+|(?:[\-=<>]|<<|>>|\\approx|\$\\approx\$)(?=\s|$|-?[0-9]))/,
            'arrowUpDown': /^(?:v|\(v\)|\^|\(\^\))(?=$|[\s,;\)\]\}])/,
            '\\bond{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "\\bond{", "", "", "}"); },
            '->': /^(?:<->|<-->|->|<-|<=>>|<<=>|<=>|[\u2192\u27F6\u21CC])/,
            'CMT': /^[CMT](?=\[)/,
            '[(...)]': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "[", "", "", "]"); },
            '1st-level escape': /^(&|\\\\|\\hline)\s*/,
            '\\,': /^(?:\\[,\ ;:])/,
            '\\x{}{}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "", /^\\[a-zA-Z]+\{/, "}", "", "", "{", "}", "", true); },
            '\\x{}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "", /^\\[a-zA-Z]+\{/, "}", ""); },
            '\\ca': /^\\ca(?:\s+|(?![a-zA-Z]))/,
            '\\x': /^(?:\\[a-zA-Z]+\s*|\\[_&{}%])/,
            'orbital': /^(?:[0-9]{1,2}[spdfgh]|[0-9]{0,2}sp)(?=$|[^a-zA-Z])/,
            'others': /^[\/~|]/,
            '\\frac{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "\\frac{", "", "", "}", "{", "", "", "}"); },
            '\\overset{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "\\overset{", "", "", "}", "{", "", "", "}"); },
            '\\underset{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "\\underset{", "", "", "}", "{", "", "", "}"); },
            '\\underbrace{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "\\underbrace{", "", "", "}_", "{", "", "", "}"); },
            '\\color{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "\\color{", "", "", "}"); },
            '\\color{(...)}{(...)}': function (input) {
                return _mhchemParser.patterns.findObserveGroups(input, "\\color{", "", "", "}", "{", "", "", "}") ||
                    _mhchemParser.patterns.findObserveGroups(input, "\\color", "\\", "", /^(?=\{)/, "{", "", "", "}");
            },
            '\\ce{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "\\ce{", "", "", "}"); },
            '\\pu{(...)}': function (input) { return _mhchemParser.patterns.findObserveGroups(input, "\\pu{", "", "", "}"); },
            'oxidation$': /^(?:[+-][IVX]+|(?:\\pm|\$\\pm\$|\+-|\+\/-)\s*0)$/,
            'd-oxidation$': /^(?:[+-]?[IVX]+|(?:\\pm|\$\\pm\$|\+-|\+\/-)\s*0)$/,
            '1/2$': /^[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+(?:\$[a-z]\$|[a-z])?$/,
            'amount': function (input) {
                var match;
                match = input.match(/^(?:(?:(?:\([+\-]?[0-9]+\/[0-9]+\)|[+\-]?(?:[0-9]+|\$[a-z]\$|[a-z])\/[0-9]+|[+\-]?[0-9]+[.,][0-9]+|[+\-]?\.[0-9]+|[+\-]?[0-9]+)(?:[a-z](?=\s*[A-Z]))?)|[+\-]?[a-z](?=\s*[A-Z])|\+(?!\s))/);
                if (match) {
                    return { match_: match[0], remainder: input.substr(match[0].length) };
                }
                var a = _mhchemParser.patterns.findObserveGroups(input, "", "$", "$", "");
                if (a) {
                    match = a.match_.match(/^\$(?:\(?[+\-]?(?:[0-9]*[a-z]?[+\-])?[0-9]*[a-z](?:[+\-][0-9]*[a-z]?)?\)?|\+|-)\$$/);
                    if (match) {
                        return { match_: match[0], remainder: input.substr(match[0].length) };
                    }
                }
                return null;
            },
            'amount2': function (input) { return this['amount'](input); },
            '(KV letters),': /^(?:[A-Z][a-z]{0,2}|i)(?=,)/,
            'formula$': function (input) {
                if (input.match(/^\([a-z]+\)$/)) {
                    return null;
                }
                var match = input.match(/^(?:[a-z]|(?:[0-9\ \+\-\,\.\(\)]+[a-z])+[0-9\ \+\-\,\.\(\)]*|(?:[a-z][0-9\ \+\-\,\.\(\)]+)+[a-z]?)$/);
                if (match) {
                    return { match_: match[0], remainder: input.substr(match[0].length) };
                }
                return null;
            },
            'uprightEntities': /^(?:pH|pOH|pC|pK|iPr|iBu)(?=$|[^a-zA-Z])/,
            '/': /^\s*(\/)\s*/,
            '//': /^\s*(\/\/)\s*/,
            '*': /^\s*[*.]\s*/
        },
        findObserveGroups: function (input, begExcl, begIncl, endIncl, endExcl, beg2Excl, beg2Incl, end2Incl, end2Excl, combine) {
            var _match = function (input, pattern) {
                if (typeof pattern === "string") {
                    if (input.indexOf(pattern) !== 0) {
                        return null;
                    }
                    return pattern;
                }
                else {
                    var match_1 = input.match(pattern);
                    if (!match_1) {
                        return null;
                    }
                    return match_1[0];
                }
            };
            var _findObserveGroups = function (input, i, endChars) {
                var braces = 0;
                while (i < input.length) {
                    var a = input.charAt(i);
                    var match_2 = _match(input.substr(i), endChars);
                    if (match_2 !== null && braces === 0) {
                        return { endMatchBegin: i, endMatchEnd: i + match_2.length };
                    }
                    else if (a === "{") {
                        braces++;
                    }
                    else if (a === "}") {
                        if (braces === 0) {
                            throw ["ExtraCloseMissingOpen", "Extra close brace or missing open brace"];
                        }
                        else {
                            braces--;
                        }
                    }
                    i++;
                }
                if (braces > 0) {
                    return null;
                }
                return null;
            };
            var match = _match(input, begExcl);
            if (match === null) {
                return null;
            }
            input = input.substr(match.length);
            match = _match(input, begIncl);
            if (match === null) {
                return null;
            }
            var e = _findObserveGroups(input, match.length, endIncl || endExcl);
            if (e === null) {
                return null;
            }
            var match1 = input.substring(0, (endIncl ? e.endMatchEnd : e.endMatchBegin));
            if (!(beg2Excl || beg2Incl)) {
                return {
                    match_: match1,
                    remainder: input.substr(e.endMatchEnd)
                };
            }
            else {
                var group2 = this.findObserveGroups(input.substr(e.endMatchEnd), beg2Excl, beg2Incl, end2Incl, end2Excl);
                if (group2 === null) {
                    return null;
                }
                var matchRet = [match1, group2.match_];
                return {
                    match_: (combine ? matchRet.join("") : matchRet),
                    remainder: group2.remainder
                };
            }
        },
        match_: function (m, input) {
            var pattern = _mhchemParser.patterns.patterns[m];
            if (pattern === undefined) {
                throw ["MhchemBugP", "mhchem bug P. Please report. (" + m + ")"];
            }
            else if (typeof pattern === "function") {
                return _mhchemParser.patterns.patterns[m](input);
            }
            else {
                var match = input.match(pattern);
                if (match) {
                    if (match.length > 2) {
                        return { match_: match.slice(1), remainder: input.substr(match[0].length) };
                    }
                    else {
                        return { match_: match[1] || match[0], remainder: input.substr(match[0].length) };
                    }
                }
                return null;
            }
        }
    },
    actions: {
        'a=': function (buffer, m) { buffer.a = (buffer.a || "") + m; return undefined; },
        'b=': function (buffer, m) { buffer.b = (buffer.b || "") + m; return undefined; },
        'p=': function (buffer, m) { buffer.p = (buffer.p || "") + m; return undefined; },
        'o=': function (buffer, m) { buffer.o = (buffer.o || "") + m; return undefined; },
        'o=+p1': function (buffer, _m, a) { buffer.o = (buffer.o || "") + a; return undefined; },
        'q=': function (buffer, m) { buffer.q = (buffer.q || "") + m; return undefined; },
        'd=': function (buffer, m) { buffer.d = (buffer.d || "") + m; return undefined; },
        'rm=': function (buffer, m) { buffer.rm = (buffer.rm || "") + m; return undefined; },
        'text=': function (buffer, m) { buffer.text_ = (buffer.text_ || "") + m; return undefined; },
        'insert': function (_buffer, _m, a) { return { type_: a }; },
        'insert+p1': function (_buffer, m, a) { return { type_: a, p1: m }; },
        'insert+p1+p2': function (_buffer, m, a) { return { type_: a, p1: m[0], p2: m[1] }; },
        'copy': function (_buffer, m) { return m; },
        'write': function (_buffer, _m, a) { return a; },
        'rm': function (_buffer, m) { return { type_: 'rm', p1: m }; },
        'text': function (_buffer, m) { return _mhchemParser.go(m, 'text'); },
        'tex-math': function (_buffer, m) { return _mhchemParser.go(m, 'tex-math'); },
        'tex-math tight': function (_buffer, m) { return _mhchemParser.go(m, 'tex-math tight'); },
        'bond': function (_buffer, m, k) { return { type_: 'bond', kind_: k || m }; },
        'color0-output': function (_buffer, m) { return { type_: 'color0', color: m }; },
        'ce': function (_buffer, m) { return _mhchemParser.go(m, 'ce'); },
        'pu': function (_buffer, m) { return _mhchemParser.go(m, 'pu'); },
        '1/2': function (_buffer, m) {
            var ret = [];
            if (m.match(/^[+\-]/)) {
                ret.push(m.substr(0, 1));
                m = m.substr(1);
            }
            var n = m.match(/^([0-9]+|\$[a-z]\$|[a-z])\/([0-9]+)(\$[a-z]\$|[a-z])?$/);
            n[1] = n[1].replace(/\$/g, "");
            ret.push({ type_: 'frac', p1: n[1], p2: n[2] });
            if (n[3]) {
                n[3] = n[3].replace(/\$/g, "");
                ret.push({ type_: 'tex-math', p1: n[3] });
            }
            return ret;
        },
        '9,9': function (_buffer, m) { return _mhchemParser.go(m, '9,9'); }
    },
    stateMachines: {
        'tex': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '0': { action_: 'copy' }
                },
                '\\ce{(...)}': {
                    '0': { action_: [{ type_: 'write', option: "{" }, 'ce', { type_: 'write', option: "}" }] }
                },
                '\\pu{(...)}': {
                    '0': { action_: [{ type_: 'write', option: "{" }, 'pu', { type_: 'write', option: "}" }] }
                },
                'else': {
                    '0': { action_: 'copy' }
                },
            }),
            actions: {}
        },
        'ce': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: 'output' }
                },
                'else': {
                    '0|1|2': { action_: 'beginsWithBond=false', revisit: true, toContinue: true }
                },
                'oxidation$': {
                    '0': { action_: 'oxidation-output' }
                },
                'CMT': {
                    'r': { action_: 'rdt=', nextState: 'rt' },
                    'rd': { action_: 'rqt=', nextState: 'rdt' }
                },
                'arrowUpDown': {
                    '0|1|2|as': { action_: ['sb=false', 'output', 'operator'], nextState: '1' }
                },
                'uprightEntities': {
                    '0|1|2': { action_: ['o=', 'output'], nextState: '1' }
                },
                'orbital': {
                    '0|1|2|3': { action_: 'o=', nextState: 'o' }
                },
                '->': {
                    '0|1|2|3': { action_: 'r=', nextState: 'r' },
                    'a|as': { action_: ['output', 'r='], nextState: 'r' },
                    '*': { action_: ['output', 'r='], nextState: 'r' }
                },
                '+': {
                    'o': { action_: 'd= kv', nextState: 'd' },
                    'd|D': { action_: 'd=', nextState: 'd' },
                    'q': { action_: 'd=', nextState: 'qd' },
                    'qd|qD': { action_: 'd=', nextState: 'qd' },
                    'dq': { action_: ['output', 'd='], nextState: 'd' },
                    '3': { action_: ['sb=false', 'output', 'operator'], nextState: '0' }
                },
                'amount': {
                    '0|2': { action_: 'a=', nextState: 'a' }
                },
                'pm-operator': {
                    '0|1|2|a|as': { action_: ['sb=false', 'output', { type_: 'operator', option: '\\pm' }], nextState: '0' }
                },
                'operator': {
                    '0|1|2|a|as': { action_: ['sb=false', 'output', 'operator'], nextState: '0' }
                },
                '-$': {
                    'o|q': { action_: ['charge or bond', 'output'], nextState: 'qd' },
                    'd': { action_: 'd=', nextState: 'd' },
                    'D': { action_: ['output', { type_: 'bond', option: "-" }], nextState: '3' },
                    'q': { action_: 'd=', nextState: 'qd' },
                    'qd': { action_: 'd=', nextState: 'qd' },
                    'qD|dq': { action_: ['output', { type_: 'bond', option: "-" }], nextState: '3' }
                },
                '-9': {
                    '3|o': { action_: ['output', { type_: 'insert', option: 'hyphen' }], nextState: '3' }
                },
                '- orbital overlap': {
                    'o': { action_: ['output', { type_: 'insert', option: 'hyphen' }], nextState: '2' },
                    'd': { action_: ['output', { type_: 'insert', option: 'hyphen' }], nextState: '2' }
                },
                '-': {
                    '0|1|2': { action_: [{ type_: 'output', option: 1 }, 'beginsWithBond=true', { type_: 'bond', option: "-" }], nextState: '3' },
                    '3': { action_: { type_: 'bond', option: "-" } },
                    'a': { action_: ['output', { type_: 'insert', option: 'hyphen' }], nextState: '2' },
                    'as': { action_: [{ type_: 'output', option: 2 }, { type_: 'bond', option: "-" }], nextState: '3' },
                    'b': { action_: 'b=' },
                    'o': { action_: { type_: '- after o/d', option: false }, nextState: '2' },
                    'q': { action_: { type_: '- after o/d', option: false }, nextState: '2' },
                    'd|qd|dq': { action_: { type_: '- after o/d', option: true }, nextState: '2' },
                    'D|qD|p': { action_: ['output', { type_: 'bond', option: "-" }], nextState: '3' }
                },
                'amount2': {
                    '1|3': { action_: 'a=', nextState: 'a' }
                },
                'letters': {
                    '0|1|2|3|a|as|b|p|bp|o': { action_: 'o=', nextState: 'o' },
                    'q|dq': { action_: ['output', 'o='], nextState: 'o' },
                    'd|D|qd|qD': { action_: 'o after d', nextState: 'o' }
                },
                'digits': {
                    'o': { action_: 'q=', nextState: 'q' },
                    'd|D': { action_: 'q=', nextState: 'dq' },
                    'q': { action_: ['output', 'o='], nextState: 'o' },
                    'a': { action_: 'o=', nextState: 'o' }
                },
                'space A': {
                    'b|p|bp': { action_: [] }
                },
                'space': {
                    'a': { action_: [], nextState: 'as' },
                    '0': { action_: 'sb=false' },
                    '1|2': { action_: 'sb=true' },
                    'r|rt|rd|rdt|rdq': { action_: 'output', nextState: '0' },
                    '*': { action_: ['output', 'sb=true'], nextState: '1' }
                },
                '1st-level escape': {
                    '1|2': { action_: ['output', { type_: 'insert+p1', option: '1st-level escape' }] },
                    '*': { action_: ['output', { type_: 'insert+p1', option: '1st-level escape' }], nextState: '0' }
                },
                '[(...)]': {
                    'r|rt': { action_: 'rd=', nextState: 'rd' },
                    'rd|rdt': { action_: 'rq=', nextState: 'rdq' }
                },
                '...': {
                    'o|d|D|dq|qd|qD': { action_: ['output', { type_: 'bond', option: "..." }], nextState: '3' },
                    '*': { action_: [{ type_: 'output', option: 1 }, { type_: 'insert', option: 'ellipsis' }], nextState: '1' }
                },
                '. __* ': {
                    '*': { action_: ['output', { type_: 'insert', option: 'addition compound' }], nextState: '1' }
                },
                'state of aggregation $': {
                    '*': { action_: ['output', 'state of aggregation'], nextState: '1' }
                },
                '{[(': {
                    'a|as|o': { action_: ['o=', 'output', 'parenthesisLevel++'], nextState: '2' },
                    '0|1|2|3': { action_: ['o=', 'output', 'parenthesisLevel++'], nextState: '2' },
                    '*': { action_: ['output', 'o=', 'output', 'parenthesisLevel++'], nextState: '2' }
                },
                ')]}': {
                    '0|1|2|3|b|p|bp|o': { action_: ['o=', 'parenthesisLevel--'], nextState: 'o' },
                    'a|as|d|D|q|qd|qD|dq': { action_: ['output', 'o=', 'parenthesisLevel--'], nextState: 'o' }
                },
                ', ': {
                    '*': { action_: ['output', 'comma'], nextState: '0' }
                },
                '^_': {
                    '*': { action_: [] }
                },
                '^{(...)}|^($...$)': {
                    '0|1|2|as': { action_: 'b=', nextState: 'b' },
                    'p': { action_: 'b=', nextState: 'bp' },
                    '3|o': { action_: 'd= kv', nextState: 'D' },
                    'q': { action_: 'd=', nextState: 'qD' },
                    'd|D|qd|qD|dq': { action_: ['output', 'd='], nextState: 'D' }
                },
                '^a|^\\x{}{}|^\\x{}|^\\x|\'': {
                    '0|1|2|as': { action_: 'b=', nextState: 'b' },
                    'p': { action_: 'b=', nextState: 'bp' },
                    '3|o': { action_: 'd= kv', nextState: 'd' },
                    'q': { action_: 'd=', nextState: 'qd' },
                    'd|qd|D|qD': { action_: 'd=' },
                    'dq': { action_: ['output', 'd='], nextState: 'd' }
                },
                '_{(state of aggregation)}$': {
                    'd|D|q|qd|qD|dq': { action_: ['output', 'q='], nextState: 'q' }
                },
                '_{(...)}|_($...$)|_9|_\\x{}{}|_\\x{}|_\\x': {
                    '0|1|2|as': { action_: 'p=', nextState: 'p' },
                    'b': { action_: 'p=', nextState: 'bp' },
                    '3|o': { action_: 'q=', nextState: 'q' },
                    'd|D': { action_: 'q=', nextState: 'dq' },
                    'q|qd|qD|dq': { action_: ['output', 'q='], nextState: 'q' }
                },
                '=<>': {
                    '0|1|2|3|a|as|o|q|d|D|qd|qD|dq': { action_: [{ type_: 'output', option: 2 }, 'bond'], nextState: '3' }
                },
                '#': {
                    '0|1|2|3|a|as|o': { action_: [{ type_: 'output', option: 2 }, { type_: 'bond', option: "#" }], nextState: '3' }
                },
                '{}^': {
                    '*': { action_: [{ type_: 'output', option: 1 }, { type_: 'insert', option: 'tinySkip' }], nextState: '1' }
                },
                '{}': {
                    '*': { action_: { type_: 'output', option: 1 }, nextState: '1' }
                },
                '{...}': {
                    '0|1|2|3|a|as|b|p|bp': { action_: 'o=', nextState: 'o' },
                    'o|d|D|q|qd|qD|dq': { action_: ['output', 'o='], nextState: 'o' }
                },
                '$...$': {
                    'a': { action_: 'a=' },
                    '0|1|2|3|as|b|p|bp|o': { action_: 'o=', nextState: 'o' },
                    'as|o': { action_: 'o=' },
                    'q|d|D|qd|qD|dq': { action_: ['output', 'o='], nextState: 'o' }
                },
                '\\bond{(...)}': {
                    '*': { action_: [{ type_: 'output', option: 2 }, 'bond'], nextState: "3" }
                },
                '\\frac{(...)}': {
                    '*': { action_: [{ type_: 'output', option: 1 }, 'frac-output'], nextState: '3' }
                },
                '\\overset{(...)}': {
                    '*': { action_: [{ type_: 'output', option: 2 }, 'overset-output'], nextState: '3' }
                },
                '\\underset{(...)}': {
                    '*': { action_: [{ type_: 'output', option: 2 }, 'underset-output'], nextState: '3' }
                },
                '\\underbrace{(...)}': {
                    '*': { action_: [{ type_: 'output', option: 2 }, 'underbrace-output'], nextState: '3' }
                },
                '\\color{(...)}{(...)}': {
                    '*': { action_: [{ type_: 'output', option: 2 }, 'color-output'], nextState: '3' }
                },
                '\\color{(...)}': {
                    '*': { action_: [{ type_: 'output', option: 2 }, 'color0-output'] }
                },
                '\\ce{(...)}': {
                    '*': { action_: [{ type_: 'output', option: 2 }, 'ce'], nextState: '3' }
                },
                '\\,': {
                    '*': { action_: [{ type_: 'output', option: 1 }, 'copy'], nextState: '1' }
                },
                '\\pu{(...)}': {
                    '*': { action_: ['output', { type_: 'write', option: "{" }, 'pu', { type_: 'write', option: "}" }], nextState: '3' }
                },
                '\\x{}{}|\\x{}|\\x': {
                    '0|1|2|3|a|as|b|p|bp|o|c0': { action_: ['o=', 'output'], nextState: '3' },
                    '*': { action_: ['output', 'o=', 'output'], nextState: '3' }
                },
                'others': {
                    '*': { action_: [{ type_: 'output', option: 1 }, 'copy'], nextState: '3' }
                },
                'else2': {
                    'a': { action_: 'a to o', nextState: 'o', revisit: true },
                    'as': { action_: ['output', 'sb=true'], nextState: '1', revisit: true },
                    'r|rt|rd|rdt|rdq': { action_: ['output'], nextState: '0', revisit: true },
                    '*': { action_: ['output', 'copy'], nextState: '3' }
                }
            }),
            actions: {
                'o after d': function (buffer, m) {
                    var ret;
                    if ((buffer.d || "").match(/^[1-9][0-9]*$/)) {
                        var tmp = buffer.d;
                        buffer.d = undefined;
                        ret = this['output'](buffer);
                        ret.push({ type_: 'tinySkip' });
                        buffer.b = tmp;
                    }
                    else {
                        ret = this['output'](buffer);
                    }
                    _mhchemParser.actions['o='](buffer, m);
                    return ret;
                },
                'd= kv': function (buffer, m) {
                    buffer.d = m;
                    buffer.dType = 'kv';
                    return undefined;
                },
                'charge or bond': function (buffer, m) {
                    if (buffer['beginsWithBond']) {
                        var ret = [];
                        _mhchemParser.concatArray(ret, this['output'](buffer));
                        _mhchemParser.concatArray(ret, _mhchemParser.actions['bond'](buffer, m, "-"));
                        return ret;
                    }
                    else {
                        buffer.d = m;
                        return undefined;
                    }
                },
                '- after o/d': function (buffer, m, isAfterD) {
                    var c1 = _mhchemParser.patterns.match_('orbital', buffer.o || "");
                    var c2 = _mhchemParser.patterns.match_('one lowercase greek letter $', buffer.o || "");
                    var c3 = _mhchemParser.patterns.match_('one lowercase latin letter $', buffer.o || "");
                    var c4 = _mhchemParser.patterns.match_('$one lowercase latin letter$ $', buffer.o || "");
                    var hyphenFollows = m === "-" && (c1 && c1.remainder === "" || c2 || c3 || c4);
                    if (hyphenFollows && !buffer.a && !buffer.b && !buffer.p && !buffer.d && !buffer.q && !c1 && c3) {
                        buffer.o = '$' + buffer.o + '$';
                    }
                    var ret = [];
                    if (hyphenFollows) {
                        _mhchemParser.concatArray(ret, this['output'](buffer));
                        ret.push({ type_: 'hyphen' });
                    }
                    else {
                        c1 = _mhchemParser.patterns.match_('digits', buffer.d || "");
                        if (isAfterD && c1 && c1.remainder === '') {
                            _mhchemParser.concatArray(ret, _mhchemParser.actions['d='](buffer, m));
                            _mhchemParser.concatArray(ret, this['output'](buffer));
                        }
                        else {
                            _mhchemParser.concatArray(ret, this['output'](buffer));
                            _mhchemParser.concatArray(ret, _mhchemParser.actions['bond'](buffer, m, "-"));
                        }
                    }
                    return ret;
                },
                'a to o': function (buffer) {
                    buffer.o = buffer.a;
                    buffer.a = undefined;
                    return undefined;
                },
                'sb=true': function (buffer) { buffer.sb = true; return undefined; },
                'sb=false': function (buffer) { buffer.sb = false; return undefined; },
                'beginsWithBond=true': function (buffer) { buffer['beginsWithBond'] = true; return undefined; },
                'beginsWithBond=false': function (buffer) { buffer['beginsWithBond'] = false; return undefined; },
                'parenthesisLevel++': function (buffer) { buffer['parenthesisLevel']++; return undefined; },
                'parenthesisLevel--': function (buffer) { buffer['parenthesisLevel']--; return undefined; },
                'state of aggregation': function (_buffer, m) {
                    return { type_: 'state of aggregation', p1: _mhchemParser.go(m, 'o') };
                },
                'comma': function (buffer, m) {
                    var a = m.replace(/\s*$/, '');
                    var withSpace = (a !== m);
                    if (withSpace && buffer['parenthesisLevel'] === 0) {
                        return { type_: 'comma enumeration L', p1: a };
                    }
                    else {
                        return { type_: 'comma enumeration M', p1: a };
                    }
                },
                'output': function (buffer, _m, entityFollows) {
                    var ret;
                    if (!buffer.r) {
                        ret = [];
                        if (!buffer.a && !buffer.b && !buffer.p && !buffer.o && !buffer.q && !buffer.d && !entityFollows) {
                        }
                        else {
                            if (buffer.sb) {
                                ret.push({ type_: 'entitySkip' });
                            }
                            if (!buffer.o && !buffer.q && !buffer.d && !buffer.b && !buffer.p && entityFollows !== 2) {
                                buffer.o = buffer.a;
                                buffer.a = undefined;
                            }
                            else if (!buffer.o && !buffer.q && !buffer.d && (buffer.b || buffer.p)) {
                                buffer.o = buffer.a;
                                buffer.d = buffer.b;
                                buffer.q = buffer.p;
                                buffer.a = buffer.b = buffer.p = undefined;
                            }
                            else {
                                if (buffer.o && buffer.dType === 'kv' && _mhchemParser.patterns.match_('d-oxidation$', buffer.d || "")) {
                                    buffer.dType = 'oxidation';
                                }
                                else if (buffer.o && buffer.dType === 'kv' && !buffer.q) {
                                    buffer.dType = undefined;
                                }
                            }
                            ret.push({
                                type_: 'chemfive',
                                a: _mhchemParser.go(buffer.a, 'a'),
                                b: _mhchemParser.go(buffer.b, 'bd'),
                                p: _mhchemParser.go(buffer.p, 'pq'),
                                o: _mhchemParser.go(buffer.o, 'o'),
                                q: _mhchemParser.go(buffer.q, 'pq'),
                                d: _mhchemParser.go(buffer.d, (buffer.dType === 'oxidation' ? 'oxidation' : 'bd')),
                                dType: buffer.dType
                            });
                        }
                    }
                    else {
                        var rd = void 0;
                        if (buffer.rdt === 'M') {
                            rd = _mhchemParser.go(buffer.rd, 'tex-math');
                        }
                        else if (buffer.rdt === 'T') {
                            rd = [{ type_: 'text', p1: buffer.rd || "" }];
                        }
                        else {
                            rd = _mhchemParser.go(buffer.rd, 'ce');
                        }
                        var rq = void 0;
                        if (buffer.rqt === 'M') {
                            rq = _mhchemParser.go(buffer.rq, 'tex-math');
                        }
                        else if (buffer.rqt === 'T') {
                            rq = [{ type_: 'text', p1: buffer.rq || "" }];
                        }
                        else {
                            rq = _mhchemParser.go(buffer.rq, 'ce');
                        }
                        ret = {
                            type_: 'arrow',
                            r: buffer.r,
                            rd: rd,
                            rq: rq
                        };
                    }
                    for (var p in buffer) {
                        if (p !== 'parenthesisLevel' && p !== 'beginsWithBond') {
                            delete buffer[p];
                        }
                    }
                    return ret;
                },
                'oxidation-output': function (_buffer, m) {
                    var ret = ["{"];
                    _mhchemParser.concatArray(ret, _mhchemParser.go(m, 'oxidation'));
                    ret.push("}");
                    return ret;
                },
                'frac-output': function (_buffer, m) {
                    return { type_: 'frac-ce', p1: _mhchemParser.go(m[0], 'ce'), p2: _mhchemParser.go(m[1], 'ce') };
                },
                'overset-output': function (_buffer, m) {
                    return { type_: 'overset', p1: _mhchemParser.go(m[0], 'ce'), p2: _mhchemParser.go(m[1], 'ce') };
                },
                'underset-output': function (_buffer, m) {
                    return { type_: 'underset', p1: _mhchemParser.go(m[0], 'ce'), p2: _mhchemParser.go(m[1], 'ce') };
                },
                'underbrace-output': function (_buffer, m) {
                    return { type_: 'underbrace', p1: _mhchemParser.go(m[0], 'ce'), p2: _mhchemParser.go(m[1], 'ce') };
                },
                'color-output': function (_buffer, m) {
                    return { type_: 'color', color1: m[0], color2: _mhchemParser.go(m[1], 'ce') };
                },
                'r=': function (buffer, m) { buffer.r = m; return undefined; },
                'rdt=': function (buffer, m) { buffer.rdt = m; return undefined; },
                'rd=': function (buffer, m) { buffer.rd = m; return undefined; },
                'rqt=': function (buffer, m) { buffer.rqt = m; return undefined; },
                'rq=': function (buffer, m) { buffer.rq = m; return undefined; },
                'operator': function (_buffer, m, p1) { return { type_: 'operator', kind_: (p1 || m) }; }
            }
        },
        'a': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: [] }
                },
                '1/2$': {
                    '0': { action_: '1/2' }
                },
                'else': {
                    '0': { action_: [], nextState: '1', revisit: true }
                },
                '${(...)}$__$(...)$': {
                    '*': { action_: 'tex-math tight', nextState: '1' }
                },
                ',': {
                    '*': { action_: { type_: 'insert', option: 'commaDecimal' } }
                },
                'else2': {
                    '*': { action_: 'copy' }
                }
            }),
            actions: {}
        },
        'o': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: [] }
                },
                '1/2$': {
                    '0': { action_: '1/2' }
                },
                'else': {
                    '0': { action_: [], nextState: '1', revisit: true }
                },
                'letters': {
                    '*': { action_: 'rm' }
                },
                '\\ca': {
                    '*': { action_: { type_: 'insert', option: 'circa' } }
                },
                '\\pu{(...)}': {
                    '*': { action_: [{ type_: 'write', option: "{" }, 'pu', { type_: 'write', option: "}" }] }
                },
                '\\x{}{}|\\x{}|\\x': {
                    '*': { action_: 'copy' }
                },
                '${(...)}$__$(...)$': {
                    '*': { action_: 'tex-math' }
                },
                '{(...)}': {
                    '*': { action_: [{ type_: 'write', option: "{" }, 'text', { type_: 'write', option: "}" }] }
                },
                'else2': {
                    '*': { action_: 'copy' }
                }
            }),
            actions: {}
        },
        'text': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: 'output' }
                },
                '{...}': {
                    '*': { action_: 'text=' }
                },
                '${(...)}$__$(...)$': {
                    '*': { action_: 'tex-math' }
                },
                '\\greek': {
                    '*': { action_: ['output', 'rm'] }
                },
                '\\pu{(...)}': {
                    '*': { action_: ['output', { type_: 'write', option: "{" }, 'pu', { type_: 'write', option: "}" }] }
                },
                '\\,|\\x{}{}|\\x{}|\\x': {
                    '*': { action_: ['output', 'copy'] }
                },
                'else': {
                    '*': { action_: 'text=' }
                }
            }),
            actions: {
                'output': function (buffer) {
                    if (buffer.text_) {
                        var ret = { type_: 'text', p1: buffer.text_ };
                        for (var p in buffer) {
                            delete buffer[p];
                        }
                        return ret;
                    }
                    return undefined;
                }
            }
        },
        'pq': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: [] }
                },
                'state of aggregation $': {
                    '*': { action_: 'state of aggregation' }
                },
                'i$': {
                    '0': { action_: [], nextState: '!f', revisit: true }
                },
                '(KV letters),': {
                    '0': { action_: 'rm', nextState: '0' }
                },
                'formula$': {
                    '0': { action_: [], nextState: 'f', revisit: true }
                },
                '1/2$': {
                    '0': { action_: '1/2' }
                },
                'else': {
                    '0': { action_: [], nextState: '!f', revisit: true }
                },
                '${(...)}$__$(...)$': {
                    '*': { action_: 'tex-math' }
                },
                '{(...)}': {
                    '*': { action_: 'text' }
                },
                'a-z': {
                    'f': { action_: 'tex-math' }
                },
                'letters': {
                    '*': { action_: 'rm' }
                },
                '-9.,9': {
                    '*': { action_: '9,9' }
                },
                ',': {
                    '*': { action_: { type_: 'insert+p1', option: 'comma enumeration S' } }
                },
                '\\color{(...)}{(...)}': {
                    '*': { action_: 'color-output' }
                },
                '\\color{(...)}': {
                    '*': { action_: 'color0-output' }
                },
                '\\ce{(...)}': {
                    '*': { action_: 'ce' }
                },
                '\\pu{(...)}': {
                    '*': { action_: [{ type_: 'write', option: "{" }, 'pu', { type_: 'write', option: "}" }] }
                },
                '\\,|\\x{}{}|\\x{}|\\x': {
                    '*': { action_: 'copy' }
                },
                'else2': {
                    '*': { action_: 'copy' }
                }
            }),
            actions: {
                'state of aggregation': function (_buffer, m) {
                    return { type_: 'state of aggregation subscript', p1: _mhchemParser.go(m, 'o') };
                },
                'color-output': function (_buffer, m) {
                    return { type_: 'color', color1: m[0], color2: _mhchemParser.go(m[1], 'pq') };
                }
            }
        },
        'bd': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: [] }
                },
                'x$': {
                    '0': { action_: [], nextState: '!f', revisit: true }
                },
                'formula$': {
                    '0': { action_: [], nextState: 'f', revisit: true }
                },
                'else': {
                    '0': { action_: [], nextState: '!f', revisit: true }
                },
                '-9.,9 no missing 0': {
                    '*': { action_: '9,9' }
                },
                '.': {
                    '*': { action_: { type_: 'insert', option: 'electron dot' } }
                },
                'a-z': {
                    'f': { action_: 'tex-math' }
                },
                'x': {
                    '*': { action_: { type_: 'insert', option: 'KV x' } }
                },
                'letters': {
                    '*': { action_: 'rm' }
                },
                '\'': {
                    '*': { action_: { type_: 'insert', option: 'prime' } }
                },
                '${(...)}$__$(...)$': {
                    '*': { action_: 'tex-math' }
                },
                '{(...)}': {
                    '*': { action_: 'text' }
                },
                '\\color{(...)}{(...)}': {
                    '*': { action_: 'color-output' }
                },
                '\\color{(...)}': {
                    '*': { action_: 'color0-output' }
                },
                '\\ce{(...)}': {
                    '*': { action_: 'ce' }
                },
                '\\pu{(...)}': {
                    '*': { action_: [{ type_: 'write', option: "{" }, 'pu', { type_: 'write', option: "}" }] }
                },
                '\\,|\\x{}{}|\\x{}|\\x': {
                    '*': { action_: 'copy' }
                },
                'else2': {
                    '*': { action_: 'copy' }
                }
            }),
            actions: {
                'color-output': function (_buffer, m) {
                    return { type_: 'color', color1: m[0], color2: _mhchemParser.go(m[1], 'bd') };
                }
            }
        },
        'oxidation': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: 'roman-numeral' }
                },
                'pm-operator': {
                    '*': { action_: { type_: 'o=+p1', option: "\\pm" } }
                },
                'else': {
                    '*': { action_: 'o=' }
                }
            }),
            actions: {
                'roman-numeral': function (buffer) { return { type_: 'roman numeral', p1: buffer.o || "" }; }
            }
        },
        'tex-math': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: 'output' }
                },
                '\\ce{(...)}': {
                    '*': { action_: ['output', 'ce'] }
                },
                '\\pu{(...)}': {
                    '*': { action_: ['output', { type_: 'write', option: "{" }, 'pu', { type_: 'write', option: "}" }] }
                },
                '{...}|\\,|\\x{}{}|\\x{}|\\x': {
                    '*': { action_: 'o=' }
                },
                'else': {
                    '*': { action_: 'o=' }
                }
            }),
            actions: {
                'output': function (buffer) {
                    if (buffer.o) {
                        var ret = { type_: 'tex-math', p1: buffer.o };
                        for (var p in buffer) {
                            delete buffer[p];
                        }
                        return ret;
                    }
                    return undefined;
                }
            }
        },
        'tex-math tight': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: 'output' }
                },
                '\\ce{(...)}': {
                    '*': { action_: ['output', 'ce'] }
                },
                '\\pu{(...)}': {
                    '*': { action_: ['output', { type_: 'write', option: "{" }, 'pu', { type_: 'write', option: "}" }] }
                },
                '{...}|\\,|\\x{}{}|\\x{}|\\x': {
                    '*': { action_: 'o=' }
                },
                '-|+': {
                    '*': { action_: 'tight operator' }
                },
                'else': {
                    '*': { action_: 'o=' }
                }
            }),
            actions: {
                'tight operator': function (buffer, m) { buffer.o = (buffer.o || "") + "{" + m + "}"; return undefined; },
                'output': function (buffer) {
                    if (buffer.o) {
                        var ret = { type_: 'tex-math', p1: buffer.o };
                        for (var p in buffer) {
                            delete buffer[p];
                        }
                        return ret;
                    }
                    return undefined;
                }
            }
        },
        '9,9': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: [] }
                },
                ',': {
                    '*': { action_: 'comma' }
                },
                'else': {
                    '*': { action_: 'copy' }
                }
            }),
            actions: {
                'comma': function () { return { type_: 'commaDecimal' }; }
            }
        },
        'pu': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: 'output' }
                },
                'space$': {
                    '*': { action_: ['output', 'space'] }
                },
                '{[(|)]}': {
                    '0|a': { action_: 'copy' }
                },
                '(-)(9)^(-9)': {
                    '0': { action_: 'number^', nextState: 'a' }
                },
                '(-)(9.,9)(e)(99)': {
                    '0': { action_: 'enumber', nextState: 'a' }
                },
                'space': {
                    '0|a': { action_: [] }
                },
                'pm-operator': {
                    '0|a': { action_: { type_: 'operator', option: '\\pm' }, nextState: '0' }
                },
                'operator': {
                    '0|a': { action_: 'copy', nextState: '0' }
                },
                '//': {
                    'd': { action_: 'o=', nextState: '/' }
                },
                '/': {
                    'd': { action_: 'o=', nextState: '/' }
                },
                '{...}|else': {
                    '0|d': { action_: 'd=', nextState: 'd' },
                    'a': { action_: ['space', 'd='], nextState: 'd' },
                    '/|q': { action_: 'q=', nextState: 'q' }
                }
            }),
            actions: {
                'enumber': function (_buffer, m) {
                    var ret = [];
                    if (m[0] === "+-" || m[0] === "+/-") {
                        ret.push("\\pm ");
                    }
                    else if (m[0]) {
                        ret.push(m[0]);
                    }
                    if (m[1]) {
                        _mhchemParser.concatArray(ret, _mhchemParser.go(m[1], 'pu-9,9'));
                        if (m[2]) {
                            if (m[2].match(/[,.]/)) {
                                _mhchemParser.concatArray(ret, _mhchemParser.go(m[2], 'pu-9,9'));
                            }
                            else {
                                ret.push(m[2]);
                            }
                        }
                        if (m[3] || m[4]) {
                            if (m[3] === "e" || m[4] === "*") {
                                ret.push({ type_: 'cdot' });
                            }
                            else {
                                ret.push({ type_: 'times' });
                            }
                        }
                    }
                    if (m[5]) {
                        ret.push("10^{" + m[5] + "}");
                    }
                    return ret;
                },
                'number^': function (_buffer, m) {
                    var ret = [];
                    if (m[0] === "+-" || m[0] === "+/-") {
                        ret.push("\\pm ");
                    }
                    else if (m[0]) {
                        ret.push(m[0]);
                    }
                    _mhchemParser.concatArray(ret, _mhchemParser.go(m[1], 'pu-9,9'));
                    ret.push("^{" + m[2] + "}");
                    return ret;
                },
                'operator': function (_buffer, m, p1) { return { type_: 'operator', kind_: (p1 || m) }; },
                'space': function () { return { type_: 'pu-space-1' }; },
                'output': function (buffer) {
                    var ret;
                    var md = _mhchemParser.patterns.match_('{(...)}', buffer.d || "");
                    if (md && md.remainder === '') {
                        buffer.d = md.match_;
                    }
                    var mq = _mhchemParser.patterns.match_('{(...)}', buffer.q || "");
                    if (mq && mq.remainder === '') {
                        buffer.q = mq.match_;
                    }
                    if (buffer.d) {
                        buffer.d = buffer.d.replace(/\u00B0C|\^oC|\^{o}C/g, "{}^{\\circ}C");
                        buffer.d = buffer.d.replace(/\u00B0F|\^oF|\^{o}F/g, "{}^{\\circ}F");
                    }
                    if (buffer.q) {
                        buffer.q = buffer.q.replace(/\u00B0C|\^oC|\^{o}C/g, "{}^{\\circ}C");
                        buffer.q = buffer.q.replace(/\u00B0F|\^oF|\^{o}F/g, "{}^{\\circ}F");
                        var b5 = {
                            d: _mhchemParser.go(buffer.d, 'pu'),
                            q: _mhchemParser.go(buffer.q, 'pu')
                        };
                        if (buffer.o === '//') {
                            ret = { type_: 'pu-frac', p1: b5.d, p2: b5.q };
                        }
                        else {
                            ret = b5.d;
                            if (b5.d.length > 1 || b5.q.length > 1) {
                                ret.push({ type_: ' / ' });
                            }
                            else {
                                ret.push({ type_: '/' });
                            }
                            _mhchemParser.concatArray(ret, b5.q);
                        }
                    }
                    else {
                        ret = _mhchemParser.go(buffer.d, 'pu-2');
                    }
                    for (var p in buffer) {
                        delete buffer[p];
                    }
                    return ret;
                }
            }
        },
        'pu-2': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '*': { action_: 'output' }
                },
                '*': {
                    '*': { action_: ['output', 'cdot'], nextState: '0' }
                },
                '\\x': {
                    '*': { action_: 'rm=' }
                },
                'space': {
                    '*': { action_: ['output', 'space'], nextState: '0' }
                },
                '^{(...)}|^(-1)': {
                    '1': { action_: '^(-1)' }
                },
                '-9.,9': {
                    '0': { action_: 'rm=', nextState: '0' },
                    '1': { action_: '^(-1)', nextState: '0' }
                },
                '{...}|else': {
                    '*': { action_: 'rm=', nextState: '1' }
                }
            }),
            actions: {
                'cdot': function () { return { type_: 'tight cdot' }; },
                '^(-1)': function (buffer, m) { buffer.rm += "^{" + m + "}"; return undefined; },
                'space': function () { return { type_: 'pu-space-2' }; },
                'output': function (buffer) {
                    var ret = [];
                    if (buffer.rm) {
                        var mrm = _mhchemParser.patterns.match_('{(...)}', buffer.rm || "");
                        if (mrm && mrm.remainder === '') {
                            ret = _mhchemParser.go(mrm.match_, 'pu');
                        }
                        else {
                            ret = { type_: 'rm', p1: buffer.rm };
                        }
                    }
                    for (var p in buffer) {
                        delete buffer[p];
                    }
                    return ret;
                }
            }
        },
        'pu-9,9': {
            transitions: _mhchemCreateTransitions({
                'empty': {
                    '0': { action_: 'output-0' },
                    'o': { action_: 'output-o' }
                },
                ',': {
                    '0': { action_: ['output-0', 'comma'], nextState: 'o' }
                },
                '.': {
                    '0': { action_: ['output-0', 'copy'], nextState: 'o' }
                },
                'else': {
                    '*': { action_: 'text=' }
                }
            }),
            actions: {
                'comma': function () { return { type_: 'commaDecimal' }; },
                'output-0': function (buffer) {
                    var ret = [];
                    buffer.text_ = buffer.text_ || "";
                    if (buffer.text_.length > 4) {
                        var a = buffer.text_.length % 3;
                        if (a === 0) {
                            a = 3;
                        }
                        for (var i = buffer.text_.length - 3; i > 0; i -= 3) {
                            ret.push(buffer.text_.substr(i, 3));
                            ret.push({ type_: '1000 separator' });
                        }
                        ret.push(buffer.text_.substr(0, a));
                        ret.reverse();
                    }
                    else {
                        ret.push(buffer.text_);
                    }
                    for (var p in buffer) {
                        delete buffer[p];
                    }
                    return ret;
                },
                'output-o': function (buffer) {
                    var ret = [];
                    buffer.text_ = buffer.text_ || "";
                    if (buffer.text_.length > 4) {
                        var a = buffer.text_.length - 3;
                        var i = void 0;
                        for (i = 0; i < a; i += 3) {
                            ret.push(buffer.text_.substr(i, 3));
                            ret.push({ type_: '1000 separator' });
                        }
                        ret.push(buffer.text_.substr(i));
                    }
                    else {
                        ret.push(buffer.text_);
                    }
                    for (var p in buffer) {
                        delete buffer[p];
                    }
                    return ret;
                }
            }
        }
    }
};
var _mhchemTexify = {
    go: function (input, addOuterBraces) {
        if (!input) {
            return "";
        }
        var res = "";
        var cee = false;
        for (var i = 0; i < input.length; i++) {
            var inputi = input[i];
            if (typeof inputi === "string") {
                res += inputi;
            }
            else {
                res += _mhchemTexify._go2(inputi);
                if (inputi.type_ === '1st-level escape') {
                    cee = true;
                }
            }
        }
        if (addOuterBraces && !cee && res) {
            res = "{" + res + "}";
        }
        return res;
    },
    _goInner: function (input) {
        return _mhchemTexify.go(input, false);
    },
    _go2: function (buf) {
        var res;
        switch (buf.type_) {
            case 'chemfive':
                res = "";
                var b5 = {
                    a: _mhchemTexify._goInner(buf.a),
                    b: _mhchemTexify._goInner(buf.b),
                    p: _mhchemTexify._goInner(buf.p),
                    o: _mhchemTexify._goInner(buf.o),
                    q: _mhchemTexify._goInner(buf.q),
                    d: _mhchemTexify._goInner(buf.d)
                };
                if (b5.a) {
                    if (b5.a.match(/^[+\-]/)) {
                        b5.a = "{" + b5.a + "}";
                    }
                    res += b5.a + "\\,";
                }
                if (b5.b || b5.p) {
                    res += "{\\vphantom{A}}";
                    res += "^{\\hphantom{" + (b5.b || "") + "}}_{\\hphantom{" + (b5.p || "") + "}}";
                    res += "\\mkern-1.5mu";
                    res += "{\\vphantom{A}}";
                    res += "^{\\smash[t]{\\vphantom{2}}\\llap{" + (b5.b || "") + "}}";
                    res += "_{\\vphantom{2}\\llap{\\smash[t]{" + (b5.p || "") + "}}}";
                }
                if (b5.o) {
                    if (b5.o.match(/^[+\-]/)) {
                        b5.o = "{" + b5.o + "}";
                    }
                    res += b5.o;
                }
                if (buf.dType === 'kv') {
                    if (b5.d || b5.q) {
                        res += "{\\vphantom{A}}";
                    }
                    if (b5.d) {
                        res += "^{" + b5.d + "}";
                    }
                    if (b5.q) {
                        res += "_{\\smash[t]{" + b5.q + "}}";
                    }
                }
                else if (buf.dType === 'oxidation') {
                    if (b5.d) {
                        res += "{\\vphantom{A}}";
                        res += "^{" + b5.d + "}";
                    }
                    if (b5.q) {
                        res += "{\\vphantom{A}}";
                        res += "_{\\smash[t]{" + b5.q + "}}";
                    }
                }
                else {
                    if (b5.q) {
                        res += "{\\vphantom{A}}";
                        res += "_{\\smash[t]{" + b5.q + "}}";
                    }
                    if (b5.d) {
                        res += "{\\vphantom{A}}";
                        res += "^{" + b5.d + "}";
                    }
                }
                break;
            case 'rm':
                res = "\\mathrm{" + buf.p1 + "}";
                break;
            case 'text':
                if (buf.p1.match(/[\^_]/)) {
                    buf.p1 = buf.p1.replace(" ", "~").replace("-", "\\text{-}");
                    res = "\\mathrm{" + buf.p1 + "}";
                }
                else {
                    res = "\\text{" + buf.p1 + "}";
                }
                break;
            case 'roman numeral':
                res = "\\mathrm{" + buf.p1 + "}";
                break;
            case 'state of aggregation':
                res = "\\mskip2mu " + _mhchemTexify._goInner(buf.p1);
                break;
            case 'state of aggregation subscript':
                res = "\\mskip1mu " + _mhchemTexify._goInner(buf.p1);
                break;
            case 'bond':
                res = _mhchemTexify._getBond(buf.kind_);
                if (!res) {
                    throw ["MhchemErrorBond", "mhchem Error. Unknown bond type (" + buf.kind_ + ")"];
                }
                break;
            case 'frac':
                var c = "\\frac{" + buf.p1 + "}{" + buf.p2 + "}";
                res = "\\mathchoice{\\textstyle" + c + "}{" + c + "}{" + c + "}{" + c + "}";
                break;
            case 'pu-frac':
                var d = "\\frac{" + _mhchemTexify._goInner(buf.p1) + "}{" + _mhchemTexify._goInner(buf.p2) + "}";
                res = "\\mathchoice{\\textstyle" + d + "}{" + d + "}{" + d + "}{" + d + "}";
                break;
            case 'tex-math':
                res = buf.p1 + " ";
                break;
            case 'frac-ce':
                res = "\\frac{" + _mhchemTexify._goInner(buf.p1) + "}{" + _mhchemTexify._goInner(buf.p2) + "}";
                break;
            case 'overset':
                res = "\\overset{" + _mhchemTexify._goInner(buf.p1) + "}{" + _mhchemTexify._goInner(buf.p2) + "}";
                break;
            case 'underset':
                res = "\\underset{" + _mhchemTexify._goInner(buf.p1) + "}{" + _mhchemTexify._goInner(buf.p2) + "}";
                break;
            case 'underbrace':
                res = "\\underbrace{" + _mhchemTexify._goInner(buf.p1) + "}_{" + _mhchemTexify._goInner(buf.p2) + "}";
                break;
            case 'color':
                res = "{\\color{" + buf.color1 + "}{" + _mhchemTexify._goInner(buf.color2) + "}}";
                break;
            case 'color0':
                res = "\\color{" + buf.color + "}";
                break;
            case 'arrow':
                var b6 = {
                    rd: _mhchemTexify._goInner(buf.rd),
                    rq: _mhchemTexify._goInner(buf.rq)
                };
                var arrow = _mhchemTexify._getArrow(buf.r);
                if (b6.rd || b6.rq) {
                    if (buf.r === "<=>" || buf.r === "<=>>" || buf.r === "<<=>" || buf.r === "<-->") {
                        arrow = "\\long" + arrow;
                        if (b6.rd) {
                            arrow = "\\overset{" + b6.rd + "}{" + arrow + "}";
                        }
                        if (b6.rq) {
                            if (buf.r === "<-->") {
                                arrow = "\\underset{\\lower2mu{" + b6.rq + "}}{" + arrow + "}";
                            }
                            else {
                                arrow = "\\underset{\\lower6mu{" + b6.rq + "}}{" + arrow + "}";
                            }
                        }
                        arrow = " {}\\mathrel{" + arrow + "}{} ";
                    }
                    else {
                        if (b6.rq) {
                            arrow += "[{" + b6.rq + "}]";
                        }
                        arrow += "{" + b6.rd + "}";
                        arrow = " {}\\mathrel{\\x" + arrow + "}{} ";
                    }
                }
                else {
                    arrow = " {}\\mathrel{\\long" + arrow + "}{} ";
                }
                res = arrow;
                break;
            case 'operator':
                res = _mhchemTexify._getOperator(buf.kind_);
                break;
            case '1st-level escape':
                res = buf.p1 + " ";
                break;
            case 'space':
                res = " ";
                break;
            case 'tinySkip':
                res = '\\mkern2mu';
                break;
            case 'entitySkip':
                res = "~";
                break;
            case 'pu-space-1':
                res = "~";
                break;
            case 'pu-space-2':
                res = "\\mkern3mu ";
                break;
            case '1000 separator':
                res = "\\mkern2mu ";
                break;
            case 'commaDecimal':
                res = "{,}";
                break;
            case 'comma enumeration L':
                res = "{" + buf.p1 + "}\\mkern6mu ";
                break;
            case 'comma enumeration M':
                res = "{" + buf.p1 + "}\\mkern3mu ";
                break;
            case 'comma enumeration S':
                res = "{" + buf.p1 + "}\\mkern1mu ";
                break;
            case 'hyphen':
                res = "\\text{-}";
                break;
            case 'addition compound':
                res = "\\,{\\cdot}\\,";
                break;
            case 'electron dot':
                res = "\\mkern1mu \\bullet\\mkern1mu ";
                break;
            case 'KV x':
                res = "{\\times}";
                break;
            case 'prime':
                res = "\\prime ";
                break;
            case 'cdot':
                res = "\\cdot ";
                break;
            case 'tight cdot':
                res = "\\mkern1mu{\\cdot}\\mkern1mu ";
                break;
            case 'times':
                res = "\\times ";
                break;
            case 'circa':
                res = "{\\sim}";
                break;
            case '^':
                res = "uparrow";
                break;
            case 'v':
                res = "downarrow";
                break;
            case 'ellipsis':
                res = "\\ldots ";
                break;
            case '/':
                res = "/";
                break;
            case ' / ':
                res = "\\,/\\,";
                break;
            default:
                assertNever(buf);
                throw ["MhchemBugT", "mhchem bug T. Please report."];
        }
        return res;
    },
    _getArrow: function (a) {
        switch (a) {
            case "->": return "rightarrow";
            case "\u2192": return "rightarrow";
            case "\u27F6": return "rightarrow";
            case "<-": return "leftarrow";
            case "<->": return "leftrightarrow";
            case "<-->": return "leftrightarrows";
            case "<=>": return "rightleftharpoons";
            case "\u21CC": return "rightleftharpoons";
            case "<=>>": return "Rightleftharpoons";
            case "<<=>": return "Leftrightharpoons";
            default:
                assertNever(a);
                throw ["MhchemBugT", "mhchem bug T. Please report."];
        }
    },
    _getBond: function (a) {
        switch (a) {
            case "-": return "{-}";
            case "1": return "{-}";
            case "=": return "{=}";
            case "2": return "{=}";
            case "#": return "{\\equiv}";
            case "3": return "{\\equiv}";
            case "~": return "{\\tripledash}";
            case "~-": return "{\\rlap{\\lower.1em{-}}\\raise.1em{\\tripledash}}";
            case "~=": return "{\\rlap{\\lower.2em{-}}\\rlap{\\raise.2em{\\tripledash}}-}";
            case "~--": return "{\\rlap{\\lower.2em{-}}\\rlap{\\raise.2em{\\tripledash}}-}";
            case "-~-": return "{\\rlap{\\lower.2em{-}}\\rlap{\\raise.2em{-}}\\tripledash}";
            case "...": return "{{\\cdot}{\\cdot}{\\cdot}}";
            case "....": return "{{\\cdot}{\\cdot}{\\cdot}{\\cdot}}";
            case "->": return "{\\rightarrow}";
            case "<-": return "{\\leftarrow}";
            case "<": return "{<}";
            case ">": return "{>}";
            default:
                assertNever(a);
                throw ["MhchemBugT", "mhchem bug T. Please report."];
        }
    },
    _getOperator: function (a) {
        switch (a) {
            case "+": return " {}+{} ";
            case "-": return " {}-{} ";
            case "=": return " {}={} ";
            case "<": return " {}<{} ";
            case ">": return " {}>{} ";
            case "<<": return " {}\\ll{} ";
            case ">>": return " {}\\gg{} ";
            case "\\pm": return " {}\\pm{} ";
            case "\\approx": return " {}\\approx{} ";
            case "$\\approx$": return " {}\\approx{} ";
            case "v": return " \\downarrow{} ";
            case "(v)": return " \\downarrow{} ";
            case "^": return " \\uparrow{} ";
            case "(^)": return " \\uparrow{} ";
            default:
                assertNever(a);
                throw ["MhchemBugT", "mhchem bug T. Please report."];
        }
    }
};
function assertNever(a) { }


/***/ })

};
;