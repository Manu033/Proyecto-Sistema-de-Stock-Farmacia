import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pager = ({ pagination, onPageChange, currentPage }) => {
  if (!pagination) return null;

  const { totalPages, totalRecords, recordsPerPage } = pagination;
  const startRecord = (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-1 text-xs bg-white rounded-md border border-gray-300 h-12 w-28">
      <span className="text-gray-500">
        {startRecord}-{endRecord} de {totalRecords}
      </span>
      <div className="flex items-center space-x-1">
        <button
          onClick={handlePrev}
          className={`p-1 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-primary'}`}
          disabled={currentPage === 1}
          aria-label="Anterior"
        >
          <FaChevronLeft size={15} />
        </button>
        <button
          onClick={handleNext}
          className={`p-1 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-primary'}`}
          disabled={currentPage === totalPages}
          aria-label="Siguiente"
        >
          <FaChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default Pager;
