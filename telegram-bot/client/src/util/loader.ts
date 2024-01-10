import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCart } from "@/redux/cart.reducer.ts";

export const useSavedCartItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cart");

    if (savedCartItems) {
      try {
        const parsedUserData = JSON.parse(savedCartItems);
        dispatch(setCart(parsedUserData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
};
