import React, { Fragment, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import MetaData from "../Layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { DELETE_PRODUCT_RESET } from "../../store/constants/productConstants";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../store/actions/userAction";
import { DELETE_USER_RESET } from "../../store/constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        console.log(params);
        return params.value === "admin" ? "!text-green-500" : "!text-red-500";
      },
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
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteUserHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        role: item.role,
        name: item.name,
      });
    });

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, navigate, deleteError, isDeleted, message]);

  return (
    <Fragment>
      <MetaData title={`ALL USERS -Admin`} />

      <div className="w-[100vw] max-w-full grid grid-cols-[1fr] sm:grid-cols-[1fr_5fr] absolute">
        <Sidebar />
        <div className="w-full box-border bg-[rgb(255,255,255)] border-l border-solid border-[rgba(0,0,0,0.158)] flex flex-col h-[100vh]">
          <h1 className="text-center p-[0.5vmax] box-border text-[rgba(0,0,0,0.637)] transition-all delay-500 m-8 font-normal font-['Roboto'] text-[2rem]">
            ALL USERS
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

export default UsersList;
