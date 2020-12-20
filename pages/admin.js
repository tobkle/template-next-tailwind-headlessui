import React from "react"
import dynamic from "next/dynamic"
import config from "cms/config.yaml"
import Icon from "components/icon"
import heroicons from "icons/index"

const HeroIcon = React.forwardRef(
    ({ value, field, forID, classNameWrapper, onChange }, ref) => {
        const separator = field.get("separator", ", ")

        const handleChange = (e) => {
            const newVal = e.target.value.split(separator).map((e) => e.trim())
            onChange(newVal)
        }

        return (
            <div className="flex flex-auto space-between align-center justify-center">
                <select
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                    id={forID}
                    className={classNameWrapper}
                >
                    {heroicons &&
                        heroicons.map((icon, index) => (
                            <option key={index} value={icon}>
                                {icon}
                            </option>
                        ))}
                </select>

                <div className="relative w-12 h-12 overflow-hidden">
                    <Icon
                        iconstyle={"outline"}
                        iconname={value}
                        className="text-indigo-400 h-12 w-12"
                    />
                </div>
            </div>
        )
    }
)

const HeroIconPreview = ({
    value,
    field,
    metadata,
    getAsset,
    entry,
    fieldsMetaData,
}) => {
    return (
        <>
            <h1 className="text-2xl semi-bold">Selected Icon:</h1>
            {value}
            <div className="relative w-12 h-12 overflow-hidden">
                <Icon
                    iconstyle={"outline"}
                    iconname={value}
                    className="text-indigo-400 h-12 w-12"
                />
            </div>
            <h1 className="text-2xl semi-bold">Heroicons Iconset</h1>
            outline: solid:
            {heroicons &&
                heroicons.map((icon, index) => (
                    <div key={index} className="flex">
                        <span className="relative w-8 h-8 overflow-hidden">
                            <Icon
                                iconstyle={"outline"}
                                iconname={icon}
                                className="text-teal-400 h-6 w-6"
                            />
                        </span>

                        <span className="relative w-8 h-8 overflow-hidden">
                            <Icon
                                iconstyle={"solid"}
                                iconname={icon}
                                className="text-indigo-400 h-6 w-6"
                            />
                        </span>
                        {icon}
                    </div>
                ))}
        </>
    )
}

let HeroIconSchema = {
    properties: {
        // separator: { type: "strings" },
    },
}

export default function AdminPage() {
    const CMS = dynamic(
        () =>
            Promise.all([
                import("netlify-cms-app"),
                import("netlify-cms-locales"),
            ]).then((mods) => {
                window.cms = mods[0]
                const { de } = mods[1]
                window.cms.init({ config })
                window.cms.registerLocale("de", de)
                window.cms.registerPreviewStyle("/css/tailwindCMS.css")
                window.cms.registerWidget(
                    "heroicon",
                    HeroIcon,
                    HeroIconPreview,
                    HeroIconSchema
                )
            }),
        { ssr: false, loading: () => <p>Loading...</p> }
    )
    return <CMS />
}
