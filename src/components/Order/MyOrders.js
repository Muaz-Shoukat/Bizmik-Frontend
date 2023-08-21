import React, { Fragment, useEffect } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import MetaData from "../Layout/MetaData";
import Loader from "../UI/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../store/actions/orderAction";
import { Link } from "react-router-dom";
import "./MyOrder.css";

const MyOrders = () => {
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value === "Delivered"
          ? "!text-green-500"
          : "!text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[100vw] max-w-full p-0 sm:px-[7vmax] box-border bg-[rgb(235,235,235)] fixed top-0 pt-14 left-0 h-[93vh] sm:h-[100vh] flex flex-col">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            autoHeight
            className="bg-white myOrdersTable "
          />
          <Typography className="text-center font-normal text-[2.2vmax] sm:text-[1.2vmax] font-['Roboto'] p-[4vw] sm:p-[0.5vmax] box-border text-[rgb(235,235,235)] transition-all delay-500 bg-[rgb(44,44,44)]">
            {user.name}'s Orders
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
