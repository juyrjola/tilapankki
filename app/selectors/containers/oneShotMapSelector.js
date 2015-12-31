import { createSelector } from 'reselect';
import resourceSelector from 'selectors/resourceSelector';

const positionSelector = (state) => state.geolocation;
const unitsSelector = (state) => state.data.units;

const unitSelector = createSelector(
  resourceSelector,
  unitsSelector,
  (resource, units) => {
    return {
      unit: units[resource.unit],
    };
  }
);

const resourceMapPositionSelector = createSelector(
  positionSelector,
  unitSelector,
  (userPosition, { unit }) => {
    const [longitude, latitude] = unit.location.coordinates;
    const unitLocation = { longitude, latitude };
    return { unitLocation, userPosition };
  }
);

export default resourceMapPositionSelector;
