import Head from "next/head"
import Layout from "layouts/default"

export default function Home() {
    return (
        <>
            <Layout
                title="Home"
                header={true}
                main={true}
                aside={true}
                footer={true}
            >
                Content
            </Layout>
        </>
    )
}
