/* eslint-disable react/prop-types */
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getItemById } from '../cart/CartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateQuantity from '../cart/UpdateQuantity';
function MenuItem({ pizza }) {
  // eslint-disable-next-line react/prop-types
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const singlecartitem = useSelector(getItemById(id));
  const inCart = singlecartitem > 0;
  function handle() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="item-center mt-auto flex justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {inCart && (
            <div className="flex items-center gap-2 sm:gap-8">
              <UpdateQuantity pizzaId={id} singlecartitem={singlecartitem} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !inCart && (
            <Button type="small" onClick={handle}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
