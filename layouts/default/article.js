export default function Article({ article = true, children }) {
    if (!article) return null
    return <article className="flex-1 bg-blue-200">Article {children}</article>
}
