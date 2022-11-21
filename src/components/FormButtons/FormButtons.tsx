import React from 'react';
import styles from './FormButtons.module.scss';

interface FormButtonsProps {
  handleCancelBtnClick: () => void;
  acceptBtnTitle: string;
}

const FormButtons: React.FC<FormButtonsProps> = ({ handleCancelBtnClick, acceptBtnTitle }) => {
  return (
    <div className={styles.buttonsWrapper}>
      <button className={styles.submitBtn} type="submit">
        {acceptBtnTitle}
      </button>
      <button className={styles.canselBtn} type="button" onClick={handleCancelBtnClick}>
        Cancel
      </button>
    </div>
  );
};

export default FormButtons;
