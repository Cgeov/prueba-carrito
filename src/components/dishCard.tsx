import { IDish } from "../interfaces/dish";
import addCartIcon from "../assets/addCart.svg";
import useCartStore from "../store/storeCart";
import addIcon from "../assets/addIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";

export default function DishCard({ name, category, image, price }: IDish) {
  const cartItems = useCartStore((state) => state.cart);
  const { addCart, deleteCart } = useCartStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cartItem: any = cartItems.find((dish: any) => dish.name === name);

  return (
    <div className={"py-5 flex flex-col mx-auto"}>
      <div className="relative flex justify-center">
        <img className={"rounded-lg w-full h-full " + (cartItem && 'border-2 border-csRed')} src={image}></img>
        {cartItem ? (
          <div className="absolute text-lg bg-csRed py-2 px-5 rounded-3xl text-center -bottom-5 border border-csRose400 flex gap-9 justify-between items-center">
            <button
              onClick={() => deleteCart({ name, category, image, price })}>
              <img src={deleteIcon} alt="Remove" />
            </button>
            <span className="text-white font-bold">{cartItem.quantity}</span>
            <button onClick={() => addCart({ name, category, image, price })}>
              <img src={addIcon} alt="Add" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => addCart({ name, category, image, price })}
            className="absolute text-lg bg-white py-2 px-7 rounded-3xl text-center -bottom-5 border border-csRose400 flex gap-3 justify-center items-center cursor-pointer">
            <img src={addCartIcon} alt="Add to Cart" />
            Add to Cart
          </div>
        )}
      </div>
      <div className="mt-8">
        <p className="text-csRose500">{category}</p>
        <p className="text-csRose900">{name}</p>
        <p className="text-csRed">${price}</p>
      </div>
    </div>
  );
}
