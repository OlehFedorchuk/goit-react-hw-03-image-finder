import React, { Component } from 'react';
import axios from 'axios';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { nanoid } from 'nanoid';
import PropTypes  from 'prop-types';

class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    totalImages: 0,
    currentPage: 1,
    perPage: 12,
  };

  componentDidMount() {
    this.fetchImages();
    this.addScrollListener();
  }

 componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ images: [], isLoading: false, currentPage: 1 }, () => {
        this.fetchImages();
      });
    }
  }
  componentWillUnmount() {
    this.removeScrollListener();
  }

  addScrollListener = () => {
    window.addEventListener('load', this.handleScroll);
  };

  removeScrollListener = () => {
    window.removeEventListener('load', this.handleScroll);
  };

  handleScroll = () => {
    const { isLoading, images, totalImages} = this.state;
    if (!isLoading && images.length < totalImages) {
      const { innerHeight } = window;
      const { scrollHeight, scrollTop } = document.documentElement;
      const scrolledToBottom = innerHeight + scrollTop >= scrollHeight;

      if (scrolledToBottom) {
        this.fetchImages();
      }
    }
  };

  fetchImages = () => {
    const { query } = this.props;
    const { currentPage, perPage } = this.state;
    const apiKey = '37446225-ced4f53dd81a7d760f8a029fd';
    const url = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    this.setState({ isLoading: true });

    axios
      .get(url)
      .then(response => {
        const newImages = response.data.hits.map(image => ({
          ...image,
          id: nanoid(),
        }));

        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          isLoading: false,
          totalImages: response.data.total,
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { images, isLoading, totalImages } = this.state;

    return (
      <div>
        <ul className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} onOpenModal={this.props.onOpenModal} />
          ))}
        </ul>
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalImages && (
          <Button onClick={this.fetchImages} hasMore={!isLoading} />
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;