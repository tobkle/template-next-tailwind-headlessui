import Link from "next/link"
import cn from "classnames"
import Icon from "components/icon"

const iconCurrent = "text-gray-500 mr-3 h-6 w-6"
const iconDefault = "text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"

export default function MenuItems({
    menu,
    linkCurrent = "",
    linkDefault = "",
}) {
    const { appmenu } = menu[0]
    if (!appmenu || appmenu.length < 1) return null
    return (
        <>
            {appmenu &&
                appmenu.map(({ slug, label, iconname, iconstyle }, i) => (
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
