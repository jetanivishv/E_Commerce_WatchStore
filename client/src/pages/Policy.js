import React from 'react'
import Layout from '../components/Layout/Layout'
import styles from './Policy.module.css'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
    <div className={`flex ${styles.policy}`}>
    <div className="w-full md:w-1/2">
    <img
      src="/images/policy.jpg"
      alt="policy"
      className={`mt-4 ml-10 ${styles['img-custom']}`}
    />
      </div>
      <div className="md:w-2/5 md:ml-4">
      <ol className='list-decimal text-justify text-xl'>
  <li>
    <strong>Data Collection:</strong> We may collect personal information such as name, email address, shipping address, and payment details to process and fulfill orders. This information is securely stored and used solely for order processing and customer communication purposes.
  </li>
  <li>
    <strong>Cookies and Tracking:</strong> We may use cookies and similar technologies to enhance your browsing experience, personalize content, and gather analytics data. You can manage your cookie preferences through your browser settings.
  </li>
  <li>
    <strong>Information Sharing:</strong> We do not sell or rent your personal information to third parties for marketing purposes. However, we may share data with trusted partners for specific purposes, such as order fulfillment, marketing campaigns, or legal compliance.
  </li>
  <li>
    <strong>Updates to the Policy:</strong> We reserve the right to update our privacy policy as needed. Any changes will be posted on our website, and your continued use of our services indicates your acceptance of the updated policy.
  </li>
</ol>
        </div>
    </div>
  </Layout>
  )
}

export default Policy
