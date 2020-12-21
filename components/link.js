import Link from "next/link"
import { useRouter } from "next/router"

export default function LinkInternalExternal({
    href = "/",
    label = "Menu",
    index = 0,
    active = "",
    passive = "",
}) {
    try {
        const { asPath = "" } = useRouter()
        if (!href) return null

        if (href.startsWith("http")) {
            return (
                <a key={index} href={href} className={passive}>
                    {label}
                </a>
            )
        } else {
            return (
                <Link key={index} href={href}>
                    <a
                        key={index}
                        className={href === asPath ? `${active}` : `${passive}`}
                    >
                        {label}
                    </a>
                </Link>
            )
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
