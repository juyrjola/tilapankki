import React, { Component } from 'react';
import Leaflet from 'leaflet';

import markerIconSrc from '../../../node_modules/leaflet/dist/images/marker-icon.png';
import markerIconRetinaSrc from '../../../node_modules/leaflet/dist/images/marker-icon-2x.png';
import markerShadowSrc from '../../../node_modules/leaflet/dist/images/marker-shadow.png';

const MAP_CONTAINER_ID = 'leaflet-map-container';

const ICON_OPTIONS = {
  iconUrl: markerIconSrc,
  iconRetinaUrl: markerIconRetinaSrc,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadowSrc,
  shadowSize: [41, 41],
};

const GEOLOCATION_PATH_OPTIONS = {
  fillColor: '#c22',
  color: '#222',
  weight: 2,
  opacity: 0.8,
  fillOpacity: 0.5,
};

export default class LeafletMap extends Component {
  componentDidMount() {
    const { coordinates } = this.props;
    const map = Leaflet.map(MAP_CONTAINER_ID, {
      center: [coordinates.latitude, coordinates.longitude],
      zoom: 14,
    });

    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const myIcon = Leaflet.icon(ICON_OPTIONS);

    // TODO: replace with resource coordinates
    const artificialLatLng = [coordinates.latitude - 0.0025, coordinates.longitude + 0.005];
    Leaflet.marker(artificialLatLng, { icon: myIcon }).addTo(map)
      .bindPopup('I should be a link to the Service Map.');

    Leaflet.circle([coordinates.latitude, coordinates.longitude],
                   25, GEOLOCATION_PATH_OPTIONS)
      .addTo(map)
      .bindPopup('You are here.');
  }

  render() {
    const style = {
      width: '100%',
      height: '200px',
      margin: '20px 0',
    };
    return <div id={MAP_CONTAINER_ID} style={style} />;
  }
}
