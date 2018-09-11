import React, { PureComponent } from "react";
import * as routes from "app/Constants/routes";
import { Provider } from "react-redux";
import { Router, Stack, Scene } from "react-native-router-flux";
import { generateStore } from "app/Redux";
import {
  AuthTel,
  AuthCode,
  AuthName,
  Main,
  History,
  Payment,
  Settings
} from "./Screens";

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={generateStore()}>
        <Router>
          <Stack hideNavBar key="root">
            <Scene initial key={routes.authTel} component={AuthTel} />
            <Scene key={routes.authCode} component={AuthCode} />
            <Scene key={routes.authName} component={AuthName} />
            <Scene key={routes.main} component={Main} />
            <Scene key={routes.history} component={History} />
            <Scene key={routes.payment} component={Payment} />
            <Scene key={routes.settings} component={Settings} />
          </Stack>
        </Router>
      </Provider>
    );
  }
}
