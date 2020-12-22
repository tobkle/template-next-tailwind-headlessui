import Tree from "components/tree"

export default function Aside({ aside, aside_content }) {
    if (!aside) return null
    if (!aside_content || !Object.keys(aside_content).length) return null
    return (
        <aside className="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
            {/* Start secondary column (hidden on smaller screens) */}

            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div className="h-full rounded-lg">
                    <Tree data={aside_content} />
                </div>
            </div>

            {/* End secondary column */}
        </aside>
    )
}
