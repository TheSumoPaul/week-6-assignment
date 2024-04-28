import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [cookies, setCookies] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [cps, setCPS] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(10);

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("cookieClickerData")
    );

    if (localStorageData) {
      setCookies(localStorageData.cookies);
      setClickPower(localStorageData.clickPower);
      setCPS(localStorageData.cps);
      setUpgradeCost(localStorageData.upgradeCost);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((cookies) => cookies + cps / 10);
    }, 100);

    return () => clearInterval(interval);
  }, [cps]);

  useEffect(() => {
    const saveData = {
      cookies: parseFloat(cookies.toFixed(1)),
      clickPower,
      cps,
    };
    localStorage.setItem("cookieClickerData", JSON.stringify(saveData));
  }, [cookies, clickPower, cps]);

  const handleClick = () => {
    setCookies(cookies + clickPower);
  };

  const handleUpgradeClick = (cost, cpsIncrease) => {
    if (cookies >= cost) {
      setCookies(cookies - cost);
      setClickPower(clickPower + 1);
      setCPS(cps + cpsIncrease);
      setUpgradeCost(upgradeCost * 2);
    } else {
      alert("You don't have enough cookies to buy this upgrade!");
    }
  };

  return (
    <div className="container">
      <h1>Cookie Clicker</h1>
      <div className="cookie-container">
        <button className="cookie-button" onClick={handleClick}>
          Click me!
        </button>
        <div>
          <p className="cookie-count">You have {Math.floor(cookies)} cookies</p>
          <p className="cookie-count">CPS: {cps}</p>
        </div>
      </div>
      <div className="upgrade-container">
        <button
          className="upgrade-button"
          onClick={() => handleUpgradeClick(10, 1)}
        >
          Upgrade (+1 CPS) - Cost: 10 cookies
        </button>
        <button
          className="upgrade-button"
          onClick={() => handleUpgradeClick(50, 5)}
        >
          Upgrade (+5 CPS) - Cost: 50 cookies
        </button>
        <button
          className="upgrade-button"
          onClick={() => handleUpgradeClick(100, 10)}
        >
          Upgrade (+10 CPS) - Cost: 100 cookies
        </button>
      </div>
    </div>
  );
}

export default App;
