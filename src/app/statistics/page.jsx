"use client";
import { FromDb } from "@/Functions/simpleFunctions";
import Loading from "@/components/Loading/Loading";
import SearchForm from "@/components/SearchForm";
import { STATHEADER } from "@/config/config";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Statistics = () => {
  const { result, isLoading, mutate } = FromDb(`getStatistics`);
  const [filteredResult, setFilteredResult] = useState([]);

  useEffect(() => {
    if (result) {
      setFilteredResult(result);
    }
  }, [result]);

  if (isLoading) {
    return <Loading />;
  }

  const sortDate = filteredResult?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleSearch = (searchQuery) => {
    const query = searchQuery.toLowerCase();
    const filtered = result.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(query)
      )
    );
    setFilteredResult(filtered);
  };
  return (
    <div className="container mx-auto text-center">
      <h1 className="text-2xl font-bold pt-4 pb-4">
        Statistika nuo 2024-06-19
      </h1>
      <SearchForm handleSearch={handleSearch} />
      <div className="mt-4">
        <Link className="text-center" href="/#">
          Atgal
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              {STATHEADER.map((header) => (
                <th
                  key={header}
                  className="py-2 px-2 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-100 text-center dark:bg-gray-700  text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortDate?.map((item) => (
              <tr
                key={item._id}
                className={`even:bg-gray-50 dark:even:bg-gray-700 odd:bg-white dark:odd:bg-gray-800`}
              >
                {Object.values(item)
                  .slice(1, 6)
                  .map((value, index) => (
                    <td
                      key={index}
                      className="py-2 px-2 border-b text-center border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    >
                      {index === 2 ? (
                        <span
                          className={`${
                            value > 0
                              ? "text-green-500 font-bold"
                              : "text-red-500 font-bold"
                          }`}
                        >{`${value} vnt.`}</span>
                      ) : index === 4 ? (
                        <span>
                          {new Intl.DateTimeFormat("lt-LT", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(value))}
                        </span>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Link className="text-center" href="/#">
            Atgal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
