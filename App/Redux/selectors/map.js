import { createSelector } from "reselect";

const getMap = store => store.map;

export const getPoints = createSelector(getMap, data => data.points);

export const getSelected = createSelector(getMap, data => data.selected)

export const getRoute = createSelector(getMap, data => data.route)