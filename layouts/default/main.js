import Article from "./article"
import Aside from "./aside"

export default function Main({ article = true, aside = true, children }) {
    return (
        // <main className="w-screen flex flex-row flex-wrap justify-between items-stretch">
        <main className="flex-auto flex flex-row flex-wrap">
            {aside && <Aside />}
            {article && <Article children={children} />}
        </main>
    )
}
