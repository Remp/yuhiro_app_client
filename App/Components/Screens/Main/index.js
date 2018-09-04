import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getStep, getLoadingState } from "app/Redux/selectors/auth";
import { getPoints, getSelected, getRoute } from "app/Redux/selectors/map";
import { sendTel } from "app/Redux/actions/auth";
import {
  addPoint,
  loadPoint,
  setPointLoading,
  selectPoint,
  deletePoint,
  calculateWay,
  resetCalcWay
} from "app/Redux/actions/map";
import Component from "./Main";

const selector = createStructuredSelector({
  step: getStep,
  isLoading: getLoadingState,
  points: getPoints,
  selected: getSelected,
  route: getRoute
});

const actions = {
  onSendTel: sendTel,
  onAddPoint: addPoint,
  onLoadPoint: loadPoint,
  onSetPointLoading: setPointLoading,
  onSelectPoint: selectPoint,
  onDeletePoint: deletePoint,
  onCalculateWay: calculateWay,
  onResetCalcWay: resetCalcWay
};

export const Main = connect(
  selector,
  actions
)(Component);
