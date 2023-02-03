import { useEffect, useState } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import getImages from '../services/services';
import styles from './app.module.scss';
import Notiflix from 'notiflix';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    async function fetchImages() {
      try {
        setLoading(true);
        const data = await getImages(searchQuery, page);
        const { hits, totalHits } = data;
        setItems(prevItems => {
          return [...prevItems, ...hits];
        });
        setTotalHits(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [page, searchQuery]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const hadleSeachSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setItems([]);
    setPage(1);
  };

  const handleShowModal = event => {
    const imgAlt = event.target.alt;
    const largeImageURL = event.target.srcset;

    setShowModal(true);
    setImgAlt(imgAlt);
    setLargeImageURL(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImgAlt('');
    setLargeImageURL('');
  };

  return (
    <div className={styles.app}>
      {showModal && (
        <Modal
          imgAlt={imgAlt}
          imgLargeSrc={largeImageURL}
          onModalClose={handleCloseModal}
        />
      )}
      <Searchbar onSubmit={hadleSeachSubmit} />
      {items.length > 0 && (
        <ImageGallery items={items} handleShowModal={handleShowModal} />
      )}

      {error && Notiflix.Notify.failure(`${error}`)}
      {items.length > 0 && items.length < totalHits && (
        <Button loadMore={loadMore} />
      )}
      {loading && <Loader />}
    </div>
  );
}

export default App;
