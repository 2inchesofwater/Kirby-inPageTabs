# Kirby-inPageTabs
Extended UI tabs for Kirby CMS, able to be inserted anywhere in a Blueprint file.

## Installation
This is intentionally a little skimpy on installations instructions; I'm assuming anyone reading this will already be fairly familiar with Kirby CMS v4 and how to install a custom Panel plugin. 

## The goal
I want to build a set of UI tabs which can appear further down the in-browser page, and which are capable of displaying _x_ number of Collections. 

The use case is somebody creating pages for a comic; pages move from a draft state, to a review state, to a published state.
The tabs are intended to represent a each of the workflow states as part of a proof-of-concept build. 

## Background
Why can't I just use Kirby's in-built UI tabs? For reasons, Kirby's tabs can only appear at the very top of a Blueprint, therefore at the very top of the in-browser page. ([Confirmed by the Kirby Team]([url](https://forum.getkirby.com/t/tabbed-content-in-the-middle-of-a-layout/32279)))

Using Kirby CMS (v4.1 and newer), I can create a Collection for each of the three workflow states. These Collections are defined in a Kirby Blueprint file – in the repo, look for blueprints/pages/series.yml

## The current state
Kirbyup is currently compiling the package successfully.
Kirby Panel has registered the plugin.
In Kirby's Panel – accessing a Series page, such as "Thor", reveals an error `Field "workflowtabs": The field type "inpagetabs" does not exist`.
└── The field "workflowtabs" is created inside blueprints\pages\series.yml
└── I'm having trouble identifying why the field type "inpagetabs" isn't working

## The plan
Implement/improvise Vue3-tabs-component as a Kirby plugin so that it can receive props from a Kirby Blueprint file –
https://www.npmjs.com/package/vue3-tabs-component

Follow the instructions on the Kirby website to create a custom UI field plugin – 
https://getkirby.com/docs/cookbook/panel/first-panel-field
However, it appears this is an older document which references Vue 2. Some of the steps clash with modern installations of Vite, which looks for Vue 3.

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
