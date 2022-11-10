import React, { useState } from 'react';
import styles from './InputLinePassword.module.scss';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
interface IInputLineProps {
  label: string;
}
const InputLinePassword: React.FC<IInputLineProps> = ({ label }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState('');

  const handleBtnClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.inputLine}
        type={!isClicked ? 'password' : 'text'}
        onChange={handleChange}
      />
      <label className={!value.length ? styles.labelLine : styles.labelLineTop}>{label}</label>
      <button className={styles.showPassword} onClick={handleBtnClick}>
        {!isClicked ? (
          <FaEyeSlash size={20} color={'#E1E1E1'} />
        ) : (
          <FaEye size={20} color={'#E1E1E1'} />
        )}
      </button>
    </div>
  );
};

export default InputLinePassword;
