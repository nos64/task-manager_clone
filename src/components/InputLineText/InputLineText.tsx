import React, { InputHTMLAttributes, useEffect, useState } from 'react';
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
  fieldValue: string;
}

const InputLineText: React.FC<IInputLineProps> = ({
  inputName,
  label,
  placeholder,
  register,
  fieldValue,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(fieldValue);
  }, [fieldValue]);

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
        />
        <label className={!value.length ? styles.labelLine : styles.labelLineTop}>{label}</label>
      </div>
    </>
  );
};

export default InputLineText;
