import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Component from "./AuthCode";
import { getStep, getLoadingState } from "app/Redux/selectors/auth";
import { sendCode, changeStep } from "app/Redux/actions/auth";

const selector = createStructuredSelector({
  step: getStep,
  isLoading: getLoadingState
});
const actions = {
  onSendCode: sendCode,
  onChangeStep: changeStep
};
export const AuthCode = connect(
  selector,
  actions
)(Component);
