import React, { useCallback, useState, useEffect } from "react"
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
                    className="hidden"
                    value={value}
                    onChange={(e) => transfer(e.target.value)}
                />

                <button
                    onClick={(e) => setOpen(true)}
                    className={classNameWrapper}
                    style={{
                        backgroundColor: "rgb(219, 234, 254)",
                    }}
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
    const key = new URL(location.href).hash
    const [value, setRawValue] = useState()

    const getValue = () => {
        let storageData = localStorage.getItem(key)
        if (data && storageData && data !== storageData) {
            const answer = confirm(
                "Different Content found in Browser Cache. Loading Content from Browser Cache instead?"
            )
            if (!answer) storageData = data
        } else {
            storageData = data
        }
        if (!storageData) {
            storageData = "[{ children: [{ text: '' }] }]"
        }
        storageData = JSON.parse(storageData)
        return storageData
    }

    const setValue = (newValue) => {
        setRawValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    const reactOnKey = (e) => {
        let isEscape = false
        if ("key" in e) {
            isEscape = e.key === "Escape" || e.key === "Esc"
        } else {
            isEscape = e.keyCode === 27
        }
        if (isEscape) setOpen(false)
    }

    useEffect(() => {
        setRawValue(getValue())
        addEventListener("keydown", reactOnKey)
        return () => removeEventListener("keydown", reactOnKey)
    }, [])

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
                        <button
                            onClick={(e) => {
                                setOpen(false)
                            }}
                            className="mt-3 mr-3 rounded-md shadow sm:mt-0 overflow-hidden flex items-center justify-center px-6 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out "
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
