import React, { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = ({ onSubmit, toastConfig }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleNameChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      toast('Please enter a search name', toastConfig);

      return;
    }
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          value={searchValue}
          onChange={handleNameChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  toastConfig: PropTypes.object.isRequired,
};
