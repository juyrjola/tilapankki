import isEmpty from 'lodash/lang/isEmpty';
import map from 'lodash/collection/map';
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import DocumentTitle from 'react-document-title';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';

import { fetchResource } from 'actions/resourceActions';
import ResourceHeader from 'components/resource/ResourceHeader';
import ReservationInfo from 'components/reservation/ReservationInfo';
import OneShotMap from 'containers/OneShotMap';
import NotFoundPage from 'containers/NotFoundPage';
import ReservationForm from 'containers/ReservationForm';
import reservationPageSelector from 'selectors/containers/reservationPageSelector';
import { getDateStartAndEndTimes } from 'utils/TimeUtils';
import ResourceDetails from 'components/resource/ResourceDetails';
import ReservationsListItem from 'components/reservation/ReservationsListItem';
import {
  openReservationDeleteModal,
  selectReservationToDelete,
  selectReservationToEdit,
} from 'actions/uiActions';
import ReservationDeleteModal from 'containers/ReservationDeleteModal';
import {
  getAddressWithName,
  getDescription,
  getName,
  getPeopleCapacityString,
} from 'utils/DataUtils';
import ImagePanel from 'components/common/ImagePanel';

export class UnconnectedVicinityReservationPage extends Component {
  constructor(props) {
    super(props);
    this.renderReservationsListItem = this.renderReservationsListItem.bind(this);
  }

  getChildContext() {
    return {red: this.props.red};
  }

  componentDidMount() {
    const { actions, date, time, id } = this.props;
    const fetchParams = getDateStartAndEndTimes(date);
    fetchParams.start = time;
    actions.fetchResource(id, fetchParams);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.date !== this.props.date) {
      const { actions, id } = this.props;
      const fetchParams = getDateStartAndEndTimes(nextProps.date);

      actions.fetchResource(id, fetchParams);
    }
  }

  renderReservationsListItem(reservation) {
    const {
      actions,
      resource,
      unit,
    } = this.props;

    return (
      <ReservationsListItem
        key={reservation.url}
        reservation={reservation}
        resource={resource}
        openReservationDeleteModal={actions.openReservationDeleteModal}
        updatePath={actions.updatePath}
        selectReservationToDelete={actions.selectReservationToDelete}
        selectReservationToEdit={actions.selectReservationToEdit}
        unit={unit}
      />
    );
  }

  render() {
    const {
      date,
      id,
      isFetchingResource,
      isLoggedIn,
      location,
      params,
      resource,
      unit,
    } = this.props;
    const resourceName = getName(resource);

    if (isEmpty(resource) && !isFetchingResource) {
      return <NotFoundPage />;
    }

    const ownReservations = (!isEmpty(resource.reservations) ?
      resource.reservations.filter(reservation => reservation.isOwn) :
      []);

    return (
      <DocumentTitle title={`${resourceName} varaaminen - Varaamo`}>
        <Loader loaded={!isEmpty(resource)}>
          <div className="reservation-page">
            <ResourceHeader
              address={getAddressWithName(unit)}
              name={resourceName}
            />
            {!isEmpty(ownReservations) ?
              (<div>
                <h2>Oma varauksesi</h2>
                  <ul className="reservations-list">
                    {map(ownReservations, this.renderReservationsListItem)}
                  </ul>
                  <ReservationDeleteModal />
                  <OneShotMap params={params} />
                <h2 id="reservation-header">{isLoggedIn ? 'Varaa tila' : 'Varaustilanne'}</h2>
                  <ReservationForm
                    location={location}
                    params={params}
                  />
              </div>) :
              (<div>
                <h2 id="reservation-header">{isLoggedIn ? 'Varaa tila' : 'Varaustilanne'}</h2>
                  <ReservationForm
                    location={location}
                    params={params}
                  />
                  <OneShotMap params={params} />
              </div>)}
          </div>
          <ImagePanel
            altText={`Kuva ${resourceName} tilasta`}
            images={resource.images || []}
          />
          <ResourceDetails
            capacityString={getPeopleCapacityString(resource.peopleCapacity)}
            description={getDescription(resource)}
            type={getName(resource.type)}
          />
        </Loader>
      </DocumentTitle>
    );
  }
}

UnconnectedVicinityReservationPage.propTypes = {
  actions: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isFetchingResource: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
};

UnconnectedVicinityReservationPage.contextTypes = {
  store: PropTypes.object
};

UnconnectedVicinityReservationPage.childContextTypes = {
  store: PropTypes.object,
  red: PropTypes.object
};


function mapDispatchToProps(dispatch) {
  const actionCreators = {
    fetchResource,
    openReservationDeleteModal,
    updatePath,
    selectReservationToDelete,
    selectReservationToEdit,
  };

  return { actions: bindActionCreators(actionCreators, dispatch) };
}

import { createSelector } from 'reselect';

const vicinityReservationPageSelector = createSelector(
  function passthrough(state, props) {
    /*
    Passing through state and props as is
    State is what is reduced
    Props is what component had originally as props (from Router at this case)
     */
    return {state, props};
  },
  reservationPageSelector,
  (pristine, selected) => {
    /*
    Getting both pristine and selected state + props
     */
    selected.red = {pristine};
    return selected;
  }
);

export default connect(vicinityReservationPageSelector, mapDispatchToProps)(UnconnectedVicinityReservationPage);
