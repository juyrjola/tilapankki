import isEmpty from 'lodash/lang/isEmpty';
import queryString from 'query-string';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Label } from 'react-bootstrap';

import TimeRange from 'components/common/TimeRange';
import {
  getAvailableTime,
  getCaption,
  getMainImage,
  getName,
  getOpeningHours,
} from 'utils/DataUtils';


class ResourcesListItem extends Component {
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
    let bsStyle = 'success';
    return (
      <Label bsStyle={bsStyle}>{distance}</Label>
    );
  }

  renderImage(image) {
    if (image && image.url) {
      const src = `${image.url}?dim=100x100`;
      return <img alt={getCaption(image)} src={src} />;
    }
    return null;
  }

  render() {
    const {
      time,
      geolocation,
      resource,
      unit,
    } = this.props;

    const nameSeparator = isEmpty(resource) || isEmpty(unit) ? '' : ',';
    const availableTime = getAvailableTime(getOpeningHours(resource), resource.reservations);
    const distance = resource.distance;

    return (
      <tr>
        <td style={{ height: '80px', width: '80px' }}>
          <Link
            to={`/resources/${resource.id}`}
          >
            {this.renderImage(getMainImage(resource.images))}
          </Link>
        </td>
        <td>
          <Link
            to={`/resources/${resource.id}`}
          >
            <h4>{getName(resource)}</h4>
            <div className="unit-name">{getName(unit)}</div>
          </Link>
        </td>
        <td className="distance">
          <Link
            to={`/resources/${resource.id}`}
          >
            {this.renderDistance(distance)}
          </Link>
        </td>
        <td className="available-time">
          <Link
            to={`/resources/${resource.id}/`}
          >
            {this.renderAvailableTime(availableTime)}
          </Link>
        </td>
      </tr>
    );
  }
}

ResourcesListItem.propTypes = {
  time: PropTypes.object,
  geolocation: PropTypes.object,
  updatePath: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
};

export default ResourcesListItem;
