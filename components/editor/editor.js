import React, { useCallback, useMemo } from "react"
import { createEditor } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { withHistory } from "slate-history"
import { Element, Leaf, Toolbar, MarkButton, BlockButton } from "./components"
import { withImages, ImageButton } from "./components/image"
import { withLinks, LinkButton } from "./components/link"
import { withVideos, VideoButton } from "./components/video"
import { withShortcuts } from "./components/markdown"
import handleHotKeys from "./components/hot-keys"

export default function EditorPage({ value, setValue }) {
    if (!value) return null
    const renderElement = useCallback((props) => <Element {...props} />, [])
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

    const editor = useMemo(
        () =>
            withShortcuts(
                withVideos(
                    withLinks(
                        withImages(withHistory(withReact(createEditor())))
                    )
                )
            ),
        []
    )

    return (
        <>
            <div className="relative flex flex-col h-screen items-center">
                <Slate
                    editor={editor}
                    value={value}
                    onChange={(value) => setValue(value)}
                >
                    <Toolbar className="rounded-lg shadow-lg p-3">
                        <MarkButton format="bold" icon="format_bold" />
                        <MarkButton format="italic" icon="format_italic" />
                        <MarkButton
                            format="underline"
                            icon="format_underlined"
                        />

                        <BlockButton
                            format="numbered-list"
                            icon="format_list_numbered"
                        />
                        <BlockButton
                            format="bulleted-list"
                            icon="format_list_bulleted"
                        />
                        <BlockButton format="block-quote" icon="format_quote" />
                        <LinkButton />
                        <MarkButton format="code" icon="code" />
                        <BlockButton format="heading-one" icon="looks_one" />
                        <BlockButton format="heading-two" icon="looks_two" />
                        <BlockButton format="heading-three" icon="looks_3" />
                        <BlockButton format="heading-four" icon="looks_4" />
                        <BlockButton format="heading-five" icon="looks_5" />
                        <BlockButton format="heading-six" icon="looks_6" />

                        <ImageButton />
                        <VideoButton />
                    </Toolbar>

                    <div className="flex-1 overflow-y-auto p-2 prose">
                        <Editable
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            placeholder="Enter some text here...."
                            spellCheck
                            autoFocus
                            onKeyDown={(event) => handleHotKeys(event, editor)}
                        />
                    </div>
                </Slate>
                <pre className="flex-auto max-h-12 overflow-y-auto">
                    {JSON.stringify(value, null, 2)}
                </pre>
            </div>
        </>
    )
}
