import { createContext, useState } from 'react';

export const ShowCompletedContext = createContext();

export const ShowCompletedProvider = ({ children }) => {
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <ShowCompletedContext.Provider value={{ showCompleted, setShowCompleted }}>
      {children}
    </ShowCompletedContext.Provider>
  );
};
