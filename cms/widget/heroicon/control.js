import React from "react"
import Icon from "components/icon"
import heroicons from "icons/index"

const HeroIcon = React.forwardRef(
    ({ value, field, forID, classNameWrapper, onChange }, ref) => {
        const separator = field.get("separator", ", ")

        const handleChange = (e) => {
            const newVal = e.target.value.split(separator).map((e) => e.trim())
            onChange(newVal)
        }

        return (
            <div
                ref={ref}
                className="flex flex-auto space-between align-center justify-center"
            >
                <select
                    value={value}
                    onChange={handleChange}
                    id={forID}
                    className={classNameWrapper}
                >
                    {heroicons &&
                        heroicons.map((icon, index) => (
                            <option key={index} value={icon}>
                                {icon}
                            </option>
                        ))}
                </select>

                <div className="relative w-12 h-12 overflow-hidden">
                    <Icon
                        iconstyle={"outline"}
                        iconname={value}
                        className="text-indigo-400 h-12 w-12"
                    />
                </div>
            </div>
        )
    }
)

export default HeroIcon
