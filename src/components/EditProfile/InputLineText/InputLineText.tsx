import React, { useState } from 'react';
import styles from './InputLineText.module.scss';

interface IInputLineProps {
  label: string;
  placeholder: string;
}
const InputLineText: React.FC<IInputLineProps> = ({ label, placeholder }) => {
  const [value, setValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.inputLine}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <label className={!value.length ? styles.labelLine : styles.labelLineTop}>{label}</label>
    </div>
  );
};

export default InputLineText;
