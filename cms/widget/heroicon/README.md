# Heroicon Widget for NetlifyCMS

The Heroicon Widget allows NetlifyCMS to select and show Heroicon Icons within the CMS
The Heroicon Icons are located in icons/... in outline and solid version as React Components.
They are dynamically added with <Icon ...> from components/icon.js

## Setup

In pages/admin.js add the following to register the widget

```js
import {
    HeroIconControl,
    HeroIconPreview,
    HeroIconSchema,
} from "cms/widget/heroicon"
...

window.cms.registerWidget(
    "heroicon",
    HeroIconControl,
    HeroIconPreview,
    HeroIconSchema
)
```

## Usage

In cms/config.yaml the heroicon widget can be used

```yaml
fields:
    - label: HeroIcon
      name: iconname
      widget: heroicon
    - label: Icon Style
      name: iconstyle
      widget: select
      options: ["outline", "solid"]
      multiple: false
      required: true
```
