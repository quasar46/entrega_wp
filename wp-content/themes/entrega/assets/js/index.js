document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector('body')
    const mainMenu = document.querySelector('.main-menu')
    const burger = document.querySelector('.burger')
    const closeMainMenu = document.querySelector('.main-menu__close')
    const overlay = document.querySelector('.overlay')
    const main = document.querySelector('main')
    const headerHeight = document.querySelector('header').offsetHeight

    main.style.marginTop = headerHeight + 'px'

    if (document.querySelectorAll('.phone').length > 0) {
        const phones = document.querySelectorAll('.phone')
        const maskOptions = {
            mask: '+7(000)000-00-00',
            lazy: false
        }
        phones.forEach(phone => {
            const mask = new IMask(phone, maskOptions);
        })

    }

    if (document.querySelectorAll('.open-modal').length > 0) {
        const btnOpenModal = document.querySelectorAll('.open-modal')
        const modalWindow = document.querySelector('.feedback-modal')
        const btnCloseModal = document.querySelectorAll('.modal-close')

        btnCloseModal.forEach(btnCloseModal => {
            btnCloseModal.addEventListener('click', () => {
                closeFeedback()
            })
        })

        btnOpenModal.forEach(el => {
            el.addEventListener('click', (e) => {
                openFeedback()
            })
        })

        function openFeedback() {
            modalWindow.classList.add('open')
            overlay.classList.add('active')
        }

        function closeFeedback() {
            modalWindow.classList.remove('open')
            overlay.classList.remove('active')
        }
    }


    function openMenu() {
        overlay.classList.toggle('active')
        body.style.overflow = 'hidden'
        mainMenu.classList.add('show')
    }

    function closeMenu() {
        overlay.classList.remove('active')
        body.style.overflow = ''
        mainMenu.classList.remove('show')
    }

    burger.addEventListener('click', function () {
        openMenu()
    })

    closeMainMenu.addEventListener('click', function () {
        closeMenu()
    })


    const miniCartBtn = document.querySelector('.header__basket')
    const miniCart = document.querySelector('.offcanvas')
    const miniCartCloseBtn = document.querySelector('.offcanvas__close')

    miniCartBtn.addEventListener('click', function () {
        openCart()
    })

    function openCart() {
        miniCart.classList.add('show');
        overlay.classList.add('active')
    }

    miniCartCloseBtn.addEventListener('click', function () {
        closeCart()
    })

    function closeCart() {
        miniCart.classList.remove('show');
        overlay.classList.remove('active')
    }

    overlay.addEventListener('click', function (e) {
        if (e.target.classList.contains('overlay')) {
            closeCart()
            closeMenu()
            closeFeedback()
        }
    })

    const headerBottom = document.querySelector('.header__bottom')
    const headerTop = document.querySelector('.header__top').offsetHeight
    headerBottom.style = `margin-top: ${headerTop}px`

    const searchInput = document.querySelector('.aws-container .aws-search-form .aws-wrapper');
    const btnSearch = document.querySelector('.aws-search-btn');
    btnSearch.addEventListener('click', function () {
        searchInput.classList.add('show')
    })


    /*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-cssanimations-setclasses !*/
    !function (e, n, t) {
        function r(e, n) {
            return typeof e === n
        }

        function o() {
            var e, n, t, o, s, i, a;
            for (var l in C) if (C.hasOwnProperty(l)) {
                if (e = [], n = C[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
                for (o = r(n.fn, "function") ? n.fn() : n.fn, s = 0; s < e.length; s++) i = e[s], a = i.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), g.push((o ? "" : "no-") + a.join("-"))
            }
        }

        function s(e) {
            var n = _.className, t = Modernizr._config.classPrefix || "";
            if (S && (n = n.baseVal), Modernizr._config.enableJSClass) {
                var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
                n = n.replace(r, "$1" + t + "js$2")
            }
            Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), S ? _.className.baseVal = n : _.className = n)
        }

        function i(e, n) {
            return !!~("" + e).indexOf(n)
        }

        function a() {
            return "function" != typeof n.createElement ? n.createElement(arguments[0]) : S ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
        }

        function l(e) {
            return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
                return n + t.toUpperCase()
            }).replace(/^-/, "")
        }

        function f(e, n) {
            return function () {
                return e.apply(n, arguments)
            }
        }

        function u(e, n, t) {
            var o;
            for (var s in e) if (e[s] in n) return t === !1 ? e[s] : (o = n[e[s]], r(o, "function") ? f(o, t || n) : o);
            return !1
        }

        function d(e) {
            return e.replace(/([A-Z])/g, function (e, n) {
                return "-" + n.toLowerCase()
            }).replace(/^ms-/, "-ms-")
        }

        function c() {
            var e = n.body;
            return e || (e = a(S ? "svg" : "body"), e.fake = !0), e
        }

        function p(e, t, r, o) {
            var s, i, l, f, u = "modernizr", d = a("div"), p = c();
            if (parseInt(r, 10)) for (; r--;) l = a("div"), l.id = o ? o[r] : u + (r + 1), d.appendChild(l);
            return s = a("style"), s.type = "text/css", s.id = "s" + u, (p.fake ? p : d).appendChild(s), p.appendChild(d), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(n.createTextNode(e)), d.id = u, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = _.style.overflow, _.style.overflow = "hidden", _.appendChild(p)), i = t(d, e), p.fake ? (p.parentNode.removeChild(p), _.style.overflow = f, _.offsetHeight) : d.parentNode.removeChild(d), !!i
        }

        function m(n, r) {
            var o = n.length;
            if ("CSS" in e && "supports" in e.CSS) {
                for (; o--;) if (e.CSS.supports(d(n[o]), r)) return !0;
                return !1
            }
            if ("CSSSupportsRule" in e) {
                for (var s = []; o--;) s.push("(" + d(n[o]) + ":" + r + ")");
                return s = s.join(" or "), p("@supports (" + s + ") { #modernizr { position: absolute; } }", function (e) {
                    return "absolute" == getComputedStyle(e, null).position
                })
            }
            return t
        }

        function h(e, n, o, s) {
            function f() {
                d && (delete P.style, delete P.modElem)
            }

            if (s = r(s, "undefined") ? !1 : s, !r(o, "undefined")) {
                var u = m(e, o);
                if (!r(u, "undefined")) return u
            }
            for (var d, c, p, h, v, y = ["modernizr", "tspan"]; !P.style;) d = !0, P.modElem = a(y.shift()), P.style = P.modElem.style;
            for (p = e.length, c = 0; p > c; c++) if (h = e[c], v = P.style[h], i(h, "-") && (h = l(h)), P.style[h] !== t) {
                if (s || r(o, "undefined")) return f(), "pfx" == n ? h : !0;
                try {
                    P.style[h] = o
                } catch (g) {
                }
                if (P.style[h] != v) return f(), "pfx" == n ? h : !0
            }
            return f(), !1
        }

        function v(e, n, t, o, s) {
            var i = e.charAt(0).toUpperCase() + e.slice(1), a = (e + " " + b.join(i + " ") + i).split(" ");
            return r(n, "string") || r(n, "undefined") ? h(a, n, o, s) : (a = (e + " " + E.join(i + " ") + i).split(" "), u(a, n, t))
        }

        function y(e, n, r) {
            return v(e, t, t, n, r)
        }

        var g = [], C = [], w = {
            _version: "3.2.0",
            _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
            _q: [],
            on: function (e, n) {
                var t = this;
                setTimeout(function () {
                    n(t[e])
                }, 0)
            },
            addTest: function (e, n, t) {
                C.push({name: e, fn: n, options: t})
            },
            addAsyncTest: function (e) {
                C.push({name: null, fn: e})
            }
        }, Modernizr = function () {
        };
        Modernizr.prototype = w, Modernizr = new Modernizr;
        var _ = n.documentElement, S = "svg" === _.nodeName.toLowerCase(), x = "Moz O ms Webkit",
            b = w._config.usePrefixes ? x.split(" ") : [];
        w._cssomPrefixes = b;
        var E = w._config.usePrefixes ? x.toLowerCase().split(" ") : [];
        w._domPrefixes = E;
        var N = {elem: a("modernizr")};
        Modernizr._q.push(function () {
            delete N.elem
        });
        var P = {style: N.elem.style};
        Modernizr._q.unshift(function () {
            delete P.style
        }), w.testAllProps = v, w.testAllProps = y, Modernizr.addTest("cssanimations", y("animationName", "a", !0)), o(), s(g), delete w.addTest, delete w.addAsyncTest;
        for (var z = 0; z < Modernizr._q.length; z++) Modernizr._q[z]();
        e.Modernizr = Modernizr
    }(window, document);


    var StickyHeader = (() => {
        var d = (e, t) => () => (e && (t = e(e = 0)), t),
            u = (e, t) => () => (t || e((t = {exports: {}}).exports, t), t.exports);

        function h() {
            var e = {}, t = !1, s = 0, n = arguments.length;
            Object.prototype.toString.call(arguments[0]) === "[object Boolean]" && (t = arguments[0], s++);
            for (var i = function (l) {
                for (var o in l) Object.prototype.hasOwnProperty.call(l, o) && (t && Object.prototype.toString.call(l[o]) === "[object Object]" ? e[o] = h(!0, e[o], l[o]) : e[o] = l[o])
            }; s < n; s++) {
                var p = arguments[s];
                i(p)
            }
            return e
        }

        var a = d(() => {
        });
        var g = u((v, c) => {
            a();
            var r = class {
                constructor(t) {
                    this.options = h(!0, {
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
                    }, t || {}), !!(this.el = document.querySelector(this.options.selector)) && (this.options.linkSelector && (this.links = this.el.querySelectorAll(this.options.linkSelector)), this.options.logo.selector && (this.logo = document.querySelector(this.options.logo.selector)), this.lastScrollY = null, this.direction = "", this.lastDirection = "", this.betweenState = !1, this.paused = !1, this.scrollDisabled = !1, this.state = {
                        open: 1,
                        hidden: 2
                    }, this._checkResponsiveBreakpoints(), this._setScrollDirection(), this._updateHeightAndAnimation(), this._updateState(), this._registerEvents(), this.options.onInit.call(this))
                }

                _checkResponsiveBreakpoints() {
                    if (this.responsive = this.options.scrollSettings, !this.options.logo.autoScale && this.options.logo.selector && (this.responsive = h(!0, this.responsive, {
                        logo: {
                            maxHeight: this.options.logo.maxHeight,
                            minHeight: this.options.logo.minHeight
                        }
                    })), this.options.responsive) for (let t in this.options.responsive) window.innerWidth >= t && (this.responsive = h(!0, this.responsive, this.options.responsive[t]))
                }

                _registerEvents() {
                    window.addEventListener("scroll", () => {
                        this.paused || (this._checkLargeScroll(), this._updateState(), this._setScrollDirection())
                    }, {passive: !0}), window.addEventListener("resize", () => {
                        this._checkResponsiveBreakpoints(), this._updateHeightAndAnimation(), !this.paused && this._updateState()
                    }, {passive: !0})
                }

                _checkLargeScroll() {
                    this.lastScrollY - window.scrollY >= this.responsive.stopHeight ? (this._setState(this.state.open), this._updateHeightAndAnimation(), this.direction = "up") : (this.lastScrollY - window.scrollY) * -1 >= this.responsive.stopHeight && (this._setState(this.state.hidden), this._updateHeightAndAnimation(), this.direction = "down")
                }

                _setScrollDirection() {
                    this.lastDirection = this.direction, !this.lastScrollY || this.lastScrollY === window.scrollY ? this.direction = "" : this.lastScrollY < window.scrollY ? this.direction = "down" : this.lastScrollY > window.scrollY && (this.direction = "up"), this.lastScrollY = window.scrollY
                }

                _getPosition() {
                    return this.el.offsetTop + (this.lastScrollY - window.scrollY)
                }

                _updateHeightAndAnimation() {
                    let t = window.scrollY / this.responsive.stopPosition, s = -t + "s", n = -1 + "s";
                    if (window.scrollY <= this.responsive.stopPosition) {
                        if (this.el.style.height = this.responsive.startHeight - (this.responsive.startHeight - this.responsive.stopHeight) * (window.scrollY / this.responsive.stopPosition) + "px", this.el.style.animationDelay = s, this.options.linkSelector) for (let i = 0; i < this.links.length; i++) this.links[i].style.animationDelay = s;
                        this.options.classes.useClasses && this.el.classList.remove(this.options.classes.onStop)
                    } else {
                        if (this.el.style.height = this.responsive.stopHeight + "px", this.el.style.animationDelay = n, this.options.linkSelector) for (let i = 0; i < this.links.length; i++) this.links[i].style.animationDelay = n;
                        this.options.classes.useClasses && this.el.classList.add(this.options.classes.onStop)
                    }
                    this.options.logo.selector && this.logo && this._updateLogoHeight(), this.options.onUpdate.call(this, t)
                }

                _updateLogoHeight() {
                    let t = window.scrollY * 100 / this.responsive.stopPosition,
                        s = this.options.logo.autoScale ? this.responsive.stopHeight / this.responsive.startHeight : this.responsive.logo.minHeight / this.responsive.logo.maxHeight,
                        n = 1 - s;
                    window.scrollY <= this.responsive.stopPosition ? this.logo.style.transform = "scale(" + (1 - n * t / 100).toFixed(3) + ")" : this.logo.style.transform = "scale(" + s.toFixed(3) + ")"
                }

                _setState(t) {
                    switch (t) {
                        case this.state.open:
                            this.el.style.top = 0;
                            break;
                        case this.state.hidden:
                            this.el.style.top = -this.responsive.stopHeight + "px";
                            break
                    }
                    this._setClasses(t)
                }

                _setClasses(t) {
                    if (!!this.options.classes.useClasses) switch (t) {
                        case this.state.open:
                            this.el.classList.add(this.options.classes.isOpen);
                            break;
                        case this.state.hidden:
                            this.el.classList.remove(this.options.classes.isOpen);
                            break
                    }
                }

                _updateState() {
                    this.betweenState ? this._betweenStateHandler() : window.scrollY < this.responsive.breakPosition ? (this._updateHeightAndAnimation(), this._setState(this.state.open)) : window.scrollY >= this.responsive.breakPosition && window.scrollY < this.responsive.breakPosition + this.responsive.stopHeight ? this.betweenState = !0 : this.lastDirection !== this.direction && !!this.lastDirection ? this.betweenState = !0 : this.direction === "down" ? this._setState(this.state.hidden) : this.direction === "up" ? this._setState(this.state.open) : this.direction || (this._setState(this.state.hidden), this.direction = "down")
                }

                _betweenStateHandler() {
                    let t = this._getPosition();
                    switch (this.direction) {
                        case"up":
                            t < 0 ? this.el.style.top = t + "px" : (this._setState(this.state.open), this.betweenState = !1);
                            break;
                        case"down":
                            t <= 0 && t > -this.responsive.stopHeight ? this.el.style.top = t + "px" : (this._setState(this.state.hidden), this.betweenState = !1);
                            break
                    }
                }

                play() {
                    this.scrollDisabled && (document.body.style.overflowY = "", this.scrollDisabled = !1), this.paused = !1, this._updateHeightAndAnimation(), this.options.onPlay.call(this)
                }

                stop(t = !1, s = !1) {
                    t && (this._setState(this.state.open), this.direction = "up"), s && (document.body.style.overflowY = "hidden", this.scrollDisabled = s), this.paused = !0, this.options.onPause.call(this)
                }

                isPaused() {
                    return this.paused
                }
            };
            c.exports = r
        });
        return g();
    })();
//# sourceMappingURL=sticky-header.js.map

    new StickyHeader({
        selector: '.header__bottom',             // Header or container selector
        linkSelector: 'a, strong',
        scrollSettings: {
            startHeight: 100,           // Starting height for the container
            stopHeight: 100,             // StopHeight for the container after reaching the stopPosition
            stopPosition: 1,          // Container will shrink to stopHeight until reaching this position
            breakPosition: 600,         // Hide position
        },
        classes: {
            useClasses: true,          // Toggle classes on or off
            isOpen: 'sh-open',          // Visible and fully open
            onStop: 'sh-stop'           // stopHeight reached
        },
    });

    if (document.querySelectorAll('.news-block__items').length > 0) {
        const swiper = new Swiper('.news-block__items', {
            slidesPerView: 3,
            spaceBetween: 16,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
                0: {
                    slidesPerView: 'auto',
                }
            }
        });
    }


    if (window.innerWidth < 1024) {
        const swiper2 = new Swiper('.about__items', {
            slidesPerView: "auto",
        })
    }


    jQuery(function ($) {
        $('body').on('adding_to_cart', function (e, btn, data) {
            btn.closest('.item').find('.ajax-loader').fadeIn();
        })

        $('body').on('added_to_cart', function (e, responce_fragments, responce_cart_hash, btn) {
            btn.closest('.item').find('.ajax-loader').fadeOut();
        })
    })


    !function (e) {
        var t = 0, n = function e(n, s) {
            var i = this, r = this, o = !1;
            if (Array.isArray(n)) return !!n.length && n.map((function (t) {
                return new e(t, s)
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
                    }, s);
                    var e = "string" == typeof n;
                    this.container = e ? document.querySelector(n) : n, this.createDefinitions(), r.attachEvents()
                }, createDefinitions: function () {
                    var e = this, n = this.options, s = n.elementClass, i = n.openOnInit,
                        r = n.onlyChildNodes ? this.container.childNodes : this.container.querySelectorAll(u(s));
                    this.elements = Array.from(r).filter((function (e) {
                        return e.classList && e.classList.contains(s)
                    })), this.firstElement = this.elements[0], this.lastElement = this.elements[this.elements.length - 1], this.elements.filter((function (e) {
                        return !e.classList.contains("js-enabled")
                    })).forEach((function (n) {
                        n.classList.add("js-enabled"), e.generateIDs(n), e.setARIA(n), e.setTransition(n);
                        var s = e.elements.indexOf(n);
                        t++, i.includes(s) ? e.showElement(n, !1) : e.closeElement(n, !1)
                    }))
                }, setTransition: function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = this.options,
                        s = n.duration, i = n.panelClass, r = e.querySelector(u(i)), o = l("transitionDuration");
                    r.style[o] = t ? null : "".concat(s, "ms")
                }, generateIDs: function (e) {
                    var n = this.options, s = n.triggerClass, i = n.panelClass, r = e.querySelector(u(s)),
                        o = e.querySelector(u(i));
                    e.setAttribute("id", e.id || "ac-".concat(t)), r.setAttribute("id", r.id || "ac-trigger-".concat(t)), o.setAttribute("id", o.id || "ac-panel-".concat(t))
                }, removeIDs: function (e) {
                    var t = this.options, n = t.triggerClass, s = t.panelClass, i = e.querySelector(u(n)),
                        r = e.querySelector(u(s));
                    e.id.startsWith("ac-") && e.removeAttribute("id"), i.id.startsWith("ac-") && i.removeAttribute("id"), r.id.startsWith("ac-") && r.removeAttribute("id")
                }, setARIA: function (e) {
                    var t = this.options, n = t.ariaEnabled, s = t.triggerClass, i = t.panelClass;
                    if (n) {
                        var r = e.querySelector(u(s)), o = e.querySelector(u(i));
                        r.setAttribute("role", "button"), r.setAttribute("aria-controls", o.id), r.setAttribute("aria-disabled", !1), r.setAttribute("aria-expanded", !1), o.setAttribute("role", "region"), o.setAttribute("aria-labelledby", r.id)
                    }
                }, updateARIA: function (e, t) {
                    var n = t.ariaExpanded, s = t.ariaDisabled, i = this.options, r = i.ariaEnabled, o = i.triggerClass;
                    if (r) {
                        var a = e.querySelector(u(o));
                        a.setAttribute("aria-expanded", n), a.setAttribute("aria-disabled", s)
                    }
                }, removeARIA: function (e) {
                    var t = this.options, n = t.ariaEnabled, s = t.triggerClass, i = t.panelClass;
                    if (n) {
                        var r = e.querySelector(u(s)), o = e.querySelector(u(i));
                        r.removeAttribute("role"), r.removeAttribute("aria-controls"), r.removeAttribute("aria-disabled"), r.removeAttribute("aria-expanded"), o.removeAttribute("role"), o.removeAttribute("aria-labelledby")
                    }
                }, focus: function (e, t) {
                    e.preventDefault();
                    var n = this.options.triggerClass;
                    t.querySelector(u(n)).focus()
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
                    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = this.options,
                        s = n.panelClass, i = n.activeClass, r = n.collapse, o = n.beforeOpen;
                    t && o(e);
                    var a = e.querySelector(u(s)), l = a.scrollHeight;
                    e.classList.add(i), requestAnimationFrame((function () {
                        requestAnimationFrame((function () {
                            a.style.height = t ? "".concat(l, "px") : "auto"
                        }))
                    })), this.updateARIA(e, {ariaExpanded: !0, ariaDisabled: !r})
                }, closeElement: function (e) {
                    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = this.options,
                        s = n.panelClass, i = n.activeClass, r = n.beforeClose, o = e.querySelector(u(s)),
                        a = o.scrollHeight;
                    e.classList.remove(i), t ? (r(e), requestAnimationFrame((function () {
                        o.style.height = "".concat(a, "px"), requestAnimationFrame((function () {
                            o.style.height = 0
                        }))
                    }))) : o.style.height = 0, this.updateARIA(e, {ariaExpanded: !1, ariaDisabled: !1})
                }, toggleElement: function (e) {
                    var t = this.options, n = t.activeClass, s = t.collapse, i = e.classList.contains(n);
                    if (!i || s) return i ? this.closeElement(e) : this.showElement(e)
                }, closeElements: function () {
                    var e = this, t = this.options, n = t.activeClass;
                    t.showMultiple || this.elements.forEach((function (t, s) {
                        t.classList.contains(n) && s !== e.currFocusedIdx && e.closeElement(t)
                    }))
                }, handleClick: function (e) {
                    var t = this, n = e.currentTarget;
                    this.elements.forEach((function (s, i) {
                        s.contains(n) && "A" !== e.target.nodeName && (t.currFocusedIdx = i, t.closeElements(), t.focus(e, s), t.toggleElement(s))
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
                    var t = e.currentTarget, n = this.elements.find((function (e) {
                        return e.contains(t)
                    }));
                    this.currFocusedIdx = this.elements.indexOf(n)
                }, handleTransitionEnd: function (e) {
                    if (e.stopPropagation(), "height" === e.propertyName) {
                        var t = this.options, n = t.onOpen, s = t.onClose, i = e.currentTarget,
                            r = parseInt(i.style.height), o = this.elements.find((function (e) {
                                return e.contains(i)
                            }));
                        r > 0 ? (i.style.height = "auto", n(o)) : s(o)
                    }
                }
            };
            this.attachEvents = function () {
                if (!o) {
                    var e = a.options, t = e.triggerClass, n = e.panelClass;
                    a.handleClick = a.handleClick.bind(a), a.handleKeydown = a.handleKeydown.bind(a), a.handleFocus = a.handleFocus.bind(a), a.handleTransitionEnd = a.handleTransitionEnd.bind(a), a.elements.forEach((function (e) {
                        var s = e.querySelector(u(t)), i = e.querySelector(u(n));
                        s.addEventListener("click", a.handleClick), s.addEventListener("keydown", a.handleKeydown), s.addEventListener("focus", a.handleFocus), i.addEventListener("webkitTransitionEnd", a.handleTransitionEnd), i.addEventListener("transitionend", a.handleTransitionEnd)
                    })), o = !0
                }
            }, this.detachEvents = function () {
                if (o) {
                    var e = a.options, t = e.triggerClass, n = e.panelClass;
                    a.elements.forEach((function (e) {
                        var s = e.querySelector(u(t)), i = e.querySelector(u(n));
                        s.removeEventListener("click", a.handleClick), s.removeEventListener("keydown", a.handleKeydown), s.removeEventListener("focus", a.handleFocus), i.removeEventListener("webkitTransitionEnd", a.handleTransitionEnd), i.removeEventListener("transitionend", a.handleTransitionEnd)
                    })), o = !1
                }
            }, this.toggle = function (e) {
                var t = a.elements[e];
                t && a.toggleElement(t)
            }, this.open = function (e) {
                var t = a.elements[e];
                t && a.showElement(t)
            }, this.openAll = function () {
                var e = a.options, t = e.activeClass, n = e.onOpen;
                a.elements.forEach((function (e) {
                    e.classList.contains(t) || (a.showElement(e, !1), n(e))
                }))
            }, this.close = function (e) {
                var t = a.elements[e];
                t && a.closeElement(t)
            }, this.closeAll = function () {
                var e = a.options, t = e.activeClass, n = e.onClose;
                a.elements.forEach((function (e) {
                    e.classList.contains(t) && (a.closeElement(e, !1), n(e))
                }))
            }, this.destroy = function () {
                i.detachEvents(), i.openAll(), a.elements.forEach((function (e) {
                    a.removeIDs(e), a.removeARIA(e), a.setTransition(e, !0)
                })), o = !0
            }, this.update = function () {
                a.createDefinitions(), i.detachEvents(), i.attachEvents()
            };
            var l = function (e) {
                return "string" == typeof document.documentElement.style[e] ? e : (e = c(e), e = "webkit".concat(e))
            }, c = function (e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }, u = function (e) {
                return ".".concat(CSS.escape(e))
            };
            a.init()
        };
        "undefined" != typeof module && void 0 !== module.exports ? module.exports = n : e.Accordion = n
    }(window);
    if (document.querySelector('.accordion-container')) {
        new Accordion('.accordion-container');
    }




    // parallax
    // const wrapper = document.querySelector('.parallax');
    // const layers = document.querySelectorAll('.parallax__layer');
    //
    // const handleParallax = (evt) => {
    //     //размер области просмотра
    //     const parallaxLeftOffset = wrapper.getBoundingClientRect().left;
    //     const parallaxTopOffset = wrapper.getBoundingClientRect().top;
    //
    //     // координаты центра экрана
    //     const coordX = evt.clientX - parallaxLeftOffset - 0.5 * wrapper.offsetWidth;
    //     const coordY = evt.clientY - parallaxTopOffset - 0.5 *  wrapper.offsetHeight;
    //
    //     layers.forEach((layer)=>{
    //         const layerSpeed = layer.dataset.speed;
    //         const x = - (coordX * layerSpeed).toFixed(2);
    //         const y = - (coordY * layerSpeed).toFixed(2);
    //         layer.setAttribute('style', `transform: translate(${x}px, ${y}px);`)
    //     });
    // };
    //
    // const reset = () => {
    //     layers.forEach((layer)=>{
    //         layer.removeAttribute('style');
    //     });
    // }
    //
    // wrapper.addEventListener('mousemove', handleParallax);
    // wrapper.addEventListener('mouseout', reset);



})

