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
//
//const resourceListMapSelector = createSelector(
//  positionSelector,
//  unitSelector,
//  (userPosition, { unit }) => {
//    const [longitude, latitude] = unit.location.coordinates;
//    const unitLocation = { longitude, latitude };
//    return { unitLocation, userPosition };
//  }
//);

function getUnitCoords(resource, units) {
  resource.location = units[resource.unit].location;

}

const resourceListMapSelector = (state, props) => {
  console.log("stops", state, props);
  const { userPosition, resources, units } = props;

  const res = Object.values(resources).map(resource => {
    const [longitude, latitude] = units[resource.unit].location.coordinates;
    const unitLocation = { longitude, latitude };
    return resource.merge({location: unitLocation})
  });

  return {
    userPosition,
    resources: res,
    units
  };
};

export default resourceListMapSelector;
