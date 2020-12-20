import crypto from "crypto"

export default {
    // switching debugging information on/off
    debug: false,

    // generate a random cookie name
    cookieName: crypto.randomBytes(16).toString("hex"),

    // This SEO parameters will be used by Search Engines:
    SeoSiteTitle: "Site Name",
    SeoSiteDescription: "Site Description",
    SeoKeyWords: "Site Keywords",
    SeoBaseUrl: "http://localhost:4000",
    SeoOgImage: "/img/logo.png",
    SeoOgUrl: "http://localhost:4000",
    SeoOgType: "website",
    SeoOgTitle: "OG Title",
    SeoOgDescription: "Description",
    SeoTwitterTitle: "Twitter Title",
    SeoTwitterDescription: "Twitter Description",
    SeoTwitterImage: "/img/logo.png",
    SeoTwitterCard: "summary_large_image",
    SeoTwitterImgAlt: "Image Title",

    // Generate this with a Favicon generator
    // example: https://www.dunplab.it/web-app-manifest-generator
    // store downloaded content.zip in /public/favicon
    // Fill Form, Upload Logo Image
    // 1. Generate
    // 2. Download generated manifest json
    // 3. Download all icons file
    // 4. Unzip icon.zip
    // 5. Copy all icons into /public/favicon folder
    // 6. Adjust filesname below
    // 7. Copy site manifest json into /public/favicon folder
    // 8. Adjust manifest path and file name below
    // and adjust the filenames accordingly
    SiteManifest: "/favicon/manifest.json",
    FaviconIcon: "/favicon/favicon.ico",
    Favicon180x180: "/favicon/apple-touch-icon.png",
    Favicon32x32: "/favicon/favicon-32x32.png",
    Favicon16x16: "/favicon/favicon-16x16.png",
    FaviconSvg: "/favicon/safari-pinned-tab.svg",
    FaviconSvgColor: "#00aae7",
    FaviconMSTileColor: "#00aae7",
    FaviconThemeColor: "#00aae7",

    // Create an Google Analytics key:
    // visit: https://analytics.google.com/analytics/
    // generate an Id and save it
    // example: "UA-123456789-1"
    GoogleAnalyticsId: "",
}
