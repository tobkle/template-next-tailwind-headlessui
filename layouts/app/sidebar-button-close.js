import Icon from "components/icon"

export default function SidebarButtonClose({ setShowMenu }) {
    return (
        <button
            onClick={() => setShowMenu(false)}
            type="button"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
            <span className="sr-only">Close sidebar</span>

            <Icon
                iconname="X"
                iconstyle="outline"
                className="h-6 w-6 text-white"
            />
        </button>
    )
}
