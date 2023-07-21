import React ,{useState,useEffect} from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react'
import toast from "react-hot-toast";
import axios from "axios";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken,setClientToken]=useState("");
  const [instance,setInstance]=useState("");
  const [loading,setLoading]=useState(false);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //payment gateway
  const getToken = async() => {
    try{
      const {data} = await axios.get(`${
        process.env.REACT_APP_API
      }/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getToken();
  },[auth?.token])
  
  //handle payments
   const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${
        process.env.REACT_APP_API
      }/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      toast.success("Payment Completed Successfully ");
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Cart">
      <div>
        <h1 className="text-center text-2xl bg-light p-2 mb-1">
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <h4 className="text-center text-2xl">
          {cart?.length
            ? `You Have ${cart.length} items in your cart ${
                auth?.token ? "" : "please login to checkout"
              }`
            : " Your Cart Is Empty"}
        </h4>
      </div>
      <div className="flex mt-5">
      <div className="w-2/3">
  {cart?.map((p) => (
    <div className="flex flex-col mb-4 rounded-lg" key={p._id}>
      <div className="flex">
        <div className="w-1/3 ml-16">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
            alt={p.name}
            style={{
                maxHeight:"250px",
                maxWidth:"350px"
            }}
            className="w-full opacity-90"
            onError={(e) => {
              e.target.src = "placeholder-image-url";
            }}
          />
        </div>
        <div className="w-1/2 bg-gray-900 text-white p-4 flex flex-col justify-between">
          <div className="flex flex-col space-y-5">
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p>{p.description}</p>
            <p>Price: {p.price} INR</p>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white rounded-lg px-4 py-2 mt-2"
            onClick={() => removeCartItem(p._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


        <div className="w-1/3 flex flex-col">
          <h2 className="bg-gray-900 ml-32 w-1/2 text-center py-4 text-xl mb-5">Cart Summary</h2>
          <p className="mb-4 text-center text-xl">Total | Checkout | Payment</p>
          <hr />
          <h4 className="mt-4 text-center text-xl">Total : {totalPrice()} </h4>
          {auth?.user?.address ? (
            <>
            <h4 className="text-center text-3xl mt-5">Current Address</h4>
              <div className="mb-3 bg-gray-900 py-4 px-16 mr-3 mt-4">
                <h5>{auth?.user?.address}</h5>
              </div>
                <button
                  className="bg-gray-900 hover:bg-gray-700 mt-2 mr-2 rounded-lg w-1/2 px-3 text-white py-2"
                  style={{
                    marginLeft:"110px"
                  }}
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
            </>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="bg-gray-900 hover:bg-gray-700 mt-2 mr-2 rounded-lg px-3 text-white py-2"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              ) : (
                <button
                  className="bg-gray-900 ml-40 hover:bg-gray-700 mt-2 mr-2 rounded-lg px-3 text-white py-3"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Plase Login to checkout
                </button>
              )}
            </div>
          )}
           <div className="mt-2 mr-5 mb-3 bg-white">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="bg-gray-900 ml-40 hover:bg-gray-700 mt-2 mr-2 mb-2 rounded-lg px-3 text-white py-3"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
