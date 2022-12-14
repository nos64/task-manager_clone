import React, { InputHTMLAttributes } from 'react';
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
  symbolsLimit: number;
}

const InputLineText: React.FC<IInputLineProps> = ({
  inputName,
  label,
  placeholder,
  register,
  fieldValue,
  symbolsLimit,
}) => (
  <>
    <div className={styles.inputWrapper}>
      <input
        className={styles.inputLine}
        type="text"
        {...register(inputName, {
          required: 'Required',
          minLength: {
            value: symbolsLimit,
            message: '',
          },
        })}
        placeholder={placeholder}
        autoComplete="off"
      />
      <label className={!fieldValue.length ? styles.labelLine : styles.labelLineTop}>{label}</label>
    </div>
  </>
);

export default InputLineText;
