import inPageTabs from "@/components/fields/inpagetabs-core.vue";

/* Adapted from https://getkirby.com/docs/cookbook/panel/first-panel-field */

panel.plugin('sodaville/kirby4-inpagetabs', {
  fields: {
    inpagetabs: inPageTabs
  }
});
