import React from "react";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";
import { Table, THead, THeadRow, TBody, TRow, TData } from "./Table";
import SelectField from "../SelectField/SelectField";

function TableEditable({ fields, products, onChange, onDelete, className, maxHeight, height }) {
  const productOptions = [
    { value: "1", label: "Producto 1" },
    { value: "2", label: "Producto 2" },
    { value: "2", label: "Producto 2" },
    { value: "2", label: "Producto 2" },
    { value: "2", label: "Producto 2" },
    { value: "2", label: "Producto 2" },
    { value: "3", label: "Producto 3" },
    // Agrega más opciones según sea necesario
  ];

  return (
    <Table className={className} maxHeight={maxHeight} height={height}>
      <THead>
        <THeadRow>
          {fields.map((field, index) => (
            <TData key={index} className="font-semibold text-sm p-1">
              {field.label}
            </TData>
          ))}
          <TData className="font-semibold text-sm p-1"></TData>
        </THeadRow>
      </THead>
      <TBody>
        {products.map((product, rowIndex) => (
          <TRow key={rowIndex} className="align-middle">
            {fields.map((field, colIndex) => (
              <TData key={colIndex} className="p-1">
                {field.name === "producto" ? (
                  <SelectField
                    options={productOptions}
                    onSelect={(selectedOption) =>
                      onChange(rowIndex, field.name, selectedOption.label)
                    }
                    placeholder="Selecciona un producto..."
                    className="w-full"
                  />
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    value={product[field.name] || ""}
                    onChange={(e) =>
                      onChange(rowIndex, field.name, e.target.value)
                    }
                    className="w-full border p-1 text-sm"
                  />
                )}
              </TData>
            ))}
            <TData className="p-1">
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onDelete(rowIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <AiFillDelete size={20} />
                </button>
              </div>
            </TData>
          </TRow>
        ))}
      </TBody>
    </Table>
  );
}

TableEditable.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  className: PropTypes.string,
  maxHeight: PropTypes.string,
  height: PropTypes.string,
};

export default TableEditable;
