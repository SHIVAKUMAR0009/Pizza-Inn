import { Link } from 'react-router-dom';
import SearchOrder from '../feautures/order/SearchOrder';
import User from '../feautures/user/User';

function Header() {
  return (
    <header className="  item-center flex justify-between border-b border-stone-300 bg-yellow-500 px-4 py-3  uppercase sm:px-6">
      <Link className=" tracking-widest" to="/">
        Pizza Inn{' '}
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
