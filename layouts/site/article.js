export default function Article({ article = true, children }) {
    if (!article) return null
    return <article className="flex-auto">{children}</article>
}
