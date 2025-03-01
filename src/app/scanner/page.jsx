// pages/scanner.js
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ButtonComponent from "@/components/ButtonComponent";
import Link from "next/link";
import { FromDb } from "@/Functions/simpleFunctions";
import { saveResult } from "@/components/SaveResults";
import Loading from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/config";
import { useSession } from "next-auth/react";

// Dynamically import the BarcodeScanner to avoid server-side rendering issues
const BarcodeScanner = dynamic(() => import("/src/components/BarcodeScanner"), {
  ssr: false,
});

const ScannerPage = () => {
  const router = useRouter();
  const [scannedCode, setScannedCode] = useState("");
  const [codeFromData, setCodeFromData] = useState(null);
  const [error, setError] = useState("");
  const { result, isLoading, mutate } = FromDb(`getResults`);

  const { data } = useSession();
  const userName = data?.user?.name;
  const existingItem = result?.find(item => item.code === scannedCode);


  useEffect(() => {
    if (scannedCode) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${API_URL}/api/getResults/${scannedCode}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data && Object.keys(data).length !== 0) {
              setCodeFromData(data);
            } else {
              console.error("Received empty or invalid data.");
            }
          } else {
            console.error("Failed to get the result.");
          }
        } catch (error) {
          toast.error("Klaida gaunant duomenis iš serverio.");
          console.error("Error while get the result:", error);
        }
      };

      fetchData();
    }
  }, [scannedCode]);

  const handleDetected = (code) => {
    setScannedCode(code);
  };

  const addHandler = (scannedCode) => {
    saveResult(
      `saveResult/${scannedCode}`,
      { itemValue: 1 },
      mutate,
      "Pridėta",
      "Tokios prekės nėra"
    );
    saveResult("saveStatistics", {user: userName, model: existingItem?.itemName, count:+1, action:"Pridėta" })
  };

  const minusHandler = (scannedCode) => {
    saveResult(
      `saveResult/${scannedCode}`,
      { itemValue: -1 },
      mutate,
      "Išimta",
      "Tokios prekės nėra"
    );
    saveResult("saveStatistics", {user: userName, model: existingItem?.itemName, count:-1, action:"Išimta" })
  };

  const addNewHandler = (scannedCode) => {
    router.push(`/newAdd?code=${encodeURIComponent(scannedCode)}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-2xl font-bold">Brūkšninių kodų skeneris</h1>
      {!scannedCode && <BarcodeScanner onDetected={handleDetected} />}
      {scannedCode && (
        <div>
          <h2>Nuskaitytas kodas:</h2>

          {codeFromData ? (
            <div className="text-green-600">
              <span className="font-bold"> {codeFromData.itemName}</span>{" "}
              <span>{scannedCode}</span>
            </div>
          ) : (
            <div>
              <span className="font-bold text-red-600"> Naujas</span>{" "}
              <span>{scannedCode}</span>
            </div>
          )}

          <h3 className="py-3 font-bold">Veiksmai:</h3>
          <div className="flex  gap-3 justify-center">
            <ButtonComponent onClick={() => addHandler(scannedCode)}>
              Pridėti
            </ButtonComponent>
            <ButtonComponent onClick={() => minusHandler(scannedCode)}>
              Išimti
            </ButtonComponent>
            {!codeFromData && (
              <ButtonComponent onClick={() => addNewHandler(scannedCode)}>
                Nauja
              </ButtonComponent>
            )}
          </div>
        </div>
      )}
      {error && (
        <div>
          <h2>Klaida:</h2>
          <p>{error}</p>
        </div>
      )}
      <div className="mt-10">
        <Link className="text-center" href="/#">
          Atgal
        </Link>
      </div>
    </div>
  );
};

export default ScannerPage;
