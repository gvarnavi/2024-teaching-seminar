exports.id = 8843;
exports.ids = [8843];
exports.modules = {

/***/ 68843:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Component: () => (/* binding */ Component)
});

// EXTERNAL MODULE: ./node_modules/@codemirror/commands/dist/index.js
var dist = __webpack_require__(45383);
// EXTERNAL MODULE: ./node_modules/@jupyterlab/codeeditor/lib/tokens.js
var tokens = __webpack_require__(45588);
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/commands.js
/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */


/**
 * Selector for a widget that can run code.
 */
const CODE_RUNNER_SELECTOR = '[data-jp-code-runner]';
/**
 * CodeMirror commands namespace
 */
var StateCommands;
(function (StateCommands) {
    /**
     * Indent or insert a tab as appropriate.
     */
    function indentMoreOrInsertTab(target) {
        var _a;
        if ((_a = target.dom.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains(tokens.COMPLETER_ENABLED_CLASS)) {
            return false;
        }
        const arg = { state: target.state, dispatch: target.dispatch };
        const from = target.state.selection.main.from;
        const to = target.state.selection.main.to;
        if (from != to) {
            return (0,dist.indentMore)(arg);
        }
        const line = target.state.doc.lineAt(from);
        const before = target.state.doc.slice(line.from, from).toString();
        if (/^\s*$/.test(before)) {
            return (0,dist.indentMore)(arg);
        }
        else {
            return (0,dist.insertTab)(arg);
        }
    }
    StateCommands.indentMoreOrInsertTab = indentMoreOrInsertTab;
    /**
     * Insert new line if completer is not active.
     */
    function completerOrInsertNewLine(target) {
        var _a;
        if ((_a = target.dom.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains(tokens.COMPLETER_ACTIVE_CLASS)) {
            // return true to avoid handling the default Enter from codemirror defaultKeymap.
            return true;
        }
        const arg = { state: target.state, dispatch: target.dispatch };
        return (0,dist.insertNewlineAndIndent)(arg);
    }
    StateCommands.completerOrInsertNewLine = completerOrInsertNewLine;
    /**
     * Prevent insertion of new line when running cell with Ctrl/Command + Enter
     */
    function preventNewLineOnRun(target) {
        if (target.dom.closest(CODE_RUNNER_SELECTOR)) {
            return true;
        }
        return false;
    }
    StateCommands.preventNewLineOnRun = preventNewLineOnRun;
})(StateCommands || (StateCommands = {}));
//# sourceMappingURL=commands.js.map
// EXTERNAL MODULE: ./node_modules/@codemirror/language/dist/index.js
var language_dist = __webpack_require__(59119);
// EXTERNAL MODULE: ./node_modules/@codemirror/state/dist/index.js
var state_dist = __webpack_require__(78120);
// EXTERNAL MODULE: ./node_modules/@codemirror/view/dist/index.js + 1 modules
var view_dist = __webpack_require__(75533);
// EXTERNAL MODULE: ./node_modules/@lumino/coreutils/dist/index.es6.js
var index_es6 = __webpack_require__(66201);
// EXTERNAL MODULE: ./node_modules/@lumino/signaling/dist/index.es6.js
var dist_index_es6 = __webpack_require__(4016);
// EXTERNAL MODULE: ./node_modules/@codemirror/autocomplete/dist/index.js
var autocomplete_dist = __webpack_require__(34790);
// EXTERNAL MODULE: ./node_modules/@jupyterlab/translation/lib/index.js + 6 modules
var lib = __webpack_require__(27154);
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/extensions/customStyle.js
/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */


/**
 * Custom theme configuration
 *
 * The first non-null value takes precedence
 */
const customThemeConfig = state_dist.Facet.define({
    combine(configs) {
        return (0,state_dist.combineConfig)(configs, {
            fontFamily: null,
            fontSize: null,
            lineHeight: null
        }, {
            fontFamily: (a, b) => a !== null && a !== void 0 ? a : b,
            fontSize: (a, b) => a !== null && a !== void 0 ? a : b,
            lineHeight: (a, b) => a !== null && a !== void 0 ? a : b
        });
    }
});
function setEditorStyle(view) {
    const { fontFamily, fontSize, lineHeight } = view.state.facet(customThemeConfig);
    let style = '';
    if (fontSize) {
        style += `font-size: ${fontSize}px !important;`;
    }
    if (fontFamily) {
        style += `font-family: ${fontFamily} !important;`;
    }
    if (lineHeight) {
        style += `line-height: ${lineHeight.toString()} !important`;
    }
    return { style: style };
}
/**
 * Get the extension to customize an editor theme.
 *
 * @param config Theme customization
 * @returns Editor extension
 */
function customTheme(config) {
    return [
        customThemeConfig.of(config),
        view_dist.EditorView.editorAttributes.of(setEditorStyle)
    ];
}
//# sourceMappingURL=customStyle.js.map
// EXTERNAL MODULE: ./node_modules/@lezer/common/dist/index.js
var common_dist = __webpack_require__(41113);
// EXTERNAL MODULE: ./node_modules/@lezer/highlight/dist/index.js
var highlight_dist = __webpack_require__(35524);
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/extensions/ipython-md.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


// Mathematical expression delimiters
const INLINE_MATH_DOLLAR = 'InlineMathDollar';
const INLINE_MATH_BRACKET = 'InlineMathBracket';
const BLOCK_MATH_DOLLAR = 'BlockMathDollar';
const BLOCK_MATH_BRACKET = 'BlockMathBracket';
/**
 * Lengh of the delimiter for a math expression
 */
const DELIMITER_LENGTH = {
    [INLINE_MATH_DOLLAR]: 1,
    [INLINE_MATH_BRACKET]: 3,
    [BLOCK_MATH_DOLLAR]: 2,
    [BLOCK_MATH_BRACKET]: 3
};
/**
 * Delimiters for math expressions
 */
// Delimiters must be defined as constant because they are used in object match tests
const DELIMITERS = Object.keys(DELIMITER_LENGTH).reduce((agg, name) => {
    agg[name] = { mark: `${name}Mark`, resolve: name };
    return agg;
}, {});
/**
 * Define an IPython mathematical expression parser for Markdown.
 *
 * @param latexParser CodeMirror {@link Parser} for LaTeX mathematical expression
 * @returns Markdown extension
 */
function parseMathIPython(latexParser) {
    const defineNodes = new Array();
    Object.keys(DELIMITER_LENGTH).forEach(name => {
        defineNodes.push({
            name,
            style: highlight_dist.tags.emphasis
        }, { name: `${name}Mark`, style: highlight_dist.tags.processingInstruction });
    });
    return {
        defineNodes,
        parseInline: [
            {
                name: BLOCK_MATH_DOLLAR,
                parse(cx, next, pos) {
                    if (next != 36 /* '$' */ || cx.char(pos + 1) != 36) {
                        return -1;
                    }
                    return cx.addDelimiter(DELIMITERS[BLOCK_MATH_DOLLAR], pos, pos + DELIMITER_LENGTH[BLOCK_MATH_DOLLAR], true, true);
                }
            },
            {
                name: INLINE_MATH_DOLLAR,
                parse(cx, next, pos) {
                    if (next != 36 /* '$' */ || cx.char(pos + 1) == 36) {
                        return -1;
                    }
                    return cx.addDelimiter(DELIMITERS[INLINE_MATH_DOLLAR], pos, pos + DELIMITER_LENGTH[INLINE_MATH_DOLLAR], true, true);
                }
            },
            // Inline expression wrapped in \\( ... \\)
            {
                name: INLINE_MATH_BRACKET,
                before: 'Escape',
                parse(cx, next, pos) {
                    if (next != 92 /* '\' */ ||
                        cx.char(pos + 1) != 92 ||
                        ![40 /* '(' */, 41 /* ')' */].includes(cx.char(pos + 2))) {
                        return -1;
                    }
                    return cx.addDelimiter(DELIMITERS[INLINE_MATH_BRACKET], pos, pos + DELIMITER_LENGTH[INLINE_MATH_BRACKET], cx.char(pos + 2) == 40, cx.char(pos + 2) == 41);
                }
            },
            // Block expression wrapped in \\[ ... \\]
            {
                name: BLOCK_MATH_BRACKET,
                before: 'Escape',
                parse(cx, next, pos) {
                    if (next != 92 /* '\' */ ||
                        cx.char(pos + 1) != 92 ||
                        ![91 /* '[' */, 93 /* ']' */].includes(cx.char(pos + 2))) {
                        return -1;
                    }
                    return cx.addDelimiter(DELIMITERS[BLOCK_MATH_BRACKET], pos, pos + DELIMITER_LENGTH[BLOCK_MATH_BRACKET], cx.char(pos + 2) == 91, cx.char(pos + 2) == 93);
                }
            }
        ],
        wrap: latexParser
            ? (0,common_dist.parseMixed)((node, input) => {
                // Test if the node type is one of the math expression
                const delimiterLength = DELIMITER_LENGTH[node.type.name];
                if (delimiterLength) {
                    return {
                        parser: latexParser,
                        // Remove delimiter from LaTeX parser otherwise it won't be highlighted
                        overlay: [
                            {
                                from: node.from + delimiterLength,
                                to: node.to - delimiterLength
                            }
                        ]
                    };
                }
                return null;
            })
            : undefined
    };
}
//# sourceMappingURL=ipython-md.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/extensions/rulers.js
/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */
// Inspired by https://discuss.codemirror.net/t/how-to-implement-ruler/4616/



const RULERS_CLASSNAME = 'cm-rulers';
/**
 * Rulers style
 */
const baseTheme = view_dist.EditorView.baseTheme({
    [`.${RULERS_CLASSNAME}`]: { borderRight: '1px dotted gray', opacity: 0.7 }
});
/**
 * Rulers facet
 */
const rulerConfig = state_dist.Facet.define({
    // Merge all unique values
    combine(value) {
        const final = value.reduce((agg, arr) => agg.concat(
        // Check value is not in aggregate nor multiple time in the array.
        arr.filter((v, idx) => !agg.includes(v) && idx == arr.lastIndexOf(v))), []);
        return final;
    }
});
/**
 * View plugin displaying the rulers
 */
const rulers_plugin = view_dist.ViewPlugin.fromClass(class {
    constructor(view) {
        var _a, _b;
        this.rulersContainer = view.dom.appendChild(document.createElement('div'));
        this.rulersContainer.style.cssText = `
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
            `;
        const defaultCharacterWidth = view.defaultCharacterWidth;
        const widths = view.state.facet(rulerConfig);
        const guttersWidths = (_b = (_a = view.scrollDOM.querySelector('.cm-gutters')) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 0;
        this.rulers = widths.map(width => {
            const ruler = this.rulersContainer.appendChild(document.createElement('div'));
            ruler.classList.add(RULERS_CLASSNAME);
            ruler.style.cssText = `
                position: absolute;
                left: ${guttersWidths + width * defaultCharacterWidth}px;
                height: 100%;
            `;
            // FIXME: This should be equal to the amount of padding on a line.
            // This value should be extracted from CodeMirror rather than hardcoded.
            ruler.style.width = '6px';
            return ruler;
        });
    }
    update(update) {
        var _a, _b;
        const widths = update.view.state.facet(rulerConfig);
        if (update.viewportChanged ||
            update.geometryChanged ||
            !index_es6.JSONExt.deepEqual(widths, update.startState.facet(rulerConfig))) {
            const guttersWidth = (_b = (_a = update.view.scrollDOM.querySelector('.cm-gutters')) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 0;
            const defaultCharacterWidth = update.view.defaultCharacterWidth;
            this.rulers.forEach((ruler, rulerIdx) => {
                ruler.style.left = `${guttersWidth + widths[rulerIdx] * defaultCharacterWidth}px`;
            });
        }
    }
    destroy() {
        this.rulers.forEach(ruler => {
            ruler.remove();
        });
        this.rulersContainer.remove();
    }
});
/**
 * Extension for CodeMirror 6 displaying rulers.
 *
 * @param value Rulers position
 * @returns CodeMirror 6 extension
 */
function rulers(value) {
    return [baseTheme, rulerConfig.of(value), rulers_plugin];
}
//# sourceMappingURL=rulers.js.map
// EXTERNAL MODULE: ./node_modules/yjs/dist/yjs.mjs + 12 modules
var yjs = __webpack_require__(18372);
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/extensions/ybinding.js
/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 *
 * Binding for yjs and codemirror
 *
 * It is a simplification of https://github.com/yjs/y-codemirror.next
 * licensed under MIT License by Kevin Jahns
 */



/**
 * Defines a range on text using relative positions that can be transformed back to
 * absolute positions. (https://docs.yjs.dev/api/relative-positions)
 */
class YRange {
    /**
     * @param yanchor
     * @param yhead
     */
    constructor(yanchor, yhead) {
        this.yanchor = yanchor;
        this.yhead = yhead;
    }
    /**
     * Convert the position to JSON
     */
    toJSON() {
        return {
            yanchor: (0,yjs.relativePositionToJSON)(this.yanchor),
            yhead: (0,yjs.relativePositionToJSON)(this.yhead)
        };
    }
    /**
     * Convert a JSON range to a YRange
     * @param json Range to convert
     * @return The range as YRange
     */
    static fromJSON(json) {
        return new YRange((0,yjs.createRelativePositionFromJSON)(json.yanchor), (0,yjs.createRelativePositionFromJSON)(json.yhead));
    }
}
/**
 * Yjs binding configuration
 */
class YSyncConfig {
    /**
     * Create a new binding configuration
     *
     * @param ytext Yjs text to synchronize
     */
    constructor(ytext) {
        this.ytext = ytext;
    }
    /**
     * Helper function to transform an absolute index position to a Yjs-based relative position
     * (https://docs.yjs.dev/api/relative-positions).
     *
     * A relative position can be transformed back to an absolute position even after the document has changed. The position is
     * automatically adapted. This does not require any position transformations. Relative positions are computed based on
     * the internal Yjs document model. Peers that share content through Yjs are guaranteed that their positions will always
     * synced up when using relative positions.
     *
     * ```js
     * import { ySyncFacet } from 'y-codemirror'
     *
     * ..
     * const ysync = view.state.facet(ySyncFacet)
     * // transform an absolute index position to a ypos
     * const ypos = ysync.getYPos(3)
     * // transform the ypos back to an absolute position
     * ysync.fromYPos(ypos) // => 3
     * ```
     *
     * It cannot be guaranteed that absolute index positions can be synced up between peers.
     * This might lead to undesired behavior when implementing features that require that all peers see the
     * same marked range (e.g. a comment plugin).
     *
     * @param pos
     * @param assoc
     */
    toYPos(pos, assoc = 0) {
        return (0,yjs.createRelativePositionFromTypeIndex)(this.ytext, pos, assoc);
    }
    /**
     * @param rpos
     */
    fromYPos(rpos) {
        const pos = (0,yjs.createAbsolutePositionFromRelativePosition)((0,yjs.createRelativePositionFromJSON)(rpos), this.ytext.doc);
        if (pos == null || pos.type !== this.ytext) {
            throw new Error('[y-codemirror] The position you want to retrieve was created by a different document');
        }
        return {
            pos: pos.index,
            assoc: pos.assoc
        };
    }
    /**
     * @param range
     * @return
     */
    toYRange(range) {
        const assoc = range.assoc;
        const yanchor = this.toYPos(range.anchor, assoc);
        const yhead = this.toYPos(range.head, assoc);
        return new YRange(yanchor, yhead);
    }
    /**
     * @param yrange
     */
    fromYRange(yrange) {
        const anchor = this.fromYPos(yrange.yanchor);
        const head = this.fromYPos(yrange.yhead);
        if (anchor.pos === head.pos) {
            return state_dist.EditorSelection.cursor(head.pos, head.assoc);
        }
        return state_dist.EditorSelection.range(anchor.pos, head.pos);
    }
}
/**
 * Yjs binding facet
 */
const ySyncFacet = state_dist.Facet.define({
    combine(inputs) {
        return inputs[inputs.length - 1];
    }
});
/**
 * Yjs binding annotation
 *
 * It is used to track the origin of the document changes
 */
const ySyncAnnotation = state_dist.Annotation.define();
/**
 * Yjs binding view plugin to synchronize the
 * editor state with the Yjs document.
 */
const ySync = view_dist.ViewPlugin.fromClass(class {
    constructor(view) {
        this.conf = view.state.facet(ySyncFacet);
        this._observer = (event, tr) => {
            var _a;
            if (tr.origin !== this.conf) {
                const delta = event.delta;
                const changes = [];
                let pos = 0;
                for (let i = 0; i < delta.length; i++) {
                    const d = delta[i];
                    if (d.insert != null) {
                        changes.push({ from: pos, to: pos, insert: d.insert });
                    }
                    else if (d.delete != null) {
                        changes.push({ from: pos, to: pos + d.delete, insert: '' });
                        pos += d.delete;
                    }
                    else {
                        pos += (_a = d.retain) !== null && _a !== void 0 ? _a : 0;
                    }
                }
                view.dispatch({
                    changes,
                    // Specified the changes origin to not loop when synchronizing
                    annotations: [ySyncAnnotation.of(this.conf)]
                });
            }
        };
        this._ytext = this.conf.ytext;
        this._ytext.observe(this._observer);
    }
    update(update) {
        if (!update.docChanged ||
            (update.transactions.length > 0 &&
                update.transactions[0].annotation(ySyncAnnotation) === this.conf)) {
            return;
        }
        const ytext = this.conf.ytext;
        ytext.doc.transact(() => {
            /**
             * This variable adjusts the fromA position to the current position in the Y.Text type.
             */
            let adj = 0;
            update.changes.iterChanges((fromA, toA, fromB, toB, insert) => {
                const insertText = insert.sliceString(0, insert.length, '\n');
                if (fromA !== toA) {
                    ytext.delete(fromA + adj, toA - fromA);
                }
                if (insertText.length > 0) {
                    ytext.insert(fromA + adj, insertText);
                }
                adj += insertText.length - (toA - fromA);
            });
            // Set the configuration as origin to not loop when synchronizing
        }, this.conf);
    }
    destroy() {
        this._ytext.unobserve(this._observer);
    }
});
/**
 * Extension for CodeMirror 6 binding the Yjs text (source of truth)
 * and the editor state.
 *
 * @param ytext Yjs text to bind
 * @param undoManager Yjs text undo manager
 * @returns CodeMirror 6 extension
 */
function ybinding({ ytext, undoManager }) {
    const ySyncConfig = new YSyncConfig(ytext);
    // We don't need the undo manager extension as in y-codemirror.next
    // because we deal with undo/redo with our own keyboard shortcut mechanism.
    return [
        ySyncFacet.of(ySyncConfig),
        ySync,
        // We need to add a new origin to the undo manager to ensure text updates
        // are tracked.
        undoManager
            ? view_dist.ViewPlugin.define(() => {
                undoManager.addTrackedOrigin(ySyncConfig);
                return {
                    destroy: () => {
                        undoManager.removeTrackedOrigin(ySyncConfig);
                    }
                };
            })
            : []
    ];
}
//# sourceMappingURL=ybinding.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/extensions/index.js
/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */




//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@codemirror/search/dist/index.js + 1 modules
var search_dist = __webpack_require__(12608);
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/extension.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.











/**
 * The class name added to read only editor widgets.
 */
const READ_ONLY_CLASS = 'jp-mod-readOnly';
/**
 * Editor configuration handler
 *
 * It stores the editor configuration and the editor extensions.
 * It also allows to inject new extensions into an editor.
 */
class ExtensionsHandler {
    constructor({ baseConfiguration, config, defaultExtensions } = {}) {
        this._configChanged = new dist_index_es6.Signal(this);
        this._disposed = new dist_index_es6.Signal(this);
        this._isDisposed = false;
        this._immutables = new Set();
        this._baseConfig = baseConfiguration !== null && baseConfiguration !== void 0 ? baseConfiguration : {};
        this._config = config !== null && config !== void 0 ? config : {};
        this._configurableBuilderMap = new Map(defaultExtensions);
        const configurables = Object.keys(this._config).concat(Object.keys(this._baseConfig));
        this._immutables = new Set([...this._configurableBuilderMap.keys()].filter(key => !configurables.includes(key)));
    }
    /**
     * Signal triggered when the editor configuration changes.
     * It provides the mapping of the new configuration (only those that changed).
     *
     * It should result in a call to `IExtensionsHandler.reconfigureExtensions`.
     */
    get configChanged() {
        return this._configChanged;
    }
    /**
     * A signal emitted when the object is disposed.
     */
    get disposed() {
        return this._disposed;
    }
    /**
     * Tests whether the object is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the object.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._disposed.emit();
        dist_index_es6.Signal.clearData(this);
    }
    /**
     * Get a config option for the editor.
     */
    getOption(option) {
        var _a;
        return (_a = this._config[option]) !== null && _a !== void 0 ? _a : this._baseConfig[option];
    }
    /**
     * Whether the option exists or not.
     */
    hasOption(option) {
        return (Object.keys(this._config).includes(option) ||
            Object.keys(this._baseConfig).includes(option));
    }
    /**
     * Set a config option for the editor.
     *
     * You will need to reconfigure the editor extensions by listening
     * to `IExtensionsHandler.configChanged`.
     */
    setOption(option, value) {
        // Don't bother setting the option if it is already the same.
        if (this._config[option] !== value) {
            this._config[option] = value;
            this._configChanged.emit({ [option]: value });
        }
    }
    /**
     * Set a base config option for the editor.
     *
     * You will need to reconfigure the editor extensions by listening
     * to `IExtensionsHandler.configChanged`.
     */
    setBaseOptions(options) {
        const changed = this._getChangedOptions(options, this._baseConfig);
        if (changed.length > 0) {
            this._baseConfig = options;
            const customizedKeys = Object.keys(this._config);
            const notOverridden = changed.filter(k => !customizedKeys.includes(k));
            if (notOverridden.length > 0) {
                this._configChanged.emit(notOverridden.reduce((agg, key) => {
                    agg[key] = this._baseConfig[key];
                    return agg;
                }, {}));
            }
        }
    }
    /**
     * Set config options for the editor.
     *
     * You will need to reconfigure the editor extensions by listening
     * to `EditorHandler.configChanged`.
     *
     * This method is preferred when setting several options. The
     * options are set within an operation, which only performs
     * the costly update at the end, and not after every option
     * is set.
     */
    setOptions(options) {
        const changed = this._getChangedOptions(options, this._config);
        if (changed.length > 0) {
            this._config = { ...options };
            this._configChanged.emit(changed.reduce((agg, key) => {
                var _a;
                agg[key] = (_a = this._config[key]) !== null && _a !== void 0 ? _a : this._baseConfig[key];
                return agg;
            }, {}));
        }
    }
    /**
     * Reconfigures the extension mapped with key with the provided value.
     *
     * @param view Editor view
     * @param key Parameter unique key
     * @param value Parameter value to be applied
     */
    reconfigureExtension(view, key, value) {
        const effect = this.getEffect(view.state, key, value);
        if (effect) {
            view.dispatch({
                effects: [effect]
            });
        }
    }
    /**
     * Reconfigures all the extensions mapped with the options from the
     * provided partial configuration.
     *
     * @param view Editor view
     * @param configuration Editor configuration
     */
    reconfigureExtensions(view, configuration) {
        const effects = Object.keys(configuration)
            .filter(key => this.has(key))
            .map(key => this.getEffect(view.state, key, configuration[key]));
        view.dispatch({
            effects: effects.filter(effect => effect !== null)
        });
    }
    /**
     * Appends extensions to the top-level configuration of the
     * editor.
     *
     * Injected extension cannot be removed.
     *
     * ### Notes
     * You should prefer registering a IEditorExtensionFactory instead
     * of this feature.
     *
     * @alpha
     * @param view Editor view
     * @param extension Editor extension to inject
     */
    injectExtension(view, extension) {
        view.dispatch({
            effects: state_dist.StateEffect.appendConfig.of(extension)
        });
    }
    /**
     * Returns the list of initial extensions of an editor
     * based on the configuration.
     *
     * @returns The initial editor extensions
     */
    getInitialExtensions() {
        const configuration = { ...this._baseConfig, ...this._config };
        const extensions = [...this._immutables]
            .map(key => { var _a; return (_a = this.get(key)) === null || _a === void 0 ? void 0 : _a.instance(undefined); })
            .filter(ext => ext);
        for (const k of Object.keys(configuration)) {
            const builder = this.get(k);
            if (builder) {
                const value = configuration[k];
                extensions.push(builder.instance(value));
            }
        }
        return extensions;
    }
    /**
     * Get a extension builder
     * @param key Extension unique identifier
     * @returns The extension builder
     */
    get(key) {
        return this._configurableBuilderMap.get(key);
    }
    /**
     * Whether the editor has an extension for the identifier.
     *
     * @param key Extension unique identifier
     * @returns Extension existence
     */
    has(key) {
        return this._configurableBuilderMap.has(key);
    }
    getEffect(state, key, value) {
        var _a;
        const builder = this.get(key);
        return (_a = builder === null || builder === void 0 ? void 0 : builder.reconfigure(value)) !== null && _a !== void 0 ? _a : null;
    }
    _getChangedOptions(newConfig, oldConfig) {
        const changed = new Array();
        const newKeys = new Array();
        for (const [key, value] of Object.entries(newConfig)) {
            newKeys.push(key);
            if (oldConfig[key] !== value) {
                changed.push(key);
            }
        }
        // Add removed old keys
        changed.push(...Object.keys(oldConfig).filter(k => !newKeys.includes(k)));
        return changed;
    }
}
/**
 * CodeMirror extensions registry
 */
class EditorExtensionRegistry {
    constructor() {
        this.configurationBuilder = new Map();
        this.configurationSchema = {};
        this.defaultOptions = {};
        this.handlers = new Set();
        this.immutableExtensions = new Set();
        this._baseConfiguration = {};
    }
    /**
     * Base editor configuration
     *
     * This is the default configuration optionally modified by the user;
     * e.g. through user settings.
     */
    get baseConfiguration() {
        return { ...this.defaultOptions, ...this._baseConfiguration };
    }
    set baseConfiguration(v) {
        if (!index_es6.JSONExt.deepEqual(v, this._baseConfiguration)) {
            this._baseConfiguration = v;
            for (const handler of this.handlers) {
                handler.setBaseOptions(this.baseConfiguration);
            }
        }
    }
    /**
     * Default editor configuration
     *
     * This is the default configuration as defined when extensions
     * are registered.
     */
    get defaultConfiguration() {
        // Only options with schema should be JSON serializable
        // So we cannot use `JSONExt.deepCopy` on the default options.
        return Object.freeze({ ...this.defaultOptions });
    }
    /**
     * Editor configuration JSON schema
     */
    get settingsSchema() {
        return Object.freeze(index_es6.JSONExt.deepCopy(this.configurationSchema));
    }
    /**
     * Add a default editor extension
     *
     * @template T Extension parameter type
     * @param factory Extension factory
     */
    addExtension(factory) {
        var _a;
        if (this.configurationBuilder.has(factory.name)) {
            throw new Error(`Extension named ${factory.name} is already registered.`);
        }
        this.configurationBuilder.set(factory.name, factory);
        if (typeof factory.default != 'undefined') {
            this.defaultOptions[factory.name] = factory.default;
        }
        if (factory.schema) {
            this.configurationSchema[factory.name] = {
                default: (_a = factory.default) !== null && _a !== void 0 ? _a : null,
                ...factory.schema
            };
            this.defaultOptions[factory.name] =
                this.configurationSchema[factory.name].default;
        }
    }
    /**
     * Create a new extensions handler for an editor
     *
     * @param options Extensions options and initial editor configuration
     */
    createNew(options) {
        const configuration = new Array();
        for (const [key, builder] of this.configurationBuilder.entries()) {
            const extension = builder.factory(options);
            if (extension) {
                configuration.push([key, extension]);
            }
        }
        const handler = new ExtensionsHandler({
            baseConfiguration: this.baseConfiguration,
            config: options.config,
            defaultExtensions: configuration
        });
        this.handlers.add(handler);
        handler.disposed.connect(() => {
            this.handlers.delete(handler);
        });
        return handler;
    }
}
/**
 * Editor extension registry namespace
 */
(function (EditorExtensionRegistry) {
    /**
     * Dynamically configurable editor extension.
     */
    class ConfigurableExtension {
        /**
         * Create a dynamic editor extension.
         *
         * @param builder Extension builder
         */
        constructor(builder) {
            this._compartment = new state_dist.Compartment();
            this._builder = builder;
        }
        /**
         * Create an editor extension for the provided value.
         *
         * @param value Editor extension parameter value
         * @returns The editor extension
         */
        instance(value) {
            return this._compartment.of(this._builder(value));
        }
        /**
         * Reconfigure an editor extension.
         *
         * @param value Editor extension value
         * @returns Editor state effect
         */
        reconfigure(value) {
            return this._compartment.reconfigure(this._builder(value));
        }
    }
    /**
     * Immutable editor extension class
     */
    class ImmutableExtension {
        /**
         * Create an immutable editor extension.
         *
         * @param extension Extension
         */
        constructor(extension) {
            this._extension = extension;
        }
        /**
         * Create an editor extension.
         *
         * @returns The editor extension
         */
        instance() {
            return this._extension;
        }
        /**
         * Reconfigure an editor extension.
         *
         * This is a no-op
         */
        reconfigure() {
            // This is a no-op
            return null;
        }
    }
    /**
     * Creates a dynamically configurable editor extension.
     *
     * @param builder Extension builder
     * @return The extension
     */
    function createConfigurableExtension(builder) {
        return new ConfigurableExtension(builder);
    }
    EditorExtensionRegistry.createConfigurableExtension = createConfigurableExtension;
    /**
     * Creates a configurable extension returning
     * one of two extensions depending on a boolean value.
     *
     * @param truthy Extension to apply when the parameter is true
     * @param falsy Extension to apply when the parameter is false
     * @return The extension
     */
    function createConditionalExtension(truthy, falsy = []) {
        return new ConfigurableExtension(value => value ? truthy : falsy);
    }
    EditorExtensionRegistry.createConditionalExtension = createConditionalExtension;
    /**
     * Creates an immutable extension.
     *
     * @param extension Immutable extension
     * @return The extension
     */
    function createImmutableExtension(extension) {
        return new ImmutableExtension(extension);
    }
    EditorExtensionRegistry.createImmutableExtension = createImmutableExtension;
    /**
     * Get the default editor extensions.
     *
     * @returns CodeMirror 6 extension factories
     */
    function getDefaultExtensions(options = {}) {
        const { themes, translator } = options;
        const trans = (translator !== null && translator !== void 0 ? translator : lib.nullTranslator).load('jupyterlab');
        const extensions = [
            Object.freeze({
                name: 'autoClosingBrackets',
                default: false,
                factory: () => createConditionalExtension((0,autocomplete_dist.closeBrackets)()),
                schema: {
                    type: 'boolean',
                    title: trans.__('Auto Closing Brackets')
                }
            }),
            Object.freeze({
                name: 'codeFolding',
                default: false,
                factory: () => createConditionalExtension((0,language_dist.foldGutter)()),
                schema: {
                    type: 'boolean',
                    title: trans.__('Code Folding')
                }
            }),
            Object.freeze({
                name: 'cursorBlinkRate',
                default: 1200,
                factory: () => createConfigurableExtension((value) => (0,view_dist.drawSelection)({ cursorBlinkRate: value })),
                schema: {
                    type: 'number',
                    title: trans.__('Cursor blinking rate'),
                    description: trans.__('Half-period in milliseconds used for cursor blinking. The default blink rate is 1200ms. By setting this to zero, blinking can be disabled.')
                }
            }),
            Object.freeze({
                name: 'highlightActiveLine',
                default: false,
                factory: () => createConditionalExtension((0,view_dist.highlightActiveLine)()),
                schema: {
                    type: 'boolean',
                    title: trans.__('Highlight the active line')
                }
            }),
            Object.freeze({
                name: 'highlightSpecialCharacters',
                default: true,
                factory: () => createConditionalExtension((0,view_dist.highlightSpecialChars)()),
                schema: {
                    type: 'boolean',
                    title: trans.__('Highlight special characters')
                }
            }),
            Object.freeze({
                name: 'highlightTrailingWhitespace',
                default: false,
                factory: () => createConditionalExtension((0,view_dist.highlightTrailingWhitespace)()),
                schema: {
                    type: 'boolean',
                    title: trans.__('Highlight trailing white spaces')
                }
            }),
            Object.freeze({
                name: 'highlightWhitespace',
                default: false,
                factory: () => createConditionalExtension((0,view_dist.highlightWhitespace)()),
                schema: {
                    type: 'boolean',
                    title: trans.__('Highlight white spaces')
                }
            }),
            Object.freeze({
                name: 'indentUnit',
                default: '4',
                factory: () => createConfigurableExtension((value) => value == 'Tab'
                    ? language_dist.indentUnit.of('\t')
                    : language_dist.indentUnit.of(' '.repeat(parseInt(value, 10)))),
                schema: {
                    type: 'string',
                    title: trans.__('Indentation unit'),
                    description: trans.__('The indentation is a `Tab` or the number of spaces. This defaults to 4 spaces.'),
                    enum: ['Tab', '1', '2', '4', '8']
                }
            }),
            // Default keyboard shortcuts
            // TODO at some point we may want to get this configurable
            Object.freeze({
                name: 'keymap',
                default: [
                    {
                        key: 'Mod-Enter',
                        run: StateCommands.preventNewLineOnRun
                    },
                    {
                        key: 'Enter',
                        run: StateCommands.completerOrInsertNewLine
                    },
                    ...dist.defaultKeymap,
                    {
                        key: 'Tab',
                        run: StateCommands.indentMoreOrInsertTab,
                        shift: dist.indentLess
                    }
                ],
                factory: () => createConfigurableExtension(value => view_dist.keymap.of(value))
            }),
            Object.freeze({
                name: 'lineNumbers',
                default: true,
                factory: () => createConditionalExtension((0,view_dist.lineNumbers)()),
                schema: {
                    type: 'boolean',
                    title: trans.__('Line Numbers')
                }
            }),
            Object.freeze({
                name: 'lineWrap',
                factory: () => createConditionalExtension(view_dist.EditorView.lineWrapping),
                default: true,
                schema: {
                    type: 'boolean',
                    title: trans.__('Line Wrap')
                }
            }),
            Object.freeze({
                name: 'matchBrackets',
                default: true,
                factory: () => createConditionalExtension([
                    (0,language_dist.bracketMatching)(),
                    // closeBracketsKeymap must have higher precedence over defaultKeymap
                    state_dist.Prec.high(view_dist.keymap.of(autocomplete_dist.closeBracketsKeymap))
                ]),
                schema: {
                    type: 'boolean',
                    title: trans.__('Match Brackets')
                }
            }),
            Object.freeze({
                name: 'rectangularSelection',
                default: true,
                factory: () => createConditionalExtension([
                    (0,view_dist.rectangularSelection)(),
                    (0,view_dist.crosshairCursor)()
                ]),
                schema: {
                    type: 'boolean',
                    title: trans.__('Rectangular selection'),
                    description: trans.__('Rectangular (block) selection can be created by dragging the mouse pointer while holding the left mouse button and the Alt key. When the Alt key is pressed, a crosshair cursor will appear, indicating that the rectangular selection mode is active.')
                }
            }),
            Object.freeze({
                name: 'readOnly',
                default: false,
                factory: () => createConfigurableExtension((value) => [
                    state_dist.EditorState.readOnly.of(value),
                    value
                        ? view_dist.EditorView.editorAttributes.of({ class: READ_ONLY_CLASS })
                        : []
                ])
            }),
            Object.freeze({
                name: 'rulers',
                default: [],
                factory: () => createConfigurableExtension((value) => value.length > 0 ? rulers(value) : []),
                schema: {
                    type: 'array',
                    title: trans.__('Rulers'),
                    items: {
                        type: 'number',
                        minimum: 0
                    }
                }
            }),
            Object.freeze({
                name: 'extendSelection',
                default: true,
                factory: () => createConditionalExtension(view_dist.keymap.of([
                    {
                        key: 'Mod-Shift-l',
                        run: search_dist.selectSelectionMatches,
                        preventDefault: true
                    },
                    { key: 'Mod-d', run: search_dist.selectNextOccurrence, preventDefault: true }
                ]))
            }),
            Object.freeze({
                // Whether to activate the native CodeMirror search panel or not.
                name: 'searchWithCM',
                default: false,
                factory: () => createConditionalExtension(view_dist.keymap.of([
                    {
                        key: 'Mod-f',
                        run: search_dist.openSearchPanel,
                        scope: 'editor search-panel'
                    },
                    {
                        key: 'F3',
                        run: search_dist.findNext,
                        shift: search_dist.findPrevious,
                        scope: 'editor search-panel',
                        preventDefault: true
                    },
                    {
                        key: 'Mod-g',
                        run: search_dist.findNext,
                        shift: search_dist.findPrevious,
                        scope: 'editor search-panel',
                        preventDefault: true
                    },
                    {
                        key: 'Escape',
                        run: search_dist.closeSearchPanel,
                        scope: 'editor search-panel'
                    }
                ]))
            }),
            Object.freeze({
                name: 'scrollPastEnd',
                default: false,
                factory: (options) => options.inline ? null : createConditionalExtension((0,view_dist.scrollPastEnd)())
            }),
            Object.freeze({
                name: 'smartIndent',
                default: true,
                factory: () => createConditionalExtension((0,language_dist.indentOnInput)()),
                schema: {
                    type: 'boolean',
                    title: trans.__('Smart Indentation')
                }
            }),
            /**
             * tabFocusable
             *
             * Can the user use the tab key to focus on / enter the CodeMirror editor?
             * If this is false, the CodeMirror editor can still be focused (via
             * mouse-click, for example), just not via tab key navigation.
             *
             * It can be useful to set tabFocusable to false when the editor is
             * embedded in a context that provides an alternative to the tab key for
             * navigation. For example, the Notebook widget allows the user to move
             * from one cell to another using the up and down arrow keys and to enter
             * and exit the CodeMirror editor associated with that cell by pressing
             * the enter and escape keys, respectively.
             */
            Object.freeze({
                name: 'tabFocusable',
                // The default for this needs to be true because the CodeMirror editor
                // is used in lots of different places. By default, a user should be
                // able to tab into a CodeMirror editor on the page, and by default, the
                // user should be able to get out of the editor by pressing the escape
                // key then immediately pressing the tab key (or shift+tab to go
                // backwards on the page). If there are places in the app where this
                // model of user interaction doesn't make sense or is broken, those
                // places should be remedied on a case-by-case basis, **not** by making
                // `tabFocusable` false by default.
                default: true,
                factory: () => createConditionalExtension(view_dist.EditorView.contentAttributes.of({
                    tabIndex: '0'
                }), view_dist.EditorView.contentAttributes.of({
                    tabIndex: '-1'
                }))
            }),
            Object.freeze({
                name: 'tabSize',
                default: 4,
                factory: () => createConfigurableExtension((value) => state_dist.EditorState.tabSize.of(value)),
                schema: {
                    type: 'number',
                    title: trans.__('Tab size')
                }
            }),
            Object.freeze({
                name: 'tooltips',
                factory: () => 
                // we need `absolute` due to use of `contain: layout` in lumino;
                // we attach to body to ensure cursor collaboration tooltip is
                // visible in first line of the editor.
                createImmutableExtension((0,view_dist.tooltips)({
                    position: 'absolute',
                    parent: document.body
                }))
            }),
            Object.freeze({
                name: 'allowMultipleSelections',
                default: true,
                factory: () => createConfigurableExtension((value) => state_dist.EditorState.allowMultipleSelections.of(value)),
                schema: {
                    type: 'boolean',
                    title: trans.__('Multiple selections')
                }
            }),
            Object.freeze({
                name: 'customStyles',
                factory: () => createConfigurableExtension(config => customTheme(config)),
                default: {
                    fontFamily: null,
                    fontSize: null,
                    lineHeight: null
                },
                schema: {
                    title: trans.__('Custom editor styles'),
                    type: 'object',
                    properties: {
                        fontFamily: {
                            type: ['string', 'null'],
                            title: trans.__('Font Family')
                        },
                        fontSize: {
                            type: ['number', 'null'],
                            minimum: 1,
                            maximum: 100,
                            title: trans.__('Font Size')
                        },
                        lineHeight: {
                            type: ['number', 'null'],
                            title: trans.__('Line Height')
                        }
                    },
                    additionalProperties: false
                }
            })
        ];
        if (themes) {
            extensions.push(Object.freeze({
                name: 'theme',
                default: 'jupyter',
                factory: () => createConfigurableExtension(value => themes.getTheme(value)),
                schema: {
                    type: 'string',
                    title: trans.__('Theme'),
                    description: trans.__('CodeMirror theme')
                }
            }));
        }
        if (translator) {
            extensions.push(Object.freeze({
                name: 'translation',
                // The list of internal strings is available at https://codemirror.net/examples/translate/
                default: {
                    // @codemirror/view
                    'Control character': trans.__('Control character'),
                    // @codemirror/commands
                    'Selection deleted': trans.__('Selection deleted'),
                    // @codemirror/language
                    'Folded lines': trans.__('Folded lines'),
                    'Unfolded lines': trans.__('Unfolded lines'),
                    to: trans.__('to'),
                    'folded code': trans.__('folded code'),
                    unfold: trans.__('unfold'),
                    'Fold line': trans.__('Fold line'),
                    'Unfold line': trans.__('Unfold line'),
                    // @codemirror/search
                    'Go to line': trans.__('Go to line'),
                    go: trans.__('go'),
                    Find: trans.__('Find'),
                    Replace: trans.__('Replace'),
                    next: trans.__('next'),
                    previous: trans.__('previous'),
                    all: trans.__('all'),
                    'match case': trans.__('match case'),
                    replace: trans.__('replace'),
                    'replace all': trans.__('replace all'),
                    close: trans.__('close'),
                    'current match': trans.__('current match'),
                    'replaced $ matches': trans.__('replaced $ matches'),
                    'replaced match on line $': trans.__('replaced match on line $'),
                    'on line': trans.__('on line'),
                    // @codemirror/autocomplete
                    Completions: trans.__('Completions'),
                    // @codemirror/lint
                    Diagnostics: trans.__('Diagnostics'),
                    'No diagnostics': trans.__('No diagnostics')
                },
                factory: () => createConfigurableExtension(value => state_dist.EditorState.phrases.of(value))
            }));
        }
        return extensions;
    }
    EditorExtensionRegistry.getDefaultExtensions = getDefaultExtensions;
})(EditorExtensionRegistry || (EditorExtensionRegistry = {}));
//# sourceMappingURL=extension.js.map
// EXTERNAL MODULE: ./node_modules/@jupyterlab/codeeditor/lib/mimetype.js
var lib_mimetype = __webpack_require__(37892);
// EXTERNAL MODULE: ./node_modules/@jupyterlab/coreutils/lib/index.js
var coreutils_lib = __webpack_require__(79622);
// EXTERNAL MODULE: ./node_modules/@lezer/generator/dist/index.js
var generator_dist = __webpack_require__(4097);
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/theme.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




const jupyterEditorTheme = view_dist.EditorView.theme({
    /**
     * CodeMirror themes are handling the background/color in this way. This works
     * fine for CodeMirror editors outside the notebook, but the notebook styles
     * these things differently.
     */
    '&': {
        background: 'var(--jp-layout-color0)',
        color: 'var(--jp-content-font-color1)'
    },
    /* In the notebook, we want this styling to be handled by its container */
    '.jp-CodeConsole &, .jp-Notebook &': {
        background: 'transparent'
    },
    '.cm-content': {
        caretColor: 'var(--jp-editor-cursor-color)'
    },
    /* Inherit font family from .cm-editor */
    '.cm-scroller': {
        fontFamily: 'inherit'
    },
    '.cm-cursor, .cm-dropCursor': {
        borderLeft: 'var(--jp-code-cursor-width0) solid var(--jp-editor-cursor-color)'
    },
    '.cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: 'var(--jp-editor-selected-background)'
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
        backgroundColor: 'var(--jp-editor-selected-focused-background)'
    },
    '.cm-gutters': {
        borderRight: '1px solid var(--jp-border-color2)',
        backgroundColor: 'var(--jp-layout-color2)'
    },
    '.cm-gutter': {
        backgroundColor: 'var(--jp-layout-color2)'
    },
    '.cm-activeLine': {
        backgroundColor: 'color-mix(in srgb, var(--jp-layout-color3) 25%, transparent)'
    },
    '.cm-lineNumbers': {
        color: 'var(--jp-ui-font-color2)'
    },
    '.cm-searchMatch': {
        backgroundColor: 'var(--jp-search-unselected-match-background-color)',
        color: 'var(--jp-search-unselected-match-color)'
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: 'var(--jp-search-selected-match-background-color) !important',
        color: 'var(--jp-search-selected-match-color) !important'
    },
    '.cm-tooltip': {
        backgroundColor: 'var(--jp-layout-color1)'
    }
});
// The list of available tags for syntax highlighting is available at
// https://lezer.codemirror.net/docs/ref/#highlight.tags
const jupyterHighlightStyle = language_dist.HighlightStyle.define([
    // Order matters - a rule will override the previous ones; important for example for in headings styles.
    { tag: highlight_dist.tags.meta, color: 'var(--jp-mirror-editor-meta-color)' },
    { tag: highlight_dist.tags.heading, color: 'var(--jp-mirror-editor-header-color)' },
    {
        tag: [highlight_dist.tags.heading1, highlight_dist.tags.heading2, highlight_dist.tags.heading3, highlight_dist.tags.heading4],
        color: 'var(--jp-mirror-editor-header-color)',
        fontWeight: 'bold'
    },
    {
        tag: highlight_dist.tags.keyword,
        color: 'var(--jp-mirror-editor-keyword-color)',
        fontWeight: 'bold'
    },
    { tag: highlight_dist.tags.atom, color: 'var(--jp-mirror-editor-atom-color)' },
    { tag: highlight_dist.tags.number, color: 'var(--jp-mirror-editor-number-color)' },
    {
        tag: [highlight_dist.tags.definition(highlight_dist.tags.name), highlight_dist.tags.function(highlight_dist.tags.definition(highlight_dist.tags.variableName))],
        color: 'var(--jp-mirror-editor-def-color)'
    },
    {
        tag: highlight_dist.tags.standard(highlight_dist.tags.variableName),
        color: 'var(--jp-mirror-editor-builtin-color)'
    },
    {
        tag: [highlight_dist.tags.special(highlight_dist.tags.variableName), highlight_dist.tags.self],
        color: 'var(--jp-mirror-editor-variable-2-color)'
    },
    { tag: highlight_dist.tags.punctuation, color: 'var(--jp-mirror-editor-punctuation-color)' },
    { tag: highlight_dist.tags.propertyName, color: 'var(--jp-mirror-editor-property-color)' },
    {
        tag: highlight_dist.tags.operator,
        color: 'var(--jp-mirror-editor-operator-color)',
        fontWeight: 'bold'
    },
    {
        tag: highlight_dist.tags.comment,
        color: 'var(--jp-mirror-editor-comment-color)',
        fontStyle: 'italic'
    },
    { tag: highlight_dist.tags.string, color: 'var(--jp-mirror-editor-string-color)' },
    {
        tag: [highlight_dist.tags.labelName, highlight_dist.tags.monospace, highlight_dist.tags.special(highlight_dist.tags.string)],
        color: 'var(--jp-mirror-editor-string-2-color)'
    },
    { tag: highlight_dist.tags.bracket, color: 'var(--jp-mirror-editor-bracket-color)' },
    { tag: highlight_dist.tags.tagName, color: 'var(--jp-mirror-editor-tag-color)' },
    { tag: highlight_dist.tags.attributeName, color: 'var(--jp-mirror-editor-attribute-color)' },
    { tag: highlight_dist.tags.quote, color: 'var(--jp-mirror-editor-quote-color)' },
    {
        tag: highlight_dist.tags.link,
        color: 'var(--jp-mirror-editor-link-color)',
        textDecoration: 'underline'
    },
    { tag: [highlight_dist.tags.separator, highlight_dist.tags.derefOperator, highlight_dist.tags.paren], color: '' },
    { tag: highlight_dist.tags.strong, fontWeight: 'bold' },
    { tag: highlight_dist.tags.emphasis, fontStyle: 'italic' },
    { tag: highlight_dist.tags.strikethrough, textDecoration: 'line-through' },
    {
        tag: highlight_dist.tags.bool,
        color: 'var(--jp-mirror-editor-keyword-color)',
        fontWeight: 'bold'
    }
]);
/**
 * JupyterLab CodeMirror 6 theme
 */
const jupyterTheme = [
    jupyterEditorTheme,
    (0,language_dist.syntaxHighlighting)(jupyterHighlightStyle)
];
/**
 * CodeMirror 6 theme registry
 */
class EditorThemeRegistry {
    constructor() {
        /**
         * CodeMirror 6 themes
         */
        this._themeMap = new Map([
            ['jupyter', Object.freeze({ name: 'jupyter', theme: jupyterTheme })]
        ]);
    }
    /**
     * Get all themes
     */
    get themes() {
        return Array.from(this._themeMap.values());
    }
    /**
     * Get the default CodeMirror 6 theme for JupyterLab
     *
     * @returns Default theme
     */
    defaultTheme() {
        return this._themeMap.get('jupyter').theme;
    }
    /**
     * Register a new theme.
     *
     * @param theme Codemirror 6 theme
     */
    addTheme(theme) {
        if (this._themeMap.has(theme.name)) {
            throw new Error(`A theme named '${theme.name}' is already registered.`);
        }
        this._themeMap.set(theme.name, { displayName: theme.name, ...theme });
    }
    /**
     * Get a theme.
     *
     * #### Notes
     * It falls back to the default theme
     *
     * @param name Theme name
     * @returns Theme extension
     */
    getTheme(name) {
        var _a;
        const ext = (_a = this._themeMap.get(name)) === null || _a === void 0 ? void 0 : _a.theme;
        return ext !== null && ext !== void 0 ? ext : this.defaultTheme();
    }
}
/**
 * EditorThemeRegistry namespace
 */
(function (EditorThemeRegistry) {
    /**
     * Get the default editor themes.
     *
     * @param translator Application translator
     * @returns Default CodeMirror 6 themes
     */
    function getDefaultThemes(translator) {
        const trans = (translator !== null && translator !== void 0 ? translator : lib.nullTranslator).load('jupyterlab');
        return [
            Object.freeze({
                name: 'codemirror',
                displayName: trans.__('codemirror'),
                theme: [
                    view_dist.EditorView.baseTheme({}),
                    (0,language_dist.syntaxHighlighting)(language_dist.defaultHighlightStyle)
                ]
            })
        ];
    }
    EditorThemeRegistry.getDefaultThemes = getDefaultThemes;
})(EditorThemeRegistry || (EditorThemeRegistry = {}));
//# sourceMappingURL=theme.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/language.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * CodeMirror language registry
 */
class EditorLanguageRegistry {
    constructor() {
        this._modeList = [];
        // Add default language text/plain -> No expressions to parse
        this.addLanguage({
            name: 'none',
            mime: 'text/plain',
            support: new language_dist.LanguageSupport(
            // Create a dummy parser that as no expression to parse
            language_dist.LRLanguage.define({ parser: (0,generator_dist.buildParser)('@top Program { }') }))
        });
    }
    /**
     * Register a new language for CodeMirror
     *
     * @param language Language to register
     */
    addLanguage(language) {
        var _a;
        const info = (_a = this.findByName(language.name)) !== null && _a !== void 0 ? _a : this.findByMIME(language.mime, true);
        if (info) {
            throw new Error(`${language.mime} already registered`);
        }
        this._modeList.push(this.makeSpec(language));
    }
    /**
     * Ensure a codemirror mode is available by name or Codemirror spec.
     *
     * @param language - The mode to ensure.  If it is a string, uses [findBest]
     *   to get the appropriate spec.
     *
     * @returns A promise that resolves when the mode is available.
     */
    async getLanguage(language) {
        const spec = this.findBest(language);
        if (spec && !spec.support) {
            spec.support = await spec.load();
        }
        return spec;
    }
    /**
     * Get the raw list of available modes specs.
     *
     * @returns The available modes
     */
    getLanguages() {
        return [...this._modeList];
    }
    /**
     * Find a codemirror mode by MIME.
     *
     * @param mime Mime type to look for
     * @param strict Whether xml and json should be assimilated to the generic mimetype
     * @returns The mode or null
     */
    findByMIME(mime, strict = false) {
        if (Array.isArray(mime)) {
            for (let i = 0; i < mime.length; i++) {
                const spec = this.findByMIME(mime[i]);
                if (spec)
                    return spec;
            }
            return null;
        }
        mime = mime.toLowerCase();
        for (let i = 0; i < this._modeList.length; i++) {
            let info = this._modeList[i];
            if (Array.isArray(info.mime)) {
                for (let j = 0; j < info.mime.length; j++) {
                    if (info.mime[j] == mime) {
                        return info;
                    }
                }
            }
            else if (info.mime == mime) {
                return info;
            }
        }
        if (!strict) {
            if (/\+xml$/.test(mime))
                return this.findByMIME('application/xml');
            if (/\+json$/.test(mime))
                return this.findByMIME('application/json');
        }
        return null;
    }
    /**
     * Find a codemirror mode by name.
     *
     * @param name The mode name
     * @returns The mode or null
     */
    findByName(name) {
        name = name.toLowerCase();
        for (let i = 0; i < this._modeList.length; i++) {
            let info = this._modeList[i];
            if (info.name.toLowerCase() == name)
                return info;
            if (info.alias) {
                for (let j = 0; j < info.alias.length; j++) {
                    if (info.alias[j].toLowerCase() == name) {
                        return info;
                    }
                }
            }
        }
        return null;
    }
    /**
     * Find a codemirror mode by extension.
     *
     * @param ext The extension name
     * @returns The mode or null
     */
    findByExtension(ext) {
        if (Array.isArray(ext)) {
            for (let i = 0; i < ext.length; i++) {
                const spec = this.findByExtension(ext[i]);
                if (spec)
                    return spec;
            }
            return null;
        }
        ext = ext.toLowerCase();
        for (let i = 0; i < this._modeList.length; i++) {
            let info = this._modeList[i];
            for (let j = 0; j < info.extensions.length; j++) {
                if (info.extensions[j].toLowerCase() == ext) {
                    return info;
                }
            }
        }
        return null;
    }
    /**
     * Find a codemirror mode by filename.
     *
     * @param name File name
     * @returns The mode or null
     */
    findByFileName(name) {
        const basename = coreutils_lib.PathExt.basename(name);
        for (let i = 0; i < this._modeList.length; i++) {
            let info = this._modeList[i];
            if (info.filename && info.filename.test(basename)) {
                return info;
            }
        }
        let dot = basename.lastIndexOf('.');
        let ext = dot > -1 && basename.substring(dot + 1, basename.length);
        if (ext) {
            return this.findByExtension(ext);
        }
        return null;
    }
    /**
     * Find a codemirror mode by name or CodeMirror spec.
     *
     * @param language The CodeMirror mode
     * @param fallback Whether to fallback to default mimetype spec or not
     * @returns The mode or null
     */
    findBest(language, fallback = true) {
        var _a, _b, _c, _d;
        const modename = typeof language === 'string' ? language : language.name;
        const mimetype = typeof language !== 'string' ? language.mime : modename;
        const ext = typeof language !== 'string' ? (_a = language.extensions) !== null && _a !== void 0 ? _a : [] : [];
        return ((_d = (_c = (_b = (modename ? this.findByName(modename) : null)) !== null && _b !== void 0 ? _b : (mimetype ? this.findByMIME(mimetype) : null)) !== null && _c !== void 0 ? _c : this.findByExtension(ext)) !== null && _d !== void 0 ? _d : (fallback
            ? this.findByMIME(lib_mimetype.IEditorMimeTypeService.defaultMimeType)
            : null));
    }
    /**
     * Parse and style a string.
     *
     * @param code Code to highlight
     * @param language Code language
     * @param el HTML element into which the highlighted code will be inserted
     */
    async highlight(code, language, el) {
        var _a;
        if (language) {
            await this.getLanguage(language);
        }
        const language_ = (_a = language === null || language === void 0 ? void 0 : language.support) === null || _a === void 0 ? void 0 : _a.language;
        if (!language_) {
            el.appendChild(document.createTextNode(code));
            return;
        }
        const tree = language_.parser.parse(code);
        // position state required because unstyled tokens are not emitted
        // in highlightTree
        let pos = 0;
        (0,highlight_dist.highlightTree)(tree, jupyterHighlightStyle, (from, to, classes) => {
            if (from > pos) {
                // No style applied to the token between pos and from
                el.appendChild(document.createTextNode(code.slice(pos, from)));
            }
            const sp = el.appendChild(document.createElement('span'));
            sp.className = classes;
            sp.appendChild(document.createTextNode(code.slice(from, to)));
            pos = to;
        });
        if (pos < tree.length - 1) {
            // No style applied on the trailing text
            el.appendChild(document.createTextNode(code.slice(pos, tree.length)));
        }
    }
    // Code mirror uses two similar structures, a plain object with optional fields,
    // and a class with the same fields but all mandatory. Maybe adopting the same
    // pattern would be less confusing (although far more verbose)
    makeSpec(spec) {
        let res = language_dist.LanguageDescription.of(spec);
        // CodeMirror does not store/use mime type of a language
        res.mime = spec.mime;
        res.displayName = spec.displayName;
        return res;
    }
}
/**
 * EditorLanguageRegistry namespace
 */
(function (EditorLanguageRegistry) {
    /**
     * Convert an CodeMirror 5 language parser to CodeMirror 6
     *
     * @param parser Legacy parser
     * @returns Language object
     */
    function legacy(parser) {
        return new language_dist.LanguageSupport(language_dist.StreamLanguage.define(parser));
    }
    EditorLanguageRegistry.legacy = legacy;
    /**
     * Create a dialect of SQL
     *
     * @param dialectName SQL dialect
     * @returns Language object
     */
    async function sql(dialectName) {
        const m = await __webpack_require__.e(/* import() */ 1390).then(__webpack_require__.bind(__webpack_require__, 21390));
        return m.sql({ dialect: m[dialectName] });
    }
    /**
     * Get the default editor languages
     *
     * @param translator Application translator
     * @returns Default CodeMirror 6 languages
     */
    function getDefaultLanguages(translator) {
        const trans = (translator !== null && translator !== void 0 ? translator : lib.nullTranslator).load('jupyterlab');
        return [
            {
                name: 'C',
                displayName: trans.__('C'),
                mime: 'text/x-csrc',
                extensions: ['c', 'h', 'ino'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1639).then(__webpack_require__.bind(__webpack_require__, 31639));
                    return m.cpp();
                }
            },
            {
                name: 'C++',
                displayName: trans.__('C++'),
                mime: 'text/x-c++src',
                extensions: ['cpp', 'c++', 'cc', 'cxx', 'hpp', 'h++', 'hh', 'hxx'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1639).then(__webpack_require__.bind(__webpack_require__, 31639));
                    return m.cpp();
                }
            },
            {
                name: 'CQL',
                displayName: trans.__('CQL'),
                mime: 'text/x-cassandra',
                extensions: ['cql'],
                load() {
                    return sql('Cassandra');
                }
            },
            {
                name: 'CSS',
                displayName: trans.__('CSS'),
                mime: 'text/css',
                extensions: ['css'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8120).then(__webpack_require__.bind(__webpack_require__, 48120));
                    return m.css();
                }
            },
            {
                name: 'HTML',
                displayName: trans.__('HTML'),
                alias: ['xhtml'],
                mime: 'text/html',
                extensions: ['html', 'htm', 'handlebars', 'hbs'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2261).then(__webpack_require__.bind(__webpack_require__, 82261));
                    return m.html();
                }
            },
            {
                name: 'Java',
                displayName: trans.__('Java'),
                mime: 'text/x-java',
                extensions: ['java'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 310).then(__webpack_require__.bind(__webpack_require__, 60310));
                    return m.java();
                }
            },
            {
                name: 'Javascript',
                displayName: trans.__('Javascript'),
                alias: ['ecmascript', 'js', 'node'],
                mime: [
                    'text/javascript',
                    'text/ecmascript',
                    'application/javascript',
                    'application/x-javascript',
                    'application/ecmascript'
                ],
                extensions: ['js', 'mjs', 'cjs'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 122).then(__webpack_require__.bind(__webpack_require__, 122));
                    return m.javascript();
                }
            },
            {
                name: 'JSON',
                displayName: trans.__('JSON'),
                alias: ['json5'],
                mime: ['application/json', 'application/x-json'],
                extensions: ['json', 'map'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9155).then(__webpack_require__.bind(__webpack_require__, 9155));
                    return m.json();
                }
            },
            {
                name: 'JSX',
                displayName: trans.__('JSX'),
                mime: 'text/jsx',
                extensions: ['jsx'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 122).then(__webpack_require__.bind(__webpack_require__, 122));
                    return m.javascript({ jsx: true });
                }
            },
            {
                name: 'MariaDB SQL',
                displayName: trans.__('MariaDB SQL'),
                mime: 'text/x-mariadb',
                load() {
                    return sql('MariaSQL');
                }
            },
            {
                name: 'Markdown',
                displayName: trans.__('Markdown'),
                mime: 'text/x-markdown',
                extensions: ['md', 'markdown', 'mkd'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8825).then(__webpack_require__.bind(__webpack_require__, 48825));
                    return m.markdown({ codeLanguages: this._modeList });
                }
            },
            {
                name: 'MS SQL',
                displayName: trans.__('MS SQL'),
                mime: 'text/x-mssql',
                load() {
                    return sql('MSSQL');
                }
            },
            {
                name: 'MySQL',
                displayName: trans.__('MySQL'),
                mime: 'text/x-mysql',
                load() {
                    return sql('MySQL');
                }
            },
            {
                name: 'PHP',
                displayName: trans.__('PHP'),
                mime: [
                    'text/x-php',
                    'application/x-httpd-php',
                    'application/x-httpd-php-open'
                ],
                extensions: ['php', 'php3', 'php4', 'php5', 'php7', 'phtml'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2386).then(__webpack_require__.bind(__webpack_require__, 12386));
                    return m.php();
                }
            },
            {
                name: 'PLSQL',
                displayName: trans.__('PLSQL'),
                mime: 'text/x-plsql',
                extensions: ['pls'],
                load() {
                    return sql('PLSQL');
                }
            },
            {
                name: 'PostgreSQL',
                displayName: trans.__('PostgreSQL'),
                mime: 'text/x-pgsql',
                load() {
                    return sql('PostgreSQL');
                }
            },
            {
                name: 'Python',
                displayName: trans.__('Python'),
                mime: 'text/x-python',
                extensions: ['BUILD', 'bzl', 'py', 'pyw'],
                filename: /^(BUCK|BUILD)$/,
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1679).then(__webpack_require__.bind(__webpack_require__, 51679));
                    return m.python();
                }
            },
            {
                name: 'ipython',
                displayName: trans.__('ipython'),
                mime: 'text/x-ipython',
                async load() {
                    // FIXME Restore '?' operator - using the default python LanguageSupport allows
                    // to activate feature such as code folding.
                    // return Promise.resolve(legacy(mkPython({ singleOperators: /\?/ })));
                    const m = await __webpack_require__.e(/* import() */ 1679).then(__webpack_require__.bind(__webpack_require__, 51679));
                    return m.python();
                }
            },
            {
                name: 'Rust',
                displayName: trans.__('Rust'),
                mime: 'text/x-rustsrc',
                extensions: ['rs'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2200).then(__webpack_require__.bind(__webpack_require__, 52200));
                    return m.rust();
                }
            },
            {
                name: 'SQL',
                displayName: trans.__('SQL'),
                mime: ['application/sql', 'text/x-sql'],
                extensions: ['sql'],
                load() {
                    return sql('StandardSQL');
                }
            },
            {
                name: 'SQLite',
                displayName: trans.__('SQLite'),
                mime: 'text/x-sqlite',
                load() {
                    return sql('SQLite');
                }
            },
            {
                name: 'TSX',
                displayName: trans.__('TSX'),
                alias: ['TypeScript-JSX'],
                mime: 'text/typescript-jsx',
                extensions: ['tsx'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 122).then(__webpack_require__.bind(__webpack_require__, 122));
                    return m.javascript({ jsx: true, typescript: true });
                }
            },
            {
                name: 'TypeScript',
                displayName: trans.__('TypeScript'),
                alias: ['ts'],
                mime: 'application/typescript',
                extensions: ['ts'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 122).then(__webpack_require__.bind(__webpack_require__, 122));
                    return m.javascript({ typescript: true });
                }
            },
            {
                name: 'WebAssembly',
                displayName: trans.__('WebAssembly'),
                mime: 'text/webassembly',
                extensions: ['wat', 'wast'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9972).then(__webpack_require__.bind(__webpack_require__, 9972));
                    return m.wast();
                }
            },
            {
                name: 'XML',
                displayName: trans.__('XML'),
                alias: ['rss', 'wsdl', 'xsd'],
                mime: ['application/xml', 'text/xml'],
                extensions: ['xml', 'xsl', 'xsd', 'svg'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8813).then(__webpack_require__.bind(__webpack_require__, 68813));
                    return m.xml();
                }
            },
            // Legacy modes ported from CodeMirror 5
            {
                name: 'APL',
                displayName: trans.__('APL'),
                mime: 'text/apl',
                extensions: ['dyalog', 'apl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 870).then(__webpack_require__.bind(__webpack_require__, 90870));
                    return legacy(m.apl);
                }
            },
            {
                name: 'PGP',
                displayName: trans.__('PGP'),
                alias: ['asciiarmor'],
                mime: [
                    'application/pgp',
                    'application/pgp-encrypted',
                    'application/pgp-keys',
                    'application/pgp-signature'
                ],
                extensions: ['asc', 'pgp', 'sig'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8029).then(__webpack_require__.bind(__webpack_require__, 58029));
                    return legacy(m.asciiArmor);
                }
            },
            {
                name: 'ASN.1',
                displayName: trans.__('ASN.1'),
                mime: 'text/x-ttcn-asn',
                extensions: ['asn', 'asn1'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3203).then(__webpack_require__.bind(__webpack_require__, 93203));
                    return legacy(m.asn1({}));
                }
            },
            {
                name: 'Asterisk',
                displayName: trans.__('Asterisk'),
                mime: 'text/x-asterisk',
                filename: /^extensions\.conf$/i,
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 5648).then(__webpack_require__.bind(__webpack_require__, 15648));
                    return legacy(m.asterisk);
                }
            },
            {
                name: 'Brainfuck',
                displayName: trans.__('Brainfuck'),
                mime: 'text/x-brainfuck',
                extensions: ['b', 'bf'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2675).then(__webpack_require__.bind(__webpack_require__, 2675));
                    return legacy(m.brainfuck);
                }
            },
            {
                name: 'Cobol',
                displayName: trans.__('Cobol'),
                mime: 'text/x-cobol',
                extensions: ['cob', 'cpy'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8915).then(__webpack_require__.bind(__webpack_require__, 68915));
                    return legacy(m.cobol);
                }
            },
            {
                name: 'C#',
                displayName: trans.__('C#'),
                alias: ['csharp', 'cs'],
                mime: 'text/x-csharp',
                extensions: ['cs'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7917).then(__webpack_require__.bind(__webpack_require__, 67917));
                    return legacy(m.csharp);
                }
            },
            {
                name: 'Clojure',
                displayName: trans.__('Clojure'),
                mime: 'text/x-clojure',
                extensions: ['clj', 'cljc', 'cljx'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2406).then(__webpack_require__.bind(__webpack_require__, 72406));
                    return legacy(m.clojure);
                }
            },
            {
                name: 'ClojureScript',
                displayName: trans.__('ClojureScript'),
                mime: 'text/x-clojurescript',
                extensions: ['cljs'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2406).then(__webpack_require__.bind(__webpack_require__, 72406));
                    return legacy(m.clojure);
                }
            },
            {
                name: 'Closure Stylesheets (GSS)',
                displayName: trans.__('Closure Stylesheets (GSS)'),
                mime: 'text/x-gss',
                extensions: ['gss'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2136).then(__webpack_require__.bind(__webpack_require__, 62136));
                    return legacy(m.gss);
                }
            },
            {
                name: 'CMake',
                displayName: trans.__('CMake'),
                mime: 'text/x-cmake',
                extensions: ['cmake', 'cmake.in'],
                filename: /^CMakeLists\.txt$/,
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 889).then(__webpack_require__.bind(__webpack_require__, 70889));
                    return legacy(m.cmake);
                }
            },
            {
                name: 'CoffeeScript',
                displayName: trans.__('CoffeeScript'),
                alias: ['coffee', 'coffee-script'],
                mime: [
                    'application/vnd.coffeescript',
                    'text/coffeescript',
                    'text/x-coffeescript'
                ],
                extensions: ['coffee'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9558).then(__webpack_require__.bind(__webpack_require__, 29558));
                    return legacy(m.coffeeScript);
                }
            },
            {
                name: 'Common Lisp',
                displayName: trans.__('Common Lisp'),
                alias: ['lisp'],
                mime: 'text/x-common-lisp',
                extensions: ['cl', 'lisp', 'el'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1446).then(__webpack_require__.bind(__webpack_require__, 61446));
                    return legacy(m.commonLisp);
                }
            },
            {
                name: 'Cypher',
                displayName: trans.__('Cypher'),
                mime: 'application/x-cypher-query',
                extensions: ['cyp', 'cypher'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 673).then(__webpack_require__.bind(__webpack_require__, 20673));
                    return legacy(m.cypher);
                }
            },
            {
                name: 'Cython',
                displayName: trans.__('Cython'),
                mime: 'text/x-cython',
                extensions: ['pyx', 'pxd', 'pxi'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4323).then(__webpack_require__.bind(__webpack_require__, 74323));
                    return legacy(m.cython);
                }
            },
            {
                name: 'Crystal',
                displayName: trans.__('Crystal'),
                mime: 'text/x-crystal',
                extensions: ['cr'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2602).then(__webpack_require__.bind(__webpack_require__, 62602));
                    return legacy(m.crystal);
                }
            },
            {
                name: 'D',
                displayName: trans.__('D'),
                mime: 'text/x-d',
                extensions: ['d'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1660).then(__webpack_require__.bind(__webpack_require__, 11660));
                    return legacy(m.d);
                }
            },
            {
                name: 'Dart',
                displayName: trans.__('Dart'),
                mime: ['application/dart', 'text/x-dart'],
                extensions: ['dart'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7917).then(__webpack_require__.bind(__webpack_require__, 67917));
                    return legacy(m.dart);
                }
            },
            {
                name: 'diff',
                displayName: trans.__('diff'),
                mime: 'text/x-diff',
                extensions: ['diff', 'patch'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7475).then(__webpack_require__.bind(__webpack_require__, 87475));
                    return legacy(m.diff);
                }
            },
            {
                name: 'Dockerfile',
                displayName: trans.__('Dockerfile'),
                mime: 'text/x-dockerfile',
                filename: /^Dockerfile$/,
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4812).then(__webpack_require__.bind(__webpack_require__, 34812));
                    return legacy(m.dockerFile);
                }
            },
            {
                name: 'DTD',
                displayName: trans.__('DTD'),
                mime: 'application/xml-dtd',
                extensions: ['dtd'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6991).then(__webpack_require__.bind(__webpack_require__, 76991));
                    return legacy(m.dtd);
                }
            },
            {
                name: 'Dylan',
                displayName: trans.__('Dylan'),
                mime: 'text/x-dylan',
                extensions: ['dylan', 'dyl', 'intr'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4144).then(__webpack_require__.bind(__webpack_require__, 24144));
                    return legacy(m.dylan);
                }
            },
            {
                name: 'EBNF',
                displayName: trans.__('EBNF'),
                mime: 'text/x-ebnf',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2040).then(__webpack_require__.bind(__webpack_require__, 82040));
                    return legacy(m.ebnf);
                }
            },
            {
                name: 'ECL',
                displayName: trans.__('ECL'),
                mime: 'text/x-ecl',
                extensions: ['ecl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7315).then(__webpack_require__.bind(__webpack_require__, 37315));
                    return legacy(m.ecl);
                }
            },
            {
                name: 'edn',
                displayName: trans.__('edn'),
                mime: 'application/edn',
                extensions: ['edn'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2406).then(__webpack_require__.bind(__webpack_require__, 72406));
                    return legacy(m.clojure);
                }
            },
            {
                name: 'Eiffel',
                displayName: trans.__('Eiffel'),
                mime: 'text/x-eiffel',
                extensions: ['e'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7525).then(__webpack_require__.bind(__webpack_require__, 87525));
                    return legacy(m.eiffel);
                }
            },
            {
                name: 'Elm',
                displayName: trans.__('Elm'),
                mime: 'text/x-elm',
                extensions: ['elm'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8770).then(__webpack_require__.bind(__webpack_require__, 28770));
                    return legacy(m.elm);
                }
            },
            {
                name: 'Erlang',
                displayName: trans.__('Erlang'),
                mime: 'text/x-erlang',
                extensions: ['erl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7590).then(__webpack_require__.bind(__webpack_require__, 53482));
                    return legacy(m.erlang);
                }
            },
            {
                name: 'Esper',
                displayName: trans.__('Esper'),
                mime: 'text/x-esper',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9607).then(__webpack_require__.bind(__webpack_require__, 54050));
                    return legacy(m.esper);
                }
            },
            {
                name: 'Factor',
                displayName: trans.__('Factor'),
                mime: 'text/x-factor',
                extensions: ['factor'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7001).then(__webpack_require__.bind(__webpack_require__, 87001));
                    return legacy(m.factor);
                }
            },
            {
                name: 'FCL',
                displayName: trans.__('FCL'),
                mime: 'text/x-fcl',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7663).then(__webpack_require__.bind(__webpack_require__, 77663));
                    return legacy(m.fcl);
                }
            },
            {
                name: 'Forth',
                displayName: trans.__('Forth'),
                mime: 'text/x-forth',
                extensions: ['forth', 'fth', '4th'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8393).then(__webpack_require__.bind(__webpack_require__, 68393));
                    return legacy(m.forth);
                }
            },
            {
                name: 'Fortran',
                displayName: trans.__('Fortran'),
                mime: 'text/x-fortran',
                extensions: ['f', 'for', 'f77', 'f90', 'f95'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8283).then(__webpack_require__.bind(__webpack_require__, 8283));
                    return legacy(m.fortran);
                }
            },
            {
                name: 'F#',
                displayName: trans.__('F#'),
                alias: ['fsharp'],
                mime: 'text/x-fsharp',
                extensions: ['fs'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6121).then(__webpack_require__.bind(__webpack_require__, 96121));
                    return legacy(m.fSharp);
                }
            },
            {
                name: 'Gas',
                displayName: trans.__('Gas'),
                mime: 'text/x-gas',
                extensions: ['s'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9781).then(__webpack_require__.bind(__webpack_require__, 39781));
                    return legacy(m.gas);
                }
            },
            {
                name: 'Gherkin',
                displayName: trans.__('Gherkin'),
                mime: 'text/x-feature',
                extensions: ['feature'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2542).then(__webpack_require__.bind(__webpack_require__, 2542));
                    return legacy(m.gherkin);
                }
            },
            {
                name: 'Go',
                displayName: trans.__('Go'),
                mime: 'text/x-go',
                extensions: ['go'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8910).then(__webpack_require__.bind(__webpack_require__, 48910));
                    return legacy(m.go);
                }
            },
            {
                name: 'Groovy',
                displayName: trans.__('Groovy'),
                mime: 'text/x-groovy',
                extensions: ['groovy', 'gradle'],
                filename: /^Jenkinsfile$/,
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3883).then(__webpack_require__.bind(__webpack_require__, 23883));
                    return legacy(m.groovy);
                }
            },
            {
                name: 'Haskell',
                displayName: trans.__('Haskell'),
                mime: 'text/x-haskell',
                extensions: ['hs'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 5372).then(__webpack_require__.bind(__webpack_require__, 95372));
                    return legacy(m.haskell);
                }
            },
            {
                name: 'Haxe',
                displayName: trans.__('Haxe'),
                mime: 'text/x-haxe',
                extensions: ['hx'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3509).then(__webpack_require__.bind(__webpack_require__, 63509));
                    return legacy(m.haxe);
                }
            },
            {
                name: 'HXML',
                displayName: trans.__('HXML'),
                mime: 'text/x-hxml',
                extensions: ['hxml'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3509).then(__webpack_require__.bind(__webpack_require__, 63509));
                    return legacy(m.hxml);
                }
            },
            {
                name: 'HTTP',
                displayName: trans.__('HTTP'),
                mime: 'message/http',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6395).then(__webpack_require__.bind(__webpack_require__, 36395));
                    return legacy(m.http);
                }
            },
            {
                name: 'IDL',
                displayName: trans.__('IDL'),
                mime: 'text/x-idl',
                extensions: ['pro'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2314).then(__webpack_require__.bind(__webpack_require__, 22314));
                    return legacy(m.idl);
                }
            },
            {
                name: 'JSON-LD',
                displayName: trans.__('JSON-LD'),
                alias: ['jsonld'],
                mime: 'application/ld+json',
                extensions: ['jsonld'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9296).then(__webpack_require__.bind(__webpack_require__, 59296));
                    return legacy(m.jsonld);
                }
            },
            {
                name: 'Jinja2',
                displayName: trans.__('Jinja2'),
                mime: 'text/jinja2',
                extensions: ['j2', 'jinja', 'jinja2'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1084).then(__webpack_require__.bind(__webpack_require__, 41084));
                    return legacy(m.jinja2);
                }
            },
            {
                name: 'Julia',
                displayName: trans.__('Julia'),
                mime: 'text/x-julia',
                extensions: ['jl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6092).then(__webpack_require__.bind(__webpack_require__, 76092));
                    return legacy(m.julia);
                }
            },
            {
                name: 'Kotlin',
                displayName: trans.__('Kotlin'),
                mime: 'text/x-kotlin',
                extensions: ['kt'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7917).then(__webpack_require__.bind(__webpack_require__, 67917));
                    return legacy(m.kotlin);
                }
            },
            {
                name: 'LESS',
                displayName: trans.__('LESS'),
                mime: 'text/x-less',
                extensions: ['less'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2136).then(__webpack_require__.bind(__webpack_require__, 62136));
                    return legacy(m.less);
                }
            },
            {
                name: 'LiveScript',
                displayName: trans.__('LiveScript'),
                alias: ['ls'],
                mime: 'text/x-livescript',
                extensions: ['ls'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 402).then(__webpack_require__.bind(__webpack_require__, 60402));
                    return legacy(m.liveScript);
                }
            },
            {
                name: 'Lua',
                displayName: trans.__('Lua'),
                mime: 'text/x-lua',
                extensions: ['lua'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3519).then(__webpack_require__.bind(__webpack_require__, 3519));
                    return legacy(m.lua);
                }
            },
            {
                name: 'mIRC',
                displayName: trans.__('mIRC'),
                mime: 'text/mirc',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 5134).then(__webpack_require__.bind(__webpack_require__, 65134));
                    return legacy(m.mirc);
                }
            },
            {
                name: 'Mathematica',
                displayName: trans.__('Mathematica'),
                mime: 'text/x-mathematica',
                extensions: ['m', 'nb', 'wl', 'wls'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7213).then(__webpack_require__.bind(__webpack_require__, 37213));
                    return legacy(m.mathematica);
                }
            },
            {
                name: 'Modelica',
                displayName: trans.__('Modelica'),
                mime: 'text/x-modelica',
                extensions: ['mo'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 305).then(__webpack_require__.bind(__webpack_require__, 40305));
                    return legacy(m.modelica);
                }
            },
            {
                name: 'MUMPS',
                displayName: trans.__('MUMPS'),
                mime: 'text/x-mumps',
                extensions: ['mps'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7988).then(__webpack_require__.bind(__webpack_require__, 17988));
                    return legacy(m.mumps);
                }
            },
            {
                name: 'mbox',
                displayName: trans.__('mbox'),
                mime: 'application/mbox',
                extensions: ['mbox'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9121).then(__webpack_require__.bind(__webpack_require__, 29121));
                    return legacy(m.mbox);
                }
            },
            {
                name: 'Nginx',
                displayName: trans.__('Nginx'),
                mime: 'text/x-nginx-conf',
                filename: /nginx.*\.conf$/i,
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8561).then(__webpack_require__.bind(__webpack_require__, 78561));
                    return legacy(m.nginx);
                }
            },
            {
                name: 'NSIS',
                displayName: trans.__('NSIS'),
                mime: 'text/x-nsis',
                extensions: ['nsh', 'nsi'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7370).then(__webpack_require__.bind(__webpack_require__, 67370));
                    return legacy(m.nsis);
                }
            },
            {
                name: 'NTriples',
                displayName: trans.__('NTriples'),
                mime: [
                    'application/n-triples',
                    'application/n-quads',
                    'text/n-triples'
                ],
                extensions: ['nt', 'nq'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3314).then(__webpack_require__.bind(__webpack_require__, 43314));
                    return legacy(m.ntriples);
                }
            },
            {
                name: 'Objective-C',
                displayName: trans.__('Objective-C'),
                alias: ['objective-c', 'objc'],
                mime: 'text/x-objectivec',
                extensions: ['m'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7917).then(__webpack_require__.bind(__webpack_require__, 67917));
                    return legacy(m.objectiveC);
                }
            },
            {
                name: 'Objective-C++',
                displayName: trans.__('Objective-C++'),
                alias: ['objective-c++', 'objc++'],
                mime: 'text/x-objectivec++',
                extensions: ['mm'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7917).then(__webpack_require__.bind(__webpack_require__, 67917));
                    return legacy(m.objectiveCpp);
                }
            },
            {
                name: 'OCaml',
                displayName: trans.__('OCaml'),
                mime: 'text/x-ocaml',
                extensions: ['ml', 'mli', 'mll', 'mly'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6121).then(__webpack_require__.bind(__webpack_require__, 96121));
                    return legacy(m.oCaml);
                }
            },
            {
                name: 'Octave',
                displayName: trans.__('Octave'),
                mime: 'text/x-octave',
                extensions: ['m'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3283).then(__webpack_require__.bind(__webpack_require__, 33283));
                    return legacy(m.octave);
                }
            },
            {
                name: 'Oz',
                displayName: trans.__('Oz'),
                mime: 'text/x-oz',
                extensions: ['oz'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4796).then(__webpack_require__.bind(__webpack_require__, 94796));
                    return legacy(m.oz);
                }
            },
            {
                name: 'Pascal',
                displayName: trans.__('Pascal'),
                mime: 'text/x-pascal',
                extensions: ['p', 'pas'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4163).then(__webpack_require__.bind(__webpack_require__, 44163));
                    return legacy(m.pascal);
                }
            },
            {
                name: 'Perl',
                displayName: trans.__('Perl'),
                mime: 'text/x-perl',
                extensions: ['pl', 'pm'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4293).then(__webpack_require__.bind(__webpack_require__, 94293));
                    return legacy(m.perl);
                }
            },
            {
                name: 'Pig',
                displayName: trans.__('Pig'),
                mime: 'text/x-pig',
                extensions: ['pig'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3482).then(__webpack_require__.bind(__webpack_require__, 33482));
                    return legacy(m.pig);
                }
            },
            {
                name: 'PowerShell',
                displayName: trans.__('PowerShell'),
                mime: 'application/x-powershell',
                extensions: ['ps1', 'psd1', 'psm1'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7421).then(__webpack_require__.bind(__webpack_require__, 37421));
                    return legacy(m.powerShell);
                }
            },
            {
                name: 'Properties files',
                displayName: trans.__('Properties files'),
                alias: ['ini', 'properties'],
                mime: 'text/x-properties',
                extensions: ['properties', 'ini', 'in'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9071).then(__webpack_require__.bind(__webpack_require__, 69071));
                    return legacy(m.properties);
                }
            },
            {
                name: 'ProtoBuf',
                displayName: trans.__('ProtoBuf'),
                mime: 'text/x-protobuf',
                extensions: ['proto'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8142).then(__webpack_require__.bind(__webpack_require__, 78142));
                    return legacy(m.protobuf);
                }
            },
            {
                name: 'Puppet',
                displayName: trans.__('Puppet'),
                mime: 'text/x-puppet',
                extensions: ['pp'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3993).then(__webpack_require__.bind(__webpack_require__, 83993));
                    return legacy(m.puppet);
                }
            },
            {
                name: 'Q',
                displayName: trans.__('Q'),
                mime: 'text/x-q',
                extensions: ['q'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 228).then(__webpack_require__.bind(__webpack_require__, 10228));
                    return legacy(m.q);
                }
            },
            {
                name: 'R',
                displayName: trans.__('R'),
                alias: ['rscript'],
                mime: 'text/x-rsrc',
                extensions: ['r', 'R'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7365).then(__webpack_require__.bind(__webpack_require__, 57365));
                    return legacy(m.r);
                }
            },
            {
                name: 'RPM Changes',
                displayName: trans.__('RPM Changes'),
                mime: 'text/x-rpm-changes',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8171).then(__webpack_require__.bind(__webpack_require__, 48171));
                    return legacy(m.rpmChanges);
                }
            },
            {
                name: 'RPM Spec',
                displayName: trans.__('RPM Spec'),
                mime: 'text/x-rpm-spec',
                extensions: ['spec'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8171).then(__webpack_require__.bind(__webpack_require__, 48171));
                    return legacy(m.rpmSpec);
                }
            },
            {
                name: 'Ruby',
                displayName: trans.__('Ruby'),
                alias: ['jruby', 'macruby', 'rake', 'rb', 'rbx'],
                mime: 'text/x-ruby',
                extensions: ['rb'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4439).then(__webpack_require__.bind(__webpack_require__, 24439));
                    return legacy(m.ruby);
                }
            },
            {
                name: 'SAS',
                displayName: trans.__('SAS'),
                mime: 'text/x-sas',
                extensions: ['sas'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1770).then(__webpack_require__.bind(__webpack_require__, 1770));
                    return legacy(m.sas);
                }
            },
            {
                name: 'Scala',
                displayName: trans.__('Scala'),
                mime: 'text/x-scala',
                extensions: ['scala'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7917).then(__webpack_require__.bind(__webpack_require__, 67917));
                    return legacy(m.scala);
                }
            },
            {
                name: 'Scheme',
                displayName: trans.__('Scheme'),
                mime: 'text/x-scheme',
                extensions: ['scm', 'ss'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 5879).then(__webpack_require__.bind(__webpack_require__, 95879));
                    return legacy(m.scheme);
                }
            },
            {
                name: 'SCSS',
                displayName: trans.__('SCSS'),
                mime: 'text/x-scss',
                extensions: ['scss'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2136).then(__webpack_require__.bind(__webpack_require__, 62136));
                    return legacy(m.sCSS);
                }
            },
            {
                name: 'Shell',
                displayName: trans.__('Shell'),
                alias: ['bash', 'sh', 'zsh'],
                mime: ['text/x-sh', 'application/x-sh'],
                extensions: ['sh', 'ksh', 'bash'],
                filename: /^PKGBUILD$/,
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4879).then(__webpack_require__.bind(__webpack_require__, 44879));
                    return legacy(m.shell);
                }
            },
            {
                name: 'Sieve',
                displayName: trans.__('Sieve'),
                mime: 'application/sieve',
                extensions: ['siv', 'sieve'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9713).then(__webpack_require__.bind(__webpack_require__, 9713));
                    return legacy(m.sieve);
                }
            },
            {
                name: 'Smalltalk',
                displayName: trans.__('Smalltalk'),
                mime: 'text/x-stsrc',
                extensions: ['st'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1873).then(__webpack_require__.bind(__webpack_require__, 11873));
                    return legacy(m.smalltalk);
                }
            },
            {
                name: 'Solr',
                displayName: trans.__('Solr'),
                mime: 'text/x-solr',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7762).then(__webpack_require__.bind(__webpack_require__, 17762));
                    return legacy(m.solr);
                }
            },
            {
                name: 'SML',
                displayName: trans.__('SML'),
                mime: 'text/x-sml',
                extensions: ['sml', 'sig', 'fun', 'smackspec'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6121).then(__webpack_require__.bind(__webpack_require__, 96121));
                    return legacy(m.sml);
                }
            },
            {
                name: 'SPARQL',
                displayName: trans.__('SPARQL'),
                alias: ['sparul'],
                mime: 'application/sparql-query',
                extensions: ['rq', 'sparql'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 370).then(__webpack_require__.bind(__webpack_require__, 70370));
                    return legacy(m.sparql);
                }
            },
            {
                name: 'Spreadsheet',
                displayName: trans.__('Spreadsheet'),
                alias: ['excel', 'formula'],
                mime: 'text/x-spreadsheet',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7601).then(__webpack_require__.bind(__webpack_require__, 97601));
                    return legacy(m.spreadsheet);
                }
            },
            {
                name: 'Squirrel',
                displayName: trans.__('Squirrel'),
                mime: 'text/x-squirrel',
                extensions: ['nut'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 7917).then(__webpack_require__.bind(__webpack_require__, 67917));
                    return legacy(m.squirrel);
                }
            },
            {
                name: 'Stylus',
                displayName: trans.__('Stylus'),
                mime: 'text/x-styl',
                extensions: ['styl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 8007).then(__webpack_require__.bind(__webpack_require__, 28007));
                    return legacy(m.stylus);
                }
            },
            {
                name: 'Swift',
                displayName: trans.__('Swift'),
                mime: 'text/x-swift',
                extensions: ['swift'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6062).then(__webpack_require__.bind(__webpack_require__, 66062));
                    return legacy(m.swift);
                }
            },
            {
                name: 'sTeX',
                displayName: trans.__('sTeX'),
                mime: 'text/x-stex',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6732).then(__webpack_require__.bind(__webpack_require__, 86732));
                    return legacy(m.stex);
                }
            },
            {
                name: 'LaTeX',
                displayName: trans.__('LaTeX'),
                alias: ['tex'],
                mime: 'text/x-latex',
                extensions: ['text', 'ltx', 'tex'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6732).then(__webpack_require__.bind(__webpack_require__, 86732));
                    return legacy(m.stex);
                }
            },
            {
                name: 'SystemVerilog',
                displayName: trans.__('SystemVerilog'),
                mime: 'text/x-systemverilog',
                extensions: ['v', 'sv', 'svh'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2119).then(__webpack_require__.bind(__webpack_require__, 52119));
                    return legacy(m.verilog);
                }
            },
            {
                name: 'Tcl',
                displayName: trans.__('Tcl'),
                mime: 'text/x-tcl',
                extensions: ['tcl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 3465).then(__webpack_require__.bind(__webpack_require__, 43465));
                    return legacy(m.tcl);
                }
            },
            {
                name: 'Textile',
                displayName: trans.__('Textile'),
                mime: 'text/x-textile',
                extensions: ['textile'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 177).then(__webpack_require__.bind(__webpack_require__, 90177));
                    return legacy(m.textile);
                }
            },
            {
                name: 'TiddlyWiki',
                displayName: trans.__('TiddlyWiki'),
                mime: 'text/x-tiddlywiki',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4511).then(__webpack_require__.bind(__webpack_require__, 34511));
                    return legacy(m.tiddlyWiki);
                }
            },
            {
                name: 'Tiki wiki',
                displayName: trans.__('Tiki wiki'),
                mime: 'text/tiki',
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6471).then(__webpack_require__.bind(__webpack_require__, 36471));
                    return legacy(m.tiki);
                }
            },
            {
                name: 'TOML',
                displayName: trans.__('TOML'),
                mime: 'text/x-toml',
                extensions: ['toml'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6443).then(__webpack_require__.bind(__webpack_require__, 96443));
                    return legacy(m.toml);
                }
            },
            {
                name: 'troff',
                displayName: trans.__('troff'),
                mime: 'text/troff',
                extensions: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1920).then(__webpack_require__.bind(__webpack_require__, 71920));
                    return legacy(m.troff);
                }
            },
            {
                name: 'TTCN',
                displayName: trans.__('TTCN'),
                mime: 'text/x-ttcn',
                extensions: ['ttcn', 'ttcn3', 'ttcnpp'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6665).then(__webpack_require__.bind(__webpack_require__, 66665));
                    return legacy(m.ttcn);
                }
            },
            {
                name: 'TTCN_CFG',
                displayName: trans.__('TTCN_CFG'),
                mime: 'text/x-ttcn-cfg',
                extensions: ['cfg'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9831).then(__webpack_require__.bind(__webpack_require__, 29831));
                    return legacy(m.ttcnCfg);
                }
            },
            {
                name: 'Turtle',
                displayName: trans.__('Turtle'),
                mime: 'text/turtle',
                extensions: ['ttl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 5815).then(__webpack_require__.bind(__webpack_require__, 15815));
                    return legacy(m.turtle);
                }
            },
            {
                name: 'Web IDL',
                displayName: trans.__('Web IDL'),
                mime: 'text/x-webidl',
                extensions: ['webidl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 6692).then(__webpack_require__.bind(__webpack_require__, 26692));
                    return legacy(m.webIDL);
                }
            },
            {
                name: 'VB.NET',
                displayName: trans.__('VB.NET'),
                mime: 'text/x-vb',
                extensions: ['vb'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 4212).then(__webpack_require__.bind(__webpack_require__, 44212));
                    return legacy(m.vb);
                }
            },
            {
                name: 'VBScript',
                displayName: trans.__('VBScript'),
                mime: 'text/vbscript',
                extensions: ['vbs'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1650).then(__webpack_require__.bind(__webpack_require__, 31650));
                    return legacy(m.vbScript);
                }
            },
            {
                name: 'Velocity',
                displayName: trans.__('Velocity'),
                mime: 'text/velocity',
                extensions: ['vtl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 617).then(__webpack_require__.bind(__webpack_require__, 90617));
                    return legacy(m.velocity);
                }
            },
            {
                name: 'Verilog',
                displayName: trans.__('Verilog'),
                mime: 'text/x-verilog',
                extensions: ['v'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2119).then(__webpack_require__.bind(__webpack_require__, 52119));
                    return legacy(m.verilog);
                }
            },
            {
                name: 'VHDL',
                displayName: trans.__('VHDL'),
                mime: 'text/x-vhdl',
                extensions: ['vhd', 'vhdl'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 5819).then(__webpack_require__.bind(__webpack_require__, 81751));
                    return legacy(m.vhdl);
                }
            },
            {
                name: 'XQuery',
                displayName: trans.__('XQuery'),
                mime: 'application/xquery',
                extensions: ['xy', 'xquery'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 5753).then(__webpack_require__.bind(__webpack_require__, 35753));
                    return legacy(m.xQuery);
                }
            },
            {
                name: 'Yacas',
                displayName: trans.__('Yacas'),
                mime: 'text/x-yacas',
                extensions: ['ys'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 9232).then(__webpack_require__.bind(__webpack_require__, 69232));
                    return legacy(m.yacas);
                }
            },
            {
                name: 'YAML',
                displayName: trans.__('YAML'),
                alias: ['yml'],
                mime: ['text/x-yaml', 'text/yaml'],
                extensions: ['yaml', 'yml'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 2877).then(__webpack_require__.bind(__webpack_require__, 82877));
                    return legacy(m.yaml);
                }
            },
            {
                name: 'Z80',
                displayName: trans.__('Z80'),
                mime: 'text/x-z80',
                extensions: ['z80'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 1053).then(__webpack_require__.bind(__webpack_require__, 21053));
                    return legacy(m.z80);
                }
            },
            {
                name: 'mscgen',
                displayName: trans.__('mscgen'),
                mime: 'text/x-mscgen',
                extensions: ['mscgen', 'mscin', 'msc'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 758).then(__webpack_require__.bind(__webpack_require__, 30758));
                    return legacy(m.mscgen);
                }
            },
            {
                name: 'xu',
                displayName: trans.__('xu'),
                mime: 'text/x-xu',
                extensions: ['xu'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 758).then(__webpack_require__.bind(__webpack_require__, 30758));
                    return legacy(m.xu);
                }
            },
            {
                name: 'msgenny',
                displayName: trans.__('msgenny'),
                mime: 'text/x-msgenny',
                extensions: ['msgenny'],
                async load() {
                    const m = await __webpack_require__.e(/* import() */ 758).then(__webpack_require__.bind(__webpack_require__, 30758));
                    return legacy(m.msgenny);
                }
            }
        ];
    }
    EditorLanguageRegistry.getDefaultLanguages = getDefaultLanguages;
})(EditorLanguageRegistry || (EditorLanguageRegistry = {}));
//# sourceMappingURL=language.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/editor.js
/* eslint-disable @typescript-eslint/ban-types */
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The class name added to CodeMirrorWidget instances.
 */
const EDITOR_CLASS = 'jp-CodeMirrorEditor';
/**
 * The key code for the up arrow key.
 */
const UP_ARROW = 38;
/**
 * The key code for the down arrow key.
 */
const DOWN_ARROW = 40;
/**
 * CodeMirror editor.
 */
class CodeMirrorEditor {
    /**
     * Construct a CodeMirror editor.
     */
    constructor(options) {
        var _a, _b, _c, _d, _e, _f;
        /**
         * A signal emitted when either the top or bottom edge is requested.
         */
        this.edgeRequested = new dist_index_es6.Signal(this);
        this._isDisposed = false;
        this._language = new state_dist.Compartment();
        this._uuid = '';
        this._languages = (_a = options.languages) !== null && _a !== void 0 ? _a : new EditorLanguageRegistry();
        this._configurator =
            (_d = (_b = options.extensionsRegistry) === null || _b === void 0 ? void 0 : _b.createNew({
                ...options,
                inline: (_c = options.inline) !== null && _c !== void 0 ? _c : false
            })) !== null && _d !== void 0 ? _d : new ExtensionsHandler();
        const host = (this.host = options.host);
        host.classList.add(EDITOR_CLASS);
        host.classList.add('jp-Editor');
        host.addEventListener('focus', this, true);
        host.addEventListener('blur', this, true);
        host.addEventListener('scroll', this, true);
        this._uuid = (_e = options.uuid) !== null && _e !== void 0 ? _e : index_es6.UUID.uuid4();
        const model = (this._model = options.model);
        // Default keydown handler - it will have low priority
        const onKeyDown = view_dist.EditorView.domEventHandlers({
            keydown: (event, view) => {
                return this.onKeydown(event);
            }
        });
        const updateListener = view_dist.EditorView.updateListener.of((update) => {
            this._onDocChanged(update);
        });
        this._editor = Private.createEditor(host, this._configurator, [
            // We need to set the order to high, otherwise the keybinding for ArrowUp/ArrowDown
            // will process the event shunting our edge detection code.
            state_dist.Prec.high(onKeyDown),
            updateListener,
            // Initialize with empty extension
            this._language.of([]),
            ...((_f = options.extensions) !== null && _f !== void 0 ? _f : [])
        ], model.sharedModel.source);
        this._onMimeTypeChanged();
        this._onCursorActivity();
        this._configurator.configChanged.connect(this.onConfigChanged, this);
        model.mimeTypeChanged.connect(this._onMimeTypeChanged, this);
    }
    /**
     * The uuid of this editor;
     */
    get uuid() {
        return this._uuid;
    }
    set uuid(value) {
        this._uuid = value;
    }
    /**
     * Get the codemirror editor wrapped by the editor.
     */
    get editor() {
        return this._editor;
    }
    /**
     * Get the codemirror doc wrapped by the widget.
     */
    get doc() {
        return this._editor.state.doc;
    }
    /**
     * Get the number of lines in the editor.
     */
    get lineCount() {
        return this.doc.lines;
    }
    /**
     * Returns a model for this editor.
     */
    get model() {
        return this._model;
    }
    /**
     * The height of a line in the editor in pixels.
     */
    get lineHeight() {
        return this._editor.defaultLineHeight;
    }
    /**
     * The widget of a character in the editor in pixels.
     */
    get charWidth() {
        return this._editor.defaultCharacterWidth;
    }
    /**
     * Tests whether the editor is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this.host.removeEventListener('focus', this, true);
        this.host.removeEventListener('blur', this, true);
        this.host.removeEventListener('scroll', this, true);
        this._configurator.dispose();
        dist_index_es6.Signal.clearData(this);
        this.editor.destroy();
    }
    /**
     * Get a config option for the editor.
     */
    getOption(option) {
        return this._configurator.getOption(option);
    }
    /**
     * Whether the option exists or not.
     */
    hasOption(option) {
        return this._configurator.hasOption(option);
    }
    /**
     * Set a config option for the editor.
     */
    setOption(option, value) {
        this._configurator.setOption(option, value);
    }
    /**
     * Set config options for the editor.
     *
     * This method is preferred when setting several options. The
     * options are set within an operation, which only performs
     * the costly update at the end, and not after every option
     * is set.
     */
    setOptions(options) {
        this._configurator.setOptions(options);
    }
    /**
     * Inject an extension into the editor
     *
     * @alpha
     * @experimental
     * @param ext CodeMirror 6 extension
     */
    injectExtension(ext) {
        this._configurator.injectExtension(this._editor, ext);
    }
    /**
     * Returns the content for the given line number.
     */
    getLine(line) {
        // TODO: CM6 remove +1 when CM6 first line number has propagated
        line = line + 1;
        return line <= this.doc.lines ? this.doc.line(line).text : undefined;
    }
    /**
     * Find an offset for the given position.
     */
    getOffsetAt(position) {
        // TODO: CM6 remove +1 when CM6 first line number has propagated
        return this.doc.line(position.line + 1).from + position.column;
    }
    /**
     * Find a position for the given offset.
     */
    getPositionAt(offset) {
        // TODO: CM6 remove -1 when CM6 first line number has propagated
        const line = this.doc.lineAt(offset);
        return { line: line.number - 1, column: offset - line.from };
    }
    /**
     * Undo one edit (if any undo events are stored).
     */
    undo() {
        this.model.sharedModel.undo();
    }
    /**
     * Redo one undone edit.
     */
    redo() {
        this.model.sharedModel.redo();
    }
    /**
     * Clear the undo history.
     */
    clearHistory() {
        this.model.sharedModel.clearUndoHistory();
    }
    /**
     * Brings browser focus to this editor text.
     */
    focus() {
        this._editor.focus();
    }
    /**
     * Test whether the editor has keyboard focus.
     */
    hasFocus() {
        return this._editor.hasFocus;
    }
    /**
     * Explicitly blur the editor.
     */
    blur() {
        this._editor.contentDOM.blur();
    }
    get state() {
        return this._editor.state;
    }
    firstLine() {
        // TODO: return 1 when CM6 first line number has propagated
        return 0;
    }
    lastLine() {
        return this.doc.lines - 1;
    }
    cursorCoords(where, mode) {
        const selection = this.state.selection.main;
        const pos = where ? selection.from : selection.to;
        const rect = this.editor.coordsAtPos(pos);
        return rect;
    }
    getRange(from, to, separator) {
        const fromOffset = this.getOffsetAt(this._toPosition(from));
        const toOffset = this.getOffsetAt(this._toPosition(to));
        return this.state.sliceDoc(fromOffset, toOffset);
    }
    /**
     * Reveal the given position in the editor.
     */
    revealPosition(position) {
        const offset = this.getOffsetAt(position);
        this._editor.dispatch({
            effects: view_dist.EditorView.scrollIntoView(offset)
        });
    }
    /**
     * Reveal the given selection in the editor.
     */
    revealSelection(selection) {
        const start = this.getOffsetAt(selection.start);
        const end = this.getOffsetAt(selection.end);
        this._editor.dispatch({
            effects: view_dist.EditorView.scrollIntoView(state_dist.EditorSelection.range(start, end))
        });
    }
    /**
     * Get the window coordinates given a cursor position.
     */
    getCoordinateForPosition(position) {
        const offset = this.getOffsetAt(position);
        const rect = this.editor.coordsAtPos(offset);
        return rect;
    }
    /**
     * Get the cursor position given window coordinates.
     *
     * @param coordinate - The desired coordinate.
     *
     * @returns The position of the coordinates, or null if not
     *   contained in the editor.
     */
    getPositionForCoordinate(coordinate) {
        const offset = this.editor.posAtCoords({
            x: coordinate.left,
            y: coordinate.top
        });
        return this.getPositionAt(offset) || null;
    }
    /**
     * Returns the primary position of the cursor, never `null`.
     */
    getCursorPosition() {
        const offset = this.state.selection.main.head;
        return this.getPositionAt(offset);
    }
    /**
     * Set the primary position of the cursor.
     *
     * #### Notes
     * This will remove any secondary cursors.
     *
     * @deprecated options bias and origin are not used
     */
    setCursorPosition(position, options = {}) {
        const offset = this.getOffsetAt(position);
        this.editor.dispatch({
            selection: { anchor: offset },
            scrollIntoView: options.scroll === false ? false : true
        });
        // If the editor does not have focus, this cursor change
        // will get screened out in _onCursorsChanged(). Make an
        // exception for this method.
        if (!this.editor.hasFocus) {
            this.model.selections.set(this.uuid, this.getSelections());
        }
    }
    /**
     * Returns the primary selection, never `null`.
     */
    getSelection() {
        return this.getSelections()[0];
    }
    /**
     * Set the primary selection. This will remove any secondary cursors.
     */
    setSelection(selection) {
        this.setSelections([selection]);
    }
    /**
     * Gets the selections for all the cursors, never `null` or empty.
     */
    getSelections() {
        const selections = this.state.selection.ranges; //= [{anchor: number, head: number}]
        if (selections.length > 0) {
            const sel = selections.map(r => ({
                anchor: this._toCodeMirrorPosition(this.getPositionAt(r.from)),
                head: this._toCodeMirrorPosition(this.getPositionAt(r.to))
            }));
            return sel.map(selection => this._toSelection(selection));
        }
        const cursor = this._toCodeMirrorPosition(this.getPositionAt(this.state.selection.main.head));
        const selection = this._toSelection({ anchor: cursor, head: cursor });
        return [selection];
    }
    /**
     * Sets the selections for all the cursors, should not be empty.
     * Cursors will be removed or added, as necessary.
     * Passing an empty array resets a cursor position to the start of a document.
     */
    setSelections(selections) {
        const sel = selections.length
            ? selections.map(r => state_dist.EditorSelection.range(this.getOffsetAt(r.start), this.getOffsetAt(r.end)))
            : [state_dist.EditorSelection.range(0, 0)];
        this.editor.dispatch({ selection: state_dist.EditorSelection.create(sel) });
    }
    /**
     * Replaces the current selection with the given text.
     *
     * Behaviour for multiple selections is undefined.
     *
     * @param text The text to be inserted.
     */
    replaceSelection(text) {
        const firstSelection = this.getSelections()[0];
        this.model.sharedModel.updateSource(this.getOffsetAt(firstSelection.start), this.getOffsetAt(firstSelection.end), text);
        const newPosition = this.getPositionAt(this.getOffsetAt(firstSelection.start) + text.length);
        this.setSelection({ start: newPosition, end: newPosition });
    }
    /**
     * Get a list of tokens for the current editor text content.
     */
    getTokens() {
        const tokens = [];
        const tree = (0,language_dist.ensureSyntaxTree)(this.state, this.doc.length);
        if (tree) {
            tree.iterate({
                enter: (ref) => {
                    if (ref.node.firstChild === null) {
                        tokens.push({
                            value: this.state.sliceDoc(ref.from, ref.to),
                            offset: ref.from,
                            type: ref.name
                        });
                    }
                    return true;
                }
            });
        }
        return tokens;
    }
    /**
     * Get the token at a given editor position.
     */
    getTokenAt(offset) {
        const tree = (0,language_dist.ensureSyntaxTree)(this.state, offset);
        let token = null;
        if (tree) {
            tree.iterate({
                enter: (ref) => {
                    // If a token has already been discovered, stop iterating.
                    if (token) {
                        return false;
                    }
                    // If it is not a leaf, keep iterating.
                    if (ref.node.firstChild) {
                        return true;
                    }
                    // If the relevant leaf token has been found, stop iterating.
                    if (offset >= ref.from && offset <= ref.to) {
                        token = {
                            value: this.state.sliceDoc(ref.from, ref.to),
                            offset: ref.from,
                            type: ref.name
                        };
                        return false;
                    }
                    return true;
                }
            });
        }
        return token || { offset, value: '' };
    }
    /**
     * Get the token a the cursor position.
     */
    getTokenAtCursor() {
        return this.getTokenAt(this.state.selection.main.head);
    }
    /**
     * Insert a new indented line at the current cursor position.
     */
    newIndentedLine() {
        (0,dist.insertNewlineAndIndent)({
            state: this.state,
            dispatch: this.editor.dispatch
        });
    }
    /**
     * Execute a codemirror command on the editor.
     *
     * @param command - The name of the command to execute.
     */
    execCommand(command) {
        command(this.editor);
    }
    onConfigChanged(configurator, changes) {
        configurator.reconfigureExtensions(this._editor, changes);
    }
    /**
     * Handle keydown events from the editor.
     */
    onKeydown(event) {
        const position = this.state.selection.main.head;
        if (position === 0 && event.keyCode === UP_ARROW) {
            if (!event.shiftKey) {
                this.edgeRequested.emit('top');
            }
            return false;
        }
        const line = this.doc.lineAt(position).number;
        if (line === 1 && event.keyCode === UP_ARROW) {
            if (!event.shiftKey) {
                this.edgeRequested.emit('topLine');
            }
            return false;
        }
        const length = this.doc.length;
        if (position === length && event.keyCode === DOWN_ARROW) {
            if (!event.shiftKey) {
                this.edgeRequested.emit('bottom');
            }
            return false;
        }
        return false;
    }
    /**
     * Handles a mime type change.
     */
    _onMimeTypeChanged() {
        // TODO: should we provide a hook for when the mode is done being set?
        this._languages
            .getLanguage(this._model.mimeType)
            .then(language => {
            var _a;
            this._editor.dispatch({
                effects: this._language.reconfigure((_a = language === null || language === void 0 ? void 0 : language.support) !== null && _a !== void 0 ? _a : [])
            });
        })
            .catch(reason => {
            console.log(`Failed to load language for '${this._model.mimeType}'.`, reason);
            this._editor.dispatch({
                effects: this._language.reconfigure([])
            });
        });
    }
    /**
     * Handles a cursor activity event.
     */
    _onCursorActivity() {
        // Only add selections if the editor has focus. This avoids unwanted
        // triggering of cursor activity due to collaborator actions.
        if (this._editor.hasFocus) {
            const selections = this.getSelections();
            this.model.selections.set(this.uuid, selections);
        }
    }
    /**
     * Converts a code mirror selection to an editor selection.
     */
    _toSelection(selection) {
        return {
            uuid: this.uuid,
            start: this._toPosition(selection.anchor),
            end: this._toPosition(selection.head)
        };
    }
    /**
     * Convert a code mirror position to an editor position.
     */
    _toPosition(position) {
        return {
            line: position.line,
            column: position.ch
        };
    }
    /**
     * Convert an editor position to a code mirror position.
     */
    _toCodeMirrorPosition(position) {
        return {
            line: position.line,
            ch: position.column
        };
    }
    /**
     * Handles document changes.
     */
    _onDocChanged(update) {
        if (update.transactions.length && update.transactions[0].selection) {
            this._onCursorActivity();
        }
    }
    /**
     * Handle the DOM events for the editor.
     *
     * @param event - The DOM event sent to the editor.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the editor's DOM node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'focus':
                this._evtFocus(event);
                break;
            case 'blur':
                this._evtBlur(event);
                break;
            default:
                break;
        }
    }
    /**
     * Handle `focus` events for the editor.
     */
    _evtFocus(event) {
        this.host.classList.add('jp-mod-focused');
        // Update the selections on editor gaining focus because
        // the onCursorActivity function filters usual cursor events
        // based on the editor's focus.
        this._onCursorActivity();
    }
    /**
     * Handle `blur` events for the editor.
     */
    _evtBlur(event) {
        this.host.classList.remove('jp-mod-focused');
    }
}
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    function createEditor(host, editorConfig, additionalExtensions, doc) {
        const extensions = editorConfig.getInitialExtensions();
        extensions.push(...additionalExtensions);
        const view = new view_dist.EditorView({
            state: state_dist.EditorState.create({
                doc,
                extensions
            }),
            parent: host
        });
        return view;
    }
    Private.createEditor = createEditor;
})(Private || (Private = {}));
//# sourceMappingURL=editor.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/factory.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * CodeMirror editor factory.
 */
class CodeMirrorEditorFactory {
    /**
     * Construct an IEditorFactoryService for CodeMirrorEditors.
     */
    constructor(options = {}) {
        var _a, _b, _c;
        /**
         * Create a new editor for inline code.
         */
        this.newInlineEditor = (options) => {
            options.host.dataset.type = 'inline';
            return this.newEditor({
                ...options,
                config: { ...this.inlineCodeMirrorConfig, ...(options.config || {}) },
                inline: true
            });
        };
        /**
         * Create a new editor for a full document.
         */
        this.newDocumentEditor = (options) => {
            var _a, _b;
            options.host.dataset.type = 'document';
            return this.newEditor({
                ...options,
                config: { ...this.documentCodeMirrorConfig, ...((_a = options.config) !== null && _a !== void 0 ? _a : {}) },
                inline: false,
                extensions: [
                    view_dist.keymap.of([
                        {
                            key: 'Shift-Enter',
                            run: (target) => {
                                return true;
                            }
                        }
                    ])
                ].concat((_b = options.extensions) !== null && _b !== void 0 ? _b : [])
            });
        };
        this.languages = (_a = options.languages) !== null && _a !== void 0 ? _a : new EditorLanguageRegistry();
        this.extensions = (_b = options.extensions) !== null && _b !== void 0 ? _b : new EditorExtensionRegistry();
        this.translator = (_c = options.translator) !== null && _c !== void 0 ? _c : lib.nullTranslator;
        this.inlineCodeMirrorConfig = {
            searchWithCM: true
        };
        this.documentCodeMirrorConfig = {
            lineNumbers: true,
            scrollPastEnd: true
        };
    }
    /**
     * Create a new editor
     *
     * @param options Editor options
     * @returns The editor
     */
    newEditor(options) {
        const editor = new CodeMirrorEditor({
            extensionsRegistry: this.extensions,
            languages: this.languages,
            translator: this.translator,
            ...options
        });
        return editor;
    }
}
//# sourceMappingURL=factory.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/mimetype.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * The mime type service for CodeMirror.
 */
class CodeMirrorMimeTypeService {
    constructor(languages) {
        this.languages = languages;
    }
    /**
     * Returns a mime type for the given language info.
     *
     * #### Notes
     * If a mime type cannot be found returns the default mime type `text/plain`, never `null`.
     * There may be more than one mime type, but only the first one will be returned.
     * To access all mime types, use `IEditorLanguageRegistry` instead.
     */
    getMimeTypeByLanguage(info) {
        var _a;
        const ext = info.file_extension || '';
        const mode = this.languages.findBest(info.codemirror_mode || {
            mimetype: info.mimetype,
            name: info.name,
            ext: [ext.split('.').slice(-1)[0]]
        });
        return mode
            ? Array.isArray(mode.mime)
                ? (_a = mode.mime[0]) !== null && _a !== void 0 ? _a : lib_mimetype.IEditorMimeTypeService.defaultMimeType
                : mode.mime
            : lib_mimetype.IEditorMimeTypeService.defaultMimeType;
    }
    /**
     * Returns a mime type for the given file path.
     *
     * #### Notes
     * If a mime type cannot be found returns the default mime type `text/plain`, never `null`.
     * There may be more than one mime type, but only the first one will be returned.
     * To access all mime types, use `IEditorLanguageRegistry` instead.
     */
    getMimeTypeByFilePath(path) {
        var _a;
        const ext = coreutils_lib.PathExt.extname(path);
        if (ext === '.ipy') {
            return 'text/x-python';
        }
        else if (ext === '.md') {
            return 'text/x-ipythongfm';
        }
        const mode = this.languages.findByFileName(path);
        return mode
            ? Array.isArray(mode.mime)
                ? (_a = mode.mime[0]) !== null && _a !== void 0 ? _a : lib_mimetype.IEditorMimeTypeService.defaultMimeType
                : mode.mime
            : lib_mimetype.IEditorMimeTypeService.defaultMimeType;
    }
}
//# sourceMappingURL=mimetype.js.map
// EXTERNAL MODULE: ./node_modules/@lumino/widgets/dist/index.es6.js
var widgets_dist_index_es6 = __webpack_require__(6654);
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/documentsearch/lib/searchprovider.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * Abstract class implementing the search provider interface.
 */
class SearchProvider {
    /**
     * Constructor
     *
     * @param widget The widget to search in
     */
    constructor(widget) {
        this.widget = widget;
        this._stateChanged = new dist_index_es6.Signal(this);
        this._filtersChanged = new dist_index_es6.Signal(this);
        this._disposed = false;
    }
    /**
     * Signal indicating that something in the search has changed, so the UI should update
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * Signal indicating that filter definition changed.
     */
    get filtersChanged() {
        return this._filtersChanged;
    }
    /**
     * The current index of the selected match.
     */
    get currentMatchIndex() {
        return null;
    }
    /**
     * Whether the search provider is disposed or not.
     */
    get isDisposed() {
        return this._disposed;
    }
    /**
     * The number of matches.
     */
    get matchesCount() {
        return null;
    }
    /**
     * Dispose of the resources held by the search provider.
     *
     * #### Notes
     * If the object's `dispose` method is called more than once, all
     * calls made after the first will be a no-op.
     *
     * #### Undefined Behavior
     * It is undefined behavior to use any functionality of the object
     * after it has been disposed unless otherwise explicitly noted.
     */
    dispose() {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        dist_index_es6.Signal.clearData(this);
    }
    /**
     * Get an initial query value if applicable so that it can be entered
     * into the search box as an initial query
     *
     * @returns Initial value used to populate the search box.
     */
    getInitialQuery() {
        return '';
    }
    /**
     * Get the filters for the given provider.
     *
     * @returns The filters.
     *
     * ### Notes
     * TODO For now it only supports boolean filters (represented with checkboxes)
     */
    getFilters() {
        return {};
    }
    /**
     * Utility for copying the letter case from old to new text.
     */
    static preserveCase(oldText, newText) {
        if (oldText.toUpperCase() === oldText) {
            return newText.toUpperCase();
        }
        if (oldText.toLowerCase() === oldText) {
            return newText.toLowerCase();
        }
        if (toSentenceCase(oldText) === oldText) {
            return toSentenceCase(newText);
        }
        return newText;
    }
}
/**
 * Capitalise first letter of provided word.
 */
function toSentenceCase([first = '', ...suffix]) {
    return first.toUpperCase() + '' + suffix.join('').toLowerCase();
}
//# sourceMappingURL=searchprovider.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/documentsearch/lib/providers/genericsearchprovider.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


const FOUND_CLASSES = ['cm-string', 'cm-overlay', 'cm-searching'];
const SELECTED_CLASSES = ['CodeMirror-selectedtext'];
/**
 * HTML search engine
 */
class HTMLSearchEngine {
    /**
     * Search for a `query` in a DOM tree.
     *
     * @param query Regular expression to search
     * @param rootNode DOM root node to search in
     * @returns The list of matches
     */
    static search(query, rootNode) {
        if (!(rootNode instanceof Node)) {
            console.warn('Unable to search with HTMLSearchEngine the provided object.', rootNode);
            return Promise.resolve([]);
        }
        if (!query.global) {
            query = new RegExp(query.source, query.flags + 'g');
        }
        const matches = [];
        const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
            acceptNode: node => {
                // Filter subtrees of UNSUPPORTED_ELEMENTS and nodes that
                // do not contain our search text
                let parentElement = node.parentElement;
                while (parentElement !== rootNode) {
                    if (parentElement.nodeName in HTMLSearchEngine.UNSUPPORTED_ELEMENTS) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    parentElement = parentElement.parentElement;
                }
                return query.test(node.textContent)
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        });
        let node = null;
        while ((node = walker.nextNode()) !== null) {
            // Reset query index
            query.lastIndex = 0;
            let match = null;
            while ((match = query.exec(node.textContent)) !== null) {
                matches.push({
                    text: match[0],
                    position: match.index,
                    node: node
                });
            }
        }
        return Promise.resolve(matches);
    }
}
/**
 * We choose opt out as most node types should be searched (e.g. script).
 * Even nodes like <data>, could have textContent we care about.
 *
 * Note: nodeName is capitalized, so we do the same here
 */
HTMLSearchEngine.UNSUPPORTED_ELEMENTS = {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Document_metadata
    BASE: true,
    HEAD: true,
    LINK: true,
    META: true,
    STYLE: true,
    TITLE: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Sectioning_root
    BODY: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Content_sectioning
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Text_content
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Inline_text_semantics
    // Above is searched
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Image_and_multimedia
    AREA: true,
    AUDIO: true,
    IMG: true,
    MAP: true,
    TRACK: true,
    VIDEO: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Embedded_content
    APPLET: true,
    EMBED: true,
    IFRAME: true,
    NOEMBED: true,
    OBJECT: true,
    PARAM: true,
    PICTURE: true,
    SOURCE: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Scripting
    CANVAS: true,
    NOSCRIPT: true,
    SCRIPT: true,
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Demarcating_edits
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Table_content
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Forms
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Interactive_elements
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element#Web_Components
    // Above is searched
    // Other:
    SVG: true
};
/**
 * Generic DOM tree search provider.
 */
class GenericSearchProvider extends SearchProvider {
    constructor() {
        super(...arguments);
        /**
         * Set to true if the widget under search is read-only, false
         * if it is editable.  Will be used to determine whether to show
         * the replace option.
         */
        this.isReadOnly = true;
        this._matches = [];
        this._mutationObserver = new MutationObserver(this._onWidgetChanged.bind(this));
        this._markNodes = new Array();
    }
    /**
     * Report whether or not this provider has the ability to search on the given object
     */
    static isApplicable(domain) {
        return domain instanceof widgets_dist_index_es6.Widget;
    }
    /**
     * Instantiate a generic search provider for the widget.
     *
     * #### Notes
     * The widget provided is always checked using `isApplicable` before calling
     * this factory.
     *
     * @param widget The widget to search on
     * @param registry The search provider registry
     * @param translator [optional] The translator object
     *
     * @returns The search provider on the widget
     */
    static createNew(widget, registry, translator) {
        return new GenericSearchProvider(widget);
    }
    /**
     * The current index of the selected match.
     */
    get currentMatchIndex() {
        return this._currentMatchIndex >= 0 ? this._currentMatchIndex : null;
    }
    /**
     * The current match
     */
    get currentMatch() {
        var _a;
        return (_a = this._matches[this._currentMatchIndex]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The current matches
     */
    get matches() {
        // Ensure that no other fn can overwrite matches index property
        // We shallow clone each node
        return this._matches
            ? this._matches.map(m => Object.assign({}, m))
            : this._matches;
    }
    /**
     * The number of matches.
     */
    get matchesCount() {
        return this._matches.length;
    }
    /**
     * Clear currently highlighted match.
     */
    clearHighlight() {
        if (this._currentMatchIndex >= 0) {
            const hit = this._markNodes[this._currentMatchIndex];
            hit.classList.remove(...SELECTED_CLASSES);
        }
        this._currentMatchIndex = -1;
        return Promise.resolve();
    }
    /**
     * Dispose of the resources held by the search provider.
     *
     * #### Notes
     * If the object's `dispose` method is called more than once, all
     * calls made after the first will be a no-op.
     *
     * #### Undefined Behavior
     * It is undefined behavior to use any functionality of the object
     * after it has been disposed unless otherwise explicitly noted.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this.endQuery().catch(reason => {
            console.error(`Failed to end search query.`, reason);
        });
        super.dispose();
    }
    /**
     * Move the current match indicator to the next match.
     *
     * @param loop Whether to loop within the matches list.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightNext(loop) {
        var _a;
        return (_a = this._highlightNext(false, loop !== null && loop !== void 0 ? loop : true)) !== null && _a !== void 0 ? _a : undefined;
    }
    /**
     * Move the current match indicator to the previous match.
     *
     * @param loop Whether to loop within the matches list.
     *
     * @returns A promise that resolves once the action has completed.
     */
    async highlightPrevious(loop) {
        var _a;
        return (_a = this._highlightNext(true, loop !== null && loop !== void 0 ? loop : true)) !== null && _a !== void 0 ? _a : undefined;
    }
    /**
     * Replace the currently selected match with the provided text
     *
     * @param newText The replacement text
     * @param loop Whether to loop within the matches list.
     *
     * @returns A promise that resolves with a boolean indicating whether a replace occurred.
     */
    async replaceCurrentMatch(newText, loop) {
        return Promise.resolve(false);
    }
    /**
     * Replace all matches in the notebook with the provided text
     *
     * @param newText The replacement text
     *
     * @returns A promise that resolves with a boolean indicating whether a replace occurred.
     */
    async replaceAllMatches(newText) {
        // This is read only, but we could loosen this in theory for input boxes...
        return Promise.resolve(false);
    }
    /**
     * Initialize the search using the provided options.  Should update the UI
     * to highlight all matches and "select" whatever the first match should be.
     *
     * @param query A RegExp to be use to perform the search
     * @param filters Filter parameters to pass to provider
     */
    async startQuery(query, filters = {}) {
        await this.endQuery();
        this._query = query;
        if (query === null) {
            return Promise.resolve();
        }
        const matches = await HTMLSearchEngine.search(query, this.widget.node);
        // Transform the DOM
        let nodeIdx = 0;
        while (nodeIdx < matches.length) {
            let activeNode = matches[nodeIdx].node;
            let parent = activeNode.parentNode;
            let subMatches = [matches[nodeIdx]];
            while (++nodeIdx < matches.length &&
                matches[nodeIdx].node === activeNode) {
                subMatches.unshift(matches[nodeIdx]);
            }
            const markedNodes = subMatches.map(match => {
                // TODO: support tspan for svg when svg support is added
                const markedNode = document.createElement('mark');
                markedNode.classList.add(...FOUND_CLASSES);
                markedNode.textContent = match.text;
                const newNode = activeNode.splitText(match.position);
                newNode.textContent = newNode.textContent.slice(match.text.length);
                parent.insertBefore(markedNode, newNode);
                return markedNode;
            });
            // Insert node in reverse order as we replace from last to first
            // to maintain match position.
            for (let i = markedNodes.length - 1; i >= 0; i--) {
                this._markNodes.push(markedNodes[i]);
            }
        }
        // Watch for future changes:
        this._mutationObserver.observe(this.widget.node, 
        // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
        {
            attributes: false,
            characterData: true,
            childList: true,
            subtree: true
        });
        this._matches = matches;
    }
    /**
     * Clear the highlighted matches and any internal state.
     */
    async endQuery() {
        this._mutationObserver.disconnect();
        this._markNodes.forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });
        this._markNodes = [];
        this._matches = [];
        this._currentMatchIndex = -1;
    }
    _highlightNext(reverse, loop) {
        if (this._matches.length === 0) {
            return null;
        }
        if (this._currentMatchIndex === -1) {
            this._currentMatchIndex = reverse ? this.matches.length - 1 : 0;
        }
        else {
            const hit = this._markNodes[this._currentMatchIndex];
            hit.classList.remove(...SELECTED_CLASSES);
            this._currentMatchIndex = reverse
                ? this._currentMatchIndex - 1
                : this._currentMatchIndex + 1;
            if (loop &&
                (this._currentMatchIndex < 0 ||
                    this._currentMatchIndex >= this._matches.length)) {
                // Cheap way to make this a circular buffer
                this._currentMatchIndex =
                    (this._currentMatchIndex + this._matches.length) %
                        this._matches.length;
            }
        }
        if (this._currentMatchIndex >= 0 &&
            this._currentMatchIndex < this._matches.length) {
            const hit = this._markNodes[this._currentMatchIndex];
            hit.classList.add(...SELECTED_CLASSES);
            // If not in view, scroll just enough to see it
            if (!elementInViewport(hit)) {
                hit.scrollIntoView(reverse);
            }
            hit.focus();
            return this._matches[this._currentMatchIndex];
        }
        else {
            this._currentMatchIndex = -1;
            return null;
        }
    }
    async _onWidgetChanged(mutations, observer) {
        this._currentMatchIndex = -1;
        // This is typically cheap, but we do not control the rate of change or size of the output
        await this.startQuery(this._query);
        this._stateChanged.emit();
    }
}
function elementInViewport(el) {
    const boundingClientRect = el.getBoundingClientRect();
    return (boundingClientRect.top >= 0 &&
        boundingClientRect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        boundingClientRect.left >= 0 &&
        boundingClientRect.right <=
            (window.innerWidth || document.documentElement.clientWidth));
}
//# sourceMappingURL=genericsearchprovider.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/documentsearch/lib/providers/textprovider.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * Search provider for text/plain
 */
const TextSearchEngine = {
    /**
     * Search for regular expression matches in a string.
     *
     * @param query Query regular expression
     * @param data String to look into
     * @returns List of matches
     */
    search(query, data) {
        // If data is not a string, try to JSON serialize the data.
        if (typeof data !== 'string') {
            try {
                data = JSON.stringify(data);
            }
            catch (reason) {
                console.warn('Unable to search with TextSearchEngine non-JSON serializable object.', reason, data);
                return Promise.resolve([]);
            }
        }
        if (!query.global) {
            query = new RegExp(query.source, query.flags + 'g');
        }
        const matches = new Array();
        let match = null;
        while ((match = query.exec(data)) !== null) {
            matches.push({
                text: match[0],
                position: match.index
            });
        }
        return Promise.resolve(matches);
    }
};
//# sourceMappingURL=textprovider.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/searchprovider.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * Search provider for editors.
 */
class EditorSearchProvider {
    /**
     * Constructor
     */
    constructor() {
        /**
         * Current match index
         */
        this.currentIndex = null;
        /**
         * Current search query
         */
        this.query = null;
        this._isActive = true;
        this._inSelection = null;
        this._isDisposed = false;
        this._cmHandler = null;
        this.currentIndex = null;
        this._stateChanged = new dist_index_es6.Signal(this);
    }
    /**
     * CodeMirror search highlighter
     */
    get cmHandler() {
        if (!this._cmHandler) {
            this._cmHandler = new CodeMirrorSearchHighlighter(this.editor);
        }
        return this._cmHandler;
    }
    /**
     * Changed signal to be emitted when search matches change.
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * Current match index
     */
    get currentMatchIndex() {
        return this.isActive ? this.currentIndex : null;
    }
    /**
     * Whether the cell search is active.
     *
     * This is used when applying search only on selected cells.
     */
    get isActive() {
        return this._isActive;
    }
    /**
     * Whether the search provider is disposed or not.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Number of matches in the cell.
     */
    get matchesCount() {
        return this.isActive ? this.cmHandler.matches.length : 0;
    }
    /**
     * Clear currently highlighted match
     */
    clearHighlight() {
        this.currentIndex = null;
        this.cmHandler.clearHighlight();
        return Promise.resolve();
    }
    /**
     * Dispose the search provider
     */
    dispose() {
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        dist_index_es6.Signal.clearData(this);
        if (this.isActive) {
            this.endQuery().catch(reason => {
                console.error(`Failed to end search query on cells.`, reason);
            });
        }
    }
    /**
     * Set `isActive` status.
     *
     * #### Notes
     * It will start or end the search
     *
     * @param v New value
     */
    async setIsActive(v) {
        if (this._isActive === v) {
            return;
        }
        this._isActive = v;
        if (this._isActive) {
            if (this.query !== null) {
                await this.startQuery(this.query, this.filters);
            }
        }
        else {
            await this.endQuery();
        }
    }
    /**
     * Set whether search should be limitted to specified text selection.
     */
    async setSearchSelection(selection) {
        if (this._inSelection === selection) {
            return;
        }
        this._inSelection = selection;
        await this.updateCodeMirror(this.model.sharedModel.getSource());
        this._stateChanged.emit();
    }
    /**
     * Set whether user selection should be protected from modifications.
     *
     * If disabled, the selection will be updated on search and on editor focus
     * to cover the current match. We need to protect selection from modifications
     * for both: search in text and search in cells; since `setSearchSelection`
     * is only telling us about search in text, we need to have an additional
     * way to signal that either search in text or in cells is active, or for
     * any other reason selection range should be protected.
     */
    setProtectSelection(v) {
        this.cmHandler.protectSelection = v;
    }
    /**
     * Initialize the search using the provided options. Should update the UI
     * to highlight all matches and "select" the first match.
     *
     * @param query A RegExp to be use to perform the search
     * @param filters Filter parameters to pass to provider
     */
    async startQuery(query, filters) {
        this.query = query;
        this.filters = filters;
        // Search input
        const content = this.model.sharedModel.getSource();
        await this.updateCodeMirror(content);
        this.model.sharedModel.changed.connect(this.onSharedModelChanged, this);
    }
    /**
     * Stop the search and clean any UI elements.
     */
    async endQuery() {
        await this.clearHighlight();
        await this.cmHandler.endQuery();
        this.currentIndex = null;
    }
    /**
     * Highlight the next match.
     *
     * @returns The next match if there is one.
     */
    async highlightNext(loop = true, options) {
        if (this.matchesCount === 0 || !this.isActive) {
            this.currentIndex = null;
        }
        else {
            let match = await this.cmHandler.highlightNext(options);
            if (match) {
                this.currentIndex = this.cmHandler.currentIndex;
            }
            else {
                // Note: the loop logic is only used in single-editor (e.g. file editor)
                // provider sub-classes, notebook has it's own loop logic and ignores
                // `currentIndex` as set here.
                this.currentIndex = loop ? 0 : null;
            }
            return match;
        }
        return Promise.resolve(this.getCurrentMatch());
    }
    /**
     * Highlight the previous match.
     *
     * @returns The previous match if there is one.
     */
    async highlightPrevious(loop = true, options) {
        if (this.matchesCount === 0 || !this.isActive) {
            this.currentIndex = null;
        }
        else {
            let match = await this.cmHandler.highlightPrevious(options);
            if (match) {
                this.currentIndex = this.cmHandler.currentIndex;
            }
            else {
                this.currentIndex = loop ? this.matchesCount - 1 : null;
            }
            return match;
        }
        return Promise.resolve(this.getCurrentMatch());
    }
    /**
     * Replace the currently selected match with the provided text.
     *
     * If no match is selected, it won't do anything.
     *
     * The caller of this method is expected to call `highlightNext` if after
     * calling `replaceCurrentMatch()` attribute `this.currentIndex` is null.
     * It is necesary to let the caller handle highlighting because this
     * method is used in composition pattern (search engine of notebook cells)
     * and highligthing on the composer (notebook) level needs to switch to next
     * engine (cell) with matches.
     *
     * @param newText The replacement text.
     * @returns Whether a replace occurred.
     */
    replaceCurrentMatch(newText, loop, options) {
        if (!this.isActive) {
            return Promise.resolve(false);
        }
        let occurred = false;
        if (this.currentIndex !== null &&
            this.currentIndex < this.cmHandler.matches.length) {
            const match = this.getCurrentMatch();
            // If cursor there is no match selected, highlight the next match
            if (!match) {
                this.currentIndex = null;
            }
            else {
                this.cmHandler.matches.splice(this.currentIndex, 1);
                this.currentIndex =
                    this.currentIndex < this.cmHandler.matches.length
                        ? Math.max(this.currentIndex - 1, 0)
                        : null;
                const substitutedText = (options === null || options === void 0 ? void 0 : options.regularExpression)
                    ? match.text.replace(this.query, newText)
                    : newText;
                const insertText = (options === null || options === void 0 ? void 0 : options.preserveCase)
                    ? GenericSearchProvider.preserveCase(match.text, substitutedText)
                    : substitutedText;
                this.model.sharedModel.updateSource(match.position, match.position + match.text.length, insertText);
                occurred = true;
            }
        }
        return Promise.resolve(occurred);
    }
    /**
     * Replace all matches in the cell source with the provided text
     *
     * @param newText The replacement text.
     * @returns Whether a replace occurred.
     */
    replaceAllMatches(newText, options) {
        if (!this.isActive) {
            return Promise.resolve(false);
        }
        let occurred = this.cmHandler.matches.length > 0;
        let src = this.model.sharedModel.getSource();
        let lastEnd = 0;
        const finalSrc = this.cmHandler.matches.reduce((agg, match) => {
            const start = match.position;
            const end = start + match.text.length;
            const substitutedText = (options === null || options === void 0 ? void 0 : options.regularExpression)
                ? match.text.replace(this.query, newText)
                : newText;
            const insertText = (options === null || options === void 0 ? void 0 : options.preserveCase)
                ? GenericSearchProvider.preserveCase(match.text, substitutedText)
                : substitutedText;
            const newStep = `${agg}${src.slice(lastEnd, start)}${insertText}`;
            lastEnd = end;
            return newStep;
        }, '');
        if (occurred) {
            this.cmHandler.matches = [];
            this.currentIndex = null;
            this.model.sharedModel.setSource(`${finalSrc}${src.slice(lastEnd)}`);
        }
        return Promise.resolve(occurred);
    }
    /**
     * Get the current match if it exists.
     *
     * @returns The current match
     */
    getCurrentMatch() {
        if (this.currentIndex === null) {
            return undefined;
        }
        else {
            let match = undefined;
            if (this.currentIndex < this.cmHandler.matches.length) {
                match = this.cmHandler.matches[this.currentIndex];
            }
            return match;
        }
    }
    /**
     * Callback on source change
     *
     * @param emitter Source of the change
     * @param changes Source change
     */
    async onSharedModelChanged(emitter, changes) {
        if (changes.sourceChange) {
            await this.updateCodeMirror(emitter.getSource());
            this._stateChanged.emit();
        }
    }
    /**
     * Update matches
     */
    async updateCodeMirror(content) {
        if (this.query !== null && this.isActive) {
            const allMatches = await TextSearchEngine.search(this.query, content);
            if (this._inSelection) {
                const editor = this.editor;
                const start = editor.getOffsetAt(this._inSelection.start);
                const end = editor.getOffsetAt(this._inSelection.end);
                this.cmHandler.matches = allMatches.filter(match => match.position >= start && match.position <= end);
                // A special case to always have a current match when in line selection mode.
                if (this.cmHandler.currentIndex === null &&
                    this.cmHandler.matches.length > 0) {
                    await this.cmHandler.highlightNext({
                        from: 'selection',
                        select: false,
                        scroll: false
                    });
                }
                this.currentIndex = this.cmHandler.currentIndex;
            }
            else {
                this.cmHandler.matches = allMatches;
            }
        }
        else {
            this.cmHandler.matches = [];
        }
    }
}
/**
 * Helper class to highlight texts in a code mirror editor.
 *
 * Highlighted texts (aka `matches`) must be provided through
 * the `matches` attributes.
 *
 * **NOTES:**
 * - to retain the selection visibility `drawSelection` extension is needed.
 * - highlighting starts from the cursor (if editor is focused and `from` is set
 *   to `'auto'`, cursor moved, or `from` argument is set to `'selection'` or
 *   `'selection-start'`), or from last "current" match otherwise.
 * - `currentIndex` is the (readonly) source of truth for the current match.
 */
class CodeMirrorSearchHighlighter {
    /**
     * Constructor
     *
     * @param editor The CodeMirror editor
     */
    constructor(editor) {
        this._current = null;
        this._cm = editor;
        this._matches = new Array();
        this._currentIndex = null;
        this._highlightEffect = state_dist.StateEffect.define({
            map: (value, mapping) => {
                const transform = (v) => ({
                    text: v.text,
                    position: mapping.mapPos(v.position)
                });
                return {
                    matches: value.matches.map(transform),
                    currentMatch: value.currentMatch
                        ? transform(value.currentMatch)
                        : null
                };
            }
        });
        this._highlightMark = view_dist.Decoration.mark({ class: 'cm-searching' });
        this._currentMark = view_dist.Decoration.mark({ class: 'jp-current-match' });
        this._highlightField = state_dist.StateField.define({
            create: () => {
                return view_dist.Decoration.none;
            },
            update: (highlights, transaction) => {
                highlights = highlights.map(transaction.changes);
                for (let ef of transaction.effects) {
                    if (ef.is(this._highlightEffect)) {
                        const e = ef;
                        if (e.value.matches.length) {
                            // Note: nesting will vary; sometimes `.cm-searching` will be
                            // inside `.jp-current-match`, sometime the other way round.
                            highlights = highlights.update({
                                add: e.value.matches.map(m => this._highlightMark.range(m.position, m.position + m.text.length)),
                                // filter out old marks
                                filter: () => false
                            });
                            highlights = highlights.update({
                                add: e.value.currentMatch
                                    ? [
                                        this._currentMark.range(e.value.currentMatch.position, e.value.currentMatch.position +
                                            e.value.currentMatch.text.length)
                                    ]
                                    : []
                            });
                        }
                        else {
                            highlights = view_dist.Decoration.none;
                        }
                    }
                }
                return highlights;
            },
            provide: f => view_dist.EditorView.decorations.from(f)
        });
        this._domEventHandlers = view_dist.EditorView.domEventHandlers({
            focus: () => {
                // Set cursor on active match when editor gets focused.
                this._selectCurrentMatch();
            }
        });
    }
    /**
     * The current index of the selected match.
     */
    get currentIndex() {
        return this._currentIndex;
    }
    /**
     * The list of matches
     */
    get matches() {
        return this._matches;
    }
    set matches(v) {
        this._matches = v;
        if (this._currentIndex !== null &&
            this._currentIndex > this._matches.length) {
            this._currentIndex = this._matches.length > 0 ? 0 : null;
        }
        this._highlightCurrentMatch({ select: false });
    }
    /**
     * Whether the cursor/selection should not be modified.
     */
    get protectSelection() {
        return this._protectSelection;
    }
    set protectSelection(v) {
        this._protectSelection = v;
    }
    /**
     * Clear all highlighted matches
     */
    clearHighlight() {
        this._currentIndex = null;
        this._highlightCurrentMatch();
    }
    /**
     * Clear the highlighted matches.
     */
    endQuery() {
        this._currentIndex = null;
        this._matches = [];
        if (this._cm) {
            this._cm.editor.dispatch({
                effects: this._highlightEffect.of({ matches: [], currentMatch: null })
            });
        }
        return Promise.resolve();
    }
    /**
     * Highlight the next match
     *
     * @returns The next match if available
     */
    highlightNext(options) {
        var _a;
        this._currentIndex = this._findNext(false, (_a = options === null || options === void 0 ? void 0 : options.from) !== null && _a !== void 0 ? _a : 'auto');
        this._highlightCurrentMatch(options);
        return Promise.resolve(this._currentIndex !== null
            ? this._matches[this._currentIndex]
            : undefined);
    }
    /**
     * Highlight the previous match
     *
     * @returns The previous match if available
     */
    highlightPrevious(options) {
        var _a;
        this._currentIndex = this._findNext(true, (_a = options === null || options === void 0 ? void 0 : options.from) !== null && _a !== void 0 ? _a : 'auto');
        this._highlightCurrentMatch(options);
        return Promise.resolve(this._currentIndex !== null
            ? this._matches[this._currentIndex]
            : undefined);
    }
    /**
     * Set the editor
     *
     * @param editor Editor
     */
    setEditor(editor) {
        if (this._cm) {
            throw new Error('CodeMirrorEditor already set.');
        }
        else {
            this._cm = editor;
            if (this._currentIndex !== null) {
                this._highlightCurrentMatch();
            }
            this._cm.editor.dispatch({
                effects: state_dist.StateEffect.appendConfig.of(this._domEventHandlers)
            });
            this._refresh();
        }
    }
    _selectCurrentMatch(scroll = true) {
        // This method has two responsibilities:
        // 1) Scroll the current match into the view - useful for long lines,
        //    and file editors with more lines that fit on the screen
        // 2) When user has focus on the editor (not search box) and presses
        //    ctrl + g/ctrl + shift + g to jump to next match they want their
        //    cursor to jump too.
        // We execute (1) and (2) together as CodeMirror has a special code path
        // to handle both in a single dispatch.
        // The (2) case is inapplicable to search in selection mode, as it would
        // invalidate the query selection, so in that case we only execute (1).
        const match = this._current;
        if (!match) {
            return;
        }
        if (!this._cm) {
            return;
        }
        const cursor = {
            anchor: match.position,
            head: match.position + match.text.length
        };
        const selection = this._cm.editor.state.selection.main;
        if ((selection.from === match.position &&
            selection.to === match.position + match.text.length) ||
            this._protectSelection) {
            // Correct selection is already set or search is restricted to selection:
            // scroll without changing the selection.
            if (scroll) {
                this._cm.editor.dispatch({
                    effects: view_dist.EditorView.scrollIntoView(state_dist.EditorSelection.range(cursor.anchor, cursor.head))
                });
                return;
            }
        }
        else {
            this._cm.editor.dispatch({
                selection: cursor,
                scrollIntoView: scroll
            });
        }
    }
    _highlightCurrentMatch(options) {
        var _a, _b, _c;
        if (!this._cm) {
            // no-op
            return;
        }
        // Highlight the current index
        if (this._currentIndex !== null) {
            const match = this.matches[this._currentIndex];
            this._current = match;
            // We do not change selection nor scroll if:
            // - user is selecting text,
            // - document was modified
            if ((_a = options === null || options === void 0 ? void 0 : options.select) !== null && _a !== void 0 ? _a : true) {
                if (this._cm.hasFocus()) {
                    // If editor is focused we actually set the cursor on the match.
                    this._selectCurrentMatch((_b = options === null || options === void 0 ? void 0 : options.scroll) !== null && _b !== void 0 ? _b : true);
                }
                else if ((_c = options === null || options === void 0 ? void 0 : options.scroll) !== null && _c !== void 0 ? _c : true) {
                    // otherwise we just scroll to preserve the selection.
                    this._cm.editor.dispatch({
                        effects: view_dist.EditorView.scrollIntoView(match.position)
                    });
                }
            }
        }
        else {
            this._current = null;
        }
        this._refresh();
    }
    _refresh() {
        if (!this._cm) {
            // no-op
            return;
        }
        let effects = [
            this._highlightEffect.of({
                matches: this.matches,
                currentMatch: this._current
            })
        ];
        if (!this._cm.state.field(this._highlightField, false)) {
            effects.push(state_dist.StateEffect.appendConfig.of([this._highlightField]));
        }
        this._cm.editor.dispatch({ effects });
    }
    _findNext(reverse, from = 'auto') {
        var _a, _b, _c, _d;
        if (this._matches.length === 0) {
            // No-op
            return null;
        }
        // If the editor has not be instantiated yet (e.g. a cell that has not yet be seen in the viewport),
        // force the behavior
        if (!this._cm && !['previous-match', 'start'].includes(from)) {
            from = 'previous-match';
        }
        let lastPosition = 0;
        if ((from === 'auto' && ((_b = (_a = this._cm) === null || _a === void 0 ? void 0 : _a.hasFocus()) !== null && _b !== void 0 ? _b : false)) ||
            from === 'selection') {
            const cursor = this._cm.state.selection.main;
            lastPosition = reverse ? cursor.anchor : cursor.head;
        }
        else if (from === 'selection-start') {
            const cursor = this._cm.state.selection.main;
            lastPosition = Math.min(cursor.anchor, cursor.head);
        }
        else if (from === 'start') {
            lastPosition = 0;
        }
        else if (this._current) {
            lastPosition = reverse
                ? this._current.position
                : this._current.position + this._current.text.length;
        }
        if (lastPosition === 0 && reverse && this.currentIndex === null) {
            // The default position is (0, 0) but we want to start from the end in that case
            // Fallback to the end of the latest match if the editor is not instantiated
            lastPosition =
                (_d = (_c = this._cm) === null || _c === void 0 ? void 0 : _c.doc.length) !== null && _d !== void 0 ? _d : endLastMatch(this._matches[this._matches.length - 1]);
        }
        const position = lastPosition;
        let found = Utils.findNext(this._matches, position, 0, this._matches.length - 1);
        if (found === null) {
            // Don't loop
            return reverse ? this._matches.length - 1 : null;
        }
        if (reverse) {
            found -= 1;
            if (found < 0) {
                // Don't loop
                return null;
            }
        }
        return found;
        function endLastMatch(lastMatch) {
            return lastMatch ? lastMatch.position + lastMatch.text.length : 0;
        }
    }
}
/**
 * Helpers namespace
 */
var Utils;
(function (Utils) {
    /**
     * Find the closest match at `position` just after it.
     *
     * #### Notes
     * Search is done using a binary search algorithm
     *
     * @param matches List of matches
     * @param position Searched position
     * @param lowerBound Lower range index
     * @param higherBound High range index
     * @returns The next match or null if none exists
     */
    function findNext(matches, position, lowerBound = 0, higherBound = Infinity) {
        higherBound = Math.min(matches.length - 1, higherBound);
        while (lowerBound <= higherBound) {
            let middle = Math.floor(0.5 * (lowerBound + higherBound));
            const currentPosition = matches[middle].position;
            if (currentPosition < position) {
                lowerBound = middle + 1;
                if (lowerBound < matches.length &&
                    matches[lowerBound].position > position) {
                    return lowerBound;
                }
            }
            else if (currentPosition > position) {
                higherBound = middle - 1;
                if (higherBound > 0 && matches[higherBound].position < position) {
                    return middle;
                }
            }
            else {
                return middle;
            }
        }
        // Next could be the first item
        const first = lowerBound > 0 ? lowerBound - 1 : 0;
        const match = matches[first];
        return match.position >= position ? first : null;
    }
    Utils.findNext = findNext;
})(Utils || (Utils = {}));
//# sourceMappingURL=searchprovider.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/token.js
/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Editor language token.
 */
const IEditorExtensionRegistry = new index_es6.Token('@jupyterlab/codemirror:IEditorExtensionRegistry', `A registry for CodeMirror extension factories.`);
/**
 * Editor language token.
 */
const IEditorLanguageRegistry = new index_es6.Token('@jupyterlab/codemirror:IEditorLanguageRegistry', 'A registry for CodeMirror languages.');
/**
 * Editor theme token.
 */
const IEditorThemeRegistry = new index_es6.Token('@jupyterlab/codemirror:IEditorThemeRegistry', 'A registry for CodeMirror theme.');
//# sourceMappingURL=token.js.map
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/codemirror/lib/index.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module codemirror
 */










//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@jupyterlab/ui-components/lib/icon/labicon.js + 3 modules
var labicon = __webpack_require__(18428);
// EXTERNAL MODULE: ./node_modules/@jupyterlab/ui-components/lib/utils.js
var utils = __webpack_require__(5244);
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/ui-components/lib/components/inputgroup.js
/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */



/**
 * InputGroup component
 *
 * @param props Component properties
 * @returns Component
 */
function InputGroup(props) {
    const { className, inputRef, rightIcon, ...others } = props;
    return (react.createElement("div", { className: (0,utils.classes)('jp-InputGroup', className) },
        react.createElement("input", { ref: inputRef, ...others }),
        rightIcon && (react.createElement("span", { className: "jp-InputGroupAction" }, typeof rightIcon === 'string' ? (react.createElement(labicon.LabIcon.resolveReact, { icon: rightIcon, elementPosition: "center", tag: "span" })) : (react.createElement(rightIcon.react, { elementPosition: "center", tag: "span" }))))));
}
//# sourceMappingURL=inputgroup.js.map
// EXTERNAL MODULE: ./node_modules/react-highlight-words/dist/main.js
var main = __webpack_require__(37763);
var main_default = /*#__PURE__*/__webpack_require__.n(main);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(10434);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/objType.js
function objType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type === 'Object' && typeof obj[Symbol.iterator] === 'function') {
    return 'Iterable';
  }
  if (type === 'Custom' && obj.constructor !== Object && obj instanceof Object) {
    // For projects implementing objects overriding `.prototype[Symbol.toStringTag]`
    return 'Object';
  }
  return type;
}
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/JSONArrow.js


function JSONArrow(_ref) {
  let {
    styling,
    arrowStyle = 'single',
    expanded,
    nodeType,
    onClick
  } = _ref;
  return /*#__PURE__*/react.createElement("div", extends_default()({}, styling('arrowContainer', arrowStyle), {
    onClick: onClick
  }), /*#__PURE__*/react.createElement("div", styling(['arrow', 'arrowSign'], nodeType, expanded, arrowStyle), '\u25B6', arrowStyle === 'double' && /*#__PURE__*/react.createElement("div", styling(['arrowSign', 'arrowSignInner']), '\u25B6')));
}
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/getCollectionEntries.js
function getLength(type, collection) {
  if (type === 'Object') {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return Object.keys(collection).length;
  } else if (type === 'Array') {
    return collection.length;
  }
  return Infinity;
}
function isIterableMap(collection) {
  return typeof collection.set === 'function';
}
function getEntries(type, collection, sortObjectKeys) {
  let from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  let to = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Infinity;
  let res;
  if (type === 'Object') {
    let keys = Object.getOwnPropertyNames(collection);
    if (sortObjectKeys) {
      keys.sort(sortObjectKeys === true ? undefined : sortObjectKeys);
    }
    keys = keys.slice(from, to + 1);
    res = {
      entries: keys.map(key => ({
        key,
        value: collection[key]
      }))
    };
  } else if (type === 'Array') {
    res = {
      entries: collection.slice(from, to + 1).map((val, idx) => ({
        key: idx + from,
        value: val
      }))
    };
  } else {
    let idx = 0;
    const entries = [];
    let done = true;
    const isMap = isIterableMap(collection);
    for (const item of collection) {
      if (idx > to) {
        done = false;
        break;
      }
      if (from <= idx) {
        if (isMap && Array.isArray(item)) {
          if (typeof item[0] === 'string' || typeof item[0] === 'number') {
            entries.push({
              key: item[0],
              value: item[1]
            });
          } else {
            entries.push({
              key: `[entry ${idx}]`,
              value: {
                '[key]': item[0],
                '[value]': item[1]
              }
            });
          }
        } else {
          entries.push({
            key: idx,
            value: item
          });
        }
      }
      idx++;
    }
    res = {
      hasMore: !done,
      entries
    };
  }
  return res;
}
function getRanges(from, to, limit) {
  const ranges = [];
  while (to - from > limit * limit) {
    limit = limit * limit;
  }
  for (let i = from; i <= to; i += limit) {
    ranges.push({
      from: i,
      to: Math.min(to, i + limit - 1)
    });
  }
  return ranges;
}
function getCollectionEntries(type, collection, sortObjectKeys, limit) {
  let from = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  let to = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Infinity;
  const getEntriesBound = getEntries.bind(null, type, collection, sortObjectKeys);
  if (!limit) {
    return getEntriesBound().entries;
  }
  const isSubset = to < Infinity;
  const length = Math.min(to - from, getLength(type, collection));
  if (type !== 'Iterable') {
    if (length <= limit || limit < 7) {
      return getEntriesBound(from, to).entries;
    }
  } else {
    if (length <= limit && !isSubset) {
      return getEntriesBound(from, to).entries;
    }
  }
  let limitedEntries;
  if (type === 'Iterable') {
    const {
      hasMore,
      entries
    } = getEntriesBound(from, from + limit - 1);
    limitedEntries = hasMore ? [...entries, ...getRanges(from + limit, from + 2 * limit - 1, limit)] : entries;
  } else {
    limitedEntries = isSubset ? getRanges(from, to, limit) : [...getEntriesBound(0, limit - 5).entries, ...getRanges(limit - 4, length - 5, limit), ...getEntriesBound(length - 4, length - 1).entries];
  }
  return limitedEntries;
}
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/ItemRange.js



function ItemRange(props) {
  const {
    styling,
    from,
    to,
    renderChildNodes,
    nodeType
  } = props;
  const [expanded, setExpanded] = (0,react.useState)(false);
  const handleClick = (0,react.useCallback)(() => {
    setExpanded(!expanded);
  }, [expanded]);
  return expanded ? /*#__PURE__*/react.createElement("div", styling('itemRange', expanded), renderChildNodes(props, from, to)) : /*#__PURE__*/react.createElement("div", extends_default()({}, styling('itemRange', expanded), {
    onClick: handleClick
  }), /*#__PURE__*/react.createElement(JSONArrow, {
    nodeType: nodeType,
    styling: styling,
    expanded: false,
    onClick: handleClick,
    arrowStyle: "double"
  }), `${from} ... ${to}`);
}
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/JSONNestedNode.js






function isRange(rangeOrEntry) {
  return rangeOrEntry.to !== undefined;
}
function renderChildNodes(props, from, to) {
  const {
    nodeType,
    data,
    collectionLimit,
    circularCache,
    keyPath,
    postprocessValue,
    sortObjectKeys
  } = props;
  const childNodes = [];
  getCollectionEntries(nodeType, data, sortObjectKeys, collectionLimit, from, to).forEach(entry => {
    if (isRange(entry)) {
      childNodes.push( /*#__PURE__*/react.createElement(ItemRange, extends_default()({}, props, {
        key: `ItemRange--${entry.from}-${entry.to}`,
        from: entry.from,
        to: entry.to,
        renderChildNodes: renderChildNodes
      })));
    } else {
      const {
        key,
        value
      } = entry;
      const isCircular = circularCache.indexOf(value) !== -1;
      childNodes.push( /*#__PURE__*/react.createElement(JSONNode, extends_default()({}, props, {
        postprocessValue,
        collectionLimit,
        key: `Node--${key}`,
        keyPath: [key, ...keyPath],
        value: postprocessValue(value),
        circularCache: [...circularCache, value],
        isCircular: isCircular,
        hideRoot: false
      })));
    }
  });
  return childNodes;
}
function JSONNestedNode(props) {
  const {
    circularCache = [],
    collectionLimit,
    createItemString,
    data,
    expandable,
    getItemString,
    hideRoot,
    isCircular,
    keyPath,
    labelRenderer,
    level = 0,
    nodeType,
    nodeTypeIndicator,
    shouldExpandNodeInitially,
    styling
  } = props;
  const [expanded, setExpanded] = (0,react.useState)(
  // calculate individual node expansion if necessary
  isCircular ? false : shouldExpandNodeInitially(keyPath, data, level));
  const handleClick = (0,react.useCallback)(() => {
    if (expandable) setExpanded(!expanded);
  }, [expandable, expanded]);
  const renderedChildren = expanded || hideRoot && level === 0 ? renderChildNodes({
    ...props,
    circularCache,
    level: level + 1
  }) : null;
  const itemType = /*#__PURE__*/react.createElement("span", styling('nestedNodeItemType', expanded), nodeTypeIndicator);
  const renderedItemString = getItemString(nodeType, data, itemType, createItemString(data, collectionLimit), keyPath);
  const stylingArgs = [keyPath, nodeType, expanded, expandable];
  return hideRoot ? /*#__PURE__*/react.createElement("li", styling('rootNode', ...stylingArgs), /*#__PURE__*/react.createElement("ul", styling('rootNodeChildren', ...stylingArgs), renderedChildren)) : /*#__PURE__*/react.createElement("li", styling('nestedNode', ...stylingArgs), expandable && /*#__PURE__*/react.createElement(JSONArrow, {
    styling: styling,
    nodeType: nodeType,
    expanded: expanded,
    onClick: handleClick
  }), /*#__PURE__*/react.createElement("label", extends_default()({}, styling(['label', 'nestedNodeLabel'], ...stylingArgs), {
    onClick: handleClick
  }), labelRenderer(...stylingArgs)), /*#__PURE__*/react.createElement("span", extends_default()({}, styling('nestedNodeItemString', ...stylingArgs), {
    onClick: handleClick
  }), renderedItemString), /*#__PURE__*/react.createElement("ul", styling('nestedNodeChildren', ...stylingArgs), renderedChildren));
}
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/JSONObjectNode.js



// Returns the "n Items" string for this node,
// generating and caching it if it hasn't been created yet.
function createItemString(data) {
  const len = Object.getOwnPropertyNames(data).length;
  return `${len} ${len !== 1 ? 'keys' : 'key'}`;
}
// Configures <JSONNestedNode> to render an Object
function JSONObjectNode(_ref) {
  let {
    data,
    ...props
  } = _ref;
  return /*#__PURE__*/react.createElement(JSONNestedNode, extends_default()({}, props, {
    data: data,
    nodeType: "Object",
    nodeTypeIndicator: props.nodeType === 'Error' ? 'Error()' : '{}',
    createItemString: createItemString,
    expandable: Object.getOwnPropertyNames(data).length > 0
  }));
}
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/JSONArrayNode.js



// Returns the "n Items" string for this node,
// generating and caching it if it hasn't been created yet.
function JSONArrayNode_createItemString(data) {
  return `${data.length} ${data.length !== 1 ? 'items' : 'item'}`;
}
// Configures <JSONNestedNode> to render an Array
function JSONArrayNode(_ref) {
  let {
    data,
    ...props
  } = _ref;
  return /*#__PURE__*/react.createElement(JSONNestedNode, extends_default()({}, props, {
    data: data,
    nodeType: "Array",
    nodeTypeIndicator: "[]",
    createItemString: JSONArrayNode_createItemString,
    expandable: data.length > 0
  }));
}
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/JSONIterableNode.js



// Returns the "n Items" string for this node,
// generating and caching it if it hasn't been created yet.
function JSONIterableNode_createItemString(data, limit) {
  let count = 0;
  let hasMore = false;
  if (Number.isSafeInteger(data.size)) {
    count = data.size;
  } else {
    // eslint-disable-next-line no-unused-vars
    for (const entry of data) {
      if (limit && count + 1 > limit) {
        hasMore = true;
        break;
      }
      count += 1;
    }
  }
  return `${hasMore ? '>' : ''}${count} ${count !== 1 ? 'entries' : 'entry'}`;
}
// Configures <JSONNestedNode> to render an iterable
function JSONIterableNode(props) {
  return /*#__PURE__*/react.createElement(JSONNestedNode, extends_default()({}, props, {
    nodeType: "Iterable",
    nodeTypeIndicator: "()",
    createItemString: JSONIterableNode_createItemString,
    expandable: true
  }));
}
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/JSONValueNode.js

function JSONValueNode(_ref) {
  let {
    nodeType,
    styling,
    labelRenderer,
    keyPath,
    valueRenderer,
    value,
    valueGetter = value => value
  } = _ref;
  return /*#__PURE__*/react.createElement("li", styling('value', nodeType, keyPath), /*#__PURE__*/react.createElement("label", styling(['label', 'valueLabel'], nodeType, keyPath), labelRenderer(keyPath, nodeType, false, false)), /*#__PURE__*/react.createElement("span", styling('valueText', nodeType, keyPath), valueRenderer(valueGetter(value), value, ...keyPath)));
}
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/JSONNode.js







function JSONNode(_ref) {
  let {
    getItemString,
    keyPath,
    labelRenderer,
    styling,
    value,
    valueRenderer,
    isCustomNode,
    ...rest
  } = _ref;
  const nodeType = isCustomNode(value) ? 'Custom' : objType(value);
  const simpleNodeProps = {
    getItemString,
    key: keyPath[0],
    keyPath,
    labelRenderer,
    nodeType,
    styling,
    value,
    valueRenderer
  };
  const nestedNodeProps = {
    ...rest,
    ...simpleNodeProps,
    data: value,
    isCustomNode
  };
  switch (nodeType) {
    case 'Object':
    case 'Error':
    case 'WeakMap':
    case 'WeakSet':
      return /*#__PURE__*/react.createElement(JSONObjectNode, nestedNodeProps);
    case 'Array':
      return /*#__PURE__*/react.createElement(JSONArrayNode, nestedNodeProps);
    case 'Iterable':
    case 'Map':
    case 'Set':
      return /*#__PURE__*/react.createElement(JSONIterableNode, nestedNodeProps);
    case 'String':
      return /*#__PURE__*/react.createElement(JSONValueNode, extends_default()({}, simpleNodeProps, {
        valueGetter: raw => `"${raw}"`
      }));
    case 'Number':
      return /*#__PURE__*/react.createElement(JSONValueNode, simpleNodeProps);
    case 'Boolean':
      return /*#__PURE__*/react.createElement(JSONValueNode, extends_default()({}, simpleNodeProps, {
        valueGetter: raw => raw ? 'true' : 'false'
      }));
    case 'Date':
      return /*#__PURE__*/react.createElement(JSONValueNode, extends_default()({}, simpleNodeProps, {
        valueGetter: raw => raw.toISOString()
      }));
    case 'Null':
      return /*#__PURE__*/react.createElement(JSONValueNode, extends_default()({}, simpleNodeProps, {
        valueGetter: () => 'null'
      }));
    case 'Undefined':
      return /*#__PURE__*/react.createElement(JSONValueNode, extends_default()({}, simpleNodeProps, {
        valueGetter: () => 'undefined'
      }));
    case 'Function':
    case 'Symbol':
      return /*#__PURE__*/react.createElement(JSONValueNode, extends_default()({}, simpleNodeProps, {
        valueGetter: raw => raw.toString()
      }));
    case 'Custom':
      return /*#__PURE__*/react.createElement(JSONValueNode, simpleNodeProps);
    default:
      return /*#__PURE__*/react.createElement(JSONValueNode, extends_default()({}, simpleNodeProps, {
        valueGetter: () => `<${nodeType}>`
      }));
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(18698);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(38416);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(27424);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);
// EXTERNAL MODULE: ./node_modules/base16/lib/index.js
var base16_lib = __webpack_require__(79194);
// EXTERNAL MODULE: ./node_modules/color/index.js
var node_modules_color = __webpack_require__(6767);
var color_default = /*#__PURE__*/__webpack_require__.n(node_modules_color);
// EXTERNAL MODULE: ./node_modules/lodash.curry/index.js
var lodash_curry = __webpack_require__(18024);
var lodash_curry_default = /*#__PURE__*/__webpack_require__.n(lodash_curry);
;// CONCATENATED MODULE: ./node_modules/react-base16-styling/lib/esm/colorConverters.js
function yuv2rgb(yuv) {
  var y = yuv[0],
      u = yuv[1],
      v = yuv[2];
  var r, g, b;
  r = y * 1 + u * 0 + v * 1.13983;
  g = y * 1 + u * -0.39465 + v * -0.5806;
  b = y * 1 + u * 2.02311 + v * 0;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
}
function rgb2yuv(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;
  var y = r * 0.299 + g * 0.587 + b * 0.114;
  var u = r * -0.14713 + g * -0.28886 + b * 0.436;
  var v = r * 0.615 + g * -0.51499 + b * -0.10001;
  return [y, u, v];
}
;// CONCATENATED MODULE: ./node_modules/react-base16-styling/lib/esm/index.js




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { defineProperty_default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





var DEFAULT_BASE16 = base16_lib["default"];
var BASE16_KEYS = Object.keys(DEFAULT_BASE16); // we need a correcting factor, so that a dark, but not black background color
// converts to bright enough inversed color

var flip = function flip(x) {
  return x < 0.25 ? 1 : x < 0.5 ? 0.9 - x : 1.1 - x;
};

var invertColor = function invertColor(hexString) {
  var color = color_default()(hexString);

  var _rgb2yuv = rgb2yuv(color.array()),
      _rgb2yuv2 = slicedToArray_default()(_rgb2yuv, 3),
      y = _rgb2yuv2[0],
      u = _rgb2yuv2[1],
      v = _rgb2yuv2[2];

  var flippedYuv = [flip(y), u, v];
  var rgb = yuv2rgb(flippedYuv);
  return color_default().rgb(rgb).hex();
};

var merger = function merger(styling) {
  return function (prevStyling) {
    return {
      className: [prevStyling.className, styling.className].filter(Boolean).join(' '),
      style: _objectSpread(_objectSpread({}, prevStyling.style || {}), styling.style || {})
    };
  };
};

var mergeStyling = function mergeStyling(customStyling, defaultStyling) {
  if (customStyling === undefined) {
    return defaultStyling;
  }

  if (defaultStyling === undefined) {
    return customStyling;
  }

  var customType = typeof_default()(customStyling);

  var defaultType = typeof_default()(defaultStyling);

  switch (customType) {
    case 'string':
      switch (defaultType) {
        case 'string':
          return [defaultStyling, customStyling].filter(Boolean).join(' ');

        case 'object':
          return merger({
            className: customStyling,
            style: defaultStyling
          });

        case 'function':
          return function (styling) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            return merger({
              className: customStyling
            })(defaultStyling.apply(void 0, [styling].concat(args)));
          };
      }

      break;

    case 'object':
      switch (defaultType) {
        case 'string':
          return merger({
            className: defaultStyling,
            style: customStyling
          });

        case 'object':
          return _objectSpread(_objectSpread({}, defaultStyling), customStyling);

        case 'function':
          return function (styling) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            return merger({
              style: customStyling
            })(defaultStyling.apply(void 0, [styling].concat(args)));
          };
      }

      break;

    case 'function':
      switch (defaultType) {
        case 'string':
          return function (styling) {
            for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
              args[_key3 - 1] = arguments[_key3];
            }

            return customStyling.apply(void 0, [merger(styling)({
              className: defaultStyling
            })].concat(args));
          };

        case 'object':
          return function (styling) {
            for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
              args[_key4 - 1] = arguments[_key4];
            }

            return customStyling.apply(void 0, [merger(styling)({
              style: defaultStyling
            })].concat(args));
          };

        case 'function':
          return function (styling) {
            for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
              args[_key5 - 1] = arguments[_key5];
            }

            return customStyling.apply(void 0, [defaultStyling.apply(void 0, [styling].concat(args))].concat(args));
          };
      }

  }
};

var mergeStylings = function mergeStylings(customStylings, defaultStylings) {
  var keys = Object.keys(defaultStylings);

  for (var key in customStylings) {
    if (keys.indexOf(key) === -1) keys.push(key);
  }

  return keys.reduce(function (mergedStyling, key) {
    return mergedStyling[key] = mergeStyling(customStylings[key], defaultStylings[key]), mergedStyling;
  }, {});
};

var getStylingByKeys = function getStylingByKeys(mergedStyling, keys) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
    args[_key6 - 2] = arguments[_key6];
  }

  if (keys === null) {
    return mergedStyling;
  }

  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  var styles = keys.map(function (key) {
    return mergedStyling[key];
  }).filter(Boolean);
  var props = styles.reduce(function (obj, s) {
    if (typeof s === 'string') {
      obj.className = [obj.className, s].filter(Boolean).join(' ');
    } else if (typeof_default()(s) === 'object') {
      obj.style = _objectSpread(_objectSpread({}, obj.style), s);
    } else if (typeof s === 'function') {
      obj = _objectSpread(_objectSpread({}, obj), s.apply(void 0, [obj].concat(args)));
    }

    return obj;
  }, {
    className: '',
    style: {}
  });

  if (!props.className) {
    delete props.className;
  }

  if (Object.keys(props.style).length === 0) {
    delete props.style;
  }

  return props;
};

var invertBase16Theme = function invertBase16Theme(base16Theme) {
  return Object.keys(base16Theme).reduce(function (t, key) {
    return t[key] = /^base/.test(key) ? invertColor(base16Theme[key]) : key === 'scheme' ? base16Theme[key] + ':inverted' : base16Theme[key], t;
  }, {});
};
var createStyling = lodash_curry_default()(function (getStylingFromBase16) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var themeOrStyling = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$defaultBase = options.defaultBase16,
      defaultBase16 = _options$defaultBase === void 0 ? DEFAULT_BASE16 : _options$defaultBase,
      _options$base16Themes = options.base16Themes,
      base16Themes = _options$base16Themes === void 0 ? null : _options$base16Themes;
  var base16Theme = getBase16Theme(themeOrStyling, base16Themes);

  if (base16Theme) {
    themeOrStyling = _objectSpread(_objectSpread({}, base16Theme), themeOrStyling);
  }

  var theme = BASE16_KEYS.reduce(function (t, key) {
    return t[key] = themeOrStyling[key] || defaultBase16[key], t;
  }, {});
  var customStyling = Object.keys(themeOrStyling).reduce(function (s, key) {
    return BASE16_KEYS.indexOf(key) === -1 ? (s[key] = themeOrStyling[key], s) : s;
  }, {});
  var defaultStyling = getStylingFromBase16(theme);
  var mergedStyling = mergeStylings(customStyling, defaultStyling);

  for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key7 = 3; _key7 < _len7; _key7++) {
    args[_key7 - 3] = arguments[_key7];
  }

  return lodash_curry_default()(getStylingByKeys, 2).apply(void 0, [mergedStyling].concat(args));
}, 3);

var isStylingConfig = function isStylingConfig(theme) {
  return !!theme.extend;
};

var getBase16Theme = function getBase16Theme(theme, base16Themes) {
  if (theme && isStylingConfig(theme) && theme.extend) {
    theme = theme.extend;
  }

  if (typeof theme === 'string') {
    var _theme$split = theme.split(':'),
        _theme$split2 = slicedToArray_default()(_theme$split, 2),
        _themeName = _theme$split2[0],
        modifier = _theme$split2[1];

    if (base16Themes) {
      theme = base16Themes[_themeName];
    } else {
      theme = base16_lib[_themeName];
    }

    if (modifier === 'inverted') {
      theme = invertBase16Theme(theme);
    }
  }

  return theme && Object.prototype.hasOwnProperty.call(theme, 'base00') ? theme : undefined;
};
var invertTheme = function invertTheme(theme) {
  if (typeof theme === 'string') {
    return "".concat(theme, ":inverted");
  }

  if (theme && isStylingConfig(theme) && theme.extend) {
    if (typeof theme.extend === 'string') {
      return _objectSpread(_objectSpread({}, theme), {}, {
        extend: "".concat(theme.extend, ":inverted")
      });
    }

    return _objectSpread(_objectSpread({}, theme), {}, {
      extend: invertBase16Theme(theme.extend)
    });
  }

  if (theme) {
    return invertBase16Theme(theme);
  }

  return theme;
};

;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/themes/solarized.js
/* harmony default export */ const solarized = ({
  scheme: 'solarized',
  author: 'ethan schoonover (http://ethanschoonover.com/solarized)',
  base00: '#002b36',
  base01: '#073642',
  base02: '#586e75',
  base03: '#657b83',
  base04: '#839496',
  base05: '#93a1a1',
  base06: '#eee8d5',
  base07: '#fdf6e3',
  base08: '#dc322f',
  base09: '#cb4b16',
  base0A: '#b58900',
  base0B: '#859900',
  base0C: '#2aa198',
  base0D: '#268bd2',
  base0E: '#6c71c4',
  base0F: '#d33682'
});
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/createStylingFromTheme.js


const colorMap = theme => ({
  BACKGROUND_COLOR: theme.base00,
  TEXT_COLOR: theme.base07,
  STRING_COLOR: theme.base0B,
  DATE_COLOR: theme.base0B,
  NUMBER_COLOR: theme.base09,
  BOOLEAN_COLOR: theme.base09,
  NULL_COLOR: theme.base08,
  UNDEFINED_COLOR: theme.base08,
  FUNCTION_COLOR: theme.base08,
  SYMBOL_COLOR: theme.base08,
  LABEL_COLOR: theme.base0D,
  ARROW_COLOR: theme.base0D,
  ITEM_STRING_COLOR: theme.base0B,
  ITEM_STRING_EXPANDED_COLOR: theme.base03
});
const valueColorMap = colors => ({
  String: colors.STRING_COLOR,
  Date: colors.DATE_COLOR,
  Number: colors.NUMBER_COLOR,
  Boolean: colors.BOOLEAN_COLOR,
  Null: colors.NULL_COLOR,
  Undefined: colors.UNDEFINED_COLOR,
  Function: colors.FUNCTION_COLOR,
  Symbol: colors.SYMBOL_COLOR
});
const getDefaultThemeStyling = theme => {
  const colors = colorMap(theme);
  return {
    tree: {
      border: 0,
      padding: 0,
      marginTop: '0.5em',
      marginBottom: '0.5em',
      marginLeft: '0.125em',
      marginRight: 0,
      listStyle: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      backgroundColor: colors.BACKGROUND_COLOR
    },
    value: (_ref, nodeType, keyPath) => {
      let {
        style
      } = _ref;
      return {
        style: {
          ...style,
          paddingTop: '0.25em',
          paddingRight: 0,
          marginLeft: '0.875em',
          WebkitUserSelect: 'text',
          MozUserSelect: 'text',
          wordWrap: 'break-word',
          paddingLeft: keyPath.length > 1 ? '2.125em' : '1.25em',
          textIndent: '-0.5em',
          wordBreak: 'break-all'
        }
      };
    },
    label: {
      display: 'inline-block',
      color: colors.LABEL_COLOR
    },
    valueLabel: {
      margin: '0 0.5em 0 0'
    },
    valueText: (_ref2, nodeType) => {
      let {
        style
      } = _ref2;
      return {
        style: {
          ...style,
          color: valueColorMap(colors)[nodeType]
        }
      };
    },
    itemRange: (styling, expanded) => ({
      style: {
        paddingTop: expanded ? 0 : '0.25em',
        cursor: 'pointer',
        color: colors.LABEL_COLOR
      }
    }),
    arrow: (_ref3, nodeType, expanded) => {
      let {
        style
      } = _ref3;
      return {
        style: {
          ...style,
          marginLeft: 0,
          transition: '150ms',
          WebkitTransition: '150ms',
          MozTransition: '150ms',
          WebkitTransform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
          MozTransform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
          transform: expanded ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
          transformOrigin: '45% 50%',
          WebkitTransformOrigin: '45% 50%',
          MozTransformOrigin: '45% 50%',
          position: 'relative',
          lineHeight: '1.1em',
          fontSize: '0.75em'
        }
      };
    },
    arrowContainer: (_ref4, arrowStyle) => {
      let {
        style
      } = _ref4;
      return {
        style: {
          ...style,
          display: 'inline-block',
          paddingRight: '0.5em',
          paddingLeft: arrowStyle === 'double' ? '1em' : 0,
          cursor: 'pointer'
        }
      };
    },
    arrowSign: {
      color: colors.ARROW_COLOR
    },
    arrowSignInner: {
      position: 'absolute',
      top: 0,
      left: '-0.4em'
    },
    nestedNode: (_ref5, keyPath, nodeType, expanded, expandable) => {
      let {
        style
      } = _ref5;
      return {
        style: {
          ...style,
          position: 'relative',
          paddingTop: '0.25em',
          marginLeft: keyPath.length > 1 ? '0.875em' : 0,
          paddingLeft: !expandable ? '1.125em' : 0
        }
      };
    },
    rootNode: {
      padding: 0,
      margin: 0
    },
    nestedNodeLabel: (_ref6, keyPath, nodeType, expanded, expandable) => {
      let {
        style
      } = _ref6;
      return {
        style: {
          ...style,
          margin: 0,
          padding: 0,
          WebkitUserSelect: expandable ? 'inherit' : 'text',
          MozUserSelect: expandable ? 'inherit' : 'text',
          cursor: expandable ? 'pointer' : 'default'
        }
      };
    },
    nestedNodeItemString: (_ref7, keyPath, nodeType, expanded) => {
      let {
        style
      } = _ref7;
      return {
        style: {
          ...style,
          paddingLeft: '0.5em',
          cursor: 'default',
          color: expanded ? colors.ITEM_STRING_EXPANDED_COLOR : colors.ITEM_STRING_COLOR
        }
      };
    },
    nestedNodeItemType: {
      marginLeft: '0.3em',
      marginRight: '0.3em'
    },
    nestedNodeChildren: (_ref8, nodeType, expanded) => {
      let {
        style
      } = _ref8;
      return {
        style: {
          ...style,
          padding: 0,
          margin: 0,
          listStyle: 'none',
          display: expanded ? 'block' : 'none'
        }
      };
    },
    rootNodeChildren: {
      padding: 0,
      margin: 0,
      listStyle: 'none'
    }
  };
};
const createStylingFromTheme = createStyling(getDefaultThemeStyling, {
  defaultBase16: solarized
});
/* harmony default export */ const esm_createStylingFromTheme = (createStylingFromTheme);
;// CONCATENATED MODULE: ./node_modules/react-json-tree/lib/esm/index.js
// ES6 + inline style port of JSONViewer https://bitbucket.org/davevedder/react-json-viewer/
// all credits and original code to the author
// Dave Vedder <veddermatic@gmail.com> http://www.eskimospy.com/
// port by Daniele Zannotti http://www.github.com/dzannotti <dzannotti@me.com>





const identity = value => value;
const expandRootNode = (keyPath, data, level) => level === 0;
const defaultItemString = (type, data, itemType, itemString) => /*#__PURE__*/react.createElement("span", null, itemType, " ", itemString);
const defaultLabelRenderer = _ref => {
  let [label] = _ref;
  return /*#__PURE__*/react.createElement("span", null, label, ":");
};
const noCustomNode = () => false;
function JSONTree(_ref2) {
  let {
    data: value,
    theme,
    invertTheme: shouldInvertTheme,
    keyPath = ['root'],
    labelRenderer = defaultLabelRenderer,
    valueRenderer = identity,
    shouldExpandNodeInitially = expandRootNode,
    hideRoot = false,
    getItemString = defaultItemString,
    postprocessValue = identity,
    isCustomNode = noCustomNode,
    collectionLimit = 50,
    sortObjectKeys = false
  } = _ref2;
  const styling = (0,react.useMemo)(() => esm_createStylingFromTheme(shouldInvertTheme ? invertTheme(theme) : theme), [theme, shouldInvertTheme]);
  return /*#__PURE__*/react.createElement("ul", styling('tree'), /*#__PURE__*/react.createElement(JSONNode, {
    keyPath: hideRoot ? [] : keyPath,
    value: postprocessValue(value),
    isCustomNode: isCustomNode,
    styling: styling,
    labelRenderer: labelRenderer,
    valueRenderer: valueRenderer,
    shouldExpandNodeInitially: shouldExpandNodeInitially,
    hideRoot: hideRoot,
    getItemString: getItemString,
    postprocessValue: postprocessValue,
    collectionLimit: collectionLimit,
    sortObjectKeys: sortObjectKeys
  }));
}
// EXTERNAL MODULE: ./node_modules/style-mod/src/style-mod.js
var style_mod = __webpack_require__(28699);
;// CONCATENATED MODULE: ./node_modules/@jupyterlab/json-extension/lib/component.js
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.









/**
 * Get the CodeMirror style for a given tag.
 */
function getStyle(tag) {
    var _a;
    return (_a = jupyterHighlightStyle.style([tag])) !== null && _a !== void 0 ? _a : '';
}
/**
 * A component that renders JSON data as a collapsible tree.
 */
class Component extends react.Component {
    constructor() {
        super(...arguments);
        this.state = { filter: '', value: '' };
        this.timer = 0;
        this.handleChange = (event) => {
            const { value } = event.target;
            this.setState({ value });
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                this.setState({ filter: value });
            }, 300);
        };
    }
    componentDidMount() {
        style_mod.StyleModule.mount(document, jupyterHighlightStyle.module);
    }
    render() {
        const translator = this.props.translator || lib.nullTranslator;
        const trans = translator.load('jupyterlab');
        const { data, metadata, forwardedRef } = this.props;
        const root = metadata && metadata.root ? metadata.root : 'root';
        const keyPaths = this.state.filter
            ? filterPaths(data, this.state.filter, [root])
            : [root];
        return (react.createElement("div", { className: "container", ref: forwardedRef },
            react.createElement(InputGroup, { className: "filter", type: "text", placeholder: trans.__('Filter…'), onChange: this.handleChange, value: this.state.value, rightIcon: "ui-components:search" }),
            react.createElement(JSONTree, { data: data, collectionLimit: 100, theme: {
                    extend: theme,
                    valueLabel: getStyle(highlight_dist.tags.variableName),
                    valueText: getStyle(highlight_dist.tags.string),
                    nestedNodeItemString: getStyle(highlight_dist.tags.comment)
                }, invertTheme: false, keyPath: [root], getItemString: (type, data, itemType, itemString) => Array.isArray(data) ? (
                // Always display array type and the number of items i.e. "[] 2 items".
                react.createElement("span", null,
                    itemType,
                    " ",
                    itemString)) : Object.keys(data).length === 0 ? (
                // Only display object type when it's empty i.e. "{}".
                react.createElement("span", null, itemType)) : (null // Upstream typings don't accept null, but it should be ok
                ), labelRenderer: ([label, type]) => {
                    return (react.createElement("span", { className: getStyle(highlight_dist.tags.keyword) },
                        react.createElement((main_default()), { searchWords: [this.state.filter], textToHighlight: `${label}`, highlightClassName: "jp-mod-selected" })));
                }, valueRenderer: raw => {
                    let className = getStyle(highlight_dist.tags.string);
                    if (typeof raw === 'number') {
                        className = getStyle(highlight_dist.tags.number);
                    }
                    if (raw === 'true' || raw === 'false') {
                        className = getStyle(highlight_dist.tags.keyword);
                    }
                    return (react.createElement("span", { className: className },
                        react.createElement((main_default()), { searchWords: [this.state.filter], textToHighlight: `${raw}`, highlightClassName: "jp-mod-selected" })));
                }, shouldExpandNodeInitially: (keyPath, data, level) => metadata && metadata.expanded
                    ? true
                    : keyPaths.join(',').includes(keyPath.join(',')) })));
    }
}
// Provide an invalid theme object (this is on purpose!) to invalidate the
// react-json-tree's inline styles that override CodeMirror CSS classes
const theme = {
    scheme: 'jupyter',
    base00: 'invalid',
    base01: 'invalid',
    base02: 'invalid',
    base03: 'invalid',
    base04: 'invalid',
    base05: 'invalid',
    base06: 'invalid',
    base07: 'invalid',
    base08: 'invalid',
    base09: 'invalid',
    base0A: 'invalid',
    base0B: 'invalid',
    base0C: 'invalid',
    base0D: 'invalid',
    base0E: 'invalid',
    base0F: 'invalid',
    author: 'invalid'
};
function objectIncludes(data, query) {
    return JSON.stringify(data).includes(query);
}
function filterPaths(data, query, parent = ['root']) {
    if (index_es6.JSONExt.isArray(data)) {
        return data.reduce((result, item, index) => {
            if (item && typeof item === 'object' && objectIncludes(item, query)) {
                return [
                    ...result,
                    [index, ...parent].join(','),
                    ...filterPaths(item, query, [index, ...parent])
                ];
            }
            return result;
        }, []);
    }
    if (index_es6.JSONExt.isObject(data)) {
        return Object.keys(data).reduce((result, key) => {
            const item = data[key];
            if (item &&
                typeof item === 'object' &&
                (key.includes(query) || objectIncludes(item, query))) {
                return [
                    ...result,
                    [key, ...parent].join(','),
                    ...filterPaths(item, query, [key, ...parent])
                ];
            }
            return result;
        }, []);
    }
    return [];
}
//# sourceMappingURL=component.js.map

/***/ }),

/***/ 53112:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'apathy',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#031A16',
  base01: '#0B342D',
  base02: '#184E45',
  base03: '#2B685E',
  base04: '#5F9C92',
  base05: '#81B5AC',
  base06: '#A7CEC8',
  base07: '#D2E7E4',
  base08: '#3E9688',
  base09: '#3E7996',
  base0A: '#3E4C96',
  base0B: '#883E96',
  base0C: '#963E4C',
  base0D: '#96883E',
  base0E: '#4C963E',
  base0F: '#3E965B'
};
module.exports = exports['default'];

/***/ }),

/***/ 96291:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'ashes',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#1C2023',
  base01: '#393F45',
  base02: '#565E65',
  base03: '#747C84',
  base04: '#ADB3BA',
  base05: '#C7CCD1',
  base06: '#DFE2E5',
  base07: '#F3F4F5',
  base08: '#C7AE95',
  base09: '#C7C795',
  base0A: '#AEC795',
  base0B: '#95C7AE',
  base0C: '#95AEC7',
  base0D: '#AE95C7',
  base0E: '#C795AE',
  base0F: '#C79595'
};
module.exports = exports['default'];

/***/ }),

/***/ 253:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'atelier dune',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune)',
  base00: '#20201d',
  base01: '#292824',
  base02: '#6e6b5e',
  base03: '#7d7a68',
  base04: '#999580',
  base05: '#a6a28c',
  base06: '#e8e4cf',
  base07: '#fefbec',
  base08: '#d73737',
  base09: '#b65611',
  base0A: '#cfb017',
  base0B: '#60ac39',
  base0C: '#1fad83',
  base0D: '#6684e1',
  base0E: '#b854d4',
  base0F: '#d43552'
};
module.exports = exports['default'];

/***/ }),

/***/ 13783:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'atelier forest',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest)',
  base00: '#1b1918',
  base01: '#2c2421',
  base02: '#68615e',
  base03: '#766e6b',
  base04: '#9c9491',
  base05: '#a8a19f',
  base06: '#e6e2e0',
  base07: '#f1efee',
  base08: '#f22c40',
  base09: '#df5320',
  base0A: '#d5911a',
  base0B: '#5ab738',
  base0C: '#00ad9c',
  base0D: '#407ee7',
  base0E: '#6666ea',
  base0F: '#c33ff3'
};
module.exports = exports['default'];

/***/ }),

/***/ 28447:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'atelier heath',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/heath)',
  base00: '#1b181b',
  base01: '#292329',
  base02: '#695d69',
  base03: '#776977',
  base04: '#9e8f9e',
  base05: '#ab9bab',
  base06: '#d8cad8',
  base07: '#f7f3f7',
  base08: '#ca402b',
  base09: '#a65926',
  base0A: '#bb8a35',
  base0B: '#379a37',
  base0C: '#159393',
  base0D: '#516aec',
  base0E: '#7b59c0',
  base0F: '#cc33cc'
};
module.exports = exports['default'];

/***/ }),

/***/ 98629:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'atelier lakeside',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside/)',
  base00: '#161b1d',
  base01: '#1f292e',
  base02: '#516d7b',
  base03: '#5a7b8c',
  base04: '#7195a8',
  base05: '#7ea2b4',
  base06: '#c1e4f6',
  base07: '#ebf8ff',
  base08: '#d22d72',
  base09: '#935c25',
  base0A: '#8a8a0f',
  base0B: '#568c3b',
  base0C: '#2d8f6f',
  base0D: '#257fad',
  base0E: '#5d5db1',
  base0F: '#b72dd2'
};
module.exports = exports['default'];

/***/ }),

/***/ 11931:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'atelier seaside',
  author: 'bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/seaside/)',
  base00: '#131513',
  base01: '#242924',
  base02: '#5e6e5e',
  base03: '#687d68',
  base04: '#809980',
  base05: '#8ca68c',
  base06: '#cfe8cf',
  base07: '#f0fff0',
  base08: '#e6193c',
  base09: '#87711d',
  base0A: '#c3c322',
  base0B: '#29a329',
  base0C: '#1999b3',
  base0D: '#3d62f5',
  base0E: '#ad2bee',
  base0F: '#e619c3'
};
module.exports = exports['default'];

/***/ }),

/***/ 27113:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'bespin',
  author: 'jan t. sott',
  base00: '#28211c',
  base01: '#36312e',
  base02: '#5e5d5c',
  base03: '#666666',
  base04: '#797977',
  base05: '#8a8986',
  base06: '#9d9b97',
  base07: '#baae9e',
  base08: '#cf6a4c',
  base09: '#cf7d34',
  base0A: '#f9ee98',
  base0B: '#54be0d',
  base0C: '#afc4db',
  base0D: '#5ea6ea',
  base0E: '#9b859d',
  base0F: '#937121'
};
module.exports = exports['default'];

/***/ }),

/***/ 17757:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'brewer',
  author: 'timothée poisot (http://github.com/tpoisot)',
  base00: '#0c0d0e',
  base01: '#2e2f30',
  base02: '#515253',
  base03: '#737475',
  base04: '#959697',
  base05: '#b7b8b9',
  base06: '#dadbdc',
  base07: '#fcfdfe',
  base08: '#e31a1c',
  base09: '#e6550d',
  base0A: '#dca060',
  base0B: '#31a354',
  base0C: '#80b1d3',
  base0D: '#3182bd',
  base0E: '#756bb1',
  base0F: '#b15928'
};
module.exports = exports['default'];

/***/ }),

/***/ 25328:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'bright',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#303030',
  base02: '#505050',
  base03: '#b0b0b0',
  base04: '#d0d0d0',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ffffff',
  base08: '#fb0120',
  base09: '#fc6d24',
  base0A: '#fda331',
  base0B: '#a1c659',
  base0C: '#76c7b7',
  base0D: '#6fb3d2',
  base0E: '#d381c3',
  base0F: '#be643c'
};
module.exports = exports['default'];

/***/ }),

/***/ 23906:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'chalk',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#151515',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#b0b0b0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#f5f5f5',
  base08: '#fb9fb1',
  base09: '#eda987',
  base0A: '#ddb26f',
  base0B: '#acc267',
  base0C: '#12cfc0',
  base0D: '#6fc2ef',
  base0E: '#e1a3ee',
  base0F: '#deaf8f'
};
module.exports = exports['default'];

/***/ }),

/***/ 13236:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'codeschool',
  author: 'brettof86',
  base00: '#232c31',
  base01: '#1c3657',
  base02: '#2a343a',
  base03: '#3f4944',
  base04: '#84898c',
  base05: '#9ea7a6',
  base06: '#a7cfa3',
  base07: '#b5d8f6',
  base08: '#2a5491',
  base09: '#43820d',
  base0A: '#a03b1e',
  base0B: '#237986',
  base0C: '#b02f30',
  base0D: '#484d79',
  base0E: '#c59820',
  base0F: '#c98344'
};
module.exports = exports['default'];

/***/ }),

/***/ 45190:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'colors',
  author: 'mrmrs (http://clrs.cc)',
  base00: '#111111',
  base01: '#333333',
  base02: '#555555',
  base03: '#777777',
  base04: '#999999',
  base05: '#bbbbbb',
  base06: '#dddddd',
  base07: '#ffffff',
  base08: '#ff4136',
  base09: '#ff851b',
  base0A: '#ffdc00',
  base0B: '#2ecc40',
  base0C: '#7fdbff',
  base0D: '#0074d9',
  base0E: '#b10dc9',
  base0F: '#85144b'
};
module.exports = exports['default'];

/***/ }),

/***/ 67339:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'default',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#181818',
  base01: '#282828',
  base02: '#383838',
  base03: '#585858',
  base04: '#b8b8b8',
  base05: '#d8d8d8',
  base06: '#e8e8e8',
  base07: '#f8f8f8',
  base08: '#ab4642',
  base09: '#dc9656',
  base0A: '#f7ca88',
  base0B: '#a1b56c',
  base0C: '#86c1b9',
  base0D: '#7cafc2',
  base0E: '#ba8baf',
  base0F: '#a16946'
};
module.exports = exports['default'];

/***/ }),

/***/ 3517:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'eighties',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2d2d2d',
  base01: '#393939',
  base02: '#515151',
  base03: '#747369',
  base04: '#a09f93',
  base05: '#d3d0c8',
  base06: '#e8e6df',
  base07: '#f2f0ec',
  base08: '#f2777a',
  base09: '#f99157',
  base0A: '#ffcc66',
  base0B: '#99cc99',
  base0C: '#66cccc',
  base0D: '#6699cc',
  base0E: '#cc99cc',
  base0F: '#d27b53'
};
module.exports = exports['default'];

/***/ }),

/***/ 55091:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'embers',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#16130F',
  base01: '#2C2620',
  base02: '#433B32',
  base03: '#5A5047',
  base04: '#8A8075',
  base05: '#A39A90',
  base06: '#BEB6AE',
  base07: '#DBD6D1',
  base08: '#826D57',
  base09: '#828257',
  base0A: '#6D8257',
  base0B: '#57826D',
  base0C: '#576D82',
  base0D: '#6D5782',
  base0E: '#82576D',
  base0F: '#825757'
};
module.exports = exports['default'];

/***/ }),

/***/ 15021:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'flat',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2C3E50',
  base01: '#34495E',
  base02: '#7F8C8D',
  base03: '#95A5A6',
  base04: '#BDC3C7',
  base05: '#e0e0e0',
  base06: '#f5f5f5',
  base07: '#ECF0F1',
  base08: '#E74C3C',
  base09: '#E67E22',
  base0A: '#F1C40F',
  base0B: '#2ECC71',
  base0C: '#1ABC9C',
  base0D: '#3498DB',
  base0E: '#9B59B6',
  base0F: '#be643c'
};
module.exports = exports['default'];

/***/ }),

/***/ 86664:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED'
};
module.exports = exports['default'];

/***/ }),

/***/ 83935:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'grayscale',
  author: 'alexandre gavioli (https://github.com/alexx2/)',
  base00: '#101010',
  base01: '#252525',
  base02: '#464646',
  base03: '#525252',
  base04: '#ababab',
  base05: '#b9b9b9',
  base06: '#e3e3e3',
  base07: '#f7f7f7',
  base08: '#7c7c7c',
  base09: '#999999',
  base0A: '#a0a0a0',
  base0B: '#8e8e8e',
  base0C: '#868686',
  base0D: '#686868',
  base0E: '#747474',
  base0F: '#5e5e5e'
};
module.exports = exports['default'];

/***/ }),

/***/ 1857:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'green screen',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#001100',
  base01: '#003300',
  base02: '#005500',
  base03: '#007700',
  base04: '#009900',
  base05: '#00bb00',
  base06: '#00dd00',
  base07: '#00ff00',
  base08: '#007700',
  base09: '#009900',
  base0A: '#007700',
  base0B: '#00bb00',
  base0C: '#005500',
  base0D: '#009900',
  base0E: '#00bb00',
  base0F: '#005500'
};
module.exports = exports['default'];

/***/ }),

/***/ 78960:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'harmonic16',
  author: 'jannik siebert (https://github.com/janniks)',
  base00: '#0b1c2c',
  base01: '#223b54',
  base02: '#405c79',
  base03: '#627e99',
  base04: '#aabcce',
  base05: '#cbd6e2',
  base06: '#e5ebf1',
  base07: '#f7f9fb',
  base08: '#bf8b56',
  base09: '#bfbf56',
  base0A: '#8bbf56',
  base0B: '#56bf8b',
  base0C: '#568bbf',
  base0D: '#8b56bf',
  base0E: '#bf568b',
  base0F: '#bf5656'
};
module.exports = exports['default'];

/***/ }),

/***/ 58038:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'hopscotch',
  author: 'jan t. sott',
  base00: '#322931',
  base01: '#433b42',
  base02: '#5c545b',
  base03: '#797379',
  base04: '#989498',
  base05: '#b9b5b8',
  base06: '#d5d3d5',
  base07: '#ffffff',
  base08: '#dd464c',
  base09: '#fd8b19',
  base0A: '#fdcc59',
  base0B: '#8fc13e',
  base0C: '#149b93',
  base0D: '#1290bf',
  base0E: '#c85e7c',
  base0F: '#b33508'
};
module.exports = exports['default'];

/***/ }),

/***/ 79194:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _threezerotwofour = __webpack_require__(2633);

exports.threezerotwofour = _interopRequire(_threezerotwofour);

var _apathy = __webpack_require__(53112);

exports.apathy = _interopRequire(_apathy);

var _ashes = __webpack_require__(96291);

exports.ashes = _interopRequire(_ashes);

var _atelierDune = __webpack_require__(253);

exports.atelierDune = _interopRequire(_atelierDune);

var _atelierForest = __webpack_require__(13783);

exports.atelierForest = _interopRequire(_atelierForest);

var _atelierHeath = __webpack_require__(28447);

exports.atelierHeath = _interopRequire(_atelierHeath);

var _atelierLakeside = __webpack_require__(98629);

exports.atelierLakeside = _interopRequire(_atelierLakeside);

var _atelierSeaside = __webpack_require__(11931);

exports.atelierSeaside = _interopRequire(_atelierSeaside);

var _bespin = __webpack_require__(27113);

exports.bespin = _interopRequire(_bespin);

var _brewer = __webpack_require__(17757);

exports.brewer = _interopRequire(_brewer);

var _bright = __webpack_require__(25328);

exports.bright = _interopRequire(_bright);

var _chalk = __webpack_require__(23906);

exports.chalk = _interopRequire(_chalk);

var _codeschool = __webpack_require__(13236);

exports.codeschool = _interopRequire(_codeschool);

var _colors = __webpack_require__(45190);

exports.colors = _interopRequire(_colors);

var _default = __webpack_require__(67339);

exports["default"] = _interopRequire(_default);

var _eighties = __webpack_require__(3517);

exports.eighties = _interopRequire(_eighties);

var _embers = __webpack_require__(55091);

exports.embers = _interopRequire(_embers);

var _flat = __webpack_require__(15021);

exports.flat = _interopRequire(_flat);

var _google = __webpack_require__(86664);

exports.google = _interopRequire(_google);

var _grayscale = __webpack_require__(83935);

exports.grayscale = _interopRequire(_grayscale);

var _greenscreen = __webpack_require__(1857);

exports.greenscreen = _interopRequire(_greenscreen);

var _harmonic = __webpack_require__(78960);

exports.harmonic = _interopRequire(_harmonic);

var _hopscotch = __webpack_require__(58038);

exports.hopscotch = _interopRequire(_hopscotch);

var _isotope = __webpack_require__(30971);

exports.isotope = _interopRequire(_isotope);

var _marrakesh = __webpack_require__(8764);

exports.marrakesh = _interopRequire(_marrakesh);

var _mocha = __webpack_require__(65364);

exports.mocha = _interopRequire(_mocha);

var _monokai = __webpack_require__(55610);

exports.monokai = _interopRequire(_monokai);

var _ocean = __webpack_require__(94646);

exports.ocean = _interopRequire(_ocean);

var _paraiso = __webpack_require__(58466);

exports.paraiso = _interopRequire(_paraiso);

var _pop = __webpack_require__(35708);

exports.pop = _interopRequire(_pop);

var _railscasts = __webpack_require__(1834);

exports.railscasts = _interopRequire(_railscasts);

var _shapeshifter = __webpack_require__(45410);

exports.shapeshifter = _interopRequire(_shapeshifter);

var _solarized = __webpack_require__(27427);

exports.solarized = _interopRequire(_solarized);

var _summerfruit = __webpack_require__(63013);

exports.summerfruit = _interopRequire(_summerfruit);

var _tomorrow = __webpack_require__(86706);

exports.tomorrow = _interopRequire(_tomorrow);

var _tube = __webpack_require__(19028);

exports.tube = _interopRequire(_tube);

var _twilight = __webpack_require__(71899);

exports.twilight = _interopRequire(_twilight);

/***/ }),

/***/ 30971:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'isotope',
  author: 'jan t. sott',
  base00: '#000000',
  base01: '#404040',
  base02: '#606060',
  base03: '#808080',
  base04: '#c0c0c0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#ff0000',
  base09: '#ff9900',
  base0A: '#ff0099',
  base0B: '#33ff00',
  base0C: '#00ffff',
  base0D: '#0066ff',
  base0E: '#cc00ff',
  base0F: '#3300ff'
};
module.exports = exports['default'];

/***/ }),

/***/ 8764:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'marrakesh',
  author: 'alexandre gavioli (http://github.com/alexx2/)',
  base00: '#201602',
  base01: '#302e00',
  base02: '#5f5b17',
  base03: '#6c6823',
  base04: '#86813b',
  base05: '#948e48',
  base06: '#ccc37a',
  base07: '#faf0a5',
  base08: '#c35359',
  base09: '#b36144',
  base0A: '#a88339',
  base0B: '#18974e',
  base0C: '#75a738',
  base0D: '#477ca1',
  base0E: '#8868b3',
  base0F: '#b3588e'
};
module.exports = exports['default'];

/***/ }),

/***/ 65364:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'mocha',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#3B3228',
  base01: '#534636',
  base02: '#645240',
  base03: '#7e705a',
  base04: '#b8afad',
  base05: '#d0c8c6',
  base06: '#e9e1dd',
  base07: '#f5eeeb',
  base08: '#cb6077',
  base09: '#d28b71',
  base0A: '#f4bc87',
  base0B: '#beb55b',
  base0C: '#7bbda4',
  base0D: '#8ab3b5',
  base0E: '#a89bb9',
  base0F: '#bb9584'
};
module.exports = exports['default'];

/***/ }),

/***/ 55610:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};
module.exports = exports['default'];

/***/ }),

/***/ 94646:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'ocean',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#2b303b',
  base01: '#343d46',
  base02: '#4f5b66',
  base03: '#65737e',
  base04: '#a7adba',
  base05: '#c0c5ce',
  base06: '#dfe1e8',
  base07: '#eff1f5',
  base08: '#bf616a',
  base09: '#d08770',
  base0A: '#ebcb8b',
  base0B: '#a3be8c',
  base0C: '#96b5b4',
  base0D: '#8fa1b3',
  base0E: '#b48ead',
  base0F: '#ab7967'
};
module.exports = exports['default'];

/***/ }),

/***/ 58466:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'paraiso',
  author: 'jan t. sott',
  base00: '#2f1e2e',
  base01: '#41323f',
  base02: '#4f424c',
  base03: '#776e71',
  base04: '#8d8687',
  base05: '#a39e9b',
  base06: '#b9b6b0',
  base07: '#e7e9db',
  base08: '#ef6155',
  base09: '#f99b15',
  base0A: '#fec418',
  base0B: '#48b685',
  base0C: '#5bc4bf',
  base0D: '#06b6ef',
  base0E: '#815ba4',
  base0F: '#e96ba8'
};
module.exports = exports['default'];

/***/ }),

/***/ 35708:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'pop',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#000000',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#b0b0b0',
  base05: '#d0d0d0',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#eb008a',
  base09: '#f29333',
  base0A: '#f8ca12',
  base0B: '#37b349',
  base0C: '#00aabb',
  base0D: '#0e5a94',
  base0E: '#b31e8d',
  base0F: '#7a2d00'
};
module.exports = exports['default'];

/***/ }),

/***/ 1834:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'railscasts',
  author: 'ryan bates (http://railscasts.com)',
  base00: '#2b2b2b',
  base01: '#272935',
  base02: '#3a4055',
  base03: '#5a647e',
  base04: '#d4cfc9',
  base05: '#e6e1dc',
  base06: '#f4f1ed',
  base07: '#f9f7f3',
  base08: '#da4939',
  base09: '#cc7833',
  base0A: '#ffc66d',
  base0B: '#a5c261',
  base0C: '#519f50',
  base0D: '#6d9cbe',
  base0E: '#b6b3eb',
  base0F: '#bc9458'
};
module.exports = exports['default'];

/***/ }),

/***/ 45410:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'shapeshifter',
  author: 'tyler benziger (http://tybenz.com)',
  base00: '#000000',
  base01: '#040404',
  base02: '#102015',
  base03: '#343434',
  base04: '#555555',
  base05: '#ababab',
  base06: '#e0e0e0',
  base07: '#f9f9f9',
  base08: '#e92f2f',
  base09: '#e09448',
  base0A: '#dddd13',
  base0B: '#0ed839',
  base0C: '#23edda',
  base0D: '#3b48e3',
  base0E: '#f996e2',
  base0F: '#69542d'
};
module.exports = exports['default'];

/***/ }),

/***/ 27427:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'solarized',
  author: 'ethan schoonover (http://ethanschoonover.com/solarized)',
  base00: '#002b36',
  base01: '#073642',
  base02: '#586e75',
  base03: '#657b83',
  base04: '#839496',
  base05: '#93a1a1',
  base06: '#eee8d5',
  base07: '#fdf6e3',
  base08: '#dc322f',
  base09: '#cb4b16',
  base0A: '#b58900',
  base0B: '#859900',
  base0C: '#2aa198',
  base0D: '#268bd2',
  base0E: '#6c71c4',
  base0F: '#d33682'
};
module.exports = exports['default'];

/***/ }),

/***/ 63013:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'summerfruit',
  author: 'christopher corley (http://cscorley.github.io/)',
  base00: '#151515',
  base01: '#202020',
  base02: '#303030',
  base03: '#505050',
  base04: '#B0B0B0',
  base05: '#D0D0D0',
  base06: '#E0E0E0',
  base07: '#FFFFFF',
  base08: '#FF0086',
  base09: '#FD8900',
  base0A: '#ABA800',
  base0B: '#00C918',
  base0C: '#1faaaa',
  base0D: '#3777E6',
  base0E: '#AD00A1',
  base0F: '#cc6633'
};
module.exports = exports['default'];

/***/ }),

/***/ 2633:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'threezerotwofour',
  author: 'jan t. sott (http://github.com/idleberg)',
  base00: '#090300',
  base01: '#3a3432',
  base02: '#4a4543',
  base03: '#5c5855',
  base04: '#807d7c',
  base05: '#a5a2a2',
  base06: '#d6d5d4',
  base07: '#f7f7f7',
  base08: '#db2d20',
  base09: '#e8bbd0',
  base0A: '#fded02',
  base0B: '#01a252',
  base0C: '#b5e4f4',
  base0D: '#01a0e4',
  base0E: '#a16a94',
  base0F: '#cdab53'
};
module.exports = exports['default'];

/***/ }),

/***/ 86706:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'tomorrow',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#cc6666',
  base09: '#de935f',
  base0A: '#f0c674',
  base0B: '#b5bd68',
  base0C: '#8abeb7',
  base0D: '#81a2be',
  base0E: '#b294bb',
  base0F: '#a3685a'
};
module.exports = exports['default'];

/***/ }),

/***/ 19028:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'london tube',
  author: 'jan t. sott',
  base00: '#231f20',
  base01: '#1c3f95',
  base02: '#5a5758',
  base03: '#737171',
  base04: '#959ca1',
  base05: '#d9d8d8',
  base06: '#e7e7e8',
  base07: '#ffffff',
  base08: '#ee2e24',
  base09: '#f386a1',
  base0A: '#ffd204',
  base0B: '#00853e',
  base0C: '#85cebc',
  base0D: '#009ddc',
  base0E: '#98005d',
  base0F: '#b06110'
};
module.exports = exports['default'];

/***/ }),

/***/ 71899:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = {
  scheme: 'twilight',
  author: 'david hart (http://hart-dev.com)',
  base00: '#1e1e1e',
  base01: '#323537',
  base02: '#464b50',
  base03: '#5f5a60',
  base04: '#838184',
  base05: '#a7a7a7',
  base06: '#c3c3c3',
  base07: '#ffffff',
  base08: '#cf6a4c',
  base09: '#cda869',
  base0A: '#f9ee98',
  base0B: '#8f9d6a',
  base0C: '#afc4db',
  base0D: '#7587a6',
  base0E: '#9b859d',
  base0F: '#9b703f'
};
module.exports = exports['default'];

/***/ }),

/***/ 48168:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* MIT license */
var cssKeywords = __webpack_require__(39092);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ 12085:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var conversions = __webpack_require__(48168);
var route = __webpack_require__(4111);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ 39092:
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ 4111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var conversions = __webpack_require__(48168);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ 8874:
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ 19818:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* MIT license */
var colorNames = __webpack_require__(8874);
var swizzle = __webpack_require__(86851);
var hasOwnProperty = Object.hasOwnProperty;

var reverseNames = Object.create(null);

// create a list of reverse color names
for (var name in colorNames) {
	if (hasOwnProperty.call(colorNames, name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
	var keyword = /^(\w+)$/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = parseInt(hexAlpha, 16) / 255;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			if (match[5]) {
				rgb[3] = parseFloat(match[4]) * 0.01;
			} else {
				rgb[3] = parseFloat(match[4]);
			}
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			if (match[5]) {
				rgb[3] = parseFloat(match[4]) * 0.01;
			} else {
				rgb[3] = parseFloat(match[4]);
			}
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		if (!hasOwnProperty.call(colorNames, match[1])) {
			return null;
		}

		rgb = colorNames[match[1]];
		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = Math.round(num).toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),

/***/ 6767:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var colorString = __webpack_require__(19818);
var convert = __webpack_require__(12085);

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in convert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = convert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = convert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = convert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = convert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = convert[this.model].channels;
		var labels = convert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return convert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		if (!mixinColor || !mixinColor.rgb) {
			throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
		}
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = convert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

module.exports = Color;


/***/ }),

/***/ 35171:
/***/ ((module) => {

module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),

/***/ 18024:
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var BIND_FLAG = 1,
    BIND_KEY_FLAG = 2,
    CURRY_BOUND_FLAG = 4,
    CURRY_FLAG = 8,
    CURRY_RIGHT_FLAG = 16,
    PARTIAL_FLAG = 32,
    PARTIAL_RIGHT_FLAG = 64,
    ARY_FLAG = 128,
    REARG_FLAG = 256,
    FLIP_FLAG = 512;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
  ['ary', ARY_FLAG],
  ['bind', BIND_FLAG],
  ['bindKey', BIND_KEY_FLAG],
  ['curry', CURRY_FLAG],
  ['curryRight', CURRY_RIGHT_FLAG],
  ['flip', FLIP_FLAG],
  ['partial', PARTIAL_FLAG],
  ['partialRight', PARTIAL_RIGHT_FLAG],
  ['rearg', REARG_FLAG]
];

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
    reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      result++;
    }
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var objectCreate = Object.create;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/* Used to set `toString` methods. */
var defineProperty = (function() {
  var func = getNative(Object, 'defineProperty'),
      name = getNative.name;

  return (name && name.length > 2) ? func : undefined;
}());

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & ARY_FLAG,
      isBind = bitmask & BIND_FLAG,
      isBindKey = bitmask & BIND_KEY_FLAG,
      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
      isFlip = bitmask & FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

  if (!(bitmask & CURRY_BOUND_FLAG)) {
    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
  }

  var result = wrapFunc(func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity);
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *  The bitmask may be composed of the following flags:
 *     1 - `_.bind`
 *     2 - `_.bindKey`
 *     4 - `_.curry` or `_.curryRight` of a bound function
 *     8 - `_.curry`
 *    16 - `_.curryRight`
 *    32 - `_.partial`
 *    64 - `_.partialRight`
 *   128 - `_.rearg`
 *   256 - `_.ary`
 *   512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] == null
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  return setWrapToString(result, func, bitmask);
}

/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func) {
  var object = func;
  return object.placeholder;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length,
      lastIndex = length - 1;

  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
var setWrapToString = !defineProperty ? identity : function(wrapper, reference, bitmask) {
  var source = (reference + '');
  return defineProperty(wrapper, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)))
  });
};

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */
function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

// Assign default placeholders.
curry.placeholder = {};

module.exports = curry;


/***/ }),

/***/ 37763:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __nested_webpack_require_187__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_187__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_187__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_187__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_187__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_187__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __nested_webpack_require_1468__) {

	module.exports = __nested_webpack_require_1468__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __nested_webpack_require_1587__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Highlighter = __nested_webpack_require_1587__(2);
	
	var _Highlighter2 = _interopRequireDefault(_Highlighter);

	exports['default'] = _Highlighter2['default'];
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __nested_webpack_require_2043__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = Highlighter;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _highlightWordsCore = __nested_webpack_require_2043__(3);
	
	var _propTypes = __nested_webpack_require_2043__(4);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _react = __nested_webpack_require_2043__(14);
	
	var _memoizeOne = __nested_webpack_require_2043__(15);
	
	var _memoizeOne2 = _interopRequireDefault(_memoizeOne);
	
	Highlighter.propTypes = {
	  activeClassName: _propTypes2['default'].string,
	  activeIndex: _propTypes2['default'].number,
	  activeStyle: _propTypes2['default'].object,
	  autoEscape: _propTypes2['default'].bool,
	  className: _propTypes2['default'].string,
	  findChunks: _propTypes2['default'].func,
	  highlightClassName: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].string]),
	  highlightStyle: _propTypes2['default'].object,
	  highlightTag: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func, _propTypes2['default'].string]),
	  sanitize: _propTypes2['default'].func,
	  searchWords: _propTypes2['default'].arrayOf(_propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].instanceOf(RegExp)])).isRequired,
	  textToHighlight: _propTypes2['default'].string.isRequired,
	  unhighlightTag: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].func, _propTypes2['default'].string]),
	  unhighlightClassName: _propTypes2['default'].string,
	  unhighlightStyle: _propTypes2['default'].object
	};
	
	/**
	 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
	 * This function returns an array of strings and <span>s (wrapping highlighted words).
	 */
	
	function Highlighter(_ref) {
	  var _ref$activeClassName = _ref.activeClassName;
	  var activeClassName = _ref$activeClassName === undefined ? '' : _ref$activeClassName;
	  var _ref$activeIndex = _ref.activeIndex;
	  var activeIndex = _ref$activeIndex === undefined ? -1 : _ref$activeIndex;
	  var activeStyle = _ref.activeStyle;
	  var autoEscape = _ref.autoEscape;
	  var _ref$caseSensitive = _ref.caseSensitive;
	  var caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive;
	  var className = _ref.className;
	  var findChunks = _ref.findChunks;
	  var _ref$highlightClassName = _ref.highlightClassName;
	  var highlightClassName = _ref$highlightClassName === undefined ? '' : _ref$highlightClassName;
	  var _ref$highlightStyle = _ref.highlightStyle;
	  var highlightStyle = _ref$highlightStyle === undefined ? {} : _ref$highlightStyle;
	  var _ref$highlightTag = _ref.highlightTag;
	  var highlightTag = _ref$highlightTag === undefined ? 'mark' : _ref$highlightTag;
	  var sanitize = _ref.sanitize;
	  var searchWords = _ref.searchWords;
	  var textToHighlight = _ref.textToHighlight;
	  var _ref$unhighlightTag = _ref.unhighlightTag;
	  var unhighlightTag = _ref$unhighlightTag === undefined ? 'span' : _ref$unhighlightTag;
	  var _ref$unhighlightClassName = _ref.unhighlightClassName;
	  var unhighlightClassName = _ref$unhighlightClassName === undefined ? '' : _ref$unhighlightClassName;
	  var unhighlightStyle = _ref.unhighlightStyle;
	
	  var rest = _objectWithoutProperties(_ref, ['activeClassName', 'activeIndex', 'activeStyle', 'autoEscape', 'caseSensitive', 'className', 'findChunks', 'highlightClassName', 'highlightStyle', 'highlightTag', 'sanitize', 'searchWords', 'textToHighlight', 'unhighlightTag', 'unhighlightClassName', 'unhighlightStyle']);
	
	  var chunks = (0, _highlightWordsCore.findAll)({
	    autoEscape: autoEscape,
	    caseSensitive: caseSensitive,
	    findChunks: findChunks,
	    sanitize: sanitize,
	    searchWords: searchWords,
	    textToHighlight: textToHighlight
	  });
	  var HighlightTag = highlightTag;
	  var highlightIndex = -1;
	  var highlightClassNames = '';
	  var highlightStyles = undefined;
	
	  var lowercaseProps = function lowercaseProps(object) {
	    var mapped = {};
	    for (var key in object) {
	      mapped[key.toLowerCase()] = object[key];
	    }
	    return mapped;
	  };
	  var memoizedLowercaseProps = (0, _memoizeOne2['default'])(lowercaseProps);
	
	  return (0, _react.createElement)('span', _extends({
	    className: className
	  }, rest, {
	    children: chunks.map(function (chunk, index) {
	      var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
	
	      if (chunk.highlight) {
	        highlightIndex++;
	
	        var highlightClass = undefined;
	        if (typeof highlightClassName === 'object') {
	          if (!caseSensitive) {
	            highlightClassName = memoizedLowercaseProps(highlightClassName);
	            highlightClass = highlightClassName[text.toLowerCase()];
	          } else {
	            highlightClass = highlightClassName[text];
	          }
	        } else {
	          highlightClass = highlightClassName;
	        }
	
	        var isActive = highlightIndex === +activeIndex;
	
	        highlightClassNames = highlightClass + ' ' + (isActive ? activeClassName : '');
	        highlightStyles = isActive === true && activeStyle != null ? Object.assign({}, highlightStyle, activeStyle) : highlightStyle;
	
	        var props = {
	          children: text,
	          className: highlightClassNames,
	          key: index,
	          style: highlightStyles
	        };
	
	        // Don't attach arbitrary props to DOM elements; this triggers React DEV warnings (https://fb.me/react-unknown-prop)
	        // Only pass through the highlightIndex attribute for custom components.
	        if (typeof HighlightTag !== 'string') {
	          props.highlightIndex = highlightIndex;
	        }
	
	        return (0, _react.createElement)(HighlightTag, props);
	      } else {
	        return (0, _react.createElement)(unhighlightTag, {
	          children: text,
	          className: unhighlightClassName,
	          key: index,
	          style: unhighlightStyle
	        });
	      }
	    })
	  }));
	}
	
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __nested_webpack_require_8969__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_8969__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__nested_webpack_require_8969__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__nested_webpack_require_8969__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__nested_webpack_require_8969__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __nested_webpack_require_8969__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __nested_webpack_require_10289__) {
	
		module.exports = __nested_webpack_require_10289__(1);
	
	
	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __nested_webpack_require_10415__) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _utils = __nested_webpack_require_10415__(2);
		
		Object.defineProperty(exports, 'combineChunks', {
		  enumerable: true,
		  get: function get() {
		    return _utils.combineChunks;
		  }
		});
		Object.defineProperty(exports, 'fillInChunks', {
		  enumerable: true,
		  get: function get() {
		    return _utils.fillInChunks;
		  }
		});
		Object.defineProperty(exports, 'findAll', {
		  enumerable: true,
		  get: function get() {
		    return _utils.findAll;
		  }
		});
		Object.defineProperty(exports, 'findChunks', {
		  enumerable: true,
		  get: function get() {
		    return _utils.findChunks;
		  }
		});
	
	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		/**
		 * Creates an array of chunk objects representing both higlightable and non highlightable pieces of text that match each search word.
		 * @return Array of "chunks" (where a Chunk is { start:number, end:number, highlight:boolean })
		 */
		var findAll = exports.findAll = function findAll(_ref) {
		  var autoEscape = _ref.autoEscape,
		      _ref$caseSensitive = _ref.caseSensitive,
		      caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
		      _ref$findChunks = _ref.findChunks,
		      findChunks = _ref$findChunks === undefined ? defaultFindChunks : _ref$findChunks,
		      sanitize = _ref.sanitize,
		      searchWords = _ref.searchWords,
		      textToHighlight = _ref.textToHighlight;
		  return fillInChunks({
		    chunksToHighlight: combineChunks({
		      chunks: findChunks({
		        autoEscape: autoEscape,
		        caseSensitive: caseSensitive,
		        sanitize: sanitize,
		        searchWords: searchWords,
		        textToHighlight: textToHighlight
		      })
		    }),
		    totalLength: textToHighlight ? textToHighlight.length : 0
		  });
		};
		
		/**
		 * Takes an array of {start:number, end:number} objects and combines chunks that overlap into single chunks.
		 * @return {start:number, end:number}[]
		 */
		var combineChunks = exports.combineChunks = function combineChunks(_ref2) {
		  var chunks = _ref2.chunks;
		
		  chunks = chunks.sort(function (first, second) {
		    return first.start - second.start;
		  }).reduce(function (processedChunks, nextChunk) {
		    // First chunk just goes straight in the array...
		    if (processedChunks.length === 0) {
		      return [nextChunk];
		    } else {
		      // ... subsequent chunks get checked to see if they overlap...
		      var prevChunk = processedChunks.pop();
		      if (nextChunk.start <= prevChunk.end) {
		        // It may be the case that prevChunk completely surrounds nextChunk, so take the
		        // largest of the end indeces.
		        var endIndex = Math.max(prevChunk.end, nextChunk.end);
		        processedChunks.push({ start: prevChunk.start, end: endIndex });
		      } else {
		        processedChunks.push(prevChunk, nextChunk);
		      }
		      return processedChunks;
		    }
		  }, []);
		
		  return chunks;
		};
		
		/**
		 * Examine text for any matches.
		 * If we find matches, add them to the returned array as a "chunk" object ({start:number, end:number}).
		 * @return {start:number, end:number}[]
		 */
		var defaultFindChunks = function defaultFindChunks(_ref3) {
		  var autoEscape = _ref3.autoEscape,
		      caseSensitive = _ref3.caseSensitive,
		      _ref3$sanitize = _ref3.sanitize,
		      sanitize = _ref3$sanitize === undefined ? identity : _ref3$sanitize,
		      searchWords = _ref3.searchWords,
		      textToHighlight = _ref3.textToHighlight;
		
		  textToHighlight = sanitize(textToHighlight);
		
		  return searchWords.filter(function (searchWord) {
		    return searchWord;
		  }) // Remove empty words
		  .reduce(function (chunks, searchWord) {
		    searchWord = sanitize(searchWord);
		
		    if (autoEscape) {
		      searchWord = escapeRegExpFn(searchWord);
		    }
		
		    var regex = new RegExp(searchWord, caseSensitive ? 'g' : 'gi');
		
		    var match = void 0;
		    while (match = regex.exec(textToHighlight)) {
		      var start = match.index;
		      var end = regex.lastIndex;
		      // We do not return zero-length matches
		      if (end > start) {
		        chunks.push({ start: start, end: end });
		      }
		
		      // Prevent browsers like Firefox from getting stuck in an infinite loop
		      // See http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/
		      if (match.index == regex.lastIndex) {
		        regex.lastIndex++;
		      }
		    }
		
		    return chunks;
		  }, []);
		};
		// Allow the findChunks to be overridden in findAll,
		// but for backwards compatibility we export as the old name
		exports.findChunks = defaultFindChunks;
		
		/**
		 * Given a set of chunks to highlight, create an additional set of chunks
		 * to represent the bits of text between the highlighted text.
		 * @param chunksToHighlight {start:number, end:number}[]
		 * @param totalLength number
		 * @return {start:number, end:number, highlight:boolean}[]
		 */
		
		var fillInChunks = exports.fillInChunks = function fillInChunks(_ref4) {
		  var chunksToHighlight = _ref4.chunksToHighlight,
		      totalLength = _ref4.totalLength;
		
		  var allChunks = [];
		  var append = function append(start, end, highlight) {
		    if (end - start > 0) {
		      allChunks.push({
		        start: start,
		        end: end,
		        highlight: highlight
		      });
		    }
		  };
		
		  if (chunksToHighlight.length === 0) {
		    append(0, totalLength, false);
		  } else {
		    var lastIndex = 0;
		    chunksToHighlight.forEach(function (chunk) {
		      append(lastIndex, chunk.start, false);
		      append(chunk.start, chunk.end, true);
		      lastIndex = chunk.end;
		    });
		    append(lastIndex, totalLength, false);
		  }
		  return allChunks;
		};
		
		function identity(value) {
		  return value;
		}
		
		function escapeRegExpFn(str) {
		  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
		}
	
	/***/ })
	/******/ ]);
	//# sourceMappingURL=index.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __nested_webpack_require_16653__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;
	
	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };
	
	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __nested_webpack_require_16653__(6)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __nested_webpack_require_16653__(13)();
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __nested_webpack_require_16653__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports, __nested_webpack_require_23461__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var emptyFunction = __nested_webpack_require_23461__(7);
	var invariant = __nested_webpack_require_23461__(8);
	var warning = __nested_webpack_require_23461__(9);
	var assign = __nested_webpack_require_23461__(10);
	
	var ReactPropTypesSecret = __nested_webpack_require_23461__(11);
	var checkPropTypes = __nested_webpack_require_23461__(12);
	
	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
	
	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }
	
	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */
	
	  var ANONYMOUS = '<<anonymous>>';
	
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),
	
	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };
	
	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/
	
	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;
	
	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;
	
	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }
	
	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);
	
	    return chainedCheckType;
	  }
	
	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);
	
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }
	
	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }
	
	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }
	
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }
	
	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }
	
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }
	
	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	
	    return createChainableTypeChecker(validate);
	  }
	
	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }
	
	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }
	
	        return true;
	      default:
	        return false;
	    }
	  }
	
	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }
	
	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }
	
	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }
	
	    return false;
	  }
	
	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }
	
	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }
	
	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }
	
	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }
	
	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __nested_webpack_require_23461__(5)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	
	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};
	
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};
	
	module.exports = emptyFunction;

/***/ }),
/* 8 */
/***/ (function(module, exports, __nested_webpack_require_45053__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var validateFormat = function validateFormat(format) {};
	
	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __nested_webpack_require_45053__(5)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __nested_webpack_require_46805__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var emptyFunction = __nested_webpack_require_46805__(7);
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = emptyFunction;
	
	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	
	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	
	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }
	
	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }
	
	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}
	
	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __nested_webpack_require_46805__(5)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	
	module.exports = ReactPropTypesSecret;


/***/ }),
/* 12 */
/***/ (function(module, exports, __nested_webpack_require_51592__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __nested_webpack_require_51592__(8);
	  var warning = __nested_webpack_require_51592__(9);
	  var ReactPropTypesSecret = __nested_webpack_require_51592__(11);
	  var loggedTypeFailures = {};
	}
	
	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;
	
	          var stack = getStack ? getStack() : '';
	
	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}
	
	module.exports = checkPropTypes;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __nested_webpack_require_51592__(5)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __nested_webpack_require_54693__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var emptyFunction = __nested_webpack_require_54693__(7);
	var invariant = __nested_webpack_require_54693__(8);
	var ReactPropTypesSecret = __nested_webpack_require_54693__(11);
	
	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,
	
	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };
	
	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = __webpack_require__(67294);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	
	var simpleIsEqual = function simpleIsEqual(a, b) {
	  return a === b;
	};
	
	function index (resultFn) {
	  var isEqual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : simpleIsEqual;
	
	  var lastThis = void 0;
	  var lastArgs = [];
	  var lastResult = void 0;
	  var calledOnce = false;
	
	  var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
	    return isEqual(newArg, lastArgs[index]);
	  };
	
	  var result = function result() {
	    for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
	      newArgs[_key] = arguments[_key];
	    }
	
	    if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
	      return lastResult;
	    }
	
	    calledOnce = true;
	    lastThis = this;
	    lastArgs = newArgs;
	    lastResult = resultFn.apply(this, newArgs);
	    return lastResult;
	  };
	
	  return result;
	}
	
	module.exports = index;


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 86851:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isArrayish = __webpack_require__(35171);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),

/***/ 73897:
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 85372:
/***/ ((module) => {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 38416:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(64062);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 68872:
/***/ ((module) => {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 12218:
/***/ ((module) => {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 27424:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithHoles = __webpack_require__(85372);
var iterableToArrayLimit = __webpack_require__(68872);
var unsupportedIterableToArray = __webpack_require__(86116);
var nonIterableRest = __webpack_require__(12218);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 86116:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(73897);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

};
;