import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CenterLoader } from 'src/components/CenterLoader';
import CreateContactModal, {
  CreateContactType,
} from 'src/components/CreateContactModal/CreateContactModal';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchContacts } from 'src/store/features/contacts/actionCreators';
import {
  selectContacts,
  selectContactsStatus,
} from 'src/store/features/contacts/contactsSelectors';
import { IconAdd } from '@consta/uikit/IconAdd';
import styles from './styles.styl';
import { ContactType } from 'src/store/features/contacts/types';
import {
  addContact,
  editContact,
  removeContact,
} from 'src/store/features/contacts/contactsSlice';
import { TextField } from '@consta/uikit/TextField';
import { IconSearch } from '@consta/uikit/IconSearch';
import { ContactItem } from 'src/components/ContactItem';

const Contacts: React.FC = () => {
  // redux
  const dispatch = useAppDispatch();
  const { contacts } = useAppSelector((state) => ({
    status: selectContactsStatus(state),
    contacts: selectContacts(state),
  }));

  // component state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editData, setEditData] = useState<ContactType | null>(null);
  const [searchValue, setSearchValue] = useState('');

  // callbacks
  const closeCreateModal = useCallback(() => {
    setEditData(null);
    setIsCreateModalOpen(false);
  }, []);

  const startCreate = useCallback(() => {
    setEditData(null);
    setIsCreateModalOpen(true);
  }, []);

  const startEdit = useCallback((contact: ContactType) => {
    setEditData(contact);
    setIsCreateModalOpen(true);
  }, []);

  const deleteContact = useCallback(
    (id: number) => {
      dispatch(removeContact({ id }));
    },
    [dispatch],
  );

  const createContact = useCallback(
    (data: CreateContactType) => {
      dispatch(addContact(data));
      closeCreateModal();
    },
    [closeCreateModal, dispatch],
  );

  const saveContact = useCallback(
    (data: ContactType) => {
      dispatch(editContact(data));
      closeCreateModal();
    },
    [closeCreateModal, dispatch],
  );

  // memo values
  const contactsItems = useMemo(
    () =>
      contacts
        ? !searchValue
          ? contacts
          : contacts.filter(
              (contact) =>
                contact.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                contact.phone.toLowerCase().includes(searchValue.toLowerCase()),
            )
        : null,
    [contacts, searchValue],
  );

  // side effects
  useEffect(() => {
    dispatch(fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!contacts) return <CenterLoader />;
  return (
    <div className={styles.Contacts}>
      <div className={styles.Contacts__head}>
        <Text size="3xl" weight="semibold">
          Контакты
        </Text>
        <Button
          label="Создать контакт"
          onClick={startCreate}
          iconLeft={IconAdd}
        />
      </div>
      <TextField
        leftSide={IconSearch}
        placeholder="Поиск"
        width="full"
        className={styles.Contacts__search}
        value={searchValue}
        onChange={({ value }) => setSearchValue(value)}
      />
      {contactsItems?.map((contact) => (
        <ContactItem
          key={`ContactItem_${contact.id}`}
          contact={contact}
          deleteContact={deleteContact}
          startEdit={startEdit}
        />
      ))}
      <Modal isOpen={isCreateModalOpen}>
        <CreateContactModal
          close={closeCreateModal}
          create={createContact}
          edit={saveContact}
          data={editData}
          isNew={!editData}
        />
      </Modal>
    </div>
  );
};

export default Contacts;
