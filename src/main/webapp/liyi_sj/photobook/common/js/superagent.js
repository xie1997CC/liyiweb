! function(t, e) {
	"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.superagent = e() : t.superagent = e()
}(this, function() {
	return function(t) {
		function e(n) {
			if(r[n]) return r[n].exports;
			var i = r[n] = {
				exports: {},
				id: n,
				loaded: !1
			};
			return t[n].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
		}
		var r = {};
		return e.m = t, e.c = r, e.p = "", e(0)
	}([function(t, e, r) {
		function n() {}

		function i(t) {
			var e = {}.toString.call(t);
			switch(e) {
				case "[object File]":
				case "[object Blob]":
				case "[object FormData]":
					return !0;
				default:
					return !1
			}
		}

		function s(t) {
			return t === Object(t)
		}

		function o(t) {
			if(!s(t)) return t;
			var e = [];
			for(var r in t) null != t[r] && e.push(encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
			return e.join("&")
		}

		function a(t) {
			for(var e, r, n = {}, i = t.split("&"), s = 0, o = i.length; o > s; ++s) r = i[s], e = r.split("="), n[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
			return n
		}

		function h(t) {
			var e, r, n, i, s = t.split(/\r?\n/),
				o = {};
			s.pop();
			for(var a = 0, h = s.length; h > a; ++a) r = s[a], e = r.indexOf(":"), n = r.slice(0, e).toLowerCase(), i = v(r.slice(e + 1)), o[n] = i;
			return o
		}

		function u(t) {
			return t.split(/ *; */).shift()
		}

		function c(t) {
			return y(t.split(/ *; */), function(t, e) {
				var r = e.split(/ *= */),
					n = r.shift(),
					i = r.shift();
				return n && i && (t[n] = i), t
			}, {})
		}

		function p(t, e) {
			e = e || {}, this.req = t, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method &&("" === this.xhr.responseType || "text" === this.xhr.responseType)
			|| "undefined" == typeof this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText, this.setStatusProperties(this.xhr.status), 
			this.header = this.headers = h(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this.setHeaderProperties(this.header), 
			this.body = "HEAD" != this.req.method ? this.parseBody(this.text ? this.text : this.xhr.response) : null
		}

		function l(t, e) {
			var r = this;
			d.call(this), this._query = this._query || [], this.method = t, this.url = e, this.header = {}, this._header = {}, this.on("end", function() {
				var t = null,
					e = null;
				try {
					e = new p(r)
				} catch(n) {
					return t = new Error("Parser is unable to parse the response"), t.parse = !0, t.original = n, r.callback(t)
				}
				if(r.emit("response", e), t) return r.callback(t, e);
				if(e.status >= 200 && e.status < 300) return r.callback(t, e);
				var i = new Error(e.statusText || "Unsuccessful HTTP response");
				i.original = t, i.response = e, i.status = e.status, r.callback(i, e)
			})
		}

		function f(t, e) {
			return "function" == typeof e ? new l("GET", t).end(e) : 1 == arguments.length ? new l("GET", t) : new l(t, e)
		}
		var d = r(1),
			y = r(2),
			m = "undefined" == typeof window ? this || self : window;
		f.getXHR = function() {
			if(!(!m.XMLHttpRequest || m.location && "file:" == m.location.protocol && m.ActiveXObject)) return new XMLHttpRequest;
			try {
				return new ActiveXObject("Microsoft.XMLHTTP")
			} catch(t) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0")
			} catch(t) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0")
			} catch(t) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP")
			} catch(t) {}
			return !1
		};
		var v = "".trim ? function(t) {
			return t.trim()
		} : function(t) {
			return t.replace(/(^\s*|\s*$)/g, "")
		};
		f.serializeObject = o, f.parseString = a, f.types = {
			html: "text/html",
			json: "application/json",
			xml: "application/xml",
			urlencoded: "application/x-www-form-urlencoded",
			form: "application/x-www-form-urlencoded",
			"form-data": "application/x-www-form-urlencoded"
		}, f.serialize = {
			"application/x-www-form-urlencoded": o,
			"application/json": JSON.stringify
		}, f.parse = {
			"application/x-www-form-urlencoded": a,
			"application/json": JSON.parse
		}, p.prototype.get = function(t) {
			return this.header[t.toLowerCase()]
		}, p.prototype.setHeaderProperties = function(t) {
			var e = this.header["content-type"] || "";
			this.type = u(e);
			var r = c(e);
			for(var n in r) this[n] = r[n]
		}, p.prototype.parseBody = function(t) {
			var e = f.parse[this.type];
			return e && t && (t.length || t instanceof Object) ? e(t) : null
		}, p.prototype.setStatusProperties = function(t) {
			1223 === t && (t = 204);
			var e = t / 100 | 0;
			this.status = this.statusCode = t, this.statusType = e, this.info = 1 == e, this.ok = 2 == e, this.clientError = 4 == e, this.serverError = 5 == e, 
			this.error = 4 == e || 5 == e ? this.toError() : !1, this.accepted = 202 == t, this.noContent = 204 == t, this.badRequest = 400 == t, 
			this.unauthorized = 401 == t, this.notAcceptable = 406 == t, this.notFound = 404 == t, this.forbidden = 403 == t
		}, p.prototype.toError = function() {
			var t = this.req,
				e = t.method,
				r = t.url,
				n = "cannot " + e + " " + r + " (" + this.status + ")",
				i = new Error(n);
			return i.status = this.status, i.method = e, i.url = r, i
		}, f.Response = p, d(l.prototype), l.prototype.use = function(t) {
			return t(this), this
		}, l.prototype.timeout = function(t) {
			return this._timeout = t, this
		}, l.prototype.clearTimeout = function() {
			return this._timeout = 0, clearTimeout(this._timer), this
		}, l.prototype.abort = function() {
			return this.aborted ? void 0 : (this.aborted = !0, this.xhr.abort(), this.clearTimeout(), this.emit("abort"), this)
		}, l.prototype.set = function(t, e) {
			if(s(t)) {
				for(var r in t) this.set(r, t[r]);
				return this
			}
			return this._header[t.toLowerCase()] = e, this.header[t] = e, this
		}, l.prototype.unset = function(t) {
			return delete this._header[t.toLowerCase()], delete this.header[t], this
		}, l.prototype.getHeader = function(t) {
			return this._header[t.toLowerCase()]
		}, l.prototype.type = function(t) {
			return this.set("Content-Type", f.types[t] || t), this
		}, l.prototype.accept = function(t) {
			return this.set("Accept", f.types[t] || t), this
		}, l.prototype.auth = function(t, e) {
			var r = btoa(t + ":" + e);
			return this.set("Authorization", "Basic " + r), this
		}, l.prototype.query = function(t) {
			return "string" != typeof t && (t = o(t)), t && this._query.push(t), this
		}, l.prototype.field = function(t, e) {
			return this._formData || (this._formData = new m.FormData), this._formData.append(t, e), this
		}, l.prototype.attach = function(t, e, r) {
			return this._formData || (this._formData = new m.FormData), this._formData.append(t, e, r), this
		}, l.prototype.send = function(t) {
			var e = s(t),
				r = this.getHeader("Content-Type");
			if(e && s(this._data))
				for(var n in t) this._data[n] = t[n];
			else "string" == typeof t ? (r || this.type("form"), r = this.getHeader("Content-Type"), 
			"application/x-www-form-urlencoded" == r ? this._data = this._data ? this._data + "&" + t : t : this._data = (this._data || "") + t) : this._data = t;
			return !e || i(t) ? this : (r || this.type("json"), this)
		}, l.prototype.callback = function(t, e) {
			var r = this._callback;
			this.clearTimeout(), r(t, e)
		}, l.prototype.crossDomainError = function() {
			var t = new Error("Origin is not allowed by Access-Control-Allow-Origin");
			t.crossDomain = !0, this.callback(t)
		}, l.prototype.timeoutError = function() {
			var t = this._timeout,
				e = new Error("timeout of " + t + "ms exceeded");
			e.timeout = t, this.callback(e)
		}, l.prototype.withCredentials = function() {
			return this._withCredentials = !0, this
		}, l.prototype.end = function(t) {
			var e = this,
				r = this.xhr = f.getXHR(),
				s = this._query.join("&"),
				o = this._timeout,
				a = this._formData || this._data;
			this._callback = t || n, r.onreadystatechange = function() {
				if(4 == r.readyState) {
					var t;
					try {
						t = r.status
					} catch(n) {
						t = 0
					}
					if(0 == t) {
						if(e.timedout) return e.timeoutError();
						if(e.aborted) return;
						return e.crossDomainError()
					}
					e.emit("end")
				}
			};
			var h = function(t) {
				t.total > 0 && (t.percent = t.loaded / t.total * 100), e.emit("progress", t)
			};
			this.hasListeners("progress") && (r.onprogress = h);
			try {
				r.upload && this.hasListeners("progress") && (r.upload.onprogress = h)
			} catch(u) {}
			if(o && !this._timer && (this._timer = setTimeout(function() {
					e.timedout = !0, e.abort()
				}, o)), s && (s = f.serializeObject(s), this.url += ~this.url.indexOf("?") ? "&" + s : "?" + s), r.open(this.method, this.url, !0), this._withCredentials && (r.withCredentials = !0),
				"GET" != this.method && "HEAD" != this.method && "string" != typeof a && !i(a)) {
				var c = this.getHeader("Content-Type"),
					p = f.serialize[c ? c.split(";")[0] : ""];
				p && (a = p(a))
			}
			for(var l in this.header) null != this.header[l] && r.setRequestHeader(l, this.header[l]);
			return this.emit("request", this), r.send(a), this
		}, l.prototype.then = function(t, e) {
			return this.end(function(r, n) {
				r ? e(r) : t(n)
			})
		}, f.Request = l, f.get = function(t, e, r) {
			var n = f("GET", t);
			return "function" == typeof e && (r = e, e = null), e && n.query(e), r && n.end(r), n
		}, f.head = function(t, e, r) {
			var n = f("HEAD", t);
			return "function" == typeof e && (r = e, e = null), e && n.send(e), r && n.end(r), n
		}, f.del = function(t, e) {
			var r = f("DELETE", t);
			return e && r.end(e), r
		}, f.patch = function(t, e, r) {
			var n = f("PATCH", t);
			return "function" == typeof e && (r = e, e = null), e && n.send(e), r && n.end(r), n
		}, f.post = function(t, e, r) {
			var n = f("POST", t);
			return "function" == typeof e && (r = e, e = null), e && n.send(e), r && n.end(r), n
		}, f.put = function(t, e, r) {
			var n = f("PUT", t);
			return "function" == typeof e && (r = e, e = null), e && n.send(e), r && n.end(r), n
		}, t.exports = f
	}, function(t, e) {
		function r(t) {
			return t ? n(t) : void 0
		}

		function n(t) {
			for(var e in r.prototype) t[e] = r.prototype[e];
			return t
		}
		t.exports = r, r.prototype.on = r.prototype.addEventListener = function(t, e) {
			return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
		}, r.prototype.once = function(t, e) {
			function r() {
				n.off(t, r), e.apply(this, arguments)
			}
			var n = this;
			return this._callbacks = this._callbacks || {}, r.fn = e, this.on(t, r), this
		}, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, e) {
			if(this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
			var r = this._callbacks[t];
			if(!r) return this;
			if(1 == arguments.length) return delete this._callbacks[t], this;
			for(var n, i = 0; i < r.length; i++)
				if(n = r[i], n === e || n.fn === e) {
					r.splice(i, 1);
					break
				}
			return this
		}, r.prototype.emit = function(t) {
			this._callbacks = this._callbacks || {};
			var e = [].slice.call(arguments, 1),
				r = this._callbacks[t];
			if(r) {
				r = r.slice(0);
				for(var n = 0, i = r.length; i > n; ++n) r[n].apply(this, e)
			}
			return this
		}, r.prototype.listeners = function(t) {
			return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
		}, r.prototype.hasListeners = function(t) {
			return !!this.listeners(t).length
		}
	}, function(t, e) {
		t.exports = function(t, e, r) {
			for(var n = 0, i = t.length, s = 3 == arguments.length ? r : t[n++]; i > n;) s = e.call(null, s, t[n], ++n, t);
			return s
		}
	}])
});