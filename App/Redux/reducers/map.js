import find from "lodash/find";
import { createReducer } from "app/Helpers/redux";
import {
  SET_POINT_LOADING,
  LOAD_POINT,
  SELECT_POINT,
  ADD_POINT,
  DELETE_POINT,
  CALCULATE_WAY,
  CALCULATE_WAY_RESET
} from "app/Redux/actions/map";

const initialState = {
  points: [],
  selected: null,
  route: {
    isLoading: false,
    isLoaded: false,
    error: null,
    curve: null,
    duraction: null,
    distance: null
  }
};

const handlers = {
  [SET_POINT_LOADING]: (state, action) => {
    const { selected } = state;

    const points = state.points.splice(0);
    const current = points[selected];
    current.isLoading = true;

    return {
      ...state,
      points
    };
  },
  [SELECT_POINT]: (state, { selected }) => {
    return {
      ...state,
      selected: state.selected === selected ? null : selected
    };
  },
  [ADD_POINT.REQUEST]: (state, { metadata }) => {
    const { coords, label, id } = metadata;
    const points = state.points.splice(0);
    const { lat, lng } = coords;
    let selected = null;

    const point = {
      lat,
      lng,
      isLoading: true,
      text: "",
      id,
      label
    };

    if (label === "up") {
      points.unshift(point);
      selected = 0;
    } else {
      points.push(point);
      selected = points.length - 1;
    }

    return {
      ...state,
      points,
      selected: metadata.init ? null : selected
    };
  },
  [ADD_POINT.SUCCESS]: (state, { payload, metadata }) => {
    const { selected } = state;

    if (selected === null && selected === undefined) return { ...state };

    const points = state.points.splice(0);
    const current = find(points, el => el.id === metadata.id);

    if (!current) return { ...state };

    const result = payload.data.results[0];
    if (!result) {
      current.text = `${current.lat}, ${current.lng}`;
    } else {
      current.text = result.formatted_address;
    }

    current.isLoading = false;

    return {
      ...state,
      points
    };
  },
  [LOAD_POINT.REQUEST]: (state, { metadata }) => {
    const { selected } = state;
    const {
      coords: { lat, lng }
    } = metadata;

    const points = state.points.splice(0);
    const currentPoint = points[selected];

    currentPoint.isLoading = true;
    currentPoint.lat = lat;
    currentPoint.lng = lng;

    return {
      ...state,
      points
    };
  },
  [LOAD_POINT.FAILURE]: state => {},
  [LOAD_POINT.SUCCESS]: (state, { payload, metadata }) => {
    const { selected } = state;

    if (selected === null && selected === undefined) return { ...state };

    const points = state.points.splice(0);
    const current = find(points, el => el.id === metadata.id);

    if (!current) return { ...state };

    const result = payload.data.results[0];

    if (!result) {
      current.text = `${current.lat}, ${current.lng}`;
    } else {
      current.text = result.formatted_address;
    }

    current.isLoading = false;

    return {
      ...state,
      points
    };
  },
  [DELETE_POINT]: (state, { selected }) => {
    return {
      ...state,
      points: state.points.filter((el, i) => i !== selected),
      selected: null
    }
  },
  [CALCULATE_WAY.REQUEST]: state => {
    return {
      ...state,
      route: {
        ...initialState.route,
        isLoading: true
      }
    }
  },
  [CALCULATE_WAY.SUCCESS]: (state, { payload }) => {
    const { data } = payload

    if (data.status === 'OK') {
      const route = data.routes[0]

      return {
        ...state,
        selected: null,
        route: {
          isLoaded: true,
          isLoading: false,
          error: null,
          curve: route.overview_polyline.points,
          duration: route.legs[0].duration.value,
          distance: route.legs[0].distance.value
        }
      }
    }
    return {
      ...state,
      route: {
        ...initialState.route,
        error: true
      }
    }
  },
  [CALCULATE_WAY_RESET]: state => {
    return {
      ...state,
      route: {
        ...initialState.route
      }
    }
  }
};
export default createReducer(initialState, handlers);
