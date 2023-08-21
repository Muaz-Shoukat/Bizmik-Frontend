import Header from "./components/Layout/Header/Header.js";
import "./App.css";
import webFont from "webfontloader";
import React, { useState, useEffect } from "react";
import Footer from "./components/Layout/Footer/Footer.js";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.js";
import ProductDetailsPage from "./pages/ProductDetails.js";
import ProductsPage from "./pages/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUpPage from "./pages/LoginSignUp.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/actions/userAction.js";
import UserOptions from "./components/Layout/Header/UserOptions.js";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import StripeLayout from "./components/Route/StripeLayout.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Cart/Payment.js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UsersList from "./components/Admin/UsersList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from "./components/Admin/ProductReviews.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/stripeapikey`
    );
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);
  return (
    <div className="overflow-hidden">
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:keyword" element={<ProductsPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUpPage />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/account" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>
        <Route path="/me/update" element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route path="/password/update" element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route path="/shipping" element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route path="/order/confirm" element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>
        <Route path="/order/success" element={<ProtectedRoute />}>
          <Route path="/order/success" element={<OrderSuccess />} />
        </Route>
        <Route path="/orders" element={<ProtectedRoute />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>
        <Route path="/order/:id" element={<ProtectedRoute />}>
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>
        <Route
          path="/process/payment"
          element={<StripeLayout stripeApiKey={stripeApiKey} />}
        >
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        </Route>

        {/* Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/products" element={<ProductList />} />
        </Route>
        <Route
          path="/admin/product"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>
        <Route
          path="/admin/product/:id"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>
        <Route
          path="/admin/order/:id"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        </Route>
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/users" element={<UsersList />} />
        </Route>
        <Route
          path="/admin/user/:id"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/user/:id" element={<UpdateUser />} />
        </Route>
        <Route
          path="/admin/reviews"
          element={<ProtectedRoute isAdmin={true} />}
        >
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
