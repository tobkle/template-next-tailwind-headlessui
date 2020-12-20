import Article from "./article"
import Aside from "./aside"

export default function Main({ article = true, aside = true, children }) {
    return (
        <main className="flex flex-row flex-auto flex-wrap w-screen justify-between">
            {aside && <Aside />}
            {article && <Article children={children} />}
        </main>
    )
}
