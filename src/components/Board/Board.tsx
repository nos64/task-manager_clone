import React from 'react';
import styles from './Board.module.scss';
import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';

import { deleteBoardById } from 'store/reducers/boardsSlice';
import { useAppDispatch } from 'hooks/redux';
import IBoard from 'types/IBoard';

type BoardProops = {
  item: IBoard;
  toggleModal: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
  setSelectedBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
};

const Board: React.FC<BoardProops> = ({ item, toggleModal, setModalMode, setSelectedBoard }) => {
  const dispatch = useAppDispatch();
  const handleEditIconClick = () => {
    toggleModal();
    setModalMode('edit');
    setSelectedBoard(item);
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoardById(item._id));
  };

  return (
    <div className={styles.board}>
      <div className={styles.boardContent}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div className={styles.boardBtns}>
        <RiEditLine className={styles.boardBtn} onClick={handleEditIconClick} />
        <RiDeleteBin6Line className={styles.boardBtn} onClick={handleDeleteBoard} />
      </div>
    </div>
  );
};

export default Board;
