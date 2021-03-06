export function convertRemToPixels(rem) {
    if (typeof window === "undefined" || typeof document === "undefined")
        return 1
    return (
        rem *
        parseFloat(window.getComputedStyle(document.documentElement).fontSize)
    )
}

export function getViewPortDimensions() {
    const vw =
        typeof document !== "undefined"
            ? Math.max(
                  document.documentElement.clientWidth || 0,
                  window.innerWidth || 0
              )
            : 0

    const vh =
        typeof document !== "undefined"
            ? Math.max(
                  document.documentElement.clientHeight || 0,
                  window.innerHeight || 0
              )
            : 0
    return { vw, vh }
}

export function pad(pad, str, padLeft) {
    if (typeof str === "undefined") return pad
    if (padLeft) {
        return (pad + str).slice(-pad.length)
    } else {
        return (str + pad).substring(0, pad.length)
    }
}

export function getMenuEntries(menu_name, menu) {
    let entries = []
    if (menu_name && menu && menu.length > 0) {
        let found_menu = menu.filter(({ slug }) => slug === menu_name)
        if (found_menu && found_menu.length > 0) {
            const { menu_entries } = found_menu.pop()
            return menu_entries
        }
    }
    return entries
}

export function buildTree(indexData, value) {
    let retval = {}
    Object.keys(indexData).forEach((indice) => {
        if (indexData && indexData[indice] === 1) {
            if (typeof retval.found === "undefined") retval.found = []
            retval.found.push(indice)
        } else {
            let iteration = buildTree(indexData[indice], value)
            retval[indice] = {
                _open: value,
                ...iteration,
            }
        }
    })
    return retval
}

export function toggleStatusTree(indexData, key) {
    let retval = {}
    Object.keys(indexData).forEach((indice) => {
        if (indice === "_open") {
        } else if (indice === "found") {
            retval.found = indexData.found
        } else if (indice === key) {
            retval[indice] = {
                ...indexData[indice],
                _open: !indexData[indice]._open,
            }
        } else {
            let iteration = toggleStatusTree(indexData[indice], key)
            retval[indice] = {
                _open: indexData[indice]._open,
                ...iteration,
            }
        }
    })
    return retval
}
/**
 * translate html Attributes into react attributes
 * e.g. "colspan" ==> "colSpan"
 * @param {*} htmlAttributes
 */
export function translate(htmlAttributes) {
    if (!htmlAttributes) return null
    const keys = Object.keys(htmlAttributes)
    const reactAttr = {}

    keys.map((key) => {
        switch (key) {
            case "colspan":
                reactAttr["colSpan"] = htmlAttributes[key]
                break

            // original attributes, maybe unknown so far, should be added above?
            default:
                console.warn(
                    "(/lib/helpers.js fn: translate): maybe not a React attribute?",
                    key
                )
                reactAttr[key] = htmlAttributes[key]
                break
        }
    })
    return reactAttr
}
