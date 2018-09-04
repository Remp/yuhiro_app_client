import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Component from "./TelPanel";
import { getUser, getLoadingState, getError } from "app/Redux/selectors/auth";
import { sendTel } from "app/Redux/actions/auth";

const selector = createStructuredSelector({
  user: getUser,
  isLoading: getLoadingState,
  error: getError
});
const actions = {
  onSendTel: sendTel,
};
export const TelPanel = connect(
  selector,
  actions
)(Component);