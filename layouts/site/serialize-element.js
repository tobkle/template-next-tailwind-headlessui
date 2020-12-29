import escapeHtml from "escape-html"
import Serialize from "./serialize"
import Image from "components/image"
import Link from "components/link"
import { translate } from "lib/helpers"

/**
 * < E L E M E N T >
 *
 */
export default function Element({ id, node }) {
    const { type, children, url, checked } = node

    // translate attributes from html to react e.g.: "colspan" => "colSpan"
    const attributes = translate(node.attributes)

    // Resolve children first before embedding into its parent

    const ResolvedChildren = children.map((_node, index) => (
        <Serialize key={`${id}-${index}`} id={`${id}-${index}`} node={_node} />
    ))

    // return element with its children
    switch (type) {
        case "align_left":
            return (
                <div className="text-left" id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </div>
            )
        case "align_center":
            return (
                <div
                    className="text-center"
                    id={`${id}-${type}`}
                    {...attributes}
                >
                    {ResolvedChildren}
                </div>
            )
        case "align_right":
            return (
                <div
                    className="text-right"
                    id={`${id}-${type}`}
                    {...attributes}
                >
                    {ResolvedChildren}
                </div>
            )
        case "h1":
            return (
                <h1 id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </h1>
            )
        case "h2":
            return (
                <h2 id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </h2>
            )
        case "h3":
            return (
                <h3 id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </h3>
            )
        case "h4":
            return (
                <h4 id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </h4>
            )
        case "h5":
            return (
                <h5
                    className="tracking-wider"
                    id={`${id}-${type}`}
                    {...attributes}
                >
                    {ResolvedChildren}
                </h5>
            )
        case "h6":
            return (
                <h6
                    className="tracking-wide text-gray-500"
                    id={`${id}-${type}`}
                    {...attributes}
                >
                    <i>{ResolvedChildren}</i>
                </h6>
            )
        case "p":
            return (
                <p id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </p>
            )
        case "blockquote":
            return (
                <blockquote id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </blockquote>
            )
        case "code_block":
            return (
                <pre id={`${id}-${type}`} {...attributes}>
                    <code>{ResolvedChildren}</code>
                </pre>
            )
        case "q":
            return (
                <q id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </q>
            )
        case "ol":
            return (
                <ol id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </ol>
            )
        case "ul":
            return (
                <ul id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </ul>
            )
        case "li":
            return (
                <li id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </li>
            )
        case "table":
            return (
                <table
                    className="w-full text-md bg-white shadow-md rounded mb-4"
                    id={`${id}-${type}`}
                    {...attributes}
                >
                    <tbody>{ResolvedChildren}</tbody>
                </table>
            )
        case "thead":
            return (
                <thead id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </thead>
            )
        case "tbody":
            return (
                <tbody id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </tbody>
            )
        case "tfoot":
            return (
                <tfoot id={`${id}-${type}`} {...attributes}>
                    {ResolvedChildren}
                </tfoot>
            )
        case "tr":
            return (
                <tr
                    className="border-b hover:bg-blue-50"
                    id={`${id}-${type}`}
                    {...attributes}
                >
                    {ResolvedChildren}
                </tr>
            )
        case "th":
            return (
                <th
                    className="text-left p-3 px-5"
                    id={`${id}-${type}`}
                    {...attributes}
                >
                    {ResolvedChildren}
                </th>
            )
        case "td":
            return (
                <td
                    className="text-left p-1 px-4"
                    id={`${id}-${type}`}
                    {...attributes}
                >
                    {ResolvedChildren}
                </td>
            )
        case "action_item":
            return (
                <div
                    className="flex flex-row align-middle"
                    id={`${id}-${type}`}
                    {...attributes}
                >
                    <label className="inline-flex items-center mt-1">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-gray-600"
                            checked={checked}
                            readOnly
                        />
                        <span className="ml-2 text-gray-700">
                            {ResolvedChildren}
                        </span>
                    </label>
                </div>
            )
        case "a":
            return (
                <Link
                    id={`${id}-${type}`}
                    href={escapeHtml(url)}
                    {...attributes}
                >
                    {ResolvedChildren}
                </Link>
            )
        case "img":
            return (
                <div
                    id={`${id}-${type}`}
                    className="relative w-full h-64 shadow-lg rounded-lg overflow-hidden"
                    {...attributes}
                >
                    <Image
                        src={escapeHtml(url)}
                        alt={escapeHtml(url)}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center center"
                    />
                </div>
            )
        case "media_embed":
            return (
                <div
                    id={`${id}-${type}`}
                    className="relative flex flex-col content-center w-full shadow-lg rounded-lg overflow-hidden"
                    style={{ height: "520px" }}
                    {...attributes}
                >
                    <iframe
                        className="m-0 p-0"
                        style={{ width: "100%", margin: 0, padding: 0 }}
                        width="100%"
                        height="100%"
                        title="embed"
                        marginWidth="0"
                        marginHeight="0"
                        frameBorder="0"
                        src={escapeHtml(url)}
                        allow="fullscreen"
                    >
                        .
                    </iframe>
                    <div className="m-2 text-xs text-gray-400">
                        ${url} {ResolvedChildren}
                    </div>
                </div>
            )
        default:
            return null
    }
}
