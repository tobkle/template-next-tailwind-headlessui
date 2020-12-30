import imageExtensions from "image-extensions"
import { isUrl } from "@udecode/slate-plugins"

export const isImageUrl = (url) => {
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split(".").pop()
    return imageExtensions.includes(ext)
}
