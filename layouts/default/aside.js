export default function Aside({ aside = true }) {
    if (!aside) return null
    return <aside className="flex-1 bg-indigo-400">Aside</aside>
}
