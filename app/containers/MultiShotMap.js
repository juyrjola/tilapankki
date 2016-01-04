import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeafletMap from 'components/map/LeafletMap';
import resourceListMapSelector from 'selectors/containers/multiShotMapSelector.js';

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
      },
      ...resources.map(resource => {
        return {
          coords: resource.location,
          type: 'marker',
          msg: 'A resource'
        }
      })
    ];

    return (<LeafletMap markers={coords} />);
  }
}

MultiShotMap.propTypes = {};

export default connect(resourceListMapSelector)(MultiShotMap);
