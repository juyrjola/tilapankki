import isEmpty from 'lodash/lang/isEmpty';
import queryString from 'query-string';
import React, { Component, PropTypes } from 'react';
import { Label, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { humanDistance } from 'utils/DataUtils';

import TimeRange from 'components/common/TimeRange';
import {
  getAvailableTime,
  getCaption,
  getMainImage,
  getName,
  getOpeningHours,
} from 'utils/DataUtils';


class ResourcesMapListItem extends Component {
  constructor(props) {
    super(props);
  }

  renderAvailableTime(availableTime) {
    let bsStyle = 'success';
    if (availableTime === '0 tuntia') {
      bsStyle = 'danger';
    }
    return (
      <Label bsStyle={bsStyle}>{availableTime}</Label>
    );
  }

  renderDistance(distance) {
    let bsStyle;
    if (distance < 500) {
      bsStyle = 'success';
    } else if (distance < 1000) {
      bsStyle = 'info';
    } else {
      bsStyle = 'warning';
    }
    return (
      <Label bsStyle={bsStyle}>{humanDistance(distance)}</Label>
    );
  }

  renderImage(image) {
    if (image && image.url) {
      const src = `${image.url}?dim=40x40`;
      return <img alt={getCaption(image)} src={src} />;
    }
    return null;
  }

  renderResource(resource, index) {
    const move = () => {
      this.props.history.pushState({}, `/resources/${resource.id}`);
      return false;
    };

    return (
      <li key={index}>
        <div>
          <a href="#" onClick={move}><h5><span>{this.renderImage(getMainImage(resource.images))}</span> {getName(resource)}</h5></a>
        </div>
      </li>);
  }

  render() {
    const {
      resources,
      unit,
      } = this.props;

    const inline = {
      display: 'inline',
    };
    const resource = resources[0];
    const distance = resource.distance;
    const availableTime = getAvailableTime(getOpeningHours(resource), resource.reservations);

    return (
      <div>
        <h4>{getName(unit)}</h4>
        <div>
          <span>{this.renderDistance(distance)} {this.renderAvailableTime(availableTime)}</span>
        </div>
        <ul style={{listStyleType: "none", padding: 0, margin: 0}}>
          {resources.map((resource, index) => this.renderResource(resource, index))}
        </ul>
      </div>
    );
  }
}

//ResourcesMapListItem.propTypes = {
//  resources: PropTypes.array.isRequired,
//  unit: PropTypes.object.isRequired,
//};

ResourcesMapListItem.contextTypes = {
  router: React.PropTypes.func
};

export default ResourcesMapListItem;
