"use strict";
exports.id = 8678;
exports.ids = [8678];
exports.modules = {

/***/ 8678:
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssistiveMmlHandler = exports.AssistiveMmlMathDocumentMixin = exports.AssistiveMmlMathItemMixin = exports.LimitedMmlVisitor = void 0;
var MathItem_js_1 = __webpack_require__(59719);
var SerializedMmlVisitor_js_1 = __webpack_require__(97810);
var Options_js_1 = __webpack_require__(36059);
var LimitedMmlVisitor = (function (_super) {
    __extends(LimitedMmlVisitor, _super);
    function LimitedMmlVisitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LimitedMmlVisitor.prototype.getAttributes = function (node) {
        return _super.prototype.getAttributes.call(this, node).replace(/ ?id=".*?"/, '');
    };
    return LimitedMmlVisitor;
}(SerializedMmlVisitor_js_1.SerializedMmlVisitor));
exports.LimitedMmlVisitor = LimitedMmlVisitor;
(0, MathItem_js_1.newState)('ASSISTIVEMML', 153);
function AssistiveMmlMathItemMixin(BaseMathItem) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.assistiveMml = function (document, force) {
            if (force === void 0) { force = false; }
            if (this.state() >= MathItem_js_1.STATE.ASSISTIVEMML)
                return;
            if (!this.isEscaped && (document.options.enableAssistiveMml || force)) {
                var adaptor = document.adaptor;
                var mml = document.toMML(this.root).replace(/\n */g, '').replace(/<!--.*?-->/g, '');
                var mmlNodes = adaptor.firstChild(adaptor.body(adaptor.parse(mml, 'text/html')));
                var node = adaptor.node('mjx-assistive-mml', {
                    unselectable: 'on', display: (this.display ? 'block' : 'inline')
                }, [mmlNodes]);
                adaptor.setAttribute(adaptor.firstChild(this.typesetRoot), 'aria-hidden', 'true');
                adaptor.setStyle(this.typesetRoot, 'position', 'relative');
                adaptor.append(this.typesetRoot, node);
            }
            this.state(MathItem_js_1.STATE.ASSISTIVEMML);
        };
        return class_1;
    }(BaseMathItem));
}
exports.AssistiveMmlMathItemMixin = AssistiveMmlMathItemMixin;
function AssistiveMmlMathDocumentMixin(BaseDocument) {
    var _a;
    return _a = (function (_super) {
            __extends(BaseClass, _super);
            function BaseClass() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                var CLASS = _this.constructor;
                var ProcessBits = CLASS.ProcessBits;
                if (!ProcessBits.has('assistive-mml')) {
                    ProcessBits.allocate('assistive-mml');
                }
                _this.visitor = new LimitedMmlVisitor(_this.mmlFactory);
                _this.options.MathItem =
                    AssistiveMmlMathItemMixin(_this.options.MathItem);
                if ('addStyles' in _this) {
                    _this.addStyles(CLASS.assistiveStyles);
                }
                return _this;
            }
            BaseClass.prototype.toMML = function (node) {
                return this.visitor.visitTree(node);
            };
            BaseClass.prototype.assistiveMml = function () {
                var e_1, _a;
                if (!this.processed.isSet('assistive-mml')) {
                    try {
                        for (var _b = __values(this.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var math = _c.value;
                            math.assistiveMml(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    this.processed.set('assistive-mml');
                }
                return this;
            };
            BaseClass.prototype.state = function (state, restore) {
                if (restore === void 0) { restore = false; }
                _super.prototype.state.call(this, state, restore);
                if (state < MathItem_js_1.STATE.ASSISTIVEMML) {
                    this.processed.clear('assistive-mml');
                }
                return this;
            };
            return BaseClass;
        }(BaseDocument)),
        _a.OPTIONS = __assign(__assign({}, BaseDocument.OPTIONS), { enableAssistiveMml: true, renderActions: (0, Options_js_1.expandable)(__assign(__assign({}, BaseDocument.OPTIONS.renderActions), { assistiveMml: [MathItem_js_1.STATE.ASSISTIVEMML] })) }),
        _a.assistiveStyles = {
            'mjx-assistive-mml': {
                position: 'absolute !important',
                top: '0px', left: '0px',
                clip: 'rect(1px, 1px, 1px, 1px)',
                padding: '1px 0px 0px 0px !important',
                border: '0px !important',
                display: 'block !important',
                width: 'auto !important',
                overflow: 'hidden !important',
                '-webkit-touch-callout': 'none',
                '-webkit-user-select': 'none',
                '-khtml-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none'
            },
            'mjx-assistive-mml[display="block"]': {
                width: '100% !important'
            }
        },
        _a;
}
exports.AssistiveMmlMathDocumentMixin = AssistiveMmlMathDocumentMixin;
function AssistiveMmlHandler(handler) {
    handler.documentClass =
        AssistiveMmlMathDocumentMixin(handler.documentClass);
    return handler;
}
exports.AssistiveMmlHandler = AssistiveMmlHandler;
//# sourceMappingURL=assistive-mml.js.map

/***/ }),

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

/***/ 14616:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MML = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var math_js_1 = __webpack_require__(27225);
var mi_js_1 = __webpack_require__(16689);
var mn_js_1 = __webpack_require__(94411);
var mo_js_1 = __webpack_require__(5213);
var mtext_js_1 = __webpack_require__(86237);
var mspace_js_1 = __webpack_require__(4254);
var ms_js_1 = __webpack_require__(17931);
var mrow_js_1 = __webpack_require__(68550);
var mfrac_js_1 = __webpack_require__(294);
var msqrt_js_1 = __webpack_require__(53162);
var mroot_js_1 = __webpack_require__(68091);
var mstyle_js_1 = __webpack_require__(95546);
var merror_js_1 = __webpack_require__(53583);
var mpadded_js_1 = __webpack_require__(59783);
var mphantom_js_1 = __webpack_require__(15837);
var mfenced_js_1 = __webpack_require__(90719);
var menclose_js_1 = __webpack_require__(22599);
var maction_js_1 = __webpack_require__(79024);
var msubsup_js_1 = __webpack_require__(74529);
var munderover_js_1 = __webpack_require__(75723);
var mmultiscripts_js_1 = __webpack_require__(13195);
var mtable_js_1 = __webpack_require__(7252);
var mtr_js_1 = __webpack_require__(2117);
var mtd_js_1 = __webpack_require__(49016);
var maligngroup_js_1 = __webpack_require__(89);
var malignmark_js_1 = __webpack_require__(53698);
var mglyph_js_1 = __webpack_require__(83954);
var semantics_js_1 = __webpack_require__(19223);
var TeXAtom_js_1 = __webpack_require__(66846);
var mathchoice_js_1 = __webpack_require__(67801);
exports.MML = (_a = {},
    _a[math_js_1.MmlMath.prototype.kind] = math_js_1.MmlMath,
    _a[mi_js_1.MmlMi.prototype.kind] = mi_js_1.MmlMi,
    _a[mn_js_1.MmlMn.prototype.kind] = mn_js_1.MmlMn,
    _a[mo_js_1.MmlMo.prototype.kind] = mo_js_1.MmlMo,
    _a[mtext_js_1.MmlMtext.prototype.kind] = mtext_js_1.MmlMtext,
    _a[mspace_js_1.MmlMspace.prototype.kind] = mspace_js_1.MmlMspace,
    _a[ms_js_1.MmlMs.prototype.kind] = ms_js_1.MmlMs,
    _a[mrow_js_1.MmlMrow.prototype.kind] = mrow_js_1.MmlMrow,
    _a[mrow_js_1.MmlInferredMrow.prototype.kind] = mrow_js_1.MmlInferredMrow,
    _a[mfrac_js_1.MmlMfrac.prototype.kind] = mfrac_js_1.MmlMfrac,
    _a[msqrt_js_1.MmlMsqrt.prototype.kind] = msqrt_js_1.MmlMsqrt,
    _a[mroot_js_1.MmlMroot.prototype.kind] = mroot_js_1.MmlMroot,
    _a[mstyle_js_1.MmlMstyle.prototype.kind] = mstyle_js_1.MmlMstyle,
    _a[merror_js_1.MmlMerror.prototype.kind] = merror_js_1.MmlMerror,
    _a[mpadded_js_1.MmlMpadded.prototype.kind] = mpadded_js_1.MmlMpadded,
    _a[mphantom_js_1.MmlMphantom.prototype.kind] = mphantom_js_1.MmlMphantom,
    _a[mfenced_js_1.MmlMfenced.prototype.kind] = mfenced_js_1.MmlMfenced,
    _a[menclose_js_1.MmlMenclose.prototype.kind] = menclose_js_1.MmlMenclose,
    _a[maction_js_1.MmlMaction.prototype.kind] = maction_js_1.MmlMaction,
    _a[msubsup_js_1.MmlMsub.prototype.kind] = msubsup_js_1.MmlMsub,
    _a[msubsup_js_1.MmlMsup.prototype.kind] = msubsup_js_1.MmlMsup,
    _a[msubsup_js_1.MmlMsubsup.prototype.kind] = msubsup_js_1.MmlMsubsup,
    _a[munderover_js_1.MmlMunder.prototype.kind] = munderover_js_1.MmlMunder,
    _a[munderover_js_1.MmlMover.prototype.kind] = munderover_js_1.MmlMover,
    _a[munderover_js_1.MmlMunderover.prototype.kind] = munderover_js_1.MmlMunderover,
    _a[mmultiscripts_js_1.MmlMmultiscripts.prototype.kind] = mmultiscripts_js_1.MmlMmultiscripts,
    _a[mmultiscripts_js_1.MmlMprescripts.prototype.kind] = mmultiscripts_js_1.MmlMprescripts,
    _a[mmultiscripts_js_1.MmlNone.prototype.kind] = mmultiscripts_js_1.MmlNone,
    _a[mtable_js_1.MmlMtable.prototype.kind] = mtable_js_1.MmlMtable,
    _a[mtr_js_1.MmlMlabeledtr.prototype.kind] = mtr_js_1.MmlMlabeledtr,
    _a[mtr_js_1.MmlMtr.prototype.kind] = mtr_js_1.MmlMtr,
    _a[mtd_js_1.MmlMtd.prototype.kind] = mtd_js_1.MmlMtd,
    _a[maligngroup_js_1.MmlMaligngroup.prototype.kind] = maligngroup_js_1.MmlMaligngroup,
    _a[malignmark_js_1.MmlMalignmark.prototype.kind] = malignmark_js_1.MmlMalignmark,
    _a[mglyph_js_1.MmlMglyph.prototype.kind] = mglyph_js_1.MmlMglyph,
    _a[semantics_js_1.MmlSemantics.prototype.kind] = semantics_js_1.MmlSemantics,
    _a[semantics_js_1.MmlAnnotation.prototype.kind] = semantics_js_1.MmlAnnotation,
    _a[semantics_js_1.MmlAnnotationXML.prototype.kind] = semantics_js_1.MmlAnnotationXML,
    _a[TeXAtom_js_1.TeXAtom.prototype.kind] = TeXAtom_js_1.TeXAtom,
    _a[mathchoice_js_1.MathChoice.prototype.kind] = mathchoice_js_1.MathChoice,
    _a[MmlNode_js_1.TextNode.prototype.kind] = MmlNode_js_1.TextNode,
    _a[MmlNode_js_1.XMLNode.prototype.kind] = MmlNode_js_1.XMLNode,
    _a);
//# sourceMappingURL=MML.js.map

/***/ }),

/***/ 61448:
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
exports.MmlFactory = void 0;
var NodeFactory_js_1 = __webpack_require__(88100);
var MML_js_1 = __webpack_require__(14616);
var MmlFactory = (function (_super) {
    __extends(MmlFactory, _super);
    function MmlFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlFactory.prototype, "MML", {
        get: function () {
            return this.node;
        },
        enumerable: false,
        configurable: true
    });
    MmlFactory.defaultNodes = MML_js_1.MML;
    return MmlFactory;
}(NodeFactory_js_1.AbstractNodeFactory));
exports.MmlFactory = MmlFactory;
//# sourceMappingURL=MmlFactory.js.map

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

/***/ 89:
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
exports.MmlMaligngroup = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var Attributes_js_1 = __webpack_require__(7013);
var MmlMaligngroup = (function (_super) {
    __extends(MmlMaligngroup, _super);
    function MmlMaligngroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMaligngroup.prototype, "kind", {
        get: function () {
            return 'maligngroup';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMaligngroup.prototype, "isSpacelike", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMaligngroup.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        attributes = this.addInheritedAttributes(attributes, this.attributes.getAllAttributes());
        _super.prototype.setChildInheritedAttributes.call(this, attributes, display, level, prime);
    };
    MmlMaligngroup.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlLayoutNode.defaults), { groupalign: Attributes_js_1.INHERIT });
    return MmlMaligngroup;
}(MmlNode_js_1.AbstractMmlLayoutNode));
exports.MmlMaligngroup = MmlMaligngroup;
//# sourceMappingURL=maligngroup.js.map

/***/ }),

/***/ 53698:
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
exports.MmlMalignmark = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMalignmark = (function (_super) {
    __extends(MmlMalignmark, _super);
    function MmlMalignmark() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMalignmark.prototype, "kind", {
        get: function () {
            return 'malignmark';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMalignmark.prototype, "arity", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMalignmark.prototype, "isSpacelike", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMalignmark.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlNode.defaults), { edge: 'left' });
    return MmlMalignmark;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMalignmark = MmlMalignmark;
//# sourceMappingURL=malignmark.js.map

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

/***/ 67801:
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
exports.MathChoice = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MathChoice = (function (_super) {
    __extends(MathChoice, _super);
    function MathChoice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MathChoice.prototype, "kind", {
        get: function () {
            return 'MathChoice';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MathChoice.prototype, "arity", {
        get: function () {
            return 4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MathChoice.prototype, "notParent", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MathChoice.prototype.setInheritedAttributes = function (attributes, display, level, prime) {
        var selection = (display ? 0 : Math.max(0, Math.min(level, 2)) + 1);
        var child = this.childNodes[selection] || this.factory.create('mrow');
        this.parent.replaceChild(child, this);
        child.setInheritedAttributes(attributes, display, level, prime);
    };
    MathChoice.defaults = __assign({}, MmlNode_js_1.AbstractMmlBaseNode.defaults);
    return MathChoice;
}(MmlNode_js_1.AbstractMmlBaseNode));
exports.MathChoice = MathChoice;
//# sourceMappingURL=mathchoice.js.map

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

/***/ 53583:
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
exports.MmlMerror = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMerror = (function (_super) {
    __extends(MmlMerror, _super);
    function MmlMerror() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMerror.prototype, "kind", {
        get: function () {
            return 'merror';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMerror.prototype, "arity", {
        get: function () {
            return -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMerror.prototype, "linebreakContainer", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    MmlMerror.defaults = __assign({}, MmlNode_js_1.AbstractMmlNode.defaults);
    return MmlMerror;
}(MmlNode_js_1.AbstractMmlNode));
exports.MmlMerror = MmlMerror;
//# sourceMappingURL=merror.js.map

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

/***/ 15837:
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
exports.MmlMphantom = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var MmlMphantom = (function (_super) {
    __extends(MmlMphantom, _super);
    function MmlMphantom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMphantom.prototype, "kind", {
        get: function () {
            return 'mphantom';
        },
        enumerable: false,
        configurable: true
    });
    MmlMphantom.defaults = __assign({}, MmlNode_js_1.AbstractMmlLayoutNode.defaults);
    return MmlMphantom;
}(MmlNode_js_1.AbstractMmlLayoutNode));
exports.MmlMphantom = MmlMphantom;
//# sourceMappingURL=mphantom.js.map

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

/***/ 95546:
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
exports.MmlMstyle = void 0;
var MmlNode_js_1 = __webpack_require__(18426);
var Attributes_js_1 = __webpack_require__(7013);
var MmlMstyle = (function (_super) {
    __extends(MmlMstyle, _super);
    function MmlMstyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMstyle.prototype, "kind", {
        get: function () {
            return 'mstyle';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmlMstyle.prototype, "notParent", {
        get: function () {
            return this.childNodes[0] && this.childNodes[0].childNodes.length === 1;
        },
        enumerable: false,
        configurable: true
    });
    MmlMstyle.prototype.setChildInheritedAttributes = function (attributes, display, level, prime) {
        var scriptlevel = this.attributes.getExplicit('scriptlevel');
        if (scriptlevel != null) {
            scriptlevel = scriptlevel.toString();
            if (scriptlevel.match(/^\s*[-+]/)) {
                level += parseInt(scriptlevel);
            }
            else {
                level = parseInt(scriptlevel);
            }
            prime = false;
        }
        var displaystyle = this.attributes.getExplicit('displaystyle');
        if (displaystyle != null) {
            display = (displaystyle === true);
            prime = false;
        }
        var cramped = this.attributes.getExplicit('data-cramped');
        if (cramped != null) {
            prime = cramped;
        }
        attributes = this.addInheritedAttributes(attributes, this.attributes.getAllAttributes());
        this.childNodes[0].setInheritedAttributes(attributes, display, level, prime);
    };
    MmlMstyle.defaults = __assign(__assign({}, MmlNode_js_1.AbstractMmlLayoutNode.defaults), { scriptlevel: Attributes_js_1.INHERIT, displaystyle: Attributes_js_1.INHERIT, scriptsizemultiplier: 1 / Math.sqrt(2), scriptminsize: '8px', mathbackground: Attributes_js_1.INHERIT, mathcolor: Attributes_js_1.INHERIT, dir: Attributes_js_1.INHERIT, infixlinebreakstyle: 'before' });
    return MmlMstyle;
}(MmlNode_js_1.AbstractMmlLayoutNode));
exports.MmlMstyle = MmlMstyle;
//# sourceMappingURL=mstyle.js.map

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

/***/ 45626:
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
exports.MmlVisitor = void 0;
var MmlFactory_js_1 = __webpack_require__(61448);
var Visitor_js_1 = __webpack_require__(91921);
var MmlVisitor = (function (_super) {
    __extends(MmlVisitor, _super);
    function MmlVisitor(factory) {
        if (factory === void 0) { factory = null; }
        if (!factory) {
            factory = new MmlFactory_js_1.MmlFactory();
        }
        return _super.call(this, factory) || this;
    }
    MmlVisitor.prototype.visitTextNode = function (_node) {
        var _args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _args[_i - 1] = arguments[_i];
        }
    };
    MmlVisitor.prototype.visitXMLNode = function (_node) {
        var _args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _args[_i - 1] = arguments[_i];
        }
    };
    return MmlVisitor;
}(Visitor_js_1.AbstractVisitor));
exports.MmlVisitor = MmlVisitor;
//# sourceMappingURL=MmlVisitor.js.map

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

/***/ 97810:
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
exports.SerializedMmlVisitor = exports.toEntity = exports.DATAMJX = void 0;
var MmlVisitor_js_1 = __webpack_require__(45626);
var MmlNode_js_1 = __webpack_require__(18426);
var mi_js_1 = __webpack_require__(16689);
exports.DATAMJX = 'data-mjx-';
var toEntity = function (c) { return '&#x' + c.codePointAt(0).toString(16).toUpperCase() + ';'; };
exports.toEntity = toEntity;
var SerializedMmlVisitor = (function (_super) {
    __extends(SerializedMmlVisitor, _super);
    function SerializedMmlVisitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SerializedMmlVisitor.prototype.visitTree = function (node) {
        return this.visitNode(node, '');
    };
    SerializedMmlVisitor.prototype.visitTextNode = function (node, _space) {
        return this.quoteHTML(node.getText());
    };
    SerializedMmlVisitor.prototype.visitXMLNode = function (node, space) {
        return space + node.getSerializedXML();
    };
    SerializedMmlVisitor.prototype.visitInferredMrowNode = function (node, space) {
        var e_1, _a;
        var mml = [];
        try {
            for (var _b = __values(node.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                mml.push(this.visitNode(child, space));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return mml.join('\n');
    };
    SerializedMmlVisitor.prototype.visitTeXAtomNode = function (node, space) {
        var children = this.childNodeMml(node, space + '  ', '\n');
        var mml = space + '<mrow' + this.getAttributes(node) + '>' +
            (children.match(/\S/) ? '\n' + children + space : '') + '</mrow>';
        return mml;
    };
    SerializedMmlVisitor.prototype.visitAnnotationNode = function (node, space) {
        return space + '<annotation' + this.getAttributes(node) + '>'
            + this.childNodeMml(node, '', '')
            + '</annotation>';
    };
    SerializedMmlVisitor.prototype.visitDefault = function (node, space) {
        var kind = node.kind;
        var _a = __read((node.isToken || node.childNodes.length === 0 ? ['', ''] : ['\n', space]), 2), nl = _a[0], endspace = _a[1];
        var children = this.childNodeMml(node, space + '  ', nl);
        return space + '<' + kind + this.getAttributes(node) + '>'
            + (children.match(/\S/) ? nl + children + endspace : '')
            + '</' + kind + '>';
    };
    SerializedMmlVisitor.prototype.childNodeMml = function (node, space, nl) {
        var e_2, _a;
        var mml = '';
        try {
            for (var _b = __values(node.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                mml += this.visitNode(child, space) + nl;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return mml;
    };
    SerializedMmlVisitor.prototype.getAttributes = function (node) {
        var e_3, _a;
        var attr = [];
        var defaults = this.constructor.defaultAttributes[node.kind] || {};
        var attributes = Object.assign({}, defaults, this.getDataAttributes(node), node.attributes.getAllAttributes());
        var variants = this.constructor.variants;
        if (attributes.hasOwnProperty('mathvariant') && variants.hasOwnProperty(attributes.mathvariant)) {
            attributes.mathvariant = variants[attributes.mathvariant];
        }
        try {
            for (var _b = __values(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                var value = String(attributes[name_1]);
                if (value === undefined)
                    continue;
                attr.push(name_1 + '="' + this.quoteHTML(value) + '"');
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return attr.length ? ' ' + attr.join(' ') : '';
    };
    SerializedMmlVisitor.prototype.getDataAttributes = function (node) {
        var data = {};
        var variant = node.attributes.getExplicit('mathvariant');
        var variants = this.constructor.variants;
        variant && variants.hasOwnProperty(variant) && this.setDataAttribute(data, 'variant', variant);
        node.getProperty('variantForm') && this.setDataAttribute(data, 'alternate', '1');
        node.getProperty('pseudoscript') && this.setDataAttribute(data, 'pseudoscript', 'true');
        node.getProperty('autoOP') === false && this.setDataAttribute(data, 'auto-op', 'false');
        var scriptalign = node.getProperty('scriptalign');
        scriptalign && this.setDataAttribute(data, 'script-align', scriptalign);
        var texclass = node.getProperty('texClass');
        if (texclass !== undefined) {
            var setclass = true;
            if (texclass === MmlNode_js_1.TEXCLASS.OP && node.isKind('mi')) {
                var name_2 = node.getText();
                setclass = !(name_2.length > 1 && name_2.match(mi_js_1.MmlMi.operatorName));
            }
            setclass && this.setDataAttribute(data, 'texclass', texclass < 0 ? 'NONE' : MmlNode_js_1.TEXCLASSNAMES[texclass]);
        }
        node.getProperty('scriptlevel') && node.getProperty('useHeight') === false &&
            this.setDataAttribute(data, 'smallmatrix', 'true');
        return data;
    };
    SerializedMmlVisitor.prototype.setDataAttribute = function (data, name, value) {
        data[exports.DATAMJX + name] = value;
    };
    SerializedMmlVisitor.prototype.quoteHTML = function (value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/[\uD800-\uDBFF]./g, exports.toEntity)
            .replace(/[\u0080-\uD7FF\uE000-\uFFFF]/g, exports.toEntity);
    };
    SerializedMmlVisitor.variants = {
        '-tex-calligraphic': 'script',
        '-tex-bold-calligraphic': 'bold-script',
        '-tex-oldstyle': 'normal',
        '-tex-bold-oldstyle': 'bold',
        '-tex-mathit': 'italic'
    };
    SerializedMmlVisitor.defaultAttributes = {
        math: {
            xmlns: 'http://www.w3.org/1998/Math/MathML'
        }
    };
    return SerializedMmlVisitor;
}(MmlVisitor_js_1.MmlVisitor));
exports.SerializedMmlVisitor = SerializedMmlVisitor;
//# sourceMappingURL=SerializedMmlVisitor.js.map

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

/***/ 88100:
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
exports.AbstractNodeFactory = void 0;
var Factory_js_1 = __webpack_require__(86161);
var AbstractNodeFactory = (function (_super) {
    __extends(AbstractNodeFactory, _super);
    function AbstractNodeFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractNodeFactory.prototype.create = function (kind, properties, children) {
        if (properties === void 0) { properties = {}; }
        if (children === void 0) { children = []; }
        return this.node[kind](properties, children);
    };
    return AbstractNodeFactory;
}(Factory_js_1.AbstractFactory));
exports.AbstractNodeFactory = AbstractNodeFactory;
//# sourceMappingURL=NodeFactory.js.map

/***/ }),

/***/ 91921:
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
exports.AbstractVisitor = void 0;
var Node_js_1 = __webpack_require__(62335);
var AbstractVisitor = (function () {
    function AbstractVisitor(factory) {
        var e_1, _a;
        this.nodeHandlers = new Map();
        try {
            for (var _b = __values(factory.getKinds()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var kind = _c.value;
                var method = this[AbstractVisitor.methodName(kind)];
                if (method) {
                    this.nodeHandlers.set(kind, method);
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
    AbstractVisitor.methodName = function (kind) {
        return 'visit' + (kind.charAt(0).toUpperCase() + kind.substr(1)).replace(/[^a-z0-9_]/ig, '_') + 'Node';
    };
    AbstractVisitor.prototype.visitTree = function (tree) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.visitNode.apply(this, __spreadArray([tree], __read(args), false));
    };
    AbstractVisitor.prototype.visitNode = function (node) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handler = this.nodeHandlers.get(node.kind) || this.visitDefault;
        return handler.call.apply(handler, __spreadArray([this, node], __read(args), false));
    };
    AbstractVisitor.prototype.visitDefault = function (node) {
        var e_2, _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (node instanceof Node_js_1.AbstractNode) {
            try {
                for (var _b = __values(node.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    this.visitNode.apply(this, __spreadArray([child], __read(args), false));
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
    };
    AbstractVisitor.prototype.setNodeHandler = function (kind, handler) {
        this.nodeHandlers.set(kind, handler);
    };
    AbstractVisitor.prototype.removeNodeHandler = function (kind) {
        this.nodeHandlers.delete(kind);
    };
    return AbstractVisitor;
}());
exports.AbstractVisitor = AbstractVisitor;
//# sourceMappingURL=Visitor.js.map

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