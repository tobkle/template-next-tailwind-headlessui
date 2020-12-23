import React, { useState } from "react"
import Image from "components/image"

const OnlineMediaPreview = ({
    value,
    field,
    metadata,
    getAsset,
    entry,
    fieldsMetaData,
}) => {
    return (
        <>
            <h1 className="text-2xl semi-bold">Online Media</h1>
            <p className="relative w-full h-96">
                <Image
                    src={value}
                    alt="online Image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center center"
                />
            </p>
        </>
    )
}

export default OnlineMediaPreview
