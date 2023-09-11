import React, { useState } from "react";
import '../components/ProductTable.css'

function Pagination({ currentPage, onPageChange, filteredProducts, productsPerPage }) {
  const totalPages = Math.ceil((filteredProducts?.length || 0) / productsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className={`pagination-button ${currentPage === 1 && "disabled"}`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={`pagination-button ${
          currentPage === totalPages && "disabled"
        }`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
