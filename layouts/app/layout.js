import { useState } from "react"
import Sidebar from "./sidebar"
import Aside from "./aside"
import Main from "./main"
import MenuMobileNavbar from "./menu-mobile-navbar"
import MenuMobile from "./menu-mobile"

export default function Layout({ entity = {}, menu = [], children }) {
    const [showMenu, setShowMenu] = useState(false)
    const { main_menu, footer_menu } = entity
    return (
        <div className="h-screen flex overflow-hidden bg-white">
            <MenuMobile
                menu_name={main_menu}
                menu={menu}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
            />

            <Sidebar menu_name={main_menu} menu={menu} />

            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                <MenuMobileNavbar setShowMenu={setShowMenu} />
                <div className="flex-1 relative z-0 flex overflow-hidden">
                    <Main>{children}</Main>
                    <Aside />
                </div>
            </div>
        </div>
    )
}
