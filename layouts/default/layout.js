import Head from "next/head"
import Header from "./header"
import Main from "./main"
import Footer from "./footer"

export default function Layout({
    title = "",
    header = true,
    nav = true,
    logo = true,
    main = true,
    article = true,
    aside = true,
    footer = true,
    children,
}) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <div className="relative flex flex-row flex-wrap h-screen">
                {header && <Header nav={nav} logo={logo} />}

                {main && (
                    <Main aside={aside} article={article}>
                        {children}
                    </Main>
                )}

                {footer && <Footer />}
            </div>
        </>
    )
}
