import React, { useState } from 'react';
import styles from './UserPreview.module.scss';
import ChangeAvatarContent from './ChangeAvatar';
import { useAppSelector } from 'hooks/redux';
import IAvatar from 'types/IAvatar';

interface UserPreviewProps {
  currentAvatar: IAvatar;
  setCurrentAvatar: React.Dispatch<React.SetStateAction<IAvatar>>;
}

const UserPreview: React.FC<UserPreviewProps> = ({ currentAvatar, setCurrentAvatar }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const name = useAppSelector((state) => state.user.name);
  const login = useAppSelector((state) => state.user.login);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.avatrWrapper}>
          <img src={currentAvatar.src} width={120} alt={`User image-${currentAvatar.id}`} />
          <button
            className={styles.avatarButon}
            type="button"
            onClick={() => setIsModalActive(true)}
          >
            Change avatar
          </button>
        </div>
        <div className={styles.nameWrapper}>
          <p className={styles.description}>
            Name: <span className={styles.value}>{name}</span>
          </p>
          <p className={styles.description}>
            Login: <span className={styles.value}>{login}</span>
          </p>
        </div>
      </div>
      <ChangeAvatarContent
        setModalActive={setIsModalActive}
        currentAvatar={currentAvatar}
        setCurrentAvatar={setCurrentAvatar}
        isModalActive={isModalActive}
      />
    </>
  );
};
export default UserPreview;
