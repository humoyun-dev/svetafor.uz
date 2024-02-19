import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "@/util/cookie";
import { setToken, setUserData } from "@/redux/reducers/user.reducer";
import { setCart } from "@/redux/reducers/cart.reducer";
import { setWishList } from "@/redux/reducers/wish-list.reducer"; // Adjust the import path accordingly

export const useSavedTokenEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedToken = getCookie("token");
    if (savedToken) {
      dispatch(setToken(savedToken));
    }
  }, []);
};

export const useSavedUserDataEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUserData = localStorage.getItem("user-data");

    if (savedUserData) {
      try {
        const parsedUserData = JSON.parse(savedUserData);
        dispatch(setUserData(parsedUserData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
};

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
export const useSavedWishItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedWishItems = localStorage.getItem("wishlist");

    if (savedWishItems) {
      try {
        const parsedUserData = JSON.parse(savedWishItems);
        dispatch(setWishList(parsedUserData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
};
