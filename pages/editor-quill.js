import { useState, useRef } from "react"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

export default function EditorQuillPage() {
    const [value, setValue] = useState("")
    const ref = useRef()
    const apiPostNewsImage = (data) => {
        console.log(data)
    }
    const imageHandler = () => {
        const input = document.createElement("input")
        input.setAttribute("type", "file")
        input.setAttribute("accept", "image/*")
        input.click()
        input.onchange = async () => {
            const file = input.files[0]
            const formData = new FormData()
            formData.append("image", file)
            // Save current cursor state
            console.log(ref.current.getEditor())
            const range = ref.current.getSelection(true)
            // Insert temporary loading placeholder image
            ref.current.insertEmbed(
                range.index,
                "image",
                `${window.location.origin}/images/loaders/placeholder.gif`
            )
            // Move cursor to right side of image (easier to continue typing)
            ref.current.setSelection(range.index + 1)
            const res = await apiPostNewsImage(formData) // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
            // Remove placeholder image
            ref.current.deleteText(range.index, 1)
            // Insert uploaded image
            // this.quill.insertEmbed(range.index, 'image', res.body.image);
            ref.current.insertEmbed(range.index, "image", res)
        }
    }
    return (
        <>
            <ReactQuill
                ref={ref}
                theme="snow"
                value={value}
                onChange={setValue}
                modules={{
                    // table: true,
                    toolbar: {
                        container: [
                            [
                                // { header: "1" },
                                { header: [1, 2, 3, 4, 5, 6] },
                                // { font: [] },
                            ],
                            // [{ size: [] }],
                            [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                            ],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image", "video"],
                            ["clean"],
                            ["code-block"],
                        ],
                        // handlers: {
                        //     image: (e) => imageHandler,
                        // },
                    },
                }}
            />
        </>
    )
}
