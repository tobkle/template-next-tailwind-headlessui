import React from "react"
import Icon from "components/icon"
import heroicons from "icons/index"

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

export default HeroIconPreview
