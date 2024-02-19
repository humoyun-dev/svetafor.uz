import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { GetCategoryService } from "@/services/store/get-category.service";
import { CategoryInterfaces } from "@/interfaces/category/category.interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/layout/layout";
import { Input } from "@/components/ui/input";

const CategoryPage: NextPage<CategoryPageInterface> = ({ category }) => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  return (
    <Layout
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
      <div
        className={`flex md:w-10/12 w-11/12 md:flex-row flex-col mx-auto space-y-2 md:items-center justify-between py-1 my-4`}
      >
        <h1 className={`text-xl font-semibold`}>Kataloglar</h1>
        <Input
          className={`md:w-96`}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Tezkor qidiruv`}
        />
      </div>
      <div
        className={`grid md:w-10/12 w-11/12 mx-auto md:grid-cols-5 grid-cols-2 gap-2 md:gap-x-4 md:gap-y-10`}
      >
        {category
          .filter((i) => {
            return search.toLowerCase() === ""
              ? i
              : i.name.toLowerCase().includes(search);
          })
          .map((i) => (
            <div
              onClick={() => router.push(`/store/category/${i.slug}`)}
              className={`cursor-pointer bg-gray-100 group rounded-xl border duration-300 hover:shadow`}
              key={i.id}
            >
              <div className={`overflow-hidden rounded-t-xl`}>
                <Image
                  className={`w-full h-[150px] object-cover duration-300 group-hover:scale-110`}
                  src={i.image}
                  alt={i.name}
                  width={999}
                  height={999}
                />
              </div>
              <p
                className={`text-center mt-2 text-lg hover:underline underline-offset-4`}
              >
                {i.name}
              </p>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default CategoryPage;

interface CategoryPageInterface {
  category: CategoryInterfaces[];
}

export const getServerSideProps: GetServerSideProps<
  CategoryPageInterface
> = async () => {
  const category = await GetCategoryService.getAllCategory();
  return {
    props: {
      category,
    },
  };
};
