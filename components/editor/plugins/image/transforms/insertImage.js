import { Transforms } from "slate"
import { setDefaults } from "@udecode/slate-plugins"
import { DEFAULTS_IMAGE } from "../defaults"

export const insertImage = (
    editor,
    url,
    options,
    maxWidth = "100%",
    maxHeight = "20em"
) => {
    const { image } = setDefaults(options, DEFAULTS_IMAGE)
    const text = { text: "" }
    const newImage = {
        type: image.type,
        url,
        maxWidth,
        maxHeight,
        children: [text],
    }
    Transforms.insertNodes(editor, newImage)
}
