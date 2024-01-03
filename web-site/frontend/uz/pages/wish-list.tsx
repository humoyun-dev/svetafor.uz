import React from "react";
import { NextPage } from "next";
import Layout from "@/layout/layout";
import StoreCard from "@/components/card/store-card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const WishListPage: NextPage = () => {
  const wishlist = useSelector((state: RootState) => state.wishList.wishItems);

  return (
    <Layout>
      <div>
        <div></div>
        <div className="grid grid-cols-4 gap-x-12 gap-y-10 w-10/12 mx-auto my-10">
          {wishlist.map((product) => (
            <StoreCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WishListPage;
