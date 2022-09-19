export type ContactType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};

export type ContactsResponseType = Array<ContactType>;
