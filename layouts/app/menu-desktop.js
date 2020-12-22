import MenuItems from "./menu-items"
const linkCurrent =
    "bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
const linkDefault =
    "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"

export default function MenuDesktop({ menu_name = "", menu = [] }) {
    return (
        <nav className="mt-5 flex-1" aria-label="Sidebar">
            <div className="px-2 space-y-1">
                <MenuItems
                    menu_name={menu_name}
                    menu={menu}
                    linkCurrent={linkCurrent}
                    linkDefault={linkDefault}
                />
            </div>
        </nav>
    )
}
