import React from "react"
import cn from "classnames"
import Image from "components/image"

/**
 * @name ImageViewer
 *
 */
export default function MediaViewer({
    results,
    size,
    isSearching,
    selectedImage,
    setSelectedImage,
    setSelectedUrl,
}) {
    return (
        <div className="relative z-300 flex-1 mb-3  overflow-y-auto">
            <div className=" mx-3 border-solid border-2 border-gray-50 h-full">
                <div>
                    {/* {isSearching && <div>Searching ...</div>} */}
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {results &&
                            results.map((result) => (
                                <li
                                    key={result.id}
                                    id={result.id}
                                    onClick={(e) => {
                                        console.log(
                                            "result:",
                                            result.id,
                                            "e.id:",
                                            e.target.id
                                        )
                                        setSelectedImage(result.id)
                                        setSelectedUrl(result.urls[size])
                                    }}
                                    className={cn(
                                        {
                                            "border-8 border-indigo-600":
                                                selectedImage === result.id,
                                        },
                                        "relative h-60 lg:h-80 2xl:h-96 col-span-1 flex flex-col text-center bg-white rounded-lg overflow-hidden shadow"
                                    )}
                                >
                                    <Image
                                        src={result.urls.thumb}
                                        alt={result.alt_description}
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="center center"
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
