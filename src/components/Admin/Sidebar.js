import React from "react";
import logo from "../../images/logo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";
import { TreeItem, TreeView } from "@mui/lab";
import "./Sidebar.css";

const Sidebar = () => {
  const link_Classes =
    "no-underline text-[rgba(0,0,0,0.493)] transition-all delay-500 p-[2rem] font-extralight font-['Roboto'] text-[1rem] hover:text-[#FF6347] hover:scale-110";
  const p_link_Classes = "flex items-center";
  const svg_p_link_Classes = "mr-2";

  return (
    <div className="bg-[rgb(255,255,255)] flex flex-col py-[4rem] px-0 first:p-0 ">
      <Link to="/" className={`${link_Classes} p-0`}>
        <img
          src={logo}
          alt="Ecommerce"
          className="w-full transition-all delay-500 hover:drop-shadow-[0_0_10px_#FF6347]"
        />
      </Link>
      <Link className={`${link_Classes}`} to="/admin/dashboard">
        <p className={`${p_link_Classes}`}>
          <DashboardIcon className={`${svg_p_link_Classes}`} />
          Dashboard
        </p>
      </Link>
      <Link className={`${link_Classes}`}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link className={`${link_Classes}`} to="/admin/orders">
        <p className={`${p_link_Classes}`}>
          <ListAltIcon className={`${svg_p_link_Classes}`} />
          Orders
        </p>
      </Link>
      <Link className={`${link_Classes}`} to="/admin/users">
        <p className={`${p_link_Classes}`}>
          <PeopleIcon className={`${svg_p_link_Classes}`} />
          Users
        </p>
      </Link>
      <Link className={`${link_Classes}`} to="/admin/reviews">
        <p className={`${p_link_Classes}`}>
          <RateReviewIcon className={`${svg_p_link_Classes}`} />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
