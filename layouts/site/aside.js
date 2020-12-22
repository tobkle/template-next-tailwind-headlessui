import Tree from "components/tree"

export default function Aside({ aside = true, aside_content }) {
    if (!aside) return null
    if (!aside_content || !Object.keys(aside_content).length) return null
    return (
        <aside className="flex-1 py-6">
            <Tree data={aside_content} />
        </aside>
    )
}
