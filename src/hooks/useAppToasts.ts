import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { toast } from 'react-toastify';
import styles from '../styles/toasts.module.scss';
import { setIsInexistentBoard } from 'store/reducers/boardsSlice';

const useAppToasts = () => {
  const isLoginAlreadyExist = useAppSelector((state) => state.user.isLoginAlreadyExist);
  const isAuthorisationError = useAppSelector((state) => state.user.isAuthorisationError);
  const isTokenRequireUpdate = useAppSelector((state) => state.user.isTokenRequireUpdate);
  const isProfileUpdated = useAppSelector((state) => state.user.isProfileUpdated);
  const isProfileDeleted = useAppSelector((state) => state.user.isProfileDeleted);
  const isInexistentBoard = useAppSelector((state) => state.boards.isInexistentBoard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoginAlreadyExist || isAuthorisationError) {
      const message = isLoginAlreadyExist ? 'Login already exists' : 'Wrong login or password';

      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessage,
        progressClassName: styles.toastProgressBar,
      });
    }
  }, [isLoginAlreadyExist, isAuthorisationError]);

  useEffect(() => {
    if (isInexistentBoard) {
      dispatch(setIsInexistentBoard());

      toast.error(`Can't find board with this id`, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessage,
        progressClassName: styles.toastProgressBar,
      });
    }
  }, [dispatch, isInexistentBoard]);

  useEffect(() => {
    if (isTokenRequireUpdate) {
      toast.warning('Invalid token. Please sign in again', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessageWarning,
        progressClassName: styles.toastProgressBarWarning,
      });
    }
  }, [isTokenRequireUpdate]);

  useEffect(() => {
    if (isProfileUpdated) {
      toast.success('Profile updated successfully', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessageSuccess,
        progressClassName: styles.toastProgressBarSuccess,
      });
    }
  }, [isProfileUpdated]);

  useEffect(() => {
    if (isProfileDeleted) {
      toast.success('Profile deleted successfully', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessageSuccess,
        progressClassName: styles.toastProgressBarSuccess,
      });
    }
  }, [isProfileDeleted]);
};

export default useAppToasts;
