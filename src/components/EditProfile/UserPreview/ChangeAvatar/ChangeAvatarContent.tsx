import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ChangeAvatarContent.module.scss';

interface IAvatar {
  id: number;
  src: string;
  isCurrent: boolean;
  isActive: boolean;
}
interface IChangeAvatarContent {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  currentAvatar: IAvatar;
  setCurrentAvatar: React.Dispatch<React.SetStateAction<IAvatar>>;
  avatarsArray: IAvatar[];
  setAvatarArray: React.Dispatch<React.SetStateAction<IAvatar[]>>;
}
const ChangeAvatarContent: React.FC<IChangeAvatarContent> = ({
  setModalActive,
  currentAvatar,
  setCurrentAvatar,
  avatarsArray,
  setAvatarArray,
}) => {
  const [activeAvatar, setActiveAvatar] = useState(currentAvatar);

  const { t } = useTranslation();

  const chooseActiveAvatar = (id: number) => {
    const newAvatarArray = avatarsArray.map((img) =>
      img.id === id ? { ...img, isActive: true } : { ...img, isActive: false }
    );
    setAvatarArray(newAvatarArray);
    const activeImage = newAvatarArray.find((image) => image.isActive);
    if (activeImage) setActiveAvatar(activeImage);
  };

  const saveNewAvatar = () => {
    const newAvatarArray = avatarsArray.map((img) =>
      img.isActive === true
        ? { ...img, isCurrent: true, isActive: false }
        : { ...img, isCurrent: false, isActive: false }
    );
    setAvatarArray(newAvatarArray);
    const currentImage = newAvatarArray.find((image) => image.isCurrent);
    if (currentImage) setCurrentAvatar(currentImage);
    setModalActive(false);
  };
  return (
    <>
      <div className={styles.imagesWrapper}>
        {avatarsArray.map((image) => (
          <span
            key={image.id.toString()}
            className={
              image.isCurrent
                ? styles.imageWrapper + ' ' + styles.currentAvatar
                : styles.imageWrapper
            }
          >
            <button
              className={
                image.isActive
                  ? styles.imageWrapper + ' ' + styles.activeAvatar
                  : styles.imageWrapper
              }
              type="button"
              onClick={() => chooseActiveAvatar(image.id)}
            >
              <img src={image.src} width={120} alt={`User image-${image.id}`} />
            </button>
          </span>
        ))}
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          className={styles.submitBtn}
          type="button"
          onClick={saveNewAvatar}
          disabled={currentAvatar.src === activeAvatar.src}
        >
          {t('changeButton')}
        </button>
        <button className={styles.canselBtn} type="button" onClick={() => setModalActive(false)}>
          {t('cancelButton')}
        </button>
      </div>
    </>
  );
};

export default ChangeAvatarContent;
