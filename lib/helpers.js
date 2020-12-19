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
