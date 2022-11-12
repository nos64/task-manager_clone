import React, { useState } from 'react';
import styles from './EditProfileForm.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import FormErrorMessage from '../FormErrorMessage';
import InputLinePassword from 'components/InputLinePassword';
import InputLineText from 'components/InputLineText';

// type FormValues = {
//   userName: string;
//   userLogin: string;
//   password: string;
// };

const EditProfileForm = () => {
  const [isClicked, setIsClicked] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    mode: 'onBlur',
  });

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
        {/* <FormErrorMessage message={errors.userName} /> */}
        <InputLineText
          inputName={'userLogin'}
          label={'UserLogin'}
          placeholder={'Enter new Login'}
          register={register}
        />
        {/* <FormErrorMessage message={errors.userLogin} /> */}
        <InputLinePassword inputName={'password'} label={'New Password'} register={register} />
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
