import Head from "next/head"
import Header from "./header"
import Main from "./main"
import Footer from "./footer"
import config from "config"

export default function Layout({
    title = "",
    header = true,
    logo = true,
    nav = true,
    menu = [],
    main = true,
    aside = true,
    article = true,
    footer = true,
    children,
}) {
    return (
        <>
            <Head>
                <title>
                    {title} | {config.SeoSiteTitle}
                </title>
            </Head>

            <div className="flex flex-col h-screen">
                <Header header={header} logo={logo} nav={nav} menu={menu} />

                <Main main={main} aside={aside} article={article}>
                    {children}
                </Main>

                <Footer footer={footer} />
            </div>
        </>
    )
}
