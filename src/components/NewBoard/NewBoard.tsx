import React from 'react';
import styles from './NewBoard.module.scss';
import { BsPlusCircle } from 'react-icons/bs';
import IBoard from 'types/IBoard';
import { useTranslation } from 'react-i18next';

interface NewBoardProps {
  toggleModal: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
  setSelectedBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
}

const NewBoard: React.FC<NewBoardProps> = ({ toggleModal, setModalMode, setSelectedBoard }) => {
  const handleClick = () => {
    toggleModal();
    setModalMode('create');
    setSelectedBoard(null);
  };

  const { t } = useTranslation();

  return (
    <div className={styles.newBoard} onClick={handleClick}>
      <BsPlusCircle className={styles.icon} />
      <p className={styles.title}>{t('addBoard')}</p>
    </div>
  );
};

export default NewBoard;
