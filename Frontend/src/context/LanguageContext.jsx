// context/LanguageContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create a context for language
const LanguageContext = createContext();

// Custom hook to use the LanguageContext
export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Language provider to wrap around the app and manage language state
export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, handleLanguageChange }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
