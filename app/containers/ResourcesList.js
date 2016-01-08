import map from 'lodash/collection/map';
import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';
import { Grid, ListGroup, ListGroupItem, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';

import { fetchResources } from 'actions/resourceActions';
import { fetchUnits } from 'actions/unitActions';
import ResourcesListItem from 'components/resource/ResourcesListItem';
import MultiShotMap from './MultiShotMap';
import resourcesListSelector from 'selectors/containers/resourcesListSelector';
import moment from 'moment';

export class UnconnectedResourcesList extends Component {
  constructor(props) {
    super(props);
    this.renderResourcesListItem = this.renderResourcesListItem.bind(this);
  }

  componentDidMount() {
    if (this.props.geolocation.status === 'detected') {
      this.fetchRequiredResources();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.geolocation.status === 'requested'
    && nextProps.geolocation.status === 'detected') {
      this.fetchRequiredResources();
    }
  }

  fetchRequiredResources() {
    const { time, geolocation } = this.props;
    this.props.actions.fetchUnits();
    const params = {
      start: time,
      end: moment(time).add(8, 'hours').toISOString(),
      duration: 30,
      purpose: 'meetings-and-working',
      lat: geolocation.position.coords.latitude,
      lon: geolocation.position.coords.longitude,
      need_manual_confirmation: 'false',
    };
    this.props.actions.fetchResources(params);
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
        position={this.props.geolocation.position}
        key={resource.id}
        resource={resource}
        updatePath={actions.updatePath}
        unit={unit}
      />
    );
  }

  render() {
    const {
      isFetchingResources,
      resources,
      geolocation,
      units
    } = this.props;

    return (
      <div>
        {isFetchingResources ? (
          <p>Haetaan lähimpiä vapaita tiloja...</p>
        ) : (<span />
        )}
        <Loader loaded={!isFetchingResources && geolocation.status === 'detected'}>
          {Object.keys(resources).length > 0 ? (
            <div>
              <ListGroup fill>
                {map(resources, this.renderResourcesListItem)}
              </ListGroup>
              <MultiShotMap userPosition={geolocation} resources={resources} units={units} history={this.props.history} />
            </div>
          ) : (
            <ListGroup fill>
              <ListGroupItem>Vapaita tiloja ei valitettavasti löytynyt.</ListGroupItem>
            </ListGroup>
        )}
        </Loader>
      </div>
    );
  }
}

UnconnectedResourcesList.propTypes = {
  time: PropTypes.string,
  geolocation: PropTypes.object,
  actions: PropTypes.object.isRequired,
  isFetchingResources: PropTypes.bool.isRequired,
  resources: PropTypes.object.isRequired,
  units: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    fetchResources,
    fetchUnits,
    updatePath,
  };

  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(resourcesListSelector, mapDispatchToProps)(UnconnectedResourcesList);
