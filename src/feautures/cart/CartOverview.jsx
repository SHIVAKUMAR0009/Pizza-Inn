import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './CartSlice';

function CartOverview() {
  //totalcartquantity//totalcartprice
  //u can also create selector functions which starts with usually get....so on
  const totalcartquantity = useSelector(getTotalCartQuantity); //
  const totalcartprice = useSelector(getTotalCartPrice);

  return (
    <div className="item-center text-stone- text-stone flex justify-between bg-stone-700 px-4 py-4 uppercase text-stone-200 sm:px-6 ">
      <p className="space-x-4 text-sm font-semibold text-stone-300 sm:space-x-6 md:text-base">
        <span>{totalcartquantity} pizzas</span>
        <span>${totalcartprice}</span>
      </p>
      <Link className="bg-stone-550 " to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
