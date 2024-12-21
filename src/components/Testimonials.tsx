import React from 'react';

const Testimonials = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-10">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-center mb-6">
                लोगो ka काम hai कहना 🫢
            </h1>
            <div className="flex flex-col justify-center items-center italic opacity-50 pb-10 pt-10 text-lg sm:text-xl lg:text-2xl text-center">
                Adding Testimonials Soon! Want me to add yours?
                <span className="text-gray-200 block mt-2">
                    Share reviews on my X
                </span>
                <a
                    href="https://twitter.com/deevee47"
                    className="mt-2 flex items-center text-blue-400 hover:text-blue-700 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        className="mr-1"
                        fill="currentColor"
                    >
                        <path
                            d="M22.46 6.011c-.77.342-1.59.572-2.46.675.885-.529 1.56-1.368 1.876-2.364-.828.492-1.74.841-2.71 1.032-.781-.832-1.89-1.351-3.12-1.351-2.36 0-4.28 1.928-4.28 4.296 0 .336.038.663.112.974-3.566-.178-6.73-1.89-8.843-4.493-.37.635-.58 1.374-.58 2.163 0 1.498.761 2.818 1.91 3.596-.707-.023-1.373-.216-1.96-.539v.053c0 2.089 1.468 3.83 3.415 4.227-.358.097-.736.15-1.115.15-.273 0-.54-.027-.803-.08.542 1.693 2.116 2.92 3.98 2.95-1.46 1.144-3.3 1.83-5.29 1.83-1.627 0-3.213-.213-4.744-.627 2.893 1.849 6.344 2.925 9.996 2.925 11.96 0 18.493-9.923 18.493-18.493 0-.28-.01-.56-.03-.839 1.263-.914 2.358-2.047 3.221-3.338z"
                        />
                    </svg>
                    @deevee47
                </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full">
                {/* Placeholder for testimonials */}
            </div>
        </div>
    );
};

export default Testimonials;
