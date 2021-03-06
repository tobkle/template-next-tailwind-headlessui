import React, { useCallback, useState, useEffect } from "react"
import Editor from "components/editor"
import { Base64 } from "js-base64"

const EditorControl = React.forwardRef(
    ({ value, field, forID, classNameWrapper, onChange }, ref) => {
        const [open, setOpen] = useState(false)

        const transfer = (content) => {
            onChange(encode(JSON.stringify(content)))
        }

        const encode = (_data) => {
            if (_data) return Base64.encode(_data)
            return _data
        }

        const decode = (_data) => {
            if (_data) return Base64.decode(_data)
            return _data
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
                    data={decode(value)}
                    transfer={transfer}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        )
    }
)

export default EditorControl

function EditorContainer({ open, setOpen, data, transfer }) {
    if (!open) return null
    const key = new URL(location.href).hash
    const [value, setRawValue] = useState()

    const getValue = () => {
        try {
            let storageData = localStorage.getItem(key)
            if (data && storageData && data !== storageData) {
                const answer = confirm(
                    "Different Content found in Browser Cache. Loading Content from Browser Cache instead?"
                )
                if (!answer) storageData = data
            } else if (data) {
                storageData = data
            }
            if (!storageData) {
                return null
            }
            return JSON.parse(storageData)
        } catch (error) {
            console.error(error)
        }
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
                <div className="relative z-300 flex-1 overflow-y-auto mx-auto">
                    <div className="h-full overflow-hidden bg-white prose">
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
