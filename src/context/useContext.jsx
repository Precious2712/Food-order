
import axios from "axios";
import { createContext, useContext } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

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
            
        } catch (error) {
            console.log('err', error);

        }

    };



    return (
        <AppContext.Provider value={{ handleOrderItem }}>
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
