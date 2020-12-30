export const getImageElementStyles = ({ className, focused, selected }) => {
    return {
        root: [{}, className],
        img: {
            display: "block",
            maxWidth: "100%",
            maxHeight: "40em",
            boxShadow: focused && selected ? "0 0 4px 3px #B4D5FF" : "none",
        },
    }
}
