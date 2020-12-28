import React from "react"
import MDX from "@mdx-js/runtime"
import { MDXProvider } from "@mdx-js/react"
import gfm from "remark-gfm"
import Image from "components/image"
import Icon from "components/icon"

const remarkPlugins = [gfm]
const components = {
    Image,
    Icon,
}
const scope = {
    headerText: "My Text",
}

export default function ElementPreview({ entry, widgetFor }) {
    const collection = entry.getIn(["data", "collection"])
    const lang = entry.getIn(["data", "content", "lang"])
    const code = entry.getIn(["data", "content", "code"])
    return (
        <>
            <div className="w-full h-full prose">
                <MDX
                    components={components}
                    scope={scope}
                    remarkPlugins={remarkPlugins}
                >
                    {code}
                </MDX>
            </div>
        </>
    )
}
/*
                <ContentElement
                    collection={collection}
                    lang={lang}
                    element={code}
                />
                */
