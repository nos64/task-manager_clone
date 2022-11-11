import React, { useState } from 'react';
import styles from './EditProfileForm.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import InputLineText from '../InputLineText';
import InputLinePassword from '../InputLinePassword';
import FormErrorMessage from '../FormErrorMessage';

interface IFormError {
  userName: string;
  userLogin: string;
  password: string;
}

type FormFields = {
  userName: HTMLInputElement;
  userLogin: HTMLInputElement;
  password: HTMLInputElement;
};

const errorMessagesText = {
  userName: 'Please enter correct Name',
  userLogin: 'Please enter correct Login',
  password: 'Min Length 6 symbols',
};

const EditProfileForm = () => {
  const [errors, setErrors] = useState<Partial<IFormError>>({});

  const handleSubmit: React.FocusEventHandler<HTMLFormElement & FormFields> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { userName, userLogin, password } = form;

    const validateForm = () => {
      let isValidForm = true;
      const errorMessage: Partial<IFormError> = {};
      if (userName && !/^[a-zA-Zа-яА-яА-Я]+$/.test(userName.value)) {
        isValidForm = false;
        errorMessage.userName = errorMessagesText.userName;
      }
      if (userLogin && !/^[a-z][a-z0-9]*?([-_][a-z0-9]+){0,2}$/i.test(userLogin.value)) {
        isValidForm = false;
        errorMessage.userLogin = errorMessagesText.userLogin;
      }
      if (password && password.value.length < 6) {
        isValidForm = false;
        errorMessage.password = errorMessagesText.password;
      }
      setErrors(errorMessage);
      if (isValidForm) {
        setErrors(errors);
      }
      return isValidForm;
    };

    if (!validateForm()) {
      return;
    }
    if (userName && userLogin && password) {
      const userFormObj = {
        userName: userName.value,
        userLogin: userLogin.value,
        password: password.value,
      };
      console.log(userFormObj);
    }
  };

  const resetErrorOnFocus = (input: string) => {
    setErrors({
      ...errors,
      [input]: '',
    });
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.titleWrapper}>
        <FaUserEdit size={25} />
        <h1>Edit your profile</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputLineText
          onFocus={() => resetErrorOnFocus('userName')}
          inputName={'userName'}
          label={'UserName'}
          placeholder={'Enter new name'}
        />
        <FormErrorMessage message={errors.userName} />
        <InputLineText
          onFocus={() => resetErrorOnFocus('userLogin')}
          inputName={'userLogin'}
          label={'UserLogin'}
          placeholder={'Enter new Login'}
        />
        <FormErrorMessage message={errors.userLogin} />
        <InputLinePassword
          onFocus={() => resetErrorOnFocus('password')}
          inputName={'password'}
          label={'New Password'}
        />
        <FormErrorMessage message={errors.password} />
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
