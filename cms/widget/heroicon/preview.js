import React, { useState } from "react"
import Icon from "components/icon"
import heroicons from "icons/index"

const HeroIconPreview = ({
    value,
    field,
    metadata,
    getAsset,
    entry,
    fieldsMetaData,
}) => {
    const [size, setSize] = useState(6)

    return (
        <>
            <h1 className="text-2xl semi-bold">Heroicons Iconset {size}</h1>

            <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={14}>14</option>
                <option value={16}>16</option>
                <option value={20}>20</option>
                <option value={24}>24</option>
                <option value={28}>28</option>
                <option value={32}>32</option>
                <option value={36}>36</option>
                <option value={40}>40</option>
                <option value={44}>44</option>
                <option value={48}>48</option>
                <option value={52}>52</option>
                <option value={56}>56</option>
                <option value={60}>60</option>
                <option value={64}>64</option>
                <option value={72}>72</option>
                <option value={80}>80</option>
                <option value={96}>96</option>
            </select>

            <table>
                <thead>
                    <tr className="bg-gray-100 font-semibold">
                        <td>iconname</td>
                        <td className="text-teal-400">outline</td>
                        <td className="text-indigo-400">solid</td>
                    </tr>
                </thead>
                <tbody>
                    {heroicons &&
                        heroicons.map((icon, index) => (
                            <tr key={index}>
                                <td>{icon}</td>
                                <td className="relative w-8 h-8 overflow-hidden">
                                    <Icon
                                        iconstyle={"outline"}
                                        iconname={icon}
                                        className={`text-teal-400 h-${size} w-${size}`}
                                    />
                                </td>

                                <td className="relative w-8 h-8 overflow-hidden">
                                    <Icon
                                        iconstyle={"solid"}
                                        iconname={icon}
                                        className={`text-indigo-400 h-${size} w-${size}`}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default HeroIconPreview
