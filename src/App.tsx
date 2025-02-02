import "./App.css";
import DishCard from "./components/dishCard";
import dishData from "./data/data.json";
import useScreenSize from "./hooks/useScreenSize";
import emptyCart from "./assets/emptyCart.svg";
import useCartStore from "./store/storeCart";
import carbonTree from "./assets/carbonTree.svg";
import checkmark from "./assets/checkmark.svg";
import { Modal } from "antd";
import { useState } from "react";
import { IDishData } from "./interfaces/dish";

function App() {
  const { width } = useScreenSize();
  const { cart, total, deleteCart, reset } = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-csRose50 w-[90%] mx-auto max-w-[1200px] py-10 lg:py-5">
      <h1 className="text-csRose900 font-bold text-4xl mt-5">Desserts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-5 mt-7">
          {dishData.map((dish: IDishData, index: number) => {
            const { image, ...rest } = dish;
            return (
              <DishCard
                key={index}
                {...rest}
                image={image}
                imageResponsive={
                  width < 640
                    ? image.mobile
                    : width < 1024
                    ? image.tablet
                    : image.desktop
                }
              />
            );
          })}
        </div>
        <div className="bg-white h-min rounded-xl p-4">
          <h2 className="text-2xl font-bold text-csRed">
            Your Cart ({cart.length})
          </h2>

          <div className="flex justify-center flex-col mt-5">
            {cart.length == 0 ? (
              <div className="flex flex-col items-center">
                <img src={emptyCart} />
                <p className="mt-10 text-csRose500 font-semibold">
                  Your added items will appear here
                </p>
              </div>
            ) : (
              <>
                <div>
                  {cart.map((dish: IDishData, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between w-full items-center mb-5">
                        <div>
                          <p className="text-csRose900 font-semibold">
                            {dish.name}
                          </p>
                          <div className="flex gap-5">
                            <span className="text-csRed font-semibold">
                              x{dish.quantity}
                            </span>
                            <div className="flex gap-3">
                              <span className="text-csRose500">
                                @{dish.price}
                              </span>
                              <span className="text-csRose500 font-semibold">
                                ${dish.subTotal ?? 0}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => deleteCart({ name: dish.name }, true)}
                          className="cursor-pointer text-csRed hover:text-csRose900">
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z"
                              fill="currentColor"
                            />
                            <path
                              d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between">
                  Order Total
                  <span className="font-bold text-2xl">${total}</span>
                </div>

                <div className="mt-4 py-4 flex justify-center items-center bg-csRose50 rounded-lg">
                  <img src={carbonTree}></img>
                  <p>
                    This is a{" "}
                    <span className="font-semibold">carbon-neutral</span>{" "}
                    delivery
                  </p>
                </div>
                <div
                  onClick={showModal}
                  className="bg-csRed cursor-pointer hover:brightness-75 w-full py-3 text-white text-center rounded-3xl mt-6">
                  Confirm Order
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        className="absolute -bottom-2 p-0 max-h-[90%] top-auto sm:top-[20%] sm:m-auto sm:relative sm:!max-w-[600px] !w-full m-0 !max-w-[100%] sm:!w-auto"
        footer={null}
        open={isModalOpen}
        onCancel={() => handleCancel()}
        closeIcon={false}>
        <div>
          <img src={checkmark} />
          <h1 className="text-4xl font-bold mt-2">Order Confirmed</h1>
          <p className="text-csRose500 text-sm">We hope you enjoy your food!</p>

          <div className="bg-csRose50 rounded-lg p-4 mt-3">
            <div className="max-h-[400px] overflow-y-auto py-3">
              {cart.map((dish: IDishData, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex w-full pb-3 justify-between items-center border-b border-csRose100 mb-5">
                    <div className="flex gap-6 items-center">
                      <img
                        src={dish.image.thumbnail}
                        className="w-[60px] h-[60px] rounded-md"
                      />
                      <div>
                        <p className="text-csRose900 font-semibold">
                          {dish.name}
                        </p>
                        <div className="flex gap-3 mt-3">
                          <span className="text-csRed font-semibold">
                            x{dish.quantity}
                          </span>
                          <span className="text-csRose500">@{dish.price}</span>
                        </div>
                      </div>
                    </div>

                    <span className="font-semibold text-lg">
                      ${dish.subTotal ?? 0}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              Order Total
              <span className="font-bold text-2xl">${total}</span>
            </div>

            <div
              onClick={() => {
                reset();
                handleCancel();
              }}
              className="bg-csRed cursor-pointer hover:brightness-75 py-3 w-full mt-5 rounded-3xl text-center text-white">
              Start New Order
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
