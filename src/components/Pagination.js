import React from "react";
import "../components/ProductTable.css";

function Pagination({ currentPage, onPageChange, productsPerPage }) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage}
      </span>
      <button
        className="pagination-button"
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
