# Kirby-inPageTabs
Extended UI tabs for Kirby CMS, able to be inserted anywhere in a Blueprint file.

## Background
I'm trying to create a simple workflow interface for a proof-of-concept build. 
The use case is somebody creating pages for a comic; pages move from a draft state, to a review state, to a published state. 

Using Kirby CMS (v4.1 and newer), I can create a Collection for each of the three workflow states. These Collections are defined in a Kirby Blueprint file – in the repo, look for blueprints/pages/series.yml

Why can't I just use Kirby's in-built UI tabs? For reasons, Kirby's tabs can only appear at the very top of a Blueprint, therefore at the very top of the in-browser page. ([Confirmed by the Kirby Team]([url](https://forum.getkirby.com/t/tabbed-content-in-the-middle-of-a-layout/32279)))

## The goal
I want to build a set of UI tabs which can appear further down the in-browser page, and which are capable of displaying _x_ number of Collections. 

## The plan
Implement/improvise Vue3-tabs-component as a Kirby plugin so that it can receive props from a Kirby Blueprint file –
https://www.npmjs.com/package/vue3-tabs-component

Follow the instructions on the Kirby website to create a custom UI field plugin – 
https://getkirby.com/docs/cookbook/panel/first-panel-field
However, it appears this is an older document which references Vue 2. Some of the steps clash with modern installations of Vite, which looks for Vue 3.

## The current state
Kirbyup is currently compiling the package successfully.
Kirby Panel has registered the plugin.
In the Panel, accessing a Series page, such as "Thor", reveals an error `Field "inpagetabs": The field type "inPageTabs" does not exist`.

## Node modules
Kirby CMS 4.3.0
Kirby's Panel interface runs on Vue.js
PHP 8.3.1

├─┬ kirbyup@4.0.0-alpha.1
│ ├─┬ @vitejs/plugin-vue-jsx@3.1.0
│ │ └── vue@3.5.4 deduped
│ ├─┬ @vitejs/plugin-vue@5.1.3
│ │ └── vue@3.5.4 deduped
│ └─┬ vue@3.5.4
│   └─┬ @vue/server-renderer@3.5.4
│     └── vue@3.5.4 deduped
└─┬ vue3-tabs-component@1.3.7
  └── vue@3.5.4 deduped
