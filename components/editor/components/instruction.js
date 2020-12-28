import React, { forwardRef } from "react"
import cn from "classnames"

const Instruction = forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={cn(className)}
        style={{
            whiteSpace: "pre-wrap",
            margin: "0 -20px 10px",
            padding: "10px 20px",
            fontSize: "14px",
            background: "#f8f8e8",
        }}
    />
))

export default Instruction
