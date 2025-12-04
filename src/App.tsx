import React, { useState, useEffect } from "react";
import "./app.css";

type IngredientName = "кофе" | "вода" | "сливки" | "сахар" | "молоко" | "пенка" | "шоколад";
type CoffeeName = "Эспрессо" | "Американо" | "Раф" | "Торре" | "Капучино" | "Латте" | "Ристретто" | "Моккачино";

interface Ingredient {
  name: IngredientName;
  time: number;
}

interface CoffeeRecipe {
  name: CoffeeName;
  ingredients: Ingredient[];
}

function App() {
  const [brewTime, setBrewTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [activeCoffee, setActiveCoffee] = useState<CoffeeRecipe | null>(null);
  const [currentIngredient, setCurrentIngredient] = useState<string | null>(null);
  const [isPouring, setIsPouring] = useState(false);

  const coffeeRecipes: CoffeeRecipe[] = [
    {
      name: "Эспрессо",
      ingredients: [{ name: "кофе", time: 15 }],
    },
    {
      name: "Американо",
      ingredients: [
        { name: "кофе", time: 15 },
        { name: "вода", time: 10 },
      ],
    },
    {
      name: "Раф",
      ingredients: [
        { name: "кофе", time: 15 },
        { name: "сахар", time: 5 },
        { name: "сливки", time: 10 },
      ],
    },
    {
      name: "Торре",
      ingredients: [
        { name: "кофе", time: 15 },
        { name: "молоко", time: 10 },
        { name: "пенка", time: 12 },
      ],
    },
    {
      name: "Капучино",
      ingredients: [
        { name: "кофе", time: 15 },
        { name: "молоко", time: 10 },
        { name: "пенка", time: 12 },
      ],
    },
    {
      name: "Латте",
      ingredients: [
        { name: "кофе", time: 15 },
        { name: "молоко", time: 10 },
      ],
    },
    {
      name: "Ристретто",
      ingredients: [{ name: "кофе", time: 15 }],
    },
    {
      name: "Моккачино",
      ingredients: [
        { name: "кофе", time: 15 },
        { name: "шоколад", time: 16 },
        { name: "молоко", time: 10 },
      ],
    },
  ];

  useEffect(() => {
    if (isTimerActive && brewTime > 0) {
      const timer = setTimeout(() => {
        setBrewTime(brewTime - 1);
        updateCurrentIngredient();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (brewTime === 0 && isTimerActive) {
      setIsTimerActive(false);
      setCurrentIngredient("готово!");
      setIsPouring(false);
    }
  }, [brewTime, isTimerActive]);

  const updateCurrentIngredient = () => {
    if (!activeCoffee) return;
    
    let timePassed = calculateBrewTime(activeCoffee) - brewTime;
    let currentTime = 0;
    
    for (let ingredient of activeCoffee.ingredients) {
      currentTime += ingredient.time;
      if (timePassed <= currentTime) {
        if (currentIngredient !== ingredient.name) {
          setIsPouring(true);
          setTimeout(() => {
            setIsPouring(false);
          }, 500);
        }
        setCurrentIngredient(ingredient.name);
        return;
      }
    }
  };

  const calculateBrewTime = (coffee: CoffeeRecipe): number => {
    return coffee.ingredients.reduce((total: number, ingredient: Ingredient) => total + ingredient.time, 0);
  };

  const selectCoffee = (coffee: CoffeeRecipe) => {
    const time = calculateBrewTime(coffee);
    setBrewTime(time);
    setIsTimerActive(false);
    setCurrentIngredient(null);
    setActiveCoffee(coffee);
    setIsPouring(false);
  };

  const startTimer = () => {
    if (brewTime > 0) {
      setIsTimerActive(true);
      setIsPouring(true);
      setTimeout(() => {
        setIsPouring(false);
      }, 500);
      updateCurrentIngredient();
    }
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setCurrentIngredient(null);
    setActiveCoffee(null);
    setIsPouring(false);
  };

  const getIngredientColor = (): string => {
    switch(currentIngredient) {
      case "кофе": return "#6F4E37";
      case "вода": return "#87CEEB";
      case "молоко": return "#FFFFFF";
      case "сливки": return "#FFFDD0";
      case "пенка": return "#F5F5DC";
      case "шоколад": return "#D2691E";
      case "сахар": return "#FFFFFF";
      default: return "#FFFFFF";
    }
  };

  const leftCoffeeButtons = coffeeRecipes.slice(0, 4);
  const rightCoffeeButtons = coffeeRecipes.slice(4);

  return (
    <div className="app">
      <div className="machine">
        <div className="coffee-buttons left">
          {leftCoffeeButtons.map((coffee) => (
            <button
              key={coffee.name}
              className={`coffee-button ${activeCoffee === coffee ? "active" : ""}`}
              onClick={() => selectCoffee(coffee)}
            >
              {coffee.name}
            </button>
          ))}
        </div>
        
        <div className="block">
          <span className="mark-name">HAROZHANG</span>
          <div className="roll">
            <span className="sec-text">{brewTime} SEC</span>
            {isTimerActive ? (
              <button className="button" onClick={stopTimer}>
                STOP
              </button>
            ) : (
              <button className="button" onClick={startTimer} disabled={brewTime === 0}>
                START
              </button>
            )}
          </div>
          <div className="pallet"></div>
        </div>

        <div 
          className={`ingredient-flow ${isPouring ? 'pouring' : ''} ${isTimerActive ? 'active' : ''} ${brewTime === 0 ? 'finish' : ''}`}
          style={{ backgroundColor: getIngredientColor() }}
        ></div>
        
        <div className="black">
          {Array.from({ length: 17 }, (_, i) => (
            <div key={i} className="white-line"></div>
          ))}
        </div>

        <div className="coffee-buttons right">
          {rightCoffeeButtons.map((coffee) => (
            <button
              key={coffee.name}
              className={`coffee-button ${activeCoffee === coffee ? "active" : ""}`}
              onClick={() => selectCoffee(coffee)}
            >
              {coffee.name}
            </button>
          ))}
        </div>
      </div>
      <div className="The-brilliant-part"></div>
      <div className="footer-machine"></div>
      <div className="design-credit">DESIGN BY HAROZHANG</div>
    </div>
  );
}

export default App;