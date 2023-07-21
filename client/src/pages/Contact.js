import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className={`flex ${styles.contactus}`}>
      <div className="w-full md:w-1/2">
      <img
        src="/images/contactus.jpeg"
        alt="contactus"
        className={`mt-4 ${styles['img-custom']}`}
        />
        </div>
        <div className="md:w-2/5 md:ml-4">
        <h1 className="bg-gray-900 p-2 text-white text-center text-5xl">CONTACT US</h1>
        <p className="text-justify mt-5 text-xl">
        Any query and info about the product, feel free to call anytime. We are available 24/7.
      </p>
      <p className="mt-5 text-xl">
        <BiMailSend className="inline-block" /> : www.help@ecommerceapp.com
      </p>
      <p className="mt-5 text-xl">
        <BiPhoneCall className="inline-block" /> : 012-3456789
      </p>
      <p className="mt-5 text-xl">
        <BiSupport className="inline-block"   /> : 1800-0000-0000 (toll-free)
      </p>
          </div>
      </div>
    </Layout>
  )
}

export default Contact
