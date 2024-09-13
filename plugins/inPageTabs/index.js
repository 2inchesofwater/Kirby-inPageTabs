import Vue, { defineComponent, ref, computed, watch, onBeforeMount, onBeforeUnmount, withDirectives, openBlock, createElementBlock, unref, normalizeClass, renderSlot, vShow, reactive, provide, onMounted, toRefs, createElementVNode, Fragment, renderList, inject, resolveComponent, createVNode, withCtx, createTextVNode } from "vue";
const x = Symbol("addTab"), k = Symbol("updateTab"), y = Symbol("deleteTab"), A = Symbol("tabsProvider");
function m(n, c) {
  const a = inject(n, c);
  if (typeof a > "u")
    throw new Error(`Could not resolve ${n.description}`);
  return a;
}
const J = ["data-tab-id", "aria-hidden"], W = /* @__PURE__ */ defineComponent({
  __name: "Tab",
  props: {
    panelClass: { default: "tabs-component-panel" },
    id: { default: void 0 },
    name: null,
    prefix: { default: "" },
    suffix: { default: "" },
    isDisabled: { type: Boolean, default: false },
    navItemClass: { default: void 0 },
    navItemLinkClass: { default: void 0 }
  },
  setup(n, { expose: c }) {
    const a = n, i = ref(false), s = m(A), u = m(x), d = m(k), r = m(y), t = a.prefix + a.name + a.suffix, l = a.id ? a.id : a.name.toLowerCase().replace(/ /g, "-"), e = l + "-pane", o = computed(() => "#" + (a.isDisabled ? "" : l));
    return watch(
      () => s.activeTabHash,
      () => {
        i.value = o.value === s.activeTabHash;
      }
    ), watch(
      () => Object.assign({}, a),
      () => {
        d(l, {
          name: a.name,
          header: a.prefix + a.name + a.suffix,
          isDisabled: a.isDisabled,
          hash: o.value,
          index: s.tabs.length,
          computedId: l,
          paneId: e,
          navItemClass: a.navItemClass,
          navItemLinkClass: a.navItemLinkClass
        });
      }
    ), onBeforeMount(() => {
      u({
        name: a.name,
        header: t,
        isDisabled: a.isDisabled,
        hash: o.value,
        index: s.tabs.length,
        computedId: l,
        paneId: e,
        navItemClass: a.navItemClass,
        navItemLinkClass: a.navItemLinkClass
      });
    }), onBeforeUnmount(() => {
      r(l);
    }), c({
      header: t,
      computedId: l,
      paneId: e,
      hash: o,
      isActive: i
    }), (f, I) => withDirectives((openBlock(), createElementBlock("section", {
      ref: "tab",
      id: e,
      "data-tab-id": unref(l),
      "aria-hidden": !i.value,
      class: normalizeClass(n.panelClass),
      role: "tabpanel",
      tabindex: "-1"
    }, [
      renderSlot(f.$slots, "default")
    ], 10, J)), [
      [vShow, i.value]
    ]);
  }
});
class z {
  get(c) {
    const a = localStorage.getItem(c);
    if (a === null)
      return null;
    const i = JSON.parse(a);
    return i ? new Date(i.expires) < /* @__PURE__ */ new Date() ? (localStorage.removeItem(c), null) : i.value : null;
  }
  set(c, a, i) {
    const s = (/* @__PURE__ */ new Date()).getTime(), u = new Date(s + i * 6e4);
    localStorage.setItem(c, JSON.stringify({ value: a, expires: u }));
  }
}
const w = new z(), R = ["id"], V = ["aria-controls", "aria-selected", "href", "onClick", "innerHTML"], q = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  props: {
    id: { default: void 0 },
    cacheLifetime: { default: 5 },
    options: { default: () => ({
      useUrlFragment: true,
      defaultTabHash: void 0,
      storageKey: void 0
    }) },
    wrapperClass: { default: "tabs-component" },
    panelsWrapperClass: { default: "tabs-component-panels" },
    navClass: { default: "tabs-component-tabs" },
    navItemClass: { default: "tabs-component-tab" },
    navItemDisabledClass: { default: "is-disabled" },
    navItemActiveClass: { default: "is-active" },
    navItemInactiveClass: { default: "is-inactive" },
    navItemLinkClass: { default: "tabs-component-tab-a" },
    navItemLinkActiveClass: { default: "is-active" },
    navItemLinkInactiveClass: { default: "is-inactive" },
    navItemLinkDisabledClass: { default: "is-disabled" }
  },
  emits: ["changed", "clicked"],
  setup(n, { expose: c, emit: a }) {
    const i = n, s = reactive({
      activeTabHash: "",
      lastActiveTabHash: "",
      tabs: []
    });
    provide(A, s), provide(x, (t) => {
      s.tabs.push(t);
    }), provide(k, (t, l) => {
      const e = s.tabs.findIndex((o) => o.computedId === t);
      l.isActive = s.tabs[e].isActive, s.tabs[e] = l;
    }), provide(y, (t) => {
      const l = s.tabs.findIndex((e) => e.computedId === t);
      s.tabs.splice(l, 1);
    });
    const u = computed(
      () => {
        let t;
        return i.options.storageKey && (t = i.options.storageKey), !t && i.id && (t = `vue-tabs-component.${i.id}.cache.${window.location.host}${window.location.pathname}`), t || (t = `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`), t;
      }
    ), d = (t, l) => {
      l && !i.options.useUrlFragment && l.preventDefault();
      const e = r(t);
      if (!!e) {
        if (l && e.isDisabled) {
          l.preventDefault();
          return;
        }
        if (s.lastActiveTabHash === e.hash) {
          a("clicked", { tab: e });
          return;
        }
        s.tabs.forEach((o) => {
          o.isActive = o.hash === e.hash;
        }), a("changed", { tab: e }), s.lastActiveTabHash = s.activeTabHash = e.hash, !(i.cacheLifetime <= 0) && w.set(u.value, e.hash, i.cacheLifetime);
      }
    }, r = (t) => s.tabs.find((l) => l.hash === t);
    return onMounted(() => {
      if (!!s.tabs.length) {
        if (window.addEventListener("hashchange", () => d(window.location.hash)), r(window.location.hash)) {
          d(window.location.hash);
          return;
        }
        if (i.cacheLifetime > 0) {
          const t = w.get(u.value);
          if (t !== null && r(t)) {
            d(t);
            return;
          }
        }
        if (i.options.defaultTabHash && r("#" + i.options.defaultTabHash)) {
          d("#" + i.options.defaultTabHash);
          return;
        }
        d(s.tabs[0].hash);
      }
    }), c({
      ...toRefs(s),
      selectTab: d,
      findTab: r
    }), (t, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(n.wrapperClass),
      id: n.id
    }, [
      createElementVNode("ul", {
        role: "tablist",
        class: normalizeClass(n.navClass)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(s.tabs, (e, o) => {
          var f, I;
          return openBlock(), createElementBlock("li", {
            key: o,
            class: normalizeClass([
              (f = e.navItemClass) != null ? f : n.navItemClass,
              e.isDisabled ? n.navItemDisabledClass : "",
              e.isActive ? n.navItemActiveClass : e.isDisabled ? "" : n.navItemInactiveClass
            ]),
            role: "presentation"
          }, [
            createElementVNode("a", {
              role: "tab",
              class: normalizeClass([
                (I = e.navItemLinkClass) != null ? I : n.navItemLinkClass,
                e.isDisabled ? n.navItemLinkDisabledClass : "",
                e.isActive ? n.navItemLinkActiveClass : e.isDisabled ? "" : n.navItemLinkInactiveClass
              ]),
              "aria-controls": e.paneId,
              "aria-selected": e.isActive,
              href: e.hash,
              onClick: (S) => d(e.hash, S),
              innerHTML: e.header,
              tabindex: "0"
            }, null, 10, V)
          ], 2);
        }), 128))
      ], 2),
      createElementVNode("div", {
        class: normalizeClass(n.panelsWrapperClass)
      }, [
        renderSlot(t.$slots, "default")
      ], 2)
    ], 10, R));
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
Vue.component("tabs", q);
Vue.component("tab", W);
const _sfc_main = {};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tab = resolveComponent("tab");
  const _component_tabs = resolveComponent("tabs");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_tabs, null, {
      default: withCtx(() => [
        createVNode(_component_tab, { title: "Tab 1" }, {
          default: withCtx(() => _cache[0] || (_cache[0] = [
            createTextVNode("Howdy From Tab 1")
          ])),
          _: 1
          /* STABLE */
        }),
        createVNode(_component_tab, { title: "Tab 2" }, {
          default: withCtx(() => _cache[1] || (_cache[1] = [
            createTextVNode("Hi hi From Tab 2")
          ])),
          _: 1
          /* STABLE */
        }),
        createVNode(_component_tab, { title: "Tab 3" }, {
          default: withCtx(() => _cache[2] || (_cache[2] = [
            createTextVNode("Heya From Tab 3")
          ])),
          _: 1
          /* STABLE */
        }),
        createVNode(_component_tab, { title: "Tab 4" }, {
          default: withCtx(() => _cache[3] || (_cache[3] = [
            createTextVNode("Hello From Tab 4")
          ])),
          _: 1
          /* STABLE */
        })
      ]),
      _: 1
      /* STABLE */
    })
  ]);
}
const inPageTabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/dangilmore/Sites/sodaville/site/plugins/inPageTabs/src/components/fields/inPageTabs.vue"]]);
panel.plugin("sodaville/inPageTabs", {
  fields: {
    inPageTabs
  }
});
