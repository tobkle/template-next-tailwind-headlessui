import Image from "next/image"

export default function Img({ layout, width, height, ...rest }) {
    switch (layout) {
        case "fill":
            return <Image layout={layout} {...rest} />

        default:
            return (
                <Image
                    layout={layout}
                    width={width}
                    height={height}
                    {...rest}
                />
            )
    }
}
