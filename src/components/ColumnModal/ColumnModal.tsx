import React, { useState } from 'react';
import Modal from 'components/Modal';
import styles from './ColumnModal.module.scss';
import InputLineText from 'components/InputLineText';
import { useForm } from 'react-hook-form';
import IBoard from 'types/IBoard';
import FormButtons from 'components/FormButtons';
import ValidationErrorMessage from 'components/ValidationErrorMessage';
import { FaListUl } from 'react-icons/fa';

interface ColumnModalProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColumnModal: React.FC<ColumnModalProps> = ({ modalActive, setModalActive }) => {
  const [fileldsValues, setFieldsValues] = useState<Partial<IBoard>>({});

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
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Partial<IBoard>>();

  return (
    <Modal modalActive={modalActive} setModalActive={setModalActive}>
      <div className={styles.elementModal}>
        <div className={styles.titleWrapper}>
          <FaListUl size={25} />
          <h2>Add column</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
          <InputLineText
            inputName={'title'}
            label={'Title'}
            placeholder={'Add column heading'}
            register={register}
            fieldValue={fileldsValues.title || ''}
            symbolsLimit={1}
          />
          <ValidationErrorMessage message={errors.title && 'Min 1 symbol'} />
          <FormButtons handleCancelBtnClick={onReset} />
        </form>
      </div>
    </Modal>
  );
};

export default ColumnModal;
