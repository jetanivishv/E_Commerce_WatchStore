import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${
            process.env.REACT_APP_API
          }/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        <h4 className="text-center text-xl mb-2 p-2">{category?.name}</h4>
        <h6 className="text-center text-2xl">{products?.length} result found </h6>
          <div className="flex flex-wrap mt-5">
              {products?.map((p) => (
                <div
                key={p._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 max-w-md rounded shadow-lg hover:shadow-xl mt-2 transition-shadow duration-300">
                  <img
                    className="w-full h-56 object-cover"
                    src={
                      p._id
                        ? `${
                            process.env.REACT_APP_API
                          }/api/v1/product/product-photo/${p._id}?${Date.now()}`
                        : ""
                    }
                    alt={p.name}
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-lg mb-2">{p.name}</div>
                    <div className="text-white line-clamp-3">
                      {p.description}...
                    </div>
                    <div className="text-white line-clamp-4">
                      {p.price} INR
                    </div>
                    <div className="flex flex-">
                      <button className="bg-gray-900 hover:bg-gray-700 mt-4 mr-2 text-white font-bold py-2 px-1 rounded"
                      onClick={()=>navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button className="bg-gray-900 hover:bg-gray-700 mt-4 ml-2 text-white font-bold py-2 px-1 rounded">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
      </div>
    </Layout>
  );
};

export default CategoryProduct;