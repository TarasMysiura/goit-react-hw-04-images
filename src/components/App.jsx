import { ToastContainer, toast } from 'react-toastify';

import { AppStyle } from 'components/App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useEffect, useState } from 'react';
import { fetchImages } from 'services/Api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const toastConfig = {
  position: 'top-center',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);

  const handleSearchFormSubmit = searchValue => {
    setSearchValue(searchValue);
    setHits([]);
    setCurrentPage(1);
  };

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchHits = async () => {
      if (searchValue.trim() === '') {
        return;
      }
      try {
        const { hits, totalHits } = await fetchImages(searchValue, currentPage);
        if (hits.length === 0) {
          return toast.error('Sorry images not found...', toastConfig);
        }
        setHits(prevHits => [...prevHits, ...hits]);
        setTotal(totalHits);
        setIsLoading(false);
        toast.success('Your posts were successfully fetched!', toastConfig);
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHits();
  }, [searchValue, currentPage]);

  const totalPages = total / hits.length;
  return (
    <AppStyle>
      <Searchbar onSubmit={handleSearchFormSubmit} toastConfig={toastConfig} />
      {error && toast.error('Something went wrong...')}
      {hits && <ImageGallery hits={hits} />}
      {totalPages > 1 && !isLoading && hits.length >= 12 && (
        <Button onLoadMore={onLoadMore} />
      )}
      <ToastContainer />
      {isLoading && <Loader />}
    </AppStyle>
  );
};
