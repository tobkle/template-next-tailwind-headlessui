import { getNodeDeserializer } from "@udecode/slate-plugins"
import { setDefaults } from "@udecode/slate-plugins"
import { DEFAULTS_IMAGE } from "./defaults"

export const deserializeImage = (options) => {
    const { image } = setDefaults(options, DEFAULTS_IMAGE)
    return {
        element: getNodeDeserializer({
            type: image.type,
            node: (el) => ({
                type: image.type,
                maxWidth: "100%",
                maxHeight: "40em",
                url: el.getAttribute("src"),
            }),
            rules: [{ nodeNames: "IMG" }],
            ...options?.image?.deserialize,
        }),
    }
}
