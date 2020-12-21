export default function Navbar({ nav = true, menu = [] }) {
    if (!nav) return null
    return (
        <nav className="">
            <h1>Navigation</h1>
            <ul></ul>
        </nav>
    )
}
