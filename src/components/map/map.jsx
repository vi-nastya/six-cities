import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const ZOOM = 12;
const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});
const ICON_ACTIVE = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [30, 30]
});


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
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    this._map.setView(city, ZOOM);

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
    this._map.setView(city, ZOOM);
  }

  render() {
    return <div id="map" style={{height: 100 + `%`}}></div>;
  }

  updateMarkers(points) {
    const activePoint = this.props.activePoint;
    this._markers.forEach((marker) => this._map.removeLayer(marker));
    this._markers = [];
    points.forEach((point, index) => {
      if (activePoint === index) {
        this._markers.push(leaflet.marker(point, {icon: ICON_ACTIVE}).addTo(this._map));
      } else {
        this._markers.push(leaflet.marker(point, {icon: ICON}).addTo(this._map));
      }
    });
  }
}

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  activePoint: PropTypes.number.isRequired,
  city: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Map;
