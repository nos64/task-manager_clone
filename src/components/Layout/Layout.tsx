import React, { useEffect } from 'react';
import Container from 'components/Container';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import styles from './Layout.module.scss';
import { useAppSelector } from 'hooks/redux';
import Loader from 'components/Loader';
import { scrollController } from 'utils/scrollController';
import useAppPending from 'hooks/useAppPending';
import useTokenExpiration from 'hooks/useTokenExpiration';

import i18n from 'i18next';

const Layout: React.FC = () => {
  const language = useAppSelector((state) => state.user.language);
  const isBurgerOpen = useAppSelector((state) => state.boards.isBurgerOpen);
  const theme = useAppSelector((state) => state.user.theme);

  const isPending = useAppPending();

  useTokenExpiration();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    isPending || isBurgerOpen ? scrollController.disableScroll() : scrollController.enableScroll();
  }, [isBurgerOpen, isPending]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      {isPending && <Loader />}
    </div>
  );
};

export default Layout;
