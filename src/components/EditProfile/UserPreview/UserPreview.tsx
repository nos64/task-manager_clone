import React, { useState } from 'react';
import styles from './UserPreview.module.scss';
import ChangeAvatarContent from './ChangeAvatar';
import { useAppSelector } from 'hooks/redux';
import IAvatar from 'types/IAvatar';
import { useTranslation } from 'react-i18next';

interface UserPreviewProps {
  currentAvatar: IAvatar;
  setCurrentAvatar: React.Dispatch<React.SetStateAction<IAvatar>>;
}

const UserPreview: React.FC<UserPreviewProps> = ({ currentAvatar, setCurrentAvatar }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const name = useAppSelector((state) => state.user.name);
  const login = useAppSelector((state) => state.user.login);
  const theme = useAppSelector((state) => state.user.theme);

  const { t } = useTranslation();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.avatarWrapper}>
          <img
            className={styles.avatarImg}
            src={theme === 'dark' ? currentAvatar.srcL : currentAvatar.srcD}
            alt={`${t('userPreviewAlt')}-${currentAvatar.id}`}
          />

          <button
            className={styles.avatarButton}
            type="button"
            onClick={() => setIsModalActive(true)}
          >
            {t('chooseAvatar')}
          </button>
        </div>
        <div className={styles.nameWrapper}>
          <p className={styles.description}>
            {t('profileName')}: <span className={styles.value}>{name}</span>
          </p>
          <p className={styles.description}>
            {t('profileLogin')}: <span className={styles.value}>{login}</span>
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
