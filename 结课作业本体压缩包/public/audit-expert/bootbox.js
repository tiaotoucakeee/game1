/**
 * Bootbox.js — 兼容低版本Bootstrap的弹窗库
 * 支持Bootstrap 2.x+、3.x、4.x、5.x
 * @version: 6.0.4 (改造版)
 * @license: MIT
 */
((e, t) => {
    'function' == typeof define && define.amd ? define(['jquery'], t) : 'object' == typeof exports ? module.exports = t(require('jquery')) : e.bootbox = t(e.jQuery)
})(this, function t(s, c) {
    let r = {};
    r.VERSION = '6.0.4 (兼容版)';
    let i = {
        en: {
            OK: '确认',
            CANCEL: '取消',
            CONFIRM: '确认'
        }
    };

    // 核心：根据Bootstrap版本动态生成基础HTML结构（关键兼容点）
    function getBaseTemplates(bootstrapVersion) {
        // Bootstrap 2.x结构：无.modal-dialog和.modal-content，直接嵌套header/body/footer
        if (bootstrapVersion === '2') {
            return {
                dialog: '<div class="bootbox modal hide fade" tabindex="-1" role="dialog" aria-hidden="true">' +
                            '<div class="modal-header"></div>' +
                            '<div class="modal-body"><div class="bootbox-body"></div></div>' +
                            '<div class="modal-footer"></div>' +
                        '</div>',
                header: '<h3 class="modal-title"></h3>', // Bootstrap 2用h3而非h5
                footer: '', // 2.x直接使用modal-footer容器
                closeButton: '<button type="button" class="bootbox-close-button close" aria-hidden="true">&times;</button>',
                form: '<form class="bootbox-form"></form>',
                button: '<button type="button" class="btn"></button>',
                option: '<option value=""></option>',
                promptMessage: '<div class="bootbox-prompt-message"></div>',
                inputs: {
                    text: '<input class="bootbox-input bootbox-input-text input-large" autocomplete="off" type="text" />', // 2.x用input-large
                    textarea: '<textarea class="bootbox-input bootbox-input-textarea input-large"></textarea>',
                    email: '<input class="bootbox-input bootbox-input-email input-large" autocomplete="off" type="email" />',
                    select: '<select class="bootbox-input bootbox-input-select input-large"></select>', // 2.x无form-select
                    checkbox: '<div class="checkbox"><label><input class="bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>', // 2.x无form-check
                    radio: '<div class="radio"><label><input class="bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
                    date: '<input class="bootbox-input bootbox-input-date input-large" autocomplete="off" type="date" />',
                    time: '<input class="bootbox-input bootbox-input-time input-large" autocomplete="off" type="time" />',
                    number: '<input class="bootbox-input bootbox-input-number input-large" autocomplete="off" type="number" />',
                    password: '<input class="bootbox-input bootbox-input-password input-large" autocomplete="off" type="password" />',
                    range: '<input class="bootbox-input bootbox-input-range" autocomplete="off" type="range" />'
                }
            };
        }

        // 高版本（3+）保持原结构
        return {
            dialog: '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="bootbox-body"></div></div></div></div></div>',
            header: '<div class="modal-header"><h5 class="modal-title"></h5></div>',
            footer: '<div class="modal-footer"></div>',
            closeButton: '<button type="button" class="bootbox-close-button close btn-close" aria-hidden="true" aria-label="Close"></button>',
            form: '<form class="bootbox-form"></form>',
            button: '<button type="button" class="btn"></button>',
            option: '<option value=""></option>',
            promptMessage: '<div class="bootbox-prompt-message"></div>',
            inputs: {
                text: '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
                textarea: '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
                email: '<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
                select: '<select class="bootbox-input bootbox-input-select form-select"></select>',
                checkbox: '<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
                radio: '<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
                date: '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
                time: '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
                number: '<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
                password: '<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
                range: '<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'
            }
        };
    }

    let p = {
        locale: 'en',
        backdrop: 'static',
        animate: true,
        className: null,
        closeButton: true,
        show: true,
        container: 'body',
        value: '',
        inputType: 'text',
        errorMessage: null,
        swapButtonOrder: true,
        centerVertical: false,
        multiple: false,
        scrollable: false,
        reusable: false,
        relatedTarget: null,
        size: null,
        id: null
    };

    function l(e, t, o) {
        return s.extend(true, {}, e, ((e, t) => {
            var o = e.length;
            let a = {};
            if (o < 1 || 2 < o) throw new Error('Invalid argument length');
            return 2 === o || 'string' == typeof e[0] ? (a[t[0]] = e[0], a[t[1]] = e[1]) : a = e[0], a;
        })(t, o));
    }

    function u(e, t, a, r) {
        let o;
        e = {
            className: 'bootbox-' + e,
            buttons: ((o, a) => {
                var r = {};
                for (let e = 0, t = o.length; e < t; e++) {
                    var n = o[e], l = n.toLowerCase(), n = n.toUpperCase();
                    r[l] = { label: ((e, t) => ((t = i[t]) || i.en)[e])(n, a) };
                }
                return r;
            })(t = r && r[0] && (o = r[0].locale || p.locale, r[0].swapButtonOrder || p.swapButtonOrder) ? t.reverse() : t, o)
        };
        {
            e = l(e, r, a);
            var n = t;
            let o = {};
            return f(n, function (e, t) { o[t] = true; }),
            f(e.buttons, function (e) {
                if (o[e] === c) throw new Error('button key "' + e + '" is not allowed (options are ' + n.join(' ') + ')');
            }), e;
        }
    }

    function b(e) { return Object.keys(e).length; }
    function f(e, o) { let a = 0; s.each(e, function (e, t) { o(e, t, a++); }); }
    function m(e) { e.data.dialog.find('.bootbox-accept').first().trigger('focus'); }
    function h(e) { e.target === e.data.dialog[0] && e.data.dialog.remove(); }
    function C(e) { e.target === e.data.dialog[0] && (e.data.dialog.off('escape.close.bb'), e.data.dialog.off('click')); }
    function O(e, t, o) { e.stopPropagation(), e.preventDefault(); 'function' == typeof o && !1 === o.call(t, e) || t.modal('hide'); }
    function w(e) { return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(e); }
    function g(e) { return /(\d{4})-(\d{2})-(\d{2})/.test(e); }

    return r.locales = function (e) { return e ? i[e] : i; },
    r.addLocale = function (e, o) {
        return s.each(['OK', 'CANCEL', 'CONFIRM'], function (e, t) {
            if (!o[t]) throw new Error('Please supply a translation for "' + t + '"');
        }), i[e] = { OK: o.OK, CANCEL: o.CANCEL, CONFIRM: o.CONFIRM }, r;
    },
    r.removeLocale = function (e) {
        if ('en' === e) throw new Error('"en" cannot be removed');
        return delete i[e], r;
    },
    r.setLocale = function (e) { return r.setDefaults('locale', e); },
    r.setDefaults = function () {
        let e = {};
        return 2 === arguments.length ? e[arguments[0]] = arguments[1] : e = arguments[0], s.extend(p, e), r;
    },
    r.hideAll = function () { return s('.bootbox').modal('hide'), r; },
    r.init = function (e) { return t(e || s); },
    r.dialog = function (e) {
        if (s.fn.modal === c) throw new Error('$.fn.modal is not defined (missing Bootstrap JS)');

        // 版本检测（增强版：精确识别2.x）
        let bootstrapVersion = '4', fullBootstrapVersion = '4.6.0';
        if (s.fn.modal && s.fn.modal.Constructor && s.fn.modal.Constructor.VERSION) {
            fullBootstrapVersion = s.fn.modal.Constructor.VERSION;
            bootstrapVersion = fullBootstrapVersion.split('.')[0];
        } else {
            // 无VERSION属性默认按Bootstrap 2处理（2.x无Constructor.VERSION）
            bootstrapVersion = '2';
            fullBootstrapVersion = '2.3.2';
            console.warn('Assuming Bootstrap 2.x (no version detected)');
        }
        e.bootstrap = bootstrapVersion;
        e.fullBootstrapVersion = fullBootstrapVersion;

        // 根据版本获取模板
        const d = getBaseTemplates(bootstrapVersion);

        // 初始化配置
        e = (a => {
            let r, n;
            if ('object' != typeof a) throw new Error('Please supply options object');
            if (a.message) {
                a = s.extend({}, p, a);
                a.backdrop = a.backdrop ? (typeof a.backdrop !== 'string' || a.backdrop.toLowerCase() !== 'static') ? true : 'static' : false;
                a.buttons || (a.buttons = {});
                r = a.buttons;
                n = b(r);
                f(r, function (e, t, o) {
                    if (typeof t === 'function') t = r[e] = { callback: t };
                    if (typeof t !== 'object') throw new Error('button "' + e + '" must be object');
                    t.label || (t.label = e);
                    // 按钮样式兼容：Bootstrap 2无btn-secondary，用btn-default替代
                    if (!t.className) {
                        let isPrimary = a.swapButtonOrder ? o === 0 : o === n - 1;
                        t.className = (n <= 2 && isPrimary) ? 'btn-primary' : (bootstrapVersion === '2' ? 'btn-default' : 'btn-secondary btn-default');
                    }
                });
                return a;
            }
            throw new Error('"message" option is required');
        })(e);

        // 创建模态框元素（根据版本调整结构）
        let o = s(d.dialog);
        let dialogWrapper, modalBody, modalHeader, modalFooter;

        // Bootstrap 2结构：直接找.modal-body等（无.modal-dialog）
        if (bootstrapVersion === '2') {
            modalBody = o.find('.modal-body');
            modalHeader = o.find('.modal-header');
            modalFooter = o.find('.modal-footer');
            dialogWrapper = o; // 2.x无modal-dialog，用整个modal作为容器
        } else {
            dialogWrapper = o.find('.modal-dialog');
            modalBody = o.find('.modal-body');
            modalHeader = s(d.header);
            modalFooter = s(d.footer);
        }

        let n = e.buttons;
        let i = { onEscape: e.onEscape };

        // 设置消息内容
        modalBody.find('.bootbox-body').html(e.message);

        // 处理按钮
        if (b(e.buttons) > 0) {
            f(n, function (e, t) {
                var btn = s(d.button);
                btn.data('bb-handler', e).addClass(t.className);
                if (['ok', 'confirm'].includes(e)) btn.addClass('bootbox-accept');
                else if (e === 'cancel') btn.addClass('bootbox-cancel');
                btn.html(t.label);
                if (t.id) btn.attr('id', t.id);
                if (t.disabled) btn.prop('disabled', true);
                // Bootstrap 2直接用.modal-footer容器
                (bootstrapVersion === '2' ? modalFooter : o.find('.modal-content')).append(btn);
                i[e] = t.callback;
            });
        }

        // 动画效果：Bootstrap 2用hide和fade类控制
        if (e.animate) o.addClass('fade');

        // 自定义类和ID
        if (e.className) o.addClass(e.className);
        if (e.id) o.attr('id', e.id);

        // 尺寸处理（Bootstrap 2不支持modal-sm等，添加自定义类兼容）
        if (e.size && bootstrapVersion !== '2') {
            if (fullBootstrapVersion.substring(0, 3) < '3.1') {
                console.warn('"size" needs Bootstrap 3.1+ (using ' + fullBootstrapVersion + ')');
            }
            switch (e.size) {
                case 'small': case 'sm': dialogWrapper.addClass('modal-sm'); break;
                case 'large': case 'lg': dialogWrapper.addClass('modal-lg'); break;
                case 'xl': case 'extra-large':
                    dialogWrapper.addClass('modal-xl');
                    if (fullBootstrapVersion.substring(0, 3) < '4.2') console.warn('"xl" needs Bootstrap 4.2+');
            }
        } else if (e.size && bootstrapVersion === '2') {
            // Bootstrap 2尺寸兼容：添加自定义类（需配合CSS）
            const sizeClass = e.size === 'sm' ? 'bootbox-sm' : e.size === 'lg' ? 'bootbox-lg' : '';
            if (sizeClass) dialogWrapper.addClass(sizeClass);
            console.warn('Bootstrap 2: "size" uses custom classes (add CSS for .bootbox-sm/.bootbox-lg)');
        }

        // 滚动内容兼容（2.x不支持，忽略）
        if (e.scrollable) {
            if (bootstrapVersion >= '4') {
                dialogWrapper.addClass('modal-dialog-scrollable');
                if (fullBootstrapVersion.substring(0, 3) < '4.3') console.warn('"scrollable" needs Bootstrap 4.3+');
            } else {
                console.warn('"scrollable" not supported in Bootstrap ' + bootstrapVersion);
            }
        }

        // 头部处理（标题和关闭按钮）
        if (e.title || e.closeButton) {
            if (bootstrapVersion === '2') {
                // Bootstrap 2头部直接用.modal-header，标题是h3
                modalHeader.html(e.title ? s(d.header).html(e.title) : '');
            } else {
                // 高版本结构
                e.title ? modalHeader.find('.modal-title').html(e.title) : modalHeader.addClass('border-0');
                modalBody.before(modalHeader);
            }
            // 关闭按钮
            if (e.closeButton) {
                const closeBtn = s(d.closeButton);
                // Bootstrap 2关闭按钮放头部
                (bootstrapVersion === '2' ? modalHeader : modalHeader).append(closeBtn);
            }
        }

        // 垂直居中（2.x不支持，忽略）
        if (e.centerVertical) {
            if (bootstrapVersion >= '4') {
                dialogWrapper.addClass('modal-dialog-centered');
                if (fullBootstrapVersion < '4.0.0') console.warn('"centerVertical" needs Bootstrap 4+');
            } else {
                console.warn('"centerVertical" not supported in Bootstrap ' + bootstrapVersion);
            }
        }

        // 销毁逻辑（事件名兼容：2.x用"hidden"而非"hidden.bs.modal"）
        if (!e.reusable) {
            const hiddenEvent = bootstrapVersion === '2' ? 'hidden' : 'hidden.bs.modal';
            o.one(hiddenEvent, { dialog: o }, h);
        }

        // 事件绑定（兼容2.x事件名）
        const eventPrefix = bootstrapVersion === '2' ? '' : 'bs.modal';
        const showEvent = eventPrefix ? 'show.' + eventPrefix : 'show';
        const shownEvent = eventPrefix ? 'shown.' + eventPrefix : 'shown';
        const hideEvent = eventPrefix ? 'hide.' + eventPrefix : 'hide';
        const hiddenEvent = eventPrefix ? 'hidden.' + eventPrefix : 'hidden';

        if (e.onHide && typeof e.onHide === 'function') o.on(hideEvent, e.onHide);
        if (e.onHidden && typeof e.onHidden === 'function') o.on(hiddenEvent, e.onHidden);
        if (e.onShow && typeof e.onShow === 'function') o.on(showEvent, e.onShow);
        if (e.onShown && typeof e.onShown === 'function') o.on(shownEvent, e.onShown);

        // 显示后聚焦
        o.on(shownEvent, { dialog: o }, m);

        // 背景点击关闭（2.x逻辑不同）
        if (e.backdrop === true) {
            o.on('click', function (e) {
                if (e.target === o[0]) o.trigger('escape.close.bb');
            });
        }

        // 核心交互事件
        o.on('escape.close.bb', function (e) {
            i.onEscape && O(e, o, i.onEscape);
        });
        o.on('click', '.modal-footer button:not(.disabled)', function (e) {
            const handler = s(this).data('bb-handler');
            if (handler !== undefined) O(e, o, i[handler]);
        });
        o.on('click', '.bootbox-close-button', function (e) {
            O(e, o, i.onEscape);
        });
        o.on('keyup', function (e) {
            if (e.which === 27) o.trigger('escape.close.bb');
        });

        // 添加到页面并初始化
        s(e.container).append(o);
        // 模态框初始化参数（2.x无keyboard选项，用其他方式控制）
        o.modal({
            backdrop: e.backdrop,
            keyboard: bootstrapVersion !== '2', // 2.x不支持keyboard参数
            show: false
        });
        if (e.show) o.modal('show', e.relatedTarget);

        return o;
    },
    r.alert = function () {
        let e = u('alert', ['ok'], ['message', 'callback'], arguments);
        if (e.callback && typeof e.callback !== 'function') throw new Error('alert callback must be function');
        e.buttons.ok.callback = e.onEscape = function () {
            return !e.callback || e.callback.call(this);
        };
        return r.dialog(e);
    },
    r.confirm = function () {
        let e = u('confirm', ['cancel', 'confirm'], ['message', 'callback'], arguments);
        if (typeof e.callback !== 'function') throw new Error('confirm needs callback');
        e.buttons.cancel.callback = e.onEscape = function () {
            return e.callback.call(this, false);
        };
        e.buttons.confirm.callback = function () {
            return e.callback.call(this, true);
        };
        return r.dialog(e);
    },
    r.prompt = function () {
        let n, t;
        var e, o, a;
        let l, i;
        e = s(d.form);
        n = u('prompt', ['cancel', 'confirm'], ['title', 'callback'], arguments);
        n.value || (n.value = p.value);
        n.inputType || (n.inputType = p.inputType);
        o = n.show !== undefined ? n.show : p.show;
        n.show = false;

        // 取消回调
        n.buttons.cancel.callback = n.onEscape = function () {
            return n.callback.call(this, null);
        };

        // 确认回调
        n.buttons.confirm.callback = function () {
            let val;
            if ('checkbox' === n.inputType) {
                val = l.find('input:checked').map(function () { return s(this).val(); }).get();
                if (val.length === 0 && n.required) return false;
            } else if ('radio' === n.inputType) {
                val = l.find('input:checked').val();
            } else {
                const inputEl = l[0];
                if (inputEl.checkValidity && !inputEl.checkValidity()) {
                    if (n.errorMessage) inputEl.setCustomValidity(n.errorMessage);
                    if (inputEl.reportValidity) inputEl.reportValidity();
                    return false;
                }
                val = 'select' === n.inputType && n.multiple ?
                    l.find('option:selected').map(function () { return s(this).val(); }).get() :
                    l.val();
            }
            return n.callback.call(this, val);
        };

        if (!n.title) throw new Error('prompt needs title');
        if (typeof n.callback !== 'function') throw new Error('prompt needs callback');
        if (!d.inputs[n.inputType]) throw new Error('Invalid inputType');

        // 输入框初始化（根据版本和类型）
        l = s(d.inputs[n.inputType]);
        switch (n.inputType) {
            case 'text': case 'textarea': case 'email': case 'password':
                l.val(n.value);
                if (n.placeholder) l.attr('placeholder', n.placeholder);
                if (n.pattern) l.attr('pattern', n.pattern);
                if (n.maxlength) l.attr('maxlength', n.maxlength);
                if (n.required) l.prop('required', true);
                if (n.rows && !isNaN(parseInt(n.rows)) && 'textarea' === n.inputType) {
                    l.attr('rows', n.rows);
                }
                break;
            case 'date': case 'time': case 'number': case 'range':
                l.val(n.value);
                if (n.placeholder) l.attr('placeholder', n.placeholder);
                if (n.pattern) l.attr('pattern', n.pattern);
                if (n.required) l.prop('required', true);
                // 处理min/max
                const isValidRange = (type, min, max) => {
                    if (type === 'date') {
                        return (!min || g(min)) && (!max || g(max)) && (!min || !max || max >= min);
                    } else if (type === 'time') {
                        return (!min || w(min)) && (!max || w(max)) && (!min || !max || max >= min);
                    } else {
                        return (!min || !isNaN(min)) && (!max || !isNaN(max)) && (!min || !max || parseFloat(max) >= parseFloat(min));
                    }
                };
                if (isValidRange(n.inputType, n.min, n.max)) {
                    if (n.min !== undefined) l.attr('min', n.min);
                    if (n.max !== undefined) l.attr('max', n.max);
                }
                if (n.step) {
                    if (n.step !== 'any' && isNaN(n.step)) throw new Error('step must be number or "any"');
                    l.attr('step', n.step);
                }
                break;
            case 'select':
                i = n.inputOptions || [];
                if (!Array.isArray(i)) throw new Error('inputOptions must be array');
                if (i.length === 0) throw new Error('select needs at least one option');
                n.required && l.prop('required', true);
                n.multiple && l.prop('multiple', true);
                const optGroups = {};
                f(i, function (_, opt) {
                    if (opt.value === undefined || opt.text === undefined) throw new Error('option needs value and text');
                    if (opt.group) {
                        if (!optGroups[opt.group]) optGroups[opt.group] = s('<optgroup label="' + opt.group + '">');
                        optGroups[opt.group].append(s(d.option).attr('value', opt.value).text(opt.text));
                    } else {
                        l.append(s(d.option).attr('value', opt.value).text(opt.text));
                    }
                });
                f(optGroups, (_, group) => l.append(group));
                l.val(n.value);
                // Bootstrap 2 select类名调整
                if (n.bootstrap === '2') l.removeClass('form-select').addClass('input-large');
                break;
            case 'checkbox':
                const checkValues = Array.isArray(n.value) ? n.value : [n.value];
                i = n.inputOptions || [];
                if (i.length === 0) throw new Error('checkbox needs options');
                l = s('<div class="bootbox-checkbox-list"></div>');
                f(i, function (_, opt) {
                    if (opt.value === undefined || opt.text === undefined) throw new Error('option needs value and text');
                    const cb = s(d.inputs.checkbox);
                    cb.find('input').attr('value', opt.value);
                    cb.find('label').append(opt.text);
                    if (checkValues.includes(opt.value)) cb.find('input').prop('checked', true);
                    l.append(cb);
                });
                break;
            case 'radio':
                if (Array.isArray(n.value)) throw new Error('radio value cannot be array');
                i = n.inputOptions || [];
                if (i.length === 0) throw new Error('radio needs options');
                l = s('<div class="bootbox-radiobutton-list"></div>');
                let hasChecked = false;
                f(i, function (_, opt) {
                    if (opt.value === undefined || opt.text === undefined) throw new Error('option needs value and text');
                    const rb = s(d.inputs.radio);
                    rb.find('input').attr('value', opt.value);
                    rb.find('label').append(opt.text);
                    if (n.value !== undefined && opt.value === n.value) {
                        rb.find('input').prop('checked', true);
                        hasChecked = true;
                    }
                    l.append(rb);
                });
                if (!hasChecked) l.find('input[type="radio"]').first().prop('checked', true);
                break;
        }

        // 组装表单
        e.append(l);
        e.on('submit', function (e) {
            e.preventDefault();
            t.find('.bootbox-accept').trigger('click');
        });

        // 添加提示消息
        if (n.message && n.message.trim() !== '') {
            a = s(d.promptMessage).html(n.message);
            e.prepend(a);
        }
        n.message = e;

        // 创建对话框
        t = r.dialog(n);
        t.off(shownEvent, m);
        t.on(shownEvent, function () { l.focus(); });
        if (o) t.modal('show');
        return t;
    },
    r
}),
((e, t) => {
    'function' == typeof define && define.amd ? define(['bootbox'], t) :
    'object' == typeof module && module.exports ? t(require('./bootbox')) :
    t(e.bootbox);
})(this, function (e) {
    // 多语言支持（保持不变）
    e.addLocale('ar', { OK: 'موافق', CANCEL: 'الغاء', CONFIRM: 'تأكيد' });
    e.addLocale('az', { OK: 'OK', CANCEL: 'İmtina et', CONFIRM: 'Təsdiq et' });
    e.addLocale('bg-BG', { OK: 'Ок', CANCEL: 'Отказ', CONFIRM: 'Потвърждавам' });
    e.addLocale('cs', { OK: 'OK', CANCEL: 'Zrušit', CONFIRM: 'Potvrdit' });
    e.addLocale('da', { OK: 'OK', CANCEL: 'Annuller', CONFIRM: 'Accepter' });
    e.addLocale('de', { OK: 'OK', CANCEL: 'Abbrechen', CONFIRM: 'Akzeptieren' });
    e.addLocale('el', { OK: 'Εντάξει', CANCEL: 'Ακύρωση', CONFIRM: 'Επιβεβαίωση' });
    e.addLocale('en', { OK: '确定', CANCEL: 'Cancel', CONFIRM: '确认' });
    e.addLocale('es', { OK: 'OK', CANCEL: 'Cancelar', CONFIRM: 'Aceptar' });
    e.addLocale('fr', { OK: 'OK', CANCEL: 'Annuler', CONFIRM: 'Confirmer' });
    e.addLocale('zh-CN', { OK: '确定', CANCEL: '取消', CONFIRM: '确认' }); // 补充中文
    e.addLocale('zh-TW', { OK: '確定', CANCEL: '取消', CONFIRM: '确认' });
});