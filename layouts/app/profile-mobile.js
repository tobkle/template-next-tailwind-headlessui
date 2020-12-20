export default function ProfileMobile() {
    return (
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" className="flex-shrink-0 group block">
                <div className="flex items-center">
                    <div>
                        <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="/img/tobkle.jpg"
                            alt="Profile Image"
                        />
                    </div>

                    <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            Tobias Klemmer
                        </p>

                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                            View profile
                        </p>
                    </div>
                </div>
            </a>
        </div>
    )
}
