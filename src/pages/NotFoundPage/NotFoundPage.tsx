import { ROUTES } from 'common/routes';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import sytles from './NotFoundPage.module.scss';

// Was inspired by https://codepen.io/kylelavery88/pen/VawWov
const NotFoundPage = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);

  const navigate = useNavigate();

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  const handleHomeBtnClick = () => {
    isAuthorised ? navigate(ROUTES.BOARDS) : navigate(ROUTES.WELCOME);
  };

  return (
    <div className={sytles.wrapper}>
      <div className={sytles.content}>
        <h1 className={sytles.title}>Hmm.</h1>
        <p className={sytles.description}>
          It seems that you&apos;re lost in a perpetual black hole. Let us help guide you out and
          get you back home.
        </p>
        <div className={sytles.btnsContainer}>
          <button className={sytles.button} type="button" onClick={handleBackBtnClick}>
            back
          </button>
          <button className={sytles.button} type="button" onClick={handleHomeBtnClick}>
            home
          </button>
        </div>
        <p className={sytles.text}>Help me out</p>
      </div>
      <div className={sytles.space}>
        <div className={sytles.blackhole}></div>
        <div className={sytles.ship}></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
