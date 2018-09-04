import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Component from "./CodePanel";
import { getUser, getLoadingState, getError } from "app/Redux/selectors/auth";
import { sendCode, changeStep } from "app/Redux/actions/auth";

const selector = createStructuredSelector({
  user: getUser,
  isLoading: getLoadingState,
  error: getError
});
const actions = {
  onSendCode: sendCode,
  onChangeStep: changeStep
};
export const CodePanel = connect(
  selector,
  actions
)(Component);