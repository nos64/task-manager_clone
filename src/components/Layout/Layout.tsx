import React from 'react';
import Container from 'components/Container';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import styles from './Layout.module.scss';

const Layout: React.FC = () => (
  <div className={styles.wrapper}>
    <Header />
    <main className={styles.main}>
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
  </div>
);

export default Layout;
