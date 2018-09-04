import React, { PureComponent } from "react";
import { ImageBackground, Text } from "react-native";
import { containerStyle } from "./styles";
import Swiper from "react-native-swiper";
// import background from "app/Assets/images/background.jpg";
import authSteps from "app/Constants/authSteps";
import { Container } from "./styles";
import { TelPanel, CodePanel } from "./blocks";

export default class Auth extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { step: nextStep } = nextProps;
    const { step } = this.props;
    if (nextStep === authSteps.TEL && step === authSteps.CODE) {
      this.swiper.scrollBy(-1);
      return;
    }
    if (nextStep === authSteps.TEL && step === authSteps.NAME) {
      this.swiper.scrollBy(-2);
      return;
    }
    if (nextStep === authSteps.CODE || nextStep === authSteps.NAME) {
      this.swiper.scrollBy(1);
      return;
    }
  }
  render() {
    return (
      <Container>
        <ImageBackground source={background} style={containerStyle} />
        <Swiper
          ref={el => (this.swiper = el)}
          scrollEnabled={false}
          showsPagination={false}
        >
          <TelPanel />
          <CodePanel />
        </Swiper>
      </Container>
    );
  }
}
