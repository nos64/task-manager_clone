import { ROUTES } from 'common/routes';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardPage.module.scss';
import Column from '../../components/Column';
import { FaLessThan } from 'react-icons/fa';
import NewColumn from '../../components/NewColumn';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { moveColumn, moveTask, reorderTasks } from 'utils/dnd-helper';
import { DndType } from 'common/dnd-types';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getColumns, updateColumnsOrder } from 'store/reducers/boardSlice';
import ColumnModal from 'components/ColumnModal';
import { updateTasksOrder } from 'store/reducers/columnSlice';

const BoardPage = () => {
  const boardId = '637899303b52a5922e7c5655';
  const boardTitle = 'board title';
  const boardDescription = 'Booard description';
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.board.columns);
  const tasks = useAppSelector((state) => state.column.tasks);

  const [isModalOpened, setIsModalOpened] = useState(false);

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
      case DndType.TASK:
        const sourceColumnTasks = tasks[source.droppableId];
        if (!sourceColumnTasks) return;

        if (destination.droppableId !== source.droppableId) {
          const { newSourceOrderedTasks, newDestinationOrderedTasks } = moveTask(
            source,
            destination,
            draggableId,
            sourceColumnTasks,
            tasks[destination.droppableId]
          );
          if (!newSourceOrderedTasks || !newDestinationOrderedTasks) return;

          dispatch(
            updateTasksOrder({
              tasks: [...newSourceOrderedTasks, ...newDestinationOrderedTasks],
              oldColumnId: source.droppableId,
              newColumnId: destination.droppableId,
            })
          );
        } else {
          const newOrderedTasks = reorderTasks(destination, draggableId, sourceColumnTasks);
          if (!newOrderedTasks) return;

          dispatch(
            updateTasksOrder({
              tasks: newOrderedTasks,
              oldColumnId: source.droppableId,
              newColumnId: destination.droppableId,
            })
          );
        }
        return;
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
              <span>Back</span>
            </Link>
            <div className={styles.boardInfo}>
              <h3 className={styles.title}>{`Board: ${boardTitle}`}</h3>
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
