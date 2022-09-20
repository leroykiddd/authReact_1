import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import React, { useCallback, useMemo, useState } from 'react';
import { ContactType } from 'src/store/features/contacts/types';
import styles from './styles.styl';

export type CreateContactType = {
  name: string;
  phone: string;
};

export interface ICreateContactModalProps {
  close: () => void;
  create: (data: CreateContactType) => void;
  edit: (data: ContactType) => void;
  isNew?: boolean;
  data?: ContactType;
}

const CreateContactModal: React.FC<ICreateContactModalProps> = ({
  close,
  create,
  edit,
  data,
  isNew,
}) => {
  // component state
  const [name, setName] = useState(data?.name ?? '');
  const [phone, setPhone] = useState(data?.phone ?? '');

  // memo values
  const isDisabledSave = useMemo(() => !(name && phone), [name, phone]);

  // callbacks
  const save = useCallback(() => {
    if (isNew) {
      return create({ name, phone });
    }
    edit({ id: data.id, name, phone });
  }, [create, data?.id, edit, isNew, name, phone]);

  return (
    <div className={styles.CreateContactModal}>
      <div className={styles.CreateContactModal__body}>
        <Text
          size="2xl"
          weight="semibold"
          className={styles.CreateContactModal__title}
        >
          {isNew ? 'Создание' : ' Редактирование'}
        </Text>
        <TextField
          id="name"
          onChange={({ value }) => setName(value)}
          className={styles.CreateContactModal__name}
          value={name}
          label="Имя"
          placeholder="Введите имя"
          width="full"
        />
        <TextField
          id="login"
          onChange={({ value }) => setPhone(value)}
          value={phone}
          label="Номер телефона"
          placeholder="Введите номер телефона"
          width="full"
        />
      </div>
      <div className={styles.CreateContactModal__actions}>
        <Button onClick={close} label="Отмена" view="ghost" />
        <Button
          onClick={save}
          label={isNew ? 'Создать' : 'Сохранить'}
          disabled={isDisabledSave}
        />
      </div>
    </div>
  );
};

export default CreateContactModal;
