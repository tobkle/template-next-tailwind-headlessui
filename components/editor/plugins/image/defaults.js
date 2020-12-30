import { ImageElement } from "./components/ImageElement"

export const ELEMENT_IMAGE = "img"

export const DEFAULTS_IMAGE = {
    img: {
        component: ImageElement,
        type: ELEMENT_IMAGE,
        rootProps: {
            className: "slate-img",
        },
    },
}
