import { useEffect, useState } from "react";
import { MENU_API } from "./constants";
const useRestaurantMenu = (restaurantId) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);

  useEffect(() => {
      fetchRestaurantMenu();
    }, [restaurantId]);

    const fetchRestaurantMenu = async () => {

        const response = await fetch(MENU_API + restaurantId);
        const json = await response.json();
        setRestaurantMenu(json.data);
    };

  return restaurantMenu;
};

export default useRestaurantMenu;