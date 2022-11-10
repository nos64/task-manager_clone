import React from 'react';
import styles from './EditProfileForm.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import InputLineText from '../InputLineText';
import InputLinePassword from '../InputLinePassword';

const EditProfileForm = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.titleWrapper}>
        <FaUserEdit size={25} />
        <h1>Edit your profile</h1>
      </div>
      <form className={styles.form}>
        <InputLineText label={'UserName'} placeholder={'Enter new name'} />
        <InputLineText label={'UserLogin'} placeholder={'Enter new Login'} />
        <InputLinePassword label={'CurrentPasword'} placeholder={'Current password'} />
        <InputLinePassword label={'New Password'} placeholder={'New Password'} />
      </form>
    </div>
  );
};

export default EditProfileForm;
