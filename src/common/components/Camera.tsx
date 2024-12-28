/* eslint-disable @next/next/no-img-element */
import * as faceapi from "face-api.js";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import Loading from "./Loading";

const Camera: React.FC = () => {
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [internetImageUrl, setInternetImageUrl] = useState<string>("");
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const webcamRef = useRef<Webcam>(null);

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

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const compareWithInternetImage = async () => {
    if (capturedImage && internetImageUrl) {
      setLoading(true);
      try {
        const cameraImage = await faceapi.fetchImage(capturedImage);
        const internetImage = await faceapi.fetchImage(internetImageUrl);

        const detection1 = await faceapi
          .detectSingleFace(cameraImage, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        const detection2 = await faceapi
          .detectSingleFace(
            internetImage,
            new faceapi.TinyFaceDetectorOptions(),
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection1 && detection2) {
          const distance = faceapi.euclideanDistance(
            detection1.descriptor,
            detection2.descriptor,
          );

          setComparisonResult(
            distance < 0.6
              ? "Faces match with high confidence."
              : "Faces do not match.",
          );
        } else {
          setComparisonResult("Unable to detect faces in one or both images.");
        }
      } catch (error) {
        console.error("Error comparing images:", error);
        setComparisonResult("An error occurred during comparison.");
      } finally {
        setLoading(false);
      }
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
                width={360}
                height={360}
                className="rounded-full w-full h-full object-cover"
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 360,
                  height: 360,
                  facingMode: "user",
                }}
              />
            </div>
            <button
              onClick={captureImage}
              className="mt-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-gradient-to-t from-blue-700 to-blue-400 active:scale-95 rounded-[16px]"
            >
              <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-[14px]">
                Capture Image
              </span>
            </button>
            {capturedImage && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Captured Image:</h3>
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-[100px] h-[100px] rounded-full object-cover border-2"
                />
              </div>
            )}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter image URL"
                value={internetImageUrl}
                onChange={(e) => setInternetImageUrl(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={compareWithInternetImage}
                disabled={!capturedImage || !internetImageUrl || loading}
                className="mt-4 cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-gradient-to-t from-green-700 to-green-400 active:scale-95 rounded-[16px]"
              >
                <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-[14px]">
                  {loading ? "Processing..." : "Compare with Internet Image"}
                </span>
              </button>
            </div>
            {comparisonResult && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Comparison Result:
                </h3>
                <p>{comparisonResult}</p>
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Camera;
