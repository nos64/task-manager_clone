import React from 'react';
import styles from './Container.module.scss';

export interface IChildrenProps {
  children?: React.ReactNode;
}

const Container = (props: IChildrenProps) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Container;
