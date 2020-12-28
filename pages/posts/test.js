import renderToString from "next-mdx-remote/render-to-string"
import hydrate from "next-mdx-remote/hydrate"
import matter from "gray-matter"

const components = { Test }

export default function TestPage({ source, frontmatter }) {
    const content = hydrate(source, { components })
    return (
        <div className="wrapper prose">
            <h1>{frontmatter.title}</h1>
            {content}
        </div>
    )
}

export async function getStaticProps() {
    const source = `---
title: Blog Title 
---

Some **mdx** text, with a component <Test />
`
    const { content, data } = matter(source)
    const mdxSource = await renderToString(content, { components, scope: data })
    return { props: { source: mdxSource, frontmatter: data } }
}

function Test() {
    return <>Test Component</>
}
