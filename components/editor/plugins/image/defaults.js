import { ImageElement } from "./components/ImageElement"

export const ELEMENT_IMAGE = "image"

export const DEFAULTS_IMAGE = {
    image: {
        component: ImageElement,
        type: ELEMENT_IMAGE,
        rootProps: {
            className: "slate-image",
        },
    },
}
