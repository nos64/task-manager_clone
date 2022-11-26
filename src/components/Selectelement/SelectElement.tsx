import React, { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import IColumn from 'types/IColumn';
import IUser from 'types/IUsser';
import styles from './SelectElement.module.scss';

interface IInputLineProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  fieldValue: string | string[];
  options: Partial<IColumn & IUser>[];
  type: 'status' | 'users';
}

const SelectElement: React.FC<IInputLineProps> = ({
  inputName,
  label,
  register,
  fieldValue,
  options,
  type,
}) => {
  return (
    <>
      <div className={styles.inputWrapper}>
        <select className={styles.select} {...register(inputName)}>
          <option hidden disabled value={''}></option>
          {options.map((option) => (
            <option value={option?._id} key={option?._id}>
              {type === 'users' ? option.name : option.title}
            </option>
          ))}
        </select>
        <label className={!fieldValue.length ? styles.labelLine : styles.labelLineTop}>
          {label}
        </label>
      </div>
    </>
  );
};

export default SelectElement;
