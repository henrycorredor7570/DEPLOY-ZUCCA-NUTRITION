import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Protected = ({ roles, children }) => {
  const role = useSelector((state) => state.user ? state.user.role : null)
  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;