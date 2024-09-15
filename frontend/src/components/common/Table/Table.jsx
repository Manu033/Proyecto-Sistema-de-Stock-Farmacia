import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Table({ children, className, maxHeight, height }) {
  return (
    <div className="overflow-y-scroll relative" style={{ maxHeight, height }}>
      <table className={classNames("w-full border-collapse", className)}>
        {children}
      </table>
    </div>
  );
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxHeight: PropTypes.string, // Nuevo prop para definir la altura máxima
};

// Mantén el resto de los componentes sin cambios

function THead({ children, className }) {
  return (
    <thead className={classNames("bg-gray-100 sticky top-0 z-10", className)}>
      {children}
    </thead>
  );
}

THead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function THeadRow({ children, className }) {
  return <tr className={classNames("text-left", className)}>{children}</tr>;
}

THeadRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function TBody({ children, className }) {
  return (
    <tbody className={classNames("divide-y divide-gray-200", className)}>
      {children}
    </tbody>
  );
}

TBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function TRow({ children, className, onClick }) {
  return (
    <tr className={classNames("hover:bg-gray-50", className)} onClick={onClick}>
      {children}
    </tr>
  );
}

TRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

function TData({ children, className }) {
  return <td className={classNames("px-4 py-1", className)}>{children}</td>;
}

TData.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export { Table, THead, THeadRow, TBody, TRow, TData };
