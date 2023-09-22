/* eslint-disable react/no-unescaped-entities */
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/CartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../Store';
import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formerrors = useActionData();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    status: addressstatus,
    position,
    address,
    error: erroraddress,
  } = useSelector((state) => state.user);
  const addressloading = addressstatus === 'loading'; ////when the addressfetching is in loading
  const totalprice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalprice * 0.2 : 0;
  const totalpriceeeeeeeeee = totalprice + priorityPrice;

  // console.log(cart);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order?Let's go!</h2>

      <Form method="POST">
        <div className=" mb-5 flex flex-col  sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            defaultValue={userName}
            required
          />
        </div>

        <div className=" mb-5 flex flex-col  sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex-grow">
            <input type="tel" name="phone" className="input w-full " required />
            {formerrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 ">
                {formerrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className=" relative mb-5 flex  flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="flex-grow">
            <input
              type="text"
              name="address"
              placeholder="enter Your adress"
              className="input w-full"
              disabled={addressloading}
              defaultValue={address}
              required
            />
            {addressstatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 ">
                {erroraddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className=" absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={addressloading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                getpositon
              </Button>
            </span>
          )}
        </div>

        <div className=" mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6  w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          ></input>
          <Button disabled={isSubmitting || addressloading} type="primary">
            {isSubmitting
              ? 'ordering....'
              : `Order Now from ${formatCurrency(totalpriceeeeeeeeee)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  console.log(data); ///////////////////////////////////////

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true', // we need this line because we want actuall boolean value of pririty not a string //if noo pririty set ,,,data.priority===true wll become false so finallu priority will be false if
    //////////////////////////////////////// in  142 pririty is string  so 'true'==='true ' will return true--boolean
  };
  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Thats a wrong phone number ,Please provide the Correct One';
  // console.log(errors);
  if (Object.keys(errors).length > 0) return errors;

  ///if no errors then we send a post request to api
  const neworder = await createOrder(order);

  store.dispatch(clearCart());
  // console.log(neworder);
  return redirect(`/order/${neworder.id}`);
}
export default CreateOrder;
