"use client";
import React, {  useState } from 'react';
import ShinyButton from './ui/shiny-button';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

interface ChangelogEntry {
    version: string;
    date: string;
    changes: string[];
}

const changelog: ChangelogEntry[] = [
    {
        version: "v2.0",
        date: "December 2024",
        changes: [
            "Added full mobile support",
            "Improved touch response",
            "Better mobile UI adaptations",
            "Fixed mobile scrolling issues"
        ]
    },
    {
        version: "v1.1",
        date: "November 2024",
        changes: [
            "Added eraser functionality",
            "Improved drawing performance",
            "Added color picker",
        ]
    },
    {
        version: "v1.0",
        date: "October 2024",
        changes: [
            "Initial release",
        ]
    }
];

const Navbar = () => {
    const [isChangelogOpen, setIsChangelogOpen] = useState(true);  // Set to true by default

    return (
        <>
            <div className="top-6 fixed p-4 flex justify-between bg-black/20 rounded-xl backdrop-blur-lg w-[90%] sm:w-[80%] mx-auto z-50 items-center shadow-lg left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2">
                    <div className="text-lg sm:text-2xl font-bold text-white">MagicCanvas</div>
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsChangelogOpen(true)}
                            className="px-2 py-0.5 text-md font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 text-purple-200 hover:bg-purple-500/30 transition-all duration-200"
                        >
                            v2.0
                        </button>
                    </div>
                </div>

                <div className="flex space-x-2 sm:space-x-4">
                    <Link href="https://github.com/deevee47" target="_blank">
                        <ShinyButton className="p-2 sm:p-3">
                            <GithubIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </ShinyButton>
                    </Link>
                    <Link href="https://twitter.com/deevee47" target="_blank">
                        <ShinyButton className="text-sm sm:text-base p-2 sm:p-3">
                            Hire Me 😉
                        </ShinyButton>
                    </Link>
                </div>
            </div>

            {/* Custom Modal Instead of Dialog */}
            {isChangelogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsChangelogOpen(false)}
                    />
                    <div className="relative bg-black/40 backdrop-blur-xl rounded-xl w-full max-w-md shadow-lg border border-blue-500/20">
                        <div className="p-6">
                            <button
                                onClick={() => setIsChangelogOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-100  transition-colors"
                            >
                                ✕
                            </button>

                            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Whats New in MagicCanvas</h2>

                            <div className="space-y-6">
                                {changelog.map((entry, index) => (
                                    <div
                                        key={entry.version}
                                        className={`space-y-2 ${index !== 0 && 'pt-4 border-t border-blue-500/20'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-lg text-white">
                                                {entry.version}
                                            </h3>
                                            <span className="text-md text-blue-200">
                                                {entry.date}
                                            </span>
                                        </div>
                                        <ul className="space-y-2">
                                            {entry.changes.map((change, i) => (
                                                <li key={i} className="text-lg flex items-start text-gray-200">
                                                    <span className="text-blue-400 mr-2">•</span>
                                                    {change}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;