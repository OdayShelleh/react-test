import React, { useEffect } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  width: 50%;
  text-align: center;
  margin-left: 6rem;
  margin-top: 2rem;
  gap: 2rem;

  & div {
    width: 50%;
    padding: 0.8rem;
    background-color: #ccc;
    border-radius: 5px;
  }
`;

const StolenPlaceNav: React.FC<{
  allStolen: number;
  proximity: number;
}> = ({ allStolen, proximity }) => {
  return (
    <Nav>
      <div>Stolen within Minuch({proximity})</div>
      <div>Stolen anywhere({allStolen})</div>
    </Nav>
  );
};

export default StolenPlaceNav;
