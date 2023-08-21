import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../store/actions/productAction.js";
import { getAllOrders } from "../../store/actions/orderAction.js";
import { getAllUsers } from "../../store/actions/userAction.js";
import {Chart, ArcElement,CategoryScale,LinearScale,PointElement,LineElement} from 'chart.js'
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const Dashboard = () => {
  let outOfStock = 0;

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, 4000],
      },
    ],
  };
  const DoughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  const dashboard_Summary_Div_Classes = "flex justify-center bg-white";
  const dashboard_Summary_Box2_a_Classes =
    "text-[rgb(0,0,0)] font-light text-[0.9rem] sm:text-[2rem] font-['Roboto'] text-center bg-[rgb(255,233,174)] no-underline flex justify-center items-center flex-col w-[10vmax] h-[10vmax] m-4 sm:m-8 rounded-full p-2 sm:p-20";
  return (
    <div className="w-[100vw] max-w-full grid grid-cols-[1fr] sm:grid-cols-[1fr_5fr] absolute">
      <Sidebar />
      <div className="border-none sm:border-l sm:border-solid border-[rgba(0,0,0,0.13)] bg-white py-12 px-0">
        <Typography
          component="h1"
          className="text-center"
          sx={{
            font: "300 2rem rgba(0,0,0,0.733)",
            fontSize: "2rem",
          }}
        >
          Dashboard
        </Typography>
        <div className="mx-0 my-8">
          <div className={`${dashboard_Summary_Div_Classes}`}>
            <p className="bg-[rgba(70,117,218,0.932)] text-white w-full text-center p-6 m-0 sm:my-0 sm:mx-8 font-light text-[1.3rem] font-['Roboto']">
              Total Amount <br /> Rs2000
            </p>
          </div>
          <div className={`${dashboard_Summary_Div_Classes}`}>
            <Link
              className={`${dashboard_Summary_Box2_a_Classes} bg-[rgb(255,110,110)] text-[rgb(255,255,255)]`}
              to="/admin/products"
            >
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link
              className={`${dashboard_Summary_Box2_a_Classes} text-[rgb(255,255,255)]`}
              to="/admin/orders"
            >
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link
              className={`${dashboard_Summary_Box2_a_Classes} bg-[rgb(50,50,50)] text-[rgb(255,255,255)]`}
              to="/admin/users"
            >
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="w-4/5 m-auto">
          <Line data={lineState} />
        </div>
        <div className="w-[30vmax] m-auto">
          <Doughnut data={DoughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
