import React, { PureComponent } from "react";
import { BackHandler, Platform, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import uuid from "uuid";
import find from "lodash/find";
import debounce from "lodash/debounce";
import { Actions } from "react-native-router-flux";

import nightStyle from "app/Theme/map/night";
import coboltStyle from "app/Theme/map/cobolt";
import strangerStyle from "app/Theme/map/stranger";
import * as colors from "app/Theme/colors";
import { IconButton, PlacesScroller } from "app/Components/Blocks";
import { getPredictions, getGeoById, getRoute } from "app/Api/map";
import { parsePolylineToCoords } from "app/Helpers/map";
import * as routes from "app/Constants/routes";
import taxisList from "app/Test/taxisList";

import { Container, Tools, Upper, MarkerContainer, mapStyle } from "./styles";
import {
  AnimatedTextBox,
  AnimatedSearchPanel,
  AnimatedSideMenuBar,
  AnimatedOkeyButton,
  AnimatedAcceptPanel,
  CalcBackButton,
  AnimatedSearchingMarker,
  BarLoader
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
      moving: false, // prevents no needed request for an address if selecting a point
      searchText: "",
      isSearching: false,
      places: [],
      loadPlaces: false,
      tabIndex: 0,
      isMenuOpen: false,
      isOkayBtnDisplayed: false,
      pingMarker: {
        left: 0,
        top: 0
      },
      taxiCoords: {
        lat: null,
        lng: null
      }
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

    // on a route is calculated, move map to a middle point of a route
    if (route.isLoaded && !prevProps.route.isLoaded) {
      const start = points[0];
      const end = points[points.length - 1];

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

  handleAcceptOrder = async () => {
    const { onSelectPoint, onAcceptOrder, onTestGetTaxi, points } = this.props;

    onSelectPoint(null);
    onAcceptOrder();

    // test
    const taxi = taxisList[Math.round(Math.random() * 4)];
    const origin = {
      lat: taxi.lat,
      lng: taxi.lng
    };
    const dest = {
      lat: points[0].lat,
      lng: points[0].lng
    };
    const route = (await getRoute(origin, dest)).data.routes[0];
    // return console.log("route", route);
    const curve = route.overview_polyline.points;
    const taxiPoints = parsePolylineToCoords(curve);
    let current = 0;
    setTimeout(() => {
      onTestGetTaxi();

      const interval = setInterval(() => {
        if (current === taxiPoints.length) {
          return clearInterval(interval);
        }

        const point = taxiPoints[current++];

        this.setState({
          taxiCoords: {
            lat: point.latitude,
            lng: point.longitude
          }
        });
      }, 1000);
    }, 10000);
    //
  };

  handleCancelOrder = () => {
    const { onCancelOrder, onResetCalcWay } = this.props;

    onCancelOrder();
    onResetCalcWay();
  };

  renderMarkers = () => {
    const { points, selected, taxi } = this.props;
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

    if (taxi.isSearching && Platform.OS === "ios") {
      markers.push(
        <Marker
          coordinate={{
            latitude: points[0].lat,
            longitude: points[0].lng
          }}
        >
          <AnimatedSearchingMarker />
        </Marker>
      );
    }

    return markers;
  };

  renderTaxis = () => {
    const { taxi } = this.props;
    const { taxiCoords } = this.state;

    if (taxi.isFound && taxiCoords.lat && taxiCoords.lng) {
      return (
        <Marker
          coordinate={{
            latitude: taxiCoords.lat,
            longitude: taxiCoords.lng
          }}
        >
          <Icon name="car" color="white" size={15} />
        </Marker>
      );
    }

    return taxisList.map((taxi, i) => (
      <Marker
        coordinate={{
          latitude: taxi.lat,
          longitude: taxi.lng
        }}
        key={i}
      >
        <Icon name="car" color="white" size={15} />
      </Marker>
    ));
  };

  render() {
    const {
      points,
      selected,
      route,
      taxi,
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
          {this.renderTaxis()}
        </MapView>
        
        <AnimatedAcceptPanel
          display={
            route.isLoaded && !taxi.isSearching && !isSearching && !taxi.isFound
          }
          distance={route.distance}
          duration={route.duration}
          onAccept={this.handleAcceptOrder}
        />

        {/*below absolute positioned components*/}
        {route.isLoaded && !taxi.isSearching && !taxi.isFound ? (
          <CalcBackButton onPress={onResetCalcWay} />
        ) : null}

        <AnimatedOkeyButton
          display={isOkayBtnDisplayed && !route.isLoaded && !taxi.isFound}
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

        {!isSearching &&
        !route.isLoaded &&
        !taxi.isSearching &&
        !taxi.isFound ? (
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

        {/*menu*/}
        <AnimatedSideMenuBar
          display={isMenuOpen}
          onHistoryPress={() => Actions.push(routes.history)}
          onPaymentPress={() => Actions.push(routes.payment)}
          onSettingsPress={() => Actions.push(routes.settings)}
        />

        {!isSearching && taxi.isSearching && !taxi.isFound ? (
          <BarLoader onPress={this.handleCancelOrder} />
        ) : null}

        {selected !== null &&
        !isSearching &&
        !taxi.isSearching &&
        !taxi.isFound ? (
          <MarkerContainer>
            <Icon name="bolt" color="white" size={40} />
          </MarkerContainer>
        ) : null}
      </Container>
    );
  }
}
