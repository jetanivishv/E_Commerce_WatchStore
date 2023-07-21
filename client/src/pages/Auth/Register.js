import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Register.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address,answer }
      );
      if(res && res.data.success){
        toast.success(res.data.message);
        navigate('/login');
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register - ECommerce App"}>
      <div className={styles.register}>
        <h1 className="text-3xl font-bold font-poppins mt-2 uppercase">Sign up</h1>
        <div className={`w-full max-w-xl mt-5 ${styles.custom}`}>
          <form
            className="w-full max-w-full font-poppins"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-2xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full text-sm h-15 bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="First_Name Last_Name"
                  required
                  autoFocus
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-2xs font-bold mb-2"
                  htmlFor="grid-email"
                >
                  E-mail
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-sm text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide  text-2xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full  text-sm bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="******************"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide  text-2xs font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone no.
                </label>
                <input
                  className="appearance-none block w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  placeholder="Your Phone no."
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                  className="block uppercase tracking-wide text-2xs font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  className="appearance-none block w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your Address"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
              <label
                  className="block uppercase tracking-wide text-2xs font-bold mb-2"
                  htmlFor="answer"
                >
                  Your Favourite Sport?
                </label>
                <textarea
                  className="appearance-none block w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write Secret answer"
                  required
                />
              </div>
            </div>
              <button
                type="submit"
                className={`text-white font-bold py-2 px-4 border-b-4 border-white-600 hover:bg-gray-700 rounded ${styles.btn}`}
              >
                Sign Up
              </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
