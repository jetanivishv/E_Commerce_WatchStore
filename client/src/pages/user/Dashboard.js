import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container mx-auto px-3">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/4 px-3">
            <UserMenu/>
          </div>
          <div className="w-full md:w-1/4 px-3 mt-3">
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg p-3">
              <h3 className="text-2xl font-bold text-white mb-4">User Profile</h3>
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 font-bold">Name:</td>
                    <td className="px-4 py-2">{auth?.user?.name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-bold">Email:</td>
                    <td className="px-4 py-2">{auth?.user?.email}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-bold">Contact:</td>
                    <td className="px-4 py-2">{auth?.user?.phone}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-bold">Address:</td>
                    <td className="px-4 py-2">{auth?.user?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
