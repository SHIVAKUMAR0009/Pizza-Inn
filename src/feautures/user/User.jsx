import { useSelector } from 'react-redux';

function User() {
  const userName = useSelector((state) => state.user.userName);
  if (!userName) return null;
  return (
    <div className="hidden text-sm font-semibold tracking-widest md:block">
      {userName}
    </div>
  );
}

export default User;
