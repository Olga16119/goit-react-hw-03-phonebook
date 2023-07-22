import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount = () => {
     const contacts = localStorage.getItem('contacts');
    const contactsParse = JSON.parse(contacts);
    if (contactsParse) {
      this.setState({ contacts: contactsParse });
    }
  }

   componentDidUpdate = (_, prevState) => {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };



  onAddContact = newContact =>
    this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));

  onCheckContact = name => {
    const { contacts } = this.state;
    const isExistName = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    isExistName && alert(`${name}is already in contacs`);
    return !isExistName;
  };

  onFilterChange = filter => this.setState({ filter });

  onDeleteContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  getFilterOfContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.onAddContact}
          onCheckForUnique={this.onCheckContact}
        />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.onFilterChange} />
        <ContactList
          contacts={this.getFilterOfContacts()}
          onDelete={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;