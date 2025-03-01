// components/DataTable.js

import { TABLEHEADER } from "@/config/config";
import Link from "next/link";
import React from "react";

const DataTable = ({ data, handleDelete, title  }) => {
  const TableClasDark =
    " py-2 px-2 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-100 text-center dark:bg-gray-700  font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider";
  data?.sort((a, b) => a.itemValue - b.itemValue);
  return (
    <div className="overflow-x-auto text-[10px]  sm:text-xs">
      <table className="min-w-full bg-white dark:bg-gray-800 md:text-2xl">
        <thead>
          <tr>
            {TABLEHEADER.map((header) => (
              <th key={header} className={TableClasDark}>
                {header}
              </th>
            ))}
            <th className={TableClasDark}>R</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr
              key={item.code}
              className={`${
                item.itemValue < 1
                  ? "bg-green-300"
                  : "even:bg-gray-50 dark:even:bg-gray-700 odd:bg-white dark:odd:bg-gray-800"
              }`}
            >
              {Object.values(item)
                .slice(1, 4)
                .map((value, index) => (
                  <td
                    key={index}
                    className="py-2 px-2 border-b text-center border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    {index === 2 ? (
                      <span
                        className={`${value < 3 && "text-red-500 font-bold"}`}
                      >{`${value} vnt.`}</span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              <td>
                <div className="flex gap-1 justify-center items-center">
                  <Link
                    className="hover:scale-105 hover:text-green-500"
                    href={`/newAdd?title=${title}&data=${encodeURIComponent(
                      JSON.stringify({
                        code: item.code,
                        itemName: item.itemName,
                        itemValue: item.itemValue,
                      })
                    )}`}
                  >
                    &#9998;
                  </Link>
                  <button onClick={() => handleDelete(item)} className="text-xl md:text-3xl hover:scale-105 hover:text-red-500">
                    &times;
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
