import { insertImage } from "../transforms"
import { isImageUrl, onImageLoad } from "../utils"

export const withImageUpload = (options) => (editor) => {
    const { insertData } = editor

    editor.insertData = (data) => {
        const text = data.getData("text/plain")
        const { files } = data

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split("/")
                if (mime === "image") {
                    reader.addEventListener("load", onImageLoad(editor, reader))
                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text, options)
        } else {
            insertData(data)
        }
    }

    return editor
}
