import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';


class ContactForm extends Component {
  state = {
    number: '',
    name: '',
  };

  onChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onSubmitForm = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const { onAddContact } = this.props;
    const isFormValidate = this.validateForm();
    if (!isFormValidate) return;
    onAddContact({ name, number, id:nanoid() });

    this.resetForm();
  };

  resetForm = () => this.setState({
    name: '',
    number: ''});


  validateForm = () => {
    const { name } = this.state;
    const { onCheckForUnique } = this.props;
    return onCheckForUnique(name);
  };

  render() {
    return (
      <form onSubmit={this.onSubmitForm}>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Enter your name"
          value={this.state.name}
          onChange={this.onChangeForm}
          required
        ></input>
        <input
          type="tel"
          name="number"
          placeholder="Enter your number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
          onChange={this.onChangeForm}
        />
        <button>Add Contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  onCheckForUnique: PropTypes.func.isRequired,
};

export default ContactForm;