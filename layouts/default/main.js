import Container from "./container"
import Article from "./article"
import Aside from "./aside"

export default function Main({
    main = true,
    aside = true,
    article = true,
    children,
}) {
    if (!main) return null
    return (
        <main>
            <Container>
                <Aside aside={aside} />
                <Article article={article} children={children} />
            </Container>
        </main>
    )
}
