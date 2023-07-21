import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
    <div>
      <div className="flex">
        <div className="w-1/3 mt-5">
          <img 
            src={product._id?`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`:""}
            alt={product.name}
            className="ml-24 rounded-lg shadow-lg"
            width="400px"
            height="300px"
            style={{
              maxWidth: "500px",
              maxHeight: "350px"
            }}
          />
        </div>
        <div className="w-2/3 flex flex-col justify-center mr-16 px-6 mt-5 ml-5"
        style={{
            backgroundColor:"black"
        }}
        >
          <h1 className="text-4xl mt-5 font-bold text-white">{product.name}</h1>
          <h6 className="text-xl mt-4 text-white">{product.description}</h6>
          <h6 className="text-xl mt-4 text-white">Price: {product.price} INR</h6>
          <h6 className="text-xl mt-4 text-white">Category: {product?.category?.name}</h6>
          <button className="bg-gray-700 w-1/2 ml-48 hover:bg-gray-500 mt-8 py-3 px-4 rounded-full text-white font-bold shadow-lg">
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="bg-gray-900 py-4 mt-4 text-white text-center text-xl font-bold">
        Related Products
      </div>
      <div>
                {relatedProducts.length < 1 && (
          <p className="text-center text-3xl mt-5">No Similar Products found</p>
        )}

      </div>
      <div className="flex flex-wrap ml-4">
              {relatedProducts?.map((p) => (
                <div
                key={p._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 max-w-md rounded shadow-lg hover:shadow-xl mt-5 transition-shadow duration-300 mb-4">
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
    </div>
  </Layout>
  );
};

export default ProductDetails;
