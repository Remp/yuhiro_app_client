import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Component from "./AuthName";
import { getStep, getLoadingState } from "app/Redux/selectors/auth";
import { sendName } from "app/Redux/actions/auth";

const selector = createStructuredSelector({
  step: getStep,
  isLoading: getLoadingState
});
const actions = {
  onSendName: sendName,
};
export const AuthName = connect(
  selector,
  actions
)(Component);
