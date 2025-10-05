import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [brewTime, setBrewTime] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [activeCoffee, setActiveCoffee] = useState("");

  useEffect(() => {
    if (isTimerActive && brewTime > 0) {
      const timer = setTimeout(() => {
        setBrewTime(brewTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (brewTime === 0) {
      
    }
  }, [brewTime, isTimerActive]);

  const selectCoffee = (time: number, coffeeName: string) => {
    setSelectedTime(time);
    setBrewTime(time);
    setIsTimerActive(false);
    setActiveCoffee(coffeeName);
  };

  const startTimer = () => {
    if (selectedTime > 0) {
      setIsTimerActive(true);
    }
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setActiveCoffee("");
  };

  const isCoffeeActive = (coffeeName: string) => {
    return activeCoffee === coffeeName && (isTimerActive || brewTime > 0);
  };

  return (
    <div className="app">
      <div className="machine">
        <div className="coffee-buttons left">
          <button className={`coffee-button ${isCoffeeActive("Эспрессо") ? "active" : ""}`} onClick={() => selectCoffee(25, "Эспрессо")}>Эспрессо</button>
          <button className={`coffee-button ${isCoffeeActive("Американо") ? "active" : ""}`} onClick={() => selectCoffee(30, "Американо")} >Американо</button>
          <button className={`coffee-button ${isCoffeeActive("Раф") ? "active" : ""}`} onClick={() => selectCoffee(40, "Раф")}>Раф</button>
          <button className={`coffee-button ${isCoffeeActive("Торре") ? "active" : ""}`} onClick={() => selectCoffee(35, "Торре")}>Торре</button>
        </div>

        <div className="block">
          <span className="mark-name">HAROZHANG</span>
          <div className="roll">
            <span className="sec-text">{brewTime} SEC</span>
            {isTimerActive ? (
              <button className="button" onClick={stopTimer}>STOP</button>) : (<button className="button" onClick={startTimer}disabled={selectedTime === 0}>START</button>
            )}
          </div>
          <div className="pallet"></div>
        </div>
        <div className="black">
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
          <div className="white-line"></div>
        </div>

        <div className="coffee-buttons right">
          <button className={`coffee-button ${isCoffeeActive("Капучино") ? "active" : ""}`} onClick={() => selectCoffee(45, "Капучино")}>Капучино</button>
          <button className={`coffee-button ${isCoffeeActive("Латте") ? "active" : ""}`} onClick={() => selectCoffee(50, "Латте")}>Латте</button>
          <button className={`coffee-button ${isCoffeeActive("Ристретто") ? "active" : ""}`} onClick={() => selectCoffee(20, "Ристретто")}>Ристретто</button>
          <button className={`coffee-button ${isCoffeeActive("Моккачино") ? "active" : ""}`} onClick={() => selectCoffee(55, "Моккачино")}>Моккачино</button>
        </div>
      </div>
      <div className="The-brilliant-part"></div>
      <div className="footer-machine"></div>
      <div className="design-credit">DESIGN BY HAROZHANG</div>
    </div>
  );
}

export default App;

//
//
//
//