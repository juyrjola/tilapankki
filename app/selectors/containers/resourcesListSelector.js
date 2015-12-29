import { createSelector } from 'reselect';

import ActionTypes from 'constants/ActionTypes';
import requestIsActiveSelectorFactory from 'selectors/factories/requestIsActiveSelectorFactory';

const resourcesSelector = (state) => state.data.resources;
const unitsSelector = (state) => state.data.units;

const resourcesListSelector = createSelector(
  requestIsActiveSelectorFactory(ActionTypes.API.RESOURCES_GET_REQUEST),
  resourcesSelector,
  unitsSelector,
  (
    isFetchingResources,
    resources,
    units
  ) => {
    return {
      isFetchingResources,
      resources,
      units,
    };
  }
);

export default resourcesListSelector;
