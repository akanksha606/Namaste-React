import { useState } from "react";
import { CDN_URL } from "../utils/constants";
export const ItemList = ({ items = [] }) => (
  <ul className="divide-y divide-gray-100">
    {items.map((item) => {
      const info = item.card.info;
      const price = (info.price ?? info.defaultPrice) / 100;
      const isVeg = info.itemAttribute?.vegClassifier === "VEG";

      return (
        <li key={info.id} className="flex items-start justify-between gap-4 py-4">
          <div className="flex-1">
            {/* veg / non-veg indicator */}
            <span
              className={`mb-1 inline-flex h-4 w-4 items-center justify-center rounded-sm border-2 ${
                isVeg ? "border-green-600" : "border-red-600"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isVeg ? "bg-green-600" : "bg-red-600"
                }`}
              />
            </span>
            <p className="font-semibold text-gray-800">{info.name}</p>
            <p className="text-sm text-gray-700">₹{price}</p>
            {info.description && (
              <p className="mt-2 line-clamp-2 text-xs text-gray-500">
                {info.description}
              </p>
            )}
          </div>
          <div>
          <img
              className="mt-2 h-20 w-20 rounded-lg object-cover"
              src={CDN_URL + info.imageId}
              alt={info.name}
            />
          <button className="mt-2 rounded bg-blue-300 px-2 py-1 text-xs text-white">
            Add + 
          </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export const Accordion = ({ title, count, isOpen, onToggle, children, level = 1 }) => (
  <div
    className={
      level === 1
        ? "mb-3 rounded-xl border border-gray-200 bg-white shadow-sm"
        : "border-t border-gray-100"
    }
  >
    <button
      onClick={onToggle}
      className={`flex w-full items-center justify-between text-left transition-colors hover:bg-gray-50 ${
        level === 1
          ? "rounded-xl px-5 py-4 text-lg font-bold text-gray-800"
          : "px-5 py-3 text-base font-semibold text-gray-700"
      }`}
    >
      <span>
        {title} <span className="font-normal text-gray-500">({count})</span>
      </span>
      <span
        className={`text-sm text-gray-500 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        ▼
      </span>
    </button>

    {isOpen && <div className="px-5 pb-2">{children}</div>}
  </div>
);

export const SubCategory = ({ sub }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Accordion
      level={2}
      title={sub.title}
      count={sub.itemCards.length}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <ItemList items={sub.itemCards} />
    </Accordion>
  );
};