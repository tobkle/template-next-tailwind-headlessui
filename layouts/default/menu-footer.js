import Link from "components/link"
import Icon from "components/icon"

export default function MenuFooter({ menu_entries = [] }) {
    return (
        <nav className="flex items-center space-x-8 ml-auto my-4">
            {menu_entries.map(({ label, slug, iconstyle, iconname }, i) => (
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
