import { insertImage } from "../transforms"

export const onImageLoad = (editor, reader) => () => {
    const url = reader.result
    if (url) insertImage(editor, url)
}
