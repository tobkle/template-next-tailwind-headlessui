import React from "react"
import Select from "./select"
import { orientationOptions, sizeOptions, colorOptions } from "./options"
/**
 * @name MediaSearchSelections
 *
 */
export default function MediaSearchSelections({
    search,
    setSearch,
    lang,
    setLang,
    collections,
    setCollections,
    orientation,
    setOrientation,
    color,
    setColor,
    size,
    setSize,
}) {
    return (
        <div className="z-400 pr-2 flex w-full content-center flex-wrap ">
            <h1 className="text-sm font-semibold p-4">Unsplash:</h1>
            <input
                className="flex-auto flex-1 px-3 my-2 mx-1 w-40 rounded placeholder-opacity-80 placeholder-indigo-500"
                type="text"
                placeholder="search terms..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value.replace(/, /g, ",").replace(/ /g, ",")
                    )
                }
            />
            <input
                className="hidden md:block flex-auto px-3 w-28 my-2 mx-1 rounded placeholder-opacity-80"
                type="text"
                placeholder="language..."
                value={lang}
                onChange={(e) => setLang(e.target.value)}
            />
            <input
                className="hidden md:block  flex-auto px-3 my-2 mx-1 w-28 rounded placeholder-opacity-80"
                type="text"
                placeholder="collections..."
                value={collections}
                onChange={(e) => setCollections(e.target.value)}
            />
            <div className="hidden lg:block mx-1 mt-2 flex content-center rounded-lg">
                <Select
                    value={orientation}
                    setValue={setOrientation}
                    options={orientationOptions}
                    className="w-32"
                />
            </div>
            <div className="hidden lg:block mx-1 mt-2 flex content-center rounded-lg">
                <Select
                    value={color}
                    setValue={setColor}
                    options={colorOptions}
                    className="w-44"
                />
            </div>
            <div className="hidden lg:block mx-1 mt-2 flex content-center rounded-lg">
                <Select
                    value={size}
                    setValue={setSize}
                    options={sizeOptions}
                    className="w-32"
                />
            </div>
        </div>
    )
}
