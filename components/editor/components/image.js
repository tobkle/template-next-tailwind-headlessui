import isUrl from "is-url"
import imageExtensions from "image-extensions"
import { Transforms } from "slate"
import { useEditor, useSelected, useFocused } from "slate-react"
import Button from "./button"
import Icon from "./icon"
import Image from "components/image"

export const withImages = (editor) => {
    const { insertData, isVoid } = editor

    editor.isVoid = (element) => {
        return element.type === "image" ? true : isVoid(element)
    }

    editor.insertData = (data) => {
        const text = data.getData("text/plain")
        const { files } = data

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split("/")

                if (mime === "image") {
                    reader.addEventListener("load", () => {
                        const url = reader.result
                        insertImage(editor, url)
                    })
                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }
    return editor
}

export const insertImage = (editor, url) => {
    const text = { text: "" }
    const image = { type: "image", url, children: [text] }
    Transforms.insertNodes(editor, image)
}

export const isImageUrl = (url) => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split(".").pop()
    return imageExtensions.includes(ext)
}

export const ImageButton = () => {
    const editor = useEditor()
    return (
        <Button
            onMouseDown={(event) => {
                event.preventDefault()
                const url = window.prompt("Enter the URL of the image")
                if (!url) return
                insertImage(editor, url)
            }}
        >
            <Icon>image</Icon>
        </Button>
    )
}

export const ImageElement = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <div {...attributes}>
            <div
                className="relative w-full h-64"
                contentEditable={false}
                style={{
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "20em",
                    boxShadow:
                        selected && focused ? "0 0 0 3px #B4D5FF" : "none",
                }}
            >
                <Image
                    src={element.url}
                    layout="fill"
                    width={"500"}
                    height={"400"}
                />
                {children}
            </div>
        </div>
    )
}
