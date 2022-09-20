import React from 'react';
import styles from './styles.styl';
import { ContactType } from 'src/store/features/contacts/types';
import { Button } from '@consta/uikit/Button';
import { IconTrash } from '@consta/uikit/IconTrash';
import { IconEdit } from '@consta/uikit/IconEdit';

export interface IContactItemProps {
  contact: ContactType;
  deleteContact: (id: number) => void;
  startEdit: (contact: ContactType) => void;
}

const ContactItem: React.FC<IContactItemProps> = ({
  contact,
  deleteContact,
  startEdit,
}) => {
  return (
    <div className={styles.ContactItem}>
      <div>
        <h2>{contact.name}</h2>
        {contact.phone}
      </div>
      <div className={styles.ContactItem__actions}>
        <Button
          onlyIcon
          iconRight={IconTrash}
          className={styles.ContactItem__actionsTrash}
          onClick={deleteContact.bind(null, contact.id)}
        />
        <Button
          onlyIcon
          iconRight={IconEdit}
          view="secondary"
          onClick={startEdit.bind(null, contact)}
        />
      </div>
    </div>
  );
};

export default ContactItem;
