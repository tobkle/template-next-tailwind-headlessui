import Nav from "./nav"

export default function Header({ nav = true, logo = true }) {
    return (
        <header className="md:sticky top-0 flex-auto bg-teal-200">
            {nav && <Nav />}
        </header>
    )
}
