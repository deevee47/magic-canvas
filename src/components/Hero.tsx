import { ArrowRightIcon, Sparkles } from 'lucide-react';
import React from 'react';
import AnimatedShinyText from './ui/animated-shiny-text';
import CustomShinyButton from './ui/CustomShinyButton';
import Link from 'next/link';

const Hero = () => {
    return (
        <div>
            <div className="relative z-20 max-w-5xl mx-auto px-4 py-16 flex h-screen flex-col justify-center items-center text-center">
                <div className="relative">
                    <Sparkles
                        className="absolute -top-8 -right-80 text-purple-300 animate-pulse hidden lg:block"
                        size={24}
                    />
                </div>
                <div className="relative rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-[length:200%_200%] animate-gradient-move">
                    <AnimatedShinyText className="mx-auto max-w-md text-white animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite] bg-gradient-to-r from-transparent via-50% to-transparent via-white/80 inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 text-sm sm:text-base md:text-lg lg:text-xl">
                        <span>✨ Introducing Better Apple Intelligence</span>
                        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedShinyText>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mt-3 font-bold mb-6 capitalize">
                    Drawing problems, <br className="hidden sm:block" /> deriving solutions!
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-400 mb-8">
                    Your ultimate problem-solver.
                </p>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-12 text-gray-300">
                    <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-purple-400" />
                        <span>Draw</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-purple-400" />
                        <span>Solve</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-purple-400" />
                        <span>Repeat</span>
                    </div>
                </div>
                <Link href='/'>
                    <CustomShinyButton />
                </Link>
            </div>
        </div>
    );
};

export default Hero;
