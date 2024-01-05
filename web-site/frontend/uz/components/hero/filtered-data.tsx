import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StoreCard from "@/components/card/store-card";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";
import { CarTypeInterfaces } from "@/interfaces/car-type/car-type.interfaces";
import { CategoryInterfaces } from "@/interfaces/category/category.interfaces";

const FilteredData: React.FC<FilteredDataInterface> = ({
  data,
  carType,
  category,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<any>("");
  const [carFilter, setCarFilter] = useState<any>("");
  const [filteredData, setFilteredData] = useState<ProductInterfaces[]>(data);

  useEffect(() => {
    const applyFilters = () => {
      const newData = data.filter((item) => {
        const matchesCategory =
          !categoryFilter ||
          item.category.id.toString().includes(categoryFilter);
        const matchesCarType =
          !carFilter ||
          item.car_types.some((carTypeItem) =>
            carTypeItem.id.toString().includes(carFilter),
          );
        return matchesCategory && matchesCarType;
      });

      setFilteredData(newData);
    };

    applyFilters();
  }, [categoryFilter, carFilter, data]);

  return (
    <div className={`flex justify-between gap-x-4`}>
      <div className={`w-3/12 `}>
        <div className={`border rounded-xl h-full p-4 `}>
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
                  onClick={() => setCategoryFilter("")}
                  className={`w-full border text-black text-lg cursor-pointer duration-300 hover:bg-gray-100 px-2 rounded-lg py-1 ${
                    categoryFilter == "" ? "bg-yellow-400 font-semibold" : ""
                  }`}
                >
                  Barchasi
                </li>
                {category.map((i) => (
                  <li
                    onClick={() => setCategoryFilter(i.id)}
                    className={`w-full border text-black text-lg cursor-pointer duration-300 hover:bg-gray-100 px-2 rounded-lg py-1 ${
                      categoryFilter == i.id
                        ? "bg-yellow-400 font-semibold"
                        : ""
                    }`}
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
                  onClick={() => setCarFilter("")}
                  className={`w-full border text-lg cursor-pointer duration-300 hover:bg-gray-100 px-2 rounded-lg py-1 text-black ${
                    carFilter == "" ? "bg-yellow-400 font-semibold" : ""
                  }`}
                >
                  Barchasi
                </li>
                {carType.map((i) => (
                  <li
                    onClick={() => setCarFilter(i.id)}
                    className={`w-full border text-lg cursor-pointer duration-300 hover:bg-gray-100 px-2 rounded-lg py-1 text-black ${
                      carFilter == i.id ? "bg-yellow-400 font-semibold" : ""
                    }`}
                    key={i.id}
                  >
                    {i.name}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className={`w-9/12  grid grid-cols-4 gap-x-4 gap-y-10`}>
        {filteredData.map((i) => (
          <StoreCard data={i} key={i.id} />
        ))}
      </div>
    </div>
  );
};

export default FilteredData;

interface FilteredDataInterface {
  data: ProductInterfaces[];
  carType: CarTypeInterfaces[];
  category: CategoryInterfaces[];
}
