import React, { forwardRef } from "react"
import cn from "classnames"

const Icon = forwardRef(({ className, active, reversed, ...props }, ref) => {
    return (
        <span
            {...props}
            ref={ref}
            className={cn("material-icons", className, {
                "text-black": active && !reversed,
                "text-gray-300": !active && !reversed,
                // "text-white": active && reversed,
                // "text-gray-300": !active && reversed,
            })}
            style={{
                fontSize: "20px",
                verticalAlign: "text-bottom",
            }}
        />
    )
})

export default Icon
