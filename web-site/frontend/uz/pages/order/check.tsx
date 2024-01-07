import React, { useState } from "react";
import Layout from "@/layout/layout";
import ContactForms from "@/components/order/contact-forms";
import OrderItems from "@/components/order/order-items";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/router";

const CheckPage = () => {
  const router = useRouter();

  const [success, setSuccess] = useState<boolean>(false);
  const [errorPost, setErrorPost] = useState<boolean>(false);

  function to() {
    setSuccess((success) => !success);
    setErrorPost((errorPost) => !errorPost);
    router.push(`/cabinet/orders`);
  }

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
      <div className={`w-6/12 mx-auto flex justify-between items-center py-4`}>
        <div className={`flex text-green-500 items-center space-x-2`}>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={`w-12 h-12`}
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
            />
          </svg>
          <p className={`text-xl font-bold`}>Mening savatim</p>
        </div>
        <div className={`flex items-center space-x-2`}>
          <div
            className={`h-10 bg-black text-xl font-bold rounded-full text-white flex items-center justify-center w-10`}
          >
            2
          </div>
          <p className={`text-xl font-bold`}>Hisob-kitob tafsilotlari</p>
        </div>
        <div className={`flex items-center space-x-2`}>
          <div
            className={`h-10 bg-black text-xl font-bold rounded-full text-white flex items-center justify-center w-10`}
          >
            3
          </div>
          <p className={`text-xl font-bold`}>Buyurtma tugallandi</p>
        </div>
      </div>
      <div className={`w-10/12 mx-auto my-4 flex justify-between gap-x-4`}>
        <div className={`w-1/2 px-5`}>
          <ContactForms error={setErrorPost} success={setSuccess} />
        </div>
        <div className={`w-1/2 px-5`}>
          <OrderItems />
        </div>
      </div>
      <Dialog modal={true} onOpenChange={to} open={success}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={`text-green-600 text-2xl`}>
              Buyurtmangiz muvafaqiyatli yuborildi
            </DialogTitle>
            <DialogDescription className={`flex pt-2`}>
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className={`w-10 h-10`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>
              {`Buyurtmalaringizni - "Mening Buyurtmalarim" bo'limidan topishingiz
            mumkin.`}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog modal={true} onOpenChange={to} open={errorPost}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={`text-red-600 text-2xl`}>
              Buyurtmangiz yuborish jarayonida xatolik yuz berdi !
            </DialogTitle>
            <DialogDescription className={`flex space-x-2 pt-2`}>
              <svg
                className={`w-16 h-16`}
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <p>
                {`Buyurtmangiz yuborish jarayonida xatolik yuz berdi ! Iltimos qaytadan urinib ko'ring. Barcha boshliqlarni to'ldirganigizga ishonch hosil qiling.`}
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CheckPage;
