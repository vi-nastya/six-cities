import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const ZOOM = 12;
const CITY = [52.38333, 4.9];
const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._markers = [];
  }

  componentDidMount() {
    const {points = []} = this.props;
    console.log(points);

    this._map = leaflet.map(`map`, {
      center: CITY,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    this._map.setView(CITY, ZOOM);

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
    this.updateMarkers(this.props.points);
  }

  render() {
    return <div id="map" style={{height: 100 + `%`}}></div>;
  }

  updateMarkers(points) {
    this._markers.forEach((marker) => this._map.removeLayer(marker));
    this._markers = [];
    points.forEach((point) => {
      this._markers.push(leaflet.marker(point, {icon: ICON}).addTo(this._map));
    });
  }
}

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export {Map};
