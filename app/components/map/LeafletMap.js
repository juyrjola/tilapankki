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
  fillOpacity: 1.0,
  radius: 5,
};

const DEFAULT_ICON = Leaflet.icon(ICON_OPTIONS);

export default class LeafletMap extends Component {
  componentDidMount() {
    this.map = Leaflet.map(MAP_CONTAINER_ID);

    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const { unitLocation, userLocation } = this.props;
    this.group = Leaflet.layerGroup();
    this.drawMapContents(unitLocation, userLocation);
  }

  componentDidUpdate(props) {
    const { unitLocation, userLocation } = props;
    this.drawMapContents(unitLocation, userLocation);
  }

  drawMapContents(unitLocation, userLocation) {
    this.group.clearLayers();
    const marker = Leaflet.marker([unitLocation.latitude, unitLocation.longitude], { icon: DEFAULT_ICON });
    const circle = Leaflet.circleMarker([userLocation.latitude, userLocation.longitude],
                                GEOLOCATION_PATH_OPTIONS);
    this.group.addLayer(marker);
    this.group.addLayer(circle);
    const bounds = Leaflet.latLngBounds([marker.getLatLng(), circle.getLatLng()]);

    marker.bindPopup('I should be a link to the Service Map.');
    circle.bindPopup('You are here.');
    this.group.addTo(this.map);
    this.map.fitBounds(bounds, { padding: [10, 10] });
  }

  render() {
    const style = {
      width: '100%',
      height: '300px',
      margin: '20px 0',
    };
    return <div id={MAP_CONTAINER_ID} style={style} />;
  }
}
