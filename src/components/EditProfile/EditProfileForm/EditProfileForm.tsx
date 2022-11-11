import React from 'react';
import styles from './EditProfileForm.module.scss';
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa';
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
        <InputLinePassword label={'CurrentPasword'} />
        <InputLinePassword label={'New Password'} />
        <div className={styles.buttonsWrapper}>
          <button className={styles.submitBtn} type="submit">
            UPDATE PROFILE
          </button>
          <button className={styles.canselBtn} type="submit">
            CANCEL CHANGES
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
