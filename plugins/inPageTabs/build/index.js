import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createTextVNode } from "vue";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
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
const inPageTabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/dangilmore/Sites/sodaville/site/plugins/kirby4-inpagetabs/src/components/fields/inpagetabs-core.vue"]]);
panel.plugin("sodaville/kirby4-inpagetabs", {
  fields: {
    inpagetabs: inPageTabs
  }
});
