import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

function SelectField({ options, onSelect, placeholder, className }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectRef = useRef(null);

  useEffect(() => {
    // Cerrar el dropdown si se hace clic fuera del componente
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(value)
      )
    );
    setIsOpen(true); // Abrir el dropdown al buscar
  };

  const handleSelect = (option) => {
    onSelect(option);
    setSearch(option.label);
    setIsOpen(false);
  };

  const handleBlur = () => {
    if (!filteredOptions.some(option => option.label === search)) {
      setSearch(""); // Limpiar si no coincide con ninguna opción
    }
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        onClick={() => setIsOpen(true)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-32 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

SelectField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default SelectField;
