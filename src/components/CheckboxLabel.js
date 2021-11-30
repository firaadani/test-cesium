import React from "react";

const CheckboxLabel = ({
  id,
  handleClick,
  label,
  setter,
  batch,
  initialState,
}) => {
  return (
    <div>
      <label for={id}>
        <input
          id={id}
          type="checkbox"
          onClick={() => {
            if (batch === "2") {
              setter({ ...initialState, show: !initialState.show });
            } else {
              handleClick((prev) => !prev);
            }
          }}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckboxLabel;
