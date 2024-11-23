/* eslint-disable @next/next/no-img-element */
import * as faceapi from "face-api.js";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import Webcam from "react-webcam";

import Loading from "./Loading";

const Camera: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const videoHeight = 360;
  const videoWidth = 360;

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]).then(() => {
        setModelsLoaded(true);
        console.log("Models loaded");
      });
    };
    loadModels();
  }, []);

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef.current && webcamRef.current) {
        const video = webcamRef.current.video!;
        const displaySize = { width: videoWidth, height: videoHeight };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize,
        );

        setCount(detections.length);

        const canvasCtx = canvasRef.current.getContext("2d");
        if (canvasCtx) {
          canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        }
      }
    }, 100);
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc); // Simpan gambar ke state
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center py-4">
        {modelsLoaded ? (
          <>
            <div className="relative w-[360px] h-[360px] border-4 rounded-full flex justify-center items-center p-2.5">
              <Webcam
                ref={webcamRef}
                audio={false}
                width={videoWidth}
                height={videoHeight}
                className="rounded-full w-full h-full object-cover"
                videoConstraints={{
                  width: videoWidth,
                  height: videoHeight,
                  facingMode: "user",
                }}
                onUserMedia={handleVideoOnPlay}
                screenshotFormat="image/jpeg"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full rounded-full"
              />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleCapture}
          className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-gradient-to-t from-blue-700 to-blue-400 active:scale-95 rounded-[16px]"
        >
          <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-[14px]">
            <HiOutlineCamera size={28} />
            Take a picture
          </span>
        </button>
        {capturedImage && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Captured Image:</h3>
            <img
              src={capturedImage}
              alt="Captured"
              className="w-[360px] h-[360px] rounded-full object-cover border-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
