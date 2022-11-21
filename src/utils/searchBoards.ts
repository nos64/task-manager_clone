import IBoard from 'types/IBoard';

export const searchBoards = (inputValue: string, boardsArray: IBoard[]) => {
  const searchValue = inputValue.toLowerCase().trim();
  if (searchValue) {
    const serachArray = boardsArray.filter(
      (item) => item.title.toLowerCase().search(searchValue) !== -1
    );
    return serachArray;
  }
};
