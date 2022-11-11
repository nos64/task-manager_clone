import React, { useState } from 'react';
import styles from './InputLineText.module.scss';

interface IInputLineProps {
  inputName: string;
  label: string;
  placeholder: string;
  onFocus: (inputName: string) => void;
}
const InputLineText: React.FC<IInputLineProps> = ({ inputName, label, placeholder, onFocus }) => {
  const [value, setValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        name={inputName}
        className={styles.inputLine}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange}
        onFocus={() => onFocus(inputName)}
      />
      <label className={!value.length ? styles.labelLine : styles.labelLineTop}>{label}</label>
    </div>
  );
};

export default InputLineText;
