import React, { useState, useEffect } from "react";
import LayoutCabinet from "@/layout/layout-cabinet";
import { useSelector } from "react-redux";
import { UserInterfaces } from "@/interfaces/user/user.interfaces";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CabinetPage = () => {
  const user: UserInterfaces = useSelector((state: any) => state.user.userData);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !user.first_name || !user.last_name) {
      console.error("Invalid user object or missing properties.");
      return;
    }

    setAvatar(
      `${user.first_name.charAt(0).toUpperCase()} ${user.last_name
        .charAt(0)
        .toUpperCase()}`,
    );
  }, [user]);

  return (
    <LayoutCabinet>
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
          <li
            className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
            aria-current="page"
          >
            Kabinet
          </li>
        </ol>
      </div>
      <div>
        <div className={`flex items-center gap-x-4`}>
          <Avatar>
            {user.profile_image === null ? (
              <AvatarFallback className={`font-semibold`}>
                {avatar}
              </AvatarFallback>
            ) : (
              <AvatarImage
                src={`${process.env.API_URL}${user.profile_image}`}
              />
            )}
          </Avatar>
          <h1 className={`text-2xl underline-offset-4 underline font-semibold`}>
            {user.first_name} {user.last_name}
          </h1>
        </div>
        <div
          className={`text-lg mt-8 flex items-center justify-between border-b`}
        >
          <p>Telefon raqam:</p>
          <span className={`${user.username ? "" : "text-red-500 font-[500]"}`}>
            {user.username ? `+${user.username}` : "Telefon raqam kiritilmagan"}
          </span>
        </div>
        <div
          className={`text-lg mt-5 flex items-center justify-between border-b`}
        >
          <p>Manzil:</p>
          <span className={`${user.address ? "" : "text-red-500 font-[500]"}`}>
            {user.address ? user.address : "Manzil kiritilmagan"}
          </span>
        </div>
        <div
          className={`text-lg mt-5 flex items-center justify-between border-b`}
        >
          <p>Passport:</p>
          <span className={`${user.passport ? "" : "text-red-500 font-[500]"}`}>
            {user.passport ? user.passport : "Passport kiritilmagan"}
          </span>
        </div>
        <div
          className={`text-lg mt-5 flex items-center justify-between border-b`}
        >
          <p>Email:</p>
          <span className={`${user.email ? "" : "text-red-500 font-[500]"}`}>
            {user.email ? user.email : "Email kiritilmagan"}
          </span>
        </div>
      </div>
    </LayoutCabinet>
  );
};

export default CabinetPage;
