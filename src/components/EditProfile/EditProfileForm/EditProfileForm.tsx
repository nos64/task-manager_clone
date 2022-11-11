import React, { useState } from 'react';
import styles from './EditProfileForm.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormErrorMessage from '../FormErrorMessage';

type FormValues = {
  userName: string;
  userLogin: string;
  password: string;
};

const errorMessagesText = {
  userName: 'Please enter correct Name',
  userLogin: 'Please enter correct Login',
  password: 'Min Length 6 symbols',
};

const EditProfileForm = () => {
  const [isClicked, setIsClicked] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const handleBtnClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };

  const handlerSubmitForm: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.titleWrapper}>
        <FaUserEdit size={25} />
        <h1>Edit your profile</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(handlerSubmitForm)}>
        <div className={styles.inputWrapper}>
          <input
            {...register('userName', {
              pattern: {
                value: /^[a-zA-Zа-яА-яА-Я]{2}/,
                message: 'Min 2 letters',
              },
            })}
            className={styles.inputLine}
            type="text"
            placeholder="Enter new name"
            autoComplete="off"
          />
          <label className={register('userName') ? styles.labelLine : styles.labelLineTop}>
            UserName
          </label>
          {errors?.userName ? (
            <FormErrorMessage message={errors?.userName?.message} />
          ) : (
            <FormErrorMessage />
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            {...register('userLogin', {
              pattern: {
                value: /[a-zA-Zа-яА-яА-Я0-9]{4}/,
                message: 'Min 4 letters',
              },
            })}
            className={styles.inputLine}
            type="text"
            placeholder="Enter new Login"
            autoComplete="off"
          />
          <label className={!register('userLogin') ? styles.labelLine : styles.labelLineTop}>
            UserLogin
          </label>
          {errors?.userLogin ? (
            <FormErrorMessage message={errors?.userLogin?.message} />
          ) : (
            <FormErrorMessage />
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            {...register('password', {
              pattern: {
                value: /[a-zA-Zа-яА-яА-Я0-9]{6}/,
                message: 'Min 4 letters',
              },
            })}
            className={styles.inputLine}
            autoComplete="off"
            type={!isClicked ? 'password' : 'text'}
          />
          <label className={!register('password') ? styles.labelLine : styles.labelLineTop}>
            New Password
          </label>
          {errors?.password ? (
            <FormErrorMessage message={errors?.password?.message} />
          ) : (
            <FormErrorMessage />
          )}
          <button className={styles.showPassword} onClick={handleBtnClick}>
            {!isClicked ? (
              <FaEyeSlash size={20} color={'#E1E1E1'} />
            ) : (
              <FaEye size={20} color={'#E1E1E1'} />
            )}
          </button>
        </div>
        <div className={styles.buttonsWrapper}>
          <button className={styles.submitBtn} type="submit">
            UPDATE
          </button>
          <button className={styles.canselBtn}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
