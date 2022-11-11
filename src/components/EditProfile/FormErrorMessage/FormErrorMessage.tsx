import React from 'react';
import style from './FormErrorMessage.module.scss';

interface Props {
  message?: string;
}

const FormErrorMessage = ({ message }: Props) => {
  return <div className={style.errorMessage}>{message}</div>;
};

export default FormErrorMessage;
