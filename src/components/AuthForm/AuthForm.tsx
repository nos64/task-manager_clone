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
import { useTranslation } from 'react-i18next';

const AuthForm = () => {
  const dispatch = useAppDispatch();

  const isAuthPage = useCurrentPage();

  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fileldsValues, setFieldsValues] = useState<Partial<IUser>>({});

  const { t } = useTranslation();

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
            label={t('profileName')}
            placeholder={t('namePlaceholder')}
            register={register}
            fieldValue={fileldsValues.name || ''}
            symbolsLimit={2}
          />
          <ValidationErrorMessage
            message={errors.name && (t('twoSymbolsValidationMessage') || '')}
          />
        </>
      )}
      <InputLineText
        inputName={'login'}
        label={t('profileLogin')}
        placeholder={t('loginPlaceholder')}
        register={register}
        fieldValue={fileldsValues.login || ''}
        symbolsLimit={2}
      />
      <ValidationErrorMessage message={errors.login && (t('twoSymbolsValidationMessage') || '')} />
      <InputLinePassword
        inputName={'password'}
        label={t('passwordLabel')}
        register={register}
        fieldValue={fileldsValues.password || ''}
        placeholder={t('passwordPlaceholder') || ''}
      />
      <ValidationErrorMessage
        message={errors.password && (t('sixSymbolsValidationMessage') || '')}
      />
      <button className={styles.button} disabled={isSubmitBtnDisabled}>
        {isAuthPage ? t('signUp') : t('signIn')}
      </button>
    </form>
  );
};

export default AuthForm;
