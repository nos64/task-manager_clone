import React, { useEffect, useState } from 'react';
import styles from './ChangeAvatarContent.module.scss';
import { avatars } from '../../../../common/constants';
import IAvatar from 'types/IAvatar';
import Modal from 'components/Modal';

interface IChangeAvatarContent {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  currentAvatar: IAvatar;
  setCurrentAvatar: React.Dispatch<React.SetStateAction<IAvatar>>;
  isModalActive: boolean;
}
const ChangeAvatarContent: React.FC<IChangeAvatarContent> = ({
  setModalActive,
  currentAvatar,
  setCurrentAvatar,
  isModalActive,
}) => {
  const [activeAvatar, setActiveAvatar] = useState<IAvatar>();
  const [avatarsArray, setAvatarArray] = useState<IAvatar[]>([]);

  useEffect(() => {
    const newAvatars = avatars.map((avatar) =>
      avatar.id === currentAvatar.id ? { ...avatar, isCurrent: true } : { ...avatar }
    );

    setActiveAvatar(currentAvatar);
    setAvatarArray(newAvatars);
  }, [currentAvatar]);

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

  const closeModal = () => {
    const newAvatars = avatarsArray.map((img) => ({ ...img, isActive: false }));

    setAvatarArray(newAvatars);
    setActiveAvatar(currentAvatar);
    setModalActive(false);
  };

  return (
    <Modal modalActive={isModalActive} setModalActive={closeModal}>
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
          disabled={currentAvatar.src === activeAvatar?.src}
        >
          CHANGE
        </button>
        <button className={styles.canselBtn} type="button" onClick={closeModal}>
          CANCEL
        </button>
      </div>
    </Modal>
  );
};

export default ChangeAvatarContent;
