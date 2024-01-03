import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

export const addToWishlist = (
  item: ProductInterfaces,
  wishlist: ProductInterfaces[],
) => {
  const existingItem = wishlist.find(
    (i: ProductInterfaces) => i.id === item.id,
  );
  const updatedWishlist = existingItem ? wishlist : [...wishlist, { ...item }];

  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

  return updatedWishlist;
};

export const isInWishlist = (id: number, wishlist: ProductInterfaces[]) => {
  return !!wishlist.find((item: ProductInterfaces) => item.id === id);
};

export const removeFromWishlist = (
  id: number,
  wishlist: ProductInterfaces[],
) => {
  const updatedWishlist = wishlist.filter((item) => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  return updatedWishlist;
};
