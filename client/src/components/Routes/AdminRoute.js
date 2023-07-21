import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(null);
  const [auth, setAuth] = useAuth();
  const [apiCompleted, setApiCompleted] = useState(false); // New state variable
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
        setOk(res.data.ok);
      } catch (error) {
        setOk(false);
        console.log(error);
      } finally {
        setApiCompleted(true); 
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
      setApiCompleted(true);
    }
  }, [auth?.token]);

  if (apiCompleted){
    return ok ? <Outlet /> : <Spinner path="" />
  }
}
