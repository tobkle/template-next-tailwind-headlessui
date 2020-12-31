import { Listbox, Transition } from "@headlessui/react"

export default function Select({
    className = "",
    value,
    setValue,
    options = [],
}) {
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
