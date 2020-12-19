import { getAll, getBySlug, getFieldsFromConfig } from "lib/api"
const contentType = "posts"
const contentTypeFields = getFieldsFromConfig(contentType)

export default function Post({ entity }) {
    return <pre>{JSON.stringify(entity, null, 2)}</pre>
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
