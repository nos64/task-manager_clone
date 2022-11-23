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
import { getBoardsByUserId } from 'store/reducers/boardsSlice';

const Layout: React.FC = () => {
  const isUserPending = useAppSelector((state) => state.user.isPending);
  const isBoardsPending = useAppSelector((state) => state.boards.isPending);
  const isColumnsPending = useAppSelector((state) => state.board.isPending);
  const isTokenExpired = useAppSelector((state) => state.user.isTokenExpired);
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const boards = useAppSelector((state) => state.boards.boards);
  const userID = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorised && !boards.length) {
      dispatch(getBoardsByUserId(userID));
    }
  }, [boards.length, dispatch, isAuthorised, userID]);

  useEffect(() => {
    if (isTokenExpired) {
      dispatch(setIsAuthorised(false));
      dispatch(setIsRoutesProtected(false));
      dispatch(setIsTokenRequireUpdate(true));
    }
  }, [dispatch, isTokenExpired]);

  useEffect(() => {
    isUserPending || isColumnsPending
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

      {(isUserPending || isBoardsPending || isColumnsPending) && <Loader />}
    </div>
  );
};

export default Layout;
