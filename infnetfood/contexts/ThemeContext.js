import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

const lightMode = {
  backgroundColor : "white",
  color:"black",
  card:"#FCFCFC",
  cardBorder:"black",
  price:"green"
}

const darkMode = {
  backgroundColor : "#1e1e1e",
  color:"#f1f1f1",
  card:"#404040",
  cardBorder:"#808080",
  price:"lightgreen"
}

export const ThemeProvider = ({ children }) => {
  const[theme,setTheme] = useState("light");
  const[selectedTheme,setSelectedTheme] = useState(lightMode);
  
  
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setSelectedTheme(theme === "light" ? darkMode : lightMode);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme,selectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
