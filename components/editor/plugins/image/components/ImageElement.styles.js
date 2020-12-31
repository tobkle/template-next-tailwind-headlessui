export const getImageElementStyles = ({ className, focused, selected }) => {
    return {
        root: [{}, className],
        image: {
            display: "block",
            maxWidth: "100%",
            maxHeight: "40em",
            boxShadow: focused && selected ? "0 0 4px 3px #FF0000" : "none",
        },
    }
}
