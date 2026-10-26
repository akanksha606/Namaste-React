import React, { useEffect, useState } from "react";
import RestaurantCard , { RestaurantCardWithPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

export default BodyComponent = () => {
  // State variable to hold the list of restaurants
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
 
    const json = await data.json();
    console.log("useEffect called");
    console.log(json);
    setListOfRestaurant(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurant(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );

  };
  
  useEffect(() => {
    // API call
    fetchData();
  }, []);
 
  console.log("body rendered");
  const isUserOnline = useOnlineStatus();

  const ShowRestaurantCardWithPromotedLabel = RestaurantCardWithPromotedLabel(RestaurantCard);
  if (!isUserOnline)
    return <h1>🔴 You are offline, please check your internet connection!!</h1>;

  return (
    <div className="body-container">
      <div className="flex justify-between">
        <div className="search m-4 p-4">
          <input
            value={searchText}
            placeholder=" Search your favorite restaurant..."
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="border border-solid border-2 border-black rounded-md p-2"
          />
          {searchText.length > 0 && (
            <span
              className="reset-search"
              onClick={() => {
                setFilteredRestaurant(listOfRestaurant);
                setSearchText("");
              }}
            >
              x
            </span>
          )}
          <button
            className="px-4 py-2 bg-green-100 mx-4 rounded-lg"
            onClick={() => {
              const searchedList = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText),
              );
              setFilteredRestaurant(searchedList);
            }}
            type="submit"
          >
            Search
          </button>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => {
              //filter Logic
              const filteredList = listOfRestaurant.filter(
                (res) => res.info.avgRating > 4,
              );
              setFilteredRestaurant(filteredList);
              console.log(filteredList);
            }}
            className="px-4 py-2 bg-gray-100 m-4 rounded-lg"
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      <div className="flex flex-wrap">
        {filteredRestaurant.length === 0 ? (
          <Shimmer />
        ) : (
          filteredRestaurant.map((restaurant) => (
            <Link
              to={"/restaurants/" + restaurant.info.id}
              key={restaurant.info.id}
            >
              {restaurant.info.badges?.imageBadges?.[0]?.description ? (
                <ShowRestaurantCardWithPromotedLabel resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
