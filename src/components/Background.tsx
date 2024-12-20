"use client";
import React, { useEffect, useState } from 'react';

interface Dot {
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
}

const Background: React.FC = () => {
    const [dots, setDots] = useState<Dot[]>([]);

    useEffect(() => {
        const generateDots = () => {
            const newDots: Dot[] = [];
            for (let i = 0; i < 50; i++) {
                newDots.push({
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.1,
                    duration: Math.random() * 20 + 10,
                });
            }
            setDots(newDots);
        };

        generateDots();
    }, []);

    return (
        <div className="absolute inset-0">
            {/* Animated dots background */}
            {dots.map((dot, index) => (
                <div
                    key={index}
                    className="absolute rounded-full bg-purple-500"
                    style={{
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        opacity: dot.opacity,
                        animation: `float ${dot.duration}s infinite linear`,
                    }}
                />
            ))}

            {/* Radial gradient mask for grids */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-950 z-10" />

            {/* Primary grid overlay with radial mask */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                        backgroundSize: '1.5rem 1.5rem',
                        mask: 'radial-gradient(circle at center, black 30%, transparent 70%)',
                        WebkitMask: 'radial-gradient(circle at center, black 30%, transparent 70%)',
                    }}
                />
            </div>

            {/* Secondary grid overlay with radial mask */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                        backgroundSize: '6rem 6rem',
                        mask: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                        WebkitMask: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                    }}
                />
            </div>
        </div>
    );
};

export default Background;
