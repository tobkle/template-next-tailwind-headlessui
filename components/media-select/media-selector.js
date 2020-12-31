import React, { useState, useRef, useEffect } from "react"
import useDebounce from "./use-debounce"
import MediaSearchSelections from "./media-search-selections"
import MediaViewer from "./media-viewer"
import UserInteraction from "./user-interaction"
import searchUnsplash from "./search-unsplash"
import { orientationOptions, sizeOptions, colorOptions } from "./options"

/** MediaSelector --- Modal Window */
export function MediaSelector({
    show,
    onDismiss,
    onSubmit,
    // open,
    // setOpen,
    // transferImageUrl,
}) {
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
        if (isEscape) onDismiss()
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
            searchUnsplash({
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
                <MediaSearchSelections
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

                <MediaViewer
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
                    setOpen={onDismiss}
                    transferImageUrl={onSubmit}
                    page={page}
                    setPage={updatePage}
                    perPage={perPage}
                    setPerPage={setPerPage}
                />
            </div>
        </div>
    )
}
