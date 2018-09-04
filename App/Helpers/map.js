import polyline from '@mapbox/polyline';

export const getFare = distance => {
  return 1 + Math.round(distance / 1000 * 0.5 * 10) / 10
}

export const parsePolylineToCoords = line => {
  return polyline.decode(line).map(coord => ({
    latitude: coord[0],
    longitude: coord[1]
  }))
}