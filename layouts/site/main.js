import Container from "./container"
import Article from "./article"
import Aside from "./aside"

export default function Main({
    main = true,
    aside = true,
    article = true,
    aside_content = [],
    children,
}) {
    if (!main) return null
    return (
        <main className="flex-1">
            <Container>
                <Aside aside={aside} aside_content={aside_content} />
                <Article article={article} children={children} />
            </Container>
        </main>
    )
}
