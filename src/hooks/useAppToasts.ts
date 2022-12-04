import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { toast } from 'react-toastify';
import styles from '../styles/toasts.module.scss';
import { setIsInexistentBoard } from 'store/reducers/boardsSlice';
import { useTranslation } from 'react-i18next';
import {
  setIsLoginAlreadyExists,
  setIsProfileChanged,
  setIsTokenRequireUpdate,
} from 'store/reducers/userSlice';
import { setIsInexistentColumn } from 'store/reducers/boardSlice';

const useAppToasts = () => {
  const isLoginAlreadyExist = useAppSelector((state) => state.user.isLoginAlreadyExists);
  const isAuthorisationError = useAppSelector((state) => state.user.isAuthorisationError);
  const isTokenRequireUpdate = useAppSelector((state) => state.user.isTokenRequireUpdate);
  const isProfileUpdated = useAppSelector((state) => state.user.isProfileUpdated);
  const isProfileDeleted = useAppSelector((state) => state.user.isProfileDeleted);
  const isInexistentBoard = useAppSelector((state) => state.boards.isInexistentBoard);
  const isInexistentColumn = useAppSelector((state) => state.board.isInexistentColumn);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (isLoginAlreadyExist || isAuthorisationError || isInexistentBoard || isInexistentColumn) {
      let message = '';

      if (isLoginAlreadyExist) {
        message = t('loginAlreadyExists');
        dispatch(setIsLoginAlreadyExists());
      }
      if (isAuthorisationError) message = t('wrongLoginOrPassword');
      if (isInexistentBoard) {
        message = t('inexistentBoard');
        dispatch(setIsInexistentBoard());
      }

      if (isInexistentColumn) {
        message = t('inexistentBoard');
        dispatch(setIsInexistentColumn());
      }

      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessage,
        progressClassName: styles.toastProgressBar,
      });
    }
  }, [
    isLoginAlreadyExist,
    isAuthorisationError,
    isInexistentBoard,
    isInexistentColumn,
    dispatch,
    t,
  ]);

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

  // useEffect(() => {
  //   // fill if with your flags
  //   if ('your flags === true') {
  //     // Write logic for

  //     toast.error(t('removedElement'), {
  //       position: toast.POSITION.TOP_CENTER,
  //       theme: 'dark',
  //       className: styles.toastMessage,
  //       progressClassName: styles.toastProgressBar,
  //     });

  //     // set you flags values to "false"
  //     dispatch();
  //   }
  //   // add your flags to deps
  // }, [dispatch, t]);
};

export default useAppToasts;
