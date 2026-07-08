import React from "react";

const DottedBackground = ({ width = 800, height = 600, dotCount = 250 }) => {
        const dots = Array.from({ length: dotCount }).map((_, index) => {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const radius = Math.random() * 2 + 0.75; // small radius between 1 and 3
                const offsetX = (Math.random() - 0.5) * 10; // random offset between -5 and +5
                const offsetY = (Math.random() - 0.5) * 10;
                const duration = 2+ Math.random() * 6; // 4s to 10s

                return (
                        <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r={radius}
                                fill="#888888"
                                filter="url(#blurFilter)"
                                opacity={0.2 + Math.random() * 0.3}
                        >
                                <animate
                                        attributeName="cx"
                                        values={`${x}; ${x + offsetX}; ${x}`}
                                        dur={`${duration}s`}
                                        repeatCount="indefinite"
                                />
                                <animate
                                        attributeName="cy"
                                        values={`${y}; ${y + offsetY}; ${y}`}
                                        dur={`${duration}s`}
                                        repeatCount="indefinite"
                                />
                        </circle>
                );
        });

        return (
                <svg
                        className="dotted-background"
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <defs>
                                <filter id="blurFilter">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
                                </filter>
                        </defs>
                        {dots}
                </svg>
        );
};

export default DottedBackground;