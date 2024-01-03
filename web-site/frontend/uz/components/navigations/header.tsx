import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const router = useRouter();
  return (
    <div className={`bg-yellow-300 py-1 w-full`}>
      <div className={`w-10/12 mx-auto flex justify-between items-center`}>
        <div className={`flex justify-between items-center gap-3`}>
          <Link
            href={"/faq"}
            className={`cursor-pointer hover:underline underline-offset-4`}
          >
            Savol-javoblar
          </Link>
          <Link
            className={`cursor-pointer hover:underline hidden md:block underline-offset-4`}
            href={"/cabinet/orders"}
          >
            Buyurtmalarim
          </Link>
        </div>
        <div>
          <Link
            href={"/faq"}
            className={`hover:underline hidden md:block underline-offset-4 cursor-pointer`}
          >{`O'zbekiston boyicha topshirish punktlari`}</Link>
        </div>
        <div>
          <Link
            href={"/faq"}
            className={`hover:underline hidden md:block underline-offset-4 cursor-pointer`}
          >{`Buyurtmangiz 3 kunda yetkazib beramiz`}</Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex`}>
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
                  d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                />
              </svg>
              Language
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`z-[99999]`}>
              <DropdownMenuLabel className={`flex items-center `}>
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
                    d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                  />
                </svg>
                Language
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{`O'zbekcha`}</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("https://www.ru.svetafor.uz/")}
              >{`Русский`}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
