import React, { useState, useEffect } from "react"
import Editor from "components/editor"

const EditorControl = React.forwardRef(
    ({ value, field, forID, classNameWrapper, onChange }, ref) => {
        const [open, setOpen] = useState(false)

        const transfer = (content) => {
            onChange(JSON.stringify(content))
        }

        return (
            <div
                ref={ref}
                className="flex flex-auto space-between align-center justify-center"
            >
                <input
                    id="editor"
                    type="textarea"
                    className={classNameWrapper}
                    value={value}
                    onChange={(e) => transfer(e.target.value)}
                />

                <button
                    onClick={(e) => setOpen(true)}
                    className={classNameWrapper}
                >
                    Open Editor
                </button>

                <EditorContainer
                    open={open}
                    setOpen={setOpen}
                    data={value}
                    transfer={transfer}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        )
    }
)

export default EditorControl
const initialValue = [
    {
        children: [{ text: "" }],
    },
]

function EditorContainer({ open, setOpen, data, transfer }) {
    if (!open) return null
    const [value, setValue] = useState()

    useEffect(() => {
        // check, if we receive a valid editor text node data from the cms
        // if so, take that data,
        // if not initialize control with initial data
        if (data && data.length > 0) {
            const content = JSON.parse(data)
            if (
                !content ||
                content.length < 1 ||
                !content[0].children ||
                content[0].children.length < 1
            ) {
                setValue(initialValue)
            } else {
                setValue(content)
            }
        } else {
            setValue(initialValue)
        }
    }, [data])

    return (
        <div className="fixed inset-0 bg-gray-100 z-300 shadow-lg rounded-lg overflow-hidden">
            <div className="relative flex flex-col w-full h-full">
                <div className="relative z-300 flex-1 mb-3  overflow-y-auto">
                    <div className=" mx-3 border-solid border-2 border-gray-50 h-full">
                        <Editor value={value} setValue={setValue} />
                    </div>
                </div>

                <div className="flex-initial ml-3 mb-2">
                    <div className="flex">
                        <button
                            onClick={(e) => {
                                transfer(value)
                                setOpen(false)
                            }}
                            className="mt-3 mr-3 rounded-md shadow sm:mt-0  overflow-hidden flex items-center justify-center px-6 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out "
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
