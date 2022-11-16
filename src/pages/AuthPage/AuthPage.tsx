import { ROUTES } from 'common/routes';
import AuthForm from 'components/AuthForm';
import { useAppSelector } from 'hooks/redux';
import useCurrentPage from 'hooks/useCurrentPage';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';

const AuthPage = () => {
  const isPending = useAppSelector((state) => state.user.isPending);

  const navigate = useNavigate();

  const isAuthPage = useCurrentPage();

  const switchPage = () => {
    isAuthPage ? navigate(ROUTES.SIGN_IN) : navigate(ROUTES.SIGN_UP);
  };

  const title = isAuthPage ? 'Create new account' : 'Already with us?';
  const subtitle = isAuthPage ? 'Sign up to Task Manager' : 'Sign in to Task Manager';
  const switcherText = isAuthPage ? 'Already with us? ' : 'No account? ';

  return (
    <div className={styles.wrapper}>
      <section className={styles.authorisation}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.subtitle}>{subtitle}</div>
        <AuthForm />
        <div className={styles.formSwitcher}>
          {switcherText}
          <span className={styles.navigateTo} onClick={switchPage}>
            {isAuthPage ? 'Sign in!' : 'Sign up!'}{' '}
          </span>
        </div>
      </section>
      {isPending && 'Loading...'}
    </div>
  );
};

export default AuthPage;
