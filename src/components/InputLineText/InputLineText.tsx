import React, { InputHTMLAttributes, useState } from 'react';
import styles from './InputLineText.module.scss';
import { DeepMap, FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> = DeepMap<
  TFieldValues,
  FieldError
>;

interface IInputLineProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}

const InputLineText: React.FC<IInputLineProps> = ({ inputName, label, placeholder, register }) => {
  const [value, setValue] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          className={styles.inputLine}
          type="text"
          {...register(inputName, {
            required: 'Required',
            minLength: {
              value: 2,
              message: 'Min 2 symbols',
            },
          })}
          placeholder={placeholder}
          autoComplete="off"
          onChange={handleChange}
        />
        <label className={!value.length ? styles.labelLine : styles.labelLineTop}>{label}</label>
      </div>
    </>
  );
};

export default InputLineText;
