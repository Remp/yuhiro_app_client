import { createSelector } from "reselect";

export const getTaxi = createSelector(store => store.taxi, data => data);
