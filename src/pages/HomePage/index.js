import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Footer,
  Header,
  Select,
  SelectVehicles,
} from "../../components";
import {
  filteredPlanets,
  getPlanetHelper,
  getVehicleHelper,
  getTotalTime,
} from "../../helpers";
import "./style.css";

import {
  FETCH_PLANETS_API,
  FETCH_VEHICLE_API,
  POST_FALCON_TOKEN,
  POST_FIND_FALCON,
} from "../../constants";

export const HomePage = () => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [globalError, setGlobalError] = useState({});
  const [loading, setLoader] = useState(false);
  const [selectedPlanets, setSelectedPlanets] = useState({
    destination1: null,
    destination2: null,
    destination3: null,
    destination4: null,
  });
  const [vehicleTime, setVehicleTime] = useState({
    destination1: null,
    destination2: null,
    destination3: null,
    destination4: null,
  });
  const onReset = () => {
    setSelectedPlanets({
      destination1: null,
      destination2: null,
      destination3: null,
      destination4: null,
    });
    setSelectedVehicles([]);
  };
  const buttonDisabled =
    !selectedPlanets.destination1 ||
    !selectedPlanets.destination2 ||
    !selectedPlanets.destination3 ||
    !selectedPlanets.destination4 ||
    selectedVehicles?.length !== 4 ||
    loading;
  const fetchPlanets = async () => {
    try {
      const response = await axios.get(FETCH_PLANETS_API);
      setPlanets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(FETCH_VEHICLE_API);
      setVehicles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlanets();
    fetchVehicles();
  }, []);

  const onSelect = (id, planet) => {
    if (!selectedPlanets[id] || selectedPlanets[id] !== planet) {
      setSelectedPlanets({
        ...selectedPlanets,
        [id]: planet,
      });
      let vehicle = selectedVehicles.find((vehicle) => vehicle.id === id);
      if (vehicle) {
        if (planet.distance > vehicle?.max_distance) {
          setGlobalError({
            ...globalError,
            [id]: true,
          });
          setVehicleTime({
            ...vehicleTime,
            [id]: null,
          });
        } else {
          setVehicleTime({
            ...vehicleTime,
            [id]: Number(planet?.distance / vehicle?.speed),
          });
          if (globalError.hasOwnProperty(id)) {
            let tempObj = { ...globalError };
            delete tempObj[id];
            setGlobalError(tempObj);
          }
        }
      }
    } else if (selectedPlanets[id] === planet) {
      setVehicleTime({
        ...vehicleTime,
        [id]: null,
      });
      setSelectedPlanets({
        ...selectedPlanets,
        [id]: null,
      });
    }
  };
  const totalTime = getTotalTime(vehicleTime);

  const onSelectVehicle = (id, vehicle, isChecked) => {
    if (!isChecked) {
      setSelectedVehicles([...selectedVehicles, { id, ...vehicle }]);
      if (selectedPlanets[id]?.distance > vehicle?.max_distance) {
        setGlobalError({
          ...globalError,
          [id]: true,
        });
        setVehicleTime({
          ...vehicleTime,
          [id]: null,
        });
      } else {
        setVehicleTime({
          ...vehicleTime,
          [id]: Number(selectedPlanets[id]?.distance / vehicle?.speed),
        });
        if (globalError.hasOwnProperty(id)) {
          let tempObj = { ...globalError };
          delete tempObj[id];
          setGlobalError(tempObj);
        }
      }
    } else {
      let tempArray = [...selectedVehicles];
      let index = selectedVehicles.findIndex((val) => val.id === id);
      if (index > -1) {
        tempArray.splice(index, 1);
        setSelectedVehicles([...tempArray]);
      }
      setVehicleTime({
        ...vehicleTime,
        [id]: null,
      });
    }
  };

  const onSearchFalcone = async () => {
    setLoader(true);
    const { data } = await axios.post(
      POST_FALCON_TOKEN,
      {},
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (data) {
      try {
        const findFalcon = await axios.post(
          POST_FIND_FALCON,
          {
            token: data.token,
            planet_names: getPlanetHelper(selectedPlanets),
            vehicle_names: getVehicleHelper(selectedVehicles),
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setLoader(false);
        if (findFalcon?.data?.status === "success") {
          alert(
            `SUCCESS! Falcone found in planet ${findFalcon?.data?.planet_name}`
          );
        } else {
          alert(`OOPS! Falcone not found, try again later`);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };
  const proceedDisable =
    buttonDisabled || (globalError && Object.keys(globalError).length >= 1);
  return (
    <>
      <Header onReset={onReset} />
      <div className="homePage">
        <div className="themeImg-container" />
        <div className="destination-container">
          <Select
            id="destination1"
            placeHolder="Select Destination 1"
            options={filteredPlanets(planets, [
              selectedPlanets.destination2?.name,
              selectedPlanets.destination3?.name,
              selectedPlanets.destination4?.name,
            ])}
            selectedPlanets={selectedPlanets}
            onSelect={(planet) => onSelect("destination1", planet)}
            value={selectedPlanets.destination1}
            vehicleTime={vehicleTime["destination1"]}
          />
          <Select
            id="destination2"
            placeHolder="Select Destination 2"
            options={filteredPlanets(planets, [
              selectedPlanets.destination1?.name,
              selectedPlanets.destination3?.name,
              selectedPlanets.destination4?.name,
            ])}
            vehicleTime={vehicleTime["destination2"]}
            selectedPlanets={selectedPlanets}
            onSelect={(planet) => onSelect("destination2", planet)}
            value={selectedPlanets.destination2}
          />
          <Select
            id="destination3"
            placeHolder="Select Destination 3"
            options={filteredPlanets(planets, [
              selectedPlanets.destination1?.name,
              selectedPlanets.destination2?.name,
              selectedPlanets.destination4?.name,
            ])}
            vehicleTime={vehicleTime["destination3"]}
            selectedPlanets={selectedPlanets}
            onSelect={(planet) => onSelect("destination3", planet)}
            value={selectedPlanets.destination3}
          />
          <Select
            id="destination4"
            placeHolder="Select Destination 4"
            vehicleTime={vehicleTime["destination4"]}
            options={filteredPlanets(planets, [
              selectedPlanets.destination1?.name,
              selectedPlanets.destination2?.name,
              selectedPlanets.destination3?.name,
            ])}
            selectedPlanets={selectedPlanets}
            onSelect={(planet) => onSelect("destination4", planet)}
            value={selectedPlanets.destination4}
          />
        </div>
        <div className="vehicle-container">
          {[1, 2, 3, 4].map((val, index) => {
            let id = `destination${index + 1}`;
            const showVehicle = selectedPlanets[id];
            return (
              showVehicle && (
                <SelectVehicles
                  id={id}
                  key={`vehicle${index}`}
                  vehicles={vehicles}
                  selectedVehicles={selectedVehicles}
                  onSelectVehicle={onSelectVehicle}
                  selectedPlanet={selectedPlanets[id]}
                />
              )
            );
          })}
        </div>
        {selectedVehicles.length > 4 && (
          <div className="error-wrapper">{`Please select one vehicle for one destination please !`}</div>
        )}
        {globalError && Object.keys(globalError).length >= 1 && (
          <div className="error-wrapper">{`One or more vehciles selected doesn't meet maximum distance travelled by corresponding planets selected !`}</div>
        )}
        <div className="totalTime">{`Tota time taken: ${totalTime}`}</div>
        <div className="proceed-button">
          <Button
            label={loading ? "...Please wait" : "Proceed"}
            onClick={onSearchFalcone}
            disabled={proceedDisable}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
