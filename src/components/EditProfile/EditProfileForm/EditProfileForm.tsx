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
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue('name', userName);
    setValue('login', userLogin);

    setFieldsValues({
      name: userName,
      login: userLogin,
    });
  }, [setValue, userName, userLogin]);

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
    const userInfo = JSON.parse(localStorage.getItem(userId) || '');
    const avatarID = currentAvatar.id;
    const options = {
      name: data.name || '',
      login: data.login || '',
      password: data.password || '',
    };

    localStorage.setItem(userId, JSON.stringify({ ...userInfo, ...{ avatarID } }));
    dispatch(setAvatarId(avatarID));
    dispatch(updateUserInfo(options));
    // displaying errors on type after submit
    setValue('password', '');
    setFieldsValues({ ...data, password: '' });
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.titleWrapper}>
        <FaUserEdit size={25} />
        <h2>Edit your profile</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
        <InputLineText
          inputName={'name'}
          label={'Name'}
          placeholder={'Enter new name'}
          register={register}
          fieldValue={fileldsValues.name || ''}
          symbolsLimit={2}
        />
        <ValidationErrorMessage message={errors.name && 'Min 2 symbols'} />
        <InputLineText
          inputName={'login'}
          label={'Login'}
          placeholder={'Enter new Login'}
          register={register}
          fieldValue={fileldsValues.login || ''}
          symbolsLimit={2}
        />
        <ValidationErrorMessage message={errors.login && 'Min 2 symbols'} />
        <InputLinePassword
          inputName={'password'}
          label={'New Password'}
          register={register}
          fieldValue={fileldsValues.password || ''}
        />
        <ValidationErrorMessage message={errors.password && 'Required, min 6 symbols'} />
        <FormButtons handleCancelBtnClick={onReset} acceptBtnTitle={'Update'} />
      </form>
    </div>
  );
};

export default EditProfileForm;
