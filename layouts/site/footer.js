import Container from "./container"
import MenuFooter from "./menu-footer.js"
import { getMenuEntries } from "lib/helpers"

export default function Footer({ footer = true, menu_name = "", menu = [] }) {
    if (!footer) return null
    const menu_entries = getMenuEntries(menu_name, menu)
    return (
        <footer>
            <Container>
                <div className="w-full flex flex-row items-center">
                    <Copyright />
                    <MenuFooter menu_entries={menu_entries} />
                </div>
            </Container>
        </footer>
    )
}

function Copyright() {
    return (
        <span className="block uppercase font-semibold tracking-wider text-gray-600 ">
            Copyright {new Date().getFullYear()}
        </span>
    )
}
