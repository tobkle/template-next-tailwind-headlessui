/**
 * @name searchUnsplash
 *
 */
export default function searchUnsplash({
    lang = null,
    search,
    color = null,
    collections = null,
    orientation = "landscape",
    page = null,
    per_page = null,
    content_filter = null,
}) {
    if (!search) return []

    let s = `search=${search}`
    if (lang) s += `&lang=${lang}`
    if (page) s += `&page=${page}`
    if (per_page) s += `&per_page=${per_page}`
    if (color) s += `&color=${color}`
    if (orientation) s += `&orientation=${orientation}`
    if (collections) s += `&collections=${collections}`
    if (content_filter) s += `&collections=${content_filter}`

    return fetch(`/api/unsplash?${s}`, {
        method: "GET",
    })
        .then((r) => r.json())
        .then((r) => r.results)
        .catch((error) => {
            console.error(error)
            return []
        })
}
