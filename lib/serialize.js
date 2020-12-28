import escapeHtml from "escape-html"
import { Node, Text } from "slate"

export default function serialize(node) {
    if (typeof node === "string") return serialize(JSON.parse(node))
    if (Array.isArray(node)) return node.map((n) => serialize(n))
    if (Text.isText(node)) return escapeHtml(node.text)

    const children = node.children.map((n) => serialize(n)).join("")

    switch (node.type) {
        case "heading-one":
            return `<h1>${children}</h1>`
        case "heading-two":
            return `<h2>${children}</h2>`
        case "heading-three":
            return `<h3>${children}</h3>`
        case "heading-four":
            return `<h4>${children}</h4>`
        case "heading-five":
            return `<h5>${children}</h5>`
        case "heading-six":
            return `<h6>${children}</h6>`
        case "paragraph":
            return `<div>${children}</div>`
        case "quote":
            return `<blockquote>${children}</blockquote>`
        case "bold":
            return `<strong>${children}</strong>`
        case "italic":
            return `<em>${children}</em>`
        case "link":
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        case "image":
            return `<img src="${escapeHtml(node.url)}">${children}</img>`
        case "video":
            return `<video src="${escapeHtml(node.url)}">${children}</video>`
        default:
            return children
    }
}
