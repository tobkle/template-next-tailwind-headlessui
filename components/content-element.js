import React from "react"
import MDX from "@mdx-js/runtime"
import { MDXProvider } from "@mdx-js/react"
import gfm from "remark-gfm"

const remarkPlugins = [gfm]
const components = {}
const scope = {}
const content = `
# Hello, world!
`

export default function ContentElement({ collection, lang, element }) {
    return (
        <MDXProvider
            components={components}
            scope={scope}
            remarkPlugins={remarkPlugins}
        >
            <MDX>{content}</MDX>
        </MDXProvider>
    )
}

// return <div dangerouslySetInnerHTML={createMarkup(element)} />
// function createMarkup(element) {
//     return {
//         __html: element,
//     }
// }
