import React from 'react';

function Error({ classes, children }) {
  return (
    <>
      <div className={classes}>
        {children}
      </div>
    </>
  );
}

export default Error;
