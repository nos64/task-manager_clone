import { useEffect, useState } from 'react';
import { useAppSelector } from './redux';

const useAppPending = () => {
  const isUserPending = useAppSelector((state) => state.user.isPending);
  const isBoardsPending = useAppSelector((state) => state.boards.isPending);
  const isColumnsPending = useAppSelector((state) => state.board.isPending);
  const isTasksPending = useAppSelector((state) => state.column.isPending);

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const pendingStatus = isUserPending || isBoardsPending || isColumnsPending || isTasksPending;
    setIsPending(pendingStatus);
  }, [isUserPending, isBoardsPending, isColumnsPending, isTasksPending]);

  return isPending;
};

export default useAppPending;
