import React, { PureComponent } from "react";
import find from "lodash/find";

import { PlaceButton, IconButton } from "app/Components/Blocks";
import * as colors from "app/Theme/colors";

import { Container, Content, iconBtnStyles } from "./styles";
import { AddButton } from "./bocks";

export class PlacesScroller extends PureComponent {
  renderButtons = () => {
    const { points, selected, onDeletePoint, onSelectPoint } = this.props;
    const buttons = points.map((el, i) => {
      return (
        <PlaceButton
          key={i}
          text={el.text}
          isLoading={el.isLoading}
          selected={selected === i}
          onDelete={() => onDeletePoint(i)}
          onPress={() => onSelectPoint(i)}
        />
      );
    });

    const first = points[0];

    if (!points.length || (first && first.label && first.label !== "up")) {
      buttons.unshift(
        <PlaceButton
          key="pick up"
          text="Pick up"
          onPress={() => this.props.onAddPoint("up")}
          icon="search"
        />
      );
    }
    return buttons;
  };

  renderPickOffBtn = () => {
    const { points } = this.props;
    console.log("points", points);

    if (find(points, el => el.label === "off")) {
      return <AddButton onPress={() => this.props.onAddPoint("off")} />;
    } else {
      return (
        <PlaceButton
          key="pick off"
          text="Pick off"
          onPress={() => this.props.onAddPoint("off")}
          icon="search"
        />
      );
    }
  };

  render() {
    return (
      <Container horizontal={true} showsHorizontalScrollIndicator={false}>
        <Content>
          {this.renderButtons()}
          {this.renderPickOffBtn()}
        </Content>
      </Container>
    );
  }
}
