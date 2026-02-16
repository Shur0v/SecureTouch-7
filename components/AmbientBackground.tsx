
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
            // Blob 1: Dark Blue/Charcoal - slow drift
            gsap.to(blob1Ref.current, {
                x: "20%",
                y: "-15%",
                duration: 20,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            // Blob 2: Soft Graphite - counter drift
            gsap.to(blob2Ref.current, {
                x: "-15%",
                y: "20%",
                duration: 25,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 2
            });

            // Blob 3: Deep Midnight - slight rotation/scale
            gsap.to(blob3Ref.current, {
                scale: 1.2,
                opacity: 0.15,
                duration: 15,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        }

        // Expose interaction handler
        onRef((x, y) => {
            if (!rippleRef.current || !containerRef.current) return;

            // Get relative coordinates within the container if needed, 
            // but for full screen overlay, clientX/Y is fine relative to viewport usually.
            // Assuming container is relative/absolute filling parent.
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
                className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"
            />
            <div
                ref={blob2Ref}
                className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-slate-800/10 rounded-full blur-[120px]"
            />
            <div
                ref={blob3Ref}
                className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-indigo-950/10 rounded-full blur-[100px] opacity-20"
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
