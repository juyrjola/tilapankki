
import values from 'lodash/object/values';
import { createSelector } from 'reselect';

const positionSelector = (state) => state.geolocation;

const locationSelector = (state, props) => {
  let [longitude, latitude] = values(state.data.units)[0].location.coordinates;
  return {latitude, longitude};
};

const resourceMapPositionSelector = createSelector(
  locationSelector,
  positionSelector,
  (location, position) => {
    console.log("loc pos", location, position);
    return {location, position};
  }
);

export default resourceMapPositionSelector;
