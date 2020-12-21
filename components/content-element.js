export default function ContentElement({ collection, lang, element }) {
    return <div dangerouslySetInnerHTML={createMarkup(element)} />
}

function createMarkup(element) {
    return {
        __html: element,
    }
}
