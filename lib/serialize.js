import escapeHtml from "escape-html"
import Image from "components/image"
import { Node, Text } from "slate"

export default function serialize(node) {
    if (typeof node === "string") return serialize(JSON.parse(node))

    if (Array.isArray(node)) return node.map((n) => serialize(n))

    if (Text.isText(node)) {
        let newText = escapeHtml(node.text)

        if (Object.keys(node).length === 1) {
            return newText
        }

        Object.keys(node).map((n) => {
            switch (n) {
                case "text":
                    break
                case "bold":
                    newText = `<b>${newText}</b>`
                    break
                case "italic":
                    newText = `<i>${newText}</i>`
                    break
                case "q":
                    newText = `<q>${newText}</q>`
                    break
                case "blockquote":
                    newText = `<blockquote>${newText}</blockquote>`
                    break
                case "subscript":
                    newText = `<sub>${newText}</sub>`
                    break
                case "superscript":
                    newText = `<sup>${newText}</sup>`
                    break
                case "underline":
                    newText = `<u>${newText}</u>`
                    break
                case "strikethrough":
                    newText = `<strike>${newText}</strike>`
                    break
                case "code":
                    newText = `<code>${newText}</code>`
                    break
                case "code_block":
                    newText = `<pre><code>${newText}</code></pre>`
                    break
                case "kbd":
                    newText = `<kbd>${newText}</kbd>`
                    break
                case "highlight":
                    newText = `<mark>${newText}</mark>`
                    break
                default:
                    console.error(
                        `Tag ${n} not processed from serializer for node:`,
                        node
                    )
            }
        })

        return newText
    }

    const children = node.children.map((n) => serialize(n)).join("")

    switch (node.type) {
        case "h1":
            return `<h1>${children}</h1>`
        case "h2":
            return `<h2>${children}</h2>`
        case "h3":
            return `<h3>${children}</h3>`
        case "h4":
            return `<h4>${children}</h4>`
        case "h5":
            return `<h5>${children}</h5>`
        case "h6":
            return `<h6>${children}</h6>`
        case "p":
            return `<p>${children}</p>`
        case "q":
            return `<q>${children}</q>`
        case "ol":
            return `<ol>${children}</ol>`
        case "ul":
            return `<ul>${children}</ul>`
        case "li":
            return `<li>${children}</li>`
        case "table":
            return `<table>${children}</table>`
        case "thead":
            return `<thead>${children}</thead>`
        case "tbody":
            return `<tbody>${children}</tbody>`
        case "tfoot":
            return `<tfoot>${children}</tfoot>`
        case "tr":
            return `<tr>${children}</tr>`
        case "td":
            return `<td>${children}</td>`
        case "action_item":
            return `<div>
            <input type="checkbox" ${node.checked ? "checked" : ""}/>
            <span className="block align-middle todo-text">${children}</span>
            </div>`
        case "a":
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        case "img":
            return `<img class="shadow-lg rounded-lg overflow-hidden" src="${escapeHtml(
                node.url
            )}">${children}</img>`
        case "media_embed":
            const iframe = ``
            return `<div class="relative flex flex-col content-center w-full shadow-lg rounded-lg overflow-hidden" style="height: 520px;">
            <iframe class="m-0 p-0" style="width: 100%; margin: 0; padding: 0;" width="100%" height="100%" title='embed' marginwidth="0" marginHeight="0" frameBorder="0"
             src='${escapeHtml(node.url)}' allow="fullscreen" >.</iframe>
            <div class="m-2 text-xs text-gray-400">${node.url} ${children}</div>
            </div>`
        default:
            return children
    }
}
