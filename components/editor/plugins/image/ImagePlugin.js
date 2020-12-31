import { setDefaults } from "@udecode/slate-plugins"
import { DEFAULTS_IMAGE } from "./defaults"
import { deserializeImage } from "./deserializeImage"
import { renderElementImage } from "./renderElementImage"

export const ImagePlugin = (options) => {
    const { image } = setDefaults(options, DEFAULTS_IMAGE)
    return {
        renderElement: renderElementImage(options),
        deserialize: deserializeImage(options),
        voidTypes: [image.type],
    }
}
