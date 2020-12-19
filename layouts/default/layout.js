import Head from "next/head"
import Header from "./header"
import Main from "./main"
import Aside from "./aside"
import Footer from "./footer"

export default function Layout({
    title = "",
    header = true,
    main = true,
    aside = true,
    footer = true,
    children,
}) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            {header && <Header />}
            {aside && <Aside />}
            {main && <Main>{children}</Main>}
            {footer && <Footer />}
        </>
    )
}
