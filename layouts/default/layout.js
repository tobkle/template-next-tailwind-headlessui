import { useState } from "react"
import Head from "next/head"
import Header from "./header"
import MenuMobile from "./menu-mobile"
import Main from "./main"
import Footer from "./footer"
import config from "config"

export default function Layout({
    title = "",
    header = true,
    logo = true,
    nav = true,
    entity = {},
    menu = [],
    main = true,
    aside = true,
    article = true,
    footer = true,
    children,
}) {
    const [showMenu, setShowMenu] = useState(false)
    const { main_menu, footer_menu } = entity
    return (
        <>
            <Head>
                <title>
                    {title} | {config.SeoSiteTitle}
                </title>
            </Head>

            <div className="flex flex-col h-screen">
                <Header
                    header={header}
                    logo={logo}
                    nav={nav}
                    menu_name={main_menu}
                    menu={menu}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                />

                <MenuMobile
                    menu_name={main_menu}
                    menu={menu}
                    showMenu={showMenu}
                />

                <Main main={main} aside={aside} article={article}>
                    {children}
                </Main>

                <Footer footer={footer} menu_name={footer_menu} menu={menu} />
            </div>
        </>
    )
}
