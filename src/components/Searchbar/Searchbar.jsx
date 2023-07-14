import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleNameChange = event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchValue.trim() === '') {
      toast('Please enter a search name', this.props.toastConfig);

      return;
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            value={this.state.searchValue}
            onChange={this.handleNameChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};