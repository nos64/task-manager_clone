import React from 'react';
import styles from './FormButtons.module.scss';

const FormButtons = () => {
  return (
    <div className={styles.buttonsWrapper}>
      <button className={styles.submitBtn} type="submit">
        Update
      </button>
      <button className={styles.canselBtn} type="reset">
        Cancel
      </button>
    </div>
  );
};

export default FormButtons;
