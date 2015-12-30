import { createSelector } from 'reselect';

import ActionTypes from 'constants/ActionTypes';
import requestIsActiveSelectorFactory from 'selectors/factories/requestIsActiveSelectorFactory';

const resourcesSelector = (state) => state.data.resources;
const unitsSelector = (state) => state.data.units;
const timeSelector = (state) => state.time.time;
const geolocationSelector = (state) => state.geolocation.position;

const resourcesListSelector = createSelector(
  requestIsActiveSelectorFactory(ActionTypes.GEOLOCATION.REQUEST),
  requestIsActiveSelectorFactory(ActionTypes.API.RESOURCES_GET_REQUEST),
  resourcesSelector,
  unitsSelector,
  timeSelector,
  geolocationSelector,
  (
    isFetchingLocation,
    isFetchingResources,
    resources,
    units,
    time,
    position,
  ) => {
    return {
      isFetchingLocation,
      isFetchingResources,
      resources,
      units,
      time,
      position,
    };
  }
);

export default resourcesListSelector;
