import { FoodCard } from "@/components/FoodCard/FoodCard";
import { Header } from "@/components/FoodCard/Header";
import { ModalBox } from "@/components/FoodCard/ModalBox";
import { ScrollLockGallery } from "@/components/FoodCard/ScrollLockGalaxry";
import { useAppContext } from "@/context/useContext";
import { foodItems } from "@/data/Food/Foodies";
import { useEffect, useRef } from "react";
// import { foodItems } from "@/data/Food/Foodies";

export const LandingPage = () => {
    const { open, setOpen, cartItem, sum } = useAppContext();

    const menuRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up")
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            },
        )

        const cards = menuRef.current?.querySelectorAll(".food-card-wrapper")
        cards?.forEach((card) => observer.observe(card))

        return () => observer.disconnect()
    }, [])

    return (
        <div>
            <div style={{ maxHeight: '100vh', overflow: 'hidden' }}>
                <Header />
                <ScrollLockGallery />
            </div>

            <section className="py-12 px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Our Menu</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our carefully curated selection of dishes
                    </p>
                </div>

                {foodItems && foodItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {foodItems.map((item, index) => (
                            <div key={item.id} className="animate-fade-in">
                                <FoodCard {...item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-8">
                        <p className="text-lg text-gray-500">Menu items loading...</p>
                    </div>
                )}
            </section>

            {open && (
                <ModalBox closeButton={() => setOpen(false)}
                    items={cartItem}
                    grandTotal={sum}
                />
            )}

        </div>
    );
};