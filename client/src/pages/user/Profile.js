import React, { useState,useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from 'react-hot-toast';
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

   //get user data
   useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address}
      );
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
       <Layout title="Your Profile">
    <div className="container mx-auto px-3">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/4 px-3">
          <UserMenu/>
        </div>
        <div className="md:w-2/4 ml-32 mb-5 px-3 mt-3">
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg p-3" style={{ marginTop: "50px" }}>
        <h1 className="text-3xl font-bold font-poppins text-center mt-2 uppercase">USER PROFILE</h1>
        <div className={`w-full m-auto max-w-xl mt-5`}>
          <form
            className="w-full font-poppins"
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
              <div className="w-full px-3 mb-6 md:mb-0">
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
            </div>
              <button
                type="submit"
                className={`ml-56 text-white font-bold py-2 px-4 border-b-4 border-white-600 hover:bg-gray-700 rounded`}
              >
                Update
              </button>
          </form>
        </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
    </div>
  )
}

export default Profile
