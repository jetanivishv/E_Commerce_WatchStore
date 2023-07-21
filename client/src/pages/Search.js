import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [values,setValues]=useSearch()
    const navigate = useNavigate();

  return (
    <div>
      <Layout title={'Search Results'}>
        <div>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{values?.results.length<1?'No Products Foudnd' : `Found ${values?.results.length}` }</h6>
                <div className="ml-4 flex flex-wrap">
              {values?.results.map((p) => (
                <div
                key={p._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 max-w-md rounded shadow-lg hover:shadow-xl mt-5 transition-shadow duration-300">
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
                    <div className="text-white">
                      {p.description.substring(0,30)}...
                    </div>
                    <div className="text-white line-clamp-4">
                      {p.price}
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
        </div>
      </Layout>
    </div>
  )
}

export default Search
