import { Transforms } from "slate"
import { setDefaults } from "@udecode/slate-plugins"
import { DEFAULTS_IMAGE } from "../defaults"

export const insertImage = (editor, url, options) => {
    debugger
    const { img } = setDefaults(options, DEFAULTS_IMAGE)
    const text = { text: "" }
    const image = { type: img.type, url, children: [text] }
    Transforms.insertNodes(editor, image)
}
