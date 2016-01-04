import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLeafletMap from 'components/map/ReactLeafletMap';
import resourceListMapSelector from 'selectors/containers/multiShotMapSelector.js';
import {
  getName
} from 'utils/DataUtils';

class MultiShotMap extends Component {
  render() {
    const { userPosition, resources, renders } = this.props;

    if (userPosition.status !== 'detected') {
      return null;
    }

    // ,  ...resources.map((resource) => resource)
    const coords = [
      {
        coords: userPosition.position.coords,
        type: 'userpos',
        msg: 'You are here.'
      },
      ...resources.map((resource, index) => {
        return {
          coords: resource.location,
          type: 'marker',
          msg: renders[index]
        }
      })
    ];

    return (<ReactLeafletMap markers={coords} />);
  }
}

MultiShotMap.propTypes = {};

export default connect(resourceListMapSelector)(MultiShotMap);
