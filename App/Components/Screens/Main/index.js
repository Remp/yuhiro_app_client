import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getStep, getLoadingState } from "app/Redux/selectors/auth";
import { getTaxi } from 'app/Redux/selectors/taxi'
import { getPoints, getSelected, getRoute } from "app/Redux/selectors/map";
import { sendTel } from "app/Redux/actions/auth";
import { acceptOrder, cancelOrder, testGetTaxi } from 'app/Redux/actions/taxi'
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
  route: getRoute,
  taxi: getTaxi
});

const actions = {
  onSendTel: sendTel,
  onAddPoint: addPoint,
  onLoadPoint: loadPoint,
  onSetPointLoading: setPointLoading,
  onSelectPoint: selectPoint,
  onDeletePoint: deletePoint,
  onCalculateWay: calculateWay,
  onResetCalcWay: resetCalcWay,
  onAcceptOrder: acceptOrder,
  onCancelOrder: cancelOrder,
  onTestGetTaxi: testGetTaxi
};

export const Main = connect(
  selector,
  actions
)(Component);
