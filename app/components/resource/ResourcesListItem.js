import isEmpty from 'lodash/lang/isEmpty';
import queryString from 'query-string';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Label, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { humanDistance } from 'utils/DataUtils';
import moment from 'moment';

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

  renderAvailableHours(availableHours) {
    let bsStyle = 'success';
    let now = moment();
    let start = moment(availableHours.starts);
    let end = moment(availableHours.ends);
    let when, duration;
    if (end.diff(start, 'hours') < 1) {
      bsStyle = 'warning';
      duration = "Puoli tuntia";
    }
    else if (end.diff(start, 'hours') < 2) {
      bsStyle = 'info';
      duration = "Tunti";
    }
    else {
      duration = end.diff(start, 'hours') + " tuntia";
    }
    if (start < now) {
      when = "heti";
    }
    else if (start.diff(now, 'minutes') < 30) {
      when = "kohta";
    }
    else if (start.diff(now, 'hours') < 1) {
      bsStyle = 'info';
      when = " klo " + start.format('HH:mm');
    }
    else {
      bsStyle = 'warning';
      when = " klo " + start.format('HH:mm');
    }
    return (
      <Label bsStyle={bsStyle}>{duration} {when}</Label>
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
    const link = `/resources/${resource.id}`;
    const distance = resource.distance;
    const inline = {
      display: 'inline',
    };
    let spatioTemporalDetails = null;
    if (distance && resource.availableHours) {
      spatioTemporalDetails = <Row>{this.renderDistance(distance)} {this.renderAvailableHours(resource.availableHours[0])}</Row>;
    }
    return (
      <LinkContainer to={link}>
        <ListGroupItem>
          <h4>{getName(resource)}</h4>
          <Grid>
            <Row>
              <Col xs={9}>
                <Row>{getName(unit)}</Row>
                {spatioTemporalDetails}
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
