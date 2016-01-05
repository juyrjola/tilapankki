import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLeafletMap from 'components/map/ReactLeafletMap';
import resourceListMapSelector from 'selectors/containers/multiShotMapSelector.js';
import {
  getName
} from 'utils/DataUtils';
import pairs from 'lodash/object/pairs';

class MultiShotMap extends Component {
  render() {
    const { userPosition, resources_combined, units, history } = this.props;

    if (userPosition.status !== 'detected') {
      return null;
    }
    const coords = [
      ...pairs(resources_combined).map((item) => {
        const [unit_id, resources] = item;
        const unit = units[unit_id];
        const [longitude, latitude] = unit.location.coordinates;
        const unitLocation = { longitude, latitude };
        return {
          coords: unitLocation,
          type: 'marker',
          msg: {unit, resources}
        }
      }),
      {
        coords: userPosition.position.coords,
        type: 'userpos',
        msg: 'You are here.'
      },
    ];

    return (<ReactLeafletMap markers={coords} history={history} />);
  }
}

MultiShotMap.propTypes = {};

export default connect(resourceListMapSelector)(MultiShotMap);
