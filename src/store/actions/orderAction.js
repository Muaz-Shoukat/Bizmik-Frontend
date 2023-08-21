import axios from "axios";

const {
  NEW_ORDER_FAIL,
  NEW_ORDER_SUCCESS,
  NEW_ORDER_REQUEST,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} = require("../constants/orderConstant");

export const createOrder = (order) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    dispatch({ type: NEW_ORDER_REQUEST });
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order/new`, order, config);
    dispatch({ type: NEW_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NEW_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders/me`,{
      withCredentials: true,
    });
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders/me`,{
      withCredentials: true,
    });
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/admin/order/${id}`,
      order,
      config
    );
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/order/${id}`,{
      withCredentials: true,
    });
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/${id}`,{
      withCredentials: true,
    });

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
