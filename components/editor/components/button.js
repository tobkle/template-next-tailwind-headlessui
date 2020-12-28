import React, { forwardRef } from "react"
import cn from "classnames"

const Button = forwardRef(({ className, active, reversed, ...props }, ref) => {
    return (
        <span
            {...props}
            ref={ref}
            className={cn(className, "cursor-pointer")}
        ></span>
    )
})

export default Button
