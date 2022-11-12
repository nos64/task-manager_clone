import React, { InputHTMLAttributes, useState } from 'react';
import styles from './InputLineText.module.scss';
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import FormErrorMessage from 'components/EditProfile/FormErrorMessage';
interface IInputLineProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}

const InputLineText: React.FC<IInputLineProps> = ({ inputName, label, placeholder, register }) => {
  const [value, setValue] = useState('');
  const {
    formState: { errors },
  } = useForm<FieldValues>();

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
        {...register(inputName, {
          pattern: {
            value: /[a-zA-Zа-яА-яА-Я0-9]{2}/,
            message: 'Min 2 symbols',
          },
        })}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange}
      />
      <label className={!value.length ? styles.labelLine : styles.labelLineTop}>{label}</label>
    </div>
  );
};

export default InputLineText;
