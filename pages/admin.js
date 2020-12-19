import dynamic from "next/dynamic"
import config from "cms/config.yaml"

export default function AdminPage() {
    const CMS = dynamic(
        () =>
            Promise.all([
                import("netlify-cms-app"),
                import("netlify-cms-locales"),
            ]).then((mods) => {
                window.cms = mods[0]
                const { de } = mods[1]
                cms.init({ config })
                cms.registerLocale("de", de)
            }),
        { ssr: false, loading: () => <p>Loading...</p> }
    )
    return <CMS />
}
