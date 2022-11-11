import React from 'react';
import style from './FormErrorMessage.module.scss';

interface Props {
  message?: string;
}

const FormErrorMessage = ({ message }: Props) => {
  return (
    <div className={style.errorMessage} style={{ color: `${message ? '#fc4c4c' : 'transparent'}` }}>
      {message}
    </div>
  );
};

export default FormErrorMessage;
