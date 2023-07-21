import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/Admin";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { FiEdit, FiDelete } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is Created`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${selected.name} to ${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (c) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${c._id}`
      );
      if (data.success) {
        toast.success(`${c.name} is deleted`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Create Category">
      <div className="container mx-auto px-3">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/4 px-3">
            <AdminMenu />
          </div>
          <div className="w-full md:w-2/4 px-3">
              <h1 className="font-poppins font-bold text-3xl mt-10 ml-8 md:ml-56 md:mt-3 ">
                Manage Category
              </h1>
              <div className="p-3">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <table className="border-collapse table-auto w-full mt-8 mb-8">
                <thead className="font-bold text-white text-xl">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left uppercase border-b border-gray-200"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left uppercase border-b border-gray-200"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-white text-lg">
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td className="whitespace-nowrap px-6 py-2 border-b border-gray-200">
                        <span className="font-medium">{c.name}</span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-2 border-b border-gray-200">
                        <button
                          className="bg-gray-900 mr-2 hover:bg-gray-700 font-bold py-1 px-2 rounded"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="bg-gray-900 ml-2 hover:bg-gray-700 font-bold py-1 px-2 rounded"
                          onClick={() => {
                            handleDelete(c);
                          }}
                        >
                          <FiDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </div>
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg p-4" style={{ top: "170px", width: "460px", transform: "translate(-132px, -55px)" }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Category</h2>
              <button
                onClick={() => setVisible(false)}
                className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
              >
                <CgClose />
              </button>
            </div>
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateCategory;
