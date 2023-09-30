import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
type ContactType={
    name:string|undefined, phone:string|undefined, description:string|undefined, id?:string|undefined
}
type ContactStoreType={
    contacts:ContactType[],editId:string|undefined
}
const store = writable<ContactStoreType>({ contacts: [], editId: undefined });

export default {
  subscribe: store.subscribe,
  add: (name:string|undefined, phone:string|undefined, description:string|undefined) => {
    store.update(({ contacts }) => {
      const newContacts = [
        { name, phone, description, id: uuidv4() },
        ...contacts,
      ];
      console.log('contacts',contacts);
      
      return { contacts: newContacts, editId: undefined };
    });
  },
  editContact: (contactId:string|undefined) => {
    store.update(({ contacts }) => {
      return { contacts, editId: contactId };
    });
  },
  edit: (contactId:string, name:string|undefined, phone:string|undefined, description:string|undefined) => {
    store.update(({ contacts }) => {
      const newContacts = contacts.map((contact) => {
        if (contact.id === contactId) {
          return { id: contactId, name, phone, description };
        }

        return contact;
      });
      return { contacts: newContacts, editId: undefined };
    });
  },
  delete: (contactId:string|undefined) => {
    store.update(({ contacts }) => {
      const newContacts = contacts.filter((c) => c.id !== contactId);
      return { contacts: newContacts, editId: undefined };
    });
  },
};