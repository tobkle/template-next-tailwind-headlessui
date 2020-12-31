import React, { useState } from "react"
import Editor from "components/editor"

export default function EditorPage() {
    const [value, setValue] = useState(initialValue)
    return (
        <>
            <div className="w-screen h-screen mx-auto ">
                <Editor value={value} setValue={setValue} />
            </div>
            <pre>
                <code>{JSON.stringify(value, null, 2)}</code>
            </pre>
        </>
    )
}

const initialValue = [
    {
        children: [{ text: "Das ist mein Text" }],
    },
    {
        type: "image",
        url: "https://source.unsplash.com/kFrdX5IeQzI",
        children: [{ text: "" }],
    },
    {
        type: "video",
        url: "https://player.vimeo.com/video/26689853",
        children: [{ text: "" }],
    },
]
