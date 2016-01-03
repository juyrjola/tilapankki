import isEmpty from 'lodash/lang/isEmpty';
import queryString from 'query-string';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
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

  render() {
    const {
      time,
      geolocation,
      resource,
      unit,
    } = this.props;

    const nameSeparator = isEmpty(resource) || isEmpty(unit) ? '' : ',';
    const availableTime = getAvailableTime(getOpeningHours(resource), resource.reservations);
    const link = `/resources/${resource.id}`
    const distance = resource.distance;
    const inline = {
      display: 'inline',
    }

    return (
      <LinkContainer to={link}>
        <ListGroupItem>
          <h4>{getName(resource)}</h4>
          <Grid>
            <Row>
              <Col xs={9}>
                <Row>{getName(unit)}</Row>
                <Row>{this.renderDistance(distance)} {this.renderAvailableTime(availableTime)}</Row>
              </Col>
              <Col xs={3}>
                {this.renderImage(getMainImage(resource.images))}
              </Col>
            </Row>
          </Grid>
        </ListGroupItem>
      </LinkContainer>
    );
  }
}

ResourcesListItem.propTypes = {
  time: PropTypes.string,
  geolocation: PropTypes.object,
  updatePath: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
};

export default ResourcesListItem;
