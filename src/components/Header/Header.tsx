import React from 'react';
import style from './Header.module.scss';

const Header = () => {
  return (
    <>
      <button className={style.button}>Header</button>
      <div className={style.task}>
        <input className={style.input} type="text" />
      </div>
    </>
  );
};

export default Header;
