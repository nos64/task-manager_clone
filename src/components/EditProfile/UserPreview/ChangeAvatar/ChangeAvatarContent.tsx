import React, { useState } from 'react';
import styles from './ChangeAvatarContent.module.scss';
import userImage0 from '../../../../assets/images/userImage0.png';
import userImage1 from '../../../../assets/images/userImage1.png';
import userImage2 from '../../../../assets/images/userImage2.png';
import userImage3 from '../../../../assets/images/userImage3.png';
import userImage4 from '../../../../assets/images/userImage4.png';
import userImage5 from '../../../../assets/images/userImage5.png';
import userImage6 from '../../../../assets/images/userImage6.png';
import userImage7 from '../../../../assets/images/userImage7.png';
import userImage8 from '../../../../assets/images/userImage8.png';
import userImage9 from '../../../../assets/images/userImage9.png';

interface IChangeAvatarContent {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentAvatar: React.Dispatch<React.SetStateAction<string>>;
  currentAvatar: string;
}
const ChangeAvatarContent: React.FC<IChangeAvatarContent> = ({
  setModalActive,
  currentAvatar,
  setCurrentAvatar,
}) => {
  const [activeAvatar, setActivAvatar] = useState(currentAvatar);
  const avatars = [
    userImage0,
    userImage1,
    userImage2,
    userImage3,
    userImage4,
    userImage5,
    userImage6,
    userImage7,
    userImage8,
    userImage9,
  ];

  const saveNewAvatar = () => {
    setCurrentAvatar(activeAvatar);
    setModalActive(false);
  };
  return (
    <>
      <div className={styles.imagesWrapper}>
        {avatars.map((image) => (
          <div className={styles.imageWrapper} key={image} onClick={() => setActivAvatar(image)}>
            <img src={image} width={120} alt="User image" />
          </div>
        ))}
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          className={styles.submitBtn}
          type="button"
          onClick={saveNewAvatar}
          disabled={currentAvatar === activeAvatar}
        >
          CHANGE
        </button>
        <button className={styles.canselBtn} type="button" onClick={() => setModalActive(false)}>
          CANCEL
        </button>
      </div>
    </>
  );
};

export default ChangeAvatarContent;
