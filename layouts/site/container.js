export default function Container({
    className = "container mx-auto px-4 flex w-full h-full justify-between space-between content-center",
    children,
}) {
    return <div className={className}>{children}</div>
}
