import React, { useEffect, useRef, useState } from "react";
import { galleryImages } from "@/data/Food/scroll-galary";

export function ScrollGallery() {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollProgress =
                container.scrollLeft /
                (container.scrollWidth - container.clientWidth);

            const newIndex = Math.round(
                scrollProgress * (galleryImages.length - 1)
            );

            setActiveIndex(newIndex);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
                    Our Culinary Journey
                </h2>
                <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
                    Scroll through our collection to discover the artistry behind every dish
                </p>
            </div>

            <div
                ref={containerRef}
                className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-4 md:px-8 pb-8 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {galleryImages.map((image, index) => (
                    <div
                        key={image.id}
                        className="flex-shrink-0 snap-center w-[85vw] md:w-[70vw] lg:w-[60vw] transition-all duration-500"
                        style={{
                            opacity: Math.abs(index - activeIndex) <= 1 ? 1 : 0.4,
                            transform: index === activeIndex ? "scale(1)" : "scale(0.9)",
                        }}
                    >
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                                loading={index < 3 ? "eager" : "lazy"}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white text-xl md:text-2xl font-serif font-semibold">
                                    {image.alt}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
                {galleryImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            const container = containerRef.current;
                            if (!container) return;

                            const scrollPosition =
                                (index / (galleryImages.length - 1)) *
                                (container.scrollWidth - container.clientWidth);

                            container.scrollTo({
                                left: scrollPosition,
                                behavior: "smooth",
                            });
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                ? "w-8 bg-amber-600"
                                : "w-2 bg-zinc-300"
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
