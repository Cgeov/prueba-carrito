import { IDishData } from "../interfaces/dish";
import addCartIcon from "../assets/addCart.svg";
import useCartStore from "../store/storeCart";
import { useState } from "react";
import { Carousel, Modal } from "antd";

export default function DishCard({
  name,
  category,
  image,
  imageResponsive,
  price,
}: IDishData) {
  const cartItems = useCartStore((state) => state.cart);
  const { addCart, deleteCart } = useCartStore();
  const [openModal, setOpenModal] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cartItem: any = cartItems.find((dish: IDishData) => dish.name === name);

  return (
    <div className={"py-5 flex flex-col mx-auto"}>
      <div className="relative flex justify-center">
        <img
          onClick={() => setOpenModal(true)}
          className={
            "rounded-lg w-full h-full " + (cartItem && "border-2 border-csRed")
          }
          src={imageResponsive}></img>
        {cartItem ? (
          <div className="absolute text-lg bg-csRed py-2 px-5 rounded-3xl text-center -bottom-5 flex gap-9 justify-between items-center">
            <button
              className="text-white rounded-full hover:bg-white hover:text-csRed"
              onClick={() => deleteCart({ name, category, image, price })}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0001 2.5C14.1251 2.5 17.5001 5.875 17.5001 10C17.5001 14.125 14.1251 17.5 10.0001 17.5C5.87512 17.5 2.50012 14.125 2.50012 10C2.50012 5.875 5.87512 2.5 10.0001 2.5ZM10.0001 1.25C5.18762 1.25 1.25012 5.1875 1.25012 10C1.25012 14.8125 5.18762 18.75 10.0001 18.75C14.8126 18.75 18.7501 14.8125 18.7501 10C18.7501 5.1875 14.8126 1.25 10.0001 1.25Z"
                  fill="white"
                />
                <path
                  d="M5.00012 9.375H15.0001V10.625H5.00012V9.375Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <span className="text-white font-semibold">
              {cartItem.quantity}
            </span>
            <button
              className="text-white rounded-full hover:bg-white hover:text-csRed"
              onClick={() => addCart({ name, category, image, price })}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0001 2.5C14.1251 2.5 17.5001 5.875 17.5001 10C17.5001 14.125 14.1251 17.5 10.0001 17.5C5.87512 17.5 2.50012 14.125 2.50012 10C2.50012 5.875 5.87512 2.5 10.0001 2.5ZM10.0001 1.25C5.18762 1.25 1.25012 5.1875 1.25012 10C1.25012 14.8125 5.18762 18.75 10.0001 18.75C14.8126 18.75 18.7501 14.8125 18.7501 10C18.7501 5.1875 14.8126 1.25 10.0001 1.25Z"
                  fill="white"
                />
                <path
                  d="M15.0001 9.375H10.6251V5H9.37512V9.375H5.00012V10.625H9.37512V15H10.6251V10.625H15.0001V9.375Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div
            onClick={() => addCart({ name, category, image, price })}
            className="absolute text-sm font-semibold hover:border hover:border-csRed hover:text-csRed bg-white py-2 px-7 rounded-3xl text-center -bottom-5 border border-csRose400 flex gap-3 justify-center items-center cursor-pointer">
            <img src={addCartIcon} alt="Add to Cart" />
            Add to Cart
          </div>
        )}
      </div>
      <div className="mt-8">
        <p className="text-csRose500">{category}</p>
        <p className="text-csRose900 font-semibold">{name}</p>
        <p className="text-csRed font-semibold">${price}</p>
      </div>

      <Modal
        className="absolute -bottom-2 p-0 max-h-[90%] top-auto sm:top-[20%] sm:m-auto sm:relative sm:!max-w-[600px] !w-full m-0 !max-w-[100%] sm:!w-auto"
        footer={null}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        closeIcon={false}>
        <div className="flex gap-5">
          <Carousel
            className="w-[200px]"
            arrows
            infinite={true}
            autoplay
            autoplaySpeed={3000}
            lazyLoad="progressive">
            <div>
              <img
                className={"rounded-lg w-52 h-52"}
                src={imageResponsive}></img>
            </div>
            <div>
              <img
                className={"rounded-lg w-52 h-52"}
                src={imageResponsive}></img>
            </div>
          </Carousel>

          <div className="flex flex-col w-full justify-between">
            <div>
              <p className="text-csRose500 font-semibold">{category}</p>
              <p className="text-csRose900 font-semibold">{name}</p>
              <p className="text-csRed">@{price}</p>
            </div>

            <div
              onClick={() => {
                addCart({ name, category, image, price });
                setOpenModal(false);
              }}
              className="text-sm font-semibold hover:border hover:border-csRed hover:text-csRed bg-white py-2 px-7 rounded-3xl text-center -bottom-5 border border-csRose400 flex gap-3 justify-center items-center cursor-pointer">
              <img src={addCartIcon} alt="Add to Cart" />
              Add to Cart
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
