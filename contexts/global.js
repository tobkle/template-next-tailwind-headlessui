import { createContext, useState, useEffect } from "react"
import config from "config"

export const Context = createContext()

export default function ContextProvider({ children }) {
    const [debug, setDebug] = useState(config.debug)
    const [cookieAccept, setCookieAccept] = useState(false)
    const [orientation, setOrientation] = useState("landscape")
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const screenResizeEvent = addEventListener("resize", screenResized)
        return () => removeEventListener("resize", screenResizeEvent)
    }, [])

    const screenResized = () => {
        if (process.browser) {
            const width = window.innerWidth
            const height = window.innerHeight
            setWidth(width)
            setHeight(height)
            if (height < width) {
                setOrientation("landscape")
            } else {
                setOrientation("portrait")
            }
        }
    }
    return (
        <Context.Provider
            value={{
                config,
                debug,
                setDebug,
                cookieAccept,
                setCookieAccept,
                width,
                height,
                orientation,
            }}
        >
            {children}
        </Context.Provider>
    )
}
