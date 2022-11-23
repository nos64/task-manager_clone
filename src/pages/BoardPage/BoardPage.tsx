import { ROUTES } from 'common/routes';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardPage.module.scss';
import Column from '../../components/Column';
import { FaLessThan } from 'react-icons/fa';
import NewColumn from '../../components/NewColumn';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { moveColumn } from 'utils/dnd-helper';
import { DndType } from 'common/dnd-types';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getColumns, updateColumnsOrder } from 'store/reducers/boardSlice';
import ColumnModal from 'components/ColumnModal';
import { useTranslation } from 'react-i18next';

const BoardPage = () => {
  const boardId = '637899303b52a5922e7c5655';
  const boardTitle = 'board title';
  const boardDescription = 'Booard description';
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.board.columns);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const { t } = useTranslation();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    switch (type) {
      case DndType.COLUMN:
        const newOrderedColumns = moveColumn(destination, draggableId, columns);
        if (!newOrderedColumns) return;

        dispatch(updateColumnsOrder(newOrderedColumns));
        return;
      // case DndType.TASK:
      //   const sourceColumn = columns.find((item) => item._id == source.droppableId);
      //   if (!sourceColumn || !sourceColumn.tasks) return;
      //   if (destination.droppableId !== source.droppableId) {
      //     const { newSourceColumn, newDestinationColumn } = moveTask(
      //       source,
      //       destination,
      //       draggableId,
      //       sourceColumn,
      //       columns
      //     );
      //     if (!newSourceColumn || !newDestinationColumn) return;
      //     const newColumns = [
      //       ...columns.filter(
      //         (item) => item._id !== source.droppableId && item._id !== destination.droppableId
      //       ),
      //       newDestinationColumn,
      //       newSourceColumn,
      //     ].sort((col1, col2) => (col1.order < col2.order ? -1 : 1));
      //     setColumns(newColumns);
      //   } else {
      //     const newSourceColumn = reorderTasks(destination, draggableId, sourceColumn);
      //     if (!newSourceColumn) return;
      //     const newColumns = [
      //       ...columns.filter((item) => item._id !== source.droppableId),
      //       newSourceColumn,
      //     ].sort((col1, col2) => (col1.order < col2.order ? -1 : 1));
      //     setColumns(newColumns);
      //   }
      //   return;
      default:
        throw new Error('No such DND type');
    }
  };

  useEffect(() => {
    dispatch(getColumns(boardId));
  }, [dispatch]);

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.pageContent}>
          <div className={styles.topBlock}>
            <Link className={styles.backBtn} to={ROUTES.BOARDS}>
              <FaLessThan className={styles.backBtnIcon} />
              <span>{t('back')}</span>
            </Link>
            <div className={styles.boardInfo}>
              <h3 className={styles.title}>{`${t('boardPageTitle')}: ${boardTitle}`}</h3>
              <p className={styles.description}>{boardDescription}</p>
            </div>
          </div>
          <div className={styles.boardContent}>
            <Droppable droppableId={'columns'} direction="horizontal" type={DndType.COLUMN}>
              {(provided) => (
                <div
                  className={styles.columnsContainer}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  id="column-container"
                >
                  {columns.map((column, index) => (
                    <Column key={column._id} item={column} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <NewColumn toggleModal={toggleModal} />
          </div>
        </div>
      </DragDropContext>
      <ColumnModal
        modalActive={isModalOpened}
        boardId={boardId}
        setModalActive={setIsModalOpened}
      />
    </>
  );
};

export default BoardPage;
