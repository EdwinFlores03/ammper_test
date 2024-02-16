"use client";
import { useState } from 'react';

const PaginationComponent = ({ data, itemsPerPage=1 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentItems = data.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
      <button onClick={nextPage} disabled={currentPage === maxPages}>Siguiente</button>
    </div>
  );
};

export default PaginationComponent;
