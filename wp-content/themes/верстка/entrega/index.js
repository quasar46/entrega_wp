/*! For license information please see index.js.LICENSE.txt */
(() => {
    var e = {
        432: e => {
            function t() {
                var e = {}, s = !1, i = 0, n = arguments.length;
                "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (s = arguments[0], i++);
                for (var r = function (i) {
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (s && "[object Object]" === Object.prototype.toString.call(i[n]) ? e[n] = t(!0, e[n], i[n]) : e[n] = i[n])
                }; i < n; i++) r(arguments[i]);
                return e
            }

            e.exports = class {
                constructor(e) {
                    this.options = t(!0, {
                        selector: "header",
                        linkSelector: null,
                        scrollSettings: {startHeight: 100, stopHeight: 50, stopPosition: 400, breakPosition: 600},
                        classes: {useClasses: !1, isOpen: "sh-open", onStop: "sh-stop"},
                        logo: {autoScale: !0, selector: null, maxHeight: null, minHeight: null},
                        responsive: null,
                        onInit: () => {
                        },
                        onPlay: () => {
                        },
                        onPause: () => {
                        },
                        onUpdate: () => {
                        }
                    }, e || {}), (this.el = document.querySelector(this.options.selector)) && (this.options.linkSelector && (this.links = this.el.querySelectorAll(this.options.linkSelector)), this.options.logo.selector && (this.logo = document.querySelector(this.options.logo.selector)), this.lastScrollY = null, this.direction = "", this.lastDirection = "", this.betweenState = !1, this.paused = !1, this.scrollDisabled = !1, this.state = {
                        open: 1,
                        hidden: 2
                    }, this._checkResponsiveBreakpoints(), this._setScrollDirection(), this._updateHeightAndAnimation(), this._updateState(), this._registerEvents(), this.options.onInit.call(this))
                }

                _checkResponsiveBreakpoints() {
                    if (this.responsive = this.options.scrollSettings, !this.options.logo.autoScale && this.options.logo.selector && (this.responsive = t(!0, this.responsive, {
                        logo: {
                            maxHeight: this.options.logo.maxHeight,
                            minHeight: this.options.logo.minHeight
                        }
                    })), this.options.responsive) for (let e in this.options.responsive) window.innerWidth >= e && (this.responsive = t(!0, this.responsive, this.options.responsive[e]))
                }

                _registerEvents() {
                    window.addEventListener("scroll", (() => {
                        this.paused || (this._checkLargeScroll(), this._updateState(), this._setScrollDirection())
                    }), {passive: !0}), window.addEventListener("resize", (() => {
                        this._checkResponsiveBreakpoints(), this._updateHeightAndAnimation(), this.paused || this._updateState()
                    }), {passive: !0})
                }

                _checkLargeScroll() {
                    this.lastScrollY - window.scrollY >= this.responsive.stopHeight ? (this._setState(this.state.open), this._updateHeightAndAnimation(), this.direction = "up") : -1 * (this.lastScrollY - window.scrollY) >= this.responsive.stopHeight && (this._setState(this.state.hidden), this._updateHeightAndAnimation(), this.direction = "down")
                }

                _setScrollDirection() {
                    this.lastDirection = this.direction, this.lastScrollY && this.lastScrollY !== window.scrollY ? this.lastScrollY < window.scrollY ? this.direction = "down" : this.lastScrollY > window.scrollY && (this.direction = "up") : this.direction = "", this.lastScrollY = window.scrollY
                }

                _getPosition() {
                    return this.el.offsetTop + (this.lastScrollY - window.scrollY)
                }

                _updateHeightAndAnimation() {
                    const e = window.scrollY / this.responsive.stopPosition, t = -e + "s";
                    if (window.scrollY <= this.responsive.stopPosition) {
                        if (this.el.style.height = this.responsive.startHeight - (this.responsive.startHeight - this.responsive.stopHeight) * (window.scrollY / this.responsive.stopPosition) + "px", this.el.style.animationDelay = t, this.options.linkSelector) for (let e = 0; e < this.links.length; e++) this.links[e].style.animationDelay = t;
                        this.options.classes.useClasses && this.el.classList.remove(this.options.classes.onStop)
                    } else {
                        if (this.el.style.height = this.responsive.stopHeight + "px", this.el.style.animationDelay = "-1s", this.options.linkSelector) for (let e = 0; e < this.links.length; e++) this.links[e].style.animationDelay = "-1s";
                        this.options.classes.useClasses && this.el.classList.add(this.options.classes.onStop)
                    }
                    this.options.logo.selector && this.logo && this._updateLogoHeight(), this.options.onUpdate.call(this, e)
                }

                _updateLogoHeight() {
                    const e = 100 * window.scrollY / this.responsive.stopPosition,
                        t = this.options.logo.autoScale ? this.responsive.stopHeight / this.responsive.startHeight : this.responsive.logo.minHeight / this.responsive.logo.maxHeight,
                        s = 1 - t;
                    window.scrollY <= this.responsive.stopPosition ? this.logo.style.transform = "scale(" + (1 - s * e / 100).toFixed(3) + ")" : this.logo.style.transform = "scale(" + t.toFixed(3) + ")"
                }

                _setState(e) {
                    switch (e) {
                        case this.state.open:
                            this.el.style.top = 0;
                            break;
                        case this.state.hidden:
                            this.el.style.top = -this.responsive.stopHeight + "px"
                    }
                    this._setClasses(e)
                }

                _setClasses(e) {
                    if (this.options.classes.useClasses) switch (e) {
                        case this.state.open:
                            this.el.classList.add(this.options.classes.isOpen);
                            break;
                        case this.state.hidden:
                            this.el.classList.remove(this.options.classes.isOpen)
                    }
                }

                _updateState() {
                    this.betweenState ? this._betweenStateHandler() : window.scrollY < this.responsive.breakPosition ? (this._updateHeightAndAnimation(), this._setState(this.state.open)) : window.scrollY >= this.responsive.breakPosition && window.scrollY < this.responsive.breakPosition + this.responsive.stopHeight || this.lastDirection !== this.direction && this.lastDirection ? this.betweenState = !0 : "down" === this.direction ? this._setState(this.state.hidden) : "up" === this.direction ? this._setState(this.state.open) : this.direction || (this._setState(this.state.hidden), this.direction = "down")
                }

                _betweenStateHandler() {
                    const e = this._getPosition();
                    switch (this.direction) {
                        case"up":
                            e < 0 ? this.el.style.top = e + "px" : (this._setState(this.state.open), this.betweenState = !1);
                            break;
                        case"down":
                            e <= 0 && e > -this.responsive.stopHeight ? this.el.style.top = e + "px" : (this._setState(this.state.hidden), this.betweenState = !1)
                    }
                }

                play() {
                    this.scrollDisabled && (document.body.style.overflowY = "", this.scrollDisabled = !1), this.paused = !1, this._updateHeightAndAnimation(), this.options.onPlay.call(this)
                }

                stop(e = !1, t = !1) {
                    e && (this._setState(this.state.open), this.direction = "up"), t && (document.body.style.overflowY = "hidden", this.scrollDisabled = t), this.paused = !0, this.options.onPause.call(this)
                }

                isPaused() {
                    return this.paused
                }
            }
        }, 296: e => {
            var t, s, i;
            t = window, s = 0, i = function e(t, i) {
                var n = this, r = this, o = !1;
                if (Array.isArray(t)) return !!t.length && t.map((function (t) {
                    return new e(t, i)
                }));
                var a = {
                    init: function () {
                        this.options = Object.assign({
                            duration: 600,
                            ariaEnabled: !0,
                            collapse: !0,
                            showMultiple: !1,
                            onlyChildNodes: !0,
                            openOnInit: [],
                            elementClass: "ac",
                            triggerClass: "ac-trigger",
                            panelClass: "ac-panel",
                            activeClass: "is-active",
                            beforeOpen: function () {
                            },
                            onOpen: function () {
                            },
                            beforeClose: function () {
                            },
                            onClose: function () {
                            }
                        }, i);
                        var e = "string" == typeof t;
                        this.container = e ? document.querySelector(t) : t, this.createDefinitions(), r.attachEvents()
                    }, createDefinitions: function () {
                        var e = this, t = this.options, i = t.elementClass, n = t.openOnInit,
                            r = t.onlyChildNodes ? this.container.childNodes : this.container.querySelectorAll(c(i));
                        this.elements = Array.from(r).filter((function (e) {
                            return e.classList && e.classList.contains(i)
                        })), this.firstElement = this.elements[0], this.lastElement = this.elements[this.elements.length - 1], this.elements.filter((function (e) {
                            return !e.classList.contains("js-enabled")
                        })).forEach((function (t) {
                            t.classList.add("js-enabled"), e.generateIDs(t), e.setARIA(t), e.setTransition(t);
                            var i = e.elements.indexOf(t);
                            s++, n.includes(i) ? e.showElement(t, !1) : e.closeElement(t, !1)
                        }))
                    }, setTransition: function (e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], s = this.options,
                            i = s.duration, n = s.panelClass, r = e.querySelector(c(n)), o = l("transitionDuration");
                        r.style[o] = t ? null : "".concat(i, "ms")
                    }, generateIDs: function (e) {
                        var t = this.options, i = t.triggerClass, n = t.panelClass, r = e.querySelector(c(i)),
                            o = e.querySelector(c(n));
                        e.setAttribute("id", e.id || "ac-".concat(s)), r.setAttribute("id", r.id || "ac-trigger-".concat(s)), o.setAttribute("id", o.id || "ac-panel-".concat(s))
                    }, removeIDs: function (e) {
                        var t = this.options, s = t.triggerClass, i = t.panelClass, n = e.querySelector(c(s)),
                            r = e.querySelector(c(i));
                        e.id.startsWith("ac-") && e.removeAttribute("id"), n.id.startsWith("ac-") && n.removeAttribute("id"), r.id.startsWith("ac-") && r.removeAttribute("id")
                    }, setARIA: function (e) {
                        var t = this.options, s = t.ariaEnabled, i = t.triggerClass, n = t.panelClass;
                        if (s) {
                            var r = e.querySelector(c(i)), o = e.querySelector(c(n));
                            r.setAttribute("role", "button"), r.setAttribute("aria-controls", o.id), r.setAttribute("aria-disabled", !1), r.setAttribute("aria-expanded", !1), o.setAttribute("role", "region"), o.setAttribute("aria-labelledby", r.id)
                        }
                    }, updateARIA: function (e, t) {
                        var s = t.ariaExpanded, i = t.ariaDisabled, n = this.options, r = n.ariaEnabled,
                            o = n.triggerClass;
                        if (r) {
                            var a = e.querySelector(c(o));
                            a.setAttribute("aria-expanded", s), a.setAttribute("aria-disabled", i)
                        }
                    }, removeARIA: function (e) {
                        var t = this.options, s = t.ariaEnabled, i = t.triggerClass, n = t.panelClass;
                        if (s) {
                            var r = e.querySelector(c(i)), o = e.querySelector(c(n));
                            r.removeAttribute("role"), r.removeAttribute("aria-controls"), r.removeAttribute("aria-disabled"), r.removeAttribute("aria-expanded"), o.removeAttribute("role"), o.removeAttribute("aria-labelledby")
                        }
                    }, focus: function (e, t) {
                        e.preventDefault();
                        var s = this.options.triggerClass;
                        t.querySelector(c(s)).focus()
                    }, focusFirstElement: function (e) {
                        this.focus(e, this.firstElement), this.currFocusedIdx = 0
                    }, focusLastElement: function (e) {
                        this.focus(e, this.lastElement), this.currFocusedIdx = this.elements.length - 1
                    }, focusNextElement: function (e) {
                        var t = this.currFocusedIdx + 1;
                        if (t > this.elements.length - 1) return this.focusFirstElement(e);
                        this.focus(e, this.elements[t]), this.currFocusedIdx = t
                    }, focusPrevElement: function (e) {
                        var t = this.currFocusedIdx - 1;
                        if (t < 0) return this.focusLastElement(e);
                        this.focus(e, this.elements[t]), this.currFocusedIdx = t
                    }, showElement: function (e) {
                        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], s = this.options,
                            i = s.panelClass, n = s.activeClass, r = s.collapse, o = s.beforeOpen;
                        t && o(e);
                        var a = e.querySelector(c(i)), l = a.scrollHeight;
                        e.classList.add(n), requestAnimationFrame((function () {
                            requestAnimationFrame((function () {
                                a.style.height = t ? "".concat(l, "px") : "auto"
                            }))
                        })), this.updateARIA(e, {ariaExpanded: !0, ariaDisabled: !r})
                    }, closeElement: function (e) {
                        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], s = this.options,
                            i = s.panelClass, n = s.activeClass, r = s.beforeClose, o = e.querySelector(c(i)),
                            a = o.scrollHeight;
                        e.classList.remove(n), t ? (r(e), requestAnimationFrame((function () {
                            o.style.height = "".concat(a, "px"), requestAnimationFrame((function () {
                                o.style.height = 0
                            }))
                        }))) : o.style.height = 0, this.updateARIA(e, {ariaExpanded: !1, ariaDisabled: !1})
                    }, toggleElement: function (e) {
                        var t = this.options, s = t.activeClass, i = t.collapse, n = e.classList.contains(s);
                        if (!n || i) return n ? this.closeElement(e) : this.showElement(e)
                    }, closeElements: function () {
                        var e = this, t = this.options, s = t.activeClass;
                        t.showMultiple || this.elements.forEach((function (t, i) {
                            t.classList.contains(s) && i !== e.currFocusedIdx && e.closeElement(t)
                        }))
                    }, handleClick: function (e) {
                        var t = this, s = e.currentTarget;
                        this.elements.forEach((function (i, n) {
                            i.contains(s) && "A" !== e.target.nodeName && (t.currFocusedIdx = n, t.closeElements(), t.focus(e, i), t.toggleElement(i))
                        }))
                    }, handleKeydown: function (e) {
                        switch (e.key) {
                            case"ArrowUp":
                                return this.focusPrevElement(e);
                            case"ArrowDown":
                                return this.focusNextElement(e);
                            case"Home":
                                return this.focusFirstElement(e);
                            case"End":
                                return this.focusLastElement(e);
                            default:
                                return null
                        }
                    }, handleFocus: function (e) {
                        var t = e.currentTarget, s = this.elements.find((function (e) {
                            return e.contains(t)
                        }));
                        this.currFocusedIdx = this.elements.indexOf(s)
                    }, handleTransitionEnd: function (e) {
                        if (e.stopPropagation(), "height" === e.propertyName) {
                            var t = this.options, s = t.onOpen, i = t.onClose, n = e.currentTarget,
                                r = parseInt(n.style.height), o = this.elements.find((function (e) {
                                    return e.contains(n)
                                }));
                            r > 0 ? (n.style.height = "auto", s(o)) : i(o)
                        }
                    }
                };
                this.attachEvents = function () {
                    if (!o) {
                        var e = a.options, t = e.triggerClass, s = e.panelClass;
                        a.handleClick = a.handleClick.bind(a), a.handleKeydown = a.handleKeydown.bind(a), a.handleFocus = a.handleFocus.bind(a), a.handleTransitionEnd = a.handleTransitionEnd.bind(a), a.elements.forEach((function (e) {
                            var i = e.querySelector(c(t)), n = e.querySelector(c(s));
                            i.addEventListener("click", a.handleClick), i.addEventListener("keydown", a.handleKeydown), i.addEventListener("focus", a.handleFocus), n.addEventListener("webkitTransitionEnd", a.handleTransitionEnd), n.addEventListener("transitionend", a.handleTransitionEnd)
                        })), o = !0
                    }
                }, this.detachEvents = function () {
                    if (o) {
                        var e = a.options, t = e.triggerClass, s = e.panelClass;
                        a.elements.forEach((function (e) {
                            var i = e.querySelector(c(t)), n = e.querySelector(c(s));
                            i.removeEventListener("click", a.handleClick), i.removeEventListener("keydown", a.handleKeydown), i.removeEventListener("focus", a.handleFocus), n.removeEventListener("webkitTransitionEnd", a.handleTransitionEnd), n.removeEventListener("transitionend", a.handleTransitionEnd)
                        })), o = !1
                    }
                }, this.toggle = function (e) {
                    var t = a.elements[e];
                    t && a.toggleElement(t)
                }, this.open = function (e) {
                    var t = a.elements[e];
                    t && a.showElement(t)
                }, this.openAll = function () {
                    var e = a.options, t = e.activeClass, s = e.onOpen;
                    a.elements.forEach((function (e) {
                        e.classList.contains(t) || (a.showElement(e, !1), s(e))
                    }))
                }, this.close = function (e) {
                    var t = a.elements[e];
                    t && a.closeElement(t)
                }, this.closeAll = function () {
                    var e = a.options, t = e.activeClass, s = e.onClose;
                    a.elements.forEach((function (e) {
                        e.classList.contains(t) && (a.closeElement(e, !1), s(e))
                    }))
                }, this.destroy = function () {
                    n.detachEvents(), n.openAll(), a.elements.forEach((function (e) {
                        a.removeIDs(e), a.removeARIA(e), a.setTransition(e, !0)
                    })), o = !0
                }, this.update = function () {
                    a.createDefinitions(), n.detachEvents(), n.attachEvents()
                };
                var l = function (e) {
                    return "string" == typeof document.documentElement.style[e] ? e : (e = d(e), e = "webkit".concat(e))
                }, d = function (e) {
                    return e.charAt(0).toUpperCase() + e.slice(1)
                }, c = function (e) {
                    return ".".concat(CSS.escape(e))
                };
                a.init()
            }, void 0 !== e.exports ? e.exports = i : t.Accordion = i
        }, 704: () => {
            document.addEventListener("DOMContentLoaded", (function () {
                document.querySelector("#map") && ymaps.ready((function () {
                    new ymaps.Map("map", {
                        center: [55.76, 37.64],
                        zoom: 7,
                        controls: []
                    }).behaviors.disable("scrollZoom")
                }))
            }))
        }, 387: () => {
            try {
                var e = new window.CustomEvent("test");
                if (e.preventDefault(), !0 !== e.defaultPrevented) throw new Error("Could not prevent default")
            } catch (e) {
                var t = function (e, t) {
                    var s, i;
                    return t = t || {
                        bubbles: !1,
                        cancelable: !1,
                        detail: void 0
                    }, (s = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i = s.preventDefault, s.preventDefault = function () {
                        i.call(this);
                        try {
                            Object.defineProperty(this, "defaultPrevented", {
                                get: function () {
                                    return !0
                                }
                            })
                        } catch (e) {
                            this.defaultPrevented = !0
                        }
                    }, s
                };
                t.prototype = window.Event.prototype, window.CustomEvent = t
            }
        }, 484: (e, t, s) => {
            "use strict";
            var i = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i])
                }
                return e
            };
            t.c = function (e, t) {
                var s = [], o = [];
                return function () {
                    if (e && e instanceof HTMLElement && "SELECT" === e.tagName.toUpperCase()) s.push(e); else if (e && "string" == typeof e) for (var a = document.querySelectorAll(e), l = 0, d = a.length; l < d; ++l) a[l] instanceof HTMLElement && "SELECT" === a[l].tagName.toUpperCase() && s.push(a[l]); else if (e && e.length) for (var c = 0, u = e.length; c < u; ++c) e[c] instanceof HTMLElement && "SELECT" === e[c].tagName.toUpperCase() && s.push(e[c]);
                    for (var p = 0, h = s.length; p < h; ++p) o.push(r(s[p], i({}, n, t)));
                    return o
                }()
            }, s(387);
            var n = {
                containerClass: "custom-select-container",
                openerClass: "custom-select-opener",
                panelClass: "custom-select-panel",
                optionClass: "custom-select-option",
                optgroupClass: "custom-select-optgroup",
                isSelectedClass: "is-selected",
                hasFocusClass: "has-focus",
                isDisabledClass: "is-disabled",
                isOpenClass: "is-open"
            };

            function r(e, t) {
                var s = "customSelect", i = !1, n = "", r = e, o = void 0, a = void 0, l = void 0, d = void 0,
                    c = void 0, u = void 0, p = void 0, h = "";

                function f(e) {
                    l && l.classList.remove(t.hasFocusClass), void 0 !== e ? ((l = e).classList.add(t.hasFocusClass), i && (e.offsetTop < e.offsetParent.scrollTop || e.offsetTop > e.offsetParent.scrollTop + e.offsetParent.clientHeight - e.clientHeight) && e.dispatchEvent(new CustomEvent("custom-select:focus-outside-panel", {bubbles: !0}))) : l = void 0
                }

                function m(e) {
                    d && (d.classList.remove(t.isSelectedClass), d.removeAttribute("id"), a.removeAttribute("aria-activedescendant")), void 0 !== e ? (e.classList.add(t.isSelectedClass), e.setAttribute("id", s + "-" + n + "-selectedOption"), a.setAttribute("aria-activedescendant", s + "-" + n + "-selectedOption"), d = e, a.children[0].textContent = d.customSelectOriginalOption.text) : (d = void 0, a.children[0].textContent = ""), f(e)
                }

                function v(e) {
                    var t = [].indexOf.call(r.options, l.customSelectOriginalOption);
                    r.options[t + e] && f(r.options[t + e].customSelectCstOption)
                }

                function g(e) {
                    if (e || void 0 === e) {
                        var n = document.querySelector("." + s + "." + t.isOpenClass);
                        n && (n.customSelect.open = !1), o.classList.add(t.isOpenClass), o.classList.add(t.isOpenClass), a.setAttribute("aria-expanded", "true"), d && (c.scrollTop = d.offsetTop), o.dispatchEvent(new CustomEvent("custom-select:open")), i = !0
                    } else o.classList.remove(t.isOpenClass), a.setAttribute("aria-expanded", "false"), i = !1, f(d), o.dispatchEvent(new CustomEvent("custom-select:close"));
                    return i
                }

                function w(e) {
                    e.target === a || a.contains(e.target) ? i ? g(!1) : g() : e.target.classList && e.target.classList.contains(t.optionClass) && c.contains(e.target) ? (m(e.target), d.customSelectOriginalOption.selected = !0, g(!1), r.dispatchEvent(new CustomEvent("change"))) : e.target === r ? a !== document.activeElement && r !== document.activeElement && a.focus() : i && !o.contains(e.target) && g(!1)
                }

                function S(e) {
                    e.target.classList && e.target.classList.contains(t.optionClass) && f(e.target)
                }

                function b(e) {
                    if (i) switch (e.keyCode) {
                        case 13:
                        case 32:
                            m(l), d.customSelectOriginalOption.selected = !0, r.dispatchEvent(new CustomEvent("change")), g(!1);
                            break;
                        case 27:
                            g(!1);
                            break;
                        case 38:
                            v(-1);
                            break;
                        case 40:
                            v(1);
                            break;
                        default:
                            if (e.keyCode >= 48 && e.keyCode <= 90) {
                                p && clearTimeout(p), p = setTimeout((function () {
                                    h = ""
                                }), 1500), h += String.fromCharCode(e.keyCode);
                                for (var t = 0, s = r.options.length; t < s; t++) if (r.options[t].text.toUpperCase().substr(0, h.length) === h) {
                                    f(r.options[t].customSelectCstOption);
                                    break
                                }
                            }
                    } else 40 !== e.keyCode && 38 !== e.keyCode && 32 !== e.keyCode || g()
                }

                function y() {
                    var e = r.selectedIndex;
                    m(-1 === e ? void 0 : r.options[e].customSelectCstOption)
                }

                function T(e) {
                    var t = e.currentTarget, s = e.target;
                    s.offsetTop < t.scrollTop ? t.scrollTop = s.offsetTop : t.scrollTop = s.offsetTop + s.clientHeight - t.clientHeight
                }

                function E() {
                    document.addEventListener("click", w), c.addEventListener("mouseover", S), c.addEventListener("custom-select:focus-outside-panel", T), r.addEventListener("change", y), o.addEventListener("keydown", b)
                }

                function x() {
                    document.removeEventListener("click", w), c.removeEventListener("mouseover", S), c.removeEventListener("custom-select:focus-outside-panel", T), r.removeEventListener("change", y), o.removeEventListener("keydown", b)
                }

                function C(e) {
                    var s = e, i = [];
                    if (void 0 === s.length) throw new TypeError("Invalid Argument");
                    for (var n = 0, r = s.length; n < r; n++) if (s[n] instanceof HTMLElement && "OPTGROUP" === s[n].tagName.toUpperCase()) {
                        var o = document.createElement("div");
                        o.classList.add(t.optgroupClass), o.setAttribute("data-label", s[n].label), o.customSelectOriginalOptgroup = s[n], s[n].customSelectCstOptgroup = o;
                        for (var a = C(s[n].children), l = 0, d = a.length; l < d; l++) o.appendChild(a[l]);
                        i.push(o)
                    } else {
                        if (!(s[n] instanceof HTMLElement && "OPTION" === s[n].tagName.toUpperCase())) throw new TypeError("Invalid Argument");
                        var c = document.createElement("div");
                        c.classList.add(t.optionClass), c.textContent = s[n].text, c.setAttribute("data-value", s[n].value), c.setAttribute("role", "option"), c.customSelectOriginalOption = s[n], s[n].customSelectCstOption = c, s[n].selected && m(c), i.push(c)
                    }
                    return i
                }

                function P(e, t, s) {
                    var i = void 0;
                    if (void 0 === s || s === r) i = c; else {
                        if (!(s instanceof HTMLElement && "OPTGROUP" === s.tagName.toUpperCase() && r.contains(s))) throw new TypeError("Invalid Argument");
                        i = s.customSelectCstOptgroup
                    }
                    var n = e instanceof HTMLElement ? [e] : e;
                    if (t) for (var o = 0, a = n.length; o < a; o++) i === c ? r.appendChild(n[o]) : i.customSelectOriginalOptgroup.appendChild(n[o]);
                    for (var l = C(n), d = 0, u = l.length; d < u; d++) i.appendChild(l[d]);
                    return n
                }

                (o = document.createElement("div")).classList.add(t.containerClass, s), (a = document.createElement("span")).className = t.openerClass, a.setAttribute("role", "combobox"), a.setAttribute("aria-autocomplete", "list"), a.setAttribute("aria-expanded", "false"), a.innerHTML = "<span>\n   " + (-1 !== r.selectedIndex ? r.options[r.selectedIndex].text : "") + "\n   </span>", c = document.createElement("div");
                for (var M = 0; M < 5; M++) n += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
                return c.id = s + "-" + n + "-panel", c.className = t.panelClass, c.setAttribute("role", "listbox"), a.setAttribute("aria-owns", c.id), P(r.children, !1), o.appendChild(a), r.parentNode.replaceChild(o, r), o.appendChild(r), o.appendChild(c), document.querySelector('label[for="' + r.id + '"]') ? u = document.querySelector('label[for="' + r.id + '"]') : "LABEL" === o.parentNode.tagName.toUpperCase() && (u = o.parentNode), void 0 !== u && (u.setAttribute("id", s + "-" + n + "-label"), a.setAttribute("aria-labelledby", s + "-" + n + "-label")), r.disabled ? o.classList.add(t.isDisabledClass) : (a.setAttribute("tabindex", "0"), r.setAttribute("tabindex", "-1"), E()), o.customSelect = {
                    get pluginOptions() {
                        return t
                    }, get open() {
                        return i
                    }, set open(e) {
                        g(e)
                    }, get disabled() {
                        return r.disabled
                    }, set disabled(e) {
                        !function (e) {
                            e && !r.disabled ? (o.classList.add(t.isDisabledClass), r.disabled = !0, a.removeAttribute("tabindex"), o.dispatchEvent(new CustomEvent("custom-select:disabled")), x()) : !e && r.disabled && (o.classList.remove(t.isDisabledClass), r.disabled = !1, a.setAttribute("tabindex", "0"), o.dispatchEvent(new CustomEvent("custom-select:enabled")), E())
                        }(e)
                    }, get value() {
                        return r.value
                    }, set value(e) {
                        var t, s;
                        t = e, (s = r.querySelector("option[value='" + t + "']")) || (s = function (e, t) {
                            if (Array.isArray(e)) return e;
                            if (Symbol.iterator in Object(e)) return function (e, t) {
                                var s = [], i = !0, n = !1, r = void 0;
                                try {
                                    for (var o, a = e[Symbol.iterator](); !(i = (o = a.next()).done) && (s.push(o.value), !t || s.length !== t); i = !0) ;
                                } catch (e) {
                                    n = !0, r = e
                                } finally {
                                    try {
                                        !i && a.return && a.return()
                                    } finally {
                                        if (n) throw r
                                    }
                                }
                                return s
                            }(e, t);
                            throw new TypeError("Invalid attempt to destructure non-iterable instance")
                        }(r.options, 1)[0]), s.selected = !0, m(r.options[r.selectedIndex].customSelectCstOption)
                    }, append: function (e, t) {
                        return P(e, !0, t)
                    }, insertBefore: function (e, t) {
                        return function (e, t) {
                            var s = void 0;
                            if (t instanceof HTMLElement && "OPTION" === t.tagName.toUpperCase() && r.contains(t)) s = t.customSelectCstOption; else {
                                if (!(t instanceof HTMLElement && "OPTGROUP" === t.tagName.toUpperCase() && r.contains(t))) throw new TypeError("Invalid Argument");
                                s = t.customSelectCstOptgroup
                            }
                            var i = C(e.length ? e : [e]);
                            return s.parentNode.insertBefore(i[0], s), t.parentNode.insertBefore(e.length ? e[0] : e, t)
                        }(e, t)
                    }, remove: function (e) {
                        var t = void 0;
                        if (e instanceof HTMLElement && "OPTION" === e.tagName.toUpperCase() && r.contains(e)) t = e.customSelectCstOption; else {
                            if (!(e instanceof HTMLElement && "OPTGROUP" === e.tagName.toUpperCase() && r.contains(e))) throw new TypeError("Invalid Argument");
                            t = e.customSelectCstOptgroup
                        }
                        t.parentNode.removeChild(t);
                        var s = e.parentNode.removeChild(e);
                        return y(), s
                    }, empty: function () {
                        for (var e = []; r.children.length;) c.removeChild(c.children[0]), e.push(r.removeChild(r.children[0]));
                        return m(), e
                    }, destroy: function () {
                        for (var e = 0, t = r.options.length; e < t; e++) delete r.options[e].customSelectCstOption;
                        for (var s = r.getElementsByTagName("optgroup"), i = 0, n = s.length; i < n; i++) delete s.customSelectCstOptgroup;
                        return x(), o.parentNode.replaceChild(r, o)
                    }, opener: a, select: r, panel: c, container: o
                }, r.customSelect = o.customSelect, o.customSelect
            }
        }
    }, t = {};

    function s(i) {
        var n = t[i];
        if (void 0 !== n) return n.exports;
        var r = t[i] = {exports: {}};
        return e[i](r, r.exports, s), r.exports
    }

    s.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return s.d(t, {a: t}), t
    }, s.d = (e, t) => {
        for (var i in t) s.o(t, i) && !s.o(e, i) && Object.defineProperty(e, i, {enumerable: !0, get: t[i]})
    }, s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        "use strict";

        function e(e) {
            return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
        }

        function t(s, i) {
            void 0 === s && (s = {}), void 0 === i && (i = {}), Object.keys(i).forEach((n => {
                void 0 === s[n] ? s[n] = i[n] : e(i[n]) && e(s[n]) && Object.keys(i[n]).length > 0 && t(s[n], i[n])
            }))
        }

        const i = {
            body: {},
            addEventListener() {
            },
            removeEventListener() {
            },
            activeElement: {
                blur() {
                }, nodeName: ""
            },
            querySelector: () => null,
            querySelectorAll: () => [],
            getElementById: () => null,
            createEvent: () => ({
                initEvent() {
                }
            }),
            createElement: () => ({
                children: [], childNodes: [], style: {}, setAttribute() {
                }, getElementsByTagName: () => []
            }),
            createElementNS: () => ({}),
            importNode: () => null,
            location: {hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: ""}
        };

        function n() {
            const e = "undefined" != typeof document ? document : {};
            return t(e, i), e
        }

        const r = {
            document: i,
            navigator: {userAgent: ""},
            location: {hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: ""},
            history: {
                replaceState() {
                }, pushState() {
                }, go() {
                }, back() {
                }
            },
            CustomEvent: function () {
                return this
            },
            addEventListener() {
            },
            removeEventListener() {
            },
            getComputedStyle: () => ({getPropertyValue: () => ""}),
            Image() {
            },
            Date() {
            },
            screen: {},
            setTimeout() {
            },
            clearTimeout() {
            },
            matchMedia: () => ({}),
            requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
            cancelAnimationFrame(e) {
                "undefined" != typeof setTimeout && clearTimeout(e)
            }
        };

        function o() {
            const e = "undefined" != typeof window ? window : {};
            return t(e, r), e
        }

        function a(e, t) {
            return void 0 === t && (t = 0), setTimeout(e, t)
        }

        function l() {
            return Date.now()
        }

        function d(e) {
            return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
        }

        function c() {
            const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
                t = ["__proto__", "constructor", "prototype"];
            for (let i = 1; i < arguments.length; i += 1) {
                const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                if (null != n && (s = n, !("undefined" != typeof window && void 0 !== window.HTMLElement ? s instanceof HTMLElement : s && (1 === s.nodeType || 11 === s.nodeType)))) {
                    const s = Object.keys(Object(n)).filter((e => t.indexOf(e) < 0));
                    for (let t = 0, i = s.length; t < i; t += 1) {
                        const i = s[t], r = Object.getOwnPropertyDescriptor(n, i);
                        void 0 !== r && r.enumerable && (d(e[i]) && d(n[i]) ? n[i].__swiper__ ? e[i] = n[i] : c(e[i], n[i]) : !d(e[i]) && d(n[i]) ? (e[i] = {}, n[i].__swiper__ ? e[i] = n[i] : c(e[i], n[i])) : e[i] = n[i])
                    }
                }
            }
            var s;
            return e
        }

        function u(e, t, s) {
            e.style.setProperty(t, s)
        }

        function p(e) {
            let {swiper: t, targetPosition: s, side: i} = e;
            const n = o(), r = -t.translate;
            let a, l = null;
            const d = t.params.speed;
            t.wrapperEl.style.scrollSnapType = "none", n.cancelAnimationFrame(t.cssModeFrameID);
            const c = s > r ? "next" : "prev", u = (e, t) => "next" === c && e >= t || "prev" === c && e <= t,
                p = () => {
                    a = (new Date).getTime(), null === l && (l = a);
                    const e = Math.max(Math.min((a - l) / d, 1), 0), o = .5 - Math.cos(e * Math.PI) / 2;
                    let c = r + o * (s - r);
                    if (u(c, s) && (c = s), t.wrapperEl.scrollTo({[i]: c}), u(c, s)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout((() => {
                        t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({[i]: c})
                    })), void n.cancelAnimationFrame(t.cssModeFrameID);
                    t.cssModeFrameID = n.requestAnimationFrame(p)
                };
            p()
        }

        function h(e, t) {
            return void 0 === t && (t = ""), [...e.children].filter((e => e.matches(t)))
        }

        function f(e) {
            try {
                return void console.warn(e)
            } catch (e) {
            }
        }

        function m(e, t) {
            void 0 === t && (t = []);
            const s = document.createElement(e);
            return s.classList.add(...Array.isArray(t) ? t : function (e) {
                return void 0 === e && (e = ""), e.trim().split(" ").filter((e => !!e.trim()))
            }(t)), s
        }

        function v(e, t) {
            return o().getComputedStyle(e, null).getPropertyValue(t)
        }

        function g(e) {
            let t, s = e;
            if (s) {
                for (t = 0; null !== (s = s.previousSibling);) 1 === s.nodeType && (t += 1);
                return t
            }
        }

        function w(e, t, s) {
            const i = o();
            return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
        }

        let S, b, y;

        function T() {
            return S || (S = function () {
                const e = o(), t = n();
                return {
                    smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
                    touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
                }
            }()), S
        }

        function E(e) {
            return void 0 === e && (e = {}), b || (b = function (e) {
                let {userAgent: t} = void 0 === e ? {} : e;
                const s = T(), i = o(), n = i.navigator.platform, r = t || i.navigator.userAgent,
                    a = {ios: !1, android: !1}, l = i.screen.width, d = i.screen.height,
                    c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
                let u = r.match(/(iPad).*OS\s([\d_]+)/);
                const p = r.match(/(iPod)(.*OS\s([\d_]+))?/), h = !u && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                    f = "Win32" === n;
                let m = "MacIntel" === n;
                return !u && m && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${d}`) >= 0 && (u = r.match(/(Version)\/([\d.]+)/), u || (u = [0, 1, "13_0_0"]), m = !1), c && !f && (a.os = "android", a.android = !0), (u || h || p) && (a.os = "ios", a.ios = !0), a
            }(e)), b
        }

        var x = {
            on(e, t, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ("function" != typeof t) return i;
                const n = s ? "unshift" : "push";
                return e.split(" ").forEach((e => {
                    i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][n](t)
                })), i
            }, once(e, t, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ("function" != typeof t) return i;

                function n() {
                    i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
                    for (var s = arguments.length, r = new Array(s), o = 0; o < s; o++) r[o] = arguments[o];
                    t.apply(i, r)
                }

                return n.__emitterProxy = t, i.on(e, n, s)
            }, onAny(e, t) {
                const s = this;
                if (!s.eventsListeners || s.destroyed) return s;
                if ("function" != typeof e) return s;
                const i = t ? "unshift" : "push";
                return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
            }, offAny(e) {
                const t = this;
                if (!t.eventsListeners || t.destroyed) return t;
                if (!t.eventsAnyListeners) return t;
                const s = t.eventsAnyListeners.indexOf(e);
                return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
            }, off(e, t) {
                const s = this;
                return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e => {
                    void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((i, n) => {
                        (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(n, 1)
                    }))
                })), s) : s
            }, emit() {
                const e = this;
                if (!e.eventsListeners || e.destroyed) return e;
                if (!e.eventsListeners) return e;
                let t, s, i;
                for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                return "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0], s = r.slice(1, r.length), i = e) : (t = r[0].events, s = r[0].data, i = r[0].context || e), s.unshift(i), (Array.isArray(t) ? t : t.split(" ")).forEach((t => {
                    e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => {
                        e.apply(i, [t, ...s])
                    })), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => {
                        e.apply(i, s)
                    }))
                })), e
            }
        };
        const C = (e, t) => {
            if (!e || e.destroyed || !e.params) return;
            const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
            if (s) {
                let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
                !t && e.isElement && (s.shadowRoot ? t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((() => {
                    s.shadowRoot && (t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), t && t.remove())
                }))), t && t.remove()
            }
        }, P = (e, t) => {
            if (!e.slides[t]) return;
            const s = e.slides[t].querySelector('[loading="lazy"]');
            s && s.removeAttribute("loading")
        }, M = e => {
            if (!e || e.destroyed || !e.params) return;
            let t = e.params.lazyPreloadPrevNext;
            const s = e.slides.length;
            if (!s || !t || t < 0) return;
            t = Math.min(t, s);
            const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView),
                n = e.activeIndex;
            if (e.params.grid && e.params.grid.rows > 1) {
                const s = n, r = [s - t];
                return r.push(...Array.from({length: t}).map(((e, t) => s + i + t))), void e.slides.forEach(((t, s) => {
                    r.includes(t.column) && P(e, s)
                }))
            }
            const r = n + i - 1;
            if (e.params.rewind || e.params.loop) for (let i = n - t; i <= r + t; i += 1) {
                const t = (i % s + s) % s;
                (t < n || t > r) && P(e, t)
            } else for (let i = Math.max(n - t, 0); i <= Math.min(r + t, s - 1); i += 1) i !== n && (i > r || i < n) && P(e, i)
        };
        var L = {
            updateSize: function () {
                const e = this;
                let t, s;
                const i = e.el;
                t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(v(i, "padding-left") || 0, 10) - parseInt(v(i, "padding-right") || 0, 10), s = s - parseInt(v(i, "padding-top") || 0, 10) - parseInt(v(i, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
                    width: t,
                    height: s,
                    size: e.isHorizontal() ? t : s
                }))
            }, updateSlides: function () {
                const e = this;

                function t(t, s) {
                    return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0)
                }

                const s = e.params, {wrapperEl: i, slidesEl: n, size: r, rtlTranslate: o, wrongRTL: a} = e,
                    l = e.virtual && s.virtual.enabled, d = l ? e.virtual.slides.length : e.slides.length,
                    c = h(n, `.${e.params.slideClass}, swiper-slide`), p = l ? e.virtual.slides.length : c.length;
                let f = [];
                const m = [], g = [];
                let S = s.slidesOffsetBefore;
                "function" == typeof S && (S = s.slidesOffsetBefore.call(e));
                let b = s.slidesOffsetAfter;
                "function" == typeof b && (b = s.slidesOffsetAfter.call(e));
                const y = e.snapGrid.length, T = e.slidesGrid.length;
                let E = s.spaceBetween, x = -S, C = 0, P = 0;
                if (void 0 === r) return;
                "string" == typeof E && E.indexOf("%") >= 0 ? E = parseFloat(E.replace("%", "")) / 100 * r : "string" == typeof E && (E = parseFloat(E)), e.virtualSize = -E, c.forEach((e => {
                    o ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = ""
                })), s.centeredSlides && s.cssMode && (u(i, "--swiper-centered-offset-before", ""), u(i, "--swiper-centered-offset-after", ""));
                const M = s.grid && s.grid.rows > 1 && e.grid;
                let L;
                M ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
                const A = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter((e => void 0 !== s.breakpoints[e].slidesPerView)).length > 0;
                for (let i = 0; i < p; i += 1) {
                    let n;
                    if (L = 0, c[i] && (n = c[i]), M && e.grid.updateSlide(i, n, c), !c[i] || "none" !== v(n, "display")) {
                        if ("auto" === s.slidesPerView) {
                            A && (c[i].style[e.getDirectionLabel("width")] = "");
                            const r = getComputedStyle(n), o = n.style.transform, a = n.style.webkitTransform;
                            if (o && (n.style.transform = "none"), a && (n.style.webkitTransform = "none"), s.roundLengths) L = e.isHorizontal() ? w(n, "width", !0) : w(n, "height", !0); else {
                                const e = t(r, "width"), s = t(r, "padding-left"), i = t(r, "padding-right"),
                                    o = t(r, "margin-left"), a = t(r, "margin-right"),
                                    l = r.getPropertyValue("box-sizing");
                                if (l && "border-box" === l) L = e + o + a; else {
                                    const {clientWidth: t, offsetWidth: r} = n;
                                    L = e + s + i + o + a + (r - t)
                                }
                            }
                            o && (n.style.transform = o), a && (n.style.webkitTransform = a), s.roundLengths && (L = Math.floor(L))
                        } else L = (r - (s.slidesPerView - 1) * E) / s.slidesPerView, s.roundLengths && (L = Math.floor(L)), c[i] && (c[i].style[e.getDirectionLabel("width")] = `${L}px`);
                        c[i] && (c[i].swiperSlideSize = L), g.push(L), s.centeredSlides ? (x = x + L / 2 + C / 2 + E, 0 === C && 0 !== i && (x = x - r / 2 - E), 0 === i && (x = x - r / 2 - E), Math.abs(x) < .001 && (x = 0), s.roundLengths && (x = Math.floor(x)), P % s.slidesPerGroup == 0 && f.push(x), m.push(x)) : (s.roundLengths && (x = Math.floor(x)), (P - Math.min(e.params.slidesPerGroupSkip, P)) % e.params.slidesPerGroup == 0 && f.push(x), m.push(x), x = x + L + E), e.virtualSize += L + E, C = L, P += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, r) + b, o && a && ("slide" === s.effect || "coverflow" === s.effect) && (i.style.width = `${e.virtualSize + E}px`), s.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + E}px`), M && e.grid.updateWrapperSize(L, f), !s.centeredSlides) {
                    const t = [];
                    for (let i = 0; i < f.length; i += 1) {
                        let n = f[i];
                        s.roundLengths && (n = Math.floor(n)), f[i] <= e.virtualSize - r && t.push(n)
                    }
                    f = t, Math.floor(e.virtualSize - r) - Math.floor(f[f.length - 1]) > 1 && f.push(e.virtualSize - r)
                }
                if (l && s.loop) {
                    const t = g[0] + E;
                    if (s.slidesPerGroup > 1) {
                        const i = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup),
                            n = t * s.slidesPerGroup;
                        for (let e = 0; e < i; e += 1) f.push(f[f.length - 1] + n)
                    }
                    for (let i = 0; i < e.virtual.slidesBefore + e.virtual.slidesAfter; i += 1) 1 === s.slidesPerGroup && f.push(f[f.length - 1] + t), m.push(m[m.length - 1] + t), e.virtualSize += t
                }
                if (0 === f.length && (f = [0]), 0 !== E) {
                    const t = e.isHorizontal() && o ? "marginLeft" : e.getDirectionLabel("marginRight");
                    c.filter(((e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1)).forEach((e => {
                        e.style[t] = `${E}px`
                    }))
                }
                if (s.centeredSlides && s.centeredSlidesBounds) {
                    let e = 0;
                    g.forEach((t => {
                        e += t + (E || 0)
                    })), e -= E;
                    const t = e - r;
                    f = f.map((e => e <= 0 ? -S : e > t ? t + b : e))
                }
                if (s.centerInsufficientSlides) {
                    let e = 0;
                    if (g.forEach((t => {
                        e += t + (E || 0)
                    })), e -= E, e < r) {
                        const t = (r - e) / 2;
                        f.forEach(((e, s) => {
                            f[s] = e - t
                        })), m.forEach(((e, s) => {
                            m[s] = e + t
                        }))
                    }
                }
                if (Object.assign(e, {
                    slides: c,
                    snapGrid: f,
                    slidesGrid: m,
                    slidesSizesGrid: g
                }), s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
                    u(i, "--swiper-centered-offset-before", -f[0] + "px"), u(i, "--swiper-centered-offset-after", e.size / 2 - g[g.length - 1] / 2 + "px");
                    const t = -e.snapGrid[0], s = -e.slidesGrid[0];
                    e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + s))
                }
                if (p !== d && e.emit("slidesLengthChange"), f.length !== y && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), m.length !== T && e.emit("slidesGridLengthChange"), s.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !(l || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
                    const t = `${s.containerModifierClass}backface-hidden`, i = e.el.classList.contains(t);
                    p <= s.maxBackfaceHiddenSlides ? i || e.el.classList.add(t) : i && e.el.classList.remove(t)
                }
            }, updateAutoHeight: function (e) {
                const t = this, s = [], i = t.virtual && t.params.virtual.enabled;
                let n, r = 0;
                "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                const o = e => i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
                if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) if (t.params.centeredSlides) (t.visibleSlides || []).forEach((e => {
                    s.push(e)
                })); else for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                    const e = t.activeIndex + n;
                    if (e > t.slides.length && !i) break;
                    s.push(o(e))
                } else s.push(o(t.activeIndex));
                for (n = 0; n < s.length; n += 1) if (void 0 !== s[n]) {
                    const e = s[n].offsetHeight;
                    r = e > r ? e : r
                }
                (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`)
            }, updateSlidesOffset: function () {
                const e = this, t = e.slides,
                    s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
                for (let i = 0; i < t.length; i += 1) t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment()
            }, updateSlidesProgress: function (e) {
                void 0 === e && (e = this && this.translate || 0);
                const t = this, s = t.params, {slides: i, rtlTranslate: n, snapGrid: r} = t;
                if (0 === i.length) return;
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                let o = -e;
                n && (o = e), i.forEach((e => {
                    e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass)
                })), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                let a = s.spaceBetween;
                "string" == typeof a && a.indexOf("%") >= 0 ? a = parseFloat(a.replace("%", "")) / 100 * t.size : "string" == typeof a && (a = parseFloat(a));
                for (let e = 0; e < i.length; e += 1) {
                    const l = i[e];
                    let d = l.swiperSlideOffset;
                    s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
                    const c = (o + (s.centeredSlides ? t.minTranslate() : 0) - d) / (l.swiperSlideSize + a),
                        u = (o - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (l.swiperSlideSize + a),
                        p = -(o - d), h = p + t.slidesSizesGrid[e], f = p >= 0 && p <= t.size - t.slidesSizesGrid[e];
                    (p >= 0 && p < t.size - 1 || h > 1 && h <= t.size || p <= 0 && h >= t.size) && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(e), i[e].classList.add(s.slideVisibleClass)), f && i[e].classList.add(s.slideFullyVisibleClass), l.progress = n ? -c : c, l.originalProgress = n ? -u : u
                }
            }, updateProgress: function (e) {
                const t = this;
                if (void 0 === e) {
                    const s = t.rtlTranslate ? -1 : 1;
                    e = t && t.translate && t.translate * s || 0
                }
                const s = t.params, i = t.maxTranslate() - t.minTranslate();
                let {progress: n, isBeginning: r, isEnd: o, progressLoop: a} = t;
                const l = r, d = o;
                if (0 === i) n = 0, r = !0, o = !0; else {
                    n = (e - t.minTranslate()) / i;
                    const s = Math.abs(e - t.minTranslate()) < 1, a = Math.abs(e - t.maxTranslate()) < 1;
                    r = s || n <= 0, o = a || n >= 1, s && (n = 0), a && (n = 1)
                }
                if (s.loop) {
                    const s = t.getSlideIndexByData(0), i = t.getSlideIndexByData(t.slides.length - 1),
                        n = t.slidesGrid[s], r = t.slidesGrid[i], o = t.slidesGrid[t.slidesGrid.length - 1],
                        l = Math.abs(e);
                    a = l >= n ? (l - n) / o : (l + o - r) / o, a > 1 && (a -= 1)
                }
                Object.assign(t, {
                    progress: n,
                    progressLoop: a,
                    isBeginning: r,
                    isEnd: o
                }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !l && t.emit("reachBeginning toEdge"), o && !d && t.emit("reachEnd toEdge"), (l && !r || d && !o) && t.emit("fromEdge"), t.emit("progress", n)
            }, updateSlidesClasses: function () {
                const e = this, {slides: t, params: s, slidesEl: i, activeIndex: n} = e,
                    r = e.virtual && s.virtual.enabled, o = e.grid && s.grid && s.grid.rows > 1,
                    a = e => h(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
                let l, d, c;
                if (t.forEach((e => {
                    e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
                })), r) if (s.loop) {
                    let t = n - e.virtual.slidesBefore;
                    t < 0 && (t = e.virtual.slides.length + t), t >= e.virtual.slides.length && (t -= e.virtual.slides.length), l = a(`[data-swiper-slide-index="${t}"]`)
                } else l = a(`[data-swiper-slide-index="${n}"]`); else o ? (l = t.filter((e => e.column === n))[0], c = t.filter((e => e.column === n + 1))[0], d = t.filter((e => e.column === n - 1))[0]) : l = t[n];
                l && (l.classList.add(s.slideActiveClass), o ? (c && c.classList.add(s.slideNextClass), d && d.classList.add(s.slidePrevClass)) : (c = function (e, t) {
                    const s = [];
                    for (; e.nextElementSibling;) {
                        const i = e.nextElementSibling;
                        t ? i.matches(t) && s.push(i) : s.push(i), e = i
                    }
                    return s
                }(l, `.${s.slideClass}, swiper-slide`)[0], s.loop && !c && (c = t[0]), c && c.classList.add(s.slideNextClass), d = function (e, t) {
                    const s = [];
                    for (; e.previousElementSibling;) {
                        const i = e.previousElementSibling;
                        t ? i.matches(t) && s.push(i) : s.push(i), e = i
                    }
                    return s
                }(l, `.${s.slideClass}, swiper-slide`)[0], s.loop && 0 === !d && (d = t[t.length - 1]), d && d.classList.add(s.slidePrevClass))), e.emitSlidesClasses()
            }, updateActiveIndex: function (e) {
                const t = this, s = t.rtlTranslate ? t.translate : -t.translate, {
                    snapGrid: i,
                    params: n,
                    activeIndex: r,
                    realIndex: o,
                    snapIndex: a
                } = t;
                let l, d = e;
                const c = e => {
                    let s = e - t.virtual.slidesBefore;
                    return s < 0 && (s = t.virtual.slides.length + s), s >= t.virtual.slides.length && (s -= t.virtual.slides.length), s
                };
                if (void 0 === d && (d = function (e) {
                    const {slidesGrid: t, params: s} = e, i = e.rtlTranslate ? e.translate : -e.translate;
                    let n;
                    for (let e = 0; e < t.length; e += 1) void 0 !== t[e + 1] ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2 ? n = e : i >= t[e] && i < t[e + 1] && (n = e + 1) : i >= t[e] && (n = e);
                    return s.normalizeSlideIndex && (n < 0 || void 0 === n) && (n = 0), n
                }(t)), i.indexOf(s) >= 0) l = i.indexOf(s); else {
                    const e = Math.min(n.slidesPerGroupSkip, d);
                    l = e + Math.floor((d - e) / n.slidesPerGroup)
                }
                if (l >= i.length && (l = i.length - 1), d === r && !t.params.loop) return void (l !== a && (t.snapIndex = l, t.emit("snapIndexChange")));
                if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled) return void (t.realIndex = c(d));
                const u = t.grid && n.grid && n.grid.rows > 1;
                let p;
                if (t.virtual && n.virtual.enabled && n.loop) p = c(d); else if (u) {
                    const e = t.slides.filter((e => e.column === d))[0];
                    let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
                    Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)), p = Math.floor(s / n.grid.rows)
                } else if (t.slides[d]) {
                    const e = t.slides[d].getAttribute("data-swiper-slide-index");
                    p = e ? parseInt(e, 10) : d
                } else p = d;
                Object.assign(t, {
                    previousSnapIndex: a,
                    snapIndex: l,
                    previousRealIndex: o,
                    realIndex: p,
                    previousIndex: r,
                    activeIndex: d
                }), t.initialized && M(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && (o !== p && t.emit("realIndexChange"), t.emit("slideChange"))
            }, updateClickedSlide: function (e, t) {
                const s = this, i = s.params;
                let n = e.closest(`.${i.slideClass}, swiper-slide`);
                !n && s.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e => {
                    !n && e.matches && e.matches(`.${i.slideClass}, swiper-slide`) && (n = e)
                }));
                let r, o = !1;
                if (n) for (let e = 0; e < s.slides.length; e += 1) if (s.slides[e] === n) {
                    o = !0, r = e;
                    break
                }
                if (!n || !o) return s.clickedSlide = void 0, void (s.clickedIndex = void 0);
                s.clickedSlide = n, s.virtual && s.params.virtual.enabled ? s.clickedIndex = parseInt(n.getAttribute("data-swiper-slide-index"), 10) : s.clickedIndex = r, i.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide()
            }
        };

        function A(e) {
            let {swiper: t, runCallbacks: s, direction: i, step: n} = e;
            const {activeIndex: r, previousIndex: o} = t;
            let a = i;
            if (a || (a = r > o ? "next" : r < o ? "prev" : "reset"), t.emit(`transition${n}`), s && r !== o) {
                if ("reset" === a) return void t.emit(`slideResetTransition${n}`);
                t.emit(`slideChangeTransition${n}`), "next" === a ? t.emit(`slideNextTransition${n}`) : t.emit(`slidePrevTransition${n}`)
            }
        }

        var O = {
            slideTo: function (e, t, s, i, n) {
                void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e && (e = parseInt(e, 10));
                const r = this;
                let o = e;
                o < 0 && (o = 0);
                const {
                    params: a,
                    snapGrid: l,
                    slidesGrid: d,
                    previousIndex: c,
                    activeIndex: u,
                    rtlTranslate: h,
                    wrapperEl: f,
                    enabled: m
                } = r;
                if (r.animating && a.preventInteractionOnTransition || !m && !i && !n || r.destroyed) return !1;
                const v = Math.min(r.params.slidesPerGroupSkip, o);
                let g = v + Math.floor((o - v) / r.params.slidesPerGroup);
                g >= l.length && (g = l.length - 1);
                const w = -l[g];
                if (a.normalizeSlideIndex) for (let e = 0; e < d.length; e += 1) {
                    const t = -Math.floor(100 * w), s = Math.floor(100 * d[e]), i = Math.floor(100 * d[e + 1]);
                    void 0 !== d[e + 1] ? t >= s && t < i - (i - s) / 2 ? o = e : t >= s && t < i && (o = e + 1) : t >= s && (o = e)
                }
                if (r.initialized && o !== u) {
                    if (!r.allowSlideNext && (h ? w > r.translate && w > r.minTranslate() : w < r.translate && w < r.minTranslate())) return !1;
                    if (!r.allowSlidePrev && w > r.translate && w > r.maxTranslate() && (u || 0) !== o) return !1
                }
                let S;
                if (o !== (c || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(w), S = o > u ? "next" : o < u ? "prev" : "reset", h && -w === r.translate || !h && w === r.translate) return r.updateActiveIndex(o), a.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== a.effect && r.setTranslate(w), "reset" !== S && (r.transitionStart(s, S), r.transitionEnd(s, S)), !1;
                if (a.cssMode) {
                    const e = r.isHorizontal(), s = h ? w : -w;
                    if (0 === t) {
                        const t = r.virtual && r.params.virtual.enabled;
                        t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0, requestAnimationFrame((() => {
                            f[e ? "scrollLeft" : "scrollTop"] = s
                        }))) : f[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame((() => {
                            r.wrapperEl.style.scrollSnapType = "", r._immediateVirtual = !1
                        }))
                    } else {
                        if (!r.support.smoothScroll) return p({
                            swiper: r,
                            targetPosition: s,
                            side: e ? "left" : "top"
                        }), !0;
                        f.scrollTo({[e ? "left" : "top"]: s, behavior: "smooth"})
                    }
                    return !0
                }
                return r.setTransition(t), r.setTranslate(w), r.updateActiveIndex(o), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, i), r.transitionStart(s, S), 0 === t ? r.transitionEnd(s, S) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
                    r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, S))
                }), r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)), !0
            }, slideToLoop: function (e, t, s, i) {
                void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e && (e = parseInt(e, 10));
                const n = this;
                if (n.destroyed) return;
                const r = n.grid && n.params.grid && n.params.grid.rows > 1;
                let o = e;
                if (n.params.loop) if (n.virtual && n.params.virtual.enabled) o += n.virtual.slidesBefore; else {
                    let e;
                    if (r) {
                        const t = o * n.params.grid.rows;
                        e = n.slides.filter((e => 1 * e.getAttribute("data-swiper-slide-index") === t))[0].column
                    } else e = n.getSlideIndexByData(o);
                    const t = r ? Math.ceil(n.slides.length / n.params.grid.rows) : n.slides.length, {centeredSlides: s} = n.params;
                    let i = n.params.slidesPerView;
                    "auto" === i ? i = n.slidesPerViewDynamic() : (i = Math.ceil(parseFloat(n.params.slidesPerView, 10)), s && i % 2 == 0 && (i += 1));
                    let a = t - e < i;
                    if (s && (a = a || e < Math.ceil(i / 2)), a) {
                        const i = s ? e < n.activeIndex ? "prev" : "next" : e - n.activeIndex - 1 < n.params.slidesPerView ? "next" : "prev";
                        n.loopFix({
                            direction: i,
                            slideTo: !0,
                            activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                            slideRealIndex: "next" === i ? n.realIndex : void 0
                        })
                    }
                    if (r) {
                        const e = o * n.params.grid.rows;
                        o = n.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0].column
                    } else o = n.getSlideIndexByData(o)
                }
                return requestAnimationFrame((() => {
                    n.slideTo(o, t, s, i)
                })), n
            }, slideNext: function (e, t, s) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                const i = this, {enabled: n, params: r, animating: o} = i;
                if (!n || i.destroyed) return i;
                let a = r.slidesPerGroup;
                "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
                const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : a, d = i.virtual && r.virtual.enabled;
                if (r.loop) {
                    if (o && !d && r.loopPreventsSliding) return !1;
                    if (i.loopFix({direction: "next"}), i._clientLeft = i.wrapperEl.clientLeft, i.activeIndex === i.slides.length - 1 && r.cssMode) return requestAnimationFrame((() => {
                        i.slideTo(i.activeIndex + l, e, t, s)
                    })), !0
                }
                return r.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
            }, slidePrev: function (e, t, s) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                const i = this, {params: n, snapGrid: r, slidesGrid: o, rtlTranslate: a, enabled: l, animating: d} = i;
                if (!l || i.destroyed) return i;
                const c = i.virtual && n.virtual.enabled;
                if (n.loop) {
                    if (d && !c && n.loopPreventsSliding) return !1;
                    i.loopFix({direction: "prev"}), i._clientLeft = i.wrapperEl.clientLeft
                }

                function u(e) {
                    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                }

                const p = u(a ? i.translate : -i.translate), h = r.map((e => u(e)));
                let f = r[h.indexOf(p) - 1];
                if (void 0 === f && n.cssMode) {
                    let e;
                    r.forEach(((t, s) => {
                        p >= t && (e = s)
                    })), void 0 !== e && (f = r[e > 0 ? e - 1 : e])
                }
                let m = 0;
                if (void 0 !== f && (m = o.indexOf(f), m < 0 && (m = i.activeIndex - 1), "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (m = m - i.slidesPerViewDynamic("previous", !0) + 1, m = Math.max(m, 0))), n.rewind && i.isBeginning) {
                    const n = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                    return i.slideTo(n, e, t, s)
                }
                return n.loop && 0 === i.activeIndex && n.cssMode ? (requestAnimationFrame((() => {
                    i.slideTo(m, e, t, s)
                })), !0) : i.slideTo(m, e, t, s)
            }, slideReset: function (e, t, s) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                const i = this;
                if (!i.destroyed) return i.slideTo(i.activeIndex, e, t, s)
            }, slideToClosest: function (e, t, s, i) {
                void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = .5);
                const n = this;
                if (n.destroyed) return;
                let r = n.activeIndex;
                const o = Math.min(n.params.slidesPerGroupSkip, r),
                    a = o + Math.floor((r - o) / n.params.slidesPerGroup),
                    l = n.rtlTranslate ? n.translate : -n.translate;
                if (l >= n.snapGrid[a]) {
                    const e = n.snapGrid[a];
                    l - e > (n.snapGrid[a + 1] - e) * i && (r += n.params.slidesPerGroup)
                } else {
                    const e = n.snapGrid[a - 1];
                    l - e <= (n.snapGrid[a] - e) * i && (r -= n.params.slidesPerGroup)
                }
                return r = Math.max(r, 0), r = Math.min(r, n.slidesGrid.length - 1), n.slideTo(r, e, t, s)
            }, slideToClickedSlide: function () {
                const e = this;
                if (e.destroyed) return;
                const {params: t, slidesEl: s} = e,
                    i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                let n, r = e.clickedIndex;
                const o = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
                if (t.loop) {
                    if (e.animating) return;
                    n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - i / 2 || r > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(), r = e.getSlideIndex(h(s, `${o}[data-swiper-slide-index="${n}"]`)[0]), a((() => {
                        e.slideTo(r)
                    }))) : e.slideTo(r) : r > e.slides.length - i ? (e.loopFix(), r = e.getSlideIndex(h(s, `${o}[data-swiper-slide-index="${n}"]`)[0]), a((() => {
                        e.slideTo(r)
                    }))) : e.slideTo(r)
                } else e.slideTo(r)
            }
        }, k = {
            loopCreate: function (e) {
                const t = this, {params: s, slidesEl: i} = t;
                if (!s.loop || t.virtual && t.params.virtual.enabled) return;
                const n = () => {
                        h(i, `.${s.slideClass}, swiper-slide`).forEach(((e, t) => {
                            e.setAttribute("data-swiper-slide-index", t)
                        }))
                    }, r = t.grid && s.grid && s.grid.rows > 1, o = s.slidesPerGroup * (r ? s.grid.rows : 1),
                    a = t.slides.length % o != 0, l = r && t.slides.length % s.grid.rows != 0, d = e => {
                        for (let i = 0; i < e; i += 1) {
                            const e = t.isElement ? m("swiper-slide", [s.slideBlankClass]) : m("div", [s.slideClass, s.slideBlankClass]);
                            t.slidesEl.append(e)
                        }
                    };
                a ? (s.loopAddBlankSlides ? (d(o - t.slides.length % o), t.recalcSlides(), t.updateSlides()) : f("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"), n()) : l ? (s.loopAddBlankSlides ? (d(s.grid.rows - t.slides.length % s.grid.rows), t.recalcSlides(), t.updateSlides()) : f("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"), n()) : n(), t.loopFix({
                    slideRealIndex: e,
                    direction: s.centeredSlides ? void 0 : "next"
                })
            }, loopFix: function (e) {
                let {
                    slideRealIndex: t,
                    slideTo: s = !0,
                    direction: i,
                    setTranslate: n,
                    activeSlideIndex: r,
                    byController: o,
                    byMousewheel: a
                } = void 0 === e ? {} : e;
                const l = this;
                if (!l.params.loop) return;
                l.emit("beforeLoopFix");
                const {
                    slides: d,
                    allowSlidePrev: c,
                    allowSlideNext: u,
                    slidesEl: p,
                    params: h
                } = l, {centeredSlides: m} = h;
                if (l.allowSlidePrev = !0, l.allowSlideNext = !0, l.virtual && h.virtual.enabled) return s && (h.centeredSlides || 0 !== l.snapIndex ? h.centeredSlides && l.snapIndex < h.slidesPerView ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0) : l.snapIndex === l.snapGrid.length - 1 && l.slideTo(l.virtual.slidesBefore, 0, !1, !0) : l.slideTo(l.virtual.slides.length, 0, !1, !0)), l.allowSlidePrev = c, l.allowSlideNext = u, void l.emit("loopFix");
                let v = h.slidesPerView;
                "auto" === v ? v = l.slidesPerViewDynamic() : (v = Math.ceil(parseFloat(h.slidesPerView, 10)), m && v % 2 == 0 && (v += 1));
                const g = h.slidesPerGroupAuto ? v : h.slidesPerGroup;
                let w = g;
                w % g != 0 && (w += g - w % g), w += h.loopAdditionalSlides, l.loopedSlides = w;
                const S = l.grid && h.grid && h.grid.rows > 1;
                d.length < v + w ? f("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : S && "row" === h.grid.fill && f("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
                const b = [], y = [];
                let T = l.activeIndex;
                void 0 === r ? r = l.getSlideIndex(d.filter((e => e.classList.contains(h.slideActiveClass)))[0]) : T = r;
                const E = "next" === i || !i, x = "prev" === i || !i;
                let C = 0, P = 0;
                const M = S ? Math.ceil(d.length / h.grid.rows) : d.length,
                    L = (S ? d[r].column : r) + (m && void 0 === n ? -v / 2 + .5 : 0);
                if (L < w) {
                    C = Math.max(w - L, g);
                    for (let e = 0; e < w - L; e += 1) {
                        const t = e - Math.floor(e / M) * M;
                        if (S) {
                            const e = M - t - 1;
                            for (let t = d.length - 1; t >= 0; t -= 1) d[t].column === e && b.push(t)
                        } else b.push(M - t - 1)
                    }
                } else if (L + v > M - w) {
                    P = Math.max(L - (M - 2 * w), g);
                    for (let e = 0; e < P; e += 1) {
                        const t = e - Math.floor(e / M) * M;
                        S ? d.forEach(((e, s) => {
                            e.column === t && y.push(s)
                        })) : y.push(t)
                    }
                }
                if (l.__preventObserver__ = !0, requestAnimationFrame((() => {
                    l.__preventObserver__ = !1
                })), x && b.forEach((e => {
                    d[e].swiperLoopMoveDOM = !0, p.prepend(d[e]), d[e].swiperLoopMoveDOM = !1
                })), E && y.forEach((e => {
                    d[e].swiperLoopMoveDOM = !0, p.append(d[e]), d[e].swiperLoopMoveDOM = !1
                })), l.recalcSlides(), "auto" === h.slidesPerView ? l.updateSlides() : S && (b.length > 0 && x || y.length > 0 && E) && l.slides.forEach(((e, t) => {
                    l.grid.updateSlide(t, e, l.slides)
                })), h.watchSlidesProgress && l.updateSlidesOffset(), s) if (b.length > 0 && x) {
                    if (void 0 === t) {
                        const e = l.slidesGrid[T], t = l.slidesGrid[T + C] - e;
                        a ? l.setTranslate(l.translate - t) : (l.slideTo(T + C, 0, !1, !0), n && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t, l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t))
                    } else if (n) {
                        const e = S ? b.length / h.grid.rows : b.length;
                        l.slideTo(l.activeIndex + e, 0, !1, !0), l.touchEventsData.currentTranslate = l.translate
                    }
                } else if (y.length > 0 && E) if (void 0 === t) {
                    const e = l.slidesGrid[T], t = l.slidesGrid[T - P] - e;
                    a ? l.setTranslate(l.translate - t) : (l.slideTo(T - P, 0, !1, !0), n && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t, l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t))
                } else {
                    const e = S ? y.length / h.grid.rows : y.length;
                    l.slideTo(l.activeIndex - e, 0, !1, !0)
                }
                if (l.allowSlidePrev = c, l.allowSlideNext = u, l.controller && l.controller.control && !o) {
                    const e = {slideRealIndex: t, direction: i, setTranslate: n, activeSlideIndex: r, byController: !0};
                    Array.isArray(l.controller.control) ? l.controller.control.forEach((t => {
                        !t.destroyed && t.params.loop && t.loopFix({
                            ...e,
                            slideTo: t.params.slidesPerView === h.slidesPerView && s
                        })
                    })) : l.controller.control instanceof l.constructor && l.controller.control.params.loop && l.controller.control.loopFix({
                        ...e,
                        slideTo: l.controller.control.params.slidesPerView === h.slidesPerView && s
                    })
                }
                l.emit("loopFix")
            }, loopDestroy: function () {
                const e = this, {params: t, slidesEl: s} = e;
                if (!t.loop || e.virtual && e.params.virtual.enabled) return;
                e.recalcSlides();
                const i = [];
                e.slides.forEach((e => {
                    const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
                    i[t] = e
                })), e.slides.forEach((e => {
                    e.removeAttribute("data-swiper-slide-index")
                })), i.forEach((e => {
                    s.append(e)
                })), e.recalcSlides(), e.slideTo(e.realIndex, 0)
            }
        };

        function I(e, t, s) {
            const i = o(), {params: n} = e, r = n.edgeSwipeDetection, a = n.edgeSwipeThreshold;
            return !r || !(s <= a || s >= i.innerWidth - a) || "prevent" === r && (t.preventDefault(), !0)
        }

        function _(e) {
            const t = this, s = n();
            let i = e;
            i.originalEvent && (i = i.originalEvent);
            const r = t.touchEventsData;
            if ("pointerdown" === i.type) {
                if (null !== r.pointerId && r.pointerId !== i.pointerId) return;
                r.pointerId = i.pointerId
            } else "touchstart" === i.type && 1 === i.targetTouches.length && (r.touchId = i.targetTouches[0].identifier);
            if ("touchstart" === i.type) return void I(t, i, i.targetTouches[0].pageX);
            const {params: a, touches: d, enabled: c} = t;
            if (!c) return;
            if (!a.simulateTouch && "mouse" === i.pointerType) return;
            if (t.animating && a.preventInteractionOnTransition) return;
            !t.animating && a.cssMode && a.loop && t.loopFix();
            let u = i.target;
            if ("wrapper" === a.touchEventsTarget && !t.wrapperEl.contains(u)) return;
            if ("which" in i && 3 === i.which) return;
            if ("button" in i && i.button > 0) return;
            if (r.isTouched && r.isMoved) return;
            const p = !!a.noSwipingClass && "" !== a.noSwipingClass, h = i.composedPath ? i.composedPath() : i.path;
            p && i.target && i.target.shadowRoot && h && (u = h[0]);
            const f = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`,
                m = !(!i.target || !i.target.shadowRoot);
            if (a.noSwiping && (m ? function (e, t) {
                return void 0 === t && (t = this), function t(s) {
                    if (!s || s === n() || s === o()) return null;
                    s.assignedSlot && (s = s.assignedSlot);
                    const i = s.closest(e);
                    return i || s.getRootNode ? i || t(s.getRootNode().host) : null
                }(t)
            }(f, u) : u.closest(f))) return void (t.allowClick = !0);
            if (a.swipeHandler && !u.closest(a.swipeHandler)) return;
            d.currentX = i.pageX, d.currentY = i.pageY;
            const v = d.currentX, g = d.currentY;
            if (!I(t, i, v)) return;
            Object.assign(r, {
                isTouched: !0,
                isMoved: !1,
                allowTouchCallbacks: !0,
                isScrolling: void 0,
                startMoving: void 0
            }), d.startX = v, d.startY = g, r.touchStartTime = l(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, a.threshold > 0 && (r.allowThresholdMove = !1);
            let w = !0;
            u.matches(r.focusableElements) && (w = !1, "SELECT" === u.nodeName && (r.isTouched = !1)), s.activeElement && s.activeElement.matches(r.focusableElements) && s.activeElement !== u && s.activeElement.blur();
            const S = w && t.allowTouchMove && a.touchStartPreventDefault;
            !a.touchStartForcePreventDefault && !S || u.isContentEditable || i.preventDefault(), a.freeMode && a.freeMode.enabled && t.freeMode && t.animating && !a.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", i)
        }

        function z(e) {
            const t = n(), s = this, i = s.touchEventsData, {params: r, touches: o, rtlTranslate: a, enabled: d} = s;
            if (!d) return;
            if (!r.simulateTouch && "mouse" === e.pointerType) return;
            let c, u = e;
            if (u.originalEvent && (u = u.originalEvent), "pointermove" === u.type) {
                if (null !== i.touchId) return;
                if (u.pointerId !== i.pointerId) return
            }
            if ("touchmove" === u.type) {
                if (c = [...u.changedTouches].filter((e => e.identifier === i.touchId))[0], !c || c.identifier !== i.touchId) return
            } else c = u;
            if (!i.isTouched) return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", u));
            const p = c.pageX, h = c.pageY;
            if (u.preventedByNestedSwiper) return o.startX = p, void (o.startY = h);
            if (!s.allowTouchMove) return u.target.matches(i.focusableElements) || (s.allowClick = !1), void (i.isTouched && (Object.assign(o, {
                startX: p,
                startY: h,
                currentX: p,
                currentY: h
            }), i.touchStartTime = l()));
            if (r.touchReleaseOnEdges && !r.loop) if (s.isVertical()) {
                if (h < o.startY && s.translate <= s.maxTranslate() || h > o.startY && s.translate >= s.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1)
            } else if (p < o.startX && s.translate <= s.maxTranslate() || p > o.startX && s.translate >= s.minTranslate()) return;
            if (t.activeElement && u.target === t.activeElement && u.target.matches(i.focusableElements)) return i.isMoved = !0, void (s.allowClick = !1);
            i.allowTouchCallbacks && s.emit("touchMove", u), o.previousX = o.currentX, o.previousY = o.currentY, o.currentX = p, o.currentY = h;
            const f = o.currentX - o.startX, m = o.currentY - o.startY;
            if (s.params.threshold && Math.sqrt(f ** 2 + m ** 2) < s.params.threshold) return;
            if (void 0 === i.isScrolling) {
                let e;
                s.isHorizontal() && o.currentY === o.startY || s.isVertical() && o.currentX === o.startX ? i.isScrolling = !1 : f * f + m * m >= 25 && (e = 180 * Math.atan2(Math.abs(m), Math.abs(f)) / Math.PI, i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
            }
            if (i.isScrolling && s.emit("touchMoveOpposite", u), void 0 === i.startMoving && (o.currentX === o.startX && o.currentY === o.startY || (i.startMoving = !0)), i.isScrolling) return void (i.isTouched = !1);
            if (!i.startMoving) return;
            s.allowClick = !1, !r.cssMode && u.cancelable && u.preventDefault(), r.touchMoveStopPropagation && !r.nested && u.stopPropagation();
            let v = s.isHorizontal() ? f : m,
                g = s.isHorizontal() ? o.currentX - o.previousX : o.currentY - o.previousY;
            r.oneWayMovement && (v = Math.abs(v) * (a ? 1 : -1), g = Math.abs(g) * (a ? 1 : -1)), o.diff = v, v *= r.touchRatio, a && (v = -v, g = -g);
            const w = s.touchesDirection;
            s.swipeDirection = v > 0 ? "prev" : "next", s.touchesDirection = g > 0 ? "prev" : "next";
            const S = s.params.loop && !r.cssMode,
                b = "next" === s.touchesDirection && s.allowSlideNext || "prev" === s.touchesDirection && s.allowSlidePrev;
            if (!i.isMoved) {
                if (S && b && s.loopFix({direction: s.swipeDirection}), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) {
                    const e = new window.CustomEvent("transitionend", {bubbles: !0, cancelable: !0});
                    s.wrapperEl.dispatchEvent(e)
                }
                i.allowMomentumBounce = !1, !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", u)
            }
            if ((new Date).getTime(), i.isMoved && i.allowThresholdMove && w !== s.touchesDirection && S && b && Math.abs(v) >= 1) return Object.assign(o, {
                startX: p,
                startY: h,
                currentX: p,
                currentY: h,
                startTranslate: i.currentTranslate
            }), i.loopSwapReset = !0, void (i.startTranslate = i.currentTranslate);
            s.emit("sliderMove", u), i.isMoved = !0, i.currentTranslate = v + i.startTranslate;
            let y = !0, T = r.resistanceRatio;
            if (r.touchReleaseOnEdges && (T = 0), v > 0 ? (S && b && i.allowThresholdMove && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1] : s.minTranslate()) && s.loopFix({
                direction: "prev",
                setTranslate: !0,
                activeSlideIndex: 0
            }), i.currentTranslate > s.minTranslate() && (y = !1, r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + v) ** T))) : v < 0 && (S && b && i.allowThresholdMove && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.slidesSizesGrid[s.slidesSizesGrid.length - 1] : s.maxTranslate()) && s.loopFix({
                direction: "next",
                setTranslate: !0,
                activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
            }), i.currentTranslate < s.maxTranslate() && (y = !1, r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - v) ** T))), y && (u.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate), r.threshold > 0) {
                if (!(Math.abs(v) > r.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                if (!i.allowThresholdMove) return i.allowThresholdMove = !0, o.startX = o.currentX, o.startY = o.currentY, i.currentTranslate = i.startTranslate, void (o.diff = s.isHorizontal() ? o.currentX - o.startX : o.currentY - o.startY)
            }
            r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate))
        }

        function D(e) {
            const t = this, s = t.touchEventsData;
            let i, n = e;
            if (n.originalEvent && (n = n.originalEvent), "touchend" === n.type || "touchcancel" === n.type) {
                if (i = [...n.changedTouches].filter((e => e.identifier === s.touchId))[0], !i || i.identifier !== s.touchId) return
            } else {
                if (null !== s.touchId) return;
                if (n.pointerId !== s.pointerId) return;
                i = n
            }
            if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(n.type) && (!["pointercancel", "contextmenu"].includes(n.type) || !t.browser.isSafari && !t.browser.isWebView)) return;
            s.pointerId = null, s.touchId = null;
            const {params: r, touches: o, rtlTranslate: d, slidesGrid: c, enabled: u} = t;
            if (!u) return;
            if (!r.simulateTouch && "mouse" === n.pointerType) return;
            if (s.allowTouchCallbacks && t.emit("touchEnd", n), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && r.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void (s.startMoving = !1);
            r.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
            const p = l(), h = p - s.touchStartTime;
            if (t.allowClick) {
                const e = n.path || n.composedPath && n.composedPath();
                t.updateClickedSlide(e && e[0] || n.target, e), t.emit("tap click", n), h < 300 && p - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", n)
            }
            if (s.lastClickTime = l(), a((() => {
                t.destroyed || (t.allowClick = !0)
            })), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === o.diff && !s.loopSwapReset || s.currentTranslate === s.startTranslate && !s.loopSwapReset) return s.isTouched = !1, s.isMoved = !1, void (s.startMoving = !1);
            let f;
            if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, f = r.followFinger ? d ? t.translate : -t.translate : -s.currentTranslate, r.cssMode) return;
            if (r.freeMode && r.freeMode.enabled) return void t.freeMode.onTouchEnd({currentPos: f});
            const m = f >= -t.maxTranslate() && !t.params.loop;
            let v = 0, g = t.slidesSizesGrid[0];
            for (let e = 0; e < c.length; e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup) {
                const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
                void 0 !== c[e + t] ? (m || f >= c[e] && f < c[e + t]) && (v = e, g = c[e + t] - c[e]) : (m || f >= c[e]) && (v = e, g = c[c.length - 1] - c[c.length - 2])
            }
            let w = null, S = null;
            r.rewind && (t.isBeginning ? S = r.virtual && r.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (w = 0));
            const b = (f - c[v]) / g, y = v < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
            if (h > r.longSwipesMs) {
                if (!r.longSwipes) return void t.slideTo(t.activeIndex);
                "next" === t.swipeDirection && (b >= r.longSwipesRatio ? t.slideTo(r.rewind && t.isEnd ? w : v + y) : t.slideTo(v)), "prev" === t.swipeDirection && (b > 1 - r.longSwipesRatio ? t.slideTo(v + y) : null !== S && b < 0 && Math.abs(b) > r.longSwipesRatio ? t.slideTo(S) : t.slideTo(v))
            } else {
                if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
                !t.navigation || n.target !== t.navigation.nextEl && n.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo(null !== w ? w : v + y), "prev" === t.swipeDirection && t.slideTo(null !== S ? S : v)) : n.target === t.navigation.nextEl ? t.slideTo(v + y) : t.slideTo(v)
            }
        }

        function N() {
            const e = this, {params: t, el: s} = e;
            if (s && 0 === s.offsetWidth) return;
            t.breakpoints && e.setBreakpoint();
            const {allowSlideNext: i, allowSlidePrev: n, snapGrid: r} = e, o = e.virtual && e.params.virtual.enabled;
            e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
            const a = o && t.loop;
            !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || a ? e.params.loop && !o ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout((() => {
                e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
            }), 500)), e.allowSlidePrev = n, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }

        function G(e) {
            const t = this;
            t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
        }

        function H() {
            const e = this, {wrapperEl: t, rtlTranslate: s, enabled: i} = e;
            if (!i) return;
            let n;
            e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
            const r = e.maxTranslate() - e.minTranslate();
            n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, n !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
        }

        function F(e) {
            const t = this;
            C(t, e.target), t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
        }

        function V() {
            const e = this;
            e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
        }

        const q = (e, t) => {
            const s = n(), {params: i, el: r, wrapperEl: o, device: a} = e, l = !!i.nested,
                d = "on" === t ? "addEventListener" : "removeEventListener", c = t;
            s[d]("touchstart", e.onDocumentTouchStart, {
                passive: !1,
                capture: l
            }), r[d]("touchstart", e.onTouchStart, {passive: !1}), r[d]("pointerdown", e.onTouchStart, {passive: !1}), s[d]("touchmove", e.onTouchMove, {
                passive: !1,
                capture: l
            }), s[d]("pointermove", e.onTouchMove, {
                passive: !1,
                capture: l
            }), s[d]("touchend", e.onTouchEnd, {passive: !0}), s[d]("pointerup", e.onTouchEnd, {passive: !0}), s[d]("pointercancel", e.onTouchEnd, {passive: !0}), s[d]("touchcancel", e.onTouchEnd, {passive: !0}), s[d]("pointerout", e.onTouchEnd, {passive: !0}), s[d]("pointerleave", e.onTouchEnd, {passive: !0}), s[d]("contextmenu", e.onTouchEnd, {passive: !0}), (i.preventClicks || i.preventClicksPropagation) && r[d]("click", e.onClick, !0), i.cssMode && o[d]("scroll", e.onScroll), i.updateOnWindowResize ? e[c](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", N, !0) : e[c]("observerUpdate", N, !0), r[d]("load", e.onLoad, {capture: !0})
        }, B = (e, t) => e.grid && t.grid && t.grid.rows > 1;
        var j = {
            init: !0,
            direction: "horizontal",
            oneWayMovement: !1,
            swiperElementNodeName: "SWIPER-CONTAINER",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            resizeObserver: !0,
            nested: !1,
            createElements: !1,
            eventsPrefix: "swiper",
            enabled: !0,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: !1,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 5,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            loop: !1,
            loopAddBlankSlides: !0,
            loopAdditionalSlides: 0,
            loopPreventsSliding: !0,
            rewind: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-blank",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideFullyVisibleClass: "swiper-slide-fully-visible",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            lazyPreloaderClass: "swiper-lazy-preloader",
            lazyPreloadPrevNext: 0,
            runCallbacksOnInit: !0,
            _emitClasses: !1
        };

        function R(e, t) {
            return function (s) {
                void 0 === s && (s = {});
                const i = Object.keys(s)[0], n = s[i];
                "object" == typeof n && null !== n ? (!0 === e[i] && (e[i] = {enabled: !0}), "navigation" === i && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0), ["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0), i in e && "enabled" in n ? ("object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), e[i] || (e[i] = {enabled: !1}), c(t, s)) : c(t, s)) : c(t, s)
            }
        }

        const Y = {
            eventsEmitter: x, update: L, translate: {
                getTranslate: function (e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                    const {params: t, rtlTranslate: s, translate: i, wrapperEl: n} = this;
                    if (t.virtualTranslate) return s ? -i : i;
                    if (t.cssMode) return i;
                    let r = function (e, t) {
                        void 0 === t && (t = "x");
                        const s = o();
                        let i, n, r;
                        const a = function (e) {
                            const t = o();
                            let s;
                            return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s
                        }(e);
                        return s.WebKitCSSMatrix ? (n = a.transform || a.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map((e => e.replace(",", "."))).join(", ")), r = new s.WebKitCSSMatrix("none" === n ? "" : n)) : (r = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = r.toString().split(",")), "x" === t && (n = s.WebKitCSSMatrix ? r.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = s.WebKitCSSMatrix ? r.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), n || 0
                    }(n, e);
                    return r += this.cssOverflowAdjustment(), s && (r = -r), r || 0
                }, setTranslate: function (e, t) {
                    const s = this, {rtlTranslate: i, params: n, wrapperEl: r, progress: o} = s;
                    let a, l = 0, d = 0;
                    s.isHorizontal() ? l = i ? -e : e : d = e, n.roundLengths && (l = Math.floor(l), d = Math.floor(d)), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? l : d, n.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -l : -d : n.virtualTranslate || (s.isHorizontal() ? l -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(), r.style.transform = `translate3d(${l}px, ${d}px, 0px)`);
                    const c = s.maxTranslate() - s.minTranslate();
                    a = 0 === c ? 0 : (e - s.minTranslate()) / c, a !== o && s.updateProgress(e), s.emit("setTranslate", s.translate, t)
                }, minTranslate: function () {
                    return -this.snapGrid[0]
                }, maxTranslate: function () {
                    return -this.snapGrid[this.snapGrid.length - 1]
                }, translateTo: function (e, t, s, i, n) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === i && (i = !0);
                    const r = this, {params: o, wrapperEl: a} = r;
                    if (r.animating && o.preventInteractionOnTransition) return !1;
                    const l = r.minTranslate(), d = r.maxTranslate();
                    let c;
                    if (c = i && e > l ? l : i && e < d ? d : e, r.updateProgress(c), o.cssMode) {
                        const e = r.isHorizontal();
                        if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -c; else {
                            if (!r.support.smoothScroll) return p({
                                swiper: r,
                                targetPosition: -c,
                                side: e ? "left" : "top"
                            }), !0;
                            a.scrollTo({[e ? "left" : "top"]: -c, behavior: "smooth"})
                        }
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(c), s && (r.emit("beforeTransitionStart", t, n), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (e) {
                        r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd"))
                    }), r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))), !0
                }
            }, transition: {
                setTransition: function (e, t) {
                    const s = this;
                    s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`, s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""), s.emit("setTransition", e, t)
                }, transitionStart: function (e, t) {
                    void 0 === e && (e = !0);
                    const s = this, {params: i} = s;
                    i.cssMode || (i.autoHeight && s.updateAutoHeight(), A({
                        swiper: s,
                        runCallbacks: e,
                        direction: t,
                        step: "Start"
                    }))
                }, transitionEnd: function (e, t) {
                    void 0 === e && (e = !0);
                    const s = this, {params: i} = s;
                    s.animating = !1, i.cssMode || (s.setTransition(0), A({
                        swiper: s,
                        runCallbacks: e,
                        direction: t,
                        step: "End"
                    }))
                }
            }, slide: O, loop: k, grabCursor: {
                setGrabCursor: function (e) {
                    const t = this;
                    if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
                    const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                    t.isElement && (t.__preventObserver__ = !0), s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame((() => {
                        t.__preventObserver__ = !1
                    }))
                }, unsetGrabCursor: function () {
                    const e = this;
                    e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame((() => {
                        e.__preventObserver__ = !1
                    })))
                }
            }, events: {
                attachEvents: function () {
                    const e = this, {params: t} = e;
                    e.onTouchStart = _.bind(e), e.onTouchMove = z.bind(e), e.onTouchEnd = D.bind(e), e.onDocumentTouchStart = V.bind(e), t.cssMode && (e.onScroll = H.bind(e)), e.onClick = G.bind(e), e.onLoad = F.bind(e), q(e, "on")
                }, detachEvents: function () {
                    q(this, "off")
                }
            }, breakpoints: {
                setBreakpoint: function () {
                    const e = this, {realIndex: t, initialized: s, params: i, el: n} = e, r = i.breakpoints;
                    if (!r || r && 0 === Object.keys(r).length) return;
                    const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
                    if (!o || e.currentBreakpoint === o) return;
                    const a = (o in r ? r[o] : void 0) || e.originalParams, l = B(e, i), d = B(e, a), u = i.enabled;
                    l && !d ? (n.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !l && d && (n.classList.add(`${i.containerModifierClass}grid`), (a.grid.fill && "column" === a.grid.fill || !a.grid.fill && "column" === i.grid.fill) && n.classList.add(`${i.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((t => {
                        if (void 0 === a[t]) return;
                        const s = i[t] && i[t].enabled, n = a[t] && a[t].enabled;
                        s && !n && e[t].disable(), !s && n && e[t].enable()
                    }));
                    const p = a.direction && a.direction !== i.direction,
                        h = i.loop && (a.slidesPerView !== i.slidesPerView || p), f = i.loop;
                    p && s && e.changeDirection(), c(e.params, a);
                    const m = e.params.enabled, v = e.params.loop;
                    Object.assign(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev
                    }), u && !m ? e.disable() : !u && m && e.enable(), e.currentBreakpoint = o, e.emit("_beforeBreakpoint", a), s && (h ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !f && v ? (e.loopCreate(t), e.updateSlides()) : f && !v && e.loopDestroy()), e.emit("breakpoint", a)
                }, getBreakpoint: function (e, t, s) {
                    if (void 0 === t && (t = "window"), !e || "container" === t && !s) return;
                    let i = !1;
                    const n = o(), r = "window" === t ? n.innerHeight : s.clientHeight, a = Object.keys(e).map((e => {
                        if ("string" == typeof e && 0 === e.indexOf("@")) {
                            const t = parseFloat(e.substr(1));
                            return {value: r * t, point: e}
                        }
                        return {value: e, point: e}
                    }));
                    a.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
                    for (let e = 0; e < a.length; e += 1) {
                        const {point: r, value: o} = a[e];
                        "window" === t ? n.matchMedia(`(min-width: ${o}px)`).matches && (i = r) : o <= s.clientWidth && (i = r)
                    }
                    return i || "max"
                }
            }, checkOverflow: {
                checkOverflow: function () {
                    const e = this, {isLocked: t, params: s} = e, {slidesOffsetBefore: i} = s;
                    if (i) {
                        const t = e.slides.length - 1, s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                        e.isLocked = e.size > s
                    } else e.isLocked = 1 === e.snapGrid.length;
                    !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
                }
            }, classes: {
                addClasses: function () {
                    const e = this, {classNames: t, params: s, rtl: i, el: n, device: r} = e, o = function (e, t) {
                        const s = [];
                        return e.forEach((e => {
                            "object" == typeof e ? Object.keys(e).forEach((i => {
                                e[i] && s.push(t + i)
                            })) : "string" == typeof e && s.push(t + e)
                        })), s
                    }(["initialized", s.direction, {"free-mode": e.params.freeMode && s.freeMode.enabled}, {autoheight: s.autoHeight}, {rtl: i}, {grid: s.grid && s.grid.rows > 1}, {"grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill}, {android: r.android}, {ios: r.ios}, {"css-mode": s.cssMode}, {centered: s.cssMode && s.centeredSlides}, {"watch-progress": s.watchSlidesProgress}], s.containerModifierClass);
                    t.push(...o), n.classList.add(...t), e.emitContainerClasses()
                }, removeClasses: function () {
                    const {el: e, classNames: t} = this;
                    e.classList.remove(...t), this.emitContainerClasses()
                }
            }
        }, $ = {};

        class W {
            constructor() {
                let e, t;
                for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++) i[r] = arguments[r];
                1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i, t || (t = {}), t = c({}, t), e && !t.el && (t.el = e);
                const a = n();
                if (t.el && "string" == typeof t.el && a.querySelectorAll(t.el).length > 1) {
                    const e = [];
                    return a.querySelectorAll(t.el).forEach((s => {
                        const i = c({}, t, {el: s});
                        e.push(new W(i))
                    })), e
                }
                const l = this;
                l.__swiper__ = !0, l.support = T(), l.device = E({userAgent: t.userAgent}), l.browser = (y || (y = function () {
                    const e = o(), t = E();
                    let s = !1;

                    function i() {
                        const t = e.navigator.userAgent.toLowerCase();
                        return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
                    }

                    if (i()) {
                        const t = String(e.navigator.userAgent);
                        if (t.includes("Version/")) {
                            const [e, i] = t.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e)));
                            s = e < 16 || 16 === e && i < 2
                        }
                    }
                    const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent), r = i();
                    return {isSafari: s || r, needPerspectiveFix: s, need3dFix: r || n && t.ios, isWebView: n}
                }()), y), l.eventsListeners = {}, l.eventsAnyListeners = [], l.modules = [...l.__modules__], t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
                const d = {};
                l.modules.forEach((e => {
                    e({
                        params: t,
                        swiper: l,
                        extendParams: R(t, d),
                        on: l.on.bind(l),
                        once: l.once.bind(l),
                        off: l.off.bind(l),
                        emit: l.emit.bind(l)
                    })
                }));
                const u = c({}, j, d);
                return l.params = c({}, u, $, t), l.originalParams = c({}, l.params), l.passedParams = c({}, t), l.params && l.params.on && Object.keys(l.params.on).forEach((e => {
                    l.on(e, l.params.on[e])
                })), l.params && l.params.onAny && l.onAny(l.params.onAny), Object.assign(l, {
                    enabled: l.params.enabled,
                    el: e,
                    classNames: [],
                    slides: [],
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: () => "horizontal" === l.params.direction,
                    isVertical: () => "vertical" === l.params.direction,
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    cssOverflowAdjustment() {
                        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
                    },
                    allowSlideNext: l.params.allowSlideNext,
                    allowSlidePrev: l.params.allowSlidePrev,
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: l.params.focusableElements,
                        lastClickTime: 0,
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        startMoving: void 0,
                        pointerId: null,
                        touchId: null
                    },
                    allowClick: !0,
                    allowTouchMove: l.params.allowTouchMove,
                    touches: {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0},
                    imagesToLoad: [],
                    imagesLoaded: 0
                }), l.emit("_swiper"), l.params.init && l.init(), l
            }

            getDirectionLabel(e) {
                return this.isHorizontal() ? e : {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[e]
            }

            getSlideIndex(e) {
                const {slidesEl: t, params: s} = this, i = g(h(t, `.${s.slideClass}, swiper-slide`)[0]);
                return g(e) - i
            }

            getSlideIndexByData(e) {
                return this.getSlideIndex(this.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0])
            }

            recalcSlides() {
                const {slidesEl: e, params: t} = this;
                this.slides = h(e, `.${t.slideClass}, swiper-slide`)
            }

            enable() {
                const e = this;
                e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
            }

            disable() {
                const e = this;
                e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
            }

            setProgress(e, t) {
                const s = this;
                e = Math.min(Math.max(e, 0), 1);
                const i = s.minTranslate(), n = (s.maxTranslate() - i) * e + i;
                s.translateTo(n, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
            }

            emitContainerClasses() {
                const e = this;
                if (!e.params._emitClasses || !e.el) return;
                const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
                e.emit("_containerClasses", t.join(" "))
            }

            getSlideClasses(e) {
                const t = this;
                return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
            }

            emitSlidesClasses() {
                const e = this;
                if (!e.params._emitClasses || !e.el) return;
                const t = [];
                e.slides.forEach((s => {
                    const i = e.getSlideClasses(s);
                    t.push({slideEl: s, classNames: i}), e.emit("_slideClass", s, i)
                })), e.emit("_slideClasses", t)
            }

            slidesPerViewDynamic(e, t) {
                void 0 === e && (e = "current"), void 0 === t && (t = !1);
                const {params: s, slides: i, slidesGrid: n, slidesSizesGrid: r, size: o, activeIndex: a} = this;
                let l = 1;
                if ("number" == typeof s.slidesPerView) return s.slidesPerView;
                if (s.centeredSlides) {
                    let e, t = i[a] ? Math.ceil(i[a].swiperSlideSize) : 0;
                    for (let s = a + 1; s < i.length; s += 1) i[s] && !e && (t += Math.ceil(i[s].swiperSlideSize), l += 1, t > o && (e = !0));
                    for (let s = a - 1; s >= 0; s -= 1) i[s] && !e && (t += i[s].swiperSlideSize, l += 1, t > o && (e = !0))
                } else if ("current" === e) for (let e = a + 1; e < i.length; e += 1) (t ? n[e] + r[e] - n[a] < o : n[e] - n[a] < o) && (l += 1); else for (let e = a - 1; e >= 0; e -= 1) n[a] - n[e] < o && (l += 1);
                return l
            }

            update() {
                const e = this;
                if (!e || e.destroyed) return;
                const {snapGrid: t, params: s} = e;

                function i() {
                    const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses()
                }

                let n;
                if (s.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t => {
                    t.complete && C(e, t)
                })), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), s.freeMode && s.freeMode.enabled && !s.cssMode) i(), s.autoHeight && e.updateAutoHeight(); else {
                    if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
                        const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
                        n = e.slideTo(t.length - 1, 0, !1, !0)
                    } else n = e.slideTo(e.activeIndex, 0, !1, !0);
                    n || i()
                }
                s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
            }

            changeDirection(e, t) {
                void 0 === t && (t = !0);
                const s = this, i = s.params.direction;
                return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`), s.el.classList.add(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.forEach((t => {
                    "vertical" === e ? t.style.width = "" : t.style.height = ""
                })), s.emit("changeDirection"), t && s.update()), s
            }

            changeLanguageDirection(e) {
                const t = this;
                t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update())
            }

            mount(e) {
                const t = this;
                if (t.mounted) return !0;
                let s = e || t.params.el;
                if ("string" == typeof s && (s = document.querySelector(s)), !s) return !1;
                s.swiper = t, s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
                const i = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
                let n = s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(i()) : h(s, i())[0];
                return !n && t.params.createElements && (n = m("div", t.params.wrapperClass), s.append(n), h(s, `.${t.params.slideClass}`).forEach((e => {
                    n.append(e)
                }))), Object.assign(t, {
                    el: s,
                    wrapperEl: n,
                    slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : n,
                    hostEl: t.isElement ? s.parentNode.host : s,
                    mounted: !0,
                    rtl: "rtl" === s.dir.toLowerCase() || "rtl" === v(s, "direction"),
                    rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === v(s, "direction")),
                    wrongRTL: "-webkit-box" === v(n, "display")
                }), !0
            }

            init(e) {
                const t = this;
                if (t.initialized) return t;
                if (!1 === t.mount(e)) return t;
                t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(), t.attachEvents();
                const s = [...t.el.querySelectorAll('[loading="lazy"]')];
                return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), s.forEach((e => {
                    e.complete ? C(t, e) : e.addEventListener("load", (e => {
                        C(t, e.target)
                    }))
                })), M(t), t.initialized = !0, M(t), t.emit("init"), t.emit("afterInit"), t
            }

            destroy(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                const s = this, {params: i, el: n, wrapperEl: r, slides: o} = s;
                return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), t && (s.removeClasses(), n.removeAttribute("style"), r.removeAttribute("style"), o && o.length && o.forEach((e => {
                    e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index")
                }))), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((e => {
                    s.off(e)
                })), !1 !== e && (s.el.swiper = null, function (e) {
                    const t = e;
                    Object.keys(t).forEach((e => {
                        try {
                            t[e] = null
                        } catch (e) {
                        }
                        try {
                            delete t[e]
                        } catch (e) {
                        }
                    }))
                }(s)), s.destroyed = !0), null
            }

            static extendDefaults(e) {
                c($, e)
            }

            static get extendedDefaults() {
                return $
            }

            static get defaults() {
                return j
            }

            static installModule(e) {
                W.prototype.__modules__ || (W.prototype.__modules__ = []);
                const t = W.prototype.__modules__;
                "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
            }

            static use(e) {
                return Array.isArray(e) ? (e.forEach((e => W.installModule(e))), W) : (W.installModule(e), W)
            }
        }

        Object.keys(Y).forEach((e => {
            Object.keys(Y[e]).forEach((t => {
                W.prototype[t] = Y[e][t]
            }))
        })), W.use([function (e) {
            let {swiper: t, on: s, emit: i} = e;
            const n = o();
            let r = null, a = null;
            const l = () => {
                t && !t.destroyed && t.initialized && (i("beforeResize"), i("resize"))
            }, d = () => {
                t && !t.destroyed && t.initialized && i("orientationchange")
            };
            s("init", (() => {
                t.params.resizeObserver && void 0 !== n.ResizeObserver ? t && !t.destroyed && t.initialized && (r = new ResizeObserver((e => {
                    a = n.requestAnimationFrame((() => {
                        const {width: s, height: i} = t;
                        let n = s, r = i;
                        e.forEach((e => {
                            let {contentBoxSize: s, contentRect: i, target: o} = e;
                            o && o !== t.el || (n = i ? i.width : (s[0] || s).inlineSize, r = i ? i.height : (s[0] || s).blockSize)
                        })), n === s && r === i || l()
                    }))
                })), r.observe(t.el)) : (n.addEventListener("resize", l), n.addEventListener("orientationchange", d))
            })), s("destroy", (() => {
                a && n.cancelAnimationFrame(a), r && r.unobserve && t.el && (r.unobserve(t.el), r = null), n.removeEventListener("resize", l), n.removeEventListener("orientationchange", d)
            }))
        }, function (e) {
            let {swiper: t, extendParams: s, on: i, emit: n} = e;
            const r = [], a = o(), l = function (e, s) {
                void 0 === s && (s = {});
                const i = new (a.MutationObserver || a.WebkitMutationObserver)((e => {
                    if (t.__preventObserver__) return;
                    if (1 === e.length) return void n("observerUpdate", e[0]);
                    const s = function () {
                        n("observerUpdate", e[0])
                    };
                    a.requestAnimationFrame ? a.requestAnimationFrame(s) : a.setTimeout(s, 0)
                }));
                i.observe(e, {
                    attributes: void 0 === s.attributes || s.attributes,
                    childList: void 0 === s.childList || s.childList,
                    characterData: void 0 === s.characterData || s.characterData
                }), r.push(i)
            };
            s({observer: !1, observeParents: !1, observeSlideChildren: !1}), i("init", (() => {
                if (t.params.observer) {
                    if (t.params.observeParents) {
                        const e = function (e, t) {
                            const s = [];
                            let i = e.parentElement;
                            for (; i;) s.push(i), i = i.parentElement;
                            return s
                        }(t.hostEl);
                        for (let t = 0; t < e.length; t += 1) l(e[t])
                    }
                    l(t.hostEl, {childList: t.params.observeSlideChildren}), l(t.wrapperEl, {attributes: !1})
                }
            })), i("destroy", (() => {
                r.forEach((e => {
                    e.disconnect()
                })), r.splice(0, r.length)
            }))
        }]);
        var X = s(296), U = s.n(X), K = s(484), J = s(432), Z = s.n(J);
        s(704), document.addEventListener("DOMContentLoaded", (function () {
            (0, K.c)(document.querySelectorAll(".mySelect"));
            const e = document.querySelector("body"),
                t = (document.querySelector(".main-menu"), document.querySelector(".burger")),
                s = document.querySelector(".main-menu__close"), i = document.querySelector(".overlay");

            function n() {
                i.classList.remove("active"), e.style.overflow = ""
            }

            t.addEventListener("click", (function () {
                i.classList.toggle("active"), e.style.overflow = "hidden"
            })), s.addEventListener("click", (function () {
                n()
            })), i.addEventListener("click", (function (e) {
                e.target.classList.contains("overlay") && n()
            }));
            const r = document.querySelector(".header__bottom"),
                o = document.querySelector(".header__top").offsetHeight;
            r.style = `margin-top: ${o}px`, new (Z())({
                selector: ".header__bottom",
                linkSelector: "a, strong",
                scrollSettings: {startHeight: 100, stopHeight: 100, stopPosition: 1, breakPosition: 600},
                classes: {useClasses: !0, isOpen: "sh-open", onStop: "sh-stop"}
            }), new W(".news-block__items", {
                slidesPerView: 3,
                spaceBetween: 16,
                breakpoints: {1024: {slidesPerView: 3}, 0: {slidesPerView: "auto"}}
            }), window.innerWidth < 1024 && new W(".about__items", {slidesPerView: "auto"}), document.querySelector(".accordion-container") && new (U())(".accordion-container"), function (e, t, s) {
                function i(e, t) {
                    return typeof e === t
                }

                function n(e, t) {
                    return !!~("" + e).indexOf(t)
                }

                function r() {
                    return "function" != typeof t.createElement ? t.createElement(arguments[0]) : S ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
                }

                function o(e) {
                    return e.replace(/([a-z])-([a-z])/g, (function (e, t, s) {
                        return t + s.toUpperCase()
                    })).replace(/^-/, "")
                }

                function a(e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                }

                function l(e) {
                    return e.replace(/([A-Z])/g, (function (e, t) {
                        return "-" + t.toLowerCase()
                    })).replace(/^ms-/, "-ms-")
                }

                function d(e, s, i, n) {
                    var o, a, l, d, c = "modernizr", u = r("div"), p = function () {
                        var e = t.body;
                        return e || ((e = r(S ? "svg" : "body")).fake = !0), e
                    }();
                    if (parseInt(i, 10)) for (; i--;) (l = r("div")).id = n ? n[i] : c + (i + 1), u.appendChild(l);
                    return (o = r("style")).type = "text/css", o.id = "s" + c, (p.fake ? p : u).appendChild(o), p.appendChild(u), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(t.createTextNode(e)), u.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", d = w.style.overflow, w.style.overflow = "hidden", w.appendChild(p)), a = s(u, e), p.fake ? (p.parentNode.removeChild(p), w.style.overflow = d, w.offsetHeight) : u.parentNode.removeChild(u), !!a
                }

                function c(t, i) {
                    var n = t.length;
                    if ("CSS" in e && "supports" in e.CSS) {
                        for (; n--;) if (e.CSS.supports(l(t[n]), i)) return !0;
                        return !1
                    }
                    if ("CSSSupportsRule" in e) {
                        for (var r = []; n--;) r.push("(" + l(t[n]) + ":" + i + ")");
                        return d("@supports (" + (r = r.join(" or ")) + ") { #modernizr { position: absolute; } }", (function (e) {
                            return "absolute" == getComputedStyle(e, null).position
                        }))
                    }
                    return s
                }

                function u(e, t, a, l) {
                    function d() {
                        p && (delete x.style, delete x.modElem)
                    }

                    if (l = !i(l, "undefined") && l, !i(a, "undefined")) {
                        var u = c(e, a);
                        if (!i(u, "undefined")) return u
                    }
                    for (var p, h, f, m, v, g = ["modernizr", "tspan"]; !x.style;) p = !0, x.modElem = r(g.shift()), x.style = x.modElem.style;
                    for (f = e.length, h = 0; f > h; h++) if (m = e[h], v = x.style[m], n(m, "-") && (m = o(m)), x.style[m] !== s) {
                        if (l || i(a, "undefined")) return d(), "pfx" != t || m;
                        try {
                            x.style[m] = a
                        } catch (e) {
                        }
                        if (x.style[m] != v) return d(), "pfx" != t || m
                    }
                    return d(), !1
                }

                function p(e, t, s, n, r) {
                    var o = e.charAt(0).toUpperCase() + e.slice(1), l = (e + " " + y.join(o + " ") + o).split(" ");
                    return i(t, "string") || i(t, "undefined") ? u(l, t, n, r) : function (e, t, s) {
                        var n;
                        for (var r in e) if (e[r] in t) return !1 === s ? e[r] : i(n = t[e[r]], "function") ? a(n, s || t) : n;
                        return !1
                    }(l = (e + " " + T.join(o + " ") + o).split(" "), t, s)
                }

                function h(e, t, i) {
                    return p(e, s, s, t, i)
                }

                var f = [], m = [], v = {
                    _version: "3.2.0",
                    _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
                    _q: [],
                    on: function (e, t) {
                        var s = this;
                        setTimeout((function () {
                            t(s[e])
                        }), 0)
                    },
                    addTest: function (e, t, s) {
                        m.push({name: e, fn: t, options: s})
                    },
                    addAsyncTest: function (e) {
                        m.push({name: null, fn: e})
                    }
                }, g = function () {
                };
                g.prototype = v, g = new g;
                var w = t.documentElement, S = "svg" === w.nodeName.toLowerCase(), b = "Moz O ms Webkit",
                    y = v._config.usePrefixes ? b.split(" ") : [];
                v._cssomPrefixes = y;
                var T = v._config.usePrefixes ? b.toLowerCase().split(" ") : [];
                v._domPrefixes = T;
                var E = {elem: r("modernizr")};
                g._q.push((function () {
                    delete E.elem
                }));
                var x = {style: E.elem.style};
                g._q.unshift((function () {
                    delete x.style
                })), v.testAllProps = p, v.testAllProps = h, g.addTest("cssanimations", h("animationName", "a", !0)), function () {
                    var e, t, s, n, r, o;
                    for (var a in m) if (m.hasOwnProperty(a)) {
                        if (e = [], (t = m[a]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (s = 0; s < t.options.aliases.length; s++) e.push(t.options.aliases[s].toLowerCase());
                        for (n = i(t.fn, "function") ? t.fn() : t.fn, r = 0; r < e.length; r++) 1 === (o = e[r].split(".")).length ? g[o[0]] = n : (!g[o[0]] || g[o[0]] instanceof Boolean || (g[o[0]] = new Boolean(g[o[0]])), g[o[0]][o[1]] = n), f.push((n ? "" : "no-") + o.join("-"))
                    }
                }(), function (e) {
                    var t = w.className, s = g._config.classPrefix || "";
                    if (S && (t = t.baseVal), g._config.enableJSClass) {
                        var i = new RegExp("(^|\\s)" + s + "no-js(\\s|$)");
                        t = t.replace(i, "$1" + s + "js$2")
                    }
                    g._config.enableClasses && (t += " " + s + e.join(" " + s), S ? w.className.baseVal = t : w.className = t)
                }(f), delete v.addTest, delete v.addAsyncTest;
                for (var C = 0; C < g._q.length; C++) g._q[C]();
                e.Modernizr = g
            }(window, document)
        }))
    })()
})();