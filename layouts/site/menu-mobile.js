import LogoMobile from "./logo-mobile"
import MenuItems from "./menu-items"
import SidebarButtonClose from "./sidebar-button-close"
import cn from "classnames"

export default function MenuMobile({
    menu_name = "",
    menu = [],
    showMenu,
    setShowMenu,
}) {
    return (
        <div className={cn({ hidden: !showMenu }, "lg:hidden")}>
            <div className="fixed inset-0 flex z-40">
                <div className="fixed inset-0">
                    <div className="absolute inset-0 bg-gray-600 opacity-75" />
                </div>

                <div
                    tabIndex={0}
                    className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
                >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <SidebarButtonClose setShowMenu={setShowMenu} />
                    </div>

                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="pl-7">
                            <LogoMobile />
                        </div>

                        <nav className="mt-5" aria-label="Sidebar">
                            <div className="px-2 space-y-1">
                                <MenuItems
                                    className="block px-6 py-2 hover:bg-indigo-100"
                                    menu_name={menu_name}
                                    menu={menu}
                                />
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="flex-shrink-0 w-14" aria-hidden="true">
                    {/* Force sidebar to shrink to fit close icon */}
                </div>
            </div>
        </div>
    )
}
