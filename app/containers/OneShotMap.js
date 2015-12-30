import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeafletMap from 'components/map/LeafletMap';
import resourceMapPositionSelector from 'selectors/containers/oneShotMapSelector.js';

class OneShotMap extends Component {
  render() {
    const { location, position } = this.props;

    if (position.status !== 'detected') {
      return null;
    }

    return (<LeafletMap location={location} coordinates={position.position.coords} />);
  }
}

export default connect(resourceMapPositionSelector)(OneShotMap);
