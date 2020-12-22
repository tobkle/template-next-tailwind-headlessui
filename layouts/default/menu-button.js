import Icon from "components/icon"

export default function MenuButton({ showMenu, setShowMenu }) {
    return (
        <div className="md:hidden block">
            <button
                onClick={() => setShowMenu(!showMenu)}
                type="button"
                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            >
                {!showMenu && (
                    <Icon
                        iconname={"Menu"}
                        iconstyle={"outline"}
                        className="h-6 w-6"
                    />
                )}

                {showMenu && (
                    <Icon
                        iconname={"X"}
                        iconstyle={"outline"}
                        className="h-6 w-6"
                    />
                )}
            </button>
        </div>
    )
}
