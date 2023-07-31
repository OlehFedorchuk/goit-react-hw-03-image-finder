import React from 'react';
import { nanoid } from 'nanoid'
const ImageGalleryItem = ({ image }) => {
  const handleClick = () => {
  };

  return (
    <li className="gallery-item" onClick={handleClick} key={nanoid()}> 
      <img src={image.webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;