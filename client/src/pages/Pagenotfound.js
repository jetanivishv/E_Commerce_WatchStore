import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from "react-router-dom";
import styles from "./Pagenotfound.module.css";

const Pagenotfound = () => {
  return (
    <Layout title={"Go Back - Page Not Found"}>
      <div className={styles.pnf}>
        <h1 className={styles['pnf-title']}>404</h1>
        <h2 className={styles['pnf-heading']}>Oops ! Page Not Found</h2>
        <Link to="/" className={styles['pnf-btn']}>
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default Pagenotfound
