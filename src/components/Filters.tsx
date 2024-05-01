import { useContext, useState } from "react";
import BikesContext from "../store/bikes-context";
import styled from "styled-components";

const FilterContainer = styled.div`
  margin-left: 6rem;
`;

const SearchInputStyle = styled.input`
  background-color: #f4f2f2;
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 100px;
  margin-bottom: 12px;
  border: solid 2px #777;
  width: 40%;
  transition: all 0.2s;

  &:focus {
    outline: none;
    width: 50%;
    background-color: #f0eeee;
  }
  &::-webkit-input-placeholder {
    font-weight: 100;
    color: #ccc;
  }
`;

const DateContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: start;

  & label {
    color: red;
  }
`;

const DateInputStyle = styled.input`
  background-color: #f4f2f2;
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 100px;
  margin-bottom: 12px;
  border: solid 2px #777;
  width: 10%;
  transition: all 0.2s;

  &:focus {
    outline: none;
    width: 15%;
    background-color: #f0eeee;
  }
`;

const Filters: React.FC = () => {
  const bikeCtx = useContext(BikesContext);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);

  const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(e.target.value);
    bikeCtx.titleFilter(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateFilter(e.target.value ? new Date(e.target.value) : null);
    console.log(e.target.value);
    bikeCtx.dateFilter(startDateFilter, endDateFilter);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateFilter(e.target.value ? new Date(e.target.value) : null);
    console.log(e.target.value);
    bikeCtx.dateFilter(startDateFilter, endDateFilter);
  };

  return (
    <FilterContainer>
      <SearchInputStyle
        type="text"
        value={titleFilter}
        onChange={handleTitleFilterChange}
        placeholder="Search stolen bikes in Minech"
      />

      <DateContainer>
        <label>Start Date: </label>
        <DateInputStyle
          type="date"
          value={
            startDateFilter ? startDateFilter.toISOString().split("T")[0] : ""
          }
          onChange={handleStartDateChange}
        />

        <label>End Date: </label>
        <DateInputStyle
          type="date"
          value={endDateFilter ? endDateFilter.toISOString().split("T")[0] : ""}
          onChange={handleEndDateChange}
        />
      </DateContainer>
    </FilterContainer>
  );
};

export default Filters;
