import MenuItems from "./menu-items"

export default function MenuDesktop({ menu = [] }) {
    return (
        <nav className="mt-5 flex-1" aria-label="Sidebar">
            <div className="px-2 space-y-1">
                <MenuItems menu={menu} />
            </div>
        </nav>
    )
}
