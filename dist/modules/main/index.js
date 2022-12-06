var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@markdown/main/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    components_1.Styles.cssRule('#pnlMarkdown', {
        $nest: {
            ".markdown-container.invalid": {
                $nest: {
                    ".markdown-input input": {
                        border: "2px solid #B2554D"
                    }
                }
            },
            "textarea": {
                border: 'none',
                outline: 'none'
            }
        }
    });
});
define("@markdown/main", ["require", "exports", "@ijstech/components", "@markdown/main/index.css.ts"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MarkdownBlock = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    let MarkdownBlock = class MarkdownBlock extends components_2.Module {
        constructor() {
            super(...arguments);
            this.defaultEdit = true;
        }
        async init() {
            super.init();
            this.initEventListener();
        }
        initEventListener() {
            this.txtMarkdown.onKeyDown = (control, event) => {
                if (event.ctrlKey && event.keyCode === 13) {
                    this.onConfirm();
                }
            };
        }
        handleTxtAreaChanged(control) {
            this.autoResize(control);
            this.mdPreview();
        }
        autoResize(control) {
            const rows = control.value.split('\n').length;
            const lineHeight = 85.94 / 4;
            const minHeight = 600;
            const calcHeight = rows * lineHeight;
            control.height = calcHeight > minHeight ? calcHeight : minHeight;
        }
        mdPreview() {
            this.setData(this.txtMarkdown.value);
            this.mdViewer.visible = true;
        }
        getData() {
            return this.data;
        }
        async setData(value) {
            this.data = value;
            this.mdViewer.load(value);
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
        }
        async edit() {
            this.mdViewer.width = '50%';
            this.txtMarkdownPnl.width = '50%';
            this.txtMarkdown.value = this.data;
            this.txtMarkdown.visible = true;
            this.mdViewer.visible = true;
            this.autoResize(this.txtMarkdown);
        }
        async confirm() {
            console.log('md confirm');
            this.setData(this.txtMarkdown.value);
            this.mdViewer.visible = true;
            this.mdViewer.width = '100%';
            this.txtMarkdownPnl.width = 0;
            this.txtMarkdown.visible = false;
            this.tempData = this.data;
        }
        async discard() {
            if (!this.data) {
                this.txtMarkdown.value = '';
                return;
            }
            this.data = this.tempData;
            this.txtMarkdown.value = this.tempData;
            this.setData(this.tempData);
            this.mdViewer.visible = true;
            this.mdViewer.width = '100%';
            this.txtMarkdownPnl.width = 0;
            this.txtMarkdown.visible = false;
        }
        validate() {
            const isValid = !!(this.txtMarkdown.value.trim());
            if (!isValid)
                this.pnlMarkdown.classList.add('invalid');
            else
                this.pnlMarkdown.classList.remove('invalid');
            return isValid;
        }
        async handleMarkdownViewerDblClick() {
            await this.onEdit();
        }
        render() {
            return (this.$render("i-panel", { id: "pnlMarkdown", class: "markdown-container" },
                this.$render("i-hstack", { width: '100%', height: '100%' },
                    this.$render("i-panel", { id: "txtMarkdownPnl", width: '50%', height: '100%', border: { right: { color: '#6f56f9', width: '1px', style: 'solid' } } },
                        this.$render("i-input", { id: "txtMarkdown", class: "markdown-input", width: '100%', height: '100%', inputType: 'textarea', placeholder: "Enter here", captionWidth: 0, font: { size: Theme.typography.fontSize }, onChanged: this.handleTxtAreaChanged })),
                    this.$render("i-markdown", { id: "mdViewer", class: 'markdown-viewer hidden', width: 'auto', height: 'auto', padding: { top: '10px', bottom: '10px', left: '10px', right: '10px' }, onDblClick: this.handleMarkdownViewerDblClick }))));
        }
    };
    MarkdownBlock = __decorate([
        components_2.customModule
    ], MarkdownBlock);
    exports.MarkdownBlock = MarkdownBlock;
});
