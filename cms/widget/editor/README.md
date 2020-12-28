# OnlineMediaWidget for NetlifyCMS

online_media
The OnlineMediaWidget allows NetlifyCMS to select and show OnlineMedia within the CMS
The OnlineMedia are located in /public/img/... .
They are dynamically added with <Image ...> from next/image

## Setup

In pages/admin.js add the following to register the widget

```js
import {
    OnlineMediaControl,
    OnlineMediaPreview,
    OnlineMediaSchema,
} from "cms/widget/online-media"
...

window.cms.registerWidget(
    "online_media",
    OnlineMediaControl,
    OnlineMediaPreview,
    OnlineMediaSchema
)
```

## Usage

In cms/config.yaml the OnlineMedia widget can be used

```yaml
fields:
    - label: Online Image
      name: online_image
      widget: online_media
```
