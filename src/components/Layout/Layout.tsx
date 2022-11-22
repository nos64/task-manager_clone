import React, { useEffect } from 'react';
import Container from 'components/Container';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import styles from './Layout.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import Loader from 'components/Loader';
import { scrollController } from 'utils/scrollController';
import {
  setIsAuthorised,
  setIsRoutesProtected,
  setIsTokenRequireUpdate,
} from 'store/reducers/userSlice';

const Layout: React.FC = () => {
  const isUserPending = useAppSelector((state) => state.user.isPending);
  const isColumnsPending = useAppSelector((state) => state.board.isPending);
  const isTasksPending = useAppSelector((state) => state.column.isPending);
  const isTokenExpired = useAppSelector((state) => state.user.isTokenExpired);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTokenExpired) {
      dispatch(setIsAuthorised(false));
      dispatch(setIsRoutesProtected(false));
      dispatch(setIsTokenRequireUpdate(true));
    }
  }, [dispatch, isTokenExpired]);

  useEffect(() => {
    isUserPending || isColumnsPending || isTasksPending
      ? scrollController.disableScroll()
      : scrollController.enableScroll();
  }, [isUserPending, isColumnsPending]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      {(isUserPending || isColumnsPending || isTasksPending) && <Loader />}
    </div>
  );
};

export default Layout;
