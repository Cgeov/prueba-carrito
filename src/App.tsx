/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import DishCard from "./components/dishCard";
import dishData from "./data/data.json";
import useScreenSize from "./hooks/useScreenSize";
import emptyCart from "./assets/emptyCart.svg";

function App() {
  const { width } = useScreenSize();

  return (
    <div className="bg-csRose50 w-[90%] mx-auto max-w-[1200px] py-10 lg:py-5">
      <h1 className="text-csRose900 font-bold text-3xl mt-5">Desserts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 mt-7">
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
        <div>
          <h2 className="text-3xl text-csRed">Your Cart (0)</h2>

          <div className="flex justify-center items-center flex-col mt-5">
            <img src={emptyCart} />
            <p className="mt-10">Your added items will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
