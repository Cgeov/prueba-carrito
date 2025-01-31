import { IDish } from "../interfaces/dish";
import addCart from "../assets/addCart.svg";

export default function DishCard({ name, category, image, price }: IDish) {
  return (
    <div className="py-5 flex flex-col mx-auto">
      <div className="relative flex justify-center">
        <img className="rounded-xl w-full h-full" src={image}></img>
        <div className="absolute text-lg bg-white py-2 px-7 rounded-3xl text-center -bottom-5 border border-csRose400 flex gap-3 justify-center items-center">
          <img src={addCart}></img>
          Add to Cart
        </div>
      </div>
      <div className="mt-8">
        <p className="text-csRose500">{category}</p>
        <p className="text-csRose900">{name}</p>
        <p className="text-csRed">${price}</p>
      </div>
    </div>
  );
}
