import React, { useEffect } from 'react';
import { CenterLoader } from 'src/components/CenterLoader';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { fetchContacts } from 'src/store/features/contacts/actionCreators';
import {
  selectContacts,
  selectContactsStatus,
} from 'src/store/features/contacts/contactsSelectors';
import styles from './styles.styl';

const Contacts: React.FC = () => {
  // redux
  const dispatch = useAppDispatch();
  const { contacts } = useAppSelector((state) => ({
    status: selectContactsStatus(state),
    contacts: selectContacts(state),
  }));

  // side effects
  useEffect(() => {
    dispatch(fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!contacts) return <CenterLoader />;
  return (
    <div className={styles.Contacts}>
      {contacts?.map((contact) => (
        <div key={`Contact_${contact.id}`} className={styles.ContactsItem}>
          <h2>{contact.name}</h2>
          {contact.phone}
        </div>
      ))}
    </div>
  );
};

export default Contacts;
