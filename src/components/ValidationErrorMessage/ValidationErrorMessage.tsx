import React from 'react';
import style from './ValidationErrorMessage.module.scss';

interface Props {
  message?: string;
}

const ValidationErrorMessage = ({ message }: Props) => {
  return <div className={style.errorMessage}>{message}</div>;
};

export default ValidationErrorMessage;
