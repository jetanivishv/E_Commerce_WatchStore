import React from 'react'
import Layout from '../components/Layout/Layout'
import styles from './About.module.css'

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className={`flex ${styles.aboutus}`}>
      <div className="w-full md:w-1/2">
      <img
        src="/images/about.jpeg"
        alt="aboutus"
        className={`mt-4 ${styles['img-custom']}`}
      />
        </div>
        <div className="md:w-2/5 md:ml-4">
        <p className="text-justify mt-5 text-xl">
        At E-CommerceApp, we are passionate about bringing you the best online shopping experience. With a wide range of products from various categories, we strive to provide our customers with a diverse selection of high-quality items. Our dedicated team works tirelessly to curate a collection that meets the needs and preferences of our valued customers. We believe in delivering exceptional customer service and ensuring a seamless shopping journey from start to finish. Whether you're looking for the latest fashion trends, electronics, home essentials, or unique gifts, E-CommerceApp is your go-to destination. Shop with confidence, knowing that your satisfaction is our top priority. Welcome to E-CommerceApp, where convenience, quality, and customer satisfaction are our driving forces.
      </p>
          </div>
      </div>
    </Layout>
  )
}
   
export default About
