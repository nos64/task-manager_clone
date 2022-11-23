import DeleteButton from 'components/EditProfile/DeleteButton';
import EditProfileForm from 'components/EditProfile/EditProfileForm';
import UserPreview from 'components/EditProfile/UserPreview';
import React, { useState } from 'react';
import styles from './EditProfilePage.module.scss';
import { avatars } from 'common/constants';
import { useAppSelector } from 'hooks/redux';

const EditProfilePage = () => {
  const avatarID = useAppSelector((state) => state.user.avatarID);
  const [currentAvatar, setCurrentAvatar] = useState(avatars[avatarID]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.content}>
        <UserPreview currentAvatar={currentAvatar} setCurrentAvatar={setCurrentAvatar} />
        <EditProfileForm currentAvatar={currentAvatar} />
        <DeleteButton />
      </section>
    </div>
  );
};

export default EditProfilePage;
