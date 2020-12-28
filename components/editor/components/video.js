import React, { useState } from "react"
import { useSlate, useEditor, ReactEditor } from "slate-react"
import { Transforms, Editor, Range, Element as SlateElement } from "slate"

import { Button, Icon } from "."

export const withVideos = (editor) => {
    const { isVoid } = editor
    editor.isVoid = (element) =>
        element.type === "video" ? true : isVoid(element)
    return editor
}

const UrlInput = ({ url, onChange }) => {
    const [value, setValue] = useState(url)
    return (
        <input
            value={value}
            className="mt-3 p-2 w-full border-2 text-sm text-gray-400"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
                const newUrl = e.target.value
                setValue(newUrl)
                onChange(newUrl)
            }}
        />
    )
}

export const VideoElement = ({ attributes, children, element }) => {
    const editor = useEditor()
    const { url } = element
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <div
                    style={{
                        padding: "75% 0 0 0",
                        position: "relative",
                    }}
                >
                    <iframe
                        src={`${url}?title=0&byline=0&portrait=0`}
                        frameBorder="0"
                        style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}
                    />
                </div>

                <UrlInput
                    url={url}
                    onChange={(val) => {
                        const path = ReactEditor.findPath(editor, element)
                        const newProperties = {
                            url: val,
                        }
                        Transforms.setNodes(editor, newProperties, { at: path })
                    }}
                />
            </div>

            {children}
        </div>
    )
}

const insertLink = (editor, url) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}

const isLinkActive = (editor) => {
    const [video] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === "video",
    })
    return !!video
}

const unwrapLink = (editor) => {
    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === "video",
    })
}

const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }
    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const video = {
        type: "video",
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }
    if (isCollapsed) {
        Transforms.insertNodes(editor, video)
    } else {
        Transforms.wrapNodes(editor, video, { split: true })
        Transforms.collapse(editor, { edge: "end" })
    }
}

export const VideoButton = () => {
    const editor = useSlate()
    return (
        <Button
            active={isLinkActive(editor)}
            onMouseDown={(event) => {
                event.preventDefault()
                const url = window.prompt("Enter the URL of the link:")
                if (!url) return
                insertLink(editor, url)
            }}
        >
            <Icon>movie</Icon>
        </Button>
    )
}
