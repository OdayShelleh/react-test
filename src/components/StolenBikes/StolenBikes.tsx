import React, { useContext, useEffect, useState } from "react";
import StolenBikeItem from "./StolenBikeItem";
import StolenBike from "../../models/stolen-bike";
import useHttp from "../../hooks/use-http";
import Pagination from "../Pagination";
import BikeTheftFilter from "../Filters";
import BikesContext from "../../store/bikes-context";
import styled from "styled-components";
import StolenPlaceNav from "../StolenPlaceNav";
import Modal from "../Model";

const Grid = styled.ul`
  list-style: none;
  width: 90%;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  grid-gap: 3rem;
`;

const StolenBikes: React.FC<{}> = (props) => {
  const bikeCtx = useContext(BikesContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [stolenNum, setStolenNum] = useState({
    proximity: 0,
    allStolen: 0,
  });
  const { isLoading, error, sendRequest: fetchData } = useHttp();
  const {
    get: setBikes,
    bikesItems,
    filteredItems,
    error: notFoundError,
  } = bikeCtx;

  useEffect(() => {
    fetchData(
      {
        url: "https://bikeindex.org:443/api/v3/search/count?location=Munich&distance=100&stolenness=proximity",
      },
      (data: any) => {
        setStolenNum({
          proximity: data.proximity,
          allStolen: data.stolen,
        });
      }
    );
    fetchData(
      {
        url: `https://bikeindex.org:443/api/v3/search?page=${currentPage}&per_page=10&location=Munich&distance=100&stolenness=proximity`,
      },
      (data: any) => {
        console.log(data.bikes);
        const bikes: StolenBike[] = data.bikes.map((bike: any) => {
          const stolenDate = new Date(bike.date_stolen * 1000);
          return new StolenBike(
            bike.id,
            bike.title,
            bike.description,
            stolenDate,
            bike.year,
            bike.stolen_location,
            bike.large_img,
            bike.thumb
          );
        });
        // setStolenBikes(bikes);
        setBikes(bikes);
      }
    );
  }, [fetchData, currentPage, setBikes]);

  let bikesList;
  if (filteredItems.length !== 0) {
    bikesList = filteredItems.map((bike: StolenBike) => {
      return <StolenBikeItem key={bike.id} bike={bike} />;
    });
  } else {
    bikesList = bikesItems.map((bike: StolenBike) => {
      return <StolenBikeItem key={bike.id} bike={bike} />;
    });
  }

  return (
    <div>
      <BikeTheftFilter />
      {isLoading && <Modal children={<p>loading...</p>} />}
      {error && <p>Error: {error}</p>}
      {notFoundError && <p>{notFoundError}</p>}
      {bikesList.length === 0 && !isLoading && <p>No results found.</p>}
      {
        <StolenPlaceNav
          allStolen={stolenNum.allStolen}
          proximity={stolenNum.proximity}
        />
      }
      {!notFoundError && <Grid>{bikesList}</Grid>}
      <Pagination
        casesPerPage={10}
        currentPage={currentPage}
        totalCases={stolenNum.proximity}
        paginate={(pageNumber: number) => setCurrentPage(pageNumber)}
      />
    </div>
  );
};

export default StolenBikes;
