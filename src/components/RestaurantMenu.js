import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer"; // adjust path to your Shimmer component
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { Accordion, ItemList, NestedCategory} from "./RestaurantAccordion";
import { useState } from "react";

const ITEM_CATEGORY =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
const NESTED_CATEGORY =
  "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory";

// const ItemList = ({ items = [] }) => (
//   <ul>
//     {items.map((item) => {
//       const info = item.card.info;
//       const price = (info.price ?? info.defaultPrice) / 100;
//       return (
//         <li key={info.id}>
//           {info.name} - Rs. {price}
//         </li>
//       );
//     })}
//   </ul>
// );

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [openIndex, setOpenIndex] = useState(0);
  const resInfo = useRestaurantMenu(resId);
  if (resInfo === null) return <Shimmer />;

  const restaurantInfo = resInfo.cards.find((c) => c?.card?.card?.info)?.card
    ?.card?.info;

  const regularCards =
    resInfo.cards.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap
      ?.REGULAR?.cards || [];

  const sections = regularCards
  .map((c) => c?.card?.card)
  .filter(
    (card) =>
      card?.["@type"] === ITEM_CATEGORY ||
      card?.["@type"] === NESTED_CATEGORY
  )
  .filter((card) => card.categoryId !== "-1");

  const { name, cuisines = [], costForTwoMessage } = restaurantInfo || {};

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 border-b border-dashed border-gray-300 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
        <p className="mt-2 text-sm text-gray-500">
          {cuisines.join(", ")} · {costForTwoMessage}
        </p>
      </div>

      <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
        Menu
      </h2>

      {sections.map((section, index) => {
        const isNested = section["@type"] === NESTED_CATEGORY;
        const count = isNested
          ? section.categories.reduce(
              (sum, sub) => sum + sub.itemCards.length,
              0,
            )
          : section.itemCards.length;

        return (
          <Accordion
            key={section.categoryId}
            title={section.title}
            count={count}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {isNested ? (
              <NestedCategory categories={section.categories} />
            ) : (
              <ItemList items={section.itemCards} />
            )}
          </Accordion>
        );
      })}
    </div>
  );
};

export default RestaurantMenu;