import MenuButton from "./menu-button"
import MenuDesktop from "./menu-desktop"

export default function Navbar({ nav = true, menu_name = "", menu = [], showMenu, setShowMenu }) {
    if (!nav) return null
    return (
        <>
            <MenuButton showMenu={showMenu} setShowMenu={setShowMenu} />
            <MenuDesktop menu_name={menu_name} menu={menu} />
        </>
    )
}
