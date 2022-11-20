import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import styles from './TaskModal.module.scss';
import InputLineText from 'components/InputLineText';
import { useForm } from 'react-hook-form';
import FormButtons from 'components/FormButtons';
import ValidationErrorMessage from 'components/ValidationErrorMessage';
import { MdAddTask } from 'react-icons/md';
import InputTextarea from 'components/InputTextarea';
import Selectelement from 'components/Selectelement';
import ITask from 'types/ITask';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getAllUsers } from 'store/reducers/userSlice';
import ITaskModalForm from 'types/ITaskModalForm';

// Temporary columns options Delete when columns slice is created
const TEMPORARY_COLUMNS_OPTIONS = [
  {
    _id: 'id 1',
    title: 'my awesome column 1',
    order: 0,
    boardId: '1',
  },
  {
    _id: 'id 2',
    title: 'my awesome column 2',
    order: 1,
    boardId: '1',
  },
  {
    _id: 'id 3',
    title: 'my awesome column 3',
    order: 2,
    boardId: '1',
  },
  {
    _id: 'id 4',
    title: 'my awesome column 4',
    order: 3,
    boardId: '1',
  },
  {
    _id: 'id 5',
    title: 'my awesome column 5',
    order: 4,
    boardId: '1',
  },
];

interface TaskModalProps {
  modalActive: boolean;
  modalMode: 'create' | 'edit';
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: ITask | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  modalActive,
  modalMode,
  setModalActive,
  selectedTask,
}) => {
  const [fileldsValues, setFieldsValues] = useState<Partial<ITaskModalForm>>({});
  const users = useAppSelector((state) => state.user.users);
  // We have to get all avaliable columns in board
  // const columns = useAppSelector((state) => state.columns.columns);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Partial<ITaskModalForm>>();

  useEffect(() => {
    modalActive && dispatch(getAllUsers());
  }, [dispatch, modalActive]);

  useEffect(() => {
    if (modalActive && selectedTask && modalMode === 'edit') {
      setValue('title', selectedTask.title);
      setValue('description', selectedTask.description);
      setValue('columnId', selectedTask.columnId);
      setValue('users', selectedTask.users[0]);

      setFieldsValues(getValues());
    }
  }, [getValues, modalActive, modalMode, selectedTask, setValue]);

  useEffect(() => {
    if (modalActive && modalMode === 'create') {
      setValue('users', undefined);
    }
  }, [modalActive, modalMode, setValue]);

  const onSubmit = (data: Partial<ITaskModalForm>) => {
    // Do your magic here ...
    console.log(data);
  };

  const onChange = () => {
    const currentFieldsValues = getValues();
    setFieldsValues(currentFieldsValues);
  };

  const onReset = () => {
    setModalActive(false);
    setFieldsValues({});
    reset();
  };

  return (
    <Modal modalActive={modalActive} setModalActive={onReset}>
      <div className={styles.elementModal}>
        <div className={styles.titleWrapper}>
          <MdAddTask size={25} />
          <h2>{modalMode === 'create' ? 'Add' : 'Edit'} task</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
          <InputLineText
            inputName={'title'}
            label={'Title'}
            placeholder={'Name your task'}
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
          {modalMode === 'edit' && (
            <Selectelement
              inputName={'columnId'}
              label={'Status'}
              register={register}
              fieldValue={fileldsValues.columnId || ''}
              // Pass `columns` instead of mocked values
              options={TEMPORARY_COLUMNS_OPTIONS}
              type={'status'}
            />
          )}
          <Selectelement
            inputName={'users'}
            label={'Assign to'}
            register={register}
            fieldValue={fileldsValues.users || ''}
            options={users}
            type={'users'}
          />
          <FormButtons handleCancelBtnClick={onReset} />
        </form>
      </div>
    </Modal>
  );
};

export default TaskModal;
