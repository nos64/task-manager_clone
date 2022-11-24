import { ROUTES } from 'common/routes';
import AuthForm from 'components/AuthForm';
import useCurrentPage from 'hooks/useCurrentPage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';

const AuthPage = () => {
  const navigate = useNavigate();

  const isAuthPage = useCurrentPage();

  const { t } = useTranslation();

  const switchPage = () => {
    isAuthPage ? navigate(ROUTES.SIGN_IN) : navigate(ROUTES.SIGN_UP);
  };

  const title = isAuthPage ? t('createNewAccount') : `${t('alreadyWithUs')}?`;
  const subtitle = isAuthPage ? t('signUpMessage') : t('signInMessage');
  const switcherText = isAuthPage
    ? `${t('authPageSwitcherRegistred')}? `
    : `${t('authPageSwitcherNew')}? `;

  return (
    <div className={styles.wrapper}>
      <section className={styles.authorisation}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.subtitle}>{subtitle}</div>
        <AuthForm />
        <div className={styles.formSwitcher}>
          {switcherText}
          <span className={styles.navigateTo} onClick={switchPage}>
            {isAuthPage ? t('signIn') : t('signUp')}
          </span>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
