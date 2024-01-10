import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge.tsx";
// import { ProductService } from "@/service/products.service.ts";
// import { ProductInterfaces } from "@/interfaces/product.interface.ts";
import { Button } from "@/components/ui/button.tsx";
// import Loading from "@/components/loading/loading.tsx";
import StoreCard from "@/components/card/card.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { useNavigate } from "react-router-dom";
import product from "@/db/product.json";

const Home = () => {
  const router = useNavigate();

  const cart = useSelector((state: RootState) => state.cart.cartItems);

  // const [data, setData] = useState<ProductInterfaces[]>([]);
  const [search, setSearch] = useState<string>("");
  // const [loading, setLoding] = useState<boolean>(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoding(true);
  //     try {
  //       const res = await ProductService.getAllProducts();
  //       setData(res);
  //       setLoding(false);
  //     } catch (e) {
  //       setLoding(false);
  //       console.log(e);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className={`mx-auto py-2`}>
      <div
        className={`sticky top-0 px-2 pb-1 border-b bg-white space-x-2 flex items-center justify-between`}
      >
        <Button className={`px-2`}>
          <svg
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={`w-6 h-6`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
        <Input
          type={"search"}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Mahsulotlarni qidiring`}
        />
        <Badge
          className={`w-10 h-10 flex items-center rounded-md justify-center text-xl`}
        >
          {cart.length}
        </Badge>
      </div>
      <div
        className={`grid grid-cols-2 md:grid-cols-6 md:px-4 px-1 my-3 md:gap-x-4 gap-x-1`}
      >
        {product
          .filter((i) => {
            return search.toLowerCase() === ""
              ? i
              : i.name.toLowerCase().includes(search);
          })
          .map((i) => (
            <StoreCard key={i.id} data={i} />
          ))}
      </div>
      {cart.length ? (
        <div className={`fixed w-full px-2 bottom-0 pb-1`}>
          <Button
            onClick={() => router(`/order/check`)}
            className={`w-full text-md`}
          >
            Buyurtmani rasmiyalshtirish
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
