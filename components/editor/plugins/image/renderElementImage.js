import { getRenderElement } from "@udecode/slate-plugins"
import { setDefaults } from "@udecode/slate-plugins"
import { DEFAULTS_IMAGE } from "./defaults"

export const renderElementImage = (options) => {
    const { image } = setDefaults(options, DEFAULTS_IMAGE)
    return getRenderElement(image)
}
