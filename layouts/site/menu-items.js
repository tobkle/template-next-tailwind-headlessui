import Link from "components/link"
import Icon from "components/icon"
import { getMenuEntries } from "lib/helpers"

export default function MenuItems({
    menu_name = "",
    menu = [],
    className = "",
}) {
    const menu_entries = getMenuEntries(menu_name, menu)
    return (
        <>
            {menu_entries.map(({ label, slug, iconstyle, iconname }, i) => (
                <Link
                    className={className}
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
        </>
    )
}
