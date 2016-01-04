import { createSelector } from 'reselect';

import ActionTypes from 'constants/ActionTypes';
import resourceSelector from 'selectors/resourceSelector';
import isLoggedInSelector from 'selectors/isLoggedInSelector';
import requestIsActiveSelectorFactory from 'selectors/factories/requestIsActiveSelectorFactory';

import { formatDateString } from 'utils/TimeUtils';

const idSelector = (state, props) => props.params.id;
const unitsSelector = (state) => state.data.units;
const dateSelector = (state) => formatDateString(state.time.time);
const timeSelector = (state) => state.time.time;

const reservationPageSelector = createSelector(
  dateSelector,
  timeSelector,
  idSelector,
  isLoggedInSelector,
  requestIsActiveSelectorFactory(ActionTypes.API.RESOURCE_GET_REQUEST),
  resourceSelector,
  unitsSelector,
  (
    date,
    time,
    id,
    isLoggedIn,
    isFetchingResource,
    resource,
    units
  ) => {
    const unit = units[resource.unit] || {};

    return {
      date,
      time,
      id,
      isFetchingResource,
      isLoggedIn,
      resource,
      unit,
    };
  }
);

export default reservationPageSelector;
