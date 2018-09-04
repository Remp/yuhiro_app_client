import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Component from "./AuthTel";
import { getStep, getLoadingState } from "app/Redux/selectors/auth";
import { sendTel } from "app/Redux/actions/auth";

const selector = createStructuredSelector({
  step: getStep,
  isLoading: getLoadingState
});
const actions = {
  onSendTel: sendTel,
};
export const AuthTel = connect(
  selector,
  actions
)(Component);
