import { ROUTES } from 'common/routes';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';
import { deleteColumnTask, setSelectedTask, updateTasksOrder } from 'store/reducers/columnSlice';
import { getBoardById } from 'store/reducers/boardsSlice';
import WarningModal from 'components/WarningModal';

const BoardPage = () => {
  const dispatch = useAppDispatch();
  const boardTitle = useAppSelector((state) => state.boards.activeBoard?.title);
  const boardDescription = useAppSelector((state) => state.boards.activeBoard?.description);
  const columns = useAppSelector((state) => state.board.columns);
  const tasks = useAppSelector((state) => state.column.tasks);
  const activeBoardId = useAppSelector((state) => state.boards.activeBoard?._id);
  const isInexistentBoard = useAppSelector((state) => state.boards.isInexistentBoard);
  const selectedTask = useAppSelector((state) => state.column.selectedTask);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [boardId, setBoardId] = useState<string>();
  const [isTaskDeleting, setIsTaskDeleting] = useState(false);

  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
    setBoardId(activeBoardId ? activeBoardId : pathName);
  }, [activeBoardId, location.pathname]);

  useEffect(() => {
    if (boardId && !(boardTitle || boardDescription)) {
      dispatch(getBoardById(boardId));
    }
  }, [boardDescription, boardId, boardTitle, dispatch]);

  useEffect(() => {
    isInexistentBoard && navigate(ROUTES.BOARDS);
  }, [isInexistentBoard, navigate]);

  const removeTask = () => {
    if (!selectedTask) return;

    dispatch(deleteColumnTask(selectedTask));
    setIsTaskDeleting(false);
  };

  const cancelRemoveTask = () => {
    setIsTaskDeleting(false);
    dispatch(setSelectedTask(null));
  };

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
    if (boardId) {
      dispatch(getColumns(boardId));
    }
  }, [boardId, dispatch]);

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
              <span className={styles.backLink}>{t('back')}</span>
            </Link>
            <div className={styles.boardInfo}>
              <h3 className={styles.title}>{`${t('boardPageTitle')}: ${boardTitle || ''}`}</h3>
              <p className={styles.description}>{boardDescription || ''}</p>
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
                    <Column
                      key={column._id}
                      item={column}
                      index={index}
                      setIsTaskDeleting={setIsTaskDeleting}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <NewColumn toggleModal={toggleModal} />
          </div>
        </div>
      </DragDropContext>
      {boardId && (
        <ColumnModal
          modalActive={isModalOpened}
          boardId={boardId}
          setModalActive={setIsModalOpened}
        />
      )}
      <WarningModal
        isModalActive={isTaskDeleting}
        deleteBtnHandler={() => removeTask()}
        cancelBtnHandler={cancelRemoveTask}
        message={t('deleteTaskWarningMessage')}
      />
    </>
  );
};

export default BoardPage;
