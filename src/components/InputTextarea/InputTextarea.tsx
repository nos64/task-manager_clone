import React, { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './InputTextarea.module.scss';

interface InputTextareaProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  fieldValue: string;
  symbolsLimit: number;
}

const InputTextarea: React.FC<InputTextareaProps> = ({
  inputName,
  label,
  placeholder,
  register,
  fieldValue,
  symbolsLimit,
}) => (
  <>
    <div className={styles.inputWrapper}>
      <textarea
        className={styles.inputTextarea}
        {...register(inputName, {
          maxLength: {
            value: symbolsLimit,
            message: '',
          },
        })}
        placeholder={placeholder}
        rows={7}
      ></textarea>
      <label className={!fieldValue.length ? styles.labelLine : styles.labelLineTop}>{label}</label>
    </div>
  </>
);

export default InputTextarea;
