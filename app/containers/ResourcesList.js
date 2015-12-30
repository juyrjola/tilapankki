import map from 'lodash/collection/map';
import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';
import { Table } from 'react-bootstrap';

import { fetchResources } from 'actions/resourceActions';
import { fetchUnits } from 'actions/unitActions';
import { updateTime } from 'actions/timeActions';
import { fetchGeolocation } from 'actions/geolocationActions';
import ResourcesListItem from 'components/resource/ResourcesListItem';
import resourcesListSelector from 'selectors/containers/resourcesListSelector';

export class UnconnectedResourcesList extends Component {
  constructor(props) {
    super(props);
    this.renderResourcesListItem = this.renderResourcesListItem.bind(this);
  }

  componentDidMount() {
    this.props.actions.updateTime();
    this.props.actions.fetchGeolocation();
    this.props.actions.fetchUnits();
    this.props.actions.fetchResources();
  }

  renderResourcesListItem(resource) {
    const {
      actions,
      units,
    } = this.props;
    const unit = resource.unit ? units[resource.unit] || {} : {};

    return (
      <ResourcesListItem
        time={this.props.time}
        position={this.props.position}
        key={resource.id}
        resource={resource}
        updatePath={actions.updatePath}
        unit={unit}
      />
    );
  }

  render() {
    const {
      isFetchingLocation,
      isFetchingResources,
      resources,
    } = this.props;

    return (
      <Loader loaded={!isFetchingResources && !isFetchingLocation}>
        {Object.keys(resources).length > 0 ? (
          <div>
            <Table className="resources lined">
              <thead>
                <tr>
                  <th colSpan="2">Tila</th>
                  <th>Etäisyys</th>
                  <th>Vapaata</th>
                </tr>
              </thead>
              <tbody>
                {map(resources, this.renderResourcesListItem)}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>Vapaita tiloja ei valitettavasti löytynyt.</p>
        )}
      </Loader>
    );
  }
}

UnconnectedResourcesList.propTypes = {
  time: PropTypes.object,
  position: PropTypes.object,
  actions: PropTypes.object.isRequired,
  isFetchingLocation: PropTypes.bool.isRequired,
  isFetchingResources: PropTypes.bool.isRequired,
  resources: PropTypes.object.isRequired,
  units: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    fetchResources,
    fetchUnits,
    fetchGeolocation,
    updateTime,
    updatePath,
  };

  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(resourcesListSelector, mapDispatchToProps)(UnconnectedResourcesList);
