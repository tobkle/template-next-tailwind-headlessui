import { getAll, getBySlug, getFieldsFromConfig } from "lib/api"
import Layout from "layouts/default"
import DebugData from "components/debug-data"
const contentType = "posts"
const contentTypeFields = getFieldsFromConfig(contentType)

export default function Post(props) {
    const { entity, menu } = props
    return (
        <>
            <Layout
                title="Home"
                header={true}
                main={true}
                aside={true}
                footer={true}
                menu={menu}
            ></Layout>

            <DebugData page="Post" data={props} name="entity" />
        </>
    )
}

// get all slugs for that content type
export async function getStaticPaths() {
    const entities = await getAll(contentType, ["slug"])
    const paths = entities.map((entity) => ({
        params: { slug: entity.slug },
    }))
    return {
        paths,
        fallback: false,
    }
}

// get the content to a slug to generate a static page
export async function getStaticProps({ params }) {
    const getAll = require("lib/api").getAll
    const menuType = "menu"
    const menuFields = ["menues"]
    const menu = getAll(menuType, menuFields)
    const entity = getBySlug(contentType, params.slug, contentTypeFields)
    return {
        props: {
            entity,
            menu,
        },
    }
}
