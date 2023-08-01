import React from 'react';

const ImageGalleryItem = ({ image, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(image.largeImageURL);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleClick}>
      <img src={image.webformatURL} alt=""  className="ImageGalleryItem-image"/>
    </li>
  );
};

export default ImageGalleryItem;