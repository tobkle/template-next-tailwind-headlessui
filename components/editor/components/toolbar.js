import React, { forwardRef } from "react"
import cn from "classnames"
import Menu from "./menu"

const Toolbar = forwardRef(({ className, ...props }, ref) => {
    return (
        <Menu
            {...props}
            ref={ref}
            className={cn("relative ", className)}
            style={{
                padding: "1px 18px 17px",
                margin: "0 -20px",
                borderBottom: "2px solid #eee",
                marginBottom: "20px",
            }}
        />
    )
})

export default Toolbar
