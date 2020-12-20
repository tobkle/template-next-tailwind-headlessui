import React, { useContext, useEffect } from "react"
import Cookies from "js-cookie"
import { Context } from "contexts/global"
import { useRouter } from "next/router"

const cookies = () => {
    const router = useRouter()
    const {
        config: { cookieName },
        setCookieAccept,
    } = useContext(Context)

    useEffect(() => {
        Cookies.remove(cookieName)
        Cookies.remove("_ga")
        Cookies.remove("_gld")
        Cookies.remove("_gid")
        Cookies.remove("_gat_gtag_G_W1SN9GVT1W")
        setCookieAccept(undefined)
        if (process.browser) {
            window.location.href = "/"
        }
    }, [])

    return <></>
}

export default cookies
