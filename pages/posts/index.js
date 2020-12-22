import Link from "next/link"
import Layout from "layouts/site"
import DebugData from "components/debug-data"

export default function Post(props) {
    const { entity, entities, aside_content } = props
    return (
        <Layout entity={entity} aside_content={aside_content}>
            <ul>
                {entities &&
                    entities.map((e, i) => (
                        <li key={i}>
                            <Link href={`/posts/${e.slug}`}>
                                <a>{e.title}</a>
                            </Link>
                        </li>
                    ))}
            </ul>

            <DebugData page="Posts" data={props} name="entities" />
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const getAll = require("lib/api").getAll
    const getAsideContent = require("lib/api").getAsideContent
    const contentFields = [
        "slug",
        "title",
        "draft",
        "image",
        "author",
        "date",
        "date_to",
        "published",
        "tags",
    ]

    const settings = getAll("settings", ["general", "posts", "layout"]).pop()
    const entities = getAll("posts", contentFields)
    const entity = { slug: "/posts/", ...settings.posts }

    const menuType = "menu"
    const menuFields = ["menu_entries", "slug"]
    const menu = getAll(menuType, menuFields)
    entity.menu = menu

    const aside_content = getAsideContent()

    return {
        props: {
            entity,
            entities,
            aside_content,
        },
    }
}
