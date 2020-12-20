import LogoMobile from "./logo-mobile"
import SidebarButton from "./sidebar-button"

export default function MenuMobileNavbar({ setShowMenu }) {
    return (
        <div className="lg:hidden">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
                <LogoMobile />
                <SidebarButton setShowMenu={setShowMenu} />
            </div>
        </div>
    )
}
