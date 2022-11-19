import { useAppDispatch } from 'hooks/redux';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInUser, signUpUser } from 'store/reducers/userSlice';
import styles from './AuthForm.module.scss';
import IUser from 'types/IUsser';
import useCurrentPage from 'hooks/useCurrentPage';
import InputLineText from 'components/InputLineText';
import ValidationErrorMessage from 'components/ValidationErrorMessage';
import InputLinePassword from 'components/InputLinePassword';

const AuthForm = () => {
  const dispatch = useAppDispatch();

  const isAuthPage = useCurrentPage();

  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fileldsValues, setFieldsValues] = useState<Partial<IUser>>({});

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Partial<IUser>>();

  const onSubmit = (data: Partial<IUser>) => {
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

  const checkErrors = useCallback(async () => {
    if (hasError) {
      const result = await trigger();
      setIsSubmitBtnDisabled(!result);
    }
  }, [hasError, trigger]);

  const onChange = async () => {
    if (!hasError) {
      setIsSubmitBtnDisabled(false);
    } else {
      await checkErrors();
    }

    const currentFieldsValues = getValues();
    setFieldsValues(currentFieldsValues);
  };

  const onError = () => {
    setHasError(true);
    setIsSubmitBtnDisabled(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)} onChange={onChange}>
      {isAuthPage && (
        <>
          <InputLineText
            inputName={'name'}
            label={'Name'}
            placeholder={'Enter your name'}
            register={register}
            fieldValue={fileldsValues.name || ''}
            symbolsLimit={2}
          />
          <ValidationErrorMessage message={errors.name && 'Min 2 symbols'} />
        </>
      )}
      <InputLineText
        inputName={'login'}
        label={'Login'}
        placeholder={'Enter your login'}
        register={register}
        fieldValue={fileldsValues.login || ''}
        symbolsLimit={2}
      />
      <ValidationErrorMessage message={errors.login && 'Min 2 symbols'} />
      <InputLinePassword
        inputName={'password'}
        label={'Password'}
        register={register}
        fieldValue={fileldsValues.password || ''}
      />
      <ValidationErrorMessage message={errors.password && 'Required, min 6 symbols'} />
      <button className={styles.button} disabled={isSubmitBtnDisabled}>
        {isAuthPage ? 'Sign up' : 'Sign in'}
      </button>
    </form>
  );
};

export default AuthForm;
