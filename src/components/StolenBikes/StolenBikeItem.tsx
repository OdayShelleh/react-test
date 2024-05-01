import React from "react";
import bikeImage from "../../assets/images.jpeg";
import StolenBike from "../../models/stolen-bike";
import styled from "styled-components";

const ListItemContainer = styled.li`
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Define the styled list item content
const ListItemContent = styled.div`
  display: flex;
  gap: 10px;
  background-color: #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;

  & img {
    width: 10rem;
    height: 10rem;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      border-radius: 10px;
    }
  }
`;

const ListItemTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
`;

const StolenBikeItem: React.FC<{ bike: StolenBike }> = ({ bike }) => {
  return (
    <ListItemContainer>
      <ListItemContent>
        <img src={bike.thumb ? bike.thumb : bikeImage} alt="A bicycle" />
        <div>
          <ListItemTitle>{bike.title}</ListItemTitle>
          <span>
            Theft Date : {bike.theftDate.toUTCString()} <br />
          </span>
          <span
            style={{
              color: "orangered",
            }}
          >
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              Reported Date:
            </span>
            {
              " Unavailable on this api, We need to fetch another api to get this information. "
            }
            <br />
          </span>
          <span>
            Location : {bike.location} <br />{" "}
          </span>
        </div>
      </ListItemContent>
    </ListItemContainer>
  );
};

export default StolenBikeItem;
