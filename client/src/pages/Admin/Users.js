import React from 'react'
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/Admin";

const Users = () => {
  return (
    <div>
      <Layout title="Dashboard - All Users">
      <div className="container mx-auto px-3">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/4 px-3">
            <AdminMenu />
          </div>
          <div className="w-full md:w-1/4 px-3 mt-3">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg p-3" style={{ marginTop: "50px" }}>
              <h1>All Users</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </div>
  )
}

export default Users
