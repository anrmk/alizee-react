import React, { useState, useEffect } from "react";

import "./ChipsInput.scss";

function ChipsInput({ 
  items = [],
  value = "",
  error = null,
  name,
  className,
  placeholder,
  filters,
  max,

  onChange,
  onError
}) {
  const [localItems, setLocalItems] = useState(items);
  const [localValue, setLocalValue] = useState(value);
  const [localError, setLocalError] = useState(error);

  useEffect(() => {
    onChange && onChange(localItems);
  }, [localItems])

  useEffect(() => {
    onError && onError(localError);
  }, [localError])

  const handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      const val = localValue.trim();

      if (val && isValid(val)) {
        setLocalItems([...localItems, val]);
        setLocalValue("");
      }
    }
  };

  const handleChange = evt => {
    setLocalValue(evt.target.value);
    setLocalError(null)
  };

  const handleDelete = item => {
    setLocalItems(localItems.filter(i => i !== item));
  };

  const isValid = val => {
    let err = null;

    filters.forEach(filter => {
      const message = filter(val, localItems);

      if (message) {
        err = message;
      }
    })

    if (isInList(val)) {
      err = `${val} has already been added.`;
    }

    if (max && localItems.length >= max) {
      err = `${max} items limit.`;
    }

    if (err) {
      setLocalError(err);

      return false;
    }

    return true;
  }

  const isInList = (email) => {
    return localItems.includes(email);
  }

  return (
    <>
      {localItems.map(item => (
        <div className="tag-item" key={item}>
          {item}
          <button
            type="button"
            className="button"
            onClick={() => handleDelete(item)}
          >
            &times;
          </button>
        </div>
      ))}

      <div className="d-flex flex-column">
        <input
          className={className + " " + (localError && " has-error")}
          name={name}
          value={localValue}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />

        {max > 0 && <small className="text-muted align-self-end">{localItems.length}/{max}</small>}
      </div>

      {localError && <p className="error">{localError}</p>}
    </>
  )
}

export default ChipsInput;
