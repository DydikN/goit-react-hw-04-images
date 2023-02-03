import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import styles from './searchbar.module.scss';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSeachQueryChange = ({ target }) => {
    const { value } = target;
    setSearchQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return Notiflix.Notify.warning('Please write something');
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <div className={styles.searchFormButtonLabel}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
            </svg>
          </div>
        </button>

        <input
          className={styles.searchFormInput}
          type="text"
          name="searchQuery"
          autoComplete="off"
          value={searchQuery}
          onChange={handleSeachQueryChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
