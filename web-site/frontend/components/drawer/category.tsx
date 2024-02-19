import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarTypeInterfaces } from "@/interfaces/car-type/car-type.interfaces";
import { CategoryInterfaces } from "@/interfaces/category/category.interfaces";
import { GetCarTypeService } from "@/services/store/get-car-type.service";
import { GetCategoryService } from "@/services/store/get-category.service";
import { useRouter } from "next/router";

const CategoryDrawer: React.FC = ({}) => {
  const router = useRouter();

  const [carType, setCar] = useState<CarTypeInterfaces[]>([]);
  const [category, setCategory] = useState<CategoryInterfaces[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchCategory = async () => {
    try {
      const response = await GetCategoryService.getAllCategory();
      setCategory(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCarType = async () => {
    try {
      const res = await GetCarTypeService.getAllCars();
      setCar(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchCarType();
  }, [category, carType]);
  return (
    <Tabs defaultValue={"category"} className={`w-full`}>
      <TabsList className={`w-full rounded-lg gap-x-2`}>
        <TabsTrigger className={`rounded-lg w-1/2`} value={`category`}>
          Katalog
        </TabsTrigger>
        <TabsTrigger className={`rounded-lg w-1/2`} value={`car-type`}>
          Avtomobillar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="category">
        <ul className={`flex flex-col gap-y-3`}>
          <h1 className={`px-1 text-lg font-semibold`}>
            {`Katalog bo'yicha filter`}
          </h1>
          <hr />
          <li
            onClick={() => router.push(`/store/category`)}
            className={`w-full border text-black text-lg cursor-pointer duration-300 hover:bg-gray-100 px-2 rounded-lg py-1 `}
          >
            Barchasi
          </li>
          {category.map((i) => (
            <li
              onClick={() => router.push(`/store/category/${i.slug}`)}
              className={`w-full border text-black text-lg cursor-pointer duration-300 hover:bg-gray-100 px-2 rounded-lg py-1 `}
              key={i.id}
            >
              {i.name}
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="car-type">
        <ul className={`flex flex-col gap-y-3`}>
          <h1 className={`px-1 text-lg font-semibold`}>
            {`Avtomobillar bo'yicha filter`}
          </h1>
          <hr />
          <li
            onClick={() => router.push(`/store/car`)}
            className={`w-full border text-lg cursor-pointer duration-300 hover:bg-gray-100 px-2 rounded-lg py-1 text-black `}
          >
            Barchasi
          </li>
          {carType.map((i) => (
            <li
              onClick={() => router.push(`/store/car/${i.slug}`)}
              className={`w-full border text-lg cursor-pointer duration-300 hover:bg-gray-100 px-2 rounded-lg py-1 text-black `}
              key={i.id}
            >
              {i.name}
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
};

export default CategoryDrawer;
