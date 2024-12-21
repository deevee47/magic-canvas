"use client";
import React from 'react';
import ShinyButton from './ui/shiny-button';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="top-6 fixed p-4 flex justify-between bg-black/20 rounded-xl backdrop-blur-lg w-[90%] sm:w-[80%] mx-auto z-50 items-center shadow-lg left-1/2 transform -translate-x-1/2">
            <div className="text-lg sm:text-2xl font-bold text-white">MagicCanvas</div>

            <div className="flex space-x-2 sm:space-x-4">
                <Link href="https://github.com/deevee47" target="_blank">
                    <ShinyButton>
                        <GithubIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </ShinyButton>
                </Link>
                <Link href="https://twitter.com/deevee47" target="_blank">
                    <ShinyButton className="text-sm sm:text-base">Hire Me 😉</ShinyButton>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
