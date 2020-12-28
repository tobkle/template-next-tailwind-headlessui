import React, { forwardRef } from "react"
import cn from "classnames"

const Menu = forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            {...props}
            ref={ref}
            className={cn("inline-block mr-2", className)}
            style={{
                fontSize: "18px",
                verticalAlign: "text-bottom",
            }}
        />
    )
})

export default Menu
