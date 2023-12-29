import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const router = useRouter();
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
    </ul>
  );
};

export default Sidebar;
