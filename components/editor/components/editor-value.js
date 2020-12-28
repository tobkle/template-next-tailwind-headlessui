import React, { forwardRef } from "react"
import cn from "classnames"

const EditorValue = forwardRef(({ className, value, ...props }, ref) => {
    const textLines = value.document.nodes
        .map((node) => node.text)
        .toArray()
        .join("\n")
    return (
        <div
            ref={ref}
            {...props}
            className={cn(className)}
            style={{
                margin: "30px -20px 0",
            }}
        >
            <div
                style={{
                    fontSize: "14px",
                    padding: "5px 20px",
                    color: "#404040",
                    borderTop: "2px solid #eeeeee",
                    background: "#f8f8f8",
                }}
            >
                Editor's value as text
            </div>
            <div
                style={{
                    color: "#404040",
                    font: "12px monospace",
                    whiteSpace: "pre-wrap",
                    padding: "10px 20px",
                }}
            >
                {textLines}
            </div>
        </div>
    )
})

export default EditorValue
