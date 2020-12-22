import { getFieldsFromConfig } from "lib/api"
import Layout from "layouts/default"
import DebugData from "components/debug-data"
const contentType = "pages"
const contentTypeFields = getFieldsFromConfig(contentType)

export default function Page(props) {
    const { entity, menu } = props
    return (
        <>
            <Layout
                title="Home"
                header={true}
                main={true}
                aside={true}
                footer={true}
                entity={entity}
                menu={menu}
            >
                <section>
                    Aliquip eiusmod aute non aliqua commodo adipisicing ut
                    pariatur. Deserunt enim reprehenderit adipisicing ea magna.
                    Eu qui ea in irure duis aute incididunt amet enim fugiat
                    laborum incididunt nulla enim. Aliquip proident ullamco enim
                    labore ullamco adipisicing eiusmod Lorem irure occaecat ea
                    aliquip. Reprehenderit consequat mollit esse duis elit ipsum
                    cupidatat sunt elit ad eu quis cillum. Magna consectetur
                    incididunt ex nisi. Dolor mollit non eiusmod veniam
                    cupidatat consequat deserunt ex eiusmod non pariatur ad.
                    Aliquip consectetur elit do velit laboris est irure. Labore
                    dolore nulla occaecat reprehenderit eiusmod cillum dolor
                    amet. Aliqua et eiusmod exercitation incididunt aliquip esse
                    anim ea. Ipsum pariatur reprehenderit velit elit velit ex
                    tempor reprehenderit enim incididunt aute commodo. Excepteur
                    sint deserunt irure sint Lorem veniam dolore officia irure
                    sit. Aliquip ullamco eiusmod ut occaecat deserunt id
                    consequat dolore aliquip in minim irure laboris. Magna
                    laborum irure eu in reprehenderit occaecat quis deserunt
                    duis proident officia ullamco. Nulla aute officia occaecat
                    duis velit tempor veniam ut et.
                </section>
                <section>
                    Aliquip eiusmod aute non aliqua commodo adipisicing ut
                    pariatur. Deserunt enim reprehenderit adipisicing ea magna.
                    Eu qui ea in irure duis aute incididunt amet enim fugiat
                    laborum incididunt nulla enim. Aliquip proident ullamco enim
                    labore ullamco adipisicing eiusmod Lorem irure occaecat ea
                    aliquip. Reprehenderit consequat mollit esse duis elit ipsum
                    cupidatat sunt elit ad eu quis cillum. Magna consectetur
                    incididunt ex nisi. Dolor mollit non eiusmod veniam
                    cupidatat consequat deserunt ex eiusmod non pariatur ad.
                    Aliquip consectetur elit do velit laboris est irure. Labore
                    dolore nulla occaecat reprehenderit eiusmod cillum dolor
                    amet. Aliqua et eiusmod exercitation incididunt aliquip esse
                    anim ea. Ipsum pariatur reprehenderit velit elit velit ex
                    tempor reprehenderit enim incididunt aute commodo. Excepteur
                    sint deserunt irure sint Lorem veniam dolore officia irure
                    sit. Aliquip ullamco eiusmod ut occaecat deserunt id
                    consequat dolore aliquip in minim irure laboris. Magna
                    laborum irure eu in reprehenderit occaecat quis deserunt
                    duis proident officia ullamco. Nulla aute officia occaecat
                    duis velit tempor veniam ut et.
                </section>
                <section>
                    Aliquip eiusmod aute non aliqua commodo adipisicing ut
                    pariatur. Deserunt enim reprehenderit adipisicing ea magna.
                    Eu qui ea in irure duis aute incididunt amet enim fugiat
                    laborum incididunt nulla enim. Aliquip proident ullamco enim
                    labore ullamco adipisicing eiusmod Lorem irure occaecat ea
                    aliquip. Reprehenderit consequat mollit esse duis elit ipsum
                    cupidatat sunt elit ad eu quis cillum. Magna consectetur
                    incididunt ex nisi. Dolor mollit non eiusmod veniam
                    cupidatat consequat deserunt ex eiusmod non pariatur ad.
                    Aliquip consectetur elit do velit laboris est irure. Labore
                    dolore nulla occaecat reprehenderit eiusmod cillum dolor
                    amet. Aliqua et eiusmod exercitation incididunt aliquip esse
                    anim ea. Ipsum pariatur reprehenderit velit elit velit ex
                    tempor reprehenderit enim incididunt aute commodo. Excepteur
                    sint deserunt irure sint Lorem veniam dolore officia irure
                    sit. Aliquip ullamco eiusmod ut occaecat deserunt id
                    consequat dolore aliquip in minim irure laboris. Magna
                    laborum irure eu in reprehenderit occaecat quis deserunt
                    duis proident officia ullamco. Nulla aute officia occaecat
                    duis velit tempor veniam ut et.
                </section>
            </Layout>

            <DebugData page="Page" data={props} name="entity" />
        </>
    )
}

// get all slugs for that content type
export async function getStaticPaths() {
    const getAll = require("lib/api").getAll
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
    const getBySlug = require("lib/api").getBySlug
    const menuType = "menu"
    const menuFields = ["menu_entries", "slug"]
    const menu = getAll(menuType, menuFields)
    const entity = getBySlug(contentType, params.slug, contentTypeFields)
    return {
        props: {
            entity,
            menu,
        },
    }
}
