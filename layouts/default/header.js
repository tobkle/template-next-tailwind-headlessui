import Container from "./container"
import Logo from "./logo"
import Navbar from "./navbar"

export default function Header({
    header = true,
    logo = true,
    nav = true,
    menu = [],
}) {
    if (!header) return null
    return (
        <header>
            <Container>
                <Logo logo={logo} />
                <Navbar nav={nav} menu={menu} />
            </Container>
        </header>
    )
}
