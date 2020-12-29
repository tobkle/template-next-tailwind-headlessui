import React from "react"
import Layout from "layouts/site/layout"
import Post from "layouts/site/post"

const EditorPreview = ({
    value,
    field,
    metadata,
    getAsset,
    entry,
    fieldsMetaData,
}) => {
    return (
        <section className="relative prose flex flex-col mx-auto pb-20">
            <Post content={value} />
        </section>
    )
}

export default EditorPreview
