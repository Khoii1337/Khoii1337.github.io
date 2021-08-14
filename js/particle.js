+ function() {
	"use strict";

	function e(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}

	function t(e, t) {
		if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !t || "object" != typeof t && "function" != typeof t ? e : t
	}

	function i(e, t) {
		if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
		e.prototype = Object.create(t && t.prototype, {
			constructor: {
				value: e,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
	}

	function n(e, t, i) {
		for (; e = e.offsetParent;)
			if (x(e, t) === i) return !0;
		return !1
	}
	var a = function() {
			function e(e, t) {
				for (var i = 0; i < t.length; i++) {
					var n = t[i];
					n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
				}
			}
			return function(t, i, n) {
				return i && e(t.prototype, i), n && e(t, n), t
			}
		}(),
		o = JParticles,
		r = o.utils,
		s = o.Base,
		l = Math.random,
		f = Math.abs,
		c = Math.PI,
		u = Math.floor,
		h = 2 * c,
		p = r.pInt,
		v = r.limitRandom,
		m = r.calcSpeed,
		y = r.scaleValue,
		x = r.getCss,
		d = r.offset,
		O = r.isElement,
		b = (r.isFunction, r.isNull),
		g = r.on,
		w = r.off,
		E = r.orientationSupport,
		X = r.resize,
		Y = r.defineReadOnlyProperty,
		k = function(o) {
			function r(i, n) {
				return e(this, r), t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, r, i, n))
			}
			return i(r, o), a(r, [{
				key: "version",
				get: function() {
					return "2.0.0"
				}
			}]), a(r, [{
				key: "init",
				value: function() {
					this.attrNormalize(), this.set.range > 0 && (this.positionX = l() * this.cw, this.positionY = l() * this.ch, this.defineLineShape(), this.positionEvent()), this.mouseX = this.mouseY = 0, this.createDots(), this.draw(), this.parallaxEvent()
				}
			}, {
				key: "attrNormalize",
				value: function() {
					var e = this.cw,
						t = this.set;
					["num", "proximity", "range"].forEach(function(i) {
						t[i] = p(y(t[i], e))
					}), O(t.eventElem) || t.eventElem === document || (t.eventElem = this.c)
				}
			}, {
				key: "defineLineShape",
				value: function() {
					var e = this,
						t = this.set,
						i = t.proximity,
						n = t.range,
						a = t.lineShape;
					switch (a) {
						case "cube":
							this.lineShapeMaker = function(t, a, o, r, s) {
								var l = e.positionX,
									c = e.positionY;
								f(t - o) <= i && f(a - r) <= i && f(t - l) <= n && f(a - c) <= n && f(o - l) <= n && f(r - c) <= n && s()
							};
							break;
						default:
							this.lineShapeMaker = function(t, a, o, r, s) {
								var l = e.positionX,
									c = e.positionY;
								f(t - o) <= i && f(a - r) <= i && (f(t - l) <= n && f(a - c) <= n || f(o - l) <= n && f(r - c) <= n) && s()
							}
					}
				}
			}, {
				key: "createDots",
				value: function() {
					for (var e = this.cw, t = this.ch, i = this.color, n = this.set, a = n.num, o = n.maxR, r = n.minR, s = n.maxSpeed, f = n.minSpeed, c = n.parallaxLayer, h = c.length, p = this.dots = []; a--;) {
						var y = v(o, r);
						p.push({
							r: y,
							x: v(e - y, y),
							y: v(t - y, y),
							vx: m(s, f),
							vy: m(s, f),
							color: i(),
							parallaxLayer: c[u(l() * h)],
							parallaxOffsetX: 0,
							parallaxOffsetY: 0
						})
					}
				}
			}, {
				key: "draw",
				value: function() {
					var e = this.cw,
						t = this.ch,
						i = this.cxt,
						n = this.set,
						a = n.range,
						o = n.lineWidth,
						r = n.opacity;
					i.clearRect(0, 0, e, t), i.lineWidth = o, i.globalAlpha = r, this.updateXY(), this.dots.forEach(function(e) {
						var t = e.x,
							n = e.y,
							a = e.r,
							o = e.parallaxOffsetX,
							r = e.parallaxOffsetY;
						i.save(), i.beginPath(), i.arc(t + o, n + r, a, 0, h), i.fillStyle = e.color, i.fill(), i.restore()
					}), a > 0 && this.connectDots(), this.requestAnimationFrame()
				}
			}, {
				key: "connectDots",
				value: function() {
					var e = this.dots,
						t = this.cxt,
						i = this.lineShapeMaker,
						n = e.length;
					e.forEach(function(a, o) {
						for (var r = a.x + a.parallaxOffsetX, s = a.y + a.parallaxOffsetY, l = function() {
								var n = e[o],
									l = n.x + n.parallaxOffsetX,
									f = n.y + n.parallaxOffsetY;
								i(r, s, l, f, function() {
									t.save(), t.beginPath(), t.moveTo(r, s), t.lineTo(l, f), t.strokeStyle = a.color, t.stroke(), t.restore()
								})
							}; ++o < n;) l()
					})
				}
			}, {
				key: "updateXY",
				value: function() {
					var e = this.paused,
						t = this.mouseX,
						i = this.mouseY,
						n = this.cw,
						a = this.ch,
						o = this.set,
						r = o.parallax,
						s = o.parallaxStrength;
					this.dots.forEach(function(o) {
						if (!e) {
							if (r) {
								var l = s * o.parallaxLayer;
								o.parallaxOffsetX += (t / l - o.parallaxOffsetX) / 10, o.parallaxOffsetY += (i / l - o.parallaxOffsetY) / 10
							}
							o.x += o.vx, o.y += o.vy;
							var c = o.x,
								u = o.y,
								h = o.r,
								p = o.parallaxOffsetX,
								v = o.parallaxOffsetY;
							c += p, u += v, c + h >= n ? o.vx = -f(o.vx) : c - h <= 0 && (o.vx = f(o.vx)), u + h >= a ? o.vy = -f(o.vy) : u - h <= 0 && (o.vy = f(o.vy))
						}
					})
				}
			}, {
				key: "setElemOffset",
				value: function() {
					return this.elemOffset = this.set.eventElem === document ? null : d(this.set.eventElem)
				}
			}, {
				key: "proxyEvent",
				value: function(e, t) {
					var i = this,
						a = this.set.eventElem,
						o = null;
					E && (o = function(e) {
						i.paused || b(e.beta) || t(Math.min(Math.max(e.beta, -90), 90), e.gamma)
					}, g(window, "deviceorientation", o));
					var r = function(t) {
						if (!i.paused) {
							var o = t.pageX,
								r = t.pageY;
							i.setElemOffset() && (n(a, "position", "fixed") && (o = t.clientX, r = t.clientY), o -= i.elemOffset.left, r -= i.elemOffset.top), e(o, r)
						}
					};
					g(a, "mousemove", r), this.onDestroy(function() {
						w(a, "mousemove", r), w(window, "deviceorientation", o)
					})
				}
			}, {
				key: "positionEvent",
				value: function() {
					var e = this,
						t = this.set.range;
					t > this.cw && t > this.ch || this.proxyEvent(function(t, i) {
						e.positionX = t, e.positionY = i
					}, function(t, i) {
						e.positionY = -(t - 90) / 180 * e.ch, e.positionX = -(i - 90) / 180 * e.cw
					})
				}
			}, {
				key: "parallaxEvent",
				value: function() {
					var e = this;
					this.set.parallax && this.proxyEvent(function(t, i) {
						e.mouseX = t - e.cw / 2, e.mouseY = i - e.ch / 2
					}, function(t, i) {
						e.mouseX = -i * e.cw / 180, e.mouseY = -t * e.ch / 180
					})
				}
			}, {
				key: "resize",
				value: function() {
					var e = this;
					X(this, function(t, i) {
						e.set.range > 0 && (e.positionX *= t, e.positionY *= i, e.mouseX *= t, e.mouseY *= i)
					})
				}
			}]), r
		}(s);
	k.defaultConfig = {
		num: .12,
		maxR: 2.4,
		minR: .6,
		maxSpeed: 1,
		minSpeed: .1,
		proximity: .2,
		range: .2,
		lineWidth: .2,
		lineShape: "spider",
		eventElem: null,
		parallax: !1,
		parallaxLayer: [1, 2, 3],
		parallaxStrength: 3
	}, Y(k, "particle")
}();
