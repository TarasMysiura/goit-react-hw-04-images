import { ToastContainer, toast } from 'react-toastify';

import { AppStyle } from 'components/App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Component } from 'react';
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

export class App extends Component {
  state = {
    searchValue: '',
    hits: [],
    isLoading: false,
    currentPage: 1,
    total: 0,
    error: false,
  };

  handleSearchFormSubmit = searchValue => {
    this.setState({ searchValue, hits: [], currentPage: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.currentPage !== prevState.currentPage ||
      this.state.searchValue !== prevState.searchValue
    ) {
      try {
        const { hits, totalHits } = await fetchImages(
          this.state.searchValue,
          this.state.currentPage
        );
        if (hits.length === 0) {
          return toast.error('Sorry images not found...', toastConfig);
        }
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          total: totalHits,
          isLoading: false,
        }));
        toast.success('Your posts were successfully fetched!', toastConfig);
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(error.message, toastConfig);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { isLoading, error, total, hits } = this.state;
    const totalPages = total / hits.length;
    return (
      <AppStyle>
        <Searchbar
          onSubmit={this.handleSearchFormSubmit}
          toastConfig={toastConfig}
        />
        {error && toast.error('Something went wrong...')}
        {this.state.hits && <ImageGallery hits={this.state.hits} />}
        {totalPages > 1 && !isLoading && hits.length >= 12 && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        <ToastContainer />
        {this.state.isLoading && <Loader />}
      </AppStyle>
    );
  }
}
