import { createSelector } from 'reselect';

import ActionTypes from 'constants/ActionTypes';
import requestIsActiveSelectorFactory from 'selectors/factories/requestIsActiveSelectorFactory';

const resourcesSelector = (state) => state.data.resources;
const unitsSelector = (state) => state.data.units;
const timeSelector = (state) => state.time.time;
const geolocationSelector = (state) => state.geolocation;

const resourcesListSelector = createSelector(
  requestIsActiveSelectorFactory(ActionTypes.API.RESOURCES_GET_REQUEST),
  resourcesSelector,
  unitsSelector,
  timeSelector,
  geolocationSelector,
  (
    isFetchingResources,
    resources,
    units,
    time,
    geolocation
  ) => {
    return {
      isFetchingResources,
      resources,
      units,
      time,
      geolocation,
    };
  }
);

export default resourcesListSelector;
