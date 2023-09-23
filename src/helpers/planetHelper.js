// Each dropdown should be able to select only those planets that aren't selected in other dropdowns
export const filteredPlanets = (planets, selectedPlanetNames) => {
  return planets.filter(
    (planet) => !selectedPlanetNames.includes(planet?.name)
  );
};

export const getPlanetHelper = (planets) => {
  return Object.values(planets)
    .filter((planet) => planet?.name)
    .map((planet) => planet?.name && planet?.name);
};

export const getVehicleHelper = (vehicles) => {
  return vehicles.map((vehicle) => vehicle.name);
};
