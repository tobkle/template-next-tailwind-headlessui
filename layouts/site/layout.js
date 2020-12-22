import { useState } from "react"
import Head from "next/head"
import Header from "./header"
import MenuMobile from "./menu-mobile"
import Main from "./main"
import Footer from "./footer"
import config from "config"

export default function Layout({ entity = {}, children }) {
    const [showMenu, setShowMenu] = useState(false)

    const {
        title = "",
        main_menu = "site_menu",
        footer_menu = "footer_menu",
        menu = [],
        layout = {},
    } = entity

    const {
        header = false,
        logo = false,
        nav = false,
        main = false,
        aside = false,
        article = false,
        footer = false,
    } = layout

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
                    setShowMenu={setShowMenu}
                />

                <Main main={main} aside={aside} article={article}>
                    {children}
                </Main>

                <Footer footer={footer} menu_name={footer_menu} menu={menu} />
            </div>
        </>
    )
}
