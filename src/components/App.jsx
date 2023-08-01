import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import './styles/styles.css'
class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    perPage: 12,
    showModal: false,
    modalImageUrl: '',
  };

  handleSearchSubmit = query => {
    this.setState({ searchQuery: query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModal = imageUrl => {
    this.setState({ showModal: true, modalImageUrl: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, modalImageUrl: '' });
  };

  render() {
    const { searchQuery, page, perPage, showModal, modalImageUrl } = this.state;

    return (
      <div className='App'>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {searchQuery && (
          <ImageGallery
            query={searchQuery}
            page={page}
            perPage={perPage}
            onLoadMore={this.handleLoadMore}
            onOpenModal={this.handleOpenModal}
          />
        )}
        {showModal && <Modal imageUrl={modalImageUrl} onCloseModal={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;