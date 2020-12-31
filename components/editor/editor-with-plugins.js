import "tippy.js/dist/tippy.css"
import React, { useEffect, useMemo, useState } from "react"
import { CodeAlt } from "@styled-icons/boxicons-regular/CodeAlt"
import { CodeBlock } from "@styled-icons/boxicons-regular/CodeBlock"
import { Subscript, Superscript } from "@styled-icons/foundation"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import {
    DragIndicator,
    FormatAlignCenter,
    FormatAlignLeft,
    FormatAlignRight,
    FormatBold,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    FormatQuote,
    FormatStrikethrough,
    FormatUnderlined,
    BorderAll,
    BorderClear,
    BorderBottom,
    BorderTop,
    BorderLeft,
    BorderRight,
    Image as ImageIcon,
    Link as LinkIcon,
    Looks3,
    Looks4,
    Looks5,
    Looks6,
    LooksOne,
    LooksTwo,
} from "@styled-icons/material"

import {
    AlignPlugin,
    BlockquotePlugin,
    BoldPlugin,
    CodeBlockPlugin,
    CodePlugin,
    EditablePlugins,
    // ELEMENT_IMAGE,
    ExitBreakPlugin,
    HeadingPlugin,
    HeadingToolbar,
    HighlightPlugin,
    // ImagePlugin,
    ItalicPlugin,
    LinkPlugin,
    ListPlugin,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_SUBSCRIPT,
    MARK_SUPERSCRIPT,
    MARK_UNDERLINE,
    MediaEmbedPlugin,
    ParagraphPlugin,
    pipe,
    ResetBlockTypePlugin,
    SearchHighlightPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    TablePlugin,
    TodoListPlugin,
    ToolbarAlign,
    ToolbarElement,
    ToolbarTable,
    insertTable,
    deleteTable,
    addRow,
    deleteRow,
    addColumn,
    deleteColumn,
    getSelectableElement,
    // ToolbarImage,
    ToolbarLink,
    ToolbarList,
    ToolbarMark,
    UnderlinePlugin,
    withAutoformat,
    withDeserializeHTML,
    // withImageUpload,
    withInlineVoid,
    withLink,
    withList,
    withMarks,
    withNormalizeTypes,
    withTable,
    withTrailingNode,
    withSelectOnBackspace,
} from "@udecode/slate-plugins"

import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { Slate, withReact } from "slate-react"
import { autoformatRules } from "./config/autoformatRules.js"

import {
    ELEMENT_IMAGE,
    ImagePlugin,
    ToolbarImage,
    withImageUpload,
} from "./plugins/image"

import {
    headingTypes,
    initialValueAutoformat,
    initialValueBasicElements,
    initialValueBasicMarks,
    initialValueEmbeds,
    initialValueExitBreak,
    initialValueForcedLayout,
    initialValueHighlight,
    initialValueImages,
    initialValueLinks,
    initialValueList,
    initialValuePasteHtml,
    initialValueSoftBreak,
    initialValueTables,
    initialValueEmpty,
    options as defaultOptions,
    optionsResetBlockTypes,
} from "./config/initialValues"

const draggableComponentOptions = [
    { ...defaultOptions.p, level: 1 },
    defaultOptions.blockquote,
    defaultOptions.todo_li,
    defaultOptions.h1,
    defaultOptions.h2,
    defaultOptions.h3,
    defaultOptions.h4,
    defaultOptions.h5,
    defaultOptions.h6,
    defaultOptions.img,
    defaultOptions.link,
    defaultOptions.ol,
    defaultOptions.ul,
    defaultOptions.table,
    defaultOptions.media_embed,
    defaultOptions.code_block,
].map(({ type, level, component, ...options }) => [
    type,
    {
        ...options,
        component: getSelectableElement({
            component,
            level,
            dragIcon: (
                <DragIndicator
                    style={{
                        width: 18,
                        height: 18,
                        color: "rgba(55, 53, 47, 0.3)",
                    }}
                />
            ),
            styles: {
                blockAndGutter: {
                    padding: "4px 0",
                },
                blockToolbarWrapper: {
                    height: "1.5em",
                },
            },
        }),
        rootProps: {
            styles: {
                root: {
                    margin: 0,
                    lineHeight: "1.5",
                },
            },
        },
    },
])

const options = {
    ...defaultOptions,
    // ...Object.fromEntries(draggableComponentOptions),
}

const initialValue = [
    ...initialValueEmpty,
    // ...initialValueForcedLayout,
    ...initialValueBasicMarks,
    ...initialValueHighlight,
    ...initialValueBasicElements,
    ...initialValueList,
    ...initialValueTables,
    ...initialValueLinks,
    ...initialValueImages,
    ...initialValueEmbeds,
    ...initialValueAutoformat,
    ...initialValueSoftBreak,
    ...initialValueExitBreak,
    ...initialValuePasteHtml,
]

const plugins = [
    HeadingPlugin(options),
    ParagraphPlugin(options),
    ListPlugin(options),
    BlockquotePlugin(options),
    CodeBlockPlugin(options),
    BoldPlugin(options),
    ItalicPlugin(options),
    UnderlinePlugin(options),
    StrikethroughPlugin(options),
    CodePlugin(options),
    SuperscriptPlugin(options),
    SubscriptPlugin(options),
    AlignPlugin(options),
    LinkPlugin(options),
    TablePlugin(options),
    HighlightPlugin(options),
    SearchHighlightPlugin(options),
    ResetBlockTypePlugin(optionsResetBlockTypes),
    SoftBreakPlugin({
        rules: [
            { hotkey: "shift+enter" },
            {
                hotkey: "enter",
                query: {
                    allow: [
                        options.code_block.type,
                        options.blockquote.type,
                        options.td.type,
                    ],
                },
            },
        ],
    }),
    ExitBreakPlugin({
        rules: [
            {
                hotkey: "mod+enter",
            },
            {
                hotkey: "mod+shift+enter",
                before: true,
            },
            {
                hotkey: "enter",
                query: {
                    start: true,
                    end: true,
                    allow: headingTypes,
                },
            },
        ],
    }),
    TodoListPlugin(options),
    ImagePlugin(options),
    MediaEmbedPlugin(options),
]

const withPlugins = [
    withReact,
    withHistory,
    withList(options),
    withMarks(),
    withTable(options),
    withLink(),
    withDeserializeHTML({ plugins }),
    withImageUpload(),
    withAutoformat({ rules: autoformatRules }),
    // withNormalizeTypes({
    //     rules: [{ path: [0, 0], strictType: options.h1.type }],
    // }),
    withTrailingNode({ type: options.p.type, level: 1 }),
    withInlineVoid({ plugins }),
    withSelectOnBackspace({ allow: [ELEMENT_IMAGE] }),
]

const setNodeId = (nodes) => {
    let id = 10000
    nodes.forEach((node) => {
        const children = node.children
        if (children) {
            children.forEach((block) => {
                block.id = id
                id++
            })
        }
    })
}

setNodeId(initialValue)

/***
 * E D I T O R -----------------------------------
 */
export default function Editor({ value, setValue }) {
    useEffect(() => {
        setValue(initialValue)
    }, [])
    const onKeyDown = []
    const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])
    if (!value) return null
    return (
        <div className="relative flex flex-col h-screen">
            {/* <DndProvider backend={HTML5Backend}> */}
            <Slate
                editor={editor}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue)
                }}
            >
                <Toolbar />
                <div className="flex-1 overflow-y-auto">
                    <EditablePlugins
                        plugins={plugins}
                        onKeyDown={onKeyDown}
                        placeholder="Enter some text..."
                    />
                </div>
            </Slate>
            {/* </DndProvider> */}
        </div>
    )
}

/***
 * T O O L B A R -----------------------------------
 */
const Toolbar = () => {
    return (
        <>
            <HeadingToolbar
                styles={{
                    root: {
                        flexWrap: "wrap",
                        border: "none",
                        backgroundColor: "rgba(243, 244, 246, 1)",
                    },
                }}
            >
                {/* Elements */}
                <ToolbarElement type={options.h1.type} icon={<LooksOne />} />
                <ToolbarElement type={options.h2.type} icon={<LooksTwo />} />
                <ToolbarElement type={options.h3.type} icon={<Looks3 />} />
                <ToolbarElement type={options.h4.type} icon={<Looks4 />} />
                <ToolbarElement type={options.h5.type} icon={<Looks5 />} />
                <ToolbarElement type={options.h6.type} icon={<Looks6 />} />
                <ToolbarList
                    {...options}
                    typeList={options.ul.type}
                    icon={<FormatListBulleted />}
                />
                <ToolbarList
                    {...options}
                    typeList={options.ol.type}
                    icon={<FormatListNumbered />}
                />
                <ToolbarElement
                    type={options.blockquote.type}
                    icon={<FormatQuote />}
                />
                <ToolbarElement
                    type={options.code_block.type}
                    icon={<CodeBlock />}
                />
                {/* Marks */}
                <ToolbarMark type={MARK_BOLD} icon={<FormatBold />} />
                <ToolbarMark type={MARK_ITALIC} icon={<FormatItalic />} />
                <ToolbarMark
                    type={MARK_UNDERLINE}
                    icon={<FormatUnderlined />}
                />
                <ToolbarMark
                    type={MARK_STRIKETHROUGH}
                    icon={<FormatStrikethrough />}
                />
                <ToolbarMark type={MARK_CODE} icon={<CodeAlt />} />
                <ToolbarMark
                    type={MARK_SUPERSCRIPT}
                    clear={MARK_SUBSCRIPT}
                    icon={<Superscript />}
                />
                <ToolbarMark
                    type={MARK_SUBSCRIPT}
                    clear={MARK_SUPERSCRIPT}
                    icon={<Subscript />}
                />
                <ToolbarAlign icon={<FormatAlignLeft />} />
                <ToolbarAlign
                    type={options.align_center.type}
                    icon={<FormatAlignCenter />}
                />
                <ToolbarAlign
                    type={options.align_right.type}
                    icon={<FormatAlignRight />}
                />
                <ToolbarTable
                    {...options}
                    icon={<BorderAll />}
                    transform={insertTable}
                />
                <ToolbarTable
                    {...options}
                    icon={<BorderClear />}
                    transform={deleteTable}
                />
                <ToolbarTable
                    {...options}
                    icon={<BorderBottom />}
                    transform={addRow}
                />
                <ToolbarTable
                    {...options}
                    icon={<BorderTop />}
                    transform={deleteRow}
                />
                <ToolbarTable
                    {...options}
                    icon={<BorderLeft />}
                    transform={addColumn}
                />
                <ToolbarTable
                    {...options}
                    icon={<BorderRight />}
                    transform={deleteColumn}
                />
                <ToolbarLink {...options} icon={<LinkIcon />} />
                <ToolbarImage {...options} icon={<ImageIcon />} />
            </HeadingToolbar>
        </>
    )
}
