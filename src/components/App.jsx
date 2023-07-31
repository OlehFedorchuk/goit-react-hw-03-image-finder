import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    perPage: 0, // Змінено на 0
    showModal: false,
    modalImageUrl: '',
  };

  handleSearchSubmit = query => {
    this.setState({ searchQuery: query, page: 1, perPage: 12 }); // Змінено з perPage: 12 на perPage: 0
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
    const { searchQuery, page, perPage, apiKey, showModal, modalImageUrl } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {searchQuery && ( // Змінено тут, додано умову для завантаження ImageGallery
          <ImageGallery
            query={searchQuery}
            page={page}
            perPage={perPage}
            apiKey={apiKey}
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