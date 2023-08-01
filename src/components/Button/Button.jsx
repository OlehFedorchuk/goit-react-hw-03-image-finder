import React from 'react';

const Button = ({ onClick, hasMore }) => {
  return (
    <div className='ContainerForBTNloadMore'>
      <button type="button" className="Button" onClick={onClick} disabled={!hasMore}>
      {hasMore ? 'Load more' : 'No more images'}
      </button>
    </div>
    
  );
};

export default Button;