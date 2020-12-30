import * as React from "react"
import { useEditor } from "slate-react"
import { ToolbarButton } from "@udecode/slate-plugins"
import { insertImage } from "../transforms"

export const ToolbarImage = ({ img, ...props }) => {
    const editor = useEditor()

    return (
        <ToolbarButton
            onMouseDown={async (event) => {
                event.preventDefault()
                debugger
                let url
                if (
                    img &&
                    img.rootProps &&
                    img.rootProps.getImageUrl &&
                    img.rootProps.getImageUrl() != null
                ) {
                    url = await img.rootProps.getImageUrl()
                } else {
                    url = window.prompt(
                        "Enter Url for the image:",
                        "https://source.unsplash.com/kFrdX5IeQzI"
                    )
                }
                if (!url) return
                insertImage(editor, url, { img })
            }}
            {...props}
        />
    )
}
