import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Component from "./Auth";
import { getStep } from "app/Redux/selectors/auth";
import { sendTel, sendCode } from "app/Redux/actions/auth";

const selector = createStructuredSelector({
  step: getStep
});
const actions = {
  onSendTel: sendTel,
  onSendCode: sendCode
};
export const Auth = connect(
  selector,
  actions
)(Component);
