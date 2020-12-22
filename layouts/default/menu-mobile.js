import LogoMobile from "./logo-mobile"
import MenuItems from "./menu-items"

export default function MenuMobile({ menu_name = "", menu = [], showMenu }) {
    if (!showMenu) return null
    return (
        <div className="md:hidden absolute bg-gray-100 px-4 py-8 shadow-lg w-80">
            <nav className="mt-5" aria-label="Sidebar">
                <LogoMobile />

                <MenuItems
                    className="block px-6 py-2 hover:bg-indigo-100"
                    menu_name={menu_name}
                    menu={menu}
                />
            </nav>
        </div>
    )
}
