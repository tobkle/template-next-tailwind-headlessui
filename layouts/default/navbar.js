import Link from "components/link"
import Icon from "components/icon"

export default function Navbar({ nav = true, menu = [] }) {
    if (!nav) return null
    const _menu = menu.filter((m) => Object.keys(m).length > 0).pop()
    if (!_menu.menu || _menu.menu.length < 1) return null
    return (
        <nav className="flex items-center space-x-8 ml-auto">
            {_menu.menu.map(({ label, slug, iconstyle, iconname }, i) => (
                <Link
                    label={label}
                    href={slug}
                    active={
                        "block uppercase font-semibold tracking-wider text-indigo-500"
                    }
                    passive={
                        "block uppercase font-semibold tracking-wider text-gray-600 "
                    }
                    index={i}
                    key={i}
                >
                    <Icon
                        className="text-gray-600"
                        iconstyle={iconstyle}
                        iconname={iconname}
                    />

                    {label}
                </Link>
            ))}
        </nav>
    )
}
