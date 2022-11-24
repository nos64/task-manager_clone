import React, { useState } from 'react';
import styles from './EditProfileForm.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import ValidationErrorMessage from '../../ValidationErrorMessage';
import InputLinePassword from 'components/InputLinePassword';
import InputLineText from 'components/InputLineText';
import IUser from 'types/IUser';
import FormButtons from 'components/FormButtons';
import { useTranslation } from 'react-i18next';

const EditProfileForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<Partial<IUser>>();

  const [fileldsValues, setFieldsValues] = useState<Partial<IUser>>({});

  const { t } = useTranslation();

  const onChange = () => {
    const currentFieldsValues = getValues();

    setFieldsValues(currentFieldsValues);
  };

  const onReset = () => {
    setFieldsValues({});
    reset({
      name: '',
      login: '',
      password: '',
    });
  };

  const handlerSubmitForm: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.titleWrapper}>
        <FaUserEdit size={25} />
        <h2>{t('profileTitle')}</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(handlerSubmitForm)} onChange={onChange}>
        <InputLineText
          inputName={'name'}
          label={t('profileName')}
          placeholder={t('newNamePlaceholder')}
          register={register}
          fieldValue={fileldsValues.name || ''}
          symbolsLimit={2}
        />
        <ValidationErrorMessage message={errors.name && (t('twoSymbolsValidationMessage') || '')} />
        <InputLineText
          inputName={'login'}
          label={t('profileLogin')}
          placeholder={t('newLoginPlaceholder')}
          register={register}
          fieldValue={fileldsValues.login || ''}
          symbolsLimit={2}
        />
        <ValidationErrorMessage
          message={errors.login && (t('twoSymbolsValidationMessage') || '')}
        />
        <InputLinePassword
          inputName={'password'}
          label={t('newPasswordLabel')}
          register={register}
          fieldValue={fileldsValues.password || ''}
          placeholder={t('newPasswordPlaceholder') || ''}
        />
        <ValidationErrorMessage
          message={errors.password && (t('sixSymbolsValidationMessage') || '')}
        />
        <FormButtons handleCancelBtnClick={onReset} acceptBtnTitle={t('updateButton')} />
      </form>
    </div>
  );
};

export default EditProfileForm;
