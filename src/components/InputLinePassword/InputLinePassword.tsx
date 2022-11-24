import React, { InputHTMLAttributes, useState } from 'react';
import styles from './InputLinePassword.module.scss';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IInputLineProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  fieldValue: string;
}

const InputLinePassword: React.FC<IInputLineProps> = ({
  inputName,
  label,
  register,
  fieldValue,
  placeholder,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleBtnClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.inputLine}
        {...register(inputName, {
          required: 'Required',
          minLength: {
            value: 6,
            message: 'Min 6 symbols',
          },
        })}
        autoComplete="off"
        type={!isClicked ? 'password' : 'text'}
        placeholder={placeholder}
      />
      <label className={!fieldValue.length ? styles.labelLine : styles.labelLineTop}>{label}</label>
      <button className={styles.showPassword} type="button" onClick={handleBtnClick}>
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
