import React from 'react';
import styles from './Board.module.scss';
import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import { setActiveBoard } from 'store/reducers/boardsSlice';
import { useAppDispatch } from 'hooks/redux';
import IBoard from 'types/IBoard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/routes';

type BoardProops = {
  item: IBoard;
  toggleModal: () => void;
  setModalMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
  setSelectedBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
  setIsWarningModalActive: (value: React.SetStateAction<boolean>) => void;
};

const Board: React.FC<BoardProops> = ({
  item,
  toggleModal,
  setModalMode,
  setSelectedBoard,
  setIsWarningModalActive,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditIconClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    toggleModal();
    setModalMode('edit');
    setSelectedBoard(item);
  };

  const handlerOpenWarningModal = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setSelectedBoard(item);
    setIsWarningModalActive(true);
  };

  const handleGoToColumns = () => {
    dispatch(setActiveBoard(item));
    navigate(`${ROUTES.BOARDS}/${item._id}`);
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
    </>
  );
};

export default Board;
