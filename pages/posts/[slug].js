import Layout from "layouts/site"
import Image from "components/image"
import DebugData from "components/debug-data"

export default function Post(props) {
    const { entity, aside_content } = props

    const {
        title = "",
        content = "",
        image = "",
        date = new Date().toLocaleDateString(),
        author = [],
        tags = [],
    } = entity

    return (
        <>
            <Layout entity={entity} aside_content={aside_content}>
                <div className="relative prose flex flex-col mx-auto pb-20">
                    {/* Cover Image */}
                    <Image
                        src={image}
                        alt={title}
                        layout="responsive"
                        width={1000}
                        height={800}
                    />

                    {/* Tags */}
                    <div className="my-6">
                        {tags &&
                            tags.map((t) => (
                                <span
                                    className="px-2 py-1 text-indigo-800 text-xs leading-4 font-medium bg-indigo-100 rounded-full"
                                    key={t}
                                >
                                    {t}
                                </span>
                            ))}
                    </div>

                    {/* Title */}
                    <h1>{title}</h1>

                    {/* Author and Date */}
                    <div className="pb-6">
                        {author &&
                            author.map((a) => (
                                <span
                                    className="px-2 py-1 text-gray-800 text-xs leading-4 font-medium bg-gray-100 rounded-full"
                                    key={a}
                                >
                                    {a}
                                </span>
                            ))}
                        <span className="ml-4 px-2 py-1 text-gray-800 text-xs leading-4 font-medium bg-gray-100 rounded-full">
                            {date}
                        </span>
                    </div>

                    {/* Content */}
                    {content}
                </div>
            </Layout>

            <DebugData page="Post" data={props} name="entity" />
        </>
    )
}

// get all slugs for that content type
export async function getStaticPaths() {
    const getAll = require("lib/api").getAll
    const entities = await getAll("posts", ["slug"])
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
    const getBySlug = require("lib/api").getBySlug
    const getAsideContent = require("lib/api").getAsideContent
    const getFieldsFromConfig = require("lib/api").getFieldsFromConfig

    const contentTypeFields = getFieldsFromConfig("posts")
    const settings = getAll("settings", ["general", "posts", "layout"]).pop()
    let entity = getBySlug("posts", params.slug, contentTypeFields)
    entity = { ...settings.posts, ...entity }

    const menuType = "menu"
    const menuFields = ["menu_entries", "slug"]
    const menu = getAll(menuType, menuFields)
    entity.menu = menu

    const aside_content = getAsideContent()
    return {
        props: {
            entity,
            aside_content,
        },
    }
}
