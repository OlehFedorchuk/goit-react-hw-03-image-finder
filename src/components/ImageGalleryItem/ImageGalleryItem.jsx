import React from 'react';

const ImageGalleryItem = ({ image, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(image.largeImageURL);
  };

  return (
    <li className="gallery-item" onClick={handleClick}>
      <img src={image.webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;