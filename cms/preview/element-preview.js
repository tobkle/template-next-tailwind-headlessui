import ContentElement from "components/content-element"

export default function ElementPreview({ entry, widgetFor }) {
    const collection = entry.getIn(["data", "collection"])
    const lang = entry.getIn(["data", "content", "lang"])
    const code = entry.getIn(["data", "content", "code"])
    return (
        <>
            <div className="w-full h-full">
                <ContentElement
                    collection={collection}
                    lang={lang}
                    element={code}
                />
            </div>
        </>
    )
}
