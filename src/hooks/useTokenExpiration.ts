import { useEffect } from 'react';
import {
  setIsAuthorised,
  setIsRoutesProtected,
  setIsTokenRequireUpdate,
} from 'store/reducers/userSlice';
import { useAppDispatch, useAppSelector } from './redux';

const useTokenExpiration = () => {
  const isTokenExpiredUser = useAppSelector((state) => state.user.isTokenExpired);
  const isTokenExpiredBoard = useAppSelector((state) => state.board.isTokenExpired);
  const isTokenExpiredBoards = useAppSelector((state) => state.boards.isTokenExpired);
  const isTokenExpiredColumn = useAppSelector((state) => state.column.isTokenExpired);
  const isTokenExpiredTask = useAppSelector((state) => state.task.isTokenExpired);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      isTokenExpiredUser ||
      isTokenExpiredBoard ||
      isTokenExpiredBoards ||
      isTokenExpiredColumn ||
      isTokenExpiredTask
    ) {
      dispatch(setIsAuthorised(false));
      dispatch(setIsRoutesProtected(false));
      dispatch(setIsTokenRequireUpdate(true));
    }
  }, [
    dispatch,
    isTokenExpiredUser,
    isTokenExpiredBoard,
    isTokenExpiredColumn,
    isTokenExpiredTask,
    isTokenExpiredBoards,
  ]);
};

export default useTokenExpiration;
