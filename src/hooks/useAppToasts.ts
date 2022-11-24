import { useEffect } from 'react';
import { useAppSelector } from './redux';
import { toast } from 'react-toastify';
import styles from '../styles/toasts.module.scss';

const useAppToasts = () => {
  const isLoginAlreadyExist = useAppSelector((state) => state.user.isLoginAlreadyExist);
  const isAuthorisationError = useAppSelector((state) => state.user.isAuthorisationError);
  const isTokenRequireUpdate = useAppSelector((state) => state.user.isTokenRequireUpdate);
  const isProfileUpdated = useAppSelector((state) => state.user.isProfileUpdated);
  const isProfileDeleted = useAppSelector((state) => state.user.isProfileDeleted);

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
