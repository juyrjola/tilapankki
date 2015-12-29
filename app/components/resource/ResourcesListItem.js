import isEmpty from 'lodash/lang/isEmpty';
import queryString from 'query-string';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import TimeRange from 'components/common/TimeRange';
import { getCaption, getMainImage, getName } from 'utils/DataUtils';

class ResourcesListItem extends Component {
  constructor(props) {
    super(props);
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
      resource,
      unit,
    } = this.props;

    const nameSeparator = isEmpty(resource) || isEmpty(unit) ? '' : ',';

    return (
      <li className="resource">
        <div className="image">
          <Link to={`/resources/${resource.id}`}>
            {this.renderImage(getMainImage(resource.images))}
          </Link>
        </div>
        <div className="names">
          <Link to={`/resources/${resource.id}`}>
            <h4>
              {getName(resource)}{nameSeparator} <span className="unit-name">{getName(unit)}</span>
            </h4>
          </Link>
        </div>
      </li>
    );
  }
}

ResourcesListItem.propTypes = {
  updatePath: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
};

export default ResourcesListItem;
