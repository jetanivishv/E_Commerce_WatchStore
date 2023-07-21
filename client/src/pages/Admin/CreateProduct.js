import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/Admin";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");

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

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="container mx-auto px-3">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/4 px-3">
            <AdminMenu />
          </div>
          <div className="w-full md:w-2/4 px-3 mb-5">
            <h1 className="font-poppins font-bold text-3xl mt-10 ml-8 md:ml-56 md:mt-3 ">
              Create Product
            </h1>
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-3 mt-6">
              <div className="mb-5">
                <select
                  id="large"
                  className="w-full bg-gray-900 px-4 py-2 mr-3 border border-gray-300 rounded-lg"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  defaultValue="dummy"
                  value={category?.name}
                >
                  <option disabled className="text-lg" value="dummy">
                    Choose a Product Category
                  </option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <label className="border border-gray-300 bg-gray-900 rounded-lg w-full mr-3 w-full block bg-gray-900  hover:bg-gray-600 text-white font-bold py-1 rounded text-center text-xl">
                  {photo
                    ? `Uploaded Image : ${photo.name}`
                    : "Upload Product Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  ></input>
                </label>
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="w-full bg-gray-900 px-4 py-2 mr-3 border border-gray-300 rounded-lg"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Product Description"
                  className="w-full bg-gray-900 px-4 py-2 mr-3 border border-gray-300 rounded-lg"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-5 flex">
                <input
                  type="number"
                  value={price}
                  placeholder="Product Price"
                  className="w-1/2 bg-gray-900 px-4 py-2 mr-3 border border-gray-300 rounded-lg"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="number"
                  value={quantity}
                  placeholder="Product Quantity"
                  className="w-1/2 bg-gray-900 px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreate}
                style={{
                  marginLeft: "250px",
                }}
              >
                Create Product
              </button>
            </div>
          </div>
          <div className="mb-5 w-full md:w-1/4">
            {photo && (
              <div>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  className="img img-responsive"
                  style={{
                    marginTop: "80px",
                    marginLeft: "20px",
                    maxWidth: "350px",
                    maxHeight: "400px",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
