import React, { Fragment, useEffect, useState } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "./Sidebar";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../../store/actions/productAction";
import { NEW_PRODUCT_RESET } from "../../store/constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error, loading } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "All",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: clearErrors });
    }
    if (success) {
      alert("Product Created Successfully!!");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      console.log(imagesPreview);
      reader.readAsDataURL(file);
    });
  };
  const form_Div_Classes = "flex w-full items-center";
  const form_Div_Input_Classes =
    "w-full box-border rounded sm:py-[1vmax] py-[2.5vmax] sm:px-[4vmax] px-[5vmax] pr-[1vmax] border border-solid border-[rgba(0,0,0,0.267)] font-light sm:text-[0.9vmax] text-[1.7vmax] font-[cursive] outline-none";
  const form_Div_Svg_Classes =
    "absolute  translate-x-[1vmax] text-[2.8vmax] sm:text-[1.6vmax] text-[rgba(0,0,0,0.623)] ";
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="w-[100vw] max-w-full grid grid-cols-[1fr] sm:grid-cols-[1fr_5fr] absolute">
        <Sidebar />
        <div className="w-full box-border sm:bg-[rgb(221,221,221)] bg-[rgb(255,255,255)] border-l border-solid border-[rgba(0,0,0,0.158)] flex flex-col h-[100vh]">
          <form
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
            className="flex flex-col items-center m-auto bg-white p-[5vmax] sm:p-[3vmax] justify-evenly h-[80%] w-[50vh] shadow-lg"
          >
            <h1>Create Product</h1>
            <div className={`${form_Div_Classes}`}>
              <SpellcheckIcon className={`${form_Div_Svg_Classes}`} />
              <input
                className={`${form_Div_Input_Classes}`}
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={`${form_Div_Classes}`}>
              <AttachMoneyIcon className={`${form_Div_Svg_Classes}`} />
              <input
                className={`${form_Div_Input_Classes}`}
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className={`${form_Div_Classes}`}>
              <DescriptionIcon className={`${form_Div_Svg_Classes}`} />
              <textarea
                className={`${form_Div_Input_Classes}`}
                placeholder="Product Description"
                cols={30}
                rows={1}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className={`${form_Div_Classes}`}>
              <AccountTreeIcon className={`${form_Div_Svg_Classes}`} />
              <select
                className={`${form_Div_Input_Classes}`}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${form_Div_Classes}`}>
              <StorageIcon className={`${form_Div_Svg_Classes}`} />
              <input
                className={`${form_Div_Input_Classes}`}
                type="number"
                placeholder="stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className={`${form_Div_Classes} flex p-0`}>
              <input
                // className={` file:hover:bg-gray-300 file:cursor-pointer file:w-full file:m-0 file:bg-white file:z-[2] file:h-[5vh] file:font-normal file:text-[0.8vmax] file:font-[cursive] file:transition-all file:delay-500 file:py-0 file:px-[1vmax] file:text-[rgba(0,0,0,0.623)]`}
                className="w-full box-border border border-solid border-[rgba(0,0,0,0.267)] rounded font-light text-sm font-[cursive] outline-none file:w-full file:z-[2] file:h-[7vh] sm:file:h-[5vh] sm:file:font-normal file:font-medium file:m-0 file:py-0 file:px-[1vmax] file:text-sm file:text-[1.8vmax] file:font-[cursive] file:text-[rgba(0,0,0,0.623)] file:cursor-pointer file:bg-[rgb(255,255,255)] file:border-none hover:file:bg-[rgb(235,235,235)]"
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductImagesChange}
              />
            </div>
            <div className={`${form_Div_Classes} w-full overflow-auto`}>
              {imagesPreview.map((image, index) => (
                <img
                  className="sm:w-[3vmax] w-[8vmax] my-0 mx-[0.5vmax] rounded-full sm:rounded-none"
                  src={image}
                  key={index}
                  alt="Product Preview"
                />
              ))}
            </div>
            <button
              className="text-white w-full cursor-pointer rounded border-none bg-[#FF6347] font-light text-[0.9vmax] font-['Roboto'] p-[0.8vmax] transition-all delay-500 outline-none shadow-md hover:bg-red-700 disabled:bg-red-700"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
