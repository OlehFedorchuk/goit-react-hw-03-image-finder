
import React, { Component } from 'react';
import axios from 'axios';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { nanoid } from 'nanoid'

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ images: [], isLoading: false, currentPage: 1 });
      this.fetchImages();
    }
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  addScrollListener = () => {
    window.addEventListener('scroll', this.handleScroll);
  };

  removeScrollListener = () => {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = () => {
    const { isLoading, images, totalImages, currentPage, perPage } = this.state;
    if (!isLoading && images.length < totalImages) {
      const { innerHeight } = window;
      const { scrollHeight, scrollTop } = document.documentElement;
      const scrolledToBottom = innerHeight + scrollTop >= scrollHeight;

      if (scrolledToBottom) {
        this.setState({ isLoading: true, currentPage: currentPage + 1 }, () => {
          this.fetchImages();
        });
      }
    }
  };

  fetchImages = () => {
    const { query } = this.props;
    const { currentPage, perPage } = this.state;
    const apiKey = '37446225-ced4f53dd81a7d760f8a029fd'; 
    const url = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    axios
      .get(url)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          isLoading: false,
          totalImages: response.data.total,
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
        <ul className="gallery">
          {images.map((image, index) => (
            <ImageGalleryItem key={nanoid()} image={image} />
          ))}
        </ul>
        {isLoading && <Loader />}
        {images.length > 0 && images.length < totalImages && (
          <Button onClick={this.handleLoadMore} hasMore={!isLoading} />
        )}
      </div>
    );
  }
}

export default ImageGallery;