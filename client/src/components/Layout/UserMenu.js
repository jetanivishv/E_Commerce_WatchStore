import {React,useState,useEffect} from "react";
import { NavLink , useLocation } from "react-router-dom";

const UserMenu = () => {
const [activeUser, setActiveUser] = useState("");
  const location = useLocation();

  useEffect(() => {
    const link=location.pathname.substring(16);
    setActiveUser(link);
  }, [location]);

  return (
    <div className="flex flex-col space-y-2">
    <h4 className="mt-3 text-center text-2xl font-poppins">User Panel</h4>
    <NavLink
      to="/dashboard/user/profile"
      className={`py-2 px-2 rounded-md bg-gray-900 hover:bg-gray-700 text-center
      ${
        activeUser === "profile"
          ? "border-b-2 border-yellow-200"
          : ""
      }
      `
    }
    >
      Update Profile
    </NavLink>
    <NavLink
      to="/dashboard/user/orders"
      className={`py-2 px-2 rounded-md bg-gray-900 hover:bg-gray-700 text-center
      ${
        activeUser === "orders"
          ? "border-b-2 border-yellow-200"
          : ""
      }
      `
    }
    >
      Orders
    </NavLink>
  </div>
  )
}

export default UserMenu
