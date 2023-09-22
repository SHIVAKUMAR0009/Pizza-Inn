/* eslint-disable react/prop-types */

import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';

import DeleteItem from './DeleteItem';
import UpdateQuantity from './UpdateQuantity';
import { getItemById } from './CartSlice';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const singlecartitem = useSelector(getItemById(pizzaId));
  return (
    <li className="sm:item-center py-3 sm:flex sm:justify-between">
      <p className="mb-2 sm:mb-1">
        {quantity}&times; {name}
      </p>
      <div className="item-center flex justify-between sm:gap-9">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId} singlecartitem={singlecartitem} />

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
