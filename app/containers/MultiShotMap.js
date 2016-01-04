import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeafletMap from 'components/map/LeafletMap';
//import resourceMapPositionSelector from 'selectors/containers/oneShotMapSelector.js';

class MultiShotMap extends Component {
  render() {
    const { userPosition, resources, units } = this.props;

    if (userPosition.status !== 'detected') {
      return null;
    }

    console.log("res", resources, units);
    // ,  ...resources.map((resource) => resource)
    const coords = [
      {
        coords: userPosition.position.coords,
        type: 'userpos',
        msg: 'You are here.'
      }
    ];

    return (<LeafletMap markers={coords} />);
  }
}

MultiShotMap.propTypes = {};

export default MultiShotMap;
