// import React from "react";
import { CDN_URL } from "../utils/constants.js";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    resData?.info;
  console.log("RestaurantCard rendered", resData);
  return (
    <div className="m-4 p-4 w-[250px] shadow-lg bg-pink-50 hover:bg-pink-100 rounded-lg">
      <img
        className="rounded-lg"
        src={CDN_URL + cloudinaryImageId}
        alt="img"
      ></img>
      <h3 className="font-bold py-4">{name}</h3>
      <h3>{cuisines.join(", ")}</h3>
      <h3>{avgRating}</h3>
      <h3>{costForTwo}</h3>
      <h3>{sla.slaString}</h3>
    </div>
  );
};

//Higher Order Component - will return promoted version of RestaurantCard
// HOC is a function which takes a component as an argument and returns a new component
export const RestaurantCardWithPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute bg-black text-white px-2 py-1 rounded-br-lg">
          Promoted
        </div>
      <RestaurantCard {...props} />
    </div>
  );
}};


export default RestaurantCard;
