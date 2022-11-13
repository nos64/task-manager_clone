import React from 'react';
import styles from './EditProfileForm.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import ValidationErrorMessage from '../../ValidationErrorMessage';
import InputLinePassword from 'components/InputLinePassword';
import InputLineText from 'components/InputLineText';

const EditProfileForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>();

  const handlerSubmitForm: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.titleWrapper}>
        <FaUserEdit size={25} />
        <h1>Edit your profile</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(handlerSubmitForm)}>
        <InputLineText
          inputName={'userName'}
          label={'UserName'}
          placeholder={'Enter new name'}
          register={register}
        />
        <ValidationErrorMessage message={errors.userName && 'Min 2 symbols'} />
        <InputLineText
          inputName={'userLogin'}
          label={'UserLogin'}
          placeholder={'Enter new Login'}
          register={register}
        />
        <ValidationErrorMessage message={errors.userLogin && 'Min 2 symbols'} />
        <InputLinePassword inputName={'password'} label={'New Password'} register={register} />
        <ValidationErrorMessage message={errors.password && 'Required, min 6 symbols'} />
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
