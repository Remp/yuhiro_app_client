import React, { PureComponent } from "react";
import { BackHandler, Keyboard } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import uuid from "uuid";
import find from "lodash/find";
import debounce from "lodash/debounce";

import nightStyle from "app/Theme/map/night";
import coboltStyle from "app/Theme/map/cobolt";
import strangerStyle from "app/Theme/map/stranger";
import * as colors from "app/Theme/colors";
import { IconButton, PlacesScroller } from "app/Components/Blocks";
import { getPredictions, getGeoById } from "app/Api/map";
import { parsePolylineToCoords } from "app/Helpers/map";

import { Container, Tools, Upper, MarkerContainer, mapStyle } from "./styles";
import {
  AnimatedTextBox,
  AnimatedSearchPanel,
  AnimatedSideMenuBar,
  AnimatedOkeyButton,
  AnimatedAcceptPanel,
  CalcBackButton
} from "./innerBlocks";

export default class Main extends PureComponent {
  region = {
    latitude: 46.469391,
    longitude: 30.740883,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421
  };

  constructor(props) {
    super();

    this.state = {
      moving: false, // prevents no needed request for address if select point
      searchText: "",
      isSearching: false,
      places: [],
      loadPlaces: false,
      tabIndex: 0,
      isMenuOpen: false,
      isOkayBtnDisplayed: false
    };

    const { onAddPoint } = props;

    navigator.geolocation.getCurrentPosition(
      res => {
        const { latitude, longitude } = res.coords;
        this.map.animateToRegion({
          latitudeDelta: 0.02,
          longitudeDelta: 0.04,
          latitude,
          longitude
        });

        global.userCoords = res.coords;

        const id = uuid.v1();

        onAddPoint(
          {
            lat: latitude,
            lng: longitude
          },
          "up",
          id,
          true
        );
      },
      err => console.log("error", err),
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000
      }
    );
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { points } = nextProps;

    // whether render OkayButton or not
    if (points.length < 2) {
      return { isOkayBtnDisplayed: false };
    }

    // check for pick up & pick off points presence
    let upPointPresent;
    let offPointPresent;

    for (const point of points) {
      if (point.label === "up") {
        upPointPresent = true;
      } else if (point.label === "off") {
        offPointPresent = true;
      }
    }

    if (upPointPresent && offPointPresent) {
      return { isOkayBtnDisplayed: true };
    }

    return { isOkayBtnDisplayed: false };
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this._forbidBack);
  }

  componentDidUpdate(prevProps, prevState) {
    const { route, points } = this.props;

    if (route.isLoaded && !prevProps.route.isLoaded) {
      const start = points[0]
      const end = points[points.length - 1]

      this.map.animateToRegion({
        latitude: (start.lat + end.lat) / 2,
        longitude: (start.lng + end.lng) / 2,
        longitudeDelta: 0.02,
        latitudeDelta: 0.02
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._forbidBack);
  }

  _forbidBack = () => true;

  handleRegionChange = region => {
    const { onLoadPoint, points, selected } = this.props;
    const { moving, isSearching } = this.state;

    this.region = region;

    const currentPoints = points[selected];

    if (currentPoints && !moving && !isSearching) {
      const id = currentPoints.id;

      onLoadPoint(
        {
          lat: region.latitude,
          lng: region.longitude
        },
        id
      );
    }

    this.setState({ moving: false });
  };

  handleSelectPoint = async id => {
    const { onSelectPoint, points } = this.props;

    const { lat, lng } = points[id];

    onSelectPoint(id);

    this.setState({ moving: true });

    this.map.animateToRegion({
      latitudeDelta: 0.002,
      longitudeDelta: 0.004,
      latitude: lat,
      longitude: lng
    });
  };

  handleMapPress = e => {
    const coords = e.nativeEvent.coordinate;

    this.map.animateToCoordinate(coords, 100);
  };

  handleAddPoint = label => {
    const { onAddPoint } = this.props;
    const { longitude, latitude } = this.region;

    const coords = {
      lat: latitude,
      lng: longitude
    };

    const id = uuid.v1();

    onAddPoint(coords, label, id);
  };

  handleSearchBtnPress = () => {
    const { isMenuOpen, isSearching } = this.state;

    //if menu open, then wait for animation end and open searching panel
    if (isMenuOpen) {
      this.setState({ isMenuOpen: false });

      setTimeout(() => this.setState({ isSearching: !isSearching }), 200);
    } else {
      this.setState({ isSearching: !isSearching });
    }

    if (isSearching) {
      // Keyboard.removeListener("keyboardDidHide", this._handleBackSearch);
      BackHandler.addEventListener("hardwareBackPress", this.handleBackSearch);
    } else {
      // Keyboard.addListener("keyboardDidHide", this._handleBackSearch);
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackSearch
      );
    }
  };

  handleSearchTextChange = async text => {
    this.setState({ searchText: text, loadPlaces: true, tabIndex: 0 });

    try {
      const result = (await getPredictions(text)).data;

      if (result.status === "OK") {
        this.setState({
          places: result.predictions,
          loadPlaces: false
        });
      } else {
        this.setState({ loadPlaces: false });
      }
    } catch (err) {
      this.setState({ loadPlaces: false });
    }
  };

  handleAddressClick = async id => {
    try {
      const data = (await getGeoById(id)).data;

      if (data.status === "OK" && data.result) {
        const coordinates = data.result.geometry.location;

        this.map.animateToCoordinate(
          {
            latitude: coordinates.lat,
            longitude: coordinates.lng
          },
          0
        );
      }
    } catch (err) {}

    this.setState({ isSearching: false });
  };

  handleMenuToggle = () => {
    const { isMenuOpen, isSearching } = this.state;

    //if searching panel open, then wait for animation end and open menu
    if (isSearching) {
      this.setState({ isSearching: false });

      setTimeout(() => this.setState({ isMenuOpen: !isMenuOpen }), 200);
    } else {
      this.setState({ isMenuOpen: !isMenuOpen });
    }
  };

  handleSearchPanelToggle = () => {
    const { isMenuOpen, isSearching } = this.state;

    //if menu open, then wait for animation end and open searching panel
    if (isMenuOpen) {
      this.setState({ isMenuOpen: false });

      setTimeout(() => this.setState({ isSearching: !isSearching }), 200);
    } else {
      this.setState({ isSearching: !isSearching });
    }
  };

  handleBackSearch = () => {
    this.setState({ isSearching: false });
    // Keyboard.removeListener("keyboardDidHide", this._handleBackSearch);
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackSearch);

    return true;
  };

  renderMarkers = () => {
    const { points, selected, route } = this.props;

    const markers = [];

    for (let i = 0; i < points.length; i++) {
      if (selected === i) continue;

      const current = points[i];

      markers.push(
        <Marker
          key={current.id}
          coordinate={{
            latitude: current.lat,
            longitude: current.lng
          }}
        >
          <Icon name="map-marker" color="white" size={40} />
        </Marker>
      );
    }

    return markers;
  };

  render() {
    const {
      points,
      selected,
      route,
      onSetPoint,
      onSetPointLoading,
      onDeletePoint,
      onCalculateWay,
      onResetCalcWay
    } = this.props;

    const {
      isSearching,
      searchText,
      places,
      loadPlaces,
      tabIndex,
      isMenuOpen,
      isOkayBtnDisplayed
    } = this.state;

    return (
      <Container>
        <MapView
          customMapStyle={strangerStyle}
          initialRegion={this.region}
          style={mapStyle}
          ref={el => (this.map = el)}
          onPress={this.handleMapPress}
          // onRegionChange={currentRegion => this.setState({ currentRegion })}
          onRegionChangeComplete={this.handleRegionChange}
        >
          {route.isLoaded && (
            <Polyline
              coordinates={parsePolylineToCoords(route.curve)}
              strokeWidth={6}
              strokeColor={colors.lightBlue}
            />
          )}
          {this.renderMarkers()}
        </MapView>
        <AnimatedAcceptPanel
          display={route.isLoaded}
          distance={route.distance}
          duration={route.duration}
          onAccept={() => {}}
        />

        {/*below absolute positioned components*/}
        {route.isLoaded && <CalcBackButton onPress={onResetCalcWay} />}
        <AnimatedOkeyButton
          display={isOkayBtnDisplayed && !route.isLoaded}
          loading={route.isLoading}
          onPress={() => onCalculateWay(points)}
        />
        <Tools>
          <Upper>
            <IconButton
              name={isMenuOpen ? "chevron-left" : "bars"}
              color="white"
              size={30}
              onPress={this.handleMenuToggle}
            />
            <IconButton
              name={isSearching ? "chevron-left" : "search"}
              color="white"
              size={30}
              onPress={this.handleSearchBtnPress}
            />
            <AnimatedTextBox
              display={isSearching}
              placeholder="Search..."
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              value={searchText}
              onChangeText={this.handleSearchTextChange}
            />
          </Upper>
          <AnimatedSearchPanel
            display={isSearching}
            isSearchLoading={loadPlaces}
            searchPlaces={places}
            tabIndex={tabIndex}
            onChangeTab={tabIndex => this.setState({ tabIndex })}
            onPressAddress={this.handleAddressClick}
          />
        </Tools>
        {!isSearching && !route.isLoaded ? (
          <PlacesScroller
            points={points}
            selected={selected}
            onAddPoint={this.handleAddPoint}
            onSetPoint={this.handleSelectPoint}
            onSetPointLoading={onSetPointLoading}
            onSetPoint={onSetPoint}
            onSelectPoint={this.handleSelectPoint}
            onDeletePoint={onDeletePoint}
          />
        ) : null}
        <AnimatedSideMenuBar display={isMenuOpen} />
        {selected !== null && selected !== undefined && !isSearching ? (
          <MarkerContainer>
            <Icon name="bolt" color="white" size={40} />
          </MarkerContainer>
        ) : null}
      </Container>
    );
  }
}
