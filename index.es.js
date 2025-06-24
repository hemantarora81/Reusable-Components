import q, { forwardRef as fe, useState as D, useRef as U, useEffect as X, useCallback as ge, useMemo as re } from "react";
var ce = { exports: {} }, oe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var he;
function ke() {
  if (he) return oe;
  he = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function a(s, o, u) {
    var d = null;
    if (u !== void 0 && (d = "" + u), o.key !== void 0 && (d = "" + o.key), "key" in o) {
      u = {};
      for (var h in o)
        h !== "key" && (u[h] = o[h]);
    } else u = o;
    return o = u.ref, {
      $$typeof: e,
      type: s,
      key: d,
      ref: o !== void 0 ? o : null,
      props: u
    };
  }
  return oe.Fragment = t, oe.jsx = a, oe.jsxs = a, oe;
}
var le = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var me;
function Ce() {
  return me || (me = 1, process.env.NODE_ENV !== "production" && function() {
    function e(r) {
      if (r == null) return null;
      if (typeof r == "function")
        return r.$$typeof === Y ? null : r.displayName || r.name || null;
      if (typeof r == "string") return r;
      switch (r) {
        case c:
          return "Fragment";
        case y:
          return "Profiler";
        case N:
          return "StrictMode";
        case z:
          return "Suspense";
        case R:
          return "SuspenseList";
        case M:
          return "Activity";
      }
      if (typeof r == "object")
        switch (typeof r.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), r.$$typeof) {
          case m:
            return "Portal";
          case S:
            return (r.displayName || "Context") + ".Provider";
          case P:
            return (r._context.displayName || "Context") + ".Consumer";
          case b:
            var g = r.render;
            return r = r.displayName, r || (r = g.displayName || g.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
          case L:
            return g = r.displayName || null, g !== null ? g : e(r.type) || "Memo";
          case A:
            g = r._payload, r = r._init;
            try {
              return e(r(g));
            } catch {
            }
        }
      return null;
    }
    function t(r) {
      return "" + r;
    }
    function a(r) {
      try {
        t(r);
        var g = !1;
      } catch {
        g = !0;
      }
      if (g) {
        g = console;
        var O = g.error, $ = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return O.call(
          g,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          $
        ), t(r);
      }
    }
    function s(r) {
      if (r === c) return "<>";
      if (typeof r == "object" && r !== null && r.$$typeof === A)
        return "<...>";
      try {
        var g = e(r);
        return g ? "<" + g + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var r = H.A;
      return r === null ? null : r.getOwner();
    }
    function u() {
      return Error("react-stack-top-frame");
    }
    function d(r) {
      if (ee.call(r, "key")) {
        var g = Object.getOwnPropertyDescriptor(r, "key").get;
        if (g && g.isReactWarning) return !1;
      }
      return r.key !== void 0;
    }
    function h(r, g) {
      function O() {
        V || (V = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          g
        ));
      }
      O.isReactWarning = !0, Object.defineProperty(r, "key", {
        get: O,
        configurable: !0
      });
    }
    function v() {
      var r = e(this.type);
      return p[r] || (p[r] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), r = this.props.ref, r !== void 0 ? r : null;
    }
    function w(r, g, O, $, J, G, ne, ae) {
      return O = G.ref, r = {
        $$typeof: i,
        type: r,
        key: g,
        props: G,
        _owner: J
      }, (O !== void 0 ? O : null) !== null ? Object.defineProperty(r, "ref", {
        enumerable: !1,
        get: v
      }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(r, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(r, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ne
      }), Object.defineProperty(r, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ae
      }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
    }
    function C(r, g, O, $, J, G, ne, ae) {
      var I = g.children;
      if (I !== void 0)
        if ($)
          if (Q(I)) {
            for ($ = 0; $ < I.length; $++)
              k(I[$]);
            Object.freeze && Object.freeze(I);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else k(I);
      if (ee.call(g, "key")) {
        I = e(r);
        var K = Object.keys(g).filter(function(ie) {
          return ie !== "key";
        });
        $ = 0 < K.length ? "{key: someKey, " + K.join(": ..., ") + ": ...}" : "{key: someKey}", j[I + $] || (K = 0 < K.length ? "{" + K.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          $,
          I,
          K,
          I
        ), j[I + $] = !0);
      }
      if (I = null, O !== void 0 && (a(O), I = "" + O), d(g) && (a(g.key), I = "" + g.key), "key" in g) {
        O = {};
        for (var se in g)
          se !== "key" && (O[se] = g[se]);
      } else O = g;
      return I && h(
        O,
        typeof r == "function" ? r.displayName || r.name || "Unknown" : r
      ), w(
        r,
        I,
        G,
        J,
        o(),
        O,
        ne,
        ae
      );
    }
    function k(r) {
      typeof r == "object" && r !== null && r.$$typeof === i && r._store && (r._store.validated = 1);
    }
    var E = q, i = Symbol.for("react.transitional.element"), m = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), P = Symbol.for("react.consumer"), S = Symbol.for("react.context"), b = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), M = Symbol.for("react.activity"), Y = Symbol.for("react.client.reference"), H = E.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = Object.prototype.hasOwnProperty, Q = Array.isArray, Z = console.createTask ? console.createTask : function() {
      return null;
    };
    E = {
      "react-stack-bottom-frame": function(r) {
        return r();
      }
    };
    var V, p = {}, _ = E["react-stack-bottom-frame"].bind(
      E,
      u
    )(), x = Z(s(u)), j = {};
    le.Fragment = c, le.jsx = function(r, g, O, $, J) {
      var G = 1e4 > H.recentlyCreatedOwnerStacks++;
      return C(
        r,
        g,
        O,
        !1,
        $,
        J,
        G ? Error("react-stack-top-frame") : _,
        G ? Z(s(r)) : x
      );
    }, le.jsxs = function(r, g, O, $, J) {
      var G = 1e4 > H.recentlyCreatedOwnerStacks++;
      return C(
        r,
        g,
        O,
        !0,
        $,
        J,
        G ? Error("react-stack-top-frame") : _,
        G ? Z(s(r)) : x
      );
    };
  }()), le;
}
var pe;
function Ne() {
  return pe || (pe = 1, process.env.NODE_ENV === "production" ? ce.exports = ke() : ce.exports = Ce()), ce.exports;
}
var n = Ne();
const Ve = ({
  isOn: e,
  onToggle: t,
  labelLeft: a = "Light",
  labelRight: s = "Dark",
  className: o = ""
}) => /* @__PURE__ */ n.jsxs("div", { className: `flex items-center gap-2 ${o}`, children: [
  /* @__PURE__ */ n.jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: a }),
  /* @__PURE__ */ n.jsx(
    "button",
    {
      onClick: () => t(!e),
      className: `relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none 
          ${e ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`,
      role: "switch",
      "aria-checked": e,
      children: /* @__PURE__ */ n.jsx(
        "span",
        {
          className: `inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform duration-300
          ${e ? "translate-x-6" : "translate-x-1"}`
        }
      )
    }
  ),
  /* @__PURE__ */ n.jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: s })
] }), Ge = ({
  label: e,
  checked: t,
  onChange: a,
  name: s,
  id: o,
  disabled: u = !1,
  className: d = ""
}) => /* @__PURE__ */ n.jsxs(
  "label",
  {
    htmlFor: o,
    className: `flex items-center gap-2 cursor-pointer select-none text-sm text-gray-800 dark:text-gray-200 ${d}`,
    children: [
      /* @__PURE__ */ n.jsx(
        "input",
        {
          type: "checkbox",
          id: o,
          name: s,
          checked: t,
          onChange: (h) => a(h.target.checked),
          disabled: u,
          className: `
          w-4 size-5 border border-gray-400 rounded-sm cursor-pointer
          appearance-none 
          checked:bg-[#3E2723] 
          checked:border-[#3E2723] 
          checked:after:content-['✔']
          checked:after:text-white
          checked:after:text-xs 
          checked:after:font-bold 
          checked:after:flex 
          checked:after:justify-center 
          checked:after:items-center 
          dark:bg-gray-800 
          transition-all duration-150
        `
        }
      ),
      /* @__PURE__ */ n.jsx("span", { children: e })
    ]
  }
), Ee = fe(
  ({
    options: e = [],
    value: t,
    onChange: a,
    name: s,
    id: o,
    popupWidth: u,
    popHeight: d = "auto",
    placeholder: h = "Select an option",
    error: v,
    disabled: w = !1,
    style: C = {},
    className: k = "",
    showClearButton: E = !1,
    showSearch: i = !1
  }, m) => {
    var V;
    const c = t != null && t !== "", [N, y] = D(""), [P, S] = D(!1), [b, z] = D(-1), R = U(null), L = U(null), A = U(null);
    X(() => {
      m && (typeof m == "function" ? m(R.current) : m.current = R.current);
    }, [m]), X(() => {
      const p = (_) => {
        L.current && !L.current.contains(_.target) && (S(!1), y(""));
      };
      return document.addEventListener("mousedown", p), () => {
        document.removeEventListener("mousedown", p);
      };
    }, []), X(() => {
      if (b >= 0 && A.current) {
        const p = A.current.children;
        p && p[b] && p[b].scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      }
    }, [b]);
    const M = i && N ? e.filter(
      (p) => p.text.toLowerCase().includes(N.toLowerCase())
    ) : e, Y = (p) => {
      const _ = e.find((j) => j.value === p), x = {
        target: { value: p, name: s },
        value: p,
        itemData: _,
        element: R.current,
        originalEvent: null
      };
      a(x), S(!1), y("");
    }, H = (p) => {
      p.stopPropagation(), a({
        target: { value: "", name: s },
        value: "",
        itemData: null,
        element: R.current,
        originalEvent: null
      }), y("");
    }, ee = (p) => {
      y(p.target.value), z(-1);
    }, Q = (p) => {
      if (!w)
        switch (p.key) {
          case "ArrowDown":
            p.preventDefault(), S(!0), z((_) => (_ + 1) % M.length);
            break;
          case "ArrowUp":
            p.preventDefault(), S(!0), z(
              (_) => _ <= 0 ? M.length - 1 : _ - 1
            );
            break;
          case "Enter":
            P && b >= 0 && (p.preventDefault(), Y(M[b].value));
            break;
          case "Escape":
            S(!1), y("");
            break;
        }
    }, Z = () => {
      w || (S((p) => !p), P || y(""));
    };
    return /* @__PURE__ */ n.jsxs(
      "div",
      {
        className: "relative w-full max-w-md transition-colors duration-300",
        ref: L,
        tabIndex: 0,
        onKeyDown: Q,
        style: C,
        children: [
          /* @__PURE__ */ n.jsx(
            "select",
            {
              className: "hidden",
              name: s,
              id: o,
              value: t,
              ref: R,
              onChange: (p) => Y(p.target.value)
            }
          ),
          /* @__PURE__ */ n.jsxs(
            "div",
            {
              className: `border px-4 py-2 rounded-md bg-white dark:bg-gray-800 flex items-center justify-between shadow-sm cursor-pointer transition duration-200 ${P ? "ring-2 ring-gray-500" : "border-gray-300"} ${w ? "opacity-50 cursor-not-allowed" : ""}`,
              onClick: Z,
              children: [
                /* @__PURE__ */ n.jsx("span", { className: "text-gray-900 truncate dark:text-gray-100", children: ((V = e.find((p) => p.value === t)) == null ? void 0 : V.text) || h }),
                E && c && !w && /* @__PURE__ */ n.jsx(
                  "button",
                  {
                    onClick: H,
                    className: "ml-2 text-gray-400 hover:text-red-500",
                    "aria-label": "Clear selection",
                    children: "×"
                  }
                ),
                /* @__PURE__ */ n.jsx(
                  "span",
                  {
                    className: `ml-2 transition-transform duration-200 ${P ? "rotate-180" : "rotate-0"}`,
                    children: "▼"
                  }
                )
              ]
            }
          ),
          P && /* @__PURE__ */ n.jsxs(
            "div",
            {
              className: "absolute z-20 w-full mt-2 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-900 dark:border-gray-700 max-h-60 animate-fade-in",
              style: { width: u || "100%", height: d },
              ref: A,
              children: [
                i && /* @__PURE__ */ n.jsx("div", { className: "p-2", children: /* @__PURE__ */ n.jsx(
                  "input",
                  {
                    type: "text",
                    className: "w-full px-3 py-1 text-gray-800 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500",
                    placeholder: "Search...",
                    value: N,
                    onChange: ee,
                    autoFocus: !0
                  }
                ) }),
                M.length > 0 ? M.map((p, _) => /* @__PURE__ */ n.jsx(
                  "div",
                  {
                    className: `px-4 py-2 text-sm cursor-pointer transition-colors duration-150 rounded mx-2 mb-1 truncate ${t === p.value ? "bg-blue-100 dark:bg-gray-700 font-semibold text-gray-800 dark:text-white" : "hover:bg-blue-50 dark:hover:bg-gray-100 text-gray-700 dark:hover:text-gray-700"} ${_ === b ? "bg-blue-200 text-gray-800" : ""}`,
                    onClick: () => Y(p.value),
                    children: p.text
                  },
                  p.value
                )) : /* @__PURE__ */ n.jsx("div", { className: "px-4 py-2 text-sm text-gray-500 dark:text-gray-400", children: "No options found" })
              ]
            }
          ),
          v && /* @__PURE__ */ n.jsx("p", { className: "mt-1 text-sm text-red-600 transition-opacity", children: v })
        ]
      }
    );
  }
);
Ee.displayName = "DropdownComponent";
const Oe = ({
  content: e,
  children: t,
  position: a = "top",
  delay: s = 300
}) => {
  const [o, u] = D(!1), [d, h] = D({ top: 0, left: 0 }), v = U(null), w = U(null);
  let C;
  const k = (m) => {
    const c = m.getBoundingClientRect(), N = window.scrollY, y = window.scrollX;
    switch (a) {
      case "top":
        return {
          top: c.top + N - 5,
          left: c.left + y + c.width / 2
        };
      case "right":
        return {
          top: c.top + N + c.height / 2,
          left: c.left + y + c.width + 5
        };
      case "bottom":
        return {
          top: c.top + N + c.height + 5,
          left: c.left + y + c.width / 2
        };
      case "left":
        return {
          top: c.top + N + c.height / 2,
          left: c.left + y - 5
        };
      default:
        return { top: 0, left: 0 };
    }
  }, E = () => {
    C = setTimeout(() => {
      w.current && (h(k(w.current)), u(!0));
    }, s);
  }, i = () => {
    clearTimeout(C), u(!1);
  };
  return X(() => () => {
    clearTimeout(C);
  }, []), /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
    q.cloneElement(t, {
      ref: w,
      onMouseEnter: E,
      onMouseLeave: i,
      onFocus: E,
      onBlur: i
    }),
    o && /* @__PURE__ */ n.jsx(
      "div",
      {
        ref: v,
        className: `custom-tooltip tooltip-${a}`,
        style: {
          position: "absolute",
          top: `${d.top}px`,
          left: `${d.left}px`,
          opacity: o ? 1 : 0,
          transition: "opacity 0.2s ease"
        },
        role: "tooltip",
        children: e
      }
    )
  ] });
}, Te = ({
  initialOrder: e,
  onReorder: t
}) => {
  const [a, s] = D(e), [o, u] = D(null), [d, h] = D(null), v = (i) => {
    u(i);
  }, w = (i) => {
    !o || i === o || h(i);
  }, C = () => {
    if (!o || !d || o === d) {
      k();
      return;
    }
    const i = [...a], m = i.indexOf(o), c = i.indexOf(d);
    i.splice(m, 1), i.splice(c, 0, o), s(i), t == null || t(i), k();
  }, k = () => {
    u(null), h(null);
  };
  return {
    columnOrder: a,
    draggedColumn: o,
    dropTarget: d,
    handleDragStart: v,
    handleDragOver: w,
    handleDrop: C,
    handleDragEnd: k,
    resetColumnOrder: () => {
      s(e);
    }
  };
}, Re = ({
  minWidth: e = 50,
  maxWidth: t = 1e3,
  defaultWidth: a = 150,
  onResize: s
}) => {
  const [o, u] = D(a), [d, h] = D(!1), v = U(0), w = U(0), C = ge((i) => {
    i.preventDefault(), v.current = i.clientX, w.current = o, h(!0);
  }, [o]), k = ge(
    (i) => {
      if (!d) return;
      const m = w.current + i.clientX - v.current, c = Math.max(e, Math.min(t, m));
      u(c);
    },
    [d, e, t]
  ), E = ge(() => {
    d && (h(!1), s == null || s(o));
  }, [d, o, s]);
  return X(() => {
    if (d)
      return document.addEventListener("mousemove", k), document.addEventListener("mouseup", E), () => {
        document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", E);
      };
  }, [d, k, E]), {
    width: o,
    isResizing: d,
    resizerProps: {
      onMouseDown: C
    }
  };
};
var ye = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, xe = q.createContext && /* @__PURE__ */ q.createContext(ye), Se = ["attr", "size", "title"];
function _e(e, t) {
  if (e == null) return {};
  var a = Pe(e, t), s, o;
  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(e);
    for (o = 0; o < u.length; o++)
      s = u[o], !(t.indexOf(s) >= 0) && Object.prototype.propertyIsEnumerable.call(e, s) && (a[s] = e[s]);
  }
  return a;
}
function Pe(e, t) {
  if (e == null) return {};
  var a = {};
  for (var s in e)
    if (Object.prototype.hasOwnProperty.call(e, s)) {
      if (t.indexOf(s) >= 0) continue;
      a[s] = e[s];
    }
  return a;
}
function de() {
  return de = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var s in a)
        Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
    }
    return e;
  }, de.apply(this, arguments);
}
function be(e, t) {
  var a = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    t && (s = s.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), a.push.apply(a, s);
  }
  return a;
}
function ue(e) {
  for (var t = 1; t < arguments.length; t++) {
    var a = arguments[t] != null ? arguments[t] : {};
    t % 2 ? be(Object(a), !0).forEach(function(s) {
      De(e, s, a[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : be(Object(a)).forEach(function(s) {
      Object.defineProperty(e, s, Object.getOwnPropertyDescriptor(a, s));
    });
  }
  return e;
}
function De(e, t, a) {
  return t = Ae(t), t in e ? Object.defineProperty(e, t, { value: a, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = a, e;
}
function Ae(e) {
  var t = $e(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $e(e, t) {
  if (typeof e != "object" || !e) return e;
  var a = e[Symbol.toPrimitive];
  if (a !== void 0) {
    var s = a.call(e, t);
    if (typeof s != "object") return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ve(e) {
  return e && e.map((t, a) => /* @__PURE__ */ q.createElement(t.tag, ue({
    key: a
  }, t.attr), ve(t.child)));
}
function Ie(e) {
  return (t) => /* @__PURE__ */ q.createElement(Fe, de({
    attr: ue({}, e.attr)
  }, t), ve(e.child));
}
function Fe(e) {
  var t = (a) => {
    var {
      attr: s,
      size: o,
      title: u
    } = e, d = _e(e, Se), h = o || a.size || "1em", v;
    return a.className && (v = a.className), e.className && (v = (v ? v + " " : "") + e.className), /* @__PURE__ */ q.createElement("svg", de({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, a.attr, s, d, {
      className: v,
      style: ue(ue({
        color: e.color || a.color
      }, a.style), e.style),
      height: h,
      width: h,
      xmlns: "http://www.w3.org/2000/svg"
    }), u && /* @__PURE__ */ q.createElement("title", null, u), e.children);
  };
  return xe !== void 0 ? /* @__PURE__ */ q.createElement(xe.Consumer, null, (a) => t(a)) : t(ye);
}
function We(e) {
  return Ie({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M472 168H40a24 24 0 0 1 0-48h432a24 24 0 0 1 0 48zm-80 112H120a24 24 0 0 1 0-48h272a24 24 0 0 1 0 48zm-96 112h-80a24 24 0 0 1 0-48h80a24 24 0 0 1 0 48z" }, child: [] }] })(e);
}
const ze = ({
  options: e,
  filterValue: t = [],
  columnId: a,
  preFilteredRows: s
}) => {
  const [o, u] = D(""), [d, h] = D(null), [v, w] = D(t), C = re(() => {
    if (e && e.length > 0) return e;
    const i = /* @__PURE__ */ new Map();
    return s.forEach((m) => {
      const c = m.values ? m.values[a] : m[a];
      c != null && !i.has(c) && i.set(c, c);
    }), Array.from(i.values());
  }, [e, s, a]), k = re(() => {
    let i = [...C];
    return o && (i = i.filter(
      (m) => String(m).toLowerCase().includes(o.toLowerCase())
    )), d && i.sort((m, c) => typeof m == "number" && typeof c == "number" ? d === "asc" ? m - c : c - m : d === "asc" ? String(m).localeCompare(String(c)) : String(c).localeCompare(String(m))), i;
  }, [C, o, d]), E = () => {
    h((i) => i === "asc" ? "desc" : i === "desc" ? null : "asc");
  };
  return X(() => {
    w(t);
  }, [t]), {
    filteredOptions: k,
    searchTerm: o,
    setSearchTerm: u,
    sortDirection: d,
    toggleSortDirection: E,
    selectedValues: v,
    setSelectedValues: w
  };
}, Le = ({
  column: e,
  darkMode: t = !1
}) => {
  const {
    filterValue: a = [],
    setFilter: s,
    preFilteredRows: o,
    id: u,
    Header: d
  } = e, h = U(null), [v, w] = D(!1), {
    filteredOptions: C,
    searchTerm: k,
    setSearchTerm: E,
    sortDirection: i,
    toggleSortDirection: m,
    selectedValues: c,
    setSelectedValues: N
  } = ze({
    options: [],
    filterValue: a,
    columnId: u,
    preFilteredRows: o
  }), y = () => {
    s(c.length > 0 ? c : void 0), w(!1);
  }, P = () => {
    N([]), s(void 0);
  }, S = () => {
    w((b) => !b), v || N(a || []);
  };
  return X(() => {
    const b = (z) => {
      h.current && !h.current.contains(z.target) && w(!1);
    };
    return v ? document.addEventListener("mousedown", b) : document.removeEventListener("mousedown", b), () => {
      document.removeEventListener("mousedown", b);
    };
  }, [v]), /* @__PURE__ */ n.jsxs("div", { className: `default-column-filter filter-container ${t ? "dark" : ""}`, ref: h, children: [
    /* @__PURE__ */ n.jsxs(
      "button",
      {
        className: `filter-button ${a != null && a.length ? "active active-filter" : ""} ${t ? "text-blue-400 hover:bg-gray-700" : "text-blue-500 hover:bg-gray-200"}`,
        onClick: S,
        "aria-label": `Filter ${e.Header}`,
        children: [
          /* @__PURE__ */ n.jsx(We, {}),
          (a == null ? void 0 : a.length) > 0 && /* @__PURE__ */ n.jsx("span", { className: "filter-count", children: a.length })
        ]
      }
    ),
    v && /* @__PURE__ */ n.jsxs("div", { className: "filter-dropdown", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "filter-header", children: [
        /* @__PURE__ */ n.jsxs("h4", { children: [
          "Filter ",
          d
        ] }),
        /* @__PURE__ */ n.jsx("button", { onClick: () => w(!1), children: "×" })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "filter-controls", children: [
        /* @__PURE__ */ n.jsx("div", { className: "search-box", children: /* @__PURE__ */ n.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search",
            value: k,
            onChange: (b) => E(b.target.value)
          }
        ) }),
        /* @__PURE__ */ n.jsxs("div", { className: "sort-controls", children: [
          /* @__PURE__ */ n.jsx(
            "button",
            {
              onClick: () => m(),
              className: i === "asc" ? "active" : "",
              children: "Sort A-Z"
            }
          ),
          /* @__PURE__ */ n.jsx(
            "button",
            {
              onClick: () => m(),
              className: i === "desc" ? "active" : "",
              children: "Sort Z-A"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "filter-options filter-options-container", children: [
        /* @__PURE__ */ n.jsx("div", { className: "select-all option-item", children: /* @__PURE__ */ n.jsxs("label", { children: [
          /* @__PURE__ */ n.jsx(
            "input",
            {
              type: "checkbox",
              checked: c.length === C.length,
              onChange: (b) => {
                N(
                  b.target.checked ? [...C] : []
                );
              }
            }
          ),
          "Select All"
        ] }) }),
        C.map((b, z) => /* @__PURE__ */ n.jsx("div", { className: "option-item", children: /* @__PURE__ */ n.jsxs("label", { children: [
          /* @__PURE__ */ n.jsx(
            "input",
            {
              type: "checkbox",
              checked: c.includes(b),
              onChange: (R) => {
                const L = R.target.checked ? [...c, b] : c.filter((A) => A !== b);
                N(L);
              }
            }
          ),
          String(b)
        ] }) }, z))
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: "filter-footer", children: [
        /* @__PURE__ */ n.jsx("button", { onClick: P, className: "clear-btn", children: "Clear" }),
        /* @__PURE__ */ n.jsx("button", { onClick: y, className: "apply-btn", children: "Apply" })
      ] })
    ] })
  ] });
}, Me = ({
  items: e,
  itemHeight: t,
  renderItem: a,
  containerHeight: s,
  overscanCount: o = 3,
  className: u = "",
  containerStyle: d = {}
}) => {
  const h = U(null), [v, w] = D(0), C = () => {
    h.current && w(h.current.scrollTop);
  }, { startIndex: k, endIndex: E, paddingTop: i, paddingBottom: m } = re(() => {
    const N = Math.ceil(s / t), y = Math.max(
      0,
      Math.floor(v / t) - o
    ), P = Math.min(
      e.length - 1,
      y + N + o * 2
    ), S = y * t, b = Math.max(
      0,
      (e.length - P - 1) * t
    );
    return { startIndex: y, endIndex: P, paddingTop: S, paddingBottom: b };
  }, [v, e.length, t, s, o]);
  X(() => {
    h.current && (h.current.scrollTop = v);
  }, [e.length]);
  const c = e.slice(k, E + 1);
  return /* @__PURE__ */ n.jsx(
    "div",
    {
      ref: h,
      className: `virtual-scroll-container ${u}`,
      style: {
        height: s,
        overflowY: "auto",
        ...d
      },
      onScroll: C,
      children: /* @__PURE__ */ n.jsxs(
        "div",
        {
          style: {
            height: `${e.length * t}px`,
            position: "relative"
          },
          children: [
            /* @__PURE__ */ n.jsx("div", { style: { height: `${i}px` } }),
            c.map((N, y) => /* @__PURE__ */ n.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  top: `${(k + y) * t}px`,
                  width: "100%",
                  height: `${t}px`
                },
                children: a(N, k + y)
              },
              k + y
            )),
            /* @__PURE__ */ n.jsx("div", { style: { height: `${m}px` } })
          ]
        }
      )
    }
  );
}, Ye = ({
  data: e = [],
  columns: t,
  loading: a = !1,
  columnChooser: s = !0,
  reorderable: o = !0,
  filterable: u = !0,
  sortable: d = !0,
  resizable: h = !1,
  pagination: v = !0,
  gridLines: w = !0,
  pageSize: C = 15,
  currentPage: k = 1,
  totalCount: E = 0,
  onPageChange: i,
  onPageSizeChange: m,
  extraClass: c = "",
  columnChooserRef: N,
  rowClassName: y,
  emptyState: P,
  virtualized: S = !1,
  virtualScrollHeight: b = 500,
  virtualRowHeight: z = 40,
  darkMode: R = !1
}, L) => {
  const A = U(null), [M, Y] = D(k - 1), [H, ee] = D(C), [Q, Z] = D({}), [V, p] = D({}), _ = re(() => R ? {
    tableContainer: "bg-gray-900 text-gray-100",
    header: "bg-gray-800 border-gray-700",
    row: "border-gray-700",
    evenRow: "bg-gray-800 hover:bg-gray-750",
    oddRow: "bg-gray-850 hover:bg-gray-800",
    loadingRow: "bg-gray-800",
    loadingCell: "bg-gray-700",
    emptyRow: "text-gray-400",
    resizer: "hover:bg-blue-400",
    filterButton: "text-blue-400 hover:bg-gray-700",
    activeFilter: "bg-blue-900"
  } : {
    tableContainer: "bg-white text-gray-800",
    header: "bg-gray-100 border-gray-200",
    row: "border-gray-200",
    evenRow: "bg-white hover:bg-gray-50",
    oddRow: "bg-gray-50 hover:bg-gray-100",
    loadingRow: "bg-white",
    loadingCell: "bg-gray-100",
    emptyRow: "text-gray-500",
    resizer: "hover:bg-blue-500",
    filterButton: "text-blue-500 hover:bg-gray-200",
    activeFilter: "bg-blue-100"
  }, [R]), x = (f, l) => {
    Z((T) => ({
      ...T,
      [f]: l
    }));
  }, j = re(() => {
    const f = (l) => {
      const T = l.id || (typeof l.accessor == "string" ? l.accessor : Math.random().toString(36).substring(7)), F = l.width || 150, W = Q[T] || F, B = {
        ...l,
        id: T,
        width: W,
        minWidth: l.minWidth || 50,
        textAlign: l.textAlign || "left",
        headerTextAlign: l.headerTextAlign || "center",
        isTooltip: l.isTooltip !== !1,
        sortable: l.sortable !== !1 && d,
        filter: l.filter || (u ? "multiSelect" : "none"),
        resizable: l.resizable || h,
        visible: l.visible !== !1,
        bgColor: R && l.darkBgColor || l.bgColor,
        textColor: R && l.darkTextColor || l.textColor
      };
      return "columns" in l ? {
        ...B,
        columns: l.columns.map(f)
      } : B;
    };
    return t.map(f);
  }, [t, d, u, h, Q, R]), r = re(() => Object.keys(V).length === 0 ? e : e.filter((f) => Object.entries(V).every(([l, T]) => {
    if (!T || T.length === 0) return !0;
    const F = j.find((B) => B.id === l);
    if (!F || !F.accessor) return !0;
    const W = typeof F.accessor == "function" ? F.accessor(f) : f[F.accessor];
    return F.filter === "text" ? T.some((B) => String(W).toLowerCase().includes(
      String(B).toLowerCase()
    )) : T.includes(W);
  })), [e, V, j]), {
    columnOrder: g,
    draggedColumn: O,
    dropTarget: $,
    handleDragStart: J,
    handleDragOver: G,
    handleDrop: ne,
    handleDragEnd: ae
  } = Te({
    initialOrder: j.flatMap(
      (f) => "columns" in f ? f.columns.map((l) => l.id) : [f.id]
    )
  }), I = re(() => {
    const f = new Map(j.map((l) => [l.id, l]));
    return g.map((l) => f.get(l)).filter((l) => !!l);
  }, [g, j]), K = (f) => {
    const l = "columns" in f, T = f.id, F = O === T, W = $ === T, { width: B, resizerProps: we } = Re({
      minWidth: f.minWidth,
      maxWidth: f.maxWidth,
      defaultWidth: Q[T] || f.width || 150,
      onResize: (te) => x(T, te)
    });
    return l ? null : /* @__PURE__ */ n.jsxs(
      "div",
      {
        className: `relative flex flex-row items-center justify-between ${f.headerClassName || ""} ${F ? "opacity-50 border-dashed border-blue-500" : ""} ${W ? "bg-blue-500 bg-opacity-10" : ""} {${w ? "border-gray-300 dark:border-gray-700" : ""}`,
        style: {
          width: `${B}px`,
          minWidth: `${f.minWidth}px`,
          maxWidth: `${f.maxWidth}px`,
          backgroundColor: f.bgColor,
          textAlign: f.headerTextAlign
        },
        draggable: o,
        onDragStart: () => J(T),
        onDragOver: (te) => {
          te.preventDefault(), G(T);
        },
        onDrop: ne,
        onDragEnd: ae,
        children: [
          /* @__PURE__ */ n.jsx("div", { className: "flex items-center justify-between px-3 py-2 font-semibold truncate", children: /* @__PURE__ */ n.jsx("span", { children: typeof f.Header == "function" ? f.Header({ column: f }) : f.Header }) }),
          u && f.filter !== "none" && /* @__PURE__ */ n.jsx("div", { className: "py-2 ", children: /* @__PURE__ */ n.jsx(
            Le,
            {
              column: {
                filterValue: V[T] || [],
                setFilter: (te) => {
                  p((je) => ({
                    ...je,
                    [T]: te && te.length > 0 ? te : void 0
                  }));
                },
                preFilteredRows: e,
                id: T,
                Header: typeof f.Header == "string" ? f.Header : T
              },
              darkMode: R
            }
          ) }),
          f.resizable && /* @__PURE__ */ n.jsx(
            "div",
            {
              className: "absolute top-0 right-0 w-1 cursor-col-resize bg-blue-400 opacity-0 hover:opacity-100 transition-opacity",
              ...we
            }
          )
        ]
      }
    );
  }, se = (f, l, T) => {
    const F = typeof l.accessor == "function" ? l.accessor(f) : l.accessor ? f[l.accessor] : null, W = l.Cell ? typeof l.Cell == "function" ? l.Cell({ row: f, value: F }) : l.Cell : F, B = /* @__PURE__ */ n.jsx(
      "div",
      {
        className: `px-4 py-2 truncate ${l.cellClassName || ""}`,
        style: {
          textAlign: l.textAlign,
          color: l.textColor
        },
        children: W
      }
    );
    return l.isTooltip ? /* @__PURE__ */ n.jsx(Oe, { content: F, darkMode: R, children: B }) : B;
  }, ie = (f, l) => {
    const T = typeof y == "function" ? y(f, l) : y || "", F = l % 2 ? _.oddRow : _.evenRow;
    return /* @__PURE__ */ n.jsx(
      "div",
      {
        className: `flex items-center border-b ${F} ${T}`,
        children: j.map((W, B) => "columns" in W ? null : /* @__PURE__ */ n.jsx(
          "div",
          {
            className: `${W.className || ""} ${w ? "border-r border-gray-200 dark:border-gray-700 last:border-r-0" : ""}`,
            style: {
              width: `${W.width}px`,
              minWidth: `${W.minWidth}px`,
              maxWidth: `${W.maxWidth}px`,
              textAlign: W.textAlign,
              backgroundColor: W.bgColor,
              color: W.textColor
            },
            children: se(f, W)
          },
          B
        ))
      },
      l
    );
  };
  return /* @__PURE__ */ n.jsx(
    "div",
    {
      className: `relative flex flex-col h-full ${_.tableContainer} ${c}`,
      ref: A,
      children: /* @__PURE__ */ n.jsxs("div", { className: "flex-1 overflow-hidden", children: [
        /* @__PURE__ */ n.jsx("div", { className: `sticky top-0 z-10 flex border-b ${_.header}`, children: I.map((f, l) => /* @__PURE__ */ n.jsx("div", { children: K(f) }, l)) }),
        /* @__PURE__ */ n.jsx("div", { className: "h-full overflow-auto", children: a ? Array.from({ length: 10 }).map((f, l) => /* @__PURE__ */ n.jsx("div", { className: `flex items-center border-b ${_.loadingRow}`, children: j.map((T, F) => /* @__PURE__ */ n.jsx(
          "div",
          {
            className: `h-10 ${_.loadingCell}`,
            style: { width: T.width }
          },
          F
        )) }, l)) : e.length === 0 ? /* @__PURE__ */ n.jsx("div", { className: `flex items-center justify-center p-8 ${_.emptyRow}`, children: P || "No records to display" }) : S ? /* @__PURE__ */ n.jsx(
          Me,
          {
            items: r,
            itemHeight: z,
            containerHeight: b,
            renderItem: (f, l) => ie(f, l),
            darkMode: R
          }
        ) : r.map((f, l) => ie(f, l)) })
      ] })
    }
  );
};
fe(Ye);
const Be = fe(
  ({
    options: e = [],
    value: t,
    onChange: a,
    name: s,
    placeholder: o = "",
    error: u,
    disabled: d = !1,
    style: h = {},
    className: v = "",
    showClearButton: w = !1,
    showSearch: C = !1,
    isCheckable: k = !1,
    selectAllText: E = "Select All",
    mode: i = "default"
  }, m) => {
    const c = t != null && (i === "checkbox" ? t.length > 0 : t !== ""), [N, y] = D(""), [P, S] = D(!1), [b, z] = D(-1), R = U(null), L = U(null), A = U(null), M = i === "checkbox" && t && t.length === e.length;
    X(() => {
      const x = (j) => {
        L.current && !L.current.contains(j.target) && (S(!1), y(""));
      };
      return document.addEventListener("mousedown", x), () => {
        document.removeEventListener("mousedown", x);
      };
    }, []), X(() => {
      if (b >= 0 && A.current) {
        const x = A.current.children;
        x && x[b] && x[b].scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      }
    }, [b]), X(() => {
      m && (typeof m == "function" ? m(R.current) : m.current = R.current);
    }, [m]);
    const Y = C && N ? e.filter(
      (x) => x.text.toLowerCase().includes(N.toLowerCase())
    ) : e, H = (x) => {
      const j = typeof x == "object" ? x.value : x;
      if (i === "checkbox") {
        let r = Array.isArray(t) ? [...t] : [];
        r.includes(j) ? r = r.filter((g) => g !== j) : r.push(j), a({ target: { value: r, name: s } });
      } else
        a({ target: { value: j, name: s } }), S(!1), y("");
    }, ee = (x) => {
      x.stopPropagation();
      const j = M ? [] : e.map((r) => r.value);
      a({ target: { value: j, name: s } });
    }, Q = (x) => {
      x.stopPropagation(), a({ target: { value: i === "checkbox" ? [] : "", name: s } }), y("");
    }, Z = (x) => {
      y(x.target.value), z(-1);
    }, V = (x) => {
      if (!d)
        switch (x.key) {
          case "ArrowDown":
            x.preventDefault(), S(!0), z((j) => (j + 1) % Y.length);
            break;
          case "ArrowUp":
            x.preventDefault(), S(!0), z(
              (j) => j <= 0 ? Y.length - 1 : j - 1
            );
            break;
          case "Enter":
            P && b >= 0 && (x.preventDefault(), H(Y[b].value));
            break;
          case "Escape":
            S(!1), y("");
            break;
        }
    }, p = () => {
      d || (S(!P), P || y(""));
    }, _ = () => {
      var x;
      if (i === "checkbox") {
        if (!t || t.length === 0) return "";
        if (t.length === 1) {
          const j = e.find((r) => r.value === t[0]);
          return (j == null ? void 0 : j.text) || "";
        }
        return `${t.length} selected`;
      }
      return ((x = e.find((j) => j.value === t)) == null ? void 0 : x.text) || "";
    };
    return /* @__PURE__ */ n.jsxs(
      "div",
      {
        className: "relative w-full max-w-md transition-colors duration-300",
        ref: L,
        tabIndex: 0,
        onKeyDown: V,
        style: h,
        children: [
          /* @__PURE__ */ n.jsxs(
            "div",
            {
              className: `border rounded-md px-4 py-2 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm cursor-pointer transition duration-200 ${P ? "ring-2 ring-gray-500" : "border-gray-300"} ${d ? "opacity-50 cursor-not-allowed" : ""}`,
              onClick: p,
              ref: R,
              children: [
                /* @__PURE__ */ n.jsx("span", { className: "text-gray-900 truncate dark:text-gray-100", children: _() || o }),
                w && c && !d && /* @__PURE__ */ n.jsx(
                  "button",
                  {
                    onClick: Q,
                    className: "ml-2 text-gray-400 hover:text-red-500",
                    "aria-label": "Clear selection",
                    children: "×"
                  }
                )
              ]
            }
          ),
          P && /* @__PURE__ */ n.jsxs("div", { className: "absolute z-20 w-full mt-2 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-900 dark:border-gray-700 max-h-60 animate-fade-in", children: [
            C && /* @__PURE__ */ n.jsx("div", { className: "p-2", children: /* @__PURE__ */ n.jsx(
              "input",
              {
                type: "text",
                className: "w-full px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500",
                placeholder: "Search...",
                value: N,
                onChange: Z,
                autoFocus: !0
              }
            ) }),
            i === "checkbox" && k && /* @__PURE__ */ n.jsxs(
              "div",
              {
                className: "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer select-none hover:bg-blue-50 dark:hover:bg-gray-700",
                onClick: ee,
                children: [
                  /* @__PURE__ */ n.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: M,
                      onChange: () => {
                      }
                    }
                  ),
                  /* @__PURE__ */ n.jsx("span", { className: "text-gray-800 dark:text-gray-200", children: E })
                ]
              }
            ),
            /* @__PURE__ */ n.jsx("div", { ref: A, children: Y.length > 0 ? Y.map((x, j) => /* @__PURE__ */ n.jsxs(
              "div",
              {
                className: `flex items-center gap-2 px-4 py-2 cursor-pointer text-sm select-none rounded mx-2 mb-1 truncate transition-colors duration-150 ${i === "checkbox" && (t != null && t.includes(x.value)) ? "bg-blue-100 dark:bg-gray-700 font-semibold" : "hover:bg-blue-50 dark:hover:bg-gray-700"} ${j === b ? "bg-blue-200" : ""}`,
                onClick: () => H(x.value),
                children: [
                  i === "checkbox" && k && /* @__PURE__ */ n.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: t == null ? void 0 : t.includes(x.value),
                      readOnly: !0
                    }
                  ),
                  /* @__PURE__ */ n.jsx("span", { className: "text-gray-900 dark:text-gray-100", children: x.text })
                ]
              },
              x.value
            )) : /* @__PURE__ */ n.jsx("div", { className: "px-4 py-2 text-sm text-gray-500", children: "No options found" }) })
          ] }),
          u && /* @__PURE__ */ n.jsx("p", { className: "mt-1 text-sm text-red-600 transition-opacity", children: u })
        ]
      }
    );
  }
);
Be.displayName = "MultiSelectDropdown";
const Xe = ({
  onChange: e,
  placeholder: t,
  onBlur: a,
  name: s,
  value: o,
  error: u,
  readOnly: d,
  disabled: h,
  enabled: v = !0,
  style: w,
  className: C = ""
}) => {
  const k = h || !v;
  return /* @__PURE__ */ n.jsxs("div", { className: "relative w-full group", children: [
    /* @__PURE__ */ n.jsx(
      "label",
      {
        htmlFor: s,
        className: "absolute z-10 px-1 text-xs font-medium text-gray-500 bg-white -top-2 left-3 dark:text-gray-300 dark:bg-gray-800",
        children: t
      }
    ),
    /* @__PURE__ */ n.jsx(
      "textarea",
      {
        name: s,
        id: s,
        value: o,
        onChange: e,
        onBlur: a,
        placeholder: "",
        readOnly: d,
        disabled: k,
        rows: 1,
        className: `fieldSizing block w-full border rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${C}`,
        style: w
      }
    ),
    u && /* @__PURE__ */ n.jsx("p", { className: "mt-1 text-sm text-red-600", children: u })
  ] });
}, Je = fe(
  ({
    onChange: e,
    placeholder: t = "",
    onBlur: a,
    name: s,
    value: o,
    error: u,
    readOnly: d,
    disabled: h,
    enabled: v = !0,
    style: w,
    className: C = "",
    pattern: k,
    inputMode: E,
    onInputChange: i = () => {
    },
    onKeyDown: m,
    id: c,
    max: N,
    type: y = "text",
    autoFocus: P,
    divStyle: S,
    focus: b
  }, z) => {
    var L;
    const R = h || !v;
    return /* @__PURE__ */ n.jsx("div", { className: "w-full", style: S, children: /* @__PURE__ */ n.jsxs("div", { className: "relative w-full group", style: w, children: [
      /* @__PURE__ */ n.jsx(
        "label",
        {
          htmlFor: c || s,
          className: "absolute z-10 px-1 text-xs font-medium text-gray-500 bg-white -top-2 left-3 dark:text-gray-300 dark:bg-gray-800",
          children: (L = t == null ? void 0 : t.split("*")) == null ? void 0 : L.map((A, M, Y) => /* @__PURE__ */ n.jsxs(q.Fragment, { children: [
            A,
            M !== Y.length - 1 && /* @__PURE__ */ n.jsx("span", { className: "text-red-500", children: "*" })
          ] }, M))
        }
      ),
      /* @__PURE__ */ n.jsx(
        "input",
        {
          ref: z,
          type: y,
          placeholder: " ",
          name: s,
          id: c || s,
          value: o,
          onChange: e,
          onBlur: a,
          onFocus: b,
          pattern: k,
          autoFocus: P,
          inputMode: E,
          max: N,
          readOnly: d,
          disabled: R,
          onKeyDown: m,
          onInput: (A) => i(A.nativeEvent),
          className: `peer block w-full border rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${C}`
        }
      ),
      u && /* @__PURE__ */ n.jsx("p", { className: "mt-1 text-sm text-red-600", children: u })
    ] }) });
  }
);
export {
  Ge as CheckBoxComponent,
  Ee as DropdownComponent,
  Ye as GridComponent,
  Be as MultiSelectComponent,
  Xe as TextAreaComponent,
  Je as TextBoxComponent,
  Ve as ToggleComponent
};
