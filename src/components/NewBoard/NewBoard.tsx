import React from 'react';
import styles from './NewBoard.module.scss';
import { BsPlusCircle } from 'react-icons/bs';

interface NewBoardProps {
  toggleModal: () => void;
}

const NewBoard: React.FC<NewBoardProps> = ({ toggleModal }) => {
  return (
    <div className={styles.newBoard} onClick={toggleModal}>
      <BsPlusCircle className={styles.icon} />
      <p className={styles.title}>Add board</p>
    </div>
  );
};

export default NewBoard;
