import React, { useState, useRef, useEffect } from "react"
import Icon from "components/icon"
import Image from "components/image"
import cn from "classnames"
import { Listbox, Transition } from "@headlessui/react"
import { pad } from "lib/helpers"

const orientationOptions = ["landscape", "portrait", "squarish"]
const sizeOptions = ["thumb", "small", "regular", "full", "raw"]
const colorOptions = [
    "all",
    "black_and_white",
    "black",
    "white",
    "yellow",
    "orange",
    "red",
    "purple",
    "magenta",
    "green",
    "teal",
    "blue",
]

const OnlineMediaControl = React.forwardRef(
    ({ value, field, forID, classNameWrapper, onChange }, ref) => {
        const [openMediaSelector, setOpenMediaSelector] = useState(false)

        const transferImageUrl = (newImage) => {
            onChange(newImage)
        }

        return (
            <div
                ref={ref}
                className="flex flex-auto space-between align-center justify-center"
            >
                <input
                    id="unsplash_image_url"
                    type="text"
                    className={classNameWrapper}
                    value={value}
                    onChange={(e) => transferImageUrl(e.target.value)}
                />

                <button
                    onClick={(e) => setOpenMediaSelector(true)}
                    className={classNameWrapper}
                >
                    Select Image
                </button>

                <MediaSelector
                    openMediaSelector={openMediaSelector}
                    setOpenMediaSelector={setOpenMediaSelector}
                    transferImageUrl={transferImageUrl}
                />
            </div>
        )
    }
)

export default OnlineMediaControl

/** MediaSelector --- Modal Window */
function MediaSelector({
    openMediaSelector,
    setOpenMediaSelector,
    transferImageUrl,
}) {
    if (!openMediaSelector) return null
    // Search Parameters
    const [search, setSearch] = useState("") // = query in unsplash, but query is used in /api route
    const [lang, setLang] = useState("")
    const [color, setColor] = useState(colorOptions[0])
    const [collections, setCollections] = useState("")
    const [orientation, setOrientation] = useState(orientationOptions[0])
    const [size, setSize] = useState(sizeOptions[0])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(12)
    const [appendPage, setAppendPage] = useState(false)

    // Search Control
    const [isSearching, setIsSearching] = useState(false)
    const debouncedSearchTerm = useDebounce(search, 500)

    // Sear Results
    const [results, setResults] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedUrl, setSelectedUrl] = useState("")

    // Save References to receive the current values in the functions
    // as we receive the results asynchronously after function declaration
    const resultsRef = useRef(results)
    function updateResults(newResults) {
        resultsRef.current = newResults
        setResults(newResults)
    }
    function addResults(newResults) {
        debugger
        resultsRef.current = resultsRef.current.concat(newResults)
        setResults(resultsRef.current)
    }

    const selectedImageRef = useRef(selectedImage)
    function updateSelectedImage(newSelectedImage) {
        selectedImageRef.current = newSelectedImage
        setSelectedImage(newSelectedImage)
    }

    const pageRef = useRef(page)
    function updatePage(newPage) {
        pageRef.current = newPage
        setPage(newPage)
    }

    const sizeRef = useRef(size)
    function updateSize(newSize) {
        sizeRef.current = newSize
        setSize(newSize)
    }

    // navigation object for easier pass-through
    const navigation = {
        nextImage: () => {
            let selectedImage = selectedImageRef.current
            let results = resultsRef.current
            if (!results || results.length < 1) return null
            if (!selectedImage) return updateSelectedImage(results[0].id)
            const index = results.map((r) => r.id).indexOf(selectedImage)
            if (index > -1) {
                if (index < results.length - 1) {
                    updateSelectedImage(results[index + 1].id)
                } else {
                    updateSelectedImage(results[0].id)
                }
            }
        },
        prevImage: () => {
            let selectedImage = selectedImageRef.current
            let results = resultsRef.current
            if (!results || results.length < 1) return null
            if (!selectedImage) return updateSelectedImage(results[0].id)
            const index = results.map((r) => r.id).indexOf(selectedImage)
            if (index > -1) {
                if (index > 0) {
                    updateSelectedImage(results[index - 1].id)
                } else {
                    updateSelectedImage(results[results.length - 1].id)
                }
            }
        },
        prevPage: () => {
            let page = pageRef.current
            if (page > 1) {
                updatePage(page - 1)
                setAppendPage(true)
            }
        },
        nextPage: () => {
            let page = pageRef.current
            updatePage(page + 1)
            setAppendPage(true)
        },
        gotoPage: (newPage) => {
            if (newPage > 0) {
                updatePage(newPage)
            }
        },
        resetPage: () => {
            updatePage(1)
        },
        downloadImage: () => {
            debugger
            if (!selectedImageRef.current) return null
            const imageId = selectedImageRef.current
            const size = sizeRef.current
            const image = resultsRef.current
                .filter((img) => img.id === imageId)
                .pop()
            if (image && image.urls && image.urls[size]) {
                const date = new Date()
                const dateString = date.toISOString().split("T")[0]
                const a = document.createElement("a")
                a.href = image.urls[size]
                a.download = `unsplash_${imageId}_${dateString}.jpg`
                a.target = "_blank"
                a.rel = "noopener"
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            }
        },
    }

    const reactOnKey = (e) => {
        let isEscape = false
        let isSpacebar = false
        let isArrowLeft = false
        let isArrowRight = false
        let isPageUp = false
        let isPageDown = false
        // let isArrowUp = false
        // let isArrowDown = false
        if ("key" in e) {
            isEscape = e.key === "Escape" || e.key === "Esc"
            isSpacebar = e.key === " " || e.key === "Space"
            isArrowLeft = e.key === "ArrowLeft" || e.key === "Left"
            isArrowRight = e.key === "ArrowRight" || e.key === "Right"
            isPageUp = e.key === "PageUp"
            isPageDown = e.key === "PageDown"
            // isArrowUp = e.key === "ArrowUp" || e.key === "Up"
            // isArrowDown = e.key === "ArrowDown" || e.key === "Down"
        } else {
            isEscape = e.keyCode === 27
            isSpacebar = e.keyCode === 32
            isArrowLeft = e.keyCode === 37
            isArrowRight = e.keyCode === 39
            isPageUp = e.keyCode === 33
            isPageDown = e.keyCode === 34
            // isArrowUp = e.keyCode === 38
            // isArrowDown = e.keyCode === 40
        }
        if (isEscape) setOpenMediaSelector(false)
        if (isSpacebar) navigation.downloadImage()
        if (isArrowLeft) navigation.prevImage()
        if (isArrowRight) navigation.nextImage()
        if (isPageUp) navigation.prevPage(false)
        if (isPageDown) navigation.nextPage(false)
        // if (isArrowUp) prevImage()
        // if (isArrowDown) nextImage()
    }

    // catch key events
    useEffect(() => {
        addEventListener("keydown", reactOnKey)
        return () => removeEventListener("keydown", reactOnKey)
    }, [])

    // delayed search field reaction and call search api
    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true)
            doSearch({
                search: debouncedSearchTerm,
                lang,
                color: color === "all" ? null : color, // if "all" use null = "not selected", as default
                collections,
                orientation,
                page,
                per_page: perPage,
                content_filter: "low",
            }).then((results) => {
                // if (appendPage) {
                //     addResults(results)
                // } else {
                updateResults(results)
                // }
                setAppendPage(false)
                setIsSearching(false)
            })
        } else {
            updateResults([])
        }
    }, [debouncedSearchTerm, appendPage, setAppendPage])

    return (
        <div className="fixed inset-0 bg-gray-100 z-300 shadow-lg rounded-lg overflow-hidden">
            <div className="relative flex flex-col w-full h-full">
                <ImageSearchSelections
                    search={search}
                    setSearch={setSearch}
                    lang={lang}
                    setLang={setLang}
                    collections={collections}
                    setCollections={setCollections}
                    orientation={orientation}
                    setOrientation={setOrientation}
                    color={color}
                    setColor={setColor}
                    size={size}
                    setSize={updateSize}
                />

                <ImageViewer
                    results={results}
                    size={size}
                    isSearching={isSearching}
                    selectedImage={selectedImage}
                    setSelectedImage={updateSelectedImage}
                    setSelectedUrl={setSelectedUrl}
                />

                <UserInteraction
                    navigation={navigation}
                    isSearching={isSearching}
                    selectedImage={selectedImage}
                    selectedUrl={selectedUrl}
                    setOpenMediaSelector={setOpenMediaSelector}
                    transferImageUrl={transferImageUrl}
                    page={page}
                    setPage={updatePage}
                    perPage={perPage}
                    setPerPage={setPerPage}
                />
            </div>
        </div>
    )
}

/**
 * @name ImageSearchSelections
 *
 */
function ImageSearchSelections({
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

/**
 * @name UserInteraction
 *
 */
function UserInteraction({
    navigation,
    isSearching,
    selectedImage,
    selectedUrl,
    setOpenMediaSelector,
    transferImageUrl,
    page,
    setPage,
    perPage,
    setPerPage,
}) {
    return (
        <div className="flex-initial ml-3 mb-2">
            <div className="flex">
                <button
                    onClick={(e) => {
                        transferImageUrl(selectedUrl)
                        setOpenMediaSelector(false)
                    }}
                    className="mt-3 mr-3 rounded-md shadow sm:mt-0  overflow-hidden flex items-center justify-center px-6 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out "
                >
                    Select
                </button>

                <button
                    onClick={(e) => {
                        setOpenMediaSelector(false)
                    }}
                    className="mt-3 mr-3 rounded-md shadow sm:mt-0 overflow-hidden flex items-center justify-center px-6 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out "
                >
                    Cancel
                </button>

                <label for="page">
                    <span>Page:</span>
                    <input
                        className="px-3 w-16 py-1 mx-1 mr-3 rounded placeholder-opacity-80"
                        id="page"
                        type="number"
                        min={0}
                        max={99}
                        required={true}
                        value={page}
                        onChange={(e) => setPage(parseInt(e.target.value))}
                    />
                </label>

                <button
                    onClick={(e) => {
                        navigation.prevPage()
                    }}
                    disabled={page <= 0}
                    className={cn(
                        "mt-3 mr-3 rounded-md shadow sm:mt-0 overflow-hidden flex items-center justify-center px-2 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out",
                        { "text-gray-100 cursor-not-allowed": page <= 0 }
                    )}
                >
                    <Icon
                        className={cn("w-6 h-6 text-indigo-500", {
                            "text-gray-100": page <= 0,
                        })}
                        iconname="ChevronUp"
                        iconstyle="outline"
                    />
                </button>

                <button
                    onClick={(e) => {
                        navigation.nextPage()
                    }}
                    className="mt-3 mr-3 rounded-md shadow sm:mt-0 overflow-hidden flex items-center justify-center px-2 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out "
                >
                    <Icon
                        className="w-6 h-6 text-indigo-500"
                        iconname="ChevronDown"
                        iconstyle="outline"
                    />
                </button>

                <label for="perPage">
                    <span>per Page:</span>
                    <input
                        className="px-3 w-14 py-1 mx-1 mr-3 rounded placeholder-opacity-80"
                        id="perPage"
                        type="number"
                        min={1}
                        max={99}
                        value={perPage}
                        onChange={(e) => setPerPage(parseInt(e.target.value))}
                    />
                </label>

                <button
                    onClick={(e) => {
                        navigation.prevImage()
                    }}
                    className="mt-3 mr-3 rounded-md shadow sm:mt-0 overflow-hidden flex items-center justify-center px-2 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out "
                >
                    <Icon
                        className="w-6 h-6 text-indigo-500"
                        iconname="ChevronLeft"
                        iconstyle="outline"
                    />
                </button>

                <button
                    onClick={(e) => {
                        navigation.nextImage()
                    }}
                    className="mt-3 mr-3 rounded-md shadow sm:mt-0 overflow-hidden flex items-center justify-center px-2 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out "
                >
                    <Icon
                        className="w-6 h-6 text-indigo-500"
                        iconname="ChevronRight"
                        iconstyle="outline"
                    />
                </button>

                {selectedImage && (
                    <button className="mt-3 mr-3 rounded-md shadow sm:mt-0 overflow-hidden flex items-center justify-center px-6 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out ">
                        <a href={selectedUrl} target="_blank" rel="noopener">
                            Open Image: {selectedImage}
                        </a>
                    </button>
                )}
                {isSearching && (
                    <div className="bg-yellow-200 px-6 pt-1 rounded-lg">
                        Searching ...
                    </div>
                )}
            </div>
        </div>
    )
}

/**
 * @name ImageViewer
 *
 */
function ImageViewer({
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
                    <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                                    class={cn(
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

/**
 * @name doSearch
 *
 */
function doSearch({
    lang = null,
    search,
    color = null,
    collections = null,
    orientation = "landscape",
    page = null,
    per_page = null,
    content_filter = null,
}) {
    if (!search) return []

    let s = `search=${search}`
    if (lang) s += `&lang=${lang}`
    if (page) s += `&page=${page}`
    if (per_page) s += `&per_page=${per_page}`
    if (color) s += `&color=${color}`
    if (orientation) s += `&orientation=${orientation}`
    if (collections) s += `&collections=${collections}`
    if (content_filter) s += `&collections=${content_filter}`

    return fetch(`/api/unsplash?${s}`, {
        method: "GET",
    })
        .then((r) => r.json())
        .then((r) => r.results)
        .catch((error) => {
            console.error(error)
            return []
        })
}

function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(
        () => {
            // Set debouncedValue to value (passed in) after the specified delay
            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)

            // Return a cleanup function that will be called every time ...
            // ... useEffect is re-called. useEffect will only be re-called ...
            // ... if value changes (see the inputs array below).
            // This is how we prevent debouncedValue from changing if value is ...
            // ... changed within the delay period. Timeout gets cleared and restarted.
            // To put it in context, if the user is typing within our app's ...
            // ... search box, we don't want the debouncedValue to update until ...
            // ... they've stopped typing for more than 500ms.
            return () => {
                clearTimeout(handler)
            }
        },
        // Only re-call effect if value changes
        // You could also add the "delay" var to inputs array if you ...
        // ... need to be able to change that dynamically.
        [value]
    )

    return debouncedValue
}

function Select({ className = "", value, setValue, options = [] }) {
    return (
        <Listbox
            as="div"
            className="space-y-1"
            value={value}
            onChange={setValue}
        >
            {({ open }) => (
                <>
                    <div className={`relative ${className}`}>
                        <span className="inline-block w-full rounded-md">
                            <Listbox.Button className="cursor-default relative w-full rounded-md bg-white pl-3 pr-10 py-2 text-left focus:outline-none transition ease-in-out duration-150 ">
                                <span className="block truncate">{value}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </Listbox.Button>
                        </span>

                        <Transition
                            show={open}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                        >
                            <Listbox.Options
                                static
                                className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                            >
                                {options.map((option) => (
                                    <Listbox.Option key={option} value={option}>
                                        {({ selected, active }) => (
                                            <div
                                                className={`${
                                                    active
                                                        ? "text-white bg-blue-600"
                                                        : "text-gray-900"
                                                } cursor-default select-none relative py-2 pl-8 pr-4`}
                                            >
                                                <span
                                                    className={`${
                                                        selected
                                                            ? "font-semibold"
                                                            : "font-normal"
                                                    } block truncate`}
                                                >
                                                    {option}
                                                </span>
                                                {selected && (
                                                    <span
                                                        className={`${
                                                            active
                                                                ? "text-white"
                                                                : "text-blue-600"
                                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                    >
                                                        <svg
                                                            className="h-5 w-5"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
