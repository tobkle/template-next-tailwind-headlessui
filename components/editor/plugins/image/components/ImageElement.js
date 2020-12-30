import * as React from "react"
import { classNamesFunction, styled } from "@uifabric/utilities"
import { useFocused, useSelected } from "slate-react"
import { getImageElementStyles } from "./ImageElement.styles"
const getClassNames = classNamesFunction()

export const ImageElementBase = ({
    attributes,
    children,
    element,
    className,
    styles,
    htmlAttributes,
}) => {
    debugger
    const { url } = element
    const focused = useFocused()
    const selected = useSelected()

    const classNames = getClassNames(styles, {
        className,
        focused,
        selected,
    })

    return (
        <div {...attributes} className={classNames.root}>
            <div contentEditable={false}>
                <img
                    data-testid="ImageElementImage"
                    className={classNames.img}
                    src={url}
                    alt=""
                    {...htmlAttributes}
                />
            </div>
            {children}
        </div>
    )
}

export const ImageElement = styled(
    ImageElementBase,
    getImageElementStyles,
    undefined,
    {
        scope: "ImageElement",
    }
)
