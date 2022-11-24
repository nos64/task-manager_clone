import React from 'react';
import styles from './WarningModal.module.scss';
import { TiWarning } from 'react-icons/ti';
import Modal from 'components/Modal';
import { useTranslation } from 'react-i18next';

interface WarningModalProps {
  deleteBtnHandler: () => void;
  cancelBtnHandler: () => void;
  message: string;
  isModalActive: boolean;
}

const WarningModal: React.FC<WarningModalProps> = ({
  deleteBtnHandler,
  cancelBtnHandler,
  message,
  isModalActive,
}) => {
  const { t } = useTranslation();

  return (
    <Modal modalActive={isModalActive} setModalActive={cancelBtnHandler}>
      <div className={styles.wrapper}>
        <TiWarning size={50} color={'#fc4c4c'} />
        <p className={styles.title}>
          {t('warningMessage')} {message}?
        </p>
        <div className={styles.buttonsWrapper}>
          <button className={styles.deleteBtn} type="button" onClick={deleteBtnHandler}>
            {t('deleteButton')}
          </button>
          <button className={styles.submitBtn} type="button" onClick={cancelBtnHandler}>
            {t('cancelButton')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
