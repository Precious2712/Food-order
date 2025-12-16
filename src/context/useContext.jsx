
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState();
    const [open, setOpen] = useState(false);
    const [sum, setSum] = useState(0);

    const handleOrderItem = async (name, price, image) => {
        const token = localStorage.getItem("token");
        const payload = {
            items: [
                {
                    itemName: name,
                    image: image,
                    itemPrice: price,
                }
            ]
        };

        console.log("Order payload:", payload);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/create-order",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('res', res.data);
            if (res.data) {
                alert(res.data.message);
            }
            
        } catch (error) {
            console.log('err', error);

        }
    };

    const cart = async () => {
        const id = localStorage.getItem('userId');
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/user-order/${id}`);
            console.log(res.data.data[0].items);
            setCartItem(res.data.data[0].items);
            setSum(res.data.data[0].grandTotal)
        } catch (error) {
            console.log(error, 'err-msg');
        }
    }

    const modal = () => {
        setOpen(true);
    };

    useEffect(()=>{
        cart();
    },[]);



    return (
        <AppContext.Provider value={{ handleOrderItem, cartItem, modal, open, setOpen, sum }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook
export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error("useAppContext must be used inside AppProvider");
    }

    return context;
};
