export default function Article({ children }) {
    return (
        <article className="flex-auto md:flex-1 bg-blue-200">
            Article {children}
        </article>
    )
}
