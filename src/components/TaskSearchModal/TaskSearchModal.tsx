import React, { useEffect, useState } from 'react';
import InputLineText from 'components/InputLineText';
import InputTextarea from 'components/InputTextarea';
import Modal from 'components/Modal';
import Selectelement from 'components/Selectelement';
import ValidationErrorMessage from 'components/ValidationErrorMessage';
import styles from './TaskSearchModal.module.scss';
import { useTranslation } from 'react-i18next';
import useDebounce from 'hooks/useDebouce';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getTasksBySearchQuery, setTasksList } from 'store/reducers/taskSlice';
import { useForm } from 'react-hook-form';
import ITaskModalForm from 'types/ITaskModalForm';
import ITask from 'types/ITask';
import { getAllUsers } from 'store/reducers/userSlice';
import { updateColumnTask } from 'store/reducers/columnSlice';

interface TaskSearchModalProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskSearchModal: React.FC<TaskSearchModalProps> = ({ modalActive, setModalActive }) => {
  const userId = useAppSelector((state) => state.user.id);
  const tasks = useAppSelector((state) => state.task.tasksList);
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();

  const [fileldsValues, setFieldsValues] = useState<Partial<ITaskModalForm>>({});
  const [enteredSearchValue, setEnteredSearchValue] = useState('');
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const activeSearchValue = useDebounce(enteredSearchValue);

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
    modalActive && dispatch(getTasksBySearchQuery({ userId, query: activeSearchValue }));
  }, [activeSearchValue, dispatch, modalActive, userId]);

  useEffect(() => {
    if (modalActive && selectedTask) {
      setValue('title', selectedTask.title);
      setValue('description', selectedTask.description);
      setValue('users', selectedTask.users[0]);

      setFieldsValues(getValues());

      dispatch(getAllUsers());
    }
  }, [dispatch, getValues, modalActive, selectedTask, setValue]);

  const onChange = () => {
    const currentFieldsValues = getValues();
    setFieldsValues(currentFieldsValues);
  };

  const onSubmit = (data: Partial<ITaskModalForm>) => {
    if (!selectedTask) {
      onReset();
      return;
    }

    dispatch(
      updateColumnTask({
        task: {
          ...selectedTask,
          title: data.title || '',
          description: data.description || ' ',
          users: data.users ? [data.users] : [],
        },
        oldColumnId: selectedTask?.columnId,
      })
    );

    onReset();
  };

  const onReset = () => {
    setModalActive(false);
    setEnteredSearchValue('');
    setFieldsValues({});
    setSelectedTask(null);
    dispatch(setTasksList([]));
    reset({
      title: '',
      description: '',
      users: '',
    });
  };

  const taskElements = tasks.map((task) => (
    <li className={styles.taskItem} key={task._id} onClick={() => setSelectedTask(task)}>
      <span className={styles.taskNavLink}>{task.title}</span>
    </li>
  ));

  return (
    <Modal modalActive={modalActive} setModalActive={onReset}>
      <div className={styles.elementModal}>
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputLine}
            type="search"
            placeholder={t('taskSearchPlaceholder') || ''}
            autoComplete="off"
            onChange={(e) => setEnteredSearchValue(e.target.value)}
            value={enteredSearchValue}
          />
        </div>
        <ul className={styles.tasksList}>
          {activeSearchValue && !taskElements.length && (
            <li className={styles.noTaskMessage}>
              {t('noMatchesMessage')} {activeSearchValue}
            </li>
          )}
          {!activeSearchValue && !taskElements.length && (
            <li className={styles.noTaskMessage}>{t('noTasksmessage')}</li>
          )}
          {!!taskElements.length && taskElements}
        </ul>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
        <fieldset className={styles.fieldset} disabled={!selectedTask}>
          <InputLineText
            inputName={'title'}
            label={t('titleLabel')}
            placeholder={t('taskTitlePlaceholder')}
            register={register}
            fieldValue={fileldsValues.title || ''}
            symbolsLimit={1}
            disabled
          />
        </fieldset>
        <ValidationErrorMessage message={errors.title && (t('oneSymbolValidationMessage') || '')} />
        <fieldset className={styles.fieldset} disabled={!selectedTask}>
          <InputTextarea
            inputName={'description'}
            label={t('descriptionLabel')}
            placeholder={t('descriptionPlaceholder')}
            register={register}
            fieldValue={fileldsValues.description || ''}
            symbolsLimit={200}
          />
        </fieldset>
        <ValidationErrorMessage
          message={errors.description && (t('twoHundredSymbolsValidationMessage') || '')}
        />
        <fieldset className={styles.fieldset} disabled={!selectedTask}>
          <Selectelement
            inputName={'users'}
            label={t('assignees')}
            register={register}
            fieldValue={fileldsValues.users || ''}
            options={users}
            type={'users'}
          />
        </fieldset>
        <div className={styles.buttonsWrapper}>
          <button className={styles.submitBtn} type="submit" disabled={!selectedTask}>
            {t('updateButton')}
          </button>
          <button className={styles.canselBtn} type="button" onClick={onReset}>
            {t('cancelButton')}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskSearchModal;
