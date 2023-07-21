import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
        <div className="flex flex-wrap w-full mr-0">
          {categories.map((c) => (
            <div className="bg-gray-900 w-1/6 hover:bg-gray-700 text-center text-xl mt-4 ml-2 text-white font-bold py-2 px-1 rounded" 
            style={{
              padding: '50px'
            }}
            key={c._id}>
              <Link to={`/category/${c.slug}`}>
                {c.name}
              </Link>
            </div>
          ))}
        </div>
    </Layout>
  );
};

export default Categories;

