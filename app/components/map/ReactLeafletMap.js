import React, { Component } from 'react';
import Leaflet from 'leaflet';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import ResourcesMapListItem from 'components/resource/ResourcesMapListItem';

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
  radius: 8,
};

const DEFAULT_ICON = Leaflet.icon(ICON_OPTIONS);

export default class ReactLeafletMap extends Component {
  no_componentDidMount() {
    this.map = Leaflet.map(MAP_CONTAINER_ID);

    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const markers = this.props.markers;
    this.group = Leaflet.layerGroup();
    this.drawMapContents(markers);
  }

  no_componentDidUpdate(props) {
    const markers = this.props.markers;
    this.drawMapContents(markers);
  }

  drawMapContents(marks) {
    this.group.clearLayers();

    const markers = marks.map((mark) => {
      let marker;
      switch (mark.type) {

        case 'userpos':
          marker = Leaflet.circleMarker([mark.coords.latitude, mark.coords.longitude],
            GEOLOCATION_PATH_OPTIONS);
          marker.bindPopup(mark.msg);
          break;

        case 'marker':
          marker = Leaflet.marker([mark.coords.latitude, mark.coords.longitude], { icon: DEFAULT_ICON });
          marker.bindPopup(mark.msg);
          break;
      }

      this.group.addLayer(marker);
      return marker;

    });

    const bounds = Leaflet.latLngBounds(markers.map(marker => marker.getLatLng()));

    this.group.addTo(this.map);
    this.map.fitBounds(bounds, { padding: [10, 10] });

  }

  render() {
    const style = {
      width: '100%',
      height: '300px',
      margin: '20px 0',
    };
    const markers = this.props.markers;

    const marks = markers.map(
      (marker, index) => {
        const marker_position = [marker.coords.latitude, marker.coords.longitude];
        switch (marker.type) {
          case 'userpos':
            return (
              <CircleMarker key={index} {...GEOLOCATION_PATH_OPTIONS} center={marker_position}>
                <Popup>
                  <span>{marker.msg}</span>
                </Popup>
              </CircleMarker>);

          case 'marker':
            return (
              <Marker key={index} position={marker_position}>
                <Popup>
                  <span>
                    <ResourcesMapListItem {...marker.msg} />
                  </span>
                </Popup>
              </Marker>);
        }
    });

    const bounds = markers.map(marker => [marker.coords.latitude, marker.coords.longitude]);

    return (
      <div id={MAP_CONTAINER_ID} style={style}>
        <Map bounds={bounds}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {marks}
        </Map>
      </div>
    );
  }
}
