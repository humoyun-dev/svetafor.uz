import React, { useEffect, useState } from "react";
import LayoutCabinet from "@/layout/layout-cabinet";
import { GetUserService } from "@/services/user/get-user.service";
import { OrderInterface } from "@/interfaces/order/order.interface";
import { UserInterfaces } from "@/interfaces/user/user.interfaces";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Detail from "@/components/order/detail";

const Orders = () => {
  const [data, setData] = useState<OrderInterface[]>([]);
  const user: UserInterfaces = useSelector((state: any) => state.user.userData);
  const [open, setOpen] = useState<boolean>(false);

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

  function total() {
    if (!data || data.length === 0) {
      return 0;
    }

    const sum = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total_price * 1,
      0,
    );
    return sum;
  }

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
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
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead className={`w-[160px]`}>Status</TableHead>
              <TableHead>Telefon raqam</TableHead>
              <TableHead>Manzil</TableHead>
              <TableHead className="">Sana</TableHead>
              <TableHead className="w-[100px]">PromoCod</TableHead>
              <TableHead className="text-right">Xisob</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.reverse().map((i) => (
              <Dialog
                key={i.id}
                open={open}
                onOpenChange={(open) => setOpen(!open)}
                modal={true}
              >
                <TableRow
                  className={`cursor-pointer`}
                  onClick={() => setOpen((open) => !open)}
                >
                  <Detail data={i.items} />
                  <TableCell className="font-medium">#{i.id}</TableCell>
                  <TableCell
                    className={`font-[500] ${
                      i.status ? "text-green-500" : "text-orange-400"
                    }`}
                  >
                    {i.status ? "Tasdiqlandi" : "Ko'rib chiqilmoqda"}
                  </TableCell>
                  <TableCell>
                    {i.phone_number.toLowerCase() === "none"
                      ? "-"
                      : `+${i.phone_number}`}
                  </TableCell>
                  <TableCell className="text-wrap">
                    {i.shipping_address}
                  </TableCell>
                  <TableCell className="">
                    {moment(`${i.date_added}`)
                      .utc()
                      .format("YYYY/MM/DD, HH:mm")}
                  </TableCell>
                  <TableCell className="w-[100px]">
                    -{i.promo_code * 1}%
                  </TableCell>
                  <TableCell className="text-right">
                    {(i.total_price * 1).toLocaleString("en-US", {
                      style: "currency",
                      currency: "uzs",
                    })}
                  </TableCell>
                </TableRow>
              </Dialog>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className={`w-full`}>
              <TableCell colSpan={6}>Ummumiy xisob</TableCell>
              <TableCell className="text-right">
                {total().toLocaleString("en-US", {
                  style: "currency",
                  currency: "uzs",
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </LayoutCabinet>
  );
};

export default Orders;
