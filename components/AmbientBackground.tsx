
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export type InteractionHandler = (x: number, y: number) => void;

interface AmbientBackgroundProps {
    onRef: (handler: InteractionHandler) => void;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ onRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const blob1Ref = useRef<HTMLDivElement>(null);
    const blob2Ref = useRef<HTMLDivElement>(null);
    const blob3Ref = useRef<HTMLDivElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Continuous subtle ambient movement
        const timeline = gsap.timeline({ repeat: -1, yoyo: true });

        if (blob1Ref.current && blob2Ref.current && blob3Ref.current) {
            // Blob 1 (Top Left): Deep Blue -> Deep Violet
            gsap.to(blob1Ref.current, {
                x: "30%",
                y: "-20%",
                duration: 12,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
            gsap.to(blob1Ref.current, {
                backgroundColor: "#2e1065", // violet-950 (Deep Purple)
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Blob 2 (Bottom Right): Deep Green -> Deep Slate
            gsap.to(blob2Ref.current, {
                x: "-25%",
                y: "25%",
                duration: 14,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 1
            });
            gsap.to(blob2Ref.current, {
                backgroundColor: "#0f172a", // slate-900
                duration: 7,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Blob 3 (Center): Deep Indigo -> Deep Blue
            gsap.to(blob3Ref.current, {
                scale: 1.4,
                opacity: 0.2,
                duration: 8,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
            gsap.to(blob3Ref.current, {
                backgroundColor: "#172554", // blue-950
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Expose interaction handler
        onRef((x, y) => {
            if (!rippleRef.current || !containerRef.current) return;

            // Get relative coordinates within the container if needed
            const rect = containerRef.current.getBoundingClientRect();
            const relativeX = x - rect.left;
            const relativeY = y - rect.top;

            // Animate ripple
            gsap.fromTo(rippleRef.current,
                {
                    alpha: 0.15,
                    scale: 0.5,
                    x: relativeX,
                    y: relativeY,
                    immediateRender: true
                },
                {
                    alpha: 0,
                    scale: 1.5,
                    duration: 1.0,
                    ease: "power2.out"
                }
            );
        });

    }, [onRef]);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-[#0A0A0A] -z-10 pointer-events-none rounded-lg">

            {/* Base Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1014] to-[#050505] opacity-80" />

            {/* Ambient Blobs */}
            <div
                ref={blob1Ref}
                className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[180px] opacity-40"
                style={{ backgroundColor: "#172554" }} // blue-950 (Deep Blue)
            />
            <div
                ref={blob2Ref}
                className="absolute bottom-[-30%] right-[-10%] w-[900px] h-[900px] rounded-full blur-[180px] opacity-40"
                style={{ backgroundColor: "#022c22" }} // emerald-950 (Deep Green)
            />
            <div
                ref={blob3Ref}
                className="absolute top-[30%] left-[20%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
                style={{ backgroundColor: "#312e81" }} // indigo-900
            />

            {/* Interaction Ripple Layer */}
            <div
                ref={rippleRef}
                className="absolute w-[100px] h-[100px] bg-white/5 rounded-full blur-[40px] opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            />

            {/* Noise Texture for "Premium Hardware" feel */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

        </div>
    );
};

export default AmbientBackground;
