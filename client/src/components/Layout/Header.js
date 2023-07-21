import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Sign out Successfully");
  };
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1);
    const link = path === "" ? "home" : path;
    setActiveLink(link);
  }, [activeLink, location]);

  const handleMenu = () => {
    setHidden((prevhidden) => !prevhidden);
  };

  const handleMenu2 = () => {
    setHidden2((prevhidden) => !prevhidden);
  }

  return (
    <>
      <nav className={styles.custom}>
        <div className="px-2">
          <div className="relative flex h-16 items-center">
            <Link
              to="/"
              className={`flex items-center text-white text-2xl ${styles["custom-letter-spacing"]} uppercase font-roboto`}
              >
              🛍️ Ecommerce App 
            </Link>
                  <div 
                  style={{
                    marginLeft:"340px"
                  }}
                  >
            <SearchInput />
                  </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end font-poppins">
                <div className="flex space-x-4 text-50xs">
                  <NavLink
                    to="/"
                    className={`text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium uppercase ${
                      activeLink === "home"
                        ? "bg-black text-white rounded-md border-b-2 border-white"
                        : ""
                    }`}
                  >
                    Home
                  </NavLink>
                  {
                     <>
                     <button
                       id="dropdownNavbarLink"
                       data-dropdown-toggle="dropdownNavbar"
                       onClick={handleMenu2}
                       className={`relative px-3 py-2 flex items-center justify-between w-full rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:bg-gray-700 md:hover:text-white-700 md:w-auto text-white 
 `}
                     >
                       <span className="uppercase">Categories</span>
                       <svg
                         className={`w-3 h-3 ml-2 text-gray-600 dark:text-gray-300`}
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 12 7"
                       >
                         <path
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M1 1l5 5 5-5"
                         />
                       </svg>
                     </button>

                     <div
                       id="dropdownNavbar"
                       className={`absolute top-5 z-10 mt-10 font-normal bg-gray-800 text-white rounded-lg shadow w-44 ${
                         hidden2 ? "hidden" : ""
                       }  transition-opacity duration-300 ${styles.custom2}`}
                       style={{
                        right:"200px"
                       }}
                     >
                       <ul
                         className="py-2 text-5xs font-bold text-white-700 dark:text-gray-400"
                         aria-labelledby="dropdownNavbarLink"
                       >
                    <li>
                      <Link
                        className={`text-white hover:bg-gray-700 hover:text-white font-medium uppercase block px-4 py-2`}
                        to={`/categories`}
                      >
                        All Categories
                      </Link>
                    </li>      
                    {categories?.map((c) => (
                    <li 
                    key={c._id}>
                      <Link
                        className={`text-white hover:bg-gray-700 hover:text-white font-medium uppercase block px-4 py-2`}
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                  
                       </ul>
                     </div>
                   </>
                  }
                  {!auth.user ? (
                    <>
                      <NavLink
                        to="/register"
                        className={`text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium uppercase ${
                          activeLink === "register"
                            ? "bg-black text-white rounded-md border-b-2 border-white"
                            : ""
                        }`}
                      >
                        SIGN UP
                      </NavLink>
                      <NavLink
                        to="/login"
                        className={`text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium uppercase ${
                          activeLink === "login"
                            ? "bg-black text-white rounded-md border-b-2 border-white"
                            : ""
                        }`}
                      >
                        SIGN IN
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <button
                        id="dropdownNavbarLink"
                        data-dropdown-toggle="dropdownNavbar"
                        onClick={handleMenu}
                        className={`relative px-3 py-2 flex items-center justify-between w-full rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:bg-gray-700 md:hover:text-white-700 md:w-auto text-white 
  `}
                      >
                        <span className="uppercase">{auth?.user?.name}</span>
                        <svg
                          className={`w-3 h-3 ml-2 text-gray-600 dark:text-gray-300`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 12 7"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l5 5 5-5"
                          />
                        </svg>
                      </button>

                      <div
                        id="dropdownNavbar"
                        className={`absolute right-12 top-5 z-10 mt-10 font-normal bg-gray-800 text-white rounded-lg shadow w-44 ${
                          hidden ? "hidden" : ""
                        }  transition-opacity duration-300 ${styles.custom2}`}
                      >
                        <ul
                          className="py-2 text-5xs font-bold text-white-700 dark:text-gray-400"
                          aria-labelledby="dropdownNavbarLink"
                        >
                          <li>
                            <NavLink
                              to={`/dashboard/${
                                auth?.user?.role === 1 ? "admin" : "user"
                              }`}
                              className={`text-white hover:bg-gray-700 hover:text-white font-medium uppercase block px-4 py-2`}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/login"
                              className={`text-white hover:bg-gray-700 hover:text-white font-medium uppercase block px-4 py-2`}
                              onClick={handleLogOut}
                            >
                              Sign Out
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                    

                  <NavLink
                    to="/cart"
                    className={`text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium uppercase ${
                      activeLink === "cart"
                      ? "bg-black text-white rounded-md border-b-2 border-white"
                      : ""
                    }`}
                    >
                      {/* <Badge count={cart?.length} showZero> */}
                  
                  
                      Cart ({cart?.length})
                       {/* </Badge> */}
                  </NavLink>
                </div>
              </div>
            </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink
              to="/"
              className={`text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium uppercase ${
                activeLink === "home"
                  ? "bg-black text-white rounded-md border-b-2 border-white"
                  : ""
              }`}
            >
              Home
            </NavLink>
            <NavLink
              to="/category"
              className={`text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium uppercase ${
                activeLink === "category"
                  ? "bg-black text-white rounded-md border-b-2 border-white"
                  : ""
              }`}
            >
              Category
            </NavLink>
            <NavLink
              to="/register"
              className={`text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium uppercase ${
                activeLink === "register"
                  ? "bg-black text-white rounded-md border-b-2 border-white"
                  : ""
              }`}
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={`text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium uppercase ${
                activeLink === "login"
                  ? "bg-black text-white rounded-md border-b-2 border-white"
                  : ""
              }`}
            >
              Login
            </NavLink>
            <NavLink
              to="/cart"
              className={`text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium uppercase ${
                activeLink === "cart"
                  ? "bg-black text-white rounded-md border-b-2 border-white"
                  : ""
              }`}
            >
              Cart {cart?.length}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
