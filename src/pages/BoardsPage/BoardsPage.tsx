import BoardModal from 'components/BoardModal';
import NewBoard from 'components/NewBoard';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IBoard from 'types/IBoard';
import Board from '../../components/Board';
import styles from './BoardsPage.module.scss';

const BoardsPage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);

  const { t } = useTranslation();

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  const boards = [
    {
      _id: '1',
      title: 'Board 111111111111111111111111111111111',
      description:
        'board description 11111111111111111111111111111111 1111111111111111111111111111111111111111',
      owner: '1',
      users: [],
    },
    { _id: '2', title: 'Board 2', description: 'board description 2', owner: '1', users: [] },
    { _id: '3', title: 'Board 3', description: 'board description 3', owner: '1', users: [] },
    { _id: '4', title: 'Board 4', description: 'board description 4', owner: '1', users: [] },
    { _id: '5', title: 'Board 5', description: 'board description 5', owner: '1', users: [] },
    { _id: '6', title: 'Board 6', description: 'board description 6', owner: '1', users: [] },
    { _id: '7', title: 'Board 7', description: 'board description 7', owner: '1', users: [] },
  ];

  return (
    <div className={styles.pageContent}>
      <h3 className={styles.title}>{t('boards')}</h3>
      <div className={styles.boardsContainer}>
        {boards.map((board) => {
          return (
            <Board
              key={board._id}
              item={board}
              toggleModal={toggleModal}
              setModalMode={setModalMode}
              setSelectedBoard={setSelectedBoard}
            />
          );
        })}
        <NewBoard
          toggleModal={toggleModal}
          setModalMode={setModalMode}
          setSelectedBoard={setSelectedBoard}
        />
      </div>
      <BoardModal
        modalActive={isModalOpened}
        setModalActive={setIsModalOpened}
        modalMode={modalMode}
        selectedBoard={selectedBoard}
      />
    </div>
  );
};

export default BoardsPage;
