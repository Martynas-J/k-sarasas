"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Form = ({ onSubmit, parsedData, title }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (parsedData) {
      setName(parsedData.itemName || "");
      setValue(
        parsedData.itemValue !== undefined
          ? parsedData.itemValue.toString()
          : ""
      );
    }
  }, [parsedData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, value: parseInt(value) }).then((success) => {
      if (success) {
        setName("");
        setValue("");
        setError(false);
      } else {
        setError(true);
      }
    });
  };

  const inputClass =
    "bg-gray-200 mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const labelClass = "font-bold block text-sm text-gray-700";
  const buttonClass =
    "w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100";

  const handleIncrement = (item) => {
    setValue((prev) => parseInt(prev) + item);
  };

  const handleDecrement = (item) => {
    setValue((prev) => parseInt(prev) - item);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 text-center flex flex-col gap-4"
    >
      <div className="mb-4">
        <label htmlFor="preke" className={labelClass}>
          Prekė
        </label>
        <input
          type="text"
          id="preke"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="value" className={labelClass}>
          Skaičius
        </label>
        <input
          type="number"
          id="value"
          value={value}
          required
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="flex justify-center gap-10">
        {/* Increment Buttons */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5,10].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => handleIncrement(item)}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              +{item}
            </button>
          ))}
        </div>

        {/* Decrement Buttons */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5,10].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => handleDecrement(item)}
              className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              -{item}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className={buttonClass}>
        {parsedData ? "Redaguoti" : "Pridėti"}
      </button>
      <Link className="text-center mt-10" href={`/${title.toLowerCase()}`}>
        Atgal
      </Link>
    </form>
  );
};

export default Form;
