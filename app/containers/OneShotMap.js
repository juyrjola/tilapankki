import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeafletMap from 'components/map/LeafletMap';
import resourceMapPositionSelector from 'selectors/containers/oneShotMapSelector.js';

class OneShotMap extends Component {
  render() {
    const { status, position } = this.props;
    if (status !== 'detected') {
      return null;
    }
    return (<LeafletMap coordinates={position.coords} />);
  }
}

export default connect(resourceMapPositionSelector)(OneShotMap);
