import LogoMobile from "./logo-mobile"
import SidebarButton from "./sidebar-button"

export default function MenuMobileNavbar({
    nav = false,
    logo = false,
    setShowMenu,
}) {
    if (!nav) return null
    return (
        <div className="lg:hidden">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
                <LogoMobile logo={logo} />
                <SidebarButton setShowMenu={setShowMenu} />
            </div>
        </div>
    )
}
