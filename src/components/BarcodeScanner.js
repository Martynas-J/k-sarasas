// components/BarcodeScanner.js

import React, { useEffect, useRef } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // Use 'user' for front camera
          },
          area: {
            // defines rectangle of the detection/localization area
            top: "10%", // top offset
            right: "10%", // right offset
            left: "10%", // left offset
            bottom: "10%", // bottom offset
          },
        },
        locator: {
          patchSize: "small", // Options: 'x-small', 'small', 'medium', 'large', 'x-large'
          halfSample: true,
        },
        numOfWorkers: navigator.hardwareConcurrency || 4,
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "upc_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_e_reader",
            "i2of5_reader",
            "2of5_reader",
            "code_93_reader",
          ],
          multiple: false, // Set to true if you expect to scan multiple barcodes at once
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("Quagga initialization failed:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onProcessed((result) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

        if (result.boxes) {
          result.boxes.forEach((box) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: "green",
              lineWidth: 2,
            });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected((data) => {
      onDetected(data.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div className="" ref={scannerRef} style={{ width: "100%" }} />;
};

export default BarcodeScanner;
