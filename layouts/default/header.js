import Container from "./container"
import Logo from "./logo-desktop"
import Navbar from "./navbar"

export default function Header({
    header = true,
    logo = true,
    nav = true,
    menu_name = "",
    menu = [],
    showMenu,
    setShowMenu,
}) {
    if (!header) return null
    return (
        <header>
            <Container>
                <Logo logo={logo} showMenu={showMenu} />

                <Navbar
                    nav={nav}
                    menu_name={menu_name}
                    menu={menu}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                />
            </Container>
        </header>
    )
}
