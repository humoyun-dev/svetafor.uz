import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { CategoryInterfaces } from "@/interfaces/category/category.interfaces";
import { GetCategoryService } from "@/services/store/get-category.service";
import { GetCarTypeService } from "@/services/store/get-car-type.service";
import Layout from "@/layout/layout";
import { Input } from "@/components/ui/input";
import StoreCard from "@/components/card/store-card";
import { useRouter } from "next/router";

const CarTypeDetailPage: NextPage<CarTypeDetailPageInterface> = ({
  carType,
}) => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  return (
    <Layout
      title={"Svetaforuz"}
      keyword={"svetaforuz, svetafor.uz," + carType.name}
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
          {carType.name}
        </h1>
        <Input
          className={`w-96`}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Tezkor qidiruv`}
        />
      </div>
      <div className={`grid w-10/12 mx-auto my-6 grid-cols-5 gap-x-4 gap-y-10`}>
        {carType.products
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

export default CarTypeDetailPage;

interface CarTypeDetailPageInterface {
  carType: CategoryInterfaces;
}

export const getServerSideProps: GetServerSideProps<
  CarTypeDetailPageInterface
> = async ({ query }) => {
  try {
    const slug = query.slug as string;
    const carType = await GetCarTypeService.getOneCars(slug);

    return {
      props: {
        carType,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};
