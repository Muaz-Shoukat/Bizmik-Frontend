import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const StripeLayout = ({ stripeApiKey }) => {
  console.log(stripeApiKey);
  return stripeApiKey ? <ProtectedRoute /> : <Navigate to="/" replace />;
};
export default StripeLayout;
