import Link from "next/link"
import { useRouter } from "next/router"

export default function LinkInternalExternal({
    href = "/",
    label = "",
    index = 0,
    active = "",
    passive = "",
    className = "",
    children,
}) {
    try {
        const { asPath = "" } = useRouter()
        if (!href) return null

        if (href.startsWith("http")) {
            return (
                <span className={className}>
                    <a key={index} href={href} className={passive}>
                        {label} {children}
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
