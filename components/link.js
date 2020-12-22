import Link from "next/link"
import { useRouter } from "next/router"

export default function LinkInternalExternal({
    href = "/",
    label = "Menu",
    index = 0,
    active = "",
    passive = "",
    className = "",
}) {
    try {
        const { asPath = "" } = useRouter()
        if (!href) return null

        if (href.startsWith("http")) {
            return (
                <span className={className}>
                    <a key={index} href={href} className={passive}>
                        {label}
                    </a>
                </span>
            )
        } else {
            return (
                <span className={className}>
                    <Link key={index} href={href}>
                        <a
                            key={index}
                            className={
                                href === asPath ? `${active}` : `${passive}`
                            }
                        >
                            {label}
                        </a>
                    </Link>
                </span>
            )
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
