import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/Admin";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <Layout title="All Products">
        <div className="container mx-auto px-3">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/4 px-3">
              <AdminMenu />
            </div>
            <div className="w-full md:w-3/4 px-3">
              <h1 className="font-poppins font-bold text-3xl mt-10 ml-8 md:ml-56 md:mt-3">
                All Product List
              </h1>
              <div className="flex flex-wrap">                       
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                  >
                    <div className="max-w-md rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <img
                        className="w-full h-56 object-cover"
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}?${Date.now()}`}
                        alt={p.name}
                      /> 

                      <div className="px-6 py-4">
                        <div className="font-bold text-lg mb-2">
                          {p.name}
                        </div>
                        <p className="text-white line-clamp-4">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Products;
