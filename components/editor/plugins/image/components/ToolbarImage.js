import React, { useRef } from "react"
import { Transforms } from "slate"
import { useEditor } from "slate-react"
import {
    ToolbarButton,
} from "@udecode/slate-plugins"
import { insertImage } from "../transforms"
import { MediaSelector } from "components/media-select"
import reactModal from "components/open-modal"

export const ToolbarImage = ({ image, ...props }) => {
    const editor = useEditor()
    const handleMouseDownEvent = async (event) => {
        event.preventDefault()
        let url
        if (
            image &&
            image.rootProps &&
            image.rootProps.getImageUrl &&
            image.rootProps.getImageUrl() != null
        ) {
            url = await image.rootProps.getImageUrl()
        } else {
            // remember the current cursor/position/selection
            let path = editor.selection
            url = await reactModal(({ show, onSubmit, onDismiss }) => (
                <MediaSelector
                    show={show}
                    onSubmit={onSubmit}
                    onDismiss={onDismiss}
                />
            ))
            // in async the selection was lost, so we need to reset the cursor
            Transforms.select(editor, path)
        }
        if (!url) return
        insertImage(editor, url, { image }, "100%", "30em")
    }
    return <ToolbarButton onMouseDown={handleMouseDownEvent} {...props} />
}
