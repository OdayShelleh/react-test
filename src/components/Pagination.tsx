import React from "react";
import styled from "styled-components";

interface PaginationProps {
  casesPerPage: number;
  totalCases: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const PaginationWrapper = styled.nav`
  ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    padding: 0;
  }

  li {
    margin: 0 5px;
  }

  button {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    color: #333;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: #ddd;
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .active button {
    background-color: #007bff;
    color: #fff;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  casesPerPage,
  totalCases,
  currentPage,
  paginate,
}) => {
  const pageNumbers: number[] = [];
  const totalPages = Math.ceil(totalCases / casesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    const maxPage = Math.min(maxPagesToShow, totalPages);
    let startPage = 1;

    if (totalPages > maxPagesToShow) {
      startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    }

    const endPage = Math.min(startPage + maxPage - 1, totalPages);

    return pageNumbers.slice(startPage - 1, endPage).map((number) => (
      <li key={number} className={currentPage === number ? "active" : ""}>
        <button onClick={() => paginate(number)}>{number}</button>
      </li>
    ));
  };

  return (
    <PaginationWrapper>
      <ul>
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </PaginationWrapper>
  );
};

export default Pagination;
