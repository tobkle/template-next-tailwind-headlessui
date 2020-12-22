import { useState } from "react"
import Head from "next/head"
import Sidebar from "./sidebar"
import Aside from "./aside"
import Main from "./main"
import MenuMobileNavbar from "./menu-mobile-navbar"
import MenuMobile from "./menu-mobile"
import config from "config"

export default function Layout({ entity = {}, aside_content, children }) {
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

            <div className="h-screen flex overflow-hidden bg-white">
                <MenuMobile
                    nav={nav}
                    logo={logo}
                    menu_name={main_menu}
                    menu={menu}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                />

                <Sidebar
                    nav={nav}
                    logo={logo}
                    menu_name={main_menu}
                    menu={menu}
                />

                <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                    <MenuMobileNavbar
                        nav={nav}
                        logo={logo}
                        setShowMenu={setShowMenu}
                    />

                    <div className="flex-1 relative z-0 flex overflow-hidden">
                        <Main main={main}>{children}</Main>
                        <Aside aside={aside} aside_content={aside_content} />
                    </div>
                </div>
            </div>
        </>
    )
}
