import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import styles from './BoardModal.module.scss';
import InputLineText from 'components/InputLineText';
import { useForm } from 'react-hook-form';
import IBoard from 'types/IBoard';
import FormButtons from 'components/FormButtons';
import ValidationErrorMessage from 'components/ValidationErrorMessage';
import { FaRegClipboard } from 'react-icons/fa';
import InputTextarea from 'components/InputTextarea';
import { useTranslation } from 'react-i18next';

interface BoardModalProps {
  modalActive: boolean;
  modalMode: 'create' | 'edit';
  selectedBoard: IBoard | null;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardModal: React.FC<BoardModalProps> = ({
  modalActive,
  modalMode,
  setModalActive,
  selectedBoard,
}) => {
  const [fileldsValues, setFieldsValues] = useState<Partial<IBoard>>({});

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Partial<IBoard>>();

  useEffect(() => {
    if (modalActive && selectedBoard && modalMode === 'edit') {
      setValue('title', selectedBoard.title);
      setValue('description', selectedBoard.description);

      setFieldsValues({
        title: selectedBoard.title,
        description: selectedBoard.description,
      });
    }
  }, [modalActive, modalMode, selectedBoard, setValue]);

  const onSubmit = (data: Partial<IBoard>) => {
    // Do your magic here ...
    console.log(data);
  };

  const onChange = () => {
    const currentFieldsValues = getValues();

    setFieldsValues(currentFieldsValues);
  };

  const onReset = () => {
    setModalActive(false);
    setFieldsValues({
      title: '',
      description: '',
    });
    reset();
  };

  return (
    <Modal modalActive={modalActive} setModalActive={onReset}>
      <div className={styles.elementModal}>
        <div className={styles.titleWrapper}>
          <FaRegClipboard size={25} />
          <h2>
            {modalMode === 'create' ? t('create') : t('edit')} {t('board')}
          </h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
          <InputLineText
            inputName={'title'}
            label={t('titleLabel')}
            placeholder={t('titlePlaceholder')}
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
          <FormButtons
            handleCancelBtnClick={onReset}
            acceptBtnTitle={modalMode === 'create' ? t('create') : t('updateButton')}
          />
        </form>
      </div>
    </Modal>
  );
};

export default BoardModal;
