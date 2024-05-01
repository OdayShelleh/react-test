import React from "react";
import StolenBike from "../models/stolen-bike";

type BikeContextType = {
  bikesItems: StolenBike[];
  filteredItems: StolenBike[];
  error: string | null;
  get: (items: StolenBike[]) => void;
  titleFilter: (text: string) => void;
  dateFilter: (start: Date | null, end: Date | null) => void;
};

const bikeContextDefault: BikeContextType = {
  bikesItems: [],
  filteredItems: [],
  error: null,
  get: (items: StolenBike[]) => {},
  titleFilter: (text: string) => {},
  dateFilter: (start: Date | null, end: Date | null) => {},
};

const BikesContext = React.createContext(bikeContextDefault);

export default BikesContext;
