import axios from "axios";

import { MAP_KEY } from "app/Configs/google";

export const getPredictions = input => {
  return axios({
    url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
    method: "GET",
    params: {
      key: MAP_KEY,
      input,
      // inputtype: "textquery",
      fields: "place_id,formatted_address,geometry",
      // locationbias: `circle:20000@${/*global.userCoords.latitude*/46.469391},${
      //   /*global.userCoords.longitude*/30.740883
      // }`
      location: `${46.469391},${30.740883}`,
      radius: 20000,
      types: 'address'
    }
  });
};

export const getGeoById = placeId => {
  return axios({
    url: "https://maps.googleapis.com/maps/api/place/details/json",
    method: "GET",
    params: {
      key: MAP_KEY,
      placeid: placeId
    }
  });
};

export const getRoute = (origin, dest) => {
  return axios({
    url: 'https://maps.googleapis.com/maps/api/directions/json',
    method: 'GET',
    params: {
      key: MAP_KEY,
      origin: `${origin.lat},${origin.lng}`,
      destination: `${dest.lat},${dest.lng}`
    },
    withCredentials: true
  })
}
