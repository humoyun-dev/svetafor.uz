import React, { useEffect, useState } from "react";
import LayoutCabinet from "@/layout/layout-cabinet";
import { GetUserService } from "@/services/user/get-user.service";
import { OrderInterface } from "@/interfaces/order/order.interface";

const Orders = () => {
  const [data, setData] = useState<OrderInterface[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userOrders = await GetUserService.GetUserByToken();
        setData(userOrders);
      } catch (error: any) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, []);

  console.log(data);

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
      <div>
        {data.map((i) => (
          <div key={i.id} className={`border rounded-lg py-2 px-5`}>
            #{i.id}
          </div>
        ))}
      </div>
    </LayoutCabinet>
  );
};

export default Orders;
