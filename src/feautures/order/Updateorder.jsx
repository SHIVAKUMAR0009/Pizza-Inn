import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function Updateorder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>;
    </fetcher.Form>
  );
}

export default Updateorder;
export async function action({ request, params }) {
  //   console.log('hi');
  const data = { priority: true };

  await updateOrder(params.OrderId, data);

  return null;
}
