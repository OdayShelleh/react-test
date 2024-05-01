import styled from "styled-components";

interface PaginationProps {
  totalCases: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const PaginationContainer = styled.ul<{ currentPage: number }>`
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  & li:nth-child(${(props) => props.currentPage}) a {
    transform: translateY(-7px);
    background-color: #0056b3;
    box-shadow: 0 2px 0 2px rgba(0, 0, 0, 0.2);
  }
`;
const PaginationButton = styled.a`
  background-color: #007bff;
  display: block;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin: 20px 5px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCases,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCases / 10); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <PaginationContainer currentPage={currentPage}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <PaginationButton
              onClick={() => paginate(number)}
              href="#"
              aria-current
            >
              {number}
            </PaginationButton>
          </li>
        ))}
      </PaginationContainer>
    </>
  );
};

export default Pagination;
