import React, { useCallback, useReducer } from "react";
import BikesContext from "./bikes-context";
import StolenBike from "../models/stolen-bike";

type BikeState = {
  bikesItems: StolenBike[];
  filteredItems: StolenBike[];
  error: string | null;
};

const defaultBikesState: BikeState = {
  bikesItems: [],
  filteredItems: [],
  error: null,
};

const bikesReducer = (state: any, action: any) => {
  if (action.type === "GET") {
    const Items: StolenBike[] = action.list;
    return {
      bikesItems: Items,
      filteredItems: [],
      error: null,
    };
  }
  if (action.type === "TITLE_FILTER") {
    const stateList: StolenBike[] = [...state.bikesItems];
    if (action.text.trim().length === 0) {
      return {
        bikesItems: stateList,
        filteredItems: [],
        error: null,
      };
    }
    const filteredItems = stateList.filter((item: StolenBike) =>
      item.title.toLowerCase().includes(action.text.toLowerCase())
    );

    if (filteredItems.length === 0) {
      return {
        bikesItems: stateList,
        filteredItems: filteredItems,
        error: "There is no match.",
      };
    }
    return {
      bikesItems: stateList,
      filteredItems: filteredItems,
      error: null,
    };
  }
  if (action.type === "DATE_FILTER") {
    const stateList: StolenBike[] = [...state.bikesItems];

    const filteredItems = stateList.filter((item: StolenBike) => {
      const itemDateNumber: number = new Date(item.theftDate).getTime();
      const startDateNumber: number = new Date(action.startDate).getTime();
      const endDateNumber: number = new Date(action.endDate).getTime();

      if (!action.startDate || !action.endDate) return true;
      return (
        itemDateNumber >= startDateNumber && itemDateNumber <= endDateNumber
      );
    });

    console.log(filteredItems);
    return {
      bikesItems: stateList,
      filteredItems: filteredItems,
      error: null,
    };
  } else {
    return defaultBikesState;
  }
};

const BikesProvider = (props: any) => {
  const [bikesItemsState, dispatchBikesAction] = useReducer(
    bikesReducer,
    defaultBikesState
  );

  const fetchBikesHandler = useCallback((listItems: StolenBike[]) => {
    dispatchBikesAction({ type: "GET", list: listItems });
  }, []);

  const titleFilterHandler = (searchText: string) => {
    dispatchBikesAction({ type: "TITLE_FILTER", text: searchText });
  };
  const dateFilterHandler = (start: Date | null, end: Date | null) => {
    dispatchBikesAction({
      type: "DATE_FILTER",
      startDate: start,
      endDate: end,
    });
  };

  const bikeContext = {
    bikesItems: bikesItemsState.bikesItems,
    filteredItems: bikesItemsState.filteredItems,
    error: bikesItemsState.error,
    get: fetchBikesHandler,
    titleFilter: titleFilterHandler,
    dateFilter: dateFilterHandler,
  };
  return (
    <BikesContext.Provider value={bikeContext}>
      {props.children}
    </BikesContext.Provider>
  );
};

export default BikesProvider;
