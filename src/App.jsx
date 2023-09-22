import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Menu from './feautures/menu/Menu';
import { loader as menuloader } from './feautures/menu/Menu';
import Cart from './feautures/cart/Cart';
import CreateOrder, {
  action as formnewaction,
} from './feautures/order/CreateOrder';

import Order, { loader as orderloader } from './feautures/order/Order';

import { action as praction } from './feautures/order/Updateorder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuloader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: 'order/new',
        element: <CreateOrder />,
        action: formnewaction,
      },
      {
        path: '/order/:OrderId',
        element: <Order />,
        loader: orderloader,
        errorElement: <Error />,
        action: praction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
