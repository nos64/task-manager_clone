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
import ITaskModalForm from 'types/ITaskModalForm';
import { useTranslation } from 'react-i18next';
import IColumn from 'types/IColumn';
import { createColumnTask, updateColumnTask } from 'store/reducers/columnSlice';
import { getAllUsers } from 'store/reducers/userSlice';

interface TaskModalProps {
  modalActive: boolean;
  modalMode: 'create' | 'edit';
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  currentColumn: IColumn;
  selectedTask: ITask | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  modalActive,
  modalMode,
  setModalActive,
  currentColumn,
  selectedTask,
}) => {
  const [fileldsValues, setFieldsValues] = useState<Partial<ITaskModalForm>>({});

  const boardId = useAppSelector((state) => state.boards.activeBoard?._id);

  const currentUserId = useAppSelector((state) => state.user.id);
  const users = useAppSelector((state) => state.user.users);
  const columns = useAppSelector((state) => state.board.columns);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

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
    if (users.length && modalActive && selectedTask && modalMode === 'edit') {
      setValue('title', selectedTask.title);
      setValue('description', selectedTask.description);
      setValue('columnId', selectedTask.columnId);
      setValue('users', selectedTask.users[0]);

      setFieldsValues(getValues());
    }
  }, [users.length, getValues, modalActive, modalMode, selectedTask, setValue]);

  useEffect(() => {
    if (modalActive && modalMode === 'create') {
      setValue('users', undefined);
    }
  }, [modalActive, modalMode, setValue]);

  const onSubmit = (data: Partial<ITaskModalForm>) => {
    switch (modalMode) {
      case 'create':
        dispatch(
          createColumnTask({
            title: data.title || '',
            description: data.description || ' ',
            boardId: boardId || '',
            columnId: currentColumn._id,
            userId: currentUserId,
            users: data.users ? [data.users] : [],
          })
        );
        break;
      case 'edit':
        dispatch(
          updateColumnTask({
            task: {
              _id: selectedTask?._id || '',
              title: data.title || '',
              description: data.description || ' ',
              order: selectedTask?.order || 0,
              boardId: boardId || '',
              columnId: data.columnId || '',
              userId: currentUserId,
              users: data.users ? [data.users] : [],
            },
            oldColumnId: selectedTask?.columnId || '',
          })
        );
        break;
      default:
        throw new Error('no such modal mode');
    }

    onReset();
  };

  const onChange = () => {
    const currentFieldsValues = getValues();
    setFieldsValues(currentFieldsValues);
  };

  const onReset = () => {
    setModalActive(false);
    setFieldsValues({});
    reset({
      title: '',
      description: '',
      columnId: '',
      users: '',
    });
  };

  return (
    <Modal modalActive={modalActive} setModalActive={onReset}>
      <div className={styles.elementModal}>
        <div className={styles.titleWrapper}>
          <MdAddTask size={25} />
          <h2>
            {modalMode === 'create' ? t('addButton') : t('edit')} {t('task')}
          </h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
          <InputLineText
            inputName={'title'}
            label={t('titleLabel')}
            placeholder={t('taskTitlePlaceholder')}
            register={register}
            fieldValue={fileldsValues.title || ''}
            symbolsLimit={1}
          />
          <ValidationErrorMessage
            message={errors.title && (t('oneSymbolValidationMessage') || '')}
          />
          <InputTextarea
            inputName={'description'}
            label={t('descriptionLabel')}
            placeholder={t('descriptionPlaceholder')}
            register={register}
            fieldValue={fileldsValues.description || ''}
            symbolsLimit={200}
          />
          <ValidationErrorMessage
            message={errors.description && (t('twoHundredSymbolsValidationMessage') || '')}
          />
          {modalMode === 'edit' && (
            <Selectelement
              inputName={'columnId'}
              label={t('column')}
              register={register}
              fieldValue={fileldsValues.columnId || ''}
              options={columns}
              type={'status'}
            />
          )}
          <Selectelement
            inputName={'users'}
            label={t('assignees')}
            register={register}
            fieldValue={fileldsValues.users || ''}
            options={users}
            type={'users'}
          />
          <FormButtons
            handleCancelBtnClick={onReset}
            acceptBtnTitle={modalMode === 'create' ? t('addButton') : t('updateButton')}
          />
        </form>
      </div>
    </Modal>
  );
};

export default TaskModal;
