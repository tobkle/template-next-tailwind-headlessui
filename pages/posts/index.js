import Link from "next/link"
import DebugData from "components/debug-data"

export default function Post({ entities }) {
    return (
        <>
            <ul>
                {entities &&
                    entities.map((e, i) => (
                        <li key={i}>
                            <Link href={`/${contentType}/${e.slug}`}>
                                <a>{e.title}</a>
                            </Link>
                        </li>
                    ))}
            </ul>

            <DebugData page="Posts" data={entities} name="entities" />
        </>
    )
}

// Reading all Posts
const contentType = "posts"
export async function getStaticProps({ params }) {
    const fs = require("fs")
    const matter = require("gray-matter")
    const contentPath = `${process.cwd()}/content/${contentType}`
    const files = fs.readdirSync(contentPath)
    const entities = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
            const path = `${contentPath}/${file}`
            const content = fs.readFileSync(path, { encoding: "utf-8" })
            const { data } = matter(content)
            return { slug: file.replace(".md", ""), ...data }
        })
    return {
        props: {
            entities,
        },
    }
}
