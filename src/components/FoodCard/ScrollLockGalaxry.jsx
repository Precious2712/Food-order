import React, { useEffect, useRef, useState } from "react";

const galleryImages = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1600&auto=format&fit=crop",
        title: "Gourmet Excellence",
        description: "Experience culinary perfection",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1600&q=90",
        title: "Fresh Seafood",
        description: "Ocean to table freshness",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1600&auto=format&fit=crop",
        title: "Premium Cuts",
        description: "The finest meats available",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1600&auto=format&fit=crop",
        title: "Seafood Delicacy",
        description: "Luxurious dining experience",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1600&auto=format&fit=crop",
        title: "Garden Fresh",
        description: "Crisp and vibrant flavors",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1577303935007-0d306ee638cf?auto=format&fit=crop&w=1600&q=90",
        title: "Wood-Fired Pizza",
        description: "Authentic Italian tradition",
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1600&auto=format&fit=crop",
        title: "Sushi Artistry",
        description: "Japanese culinary mastery",
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1600&auto=format&fit=crop",
        title: "Classic Comfort",
        description: "Warm and satisfying",
    },
    {
        id: 9,
        image: "https://images.unsplash.com/photo-1460306855393-0410f61241c7?auto=format&fit=crop&w=1600&q=90",
        title: "British Classic",
        description: "Elegant and timeless",
    },
    {
        id: 10,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1600&auto=format&fit=crop",
        title: "Sweet Finale",
        description: "The perfect ending",
    },
];

export function ScrollLockGallery() {
    const containerRef = useRef(null);
    const accumulatedScroll = useRef(0);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    const SCROLL_THRESHOLD = 150;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            const rect = container.getBoundingClientRect();
            const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;

            if (isInView) {
                accumulatedScroll.current += e.deltaY;

                const targetIndex = Math.floor(
                    Math.abs(accumulatedScroll.current) / SCROLL_THRESHOLD
                );

                const clampedIndex = Math.max(
                    0,
                    Math.min(targetIndex, galleryImages.length - 1)
                );

                if (clampedIndex < galleryImages.length - 1) {
                    e.preventDefault();
                    setCurrentIndex(clampedIndex);

                    const progress =
                        (Math.abs(accumulatedScroll.current) % SCROLL_THRESHOLD) /
                        SCROLL_THRESHOLD;

                    setScrollProgress(progress);
                } else {
                    setCurrentIndex(galleryImages.length - 1);
                    setScrollProgress(1);
                }
            } else if (rect.top > 0) {
                accumulatedScroll.current = 0;
                setCurrentIndex(0);
                setScrollProgress(0);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => window.removeEventListener("wheel", handleWheel);
    }, [currentIndex]);

    return (
        <section ref={containerRef} className="relative h-[300vh] w-full">
            <div className="sticky top-0 h-screen w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
                {currentIndex < galleryImages.length - 1 && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
                        <span className="text-white text-sm font-medium">
                            Scroll to explore
                        </span>
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                )}

                <div className="relative w-full h-full">
                    {galleryImages.map((item, index) => (
                        <div
                            key={item.id}
                            className="absolute inset-0 transition-all duration-500 ease-out"
                            style={{
                                opacity:
                                    index === currentIndex
                                        ? 1
                                        : index === currentIndex - 1
                                            ? 0.3
                                            : 0,
                                transform: `translateY(${index < currentIndex
                                        ? "-20%"
                                        : index === currentIndex
                                            ? "0%"
                                            : "20%"
                                    }) scale(${index === currentIndex ? 1 : 0.9})`,
                                zIndex: index === currentIndex ? 10 : 1,
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                loading={index === 0 ? "eager" : "lazy"}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-20 left-8 md:left-16 text-white max-w-2xl z-10">
                                <h3 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-xl md:text-2xl text-zinc-200">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
