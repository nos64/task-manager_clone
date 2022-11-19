import React, { useState } from 'react';
import Modal from 'components/Modal';
import styles from './BoardModal.module.scss';
import InputLineText from 'components/InputLineText';
import { useForm } from 'react-hook-form';
import IBoard from 'types/IBoard';
import FormButtons from 'components/FormButtons';
import ValidationErrorMessage from 'components/ValidationErrorMessage';
import { FaRegClipboard } from 'react-icons/fa';
import InputTextarea from 'components/InputTextarea';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { createNewBoard } from 'store/reducers/boardsSlice';

interface BoardModalProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardModal: React.FC<BoardModalProps> = ({ modalActive, setModalActive }) => {
  const [fileldsValues, setFieldsValues] = useState<Partial<IBoard>>({});

  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);
  const onSubmit = (data: Partial<IBoard>) => {
    // Do your magic here ...
    dispatch(
      createNewBoard({
        title: '123456',
        owner: '123456',
        description: '123456',
        users: ['123456'],
      })
    );
    console.log(boards);
  };

  const onChange = () => {
    const currentFieldsValues = getValues();

    setFieldsValues(currentFieldsValues);
  };

  const onReset = () => {
    setModalActive(false);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Partial<IBoard>>();

  return (
    <Modal modalActive={modalActive} setModalActive={setModalActive}>
      <div className={styles.boardModal}>
        <div className={styles.titleWrapper}>
          <FaRegClipboard size={25} />
          <h2>Create board</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
          <InputLineText
            inputName={'title'}
            label={'Title'}
            placeholder={'Name your board'}
            register={register}
            fieldValue={fileldsValues.title || ''}
            symbolsLimit={1}
          />
          <ValidationErrorMessage message={errors.title && 'Min 1 symbol'} />
          <InputTextarea
            inputName={'description'}
            label={'Description'}
            placeholder={'Add a description'}
            register={register}
            fieldValue={fileldsValues.description || ''}
            symbolsLimit={200}
          />
          <ValidationErrorMessage message={errors.description && 'Max 200 symbols'} />
          <FormButtons handleCancelBtnClick={onReset} />
        </form>
      </div>
    </Modal>
  );
};

export default BoardModal;
