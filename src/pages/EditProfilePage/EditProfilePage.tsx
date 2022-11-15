import DeleteButton from 'components/EditProfile/DeleteButton';
import EditProfileForm from 'components/EditProfile/EditProfileForm';
import UserPreview from 'components/EditProfile/UserPreview';
import React from 'react';
import styles from './EditProfilePage.module.scss';

const EditProfilePage = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.content}>
        <UserPreview />
        <EditProfileForm />
        <DeleteButton />
      </section>
    </div>
  );
};

export default EditProfilePage;
