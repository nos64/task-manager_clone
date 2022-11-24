import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FormButtons.module.scss';

interface FormButtonsProps {
  handleCancelBtnClick: () => void;
  acceptBtnTitle: string;
}

const FormButtons: React.FC<FormButtonsProps> = ({ handleCancelBtnClick, acceptBtnTitle }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.buttonsWrapper}>
      <button className={styles.submitBtn} type="submit">
        {acceptBtnTitle}
      </button>
      <button className={styles.canselBtn} type="button" onClick={handleCancelBtnClick}>
        {t('cancelButton')}
      </button>
    </div>
  );
};

export default FormButtons;
