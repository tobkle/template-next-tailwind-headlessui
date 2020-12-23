export default async function handler(req, res) {
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

    const {
        query: {
            search,
            page,
            per_page,
            color,
            orientation,
            lang,
            collections,
            content_filter,
        },
    } = req

    let s = ""
    if (search) s += `&query=${search}`
    if (lang) s += `&lang=${lang}`
    if (page) s += `&page=${page}`
    if (per_page) s += `&per_page=${per_page}`
    if (color) s += `&color=${color}`
    if (orientation) s += `&orientation=${orientation}`
    if (collections) s += `&collections=${collections}`
    if (content_filter) s += `&collections=${content_filter}`
    console.log("search:", s)

    const url = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_ACCESS_KEY}${s}`
    const response = await fetch(url)
    const data = await response.json()

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
}
