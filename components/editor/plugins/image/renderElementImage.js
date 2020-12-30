import { getRenderElement } from "@udecode/slate-plugins"
import { setDefaults } from "@udecode/slate-plugins"
import { DEFAULTS_IMAGE } from "./defaults"

export const renderElementImage = (options) => {
    debugger
    const { img } = setDefaults(options, DEFAULTS_IMAGE)
    return getRenderElement(img)
}
