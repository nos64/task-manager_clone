import React from 'react';
import style from './Container.module.scss';

export interface IChildrenProps {
  children?: React.ReactNode;
}

const Container = (props: IChildrenProps) => {
  return <div className={style.container}>{props.children}</div>;
};

export default Container;
