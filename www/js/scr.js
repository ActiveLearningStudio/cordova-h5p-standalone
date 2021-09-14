var oldTether = window.Tether;
! function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e(require, exports, module) : t.Tether = e()
}(this, function(t, e, o) {
    "use strict";
    console.log("sdfg")
    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function n(t) {
        var e = getComputedStyle(t),
            o = e.position;
        if ("fixed" === o) return t;
        for (var i = t; i = i.parentNode;) {
            var n = void 0;
            try {
                n = getComputedStyle(i)
            } catch (r) {}
            if ("undefined" == typeof n || null === n) return i;
            var s = n.overflow,
                a = n.overflowX,
                f = n.overflowY;
            if (/(auto|scroll)/.test(s + f + a) && ("absolute" !== o || ["relative", "absolute", "fixed"].indexOf(n.position) >= 0)) return i
        }
        return document.body
    }

    function r(t) {
        var e = void 0;
        t === document ? (e = document, t = document.documentElement) : e = t.ownerDocument;
        var o = e.documentElement,
            i = {},
            n = t.getBoundingClientRect();
        for (var r in n) i[r] = n[r];
        var s = x(e);
        return i.top -= s.top, i.left -= s.left, "undefined" == typeof i.width && (i.width = document.body.scrollWidth - i.left - i.right), "undefined" == typeof i.height && (i.height = document.body.scrollHeight - i.top - i.bottom), i.top = i.top - o.clientTop, i.left = i.left - o.clientLeft, i.right = e.body.clientWidth - i.width - i.left, i.bottom = e.body.clientHeight - i.height - i.top, i
    }

    function s(t) {
        return t.offsetParent || document.documentElement
    }

    function a() {
        var t = document.createElement("div");
        t.style.width = "100%", t.style.height = "200px";
        var e = document.createElement("div");
        f(e.style, {
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            visibility: "hidden",
            width: "200px",
            height: "150px",
            overflow: "hidden"
        }), e.appendChild(t), document.body.appendChild(e);
        var o = t.offsetWidth;
        e.style.overflow = "scroll";
        var i = t.offsetWidth;
        o === i && (i = e.clientWidth), document.body.removeChild(e);
        var n = o - i;
        return {
            width: n,
            height: n
        }
    }

    function f() {
        var t = void 0 === arguments[0] ? {} : arguments[0],
            e = [];
        return Array.prototype.push.apply(e, arguments), e.slice(1).forEach(function(e) {
            if (e)
                for (var o in e)({}).hasOwnProperty.call(e, o) && (t[o] = e[o])
        }), t
    }

    function h(t, e) {
        if ("undefined" != typeof t.classList) e.split(" ").forEach(function(e) {
            e.trim() && t.classList.remove(e)
        });
        else {
            var o = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"),
                i = u(t).replace(o, " ");
            p(t, i)
        }
    }

    function l(t, e) {
        if ("undefined" != typeof t.classList) e.split(" ").forEach(function(e) {
            e.trim() && t.classList.add(e)
        });
        else {
            h(t, e);
            var o = u(t) + (" " + e);
            p(t, o)
        }
    }

    function d(t, e) {
        if ("undefined" != typeof t.classList) return t.classList.contains(e);
        var o = u(t);
        return new RegExp("(^| )" + e + "( |$)", "gi").test(o)
    }

    function u(t) {
        return t.className instanceof SVGAnimatedString ? t.className.baseVal : t.className
    }

    function p(t, e) {
        t.setAttribute("class", e)
    }

    function c(t, e, o) {
        o.forEach(function(o) {
            -1 === e.indexOf(o) && d(t, o) && h(t, o)
        }), e.forEach(function(e) {
            d(t, e) || l(t, e)
        })
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function g(t, e) {
        var o = void 0 === arguments[2] ? 1 : arguments[2];
        return t + o >= e && e >= t - o
    }

    function m() {
        return "undefined" != typeof performance && "undefined" != typeof performance.now ? performance.now() : +new Date
    }

    function v() {
        for (var t = {
                top: 0,
                left: 0
            }, e = arguments.length, o = Array(e), i = 0; e > i; i++) o[i] = arguments[i];
        return o.forEach(function(e) {
            var o = e.top,
                i = e.left;
            "string" == typeof o && (o = parseFloat(o, 10)), "string" == typeof i && (i = parseFloat(i, 10)), t.top += o, t.left += i
        }), t
    }

    function y(t, e) {
        return "string" == typeof t.left && -1 !== t.left.indexOf("%") && (t.left = parseFloat(t.left, 10) / 100 * e.width), "string" == typeof t.top && -1 !== t.top.indexOf("%") && (t.top = parseFloat(t.top, 10) / 100 * e.height), t
    }

    function b(t, e) {
        return "scrollParent" === e ? e = t.scrollParent : "window" === e && (e = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]), e === document && (e = e.documentElement), "undefined" != typeof e.nodeType && ! function() {
            var t = r(e),
                o = t,
                i = getComputedStyle(e);
            e = [o.left, o.top, t.width + o.left, t.height + o.top], U.forEach(function(t, o) {
                t = t[0].toUpperCase() + t.substr(1), "Top" === t || "Left" === t ? e[o] += parseFloat(i["border" + t + "Width"]) : e[o] -= parseFloat(i["border" + t + "Width"])
            })
        }(), e
    }
    var w = function() {
            function t(t, e) {
                for (var o = 0; o < e.length; o++) {
                    var i = e[o];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, o, i) {
                return o && t(e.prototype, o), i && t(e, i), e
            }
        }(),
        C = void 0;
    "undefined" == typeof C && (C = {
        modules: []
    });
    var O = function() {
            var t = 0;
            return function() {
                return ++t
            }
        }(),
        E = {},
        x = function(t) {
            var e = t._tetherZeroElement;
            "undefined" == typeof e && (e = t.createElement("div"), e.setAttribute("data-tether-id", O()), f(e.style, {
                top: 0,
                left: 0,
                position: "absolute"
            }), t.body.appendChild(e), t._tetherZeroElement = e);
            var o = e.getAttribute("data-tether-id");
            if ("undefined" == typeof E[o]) {
                E[o] = {};
                var i = e.getBoundingClientRect();
                for (var n in i) E[o][n] = i[n];
                T(function() {
                    delete E[o]
                })
            }
            return E[o]
        },
        A = [],
        T = function(t) {
            A.push(t)
        },
        S = function() {
            for (var t = void 0; t = A.pop();) t()
        },
        W = function() {
            function t() {
                i(this, t)
            }
            return w(t, [{
                key: "on",
                value: function(t, e, o) {
                    var i = void 0 === arguments[3] ? !1 : arguments[3];
                    "undefined" == typeof this.bindings && (this.bindings = {}), "undefined" == typeof this.bindings[t] && (this.bindings[t] = []), this.bindings[t].push({
                        handler: e,
                        ctx: o,
                        once: i
                    })
                }
            }, {
                key: "once",
                value: function(t, e, o) {
                    this.on(t, e, o, !0)
                }
            }, {
                key: "off",
                value: function(t, e) {
                    if ("undefined" == typeof this.bindings || "undefined" == typeof this.bindings[t])
                        if ("undefined" == typeof e) delete this.bindings[t];
                        else
                            for (var o = 0; o < this.bindings[t].length;) this.bindings[t][o].handler === e ? this.bindings[t].splice(o, 1) : ++o
                }
            }, {
                key: "trigger",
                value: function(t) {
                    if ("undefined" != typeof this.bindings && this.bindings[t])
                        for (var e = 0; e < this.bindings[t].length;) {
                            var o = this.bindings[t][e],
                                i = o.handler,
                                n = o.ctx,
                                r = o.once,
                                s = n;
                            "undefined" == typeof s && (s = this);
                            for (var a = arguments.length, f = Array(a > 1 ? a - 1 : 0), h = 1; a > h; h++) f[h - 1] = arguments[h];
                            i.apply(s, f), r ? this.bindings[t].splice(e, 1) : ++e
                        }
                }
            }]), t
        }();
    C.Utils = {
        getScrollParent: n,
        getBounds: r,
        getOffsetParent: s,
        extend: f,
        addClass: l,
        removeClass: h,
        hasClass: d,
        updateClasses: c,
        defer: T,
        flush: S,
        uniqueId: O,
        Evented: W,
        getScrollBarSize: a
    };
    var M = function() {
            function t(t, e) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e); i = !0);
                } catch (f) {
                    n = !0, r = f
                } finally {
                    try {
                        !i && a["return"] && a["return"]()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }
            return function(e, o) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, o);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        w = function() {
            function t(t, e) {
                for (var o = 0; o < e.length; o++) {
                    var i = e[o];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, o, i) {
                return o && t(e.prototype, o), i && t(e, i), e
            }
        }();
    if ("undefined" == typeof C) throw new Error("You must include the utils.js file before tether.js");
    var P = C.Utils,
        n = P.getScrollParent,
        r = P.getBounds,
        s = P.getOffsetParent,
        f = P.extend,
        l = P.addClass,
        h = P.removeClass,
        c = P.updateClasses,
        T = P.defer,
        S = P.flush,
        a = P.getScrollBarSize,
        k = function() {
            for (var t = document.createElement("div"), e = ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"], o = 0; o < e.length; ++o) {
                var i = e[o];
                if (void 0 !== t.style[i]) return i
            }
        }(),
        B = [],
        _ = function() {
            B.forEach(function(t) {
                t.position(!1)
            }), S()
        };
    ! function() {
        var t = null,
            e = null,
            o = null,
            i = function n() {
                return "undefined" != typeof e && e > 16 ? (e = Math.min(e - 16, 250), void(o = setTimeout(n, 250))) : void("undefined" != typeof t && m() - t < 10 || ("undefined" != typeof o && (clearTimeout(o), o = null), t = m(), _(), e = m() - t))
            };
        ["resize", "scroll", "touchmove"].forEach(function(t) {
            window.addEventListener(t, i)
        })
    }();
    var z = {
            center: "center",
            left: "right",
            right: "left"
        },
        F = {
            middle: "middle",
            top: "bottom",
            bottom: "top"
        },
        L = {
            top: 0,
            left: 0,
            middle: "50%",
            center: "50%",
            bottom: "100%",
            right: "100%"
        },
        Y = function(t, e) {
            var o = t.left,
                i = t.top;
            return "auto" === o && (o = z[e.left]), "auto" === i && (i = F[e.top]), {
                left: o,
                top: i
            }
        },
        H = function(t) {
            var e = t.left,
                o = t.top;
            return "undefined" != typeof L[t.left] && (e = L[t.left]), "undefined" != typeof L[t.top] && (o = L[t.top]), {
                left: e,
                top: o
            }
        },
        X = function(t) {
            var e = t.split(" "),
                o = M(e, 2),
                i = o[0],
                n = o[1];
            return {
                top: i,
                left: n
            }
        },
        j = X,
        N = function() {
            function t(e) {
                var o = this;
                i(this, t), this.position = this.position.bind(this), B.push(this), this.history = [], this.setOptions(e, !1), C.modules.forEach(function(t) {
                    "undefined" != typeof t.initialize && t.initialize.call(o)
                }), this.position()
            }
            return w(t, [{
                key: "getClass",
                value: function() {
                    var t = void 0 === arguments[0] ? "" : arguments[0],
                        e = this.options.classes;
                    return "undefined" != typeof e && e[t] ? this.options.classes[t] : this.options.classPrefix ? this.options.classPrefix + "-" + t : t
                }
            }, {
                key: "setOptions",
                value: function(t) {
                    var e = this,
                        o = void 0 === arguments[1] ? !0 : arguments[1],
                        i = {
                            offset: "0 0",
                            targetOffset: "0 0",
                            targetAttachment: "auto auto",
                            classPrefix: "tether"
                        };
                    this.options = f(i, t);
                    var r = this.options,
                        s = r.element,
                        a = r.target,
                        h = r.targetModifier;
                    if (this.element = s, this.target = a, this.targetModifier = h, "viewport" === this.target ? (this.target = document.body, this.targetModifier = "visible") : "scroll-handle" === this.target && (this.target = document.body, this.targetModifier = "scroll-handle"), ["element", "target"].forEach(function(t) {
                            if ("undefined" == typeof e[t]) throw new Error("Tether Error: Both element and target must be defined");
                            "undefined" != typeof e[t].jquery ? e[t] = e[t][0] : "string" == typeof e[t] && (e[t] = document.querySelector(e[t]))
                        }), l(this.element, this.getClass("element")), this.options.addTargetClasses !== !1 && l(this.target, this.getClass("target")), !this.options.attachment) throw new Error("Tether Error: You must provide an attachment");
                    this.targetAttachment = j(this.options.targetAttachment), this.attachment = j(this.options.attachment), this.offset = X(this.options.offset), this.targetOffset = X(this.options.targetOffset), "undefined" != typeof this.scrollParent && this.disable(), this.scrollParent = "scroll-handle" === this.targetModifier ? this.target : n(this.target), this.options.enabled !== !1 && this.enable(o)
                }
            }, {
                key: "getTargetBounds",
                value: function() {
                    if ("undefined" == typeof this.targetModifier) return r(this.target);
                    if ("visible" === this.targetModifier) {
                        if (this.target === document.body) return {
                            top: pageYOffset,
                            left: pageXOffset,
                            height: innerHeight,
                            width: innerWidth
                        };
                        var t = r(this.target),
                            e = {
                                height: t.height,
                                width: t.width,
                                top: t.top,
                                left: t.left
                            };
                        return e.height = Math.min(e.height, t.height - (pageYOffset - t.top)), e.height = Math.min(e.height, t.height - (t.top + t.height - (pageYOffset + innerHeight))), e.height = Math.min(innerHeight, e.height), e.height -= 2, e.width = Math.min(e.width, t.width - (pageXOffset - t.left)), e.width = Math.min(e.width, t.width - (t.left + t.width - (pageXOffset + innerWidth))), e.width = Math.min(innerWidth, e.width), e.width -= 2, e.top < pageYOffset && (e.top = pageYOffset), e.left < pageXOffset && (e.left = pageXOffset), e
                    }
                    if ("scroll-handle" === this.targetModifier) {
                        var t = void 0,
                            o = this.target;
                        o === document.body ? (o = document.documentElement, t = {
                            left: pageXOffset,
                            top: pageYOffset,
                            height: innerHeight,
                            width: innerWidth
                        }) : t = r(o);
                        var i = getComputedStyle(o),
                            n = o.scrollWidth > o.clientWidth || [i.overflow, i.overflowX].indexOf("scroll") >= 0 || this.target !== document.body,
                            s = 0;
                        n && (s = 15);
                        var a = t.height - parseFloat(i.borderTopWidth) - parseFloat(i.borderBottomWidth) - s,
                            e = {
                                width: 15,
                                height: .975 * a * (a / o.scrollHeight),
                                left: t.left + t.width - parseFloat(i.borderLeftWidth) - 15
                            },
                            f = 0;
                        408 > a && this.target === document.body && (f = -11e-5 * Math.pow(a, 2) - .00727 * a + 22.58), this.target !== document.body && (e.height = Math.max(e.height, 24));
                        var h = this.target.scrollTop / (o.scrollHeight - a);
                        return e.top = h * (a - e.height - f) + t.top + parseFloat(i.borderTopWidth), this.target === document.body && (e.height = Math.max(e.height, 24)), e
                    }
                }
            }, {
                key: "clearCache",
                value: function() {
                    this._cache = {}
                }
            }, {
                key: "cache",
                value: function(t, e) {
                    return "undefined" == typeof this._cache && (this._cache = {}), "undefined" == typeof this._cache[t] && (this._cache[t] = e.call(this)), this._cache[t]
                }
            }, {
                key: "enable",
                value: function() {
                    var t = void 0 === arguments[0] ? !0 : arguments[0];
                    this.options.addTargetClasses !== !1 && l(this.target, this.getClass("enabled")), l(this.element, this.getClass("enabled")), this.enabled = !0, this.scrollParent !== document && this.scrollParent.addEventListener("scroll", this.position), t && this.position()
                }
            }, {
                key: "disable",
                value: function() {
                    h(this.target, this.getClass("enabled")), h(this.element, this.getClass("enabled")), this.enabled = !1, "undefined" != typeof this.scrollParent && this.scrollParent.removeEventListener("scroll", this.position)
                }
            }, {
                key: "destroy",
                value: function() {
                    var t = this;
                    this.disable(), B.forEach(function(e, o) {
                        return e === t ? void B.splice(o, 1) : void 0
                    })
                }
            }, {
                key: "updateAttachClasses",
                value: function(t, e) {
                    var o = this;
                    t = t || this.attachment, e = e || this.targetAttachment;
                    var i = ["left", "top", "bottom", "right", "middle", "center"];
                    "undefined" != typeof this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length), "undefined" == typeof this._addAttachClasses && (this._addAttachClasses = []);
                    var n = this._addAttachClasses;
                    t.top && n.push(this.getClass("element-attached") + "-" + t.top), t.left && n.push(this.getClass("element-attached") + "-" + t.left), e.top && n.push(this.getClass("target-attached") + "-" + e.top), e.left && n.push(this.getClass("target-attached") + "-" + e.left);
                    var r = [];
                    i.forEach(function(t) {
                        r.push(o.getClass("element-attached") + "-" + t), r.push(o.getClass("target-attached") + "-" + t)
                    }), T(function() {
                        "undefined" != typeof o._addAttachClasses && (c(o.element, o._addAttachClasses, r), o.options.addTargetClasses !== !1 && c(o.target, o._addAttachClasses, r), delete o._addAttachClasses)
                    })
                }
            }, {
                key: "position",
                value: function() {
                    var t = this,
                        e = void 0 === arguments[0] ? !0 : arguments[0];
                    if (this.enabled) {
                        this.clearCache();
                        var o = Y(this.targetAttachment, this.attachment);
                        this.updateAttachClasses(this.attachment, o);
                        var i = this.cache("element-bounds", function() {
                                return r(t.element)
                            }),
                            n = i.width,
                            f = i.height;
                        if (0 === n && 0 === f && "undefined" != typeof this.lastSize) {
                            var h = this.lastSize;
                            n = h.width, f = h.height
                        } else this.lastSize = {
                            width: n,
                            height: f
                        };
                        var l = this.cache("target-bounds", function() {
                                return t.getTargetBounds()
                            }),
                            d = l,
                            u = y(H(this.attachment), {
                                width: n,
                                height: f
                            }),
                            p = y(H(o), d),
                            c = y(this.offset, {
                                width: n,
                                height: f
                            }),
                            g = y(this.targetOffset, d);
                        u = v(u, c), p = v(p, g);
                        for (var m = l.left + p.left - u.left, b = l.top + p.top - u.top, w = 0; w < C.modules.length; ++w) {
                            var O = C.modules[w],
                                E = O.position.call(this, {
                                    left: m,
                                    top: b,
                                    targetAttachment: o,
                                    targetPos: l,
                                    elementPos: i,
                                    offset: u,
                                    targetOffset: p,
                                    manualOffset: c,
                                    manualTargetOffset: g,
                                    scrollbarSize: A,
                                    attachment: this.attachment
                                });
                            if (E === !1) return !1;
                            "undefined" != typeof E && "object" == typeof E && (b = E.top, m = E.left)
                        }
                        var x = {
                                page: {
                                    top: b,
                                    left: m
                                },
                                viewport: {
                                    top: b - pageYOffset,
                                    bottom: pageYOffset - b - f + innerHeight,
                                    left: m - pageXOffset,
                                    right: pageXOffset - m - n + innerWidth
                                }
                            },
                            A = void 0;
                        return document.body.scrollWidth > window.innerWidth && (A = this.cache("scrollbar-size", a), x.viewport.bottom -= A.height), document.body.scrollHeight > window.innerHeight && (A = this.cache("scrollbar-size", a), x.viewport.right -= A.width), (-1 === ["", "static"].indexOf(document.body.style.position) || -1 === ["", "static"].indexOf(document.body.parentElement.style.position)) && (x.page.bottom = document.body.scrollHeight - b - f, x.page.right = document.body.scrollWidth - m - n), "undefined" != typeof this.options.optimizations && this.options.optimizations.moveElement !== !1 && "undefined" == typeof this.targetModifier && ! function() {
                            var e = t.cache("target-offsetparent", function() {
                                    return s(t.target)
                                }),
                                o = t.cache("target-offsetparent-bounds", function() {
                                    return r(e)
                                }),
                                i = getComputedStyle(e),
                                n = o,
                                a = {};
                            if (["Top", "Left", "Bottom", "Right"].forEach(function(t) {
                                    a[t.toLowerCase()] = parseFloat(i["border" + t + "Width"])
                                }), o.right = document.body.scrollWidth - o.left - n.width + a.right, o.bottom = document.body.scrollHeight - o.top - n.height + a.bottom, x.page.top >= o.top + a.top && x.page.bottom >= o.bottom && x.page.left >= o.left + a.left && x.page.right >= o.right) {
                                var f = e.scrollTop,
                                    h = e.scrollLeft;
                                x.offset = {
                                    top: x.page.top - o.top + f - a.top,
                                    left: x.page.left - o.left + h - a.left
                                }
                            }
                        }(), this.move(x), this.history.unshift(x), this.history.length > 3 && this.history.pop(), e && S(), !0
                    }
                }
            }, {
                key: "move",
                value: function(t) {
                    var e = this;
                    if ("undefined" != typeof this.element.parentNode) {
                        var o = {};
                        for (var i in t) {
                            o[i] = {};
                            for (var n in t[i]) {
                                for (var r = !1, a = 0; a < this.history.length; ++a) {
                                    var h = this.history[a];
                                    if ("undefined" != typeof h[i] && !g(h[i][n], t[i][n])) {
                                        r = !0;
                                        break
                                    }
                                }
                                r || (o[i][n] = !0)
                            }
                        }
                        var l = {
                                top: "",
                                left: "",
                                right: "",
                                bottom: ""
                            },
                            d = function(t, o) {
                                var i = "undefined" != typeof e.options.optimizations,
                                    n = i ? e.options.optimizations.gpu : null;
                                if (n !== !1) {
                                    var r = void 0,
                                        s = void 0;
                                    t.top ? (l.top = 0, r = o.top) : (l.bottom = 0, r = -o.bottom), t.left ? (l.left = 0, s = o.left) : (l.right = 0, s = -o.right), l[k] = "translateX(" + Math.round(s) + "px) translateY(" + Math.round(r) + "px)", "msTransform" !== k && (l[k] += " translateZ(0)")
                                } else t.top ? l.top = o.top + "px" : l.bottom = o.bottom + "px", t.left ? l.left = o.left + "px" : l.right = o.right + "px"
                            },
                            u = !1;
                        (o.page.top || o.page.bottom) && (o.page.left || o.page.right) ? (l.position = "absolute", d(o.page, t.page)) : (o.viewport.top || o.viewport.bottom) && (o.viewport.left || o.viewport.right) ? (l.position = "fixed", d(o.viewport, t.viewport)) : "undefined" != typeof o.offset && o.offset.top && o.offset.left ? ! function() {
                            l.position = "absolute";
                            var i = e.cache("target-offsetparent", function() {
                                return s(e.target)
                            });
                            s(e.element) !== i && T(function() {
                                e.element.parentNode.removeChild(e.element), i.appendChild(e.element)
                            }), d(o.offset, t.offset), u = !0
                        }() : (l.position = "absolute", d({
                            top: !0,
                            left: !0
                        }, t.page)), u || "BODY" === this.element.parentNode.tagName || (this.element.parentNode.removeChild(this.element), document.body.appendChild(this.element));
                        var p = {},
                            c = !1;
                        for (var n in l) {
                            var m = l[n],
                                v = this.element.style[n];
                            "" !== v && "" !== m && ["top", "left", "bottom", "right"].indexOf(n) >= 0 && (v = parseFloat(v), m = parseFloat(m)), v !== m && (c = !0, p[n] = m)
                        }
                        c && T(function() {
                            f(e.element.style, p)
                        })
                    }
                }
            }]), t
        }();
    N.modules = [], C.position = _;
    var R = f(N, C),
        M = function() {
            function t(t, e) {
                var o = [],
                    i = !0,
                    n = !1,
                    r = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e); i = !0);
                } catch (f) {
                    n = !0, r = f
                } finally {
                    try {
                        !i && a["return"] && a["return"]()
                    } finally {
                        if (n) throw r
                    }
                }
                return o
            }
            return function(e, o) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, o);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        P = C.Utils,
        r = P.getBounds,
        f = P.extend,
        c = P.updateClasses,
        T = P.defer,
        U = ["left", "top", "right", "bottom"];
    C.modules.push({
        position: function(t) {
            var e = this,
                o = t.top,
                i = t.left,
                n = t.targetAttachment;
            if (!this.options.constraints) return !0;
            var s = this.cache("element-bounds", function() {
                    return r(e.element)
                }),
                a = s.height,
                h = s.width;
            if (0 === h && 0 === a && "undefined" != typeof this.lastSize) {
                var l = this.lastSize;
                h = l.width, a = l.height
            }
            var d = this.cache("target-bounds", function() {
                    return e.getTargetBounds()
                }),
                u = d.height,
                p = d.width,
                g = [this.getClass("pinned"), this.getClass("out-of-bounds")];
            this.options.constraints.forEach(function(t) {
                var e = t.outOfBoundsClass,
                    o = t.pinnedClass;
                e && g.push(e), o && g.push(o)
            }), g.forEach(function(t) {
                ["left", "top", "right", "bottom"].forEach(function(e) {
                    g.push(t + "-" + e)
                })
            });
            var m = [],
                v = f({}, n),
                y = f({}, this.attachment);
            return this.options.constraints.forEach(function(t) {
                var r = t.to,
                    s = t.attachment,
                    f = t.pin;
                "undefined" == typeof s && (s = "");
                var l = void 0,
                    d = void 0;
                if (s.indexOf(" ") >= 0) {
                    var c = s.split(" "),
                        g = M(c, 2);
                    d = g[0], l = g[1]
                } else l = d = s;
                var w = b(e, r);
                ("target" === d || "both" === d) && (o < w[1] && "top" === v.top && (o += u, v.top = "bottom"), o + a > w[3] && "bottom" === v.top && (o -= u, v.top = "top")), "together" === d && (o < w[1] && "top" === v.top && ("bottom" === y.top ? (o += u, v.top = "bottom", o += a, y.top = "top") : "top" === y.top && (o += u, v.top = "bottom", o -= a, y.top = "bottom")), o + a > w[3] && "bottom" === v.top && ("top" === y.top ? (o -= u, v.top = "top", o -= a, y.top = "bottom") : "bottom" === y.top && (o -= u, v.top = "top", o += a, y.top = "top")), "middle" === v.top && (o + a > w[3] && "top" === y.top ? (o -= a, y.top = "bottom") : o < w[1] && "bottom" === y.top && (o += a, y.top = "top"))), ("target" === l || "both" === l) && (i < w[0] && "left" === v.left && (i += p, v.left = "right"), i + h > w[2] && "right" === v.left && (i -= p, v.left = "left")), "together" === l && (i < w[0] && "left" === v.left ? "right" === y.left ? (i += p, v.left = "right", i += h, y.left = "left") : "left" === y.left && (i += p, v.left = "right", i -= h, y.left = "right") : i + h > w[2] && "right" === v.left ? "left" === y.left ? (i -= p, v.left = "left", i -= h, y.left = "right") : "right" === y.left && (i -= p, v.left = "left", i += h, y.left = "left") : "center" === v.left && (i + h > w[2] && "left" === y.left ? (i -= h, y.left = "right") : i < w[0] && "right" === y.left && (i += h, y.left = "left"))), ("element" === d || "both" === d) && (o < w[1] && "bottom" === y.top && (o += a, y.top = "top"), o + a > w[3] && "top" === y.top && (o -= a, y.top = "bottom")), ("element" === l || "both" === l) && (i < w[0] && "right" === y.left && (i += h, y.left = "left"), i + h > w[2] && "left" === y.left && (i -= h, y.left = "right")), "string" == typeof f ? f = f.split(",").map(function(t) {
                    return t.trim()
                }) : f === !0 && (f = ["top", "left", "right", "bottom"]), f = f || [];
                var C = [],
                    O = [];
                o < w[1] && (f.indexOf("top") >= 0 ? (o = w[1], C.push("top")) : O.push("top")), o + a > w[3] && (f.indexOf("bottom") >= 0 ? (o = w[3] - a, C.push("bottom")) : O.push("bottom")), i < w[0] && (f.indexOf("left") >= 0 ? (i = w[0], C.push("left")) : O.push("left")), i + h > w[2] && (f.indexOf("right") >= 0 ? (i = w[2] - h, C.push("right")) : O.push("right")), C.length && ! function() {
                    var t = void 0;
                    t = "undefined" != typeof e.options.pinnedClass ? e.options.pinnedClass : e.getClass("pinned"), m.push(t), C.forEach(function(e) {
                        m.push(t + "-" + e)
                    })
                }(), O.length && ! function() {
                    var t = void 0;
                    t = "undefined" != typeof e.options.outOfBoundsClass ? e.options.outOfBoundsClass : e.getClass("out-of-bounds"), m.push(t), O.forEach(function(e) {
                        m.push(t + "-" + e)
                    })
                }(), (C.indexOf("left") >= 0 || C.indexOf("right") >= 0) && (y.left = v.left = !1), (C.indexOf("top") >= 0 || C.indexOf("bottom") >= 0) && (y.top = v.top = !1), (v.top !== n.top || v.left !== n.left || y.top !== e.attachment.top || y.left !== e.attachment.left) && e.updateAttachClasses(y, v)
            }), T(function() {
                e.options.addTargetClasses !== !1 && c(e.target, m, g), c(e.element, m, g)
            }), {
                top: o,
                left: i
            }
        }
    });
    var P = C.Utils,
        r = P.getBounds,
        c = P.updateClasses,
        T = P.defer;
    C.modules.push({
        position: function(t) {
            var e = this,
                o = t.top,
                i = t.left,
                n = this.cache("element-bounds", function() {
                    return r(e.element)
                }),
                s = n.height,
                a = n.width,
                f = this.getTargetBounds(),
                h = o + s,
                l = i + a,
                d = [];
            o <= f.bottom && h >= f.top && ["left", "right"].forEach(function(t) {
                var e = f[t];
                (e === i || e === l) && d.push(t)
            }), i <= f.right && l >= f.left && ["top", "bottom"].forEach(function(t) {
                var e = f[t];
                (e === o || e === h) && d.push(t)
            });
            var u = [],
                p = [],
                g = ["left", "top", "right", "bottom"];
            return u.push(this.getClass("abutted")), g.forEach(function(t) {
                u.push(e.getClass("abutted") + "-" + t)
            }), d.length && p.push(this.getClass("abutted")), d.forEach(function(t) {
                p.push(e.getClass("abutted") + "-" + t)
            }), T(function() {
                e.options.addTargetClasses !== !1 && c(e.target, p, u), c(e.element, p, u)
            }), !0
        }
    });
    var M = function() {
        function t(t, e) {
            var o = [],
                i = !0,
                n = !1,
                r = void 0;
            try {
                for (var s, a = t[Symbol.iterator](); !(i = (s = a.next()).done) && (o.push(s.value), !e || o.length !== e); i = !0);
            } catch (f) {
                n = !0, r = f
            } finally {
                try {
                    !i && a["return"] && a["return"]()
                } finally {
                    if (n) throw r
                }
            }
            return o
        }
        return function(e, o) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return t(e, o);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    return C.modules.push({
        position: function(t) {
            var e = t.top,
                o = t.left;
            if (this.options.shift) {
                var i = this.options.shift;
                "function" == typeof this.options.shift && (i = this.options.shift.call(this, {
                    top: e,
                    left: o
                }));
                var n = void 0,
                    r = void 0;
                if ("string" == typeof i) {
                    i = i.split(" "), i[1] = i[1] || i[0];
                    var s = M(i, 2);
                    n = s[0], r = s[1], n = parseFloat(n, 10), r = parseFloat(r, 10)
                } else n = i.top, r = i.left;
                return e += n, o += r, {
                    top: e,
                    left: o
                }
            }
        }
    }), R
});
H5P.Tether = Tether;
window.Tether = oldTether;
H5P.TrueFalse.AnswerGroup = (function($, EventDispatcher) {
    'use strict';

    /**
     * Initialize module.
     *
     * @class H5P.TrueFalse.AnswerGroup
     * @extends H5P.EventDispatcher
     * @param {String} domId Id for label
     * @param {String} correctOption Correct option ('true' or 'false')
     * @param {Object} l10n Object containing all interface translations
     */
    function AnswerGroup(domId, correctOption, l10n) {
        var self = this;

        EventDispatcher.call(self);

        var $answers = $('<div>', {
            'class': 'h5p-true-false-answers',
            role: 'radiogroup',
            'aria-labelledby': domId
        });

        var answer;
        var trueAnswer = new H5P.TrueFalse.Answer(l10n.trueText, l10n.correctAnswerMessage, l10n.wrongAnswerMessage);
        var falseAnswer = new H5P.TrueFalse.Answer(l10n.falseText, l10n.correctAnswerMessage, l10n.wrongAnswerMessage);
        var correctAnswer = (correctOption === 'true' ? trueAnswer : falseAnswer);
        var wrongAnswer = (correctOption === 'false' ? trueAnswer : falseAnswer);

        // Handle checked
        var handleChecked = function(newAnswer, other) {
            return function() {
                answer = newAnswer;
                other.uncheck();
                self.trigger('selected');
            };
        };
        trueAnswer.on('checked', handleChecked(true, falseAnswer));
        falseAnswer.on('checked', handleChecked(false, trueAnswer));

        // Handle switches (using arrow keys)
        var handleInvert = function(newAnswer, other) {
            return function() {
                answer = newAnswer;
                other.check();
                self.trigger('selected');
            };
        };
        trueAnswer.on('invert', handleInvert(false, falseAnswer));
        falseAnswer.on('invert', handleInvert(true, trueAnswer));

        // Handle tabbing
        var handleTabable = function(other, tabable) {
            return function() {
                // If one of them are checked, that one should get tabfocus
                if (!tabable || !self.hasAnswered() || other.isChecked()) {
                    other.tabable(tabable);
                }
            };
        };
        // Need to remove tabIndex on the other alternative on focus
        trueAnswer.on('focus', handleTabable(falseAnswer, false));
        falseAnswer.on('focus', handleTabable(trueAnswer, false));
        // Need to make both alternatives tabable on blur:
        trueAnswer.on('blur', handleTabable(falseAnswer, true));
        falseAnswer.on('blur', handleTabable(trueAnswer, true));

        $answers.append(trueAnswer.getDomElement());
        $answers.append(falseAnswer.getDomElement());

        /**
         * Get hold of the DOM element representing this thingy
         * @method getDomElement
         * @return {jQuery}
         */
        self.getDomElement = function() {
            return $answers;
        };

        /**
         * Programatic check
         * @method check
         * @param  {[type]} answer [description]
         */
        self.check = function(answer) {
            if (answer) {
                trueAnswer.check();
            } else {
                falseAnswer.check();
            }
        };

        /**
         * Return current answer
         * @method getAnswer
         * @return {Boolean} undefined if no answer if given
         */
        self.getAnswer = function() {
            return answer;
        };

        /**
         * Check if user has answered question yet
         * @method hasAnswered
         * @return {Boolean}
         */
        self.hasAnswered = function() {
            return answer !== undefined;
        };

        /**
         * Is answer correct?
         * @method isCorrect
         * @return {Boolean}
         */
        self.isCorrect = function() {
            return correctAnswer.isChecked();
        };

        /**
         * Enable user input
         *
         * @method enable
         */
        self.enable = function() {
            trueAnswer.enable().tabable(true);
            falseAnswer.enable();
        };

        /**
         * Disable user input
         *
         * @method disable
         */
        self.disable = function() {
            trueAnswer.disable();
            falseAnswer.disable();
        };

        /**
         * Reveal correct/wrong answer
         *
         * @method reveal
         */
        self.reveal = function() {
            if (self.hasAnswered()) {
                if (self.isCorrect()) {
                    correctAnswer.markCorrect();
                } else {
                    wrongAnswer.markWrong();
                }
            }

            self.disable();
        };

        /**
         * Reset task
         * @method reset
         */
        self.reset = function() {
            trueAnswer.reset();
            falseAnswer.reset();
            self.enable();
            answer = undefined;
        };

        /**
         * Show the solution
         * @method showSolution
         * @return {[type]}
         */
        self.showSolution = function() {
            correctAnswer.markCorrect();
            wrongAnswer.unmark();
        };
    }

    // Inheritance
    AnswerGroup.prototype = Object.create(EventDispatcher.prototype);
    AnswerGroup.prototype.constructor = AnswerGroup;

    return AnswerGroup;
})(H5P.jQuery, H5P.EventDispatcher);
H5P.TrueFalse = (function($, Question) {
    'use strict';

    // Maximum score for True False
    var MAX_SCORE = 1;

    /**
     * Enum containing the different states this content type can exist in
     *
     * @enum
     */
    var State = Object.freeze({
        ONGOING: 1,
        FINISHED_WRONG: 2,
        FINISHED_CORRECT: 3,
        INTERNAL_SOLUTION: 4,
        EXTERNAL_SOLUTION: 5
    });

    /**
     * Button IDs
     */
    var Button = Object.freeze({
        CHECK: 'check-answer',
        TRYAGAIN: 'try-again',
        SHOW_SOLUTION: 'show-solution'
    });

    /**
     * Initialize module.
     *
     * @class H5P.TrueFalse
     * @extends H5P.Question
     * @param {Object} options
     * @param {number} id Content identification
     * @param {Object} contentData Task specific content data
     */
    function TrueFalse(options, id, contentData) {
        var self = this;

        // Inheritance
        Question.call(self, 'true-false');

        var params = $.extend(true, {
            question: 'No question text provided',
            correct: 'true',
            l10n: {
                trueText: 'True',
                falseText: 'False',
                score: 'You got @score of @total points',
                checkAnswer: 'Check',
                showSolutionButton: 'Show solution',
                tryAgain: 'Retry',
                wrongAnswerMessage: 'Wrong answer',
                correctAnswerMessage: 'Correct answer',
                scoreBarLabel: 'You got :num out of :total points',
                a11yCheck: 'Check the answers. The responses will be marked as correct, incorrect, or unanswered.',
                a11yShowSolution: 'Show the solution. The task will be marked with its correct solution.',
                a11yRetry: 'Retry the task. Reset all responses and start the task over again.',
            },
            behaviour: {
                enableRetry: true,
                enableSolutionsButton: true,
                enableCheckButton: true,
                confirmCheckDialog: false,
                confirmRetryDialog: false,
                autoCheck: false
            }
        }, options);

        // Counter used to create unique id for this question
        TrueFalse.counter = (TrueFalse.counter === undefined ? 0 : TrueFalse.counter + 1);

        // A unique ID is needed for aria label
        var domId = 'h5p-tfq' + H5P.TrueFalse.counter;

        // saves the content id
        this.contentId = id;
        this.contentData = contentData;

        // The radio group
        var answerGroup = new H5P.TrueFalse.AnswerGroup(domId, params.correct, params.l10n);
        if (contentData.previousState !== undefined && contentData.previousState.answer !== undefined) {
            answerGroup.check(contentData.previousState.answer);
        }
        answerGroup.on('selected', function() {
            self.triggerXAPI('interacted');

            if (params.behaviour.autoCheck) {
                checkAnswer();
                triggerXAPIAnswered();
            }
        });


        /**
         * Create the answers
         *
         * @method createAnswers
         * @private
         * @return {H5P.jQuery}
         */
        var createAnswers = function() {
            return answerGroup.getDomElement();
        };

        /**
         * Register buttons
         *
         * @method registerButtons
         * @private
         */
        var registerButtons = function() {
            var $content = $('[data-content-id="' + self.contentId + '"].h5p-content');
            var $containerParents = $content.parents('.h5p-container');

            // select find container to attach dialogs to
            var $container;
            if ($containerParents.length !== 0) {
                // use parent highest up if any
                $container = $containerParents.last();
            } else if ($content.length !== 0) {
                $container = $content;
            } else {
                $container = $(document.body);
            }

            // Show solution button
            if (params.behaviour.enableSolutionsButton === true) {
                self.addButton(Button.SHOW_SOLUTION, params.l10n.showSolutionButton, function() {
                    self.showSolutions(true);
                }, false, {
                    'aria-label': params.l10n.a11yShowSolution,
                });
            }

            // Check button
            if (!params.behaviour.autoCheck && params.behaviour.enableCheckButton) {
                self.addButton(Button.CHECK, params.l10n.checkAnswer, function() {
                    checkAnswer();
                    triggerXAPIAnswered();
                }, true, {
                    'aria-label': params.l10n.a11yCheck
                }, {
                    confirmationDialog: {
                        enable: params.behaviour.confirmCheckDialog,
                        l10n: params.confirmCheck,
                        instance: self,
                        $parentElement: $container
                    }
                });
            }

            // Try again button
            if (params.behaviour.enableRetry === true) {
                self.addButton(Button.TRYAGAIN, params.l10n.tryAgain, function() {
                    self.resetTask();
                }, true, {
                    'aria-label': params.l10n.a11yRetry,
                }, {
                    confirmationDialog: {
                        enable: params.behaviour.confirmRetryDialog,
                        l10n: params.confirmRetry,
                        instance: self,
                        $parentElement: $container
                    }
                });
            }

            toggleButtonState(State.ONGOING);
        };

        /**
         * Creates and triggers the xAPI answered event
         *
         * @method triggerXAPIAnswered
         * @private
         * @fires xAPIEvent
         */
        var triggerXAPIAnswered = function() {
            var xAPIEvent = self.createXAPIEventTemplate('answered');
            addQuestionToXAPI(xAPIEvent);
            addResponseToXAPI(xAPIEvent);
            self.trigger(xAPIEvent);
        };

        /**
         * Add the question itself to the definition part of an xAPIEvent
         *
         * @method addQuestionToXAPI
         * @param {XAPIEvent} xAPIEvent
         * @private
         */
        var addQuestionToXAPI = function(xAPIEvent) {
            var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
            definition.description = {
                // Remove tags, must wrap in div tag because jQuery 1.9 will crash if the string isn't wrapped in a tag.
                'en-US': $('<div>' + params.question + '</div>').text()
            };
            definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
            definition.interactionType = 'true-false';
            definition.correctResponsesPattern = [getCorrectAnswer()];
        };

        /**
         * Returns the correct answer
         *
         * @method getCorrectAnswer
         * @private
         * @return {String}
         */
        var getCorrectAnswer = function() {
            return (params.correct === 'true' ? 'true' : 'false');
        };

        /**
         * Returns the wrong answer
         *
         * @method getWrongAnswer
         * @private
         * @return {String}
         */
        var getWrongAnswer = function() {
            return (params.correct === 'false' ? 'true' : 'false');
        };

        /**
         * Add the response part to an xAPI event
         *
         * @method addResponseToXAPI
         * @private
         * @param {H5P.XAPIEvent} xAPIEvent
         *  The xAPI event we will add a response to
         */
        var addResponseToXAPI = function(xAPIEvent) {
            var isCorrect = answerGroup.isCorrect();
            xAPIEvent.setScoredResult(isCorrect ? MAX_SCORE : 0, MAX_SCORE, self, true, isCorrect);
            xAPIEvent.data.statement.result.response = (isCorrect ? getCorrectAnswer() : getWrongAnswer());
        };

        /**
         * Toggles btton visibility dependent of current state
         *
         * @method toggleButtonVisibility
         * @private
         * @param  {String}    buttonId
         * @param  {Boolean}   visible
         */
        var toggleButtonVisibility = function(buttonId, visible) {
            if (visible === true) {
                self.showButton(buttonId);
            } else {
                self.hideButton(buttonId);
            }
        };

        /**
         * Toggles buttons state
         *
         * @method toggleButtonState
         * @private
         * @param  {String}          state
         */
        var toggleButtonState = function(state) {
            toggleButtonVisibility(Button.SHOW_SOLUTION, state === State.FINISHED_WRONG);
            toggleButtonVisibility(Button.CHECK, state === State.ONGOING);
            toggleButtonVisibility(Button.TRYAGAIN, state === State.FINISHED_WRONG || state === State.INTERNAL_SOLUTION);
        };

        /**
         * Check if answer is correct or wrong, and update visuals accordingly
         *
         * @method checkAnswer
         * @private
         */
        var checkAnswer = function() {
            // Create feedback widget
            var score = self.getScore();
            var scoreText;

            toggleButtonState(score === MAX_SCORE ? State.FINISHED_CORRECT : State.FINISHED_WRONG);

            if (score === MAX_SCORE && params.behaviour.feedbackOnCorrect) {
                scoreText = params.behaviour.feedbackOnCorrect;
            } else if (score === 0 && params.behaviour.feedbackOnWrong) {
                scoreText = params.behaviour.feedbackOnWrong;
            } else {
                scoreText = params.l10n.score;
            }
            // Replace relevant variables:
            scoreText = scoreText.replace('@score', score).replace('@total', MAX_SCORE);
            self.setFeedback(scoreText, score, MAX_SCORE, params.l10n.scoreBarLabel);
            answerGroup.reveal();
        };

        /**
         * Registers this question type's DOM elements before they are attached.
         * Called from H5P.Question.
         *
         * @method registerDomElements
         * @private
         */
        self.registerDomElements = function() {
            var self = this;

            // Check for task media
            var media = params.media;
            if (media && media.type && media.type.library) {
                media = media.type;
                var type = media.library.split(' ')[0];
                if (type === 'H5P.Image') {
                    if (media.params.file) {
                        // Register task image
                        self.setImage(media.params.file.path, {
                            disableImageZooming: params.media.disableImageZooming || false,
                            alt: media.params.alt
                        });
                    }
                } else if (type === 'H5P.Video') {
                    if (media.params.sources) {
                        // Register task video
                        self.setVideo(media);
                    }
                }
            }

            // Add task question text
            self.setIntroduction('<div id="' + domId + '">' + params.question + '</div>');

            // Register task content area
            self.$content = createAnswers();
            self.setContent(self.$content);

            // ... and buttons
            registerButtons();
        };

        /**
         * Implements resume (save content state)
         *
         * @method getCurrentState
         * @public
         * @returns {object} object containing answer
         */
        self.getCurrentState = function() {
            return {
                answer: answerGroup.getAnswer()
            };
        };

        /**
         * Used for contracts.
         * Checks if the parent program can proceed. Always true.
         *
         * @method getAnswerGiven
         * @public
         * @returns {Boolean} true
         */
        self.getAnswerGiven = function() {
            return answerGroup.hasAnswered();
        };

        /**
         * Used for contracts.
         * Checks the current score for this task.
         *
         * @method getScore
         * @public
         * @returns {Number} The current score.
         */
        self.getScore = function() {
            return answerGroup.isCorrect() ? MAX_SCORE : 0;
        };

        /**
         * Used for contracts.
         * Checks the maximum score for this task.
         *
         * @method getMaxScore
         * @public
         * @returns {Number} The maximum score.
         */
        self.getMaxScore = function() {
            return MAX_SCORE;
        };

        /**
         * Get title of task
         *
         * @method getTitle
         * @public
         * @returns {string} title
         */
        self.getTitle = function() {
            return H5P.createTitle((self.contentData && self.contentData.metadata && self.contentData.metadata.title) ? self.contentData.metadata.title : 'True-False');
        };

        /**
         * Used for contracts.
         * Show the solution.
         *
         * @method showSolutions
         * @public
         */
        self.showSolutions = function(internal) {
            checkAnswer();
            answerGroup.showSolution();
            toggleButtonState(internal ? State.INTERNAL_SOLUTION : State.EXTERNAL_SOLUTION);
        };

        /**
         * Used for contracts.
         * Resets the complete task back to its' initial state.
         *
         * @method resetTask
         * @public
         */
        self.resetTask = function() {
            answerGroup.reset();
            self.removeFeedback();
            toggleButtonState(State.ONGOING);
        };

        /**
         * Get xAPI data.
         * Contract used by report rendering engine.
         *
         * @see contract at {@link https://h5p.org/documentation/developers/contracts#guides-header-6}
         */
        self.getXAPIData = function() {
            var xAPIEvent = this.createXAPIEventTemplate('answered');
            this.addQuestionToXAPI(xAPIEvent);
            this.addResponseToXAPI(xAPIEvent);
            return {
                statement: xAPIEvent.data.statement
            };
        };

        /**
         * Add the question itself to the definition part of an xAPIEvent
         */
        self.addQuestionToXAPI = function(xAPIEvent) {
            var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
            $.extend(definition, this.getxAPIDefinition());
        };

        /**
         * Generate xAPI object definition used in xAPI statements.
         * @return {Object}
         */
        self.getxAPIDefinition = function() {
            var definition = {};
            definition.interactionType = 'true-false';
            definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
            definition.description = {
                'en-US': $('<div>' + params.question + '</div>').text()
            };
            definition.correctResponsesPattern = [getCorrectAnswer()];

            return definition;
        };

        /**
         * Add the response part to an xAPI event
         *
         * @param {H5P.XAPIEvent} xAPIEvent
         *  The xAPI event we will add a response to
         */
        self.addResponseToXAPI = function(xAPIEvent) {
            var isCorrect = answerGroup.isCorrect();
            var rawUserScore = isCorrect ? MAX_SCORE : 0;
            var currentResponse = '';

            xAPIEvent.setScoredResult(rawUserScore, MAX_SCORE, self, true, isCorrect);

            if (self.getCurrentState().answer !== undefined) {
                currentResponse += answerGroup.isCorrect() ? getCorrectAnswer() : getWrongAnswer();
            }
            xAPIEvent.data.statement.result.response = currentResponse;
        };
    }

    // Inheritance
    TrueFalse.prototype = Object.create(Question.prototype);
    TrueFalse.prototype.constructor = TrueFalse;

    return TrueFalse;
})(H5P.jQuery, H5P.Question);
/** @namespace H5P */
H5P.VideoPanopto = (function($) {

    /**
     * Panopto video player for H5P.
     *
     * @class
     * @param {Array} sources Video files to use
     * @param {Object} options Settings for the player
     * @param {Object} l10n Localization strings
     */
    function Panopto(sources, options, l10n) {
        var self = this;

        var player;
        var playbackRate = 1;
        var id = 'h5p-panopto-' + numInstances;
        numInstances++;

        var $wrapper = $('<div/>');
        var $placeholder = $('<div/>', {
            id: id,
            html: '<div>' + l10n.loading + '</div>'
        }).appendTo($wrapper);

        /**
         * Use the Panopto API to create a new player
         *
         * @private
         */
        var create = function() {
            if (!$placeholder.is(':visible') || player !== undefined) {
                return;
            }

            if (window.EmbedApi === undefined) {
                // Load API first
                loadAPI(create);
                return;
            }

            var width = $wrapper.width();
            if (width < 200) {
                width = 200;
            }

            const videoId = getId(sources[0].path);

            player = new EmbedApi(id, {
                width: width,
                height: width * (9 / 16),
                serverName: videoId[0],
                sessionId: videoId[1],
                videoParams: { // Optional
                    interactivity: 'none',
                    showtitle: false,
                    autohide: true,
                    offerviewer: false,
                    autoplay: !!options.autoplay,
                    showbrand: false,
                    start: 0,
                    hideoverlay: !options.controls,
                },
                events: {
                    onIframeReady: function() {
                        $placeholder.children(0).text('');
                        player.loadVideo();
                    },
                    onReady: function() {
                        self.trigger('loaded');
                        if (player.hasCaptions()) {
                            const captions = [];

                            const captionTracks = player.getCaptionTracks();
                            for (trackIndex in captionTracks) {
                                captions.push(new H5P.Video.LabelValue(captionTracks[trackIndex], trackIndex));
                            }

                            // Select active track
                            currentTrack = player.getSelectedCaptionTrack();
                            currentTrack = captions[currentTrack] ? captions[currentTrack] : null;

                            self.trigger('captions', captions);
                        }
                        self.pause();
                    },
                    onStateChange: function(state) {
                        // TODO: Playback rate fix for IE11?
                        if (state > -1 && state < 4) {
                            self.trigger('stateChange', state);
                        }
                    },
                    onPlaybackRateChange: function() {
                        self.trigger('playbackRateChange', self.getPlaybackRate());
                    },
                    onError: function() {
                        self.trigger('error', l10n.unknownError);
                    },
                    onLoginShown: function() {
                        $placeholder.children().first().remove(); // Remove loading message
                        self.trigger('loaded'); // Resize parent
                    }
                }
            });
        };

        /**
         * Indicates if the video must be clicked for it to start playing.
         * This is always true for Panopto since all videos auto play.
         *
         * @public
         */
        self.pressToPlay = true;

        /**
         * Appends the video player to the DOM.
         *
         * @public
         * @param {jQuery} $container
         */
        self.appendTo = function($container) {
            $container.addClass('h5p-panopto').append($wrapper);
            create();
        };

        /**
         * Get list of available qualities. Not available until after play.
         *
         * @public
         * @returns {Array}
         */
        self.getQualities = function() {
            // Not available for Panopto
        };

        /**
         * Get current playback quality. Not available until after play.
         *
         * @public
         * @returns {String}
         */
        self.getQuality = function() {
            // Not available for Panopto
        };

        /**
         * Set current playback quality. Not available until after play.
         * Listen to event "qualityChange" to check if successful.
         *
         * @public
         * @params {String} [quality]
         */
        self.setQuality = function(quality) {
            // Not available for Panopto
        };

        /**
         * Start the video.
         *
         * @public
         */
        self.play = function() {
            if (!player || !player.playVideo) {
                return;
            }
            player.playVideo();
        };

        /**
         * Pause the video.
         *
         * @public
         */
        self.pause = function() {
            if (!player || !player.pauseVideo) {
                return;
            }
            player.pauseVideo();
        };

        /**
         * Seek video to given time.
         *
         * @public
         * @param {Number} time
         */
        self.seek = function(time) {
            if (!player || !player.seekTo) {
                return;
            }

            player.seekTo(time);
        };

        /**
         * Get elapsed time since video beginning.
         *
         * @public
         * @returns {Number}
         */
        self.getCurrentTime = function() {
            if (!player || !player.getCurrentTime) {
                return;
            }

            return player.getCurrentTime();
        };

        /**
         * Get total video duration time.
         *
         * @public
         * @returns {Number}
         */
        self.getDuration = function() {
            if (!player || !player.getDuration) {
                return;
            }

            return player.getDuration();
        };

        /**
         * Get percentage of video that is buffered.
         *
         * @public
         * @returns {Number} Between 0 and 100
         */
        self.getBuffered = function() {
            // Not available for Panopto
        };

        /**
         * Turn off video sound.
         *
         * @public
         */
        self.mute = function() {
            if (!player || !player.muteVideo) {
                return;
            }

            player.muteVideo();
        };

        /**
         * Turn on video sound.
         *
         * @public
         */
        self.unMute = function() {
            if (!player || !player.unmuteVideo) {
                return;
            }

            player.unmuteVideo();
        };

        /**
         * Check if video sound is turned on or off.
         *
         * @public
         * @returns {Boolean}
         */
        self.isMuted = function() {
            if (!player || !player.isMuted) {
                return;
            }

            return player.isMuted();
        };

        /**
         * Return the video sound level.
         *
         * @public
         * @returns {Number} Between 0 and 100.
         */
        self.getVolume = function() {
            if (!player || !player.getVolume) {
                return;
            }

            return player.getVolume() * 100;
        };

        /**
         * Set video sound level.
         *
         * @public
         * @param {Number} level Between 0 and 100.
         */
        self.setVolume = function(level) {
            if (!player || !player.setVolume) {
                return;
            }

            player.setVolume(level / 100);
        };

        /**
         * Get list of available playback rates.
         *
         * @public
         * @returns {Array} available playback rates
         */
        self.getPlaybackRates = function() {
            return [0.25, 0.5, 1, 1.25, 1.5, 2];
        };

        /**
         * Get current playback rate.
         *
         * @public
         * @returns {Number} such as 0.25, 0.5, 1, 1.25, 1.5 and 2
         */
        self.getPlaybackRate = function() {
            if (!player || !player.getPlaybackRate) {
                return;
            }

            return player.getPlaybackRate();
        };

        /**
         * Set current playback rate.
         * Listen to event "playbackRateChange" to check if successful.
         *
         * @public
         * @params {Number} suggested rate that may be rounded to supported values
         */
        self.setPlaybackRate = function(newPlaybackRate) {
            if (!player || !player.setPlaybackRate) {
                return;
            }

            player.setPlaybackRate(newPlaybackRate);
        };

        /**
         * Set current captions track.
         *
         * @param {H5P.Video.LabelValue} Captions track to show during playback
         */
        self.setCaptionsTrack = function(track) {
            if (!track) {
                console.log('Disable captions');
                player.disableCaptions();
                currentTrack = null;
            } else {
                console.log('Set captions', track.value);
                player.enableCaptions(track.value + '');
                currentTrack = track;
            }
        };

        /**
         * Figure out which captions track is currently used.
         *
         * @return {H5P.Video.LabelValue} Captions track
         */
        self.getCaptionsTrack = function() {
            return currentTrack; // No function for getting active caption track?
        };

        // Respond to resize events by setting the player size.
        self.on('resize', function() {
            if (!$wrapper.is(':visible')) {
                return;
            }

            if (!player) {
                // Player isn't created yet. Try again.
                create();
                return;
            }

            // Use as much space as possible
            $wrapper.css({
                width: '100%',
                height: '100%'
            });

            var width = $wrapper[0].clientWidth;
            var height = options.fit ? $wrapper[0].clientHeight : (width * (9 / 16));

            // Set size
            $wrapper.css({
                width: width + 'px',
                height: height + 'px'
            });

            const $iframe = $placeholder.children('iframe');
            if ($iframe.length) {
                $iframe.attr('width', width);
                $iframe.attr('height', height);
            }
        });

        let currentTrack;
    }

    /**
     * Check to see if we can play any of the given sources.
     *
     * @public
     * @static
     * @param {Array} sources
     * @returns {Boolean}
     */
    Panopto.canPlay = function(sources) {
        return getId(sources[0].path);
    };

    /**
     * Find id of YouTube video from given URL.
     *
     * @private
     * @param {String} url
     * @returns {String} Panopto video identifier
     */
    var getId = function(url) {
        const matches = url.match(/^[^\/]+:\/\/([^\/]*panopto\.[^\/]+)\/Panopto\/.+\?id=(.+)$/);
        if (matches && matches.length === 3) {
            return [matches[1], matches[2]];
        }
    };

    /**
     * Load the IFrame Player API asynchronously.
     */
    var loadAPI = function(loaded) {
        if (window.onPanoptoEmbedApiReady !== undefined) {
            // Someone else is loading, hook in
            var original = window.onPanoptoEmbedApiReady;
            window.onPanoptoEmbedApiReady = function(id) {
                loaded(id);
                original(id);
            };
        } else {
            // Load the API our self
            var tag = document.createElement('script');
            tag.src = 'https://developers.panopto.com/scripts/embedapi.min.js';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onPanoptoEmbedApiReady = loaded;
        }
    };

    /** @private */
    var numInstances = 0;

    return Panopto;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
H5P.videoHandlers.push(H5P.VideoPanopto);
/** @namespace H5P */
H5P.VideoHtml5 = (function($) {

    /**
     * HTML5 video player for H5P.
     *
     * @class
     * @param {Array} sources Video files to use
     * @param {Object} options Settings for the player
     * @param {Object} l10n Localization strings
     */
    function Html5(sources, options, l10n) {
        var self = this;

        /**
         * Small helper to ensure all video sources get the same cache buster.
         *
         * @private
         * @param {Object} source
         * @return {string}
         */
        const getCrossOriginPath = function(source) {
            let path = H5P.getPath(source.path, self.contentId);
            if (video.crossOrigin !== null && H5P.addQueryParameter && H5PIntegration.crossoriginCacheBuster) {
                path = H5P.addQueryParameter(path, H5PIntegration.crossoriginCacheBuster);
            }
            return path
        };


        /**
         * Register track to video
         *
         * @param {Object} trackData Track object
         * @param {string} trackData.kind Kind of track
         * @param {Object} trackData.track Source path
         * @param {string} [trackData.label] Label of track
         * @param {string} [trackData.srcLang] Language code
         */
        const addTrack = function(trackData) {
            // Skip invalid tracks
            if (!trackData.kind || !trackData.track.path) {
                return;
            }

            var track = document.createElement('track');
            track.kind = trackData.kind;
            track.src = getCrossOriginPath(trackData.track); // Uses same crossOrigin as parent. You cannot mix.
            if (trackData.label) {
                track.label = trackData.label;
            }

            if (trackData.srcLang) {
                track.srcLang = trackData.srcLang;
            }

            return track;
        };

        /**
         * Small helper to set the inital video source.
         * Useful if some of the loading happens asynchronously.
         * NOTE: Setting the crossOrigin must happen before any of the
         * sources(poster, tracks etc.) are loaded
         *
         * @private
         */
        const setInitialSource = function() {
            if (H5P.setSource !== undefined) {
                H5P.setSource(video, qualities[currentQuality].source, self.contentId)
            } else {
                // Backwards compatibility (H5P < v1.22)
                const srcPath = H5P.getPath(qualities[currentQuality].source.path, self.contentId);
                if (H5P.getCrossOrigin !== undefined) {
                    var crossOrigin = H5P.getCrossOrigin(srcPath);
                    video.setAttribute('crossorigin', crossOrigin !== null ? crossOrigin : 'anonymous');
                }
                video.src = srcPath;
            }

            // Add poster if provided
            if (options.poster) {
                video.poster = getCrossOriginPath(options.poster); // Uses same crossOrigin as parent. You cannot mix.
            }

            // Register tracks
            options.tracks.forEach(function(track, i) {
                var trackElement = addTrack(track);
                if (i === 0) {
                    trackElement.default = true;
                }
                if (trackElement) {
                    video.appendChild(trackElement);
                }
            });
        };

        /**
         * Displayed when the video is buffering
         * @private
         */
        var $throbber = $('<div/>', {
            'class': 'h5p-video-loading'
        });

        /**
         * Used to display error messages
         * @private
         */
        var $error = $('<div/>', {
            'class': 'h5p-video-error'
        });

        /**
         * Keep track of current state when changing quality.
         * @private
         */
        var stateBeforeChangingQuality;
        var currentTimeBeforeChangingQuality;

        /**
         * Avoids firing the same event twice.
         * @private
         */
        var lastState;

        /**
         * Keeps track whether or not the video has been loaded.
         * @private
         */
        var isLoaded = false;

        /**
         *
         * @private
         */
        var playbackRate = 1;
        var skipRateChange = false;

        // Create player
        var video = document.createElement('video');

        // Sort sources into qualities
        var qualities = getQualities(sources, video);
        var currentQuality;

        numQualities = 0;
        for (let quality in qualities) {
            numQualities++;
        }

        if (numQualities > 1 && H5P.VideoHtml5.getExternalQuality !== undefined) {
            H5P.VideoHtml5.getExternalQuality(sources, function(chosenQuality) {
                if (qualities[chosenQuality] !== undefined) {
                    currentQuality = chosenQuality;
                }
                setInitialSource();
            });
        } else {
            // Select quality and source
            currentQuality = getPreferredQuality();
            if (currentQuality === undefined || qualities[currentQuality] === undefined) {
                // No preferred quality, pick the first.
                for (currentQuality in qualities) {
                    if (qualities.hasOwnProperty(currentQuality)) {
                        break;
                    }
                }
            }
            setInitialSource();
        }

        // Setting webkit-playsinline, which makes iOS 10 beeing able to play video
        // inside browser.
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');

        // Remove download button in Chrome's video player:
        video.setAttribute('controlsList', 'nodownload');

        // Set options
        video.disableRemotePlayback = (options.disableRemotePlayback ? true : false);
        video.controls = (options.controls ? true : false);
        video.autoplay = (options.autoplay ? true : false);
        video.loop = (options.loop ? true : false);
        video.className = 'h5p-video';
        video.style.display = 'block';

        if (options.fit) {
            // Style is used since attributes with relative sizes aren't supported by IE9.
            video.style.width = '100%';
            video.style.height = '100%';
        }

        /**
         * Helps registering events.
         *
         * @private
         * @param {String} native Event name
         * @param {String} h5p Event name
         * @param {String} [arg] Optional argument
         */
        var mapEvent = function(native, h5p, arg) {
            video.addEventListener(native, function() {
                switch (h5p) {
                    case 'stateChange':
                        if (lastState === arg) {
                            return; // Avoid firing event twice.
                        }

                        var validStartTime = options.startAt && options.startAt > 0;
                        if (arg === H5P.Video.PLAYING && validStartTime) {
                            video.currentTime = options.startAt;
                            delete options.startAt;
                        }

                        break;

                    case 'loaded':
                        isLoaded = true;

                        if (stateBeforeChangingQuality !== undefined) {
                            return; // Avoid loaded event when changing quality.
                        }

                        // Remove any errors
                        if ($error.is(':visible')) {
                            $error.remove();
                        }

                        if (OLD_ANDROID_FIX) {
                            var andLoaded = function() {
                                video.removeEventListener('durationchange', andLoaded, false);
                                // On Android seeking isn't ready until after play.
                                self.trigger(h5p);
                            };
                            video.addEventListener('durationchange', andLoaded, false);
                            return;
                        }
                        break;

                    case 'error':
                        // Handle error and get message.
                        arg = error(arguments[0], arguments[1]);
                        break;

                    case 'playbackRateChange':

                        // Fix for keeping playback rate in IE11
                        if (skipRateChange) {
                            skipRateChange = false;
                            return; // Avoid firing event when changing back
                        }
                        if (H5P.Video.IE11_PLAYBACK_RATE_FIX && playbackRate != video.playbackRate) { // Intentional
                            // Prevent change in playback rate not triggered by the user
                            video.playbackRate = playbackRate;
                            skipRateChange = true;
                            return;
                        }
                        // End IE11 fix

                        arg = self.getPlaybackRate();
                        break;
                }
                self.trigger(h5p, arg);
            }, false);
        };

        /**
         * Handle errors from the video player.
         *
         * @private
         * @param {Object} code Error
         * @param {String} [message]
         * @returns {String} Human readable error message.
         */
        var error = function(code, message) {
            if (code instanceof Event) {

                // No error code
                if (!code.target.error) {
                    return '';
                }

                switch (code.target.error.code) {
                    case MediaError.MEDIA_ERR_ABORTED:
                        message = l10n.aborted;
                        break;
                    case MediaError.MEDIA_ERR_NETWORK:
                        message = l10n.networkFailure;
                        break;
                    case MediaError.MEDIA_ERR_DECODE:
                        message = l10n.cannotDecode;
                        break;
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        message = l10n.formatNotSupported;
                        break;
                    case MediaError.MEDIA_ERR_ENCRYPTED:
                        message = l10n.mediaEncrypted;
                        break;
                }
            }
            if (!message) {
                message = l10n.unknownError;
            }

            // Hide throbber
            $throbber.remove();

            // Display error message to user
            $error.text(message).insertAfter(video);

            // Pass message to our error event
            return message;
        };

        /**
         * Appends the video player to the DOM.
         *
         * @public
         * @param {jQuery} $container
         */
        self.appendTo = function($container) {
            $container.append(video);
        };

        /**
         * Get list of available qualities. Not available until after play.
         *
         * @public
         * @returns {Array}
         */
        self.getQualities = function() {
            // Create reverse list
            var options = [];
            for (var q in qualities) {
                if (qualities.hasOwnProperty(q)) {
                    options.splice(0, 0, {
                        name: q,
                        label: qualities[q].label
                    });
                }
            }

            if (options.length < 2) {
                // Do not return if only one quality.
                return;
            }

            return options;
        };

        /**
         * Get current playback quality. Not available until after play.
         *
         * @public
         * @returns {String}
         */
        self.getQuality = function() {
            return currentQuality;
        };

        /**
         * Set current playback quality. Not available until after play.
         * Listen to event "qualityChange" to check if successful.
         *
         * @public
         * @params {String} [quality]
         */
        self.setQuality = function(quality) {
            if (qualities[quality] === undefined || quality === currentQuality) {
                return; // Invalid quality
            }

            // Keep track of last choice
            setPreferredQuality(quality);

            // Avoid multiple loaded events if changing quality multiple times.
            if (!stateBeforeChangingQuality) {
                // Keep track of last state
                stateBeforeChangingQuality = lastState;

                // Keep track of current time
                currentTimeBeforeChangingQuality = video.currentTime;

                // Seek and start video again after loading.
                var loaded = function() {
                    video.removeEventListener('loadedmetadata', loaded, false);
                    if (OLD_ANDROID_FIX) {
                        var andLoaded = function() {
                            video.removeEventListener('durationchange', andLoaded, false);
                            // On Android seeking isn't ready until after play.
                            self.seek(currentTimeBeforeChangingQuality);
                        };
                        video.addEventListener('durationchange', andLoaded, false);
                    } else {
                        // Seek to current time.
                        self.seek(currentTimeBeforeChangingQuality);
                    }

                    // Always play to get image.
                    video.play();

                    if (stateBeforeChangingQuality !== H5P.Video.PLAYING) {
                        // Do not resume playing
                        video.pause();
                    }

                    // Done changing quality
                    stateBeforeChangingQuality = undefined;

                    // Remove any errors
                    if ($error.is(':visible')) {
                        $error.remove();
                    }
                };
                video.addEventListener('loadedmetadata', loaded, false);
            }

            // Keep track of current quality
            currentQuality = quality;
            self.trigger('qualityChange', currentQuality);

            // Display throbber
            self.trigger('stateChange', H5P.Video.BUFFERING);

            // Change source
            video.src = getCrossOriginPath(qualities[quality].source); // (iPad does not support #t=).
            // Note: Optional tracks use same crossOrigin as the original. You cannot mix.

            // Remove poster so it will not show during quality change
            video.removeAttribute('poster');
        };

        /**
         * Starts the video.
         *
         * @public
         * @return {Promise|undefined} May return a Promise that resolves when
         * play has been processed.
         */
        self.play = function() {
            if ($error.is(':visible')) {
                return;
            }

            if (!isLoaded) {
                // Make sure video is loaded before playing
                video.load();
            }

            return video.play();
        };

        /**
         * Pauses the video.
         *
         * @public
         */
        self.pause = function() {
            video.pause();
        };

        /**
         * Seek video to given time.
         *
         * @public
         * @param {Number} time
         */
        self.seek = function(time) {
            if (lastState === undefined) {
                // Make sure we always play before we seek to get an image.
                // If not iOS devices will reset currentTime when pressing play.
                video.play();
                video.pause();
            }

            video.currentTime = time;
        };

        /**
         * Get elapsed time since video beginning.
         *
         * @public
         * @returns {Number}
         */
        self.getCurrentTime = function() {
            return video.currentTime;
        };

        /**
         * Get total video duration time.
         *
         * @public
         * @returns {Number}
         */
        self.getDuration = function() {
            if (isNaN(video.duration)) {
                return;
            }

            return video.duration;
        };

        /**
         * Get percentage of video that is buffered.
         *
         * @public
         * @returns {Number} Between 0 and 100
         */
        self.getBuffered = function() {
            // Find buffer currently playing from
            var buffered = 0;
            for (var i = 0; i < video.buffered.length; i++) {
                var from = video.buffered.start(i);
                var to = video.buffered.end(i);

                if (video.currentTime > from && video.currentTime < to) {
                    buffered = to;
                    break;
                }
            }

            // To percentage
            return buffered ? (buffered / video.duration) * 100 : 0;
        };

        /**
         * Turn off video sound.
         *
         * @public
         */
        self.mute = function() {
            video.muted = true;
        };

        /**
         * Turn on video sound.
         *
         * @public
         */
        self.unMute = function() {
            video.muted = false;
        };

        /**
         * Check if video sound is turned on or off.
         *
         * @public
         * @returns {Boolean}
         */
        self.isMuted = function() {
            return video.muted;
        };

        /**
         * Returns the video sound level.
         *
         * @public
         * @returns {Number} Between 0 and 100.
         */
        self.getVolume = function() {
            return video.volume * 100;
        };

        /**
         * Set video sound level.
         *
         * @public
         * @param {Number} level Between 0 and 100.
         */
        self.setVolume = function(level) {
            video.volume = level / 100;
        };

        /**
         * Get list of available playback rates.
         *
         * @public
         * @returns {Array} available playback rates
         */
        self.getPlaybackRates = function() {
            /*
             * not sure if there's a common rule about determining good speeds
             * using Google's standard options via a constant for setting
             */
            var playbackRates = PLAYBACK_RATES;

            return playbackRates;
        };

        /**
         * Get current playback rate.
         *
         * @public
         * @returns {Number} such as 0.25, 0.5, 1, 1.25, 1.5 and 2
         */
        self.getPlaybackRate = function() {
            return video.playbackRate;
        };

        /**
         * Set current playback rate.
         * Listen to event "playbackRateChange" to check if successful.
         *
         * @public
         * @params {Number} suggested rate that may be rounded to supported values
         */
        self.setPlaybackRate = function(newPlaybackRate) {
            playbackRate = newPlaybackRate;
            video.playbackRate = newPlaybackRate;
        };

        /**
         * Set current captions track.
         *
         * @param {H5P.Video.LabelValue} Captions track to show during playback
         */
        self.setCaptionsTrack = function(track) {
            for (var i = 0; i < video.textTracks.length; i++) {
                video.textTracks[i].mode = (track && track.value === i ? 'showing' : 'disabled');
            }
        };

        /**
         * Figure out which captions track is currently used.
         *
         * @return {H5P.Video.LabelValue} Captions track
         */
        self.getCaptionsTrack = function() {
            for (var i = 0; i < video.textTracks.length; i++) {
                if (video.textTracks[i].mode === 'showing') {
                    return new H5P.Video.LabelValue(video.textTracks[i].label, i);
                }
            }

            return null;
        };

        // Register event listeners
        mapEvent('ended', 'stateChange', H5P.Video.ENDED);
        mapEvent('playing', 'stateChange', H5P.Video.PLAYING);
        mapEvent('pause', 'stateChange', H5P.Video.PAUSED);
        mapEvent('waiting', 'stateChange', H5P.Video.BUFFERING);
        mapEvent('loadedmetadata', 'loaded');
        mapEvent('canplay', 'canplay');
        mapEvent('error', 'error');
        mapEvent('ratechange', 'playbackRateChange');

        if (!video.controls) {
            // Disable context menu(right click) to prevent controls.
            video.addEventListener('contextmenu', function(event) {
                event.preventDefault();
            }, false);
        }

        // Display throbber when buffering/loading video.
        self.on('stateChange', function(event) {
            var state = event.data;
            lastState = state;
            if (state === H5P.Video.BUFFERING) {
                $throbber.insertAfter(video);
            } else {
                $throbber.remove();
            }
        });

        // Load captions after the video is loaded
        self.on('loaded', function() {
            nextTick(function() {
                var textTracks = [];
                for (var i = 0; i < video.textTracks.length; i++) {
                    textTracks.push(new H5P.Video.LabelValue(video.textTracks[i].label, i));
                }
                if (textTracks.length) {
                    self.trigger('captions', textTracks);
                }
            });
        });

        // Alternative to 'canplay' event
        /*self.on('resize', function () {
          if (video.offsetParent === null) {
            return;
          }

          video.style.width = '100%';
          video.style.height = '100%';

          var width = video.clientWidth;
          var height = options.fit ? video.clientHeight : (width * (video.videoHeight / video.videoWidth));

          video.style.width = width + 'px';
          video.style.height = height + 'px';
        });*/

        // Video controls are ready
        nextTick(function() {
            self.trigger('ready');
        });
    }

    /**
     * Check to see if we can play any of the given sources.
     *
     * @public
     * @static
     * @param {Array} sources
     * @returns {Boolean}
     */
    Html5.canPlay = function(sources) {
        var video = document.createElement('video');
        if (video.canPlayType === undefined) {
            return false; // Not supported
        }

        // Cycle through sources
        for (var i = 0; i < sources.length; i++) {
            var type = getType(sources[i]);
            if (type && video.canPlayType(type) !== '') {
                // We should be able to play this
                return true;
            }
        }

        return false;
    };

    /**
     * Find source type.
     *
     * @private
     * @param {Object} source
     * @returns {String}
     */
    var getType = function(source) {
        var type = source.mime;
        if (!type) {
            // Try to get type from URL
            var matches = source.path.match(/\.(\w+)$/);
            if (matches && matches[1]) {
                type = 'video/' + matches[1];
            }
        }

        if (type && source.codecs) {
            // Add codecs
            type += '; codecs="' + source.codecs + '"';
        }

        return type;
    };

    /**
     * Sort sources into qualities.
     *
     * @private
     * @static
     * @param {Array} sources
     * @param {Object} video
     * @returns {Object} Quality mapping
     */
    var getQualities = function(sources, video) {
        var qualities = {};
        var qualityIndex = 1;
        var lastQuality;

        // Cycle through sources
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];

            // Find and update type.
            var type = source.type = getType(source);

            // Check if we support this type
            var isPlayable = type && (type === 'video/unknown' || video.canPlayType(type) !== '');
            if (!isPlayable) {
                continue; // We cannot play this source
            }

            if (source.quality === undefined) {
                /**
                 * No quality metadata. Create a quality tag to separate multiple sources of the same type,
                 * e.g. if two mp4 files with different quality has been uploaded
                 */

                if (lastQuality === undefined || qualities[lastQuality].source.type === type) {
                    // Create a new quality tag
                    source.quality = {
                        name: 'q' + qualityIndex,
                        label: (source.metadata && source.metadata.qualityName) ? source.metadata.qualityName : 'Quality ' + qualityIndex // TODO: l10n
                    };
                    qualityIndex++;
                } else {
                    /**
                     * Assumes quality already exists in a different format.
                     * Uses existing label for this quality.
                     */
                    source.quality = qualities[lastQuality].source.quality;
                }
            }

            // Log last quality
            lastQuality = source.quality.name;

            // Look to see if quality exists
            var quality = qualities[lastQuality];
            if (quality) {
                // We have a source with this quality. Check if we have a better format.
                if (source.mime.split('/')[1] === PREFERRED_FORMAT) {
                    quality.source = source;
                }
            } else {
                // Add new source with quality.
                qualities[source.quality.name] = {
                    label: source.quality.label,
                    source: source
                };
            }
        }

        return qualities;
    };

    /**
     * Set preferred video quality.
     *
     * @private
     * @static
     * @param {String} quality Index of preferred quality
     */
    var setPreferredQuality = function(quality) {
        try {
            localStorage.setItem('h5pVideoQuality', quality);
        } catch (err) {
            console.warn('Unable to set preferred video quality, localStorage is not available.');
        }
    };

    /**
     * Get preferred video quality.
     *
     * @private
     * @static
     * @returns {String} Index of preferred quality
     */
    var getPreferredQuality = function() {
        // First check localStorage
        let quality;
        try {
            quality = localStorage.getItem('h5pVideoQuality');
        } catch (err) {
            console.warn('Unable to retrieve preferred video quality from localStorage.');
        }
        if (!quality) {
            try {
                // The fallback to old cookie solution
                var settings = document.cookie.split(';');
                for (var i = 0; i < settings.length; i++) {
                    var setting = settings[i].split('=');
                    if (setting[0] === 'H5PVideoQuality') {
                        quality = setting[1];
                        break;
                    }
                }
            } catch (err) {
                console.warn('Unable to retrieve preferred video quality from cookie.');
            }
        }
        return quality;
    };

    /**
     * Helps schedule a task for the next tick.
     * @param {function} task
     */
    var nextTick = function(task) {
        setTimeout(task, 0);
    };

    /** @constant {Boolean} */
    var OLD_ANDROID_FIX = false;

    /** @constant {Boolean} */
    var PREFERRED_FORMAT = 'mp4';

    /** @constant {Object} */
    var PLAYBACK_RATES = [0.25, 0.5, 1, 1.25, 1.5, 2];

    if (navigator.userAgent.indexOf('Android') !== -1) {
        // We have Android, check version.
        var version = navigator.userAgent.match(/AppleWebKit\/(\d+\.?\d*)/);
        if (version && version[1] && Number(version[1]) <= 534.30) {
            // Include fix for devices running the native Android browser.
            // (We don't know when video was fixed, so the number is just the lastest
            // native android browser we found.)
            OLD_ANDROID_FIX = true;
        }
    } else {
        if (navigator.userAgent.indexOf('Chrome') !== -1) {
            // If we're using chrome on a device that isn't Android, prefer the webm
            // format. This is because Chrome has trouble with some mp4 codecs.
            PREFERRED_FORMAT = 'webm';
        }
    }

    return Html5;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
H5P.videoHandlers.push(H5P.VideoHtml5);
(function() {
    var rsplit = function(string, regex) {
            var result = regex.exec(string),
                retArr = new Array(),
                first_idx, last_idx, first_bit;
            while (result != null) {
                first_idx = result.index;
                last_idx = regex.lastIndex;
                if ((first_idx) != 0) {
                    first_bit = string.substring(0, first_idx);
                    retArr.push(string.substring(0, first_idx));
                    string = string.slice(first_idx)
                }
                retArr.push(result[0]);
                string = string.slice(result[0].length);
                result = regex.exec(string)
            }
            if (!string == "") {
                retArr.push(string)
            }
            return retArr
        },
        chop = function(string) {
            return string.substr(0, string.length - 1)
        },
        extend = function(d, s) {
            for (var n in s) {
                if (s.hasOwnProperty(n)) {
                    d[n] = s[n]
                }
            }
        };
    EJS = function(options) {
        options = typeof options == "string" ? {
            view: options
        } : options;
        this.set_options(options);
        if (options.precompiled) {
            this.template = {};
            this.template.process = options.precompiled;
            EJS.update(this.name, this);
            return
        }
        if (options.element) {
            if (typeof options.element == "string") {
                var name = options.element;
                options.element = document.getElementById(options.element);
                if (options.element == null) {
                    throw name + "does not exist!"
                }
            }
            if (options.element.value) {
                this.text = options.element.value
            } else {
                this.text = options.element.innerHTML
            }
            this.name = options.element.id;
            this.type = "["
        } else {
            if (options.url) {
                options.url = EJS.endExt(options.url, this.extMatch);
                this.name = this.name ? this.name : options.url;
                var url = options.url;
                var template = EJS.get(this.name, this.cache);
                if (template) {
                    return template
                }
                if (template == EJS.INVALID_PATH) {
                    return null
                }
                try {
                    this.text = EJS.request(url + (this.cache ? "" : "?" + Math.random()))
                } catch (e) {}
                if (this.text == null) {
                    throw ({
                        type: "EJS",
                        message: "There is no template at " + url
                    })
                }
            }
        }
        var template = new EJS.Compiler(this.text, this.type);
        template.compile(options, this.name);
        EJS.update(this.name, this);
        this.template = template
    };
    EJS.prototype = {
        render: function(object, extra_helpers) {
            object = object || {};
            this._extra_helpers = extra_helpers;
            var v = new EJS.Helpers(object, extra_helpers || {});
            return this.template.process.call(object, object, v)
        },
        update: function(element, options) {
            if (typeof element == "string") {
                element = document.getElementById(element)
            }
            if (options == null) {
                _template = this;
                return function(object) {
                    EJS.prototype.update.call(_template, element, object)
                }
            }
            if (typeof options == "string") {
                params = {};
                params.url = options;
                _template = this;
                params.onComplete = function(request) {
                    var object = eval(request.responseText);
                    EJS.prototype.update.call(_template, element, object)
                };
                EJS.ajax_request(params)
            } else {
                element.innerHTML = this.render(options)
            }
        },
        out: function() {
            return this.template.out
        },
        set_options: function(options) {
            this.type = options.type || EJS.type;
            this.cache = options.cache != null ? options.cache : EJS.cache;
            this.text = options.text || null;
            this.name = options.name || null;
            this.ext = options.ext || EJS.ext;
            this.extMatch = new RegExp(this.ext.replace(/\./, "."))
        }
    };
    EJS.endExt = function(path, match) {
        if (!path) {
            return null
        }
        match.lastIndex = 0;
        return path + (match.test(path) ? "" : this.ext)
    };
    EJS.Scanner = function(source, left, right) {
        extend(this, {
            left_delimiter: left + "%",
            right_delimiter: "%" + right,
            double_left: left + "%%",
            double_right: "%%" + right,
            left_equal: left + "%=",
            left_comment: left + "%#"
        });
        this.SplitRegexp = left == "[" ? /(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/ : new RegExp("(" + this.double_left + ")|(%%" + this.double_right + ")|(" + this.left_equal + ")|(" + this.left_comment + ")|(" + this.left_delimiter + ")|(" + this.right_delimiter + "\n)|(" + this.right_delimiter + ")|(\n)");
        this.source = source;
        this.stag = null;
        this.lines = 0
    };
    EJS.Scanner.to_text = function(input) {
        if (input == null || input === undefined) {
            return ""
        }
        if (input instanceof Date) {
            return input.toDateString()
        }
        if (input.toString) {
            return input.toString()
        }
        return ""
    };
    EJS.Scanner.prototype = {
        scan: function(block) {
            scanline = this.scanline;
            regex = this.SplitRegexp;
            if (!this.source == "") {
                var source_split = rsplit(this.source, /\n/);
                for (var i = 0; i < source_split.length; i++) {
                    var item = source_split[i];
                    this.scanline(item, regex, block)
                }
            }
        },
        scanline: function(line, regex, block) {
            this.lines++;
            var line_split = rsplit(line, regex);
            for (var i = 0; i < line_split.length; i++) {
                var token = line_split[i];
                if (token != null) {
                    try {
                        block(token, this)
                    } catch (e) {
                        throw {
                            type: "EJS.Scanner",
                            line: this.lines
                        }
                    }
                }
            }
        }
    };
    EJS.Buffer = function(pre_cmd, post_cmd) {
        this.line = new Array();
        this.script = "";
        this.pre_cmd = pre_cmd;
        this.post_cmd = post_cmd;
        for (var i = 0; i < this.pre_cmd.length; i++) {
            this.push(pre_cmd[i])
        }
    };
    EJS.Buffer.prototype = {
        push: function(cmd) {
            this.line.push(cmd)
        },
        cr: function() {
            this.script = this.script + this.line.join("; ");
            this.line = new Array();
            this.script = this.script + "\n"
        },
        close: function() {
            if (this.line.length > 0) {
                for (var i = 0; i < this.post_cmd.length; i++) {
                    this.push(pre_cmd[i])
                }
                this.script = this.script + this.line.join("; ");
                line = null
            }
        }
    };
    EJS.Compiler = function(source, left) {
        this.pre_cmd = ["var ___ViewO = [];"];
        this.post_cmd = new Array();
        this.source = " ";
        if (source != null) {
            if (typeof source == "string") {
                source = source.replace(/\r\n/g, "\n");
                source = source.replace(/\r/g, "\n");
                this.source = source
            } else {
                if (source.innerHTML) {
                    this.source = source.innerHTML
                }
            }
            if (typeof this.source != "string") {
                this.source = ""
            }
        }
        left = left || "<";
        var right = ">";
        switch (left) {
            case "[":
                right = "]";
                break;
            case "<":
                break;
            default:
                throw left + " is not a supported deliminator";
                break
        }
        this.scanner = new EJS.Scanner(this.source, left, right);
        this.out = ""
    };
    EJS.Compiler.prototype = {
        compile: function(options, name) {
            options = options || {};
            this.out = "";
            var put_cmd = "___ViewO.push(";
            var insert_cmd = put_cmd;
            var buff = new EJS.Buffer(this.pre_cmd, this.post_cmd);
            var content = "";
            var clean = function(content) {
                content = content.replace(/\\/g, "\\\\");
                content = content.replace(/\n/g, "\\n");
                content = content.replace(/"/g, '\\"');
                return content
            };
            this.scanner.scan(function(token, scanner) {
                if (scanner.stag == null) {
                    switch (token) {
                        case "\n":
                            content = content + "\n";
                            buff.push(put_cmd + '"' + clean(content) + '");');
                            buff.cr();
                            content = "";
                            break;
                        case scanner.left_delimiter:
                        case scanner.left_equal:
                        case scanner.left_comment:
                            scanner.stag = token;
                            if (content.length > 0) {
                                buff.push(put_cmd + '"' + clean(content) + '")')
                            }
                            content = "";
                            break;
                        case scanner.double_left:
                            content = content + scanner.left_delimiter;
                            break;
                        default:
                            content = content + token;
                            break
                    }
                } else {
                    switch (token) {
                        case scanner.right_delimiter:
                            switch (scanner.stag) {
                                case scanner.left_delimiter:
                                    if (content[content.length - 1] == "\n") {
                                        content = chop(content);
                                        buff.push(content);
                                        buff.cr()
                                    } else {
                                        buff.push(content)
                                    }
                                    break;
                                case scanner.left_equal:
                                    buff.push(insert_cmd + "(EJS.Scanner.to_text(" + content + ")))");
                                    break
                            }
                            scanner.stag = null;
                            content = "";
                            break;
                        case scanner.double_right:
                            content = content + scanner.right_delimiter;
                            break;
                        default:
                            content = content + token;
                            break
                    }
                }
            });
            if (content.length > 0) {
                buff.push(put_cmd + '"' + clean(content) + '")')
            }
            buff.close();
            this.out = buff.script + ";";
            var to_be_evaled = "/*" + name + "*/this.process = function(_CONTEXT,_VIEW) { try { with(_VIEW) { with (_CONTEXT) {" + this.out + " return ___ViewO.join('');}}}catch(e){e.lineNumber=null;throw e;}};";
            try {
                eval(to_be_evaled)
            } catch (e) {
                if (typeof JSLINT != "undefined") {
                    JSLINT(this.out);
                    for (var i = 0; i < JSLINT.errors.length; i++) {
                        var error = JSLINT.errors[i];
                        if (error.reason != "Unnecessary semicolon.") {
                            error.line++;
                            var e = new Error();
                            e.lineNumber = error.line;
                            e.message = error.reason;
                            if (options.view) {
                                e.fileName = options.view
                            }
                            throw e
                        }
                    }
                } else {
                    throw e
                }
            }
        }
    };
    EJS.config = function(options) {
        EJS.cache = options.cache != null ? options.cache : EJS.cache;
        EJS.type = options.type != null ? options.type : EJS.type;
        EJS.ext = options.ext != null ? options.ext : EJS.ext;
        var templates_directory = EJS.templates_directory || {};
        EJS.templates_directory = templates_directory;
        EJS.get = function(path, cache) {
            if (cache == false) {
                return null
            }
            if (templates_directory[path]) {
                return templates_directory[path]
            }
            return null
        };
        EJS.update = function(path, template) {
            if (path == null) {
                return
            }
            templates_directory[path] = template
        };
        EJS.INVALID_PATH = -1
    };
    EJS.config({
        cache: true,
        type: "<",
        ext: ".ejs"
    });
    EJS.Helpers = function(data, extras) {
        this._data = data;
        this._extras = extras;
        extend(this, extras)
    };
    EJS.Helpers.prototype = {
        view: function(options, data, helpers) {
            if (!helpers) {
                helpers = this._extras
            }
            if (!data) {
                data = this._data
            }
            return new EJS(options).render(data, helpers)
        },
        to_text: function(input, null_text) {
            if (input == null || input === undefined) {
                return null_text || ""
            }
            if (input instanceof Date) {
                return input.toDateString()
            }
            if (input.toString) {
                return input.toString().replace(/\n/g, "<br />").replace(/''/g, "'")
            }
            return ""
        }
    };
    EJS.newRequest = function() {
        var factories = [function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function() {
            return new XMLHttpRequest()
        }, function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }];
        for (var i = 0; i < factories.length; i++) {
            try {
                var request = factories[i]();
                if (request != null) {
                    return request
                }
            } catch (e) {
                continue
            }
        }
    };
    EJS.request = function(path) {
        var request = new EJS.newRequest();
        request.open("GET", path, false);
        try {
            request.send(null)
        } catch (e) {
            return null
        }
        if (request.status == 404 || request.status == 2 || (request.status == 0 && request.responseText == "")) {
            return null
        }
        return request.responseText
    };
    EJS.ajax_request = function(params) {
        params.method = (params.method ? params.method : "GET");
        var request = new EJS.newRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    params.onComplete(request)
                } else {
                    params.onComplete(request)
                }
            }
        };
        request.open(params.method, params.url);
        request.send(null)
    }
})();
EJS.Helpers.prototype.date_tag = function(C, O, A) {
    if (!(O instanceof Date)) {
        O = new Date()
    }
    var B = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var G = [],
        D = [],
        P = [];
    var J = O.getFullYear();
    var H = O.getMonth();
    var N = O.getDate();
    for (var M = J - 15; M < J + 15; M++) {
        G.push({
            value: M,
            text: M
        })
    }
    for (var E = 0; E < 12; E++) {
        D.push({
            value: (E),
            text: B[E]
        })
    }
    for (var I = 0; I < 31; I++) {
        P.push({
            value: (I + 1),
            text: (I + 1)
        })
    }
    var L = this.select_tag(C + "[year]", J, G, {
        id: C + "[year]"
    });
    var F = this.select_tag(C + "[month]", H, D, {
        id: C + "[month]"
    });
    var K = this.select_tag(C + "[day]", N, P, {
        id: C + "[day]"
    });
    return L + F + K
};
EJS.Helpers.prototype.form_tag = function(B, A) {
    A = A || {};
    A.action = B;
    if (A.multipart == true) {
        A.method = "post";
        A.enctype = "multipart/form-data"
    }
    return this.start_tag_for("form", A)
};
EJS.Helpers.prototype.form_tag_end = function() {
    return this.tag_end("form")
};
EJS.Helpers.prototype.hidden_field_tag = function(A, C, B) {
    return this.input_field_tag(A, C, "hidden", B)
};
EJS.Helpers.prototype.input_field_tag = function(A, D, C, B) {
    B = B || {};
    B.id = B.id || A;
    B.value = D || "";
    B.type = C || "text";
    B.name = A;
    return this.single_tag_for("input", B)
};
EJS.Helpers.prototype.is_current_page = function(A) {
    return (window.location.href == A || window.location.pathname == A ? true : false)
};
EJS.Helpers.prototype.link_to = function(B, A, C) {
    if (!B) {
        var B = "null"
    }
    if (!C) {
        var C = {}
    }
    if (C.confirm) {
        C.onclick = ' var ret_confirm = confirm("' + C.confirm + '"); if(!ret_confirm){ return false;} ';
        C.confirm = null
    }
    C.href = A;
    return this.start_tag_for("a", C) + B + this.tag_end("a")
};
EJS.Helpers.prototype.submit_link_to = function(B, A, C) {
    if (!B) {
        var B = "null"
    }
    if (!C) {
        var C = {}
    }
    C.onclick = C.onclick || "";
    if (C.confirm) {
        C.onclick = ' var ret_confirm = confirm("' + C.confirm + '"); if(!ret_confirm){ return false;} ';
        C.confirm = null
    }
    C.value = B;
    C.type = "submit";
    C.onclick = C.onclick + (A ? this.url_for(A) : "") + "return false;";
    return this.start_tag_for("input", C)
};
EJS.Helpers.prototype.link_to_if = function(F, B, A, D, C, E) {
    return this.link_to_unless((F == false), B, A, D, C, E)
};
EJS.Helpers.prototype.link_to_unless = function(E, B, A, C, D) {
    C = C || {};
    if (E) {
        if (D && typeof D == "function") {
            return D(B, A, C, D)
        } else {
            return B
        }
    } else {
        return this.link_to(B, A, C)
    }
};
EJS.Helpers.prototype.link_to_unless_current = function(B, A, C, D) {
    C = C || {};
    return this.link_to_unless(this.is_current_page(A), B, A, C, D)
};
EJS.Helpers.prototype.password_field_tag = function(A, C, B) {
    return this.input_field_tag(A, C, "password", B)
};
EJS.Helpers.prototype.select_tag = function(D, G, H, F) {
    F = F || {};
    F.id = F.id || D;
    F.value = G;
    F.name = D;
    var B = "";
    B += this.start_tag_for("select", F);
    for (var E = 0; E < H.length; E++) {
        var C = H[E];
        var A = {
            value: C.value
        };
        if (C.value == G) {
            A.selected = "selected"
        }
        B += this.start_tag_for("option", A) + C.text + this.tag_end("option")
    }
    B += this.tag_end("select");
    return B
};
EJS.Helpers.prototype.single_tag_for = function(A, B) {
    return this.tag(A, B, "/>")
};
EJS.Helpers.prototype.start_tag_for = function(A, B) {
    return this.tag(A, B)
};
EJS.Helpers.prototype.submit_tag = function(A, B) {
    B = B || {};
    B.type = B.type || "submit";
    B.value = A || "Submit";
    return this.single_tag_for("input", B)
};
EJS.Helpers.prototype.tag = function(C, E, D) {
    if (!D) {
        var D = ">"
    }
    var B = " ";
    for (var A in E) {
        if (E[A] != null) {
            var F = E[A].toString()
        } else {
            var F = ""
        }
        if (A == "Class") {
            A = "class"
        }
        if (F.indexOf("'") != -1) {
            B += A + '="' + F + '" '
        } else {
            B += A + "='" + F + "' "
        }
    }
    return "<" + C + B + D
};
EJS.Helpers.prototype.tag_end = function(A) {
    return "</" + A + ">"
};
EJS.Helpers.prototype.text_area_tag = function(A, C, B) {
    B = B || {};
    B.id = B.id || A;
    B.name = B.name || A;
    C = C || "";
    if (B.size) {
        B.cols = B.size.split("x")[0];
        B.rows = B.size.split("x")[1];
        delete B.size
    }
    B.cols = B.cols || 50;
    B.rows = B.rows || 4;
    return this.start_tag_for("textarea", B) + C + this.tag_end("textarea")
};
EJS.Helpers.prototype.text_tag = EJS.Helpers.prototype.text_area_tag;
EJS.Helpers.prototype.text_field_tag = function(A, C, B) {
    return this.input_field_tag(A, C, "text", B)
};
EJS.Helpers.prototype.url_for = function(A) {
    return 'window.location="' + A + '";'
};
EJS.Helpers.prototype.img_tag = function(B, C, A) {
    A = A || {};
    A.src = B;
    A.alt = C;
    return this.single_tag_for("img", A)
}
EJS.Helpers.prototype.date_tag = function(name, value, html_options) {
    if (!(value instanceof Date))
        value = new Date()

    var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var years = [],
        months = [],
        days = [];
    var year = value.getFullYear();
    var month = value.getMonth();
    var day = value.getDate();
    for (var y = year - 15; y < year + 15; y++) {
        years.push({
            value: y,
            text: y
        })
    }
    for (var m = 0; m < 12; m++) {
        months.push({
            value: (m),
            text: month_names[m]
        })
    }
    for (var d = 0; d < 31; d++) {
        days.push({
            value: (d + 1),
            text: (d + 1)
        })
    }
    var year_select = this.select_tag(name + '[year]', year, years, {
        id: name + '[year]'
    })
    var month_select = this.select_tag(name + '[month]', month, months, {
        id: name + '[month]'
    })
    var day_select = this.select_tag(name + '[day]', day, days, {
        id: name + '[day]'
    })

    return year_select + month_select + day_select;
}

EJS.Helpers.prototype.form_tag = function(action, html_options) {


    html_options = html_options || {};
    html_options.action = action
    if (html_options.multipart == true) {
        html_options.method = 'post';
        html_options.enctype = 'multipart/form-data';
    }

    return this.start_tag_for('form', html_options)
}

EJS.Helpers.prototype.form_tag_end = function() {
    return this.tag_end('form');
}

EJS.Helpers.prototype.hidden_field_tag = function(name, value, html_options) {
    return this.input_field_tag(name, value, 'hidden', html_options);
}

EJS.Helpers.prototype.input_field_tag = function(name, value, inputType, html_options) {

    html_options = html_options || {};
    html_options.id = html_options.id || name;
    html_options.value = value || '';
    html_options.type = inputType || 'text';
    html_options.name = name;

    return this.single_tag_for('input', html_options)
}

EJS.Helpers.prototype.is_current_page = function(url) {
    return (window.location.href == url || window.location.pathname == url ? true : false);
}

EJS.Helpers.prototype.link_to = function(name, url, html_options) {
    if (!name) var name = 'null';
    if (!html_options) var html_options = {}

    if (html_options.confirm) {
        html_options.onclick =
            " var ret_confirm = confirm(\"" + html_options.confirm + "\"); if(!ret_confirm){ return false;} "
        html_options.confirm = null;
    }
    html_options.href = url
    return this.start_tag_for('a', html_options) + name + this.tag_end('a');
}

EJS.Helpers.prototype.submit_link_to = function(name, url, html_options) {
    if (!name) var name = 'null';
    if (!html_options) var html_options = {}
    html_options.onclick = html_options.onclick || '';

    if (html_options.confirm) {
        html_options.onclick =
            " var ret_confirm = confirm(\"" + html_options.confirm + "\"); if(!ret_confirm){ return false;} "
        html_options.confirm = null;
    }

    html_options.value = name;
    html_options.type = 'submit'
    html_options.onclick = html_options.onclick +
        (url ? this.url_for(url) : '') + 'return false;';
    //html_options.href='#'+(options ? Routes.url_for(options) : '')
    return this.start_tag_for('input', html_options)
}

EJS.Helpers.prototype.link_to_if = function(condition, name, url, html_options, post, block) {
    return this.link_to_unless((condition == false), name, url, html_options, post, block);
}

EJS.Helpers.prototype.link_to_unless = function(condition, name, url, html_options, block) {
    html_options = html_options || {};
    if (condition) {
        if (block && typeof block == 'function') {
            return block(name, url, html_options, block);
        } else {
            return name;
        }
    } else
        return this.link_to(name, url, html_options);
}

EJS.Helpers.prototype.link_to_unless_current = function(name, url, html_options, block) {
    html_options = html_options || {};
    return this.link_to_unless(this.is_current_page(url), name, url, html_options, block)
}


EJS.Helpers.prototype.password_field_tag = function(name, value, html_options) {
    return this.input_field_tag(name, value, 'password', html_options);
}

EJS.Helpers.prototype.select_tag = function(name, value, choices, html_options) {
    html_options = html_options || {};
    html_options.id = html_options.id || name;
    html_options.value = value;
    html_options.name = name;

    var txt = ''
    txt += this.start_tag_for('select', html_options)

    for (var i = 0; i < choices.length; i++) {
        var choice = choices[i];
        var optionOptions = {
            value: choice.value
        }
        if (choice.value == value)
            optionOptions.selected = 'selected'
        txt += this.start_tag_for('option', optionOptions) + choice.text + this.tag_end('option')
    }
    txt += this.tag_end('select');
    return txt;
}

EJS.Helpers.prototype.single_tag_for = function(tag, html_options) {
    return this.tag(tag, html_options, '/>');
}

EJS.Helpers.prototype.start_tag_for = function(tag, html_options) {
    return this.tag(tag, html_options);
}

EJS.Helpers.prototype.submit_tag = function(name, html_options) {
    html_options = html_options || {};
    //html_options.name  = html_options.id  || 'commit';
    html_options.type = html_options.type || 'submit';
    html_options.value = name || 'Submit';
    return this.single_tag_for('input', html_options);
}

EJS.Helpers.prototype.tag = function(tag, html_options, end) {
    if (!end) var end = '>'
    var txt = ' '
    for (var attr in html_options) {
        if (html_options[attr] != null)
            var value = html_options[attr].toString();
        else
            var value = ''
        if (attr == "Class") // special case because "class" is a reserved word in IE
            attr = "class";
        if (value.indexOf("'") != -1)
            txt += attr + '=\"' + value + '\" '
        else
            txt += attr + "='" + value + "' "
    }
    return '<' + tag + txt + end;
}

EJS.Helpers.prototype.tag_end = function(tag) {
    return '</' + tag + '>';
}

EJS.Helpers.prototype.text_area_tag = function(name, value, html_options) {
    html_options = html_options || {};
    html_options.id = html_options.id || name;
    html_options.name = html_options.name || name;
    value = value || ''
    if (html_options.size) {
        html_options.cols = html_options.size.split('x')[0]
        html_options.rows = html_options.size.split('x')[1];
        delete html_options.size
    }

    html_options.cols = html_options.cols || 50;
    html_options.rows = html_options.rows || 4;

    return this.start_tag_for('textarea', html_options) + value + this.tag_end('textarea')
}
EJS.Helpers.prototype.text_tag = EJS.Helpers.prototype.text_area_tag

EJS.Helpers.prototype.text_field_tag = function(name, value, html_options) {
    return this.input_field_tag(name, value, 'text', html_options);
}

EJS.Helpers.prototype.url_for = function(url) {
    return 'window.location="' + url + '";'
}
EJS.Helpers.prototype.img_tag = function(image_location, alt, options) {
    options = options || {};
    options.src = image_location
    options.alt = alt
    return this.single_tag_for('img', options)
}
var H5P = H5P || {};

/**
 * Class responsible for creating a help text dialog
 */
H5P.JoubelHelpTextDialog = (function($) {

    var numInstances = 0;
    /**
     * Display a pop-up containing a message.
     *
     * @param {H5P.jQuery}  $container  The container which message dialog will be appended to
     * @param {string}      message     The message
     * @param {string}      closeButtonTitle The title for the close button
     * @return {H5P.jQuery}
     */
    function JoubelHelpTextDialog(header, message, closeButtonTitle) {
        H5P.EventDispatcher.call(this);

        var self = this;

        numInstances++;
        var headerId = 'joubel-help-text-header-' + numInstances;
        var helpTextId = 'joubel-help-text-body-' + numInstances;

        var $helpTextDialogBox = $('<div>', {
            'class': 'joubel-help-text-dialog-box',
            'role': 'dialog',
            'aria-labelledby': headerId,
            'aria-describedby': helpTextId
        });

        $('<div>', {
            'class': 'joubel-help-text-dialog-background'
        }).appendTo($helpTextDialogBox);

        var $helpTextDialogContainer = $('<div>', {
            'class': 'joubel-help-text-dialog-container'
        }).appendTo($helpTextDialogBox);

        $('<div>', {
            'class': 'joubel-help-text-header',
            'id': headerId,
            'role': 'header',
            'html': header
        }).appendTo($helpTextDialogContainer);

        $('<div>', {
            'class': 'joubel-help-text-body',
            'id': helpTextId,
            'html': message,
            'role': 'document',
            'tabindex': 0
        }).appendTo($helpTextDialogContainer);

        var handleClose = function() {
            $helpTextDialogBox.remove();
            self.trigger('closed');
        };

        var $closeButton = $('<div>', {
            'class': 'joubel-help-text-remove',
            'role': 'button',
            'title': closeButtonTitle,
            'tabindex': 1,
            'click': handleClose,
            'keydown': function(event) {
                // 32 - space, 13 - enter
                if ([32, 13].indexOf(event.which) !== -1) {
                    event.preventDefault();
                    handleClose();
                }
            }
        }).appendTo($helpTextDialogContainer);

        /**
         * Get the DOM element
         * @return {HTMLElement}
         */
        self.getElement = function() {
            return $helpTextDialogBox;
        };

        self.focus = function() {
            $closeButton.focus();
        };
    }

    JoubelHelpTextDialog.prototype = Object.create(H5P.EventDispatcher.prototype);
    JoubelHelpTextDialog.prototype.constructor = JoubelHelpTextDialog;

    return JoubelHelpTextDialog;
}(H5P.jQuery));
var H5P = H5P || {};

/**
 * Class responsible for creating a circular progress bar
 */

H5P.JoubelProgressCircle = (function($) {

    /**
     * Constructor for the Progress Circle
     *
     * @param {Number} number The amount of progress to display
     * @param {string} progressColor Color for the progress meter
     * @param {string} backgroundColor Color behind the progress meter
     */
    function ProgressCircle(number, progressColor, fillColor, backgroundColor) {
        progressColor = progressColor || '#1a73d9';
        fillColor = fillColor || '#f0f0f0';
        backgroundColor = backgroundColor || '#ffffff';
        var progressColorRGB = this.hexToRgb(progressColor);

        //Verify number
        try {
            number = Number(number);
            if (number === '') {
                throw 'is empty';
            }
            if (isNaN(number)) {
                throw 'is not a number';
            }
        } catch (e) {
            number = 'err';
        }

        //Draw circle
        if (number > 100) {
            number = 100;
        }

        // We can not use rgba, since they will stack on top of each other.
        // Instead we create the equivalent of the rgba color
        // and applies this to the activeborder and background color.
        var progressColorString = 'rgb(' + parseInt(progressColorRGB.r, 10) +
            ',' + parseInt(progressColorRGB.g, 10) +
            ',' + parseInt(progressColorRGB.b, 10) + ')';

        // Circle wrapper
        var $wrapper = $('<div/>', {
            'class': "joubel-progress-circle-wrapper"
        });

        //Active border indicates progress
        var $activeBorder = $('<div/>', {
            'class': "joubel-progress-circle-active-border"
        }).appendTo($wrapper);

        //Background circle
        var $backgroundCircle = $('<div/>', {
            'class': "joubel-progress-circle-circle"
        }).appendTo($activeBorder);

        //Progress text/number
        $('<span/>', {
            'text': number + '%',
            'class': "joubel-progress-circle-percentage"
        }).appendTo($backgroundCircle);

        var deg = number * 3.6;
        if (deg <= 180) {
            $activeBorder.css('background-image',
                    'linear-gradient(' + (90 + deg) + 'deg, transparent 50%, ' + fillColor + ' 50%),' +
                    'linear-gradient(90deg, ' + fillColor + ' 50%, transparent 50%)')
                .css('border', '2px solid' + backgroundColor)
                .css('background-color', progressColorString);
        } else {
            $activeBorder.css('background-image',
                    'linear-gradient(' + (deg - 90) + 'deg, transparent 50%, ' + progressColorString + ' 50%),' +
                    'linear-gradient(90deg, ' + fillColor + ' 50%, transparent 50%)')
                .css('border', '2px solid' + backgroundColor)
                .css('background-color', progressColorString);
        }

        this.$activeBorder = $activeBorder;
        this.$backgroundCircle = $backgroundCircle;
        this.$wrapper = $wrapper;

        this.initResizeFunctionality();

        return $wrapper;
    }

    /**
     * Initializes resize functionality for the progress circle
     */
    ProgressCircle.prototype.initResizeFunctionality = function() {
        var self = this;

        $(window).resize(function() {
            // Queue resize
            setTimeout(function() {
                self.resize();
            });
        });

        // First resize
        setTimeout(function() {
            self.resize();
        }, 0);
    };

    /**
     * Resize function makes progress circle grow or shrink relative to parent container
     */
    ProgressCircle.prototype.resize = function() {
        var $parent = this.$wrapper.parent();

        if ($parent !== undefined && $parent) {

            // Measurements
            var fontSize = parseInt($parent.css('font-size'), 10);

            // Static sizes
            var fontSizeMultiplum = 3.75;
            var progressCircleWidthPx = parseInt((fontSize / 4.5), 10) % 2 === 0 ? parseInt((fontSize / 4.5), 10) + 4 : parseInt((fontSize / 4.5), 10) + 5;
            var progressCircleOffset = progressCircleWidthPx / 2;

            var width = fontSize * fontSizeMultiplum;
            var height = fontSize * fontSizeMultiplum;
            this.$activeBorder.css({
                'width': width,
                'height': height
            });

            this.$backgroundCircle.css({
                'width': width - progressCircleWidthPx,
                'height': height - progressCircleWidthPx,
                'top': progressCircleOffset,
                'left': progressCircleOffset
            });
        }
    };

    /**
     * Hex to RGB conversion
     * @param hex
     * @returns {{r: Number, g: Number, b: Number}}
     */
    ProgressCircle.prototype.hexToRgb = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    return ProgressCircle;

}(H5P.jQuery));
/** @namespace H5P */
H5P.VideoBrightcove = (function($) {

    /**
     * Brightcove video player for H5P.
     *
     * @class
     * @param {Array} sources Video files to use
     * @param {Object} options Settings for the player
     * @param {Object} l10n Localization strings
     */
    function Brightcove(sources, options, l10n) {

        var initiateStyling = function() {
            H5P.jQuery('style', window.parent.document).filter(function() {
                let bcStyles = H5P.jQuery(this).attr('id') === 'bc-style-vjs' ||
                    (H5P.jQuery(this).attr('class') && H5P.jQuery(this).attr('class').search(videoId.dataPlayer) !== -1);
                if (bcStyles) {
                    return true;
                } else {
                    return false;
                }
            }).appendTo(H5P.jQuery('head'));
            H5P.jQuery('<style></style>').attr('type', 'text/css').text('.h5p-actions{display:none !important;}').appendTo(H5P.jQuery('head'));
        }

        let isActivityCreateMode = window.location.pathname.split('/').filter(x => (x === 'create') || (x === 'activity')).length === 2 ? true : false;
        let isActivityEditMode = window.location.pathname.split('/').filter(x => (x === 'edit') || (x === 'activity')).length === 2 ? true : false;
        let isActivityPreviewMode = window.location.pathname.split('/').filter(x => (x === 'preview') || (x === 'activity')).length === 2 ? true : false;
        const hideIVDefaultControls = !(isActivityCreateMode || isActivityEditMode || isActivityPreviewMode);

        var self = this;

        var player;
        var playbackRate = 1;
        var id = 'h5p-brightcove-' + numInstances;
        numInstances++;

        var $wrapper = $('<div/>').attr('id', 'curriki-player-wrapper');
        var $placeholder = $('<div/>', {
            id: id,
            html: '<div id="loading-wrapper">' + l10n.loading + '</div>'
        });

        var videoId = getId(sources[0].path);
        window.videoIdGlobal = getId(sources[0].path);
        let videoJsTagId = 'curriki-brightcove';
        var iframeDimensions = {
            width: 0,
            height: 0
        };
        if (window.parent.bcPlayerExternal) {
            videoJsTagId = window.parent.bcPlayerExternal.tagAttributes.id;
            //window.parent.document.getElementById(videoJsTagId).remove();
            H5P.jQuery('#' + videoJsTagId, window.parent.document).appendTo($placeholder);
            initiateStyling();
            $placeholder.appendTo($wrapper);
            H5P.jQuery('#' + videoJsTagId + '-container .h5p-iframe-wrapper iframe', window.parent.document).show();
            iframeDimensions.width = H5P.jQuery('#' + videoJsTagId + '-container .h5p-iframe-wrapper iframe', window.parent.document).width();
            iframeDimensions.height = H5P.jQuery('#' + videoJsTagId + '-container .h5p-iframe-wrapper iframe', window.parent.document).height();

            if (!window.bcPlayerInteractionsLoaded) {
                H5P.jQuery(window.parent.bcPlayerExternal.el()).find('p.vjs-loading-message').remove();
                let playTime = window.parent.bcPlayerExternalCurrentTime ? window.parent.bcPlayerExternalCurrentTime : 0;
                window.parent.bcPlayerExternal.currentTime(playTime);
                window.parent.bcPlayerExternal.play();
                window.parent.bcPlayerExternal.controls(true);
                window.parent.bcPlayerInteractionsLoaded = true;
            }

        } else {
            window.videoJsTagIdGlobal = videoJsTagId;
            H5P.jQuery('<video-js id="' + videoJsTagId + '" data-account="' + videoId.dataAccount + '" data-player="' + videoId.dataPlayer + '" data-embed="' + videoId.dataEmbed + '" controls="" data-video-id="' + videoId.dataVideoId + '" data-playlist-id="" data-application-id=""></video-js>').appendTo($placeholder);
            $placeholder.appendTo($wrapper);
        }

        self.brightcoveUrlParts = null;
        self.isPlayerLoaded = false;

        // Optional placeholder
        // var $placeholder = $('<iframe id="' + id + '" type="text/html" width="640" height="360" src="https://www.brightcove.com/embed/' + getId(sources[0].path) + '?enablejsapi=1&origin=' + encodeURIComponent(ORIGIN) + '&autoplay=' + (options.autoplay ? 1 : 0) + '&controls=' + (options.controls ? 1 : 0) + '&disabledkb=' + (options.controls ? 0 : 1) + '&fs=0&loop=' + (options.loop ? 1 : 0) + '&rel=0&showinfo=0&iv_load_policy=3" frameborder="0"></iframe>').appendTo($wrapper);

        var initiatePLayerControlsExternalEmbed = function(videojsLib, player, width) {
            player.getChild('controlBar').removeChild('FullscreenToggle');
            var FullscreenToggle = videojsLib.getComponent('FullscreenToggle');
            var CurrikiFullScreenButton = videojsLib.extend(FullscreenToggle, {
                constructor: function() {
                    FullscreenToggle.apply(this, arguments);
                    //this.addClass('vjs-fullscreen-control');
                },
                handleClick: function() {
                    self.parent.controls.$fullscreen.trigger('click');
                }
            });
            videojsLib.registerComponent('CurrikiFullScreenButton', CurrikiFullScreenButton);
            player.getChild('controlBar').addChild('currikiFullScreenButton', {});

            player.on('play', function() {
                self.trigger('stateChange', H5P.Video.PLAYING);
            });

            player.on('pause', function() {
                self.trigger('stateChange', H5P.Video.PAUSED);
            });

            player.on('buffered', function() {
                self.trigger('stateChange', H5P.Video.BUFFERING);
            });

            player.on('ended', function() {
                self.trigger('stateChange', H5P.Video.ENDED);
            });

            player.width(width);
            let height = width * (9 / 16);
            player.height(height);
            if (hideIVDefaultControls) {
                player.controls(true);
            } else {
                player.controls(false);
            }

            self.trigger('ready');
            self.trigger('loaded');

            if (hideIVDefaultControls && window.parent.bcPlayerExternal) {
                H5P.jQuery('.h5p-controls').hide();
                H5P.jQuery('.h5p-splash-wrapper').hide();
                H5P.jQuery('.h5p-content').css('border', '0px');
            }
        }

        /**
         * Use the Brightcove API to create a new player
         *
         * @private
         */
        var create = function() {

            H5P.jQuery('#loading-wrapper').remove();
            if (!$placeholder.is(':visible') || player !== undefined) {
                return;
            }

            let videojsLib = window.parent.bcPlayerExternal ? window.parent.videojs : window.videojs;
            if (videojsLib === undefined) {
                // Load Bridghtcove library
                loadAPI(create);
                //return;
            }

            var width = $wrapper.width();
            if (width < 200) {
                width = 200;
            }

            player = window.parent.bcPlayerExternal ? window.parent.bcPlayerExternal : undefined;
            if (player) {
                player.tech_.off('dblclick');
                initiatePLayerControlsExternalEmbed(videojsLib, player, width);
                return;
            }

            var intervalCount = 0;
            let cntrStartTime = new Date();
            var videojsloadTime = setInterval(function(e) {
                videojsLib = window.parent.bcPlayerExternal ? window.parent.videojs : window.videojs;
                if (videojsLib !== undefined) {
                    if (videojsLib) {
                        player = videojsLib(window.videoJsTagIdGlobal);
                    }

                    const videoId = getId(sources[0].path);

                    player.tech_.off('dblclick');
                    // when player has HAVE_ENOUGH_DATA state. https://docs.videojs.com/player#readyState
                    if ((player.readyState() === 4 || player.readyState() === 2) && !window.videoJsEventsInitiated) {
                        /************[start full screen]*********************/
                        player.getChild('controlBar').removeChild('FullscreenToggle');
                        var FullscreenToggle = videojsLib.getComponent('FullscreenToggle');
                        var CurrikiFullScreenButton = videojsLib.extend(FullscreenToggle, {
                            constructor: function() {
                                FullscreenToggle.apply(this, arguments);
                                //this.addClass('vjs-fullscreen-control');
                            },
                            handleClick: function() {
                                self.parent.controls.$fullscreen.trigger('click');
                            }
                        });
                        videojsLib.registerComponent('CurrikiFullScreenButton', CurrikiFullScreenButton);
                        player.getChild('controlBar').addChild('currikiFullScreenButton', {});

                        // /************[end full screen]*********************/

                        player.on('play', function() {
                            self.trigger('stateChange', H5P.Video.PLAYING);
                        });

                        player.on('pause', function() {
                            self.trigger('stateChange', H5P.Video.PAUSED);
                        });


                        player.on('buffered', function() {
                            self.trigger('stateChange', H5P.Video.BUFFERING);
                        });

                        player.on('ended', function() {
                            self.trigger('stateChange', H5P.Video.ENDED);
                        });

                        player.ready(function() {
                            H5P.jQuery('#loading-msg').remove();
                            H5P.jQuery('#' + videoJsTagId).show();
                            player.width(width);
                            let height = width * (9 / 16);
                            player.height(height);
                            if (hideIVDefaultControls) {
                                player.controls(true);
                            } else {
                                player.controls(false);
                            }

                            self.trigger('ready');
                            self.trigger('loaded');
                        });
                        clearInterval(videojsloadTime);
                        window.videoJsEventsInitiated = true;
                    } else if ((((new Date().getTime()) - cntrStartTime.getTime()) / 1000) > 60) {
                        console.log("Player could not get ready after waiting for 1 minute.");
                        clearInterval(videojsloadTime);
                    }
                } else if (intervalCount === 20) {
                    console.log("VideoJS not loaded. or it's taking too much time to load.");
                    clearInterval(videojsloadTime);
                }
                intervalCount++;
            }, 1000);

        };

        /**
         * Indicates if the video must be clicked for it to start playing.
         * For instance Brightcove videos on iPad must be pressed to start playing.
         *
         * @public
         */
        self.pressToPlay = navigator.userAgent.match(/iPad/i) ? true : false;

        /**
         * Appends the video player to the DOM.
         *
         * @public
         * @param {jQuery} $container
         */
        self.appendTo = function($container) {
            $container.addClass('h5p-brightcove').append($wrapper);
            create();
        };

        /**
         * Get list of available qualities. Not available until after play.
         *
         * @public
         * @returns {Array}
         */
        self.getQualities = function() {
            if (!player || !player.getAvailableQualityLevels) {
                return;
            }

            var qualities = player.getAvailableQualityLevels();
            if (!qualities.length) {
                return; // No qualities
            }

            // Add labels
            for (var i = 0; i < qualities.length; i++) {
                var quality = qualities[i];
                var label = (LABELS[quality] !== undefined ? LABELS[quality] : 'Unknown'); // TODO: l10n
                qualities[i] = {
                    name: quality,
                    label: LABELS[quality]
                };
            }

            return qualities;
        };

        /**
         * Get current playback quality. Not available until after play.
         *
         * @public
         * @returns {String}
         */
        self.getQuality = function() {
            if (!player || !player.getPlaybackQuality) {
                return;
            }

            var quality = player.getPlaybackQuality();
            return quality === 'unknown' ? undefined : quality;
        };

        /**
         * Set current playback quality. Not available until after play.
         * Listen to event "qualityChange" to check if successful.
         *
         * @public
         * @params {String} [quality]
         */
        self.setQuality = function(quality) {
            if (!player || !player.setPlaybackQuality) {
                return;
            }

            player.setPlaybackQuality(quality);
        };

        /**
         * Start the video.
         *
         * @public
         */
        self.play = function() {
            if (!player || !player.play) {
                self.on('ready', self.play);
                return;
            }

            player.play();
        };

        /**
         * Pause the video.
         *
         * @public
         */
        self.pause = function() {
            self.off('ready', self.play);
            if (!player || !player.pause) {
                return;
            }
            player.pause();
        };

        /**
         * Seek video to given time.
         *
         * @public
         * @param {Number} time
         */
        self.seek = function(time) {
            if (!player || !player.currentTime) {
                return;
            }
            player.currentTime(time);
        };

        /**
         * Get elapsed time since video beginning.
         *
         * @public
         * @returns {Number}
         */
        self.getCurrentTime = function() {
            if (!player || !player.currentTime) {
                return;
            }
            return player.currentTime();
        };

        /**
         * Get total video duration time.
         *
         * @public
         * @returns {Number}
         */
        self.getDuration = function() {
            if (!player || !player.duration) {
                return;
            }
            return player.duration();
        };

        /**
         * Get percentage of video that is buffered.
         *
         * @public
         * @returns {Number} Between 0 and 100
         */
        self.getBuffered = function() {
            if (!player || !player.bufferedPercent) {
                return;
            }

            return player.bufferedPercent();
        };

        /**
         * Turn off video sound.
         *
         * @public
         */
        self.mute = function() {
            if (!player || !player.muted) {
                return;
            }

            player.muted(true);
        };

        /**
         * Turn on video sound.
         *
         * @public
         */
        self.unMute = function() {
            if (!player || !player.muted) {
                return;
            }

            player.muted(false);
        };

        /**
         * Check if video sound is turned on or off.
         *
         * @public
         * @returns {Boolean}
         */
        self.isMuted = function() {
            if (!player || !player.muted) {
                return;
            }

            return player.muted();
        };

        /**
         * Return the video sound level.
         *
         * @public
         * @returns {Number} Between 0 and 100.
         */
        self.getVolume = function() {
            if (!player || !player.volume) {
                return;
            }

            return player.volume();
        };

        /**
         * Set video sound level.
         *
         * @public
         * @param {Number} level Between 0 and 100.
         */
        self.setVolume = function(level) {
            if (!player || !player.volume) {
                return;
            }

            player.volume(level);
        };

        /**
         * Get list of available playback rates.
         *
         * @public
         * @returns {Array} available playback rates
         */
        self.getPlaybackRates = function() {
            return [0.25, 0.5, 1, 1.25, 1.5, 2];
        };

        /**
         * Get current playback rate.
         *
         * @public
         * @returns {Number} such as 0.25, 0.5, 1, 1.25, 1.5 and 2
         */
        self.getPlaybackRate = function() {
            if (!player || !player.playbackRate) {
                return;
            }

            return player.playbackRate();
        };

        /**
         * Set current playback rate.
         * Listen to event "playbackRateChange" to check if successful.
         *
         * @public
         * @params {Number} suggested rate that may be rounded to supported values
         */
        self.setPlaybackRate = function(newPlaybackRate) {
            if (!player || !player.playbackRate) {
                return;
            }

            playbackRate = Number(newPlaybackRate);
            player.playbackRate(playbackRate);
        };

        /**
         * Set current captions track.
         *
         * @param {H5P.Video.LabelValue} Captions track to show during playback
         */
        self.setCaptionsTrack = function(track) {
            player.setOption('captions', 'track', track ? {
                languageCode: track.value
            } : {});
        };

        /**
         * Figure out which captions track is currently used.
         *
         * @return {H5P.Video.LabelValue} Captions track
         */
        self.getCaptionsTrack = function() {
            var track = player.getOption('captions', 'track');
            return (track.languageCode ? new H5P.Video.LabelValue(track.displayName, track.languageCode) : null);
        };

        var manageStylesOnResize = function() {
            H5P.jQuery('style', window.parent.document).filter(function() {
                let bcStyles = H5P.jQuery(this).attr('id') === 'bc-style-vjs' ||
                    (H5P.jQuery(this).attr('class') && H5P.jQuery(this).attr('class').search(videoId.dataPlayer) !== -1);
                if (bcStyles) {
                    let domSelectorType = H5P.jQuery(this).attr('id') ? '#' : '.';
                    let domSelectorTypeAttr = H5P.jQuery(this).attr('id') ? 'id' : 'class';
                    H5P.jQuery(domSelectorType + H5P.jQuery(this).attr(domSelectorTypeAttr)).remove();
                    return H5P.jQuery(domSelectorType + H5P.jQuery(this).attr(domSelectorTypeAttr)) ? true : false;
                } else {
                    return false;
                }
            }).appendTo(H5P.jQuery('head'));
        }

        // Respond to resize events by setting the YT player size.
        self.on('resize', function() {

            if (!$wrapper.is(':visible')) {
                return;
            }

            if (!player) {
                // Player isn't created yet. Try again.
                create();
                return;
            }

            // Use as much space as possible
            $wrapper.css({
                width: '100%',
                height: '100%'
            });

            var width = $wrapper[0].clientWidth;
            var height = options.fit ? $wrapper[0].clientHeight : (width * (9 / 16));

            if (window.parent.bcPlayerExternal && H5P.jQuery('body.h5p-fullscreen', window.parent.document).get().length > 0) {
                width = H5P.jQuery('.h5p-fullscreen', window.parent.document).width();
                height = options.fit ? H5P.jQuery('.h5p-fullscreen', window.parent.document).height() : (width * (9 / 16));
                H5P.jQuery('#' + videoJsTagId + '-container .h5p-iframe-wrapper iframe', window.parent.document).width(width);
                H5P.jQuery('#' + videoJsTagId + '-container .h5p-iframe-wrapper iframe', window.parent.document).height(height);
                height = height - 30;
            } else if (window.parent.bcPlayerExternal && H5P.jQuery('body.h5p-fullscreen', window.parent.document).get().length === 0) {
                H5P.jQuery('#' + videoJsTagId + '-container .h5p-iframe-wrapper iframe', window.parent.document).width(iframeDimensions.width);
                H5P.jQuery('#' + videoJsTagId + '-container .h5p-iframe-wrapper iframe', window.parent.document).height(iframeDimensions.height);
                width = iframeDimensions.width;
                height = iframeDimensions.height;
                height = height > 200 ? height : (width * (9 / 16));
            }

            // Set size
            $wrapper.css({
                width: width + 'px',
                height: height + 'px'
            });

            player.width(width);
            player.height(height);

            if (window.parent.bcPlayerExternal) {
                manageStylesOnResize();
                H5P.jQuery('.h5p-splash-wrapper').remove();
            }
        });
    }

    /**
     * Check to see if we can play any of the given sources.
     *
     * @public
     * @static
     * @param {Array} sources
     * @returns {Boolean}
     */
    Brightcove.canPlay = function(sources) {
        return getId(sources[0].path);
    };

    /**
     * Find id of Brightcove video from given URL.
     *
     * @private
     * @param {String} url
     * @returns {String} Brightcove video identifier
     */

    var getId = function(url) {
        // Has some false positives, but should cover all regular URLs that people can find
        var matches = url.match(/((?:(?:https?|ftp|file):\/\/|www\.)players.brightcove.net)\/([0-9]*)\/(\w+)\/(index.html)\?(\w+)\=([0-9]*)/i);
        if (matches && matches.length === 7) {
            let dataPlayer = matches[3].split('_').length === 2 ? matches[3].split('_')[0] : 'default';
            let dataEmbed = matches[3].split('_')[1];
            let brightcoveUrlParts = {
                dataAccount: matches[2],
                dataVideoId: matches[6],
                dataPlayer,
                dataEmbed
            };
            self.brightcoveUrlParts = brightcoveUrlParts;
            return brightcoveUrlParts;
        }
    };

    /**
     * Load the IFrame Player API asynchronously.
     */
    var loadAPI = function(loaded) {
        if (window.onBrightcoveIframeAPIReady !== undefined) {
            // Someone else is loading, hook in
            var original = window.onBrightcoveIframeAPIReady;
            window.onBrightcoveIframeAPIReady = function(id) {
                loaded(id);
                original(id);
            };
        } else {
            // Load the API our self
            var tag = document.createElement('script');
            tag.src = "https://players.brightcove.net/" + self.brightcoveUrlParts.dataAccount + "/" + window.videoIdGlobal.dataPlayer + "_" + self.brightcoveUrlParts.dataEmbed + "/index.min.js";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onBrightcoveIframeAPIReady = loaded;
        }
    };

    /** @constant {Object} */
    var LABELS = {
        highres: '2160p', // Old API support
        hd2160: '2160p', // (New API)
        hd1440: '1440p',
        hd1080: '1080p',
        hd720: '720p',
        large: '480p',
        medium: '360p',
        small: '240p',
        tiny: '144p',
        auto: 'Auto'
    };

    /** @private */
    var numInstances = 0;

    // Extract the current origin (used for security)
    var ORIGIN = window.location.href.match(/http[s]?:\/\/[^\/]+/);
    ORIGIN = !ORIGIN || ORIGIN[0] === undefined ? undefined : ORIGIN[0];
    // ORIGIN = undefined is needed to support fetching file from device local storage

    return Brightcove;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
H5P.videoHandlers.push(H5P.VideoBrightcove);
var H5P = H5P || {};
/**
 * Transition contains helper function relevant for transitioning
 */
H5P.Transition = (function($) {

    /**
     * @class
     * @namespace H5P
     */
    Transition = {};

    /**
     * @private
     */
    Transition.transitionEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'transition': 'transitionend',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    };

    /**
     * @private
     */
    Transition.cache = [];

    /**
     * Get the vendor property name for an event
     *
     * @function H5P.Transition.getVendorPropertyName
     * @static
     * @private
     * @param  {string} prop Generic property name
     * @return {string}      Vendor specific property name
     */
    Transition.getVendorPropertyName = function(prop) {

        if (Transition.cache[prop] !== undefined) {
            return Transition.cache[prop];
        }

        var div = document.createElement('div');

        // Handle unprefixed versions (FF16+, for example)
        if (prop in div.style) {
            Transition.cache[prop] = prop;
        } else {
            var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
            var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

            if (prop in div.style) {
                Transition.cache[prop] = prop;
            } else {
                for (var i = 0; i < prefixes.length; ++i) {
                    var vendorProp = prefixes[i] + prop_;
                    if (vendorProp in div.style) {
                        Transition.cache[prop] = vendorProp;
                        break;
                    }
                }
            }
        }

        return Transition.cache[prop];
    };

    /**
     * Get the name of the transition end event
     *
     * @static
     * @private
     * @return {string}  description
     */
    Transition.getTransitionEndEventName = function() {
        return Transition.transitionEndEventNames[Transition.getVendorPropertyName('transition')] || undefined;
    };

    /**
     * Helper function for listening on transition end events
     *
     * @function H5P.Transition.onTransitionEnd
     * @static
     * @param  {domElement} $element The element which is transitioned
     * @param  {function} callback The callback to be invoked when transition is finished
     * @param  {number} timeout  Timeout in milliseconds. Fallback if transition event is never fired
     */
    Transition.onTransitionEnd = function($element, callback, timeout) {
        // Fallback on 1 second if transition event is not supported/triggered
        timeout = timeout || 1000;
        Transition.transitionEndEventName = Transition.transitionEndEventName || Transition.getTransitionEndEventName();
        var callbackCalled = false;

        var doCallback = function() {
            if (callbackCalled) {
                return;
            }
            $element.off(Transition.transitionEndEventName, callback);
            callbackCalled = true;
            clearTimeout(timer);
            callback();
        };

        var timer = setTimeout(function() {
            doCallback();
        }, timeout);

        $element.on(Transition.transitionEndEventName, function() {
            doCallback();
        });
    };

    /**
     * Wait for a transition - when finished, invokes next in line
     *
     * @private
     *
     * @param {Object[]}    transitions             Array of transitions
     * @param {H5P.jQuery}  transitions[].$element  Dom element transition is performed on
     * @param {number=}     transitions[].timeout   Timeout fallback if transition end never is triggered
     * @param {bool=}       transitions[].break     If true, sequence breaks after this transition
     * @param {number}      index                   The index for current transition
     */
    var runSequence = function(transitions, index) {
        if (index >= transitions.length) {
            return;
        }

        var transition = transitions[index];
        H5P.Transition.onTransitionEnd(transition.$element, function() {
            if (transition.end) {
                transition.end();
            }
            if (transition.break !== true) {
                runSequence(transitions, index + 1);
            }
        }, transition.timeout || undefined);
    };

    /**
     * Run a sequence of transitions
     *
     * @function H5P.Transition.sequence
     * @static
     * @param {Object[]}    transitions             Array of transitions
     * @param {H5P.jQuery}  transitions[].$element  Dom element transition is performed on
     * @param {number=}     transitions[].timeout   Timeout fallback if transition end never is triggered
     * @param {bool=}       transitions[].break     If true, sequence breaks after this transition
     */
    Transition.sequence = function(transitions) {
        runSequence(transitions, 0);
    };

    return Transition;
})(H5P.jQuery);
var oldDrop = window.Drop;
var oldTether = window.Tether;
Tether = H5P.Tether;
! function(t, e) {
    "function" == typeof define && define.amd ? define(["tether"], e) : "object" == typeof exports ? module.exports = e(require("tether")) : t.Drop = e(t.Tether)
}(this, function(t) {
    "use strict";

    function e(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function n(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function o(t) {
        var e = t.split(" "),
            n = a(e, 2),
            o = n[0],
            i = n[1];
        if (["left", "right"].indexOf(o) >= 0) {
            var s = [i, o];
            o = s[0], i = s[1]
        }
        return [o, i].join(" ")
    }

    function i(t, e) {
        for (var n = void 0, o = []; - 1 !== (n = t.indexOf(e));) o.push(t.splice(n, 1));
        return o
    }

    function s() {
        var a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
            u = function() {
                for (var t = arguments.length, e = Array(t), n = 0; t > n; n++) e[n] = arguments[n];
                return new(r.apply(b, [null].concat(e)))
            };
        p(u, {
            createContext: s,
            drops: [],
            defaults: {}
        });
        var g = {
            classPrefix: "drop",
            defaults: {
                position: "bottom left",
                openOn: "click",
                beforeClose: null,
                constrainToScrollParent: !0,
                constrainToWindow: !0,
                classes: "",
                remove: !1,
                tetherOptions: {}
            }
        };
        p(u, g, a), p(u.defaults, g.defaults, a.defaults), "undefined" == typeof x[u.classPrefix] && (x[u.classPrefix] = []), u.updateBodyClasses = function() {
            for (var t = !1, e = x[u.classPrefix], n = e.length, o = 0; n > o; ++o)
                if (e[o].isOpened()) {
                    t = !0;
                    break
                } t ? d(document.body, u.classPrefix + "-open") : c(document.body, u.classPrefix + "-open")
        };
        var b = function(s) {
            function r(t) {
                if (e(this, r), l(Object.getPrototypeOf(r.prototype), "constructor", this).call(this), this.options = p({}, u.defaults, t), this.target = this.options.target, "undefined" == typeof this.target) throw new Error("Drop Error: You must provide a target.");
                var n = "data-" + u.classPrefix,
                    o = this.target.getAttribute(n);
                o && (this.options.content = o);
                for (var i = ["position", "openOn"], s = 0; s < i.length; ++s) {
                    var a = this.target.getAttribute(n + "-" + i[s]);
                    a && (this.options[i[s]] = a)
                }
                this.options.classes && this.options.addTargetClasses !== !1 && d(this.target, this.options.classes), u.drops.push(this), x[u.classPrefix].push(this), this._boundEvents = [], this.bindMethods(), this.setupElements(), this.setupEvents(), this.setupTether()
            }
            return n(r, s), h(r, [{
                key: "_on",
                value: function(t, e, n) {
                    this._boundEvents.push({
                        element: t,
                        event: e,
                        handler: n
                    }), t.addEventListener(e, n)
                }
            }, {
                key: "bindMethods",
                value: function() {
                    this.transitionEndHandler = this._transitionEndHandler.bind(this)
                }
            }, {
                key: "setupElements",
                value: function() {
                    var t = this;
                    if (this.drop = document.createElement("div"), d(this.drop, u.classPrefix), this.options.classes && d(this.drop, this.options.classes), this.content = document.createElement("div"), d(this.content, u.classPrefix + "-content"), "function" == typeof this.options.content) {
                        var e = function() {
                            var e = t.options.content.call(t, t);
                            if ("string" == typeof e) t.content.innerHTML = e;
                            else {
                                if ("object" != typeof e) throw new Error("Drop Error: Content function should return a string or HTMLElement.");
                                t.content.innerHTML = "", t.content.appendChild(e)
                            }
                        };
                        e(), this.on("open", e.bind(this))
                    } else "object" == typeof this.options.content ? this.content.appendChild(this.options.content) : this.content.innerHTML = this.options.content;
                    this.drop.appendChild(this.content)
                }
            }, {
                key: "setupTether",
                value: function() {
                    var e = this.options.position.split(" ");
                    e[0] = E[e[0]], e = e.join(" ");
                    var n = [];
                    this.options.constrainToScrollParent ? n.push({
                        to: "scrollParent",
                        pin: "top, bottom",
                        attachment: "together none"
                    }) : n.push({
                        to: "scrollParent"
                    }), this.options.constrainToWindow !== !1 ? n.push({
                        to: "window",
                        attachment: "together"
                    }) : n.push({
                        to: "window"
                    });
                    var i = {
                        element: this.drop,
                        target: this.target,
                        attachment: o(e),
                        targetAttachment: o(this.options.position),
                        classPrefix: u.classPrefix,
                        offset: "0 0",
                        targetOffset: "0 0",
                        enabled: !1,
                        constraints: n,
                        addTargetClasses: this.options.addTargetClasses
                    };
                    this.options.tetherOptions !== !1 && (this.tether = new t(p({}, i, this.options.tetherOptions)))
                }
            }, {
                key: "setupEvents",
                value: function() {
                    var t = this;
                    if (this.options.openOn) {
                        if ("always" === this.options.openOn) return void setTimeout(this.open.bind(this));
                        var e = this.options.openOn.split(" ");
                        if (e.indexOf("click") >= 0)
                            for (var n = function(e) {
                                    t.toggle(e), e.preventDefault()
                                }, o = function(e) {
                                    t.isOpened() && (e.target === t.drop || t.drop.contains(e.target) || e.target === t.target || t.target.contains(e.target) || t.close(e))
                                }, i = 0; i < y.length; ++i) {
                                var s = y[i];
                                this._on(this.target, s, n), this._on(document, s, o)
                            }
                        var r = !1,
                            a = null,
                            h = function(e) {
                                r = !0, t.open(e)
                            },
                            l = function(e) {
                                r = !1, "undefined" != typeof a && clearTimeout(a), a = setTimeout(function() {
                                    r || t.close(e), a = null
                                }, 50)
                            };
                        e.indexOf("hover") >= 0 && (this._on(this.target, "mouseover", h), this._on(this.drop, "mouseover", h), this._on(this.target, "mouseout", l), this._on(this.drop, "mouseout", l)), e.indexOf("focus") >= 0 && (this._on(this.target, "focus", h), this._on(this.drop, "focus", h), this._on(this.target, "blur", l), this._on(this.drop, "blur", l))
                    }
                }
            }, {
                key: "isOpened",
                value: function() {
                    return this.drop ? f(this.drop, u.classPrefix + "-open") : void 0
                }
            }, {
                key: "toggle",
                value: function(t) {
                    this.isOpened() ? this.close(t) : this.open(t)
                }
            }, {
                key: "open",
                value: function(t) {
                    var e = this;
                    this.isOpened() || (this.drop.parentNode || document.body.appendChild(this.drop), "undefined" != typeof this.tether && this.tether.enable(), d(this.drop, u.classPrefix + "-open"), d(this.drop, u.classPrefix + "-open-transitionend"), setTimeout(function() {
                        e.drop && d(e.drop, u.classPrefix + "-after-open")
                    }), "undefined" != typeof this.tether && this.tether.position(), this.trigger("open"), u.updateBodyClasses())
                }
            }, {
                key: "_transitionEndHandler",
                value: function(t) {
                    t.target === t.currentTarget && (f(this.drop, u.classPrefix + "-open") || c(this.drop, u.classPrefix + "-open-transitionend"), this.drop.removeEventListener(m, this.transitionEndHandler))
                }
            }, {
                key: "beforeCloseHandler",
                value: function(t) {
                    var e = !0;
                    return this.isClosing || "function" != typeof this.options.beforeClose || (this.isClosing = !0, e = this.options.beforeClose(t, this) !== !1), this.isClosing = !1, e
                }
            }, {
                key: "close",
                value: function(t) {
                    this.isOpened() && this.beforeCloseHandler(t) && (c(this.drop, u.classPrefix + "-open"), c(this.drop, u.classPrefix + "-after-open"), this.drop.addEventListener(m, this.transitionEndHandler), this.trigger("close"), "undefined" != typeof this.tether && this.tether.disable(), u.updateBodyClasses(), this.options.remove && this.remove(t))
                }
            }, {
                key: "remove",
                value: function(t) {
                    this.close(t), this.drop.parentNode && this.drop.parentNode.removeChild(this.drop)
                }
            }, {
                key: "position",
                value: function() {
                    this.isOpened() && "undefined" != typeof this.tether && this.tether.position()
                }
            }, {
                key: "destroy",
                value: function() {
                    this.remove(), "undefined" != typeof this.tether && this.tether.destroy();
                    for (var t = 0; t < this._boundEvents.length; ++t) {
                        var e = this._boundEvents[t],
                            n = e.element,
                            o = e.event,
                            s = e.handler;
                        n.removeEventListener(o, s)
                    }
                    this._boundEvents = [], this.tether = null, this.drop = null, this.content = null, this.target = null, i(x[u.classPrefix], this), i(u.drops, this)
                }
            }]), r
        }(v);
        return u
    }
    var r = Function.prototype.bind,
        a = function() {
            function t(t, e) {
                var n = [],
                    o = !0,
                    i = !1,
                    s = void 0;
                try {
                    for (var r, a = t[Symbol.iterator](); !(o = (r = a.next()).done) && (n.push(r.value), !e || n.length !== e); o = !0);
                } catch (h) {
                    i = !0, s = h
                } finally {
                    try {
                        !o && a["return"] && a["return"]()
                    } finally {
                        if (i) throw s
                    }
                }
                return n
            }
            return function(e, n) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        h = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }
            return function(e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(),
        l = function(t, e, n) {
            for (var o = !0; o;) {
                var i = t,
                    s = e,
                    r = n;
                a = l = h = void 0, o = !1, null === i && (i = Function.prototype);
                var a = Object.getOwnPropertyDescriptor(i, s);
                if (void 0 !== a) {
                    if ("value" in a) return a.value;
                    var h = a.get;
                    return void 0 === h ? void 0 : h.call(r)
                }
                var l = Object.getPrototypeOf(i);
                if (null === l) return void 0;
                t = l, e = s, n = r, o = !0
            }
        },
        u = t.Utils,
        p = u.extend,
        d = u.addClass,
        c = u.removeClass,
        f = u.hasClass,
        v = u.Evented,
        y = ["click"];
    "ontouchstart" in document.documentElement && y.push("touchstart");
    var g = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        },
        m = "";
    for (var b in g)
        if ({}.hasOwnProperty.call(g, b)) {
            var O = document.createElement("p");
            "undefined" != typeof O.style[b] && (m = g[b])
        } var E = {
            left: "right",
            right: "left",
            top: "bottom",
            bottom: "top",
            middle: "middle",
            center: "center"
        },
        x = {},
        P = s();
    return document.addEventListener("DOMContentLoaded", function() {
        P.updateBodyClasses()
    }), P
});
H5P.Drop = Drop;
window.Drop = oldDrop;
window.Tether = oldTether;
var H5P = H5P || {};

/**
 * Class responsible for creating auto-disappearing dialogs
 */
H5P.JoubelMessageDialog = (function($) {

    /**
     * Display a pop-up containing a message.
     *
     * @param {H5P.jQuery} $container The container which message dialog will be appended to
     * @param {string} message The message
     * @return {H5P.jQuery}
     */
    function JoubelMessageDialog($container, message) {
        var timeout;

        var removeDialog = function() {
            $warning.remove();
            clearTimeout(timeout);
            $container.off('click.messageDialog');
        };

        // Create warning popup:
        var $warning = $('<div/>', {
            'class': 'joubel-message-dialog',
            text: message
        }).appendTo($container);

        // Remove after 3 seconds or if user clicks anywhere in $container:
        timeout = setTimeout(removeDialog, 3000);
        $container.on('click.messageDialog', removeDialog);

        return $warning;
    }

    return JoubelMessageDialog;
})(H5P.jQuery);
var H5P = H5P || {};

H5P.SimpleRoundedButton = (function($) {

    /**
     * Creates a new tip
     */
    function SimpleRoundedButton(text) {

        var $simpleRoundedButton = $('<div>', {
            'class': 'joubel-simple-rounded-button',
            'title': text,
            'role': 'button',
            'tabindex': '0'
        }).keydown(function(e) {
            // 32 - space, 13 - enter
            if ([32, 13].indexOf(e.which) !== -1) {
                $(this).click();
                e.preventDefault();
            }
        });

        $('<span>', {
            'class': 'joubel-simple-rounded-button-text',
            'html': text
        }).appendTo($simpleRoundedButton);

        return $simpleRoundedButton;
    }

    return SimpleRoundedButton;
}(H5P.jQuery));
var H5P = H5P || {};

/**
 * Class responsible for creating speech bubbles
 */
H5P.JoubelSpeechBubble = (function($) {

    var $currentSpeechBubble;
    var $currentContainer;
    var $tail;
    var $innerTail;
    var removeSpeechBubbleTimeout;
    var currentMaxWidth;

    var DEFAULT_MAX_WIDTH = 400;

    var iDevice = navigator.userAgent.match(/iPod|iPhone|iPad/g) ? true : false;

    /**
     * Creates a new speech bubble
     *
     * @param {H5P.jQuery} $container The speaking object
     * @param {string} text The text to display
     * @param {number} maxWidth The maximum width of the bubble
     * @return {H5P.JoubelSpeechBubble}
     */
    function JoubelSpeechBubble($container, text, maxWidth) {
        maxWidth = maxWidth || DEFAULT_MAX_WIDTH;
        currentMaxWidth = maxWidth;
        $currentContainer = $container;

        this.isCurrent = function($tip) {
            return $tip.is($currentContainer);
        };

        this.remove = function() {
            remove();
        };

        var fadeOutSpeechBubble = function($speechBubble) {
            if (!$speechBubble) {
                return;
            }

            // Stop removing bubble
            clearTimeout(removeSpeechBubbleTimeout);

            $speechBubble.removeClass('show');
            setTimeout(function() {
                if ($speechBubble) {
                    $speechBubble.remove();
                    $speechBubble = undefined;
                }
            }, 500);
        };

        if ($currentSpeechBubble !== undefined) {
            remove();
        }

        var $h5pContainer = getH5PContainer($container);

        // Make sure we fade out old speech bubble
        fadeOutSpeechBubble($currentSpeechBubble);

        // Create bubble
        $tail = $('<div class="joubel-speech-bubble-tail"></div>');
        $innerTail = $('<div class="joubel-speech-bubble-inner-tail"></div>');
        var $innerBubble = $(
            '<div class="joubel-speech-bubble-inner">' +
            '<div class="joubel-speech-bubble-text">' + text + '</div>' +
            '</div>'
        ).prepend($innerTail);

        $currentSpeechBubble = $(
                '<div class="joubel-speech-bubble" aria-live="assertive">'
            ).append([$tail, $innerBubble])
            .appendTo($h5pContainer);

        // Show speech bubble with transition
        setTimeout(function() {
            $currentSpeechBubble.addClass('show');
        }, 0);

        position($currentSpeechBubble, $currentContainer, maxWidth, $tail, $innerTail);

        // Handle click to close
        H5P.$body.on('mousedown.speechBubble', handleOutsideClick);

        // Handle window resizing
        H5P.$window.on('resize', '', handleResize);

        // Handle clicks when inside IV which blocks bubbling.
        $container.parents('.h5p-dialog')
            .on('mousedown.speechBubble', handleOutsideClick);

        if (iDevice) {
            H5P.$body.css('cursor', 'pointer');
        }

        return this;
    }

    // Remove speechbubble if it belongs to a dom element that is about to be hidden
    H5P.externalDispatcher.on('domHidden', function(event) {
        if ($currentSpeechBubble !== undefined && event.data.$dom.find($currentContainer).length !== 0) {
            remove();
        }
    });

    /**
     * Returns the closest h5p container for the given DOM element.
     * 
     * @param {object} $container jquery element
     * @return {object} the h5p container (jquery element)
     */
    function getH5PContainer($container) {
        var $h5pContainer = $container.closest('.h5p-frame');

        // Check closest h5p frame first, then check for container in case there is no frame.
        if (!$h5pContainer.length) {
            $h5pContainer = $container.closest('.h5p-container');
        }

        return $h5pContainer;
    }

    /**
     * Event handler that is called when the window is resized.
     */
    function handleResize() {
        position($currentSpeechBubble, $currentContainer, currentMaxWidth, $tail, $innerTail);
    }

    /**
     * Repositions the speech bubble according to the position of the container.
     * 
     * @param {object} $currentSpeechbubble the speech bubble that should be positioned   
     * @param {object} $container the container to which the speech bubble should point 
     * @param {number} maxWidth the maximum width of the speech bubble
     * @param {object} $tail the tail (the triangle that points to the referenced container)
     * @param {object} $innerTail the inner tail (the triangle that points to the referenced container)
     */
    function position($currentSpeechBubble, $container, maxWidth, $tail, $innerTail) {
        var $h5pContainer = getH5PContainer($container);

        // Calculate offset between the button and the h5p frame
        var offset = getOffsetBetween($h5pContainer, $container);

        var direction = (offset.bottom > offset.top ? 'bottom' : 'top');
        var tipWidth = offset.outerWidth * 0.9; // Var needs to be renamed to make sense
        var bubbleWidth = tipWidth > maxWidth ? maxWidth : tipWidth;

        var bubblePosition = getBubblePosition(bubbleWidth, offset);
        var tailPosition = getTailPosition(bubbleWidth, bubblePosition, offset, $container.width());
        // Need to set font-size, since element is appended to body.
        // Using same font-size as parent. In that way it will grow accordingly
        // when resizing
        var fontSize = 16; //parseFloat($parent.css('font-size'));

        // Set width and position of speech bubble
        $currentSpeechBubble.css(bubbleCSS(
            direction,
            bubbleWidth,
            bubblePosition,
            fontSize
        ));

        var preparedTailCSS = tailCSS(direction, tailPosition);
        $tail.css(preparedTailCSS);
        $innerTail.css(preparedTailCSS);
    }

    /**
     * Static function for removing the speechbubble
     */
    var remove = function() {
        H5P.$body.off('mousedown.speechBubble');
        H5P.$window.off('resize', '', handleResize);
        $currentContainer.parents('.h5p-dialog').off('mousedown.speechBubble');
        if (iDevice) {
            H5P.$body.css('cursor', '');
        }
        if ($currentSpeechBubble !== undefined) {
            // Apply transition, then remove speech bubble
            $currentSpeechBubble.removeClass('show');

            // Make sure we remove any old timeout before reassignment
            clearTimeout(removeSpeechBubbleTimeout);
            removeSpeechBubbleTimeout = setTimeout(function() {
                $currentSpeechBubble.remove();
                $currentSpeechBubble = undefined;
            }, 500);
        }
        // Don't return false here. If the user e.g. clicks a button when the bubble is visible,
        // we want the bubble to disapear AND the button to receive the event
    };

    /**
     * Remove the speech bubble and container reference
     */
    function handleOutsideClick(event) {
        if (event.target === $currentContainer[0]) {
            return; // Button clicks are not outside clicks
        }

        remove();
        // There is no current container when a container isn't clicked
        $currentContainer = undefined;
    }

    /**
     * Calculate position for speech bubble
     *
     * @param {number} bubbleWidth The width of the speech bubble
     * @param {object} offset
     * @return {object} Return position for the speech bubble
     */
    function getBubblePosition(bubbleWidth, offset) {
        var bubblePosition = {};

        var tailOffset = 9;
        var widthOffset = bubbleWidth / 2;

        // Calculate top position
        bubblePosition.top = offset.top + offset.innerHeight;

        // Calculate bottom position
        bubblePosition.bottom = offset.bottom + offset.innerHeight + tailOffset;

        // Calculate left position
        if (offset.left < widthOffset) {
            bubblePosition.left = 3;
        } else if ((offset.left + widthOffset) > offset.outerWidth) {
            bubblePosition.left = offset.outerWidth - bubbleWidth - 3;
        } else {
            bubblePosition.left = offset.left - widthOffset + (offset.innerWidth / 2);
        }

        return bubblePosition;
    }

    /**
     * Calculate position for speech bubble tail
     *
     * @param {number} bubbleWidth The width of the speech bubble
     * @param {object} bubblePosition Speech bubble position
     * @param {object} offset
     * @param {number} iconWidth The width of the tip icon
     * @return {object} Return position for the tail
     */
    function getTailPosition(bubbleWidth, bubblePosition, offset, iconWidth) {
        var tailPosition = {};
        // Magic numbers. Tuned by hand so that the tail fits visually within
        // the bounds of the speech bubble.
        var leftBoundary = 9;
        var rightBoundary = bubbleWidth - 20;

        tailPosition.left = offset.left - bubblePosition.left + (iconWidth / 2) - 6;
        if (tailPosition.left < leftBoundary) {
            tailPosition.left = leftBoundary;
        }
        if (tailPosition.left > rightBoundary) {
            tailPosition.left = rightBoundary;
        }

        tailPosition.top = -6;
        tailPosition.bottom = -6;

        return tailPosition;
    }

    /**
     * Return bubble CSS for the desired growth direction
     *
     * @param {string} direction The direction the speech bubble will grow
     * @param {number} width The width of the speech bubble
     * @param {object} position Speech bubble position
     * @param {number} fontSize The size of the bubbles font
     * @return {object} Return CSS
     */
    function bubbleCSS(direction, width, position, fontSize) {
        if (direction === 'top') {
            return {
                width: width + 'px',
                bottom: position.bottom + 'px',
                left: position.left + 'px',
                fontSize: fontSize + 'px',
                top: ''
            };
        } else {
            return {
                width: width + 'px',
                top: position.top + 'px',
                left: position.left + 'px',
                fontSize: fontSize + 'px',
                bottom: ''
            };
        }
    }

    /**
     * Return tail CSS for the desired growth direction
     *
     * @param {string} direction The direction the speech bubble will grow
     * @param {object} position Tail position
     * @return {object} Return CSS
     */
    function tailCSS(direction, position) {
        if (direction === 'top') {
            return {
                bottom: position.bottom + 'px',
                left: position.left + 'px',
                top: ''
            };
        } else {
            return {
                top: position.top + 'px',
                left: position.left + 'px',
                bottom: ''
            };
        }
    }

    /**
     * Calculates the offset between an element inside a container and the
     * container. Only works if all the edges of the inner element are inside the
     * outer element.
     * Width/height of the elements is included as a convenience.
     *
     * @param {H5P.jQuery} $outer
     * @param {H5P.jQuery} $inner
     * @return {object} Position offset
     */
    function getOffsetBetween($outer, $inner) {
        var outer = $outer[0].getBoundingClientRect();
        var inner = $inner[0].getBoundingClientRect();

        return {
            top: inner.top - outer.top,
            right: outer.right - inner.right,
            bottom: outer.bottom - inner.bottom,
            left: inner.left - outer.left,
            innerWidth: inner.width,
            innerHeight: inner.height,
            outerWidth: outer.width,
            outerHeight: outer.height
        };
    }

    return JoubelSpeechBubble;
})(H5P.jQuery);
var H5P = H5P || {};

H5P.JoubelThrobber = (function($) {

    /**
     * Creates a new tip
     */
    function JoubelThrobber() {

        // h5p-throbber css is described in core
        var $throbber = $('<div/>', {
            'class': 'h5p-throbber'
        });

        return $throbber;
    }

    return JoubelThrobber;
}(H5P.jQuery));
H5P.JoubelTip = (function($) {
    var $conv = $('<div/>');

    /**
     * Creates a new tip element.
     *
     * NOTE that this may look like a class but it doesn't behave like one.
     * It returns a jQuery object.
     *
     * @param {string} tipHtml The text to display in the popup
     * @param {Object} [behaviour] Options
     * @param {string} [behaviour.tipLabel] Set to use a custom label for the tip button (you want this for good A11Y)
     * @param {boolean} [behaviour.helpIcon] Set to 'true' to Add help-icon classname to Tip button (changes the icon)
     * @param {boolean} [behaviour.showSpeechBubble] Set to 'false' to disable functionality (you may this in the editor)
     * @param {boolean} [behaviour.tabcontrol] Set to 'true' if you plan on controlling the tabindex in the parent (tabindex="-1")
     * @return {H5P.jQuery|undefined} Tip button jQuery element or 'undefined' if invalid tip
     */
    function JoubelTip(tipHtml, behaviour) {

        // Keep track of the popup that appears when you click the Tip button
        var speechBubble;

        // Parse tip html to determine text
        var tipText = $conv.html(tipHtml).text().trim();
        if (tipText === '') {
            return; // The tip has no textual content, i.e. it's invalid.
        }

        // Set default behaviour
        behaviour = $.extend({
            tipLabel: tipText,
            helpIcon: false,
            showSpeechBubble: true,
            tabcontrol: false
        }, behaviour);

        // Create Tip button
        var $tipButton = $('<div/>', {
            class: 'joubel-tip-container' + (behaviour.showSpeechBubble ? '' : ' be-quiet'),
            title: behaviour.tipLabel,
            'aria-label': behaviour.tipLabel,
            'aria-expanded': false,
            role: 'button',
            tabindex: (behaviour.tabcontrol ? -1 : 0),
            click: function(event) {
                // Toggle show/hide popup
                toggleSpeechBubble();
                event.preventDefault();
            },
            keydown: function(event) {
                if (event.which === 32 || event.which === 13) { // Space & enter key
                    // Toggle show/hide popup
                    toggleSpeechBubble();
                    event.stopPropagation();
                    event.preventDefault();
                } else { // Any other key
                    // Toggle hide popup
                    toggleSpeechBubble(false);
                }
            },
            // Add markup to render icon
            html: '<span class="joubel-icon-tip-normal ' + (behaviour.helpIcon ? ' help-icon' : '') + '">' +
                '<span class="h5p-icon-shadow"></span>' +
                '<span class="h5p-icon-speech-bubble"></span>' +
                '<span class="h5p-icon-info"></span>' +
                '</span>'
            // IMPORTANT: All of the markup elements must have 'pointer-events: none;'
        });

        const $tipAnnouncer = $('<div>', {
            'class': 'hidden-but-read',
            'aria-live': 'polite',
            appendTo: $tipButton,
        });

        /**
         * Tip button interaction handler.
         * Toggle show or hide the speech bubble popup when interacting with the
         * Tip button.
         *
         * @private
         * @param {boolean} [force] 'true' shows and 'false' hides.
         */
        var toggleSpeechBubble = function(force) {
            if (speechBubble !== undefined && speechBubble.isCurrent($tipButton)) {
                // Hide current popup
                speechBubble.remove();
                speechBubble = undefined;

                $tipButton.attr('aria-expanded', false);
                $tipAnnouncer.html('');
            } else if (force !== false && behaviour.showSpeechBubble) {
                // Create and show new popup
                speechBubble = H5P.JoubelSpeechBubble($tipButton, tipHtml);
                $tipButton.attr('aria-expanded', true);
                $tipAnnouncer.html(tipHtml);
            }
        };

        return $tipButton;
    }

    return JoubelTip;
})(H5P.jQuery);
var H5P = H5P || {};

H5P.JoubelSlider = (function($) {

    /**
     * Creates a new Slider
     *
     * @param {object} [params] Additional parameters
     */
    function JoubelSlider(params) {
        H5P.EventDispatcher.call(this);

        this.$slider = $('<div>', $.extend({
            'class': 'h5p-joubel-ui-slider'
        }, params));

        this.$slides = [];
        this.currentIndex = 0;
        this.numSlides = 0;
    }
    JoubelSlider.prototype = Object.create(H5P.EventDispatcher.prototype);
    JoubelSlider.prototype.constructor = JoubelSlider;

    JoubelSlider.prototype.addSlide = function($content) {
        $content.addClass('h5p-joubel-ui-slide').css({
            'left': (this.numSlides * 100) + '%'
        });
        this.$slider.append($content);
        this.$slides.push($content);

        this.numSlides++;

        if (this.numSlides === 1) {
            $content.addClass('current');
        }
    };

    JoubelSlider.prototype.attach = function($container) {
        $container.append(this.$slider);
    };

    JoubelSlider.prototype.move = function(index) {
        var self = this;

        if (index === 0) {
            self.trigger('first-slide');
        }
        if (index + 1 === self.numSlides) {
            self.trigger('last-slide');
        }
        self.trigger('move');

        var $previousSlide = self.$slides[this.currentIndex];
        H5P.Transition.onTransitionEnd(this.$slider, function() {
            $previousSlide.removeClass('current');
            self.trigger('moved');
        });
        this.$slides[index].addClass('current');

        var translateX = 'translateX(' + (-index * 100) + '%)';
        this.$slider.css({
            '-webkit-transform': translateX,
            '-moz-transform': translateX,
            '-ms-transform': translateX,
            'transform': translateX
        });

        this.currentIndex = index;
    };

    JoubelSlider.prototype.remove = function() {
        this.$slider.remove();
    };

    JoubelSlider.prototype.next = function() {
        if (this.currentIndex + 1 >= this.numSlides) {
            return;
        }

        this.move(this.currentIndex + 1);
    };

    JoubelSlider.prototype.previous = function() {
        this.move(this.currentIndex - 1);
    };

    JoubelSlider.prototype.first = function() {
        this.move(0);
    };

    JoubelSlider.prototype.last = function() {
        this.move(this.numSlides - 1);
    };

    return JoubelSlider;
})(H5P.jQuery);
var H5P = H5P || {};

/**
 * @module
 */
H5P.JoubelScoreBar = (function($) {

    /* Need to use an id for the star SVG since that is the only way to reference
       SVG filters  */
    var idCounter = 0;

    /**
     * Creates a score bar
     * @class H5P.JoubelScoreBar
     * @param {number} maxScore  Maximum score
     * @param {string} [label] Makes it easier for readspeakers to identify the scorebar
     * @param {string} [helpText] Score explanation
     * @param {string} [scoreExplanationButtonLabel] Label for score explanation button
     */
    function JoubelScoreBar(maxScore, label, helpText, scoreExplanationButtonLabel) {
        var self = this;

        self.maxScore = maxScore;
        self.score = 0;
        idCounter++;

        /**
         * @const {string}
         */
        self.STAR_MARKUP = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.77 53.87" aria-hidden="true" focusable="false">' +
            '<title>star</title>' +
            '<filter id="h5p-joubelui-score-bar-star-inner-shadow-' + idCounter + '" x0="-50%" y0="-50%" width="200%" height="200%">' +
            '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>' +
            '<feOffset dy="2" dx="4"></feOffset>' +
            '<feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>' +
            '<feFlood flood-color="#ffe95c" flood-opacity="1"></feFlood>' +
            '<feComposite in2="shadowDiff" operator="in"></feComposite>' +
            '<feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>' +
            '<feGaussianBlur in="firstfilter" stdDeviation="3" result="blur2"></feGaussianBlur>' +
            '<feOffset dy="-2" dx="-4"></feOffset>' +
            '<feComposite in2="firstfilter" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>' +
            '<feFlood flood-color="#ffe95c" flood-opacity="1"></feFlood>' +
            '<feComposite in2="shadowDiff" operator="in"></feComposite>' +
            '<feComposite in2="firstfilter" operator="over"></feComposite>' +
            '</filter>' +
            '<path class="h5p-joubelui-score-bar-star-shadow" d="M35.08,43.41V9.16H20.91v0L9.51,10.85,9,10.93C2.8,12.18,0,17,0,21.25a11.22,11.22,0,0,0,3,7.48l8.73,8.53-1.07,6.16Z"/>' +
            '<g>' +
            '<path class="h5p-joubelui-score-bar-star-border" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
            '<path class="h5p-joubelui-score-bar-star-fill" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
            '<path filter="url(#h5p-joubelui-score-bar-star-inner-shadow-' + idCounter + ')" class="h5p-joubelui-score-bar-star-fill-full-score" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
            '</g>' +
            '</svg>';

        /**
         * @function appendTo
         * @memberOf H5P.JoubelScoreBar#
         * @param {H5P.jQuery}  $wrapper  Dom container
         */
        self.appendTo = function($wrapper) {
            self.$scoreBar.appendTo($wrapper);
        };

        /**
         * Create the text representation of the scorebar .
         *
         * @private
         * @return {string}
         */
        var createLabel = function(score) {
            if (!label) {
                return '';
            }

            return label.replace(':num', score).replace(':total', self.maxScore);
        };

        /**
         * Creates the html for this widget
         *
         * @method createHtml
         * @private
         */
        var createHtml = function() {
            // Container div
            self.$scoreBar = $('<div>', {
                'class': 'h5p-joubelui-score-bar',
            });

            var $visuals = $('<div>', {
                'class': 'h5p-joubelui-score-bar-visuals',
                appendTo: self.$scoreBar
            });

            // The progress bar wrapper
            self.$progressWrapper = $('<div>', {
                'class': 'h5p-joubelui-score-bar-progress-wrapper',
                appendTo: $visuals
            });

            self.$progress = $('<div>', {
                'class': 'h5p-joubelui-score-bar-progress',
                'html': createLabel(self.score),
                appendTo: self.$progressWrapper
            });

            // The star
            $('<div>', {
                'class': 'h5p-joubelui-score-bar-star',
                html: self.STAR_MARKUP
            }).appendTo($visuals);

            // The score container
            var $numerics = $('<div>', {
                'class': 'h5p-joubelui-score-numeric',
                appendTo: self.$scoreBar,
                'aria-hidden': true
            });

            // The current score
            self.$scoreCounter = $('<span>', {
                'class': 'h5p-joubelui-score-number h5p-joubelui-score-number-counter',
                text: 0,
                appendTo: $numerics
            });

            // The separator
            $('<span>', {
                'class': 'h5p-joubelui-score-number-separator',
                text: '/',
                appendTo: $numerics
            });

            // Max score
            self.$maxScore = $('<span>', {
                'class': 'h5p-joubelui-score-number h5p-joubelui-score-max',
                text: self.maxScore,
                appendTo: $numerics
            });

            if (helpText) {
                H5P.JoubelUI.createTip(helpText, {
                    tipLabel: scoreExplanationButtonLabel ? scoreExplanationButtonLabel : helpText,
                    helpIcon: true
                }).appendTo(self.$scoreBar);
                self.$scoreBar.addClass('h5p-score-bar-has-help');
            }
        };

        /**
         * Set the current score
         * @method setScore
         * @memberOf H5P.JoubelScoreBar#
         * @param  {number} score
         */
        self.setScore = function(score) {
            // Do nothing if score hasn't changed
            if (score === self.score) {
                return;
            }
            self.score = score > self.maxScore ? self.maxScore : score;
            self.updateVisuals();
        };

        /**
         * Increment score
         * @method incrementScore
         * @memberOf H5P.JoubelScoreBar#
         * @param  {number=}        incrementBy Optional parameter, defaults to 1
         */
        self.incrementScore = function(incrementBy) {
            self.setScore(self.score + (incrementBy || 1));
        };

        /**
         * Set the max score
         * @method setMaxScore
         * @memberOf H5P.JoubelScoreBar#
         * @param  {number}    maxScore The max score
         */
        self.setMaxScore = function(maxScore) {
            self.maxScore = maxScore;
        };

        /**
         * Updates the progressbar visuals
         * @memberOf H5P.JoubelScoreBar#
         * @method updateVisuals
         */
        self.updateVisuals = function() {
            self.$progress.html(createLabel(self.score));
            self.$scoreCounter.text(self.score);
            self.$maxScore.text(self.maxScore);

            setTimeout(function() {
                // Start the progressbar animation
                self.$progress.css({
                    width: ((self.score / self.maxScore) * 100) + '%'
                });

                H5P.Transition.onTransitionEnd(self.$progress, function() {
                    // If fullscore fill the star and start the animation
                    self.$scoreBar.toggleClass('h5p-joubelui-score-bar-full-score', self.score === self.maxScore);
                    self.$scoreBar.toggleClass('h5p-joubelui-score-bar-animation-active', self.score === self.maxScore);

                    // Only allow the star animation to run once
                    self.$scoreBar.one("animationend", function() {
                        self.$scoreBar.removeClass("h5p-joubelui-score-bar-animation-active");
                    });
                }, 600);
            }, 300);
        };

        /**
         * Removes all classes
         * @method reset
         */
        self.reset = function() {
            self.$scoreBar.removeClass('h5p-joubelui-score-bar-full-score');
        };

        createHtml();
    }

    return JoubelScoreBar;
})(H5P.jQuery);
var H5P = H5P || {};

H5P.JoubelProgressbar = (function($) {

    /**
     * Joubel progressbar class
     * @method JoubelProgressbar
     * @constructor
     * @param  {number}          steps Number of steps
     * @param {Object} [options] Additional options
     * @param {boolean} [options.disableAria] Disable readspeaker assistance
     * @param {string} [options.progressText] A progress text for describing
     *  current progress out of total progress for readspeakers.
     *  e.g. "Slide :num of :total"
     */
    function JoubelProgressbar(steps, options) {
        H5P.EventDispatcher.call(this);
        var self = this;
        this.options = $.extend({
            progressText: 'Slide :num of :total'
        }, options);
        this.currentStep = 0;
        this.steps = steps;

        this.$progressbar = $('<div>', {
            'class': 'h5p-joubelui-progressbar',
            on: {
                click: function() {
                    self.toggleTooltip();
                    return false;
                },
                mouseenter: function() {
                    self.showTooltip();
                },
                mouseleave: function() {
                    setTimeout(function() {
                        self.hideTooltip();
                    }, 1500);
                }
            }
        });
        this.$background = $('<div>', {
            'class': 'h5p-joubelui-progressbar-background'
        }).appendTo(this.$progressbar);

        $('body').click(function() {
            self.toggleTooltip(true);
        });
    }

    JoubelProgressbar.prototype = Object.create(H5P.EventDispatcher.prototype);
    JoubelProgressbar.prototype.constructor = JoubelProgressbar;

    /**
     * Display tooltip
     * @method showTooltip
     */
    JoubelProgressbar.prototype.showTooltip = function() {
        var self = this;

        if (this.currentStep === 0 || this.tooltip !== undefined) {
            return;
        }

        var parentWidth = self.$progressbar.offset().left + self.$progressbar.width();

        this.tooltip = new H5P.Drop({
            target: this.$background.get(0),
            content: this.currentStep + '/' + this.steps,
            classes: 'drop-theme-arrows-bounce h5p-joubelui-drop',
            position: 'top right',
            openOn: 'always',
            tetherOptions: {
                attachment: 'bottom center',
                targetAttachment: 'top right'
            }
        });
        this.tooltip.on('open', function() {
            var $drop = $(self.tooltip.drop);
            var left = $drop.position().left;
            var dropWidth = $drop.width();

            // Need to handle drops getting outside of the progressbar:
            if (left < 0) {
                $drop.css({
                    marginLeft: (-left) + 'px'
                });
            } else if (left + dropWidth > parentWidth) {
                $drop.css({
                    marginLeft: (parentWidth - (left + dropWidth)) + 'px'
                });
            }
        });
    };

    JoubelProgressbar.prototype.updateAria = function() {
        var self = this;
        if (this.options.disableAria) {
            return;
        }

        if (!this.$currentStatus) {
            this.$currentStatus = $('<div>', {
                'class': 'h5p-joubelui-progressbar-slide-status-text',
                'aria-live': 'assertive'
            }).appendTo(this.$progressbar);
        }
        var interpolatedProgressText = self.options.progressText
            .replace(':num', self.currentStep)
            .replace(':total', self.steps);
        this.$currentStatus.html(interpolatedProgressText);
    };

    /**
     * Hides tooltip
     * @method hideTooltip
     */
    JoubelProgressbar.prototype.hideTooltip = function() {
        if (this.tooltip !== undefined) {
            this.tooltip.remove();
            this.tooltip.destroy();
            this.tooltip = undefined;
        }
    };

    /**
     * Toggles tooltip-visibility
     * @method toggleTooltip
     * @param  {boolean} [closeOnly] Don't show, only close if open
     */
    JoubelProgressbar.prototype.toggleTooltip = function(closeOnly) {
        if (this.tooltip === undefined && !closeOnly) {
            this.showTooltip();
        } else if (this.tooltip !== undefined) {
            this.hideTooltip();
        }
    };

    /**
     * Appends to a container
     * @method appendTo
     * @param  {H5P.jquery} $container
     */
    JoubelProgressbar.prototype.appendTo = function($container) {
        this.$progressbar.appendTo($container);
    };

    /**
     * Update progress
     * @method setProgress
     * @param  {number}    step
     */
    JoubelProgressbar.prototype.setProgress = function(step) {
        // Check for valid value:
        if (step > this.steps || step < 0) {
            return;
        }
        this.currentStep = step;
        this.$background.css({
            width: ((this.currentStep / this.steps) * 100) + '%'
        });

        this.updateAria();
    };

    /**
     * Increment progress with 1
     * @method next
     */
    JoubelProgressbar.prototype.next = function() {
        this.setProgress(this.currentStep + 1);
    };

    /**
     * Reset progressbar
     * @method reset
     */
    JoubelProgressbar.prototype.reset = function() {
        this.setProgress(0);
    };

    /**
     * Check if last step is reached
     * @method isLastStep
     * @return {Boolean}
     */
    JoubelProgressbar.prototype.isLastStep = function() {
        return this.steps === this.currentStep;
    };

    return JoubelProgressbar;
})(H5P.jQuery);
var H5P = H5P || {};

/**
 * H5P Joubel UI library.
 *
 * This is a utility library, which does not implement attach. I.e, it has to bee actively used by
 * other libraries
 * @module
 */
H5P.JoubelUI = (function($) {

    /**
     * The internal object to return
     * @class H5P.JoubelUI
     * @static
     */
    function JoubelUI() {}

    /* Public static functions */

    /**
     * Create a tip icon
     * @method H5P.JoubelUI.createTip
     * @param  {string}  text   The textual tip
     * @param  {Object}  params Parameters
     * @return {H5P.JoubelTip}
     */
    JoubelUI.createTip = function(text, params) {
        return new H5P.JoubelTip(text, params);
    };

    /**
     * Create message dialog
     * @method H5P.JoubelUI.createMessageDialog
     * @param  {H5P.jQuery}               $container The dom container
     * @param  {string}                   message    The message
     * @return {H5P.JoubelMessageDialog}
     */
    JoubelUI.createMessageDialog = function($container, message) {
        return new H5P.JoubelMessageDialog($container, message);
    };

    /**
     * Create help text dialog
     * @method H5P.JoubelUI.createHelpTextDialog
     * @param  {string}             header  The textual header
     * @param  {string}             message The textual message
     * @param  {string}             closeButtonTitle The title for the close button
     * @return {H5P.JoubelHelpTextDialog}
     */
    JoubelUI.createHelpTextDialog = function(header, message, closeButtonTitle) {
        return new H5P.JoubelHelpTextDialog(header, message, closeButtonTitle);
    };

    /**
     * Create progress circle
     * @method H5P.JoubelUI.createProgressCircle
     * @param  {number}             number          The progress (0 to 100)
     * @param  {string}             progressColor   The progress color in hex value
     * @param  {string}             fillColor       The fill color in hex value
     * @param  {string}             backgroundColor The background color in hex value
     * @return {H5P.JoubelProgressCircle}
     */
    JoubelUI.createProgressCircle = function(number, progressColor, fillColor, backgroundColor) {
        return new H5P.JoubelProgressCircle(number, progressColor, fillColor, backgroundColor);
    };

    /**
     * Create throbber for loading
     * @method H5P.JoubelUI.createThrobber
     * @return {H5P.JoubelThrobber}
     */
    JoubelUI.createThrobber = function() {
        return new H5P.JoubelThrobber();
    };

    /**
     * Create simple rounded button
     * @method H5P.JoubelUI.createSimpleRoundedButton
     * @param  {string}                  text The button label
     * @return {H5P.SimpleRoundedButton}
     */
    JoubelUI.createSimpleRoundedButton = function(text) {
        return new H5P.SimpleRoundedButton(text);
    };

    /**
     * Create Slider
     * @method H5P.JoubelUI.createSlider
     * @param  {Object} [params] Parameters
     * @return {H5P.JoubelSlider}
     */
    JoubelUI.createSlider = function(params) {
        return new H5P.JoubelSlider(params);
    };

    /**
     * Create Score Bar
     * @method H5P.JoubelUI.createScoreBar
     * @param  {number=}       maxScore The maximum score
     * @param {string} [label] Makes it easier for readspeakers to identify the scorebar
     * @return {H5P.JoubelScoreBar}
     */
    JoubelUI.createScoreBar = function(maxScore, label, helpText, scoreExplanationButtonLabel) {
        return new H5P.JoubelScoreBar(maxScore, label, helpText, scoreExplanationButtonLabel);
    };

    /**
     * Create Progressbar
     * @method H5P.JoubelUI.createProgressbar
     * @param  {number=}       numSteps The total numer of steps
     * @param {Object} [options] Additional options
     * @param {boolean} [options.disableAria] Disable readspeaker assistance
     * @param {string} [options.progressText] A progress text for describing
     *  current progress out of total progress for readspeakers.
     *  e.g. "Slide :num of :total"
     * @return {H5P.JoubelProgressbar}
     */
    JoubelUI.createProgressbar = function(numSteps, options) {
        return new H5P.JoubelProgressbar(numSteps, options);
    };

    /**
     * Create standard Joubel button
     *
     * @method H5P.JoubelUI.createButton
     * @param {object} params
     *  May hold any properties allowed by jQuery. If href is set, an A tag
     *  is used, if not a button tag is used.
     * @return {H5P.jQuery} The jquery element created
     */
    JoubelUI.createButton = function(params) {
        var type = 'button';
        if (params.href) {
            type = 'a';
        } else {
            params.type = 'button';
        }
        if (params.class) {
            params.class += ' h5p-joubelui-button';
        } else {
            params.class = 'h5p-joubelui-button';
        }
        return $('<' + type + '/>', params);
    };

    /**
     * Fix for iframe scoll bug in IOS. When focusing an element that doesn't have
     * focus support by default the iframe will scroll the parent frame so that
     * the focused element is out of view. This varies dependening on the elements
     * of the parent frame.
     */
    if (H5P.isFramed && !H5P.hasiOSiframeScrollFix &&
        /iPad|iPhone|iPod/.test(navigator.userAgent)) {
        H5P.hasiOSiframeScrollFix = true;

        // Keep track of original focus function
        var focus = HTMLElement.prototype.focus;

        // Override the original focus
        HTMLElement.prototype.focus = function() {
            // Only focus the element if it supports it natively
            if ((this instanceof HTMLAnchorElement ||
                    this instanceof HTMLInputElement ||
                    this instanceof HTMLSelectElement ||
                    this instanceof HTMLTextAreaElement ||
                    this instanceof HTMLButtonElement ||
                    this instanceof HTMLIFrameElement ||
                    this instanceof HTMLAreaElement) && // HTMLAreaElement isn't supported by Safari yet.
                !this.getAttribute('role')) { // Focus breaks if a different role has been set
                // In theory this.isContentEditable should be able to recieve focus,
                // but it didn't work when tested.

                // Trigger the original focus with the proper context
                focus.call(this);
            }
        };
    }

    return JoubelUI;
})(H5P.jQuery);
H5P.Question = (function($, EventDispatcher, JoubelUI) {

    /**
     * Extending this class make it alot easier to create tasks for other
     * content types.
     *
     * @class H5P.Question
     * @extends H5P.EventDispatcher
     * @param {string} type
     */
    function Question(type) {
        var self = this;

        // Inheritance
        EventDispatcher.call(self);

        // Register default section order
        self.order = ['video', 'image', 'introduction', 'content', 'explanation', 'feedback', 'scorebar', 'buttons', 'read'];

        // Keep track of registered sections
        var sections = {};

        // Buttons
        var buttons = {};
        var buttonOrder = [];

        // Wrapper when attached
        var $wrapper;

        // Click element
        var clickElement;

        // ScoreBar
        var scoreBar;

        // Keep track of the feedback's visual status.
        var showFeedback;

        // Keep track of which buttons are scheduled for hiding.
        var buttonsToHide = [];

        // Keep track of which buttons are scheduled for showing.
        var buttonsToShow = [];

        // Keep track of the hiding and showing of buttons.
        var toggleButtonsTimer;
        var toggleButtonsTransitionTimer;
        var buttonTruncationTimer;

        // Keeps track of initialization of question
        var initialized = false;

        /**
         * @type {Object} behaviour Behaviour of Question
         * @property {Boolean} behaviour.disableFeedback Set to true to disable feedback section
         */
        var behaviour = {
            disableFeedback: false,
            disableReadSpeaker: false
        };

        // Keeps track of thumb state
        var imageThumb = true;

        // Keeps track of image transitions
        var imageTransitionTimer;

        // Keep track of whether sections is transitioning.
        var sectionsIsTransitioning = false;

        // Keep track of auto play state
        var disableAutoPlay = false;

        // Feedback transition timer
        var feedbackTransitionTimer;

        // Used when reading messages to the user
        var $read, readText;

        /**
         * Register section with given content.
         *
         * @private
         * @param {string} section ID of the section
         * @param {(string|H5P.jQuery)} [content]
         */
        var register = function(section, content) {
            sections[section] = {};
            var $e = sections[section].$element = $('<div/>', {
                'class': 'h5p-question-' + section,
            });
            if (content) {
                $e[content instanceof $ ? 'append' : 'html'](content);
            }
        };

        /**
         * Update registered section with content.
         *
         * @private
         * @param {string} section ID of the section
         * @param {(string|H5P.jQuery)} content
         */
        var update = function(section, content) {
            if (content instanceof $) {
                sections[section].$element.html('').append(content);
            } else {
                sections[section].$element.html(content);
            }
        };

        /**
         * Insert element with given ID into the DOM.
         *
         * @private
         * @param {array|Array|string[]} order
         * List with ordered element IDs
         * @param {string} id
         * ID of the element to be inserted
         * @param {Object} elements
         * Maps ID to the elements
         * @param {H5P.jQuery} $container
         * Parent container of the elements
         */
        var insert = function(order, id, elements, $container) {
            // Try to find an element id should be after
            for (var i = 0; i < order.length; i++) {
                if (order[i] === id) {
                    // Found our pos
                    while (i > 0 &&
                        (elements[order[i - 1]] === undefined ||
                            !elements[order[i - 1]].isVisible)) {
                        i--;
                    }
                    if (i === 0) {
                        // We are on top.
                        elements[id].$element.prependTo($container);
                    } else {
                        // Add after element
                        elements[id].$element.insertAfter(elements[order[i - 1]].$element);
                    }
                    elements[id].isVisible = true;
                    break;
                }
            }
        };

        /**
         * Make feedback into a popup and position relative to click.
         *
         * @private
         * @param {string} [closeText] Text for the close button
         */
        var makeFeedbackPopup = function(closeText) {
            var $element = sections.feedback.$element;
            var $parent = sections.content.$element;
            var $click = (clickElement != null ? clickElement.$element : null);

            $element.appendTo($parent).addClass('h5p-question-popup');

            if (sections.scorebar) {
                sections.scorebar.$element.appendTo($element);
            }

            $parent.addClass('h5p-has-question-popup');

            // Draw the tail
            var $tail = $('<div/>', {
                    'class': 'h5p-question-feedback-tail'
                }).hide()
                .appendTo($parent);

            // Draw the close button
            var $close = $('<div/>', {
                'class': 'h5p-question-feedback-close',
                'tabindex': 0,
                'title': closeText,
                on: {
                    click: function(event) {
                        $element.remove();
                        $tail.remove();
                        event.preventDefault();
                    },
                    keydown: function(event) {
                        switch (event.which) {
                            case 13: // Enter
                            case 32: // Space
                                $element.remove();
                                $tail.remove();
                                event.preventDefault();
                        }
                    }
                }
            }).hide().appendTo($element);

            if ($click != null) {
                if ($click.hasClass('correct')) {
                    $element.addClass('h5p-question-feedback-correct');
                    $close.show();
                    sections.buttons.$element.hide();
                } else {
                    sections.buttons.$element.appendTo(sections.feedback.$element);
                }
            }

            positionFeedbackPopup($element, $click);
        };

        /**
         * Position the feedback popup.
         *
         * @private
         * @param {H5P.jQuery} $element Feedback div
         * @param {H5P.jQuery} $click Visual click div
         */
        var positionFeedbackPopup = function($element, $click) {
            var $container = $element.parent();
            var $tail = $element.siblings('.h5p-question-feedback-tail');
            var popupWidth = $element.outerWidth();
            var popupHeight = setElementHeight($element);
            var space = 15;
            var disableTail = false;
            var positionY = $container.height() / 2 - popupHeight / 2;
            var positionX = $container.width() / 2 - popupWidth / 2;
            var tailX = 0;
            var tailY = 0;
            var tailRotation = 0;

            if ($click != null) {
                // Edge detection for click, takes space into account
                var clickNearTop = ($click[0].offsetTop < space);
                var clickNearBottom = ($click[0].offsetTop + $click.height() > $container.height() - space);
                var clickNearLeft = ($click[0].offsetLeft < space);
                var clickNearRight = ($click[0].offsetLeft + $click.width() > $container.width() - space);

                // Click is not in a corner or close to edge, calculate position normally
                positionX = $click[0].offsetLeft - popupWidth / 2 + $click.width() / 2;
                positionY = $click[0].offsetTop - popupHeight - space;
                tailX = positionX + popupWidth / 2 - $tail.width() / 2;
                tailY = positionY + popupHeight - ($tail.height() / 2);
                tailRotation = 225;

                // If popup is outside top edge, position under click instead
                if (popupHeight + space > $click[0].offsetTop) {
                    positionY = $click[0].offsetTop + $click.height() + space;
                    tailY = positionY - $tail.height() / 2;
                    tailRotation = 45;
                }

                // If popup is outside left edge, position left
                if (positionX < 0) {
                    positionX = 0;
                }

                // If popup is outside right edge, position right
                if (positionX + popupWidth > $container.width()) {
                    positionX = $container.width() - popupWidth;
                }

                // Special cases such as corner clicks, or close to an edge, they override X and Y positions if met
                if (clickNearTop && (clickNearLeft || clickNearRight)) {
                    positionX = $click[0].offsetLeft + (clickNearLeft ? $click.width() : -popupWidth);
                    positionY = $click[0].offsetTop + $click.height();
                    disableTail = true;
                } else if (clickNearBottom && (clickNearLeft || clickNearRight)) {
                    positionX = $click[0].offsetLeft + (clickNearLeft ? $click.width() : -popupWidth);
                    positionY = $click[0].offsetTop - popupHeight;
                    disableTail = true;
                } else if (!clickNearTop && !clickNearBottom) {
                    if (clickNearLeft || clickNearRight) {
                        positionY = $click[0].offsetTop - popupHeight / 2 + $click.width() / 2;
                        positionX = $click[0].offsetLeft + (clickNearLeft ? $click.width() + space : -popupWidth + -space);
                        // Make sure this does not position the popup off screen
                        if (positionX < 0) {
                            positionX = 0;
                            disableTail = true;
                        } else {
                            tailX = positionX + (clickNearLeft ? -$tail.width() / 2 : popupWidth - $tail.width() / 2);
                            tailY = positionY + popupHeight / 2 - $tail.height() / 2;
                            tailRotation = (clickNearLeft ? 315 : 135);
                        }
                    }
                }

                // Contain popup from overflowing bottom edge
                if (positionY + popupHeight > $container.height()) {
                    positionY = $container.height() - popupHeight;

                    if (popupHeight > $container.height() - ($click[0].offsetTop + $click.height() + space)) {
                        disableTail = true;
                    }
                }
            } else {
                disableTail = true;
            }

            // Contain popup from ovreflowing top edge
            if (positionY < 0) {
                positionY = 0;
            }

            $element.css({
                top: positionY,
                left: positionX
            });
            $tail.css({
                top: tailY,
                left: tailX
            });

            if (!disableTail) {
                $tail.css({
                    'left': tailX,
                    'top': tailY,
                    'transform': 'rotate(' + tailRotation + 'deg)'
                }).show();
            } else {
                $tail.hide();
            }
        };

        /**
         * Set element max height, used for animations.
         *
         * @param {H5P.jQuery} $element
         */
        var setElementHeight = function($element) {
            if (!$element.is(':visible')) {
                // No animation
                $element.css('max-height', 'none');
                return;
            }

            // If this element is shown in the popup, we can't set width to 100%,
            // since it already has a width set in CSS
            var isFeedbackPopup = $element.hasClass('h5p-question-popup');

            // Get natural element height
            var $tmp = $element.clone()
                .css({
                    'position': 'absolute',
                    'max-height': 'none',
                    'width': isFeedbackPopup ? '' : '100%'
                })
                .appendTo($element.parent());

            // Need to take margins into account when calculating available space
            var sideMargins = parseFloat($element.css('margin-left')) +
                parseFloat($element.css('margin-right'));
            var tmpElWidth = $tmp.css('width') ? $tmp.css('width') : '100%';
            $tmp.css('width', 'calc(' + tmpElWidth + ' - ' + sideMargins + 'px)');

            // Apply height to element
            var h = Math.round($tmp.get(0).getBoundingClientRect().height);
            var fontSize = parseFloat($element.css('fontSize'));
            var relativeH = h / fontSize;
            $element.css('max-height', relativeH + 'em');
            $tmp.remove();

            if (h > 0 && sections.buttons && sections.buttons.$element === $element) {
                // Make sure buttons section is visible
                showSection(sections.buttons);

                // Resize buttons after resizing button section
                setTimeout(resizeButtons, 150);
            }
            return h;
        };

        /**
         * Does the actual job of hiding the buttons scheduled for hiding.
         *
         * @private
         * @param {boolean} [relocateFocus] Find a new button to focus
         */
        var hideButtons = function(relocateFocus) {
            for (var i = 0; i < buttonsToHide.length; i++) {
                hideButton(buttonsToHide[i].id);
            }
            buttonsToHide = [];

            if (relocateFocus) {
                self.focusButton();
            }
        };

        /**
         * Does the actual hiding.
         * @private
         * @param {string} buttonId
         */
        var hideButton = function(buttonId) {
            // Using detach() vs hide() makes it harder to cheat.
            buttons[buttonId].$element.detach();
            buttons[buttonId].isVisible = false;
        };

        /**
         * Shows the buttons on the next tick. This is to avoid buttons flickering
         * If they're both added and removed on the same tick.
         *
         * @private
         */
        var toggleButtons = function() {
            // If no buttons section, return
            if (sections.buttons === undefined) {
                return;
            }

            // Clear transition timer, reevaluate if buttons will be detached
            clearTimeout(toggleButtonsTransitionTimer);

            // Show buttons
            for (var i = 0; i < buttonsToShow.length; i++) {
                insert(buttonOrder, buttonsToShow[i].id, buttons, sections.buttons.$element);
                buttons[buttonsToShow[i].id].isVisible = true;
            }
            buttonsToShow = [];

            // Hide buttons
            var numToHide = 0;
            var relocateFocus = false;
            for (var j = 0; j < buttonsToHide.length; j++) {
                var button = buttons[buttonsToHide[j].id];
                if (button.isVisible) {
                    numToHide += 1;
                }
                if (button.$element.is(':focus')) {
                    // Move focus to the first visible button.
                    relocateFocus = true;
                }
            }

            var animationTimer = 150;
            if (sections.feedback && sections.feedback.$element.hasClass('h5p-question-popup')) {
                animationTimer = 0;
            }

            if (numToHide === sections.buttons.$element.children().length) {
                // All buttons are going to be hidden. Hide container using transition.
                hideSection(sections.buttons);
                // Detach buttons
                hideButtons(relocateFocus);
            } else {
                hideButtons(relocateFocus);

                // Show button section
                if (!sections.buttons.$element.is(':empty')) {
                    showSection(sections.buttons);
                    setElementHeight(sections.buttons.$element);

                    // Trigger resize after animation
                    toggleButtonsTransitionTimer = setTimeout(function() {
                        self.trigger('resize');
                    }, animationTimer);
                }

                // Resize buttons to fit container
                resizeButtons();
            }

            toggleButtonsTimer = undefined;
        };

        /**
         * Allows for scaling of the question image.
         */
        var scaleImage = function() {
            var $imgSection = sections.image.$element;
            clearTimeout(imageTransitionTimer);

            // Add this here to avoid initial transition of the image making
            // content overflow. Alternatively we need to trigger a resize.
            $imgSection.addClass('animatable');

            if (imageThumb) {

                // Expand image
                $(this).attr('aria-expanded', true);
                $imgSection.addClass('h5p-question-image-fill-width');
                imageThumb = false;

                imageTransitionTimer = setTimeout(function() {
                    self.trigger('resize');
                }, 600);
            } else {

                // Scale down image
                $(this).attr('aria-expanded', false);
                $imgSection.removeClass('h5p-question-image-fill-width');
                imageThumb = true;

                imageTransitionTimer = setTimeout(function() {
                    self.trigger('resize');
                }, 600);
            }
        };

        /**
         * Get scrollable ancestor of element
         *
         * @private
         * @param {H5P.jQuery} $element
         * @param {Number} [currDepth=0] Current recursive calls to ancestor, stop at maxDepth
         * @param {Number} [maxDepth=5] Maximum depth for finding ancestor.
         * @returns {H5P.jQuery} Parent element that is scrollable
         */
        var findScrollableAncestor = function($element, currDepth, maxDepth) {
            if (!currDepth) {
                currDepth = 0;
            }
            if (!maxDepth) {
                maxDepth = 5;
            }
            // Check validation of element or if we have reached document root
            if (!$element || !($element instanceof $) || document === $element.get(0) || currDepth >= maxDepth) {
                return;
            }

            if ($element.css('overflow-y') === 'auto') {
                return $element;
            } else {
                return findScrollableAncestor($element.parent(), currDepth + 1, maxDepth);
            }
        };

        /**
         * Scroll to bottom of Question.
         *
         * @private
         */
        var scrollToBottom = function() {
            if (!$wrapper || ($wrapper.hasClass('h5p-standalone') && !H5P.isFullscreen)) {
                return; // No scroll
            }

            var scrollableAncestor = findScrollableAncestor($wrapper);

            // Scroll to bottom of scrollable ancestor
            if (scrollableAncestor) {
                scrollableAncestor.animate({
                    scrollTop: $wrapper.css('height')
                }, "slow");
            }
        };

        /**
         * Resize buttons to fit container width
         *
         * @private
         */
        var resizeButtons = function() {
            if (!buttons || !sections.buttons) {
                return;
            }

            var go = function() {
                // Don't do anything if button elements are not visible yet
                if (!sections.buttons.$element.is(':visible')) {
                    return;
                }

                // Width of all buttons
                var buttonsWidth = {
                    max: 0,
                    min: 0,
                    current: 0
                };

                for (var i in buttons) {
                    var button = buttons[i];
                    if (button.isVisible) {
                        setButtonWidth(buttons[i]);
                        buttonsWidth.max += button.width.max;
                        buttonsWidth.min += button.width.min;
                        buttonsWidth.current += button.isTruncated ? button.width.min : button.width.max;
                    }
                }

                var makeButtonsFit = function(availableWidth) {
                    if (buttonsWidth.max < availableWidth) {
                        // It is room for everyone on the right side of the score bar (without truncating)
                        if (buttonsWidth.max !== buttonsWidth.current) {
                            // Need to make everyone big
                            restoreButtonLabels(buttonsWidth.current, availableWidth);
                        }
                        return true;
                    } else if (buttonsWidth.min < availableWidth) {
                        // Is it room for everyone on the right side of the score bar with truncating?
                        if (buttonsWidth.current > availableWidth) {
                            removeButtonLabels(buttonsWidth.current, availableWidth);
                        } else {
                            restoreButtonLabels(buttonsWidth.current, availableWidth);
                        }
                        return true;
                    }
                    return false;
                };

                toggleFullWidthScorebar(false);

                var buttonSectionWidth = Math.floor(sections.buttons.$element.width()) - 1;

                if (!makeButtonsFit(buttonSectionWidth)) {
                    // If we get here we need to wrap:
                    toggleFullWidthScorebar(true);
                    buttonSectionWidth = Math.floor(sections.buttons.$element.width()) - 1;
                    makeButtonsFit(buttonSectionWidth);
                }
            };

            // If visible, resize right away
            if (sections.buttons.$element.is(':visible')) {
                go();
            } else { // If not visible, try on the next tick
                // Clear button truncation timer if within a button truncation function
                if (buttonTruncationTimer) {
                    clearTimeout(buttonTruncationTimer);
                }
                buttonTruncationTimer = setTimeout(function() {
                    buttonTruncationTimer = undefined;
                    go();
                }, 0);
            }
        };

        var toggleFullWidthScorebar = function(enabled) {
            if (sections.scorebar &&
                sections.scorebar.$element &&
                sections.scorebar.$element.hasClass('h5p-question-visible')) {
                sections.buttons.$element.addClass('has-scorebar');
                sections.buttons.$element.toggleClass('wrap', enabled);
                sections.scorebar.$element.toggleClass('full-width', enabled);
            } else {
                sections.buttons.$element.removeClass('has-scorebar');
            }
        };

        /**
         * Remove button labels until they use less than max width.
         *
         * @private
         * @param {Number} buttonsWidth Total width of all buttons
         * @param {Number} maxButtonsWidth Max width allowed for buttons
         */
        var removeButtonLabels = function(buttonsWidth, maxButtonsWidth) {
            // Reverse traversal
            for (var i = buttonOrder.length - 1; i >= 0; i--) {
                var buttonId = buttonOrder[i];
                var button = buttons[buttonId];
                if (!button.isTruncated && button.isVisible) {
                    var $button = button.$element;
                    buttonsWidth -= button.width.max - button.width.min;

                    // Remove label
                    button.$element.attr('aria-label', $button.text()).html('').addClass('truncated');
                    button.isTruncated = true;
                    if (buttonsWidth <= maxButtonsWidth) {
                        // Buttons are small enough.
                        return;
                    }
                }
            }
        };

        /**
         * Restore button labels until it fills maximum possible width without exceeding the max width.
         *
         * @private
         * @param {Number} buttonsWidth Total width of all buttons
         * @param {Number} maxButtonsWidth Max width allowed for buttons
         */
        var restoreButtonLabels = function(buttonsWidth, maxButtonsWidth) {
            for (var i = 0; i < buttonOrder.length; i++) {
                var buttonId = buttonOrder[i];
                var button = buttons[buttonId];
                if (button.isTruncated && button.isVisible) {
                    // Calculate new total width of buttons with a static pixel for consistency cross-browser
                    buttonsWidth += button.width.max - button.width.min + 1;

                    if (buttonsWidth > maxButtonsWidth) {
                        return;
                    }
                    // Restore label
                    button.$element.html(button.text);
                    button.$element.removeClass('truncated');
                    button.isTruncated = false;
                }
            }
        };

        /**
         * Helper function for finding index of keyValue in array
         *
         * @param {String} keyValue Value to be found
         * @param {String} key In key
         * @param {Array} array In array
         * @returns {number}
         */
        var existsInArray = function(keyValue, key, array) {
            var i;
            for (i = 0; i < array.length; i++) {
                if (array[i][key] === keyValue) {
                    return i;
                }
            }
            return -1;
        };

        /**
         * Show a section
         * @param {Object} section
         */
        var showSection = function(section) {
            section.$element.addClass('h5p-question-visible');
            section.isVisible = true;
        };

        /**
         * Hide a section
         * @param {Object} section
         */
        var hideSection = function(section) {
            section.$element.css('max-height', '');
            section.isVisible = false;

            setTimeout(function() {
                // Only hide if section hasn't been set to visible in the meantime
                if (!section.isVisible) {
                    section.$element.removeClass('h5p-question-visible');
                }
            }, 150);
        };

        /**
         * Set behaviour for question.
         *
         * @param {Object} options An object containing behaviour that will be extended by Question
         */
        self.setBehaviour = function(options) {
            $.extend(behaviour, options);
        };

        /**
         * A video to display above the task.
         *
         * @param {object} params
         */
        self.setVideo = function(params) {
            sections.video = {
                $element: $('<div/>', {
                    'class': 'h5p-question-video'
                })
            };

            if (disableAutoPlay && params.params.playback) {
                params.params.playback.autoplay = false;
            }

            // Never fit to wrapper
            if (!params.params.visuals) {
                params.params.visuals = {};
            }
            params.params.visuals.fit = false;
            sections.video.instance = H5P.newRunnable(params, self.contentId, sections.video.$element, true);
            var fromVideo = false; // Hack to avoid never ending loop
            sections.video.instance.on('resize', function() {
                fromVideo = true;
                self.trigger('resize');
                fromVideo = false;
            });
            self.on('resize', function() {
                if (!fromVideo) {
                    sections.video.instance.trigger('resize');
                }
            });

            return self;
        };

        /**
         * Will stop any playback going on in the task.
         */
        self.pause = function() {
            if (sections.video && sections.video.isVisible) {
                sections.video.instance.pause();
            }
        };

        /**
         * Start playback of video
         */
        self.play = function() {
            if (sections.video && sections.video.isVisible) {
                sections.video.instance.play();
            }
        };

        /**
         * Disable auto play, useful in editors.
         */
        self.disableAutoPlay = function() {
            disableAutoPlay = true;
        };

        /**
         * Add task image.
         *
         * @param {string} path Relative
         * @param {Object} [options] Options object
         * @param {string} [options.alt] Text representation
         * @param {string} [options.title] Hover text
         * @param {Boolean} [options.disableImageZooming] Set as true to disable image zooming
         */
        self.setImage = function(path, options) {
            options = options ? options : {};
            sections.image = {};
            // Image container
            sections.image.$element = $('<div/>', {
                'class': 'h5p-question-image h5p-question-image-fill-width'
            });

            // Inner wrap
            var $imgWrap = $('<div/>', {
                'class': 'h5p-question-image-wrap',
                appendTo: sections.image.$element
            });

            // Image element
            var $img = $('<img/>', {
                src: H5P.getPath(path, self.contentId),
                alt: (options.alt === undefined ? '' : options.alt),
                title: (options.title === undefined ? '' : options.title),
                on: {
                    load: function() {
                        self.trigger('imageLoaded', this);
                        self.trigger('resize');
                    }
                },
                appendTo: $imgWrap
            });

            // Disable image zooming
            if (options.disableImageZooming) {
                $img.css('maxHeight', 'none');

                // Make sure we are using the correct amount of width at all times
                var determineImgWidth = function() {

                    // Remove margins if natural image width is bigger than section width
                    var imageSectionWidth = sections.image.$element.get(0).getBoundingClientRect().width;

                    // Do not transition, for instant measurements
                    $imgWrap.css({
                        '-webkit-transition': 'none',
                        'transition': 'none'
                    });

                    // Margin as translateX on both sides of image.
                    var diffX = 2 * ($imgWrap.get(0).getBoundingClientRect().left -
                        sections.image.$element.get(0).getBoundingClientRect().left);

                    if ($img.get(0).naturalWidth >= imageSectionWidth - diffX) {
                        sections.image.$element.addClass('h5p-question-image-fill-width');
                    } else { // Use margin for small res images
                        sections.image.$element.removeClass('h5p-question-image-fill-width');
                    }

                    // Reset transition rules
                    $imgWrap.css({
                        '-webkit-transition': '',
                        'transition': ''
                    });
                };

                // Determine image width
                if ($img.is(':visible')) {
                    determineImgWidth();
                } else {
                    $img.on('load', determineImgWidth);
                }

                // Skip adding zoom functionality
                return;
            }

            var sizeDetermined = false;
            var determineSize = function() {
                if (sizeDetermined || !$img.is(':visible')) {
                    return; // Try again next time.
                }

                $imgWrap.addClass('h5p-question-image-scalable')
                    .attr('aria-expanded', false)
                    .attr('role', 'button')
                    .attr('tabIndex', '0')
                    .on('click', function(event) {
                        if (event.which === 1) {
                            scaleImage.apply(this); // Left mouse button click
                        }
                    }).on('keypress', function(event) {
                        if (event.which === 32) {
                            event.preventDefault(); // Prevent default behaviour; page scroll down
                            scaleImage.apply(this); // Space bar pressed
                        }
                    });
                sections.image.$element.removeClass('h5p-question-image-fill-width');

                sizeDetermined = true; // Prevent any futher events
            };

            self.on('resize', determineSize);

            return self;
        };

        /**
         * Add the introduction section.
         *
         * @param {(string|H5P.jQuery)} content
         */
        self.setIntroduction = function(content) {
            register('introduction', content);

            return self;
        };

        /**
         * Add the content section.
         *
         * @param {(string|H5P.jQuery)} content
         * @param {Object} [options]
         * @param {string} [options.class]
         */
        self.setContent = function(content, options) {
            register('content', content);

            if (options && options.class) {
                sections.content.$element.addClass(options.class);
            }

            return self;
        };

        /**
         * Force readspeaker to read text. Useful when you have to use
         * setTimeout for animations.
         */
        self.read = function(content) {
            if (!$read) {
                return; // Not ready yet
            }

            if (readText) {
                // Combine texts if called multiple times
                readText += (readText.substr(-1, 1) === '.' ? ' ' : '. ') + content;
            } else {
                readText = content;
            }

            // Set text
            $read.html(readText);

            setTimeout(function() {
                // Stop combining when done reading
                readText = null;
                $read.html('');
            }, 100);
        };

        /**
         * Read feedback
         */
        self.readFeedback = function() {
            var invalidFeedback =
                behaviour.disableReadSpeaker ||
                !showFeedback ||
                !sections.feedback ||
                !sections.feedback.$element;

            if (invalidFeedback) {
                return;
            }

            var $feedbackText = $('.h5p-question-feedback-content-text', sections.feedback.$element);
            if ($feedbackText && $feedbackText.html() && $feedbackText.html().length) {
                self.read($feedbackText.html());
            }
        };

        /**
         * Remove feedback
         *
         * @return {H5P.Question}
         */
        self.removeFeedback = function() {

            clearTimeout(feedbackTransitionTimer);

            if (sections.feedback && showFeedback) {

                showFeedback = false;

                // Hide feedback & scorebar
                hideSection(sections.scorebar);
                hideSection(sections.feedback);

                sectionsIsTransitioning = true;

                // Detach after transition
                feedbackTransitionTimer = setTimeout(function() {
                    // Avoiding Transition.onTransitionEnd since it will register multiple events, and there's no way to cancel it if the transition changes back to "show" while the animation is happening.
                    if (!showFeedback) {
                        sections.feedback.$element.children().detach();
                        sections.scorebar.$element.children().detach();

                        // Trigger resize after animation
                        self.trigger('resize');
                    }
                    sectionsIsTransitioning = false;
                    scoreBar.setScore(0);
                }, 150);

                if ($wrapper) {
                    $wrapper.find('.h5p-question-feedback-tail').remove();
                }
            }

            return self;
        };

        /**
         * Set feedback message.
         *
         * @param {string} [content]
         * @param {number} score The score
         * @param {number} maxScore The maximum score for this question
         * @param {string} [scoreBarLabel] Makes it easier for readspeakers to identify the scorebar
         * @param {string} [helpText] Help text that describes the score inside a tip icon
         * @param {object} [popupSettings] Extra settings for popup feedback
         * @param {boolean} [popupSettings.showAsPopup] Should the feedback display as popup?
         * @param {string} [popupSettings.closeText] Translation for close button text
         * @param {object} [popupSettings.click] Element representing where user clicked on screen
         */
        self.setFeedback = function(content, score, maxScore, scoreBarLabel, helpText, popupSettings, scoreExplanationButtonLabel) {
            // Feedback is disabled
            if (behaviour.disableFeedback) {
                return self;
            }

            // Need to toggle buttons right away to avoid flickering/blinking
            // Note: This means content types should invoke hide/showButton before setFeedback
            toggleButtons();

            clickElement = (popupSettings != null && popupSettings.click != null ? popupSettings.click : null);
            clearTimeout(feedbackTransitionTimer);

            var $feedback = $('<div>', {
                'class': 'h5p-question-feedback-container'
            });

            var $feedbackContent = $('<div>', {
                'class': 'h5p-question-feedback-content'
            }).appendTo($feedback);

            // Feedback text
            $('<div>', {
                'class': 'h5p-question-feedback-content-text',
                'html': content
            }).appendTo($feedbackContent);

            var $scorebar = $('<div>', {
                'class': 'h5p-question-scorebar-container'
            });
            if (scoreBar === undefined) {
                scoreBar = JoubelUI.createScoreBar(maxScore, scoreBarLabel, helpText, scoreExplanationButtonLabel);
            }
            scoreBar.appendTo($scorebar);

            $feedbackContent.toggleClass('has-content', content !== undefined && content.length > 0);

            // Feedback for readspeakers
            if (!behaviour.disableReadSpeaker && scoreBarLabel) {
                self.read(scoreBarLabel.replace(':num', score).replace(':total', maxScore) + '. ' + (content ? content : ''));
            }

            showFeedback = true;
            if (sections.feedback) {
                // Update section
                update('feedback', $feedback);
                update('scorebar', $scorebar);
            } else {
                // Create section
                register('feedback', $feedback);
                register('scorebar', $scorebar);
                if (initialized && $wrapper) {
                    insert(self.order, 'feedback', sections, $wrapper);
                    insert(self.order, 'scorebar', sections, $wrapper);
                }
            }

            showSection(sections.feedback);
            showSection(sections.scorebar);

            resizeButtons();

            if (popupSettings != null && popupSettings.showAsPopup == true) {
                makeFeedbackPopup(popupSettings.closeText);
                scoreBar.setScore(score);
            } else {
                // Show feedback section
                feedbackTransitionTimer = setTimeout(function() {
                    setElementHeight(sections.feedback.$element);
                    setElementHeight(sections.scorebar.$element);
                    sectionsIsTransitioning = true;

                    // Scroll to bottom after showing feedback
                    scrollToBottom();

                    // Trigger resize after animation
                    feedbackTransitionTimer = setTimeout(function() {
                        sectionsIsTransitioning = false;
                        self.trigger('resize');
                        scoreBar.setScore(score);
                    }, 150);
                }, 0);
            }

            return self;
        };

        /**
         * Set feedback content (no animation).
         *
         * @param {string} content
         * @param {boolean} [extendContent] True will extend content, instead of replacing it
         */
        self.updateFeedbackContent = function(content, extendContent) {
            if (sections.feedback && sections.feedback.$element) {

                if (extendContent) {
                    content = $('.h5p-question-feedback-content', sections.feedback.$element).html() + ' ' + content;
                }

                // Update feedback content html
                $('.h5p-question-feedback-content', sections.feedback.$element).html(content).addClass('has-content');

                // Make sure the height is correct
                setElementHeight(sections.feedback.$element);

                // Need to trigger resize when feedback has finished transitioning
                setTimeout(self.trigger.bind(self, 'resize'), 150);
            }

            return self;
        };

        /**
         * Set the content of the explanation / feedback panel
         *
         * @param {Object} data
         * @param {string} data.correct
         * @param {string} data.wrong
         * @param {string} data.text
         * @param {string} title Title for explanation panel
         *
         * @return {H5P.Question}
         */
        self.setExplanation = function(data, title) {
            if (data) {
                var explainer = new H5P.Question.Explainer(title, data);

                if (sections.explanation) {
                    // Update section
                    update('explanation', explainer.getElement());
                } else {
                    register('explanation', explainer.getElement());

                    if (initialized && $wrapper) {
                        insert(self.order, 'explanation', sections, $wrapper);
                    }
                }
            } else if (sections.explanation) {
                // Hide explanation section
                sections.explanation.$element.children().detach();
            }

            return self;
        };

        /**
         * Checks to see if button is registered.
         *
         * @param {string} id
         * @returns {boolean}
         */
        self.hasButton = function(id) {
            return (buttons[id] !== undefined);
        };

        /**
         * @typedef {Object} ConfirmationDialog
         * @property {boolean} [enable] Must be true to show confirmation dialog
         * @property {Object} [instance] Instance that uses confirmation dialog
         * @property {jQuery} [$parentElement] Append to this element.
         * @property {Object} [l10n] Translatable fields
         * @property {string} [l10n.header] Header text
         * @property {string} [l10n.body] Body text
         * @property {string} [l10n.cancelLabel]
         * @property {string} [l10n.confirmLabel]
         */

        /**
         * Register buttons for the task.
         *
         * @param {string} id
         * @param {string} text label
         * @param {function} clicked
         * @param {boolean} [visible=true]
         * @param {Object} [options] Options for button
         * @param {Object} [extras] Extra options
         * @param {ConfirmationDialog} [extras.confirmationDialog] Confirmation dialog
         */
        self.addButton = function(id, text, clicked, visible, options, extras) {
            if (buttons[id]) {
                return self; // Already registered
            }

            if (sections.buttons === undefined) {
                // We have buttons, register wrapper
                register('buttons');
                if (initialized) {
                    insert(self.order, 'buttons', sections, $wrapper);
                }
            }

            extras = extras || {};
            extras.confirmationDialog = extras.confirmationDialog || {};
            options = options || {};

            var confirmationDialog =
                self.addConfirmationDialogToButton(extras.confirmationDialog, clicked);

            /**
             * Handle button clicks through both mouse and keyboard
             * @private
             */
            var handleButtonClick = function() {
                if (extras.confirmationDialog.enable && confirmationDialog) {
                    // Show popups section if used
                    if (!extras.confirmationDialog.$parentElement) {
                        sections.popups.$element.removeClass('hidden');
                    }
                    confirmationDialog.show($e.position().top);
                } else {
                    clicked();
                }
            };

            buttons[id] = {
                isTruncated: false,
                text: text,
                isVisible: false
            };
            // The button might be <button> or <a>
            // (dependent on options.href set or not)
            var isAnchorTag = (options.href !== undefined);
            var $e = buttons[id].$element = JoubelUI.createButton($.extend({
                'class': 'h5p-question-' + id,
                html: text,
                title: text,
                on: {
                    click: function(event) {
                        handleButtonClick();
                        if (isAnchorTag) {
                            event.preventDefault();
                        }
                    }
                }
            }, options));
            buttonOrder.push(id);

            // The button might be <button> or <a>. If <a>, the space key is not
            // triggering the click event, must therefore handle this here:
            if (isAnchorTag) {
                $e.on('keypress', function(event) {
                    if (event.which === 32) { // Space
                        handleButtonClick();
                        event.preventDefault();
                    }
                });
            }

            if (visible === undefined || visible) {
                // Button should be visible
                $e.appendTo(sections.buttons.$element);
                buttons[id].isVisible = true;
                showSection(sections.buttons);
            }

            return self;
        };

        var setButtonWidth = function(button) {
            var $button = button.$element;
            var $tmp = $button.clone()
                .css({
                    'position': 'absolute',
                    'white-space': 'nowrap',
                    'max-width': 'none'
                }).removeClass('truncated')
                .html(button.text)
                .appendTo($button.parent());

            // Calculate max width (button including text)
            button.width = {
                max: Math.ceil($tmp.outerWidth() + parseFloat($tmp.css('margin-left')) + parseFloat($tmp.css('margin-right')))
            };

            // Calculate min width (truncated, icon only)
            $tmp.html('').addClass('truncated');
            button.width.min = Math.ceil($tmp.outerWidth() + parseFloat($tmp.css('margin-left')) + parseFloat($tmp.css('margin-right')));
            $tmp.remove();
        };

        /**
         * Add confirmation dialog to button
         * @param {ConfirmationDialog} options
         *  A confirmation dialog that will be shown before click handler of button
         *  is triggered
         * @param {function} clicked
         *  Click handler of button
         * @return {H5P.ConfirmationDialog|undefined}
         *  Confirmation dialog if enabled
         */
        self.addConfirmationDialogToButton = function(options, clicked) {
            options = options || {};

            if (!options.enable) {
                return;
            }

            // Confirmation dialog
            var confirmationDialog = new H5P.ConfirmationDialog({
                instance: options.instance,
                headerText: options.l10n.header,
                dialogText: options.l10n.body,
                cancelText: options.l10n.cancelLabel,
                confirmText: options.l10n.confirmLabel
            });

            // Determine parent element
            if (options.$parentElement) {
                confirmationDialog.appendTo(options.$parentElement.get(0));
            } else {

                // Create popup section and append to that
                if (sections.popups === undefined) {
                    register('popups');
                    if (initialized) {
                        insert(self.order, 'popups', sections, $wrapper);
                    }
                    sections.popups.$element.addClass('hidden');
                    self.order.push('popups');
                }
                confirmationDialog.appendTo(sections.popups.$element.get(0));
            }

            // Add event listeners
            confirmationDialog.on('confirmed', function() {
                if (!options.$parentElement) {
                    sections.popups.$element.addClass('hidden');
                }
                clicked();

                // Trigger to content type
                self.trigger('confirmed');
            });

            confirmationDialog.on('canceled', function() {
                if (!options.$parentElement) {
                    sections.popups.$element.addClass('hidden');
                }
                // Trigger to content type
                self.trigger('canceled');
            });

            return confirmationDialog;
        };

        /**
         * Show registered button with given identifier.
         *
         * @param {string} id
         * @param {Number} [priority]
         */
        self.showButton = function(id, priority) {
            var aboutToBeHidden = existsInArray(id, 'id', buttonsToHide) !== -1;
            if (buttons[id] === undefined || (buttons[id].isVisible === true && !aboutToBeHidden)) {
                return self;
            }

            priority = priority || 0;

            // Skip if already being shown
            var indexToShow = existsInArray(id, 'id', buttonsToShow);
            if (indexToShow !== -1) {

                // Update priority
                if (buttonsToShow[indexToShow].priority < priority) {
                    buttonsToShow[indexToShow].priority = priority;
                }

                return self;
            }

            // Check if button is going to be hidden on next tick
            var exists = existsInArray(id, 'id', buttonsToHide);
            if (exists !== -1) {

                // Skip hiding if higher priority
                if (buttonsToHide[exists].priority <= priority) {
                    buttonsToHide.splice(exists, 1);
                    buttonsToShow.push({
                        id: id,
                        priority: priority
                    });
                }

            } // If button is not shown
            else if (!buttons[id].$element.is(':visible')) {

                // Show button on next tick
                buttonsToShow.push({
                    id: id,
                    priority: priority
                });
            }

            if (!toggleButtonsTimer) {
                toggleButtonsTimer = setTimeout(toggleButtons, 0);
            }

            return self;
        };

        /**
         * Hide registered button with given identifier.
         *
         * @param {string} id
         * @param {number} [priority]
         */
        self.hideButton = function(id, priority) {
            var aboutToBeShown = existsInArray(id, 'id', buttonsToShow) !== -1;
            if (buttons[id] === undefined || (buttons[id].isVisible === false && !aboutToBeShown)) {
                return self;
            }

            priority = priority || 0;

            // Skip if already being hidden
            var indexToHide = existsInArray(id, 'id', buttonsToHide);
            if (indexToHide !== -1) {

                // Update priority
                if (buttonsToHide[indexToHide].priority < priority) {
                    buttonsToHide[indexToHide].priority = priority;
                }

                return self;
            }

            // Check if buttons is going to be shown on next tick
            var exists = existsInArray(id, 'id', buttonsToShow);
            if (exists !== -1) {

                // Skip showing if higher priority
                if (buttonsToShow[exists].priority <= priority) {
                    buttonsToShow.splice(exists, 1);
                    buttonsToHide.push({
                        id: id,
                        priority: priority
                    });
                }
            } else if (!buttons[id].$element.is(':visible')) {

                // Make sure it is detached in case the container is hidden.
                hideButton(id);
            } else {

                // Hide button on next tick.
                buttonsToHide.push({
                    id: id,
                    priority: priority
                });
            }

            if (!toggleButtonsTimer) {
                toggleButtonsTimer = setTimeout(toggleButtons, 0);
            }

            return self;
        };

        /**
         * Set focus to the given button. If no button is given the first visible
         * button gets focused. This is useful if you lose focus.
         *
         * @param {string} [id]
         */
        self.focusButton = function(id) {
            if (id === undefined) {
                // Find first button that is visible.
                for (var i = 0; i < buttonOrder.length; i++) {
                    var button = buttons[buttonOrder[i]];
                    if (button && button.isVisible) {
                        // Give that button focus
                        button.$element.focus();
                        break;
                    }
                }
            } else if (buttons[id] && buttons[id].$element.is(':visible')) {
                // Set focus to requested button
                buttons[id].$element.focus();
            }

            return self;
        };

        /**
         * Toggle readspeaker functionality
         * @param {boolean} [disable] True to disable, false to enable.
         */
        self.toggleReadSpeaker = function(disable) {
            behaviour.disableReadSpeaker = disable || !behaviour.disableReadSpeaker;
        };

        /**
         * Set new element for section.
         *
         * @param {String} id
         * @param {H5P.jQuery} $element
         */
        self.insertSectionAtElement = function(id, $element) {
            if (sections[id] === undefined) {
                register(id);
            }
            sections[id].parent = $element;

            // Insert section if question is not initialized
            if (!initialized) {
                insert([id], id, sections, $element);
            }

            return self;
        };

        /**
         * Attach content to given container.
         *
         * @param {H5P.jQuery} $container
         */
        self.attach = function($container) {
            if (self.isRoot()) {
                self.setActivityStarted();
            }

            // The first time we attach we also create our DOM elements.
            if ($wrapper === undefined) {
                if (self.registerDomElements !== undefined &&
                    (self.registerDomElements instanceof Function ||
                        typeof self.registerDomElements === 'function')) {

                    // Give the question type a chance to register before attaching
                    self.registerDomElements();
                }

                // Create section for reading messages
                $read = $('<div/>', {
                    'aria-live': 'polite',
                    'class': 'h5p-hidden-read'
                });
                register('read', $read);
                self.trigger('registerDomElements');
            }

            // Prepare container
            $wrapper = $container;
            $container.html('')
                .addClass('h5p-question h5p-' + type);

            // Add sections in given order
            var $sections = [];
            for (var i = 0; i < self.order.length; i++) {
                var section = self.order[i];
                if (sections[section]) {
                    if (sections[section].parent) {
                        // Section has a different parent
                        sections[section].$element.appendTo(sections[section].parent);
                    } else {
                        $sections.push(sections[section].$element);
                    }
                    sections[section].isVisible = true;
                }
            }

            // Only append once to DOM for optimal performance
            $container.append($sections);

            // Let others react to dom changes
            self.trigger('domChanged', {
                '$target': $container,
                'library': self.libraryInfo.machineName,
                'contentId': self.contentId,
                'key': 'newLibrary'
            }, {
                'bubbles': true,
                'external': true
            });

            // ??
            initialized = true;

            return self;
        };

        /**
         * Detach all sections from their parents
         */
        self.detachSections = function() {
            // Deinit Question
            initialized = false;

            // Detach sections
            for (var section in sections) {
                sections[section].$element.detach();
            }

            return self;
        };

        // Listen for resize
        self.on('resize', function() {
            // Allow elements to attach and set their height before resizing
            if (!sectionsIsTransitioning && sections.feedback && showFeedback) {
                // Resize feedback to fit
                setElementHeight(sections.feedback.$element);
            }

            // Re-position feedback popup if in use
            var $element = sections.feedback;
            var $click = clickElement;

            if ($element != null && $element.$element != null && $click != null && $click.$element != null) {
                setTimeout(function() {
                    positionFeedbackPopup($element.$element, $click.$element);
                }, 10);
            }

            resizeButtons();
        });
    }

    // Inheritance
    Question.prototype = Object.create(EventDispatcher.prototype);
    Question.prototype.constructor = Question;

    /**
     * Determine the overall feedback to display for the question.
     * Returns empty string if no matching range is found.
     *
     * @param {Object[]} feedbacks
     * @param {number} scoreRatio
     * @return {string}
     */
    Question.determineOverallFeedback = function(feedbacks, scoreRatio) {
        scoreRatio = Math.floor(scoreRatio * 100);

        for (var i = 0; i < feedbacks.length; i++) {
            var feedback = feedbacks[i];
            var hasFeedback = (feedback.feedback !== undefined && feedback.feedback.trim().length !== 0);

            if (feedback.from <= scoreRatio && feedback.to >= scoreRatio && hasFeedback) {
                return feedback.feedback;
            }
        }

        return '';
    };

    return Question;
})(H5P.jQuery, H5P.EventDispatcher, H5P.JoubelUI);
H5P.Question.Explainer = (function($) {
    /**
     * Constructor
     *
     * @class
     * @param {string} title
     * @param {array} explanations
     */
    function Explainer(title, explanations) {
        var self = this;

        /**
         * Create the DOM structure
         */
        var createHTML = function() {
            self.$explanation = $('<div>', {
                'class': 'h5p-question-explanation-container'
            });

            // Add title:
            $('<div>', {
                'class': 'h5p-question-explanation-title',
                role: 'heading',
                html: title,
                appendTo: self.$explanation
            });

            var $explanationList = $('<ul>', {
                'class': 'h5p-question-explanation-list',
                appendTo: self.$explanation
            });

            for (var i = 0; i < explanations.length; i++) {
                var feedback = explanations[i];
                var $explanationItem = $('<li>', {
                    'class': 'h5p-question-explanation-item',
                    appendTo: $explanationList
                });

                var $content = $('<div>', {
                    'class': 'h5p-question-explanation-status'
                });

                if (feedback.correct) {
                    $('<span>', {
                        'class': 'h5p-question-explanation-correct',
                        html: feedback.correct,
                        appendTo: $content
                    });
                }
                if (feedback.wrong) {
                    $('<span>', {
                        'class': 'h5p-question-explanation-wrong',
                        html: feedback.wrong,
                        appendTo: $content
                    });
                }
                $content.appendTo($explanationItem);

                if (feedback.text) {
                    $('<div>', {
                        'class': 'h5p-question-explanation-text',
                        html: feedback.text,
                        appendTo: $explanationItem
                    });
                }
            }
        };

        createHTML();

        /**
         * Return the container HTMLElement
         *
         * @return {HTMLElement}
         */
        self.getElement = function() {
            return self.$explanation;
        };
    }

    return Explainer;

})(H5P.jQuery);
(function(Question) {

    /**
     * Makes it easy to add animated score points for your question type.
     *
     * @class H5P.Question.ScorePoints
     */
    Question.ScorePoints = function() {
        var self = this;

        var elements = [];
        var showElementsTimer;

        /**
         * Create the element that displays the score point element for questions.
         *
         * @param {boolean} isCorrect
         * @return {HTMLElement}
         */
        self.getElement = function(isCorrect) {
            var element = document.createElement('div');
            element.classList.add(isCorrect ? 'h5p-question-plus-one' : 'h5p-question-minus-one');
            element.classList.add('h5p-question-hidden-one');
            elements.push(element);

            // Schedule display animation of all added elements
            if (showElementsTimer) {
                clearTimeout(showElementsTimer);
            }
            showElementsTimer = setTimeout(showElements, 0);

            return element;
        };

        /**
         * @private
         */
        var showElements = function() {
            // Determine delay between triggering animations
            var delay = 0;
            var increment = 150;
            var maxTime = 1000;

            if (elements.length && elements.length > Math.ceil(maxTime / increment)) {
                // Animations will run for more than ~1 second, reduce it.
                increment = maxTime / elements.length;
            }

            for (var i = 0; i < elements.length; i++) {
                // Use timer to trigger show
                setTimeout(showElement(elements[i]), delay);

                // Increse delay for next element
                delay += increment;
            }
        };

        /**
         * Trigger transition animation for the given element
         *
         * @private
         * @param {HTMLElement} element
         * @return {function}
         */
        var showElement = function(element) {
            return function() {
                element.classList.remove('h5p-question-hidden-one');
            };
        };
    };

})(H5P.Question);
/*global EJS*/
// Will render a Question with multiple choices for answers.

// Options format:
// {
//   title: "Optional title for question box",
//   question: "Question text",
//   answers: [{text: "Answer text", correct: false}, ...],
//   singleAnswer: true, // or false, will change rendered output slightly.
//   singlePoint: true,  // True if question give a single point score only
//                       // if all are correct, false to give 1 point per
//                       // correct answer. (Only for singleAnswer=false)
//   randomAnswers: false  // Whether to randomize the order of answers.
// }
//
// Events provided:
// - h5pQuestionAnswered: Triggered when a question has been answered.

var H5P = H5P || {};

/**
 * @typedef {Object} Options
 *   Options for multiple choice
 *
 * @property {Object} behaviour
 * @property {boolean} behaviour.confirmCheckDialog
 * @property {boolean} behaviour.confirmRetryDialog
 *
 * @property {Object} UI
 * @property {string} UI.tipsLabel
 *
 * @property {Object} [confirmRetry]
 * @property {string} [confirmRetry.header]
 * @property {string} [confirmRetry.body]
 * @property {string} [confirmRetry.cancelLabel]
 * @property {string} [confirmRetry.confirmLabel]
 *
 * @property {Object} [confirmCheck]
 * @property {string} [confirmCheck.header]
 * @property {string} [confirmCheck.body]
 * @property {string} [confirmCheck.cancelLabel]
 * @property {string} [confirmCheck.confirmLabel]
 */

/**
 * Module for creating a multiple choice question
 *
 * @param {Options} options
 * @param {number} contentId
 * @param {Object} contentData
 * @returns {H5P.MultiChoice}
 * @constructor
 */
H5P.MultiChoice = function(options, contentId, contentData) {
    if (!(this instanceof H5P.MultiChoice))
        return new H5P.MultiChoice(options, contentId, contentData);
    var self = this;
    this.contentId = contentId;
    this.contentData = contentData;
    H5P.Question.call(self, 'multichoice');
    var $ = H5P.jQuery;

    // checkbox or radiobutton
    var texttemplate =
        '<ul class="h5p-answers" role="<%= role %>" aria-labelledby="<%= label %>">' +
        '  <% for (var i=0; i < answers.length; i++) { %>' +
        '    <li class="h5p-answer" role="<%= answers[i].role %>" tabindex="<%= answers[i].tabindex %>" aria-checked="<%= answers[i].checked %>" data-id="<%= i %>">' +
        '      <div class="h5p-alternative-container">' +
        '        <span class="h5p-alternative-inner"><%= answers[i].text %></span>' +
        '      </div>' +
        '      <div class="h5p-clearfix"></div>' +
        '    </li>' +
        '  <% } %>' +
        '</ul>';

    var defaults = {
        image: null,
        question: "No question text provided",
        answers: [{
            tipsAndFeedback: {
                tip: '',
                chosenFeedback: '',
                notChosenFeedback: ''
            },
            text: "Answer 1",
            correct: true
        }],
        overallFeedback: [],
        weight: 1,
        userAnswers: [],
        UI: {
            checkAnswerButton: 'Check',
            showSolutionButton: 'Show solution',
            tryAgainButton: 'Try again',
            scoreBarLabel: 'You got :num out of :total points',
            tipAvailable: "Tip available",
            feedbackAvailable: "Feedback available",
            readFeedback: 'Read feedback',
            shouldCheck: "Should have been checked",
            shouldNotCheck: "Should not have been checked",
            noInput: 'Input is required before viewing the solution',
            a11yCheck: 'Check the answers. The responses will be marked as correct, incorrect, or unanswered.',
            a11yShowSolution: 'Show the solution. The task will be marked with its correct solution.',
            a11yRetry: 'Retry the task. Reset all responses and start the task over again.',
        },
        behaviour: {
            enableRetry: true,
            enableSolutionsButton: true,
            enableCheckButton: true,
            type: 'auto',
            singlePoint: true,
            randomAnswers: false,
            showSolutionsRequiresInput: true,
            autoCheck: false,
            passPercentage: 100,
            showScorePoints: true
        }
    };
    var template = new EJS({
        text: texttemplate
    });
    var params = $.extend(true, defaults, options);
    // Keep track of number of correct choices
    var numCorrect = 0;

    // Loop through choices
    for (var i = 0; i < params.answers.length; i++) {
        var answer = params.answers[i];

        // Make sure tips and feedback exists
        answer.tipsAndFeedback = answer.tipsAndFeedback || {};

        if (params.answers[i].correct) {
            // Update number of correct choices
            numCorrect++;
        }
    }

    // Determine if no choices is the correct
    var blankIsCorrect = (numCorrect === 0);

    // Determine task type
    if (params.behaviour.type === 'auto') {
        // Use single choice if only one choice is correct
        params.behaviour.singleAnswer = (numCorrect === 1);
    } else {
        params.behaviour.singleAnswer = (params.behaviour.type === 'single');
    }

    var getCheckboxOrRadioIcon = function(radio, selected) {
        var icon;
        if (radio) {
            icon = selected ? '&#xe603;' : '&#xe600;';
        } else {
            icon = selected ? '&#xe601;' : '&#xe602;';
        }
        return icon;
    };

    // Initialize buttons and elements.
    var $myDom;
    var $feedbackDialog;

    /**
     * Remove all feedback dialogs
     */
    var removeFeedbackDialog = function() {
        // Remove the open feedback dialogs.
        $myDom.unbind('click', removeFeedbackDialog);
        $myDom.find('.h5p-feedback-button, .h5p-feedback-dialog').remove();
        $myDom.find('.h5p-has-feedback').removeClass('h5p-has-feedback');
        if ($feedbackDialog) {
            $feedbackDialog.remove();
        }
    };

    var score = 0;
    var solutionsVisible = false;

    /**
     * Add feedback to element
     * @param {jQuery} $element Element that feedback will be added to
     * @param {string} feedback Feedback string
     */
    var addFeedback = function($element, feedback) {
        $feedbackDialog = $('' +
            '<div class="h5p-feedback-dialog">' +
            '<div class="h5p-feedback-inner">' +
            '<div class="h5p-feedback-text" aria-hidden="true">' + feedback + '</div>' +
            '</div>' +
            '</div>');

        //make sure feedback is only added once
        if (!$element.find($('.h5p-feedback-dialog')).length) {
            $feedbackDialog.appendTo($element.addClass('h5p-has-feedback'));
        }
    };

    /**
     * Register the different parts of the task with the H5P.Question structure.
     */
    self.registerDomElements = function() {
        var media = params.media;
        if (media && media.type && media.type.library) {
            media = media.type;
            var type = media.library.split(' ')[0];
            if (type === 'H5P.Image') {
                if (media.params.file) {
                    // Register task image
                    self.setImage(media.params.file.path, {
                        disableImageZooming: params.media.disableImageZooming || false,
                        alt: media.params.alt,
                        title: media.params.title
                    });
                }
            } else if (type === 'H5P.Video') {
                if (media.params.sources) {
                    // Register task video
                    self.setVideo(media);
                }
            }
        }

        // Determine if we're using checkboxes or radio buttons
        for (var i = 0; i < params.answers.length; i++) {
            params.answers[i].checkboxOrRadioIcon = getCheckboxOrRadioIcon(params.behaviour.singleAnswer, params.userAnswers.indexOf(i) > -1);
        }

        // Register Introduction
        self.setIntroduction('<div id="' + params.label + '">' + params.question + '</div>');

        // Register task content area
        $myDom = $(template.render(params));
        self.setContent($myDom, {
            'class': params.behaviour.singleAnswer ? 'h5p-radio' : 'h5p-check'
        });

        // Create tips:
        var $answers = $('.h5p-answer', $myDom).each(function(i) {

            var tip = params.answers[i].tipsAndFeedback.tip;
            if (tip === undefined) {
                return; // No tip
            }

            tip = tip.trim();
            var tipContent = tip
                .replace(/&nbsp;/g, '')
                .replace(/<p>/g, '')
                .replace(/<\/p>/g, '')
                .trim();
            if (!tipContent.length) {
                return; // Empty tip
            } else {
                $(this).addClass('h5p-has-tip');
            }

            // Add tip
            var $wrap = $('<div/>', {
                'class': 'h5p-multichoice-tipwrap',
                'aria-label': params.UI.tipAvailable + '.'
            });

            var $multichoiceTip = $('<div>', {
                'role': 'button',
                'tabindex': 0,
                'title': params.UI.tipsLabel,
                'aria-label': params.UI.tipsLabel,
                'aria-expanded': false,
                'class': 'multichoice-tip',
                appendTo: $wrap
            });

            var tipIconHtml = '<span class="joubel-icon-tip-normal">' +
                '<span class="h5p-icon-shadow"></span>' +
                '<span class="h5p-icon-speech-bubble"></span>' +
                '<span class="h5p-icon-info"></span>' +
                '</span>';

            $multichoiceTip.append(tipIconHtml);

            $multichoiceTip.click(function() {
                var $tipContainer = $multichoiceTip.parents('.h5p-answer');
                var openFeedback = !$tipContainer.children('.h5p-feedback-dialog').is($feedbackDialog);
                removeFeedbackDialog();

                // Do not open feedback if it was open
                if (openFeedback) {
                    $multichoiceTip.attr('aria-expanded', true);

                    // Add tip dialog
                    addFeedback($tipContainer, tip);
                    $feedbackDialog.addClass('h5p-has-tip');

                    // Tip for readspeaker
                    self.read(tip);
                } else {
                    $multichoiceTip.attr('aria-expanded', false);
                }

                self.trigger('resize');

                // Remove tip dialog on dom click
                setTimeout(function() {
                    $myDom.click(removeFeedbackDialog);
                }, 100);

                // Do not propagate
                return false;
            }).keydown(function(e) {
                if (e.which === 32) {
                    $(this).click();
                    return false;
                }
            });

            $('.h5p-alternative-container', this).append($wrap);
        });

        // Set event listeners.
        var toggleCheck = function($ans) {
            if ($ans.attr('aria-disabled') === 'true') {
                return;
            }
            self.answered = true;
            var num = parseInt($ans.data('id'));
            if (params.behaviour.singleAnswer) {
                // Store answer
                params.userAnswers[0] = num;

                // Calculate score
                score = (params.answers[num].correct ? 1 : 0);

                // De-select previous answer
                $answers.not($ans).removeClass('h5p-selected').attr('tabindex', '-1').attr('aria-checked', 'false');

                // Select new answer
                $ans.addClass('h5p-selected').attr('tabindex', '0').attr('aria-checked', 'true');
            } else {
                if ($ans.attr('aria-checked') === 'true') {

                    // Do not allow un-checking when retry disabled and auto check
                    if (params.behaviour.autoCheck && !params.behaviour.enableRetry) {
                        return;
                    }

                    // Remove check
                    $ans.removeClass('h5p-selected').attr('aria-checked', 'false');
                } else {
                    $ans.addClass('h5p-selected').attr('aria-checked', 'true');
                }

                // Calculate score
                calcScore();
            }

            self.triggerXAPI('interacted');
            hideSolution($ans);

            if (params.userAnswers.length) {
                self.showButton('check-answer');
                self.hideButton('try-again');
                self.hideButton('show-solution');

                if (params.behaviour.autoCheck) {
                    if (params.behaviour.singleAnswer) {
                        // Only a single answer allowed
                        checkAnswer();
                    } else {
                        // Show feedback for selected alternatives
                        self.showCheckSolution(true);

                        // Always finish task if it was completed successfully
                        if (score === self.getMaxScore()) {
                            checkAnswer();
                        }
                    }
                }
            }
        };

        $answers.click(function() {
            toggleCheck($(this));
        }).keydown(function(e) {
            if (e.keyCode === 32) { // Space bar
                // Select current item
                toggleCheck($(this));
                return false;
            }

            if (params.behaviour.singleAnswer) {
                switch (e.keyCode) {
                    case 38: // Up
                    case 37: { // Left
                        // Try to select previous item
                        var $prev = $(this).prev();
                        if ($prev.length) {
                            toggleCheck($prev.focus());
                        }
                        return false;
                    }
                    case 40: // Down
                    case 39: { // Right
                        // Try to select next item
                        var $next = $(this).next();
                        if ($next.length) {
                            toggleCheck($next.focus());
                        }
                        return false;
                    }
                }
            }
        });

        if (params.behaviour.singleAnswer) {
            // Special focus handler for radio buttons
            $answers.focus(function() {
                if ($(this).attr('aria-disabled') !== 'true') {
                    $answers.not(this).attr('tabindex', '-1');
                }
            }).blur(function() {
                if (!$answers.filter('.h5p-selected').length) {
                    $answers.first().add($answers.last()).attr('tabindex', '0');
                }
            });
        }

        // Adds check and retry button
        addButtons();
        if (!params.behaviour.singleAnswer) {

            calcScore();
        } else {
            if (params.userAnswers.length && params.answers[params.userAnswers[0]].correct) {
                score = 1;
            } else {
                score = 0;
            }
        }

        // Has answered through auto-check in a previous session
        if (hasCheckedAnswer && params.behaviour.autoCheck) {

            // Check answers if answer has been given or max score reached
            if (params.behaviour.singleAnswer || score === self.getMaxScore()) {
                checkAnswer();
            } else {
                // Show feedback for checked checkboxes
                self.showCheckSolution(true);
            }
        }
    };

    this.showAllSolutions = function() {
        if (solutionsVisible) {
            return;
        }
        solutionsVisible = true;

        $myDom.find('.h5p-answer').each(function(i, e) {
            var $e = $(e);
            var a = params.answers[i];
            if (a.correct) {
                $e.addClass('h5p-should').append($('<span/>', {
                    'class': 'h5p-solution-icon',
                    html: params.UI.shouldCheck + '.'
                }));
            } else {
                $e.addClass('h5p-should-not').append($('<span/>', {
                    'class': 'h5p-solution-icon',
                    html: params.UI.shouldNotCheck + '.'
                }));
            }
        }).find('.h5p-question-plus-one, .h5p-question-minus-one').remove();

        // Make sure input is disabled in solution mode
        disableInput();

        // Move focus back to the first correct alternative so that the user becomes
        // aware that the solution is being shown.
        $myDom.find('.h5p-answer.h5p-should').first().focus();

        //Hide buttons and retry depending on settings.
        self.hideButton('check-answer');
        self.hideButton('show-solution');
        if (params.behaviour.enableRetry) {
            self.showButton('try-again');
        }
        self.trigger('resize');
    };

    /**
     * Used in contracts.
     * Shows the solution for the task and hides all buttons.
     */
    this.showSolutions = function() {
        removeFeedbackDialog();
        self.showCheckSolution();
        self.showAllSolutions();
        disableInput();
        self.hideButton('try-again');
    };

    /**
     * Hide solution for the given answer(s)
     *
     * @private
     * @param {H5P.jQuery} $answer
     */
    var hideSolution = function($answer) {
        $answer
            .removeClass('h5p-correct')
            .removeClass('h5p-wrong')
            .removeClass('h5p-should')
            .removeClass('h5p-should-not')
            .removeClass('h5p-has-feedback')
            .find('.h5p-question-plus-one, .h5p-question-minus-one, .h5p-answer-icon, .h5p-solution-icon, .h5p-feedback-dialog').remove();
    };

    /**
     *
     */
    this.hideSolutions = function() {
        solutionsVisible = false;

        hideSolution($('.h5p-answer', $myDom));

        this.removeFeedback(); // Reset feedback

        self.trigger('resize');
    };

    /**
     * Resets the whole task.
     * Used in contracts with integrated content.
     * @private
     */
    this.resetTask = function() {
        self.answered = false;
        self.hideSolutions();
        params.userAnswers = [];
        removeSelections();
        self.showButton('check-answer');
        self.hideButton('try-again');
        self.hideButton('show-solution');
        enableInput();
        $myDom.find('.h5p-feedback-available').remove();
    };

    var calculateMaxScore = function() {
        if (blankIsCorrect) {
            return params.weight;
        }
        var maxScore = 0;
        for (var i = 0; i < params.answers.length; i++) {
            var choice = params.answers[i];
            if (choice.correct) {
                maxScore += (choice.weight !== undefined ? choice.weight : 1);
            }
        }
        return maxScore;
    };

    this.getMaxScore = function() {
        return (!params.behaviour.singleAnswer && !params.behaviour.singlePoint ? calculateMaxScore() : params.weight);
    };

    /**
     * Check answer
     */
    var checkAnswer = function() {
        // Unbind removal of feedback dialogs on click
        $myDom.unbind('click', removeFeedbackDialog);

        // Remove all tip dialogs
        removeFeedbackDialog();

        if (params.behaviour.enableSolutionsButton) {
            self.showButton('show-solution');
        }
        if (params.behaviour.enableRetry) {
            self.showButton('try-again');
        }
        self.hideButton('check-answer');

        self.showCheckSolution();
        disableInput();

        var xAPIEvent = self.createXAPIEventTemplate('answered');
        addQuestionToXAPI(xAPIEvent);
        addResponseToXAPI(xAPIEvent);
        self.trigger(xAPIEvent);
    };

    /**
     * Determine if any of the radios or checkboxes have been checked.
     *
     * @return {boolean}
     */
    var isAnswerSelected = function() {
        return !!$('.h5p-answer[aria-checked="true"]', $myDom).length;
    };

    /**
     * Adds the ui buttons.
     * @private
     */
    var addButtons = function() {
        var $content = $('[data-content-id="' + self.contentId + '"].h5p-content');
        var $containerParents = $content.parents('.h5p-container');

        // select find container to attach dialogs to
        var $container;
        if ($containerParents.length !== 0) {
            // use parent highest up if any
            $container = $containerParents.last();
        } else if ($content.length !== 0) {
            $container = $content;
        } else {
            $container = $(document.body);
        }

        // Show solution button
        self.addButton('show-solution', params.UI.showSolutionButton, function() {

            if (params.behaviour.showSolutionsRequiresInput && !isAnswerSelected()) {
                // Require answer before solution can be viewed
                self.updateFeedbackContent(params.UI.noInput);
                self.read(params.UI.noInput);
            } else {
                calcScore();
                self.showAllSolutions();
            }

        }, false, {
            'aria-label': params.UI.a11yShowSolution,
        });

        // Check solution button
        if (params.behaviour.enableCheckButton && (!params.behaviour.autoCheck || !params.behaviour.singleAnswer)) {
            self.addButton('check-answer', params.UI.checkAnswerButton,
                function() {
                    self.answered = true;
                    checkAnswer();
                },
                true, {
                    'aria-label': params.UI.a11yCheck,
                }, {
                    confirmationDialog: {
                        enable: params.behaviour.confirmCheckDialog,
                        l10n: params.confirmCheck,
                        instance: self,
                        $parentElement: $container
                    }
                }
            );
        }

        // Try Again button
        self.addButton('try-again', params.UI.tryAgainButton, function() {
            self.showButton('check-answer');
            self.hideButton('try-again');
            self.hideButton('show-solution');
            self.hideSolutions();
            removeSelections();
            enableInput();
            $myDom.find('.h5p-feedback-available').remove();
            self.answered = false;
            if (params.behaviour.randomAnswers) {
                // reshuffle answers
                var oldIdMap = idMap;
                idMap = getShuffleMap();
                var answersDisplayed = $myDom.find('.h5p-answer');
                // remember tips
                var tip = [];
                for (i = 0; i < answersDisplayed.length; i++) {
                    tip[i] = $(answersDisplayed[i]).find('.h5p-multichoice-tipwrap');
                }
                // Those two loops cannot be merged or you'll screw up your tips
                for (i = 0; i < answersDisplayed.length; i++) {
                    // move tips and answers on display
                    $(answersDisplayed[i]).find('.h5p-alternative-inner').html(params.answers[i].text);
                    $(tip[i]).detach().appendTo($(answersDisplayed[idMap.indexOf(oldIdMap[i])]).find('.h5p-alternative-container'));
                }
            }
        }, false, {
            'aria-label': params.UI.a11yRetry,
        }, {
            confirmationDialog: {
                enable: params.behaviour.confirmRetryDialog,
                l10n: params.confirmRetry,
                instance: self,
                $parentElement: $container
            }
        });
    };

    /**
     * @private
     */
    var insertFeedback = function($e, feedback) {
        // Add visuals
        addFeedback($e, feedback);

        // Add button for readspeakers
        var $wrap = $('<div/>', {
            'class': 'h5p-hidden-read h5p-feedback-available',
            'aria-label': params.UI.feedbackAvailable + '.'
        });
        $('<div/>', {
            'role': 'button',
            'tabindex': 0,
            'aria-label': params.UI.readFeedback + '.',
            appendTo: $wrap,
            on: {
                keydown: function(e) {
                    if (e.which === 32) { // Space
                        self.read(feedback);
                        return false;
                    }
                }
            }
        });
        $wrap.appendTo($e);
    };

    /**
     * Determine which feedback text to display
     *
     * @param {number} score
     * @param {number} max
     * @return {string}
     */
    var getFeedbackText = function(score, max) {
        var ratio = (score / max);

        var feedback = H5P.Question.determineOverallFeedback(params.overallFeedback, ratio);

        return feedback.replace('@score', score).replace('@total', max);
    };

    /**
     * Shows feedback on the selected fields.
     * @public
     * @param {boolean} [skipFeedback] Skip showing feedback if true
     */
    this.showCheckSolution = function(skipFeedback) {
        var scorePoints;
        if (!(params.behaviour.singleAnswer || params.behaviour.singlePoint || !params.behaviour.showScorePoints)) {
            scorePoints = new H5P.Question.ScorePoints();
        }

        $myDom.find('.h5p-answer').each(function(i, e) {
            var $e = $(e);
            var a = params.answers[i];
            var chosen = ($e.attr('aria-checked') === 'true');
            if (chosen) {
                if (a.correct) {
                    // May already have been applied by instant feedback
                    if (!$e.hasClass('h5p-correct')) {
                        $e.addClass('h5p-correct').append($('<span/>', {
                            'class': 'h5p-answer-icon',
                            html: params.UI.correctAnswer + '.'
                        }));
                    }
                } else {
                    if (!$e.hasClass('h5p-wrong')) {
                        $e.addClass('h5p-wrong').append($('<span/>', {
                            'class': 'h5p-answer-icon',
                            html: params.UI.wrongAnswer + '.'
                        }));
                    }
                }

                if (scorePoints) {
                    var alternativeContainer = $e[0].querySelector('.h5p-alternative-container');

                    if (!params.behaviour.autoCheck || alternativeContainer.querySelector('.h5p-question-plus-one, .h5p-question-minus-one') === null) {
                        alternativeContainer.appendChild(scorePoints.getElement(a.correct));
                    }
                }
            }

            if (!skipFeedback) {
                if (chosen && a.tipsAndFeedback.chosenFeedback !== undefined && a.tipsAndFeedback.chosenFeedback !== '') {
                    insertFeedback($e, a.tipsAndFeedback.chosenFeedback);
                } else if (!chosen && a.tipsAndFeedback.notChosenFeedback !== undefined && a.tipsAndFeedback.notChosenFeedback !== '') {
                    insertFeedback($e, a.tipsAndFeedback.notChosenFeedback);
                }
            }
        });

        // Determine feedback
        var max = self.getMaxScore();

        // Disable task if maxscore is achieved
        var fullScore = (score === max);

        if (fullScore) {
            self.hideButton('check-answer');
            self.hideButton('try-again');
            self.hideButton('show-solution');
        }

        // Show feedback
        if (!skipFeedback) {
            this.setFeedback(getFeedbackText(score, max), score, max, params.UI.scoreBarLabel);
        }

        self.trigger('resize');
    };

    /**
     * Disables choosing new input.
     */
    var disableInput = function() {
        $('.h5p-answer', $myDom).attr({
            'aria-disabled': 'true',
            'tabindex': '-1'
        });
    };

    /**
     * Enables new input.
     */
    var enableInput = function() {
        $('.h5p-answer', $myDom).attr('aria-disabled', 'false');
    };

    var calcScore = function() {
        score = 0;
        params.userAnswers = [];
        $('.h5p-answer', $myDom).each(function(idx, el) {
            var $el = $(el);
            if ($el.attr('aria-checked') === 'true') {
                var choice = params.answers[idx];
                var weight = (choice.weight !== undefined ? choice.weight : 1);
                if (choice.correct) {
                    score += weight;
                } else {
                    score -= weight;
                }
                var num = parseInt($(el).data('id'));
                params.userAnswers.push(num);
            }
        });
        if (score < 0) {
            score = 0;
        }
        if (!params.userAnswers.length && blankIsCorrect) {
            score = params.weight;
        }
        if (params.behaviour.singlePoint) {
            score = (100 * score / calculateMaxScore()) >= params.behaviour.passPercentage ? params.weight : 0;
        }
    };

    /**
     * Removes selections from task.
     */
    var removeSelections = function() {
        var $answers = $('.h5p-answer', $myDom)
            .removeClass('h5p-selected')
            .attr('aria-checked', 'false');

        if (!params.behaviour.singleAnswer) {
            $answers.attr('tabindex', '0');
        } else {
            $answers.first().attr('tabindex', '0');
        }

        // Set focus to first option
        $answers.first().focus();

        calcScore();
    };

    /**
     * Get xAPI data.
     * Contract used by report rendering engine.
     *
     * @see contract at {@link https://h5p.org/documentation/developers/contracts#guides-header-6}
     */
    this.getXAPIData = function() {
        var xAPIEvent = this.createXAPIEventTemplate('answered');
        addQuestionToXAPI(xAPIEvent);
        addResponseToXAPI(xAPIEvent);
        return {
            statement: xAPIEvent.data.statement
        };
    };

    /**
     * Add the question itself to the definition part of an xAPIEvent
     */
    var addQuestionToXAPI = function(xAPIEvent) {
        var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
        definition.description = {
            // Remove tags, must wrap in div tag because jQuery 1.9 will crash if the string isn't wrapped in a tag.
            'en-US': $('<div>' + params.question + '</div>').text()
        };
        definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
        definition.interactionType = 'choice';
        definition.correctResponsesPattern = [];
        definition.choices = [];
        for (var i = 0; i < params.answers.length; i++) {
            definition.choices[i] = {
                'id': params.answers[i].originalOrder + '',
                'description': {
                    // Remove tags, must wrap in div tag because jQuery 1.9 will crash if the string isn't wrapped in a tag.
                    'en-US': $('<div>' + params.answers[i].text + '</div>').text()
                }
            };
            if (params.answers[i].correct) {
                if (!params.singleAnswer) {
                    if (definition.correctResponsesPattern.length) {
                        definition.correctResponsesPattern[0] += '[,]';
                        // This looks insane, but it's how you separate multiple answers
                        // that must all be chosen to achieve perfect score...
                    } else {
                        definition.correctResponsesPattern.push('');
                    }
                    definition.correctResponsesPattern[0] += params.answers[i].originalOrder;
                } else {
                    definition.correctResponsesPattern.push('' + params.answers[i].originalOrder);
                }
            }
        }
    };

    /**
     * Add the response part to an xAPI event
     *
     * @param {H5P.XAPIEvent} xAPIEvent
     *  The xAPI event we will add a response to
     */
    var addResponseToXAPI = function(xAPIEvent) {
        var maxScore = self.getMaxScore();
        var success = (100 * score / maxScore) >= params.behaviour.passPercentage;

        xAPIEvent.setScoredResult(score, maxScore, self, true, success);
        if (params.userAnswers === undefined) {
            calcScore();
        }

        // Add the response
        var response = '';
        for (var i = 0; i < params.userAnswers.length; i++) {
            if (response !== '') {
                response += '[,]';
            }
            response += idMap === undefined ? params.userAnswers[i] : idMap[params.userAnswers[i]];
        }
        xAPIEvent.data.statement.result.response = response;
    };

    /**
     * Create a map pointing from original answers to shuffled answers
     *
     * @return {number[]} map pointing from original answers to shuffled answers
     */
    var getShuffleMap = function() {
        params.answers = H5P.shuffleArray(params.answers);

        // Create a map from the new id to the old one
        var idMap = [];
        for (i = 0; i < params.answers.length; i++) {
            idMap[i] = params.answers[i].originalOrder;
        }
        return idMap;
    };

    // Initialization code
    // Randomize order, if requested
    var idMap;
    // Store original order in answers
    for (i = 0; i < params.answers.length; i++) {
        params.answers[i].originalOrder = i;
    }
    if (params.behaviour.randomAnswers) {
        idMap = getShuffleMap();
    }

    // Start with an empty set of user answers.
    params.userAnswers = [];

    // Restore previous state
    if (contentData && contentData.previousState !== undefined) {

        // Restore answers
        if (contentData.previousState.answers) {
            if (!idMap) {
                params.userAnswers = contentData.previousState.answers;
            } else {
                // The answers have been shuffled, and we must use the id mapping.
                for (i = 0; i < contentData.previousState.answers.length; i++) {
                    for (var k = 0; k < idMap.length; k++) {
                        if (idMap[k] === contentData.previousState.answers[i]) {
                            params.userAnswers.push(k);
                        }
                    }
                }
            }
        }
    }

    var hasCheckedAnswer = false;

    // Loop through choices
    for (var j = 0; j < params.answers.length; j++) {
        var ans = params.answers[j];

        if (!params.behaviour.singleAnswer) {
            // Set role
            ans.role = 'checkbox';
            ans.tabindex = '0';
            if (params.userAnswers.indexOf(j) !== -1) {
                ans.checked = 'true';
                hasCheckedAnswer = true;
            }
        } else {
            // Set role
            ans.role = 'radio';

            // Determine tabindex, checked and extra classes
            if (params.userAnswers.length === 0) {
                // No correct answers
                if (i === 0 || i === params.answers.length) {
                    ans.tabindex = '0';
                }
            } else if (params.userAnswers.indexOf(j) !== -1) {
                // This is the correct choice
                ans.tabindex = '0';
                ans.checked = 'true';
                hasCheckedAnswer = true;
            }
        }

        // Set default
        if (ans.tabindex === undefined) {
            ans.tabindex = '-1';
        }
        if (ans.checked === undefined) {
            ans.checked = 'false';
        }
    }

    H5P.MultiChoice.counter = (H5P.MultiChoice.counter === undefined ? 0 : H5P.MultiChoice.counter + 1);
    params.role = (params.behaviour.singleAnswer ? 'radiogroup' : 'group');
    params.label = 'h5p-mcq' + H5P.MultiChoice.counter;

    /**
     * Pack the current state of the interactivity into a object that can be
     * serialized.
     *
     * @public
     */
    this.getCurrentState = function() {
        var state = {};
        if (!idMap) {
            state.answers = params.userAnswers;
        } else {
            // The answers have been shuffled and must be mapped back to their
            // original ID.
            state.answers = [];
            for (var i = 0; i < params.userAnswers.length; i++) {
                state.answers.push(idMap[params.userAnswers[i]]);
            }
        }
        return state;
    };

    /**
     * Check if user has given an answer.
     *
     * @param {boolean} [ignoreCheck] Ignore returning true from pressing "check-answer" button.
     * @return {boolean} True if answer is given
     */
    this.getAnswerGiven = function(ignoreCheck) {
        var answered = ignoreCheck ? false : this.answered;
        return answered || params.userAnswers.length > 0 || blankIsCorrect;
    };

    this.getScore = function() {
        return score;
    };

    this.getTitle = function() {
        return H5P.createTitle((this.contentData && this.contentData.metadata && this.contentData.metadata.title) ? this.contentData.metadata.title : 'Multiple Choice');
    };
};

H5P.MultiChoice.prototype = Object.create(H5P.Question.prototype);
H5P.MultiChoice.prototype.constructor = H5P.MultiChoice;
H5P.TrueFalse.Answer = (function($, EventDispatcher) {
    'use strict';

    var Keys = {
        ENTER: 13,
        SPACE: 32,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40
    };

    /**
     * Initialize module.
     *
     * @class H5P.TrueFalse.Answer
     * @extends H5P.EventDispatcher
     * @param {String} text Label
     * @param {String} correctMessage Message read by readspeaker when correct alternative is chosen
     * @param {String} wrongMessage Message read by readspeaker when wrong alternative is chosen
     */
    function Answer(text, correctMessage, wrongMessage) {
        var self = this;

        EventDispatcher.call(self);

        var checked = false;
        var enabled = true;

        var $answer = $('<div>', {
            'class': 'h5p-true-false-answer',
            role: 'radio',
            'aria-checked': false,
            html: text + '<span class="aria-label"></span>',
            tabindex: 0, // Tabable by default
            click: function(event) {
                // Handle left mouse (or tap on touch devices)
                if (event.which === 1) {
                    self.check();
                }
            },
            keydown: function(event) {
                if (!enabled) {
                    return;
                }
                if ([Keys.SPACE, Keys.ENTER].indexOf(event.keyCode) !== -1) {
                    self.check();
                } else if ([Keys.LEFT_ARROW, Keys.UP_ARROW, Keys.RIGHT_ARROW, Keys.DOWN_ARROW].indexOf(event.keyCode) !== -1) {
                    self.uncheck();
                    self.trigger('invert');
                }
            },
            focus: function() {
                self.trigger('focus');
            },
            blur: function() {
                self.trigger('blur');
            }
        });

        var $ariaLabel = $answer.find('.aria-label');

        // A bug in Chrome 54 makes the :after icons (V and X) not beeing rendered.
        // Doing this in a timeout solves this
        // Might be removed when Chrome 56 is out
        var chromeBugFixer = function(callback) {
            setTimeout(function() {
                callback();
            }, 0);
        };

        /**
         * Return the dom element representing the alternative
         *
         * @public
         * @method getDomElement
         * @return {H5P.jQuery}
         */
        self.getDomElement = function() {
            return $answer;
        };

        /**
         * Unchecks the alternative
         *
         * @public
         * @method uncheck
         * @return {H5P.TrueFalse.Answer}
         */
        self.uncheck = function() {
            if (enabled) {
                $answer.blur();
                checked = false;
                chromeBugFixer(function() {
                    $answer.attr('aria-checked', checked);
                });
            }
            return self;
        };

        /**
         * Set tabable or not
         * @method tabable
         * @param  {Boolean} enabled
         * @return {H5P.TrueFalse.Answer}
         */
        self.tabable = function(enabled) {
            $answer.attr('tabIndex', enabled ? 0 : null);
            return self;
        };

        /**
         * Checks the alternative
         *
         * @method check
         * @return {H5P.TrueFalse.Answer}
         */
        self.check = function() {
            if (enabled) {
                checked = true;
                chromeBugFixer(function() {
                    $answer.attr('aria-checked', checked);
                });
                self.trigger('checked');
                $answer.focus();
            }
            return self;
        };

        /**
         * Is this alternative checked?
         *
         * @method isChecked
         * @return {boolean}
         */
        self.isChecked = function() {
            return checked;
        };

        /**
         * Enable alternative
         *
         * @method enable
         * @return {H5P.TrueFalse.Answer}
         */
        self.enable = function() {
            $answer.attr({
                'aria-disabled': '',
                tabIndex: 0
            });
            enabled = true;

            return self;
        };

        /**
         * Disables alternative
         *
         * @method disable
         * @return {H5P.TrueFalse.Answer}
         */
        self.disable = function() {
            $answer.attr({
                'aria-disabled': true,
                tabIndex: null
            });
            enabled = false;

            return self;
        };

        /**
         * Reset alternative
         *
         * @method reset
         * @return {H5P.TrueFalse.Answer}
         */
        self.reset = function() {
            self.enable();
            self.uncheck();
            self.unmark();
            $ariaLabel.html('');

            return self;
        };

        /**
         * Marks this alternative as the wrong one
         *
         * @method markWrong
         * @return {H5P.TrueFalse.Answer}
         */
        self.markWrong = function() {
            chromeBugFixer(function() {
                $answer.addClass('wrong');
            });
            $ariaLabel.html('.' + wrongMessage);

            return self;
        };

        /**
         * Marks this alternative as the wrong one
         *
         * @method markCorrect
         * @return {H5P.TrueFalse.Answer}
         */
        self.markCorrect = function() {
            chromeBugFixer(function() {
                $answer.addClass('correct');
            });
            $ariaLabel.html('.' + correctMessage);

            return self;
        };

        self.unmark = function() {
            chromeBugFixer(function() {
                $answer.removeClass('wrong correct');
            });

            return self;
        };
    }

    // Inheritance
    Answer.prototype = Object.create(EventDispatcher.prototype);
    Answer.prototype.constructor = Answer;

    return Answer;

})(H5P.jQuery, H5P.EventDispatcher);
/*
 * flowplayer.js 3.2.12. The Flowplayer API
 *
 * Copyright 2009-2011 Flowplayer Oy
 *
 * This file is part of Flowplayer.
 *
 * Flowplayer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Flowplayer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Flowplayer.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Date: ${date}
 * Revision: ${revision}
 */
! function() {
    function h(p) {
        console.log("$f.fireEvent", [].slice.call(p))
    }

    function l(r) {
        if (!r || typeof r != "object") {
            return r
        }
        var p = new r.constructor();
        for (var q in r) {
            if (r.hasOwnProperty(q)) {
                p[q] = l(r[q])
            }
        }
        return p
    }

    function n(u, r) {
        if (!u) {
            return
        }
        var p, q = 0,
            s = u.length;
        if (s === undefined) {
            for (p in u) {
                if (r.call(u[p], p, u[p]) === false) {
                    break
                }
            }
        } else {
            for (var t = u[0]; q < s && r.call(t, q, t) !== false; t = u[++q]) {}
        }
        return u
    }

    function c(p) {
        return document.getElementById(p)
    }

    function j(r, q, p) {
        if (typeof q != "object") {
            return r
        }
        if (r && q) {
            n(q, function(s, t) {
                if (!p || typeof t != "function") {
                    r[s] = t
                }
            })
        }
        return r
    }

    function o(t) {
        var r = t.indexOf(".");
        if (r != -1) {
            var q = t.slice(0, r) || "*";
            var p = t.slice(r + 1, t.length);
            var s = [];
            n(document.getElementsByTagName(q), function() {
                if (this.className && this.className.indexOf(p) != -1) {
                    s.push(this)
                }
            });
            return s
        }
    }

    function g(p) {
        p = p || window.event;
        if (p.preventDefault) {
            p.stopPropagation();
            p.preventDefault()
        } else {
            p.returnValue = false;
            p.cancelBubble = true
        }
        return false
    }

    function k(r, p, q) {
        r[p] = r[p] || [];
        r[p].push(q)
    }

    function e(p) {
        return p.replace(/&amp;/g, "%26").replace(/&/g, "%26").replace(/=/g, "%3D")
    }

    function f() {
        return "_" + ("" + Math.random()).slice(2, 10)
    }
    var i = function(u, s, t) {
        var r = this,
            q = {},
            v = {};
        r.index = s;
        if (typeof u == "string") {
            u = {
                url: u
            }
        }
        j(this, u, true);
        n(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","), function() {
            var w = "on" + this;
            if (w.indexOf("*") != -1) {
                w = w.slice(0, w.length - 1);
                var x = "onBefore" + w.slice(2);
                r[x] = function(y) {
                    k(v, x, y);
                    return r
                }
            }
            r[w] = function(y) {
                k(v, w, y);
                return r
            };
            if (s == -1) {
                if (r[x]) {
                    t[x] = r[x]
                }
                if (r[w]) {
                    t[w] = r[w]
                }
            }
        });
        j(this, {
            onCuepoint: function(y, x) {
                if (arguments.length == 1) {
                    q.embedded = [null, y];
                    return r
                }
                if (typeof y == "number") {
                    y = [y]
                }
                var w = f();
                q[w] = [y, x];
                if (t.isLoaded()) {
                    t._api().fp_addCuepoints(y, s, w)
                }
                return r
            },
            update: function(x) {
                j(r, x);
                if (t.isLoaded()) {
                    t._api().fp_updateClip(x, s)
                }
                var w = t.getConfig();
                var y = (s == -1) ? w.clip : w.playlist[s];
                j(y, x, true)
            },
            _fireEvent: function(w, z, x, B) {
                if (w == "onLoad") {
                    n(q, function(C, D) {
                        if (D[0]) {
                            t._api().fp_addCuepoints(D[0], s, C)
                        }
                    });
                    return false
                }
                B = B || r;
                if (w == "onCuepoint") {
                    var A = q[z];
                    if (A) {
                        return A[1].call(t, B, x)
                    }
                }
                if (z && "onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(w) != -1) {
                    j(B, z);
                    if (z.metaData) {
                        if (!B.duration) {
                            B.duration = z.metaData.duration
                        } else {
                            B.fullDuration = z.metaData.duration
                        }
                    }
                }
                var y = true;
                n(v[w], function() {
                    y = this.call(t, B, z, x)
                });
                return y
            }
        });
        if (u.onCuepoint) {
            var p = u.onCuepoint;
            r.onCuepoint.apply(r, typeof p == "function" ? [p] : p);
            delete u.onCuepoint
        }
        n(u, function(w, x) {
            if (typeof x == "function") {
                k(v, w, x);
                delete u[w]
            }
        });
        if (s == -1) {
            t.onCuepoint = this.onCuepoint
        }
    };
    var m = function(q, s, r, u) {
        var p = this,
            t = {},
            v = false;
        if (u) {
            j(t, u)
        }
        n(s, function(w, x) {
            if (typeof x == "function") {
                t[w] = x;
                delete s[w]
            }
        });
        j(this, {
            animate: function(z, A, y) {
                if (!z) {
                    return p
                }
                if (typeof A == "function") {
                    y = A;
                    A = 500
                }
                if (typeof z == "string") {
                    var x = z;
                    z = {};
                    z[x] = A;
                    A = 500
                }
                if (y) {
                    var w = f();
                    t[w] = y
                }
                if (A === undefined) {
                    A = 500
                }
                s = r._api().fp_animate(q, z, A, w);
                return p
            },
            css: function(x, y) {
                if (y !== undefined) {
                    var w = {};
                    w[x] = y;
                    x = w
                }
                s = r._api().fp_css(q, x);
                j(p, s);
                return p
            },
            show: function() {
                this.display = "block";
                r._api().fp_showPlugin(q);
                return p
            },
            hide: function() {
                this.display = "none";
                r._api().fp_hidePlugin(q);
                return p
            },
            toggle: function() {
                this.display = r._api().fp_togglePlugin(q);
                return p
            },
            fadeTo: function(z, y, x) {
                if (typeof y == "function") {
                    x = y;
                    y = 500
                }
                if (x) {
                    var w = f();
                    t[w] = x
                }
                this.display = r._api().fp_fadeTo(q, z, y, w);
                this.opacity = z;
                return p
            },
            fadeIn: function(x, w) {
                return p.fadeTo(1, x, w)
            },
            fadeOut: function(x, w) {
                return p.fadeTo(0, x, w)
            },
            getName: function() {
                return q
            },
            getPlayer: function() {
                return r
            },
            _fireEvent: function(x, w, y) {
                if (x == "onUpdate") {
                    var A = r._api().fp_getPlugin(q);
                    if (!A) {
                        return
                    }
                    j(p, A);
                    delete p.methods;
                    if (!v) {
                        n(A.methods, function() {
                            var C = "" + this;
                            p[C] = function() {
                                var D = [].slice.call(arguments);
                                var E = r._api().fp_invoke(q, C, D);
                                return E === "undefined" || E === undefined ? p : E
                            }
                        });
                        v = true
                    }
                }
                var B = t[x];
                if (B) {
                    var z = B.apply(p, w);
                    if (x.slice(0, 1) == "_") {
                        delete t[x]
                    }
                    return z
                }
                return p
            }
        })
    };

    function b(r, H, u) {
        var x = this,
            w = null,
            E = false,
            v, t, G = [],
            z = {},
            y = {},
            F, s, q, D, p, B;
        j(x, {
            id: function() {
                return F
            },
            isLoaded: function() {
                return (w !== null && w.fp_play !== undefined && !E)
            },
            getParent: function() {
                return r
            },
            hide: function(I) {
                if (I) {
                    r.style.height = "0px"
                }
                if (x.isLoaded()) {
                    w.style.height = "0px"
                }
                return x
            },
            show: function() {
                r.style.height = B + "px";
                if (x.isLoaded()) {
                    w.style.height = p + "px"
                }
                return x
            },
            isHidden: function() {
                return x.isLoaded() && parseInt(w.style.height, 10) === 0
            },
            load: function(K) {
                if (!x.isLoaded() && x._fireEvent("onBeforeLoad") !== false) {
                    var I = function() {
                        if (v && !flashembed.isSupported(H.version)) {
                            r.innerHTML = ""
                        }
                        if (K) {
                            K.cached = true;
                            k(y, "onLoad", K)
                        }
                        flashembed(r, H, {
                            config: u
                        })
                    };
                    var J = 0;
                    n(a, function() {
                        this.unload(function(L) {
                            if (++J == a.length) {
                                I()
                            }
                        })
                    })
                }
                return x
            },
            unload: function(K) {
                if (v.replace(/\s/g, "") !== "") {
                    if (x._fireEvent("onBeforeUnload") === false) {
                        if (K) {
                            K(false)
                        }
                        return x
                    }
                    E = true;
                    try {
                        if (w) {
                            if (w.fp_isFullscreen()) {
                                w.fp_toggleFullscreen()
                            }
                            w.fp_close();
                            x._fireEvent("onUnload")
                        }
                    } catch (I) {}
                    var J = function() {
                        w = null;
                        r.innerHTML = v;
                        E = false;
                        if (K) {
                            K(true)
                        }
                    };
                    if (/WebKit/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent)) {
                        setTimeout(J, 0)
                    } else {
                        J()
                    }
                } else {
                    if (K) {
                        K(false)
                    }
                }
                return x
            },
            getClip: function(I) {
                if (I === undefined) {
                    I = D
                }
                return G[I]
            },
            getCommonClip: function() {
                return t
            },
            getPlaylist: function() {
                return G
            },
            getPlugin: function(I) {
                var K = z[I];
                if (!K && x.isLoaded()) {
                    var J = x._api().fp_getPlugin(I);
                    if (J) {
                        K = new m(I, J, x);
                        z[I] = K
                    }
                }
                return K
            },
            getScreen: function() {
                return x.getPlugin("screen")
            },
            getControls: function() {
                return x.getPlugin("controls")._fireEvent("onUpdate")
            },
            getLogo: function() {
                try {
                    return x.getPlugin("logo")._fireEvent("onUpdate")
                } catch (I) {}
            },
            getPlay: function() {
                return x.getPlugin("play")._fireEvent("onUpdate")
            },
            getConfig: function(I) {
                return I ? l(u) : u
            },
            getFlashParams: function() {
                return H
            },
            loadPlugin: function(L, K, N, M) {
                if (typeof N == "function") {
                    M = N;
                    N = {}
                }
                var J = M ? f() : "_";
                x._api().fp_loadPlugin(L, K, N, J);
                var I = {};
                I[J] = M;
                var O = new m(L, null, x, I);
                z[L] = O;
                return O
            },
            getState: function() {
                return x.isLoaded() ? w.fp_getState() : -1
            },
            play: function(J, I) {
                var K = function() {
                    if (J !== undefined) {
                        x._api().fp_play(J, I)
                    } else {
                        x._api().fp_play()
                    }
                };
                if (x.isLoaded()) {
                    K()
                } else {
                    if (E) {
                        setTimeout(function() {
                            x.play(J, I)
                        }, 50)
                    } else {
                        x.load(function() {
                            K()
                        })
                    }
                }
                return x
            },
            getVersion: function() {
                var J = "flowplayer.js 3.2.12";
                if (x.isLoaded()) {
                    var I = w.fp_getVersion();
                    I.push(J);
                    return I
                }
                return J
            },
            _api: function() {
                if (!x.isLoaded()) {
                    throw "Flowplayer " + x.id() + " not loaded when calling an API method"
                }
                return w
            },
            setClip: function(I) {
                n(I, function(J, K) {
                    if (typeof K == "function") {
                        k(y, J, K);
                        delete I[J]
                    } else {
                        if (J == "onCuepoint") {
                            $f(r).getCommonClip().onCuepoint(I[J][0], I[J][1])
                        }
                    }
                });
                x.setPlaylist([I]);
                return x
            },
            getIndex: function() {
                return q
            },
            bufferAnimate: function(I) {
                w.fp_bufferAnimate(I === undefined || I);
                return x
            },
            _swfHeight: function() {
                return w.clientHeight
            }
        });
        n(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut").split(","), function() {
            var I = "on" + this;
            if (I.indexOf("*") != -1) {
                I = I.slice(0, I.length - 1);
                var J = "onBefore" + I.slice(2);
                x[J] = function(K) {
                    k(y, J, K);
                    return x
                }
            }
            x[I] = function(K) {
                k(y, I, K);
                return x
            }
        });
        n(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled").split(","), function() {
            var I = this;
            x[I] = function(K, J) {
                if (!x.isLoaded()) {
                    return x
                }
                var L = null;
                if (K !== undefined && J !== undefined) {
                    L = w["fp_" + I](K, J)
                } else {
                    L = (K === undefined) ? w["fp_" + I]() : w["fp_" + I](K)
                }
                return L === "undefined" || L === undefined ? x : L
            }
        });
        x._fireEvent = function(R) {
            if (typeof R == "string") {
                R = [R]
            }
            var S = R[0],
                P = R[1],
                N = R[2],
                M = R[3],
                L = 0;
            if (u.debug) {
                h(R)
            }
            if (!x.isLoaded() && S == "onLoad" && P == "player") {
                w = w || c(s);
                p = x._swfHeight();
                n(G, function() {
                    this._fireEvent("onLoad")
                });
                n(z, function(T, U) {
                    U._fireEvent("onUpdate")
                });
                t._fireEvent("onLoad")
            }
            if (S == "onLoad" && P != "player") {
                return
            }
            if (S == "onError") {
                if (typeof P == "string" || (typeof P == "number" && typeof N == "number")) {
                    P = N;
                    N = M
                }
            }
            if (S == "onContextMenu") {
                n(u.contextMenu[P], function(T, U) {
                    U.call(x)
                });
                return
            }
            if (S == "onPluginEvent" || S == "onBeforePluginEvent") {
                var I = P.name || P;
                var J = z[I];
                if (J) {
                    J._fireEvent("onUpdate", P);
                    return J._fireEvent(N, R.slice(3))
                }
                return
            }
            if (S == "onPlaylistReplace") {
                G = [];
                var O = 0;
                n(P, function() {
                    G.push(new i(this, O++, x))
                })
            }
            if (S == "onClipAdd") {
                if (P.isInStream) {
                    return
                }
                P = new i(P, N, x);
                G.splice(N, 0, P);
                for (L = N + 1; L < G.length; L++) {
                    G[L].index++
                }
            }
            var Q = true;
            if (typeof P == "number" && P < G.length) {
                D = P;
                var K = G[P];
                if (K) {
                    Q = K._fireEvent(S, N, M)
                }
                if (!K || Q !== false) {
                    Q = t._fireEvent(S, N, M, K)
                }
            }
            n(y[S], function() {
                Q = this.call(x, P, N);
                if (this.cached) {
                    y[S].splice(L, 1)
                }
                if (Q === false) {
                    return false
                }
                L++
            });
            return Q
        };

        function C() {
            if ($f(r)) {
                $f(r).getParent().innerHTML = "";
                q = $f(r).getIndex();
                a[q] = x
            } else {
                a.push(x);
                q = a.length - 1
            }
            B = parseInt(r.style.height, 10) || r.clientHeight;
            F = r.id || "fp" + f();
            s = H.id || F + "_api";
            H.id = s;
            v = r.innerHTML;
            if (typeof u == "string") {
                u = {
                    clip: {
                        url: u
                    }
                }
            }
            u.playerId = F;
            u.clip = u.clip || {};
            if (r.getAttribute("href", 2) && !u.clip.url) {
                u.clip.url = r.getAttribute("href", 2)
            }
            if (u.clip.url) {
                u.clip.url = e(u.clip.url)
            }
            t = new i(u.clip, -1, x);
            u.playlist = u.playlist || [u.clip];
            var J = 0;
            n(u.playlist, function() {
                var M = this;
                if (typeof M == "object" && M.length) {
                    M = {
                        url: "" + M
                    }
                }
                if (M.url) {
                    M.url = e(M.url)
                }
                n(u.clip, function(N, O) {
                    if (O !== undefined && M[N] === undefined && typeof O != "function") {
                        M[N] = O
                    }
                });
                u.playlist[J] = M;
                M = new i(M, J, x);
                G.push(M);
                J++
            });
            n(u, function(M, N) {
                if (typeof N == "function") {
                    if (t[M]) {
                        t[M](N)
                    } else {
                        k(y, M, N)
                    }
                    delete u[M]
                }
            });
            n(u.plugins, function(M, N) {
                if (N) {
                    z[M] = new m(M, N, x)
                }
            });
            if (!u.plugins || u.plugins.controls === undefined) {
                z.controls = new m("controls", null, x)
            }
            z.canvas = new m("canvas", null, x);
            v = r.innerHTML;

            function L(M) {
                if (/iPad|iPhone|iPod/i.test(navigator.userAgent) && !/.flv$/i.test(G[0].url) && !K()) {
                    return true
                }
                if (!x.isLoaded() && x._fireEvent("onBeforeClick") !== false) {
                    x.load()
                }
                return g(M)
            }

            function K() {
                return x.hasiPadSupport && x.hasiPadSupport()
            }

            function I() {
                if (v.replace(/\s/g, "") !== "") {
                    if (r.addEventListener) {
                        r.addEventListener("click", L, false)
                    } else {
                        if (r.attachEvent) {
                            r.attachEvent("onclick", L)
                        }
                    }
                } else {
                    if (r.addEventListener && !K()) {
                        r.addEventListener("click", g, false)
                    }
                    x.load()
                }
            }
            setTimeout(I, 0)
        }
        if (typeof r == "string") {
            var A = c(r);
            if (!A) {
                throw "Flowplayer cannot access element: " + r
            }
            r = A;
            C()
        } else {
            C()
        }
    }
    var a = [];

    function d(p) {
        this.length = p.length;
        this.each = function(r) {
            n(p, r)
        };
        this.size = function() {
            return p.length
        };
        var q = this;
        for (name in b.prototype) {
            q[name] = function() {
                var r = arguments;
                q.each(function() {
                    this[name].apply(this, r)
                })
            }
        }
    }
    window.flowplayer = window.$f = function() {
        var q = null;
        var p = arguments[0];
        if (!arguments.length) {
            n(a, function() {
                if (this.isLoaded()) {
                    q = this;
                    return false
                }
            });
            return q || a[0]
        }
        if (arguments.length == 1) {
            if (typeof p == "number") {
                return a[p]
            } else {
                if (p == "*") {
                    return new d(a)
                }
                n(a, function() {
                    if (this.id() == p.id || this.id() == p || this.getParent() == p) {
                        q = this;
                        return false
                    }
                });
                return q
            }
        }
        if (arguments.length > 1) {
            var u = arguments[1],
                r = (arguments.length == 3) ? arguments[2] : {};
            if (typeof u == "string") {
                u = {
                    src: u
                }
            }
            u = j({
                bgcolor: "#000000",
                version: [10, 1],
                expressInstall: "http://releases.flowplayer.org/swf/expressinstall.swf",
                cachebusting: false
            }, u);
            if (typeof p == "string") {
                if (p.indexOf(".") != -1) {
                    var t = [];
                    n(o(p), function() {
                        t.push(new b(this, l(u), l(r)))
                    });
                    return new d(t)
                } else {
                    var s = c(p);
                    return new b(s !== null ? s : l(p), l(u), l(r))
                }
            } else {
                if (p) {
                    return new b(p, l(u), l(r))
                }
            }
        }
        return null
    };
    j(window.$f, {
        fireEvent: function() {
            var q = [].slice.call(arguments);
            var r = $f(q[0]);
            return r ? r._fireEvent(q.slice(1)) : null
        },
        addPlugin: function(p, q) {
            b.prototype[p] = q;
            return $f
        },
        each: n,
        extend: j
    });
    if (typeof jQuery == "function") {
        jQuery.fn.flowplayer = function(r, q) {
            if (!arguments.length || typeof arguments[0] == "number") {
                var p = [];
                this.each(function() {
                    var s = $f(this);
                    if (s) {
                        p.push(s)
                    }
                });
                return arguments.length ? p[arguments[0]] : new d(p)
            }
            return this.each(function() {
                $f(this, l(r), q ? l(q) : {})
            })
        }
    }
}();
! function() {
    var h = document.all,
        j = "http://get.adobe.com/flashplayer",
        c = typeof jQuery == "function",
        e = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/,
        b = {
            width: "100%",
            height: "100%",
            id: "_" + ("" + Math.random()).slice(9),
            allowfullscreen: true,
            allowscriptaccess: "always",
            quality: "high",
            version: [3, 0],
            onFail: null,
            expressInstall: null,
            w3c: false,
            cachebusting: false
        };
    if (window.attachEvent) {
        window.attachEvent("onbeforeunload", function() {
            __flash_unloadHandler = function() {};
            __flash_savedUnloadHandler = function() {}
        })
    }

    function i(m, l) {
        if (l) {
            for (var f in l) {
                if (l.hasOwnProperty(f)) {
                    m[f] = l[f]
                }
            }
        }
        return m
    }

    function a(f, n) {
        var m = [];
        for (var l in f) {
            if (f.hasOwnProperty(l)) {
                m[l] = n(f[l])
            }
        }
        return m
    }
    window.flashembed = function(f, m, l) {
        if (typeof f == "string") {
            f = document.getElementById(f.replace("#", ""))
        }
        if (!f) {
            return
        }
        if (typeof m == "string") {
            m = {
                src: m
            }
        }
        return new d(f, i(i({}, b), m), l)
    };
    var g = i(window.flashembed, {
        conf: b,
        getVersion: function() {
            var m, f;
            try {
                f = navigator.plugins["Shockwave Flash"].description.slice(16)
            } catch (o) {
                try {
                    m = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                    f = m && m.GetVariable("$version")
                } catch (n) {
                    try {
                        m = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                        f = m && m.GetVariable("$version")
                    } catch (l) {}
                }
            }
            f = e.exec(f);
            return f ? [1 * f[1], 1 * f[(f[1] * 1 > 9 ? 2 : 3)] * 1] : [0, 0]
        },
        asString: function(l) {
            if (l === null || l === undefined) {
                return null
            }
            var f = typeof l;
            if (f == "object" && l.push) {
                f = "array"
            }
            switch (f) {
                case "string":
                    l = l.replace(new RegExp('(["\\\\])', "g"), "\\$1");
                    l = l.replace(/^\s?(\d+\.?\d*)%/, "$1pct");
                    return '"' + l + '"';
                case "array":
                    return "[" + a(l, function(o) {
                        return g.asString(o)
                    }).join(",") + "]";
                case "function":
                    return '"function()"';
                case "object":
                    var m = [];
                    for (var n in l) {
                        if (l.hasOwnProperty(n)) {
                            m.push('"' + n + '":' + g.asString(l[n]))
                        }
                    }
                    return "{" + m.join(",") + "}"
            }
            return String(l).replace(/\s/g, " ").replace(/\'/g, '"')
        },
        getHTML: function(o, l) {
            o = i({}, o);
            var n = '<object width="' + o.width + '" height="' + o.height + '" id="' + o.id + '" name="' + o.id + '"';
            if (o.cachebusting) {
                o.src += ((o.src.indexOf("?") != -1 ? "&" : "?") + Math.random())
            }
            if (o.w3c || !h) {
                n += ' data="' + o.src + '" type="application/x-shockwave-flash"'
            } else {
                n += ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
            }
            n += ">";
            if (o.w3c || h) {
                n += '<param name="movie" value="' + o.src + '" />'
            }
            o.width = o.height = o.id = o.w3c = o.src = null;
            o.onFail = o.version = o.expressInstall = null;
            for (var m in o) {
                if (o[m]) {
                    n += '<param name="' + m + '" value="' + o[m] + '" />'
                }
            }
            var p = "";
            if (l) {
                for (var f in l) {
                    if (l[f]) {
                        var q = l[f];
                        p += f + "=" + (/function|object/.test(typeof q) ? g.asString(q) : q) + "&"
                    }
                }
                p = p.slice(0, -1);
                n += '<param name="flashvars" value=\'' + p + "' />"
            }
            n += "</object>";
            return n
        },
        isSupported: function(f) {
            return k[0] > f[0] || k[0] == f[0] && k[1] >= f[1]
        }
    });
    var k = g.getVersion();

    function d(f, n, m) {
        if (g.isSupported(n.version)) {
            f.innerHTML = g.getHTML(n, m)
        } else {
            if (n.expressInstall && g.isSupported([6, 65])) {
                f.innerHTML = g.getHTML(i(n, {
                    src: n.expressInstall
                }), {
                    MMredirectURL: encodeURIComponent(location.href),
                    MMplayerType: "PlugIn",
                    MMdoctitle: document.title
                })
            } else {
                if (!f.innerHTML.replace(/\s/g, "")) {
                    f.innerHTML = "<h2>Flash version " + n.version + " or greater is required</h2><h3>" + (k[0] > 0 ? "Your version is " + k : "You have no flash plugin installed") + "</h3>" + (f.tagName == "A" ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='" + j + "'>here</a></p>");
                    if (f.tagName == "A" || f.tagName == "DIV") {
                        f.onclick = function() {
                            location.href = j
                        }
                    }
                }
                if (n.onFail) {
                    var l = n.onFail.call(this);
                    if (typeof l == "string") {
                        f.innerHTML = l
                    }
                }
            }
        }
        if (h) {
            window[n.id] = document.getElementById(n.id)
        }
        i(this, {
            getRoot: function() {
                return f
            },
            getOptions: function() {
                return n
            },
            getConf: function() {
                return m
            },
            getApi: function() {
                return f.firstChild
            }
        })
    }
    if (c) {
        jQuery.tools = jQuery.tools || {
            version: "3.2.12"
        };
        jQuery.tools.flashembed = {
            conf: b
        };
        jQuery.fn.flashembed = function(l, f) {
            return this.each(function() {
                $(this).data("flashembed", flashembed(this, l, f))
            })
        }
    }
}(); /** @namespace H5P */
H5P.VideoYouTube = (function($) {

    /**
     * YouTube video player for H5P.
     *
     * @class
     * @param {Array} sources Video files to use
     * @param {Object} options Settings for the player
     * @param {Object} l10n Localization strings
     */
    function YouTube(sources, options, l10n) {
        var self = this;

        var player;
        var playbackRate = 1;
        var id = 'h5p-youtube-' + numInstances;
        numInstances++;

        var $wrapper = $('<div/>');
        var $placeholder = $('<div/>', {
            id: id,
            text: l10n.loading
        }).appendTo($wrapper);

        // Optional placeholder
        // var $placeholder = $('<iframe id="' + id + '" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/' + getId(sources[0].path) + '?enablejsapi=1&origin=' + encodeURIComponent(ORIGIN) + '&autoplay=' + (options.autoplay ? 1 : 0) + '&controls=' + (options.controls ? 1 : 0) + '&disabledkb=' + (options.controls ? 0 : 1) + '&fs=0&loop=' + (options.loop ? 1 : 0) + '&rel=0&showinfo=0&iv_load_policy=3" frameborder="0"></iframe>').appendTo($wrapper);

        /**
         * Use the YouTube API to create a new player
         *
         * @private
         */
        var create = function() {
            if (!$placeholder.is(':visible') || player !== undefined) {
                return;
            }

            if (window.YT === undefined) {
                // Load API first
                loadAPI(create);
                return;
            }
            if (YT.Player === undefined) {
                return;
            }

            var width = $wrapper.width();
            if (width < 200) {
                width = 200;
            }

            var loadCaptionsModule = true;

            var videoId = getId(sources[0].path);

            player = new YT.Player(id, {
                width: width,
                height: width * (9 / 16),
                videoId: videoId,
                playerVars: {
                    origin: ORIGIN,
                    autoplay: options.autoplay ? 1 : 0,
                    controls: options.controls ? 1 : 0,
                    disablekb: options.controls ? 0 : 1,
                    fs: 0,
                    loop: options.loop ? 1 : 0,
                    playlist: options.loop ? videoId : undefined,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    wmode: "opaque",
                    start: options.startAt,
                    playsinline: 1
                },
                events: {
                    onReady: function() {
                        self.trigger('ready');
                        self.trigger('loaded');
                    },
                    onApiChange: function() {
                        if (loadCaptionsModule) {
                            loadCaptionsModule = false;

                            // Always load captions
                            player.loadModule('captions');
                        }

                        var trackList;
                        try {
                            // Grab tracklist from player
                            trackList = player.getOption('captions', 'tracklist');
                        } catch (err) {}
                        if (trackList && trackList.length) {

                            // Format track list into valid track options
                            var trackOptions = [];
                            for (var i = 0; i < trackList.length; i++) {
                                trackOptions.push(new H5P.Video.LabelValue(trackList[i].displayName, trackList[i].languageCode));
                            }

                            // Captions are ready for loading
                            self.trigger('captions', trackOptions);
                        }
                    },
                    onStateChange: function(state) {
                        if (state.data > -1 && state.data < 4) {

                            // Fix for keeping playback rate in IE11
                            if (H5P.Video.IE11_PLAYBACK_RATE_FIX && state.data === H5P.Video.PLAYING && playbackRate !== 1) {
                                // YT doesn't know that IE11 changed the rate so it must be reset before it's set to the correct value
                                player.setPlaybackRate(1);
                                player.setPlaybackRate(playbackRate);
                            }
                            // End IE11 fix

                            self.trigger('stateChange', state.data);
                        }
                    },
                    onPlaybackQualityChange: function(quality) {
                        self.trigger('qualityChange', quality.data);
                    },
                    onPlaybackRateChange: function(playbackRate) {
                        self.trigger('playbackRateChange', playbackRate.data);
                    },
                    onError: function(error) {
                        var message;
                        switch (error.data) {
                            case 2:
                                message = l10n.invalidYtId;
                                break;

                            case 100:
                                message = l10n.unknownYtId;
                                break;

                            case 101:
                            case 150:
                                message = l10n.restrictedYt;
                                break;

                            default:
                                message = l10n.unknownError + ' ' + error.data;
                                break;
                        }
                        self.trigger('error', message);
                    }
                }
            });
        };

        /**
         * Indicates if the video must be clicked for it to start playing.
         * For instance YouTube videos on iPad must be pressed to start playing.
         *
         * @public
         */
        self.pressToPlay = navigator.userAgent.match(/iPad/i) ? true : false;

        /**
         * Appends the video player to the DOM.
         *
         * @public
         * @param {jQuery} $container
         */
        self.appendTo = function($container) {
            $container.addClass('h5p-youtube').append($wrapper);
            create();
        };

        /**
         * Get list of available qualities. Not available until after play.
         *
         * @public
         * @returns {Array}
         */
        self.getQualities = function() {
            if (!player || !player.getAvailableQualityLevels) {
                return;
            }

            var qualities = player.getAvailableQualityLevels();
            if (!qualities.length) {
                return; // No qualities
            }

            // Add labels
            for (var i = 0; i < qualities.length; i++) {
                var quality = qualities[i];
                var label = (LABELS[quality] !== undefined ? LABELS[quality] : 'Unknown'); // TODO: l10n
                qualities[i] = {
                    name: quality,
                    label: LABELS[quality]
                };
            }

            return qualities;
        };

        /**
         * Get current playback quality. Not available until after play.
         *
         * @public
         * @returns {String}
         */
        self.getQuality = function() {
            if (!player || !player.getPlaybackQuality) {
                return;
            }

            var quality = player.getPlaybackQuality();
            return quality === 'unknown' ? undefined : quality;
        };

        /**
         * Set current playback quality. Not available until after play.
         * Listen to event "qualityChange" to check if successful.
         *
         * @public
         * @params {String} [quality]
         */
        self.setQuality = function(quality) {
            if (!player || !player.setPlaybackQuality) {
                return;
            }

            player.setPlaybackQuality(quality);
        };

        /**
         * Start the video.
         *
         * @public
         */
        self.play = function() {
            if (!player || !player.playVideo) {
                self.on('ready', self.play);
                return;
            }

            player.playVideo();
        };

        /**
         * Pause the video.
         *
         * @public
         */
        self.pause = function() {
            self.off('ready', self.play);
            if (!player || !player.pauseVideo) {
                return;
            }
            player.pauseVideo();
        };

        /**
         * Seek video to given time.
         *
         * @public
         * @param {Number} time
         */
        self.seek = function(time) {
            if (!player || !player.seekTo) {
                return;
            }

            player.seekTo(time, true);
        };

        /**
         * Get elapsed time since video beginning.
         *
         * @public
         * @returns {Number}
         */
        self.getCurrentTime = function() {
            if (!player || !player.getCurrentTime) {
                return;
            }

            return player.getCurrentTime();
        };

        /**
         * Get total video duration time.
         *
         * @public
         * @returns {Number}
         */
        self.getDuration = function() {
            if (!player || !player.getDuration) {
                return;
            }

            return player.getDuration();
        };

        /**
         * Get percentage of video that is buffered.
         *
         * @public
         * @returns {Number} Between 0 and 100
         */
        self.getBuffered = function() {
            if (!player || !player.getVideoLoadedFraction) {
                return;
            }

            return player.getVideoLoadedFraction() * 100;
        };

        /**
         * Turn off video sound.
         *
         * @public
         */
        self.mute = function() {
            if (!player || !player.mute) {
                return;
            }

            player.mute();
        };

        /**
         * Turn on video sound.
         *
         * @public
         */
        self.unMute = function() {
            if (!player || !player.unMute) {
                return;
            }

            player.unMute();
        };

        /**
         * Check if video sound is turned on or off.
         *
         * @public
         * @returns {Boolean}
         */
        self.isMuted = function() {
            if (!player || !player.isMuted) {
                return;
            }

            return player.isMuted();
        };

        /**
         * Return the video sound level.
         *
         * @public
         * @returns {Number} Between 0 and 100.
         */
        self.getVolume = function() {
            if (!player || !player.getVolume) {
                return;
            }

            return player.getVolume();
        };

        /**
         * Set video sound level.
         *
         * @public
         * @param {Number} level Between 0 and 100.
         */
        self.setVolume = function(level) {
            if (!player || !player.setVolume) {
                return;
            }

            player.setVolume(level);
        };

        /**
         * Get list of available playback rates.
         *
         * @public
         * @returns {Array} available playback rates
         */
        self.getPlaybackRates = function() {
            if (!player || !player.getAvailablePlaybackRates) {
                return;
            }

            var playbackRates = player.getAvailablePlaybackRates();
            if (!playbackRates.length) {
                return; // No rates, but the array should contain at least 1
            }

            return playbackRates;
        };

        /**
         * Get current playback rate.
         *
         * @public
         * @returns {Number} such as 0.25, 0.5, 1, 1.25, 1.5 and 2
         */
        self.getPlaybackRate = function() {
            if (!player || !player.getPlaybackRate) {
                return;
            }

            return player.getPlaybackRate();
        };

        /**
         * Set current playback rate.
         * Listen to event "playbackRateChange" to check if successful.
         *
         * @public
         * @params {Number} suggested rate that may be rounded to supported values
         */
        self.setPlaybackRate = function(newPlaybackRate) {
            if (!player || !player.setPlaybackRate) {
                return;
            }

            playbackRate = Number(newPlaybackRate);
            player.setPlaybackRate(playbackRate);
        };

        /**
         * Set current captions track.
         *
         * @param {H5P.Video.LabelValue} Captions track to show during playback
         */
        self.setCaptionsTrack = function(track) {
            player.setOption('captions', 'track', track ? {
                languageCode: track.value
            } : {});
        };

        /**
         * Figure out which captions track is currently used.
         *
         * @return {H5P.Video.LabelValue} Captions track
         */
        self.getCaptionsTrack = function() {
            var track = player.getOption('captions', 'track');
            return (track.languageCode ? new H5P.Video.LabelValue(track.displayName, track.languageCode) : null);
        };

        // Respond to resize events by setting the YT player size.
        self.on('resize', function() {
            if (!$wrapper.is(':visible')) {
                return;
            }

            if (!player) {
                // Player isn't created yet. Try again.
                create();
                return;
            }

            // Use as much space as possible
            $wrapper.css({
                width: '100%',
                height: '100%'
            });

            var width = $wrapper[0].clientWidth;
            var height = options.fit ? $wrapper[0].clientHeight : (width * (9 / 16));

            // Set size
            $wrapper.css({
                width: width + 'px',
                height: height + 'px'
            });

            player.setSize(width, height);
        });
    }

    /**
     * Check to see if we can play any of the given sources.
     *
     * @public
     * @static
     * @param {Array} sources
     * @returns {Boolean}
     */
    YouTube.canPlay = function(sources) {
        return getId(sources[0].path);
    };

    /**
     * Find id of YouTube video from given URL.
     *
     * @private
     * @param {String} url
     * @returns {String} YouTube video identifier
     */

    var getId = function(url) {
        // Has some false positives, but should cover all regular URLs that people can find
        var matches = url.match(/(?:(?:youtube.com\/(?:attribution_link\?(?:\S+))?(?:v\/|embed\/|watch\/|(?:user\/(?:\S+)\/)?watch(?:\S+)v\=))|(?:youtu.be\/|y2u.be\/))([A-Za-z0-9_-]{11})/i);
        if (matches && matches[1]) {
            return matches[1];
        }
    };

    /**
     * Load the IFrame Player API asynchronously.
     */
    var loadAPI = function(loaded) {
        if (window.onYouTubeIframeAPIReady !== undefined) {
            // Someone else is loading, hook in
            var original = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = function(id) {
                loaded(id);
                original(id);
            };
        } else {
            // Load the API our self
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = loaded;
        }
    };

    /** @constant {Object} */
    var LABELS = {
        highres: '2160p', // Old API support
        hd2160: '2160p', // (New API)
        hd1440: '1440p',
        hd1080: '1080p',
        hd720: '720p',
        large: '480p',
        medium: '360p',
        small: '240p',
        tiny: '144p',
        auto: 'Auto'
    };

    /** @private */
    var numInstances = 0;

    // Extract the current origin (used for security)
    var ORIGIN = window.location.href.match(/http[s]?:\/\/[^\/]+/);
    ORIGIN = !ORIGIN || ORIGIN[0] === undefined ? undefined : ORIGIN[0];
    // ORIGIN = undefined is needed to support fetching file from device local storage

    return YouTube;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
H5P.videoHandlers.push(H5P.VideoYouTube);
/** @namespace H5P */
H5P.VideoFlash = (function($) {

    /**
     * Flash video player for H5P.
     *
     * @class
     * @param {Array} sources Video files to use
     * @param {Object} options Settings for the player
     */
    function Flash(sources, options) {
        var self = this;

        // Player wrapper
        var $wrapper = $('<div/>', {
            'class': 'h5p-video-flash',
            css: {
                width: '100%',
                height: '100%'
            }
        });

        /**
         * Used to display error messages
         * @private
         */
        var $error = $('<div/>', {
            'class': 'h5p-video-error'
        });

        /**
         * Keep track of current state when changing quality.
         * @private
         */
        var stateBeforeChangingQuality;
        var currentTimeBeforeChangingQuality;

        // Sort sources into qualities
        //var qualities = getQualities(sources);
        var currentQuality;

        // Create player options
        var playerOptions = {
            buffering: true,
            clip: {
                url: sources[0].path, // getPreferredQuality(),
                autoPlay: options.autoplay,
                autoBuffering: true,
                scaling: 'fit',
                onSeek: function() {
                    if (stateBeforeChangingQuality) {
                        // ????
                    }
                },
                onMetaData: function() {
                    setTimeout(function() {
                        if (stateBeforeChangingQuality !== undefined) {
                            fp.seek(currentTimeBeforeChangingQuality);
                            if (stateBeforeChangingQuality === H5P.Video.PLAYING) {
                                // Resume play
                                fp.play();
                            }

                            // Done changing quality
                            stateBeforeChangingQuality = undefined;

                            // Remove any errors
                            if ($error.is(':visible')) {
                                $error.remove();
                            }
                        } else {
                            self.trigger('ready');
                            self.trigger('loaded');
                        }
                    }, 0); // Run on next tick
                },
                onBegin: function() {
                    self.trigger('stateChange', H5P.Video.PLAYING);
                },
                onResume: function() {
                    self.trigger('stateChange', H5P.Video.PLAYING);
                },
                onPause: function() {
                    self.trigger('stateChange', H5P.Video.PAUSED);
                },
                onFinish: function() {
                    self.trigger('stateChange', H5P.Video.ENDED);
                },
                onError: function(code, message) {
                    console.log('ERROR', code, message); // TODO
                    self.trigger('error', message);
                }
            },
            plugins: {
                controls: null
            },
            play: null, // Disable overlay controls
            onPlaylistReplace: function() {
                that.playlistReplaced();
            }
        };

        if (options.controls) {
            playerOptions.plugins.controls = {};
            delete playerOptions.play;
        }

        var fp = flowplayer($wrapper[0], {
            src: "http://releases.flowplayer.org/swf/flowplayer-3.2.16.swf",
            wmode: "opaque"
        }, playerOptions);

        /**
         * Appends the video player to the DOM.
         *
         * @public
         * @param {jQuery} $container
         */
        self.appendTo = function($container) {
            $wrapper.appendTo($container);
        };

        /**
         * Get list of available qualities. Not available until after play.
         *
         * @public
         * @returns {Array}
         */
        self.getQualities = function() {
            return;
        };

        /**
         * Get current playback quality. Not available until after play.
         *
         * @public
         * @returns {String}
         */
        self.getQuality = function() {
            return currentQuality;
        };

        /**
         * Set current playback quality. Not available until after play.
         * Listen to event "qualityChange" to check if successful.
         *
         * @public
         * @params {String} [quality]
         */
        self.setQuality = function(quality) {
            if (qualities[quality] === undefined || quality === currentQuality) {
                return; // Invalid quality
            }

            // Keep track of last choice
            setPreferredQuality(quality);

            // Avoid multiple loaded events if changing quality multiple times.
            if (!stateBeforeChangingQuality) {
                // Keep track of last state
                stateBeforeChangingQuality = lastState;

                // Keep track of current time
                currentTimeBeforeChangingQuality = video.currentTime;
            }

            // Keep track of current quality
            currentQuality = quality;
            self.trigger('qualityChange', currentQuality);

            // Display throbber
            self.trigger('stateChange', H5P.Video.BUFFERING);

            // Change source
            fp.setClip(qualities[quality].source.path);
            fp.startBuffering();
        };

        /**
         * Starts the video.
         *
         * @public
         */
        self.play = function() {
            if ($error.is(':visible')) {
                return;
            }

            fp.play();
        };

        /**
         * Pauses the video.
         *
         * @public
         */
        self.pause = function() {
            fp.pause();
        };

        /**
         * Seek video to given time.
         *
         * @public
         * @param {Number} time
         */
        self.seek = function(time) {
            fp.seek(time);
        };

        /**
         * Get elapsed time since video beginning.
         *
         * @public
         * @returns {Number}
         */
        self.getCurrentTime = function() {
            return fp.getTime();
        };

        /**
         * Get total video duration time.
         *
         * @public
         * @returns {Number}
         */
        self.getDuration = function() {
            return fp.getClip().metaData.duration;
        };

        /**
         * Get percentage of video that is buffered.
         *
         * @public
         * @returns {Number} Between 0 and 100
         */
        self.getBuffered = function() {
            return fp.getClip().buffer;
        };

        /**
         * Turn off video sound.
         *
         * @public
         */
        self.mute = function() {
            fp.mute();
        };

        /**
         * Turn on video sound.
         *
         * @public
         */
        self.unMute = function() {
            fp.unmute();
        };

        /**
         * Check if video sound is turned on or off.
         *
         * @public
         * @returns {Boolean}
         */
        self.isMuted = function() {
            return fp.muted;
        };

        /**
         * Returns the video sound level.
         *
         * @public
         * @returns {Number} Between 0 and 100.
         */
        self.getVolume = function() {
            return fp.volumeLevel * 100;
        };

        /**
         * Set video sound level.
         *
         * @public
         * @param {Number} volume Between 0 and 100.
         */
        self.setVolume = function(level) {
            fp.volume(level / 100);
        };

        // Handle resize events
        self.on('resize', function() {
            var $object = H5P.jQuery(fp.getParent()).children('object');
            var clip = fp.getClip();

            if (clip !== undefined) {
                $object.css('height', $object.width() * (clip.metaData.height / clip.metaData.width));
            }
        });
    }

    /**
     * Check to see if we can play any of the given sources.
     *
     * @public
     * @static
     * @param {Array} sources
     * @returns {Boolean}
     */
    Flash.canPlay = function(sources) {
        // Cycle through sources
        for (var i = 0; i < sources.length; i++) {
            if (sources[i].mime === 'video/mp4' || /\.mp4$/.test(sources[i].mime)) {
                return true; // We only play mp4
            }
        }
    };

    return Flash;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
H5P.videoHandlers.push(H5P.VideoFlash);
/** @namespace H5P */
H5P.Video = (function($, ContentCopyrights, MediaCopyright, handlers) {

    /**
     * The ultimate H5P video player!
     *
     * @class
     * @param {Object} parameters Options for this library.
     * @param {Object} parameters.visuals Visual options
     * @param {Object} parameters.playback Playback options
     * @param {Object} parameters.a11y Accessibility options
     * @param {Boolean} [parameters.startAt] Start time of video
     * @param {Number} id Content identifier
     */
    function Video(parameters, id) {
        var self = this;
        self.contentId = id;

        // Ref youtube.js - ipad & youtube - issue
        self.pressToPlay = false;

        // Reference to the handler
        var handlerName = '';

        // Initialize event inheritance
        H5P.EventDispatcher.call(self);

        // Default language localization
        parameters = $.extend(true, parameters, {
            l10n: {
                name: 'Video',
                loading: 'Video player loading...',
                noPlayers: 'Found no video players that supports the given video format.',
                noSources: 'Video source is missing.',
                aborted: 'Media playback has been aborted.',
                networkFailure: 'Network failure.',
                cannotDecode: 'Unable to decode media.',
                formatNotSupported: 'Video format not supported.',
                mediaEncrypted: 'Media encrypted.',
                unknownError: 'Unknown error.',
                invalidYtId: 'Invalid YouTube ID.',
                unknownYtId: 'Unable to find video with the given YouTube ID.',
                restrictedYt: 'The owner of this video does not allow it to be embedded.'
            }
        });

        parameters.a11y = parameters.a11y || [];
        parameters.playback = parameters.playback || {};
        parameters.visuals = parameters.visuals || {};

        /** @private */
        var sources = [];
        if (parameters.sources) {
            for (var i = 0; i < parameters.sources.length; i++) {
                // Clone to avoid changing of parameters.
                var source = $.extend(true, {}, parameters.sources[i]);

                // Create working URL without html entities.
                source.path = $cleaner.html(source.path).text();
                sources.push(source);
            }
        }

        /** @private */
        var tracks = [];
        parameters.a11y.forEach(function(track) {
            // Clone to avoid changing of parameters.
            var clone = $.extend(true, {}, track);

            // Create working URL without html entities
            if (clone.track && clone.track.path) {
                clone.track.path = $cleaner.html(clone.track.path).text();
                tracks.push(clone);
            }
        });

        /**
         * Attaches the video handler to the given container.
         * Inserts text if no handler is found.
         *
         * @public
         * @param {jQuery} $container
         */
        self.attach = function($container) {
            $container.addClass('h5p-video').html('');

            if (self.appendTo !== undefined) {
                self.appendTo($container);
            } else {
                if (sources.length) {
                    $container.text(parameters.l10n.noPlayers);
                } else {
                    $container.text(parameters.l10n.noSources);
                }
            }
        };

        /**
         * Get name of the video handler
         *
         * @public
         * @returns {string}
         */
        self.getHandlerName = function() {
            return handlerName;
        };

        // Resize the video when we know its aspect ratio
        self.on('loaded', function() {
            self.trigger('resize');
        });

        // Find player for video sources
        if (sources.length) {
            var html5Handler;
            for (var i = 0; i < handlers.length; i++) {
                var handler = handlers[i];
                if (handler.canPlay !== undefined && handler.canPlay(sources)) {
                    handler.call(self, sources, {
                        controls: parameters.visuals.controls,
                        autoplay: parameters.playback.autoplay,
                        loop: parameters.playback.loop,
                        fit: parameters.visuals.fit,
                        poster: parameters.visuals.poster === undefined ? undefined : parameters.visuals.poster,
                        startAt: parameters.startAt || 0,
                        tracks: tracks,
                        disableRemotePlayback: (parameters.visuals.disableRemotePlayback || false)
                    }, parameters.l10n);
                    handlerName = handler.name;
                    return;
                }

                if (handler === H5P.VideoHtml5) {
                    html5Handler = handler;
                    handlerName = handler.name;
                }
            }
            console.log(handlers)
            // Fallback to trying HTML5 player
            if (html5Handler) {
                html5Handler.call(self, sources, {
                    controls: parameters.visuals.controls,
                    autoplay: parameters.playback.autoplay,
                    loop: parameters.playback.loop,
                    fit: parameters.visuals.fit,
                    poster: parameters.visuals.poster === undefined ? undefined : parameters.visuals.poster,
                    startAt: parameters.startAt || 0,
                    tracks: tracks,
                    disableRemotePlayback: (parameters.visuals.disableRemotePlayback || false)
                }, parameters.l10n);
            }
        }
    }

    // Extends the event dispatcher
    Video.prototype = Object.create(H5P.EventDispatcher.prototype);
    Video.prototype.constructor = Video;

    // Player states
    /** @constant {Number} */
    Video.ENDED = 0;
    /** @constant {Number} */
    Video.PLAYING = 1;
    /** @constant {Number} */
    Video.PAUSED = 2;
    /** @constant {Number} */
    Video.BUFFERING = 3;
    /**
     * When video is queued to start
     * @constant {Number}
     */
    Video.VIDEO_CUED = 5;

    // Used to convert between html and text, since URLs have html entities.
    var $cleaner = H5P.jQuery('<div/>');

    /**
     * Help keep track of key value pairs used by the UI.
     *
     * @class
     * @param {string} label
     * @param {string} value
     */
    Video.LabelValue = function(label, value) {
        this.label = label;
        this.value = value;
    };

    /** @constant {Boolean} */
    Video.IE11_PLAYBACK_RATE_FIX = (navigator.userAgent.match(/Trident.*rv[ :]*11\./) ? true : false);

    return Video;
})(H5P.jQuery, H5P.ContentCopyrights, H5P.MediaCopyright, H5P.videoHandlers || []);
H5P = H5P || {};

/**
 * Will render a Question with multiple choices for answers.
 *
 * Events provided:
 * - h5pQuestionSetFinished: Triggered when a question is finished. (User presses Finish-button)
 *
 * @param {Array} options
 * @param {int} contentId
 * @param {Object} contentData
 * @returns {H5P.QuestionSet} Instance
 */
H5P.QuestionSet = function(options, contentId, contentData) {
    if (!(this instanceof H5P.QuestionSet)) {
        return new H5P.QuestionSet(options, contentId, contentData);
    }
    H5P.EventDispatcher.call(this);
    var $ = H5P.jQuery;
    var self = this;
    this.contentId = contentId;

    var defaults = {
        initialQuestion: 0,
        progressType: 'dots',
        passPercentage: 50,
        questions: [],
        introPage: {
            showIntroPage: false,
            title: '',
            introduction: '',
            startButtonText: 'Start'
        },
        texts: {
            prevButton: 'Previous question',
            nextButton: 'Next question',
            finishButton: 'Finish',
            textualProgress: 'Question: @current of @total questions',
            jumpToQuestion: 'Question %d of %total',
            questionLabel: 'Question',
            readSpeakerProgress: 'Question @current of @total',
            unansweredText: 'Unanswered',
            answeredText: 'Answered',
            currentQuestionText: 'Current question'
        },
        endGame: {
            showResultPage: true,
            noResultMessage: 'Finished',
            message: 'Your result:',
            oldFeedback: {
                successGreeting: '',
                successComment: '',
                failGreeting: '',
                failComment: ''
            },
            overallFeedback: [],
            finishButtonText: 'Finish',
            solutionButtonText: 'Show solution',
            retryButtonText: 'Retry',
            showAnimations: false,
            skipButtonText: 'Skip video',
            showSolutionButton: true,
            showRetryButton: true
        },
        override: {},
        disableBackwardsNavigation: false
    };
    var params = $.extend(true, {}, defaults, options);

    var texttemplate =
        '<% if (introPage.showIntroPage) { %>' +
        '<div class="intro-page">' +
        '  <% if (introPage.title) { %>' +
        '    <div class="title"><span><%= introPage.title %></span></div>' +
        '  <% } %>' +
        '  <% if (introPage.introduction) { %>' +
        '    <div class="introduction"><%= introPage.introduction %></div>' +
        '  <% } %>' +
        '  <div class="buttons"><a href="#" class="qs-startbutton h5p-joubelui-button h5p-button"><%= introPage.startButtonText %></a></div>' +
        '</div>' +
        '<% } %>' +
        '<div tabindex="-1" class="qs-progress-announcer"></div>' +
        '<div class="questionset<% if (introPage.showIntroPage) { %> hidden<% } %>">' +
        '  <% for (var i=0; i<questions.length; i++) { %>' +
        '    <div class="question-container"></div>' +
        '  <% } %>' +
        '  <div class="qs-footer">' +
        '    <div class="qs-progress">' +
        '      <% if (progressType == "dots") { %>' +
        '        <ul class="dots-container" role="navigation">' +
        '          <% for (var i=0; i<questions.length; i++) { %>' +
        '           <li class="progress-item">' +
        '             <a href="#" ' +
        '               class="progress-dot unanswered<%' +
        '               if (disableBackwardsNavigation) { %> disabled <% } %>"' +
        '               aria-label="<%=' +
        '               texts.jumpToQuestion.replace("%d", i + 1).replace("%total", questions.length)' +
        '               + ", " + texts.unansweredText %>" tabindex="-1" ' +
        '               <% if (disableBackwardsNavigation) { %> aria-disabled="true" <% } %>' +
        '             ></a>' +
        '           </li>' +
        '          <% } %>' +
        '        </div>' +
        '      <% } else if (progressType == "textual") { %>' +
        '        <span class="progress-text"></span>' +
        '      <% } %>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    var solutionButtonTemplate = params.endGame.showSolutionButton ?
        '    <button type="button" class="h5p-joubelui-button h5p-button qs-solutionbutton"><%= solutionButtonText %></button>' :
        '';

    const retryButtonTemplate = params.endGame.showRetryButton ?
        '    <button type="button" class="h5p-joubelui-button h5p-button qs-retrybutton"><%= retryButtonText %></button>' :
        '';

    var resulttemplate =
        '<div class="questionset-results">' +
        '  <div class="greeting"><%= message %></div>' +
        '  <div class="feedback-section">' +
        '    <div class="feedback-scorebar"></div>' +
        '    <div class="feedback-text"></div>' +
        '  </div>' +
        '  <% if (comment) { %>' +
        '  <div class="result-header"><%= comment %></div>' +
        '  <% } %>' +
        '  <% if (resulttext) { %>' +
        '  <div class="result-text"><%= resulttext %></div>' +
        '  <% } %>' +
        '  <div class="buttons">' +
        solutionButtonTemplate +
        retryButtonTemplate +
        '  </div>' +
        '</div>';

    var template = new EJS({
        text: texttemplate
    });
    var endTemplate = new EJS({
        text: resulttemplate
    });

    var initialParams = $.extend(true, {}, defaults, options);
    var poolOrder; // Order of questions in a pool
    var currentQuestion = 0;
    var questionInstances = [];
    var questionOrder; //Stores order of questions to allow resuming of question set
    var $myDom;
    var scoreBar;
    var up;
    var renderSolutions = false;
    var showingSolutions = false;
    contentData = contentData || {};

    // Bring question set up to date when resuming
    if (contentData.previousState) {
        if (contentData.previousState.progress) {
            currentQuestion = contentData.previousState.progress;
        }
        questionOrder = contentData.previousState.order;
    }

    /**
     * Randomizes questions in an array and updates an array containing their order
     * @param  {array} questions
     * @return {Object.<array, array>} questionOrdering
     */
    var randomizeQuestionOrdering = function(questions) {

        // Save the original order of the questions in a multidimensional array [[question0,0],[question1,1]...
        var questionOrdering = questions.map(function(questionInstance, index) {
            return [questionInstance, index];
        });

        // Shuffle the multidimensional array
        questionOrdering = H5P.shuffleArray(questionOrdering);

        // Retrieve question objects from the first index
        questions = [];
        for (var i = 0; i < questionOrdering.length; i++) {
            questions[i] = questionOrdering[i][0];
        }

        // Retrieve the new shuffled order from the second index
        var newOrder = [];
        for (var j = 0; j < questionOrdering.length; j++) {

            // Use a previous order if it exists
            if (contentData.previousState && contentData.previousState.questionOrder) {
                newOrder[j] = questionOrder[questionOrdering[j][1]];
            } else {
                newOrder[j] = questionOrdering[j][1];
            }
        }

        // Return the questions in their new order *with* their new indexes
        return {
            questions: questions,
            questionOrder: newOrder
        };
    };

    // Create a pool (a subset) of questions if necessary
    if (params.poolSize > 0) {

        // If a previous pool exists, recreate it
        if (contentData.previousState && contentData.previousState.poolOrder) {
            poolOrder = contentData.previousState.poolOrder;

            // Recreate the pool from the saved data
            var pool = [];
            for (var i = 0; i < poolOrder.length; i++) {
                pool[i] = params.questions[poolOrder[i]];
            }

            // Replace original questions with just the ones in the pool
            params.questions = pool;
        } else { // Otherwise create a new pool
            // Randomize and get the results
            var poolResult = randomizeQuestionOrdering(params.questions);
            var poolQuestions = poolResult.questions;
            poolOrder = poolResult.questionOrder;

            // Discard extra questions

            poolQuestions = poolQuestions.slice(0, params.poolSize);
            poolOrder = poolOrder.slice(0, params.poolSize);

            // Replace original questions with just the ones in the pool
            params.questions = poolQuestions;
        }
    }

    // Create the html template for the question container
    var $template = $(template.render(params));

    // Set overrides for questions
    var override;
    if (params.override.showSolutionButton || params.override.retryButton || params.override.checkButton === false) {
        override = {};
        if (params.override.showSolutionButton) {
            // Force "Show solution" button to be on or off for all interactions
            override.enableSolutionsButton =
                (params.override.showSolutionButton === 'on' ? true : false);
        }

        if (params.override.retryButton) {
            // Force "Retry" button to be on or off for all interactions
            override.enableRetry =
                (params.override.retryButton === 'on' ? true : false);
        }

        if (params.override.checkButton === false) {
            // Force "Check" button to be on or off for all interactions
            override.enableCheckButton = params.override.checkButton;
        }
    }

    /**
     * Generates question instances from H5P objects
     *
     * @param  {object} questions H5P content types to be created as instances
     * @return {array} Array of questions instances
     */
    var createQuestionInstancesFromQuestions = function(questions) {
        var result = [];
        // Create question instances from questions
        // Instantiate question instances
        for (var i = 0; i < questions.length; i++) {

            var question;
            // If a previous order exists, use it
            if (questionOrder !== undefined) {
                question = questions[questionOrder[i]];
            } else {
                // Use a generic order when initialzing for the first time
                question = questions[i];
            }

            if (override) {
                // Extend subcontent with the overrided settings.
                $.extend(question.params.behaviour, override);
            }

            question.params = question.params || {};
            var hasAnswers = contentData.previousState && contentData.previousState.answers;
            var questionInstance = H5P.newRunnable(question, contentId, undefined, undefined, {
                previousState: hasAnswers ? contentData.previousState.answers[i] : undefined,
                parent: self
            });
            questionInstance.on('resize', function() {
                up = true;
                self.trigger('resize');
            });
            result.push(questionInstance);
        }

        return result;
    };

    // Create question instances from questions given by params
    questionInstances = createQuestionInstancesFromQuestions(params.questions);

    // Randomize questions only on instantiation
    if (params.randomQuestions && contentData.previousState === undefined) {
        var result = randomizeQuestionOrdering(questionInstances);
        questionInstances = result.questions;
        questionOrder = result.questionOrder;
    }

    // Resize all interactions on resize
    self.on('resize', function() {
        if (up) {
            // Prevent resizing the question again.
            up = false;
            return;
        }

        for (var i = 0; i < questionInstances.length; i++) {
            questionInstances[i].trigger('resize');
        }
    });

    // Update button state.
    var _updateButtons = function() {
        // Verify that current question is answered when backward nav is disabled
        if (params.disableBackwardsNavigation) {
            if (questionInstances[currentQuestion].getAnswerGiven() &&
                questionInstances.length - 1 !== currentQuestion) {
                questionInstances[currentQuestion].showButton('next');
            } else {
                questionInstances[currentQuestion].hideButton('next');
            }
        }

        var answered = true;
        for (var i = questionInstances.length - 1; i >= 0; i--) {
            answered = answered && (questionInstances[i]).getAnswerGiven();
        }

        if (currentQuestion === (params.questions.length - 1) &&
            questionInstances[currentQuestion]) {
            if (answered) {
                questionInstances[currentQuestion].showButton('finish');
            } else {
                questionInstances[currentQuestion].hideButton('finish');
            }
        }
    };

    var _stopQuestion = function(questionNumber) {
        if (questionInstances[questionNumber]) {
            pauseMedia(questionInstances[questionNumber]);
        }
    };

    var _showQuestion = function(questionNumber, preventAnnouncement) {
        // Sanitize input.
        if (questionNumber < 0) {
            questionNumber = 0;
        }
        if (questionNumber >= params.questions.length) {
            questionNumber = params.questions.length - 1;
        }

        currentQuestion = questionNumber;

        handleAutoPlay(currentQuestion);

        // Hide all questions
        $('.question-container', $myDom).hide().eq(questionNumber).show();

        if (questionInstances[questionNumber]) {
            // Trigger resize on question in case the size of the QS has changed.
            var instance = questionInstances[questionNumber];
            instance.setActivityStarted();
            if (instance.$ !== undefined) {
                instance.trigger('resize');
            }
        }

        // Update progress indicator
        // Test if current has been answered.
        if (params.progressType === 'textual') {
            $('.progress-text', $myDom).text(params.texts.textualProgress.replace("@current", questionNumber + 1).replace("@total", params.questions.length));
        } else {
            // Set currentNess
            var previousQuestion = $('.progress-dot.current', $myDom).parent().index();
            if (previousQuestion >= 0) {
                toggleCurrentDot(previousQuestion, false);
                toggleAnsweredDot(previousQuestion, questionInstances[previousQuestion].getAnswerGiven());
            }
            toggleCurrentDot(questionNumber, true);
        }

        if (!preventAnnouncement) {
            // Announce question number of total, must use timeout because of buttons logic
            setTimeout(function() {
                var humanizedProgress = params.texts.readSpeakerProgress
                    .replace('@current', (currentQuestion + 1).toString())
                    .replace('@total', questionInstances.length.toString());

                $('.qs-progress-announcer', $myDom)
                    .html(humanizedProgress)
                    .show().focus();

                if (instance && instance.readFeedback) {
                    instance.readFeedback();
                }
            }, 0);
        }

        // Remember where we are
        _updateButtons();
        self.trigger('resize');
        return currentQuestion;
    };

    /**
     * Handle autoplays, limit to one at a time
     *
     * @param {number} currentQuestionIndex
     */
    var handleAutoPlay = function(currentQuestionIndex) {
        for (var i = 0; i < questionInstances.length; i++) {
            questionInstances[i].pause();
        }

        var currentQuestion = params.questions[currentQuestionIndex];

        var hasAutoPlay = currentQuestion &&
            currentQuestion.params.media &&
            currentQuestion.params.media.params &&
            currentQuestion.params.media.params.playback &&
            currentQuestion.params.media.params.playback.autoplay;

        if (hasAutoPlay && typeof questionInstances[currentQuestionIndex].play === 'function') {
            questionInstances[currentQuestionIndex].play();
        }
    };



    /**
     * Show solutions for subcontent, and hide subcontent buttons.
     * Used for contracts with integrated content.
     * @public
     */
    var showSolutions = function() {
        showingSolutions = true;
        for (var i = 0; i < questionInstances.length; i++) {

            // Enable back and forth navigation in solution mode
            toggleDotsNavigation(true);
            if (i < questionInstances.length - 1) {
                questionInstances[i].showButton('next');
            }
            if (i > 0) {
                questionInstances[i].showButton('prev');
            }

            try {
                // Do not read answers
                questionInstances[i].toggleReadSpeaker(true);
                questionInstances[i].showSolutions();
                questionInstances[i].toggleReadSpeaker(false);
            } catch (error) {
                H5P.error("subcontent does not contain a valid showSolutions function");
                H5P.error(error);
            }
        }
    };

    /**
     * Toggles whether dots are enabled for navigation
     */
    var toggleDotsNavigation = function(enable) {
        $('.progress-dot', $myDom).each(function() {
            $(this).toggleClass('disabled', !enable);
            $(this).attr('aria-disabled', enable ? 'false' : 'true');
            // Remove tabindex
            if (!enable) {
                $(this).attr('tabindex', '-1');
            }
        });
    };

    /**
     * Resets the task and every subcontent task.
     * Used for contracts with integrated content.
     * @public
     */
    var resetTask = function() {

        // Clear previous state to ensure questions are created cleanly
        contentData.previousState = [];

        showingSolutions = false;

        for (var i = 0; i < questionInstances.length; i++) {
            try {
                questionInstances[i].resetTask();

                // Hide back and forth navigation in normal mode
                if (params.disableBackwardsNavigation) {
                    toggleDotsNavigation(false);

                    // Check if first question is answered by default
                    if (i === 0 && questionInstances[i].getAnswerGiven()) {
                        questionInstances[i].showButton('next');
                    } else {
                        questionInstances[i].hideButton('next');
                    }

                    questionInstances[i].hideButton('prev');
                }
            } catch (error) {
                H5P.error("subcontent does not contain a valid resetTask function");
                H5P.error(error);
            }
        }

        // Hide finish button
        questionInstances[questionInstances.length - 1].hideButton('finish');

        // Mark all tasks as unanswered:
        $('.progress-dot').each(function(idx) {
            toggleAnsweredDot(idx, false);
        });

        //Force the last page to be reRendered
        rendered = false;

        if (params.poolSize > 0) {

            // Make new pool from params.questions
            // Randomize and get the results
            var poolResult = randomizeQuestionOrdering(initialParams.questions);
            var poolQuestions = poolResult.questions;
            poolOrder = poolResult.questionOrder;

            // Discard extra questions
            poolQuestions = poolQuestions.slice(0, params.poolSize);
            poolOrder = poolOrder.slice(0, params.poolSize);

            // Replace original questions with just the ones in the pool
            params.questions = poolQuestions;

            // Recreate the question instances
            questionInstances = createQuestionInstancesFromQuestions(params.questions);

            // Update buttons
            initializeQuestion();

        } else if (params.randomQuestions) {
            randomizeQuestions();
        }

    };

    var rendered = false;

    this.reRender = function() {
        rendered = false;
    };

    /**
     * Randomizes question instances
     */
    var randomizeQuestions = function() {

        var result = randomizeQuestionOrdering(questionInstances);
        questionInstances = result.questions;
        questionOrder = result.questionOrder;

        replaceQuestionsInDOM(questionInstances);
    };

    /**
     * Empty the DOM of all questions, attach new questions and update buttons
     *
     * @param  {type} questionInstances Array of questions to be attached to the DOM
     */
    var replaceQuestionsInDOM = function(questionInstances) {

        // Find all question containers and detach questions from them
        $('.question-container', $myDom).each(function() {
            $(this).children().detach();
        });

        // Reattach questions and their buttons in the new order
        for (var i = 0; i < questionInstances.length; i++) {

            var question = questionInstances[i];

            // Make sure styles are not being added twice
            $('.question-container:eq(' + i + ')', $myDom).attr('class', 'question-container');

            question.attach($('.question-container:eq(' + i + ')', $myDom));

            //Show buttons if necessary
            if (questionInstances[questionInstances.length - 1] === question &&
                question.hasButton('finish')) {
                question.showButton('finish');
            }

            if (questionInstances[questionInstances.length - 1] !== question &&
                question.hasButton('next')) {
                question.showButton('next');
            }

            if (questionInstances[0] !== question &&
                question.hasButton('prev') &&
                !params.disableBackwardsNavigation) {
                question.showButton('prev');
            }

            // Hide relevant buttons since the order has changed
            if (questionInstances[0] === question) {
                question.hideButton('prev');
            }

            if (questionInstances[questionInstances.length - 1] === question) {
                question.hideButton('next');
            }

            if (questionInstances[questionInstances.length - 1] !== question) {
                question.hideButton('finish');
            }
        }
    };

    var moveQuestion = function(direction) {
        if (params.disableBackwardsNavigation && !questionInstances[currentQuestion].getAnswerGiven()) {
            questionInstances[currentQuestion].hideButton('next');
            questionInstances[currentQuestion].hideButton('finish');
            return;
        }

        _stopQuestion(currentQuestion);
        if (currentQuestion + direction >= questionInstances.length) {
            _displayEndGame();
        } else {
            // Allow movement if backward navigation enabled or answer given
            _showQuestion(currentQuestion + direction);
        }
    };

    /**
     * Toggle answered state of dot at given index
     * @param {number} dotIndex Index of dot
     * @param {boolean} isAnswered True if is answered, False if not answered
     */
    var toggleAnsweredDot = function(dotIndex, isAnswered) {
        var $el = $('.progress-dot:eq(' + dotIndex + ')', $myDom);

        // Skip current button
        if ($el.hasClass('current')) {
            return;
        }

        // Ensure boolean
        isAnswered = !!isAnswered;

        var label = params.texts.jumpToQuestion
            .replace('%d', (dotIndex + 1).toString())
            .replace('%total', $('.progress-dot', $myDom).length) +
            ', ' +
            (isAnswered ? params.texts.answeredText : params.texts.unansweredText);

        $el.toggleClass('unanswered', !isAnswered)
            .toggleClass('answered', isAnswered)
            .attr('aria-label', label);
    };

    /**
     * Toggle current state of dot at given index
     * @param dotIndex
     * @param isCurrent
     */
    var toggleCurrentDot = function(dotIndex, isCurrent) {
        var $el = $('.progress-dot:eq(' + dotIndex + ')', $myDom);
        var texts = params.texts;
        var label = texts.jumpToQuestion
            .replace('%d', (dotIndex + 1).toString())
            .replace('%total', $('.progress-dot', $myDom).length);

        if (!isCurrent) {
            var isAnswered = $el.hasClass('answered');
            label += ', ' + (isAnswered ? texts.answeredText : texts.unansweredText);
        } else {
            label += ', ' + texts.currentQuestionText;
        }

        var disabledTabindex = params.disableBackwardsNavigation && !showingSolutions;
        $el.toggleClass('current', isCurrent)
            .attr('aria-label', label)
            .attr('tabindex', isCurrent && !disabledTabindex ? 0 : -1);
    };

    var _displayEndGame = function() {
        $('.progress-dot.current', $myDom).removeClass('current');
        if (rendered) {
            $myDom.children().hide().filter('.questionset-results').show();
            self.trigger('resize');
            return;
        }
        //Remove old score screen.
        $myDom.children().hide().filter('.questionset-results').remove();
        rendered = true;

        // Get total score.
        var finals = self.getScore();
        var totals = self.getMaxScore();

        var scoreString = H5P.Question.determineOverallFeedback(params.endGame.overallFeedback, finals / totals).replace('@score', finals).replace('@total', totals);
        var success = ((100 * finals / totals) >= params.passPercentage);

        /**
         * Makes our buttons behave like other buttons.
         *
         * @private
         * @param {string} classSelector
         * @param {function} handler
         */
        var hookUpButton = function(classSelector, handler) {
            $(classSelector, $myDom).click(handler).keypress(function(e) {
                if (e.which === 32) {
                    handler();
                    e.preventDefault();
                }
            });
        };

        var displayResults = function() {
            self.triggerXAPICompleted(self.getScore(), self.getMaxScore(), success);

            var eparams = {
                message: params.endGame.showResultPage ? params.endGame.message : params.endGame.noResultMessage,
                comment: params.endGame.showResultPage ? (success ? params.endGame.oldFeedback.successGreeting : params.endGame.oldFeedback.failGreeting) : undefined,
                resulttext: params.endGame.showResultPage ? (success ? params.endGame.oldFeedback.successComment : params.endGame.oldFeedback.failComment) : undefined,
                finishButtonText: params.endGame.finishButtonText,
                solutionButtonText: params.endGame.solutionButtonText,
                retryButtonText: params.endGame.retryButtonText
            };

            // Show result page.
            $myDom.children().hide();
            $myDom.append(endTemplate.render(eparams));

            if (params.endGame.showResultPage) {
                hookUpButton('.qs-solutionbutton', function() {
                    showSolutions();
                    $myDom.children().hide().filter('.questionset').show();
                    _showQuestion(params.initialQuestion);
                });
                hookUpButton('.qs-retrybutton', function() {
                    resetTask();
                    $myDom.children().hide();

                    var $intro = $('.intro-page', $myDom);
                    if ($intro.length) {
                        // Show intro
                        $('.intro-page', $myDom).show();
                        $('.qs-startbutton', $myDom).focus();
                    } else {
                        // Show first question
                        $('.questionset', $myDom).show();
                        _showQuestion(params.initialQuestion);
                    }
                });

                if (scoreBar === undefined) {
                    scoreBar = H5P.JoubelUI.createScoreBar(totals);
                }
                scoreBar.appendTo($('.feedback-scorebar', $myDom));
                $('.feedback-text', $myDom).html(scoreString);

                // Announce that the question set is complete
                setTimeout(function() {
                    $('.qs-progress-announcer', $myDom)
                        .html(eparams.message + '.' +
                            scoreString + '.' +
                            eparams.comment + '.' +
                            eparams.resulttext)
                        .show().focus();
                    scoreBar.setMaxScore(totals);
                    scoreBar.setScore(finals);
                }, 0);
            } else {
                // Remove buttons and feedback section
                $('.qs-solutionbutton, .qs-retrybutton, .feedback-section', $myDom).remove();
            }

            self.trigger('resize');
        };

        if (params.endGame.showAnimations) {
            var videoData = success ? params.endGame.successVideo : params.endGame.failVideo;
            if (videoData) {
                $myDom.children().hide();
                var $videoContainer = $('<div class="video-container"></div>').appendTo($myDom);

                var video = new H5P.Video({
                    sources: videoData,
                    fitToWrapper: true,
                    controls: false,
                    autoplay: false
                }, contentId);
                video.on('stateChange', function(event) {
                    if (event.data === H5P.Video.ENDED) {
                        displayResults();
                        $videoContainer.hide();
                    }
                });
                video.attach($videoContainer);
                // Resize on video loaded
                video.on('loaded', function() {
                    self.trigger('resize');
                });
                video.play();

                if (params.endGame.skippable) {
                    $('<a class="h5p-joubelui-button h5p-button skip">' + params.endGame.skipButtonText + '</a>').click(function() {
                        video.pause();
                        $videoContainer.hide();
                        displayResults();
                    }).appendTo($videoContainer);
                }

                return;
            }
        }
        // Trigger finished event.
        displayResults();
        self.trigger('resize');
    };

    var registerImageLoadedListener = function(question) {
        H5P.on(question, 'imageLoaded', function() {
            self.trigger('resize');
        });
    };

    /**
     * Initialize a question and attach it to the DOM
     *
     */
    function initializeQuestion() {
        // Attach questions
        for (var i = 0; i < questionInstances.length; i++) {
            var question = questionInstances[i];

            // Make sure styles are not being added twice
            $('.question-container:eq(' + i + ')', $myDom).attr('class', 'question-container');

            question.attach($('.question-container:eq(' + i + ')', $myDom));

            // Listen for image resize
            registerImageLoadedListener(question);

            // Add finish button
            question.addButton('finish', params.texts.finishButton,
                moveQuestion.bind(this, 1), false);

            // Add next button
            question.addButton('next', '', moveQuestion.bind(this, 1),
                !params.disableBackwardsNavigation || !!question.getAnswerGiven(), {
                    href: '#', // Use href since this is a navigation button
                    'aria-label': params.texts.nextButton
                });

            // Add previous button
            question.addButton('prev', '', moveQuestion.bind(this, -1),
                !(questionInstances[0] === question || params.disableBackwardsNavigation), {
                    href: '#', // Use href since this is a navigation button
                    'aria-label': params.texts.prevButton
                });

            // Hide next button if it is the last question
            if (questionInstances[questionInstances.length - 1] === question) {
                question.hideButton('next');
            }

            question.on('xAPI', function(event) {
                var shortVerb = event.getVerb();
                if (shortVerb === 'interacted' ||
                    shortVerb === 'answered' ||
                    shortVerb === 'attempted') {
                    toggleAnsweredDot(currentQuestion,
                        questionInstances[currentQuestion].getAnswerGiven());
                    _updateButtons();
                }
                if (shortVerb === 'completed') {
                    // An activity within this activity is not allowed to send completed events
                    event.setVerb('answered');
                }
                if (event.data.statement.context.extensions === undefined) {
                    event.data.statement.context.extensions = {};
                }
                event.data.statement.context.extensions['http://id.tincanapi.com/extension/ending-point'] = currentQuestion + 1;
            });

            // Mark question if answered
            toggleAnsweredDot(i, question.getAnswerGiven());
        }
    }

    this.attach = function(target) {
        if (this.isRoot()) {
            this.setActivityStarted();
        }
        if (typeof(target) === "string") {
            $myDom = $('#' + target);
        } else {
            $myDom = $(target);
        }

        // Render own DOM into target.
        $myDom.children().remove();
        $myDom.append($template);
        if (params.backgroundImage !== undefined) {
            $myDom.css({
                overflow: 'hidden',
                background: '#fff url("' + H5P.getPath(params.backgroundImage.path, contentId) + '") no-repeat 50% 50%',
                backgroundSize: '100% auto'
            });
        }

        if (params.introPage.backgroundImage !== undefined) {
            var $intro = $myDom.find('.intro-page');
            if ($intro.length) {
                var bgImg = params.introPage.backgroundImage;
                var bgImgRatio = (bgImg.height / bgImg.width);
                $intro.css({
                    background: '#fff url("' + H5P.getPath(bgImg.path, contentId) + '") no-repeat 50% 50%',
                    backgroundSize: 'auto 100%',
                    minHeight: bgImgRatio * +window.getComputedStyle($intro[0]).width.replace('px', '')
                });
            }
        }

        initializeQuestion();

        // Allow other libraries to add transitions after the questions have been inited
        $('.questionset', $myDom).addClass('started');

        $('.qs-startbutton', $myDom)
            .click(function() {
                $(this).parents('.intro-page').hide();
                $('.questionset', $myDom).show();
                _showQuestion(params.initialQuestion);
                event.preventDefault();
            })
            .keydown(function(event) {
                switch (event.which) {
                    case 13: // Enter
                    case 32: // Space
                        $(this).parents('.intro-page').hide();
                        $('.questionset', $myDom).show();
                        _showQuestion(params.initialQuestion);
                        event.preventDefault();
                }
            });

        /**
         * Triggers changing the current question.
         *
         * @private
         * @param {Object} [event]
         */
        var handleProgressDotClick = function(event) {
            // Disable dots when backward nav disabled
            event.preventDefault();
            if (params.disableBackwardsNavigation && !showingSolutions) {
                return;
            }
            _stopQuestion(currentQuestion);
            _showQuestion($(this).parent().index());
        };

        // Set event listeners.
        $('.progress-dot', $myDom).click(handleProgressDotClick).keydown(function(event) {
            var $this = $(this);
            switch (event.which) {
                case 13: // Enter
                case 32: // Space
                    handleProgressDotClick.call(this, event);
                    break;

                case 37: // Left Arrow
                case 38: // Up Arrow
                    // Go to previous dot
                    var $prev = $this.parent().prev();
                    if ($prev.length) {
                        $prev.children('a').attr('tabindex', '0').focus();
                        $this.attr('tabindex', '-1');
                    }
                    break;

                case 39: // Right Arrow
                case 40: // Down Arrow
                    // Go to next dot
                    var $next = $this.parent().next();
                    if ($next.length) {
                        $next.children('a').attr('tabindex', '0').focus();
                        $this.attr('tabindex', '-1');
                    }
                    break;
            }
        });



        // Hide all but current question
        _showQuestion(currentQuestion, true);

        if (renderSolutions) {
            showSolutions();
        }
        // Update buttons in case they have changed (restored user state)
        _updateButtons();

        this.trigger('resize');

        return this;
    };

    // Get current score for questionset.
    this.getScore = function() {
        var score = 0;
        for (var i = questionInstances.length - 1; i >= 0; i--) {
            score += questionInstances[i].getScore();
        }
        return score;
    };

    // Get total score possible for questionset.
    this.getMaxScore = function() {
        var score = 0;
        for (var i = questionInstances.length - 1; i >= 0; i--) {
            score += questionInstances[i].getMaxScore();
        }
        return score;
    };

    /**
     * @deprecated since version 1.9.2
     * @returns {number}
     */
    this.totalScore = function() {
        return this.getMaxScore();
    };

    /**
     * Gather copyright information for the current content.
     *
     * @returns {H5P.ContentCopyrights}
     */
    this.getCopyrights = function() {
        var info = new H5P.ContentCopyrights();

        // IntroPage Background
        if (params.introPage !== undefined && params.introPage.backgroundImage !== undefined && params.introPage.backgroundImage.copyright !== undefined) {
            var introBackground = new H5P.MediaCopyright(params.introPage.backgroundImage.copyright);
            introBackground.setThumbnail(new H5P.Thumbnail(H5P.getPath(params.introPage.backgroundImage.path, contentId), params.introPage.backgroundImage.width, params.introPage.backgroundImage.height));
            info.addMedia(introBackground);
        }

        // Background
        if (params.backgroundImage !== undefined && params.backgroundImage.copyright !== undefined) {
            var background = new H5P.MediaCopyright(params.backgroundImage.copyright);
            background.setThumbnail(new H5P.Thumbnail(H5P.getPath(params.backgroundImage.path, contentId), params.backgroundImage.width, params.backgroundImage.height));
            info.addMedia(background);
        }

        // Questions
        var questionCopyrights;
        for (var i = 0; i < questionInstances.length; i++) {
            var instance = questionInstances[i];
            var instanceParams = params.questions[i].params;

            questionCopyrights = undefined;

            if (instance.getCopyrights !== undefined) {
                // Use the instance's own copyright generator
                questionCopyrights = instance.getCopyrights();
            }
            if (questionCopyrights === undefined) {
                // Create a generic flat copyright list
                questionCopyrights = new H5P.ContentCopyrights();
                H5P.findCopyrights(questionCopyrights, instanceParams.params, contentId, {
                    metadata: instanceParams.metadata,
                    machineName: instanceParams.library.split(' ')[0]
                });
            }

            // Determine label
            var label = (params.texts.questionLabel + ' ' + (i + 1));
            if (instanceParams.params.contentName !== undefined) {
                label += ': ' + instanceParams.params.contentName;
            } else if (instance.getTitle !== undefined) {
                label += ': ' + instance.getTitle();
            }
            questionCopyrights.setLabel(label);

            // Add info
            info.addContent(questionCopyrights);
        }

        // Success video
        var video;
        if (params.endGame.successVideo !== undefined && params.endGame.successVideo.length > 0) {
            video = params.endGame.successVideo[0];
            if (video.copyright !== undefined) {
                info.addMedia(new H5P.MediaCopyright(video.copyright));
            }
        }

        // Fail video
        if (params.endGame.failVideo !== undefined && params.endGame.failVideo.length > 0) {
            video = params.endGame.failVideo[0];
            if (video.copyright !== undefined) {
                info.addMedia(new H5P.MediaCopyright(video.copyright));
            }
        }

        return info;
    };
    this.getQuestions = function() {
        return questionInstances;
    };
    this.showSolutions = function() {
        renderSolutions = true;
    };

    /**
     * Stop the given element's playback if any.
     *
     * @param {object} instance
     */
    var pauseMedia = function(instance) {
        try {
            if (instance.pause !== undefined &&
                (instance.pause instanceof Function ||
                    typeof instance.pause === 'function')) {
                instance.pause();
            }
        } catch (err) {
            // Prevent crashing, log error.
            H5P.error(err);
        }
    };

    /**
     * Returns the complete state of question set and sub-content
     *
     * @returns {Object} current state
     */
    this.getCurrentState = function() {
        return {
            progress: showingSolutions ? questionInstances.length - 1 : currentQuestion,
            answers: questionInstances.map(function(qi) {
                return qi.getCurrentState();
            }),
            order: questionOrder,
            poolOrder: poolOrder
        };
    };

    /**
     * Generate xAPI object definition used in xAPI statements.
     * @return {Object}
     */
    var getxAPIDefinition = function() {
        var definition = {};

        definition.interactionType = 'compound';
        definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
        definition.description = {
            'en-US': ''
        };

        return definition;
    };

    /**
     * Add the question itself to the definition part of an xAPIEvent
     */
    var addQuestionToXAPI = function(xAPIEvent) {
        var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
        $.extend(definition, getxAPIDefinition());
    };

    /**
     * Get xAPI data from sub content types
     *
     * @param {Object} metaContentType
     * @returns {array}
     */
    var getXAPIDataFromChildren = function(metaContentType) {
        return metaContentType.getQuestions().map(function(question) {
            return question.getXAPIData();
        });
    };

    /**
     * Get xAPI data.
     * Contract used by report rendering engine.
     *
     * @see contract at {@link https://h5p.org/documentation/developers/contracts#guides-header-6}
     */
    this.getXAPIData = function() {
        var xAPIEvent = this.createXAPIEventTemplate('answered');
        addQuestionToXAPI(xAPIEvent);
        xAPIEvent.setScoredResult(this.getScore(),
            this.getMaxScore(),
            this,
            true,
            this.getScore() === this.getMaxScore()
        );
        return {
            statement: xAPIEvent.data.statement,
            children: getXAPIDataFromChildren(this)
        };
    };
};

H5P.QuestionSet.prototype = Object.create(H5P.EventDispatcher.prototype);
H5P.QuestionSet.prototype.constructor = H5P.QuestionSet;
H5P = H5P || {};

/**
 * Will render a Question with multiple choices for answers.
 *
 * Events provided:
 * - h5pQuestionSetFinished: Triggered when a question is finished. (User presses Finish-button)
 *
 * @param {Array} options
 * @param {int} contentId
 * @param {Object} contentData
 * @returns {H5P.QuestionSet} Instance
 */
H5P.QuestionSet = function(options, contentId, contentData) {
    if (!(this instanceof H5P.QuestionSet)) {
        return new H5P.QuestionSet(options, contentId, contentData);
    }
    H5P.EventDispatcher.call(this);
    var $ = H5P.jQuery;
    var self = this;
    this.contentId = contentId;

    var defaults = {
        initialQuestion: 0,
        progressType: 'dots',
        passPercentage: 50,
        questions: [],
        introPage: {
            showIntroPage: false,
            title: '',
            introduction: '',
            startButtonText: 'Start'
        },
        texts: {
            prevButton: 'Previous question',
            nextButton: 'Next question',
            finishButton: 'Finish',
            textualProgress: 'Question: @current of @total questions',
            jumpToQuestion: 'Question %d of %total',
            questionLabel: 'Question',
            readSpeakerProgress: 'Question @current of @total',
            unansweredText: 'Unanswered',
            answeredText: 'Answered',
            currentQuestionText: 'Current question'
        },
        endGame: {
            showResultPage: true,
            noResultMessage: 'Finished',
            message: 'Your result:',
            oldFeedback: {
                successGreeting: '',
                successComment: '',
                failGreeting: '',
                failComment: ''
            },
            overallFeedback: [],
            finishButtonText: 'Finish',
            solutionButtonText: 'Show solution',
            retryButtonText: 'Retry',
            showAnimations: false,
            skipButtonText: 'Skip video',
            showSolutionButton: true,
            showRetryButton: true
        },
        override: {},
        disableBackwardsNavigation: false
    };
    var params = $.extend(true, {}, defaults, options);

    var texttemplate =
        '<% if (introPage.showIntroPage) { %>' +
        '<div class="intro-page">' +
        '  <% if (introPage.title) { %>' +
        '    <div class="title"><span><%= introPage.title %></span></div>' +
        '  <% } %>' +
        '  <% if (introPage.introduction) { %>' +
        '    <div class="introduction"><%= introPage.introduction %></div>' +
        '  <% } %>' +
        '  <div class="buttons"><a href="#" class="qs-startbutton h5p-joubelui-button h5p-button"><%= introPage.startButtonText %></a></div>' +
        '</div>' +
        '<% } %>' +
        '<div tabindex="-1" class="qs-progress-announcer"></div>' +
        '<div class="questionset<% if (introPage.showIntroPage) { %> hidden<% } %>">' +
        '  <% for (var i=0; i<questions.length; i++) { %>' +
        '    <div class="question-container"></div>' +
        '  <% } %>' +
        '  <div class="qs-footer">' +
        '    <div class="qs-progress">' +
        '      <% if (progressType == "dots") { %>' +
        '        <ul class="dots-container" role="navigation">' +
        '          <% for (var i=0; i<questions.length; i++) { %>' +
        '           <li class="progress-item">' +
        '             <a href="#" ' +
        '               class="progress-dot unanswered<%' +
        '               if (disableBackwardsNavigation) { %> disabled <% } %>"' +
        '               aria-label="<%=' +
        '               texts.jumpToQuestion.replace("%d", i + 1).replace("%total", questions.length)' +
        '               + ", " + texts.unansweredText %>" tabindex="-1" ' +
        '               <% if (disableBackwardsNavigation) { %> aria-disabled="true" <% } %>' +
        '             ></a>' +
        '           </li>' +
        '          <% } %>' +
        '        </div>' +
        '      <% } else if (progressType == "textual") { %>' +
        '        <span class="progress-text"></span>' +
        '      <% } %>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    var solutionButtonTemplate = params.endGame.showSolutionButton ?
        '    <button type="button" class="h5p-joubelui-button h5p-button qs-solutionbutton"><%= solutionButtonText %></button>' :
        '';

    const retryButtonTemplate = params.endGame.showRetryButton ?
        '    <button type="button" class="h5p-joubelui-button h5p-button qs-retrybutton"><%= retryButtonText %></button>' :
        '';

    var resulttemplate =
        '<div class="questionset-results">' +
        '  <div class="greeting"><%= message %></div>' +
        '  <div class="feedback-section">' +
        '    <div class="feedback-scorebar"></div>' +
        '    <div class="feedback-text"></div>' +
        '  </div>' +
        '  <% if (comment) { %>' +
        '  <div class="result-header"><%= comment %></div>' +
        '  <% } %>' +
        '  <% if (resulttext) { %>' +
        '  <div class="result-text"><%= resulttext %></div>' +
        '  <% } %>' +
        '  <div class="buttons">' +
        solutionButtonTemplate +
        retryButtonTemplate +
        '  </div>' +
        '</div>';

    var template = new EJS({
        text: texttemplate
    });
    var endTemplate = new EJS({
        text: resulttemplate
    });

    var initialParams = $.extend(true, {}, defaults, options);
    var poolOrder; // Order of questions in a pool
    var currentQuestion = 0;
    var questionInstances = [];
    var questionOrder; //Stores order of questions to allow resuming of question set
    var $myDom;
    var scoreBar;
    var up;
    var renderSolutions = false;
    var showingSolutions = false;
    contentData = contentData || {};

    // Bring question set up to date when resuming
    if (contentData.previousState) {
        if (contentData.previousState.progress) {
            currentQuestion = contentData.previousState.progress;
        }
        questionOrder = contentData.previousState.order;
    }

    /**
     * Randomizes questions in an array and updates an array containing their order
     * @param  {array} questions
     * @return {Object.<array, array>} questionOrdering
     */
    var randomizeQuestionOrdering = function(questions) {

        // Save the original order of the questions in a multidimensional array [[question0,0],[question1,1]...
        var questionOrdering = questions.map(function(questionInstance, index) {
            return [questionInstance, index];
        });

        // Shuffle the multidimensional array
        questionOrdering = H5P.shuffleArray(questionOrdering);

        // Retrieve question objects from the first index
        questions = [];
        for (var i = 0; i < questionOrdering.length; i++) {
            questions[i] = questionOrdering[i][0];
        }

        // Retrieve the new shuffled order from the second index
        var newOrder = [];
        for (var j = 0; j < questionOrdering.length; j++) {

            // Use a previous order if it exists
            if (contentData.previousState && contentData.previousState.questionOrder) {
                newOrder[j] = questionOrder[questionOrdering[j][1]];
            } else {
                newOrder[j] = questionOrdering[j][1];
            }
        }

        // Return the questions in their new order *with* their new indexes
        return {
            questions: questions,
            questionOrder: newOrder
        };
    };

    // Create a pool (a subset) of questions if necessary
    if (params.poolSize > 0) {

        // If a previous pool exists, recreate it
        if (contentData.previousState && contentData.previousState.poolOrder) {
            poolOrder = contentData.previousState.poolOrder;

            // Recreate the pool from the saved data
            var pool = [];
            for (var i = 0; i < poolOrder.length; i++) {
                pool[i] = params.questions[poolOrder[i]];
            }

            // Replace original questions with just the ones in the pool
            params.questions = pool;
        } else { // Otherwise create a new pool
            // Randomize and get the results
            var poolResult = randomizeQuestionOrdering(params.questions);
            var poolQuestions = poolResult.questions;
            poolOrder = poolResult.questionOrder;

            // Discard extra questions

            poolQuestions = poolQuestions.slice(0, params.poolSize);
            poolOrder = poolOrder.slice(0, params.poolSize);

            // Replace original questions with just the ones in the pool
            params.questions = poolQuestions;
        }
    }

    // Create the html template for the question container
    var $template = $(template.render(params));

    // Set overrides for questions
    var override;
    if (params.override.showSolutionButton || params.override.retryButton || params.override.checkButton === false) {
        override = {};
        if (params.override.showSolutionButton) {
            // Force "Show solution" button to be on or off for all interactions
            override.enableSolutionsButton =
                (params.override.showSolutionButton === 'on' ? true : false);
        }

        if (params.override.retryButton) {
            // Force "Retry" button to be on or off for all interactions
            override.enableRetry =
                (params.override.retryButton === 'on' ? true : false);
        }

        if (params.override.checkButton === false) {
            // Force "Check" button to be on or off for all interactions
            override.enableCheckButton = params.override.checkButton;
        }
    }

    /**
     * Generates question instances from H5P objects
     *
     * @param  {object} questions H5P content types to be created as instances
     * @return {array} Array of questions instances
     */
    var createQuestionInstancesFromQuestions = function(questions) {
        var result = [];
        // Create question instances from questions
        // Instantiate question instances
        for (var i = 0; i < questions.length; i++) {

            var question;
            // If a previous order exists, use it
            if (questionOrder !== undefined) {
                question = questions[questionOrder[i]];
            } else {
                // Use a generic order when initialzing for the first time
                question = questions[i];
            }

            if (override) {
                // Extend subcontent with the overrided settings.
                $.extend(question.params.behaviour, override);
            }

            question.params = question.params || {};
            var hasAnswers = contentData.previousState && contentData.previousState.answers;
            var questionInstance = H5P.newRunnable(question, contentId, undefined, undefined, {
                previousState: hasAnswers ? contentData.previousState.answers[i] : undefined,
                parent: self
            });
            questionInstance.on('resize', function() {
                up = true;
                self.trigger('resize');
            });
            result.push(questionInstance);
        }

        return result;
    };

    // Create question instances from questions given by params
    questionInstances = createQuestionInstancesFromQuestions(params.questions);

    // Randomize questions only on instantiation
    if (params.randomQuestions && contentData.previousState === undefined) {
        var result = randomizeQuestionOrdering(questionInstances);
        questionInstances = result.questions;
        questionOrder = result.questionOrder;
    }

    // Resize all interactions on resize
    self.on('resize', function() {
        if (up) {
            // Prevent resizing the question again.
            up = false;
            return;
        }

        for (var i = 0; i < questionInstances.length; i++) {
            questionInstances[i].trigger('resize');
        }
    });

    // Update button state.
    var _updateButtons = function() {
        // Verify that current question is answered when backward nav is disabled
        if (params.disableBackwardsNavigation) {
            if (questionInstances[currentQuestion].getAnswerGiven() &&
                questionInstances.length - 1 !== currentQuestion) {
                questionInstances[currentQuestion].showButton('next');
            } else {
                questionInstances[currentQuestion].hideButton('next');
            }
        }

        var answered = true;
        for (var i = questionInstances.length - 1; i >= 0; i--) {
            answered = answered && (questionInstances[i]).getAnswerGiven();
        }

        if (currentQuestion === (params.questions.length - 1) &&
            questionInstances[currentQuestion]) {
            if (answered) {
                questionInstances[currentQuestion].showButton('finish');
            } else {
                questionInstances[currentQuestion].hideButton('finish');
            }
        }
    };

    var _stopQuestion = function(questionNumber) {
        if (questionInstances[questionNumber]) {
            pauseMedia(questionInstances[questionNumber]);
        }
    };

    var _showQuestion = function(questionNumber, preventAnnouncement) {
        // Sanitize input.
        if (questionNumber < 0) {
            questionNumber = 0;
        }
        if (questionNumber >= params.questions.length) {
            questionNumber = params.questions.length - 1;
        }

        currentQuestion = questionNumber;

        handleAutoPlay(currentQuestion);

        // Hide all questions
        $('.question-container', $myDom).hide().eq(questionNumber).show();

        if (questionInstances[questionNumber]) {
            // Trigger resize on question in case the size of the QS has changed.
            var instance = questionInstances[questionNumber];
            instance.setActivityStarted();
            if (instance.$ !== undefined) {
                instance.trigger('resize');
            }
        }

        // Update progress indicator
        // Test if current has been answered.
        if (params.progressType === 'textual') {
            $('.progress-text', $myDom).text(params.texts.textualProgress.replace("@current", questionNumber + 1).replace("@total", params.questions.length));
        } else {
            // Set currentNess
            var previousQuestion = $('.progress-dot.current', $myDom).parent().index();
            if (previousQuestion >= 0) {
                toggleCurrentDot(previousQuestion, false);
                toggleAnsweredDot(previousQuestion, questionInstances[previousQuestion].getAnswerGiven());
            }
            toggleCurrentDot(questionNumber, true);
        }

        if (!preventAnnouncement) {
            // Announce question number of total, must use timeout because of buttons logic
            setTimeout(function() {
                var humanizedProgress = params.texts.readSpeakerProgress
                    .replace('@current', (currentQuestion + 1).toString())
                    .replace('@total', questionInstances.length.toString());

                $('.qs-progress-announcer', $myDom)
                    .html(humanizedProgress)
                    .show().focus();

                if (instance && instance.readFeedback) {
                    instance.readFeedback();
                }
            }, 0);
        }

        // Remember where we are
        _updateButtons();
        self.trigger('resize');
        return currentQuestion;
    };

    /**
     * Handle autoplays, limit to one at a time
     *
     * @param {number} currentQuestionIndex
     */
    var handleAutoPlay = function(currentQuestionIndex) {
        for (var i = 0; i < questionInstances.length; i++) {
            questionInstances[i].pause();
        }

        var currentQuestion = params.questions[currentQuestionIndex];

        var hasAutoPlay = currentQuestion &&
            currentQuestion.params.media &&
            currentQuestion.params.media.params &&
            currentQuestion.params.media.params.playback &&
            currentQuestion.params.media.params.playback.autoplay;

        if (hasAutoPlay && typeof questionInstances[currentQuestionIndex].play === 'function') {
            questionInstances[currentQuestionIndex].play();
        }
    };



    /**
     * Show solutions for subcontent, and hide subcontent buttons.
     * Used for contracts with integrated content.
     * @public
     */
    var showSolutions = function() {
        showingSolutions = true;
        for (var i = 0; i < questionInstances.length; i++) {

            // Enable back and forth navigation in solution mode
            toggleDotsNavigation(true);
            if (i < questionInstances.length - 1) {
                questionInstances[i].showButton('next');
            }
            if (i > 0) {
                questionInstances[i].showButton('prev');
            }

            try {
                // Do not read answers
                questionInstances[i].toggleReadSpeaker(true);
                questionInstances[i].showSolutions();
                questionInstances[i].toggleReadSpeaker(false);
            } catch (error) {
                H5P.error("subcontent does not contain a valid showSolutions function");
                H5P.error(error);
            }
        }
    };

    /**
     * Toggles whether dots are enabled for navigation
     */
    var toggleDotsNavigation = function(enable) {
        $('.progress-dot', $myDom).each(function() {
            $(this).toggleClass('disabled', !enable);
            $(this).attr('aria-disabled', enable ? 'false' : 'true');
            // Remove tabindex
            if (!enable) {
                $(this).attr('tabindex', '-1');
            }
        });
    };

    /**
     * Resets the task and every subcontent task.
     * Used for contracts with integrated content.
     * @public
     */
    var resetTask = function() {

        // Clear previous state to ensure questions are created cleanly
        contentData.previousState = [];

        showingSolutions = false;

        for (var i = 0; i < questionInstances.length; i++) {
            try {
                questionInstances[i].resetTask();

                // Hide back and forth navigation in normal mode
                if (params.disableBackwardsNavigation) {
                    toggleDotsNavigation(false);

                    // Check if first question is answered by default
                    if (i === 0 && questionInstances[i].getAnswerGiven()) {
                        questionInstances[i].showButton('next');
                    } else {
                        questionInstances[i].hideButton('next');
                    }

                    questionInstances[i].hideButton('prev');
                }
            } catch (error) {
                H5P.error("subcontent does not contain a valid resetTask function");
                H5P.error(error);
            }
        }

        // Hide finish button
        questionInstances[questionInstances.length - 1].hideButton('finish');

        // Mark all tasks as unanswered:
        $('.progress-dot').each(function(idx) {
            toggleAnsweredDot(idx, false);
        });

        //Force the last page to be reRendered
        rendered = false;

        if (params.poolSize > 0) {

            // Make new pool from params.questions
            // Randomize and get the results
            var poolResult = randomizeQuestionOrdering(initialParams.questions);
            var poolQuestions = poolResult.questions;
            poolOrder = poolResult.questionOrder;

            // Discard extra questions
            poolQuestions = poolQuestions.slice(0, params.poolSize);
            poolOrder = poolOrder.slice(0, params.poolSize);

            // Replace original questions with just the ones in the pool
            params.questions = poolQuestions;

            // Recreate the question instances
            questionInstances = createQuestionInstancesFromQuestions(params.questions);

            // Update buttons
            initializeQuestion();

        } else if (params.randomQuestions) {
            randomizeQuestions();
        }

    };

    var rendered = false;

    this.reRender = function() {
        rendered = false;
    };

    /**
     * Randomizes question instances
     */
    var randomizeQuestions = function() {

        var result = randomizeQuestionOrdering(questionInstances);
        questionInstances = result.questions;
        questionOrder = result.questionOrder;

        replaceQuestionsInDOM(questionInstances);
    };

    /**
     * Empty the DOM of all questions, attach new questions and update buttons
     *
     * @param  {type} questionInstances Array of questions to be attached to the DOM
     */
    var replaceQuestionsInDOM = function(questionInstances) {

        // Find all question containers and detach questions from them
        $('.question-container', $myDom).each(function() {
            $(this).children().detach();
        });

        // Reattach questions and their buttons in the new order
        for (var i = 0; i < questionInstances.length; i++) {

            var question = questionInstances[i];

            // Make sure styles are not being added twice
            $('.question-container:eq(' + i + ')', $myDom).attr('class', 'question-container');

            question.attach($('.question-container:eq(' + i + ')', $myDom));

            //Show buttons if necessary
            if (questionInstances[questionInstances.length - 1] === question &&
                question.hasButton('finish')) {
                question.showButton('finish');
            }

            if (questionInstances[questionInstances.length - 1] !== question &&
                question.hasButton('next')) {
                question.showButton('next');
            }

            if (questionInstances[0] !== question &&
                question.hasButton('prev') &&
                !params.disableBackwardsNavigation) {
                question.showButton('prev');
            }

            // Hide relevant buttons since the order has changed
            if (questionInstances[0] === question) {
                question.hideButton('prev');
            }

            if (questionInstances[questionInstances.length - 1] === question) {
                question.hideButton('next');
            }

            if (questionInstances[questionInstances.length - 1] !== question) {
                question.hideButton('finish');
            }
        }
    };

    var moveQuestion = function(direction) {
        if (params.disableBackwardsNavigation && !questionInstances[currentQuestion].getAnswerGiven()) {
            questionInstances[currentQuestion].hideButton('next');
            questionInstances[currentQuestion].hideButton('finish');
            return;
        }

        _stopQuestion(currentQuestion);
        if (currentQuestion + direction >= questionInstances.length) {
            _displayEndGame();
        } else {
            // Allow movement if backward navigation enabled or answer given
            _showQuestion(currentQuestion + direction);
        }
    };

    /**
     * Toggle answered state of dot at given index
     * @param {number} dotIndex Index of dot
     * @param {boolean} isAnswered True if is answered, False if not answered
     */
    var toggleAnsweredDot = function(dotIndex, isAnswered) {
        var $el = $('.progress-dot:eq(' + dotIndex + ')', $myDom);

        // Skip current button
        if ($el.hasClass('current')) {
            return;
        }

        // Ensure boolean
        isAnswered = !!isAnswered;

        var label = params.texts.jumpToQuestion
            .replace('%d', (dotIndex + 1).toString())
            .replace('%total', $('.progress-dot', $myDom).length) +
            ', ' +
            (isAnswered ? params.texts.answeredText : params.texts.unansweredText);

        $el.toggleClass('unanswered', !isAnswered)
            .toggleClass('answered', isAnswered)
            .attr('aria-label', label);
    };

    /**
     * Toggle current state of dot at given index
     * @param dotIndex
     * @param isCurrent
     */
    var toggleCurrentDot = function(dotIndex, isCurrent) {
        var $el = $('.progress-dot:eq(' + dotIndex + ')', $myDom);
        var texts = params.texts;
        var label = texts.jumpToQuestion
            .replace('%d', (dotIndex + 1).toString())
            .replace('%total', $('.progress-dot', $myDom).length);

        if (!isCurrent) {
            var isAnswered = $el.hasClass('answered');
            label += ', ' + (isAnswered ? texts.answeredText : texts.unansweredText);
        } else {
            label += ', ' + texts.currentQuestionText;
        }

        var disabledTabindex = params.disableBackwardsNavigation && !showingSolutions;
        $el.toggleClass('current', isCurrent)
            .attr('aria-label', label)
            .attr('tabindex', isCurrent && !disabledTabindex ? 0 : -1);
    };

    var _displayEndGame = function() {
        $('.progress-dot.current', $myDom).removeClass('current');
        if (rendered) {
            $myDom.children().hide().filter('.questionset-results').show();
            self.trigger('resize');
            return;
        }
        //Remove old score screen.
        $myDom.children().hide().filter('.questionset-results').remove();
        rendered = true;

        // Get total score.
        var finals = self.getScore();
        var totals = self.getMaxScore();

        var scoreString = H5P.Question.determineOverallFeedback(params.endGame.overallFeedback, finals / totals).replace('@score', finals).replace('@total', totals);
        var success = ((100 * finals / totals) >= params.passPercentage);

        /**
         * Makes our buttons behave like other buttons.
         *
         * @private
         * @param {string} classSelector
         * @param {function} handler
         */
        var hookUpButton = function(classSelector, handler) {
            $(classSelector, $myDom).click(handler).keypress(function(e) {
                if (e.which === 32) {
                    handler();
                    e.preventDefault();
                }
            });
        };

        var displayResults = function() {
            self.triggerXAPICompleted(self.getScore(), self.getMaxScore(), success);

            var eparams = {
                message: params.endGame.showResultPage ? params.endGame.message : params.endGame.noResultMessage,
                comment: params.endGame.showResultPage ? (success ? params.endGame.oldFeedback.successGreeting : params.endGame.oldFeedback.failGreeting) : undefined,
                resulttext: params.endGame.showResultPage ? (success ? params.endGame.oldFeedback.successComment : params.endGame.oldFeedback.failComment) : undefined,
                finishButtonText: params.endGame.finishButtonText,
                solutionButtonText: params.endGame.solutionButtonText,
                retryButtonText: params.endGame.retryButtonText
            };

            // Show result page.
            $myDom.children().hide();
            $myDom.append(endTemplate.render(eparams));

            if (params.endGame.showResultPage) {
                hookUpButton('.qs-solutionbutton', function() {
                    showSolutions();
                    $myDom.children().hide().filter('.questionset').show();
                    _showQuestion(params.initialQuestion);
                });
                hookUpButton('.qs-retrybutton', function() {
                    resetTask();
                    $myDom.children().hide();

                    var $intro = $('.intro-page', $myDom);
                    if ($intro.length) {
                        // Show intro
                        $('.intro-page', $myDom).show();
                        $('.qs-startbutton', $myDom).focus();
                    } else {
                        // Show first question
                        $('.questionset', $myDom).show();
                        _showQuestion(params.initialQuestion);
                    }
                });

                if (scoreBar === undefined) {
                    scoreBar = H5P.JoubelUI.createScoreBar(totals);
                }
                scoreBar.appendTo($('.feedback-scorebar', $myDom));
                $('.feedback-text', $myDom).html(scoreString);

                // Announce that the question set is complete
                setTimeout(function() {
                    $('.qs-progress-announcer', $myDom)
                        .html(eparams.message + '.' +
                            scoreString + '.' +
                            eparams.comment + '.' +
                            eparams.resulttext)
                        .show().focus();
                    scoreBar.setMaxScore(totals);
                    scoreBar.setScore(finals);
                }, 0);
            } else {
                // Remove buttons and feedback section
                $('.qs-solutionbutton, .qs-retrybutton, .feedback-section', $myDom).remove();
            }

            self.trigger('resize');
        };

        if (params.endGame.showAnimations) {
            var videoData = success ? params.endGame.successVideo : params.endGame.failVideo;
            if (videoData) {
                $myDom.children().hide();
                var $videoContainer = $('<div class="video-container"></div>').appendTo($myDom);

                var video = new H5P.Video({
                    sources: videoData,
                    fitToWrapper: true,
                    controls: false,
                    autoplay: false
                }, contentId);
                video.on('stateChange', function(event) {
                    if (event.data === H5P.Video.ENDED) {
                        displayResults();
                        $videoContainer.hide();
                    }
                });
                video.attach($videoContainer);
                // Resize on video loaded
                video.on('loaded', function() {
                    self.trigger('resize');
                });
                video.play();

                if (params.endGame.skippable) {
                    $('<a class="h5p-joubelui-button h5p-button skip">' + params.endGame.skipButtonText + '</a>').click(function() {
                        video.pause();
                        $videoContainer.hide();
                        displayResults();
                    }).appendTo($videoContainer);
                }

                return;
            }
        }
        // Trigger finished event.
        displayResults();
        self.trigger('resize');
    };

    var registerImageLoadedListener = function(question) {
        H5P.on(question, 'imageLoaded', function() {
            self.trigger('resize');
        });
    };

    /**
     * Initialize a question and attach it to the DOM
     *
     */
    function initializeQuestion() {
        // Attach questions
        for (var i = 0; i < questionInstances.length; i++) {
            var question = questionInstances[i];

            // Make sure styles are not being added twice
            $('.question-container:eq(' + i + ')', $myDom).attr('class', 'question-container');

            question.attach($('.question-container:eq(' + i + ')', $myDom));

            // Listen for image resize
            registerImageLoadedListener(question);

            // Add finish button
            question.addButton('finish', params.texts.finishButton,
                moveQuestion.bind(this, 1), false);

            // Add next button
            question.addButton('next', '', moveQuestion.bind(this, 1),
                !params.disableBackwardsNavigation || !!question.getAnswerGiven(), {
                    href: '#', // Use href since this is a navigation button
                    'aria-label': params.texts.nextButton
                });

            // Add previous button
            question.addButton('prev', '', moveQuestion.bind(this, -1),
                !(questionInstances[0] === question || params.disableBackwardsNavigation), {
                    href: '#', // Use href since this is a navigation button
                    'aria-label': params.texts.prevButton
                });

            // Hide next button if it is the last question
            if (questionInstances[questionInstances.length - 1] === question) {
                question.hideButton('next');
            }

            question.on('xAPI', function(event) {
                var shortVerb = event.getVerb();
                if (shortVerb === 'interacted' ||
                    shortVerb === 'answered' ||
                    shortVerb === 'attempted') {
                    toggleAnsweredDot(currentQuestion,
                        questionInstances[currentQuestion].getAnswerGiven());
                    _updateButtons();
                }
                if (shortVerb === 'completed') {
                    // An activity within this activity is not allowed to send completed events
                    event.setVerb('answered');
                }
                if (event.data.statement.context.extensions === undefined) {
                    event.data.statement.context.extensions = {};
                }
                event.data.statement.context.extensions['http://id.tincanapi.com/extension/ending-point'] = currentQuestion + 1;
            });

            // Mark question if answered
            toggleAnsweredDot(i, question.getAnswerGiven());
        }
    }

    this.attach = function(target) {
        if (this.isRoot()) {
            this.setActivityStarted();
        }
        if (typeof(target) === "string") {
            $myDom = $('#' + target);
        } else {
            $myDom = $(target);
        }

        // Render own DOM into target.
        $myDom.children().remove();
        $myDom.append($template);
        if (params.backgroundImage !== undefined) {
            $myDom.css({
                overflow: 'hidden',
                background: '#fff url("' + H5P.getPath(params.backgroundImage.path, contentId) + '") no-repeat 50% 50%',
                backgroundSize: '100% auto'
            });
        }

        if (params.introPage.backgroundImage !== undefined) {
            var $intro = $myDom.find('.intro-page');
            if ($intro.length) {
                var bgImg = params.introPage.backgroundImage;
                var bgImgRatio = (bgImg.height / bgImg.width);
                $intro.css({
                    background: '#fff url("' + H5P.getPath(bgImg.path, contentId) + '") no-repeat 50% 50%',
                    backgroundSize: 'auto 100%',
                    minHeight: bgImgRatio * +window.getComputedStyle($intro[0]).width.replace('px', '')
                });
            }
        }

        initializeQuestion();

        // Allow other libraries to add transitions after the questions have been inited
        $('.questionset', $myDom).addClass('started');

        $('.qs-startbutton', $myDom)
            .click(function() {
                $(this).parents('.intro-page').hide();
                $('.questionset', $myDom).show();
                _showQuestion(params.initialQuestion);
                event.preventDefault();
            })
            .keydown(function(event) {
                switch (event.which) {
                    case 13: // Enter
                    case 32: // Space
                        $(this).parents('.intro-page').hide();
                        $('.questionset', $myDom).show();
                        _showQuestion(params.initialQuestion);
                        event.preventDefault();
                }
            });

        /**
         * Triggers changing the current question.
         *
         * @private
         * @param {Object} [event]
         */
        var handleProgressDotClick = function(event) {
            // Disable dots when backward nav disabled
            event.preventDefault();
            if (params.disableBackwardsNavigation && !showingSolutions) {
                return;
            }
            _stopQuestion(currentQuestion);
            _showQuestion($(this).parent().index());
        };

        // Set event listeners.
        $('.progress-dot', $myDom).click(handleProgressDotClick).keydown(function(event) {
            var $this = $(this);
            switch (event.which) {
                case 13: // Enter
                case 32: // Space
                    handleProgressDotClick.call(this, event);
                    break;

                case 37: // Left Arrow
                case 38: // Up Arrow
                    // Go to previous dot
                    var $prev = $this.parent().prev();
                    if ($prev.length) {
                        $prev.children('a').attr('tabindex', '0').focus();
                        $this.attr('tabindex', '-1');
                    }
                    break;

                case 39: // Right Arrow
                case 40: // Down Arrow
                    // Go to next dot
                    var $next = $this.parent().next();
                    if ($next.length) {
                        $next.children('a').attr('tabindex', '0').focus();
                        $this.attr('tabindex', '-1');
                    }
                    break;
            }
        });



        // Hide all but current question
        _showQuestion(currentQuestion, true);

        if (renderSolutions) {
            showSolutions();
        }
        // Update buttons in case they have changed (restored user state)
        _updateButtons();

        this.trigger('resize');

        return this;
    };

    // Get current score for questionset.
    this.getScore = function() {
        var score = 0;
        for (var i = questionInstances.length - 1; i >= 0; i--) {
            score += questionInstances[i].getScore();
        }
        return score;
    };

    // Get total score possible for questionset.
    this.getMaxScore = function() {
        var score = 0;
        for (var i = questionInstances.length - 1; i >= 0; i--) {
            score += questionInstances[i].getMaxScore();
        }
        return score;
    };

    /**
     * @deprecated since version 1.9.2
     * @returns {number}
     */
    this.totalScore = function() {
        return this.getMaxScore();
    };

    /**
     * Gather copyright information for the current content.
     *
     * @returns {H5P.ContentCopyrights}
     */
    this.getCopyrights = function() {
        var info = new H5P.ContentCopyrights();

        // IntroPage Background
        if (params.introPage !== undefined && params.introPage.backgroundImage !== undefined && params.introPage.backgroundImage.copyright !== undefined) {
            var introBackground = new H5P.MediaCopyright(params.introPage.backgroundImage.copyright);
            introBackground.setThumbnail(new H5P.Thumbnail(H5P.getPath(params.introPage.backgroundImage.path, contentId), params.introPage.backgroundImage.width, params.introPage.backgroundImage.height));
            info.addMedia(introBackground);
        }

        // Background
        if (params.backgroundImage !== undefined && params.backgroundImage.copyright !== undefined) {
            var background = new H5P.MediaCopyright(params.backgroundImage.copyright);
            background.setThumbnail(new H5P.Thumbnail(H5P.getPath(params.backgroundImage.path, contentId), params.backgroundImage.width, params.backgroundImage.height));
            info.addMedia(background);
        }

        // Questions
        var questionCopyrights;
        for (var i = 0; i < questionInstances.length; i++) {
            var instance = questionInstances[i];
            var instanceParams = params.questions[i].params;

            questionCopyrights = undefined;

            if (instance.getCopyrights !== undefined) {
                // Use the instance's own copyright generator
                questionCopyrights = instance.getCopyrights();
            }
            if (questionCopyrights === undefined) {
                // Create a generic flat copyright list
                questionCopyrights = new H5P.ContentCopyrights();
                H5P.findCopyrights(questionCopyrights, instanceParams.params, contentId, {
                    metadata: instanceParams.metadata,
                    machineName: instanceParams.library.split(' ')[0]
                });
            }

            // Determine label
            var label = (params.texts.questionLabel + ' ' + (i + 1));
            if (instanceParams.params.contentName !== undefined) {
                label += ': ' + instanceParams.params.contentName;
            } else if (instance.getTitle !== undefined) {
                label += ': ' + instance.getTitle();
            }
            questionCopyrights.setLabel(label);

            // Add info
            info.addContent(questionCopyrights);
        }

        // Success video
        var video;
        if (params.endGame.successVideo !== undefined && params.endGame.successVideo.length > 0) {
            video = params.endGame.successVideo[0];
            if (video.copyright !== undefined) {
                info.addMedia(new H5P.MediaCopyright(video.copyright));
            }
        }

        // Fail video
        if (params.endGame.failVideo !== undefined && params.endGame.failVideo.length > 0) {
            video = params.endGame.failVideo[0];
            if (video.copyright !== undefined) {
                info.addMedia(new H5P.MediaCopyright(video.copyright));
            }
        }

        return info;
    };
    this.getQuestions = function() {
        return questionInstances;
    };
    this.showSolutions = function() {
        renderSolutions = true;
    };

    /**
     * Stop the given element's playback if any.
     *
     * @param {object} instance
     */
    var pauseMedia = function(instance) {
        try {
            if (instance.pause !== undefined &&
                (instance.pause instanceof Function ||
                    typeof instance.pause === 'function')) {
                instance.pause();
            }
        } catch (err) {
            // Prevent crashing, log error.
            H5P.error(err);
        }
    };

    /**
     * Returns the complete state of question set and sub-content
     *
     * @returns {Object} current state
     */
    this.getCurrentState = function() {
        return {
            progress: showingSolutions ? questionInstances.length - 1 : currentQuestion,
            answers: questionInstances.map(function(qi) {
                return qi.getCurrentState();
            }),
            order: questionOrder,
            poolOrder: poolOrder
        };
    };

    /**
     * Generate xAPI object definition used in xAPI statements.
     * @return {Object}
     */
    var getxAPIDefinition = function() {
        var definition = {};

        definition.interactionType = 'compound';
        definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
        definition.description = {
            'en-US': ''
        };

        return definition;
    };

    /**
     * Add the question itself to the definition part of an xAPIEvent
     */
    var addQuestionToXAPI = function(xAPIEvent) {
        var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
        $.extend(definition, getxAPIDefinition());
    };

    /**
     * Get xAPI data from sub content types
     *
     * @param {Object} metaContentType
     * @returns {array}
     */
    var getXAPIDataFromChildren = function(metaContentType) {
        return metaContentType.getQuestions().map(function(question) {
            return question.getXAPIData();
        });
    };

    /**
     * Get xAPI data.
     * Contract used by report rendering engine.
     *
     * @see contract at {@link https://h5p.org/documentation/developers/contracts#guides-header-6}
     */
    this.getXAPIData = function() {
        var xAPIEvent = this.createXAPIEventTemplate('answered');
        addQuestionToXAPI(xAPIEvent);
        xAPIEvent.setScoredResult(this.getScore(),
            this.getMaxScore(),
            this,
            true,
            this.getScore() === this.getMaxScore()
        );
        return {
            statement: xAPIEvent.data.statement,
            children: getXAPIDataFromChildren(this)
        };
    };
};

H5P.QuestionSet.prototype = Object.create(H5P.EventDispatcher.prototype);
H5P.QuestionSet.prototype.constructor = H5P.QuestionSet;