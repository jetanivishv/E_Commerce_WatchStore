import {React,useState,useEffect} from "react";
import { NavLink , useLocation } from "react-router-dom";

const Admin = () => {
  const [active, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    const link=location.pathname.substring(17);
    setActive(link);
  }, [location]);

  return (
    <div className="flex flex-col space-y-2">
    <h4 className="mt-3 text-center text-3xl font-poppins mt-10 md:mt-3">Admin Panel</h4>
    <NavLink
      to="/dashboard/admin/create-category"
      className={`py-2 px-2 rounded-md bg-gray-900 hover:bg-gray-700 text-center
      ${
        active === "create-category"
          ? "border-b-2 border-yellow-200"
          : ""
      }
      `
    }
    >
      Create Category
    </NavLink>
    <NavLink
      to="/dashboard/admin/create-product"
      className={`py-2 px-2 rounded-md bg-gray-900 hover:bg-gray-700 text-center
      ${
        active === "create-product"
          ? "border-b-2 border-yellow-200"
          : ""
      }
      `
    }
    >
      Create Product
    </NavLink>
    <NavLink
      to="/dashboard/admin/products"
      className={`py-2 px-2 rounded-md bg-gray-900 hover:bg-gray-700 text-center
      ${
        active === "products"
          ? "border-b-2 border-yellow-200"
          : ""
      }
      `
    }
    >
      Products
    </NavLink>
    <NavLink
      to="/dashboard/admin/orders"
      className={`py-2 px-2 rounded-md bg-gray-900 hover:bg-gray-700 text-center
      ${
        active === "orders"
          ? "border-b-2 border-yellow-200"
          : ""
      }
      `
    }
    >
      Orders
    </NavLink>
    <NavLink
      to="/dashboard/admin/users"
      className={`py-2 px-2 rounded-md bg-gray-900 hover:bg-gray-700 text-center
      ${
        active === "users"
          ? "border-b-2 border-yellow-200"
          : ""
      }
      `}
    >
      Users
    </NavLink>
  </div>
  
  );
};

export default Admin;
