import { useContext, createContext, useState, useEffect } from "react";
import { getRestaurants } from "../dummydata";

const RestaurantsContext = createContext();

//allow RestaurantsContext to be used in any component by exporting it
export function useRestaurants() {
  return useContext(RestaurantsContext);
}

//TODO: add fetch error
//stuff to export

export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  //   useEffect(() => {
  //     getRestaurants();
  //   }, []);

  //   const getRestaurants = () => {
  //     fetch("http://localhost:3000/api/v1/restaurants")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setRestaurants(data);
  //         console.log(data);
  //       })
  //       .catch((error) => console.log(error));
  //   };
  return (
    <RestaurantsContext.Provider value={{ restaurants }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
