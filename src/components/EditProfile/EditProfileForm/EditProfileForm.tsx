import React, { useState } from 'react';
import styles from './EditProfileForm.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import ValidationErrorMessage from '../../ValidationErrorMessage';
import InputLinePassword from 'components/InputLinePassword';
import InputLineText from 'components/InputLineText';
import IUser from 'types/IUser';
import FormButtons from 'components/FormButtons';

const EditProfileForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<Partial<IUser>>();

  const [fileldsValues, setFieldsValues] = useState<Partial<IUser>>({});

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
        <h2>Edit your profile</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(handlerSubmitForm)} onChange={onChange}>
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
        <FormButtons handleCancelBtnClick={onReset} />
      </form>
    </div>
  );
};

export default EditProfileForm;
