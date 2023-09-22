import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from '../../feautures/menu/MenuItem';
function Menu() {
  const data = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-1">
      {data.map((item) => (
        <MenuItem pizza={item} key={item.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
