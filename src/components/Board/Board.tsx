import React, { useState } from 'react';
import styles from './Board.module.scss';
import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';

import { deleteBoardById } from 'store/reducers/boardsSlice';
import { useAppDispatch } from 'hooks/redux';
import IBoard from 'types/IBoard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/routes';
import WarningModal from 'components/WarningModal';

type BoardProops = {
  item: IBoard;
  toggleModal: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
  setSelectedBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
};

const Board: React.FC<BoardProops> = ({ item, toggleModal, setModalMode, setSelectedBoard }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);
  const handleEditIconClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    toggleModal();
    setModalMode('edit');
    setSelectedBoard(item);
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoardById(item._id));
  };
  const handlerOpenWarningModal = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsModalActive(true);
  };

  const handleGoToColumns = () => {
    //////////ROUTES.BOARD
    navigate(`/boards/:${item._id}`);
  };

  return (
    <>
      <div className={styles.board} onClick={handleGoToColumns}>
        <div className={styles.boardContent}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
        </div>
        <div className={styles.boardBtns}>
          <RiEditLine className={styles.boardBtn} onClick={handleEditIconClick} />
          <RiDeleteBin6Line className={styles.boardBtn} onClick={handlerOpenWarningModal} />
        </div>
      </div>
      <WarningModal
        deleteBtnHandler={handleDeleteBoard}
        cancelBtnHandler={() => setIsModalActive(false)}
        message="delete this board"
        isModalActive={isModalActive}
      />
    </>
  );
};

export default Board;
