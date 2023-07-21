import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <form className="flex" role="search" onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 bg-gray-900 rounded-lg text-white px-4 mr-3 mt-2"
            type="search" 
            placeholder="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            style={{
              height : "40px",
            }}
          />
          <button
            className="bg-gray-900 hover:bg-gray-700 mt-2 mr-2 rounded-lg px-3 text-white py-2"
            style={{
              border : "1px solid white"
            }}
            type="submit"
          >
            Search
          </button>
        </form>
    </div>
  );
};

export default SearchInput;
