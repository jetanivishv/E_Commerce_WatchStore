import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import {useAuth} from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth] = useAuth();
  
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/login`,
          { email, password }
        );
        if(res && res.data.success){
          toast.success(res.data.message);
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        }); 
        localStorage.setItem('auth', JSON.stringify(res.data));
        console.log(location);
          navigate(location.state ||'/');
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
    <Layout title={"Login - ECommerce App"}>
    <div className={styles.login}>
      <h1 className="text-3xl font-bold font-poppins mt-2 uppercase">Sign in</h1>
      <div className={`mt-5 ${styles.custom}`}>
        <form
          className="font-poppins"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
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

          <div className="flex flex-wrap -mx-3 mb-6">
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
          <div className="flex items-center justify-between">
          <button
              type="submit"
              className={`text-white font-bold py-2 px-4 border-b-4 border-white-600 hover:bg-gray-700 rounded ${styles.btn}`}
            >
              Sign In
            </button>
            <button
              className={`text-white font-bold py-2 px-4 border-b-4 border-white-600 hover:bg-gray-700 rounded ${styles.btn}`}
              onClick={()=> navigate('/forgot-password')}
              >
              Forgot Password?
            </button>
    </div>
        </form>
      </div>
    </div>
  </Layout> 
  )
}

export default Login
