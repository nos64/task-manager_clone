import React from 'react';
import styles from './NewColumn.module.scss';
import { BsPlusCircle } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

interface NewColumnProps {
  toggleModal: () => void;
}

const NewColumn: React.FC<NewColumnProps> = ({ toggleModal }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.newColumn} onClick={toggleModal}>
      <BsPlusCircle className={styles.newColumnIcon} />
      <p className={styles.newColumnTitle}>{t('addColumn')}</p>
    </div>
  );
};

export default NewColumn;
