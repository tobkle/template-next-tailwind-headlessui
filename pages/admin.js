import React from "react"
import dynamic from "next/dynamic"
import config from "cms/config.yaml"
import {
    HeroIconControl,
    HeroIconPreview,
    HeroIconSchema,
} from "cms/widget/heroicon"
import {
    OnlineMediaControl,
    OnlineMediaPreview,
    OnlineMediaSchema,
} from "cms/widget/online_media"
import { EditorControl, EditorPreview, EditorSchema } from "cms/widget/editor"
import ElementPreview from "cms/preview/element-preview"

export default function AdminPage() {
    const CMS = dynamic(
        () =>
            // load dependencies
            Promise.all([
                import("netlify-cms-app"),
                import("netlify-cms-locales"),
            ]).then((mods) => {
                // register dependencies
                window.cms = mods[0]
                const { de } = mods[1]

                // initialize CMS
                window.cms.init({ config })
                window.cms.registerLocale("de", de)

                // use the following css for the previews in the cms
                // generate the css bundle with `npm run buildcms`
                window.cms.registerPreviewStyle(
                    "https://fonts.googleapis.com/icon?family=Material+Icons"
                )
                window.cms.registerPreviewStyle("/css/tailwindCMS.css")

                // Custom Widgets
                window.cms.registerWidget(
                    "heroicon",
                    HeroIconControl,
                    HeroIconPreview,
                    HeroIconSchema
                )
                window.cms.registerWidget(
                    "online_media",
                    OnlineMediaControl,
                    OnlineMediaPreview,
                    OnlineMediaSchema
                )
                window.cms.registerWidget(
                    "editor",
                    EditorControl,
                    EditorPreview,
                    EditorSchema
                )

                window.cms.registerPreviewTemplate("elements", ElementPreview)
            }),
        { ssr: false, loading: () => <p>Loading...</p> }
    )

    return <CMS />
}
