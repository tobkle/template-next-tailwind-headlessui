import * as React from "react"
import { Transforms } from "slate"
import { useEditor, useFocused, useSelected } from "slate-react"
import { classNamesFunction, styled } from "@uifabric/utilities"
import { getImageElementStyles } from "./ImageElement.styles"
import reactModal from "components/open-modal"

const getClassNames = classNamesFunction()

export const ImageElementBase = ({
    attributes,
    children,
    element,
    className,
    styles,
    htmlAttributes,
}) => {
    const { url } = element
    const editor = useEditor()
    const focused = useFocused()
    const selected = useSelected()

    const classNames = getClassNames(styles, {
        className,
        focused,
        selected,
    })

    const Modal = ({ show, onSubmit, onDismiss }) => {
        return (
            <div className="">
                <h1>Hello Modal</h1>
                <button onClick={() => onSubmit({ modal: "data" })}>
                    onSubmit
                </button>
                <button onClick={() => onDismiss}>onDismiss</button>
            </div>
        )
    }

    const handleDblClick = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        // remember the current cursor/position/selection
        let path = editor.selection
        let modalResult = await reactModal(({ show, onSubmit, onDismiss }) => (
            <Modal show={show} onSubmit={onSubmit} onDismiss={onDismiss} />
        ))
        console.log("modalResult:", modalResult)
        // in async the selection was lost, so we need to reset the cursor
        Transforms.select(editor, path)
    }

    return (
        <div
            {...attributes}
            className={classNames.root}
            onDoubleClick={handleDblClick}
        >
            <div contentEditable={false}>
                <img
                    data-testid="ImageElementImage"
                    className={classNames.image}
                    src={url}
                    alt=""
                    {...htmlAttributes}
                />
            </div>
            {children}
        </div>
    )
}

export const ImageElement = styled(
    ImageElementBase,
    getImageElementStyles,
    undefined,
    {
        scope: "ImageElement",
    }
)
