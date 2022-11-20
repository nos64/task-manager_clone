import React from 'react';
import styles from './NewBoard.module.scss';
import { BsPlusCircle } from 'react-icons/bs';

interface NewBoardProps {
  toggleModal: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
}

const NewBoard: React.FC<NewBoardProps> = ({ toggleModal, setModalMode }) => {
  const handleClick = () => {
    toggleModal();
    setModalMode('create');
  };

  return (
    <div className={styles.newBoard} onClick={handleClick}>
      <BsPlusCircle className={styles.icon} />
      <p className={styles.title}>Add board</p>
    </div>
  );
};

export default NewBoard;
