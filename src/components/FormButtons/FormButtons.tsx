import React from 'react';
import styles from './FormButtons.module.scss';

interface FormButtonsProps {
  handleCancelBtnClick: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({ handleCancelBtnClick }) => {
  return (
    <div className={styles.buttonsWrapper}>
      <button className={styles.submitBtn} type="submit">
        Update
      </button>
      <button className={styles.canselBtn} type="button" onClick={handleCancelBtnClick}>
        Cancel
      </button>
    </div>
  );
};

export default FormButtons;
