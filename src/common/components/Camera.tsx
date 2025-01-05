import * as faceapi from "face-api.js";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Webcam from "react-webcam";

import { auth } from "@/configs/firebase";
import { useUploadThing } from "@/utils/uploadthing";

import Loading from "./Loading";

const Camera = ({
  handleBack,
  changeProfile,
}: {
  handleBack: () => void;
  changeProfile?: (url: string) => void;
}) => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const currentUserPhotoURL = auth.currentUser?.photoURL || "";

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
      console.log("Models loaded");
    };
    loadModels();
  }, []);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.url && changeProfile) {
        changeProfile(res[0].url);
      }
    },
    onUploadError: (error) => {
      toast.error(error.message);
    },
  });

  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        setLoading(true);

        try {
          const base64Data = imageSrc.split(",")[1];
          const byteCharacters = atob(base64Data);
          const byteArrays = [];

          for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
          }

          const blob = new Blob([new Uint8Array(byteArrays)], {
            type: "image/jpeg",
          });

          const file = new File([blob], "photo.jpg", {
            type: "image/jpeg",
          });

          // Upload using UploadThing
          await startUpload([file]);
        } catch (error) {
          console.error("Error capturing/uploading photo:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  // Fungsi captureAndCompare untuk membandingkan wajah
  const captureAndCompare = async () => {
    if (webcamRef.current && currentUserPhotoURL) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        setLoading(true);
        try {
          const cameraImage = await faceapi.fetchImage(imageSrc);
          const userPhotoImage = await faceapi.fetchImage(currentUserPhotoURL);

          const detection1 = await faceapi
            .detectSingleFace(
              cameraImage,
              new faceapi.TinyFaceDetectorOptions(),
            )
            .withFaceLandmarks()
            .withFaceDescriptor();

          const detection2 = await faceapi
            .detectSingleFace(
              userPhotoImage,
              new faceapi.TinyFaceDetectorOptions(),
            )
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (detection1 && detection2) {
            const distance = faceapi.euclideanDistance(
              detection1.descriptor,
              detection2.descriptor,
            );

            if (distance < 0.6) {
              toast.success("Faces match with high confidence");
              handleBack();
            } else {
              toast.error("Faces do not match");
            }
          } else {
            toast.error("Unable to detect faces in one or both images");
          }
        } catch (error) {
          console.error("Error comparing images:", error);
          toast.error("Error comparing images");
        } finally {
          setLoading(false);
        }
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
            <div className="mt-4 flex gap-4 justify-center">
              {changeProfile ? (
                <button
                  onClick={capture}
                  className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-gradient-to-t from-blue-700 to-blue-400 active:scale-95 rounded-[16px]"
                >
                  <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-[14px]">
                    {loading ? "Uploading..." : "Capture"}
                  </span>
                </button>
              ) : (
                <button
                  onClick={captureAndCompare}
                  className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-gradient-to-t from-green-700 to-green-400 active:scale-95 rounded-[16px]"
                >
                  <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-[14px]">
                    {loading ? "Processing..." : "Capture & Compare"}
                  </span>
                </button>
              )}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Camera;
