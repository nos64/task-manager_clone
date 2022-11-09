import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import styles from './layout.module.scss';

const Layout: React.FC = () => (
  <div className={styles.wwrapper}>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);

export default Layout;
