import { Button } from "../Button";
import "./style.css";
export const Header = ({ onReset }) => {
  return (
    <header>
      <div className="header-container">
        <h2 className="title">{`Finding Falcone!`}</h2>
        <div className="header-container__buttons">
          <Button label={"Reset"} onClick={onReset} />
        </div>
      </div>
    </header>
  );
};
