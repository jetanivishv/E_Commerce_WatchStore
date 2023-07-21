import {React,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import styles from "./ForgotPassword.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
          { email, newPassword,answer }
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
    <Layout title={"Forgot Password - Ecommerce App"}>
    <div className={styles.fp}>
      <h1 className="text-3xl font-bold font-poppins mt-2 uppercase">RESET Password</h1>
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
                className="block uppercase tracking-wide text-2xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Your Favourite Sport?
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-sm text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                id="email"
                placeholder="Your Secret Answer"
                required
              />
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
              <label
                className="block uppercase tracking-wide  text-2xs font-bold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                className="appearance-none block w-full  text-sm bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
              Reset
            </button>
    </div>
        </form>
      </div>
    </div>
  </Layout> 
  )
}

export default ForgotPassword
