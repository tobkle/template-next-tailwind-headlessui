import { decode } from "js-base64"
import Serialize from "./serialize"

export default function Post({ content }) {
    const nodes = JSON.parse(decode(content))
    return (
        <>
            {nodes.map((node, index) => (
                <Serialize
                    node={node}
                    key={`block-${index}`}
                    id={`block-${index}`}
                />
            ))}
        </>
    )
}
