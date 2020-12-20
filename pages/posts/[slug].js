import { getAll, getBySlug, getFieldsFromConfig } from "lib/api"
import Layout from "layouts/default"
import DebugData from "components/debug-data"
const contentType = "posts"
const contentTypeFields = getFieldsFromConfig(contentType)

export default function Post({ entity }) {
    return (
        <>
            <Layout
                title="Home"
                header={true}
                main={true}
                aside={true}
                footer={true}
            ></Layout>

            <DebugData page="Post" data={entity} name="entity" />
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
    const entity = getBySlug(contentType, params.slug, contentTypeFields)
    return {
        props: {
            entity,
        },
    }
}
