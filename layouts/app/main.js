export default function Main({ children }) {
    return (
        <>
            <main
                className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
                tabIndex={0}
            >
                {/* Start main area*/}
                <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                    <div className="h-full rounded-lg">{children}</div>
                </div>
                {/* End main area */}
            </main>
        </>
    )
}
