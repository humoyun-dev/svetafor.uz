import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Auth from "@/components/auth/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Cart from "@/components/drawer/cart";
import { Input } from "@/components/ui/input";
import CategoryDrawer from "@/components/drawer/category";

const Navbar: React.FC = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user.token);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const [search, setSearch] = useState<string>("");

  const handlerSearch = async () => {
    await router.push(`/store/search/${search}`);
  };

  return (
    <div className={`border-b w-ful sticky top-0 z-50 bg-white`}>
      <div
        className={`w-10/12 mx-auto flex flex-wrap justify-between items-center`}
      >
        <div
          onClick={() => router.push("/")}
          className={`flex items-center gap-x-1 cursor-pointer`}
        >
          <Image
            className={`w-16`}
            src={`/logo.png`}
            alt={"logo"}
            width={999}
            height={999}
          />
          <p className={`text-2xl text-green-600 font-bold uppercase`}>
            Svetaforuz
          </p>
        </div>
        <div className={`lg:flex hidden justify-between items-center gap-2`}>
          <Sheet>
            <SheetTrigger>
              <div
                className={`bg-green-200 px-3 hover:bg-green-00 duration-200 cursor-pointer py-2 rounded flex gap-1`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
                Katalog
              </div>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <CategoryDrawer />
            </SheetContent>
          </Sheet>
          <div className={`flex relative items-center`}>
            <Input
              placeholder={`Mahsulorlani qidiring`}
              type={"search"}
              onChange={(e) => setSearch(e.target.value)}
              className={`pr-16 w-96`}
            />
            {search.length ? (
              <Button
                onClick={handlerSearch}
                className={`absolute bg-green-300 hover:bg-green-400 right-0`}
              >
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </Button>
            ) : (
              <Button
                disabled={true}
                className={`absolute bg-green-300 hover:bg-green-400 right-0`}
              >
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </Button>
            )}
          </div>
        </div>
        <div className={`lg:flex hidden gap-x-2`}>
          {token.length ? (
            <div
              onClick={() => router.push("/cabinet")}
              className={`flex hover:bg-yellow-200 py-1 px-3 rounded duration-300 cursor-pointer items-center gap-1 `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              Kabinet
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className={`hover:bg-yellow-200 bg-transparent`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  Kirish
                </Button>
              </DialogTrigger>
              <Auth />
            </Dialog>
          )}

          <Link
            href={"/wish-list"}
            className={`flex hover:bg-yellow-200 py-1 px-3 rounded duration-300 cursor-pointer items-center gap-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            Saralangan
          </Link>

          <Sheet>
            <SheetTrigger>
              <div
                className={`flex hover:bg-yellow-200 py-1 px-3 rounded duration-300 cursor-pointer items-center gap-x-1`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Savat
                <span className={`bg-green-200 ml-1 px-1.5 py-1 rounded`}>
                  {cart.length}
                </span>
              </div>
            </SheetTrigger>
            <SheetContent>
              <Cart />
            </SheetContent>
          </Sheet>
        </div>

        <div className={`w-8 h-8 lg:hidden block mr-3`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
