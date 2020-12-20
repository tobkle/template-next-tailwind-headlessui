import { useContext } from "react"
import { Context } from "contexts/global"
import Modal from "components/modal"

export default function DebugData({ page = "", data, name = "name" }) {
    const { debug, setDebug } = useContext(Context)
    return (
        <>
            {!debug && process.env.NODE_ENV !== "production" && (
                <span
                    onClick={() => setDebug(true)}
                    className="fixed top-60 right-0 bg-green-900 text-sm text-white p-1 rounded-b-lg origin-top-right px-4 py-1 cursor-pointer transform rotate-90"
                >
                    Debug
                </span>
            )}

            {debug && process.env.NODE_ENV !== "production" && (
                <Modal show={debug} setShow={setDebug} title={`${page} Data`}>
                    <div className="bg-green-50 border-t-2 border-b-2 border-green-700 text-green-900">
                        <pre className="text-sm text-green-900 pb-4">
                            <strong>{name}:</strong>{" "}
                            {JSON.stringify(data, null, 2)}
                        </pre>

                        <div className="py-2">
                            Showing this information only in environment
                            NODE_ENV=
                            {process.env.NODE_ENV}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
