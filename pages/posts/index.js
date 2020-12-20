import Link from "next/link"
import DebugData from "components/debug-data"
const contentType = "posts"

export default function Post(props) {
    const { entities, menu } = props
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

            <DebugData page="Posts" data={props} name="entities" />
        </>
    )
}

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
export async function getStaticProps({ params }) {
    const getAll = require("lib/api").getAll
    const menuType = "menu"
    const menuFields = ["menues"]
    const menu = getAll(menuType, menuFields)
    const entities = getAll(contentType, contentFields)
    return {
        props: {
            entities,
            menu,
        },
    }
}
