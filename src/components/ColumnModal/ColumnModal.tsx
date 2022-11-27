import React, { useState } from 'react';
import Modal from 'components/Modal';
import styles from './ColumnModal.module.scss';
import InputLineText from 'components/InputLineText';
import { useForm } from 'react-hook-form';
import FormButtons from 'components/FormButtons';
import ValidationErrorMessage from 'components/ValidationErrorMessage';
import { FaListUl } from 'react-icons/fa';
import IColumn from 'types/IColumn';
import { useAppDispatch } from 'hooks/redux';
import { createBoardColumn } from 'store/reducers/boardSlice';
import { useTranslation } from 'react-i18next';

interface ColumnModalProps {
  modalActive: boolean;
  boardId: string;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColumnModal: React.FC<ColumnModalProps> = ({ modalActive, boardId, setModalActive }) => {
  const [fileldsValues, setFieldsValues] = useState<Partial<IColumn>>({});

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Partial<IColumn>>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: Partial<IColumn>) => {
    dispatch(createBoardColumn({ boardId, title: data.title || '' }));
    setModalActive(false);
    onReset();
  };

  const onChange = () => {
    const currentFieldsValues = getValues();

    setFieldsValues(currentFieldsValues);
  };

  const onReset = () => {
    setModalActive(false);
    setFieldsValues({
      title: '',
    });
    reset();
  };

  return (
    <Modal modalActive={modalActive} setModalActive={onReset}>
      <div className={styles.elementModal}>
        <div className={styles.titleWrapper}>
          <FaListUl size={25} className={styles.modalIcon} />
          <h2>{t('createColumn')}</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
          <InputLineText
            inputName={'title'}
            label={t('titleLabel')}
            placeholder={t('columnTitlePlaceholder')}
            register={register}
            fieldValue={fileldsValues.title || ''}
            symbolsLimit={1}
          />
          <ValidationErrorMessage
            message={errors.title && (t('oneSymbolValidationMessage') || '')}
          />
          <FormButtons handleCancelBtnClick={onReset} acceptBtnTitle={t('addButton')} />
        </form>
      </div>
    </Modal>
  );
};

export default ColumnModal;
