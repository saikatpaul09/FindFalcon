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

export const getTotalTime = (vehicleTime) => {
  let time = 0;
  if (vehicleTime && typeof vehicleTime === "object") {
    let timeArray = Object.values(vehicleTime);
    let index = timeArray.filter((vehicleTime) => vehicleTime).length;
    for (let i = 0; i < index; i++) {
      time = time + timeArray[i];
    }
  }
  return time;
};
