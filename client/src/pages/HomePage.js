import { React, useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart,setCart]=useCart();

  const navigate = useNavigate();

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting All Categories");
    }
  };

   //getTOtal COunt
   const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if(!checked.length && !radio.length) getAllProducts();
  }, [checked.length,radio.length]);

  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();    
  },[checked,radio]);

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c != id);
    }
    setChecked(all);
  };

  const filterProduct = async() => {
    try{
      setLoading(true);
      const {data} = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/filter-products`,{checked,radio}
      );
      setLoading(false);
      if(data?.products.length==0) setProducts([]);
      else setProducts(data?.products);
      console.log(products.length);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <Layout title={"All Products - Best offers "}>
      <div className="container mx-auto px-3">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/4 px-3">
            <h1 className="text-center text-xl mt-3">Filter By Category</h1>
            <div className="flex flex-col mt-5" style={{ marginLeft: "40px" }}>
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  <span className="text-lg text-white">{c.name}</span>
                </Checkbox>
              ))}
            </div>
            <h1 className="text-center text-xl mt-3">Filter By Price</h1>
            <div className="flex flex-col mt-5" style={{ marginLeft: "40px" }}>
              {
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>
                        <span className="text-lg text-white">{p.name} </span>
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              }
            </div>
            <div>
            <button
              className="bg-gray-900 hover:bg-gray-700 mt-4 text-white font-bold py-2 px-1 rounded"
              onClick={() => window.location.reload()}
              style={
                {
                  marginLeft:"80px"
                }
              }
            >
              RESET FILTERS
            </button>
          </div>
          </div>
          <div className="w-full md:w-3/4 px-3">
            <h1 className="mt-10 ml-40 text-3xl mt-5"
            style={
              {
                marginLeft:"450px"
              }
            }
            >All Products</h1>
            <div className="flex flex-wrap">
              {products?.map((p) => (
                <div
                key={p._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 max-w-md rounded shadow-lg hover:shadow-xl mt-5 transition-shadow duration-300">
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
                      <button className="bg-gray-900 hover:bg-gray-700 mt-4 ml-2 text-white font-bold py-2 px-1 rounded"
                      onClick={()=> {
                        setCart([...cart,p])
                        localStorage.setItem('cart',JSON.stringify([...cart,p]));
                      toast.success('Item Added to Cart')
                      }
                      }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {
                products && products.length < total && !checked.length && !radio.length && (
                  <button className="bg-gray-900 hover:bg-gray-700 mt-4 ml-2 text-white font-bold py-2 px-1 rounded"
                  onClick={(e)=>{
                  e.preventDefault();
                  setPage(page+1);
                  }}
                  >
                    {
                      loading ? "Loading...":"Load More"
                    }
                  </button>
                )
              }
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
