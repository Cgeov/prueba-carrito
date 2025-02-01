/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import DishCard from "./components/dishCard";
import dishData from "./data/data.json";
import useScreenSize from "./hooks/useScreenSize";
import emptyCart from "./assets/emptyCart.svg";
import useCartStore from "./store/storeCart";
import deleteDish from "./assets/removeItem.svg";
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
      <h1 className="text-csRose900 font-bold text-3xl mt-5">Desserts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-5 mt-7">
          {dishData.map((dish: any, index: number) => {
            const { image, ...rest } = dish;
            return (
              <DishCard
                key={index}
                {...rest}
                image={
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
          <h2 className="text-3xl text-csRed">Your Cart ({cart.length})</h2>

          <div className="flex justify-center flex-col mt-5">
            {cart.length == 0 ? (
              <div className="flex flex-col items-center">
                <img src={emptyCart} />
                <p className="mt-10">Your added items will appear here</p>
              </div>
            ) : (
              <>
                <div>
                  {cart.map((dish: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between w-full items-center mb-5">
                        <div>
                          <p>{dish.name}</p>
                          <div className="flex gap-5">
                            <span className="text-csRed">x{dish.quantity}</span>
                            <div className="flex gap-3">
                              <span className="text-csRose500">
                                @{dish.price}
                              </span>
                              <span className="text-csRose500">
                                ${dish.subTotal ?? 0}
                              </span>
                            </div>
                          </div>
                        </div>
                        <img
                          onClick={() => deleteCart({ name: dish.name }, true)}
                          src={deleteDish}></img>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between">
                  Order Total
                  <span>{total}</span>
                </div>

                <div className="mt-4 py-4 flex justify-center items-center bg-csRose50 rounded-lg">
                  <img src={carbonTree}></img>
                  <p>
                    This is a <span>carbon-neutral</span> delivery
                  </p>
                </div>
                <div
                  onClick={showModal}
                  className="bg-csRed w-full py-3 text-white text-center rounded-3xl mt-6">
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
          <h1>Order Confirmed</h1>
          <p>We hope you enjoy your food!</p>

          <div className="bg-csRose50 rounded-lg p-4 ">
            <div className="max-h-[400px] overflow-y-auto">
              {cart.map((dish: IDishData, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex w-full items-center border-b border-csRose100 mb-5">
                    <img
                      src={dish.image.thumbnail}
                      className="w-[100px] h-[200px]"
                    />
                    <div className="flex flex-col">
                      <p>{dish.name}</p>
                      <div className="flex gap-5">
                        <span className="text-csRed">x{dish.quantity}</span>
                        <div className="flex gap-3">
                          <span className="text-csRose500">@{dish.price}</span>
                          <span className="text-csRose500">
                            ${dish.subTotal ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>


            <div className="flex justify-between ">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <div
              onClick={() => {
                reset();
                handleCancel();
              }}
              className="bg-csRed py-3 w-full rounded-3xl text-center text-white">
              Start New Order
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
