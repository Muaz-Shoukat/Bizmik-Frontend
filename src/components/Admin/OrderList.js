import React, { Fragment, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../Layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../store/actions/orderAction";
import { DELETE_ORDER_RESET } from "../../store/constants/orderConstant";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

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
      flex: 0.4,
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
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  return (
    <Fragment>
      <MetaData title={`ALL-ORDERS -Admin`} />

      <div className="w-[100vw] max-w-full grid grid-cols-[1fr] sm:grid-cols-[1fr_5fr] absolute">
        <Sidebar />
        <div className="w-full box-border bg-[rgb(255,255,255)] border-l border-solid border-[rgba(0,0,0,0.158)] flex flex-col h-[100vh]">
          <h1 className="text-center p-[0.5vmax] box-border text-[rgba(0,0,0,0.637)] transition-all delay-500 m-8 font-normal font-['Roboto'] text-[2rem]">
            ALL PRODUCTS
          </h1>
          <div className="max-w-full p-0 sm:px-[7vmax] box-border">
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              autoHeight
              className="bg-white productListTable "
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
