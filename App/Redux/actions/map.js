import { createAsyncAction } from "app/Helpers/redux";
import { MAP_KEY } from "app/Configs/google";
import { apiCall } from "./api";

export const SET_POINT_LOADING = "map/SET_POINT_LOADING";
export const setPointLoading = () => ({
  type: SET_POINT_LOADING
});

export const LOAD_POINT = createAsyncAction("map/LOAD_POINT");
export const loadPoint = (coords, id) =>
  apiCall({
    types: LOAD_POINT,
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    query: {
      key: MAP_KEY,
      latlng: `${coords.lat},${coords.lng}`,
      location_type: "ROOFTOP"
    },
    metadata: {
      id,
      coords
    }
  });

export const ADD_POINT = createAsyncAction("map/ADD_POINT");
export const addPoint = (coords, label, id, init) =>
  apiCall({
    types: ADD_POINT,
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    query: {
      key: MAP_KEY,
      latlng: `${coords.lat},${coords.lng}`,
      location_type: "ROOFTOP"
    },
    metadata: {
      id,
      label,
      coords,
      init
    }
  });

export const SELECT_POINT = "map/SELECT_POINT";
export const selectPoint = selected => ({
  type: SELECT_POINT,
  selected
});

export const DELETE_POINT = "map/DELETE_POINT";
export const deletePoint = selected => ({
  type: DELETE_POINT,
  selected
});

export const CALCULATE_WAY = createAsyncAction("map/CALCULATE_WAY");
export const calculateWay = points => {
  const query = {}
  const waypoints = []

  query.origin = `${points[0].lat},${points[0].lng}`;
  query.destination = `${points[points.length - 1].lat},${
    points[points.length - 1].lng
  }`;

  if (points.length > 2) {
    for (let i = 1; i < points.length - 1; i++) {
      const point = points[i]

      waypoints.push(`via:${point.lat},${point.lng}`)
    }

    query.waypoints = waypoints.join('|')
  }

  

  return apiCall({
    types: CALCULATE_WAY,
    url: "http://maps.googleapis.com/maps/api/directions/json",
    query
  });
};

export const CALCULATE_WAY_RESET = 'map/CALCULATE_WAY_RESET'
export const resetCalcWay = () => ({
  type: CALCULATE_WAY_RESET
})
