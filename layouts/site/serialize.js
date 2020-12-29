import Leaf from "./serialize-leaf"
import Element from "./serialize-element"

/**
 * < S E R I A L I Z E >
 *
 */
export default function Serialize({ id, node }) {
    const { type, text, children } = node
    // console.log(id, node, type, text, children)

    // empty object
    if (!type && !text && !children) return null

    // no type but children => serialize all children
    if (!type && !text && children && Array.isArray(children)) {
        return (
            <>
                {children.map((_node, index) => (
                    <Serialize
                        id={`${id}-${index}`}
                        key={`${id}-${index}`}
                        node={_node}
                    />
                ))}
            </>
        )
    }

    // type is a Text (Leaf) node, handle all of its variations
    if (!type && text && !children) {
        return <Leaf id={id} node={node} />
    }

    return <Element id={id} node={node} />
}
