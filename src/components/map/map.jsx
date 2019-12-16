import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {MAP_ZOOM, MAP_ICON, MAP_ICON_ACTIVE} from "../../constants";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._markers = [];
  }

  componentDidMount() {
    const {points = [], city} = this.props;

    this._map = leaflet.map(`map`, {
      center: city,
      zoom: MAP_ZOOM,
      zoomControl: false,
      marker: true
    });

    this._map.setView(city, MAP_ZOOM);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);
    this.updateMarkers(points);
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  }

  componentDidUpdate() {
    const {points, city} = this.props;
    this.updateMarkers(points);
    this._map.setView(city, MAP_ZOOM);
  }

  updateMarkers(points) {
    const activePoint = this.props.activePoint;
    this._markers.forEach((marker) => this._map.removeLayer(marker));
    this._markers = [];
    points.forEach((point, index) => {
      if (activePoint === index) {
        this._markers.push(leaflet.marker(point, {icon: MAP_ICON_ACTIVE}).addTo(this._map));
      } else {
        this._markers.push(leaflet.marker(point, {icon: MAP_ICON}).addTo(this._map));
      }
    });
  }

  render() {
    return <div id="map" style={{height: 100 + `%`}}></div>;
  }
}

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  activePoint: PropTypes.number.isRequired,
  city: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Map;
