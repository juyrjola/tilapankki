import map from 'lodash/collection/map';
import React, { Component, PropTypes } from 'react';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';

import { fetchResources } from 'actions/resourceActions';
import { fetchUnits } from 'actions/unitActions';
import ResourcesListItem from 'components/resource/ResourcesListItem';
import resourcesListSelector from 'selectors/containers/resourcesListSelector';

export class UnconnectedResourcesList extends Component {
  constructor(props) {
    super(props);
    this.renderResourcesListItem = this.renderResourcesListItem.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchUnits();
    this.props.actions.fetchResources({ isOwn: true });
  }

  renderResourcesListItem(resource) {
    const {
      actions,
      units,
    } = this.props;
    const unit = resource.unit ? units[resource.unit] || {} : {};

    return (
      <ResourcesListItem
        key={resource.url}
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
    } = this.props;

    console.log("Resurssit: ", resources, typeof resources);
    return (
      <Loader loaded={!isFetchingResources}>
        {Object.keys(resources).length > 0 ? (
          <div>
            <ul className="resources-list">
              {map(resources, this.renderResourcesListItem)}
            </ul>
          </div>
        ) : (
          <p>Vapaita tiloja ei valitettavasti löytynyt.</p>
        )}
      </Loader>
    );
  }
}

UnconnectedResourcesList.propTypes = {
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
