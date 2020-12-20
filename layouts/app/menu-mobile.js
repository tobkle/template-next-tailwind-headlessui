import cn from "classnames"
import LogoDesktop from "./logo-desktop"
import ProfileMobile from "./profile-mobile"
import SidebarButtonClose from "./sidebar-button-close"
import MenuItems from "./menu-items"

const linkCurrent =
    "bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
const linkDefault =
    "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"

export default function MenuMobile({ menu = [], showMenu, setShowMenu }) {
    return (
        <>
            {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
            <div className={cn({ hidden: !showMenu }, "lg:hidden")}>
                <div className="fixed inset-0 flex z-40">
                    {/*
    Off-canvas menu overlay, show/hide based on off-canvas menu state.

    Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
    Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    */}
                    <div className="fixed inset-0">
                        <div className="absolute inset-0 bg-gray-600 opacity-75" />
                    </div>

                    {/*
  Off-canvas menu, show/hide based on off-canvas menu state.

  Entering: "transition ease-in-out duration-300 transform"
    From: "-translate-x-full"
    To: "translate-x-0"
  Leaving: "transition ease-in-out duration-300 transform"
    From: "translate-x-0"
    To: "-translate-x-full"
*/}
                    <div
                        tabIndex={0}
                        className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
                    >
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <SidebarButtonClose setShowMenu={setShowMenu} />
                        </div>

                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <LogoDesktop />

                            <nav aria-label="Sidebar" className="mt-5">
                                <div className="px-2 space-y-1">
                                    <MenuItems
                                        menu={menu}
                                        linkCurrent={linkCurrent}
                                        linkDefault={linkDefault}
                                    />
                                </div>
                            </nav>
                        </div>

                        <ProfileMobile />
                    </div>

                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Force sidebar to shrink to fit close icon */}
                    </div>
                </div>
            </div>
        </>
    )
}
