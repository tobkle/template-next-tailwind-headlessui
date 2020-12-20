import Link from "next/link"
import cn from "classnames"
import Icon from "components/icon"

const iconCurrent = "text-gray-500 mr-3 h-6 w-6"
const iconDefault = "text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
const linkCurrent =
    "bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
const linkDefault =
    "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"

const menu_old = [
    {
        label: "Dashboard",
        slug: "/dashboard",
        iconstyle: "outline",
        iconname: "Home",
    },
    {
        label: "Calendar",
        slug: "/calendar",
        iconstyle: "outline",
        iconname: "Calendar",
    },
    {
        label: "Teams",
        slug: "/teams",
        iconstyle: "outline",
        iconname: "UserGroup",
    },
    {
        label: "Directory",
        slug: "/directory",
        iconstyle: "outline",
        iconname: "SearchCircle",
    },
    {
        label: "Announcements",
        slug: "/announcements",
        iconstyle: "outline",
        iconname: "Speakerphone",
    },
    {
        label: "Office Map",
        slug: "/map",
        iconstyle: "outline",
        iconname: "Map",
    },
]

export default function MenuItems({ menu }) {
    return (
        <>
            {menu_old &&
                menu_old.map(({ slug, label, iconname, iconstyle }, i) => (
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
