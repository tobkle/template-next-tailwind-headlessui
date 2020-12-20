import Nav from "./nav"

export default function Header({ nav = true, logo = true }) {
    return (
        <header className="sticky top-0 flex items-center flex-shrink-0 xl:hidden bg-teal-200">
            {nav && <Nav />}
        </header>
    )
}
