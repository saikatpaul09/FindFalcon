import { useState } from "react";
import "./style.css";
export const Select = (props) => {
  const [drop, setIsDrop] = useState(false);
  const {
    id,
    value,
    placeHolder = "Select",
    options,
    onSelect,
    selectedPlanets,
  } = props;
  return (
    <div className="select-dropdown">
      {value && (
        <div className="distance">{`Distance :- ${value?.distance}`}</div>
      )}
      <div className="select">
        <div className="value">{value?.name || placeHolder}</div>{" "}
        <div onClick={() => setIsDrop(!drop)} className="arrow">
          {!drop ? "˅" : "˄"}
        </div>
      </div>
      {options && (
        <div className={`options ${drop ? "showDrop" : "hideDrop"}`}>
          {drop &&
            options.map((option) => {
              const checked = selectedPlanets[id]?.name === option?.name;
              return (
                <div
                  onClick={() => {
                    onSelect(option);
                    setIsDrop(false);
                  }}
                  className={`value`}
                  key={option.name}
                >
                  {option?.name} <span>{checked && "✔"}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
