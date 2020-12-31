import cn from "classnames"
import Icon from "components/icon"
/**
 * @name UserInteraction
 *
 */
export default function UserInteraction({
    navigation,
    isSearching,
    selectedImage,
    selectedUrl,
    setOpen,
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
                        setOpen(false)
                    }}
                    className="mt-3 mr-3 rounded-md shadow sm:mt-0  overflow-hidden flex items-center justify-center px-6 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out "
                >
                    Select
                </button>

                <button
                    onClick={(e) => {
                        setOpen(false)
                    }}
                    className="mt-3 mr-3 rounded-md shadow sm:mt-0 overflow-hidden flex items-center justify-center px-6 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out "
                >
                    Cancel
                </button>

                <label htmlFor="page">
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

                <label htmlFor="perPage">
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
