import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OrderItemInterface } from "@/interfaces/order/order-item.interface";
import Image from "next/image";

interface DetailProps {
  data: OrderItemInterface[];
}

const Detail: React.FC<DetailProps> = ({ data }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Mahsulotlar</DialogTitle>
        <DialogDescription>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rasm</TableHead>
                <TableHead>Mahsulot nomi</TableHead>
                <TableHead>Katalog</TableHead>
                <TableHead className="w-10">Soni</TableHead>
                <TableHead className="text-right">Narx</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((i) => (
                <TableRow key={i.id}>
                  <TableCell>
                    <Image
                      className={`w-16 h-16 object-cover`}
                      height={999}
                      width={999}
                      src={
                        process.env.API_URL + i.product_data[0].images[0].image
                      }
                      alt={i.product_data[0].description}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {i.product_data[0].name}
                  </TableCell>
                  <TableCell>{i.product_data[0].category.name}</TableCell>
                  <TableCell>{i.quantity}</TableCell>
                  <TableCell className="text-right flex flex-col items-center justify-center">
                    <p>
                      {(i.product_data[0].price * i.quantity).toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "uzs",
                        },
                      )}
                    </p>
                    <p>
                      {(i.product_data[0].price * 1).toLocaleString("en-US", {
                        style: "currency",
                        currency: "uzs",
                      })}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default Detail;
