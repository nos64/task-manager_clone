import { useAppDispatch } from 'hooks/redux';
import React from 'react';
import { useForm } from 'react-hook-form';
import { signInUser, signUpUser } from 'store/reducers/userSlice';
import styles from './AuthForm.module.scss';
import IUser from 'types/IUsser';
import useCurrentPage from 'hooks/useCurrentPage';

const AuthForm = () => {
  const dispatch = useAppDispatch();

  const isAuthPage = useCurrentPage();

  const { register, handleSubmit, getValues } = useForm<Partial<IUser>>();

  const onChange = () => {};

  const onSubmit = () => {
    const data = getValues();

    if (isAuthPage) {
      const options = {
        name: data.name || '',
        login: data.login || '',
        password: data.password || '',
      };

      dispatch(signUpUser(options));
    } else {
      const options = {
        login: data.login || '',
        password: data.password || '',
      };

      dispatch(signInUser(options));
    }
  };

  const onError = () => {};

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)} onChange={onChange}>
      {isAuthPage && (
        <input
          id="user-name"
          className={`${styles.userName}`}
          {...register('name', {
            required: true,
          })}
        />
      )}
      <input
        id="user-login"
        className={`${styles.userLogin}`}
        {...register('login', {
          required: true,
        })}
      />
      <input
        id="user-password"
        className={`${styles.userPassword}`}
        {...register('password', {
          required: true,
        })}
      />
      <button className={styles.button} type="button" onClick={onSubmit}>
        {isAuthPage ? 'Sign up' : 'Sign in'}
      </button>
    </form>
  );
};

export default AuthForm;
