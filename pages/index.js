import { getAll, getBySlug, getFieldsFromConfig } from "lib/api"
import Layout from "layouts/default"
import DebugData from "components/debug-data"
const contentType = "pages"
const contentTypeFields = getFieldsFromConfig(contentType)

export default function Page({ entity }) {
    return (
        <>
            <Layout
                title="Home"
                header={true}
                main={true}
                aside={true}
                footer={true}
            >
                {[0, 1, 2, 3, 4, 5].map((a, i) => (
                    <section className="bg-yellow-200 m-4" key={i}>
                        <p>
                            Voluptate dolor anim ex laboris esse voluptate elit
                            culpa nisi reprehenderit anim sint ad fugiat. Eu
                            laboris occaecat nulla consectetur nulla sit quis
                            enim voluptate deserunt incididunt reprehenderit
                            fugiat. Excepteur quis nisi ea culpa labore in culpa
                            culpa id ea commodo. Consequat incididunt voluptate
                            veniam in dolor pariatur mollit qui reprehenderit
                            deserunt. Minim id pariatur dolore labore. Officia
                            exercitation nisi aliquip id reprehenderit et id
                            quis pariatur eiusmod pariatur esse pariatur
                            nostrud. Nulla elit qui veniam duis do voluptate id.
                            Ullamco id incididunt qui reprehenderit quis velit
                            sint enim dolor ipsum. Duis deserunt consequat et
                            adipisicing officia voluptate cillum ex.
                            Exercitation laborum eiusmod ad anim dolor magna do
                            irure. Pariatur dolore exercitation ipsum do magna
                            non. Cupidatat dolor deserunt Lorem sunt ea sunt
                            quis esse cupidatat ad ad. Est excepteur commodo
                            velit et aute ea aute. Incididunt amet ea non
                            consequat et. Ipsum non ipsum veniam quis esse est
                            mollit culpa. Ut nisi amet adipisicing culpa nulla
                            dolore aliquip qui officia ullamco reprehenderit
                            commodo veniam. Labore voluptate laboris voluptate
                            esse ipsum. Esse fugiat proident mollit ad proident
                            ullamco veniam est consequat ut ea mollit. Aliquip
                            pariatur aute pariatur aliqua cupidatat magna aliqua
                            proident sint eiusmod ad ullamco.
                        </p>
                    </section>
                ))}
            </Layout>

            <DebugData page="Page" data={entity} name="entity" />
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
    const entity = getBySlug(contentType, "home", contentTypeFields)
    return {
        props: {
            entity,
        },
    }
}
