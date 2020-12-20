import React from "react"
import dynamic from "next/dynamic"

const Icon = React.forwardRef(({ iconname, iconstyle, ...rest }, ref) => {
    const DynamicIcon = dynamic(import(`icons/${iconstyle}/${iconname}.js`))
    return <DynamicIcon ref={ref} {...rest} />
})

export default Icon
