import React from 'react';

const CheckboxLabel = ({ id, handleClick, label }) => {
  return (
    <div>
      <label for={id}>
        <input
          id={id}
          type="checkbox"
          onClick={() => handleClick((prev) => !prev)}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckboxLabel;
