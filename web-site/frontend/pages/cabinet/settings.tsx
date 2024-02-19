import React from "react";
import LayoutCabinet from "@/layout/layout-cabinet";
import Link from "next/link";
import UpdateProfile from "@/components/settings/update-profile";
import UpdateImage from "@/components/settings/update-image";
import UpdatePassword from "@/components/settings/update-password";
import { UserInterfaces } from "@/interfaces/user/user.interfaces";
import { useSelector } from "react-redux";
const Settings = () => {
  const user: UserInterfaces = useSelector((state: any) => state.user.userData);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return (
    <LayoutCabinet
      title={"Svetaforuz"}
      keyword={"svetaforuz, svetafor.uz, svetafor"}
      img={"https://svetafor.uz/_next/image?url=%2Flogo.png&w=1080&q=75"}
      des={
        "Svetofor Uz\n" +
        "Automotive Parts Store\n" +
        "- Энг арзон авто аксессуарлар !\n" +
        "- Доставка шахар бу́йлаб\n" +
        "- L.E.D лампы в широком ассортименте.\n" +
        "- Адресс: авторынок сергели 7/1 блок 8 магазин"
      }
    >
      <div className={`mb-5 w-full`}>
        <ol
          className="flex items-center whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <li className="inline-flex items-center">
            <Link
              className="flex items-center text-sm text-gray-500 hover:text-yellow-600 "
              href="/"
            >
              Home
            </Link>
            <svg
              className="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="inline-flex items-center">
            <Link
              className="flex items-center text-sm text-gray-500 hover:text-yellow-600 "
              href="/cabinet"
            >
              Kabinet
            </Link>
            <svg
              className="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li
            className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            Settings
          </li>
        </ol>
        <UpdateImage />
        <div className={`mt-16`}>
          <UpdateProfile />
        </div>
        <UpdatePassword />
      </div>
    </LayoutCabinet>
  );
};

export default Settings;
