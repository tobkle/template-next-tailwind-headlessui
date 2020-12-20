import { useContext, useEffect } from "react"
import Cookies from "js-cookie"
import Head from "next/head"
import { useRouter } from "next/router"
import { Context } from "contexts/global"
import CookieQuestion from "components/cookie-question"

const SEO = () => {
    const router = useRouter()
    const { cookieAccept, setCookieAccept, config = {} } = useContext(Context)
    const {
        cookieName,
        SeoSiteTitle,
        SeoSiteDescription,
        SeoKeyWords,
        SeoBaseUrl,
        SeoOgImage,
        SeoOgUrl,
        SeoOgType,
        SeoOgTitle,
        SeoOgDescription,
        SeoTwitterTitle,
        SeoTwitterDescription,
        SeoTwitterImage,
        SeoTwitterCard,
        SeoTwitterImgAlt,
        SiteManifest,
        FaviconIcon,
        Favicon180x180,
        Favicon32x32,
        Favicon16x16,
        FaviconSvg,
        FaviconSvgColor,
        FaviconMSTileColor,
        FaviconThemeColor,
        GoogleAnalyticsId,
    } = config

    useEffect(() => {
        const cookieValue = Cookies.get(cookieName)
        if (typeof cookieValue === "undefined") {
            setCookieAccept(undefined)
        } else if (cookieValue === "true") {
            setCookieAccept(true)
        } else if (!cookieValue === "false") {
            setCookieAccept(false)
        }
    }, [])

    return (
        <>
            <Head>
                <title>{SeoSiteTitle}</title>

                {/* Site Meta */}
                <meta name="description" content={SeoSiteDescription} />
                <meta name="keywords" content={SeoKeyWords} />
                <meta
                    content={`${SeoBaseUrl}/${SeoOgImage}`}
                    property="og:image"
                />
                <meta content={SeoOgUrl} property="og:url" />
                <meta content={SeoOgType} property="og:type" />
                <meta content={SeoOgTitle} property="og:title" />
                <meta
                    content={SeoOgDescription}
                    property="og:description"
                ></meta>

                {/* Twitter */}
                <meta name="twitter:title" content={SeoTwitterTitle}></meta>
                <meta
                    name="twitter:description"
                    content={SeoTwitterDescription}
                />
                <meta
                    name="twitter:image"
                    content={`${SeoBaseUrl}/${SeoTwitterImage}`}
                />
                <meta name="twitter:card" content={SeoTwitterCard} />
                <meta name="twitter:image:alt" content={SeoTwitterImgAlt} />

                {/* Favicons */}
                <link rel="icon" href={FaviconIcon} />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={Favicon180x180}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={Favicon32x32}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes={Favicon16x16}
                    href=""
                />
                <link rel="manifest" href={SiteManifest} />
                <link
                    rel="mask-icon"
                    href={FaviconSvg}
                    color={FaviconSvgColor}
                />
                <meta
                    name="msapplication-TileColor"
                    content={FaviconMSTileColor}
                />
                <meta name="theme-color" content={FaviconThemeColor} />

                {/* Google Analytics -- only if accepted and GA-Id provided*/}
                {cookieAccept && GoogleAnalyticsId && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsId}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GoogleAnalyticsId}');
                  `,
                            }}
                        />
                    </>
                )}
            </Head>

            {/* Cookie Consent -- only if Google Analytics is switched on*/}
            {GoogleAnalyticsId && (
                <CookieQuestion
                    cookieName={cookieName}
                    router={router}
                    cookieAccept={cookieAccept}
                    setCookieAccept={setCookieAccept}
                />
            )}
        </>
    )
}

export default SEO
