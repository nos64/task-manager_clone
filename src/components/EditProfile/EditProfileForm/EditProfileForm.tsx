import React, { useEffect, useState } from 'react';
import styles from './EditProfileForm.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import ValidationErrorMessage from '../../ValidationErrorMessage';
import InputLinePassword from 'components/InputLinePassword';
import InputLineText from 'components/InputLineText';
import IUser from 'types/IUser';
import FormButtons from 'components/FormButtons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import IAvatar from 'types/IAvatar';
import { setAvatarId, updateUserInfo } from 'store/reducers/userSlice';
import { useTranslation } from 'react-i18next';

interface EditProfileFormProps {
  currentAvatar: IAvatar;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ currentAvatar }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    setValue,
  } = useForm<Partial<IUser>>();

  const [fileldsValues, setFieldsValues] = useState<Partial<IUser>>({});

  const userName = useAppSelector((state) => state.user.name);
  const userLogin = useAppSelector((state) => state.user.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue('name', userName);
    setValue('login', userLogin);

    setFieldsValues({
      name: userName,
      login: userLogin,
    });
  }, [setValue, userName, userLogin]);

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

  const onSubmit = (data: Partial<IUser>) => {
    const avatarID = currentAvatar.id;
    const options = {
      name: data.name || '',
      login: data.login || '',
      password: data.password || '',
    };

    dispatch(setAvatarId(avatarID));
    dispatch(updateUserInfo(options));

    setValue('password', '');
    setFieldsValues({ ...data, password: '' });
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.titleWrapper}>
        <FaUserEdit className={styles.titleImg} size={25} />
        <h2 className={styles.profileTitle}>{t('profileTitle')}</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
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
