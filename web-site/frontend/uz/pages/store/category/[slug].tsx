import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "@/layout/layout";
import { GetCategoryService } from "@/services/store/get-category.service";
import { CategoryInterfaces } from "@/interfaces/category/category.interfaces";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import StoreCard from "@/components/card/store-card";

const CategoryDetailPage: NextPage<CategoryDetailPageInterface> = ({
  category,
}) => {
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
        className={`flex w-10/12 mx-auto items-center justify-between py-1 my-4`}
      >
        <h1 className={`text-xl font-semibold underline underline-offset-4`}>
          {category.name}
        </h1>
        <Input
          className={`w-96`}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Tezkor qidiruv`}
        />
      </div>
      <div className={`grid w-10/12 mx-auto my-6 grid-cols-5 gap-x-4 gap-y-10`}>
        {category.products
          .filter((i) => {
            return search.toLowerCase() === ""
              ? i
              : i.name.toLowerCase().includes(search);
          })
          .map((i) => (
            <StoreCard data={i} key={i.id} />
          ))}
      </div>
    </Layout>
  );
};

export default CategoryDetailPage;

interface CategoryDetailPageInterface {
  category: CategoryInterfaces;
}

export const getServerSideProps: GetServerSideProps<
  CategoryDetailPageInterface
> = async ({ query }) => {
  try {
    const slug = query.slug as string;
    const category = await GetCategoryService.getOneCategory(slug);

    return {
      props: {
        category,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};
