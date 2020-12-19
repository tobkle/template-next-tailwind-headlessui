import ContextProvider from "contexts/global"
import SEO from "seo"
import "styles/tailwind.css"

function MyApp({ Component, pageProps }) {
    return (
        <ContextProvider>
            <SEO />
            <Component {...pageProps} />
        </ContextProvider>
    )
}

export default MyApp
