import React, { useEffect } from 'react';
import Container from 'components/Container';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import styles from './Layout.module.scss';
import { useAppSelector } from 'hooks/redux';
import Loader from 'components/Loader';
import { scrollController } from 'utils/scrollController';

const Layout: React.FC = () => {
  const isUserPending = useAppSelector((state) => state.user.isPending);

  useEffect(() => {
    isUserPending ? scrollController.disableScroll() : scrollController.enableScroll();
  }, [isUserPending]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      {isUserPending && <Loader />}
    </div>
  );
};

export default Layout;
