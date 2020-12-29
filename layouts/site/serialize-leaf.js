import escapeHtml from "escape-html"

/**
 * < L E A F >
 *
 */
export default function Leaf({ node }) {
    // get all text flavours without 'text' itself
    const Flavours = Object.keys(node).filter((key) => key !== "text")

    // if there is no flavour return just the text
    if (Flavours.length === 0) return <>{escapeHtml(node.text)}</>

    // get the text first
    let Text = <>{escapeHtml(node.text)}</>

    // decorate the text with the provided flavours:
    Flavours.map((f) => {
        switch (f) {
            case "bold":
                Text = <b>{Text}</b>
                break
            case "italic":
                Text = <i>{Text}</i>
                break
            case "q":
                Text = <q>{Text}</q>
                break
            case "blockquote":
                Text = <blockquote>{Text}</blockquote>
                break
            case "subscript":
                Text = <sub>{Text}</sub>
                break
            case "superscript":
                Text = <sup>{Text}</sup>
                break
            case "underline":
                Text = <u>{Text}</u>
                break
            case "strikethrough":
                Text = <strike>{Text}</strike>
                break
            case "code":
                Text = <code className="bg-gray-200">{Text}</code>
                break
            case "code_block":
                Text = (
                    <pre>
                        <code>{Text}</code>
                    </pre>
                )
                break
            case "kbd":
                Text = (
                    <kbd className="border border-1 border-gray-300 bg-gray-100 rounded-lg shadow-md px-3 py-1">
                        {Text}
                    </kbd>
                )
                break
            case "highlight":
                Text = <mark>{Text}</mark>
                break
            default:
                Text = <span>{Text}</span>
        }
    })
    return <>{Text}</>
}
