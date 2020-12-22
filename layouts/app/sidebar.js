import LogoDesktop from "./logo-desktop"
import MenuDesktop from "./menu-desktop"
import ProfileDesktop from "./profile-desktop"

/* static sidebar for desktop */
export default function Sidebar({ menu_name = "", menu = [] }) {
    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-gray-100">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <LogoDesktop />
                        <MenuDesktop menu_name={menu_name} menu={menu} />
                    </div>
                    <ProfileDesktop />
                </div>
            </div>
        </div>
    )
}
