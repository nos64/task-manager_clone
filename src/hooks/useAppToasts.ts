import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { toast } from 'react-toastify';
import styles from '../styles/toasts.module.scss';
import { setIsInexistentBoard } from 'store/reducers/boardsSlice';
import { useTranslation } from 'react-i18next';
import { setIsProfileChanged, setIsTokenRequireUpdate } from 'store/reducers/userSlice';

const useAppToasts = () => {
  const isLoginAlreadyExist = useAppSelector((state) => state.user.isLoginAlreadyExist);
  const isAuthorisationError = useAppSelector((state) => state.user.isAuthorisationError);
  const isTokenRequireUpdate = useAppSelector((state) => state.user.isTokenRequireUpdate);
  const isProfileUpdated = useAppSelector((state) => state.user.isProfileUpdated);
  const isProfileDeleted = useAppSelector((state) => state.user.isProfileDeleted);
  const isInexistentBoard = useAppSelector((state) => state.boards.isInexistentBoard);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (isLoginAlreadyExist || isAuthorisationError || isInexistentBoard) {
      let message = '';

      if (isLoginAlreadyExist) message = t('loginAlreadyExists');
      if (isAuthorisationError) message = t('wrongLoginOrPassword');
      if (isInexistentBoard) {
        message = t('inexistentBoard');
        dispatch(setIsInexistentBoard());
      }

      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessage,
        progressClassName: styles.toastProgressBar,
      });
    }
  }, [isLoginAlreadyExist, isAuthorisationError, isInexistentBoard, dispatch, t]);

  useEffect(() => {
    if (isTokenRequireUpdate) {
      toast.warning(t('invalidToken'), {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessageWarning,
        progressClassName: styles.toastProgressBarWarning,
      });

      dispatch(setIsTokenRequireUpdate(false));
    }
  }, [dispatch, t, isTokenRequireUpdate]);

  useEffect(() => {
    if (isProfileUpdated || isProfileDeleted) {
      const message = isProfileUpdated ? t('successfulUpdate') : t('successfulDelet');

      dispatch(setIsProfileChanged());

      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessageSuccess,
        progressClassName: styles.toastProgressBarSuccess,
      });
    }
  }, [isProfileUpdated, isProfileDeleted, t, dispatch]);
};

export default useAppToasts;
