import MenuItems from "./menu-items"

export default function MenuDesktop({ menu_name = "", menu = [] }) {
    return (
        <nav className="hidden md:flex items-center space-x-8 ml-auto">
            <MenuItems menu_name={menu_name} menu={menu} />
        </nav>
    )
}
