import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../../Contexts/ThemeContext";

const DottedBackground = () => {
        const { theme } = useContext(ThemeContext);
        const canvasRef = useRef(null);

        useEffect(() => {
                if (theme !== 'dark') {
                        return;
                }

                const canvas = canvasRef.current;
                if (!canvas) return;

                const ctx = canvas.getContext('2d', { alpha: true });
                if (!ctx) return;

                let animationFrameId;
                let isVisible = !document.hidden;

                // Adjust dot count based on screen size for optimal mobile performance
                const isMobile = window.innerWidth <= 768;
                const dotCount = isMobile ? 70 : 140;

                let width = window.innerWidth;
                let height = window.innerHeight;

                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr);

                // Initialize dots with constant seed properties to avoid jumps
                const dots = Array.from({ length: dotCount }).map(() => ({
                        baseX: Math.random() * width,
                        baseY: Math.random() * height,
                        radius: Math.random() * 1.8 + 0.8,
                        offsetX: (Math.random() - 0.5) * 8,
                        offsetY: (Math.random() - 0.5) * 8,
                        duration: (2 + Math.random() * 6) * 1000,
                        opacity: 0.15 + Math.random() * 0.25,
                        phase: Math.random() * Math.PI * 2,
                }));

                let startTime = performance.now();

                const render = (currentTime) => {
                        if (!isVisible) {
                                animationFrameId = requestAnimationFrame(render);
                                return;
                        }

                        const elapsed = currentTime - startTime;
                        ctx.clearRect(0, 0, width, height);

                        ctx.shadowBlur = 1.5;
                        ctx.shadowColor = '#888888';

                        for (let i = 0; i < dotCount; i++) {
                                const dot = dots[i];
                                const progress = (elapsed / dot.duration) + dot.phase;
                                const currentX = dot.baseX + Math.sin(progress) * dot.offsetX;
                                const currentY = dot.baseY + Math.cos(progress) * dot.offsetY;

                                ctx.beginPath();
                                ctx.arc(currentX, currentY, dot.radius, 0, Math.PI * 2);
                                ctx.fillStyle = `rgba(136, 136, 136, ${dot.opacity})`;
                                ctx.fill();
                        }

                        animationFrameId = requestAnimationFrame(render);
                };

                animationFrameId = requestAnimationFrame(render);

                const handleVisibilityChange = () => {
                        isVisible = !document.hidden;
                };

                let resizeTimer;
                const handleResize = () => {
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(() => {
                                if (!canvas) return;
                                width = window.innerWidth;
                                height = window.innerHeight;
                                canvas.width = width * dpr;
                                canvas.height = height * dpr;
                                ctx.scale(dpr, dpr);
                        }, 150);
                };

                document.addEventListener('visibilitychange', handleVisibilityChange);
                window.addEventListener('resize', handleResize, { passive: true });

                return () => {
                        cancelAnimationFrame(animationFrameId);
                        clearTimeout(resizeTimer);
                        document.removeEventListener('visibilitychange', handleVisibilityChange);
                        window.removeEventListener('resize', handleResize);
                };
        }, [theme]);

        if (theme !== 'dark') {
                return null;
        }

        return (
                <canvas
                        ref={canvasRef}
                        className="dotted-background"
                        aria-hidden="true"
                        style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100vh',
                                pointerEvents: 'none',
                                zIndex: 0,
                        }}
                />
        );
};

export default React.memo(DottedBackground);