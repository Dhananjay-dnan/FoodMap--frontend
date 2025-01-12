import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axiosInstance from "../api/axiosInstance";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null);     // For error handling

    const [cartItems, setCartItems] = useState({});

    const isCartItemsEmpty = () => {
        return cartItems === null || Object.keys(cartItems).length === 0;
      };
    

    const addToCart = (itemId) => { 
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]:1}))
        }
        else
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
    }

    // const removeFromCart = (itemId) => {
    //         setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
    // }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newItems = { ...prev };
            if (newItems[itemId] > 1) {
                newItems[itemId] -= 1;
            } else {
                delete newItems[itemId]; // Remove the item if its count is zero
            }
            return newItems;
        });
    };

    

    useEffect (() => {
        console.log(cartItems)
        console.log("Is Cart Empty:", Object.keys(cartItems).length === 0);
    }, [cartItems] )



    useEffect(() => {
        const fetchFoodList = async () => {
          try {
            const response = await axiosInstance.get('/public/foodlist');
            setFoodList(response.data);
          } catch (err) {
            console.error('Error fetching food list:', err);
            setError('Failed to load food items.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchFoodList();
      }, []);

      const getTotalCartAmount =() => {
        let totalAmount=0;
        for (const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = foodList.find((product) => product.id == item);
                if (itemInfo)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }
    const contextValue = {
        foodList, loading, error, cartItems, setCartItems, addToCart, removeFromCart, isCartItemsEmpty, getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider