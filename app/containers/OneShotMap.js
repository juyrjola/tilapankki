import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeafletMap from 'components/map/LeafletMap';
import resourceMapPositionSelector from 'selectors/containers/oneShotMapSelector.js';

class OneShotMap extends Component {
  render() {
    const { userPosition, unitLocation } = this.props;

    if (userPosition.status !== 'detected') {
      return null;
    }

    const coords = [
      {
        coords: userPosition.position.coords,
        type: 'userpos'
      },
      {
        coords: unitLocation,
        type: 'marker'
      }
    ];

    return (<LeafletMap markers={coords} />);
  }
}

export default connect(resourceMapPositionSelector)(OneShotMap);
