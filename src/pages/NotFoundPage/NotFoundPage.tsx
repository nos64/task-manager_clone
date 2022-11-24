import { ROUTES } from 'common/routes';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import sytles from './NotFoundPage.module.scss';

// Was inspired by https://codepen.io/kylelavery88/pen/VawWov
const NotFoundPage = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  const handleHomeBtnClick = () => {
    isAuthorised ? navigate(ROUTES.BOARDS) : navigate(ROUTES.WELCOME);
  };

  return (
    <div className={sytles.wrapper}>
      <div className={sytles.content}>
        <h2 className={sytles.title}>{t('hmm')}.</h2>
        <p className={sytles.description}>{t('notfoundPageMessage')}.</p>
        <div className={sytles.btnsContainer}>
          <button className={sytles.button} type="button" onClick={handleBackBtnClick}>
            {t('toPreviousPage')}
          </button>
          <button className={sytles.button} type="button" onClick={handleHomeBtnClick}>
            {t('home')}
          </button>
        </div>
        <p className={sytles.text}>{t('help')}</p>
      </div>
      <div className={sytles.space}>
        <div className={sytles.blackhole}></div>
        <div className={sytles.ship}></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
