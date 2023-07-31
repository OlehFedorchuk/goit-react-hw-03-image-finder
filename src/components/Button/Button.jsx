import React from 'react';

const Button = ({ onClick, hasMore }) => {
  return (
    <button type="button" className="load-more" onClick={onClick} disabled={!hasMore}>
      {hasMore ? 'Load more' : 'No more images'}
    </button>
  );
};

export default Button;