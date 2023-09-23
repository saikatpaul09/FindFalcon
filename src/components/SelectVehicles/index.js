import "./style.css";
export const SelectVehicles = (props) => {
  const { id, vehicles, selectedPlanet, onSelectVehicle, selectedVehicles } =
    props;
  return (
    <div className="vehicle-list">
      <div className="id">{id}</div>
      {vehicles.map((vehicle) => {
        let checked = selectedVehicles.find(
          (opt) => opt.id === id && opt.name === vehicle.name
        );
        let vehicleCount = selectedVehicles.filter(
          (val) => val.name === vehicle.name
        ).length;
        let isUniqueVehicle =
          selectedVehicles.filter((val) => val.id === id).length === 1;
        let isVehicleAbleToCoverDistance =
          selectedPlanet?.distance <= vehicle?.max_distance;
        return (
          <>
            <div className="vehicle-name">
              <input
                type="radio"
                onClick={() => onSelectVehicle(id, { id, ...vehicle }, checked)}
                checked={checked}
                disabled={
                  (!checked && vehicleCount === vehicle.total_no) ||
                  (!checked && isUniqueVehicle) ||
                  (!checked && !isVehicleAbleToCoverDistance)
                }
              />
              {vehicle?.name}
            </div>
            <div className="vehicle-details">
              <div className="vehicle-desc">
                {`Total vehicles available: ${vehicle.total_no - vehicleCount}`}
              </div>
              <div className="vehicle-desc">
                <span>
                  {`Total Distance: ${vehicle?.max_distance},`}{" "}
                  <span>{`speed: ${vehicle?.speed}`}</span>
                </span>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
