import Image from "next/image"

export default function Img({ src, layout, width, height, ...rest }) {
    let layoutOverwrite = layout
    if (!src) return null

    if (layout !== "fill" && (!width || !height)) {
        layoutOverwrite = "fill"
    }

    switch (layoutOverwrite) {
        case "fill":
            return <Image src={src} layout={layoutOverwrite} {...rest} />

        default:
            return (
                <Image
                    src={src}
                    layout={layoutOverwrite}
                    width={width}
                    height={height}
                    {...rest}
                />
            )
    }
}
