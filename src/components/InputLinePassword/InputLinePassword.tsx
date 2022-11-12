import React, { InputHTMLAttributes, useState } from 'react';
import styles from './InputLinePassword.module.scss';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { FieldValues, UseFormRegister } from 'react-hook-form';
interface IInputLineProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
  label: string;
  register: UseFormRegister<FieldValues>;
}

const InputLinePassword: React.FC<IInputLineProps> = ({ inputName, label, register }) => {
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
        {...register(inputName, {
          pattern: {
            value: /[A-Za-z0-9]{6}/,
            message: 'Min 6 symbols',
          },
        })}
        autoComplete="off"
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
