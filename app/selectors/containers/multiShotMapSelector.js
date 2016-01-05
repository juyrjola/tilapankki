import { createSelector } from 'reselect';

const resourceListMapSelector = (state, props) => {
  const { userPosition, resources, units, history } = props;

  const resources_combined = {};

  Object.values(resources).forEach(resource => {
    const unit = resource.unit;

    if (resources_combined[unit]) {
      resources_combined[unit].push(resource);
    } else {
      resources_combined[unit] = [resource];
    }
  });

  return {
    userPosition,
    resources_combined,
    units,
    history
  };
};

export default resourceListMapSelector;
