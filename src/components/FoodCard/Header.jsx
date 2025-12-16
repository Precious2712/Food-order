import { useAppContext } from '@/context/useContext';
import { ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const Header = () => {
    const [name, setName] = useState('');
    const [scrollY, setScrollY] = useState(0);

    const { cartItem, modal } = useAppContext();

    useEffect(() => {
        const storedName = localStorage.getItem('Name');
        setName(storedName);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`
                fixed top-0 z-40 w-full flex justify-between items-center px-6 py-4
                transition-colors duration-500 ease-in-out
                ${scrollY > 50
                    ? 'bg-white text-black shadow-md'
                    : 'bg-transparent text-white'}
            `}
        >
            <span className="font-semibold">{name}</span>
            <div onClick={modal} className="relative inline-flex cursor-pointer">
                <ShoppingCart className="w-6 h-6" />

                {cartItem?.length > 0 && (
                    <span
                        className="
                absolute -top-2 -right-2
                flex items-center justify-center
                min-w-[18px] h-[18px]
                rounded-full
                bg-red-500 text-white
                text-[11px] font-semibold
            "
                    >
                        {cartItem.length}
                    </span>
                )}
            </div>

        </header>
    );
};
