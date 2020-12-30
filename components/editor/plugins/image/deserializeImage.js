import { getNodeDeserializer } from "@udecode/slate-plugins"
import { setDefaults } from "@udecode/slate-plugins"
import { DEFAULTS_IMAGE } from "./defaults"

export const deserializeImage = (options) => {
    const { img } = setDefaults(options, DEFAULTS_IMAGE)
debugger
    return {
        element: getNodeDeserializer({
            type: img.type,
            node: (el) => ({
                type: img.type,
                url: el.getAttribute("src"),
            }),
            rules: [{ nodeNames: "IMG" }],
            ...options?.img?.deserialize,
        }),
    }
}
