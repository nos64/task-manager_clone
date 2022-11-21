import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerContentAuth.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ROUTES } from 'common/routes';
import LangToggler from 'components/Header/LangToggler';
import ThemeToggler from 'components/Header/ThemeToggler';
import { GoPlus } from 'react-icons/go';
import { getBoardsByUserId } from 'store/reducers/boardsSlice';
import BoardModal from 'components/BoardModal';
import ValidationErrorMessage from 'components/ValidationErrorMessage';
import InputLineText from 'components/InputLineText';
import { useForm } from 'react-hook-form';

interface IBurgerContentAuthProps {
  isOpenBurger: boolean;
  setIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerContentAuth: React.FC<IBurgerContentAuthProps> = ({
  isOpenBurger,
  setIsOpenBurger,
}) => {
  const userName = useAppSelector((state) => state.user.name);
  const boards = useAppSelector((state) => state.boards.boards);
  const [isModalOpened, setIsModalOpened] = useState(false);
  // const [inputValue, setInputValue] = useState('');

  const handleCreateBoard = () => {
    setIsModalOpened(true);
  };
  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<string>();

  const [fileldsValues, setFieldsValues] = useState<string>('');

  const onChange = () => {
    const currentFieldsValues = getValues();

    setFieldsValues(currentFieldsValues);
  };

  const onReset = () => {
    setFieldsValues('');
    reset({
      string: '',
    });
  };

  return (
    <>
      <div className={styles.menuContent}>
        <div className={styles.togglersWrapper}>
          <NavLink
            className={styles.navLink}
            to={ROUTES.BOARDS}
            onClick={() => setIsOpenBurger(false)}
          >
            Main
          </NavLink>
          <ThemeToggler isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger} />
          <LangToggler isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger} />
        </div>

        <div className={styles.menuHeader}>
          <h2>{userName}</h2>
        </div>
        <div className={styles.boardListTitle}>My Boards</div>
        <div className={styles.inputWrapper}>
          <InputLineText
            inputName={'login'}
            label={'Login'}
            placeholder={'Enter new Login'}
            register={register}
            fieldValue={fileldsValues.login || ''}
            symbolsLimit={2}
          />
          <ValidationErrorMessage message={errors.login && 'Min 2 symbols'} />
          {/* <input
            className={styles.inputLine}
            type="search"
            placeholder="Search..."
            autoComplete="off"
            // value={inputValue}
            // onChange={handleInputChange}
          /> */}
        </div>
        <button className={styles.createBoardBtn} type="button" onClick={handleCreateBoard}>
          <GoPlus />
          Create Board
        </button>
        <ul className={styles.boardList}>
          {boards.map((board) => (
            <li
              className={styles.boardItem}
              key={board && board._id}
              onClick={() => setIsOpenBurger(false)}
            >
              <NavLink className={styles.boardNavLink} to={'#'}>
                {board && board.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <BoardModal
        modalActive={isModalOpened}
        setModalActive={setIsModalOpened}
        modalMode={'create'}
        selectedBoard={null}
      />
    </>
  );
};

export default BurgerContentAuth;
