import Layout from "layouts/site"
import Image from "components/image"
import Post from "layouts/site/post"

export default function PostPage(props) {
    const { entity, aside_content } = props

    const {
        title = "",
        online_media,
        date = new Date().toLocaleDateString(),
        author = [],
        tags = [],
    } = entity

    return (
        <>
            <Layout entity={entity} aside_content={aside_content}>
                <section className="relative prose flex flex-col mx-auto pb-20">
                    {/* Cover Image */}
                    <div className="relative h-96 rounded-lg shadow-lg overflow-hidden">
                        <Image
                            className=""
                            src={online_media}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center center"
                        />
                    </div>

                    {/* Tags */}
                    <div className="my-6">
                        {tags &&
                            tags.map((tag) => (
                                <span
                                    className="text-xs leading-4 font-medium "
                                    key={tag}
                                >
                                    <u>{tag}</u>
                                </span>
                            ))}
                    </div>

                    {/* Title */}
                    <h1 className="font-serif">{title}</h1>

                    {/* Author and Date */}
                    <div className="pb-6">
                        {author &&
                            author.map((auth) => (
                                <span
                                    className=" text-gray-800 text-xs leading-4 font-medium"
                                    key={auth}
                                >
                                    by <b>{auth}</b>
                                </span>
                            ))}
                        <span className="ml-1 text-gray-800 text-xs   ">
                            | on {date}
                        </span>
                    </div>

                    {/* The Content itself*/}
                    <Post content={entity.editor} />
                </section>
            </Layout>
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
