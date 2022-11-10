import DeleteButton from 'components/EditProfile/DeleteButton';
import EditProfileForm from 'components/EditProfile/EditProfileForm';
import UserPreview from 'components/EditProfile/UserPreview';
import React from 'react';
import styles from './EditProfilePage.module.scss';

const EditProfilePage = () => {
  return (
    <section className={styles.wrapper}>
      <UserPreview />
      <EditProfileForm />
      <DeleteButton />
    </section>
  );
};

export default EditProfilePage;
