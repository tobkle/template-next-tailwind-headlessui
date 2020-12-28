import React from "react"
import isUrl from "is-url"
import Link from "components/link"
import { useSlate } from "slate-react"
import { Transforms, Editor, Range, Element as SlateElement } from "slate"

import { Button, Icon } from "../components"

export const withLinks = (editor) => {
    const { insertData, insertText, isInline } = editor

    editor.isInline = (element) => {
        return element.type === "link" ? true : isInline(element)
    }

    editor.insertText = (text) => {
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }

    editor.insertData = (data) => {
        const text = data.getData("text/plain")

        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}

const insertLink = (editor, url) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}

const isLinkActive = (editor) => {
    const [link] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === "link",
    })
    return !!link
}

const unwrapLink = (editor) => {
    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === "link",
    })
}

const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: "link",
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: "end" })
    }
}

export const LinkButton = () => {
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
            <Icon>link</Icon>
        </Button>
    )
}

export const LinkElement = (props) => {
    const { attributes, element, children } = props
    return (
        <a {...attributes} href={element.url}>
            {children}
        </a>
    )
}
