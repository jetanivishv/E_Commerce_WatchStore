import React, { useState, useEffect } from "react";
import Styles from './AdminOrders.module.css'
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/Admin";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
       <div className="container mx-auto px-3">
        <div className="flex flex-wrap -mx-3">
      <div className="w-full md:w-1/4 px-3">
              <AdminMenu />
            </div>
            <div className="w-full md:w-2/3 mb-4  px-3 mt-3">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg p-3">
          <h1 className="text-3xl text-center font-semibold text-white mb-3">All Orders</h1>
          {orders?.map((o, i) => (
                <div className="mb-6 bg-gray-700" key={i}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" 
                      className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                      >#</th>
                      <th scope="col"
                      className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                      >Status</th>
                      <th scope="col"
                      className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                      >Buyer</th>
                      <th scope="col"
                      className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                      > date</th>
                      <th scope="col"
                      className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                      >Payment</th>
                      <th scope="col"
                      className="px-6 py-3 text-left text-lg font-medium text-white-500 uppercase tracking-wider"
                      >Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                      <td 
                      className="px-6 py-4 whitespace-nowrap"
                      style={{
                        color:"red !important"
                      }}>
                        <Select
                          bordered={false}
                          className={Styles.custom}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{o?.buyer?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{moment(o?.createAt).fromNow()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{o?.payment.success ? "Success" : "Failed"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container mx-auto">
                  {o?.products?.map((p, i) => (
                    <div className="flex p-3 card" key={p._id}>
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="mr-5"
                          alt={p.name}
                          width="200px"
                          height="100px"
                        />
                      <div>
                        <p className="text-2xl mb-4 font-semibold">{p.name}</p>
                        <p className="text-lg  mb-4 text-white-500">{p.description}</p>
                        <p className="text-base mt-2">Price : {p.price}</p>
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

export default AdminOrders;