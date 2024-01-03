import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

export const addToCartUtil = (
  item: ProductInterfaces,
  cart: ProductInterfaces[],
) => {
  const updatedCart = cart.map((cartItem) =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem,
  );

  if (!updatedCart.find((cartItem) => cartItem.id === item.id)) {
    updatedCart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
};

export const removeProduct = (id: number, cart: ProductInterfaces[]) => {
  const updatedCart = cart.filter((cartItem) => cartItem.id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
};

export const incrementQuantity = (id: number, cart: ProductInterfaces[]) => {
  const updatedCart = cart.map((cartItem) =>
    cartItem.id === id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem,
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
};

export const decrementQuantity = (id: number, cart: ProductInterfaces[]) => {
  const updatedCart = cart.map((cartItem) =>
    cartItem.id === id
      ? {
          ...cartItem,
          quantity: Math.max(0, cartItem.quantity - 1),
        }
      : cartItem,
  );

  // If the quantity becomes 0, remove the product from the cart
  if (updatedCart.find((cartItem) => cartItem.id === id)?.quantity === 0) {
    return removeProduct(id, updatedCart);
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
};

export const calculateSubTotalPrice = (cart: ProductInterfaces[]) => {
  return cart.reduce((total, item) => total + item.quantity * item.price, 0);
};

export const calculateTotalPrice = (
  subTotal: number,
  couponPercentage: number,
) => {
  const discount = (couponPercentage / 100) * subTotal;
  return subTotal - discount;
};

export const existProduct = (id: number, cart: ProductInterfaces[]) => {
  const existingItem = cart.find((item: ProductInterfaces) => item.id === id);
  return existingItem;
};
