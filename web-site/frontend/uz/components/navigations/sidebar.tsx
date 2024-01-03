import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeCookie } from "@/util/cookie";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "@/redux/reducers/user.reducer";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const logout = async () => {
    removeCookie("token");
    dispatch(setToken(""));
    dispatch(setUserData([]));
    localStorage.setItem("user-data", JSON.stringify([]));
    await router.push("/");
  };

  return (
    <ul className={`flex sticky top-24 flex-col gap-y-3 mr-3`}>
      <li
        onClick={() => router.push("/cabinet")}
        className={`w-full cursor-pointer hover:bg-yellow-200 border-yellow-300 py-2 px-5 rounded-lg ${
          router.asPath == "/cabinet" ? "border bg-yellow-200" : ""
        }`}
      >
        <Link
          className={`w-full`}
          href={`/cabinet`}
        >{`Shaxsiy ma'lumotlarim`}</Link>
      </li>
      <li
        onClick={() => router.push("/cabinet/settings")}
        className={`w-full cursor-pointer hover:bg-yellow-200 border-yellow-300 py-2 px-5 rounded-lg ${
          router.asPath == "/cabinet/settings" ? "border bg-yellow-200" : ""
        }`}
      >
        <Link
          className={`w-full`}
          href={`/cabinet/settings`}
        >{`Sozlamalar`}</Link>
      </li>
      <li
        onClick={() => router.push("/cabinet/orders")}
        className={`w-full cursor-pointer hover:bg-yellow-200 border-yellow-300 py-2 px-5 rounded-lg ${
          router.asPath == "/cabinet/orders" ? "border bg-yellow-200" : ""
        }`}
      >
        <Link
          className={`w-full`}
          href={`/cabinet/orders`}
        >{`Buyurtmalarim`}</Link>
      </li>
      <li
        onClick={() => logout()}
        className={`w-full cursor-pointer hover:bg-red-500 hover:text-white border-yellow-300 py-2 px-5 rounded-lg `}
      >
        <p className={`w-full`}>{`Chiqish`}</p>
      </li>
    </ul>
  );
};

export default Sidebar;
