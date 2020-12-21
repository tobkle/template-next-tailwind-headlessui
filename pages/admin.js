import React from "react"
import dynamic from "next/dynamic"
import config from "cms/config.yaml"
import {
    HeroIconControl,
    HeroIconPreview,
    HeroIconSchema,
} from "cms/widget/heroicon"

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
                window.cms.registerPreviewStyle("/css/tailwindCMS.css")

                // Custom Widgets
                window.cms.registerWidget(
                    "heroicon",
                    HeroIconControl,
                    HeroIconPreview,
                    HeroIconSchema
                )
            }),
        { ssr: false, loading: () => <p>Loading...</p> }
    )

    return <CMS />
}
