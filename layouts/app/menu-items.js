import Link from "next/link"
import cn from "classnames"
import Icon from "components/icon"
import { getMenuEntries } from "lib/helpers"

const iconCurrent = "text-gray-500 mr-3 h-6 w-6"
const iconDefault = "text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"

export default function MenuItems({
    menu_name = "",
    menu = [],
    linkCurrent = "",
    linkDefault = "",
}) {
    const menu_entries = getMenuEntries(menu_name, menu)
    return (
        <>
            {menu_entries.map(({ slug, label, iconname, iconstyle }, i) => (
                <Link key={slug} href={slug}>
                    <a
                        className={cn({
                            [linkCurrent]: i === 0,
                            [linkDefault]: i !== 0,
                        })}
                    >
                        <Icon
                            iconstyle={iconstyle}
                            iconname={iconname}
                            className={cn({
                                [iconCurrent]: i === 0,
                                [iconDefault]: i !== 0,
                            })}
                        />
                        {label}
                    </a>
                </Link>
            ))}
        </>
    )
}
