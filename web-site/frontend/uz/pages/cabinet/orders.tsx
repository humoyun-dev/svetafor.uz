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
    <LayoutCabinet>
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
