import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="container mx-auto px-3">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/4 px-3">
            <UserMenu />
          </div>
          <div className="w-full md:w-2/3 mb-4  px-3 mt-3">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg p-3">
              <h1 className="text-3xl font-semibold text-white mb-3">All Orders</h1>
              {orders?.map((o, i) => (
                <div className="mb-6 bg-gray-700" key={i}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                        >
                          Buyer
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-lh font-medium text-white-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                        >
                          Payment
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{o?.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{o?.buyer?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {moment(o?.createAt).fromNow()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {o?.payment.success ? "Success" : "Failed"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="container mx-auto">
                    {o?.products?.map((p, j) => (
                      <div className="flex mb-4 p-3 card" key={p._id}>
                        <div className="w-1/3">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="250px"
                            height="200px"
                          />
                        </div>
                        <div className="w-2/3 mt-10">
                          <div className="text-2xl mb-4 font-semibold">{p.name}</div>
                          <div className="text-lg  mb-4 text-white-500">
                            {p.description}
                          </div>
                          <div className="text-base mt-2">Price: {p.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
